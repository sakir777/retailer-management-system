'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OrderTable from '@/components/orders/OrderTable';
import OrderModal from '@/components/orders/OrderModal';
import { Plus } from 'lucide-react';
import { RootState } from '@/store';
import { Order, fetchOrdersRequest, selectOrder } from '@/store/slices/ordersSlice';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state: RootState) => state.orders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  const handleAddOrder = () => {
    dispatch(selectOrder(null));
    setIsModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    dispatch(selectOrder(order));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Track and manage customer orders</p>
          </div>
          <button 
            onClick={handleAddOrder}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Order</span>
          </button>
        </div>

        {/* Orders Table */}
        <OrderTable onEdit={handleEditOrder} />

        {/* Order Modal */}
        <OrderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      </div>
    </DashboardLayout>
  );
}
