import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  selectedOrder: Order | null;
}

const initialState: OrdersState = {
  orders: [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+1-555-0123',
      items: [
        {
          productId: '1',
          productName: 'Wireless Headphones',
          quantity: 2,
          price: 199.99,
        },
        {
          productId: '2',
          productName: 'Smart Watch',
          quantity: 1,
          price: 299.99,
        },
      ],
      totalAmount: 699.97,
      status: 'processing',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      orderDate: new Date().toISOString(),
      notes: 'Please handle with care',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      customerPhone: '+1-555-0456',
      items: [
        {
          productId: '3',
          productName: 'Coffee Maker',
          quantity: 1,
          price: 89.99,
        },
      ],
      totalAmount: 89.99,
      status: 'pending',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
      },
      orderDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  isLoading: false,
  error: null,
  selectedOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Fetch orders
    fetchOrdersRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.error = null;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Add order
    addOrderRequest: (state, _action: PayloadAction<Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>>) => {
      state.isLoading = true;
      state.error = null;
    },
    addOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      state.orders.push(action.payload);
      state.error = null;
    },
    addOrderFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update order
    updateOrderRequest: (state, _action: PayloadAction<Order>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      state.error = null;
    },
    updateOrderFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete order
    deleteOrderRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteOrderSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.orders = state.orders.filter(order => order.id !== action.payload);
      state.error = null;
    },
    deleteOrderFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update order status
    updateOrderStatusRequest: (state, _action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateOrderStatusSuccess: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      state.isLoading = false;
      const order = state.orders.find(order => order.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
      }
      state.error = null;
    },
    updateOrderStatusFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Select order
    selectOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addOrderRequest,
  addOrderSuccess,
  addOrderFailure,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
  selectOrder,
  clearError,
} = ordersSlice.actions;

export default ordersSlice.reducer;
