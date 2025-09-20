import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
  fetchRevenueDataRequest,
  fetchRevenueDataSuccess,
  fetchRevenueDataFailure,
  fetchOrderDistributionRequest,
  fetchOrderDistributionSuccess,
  fetchOrderDistributionFailure,
} from '../slices/dashboardSlice';

// Mock API functions
const mockFetchStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    totalOrders: 1247,
    monthlyIncome: 45680,
    activeProducts: 89,
    pendingDeliveries: 23,
  };
};

const mockFetchRevenueData = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: 28000 },
  ];
};

const mockFetchOrderDistribution = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { status: 'Pending', count: 45, color: 'bg-yellow-500' },
    { status: 'Confirmed', count: 78, color: 'bg-blue-500' },
    { status: 'Preparing', count: 32, color: 'bg-orange-500' },
    { status: 'Out for Delivery', count: 19, color: 'bg-purple-500' },
    { status: 'Delivered', count: 156, color: 'bg-green-500' },
    { status: 'Cancelled', count: 8, color: 'bg-red-500' },
  ];
};

function* handleFetchStats() {
  try {
    const stats = yield call(mockFetchStats);
    yield put(fetchStatsSuccess(stats));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
}

function* handleFetchRevenueData() {
  try {
    const revenueData = yield call(mockFetchRevenueData);
    yield put(fetchRevenueDataSuccess(revenueData));
  } catch (error: any) {
    yield put(fetchRevenueDataFailure(error.message));
  }
}

function* handleFetchOrderDistribution() {
  try {
    const orderDistribution = yield call(mockFetchOrderDistribution);
    yield put(fetchOrderDistributionSuccess(orderDistribution));
  } catch (error: any) {
    yield put(fetchOrderDistributionFailure(error.message));
  }
}

export default function* dashboardSaga() {
  yield takeEvery(fetchStatsRequest.type, handleFetchStats);
  yield takeEvery(fetchRevenueDataRequest.type, handleFetchRevenueData);
  yield takeEvery(fetchOrderDistributionRequest.type, handleFetchOrderDistribution);
}
