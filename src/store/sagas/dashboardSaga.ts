import { call, put, takeEvery, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';
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
  Stats,
  RevenueData,
  OrderDistribution,
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

function* handleFetchStats(): Generator<CallEffect<Stats> | PutEffect, void, Stats> {
  try {
    const stats: Stats = yield call(mockFetchStats);
    yield put(fetchStatsSuccess(stats));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchStatsFailure(errorMessage));
  }
}

function* handleFetchRevenueData(): Generator<CallEffect<RevenueData[]> | PutEffect, void, RevenueData[]> {
  try {
    const revenueData: RevenueData[] = yield call(mockFetchRevenueData);
    yield put(fetchRevenueDataSuccess(revenueData));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchRevenueDataFailure(errorMessage));
  }
}

function* handleFetchOrderDistribution(): Generator<CallEffect<OrderDistribution[]> | PutEffect, void, OrderDistribution[]> {
  try {
    const orderDistribution: OrderDistribution[] = yield call(mockFetchOrderDistribution);
    yield put(fetchOrderDistributionSuccess(orderDistribution));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    yield put(fetchOrderDistributionFailure(errorMessage));
  }
}

export default function* dashboardSaga(): Generator<ForkEffect, void, unknown> {
  yield takeEvery(fetchStatsRequest.type, handleFetchStats);
  yield takeEvery(fetchRevenueDataRequest.type, handleFetchRevenueData);
  yield takeEvery(fetchOrderDistributionRequest.type, handleFetchOrderDistribution);
}
