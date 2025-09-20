'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  fetchStatsRequest,
  fetchRevenueDataRequest,
  fetchOrderDistributionRequest,
} from '@/store/slices/dashboardSlice';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import StatsCard from '@/components/dashboard/StatsCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrderDistribution from '@/components/dashboard/OrderDistribution';
import {
  ShoppingCart,
  DollarSign,
  Package,
  Truck,
} from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, revenueData, orderDistribution, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchStatsRequest());
    dispatch(fetchRevenueDataRequest());
    dispatch(fetchOrderDistributionRequest());
  }, [dispatch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Card */}
        <WelcomeCard />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Orders"
            value={stats ? formatNumber(stats.totalOrders) : '0'}
            change={12}
            changeType="increase"
            icon={<ShoppingCart className="h-6 w-6 text-white" />}
            color="bg-blue-500"
          />
          <StatsCard
            title="Monthly Income"
            value={stats ? formatCurrency(stats.monthlyIncome) : '$0'}
            change={8}
            changeType="increase"
            icon={<DollarSign className="h-6 w-6 text-white" />}
            color="bg-green-500"
          />
          <StatsCard
            title="Active Products"
            value={stats ? formatNumber(stats.activeProducts) : '0'}
            change={-2}
            changeType="decrease"
            icon={<Package className="h-6 w-6 text-white" />}
            color="bg-purple-500"
          />
          <StatsCard
            title="Pending Deliveries"
            value={stats ? formatNumber(stats.pendingDeliveries) : '0'}
            change={5}
            changeType="increase"
            icon={<Truck className="h-6 w-6 text-white" />}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-1">
            <RevenueChart data={revenueData} />
          </div>

          {/* Order Distribution */}
          <div className="lg:col-span-1">
            <OrderDistribution data={orderDistribution} />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading dashboard data...</span>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
