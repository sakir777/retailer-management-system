import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Delivery {
  id: string;
  deliveryNumber: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'in_transit' | 'delivered' | 'failed' | 'cancelled';
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface DeliveriesState {
  deliveries: Delivery[];
  isLoading: boolean;
  error: string | null;
  selectedDelivery: Delivery | null;
}

const initialState: DeliveriesState = {
  deliveries: [
    {
      id: '1',
      deliveryNumber: 'DEL-001',
      orderId: '1',
      orderNumber: 'ORD-001',
      customerName: 'John Doe',
      customerPhone: '+1-555-0123',
      deliveryAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
      scheduledTime: '14:00',
      status: 'scheduled',
      driverName: 'Mike Johnson',
      driverPhone: '+1-555-0789',
      vehicleNumber: 'VH-001',
      estimatedDeliveryTime: '14:00-16:00',
      notes: 'Customer prefers afternoon delivery',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      deliveryNumber: 'DEL-002',
      orderId: '2',
      orderNumber: 'ORD-002',
      customerName: 'Jane Smith',
      customerPhone: '+1-555-0456',
      deliveryAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
      },
      scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 day from now
      scheduledTime: '10:00',
      status: 'in_transit',
      driverName: 'Sarah Wilson',
      driverPhone: '+1-555-0321',
      vehicleNumber: 'VH-002',
      estimatedDeliveryTime: '10:00-12:00',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  isLoading: false,
  error: null,
  selectedDelivery: null,
};

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    // Fetch deliveries
    fetchDeliveriesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDeliveriesSuccess: (state, action: PayloadAction<Delivery[]>) => {
      state.isLoading = false;
      state.deliveries = action.payload;
      state.error = null;
    },
    fetchDeliveriesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Add delivery
    addDeliveryRequest: (state, action: PayloadAction<Omit<Delivery, 'id' | 'deliveryNumber' | 'createdAt' | 'updatedAt'>>) => {
      state.isLoading = true;
      state.error = null;
    },
    addDeliverySuccess: (state, action: PayloadAction<Delivery>) => {
      state.isLoading = false;
      state.deliveries.push(action.payload);
      state.error = null;
    },
    addDeliveryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update delivery
    updateDeliveryRequest: (state, action: PayloadAction<Delivery>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateDeliverySuccess: (state, action: PayloadAction<Delivery>) => {
      state.isLoading = false;
      const index = state.deliveries.findIndex(delivery => delivery.id === action.payload.id);
      if (index !== -1) {
        state.deliveries[index] = action.payload;
      }
      state.error = null;
    },
    updateDeliveryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete delivery
    deleteDeliveryRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteDeliverySuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.deliveries = state.deliveries.filter(delivery => delivery.id !== action.payload);
      state.error = null;
    },
    deleteDeliveryFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update delivery status
    updateDeliveryStatusRequest: (state, action: PayloadAction<{ deliveryId: string; status: Delivery['status'] }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateDeliveryStatusSuccess: (state, action: PayloadAction<{ deliveryId: string; status: Delivery['status'] }>) => {
      state.isLoading = false;
      const delivery = state.deliveries.find(delivery => delivery.id === action.payload.deliveryId);
      if (delivery) {
        delivery.status = action.payload.status;
        delivery.updatedAt = new Date().toISOString();
        if (action.payload.status === 'delivered') {
          delivery.actualDeliveryTime = new Date().toISOString();
        }
      }
      state.error = null;
    },
    updateDeliveryStatusFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Select delivery
    selectDelivery: (state, action: PayloadAction<Delivery | null>) => {
      state.selectedDelivery = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchDeliveriesRequest,
  fetchDeliveriesSuccess,
  fetchDeliveriesFailure,
  addDeliveryRequest,
  addDeliverySuccess,
  addDeliveryFailure,
  updateDeliveryRequest,
  updateDeliverySuccess,
  updateDeliveryFailure,
  deleteDeliveryRequest,
  deleteDeliverySuccess,
  deleteDeliveryFailure,
  updateDeliveryStatusRequest,
  updateDeliveryStatusSuccess,
  updateDeliveryStatusFailure,
  selectDelivery,
  clearError,
} = deliveriesSlice.actions;

export default deliveriesSlice.reducer;
