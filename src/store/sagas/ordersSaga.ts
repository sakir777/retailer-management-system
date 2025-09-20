import { call, put, takeEvery } from 'redux-saga/effects';
import {
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
} from '../slices/ordersSlice';
import { Order } from '../slices/ordersSlice';

// Mock API functions
const mockFetchOrders = async (): Promise<Order[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
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
  ];
};

const mockAddOrder = async (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    orderNumber: `ORD-${String(Date.now()).slice(-3)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newOrder;
};

const mockUpdateOrder = async (order: Order): Promise<Order> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    ...order,
    updatedAt: new Date().toISOString(),
  };
};

const mockDeleteOrder = async (orderId: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return orderId;
};

const mockUpdateOrderStatus = async (orderId: string, status: Order['status']): Promise<{ orderId: string; status: Order['status'] }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { orderId, status };
};

// Saga handlers
function* handleFetchOrders() {
  try {
    const orders = yield call(mockFetchOrders);
    yield put(fetchOrdersSuccess(orders));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchOrdersFailure(errorMessage));
  }
}

function* handleAddOrder(action: ReturnType<typeof addOrderRequest>) {
  try {
    const newOrder = yield call(mockAddOrder, action.payload);
    yield put(addOrderSuccess(newOrder));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(addOrderFailure(errorMessage));
  }
}

function* handleUpdateOrder(action: ReturnType<typeof updateOrderRequest>) {
  try {
    const updatedOrder = yield call(mockUpdateOrder, action.payload);
    yield put(updateOrderSuccess(updatedOrder));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(updateOrderFailure(errorMessage));
  }
}

function* handleDeleteOrder(action: ReturnType<typeof deleteOrderRequest>) {
  try {
    const orderId = yield call(mockDeleteOrder, action.payload);
    yield put(deleteOrderSuccess(orderId));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(deleteOrderFailure(errorMessage));
  }
}

function* handleUpdateOrderStatus(action: ReturnType<typeof updateOrderStatusRequest>) {
  try {
    const { orderId, status } = action.payload;
    const result = yield call(mockUpdateOrderStatus, orderId, status);
    yield put(updateOrderStatusSuccess(result));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(updateOrderStatusFailure(errorMessage));
  }
}

export default function* ordersSaga() {
  yield takeEvery(fetchOrdersRequest.type, handleFetchOrders);
  yield takeEvery(addOrderRequest.type, handleAddOrder);
  yield takeEvery(updateOrderRequest.type, handleUpdateOrder);
  yield takeEvery(deleteOrderRequest.type, handleDeleteOrder);
  yield takeEvery(updateOrderStatusRequest.type, handleUpdateOrderStatus);
}
