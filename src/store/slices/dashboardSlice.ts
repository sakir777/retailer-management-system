import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Stats {
  totalOrders: number;
  monthlyIncome: number;
  activeProducts: number;
  pendingDeliveries: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface OrderDistribution {
  status: string;
  count: number;
  color: string;
}

interface DashboardState {
  stats: Stats | null;
  revenueData: RevenueData[];
  orderDistribution: OrderDistribution[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  revenueData: [],
  orderDistribution: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchStatsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action: PayloadAction<Stats>) => {
      state.isLoading = false;
      state.stats = action.payload;
      state.error = null;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchRevenueDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRevenueDataSuccess: (state, action: PayloadAction<RevenueData[]>) => {
      state.isLoading = false;
      state.revenueData = action.payload;
      state.error = null;
    },
    fetchRevenueDataFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchOrderDistributionRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchOrderDistributionSuccess: (state, action: PayloadAction<OrderDistribution[]>) => {
      state.isLoading = false;
      state.orderDistribution = action.payload;
      state.error = null;
    },
    fetchOrderDistributionFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
  fetchRevenueDataRequest,
  fetchRevenueDataSuccess,
  fetchRevenueDataFailure,
  fetchOrderDistributionRequest,
  fetchOrderDistributionSuccess,
  fetchOrderDistributionFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
