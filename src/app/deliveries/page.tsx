'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DeliveryTable from '@/components/deliveries/DeliveryTable';
import DeliveryModal from '@/components/deliveries/DeliveryModal';
import { Plus } from 'lucide-react';
import { RootState } from '@/store';
import { Delivery, fetchDeliveriesRequest, selectDelivery } from '@/store/slices/deliveriesSlice';

export default function DeliveriesPage() {
  const dispatch = useDispatch();
  const { selectedDelivery } = useSelector((state: RootState) => state.deliveries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDeliveriesRequest());
  }, [dispatch]);

  const handleAddDelivery = () => {
    dispatch(selectDelivery(null));
    setIsModalOpen(true);
  };

  const handleEditDelivery = (delivery: Delivery) => {
    dispatch(selectDelivery(delivery));
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
            <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>
            <p className="text-gray-600 mt-1">Track and manage delivery operations</p>
          </div>
          <button 
            onClick={handleAddDelivery}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Schedule Delivery</span>
          </button>
        </div>

        {/* Deliveries Table */}
        <DeliveryTable onEdit={handleEditDelivery} />

        {/* Delivery Modal */}
        <DeliveryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          delivery={selectedDelivery}
        />
      </div>
    </DashboardLayout>
  );
}
