import { call, put, takeEvery } from 'redux-saga/effects';
import {
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
} from '../slices/deliveriesSlice';
import { Delivery } from '../slices/deliveriesSlice';

// Mock API functions
const mockFetchDeliveries = async (): Promise<Delivery[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
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
  ];
};

const mockAddDelivery = async (delivery: Omit<Delivery, 'id' | 'deliveryNumber' | 'createdAt' | 'updatedAt'>): Promise<Delivery> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newDelivery: Delivery = {
    ...delivery,
    id: Date.now().toString(),
    deliveryNumber: `DEL-${String(Date.now()).slice(-3)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newDelivery;
};

const mockUpdateDelivery = async (delivery: Delivery): Promise<Delivery> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    ...delivery,
    updatedAt: new Date().toISOString(),
  };
};

const mockDeleteDelivery = async (deliveryId: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return deliveryId;
};

const mockUpdateDeliveryStatus = async (deliveryId: string, status: Delivery['status']): Promise<{ deliveryId: string; status: Delivery['status'] }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { deliveryId, status };
};

// Saga handlers
function* handleFetchDeliveries() {
  try {
    const deliveries = yield call(mockFetchDeliveries);
    yield put(fetchDeliveriesSuccess(deliveries));
  } catch (error: any) {
    yield put(fetchDeliveriesFailure(error.message));
  }
}

function* handleAddDelivery(action: ReturnType<typeof addDeliveryRequest>) {
  try {
    const newDelivery = yield call(mockAddDelivery, action.payload);
    yield put(addDeliverySuccess(newDelivery));
  } catch (error: any) {
    yield put(addDeliveryFailure(error.message));
  }
}

function* handleUpdateDelivery(action: ReturnType<typeof updateDeliveryRequest>) {
  try {
    const updatedDelivery = yield call(mockUpdateDelivery, action.payload);
    yield put(updateDeliverySuccess(updatedDelivery));
  } catch (error: any) {
    yield put(updateDeliveryFailure(error.message));
  }
}

function* handleDeleteDelivery(action: ReturnType<typeof deleteDeliveryRequest>) {
  try {
    const deliveryId = yield call(mockDeleteDelivery, action.payload);
    yield put(deleteDeliverySuccess(deliveryId));
  } catch (error: any) {
    yield put(deleteDeliveryFailure(error.message));
  }
}

function* handleUpdateDeliveryStatus(action: ReturnType<typeof updateDeliveryStatusRequest>) {
  try {
    const { deliveryId, status } = action.payload;
    const result = yield call(mockUpdateDeliveryStatus, deliveryId, status);
    yield put(updateDeliveryStatusSuccess(result));
  } catch (error: any) {
    yield put(updateDeliveryStatusFailure(error.message));
  }
}

export default function* deliveriesSaga() {
  yield takeEvery(fetchDeliveriesRequest.type, handleFetchDeliveries);
  yield takeEvery(addDeliveryRequest.type, handleAddDelivery);
  yield takeEvery(updateDeliveryRequest.type, handleUpdateDelivery);
  yield takeEvery(deleteDeliveryRequest.type, handleDeleteDelivery);
  yield takeEvery(updateDeliveryStatusRequest.type, handleUpdateDeliveryStatus);
}
