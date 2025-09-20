'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Delivery, selectDelivery, deleteDeliveryRequest, updateDeliveryStatusRequest } from '@/store/slices/deliveriesSlice';
import { Edit, Trash2, Search, Filter, Truck, MapPin, Clock } from 'lucide-react';

interface DeliveryTableProps {
  onEdit: (delivery: Delivery) => void;
}

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  in_transit: 'bg-yellow-100 text-yellow-800',
  delivered: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export default function DeliveryTable({ onEdit }: DeliveryTableProps) {
  const dispatch = useDispatch();
  const { deliveries, isLoading } = useSelector((state: RootState) => state.deliveries);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState<'deliveryNumber' | 'customerName' | 'scheduledDate' | 'status'>('scheduledDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique statuses for filter
  const statuses = Array.from(new Set(deliveries.map(delivery => delivery.status)));

  // Filter and sort deliveries
  const filteredDeliveries = deliveries
    .filter(delivery => {
      const matchesSearch = delivery.deliveryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           delivery.driverName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || delivery.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'deliveryNumber':
          aValue = a.deliveryNumber.toLowerCase();
          bValue = b.deliveryNumber.toLowerCase();
          break;
        case 'customerName':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        case 'scheduledDate':
          aValue = new Date(a.scheduledDate).getTime();
          bValue = new Date(b.scheduledDate).getTime();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          aValue = new Date(a.scheduledDate).getTime();
          bValue = new Date(b.scheduledDate).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleDelete = (deliveryId: string) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      dispatch(deleteDeliveryRequest(deliveryId));
    }
  };

  const handleStatusChange = (deliveryId: string, newStatus: Delivery['status']) => {
    dispatch(updateDeliveryStatusRequest({ deliveryId, status: newStatus }));
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search deliveries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('deliveryNumber')}
                >
                  Delivery # {getSortIcon('deliveryNumber')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('customerName')}
                >
                  Customer {getSortIcon('customerName')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('scheduledDate')}
                >
                  Scheduled {getSortIcon('scheduledDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  Status {getSortIcon('status')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No deliveries found
                  </td>
                </tr>
              ) : (
                filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {delivery.deliveryNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {delivery.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {delivery.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {delivery.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="truncate max-w-xs">
                            {delivery.deliveryAddress.street}, {delivery.deliveryAddress.city}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {delivery.deliveryAddress.state} {delivery.deliveryAddress.zipCode}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          {formatDate(delivery.scheduledDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(delivery.scheduledTime)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {delivery.driverName || 'Unassigned'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {delivery.vehicleNumber || 'No vehicle'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[delivery.status]}`}>
                          {delivery.status.replace('_', ' ').charAt(0).toUpperCase() + delivery.status.replace('_', ' ').slice(1)}
                        </span>
                        <select
                          value={delivery.status}
                          onChange={(e) => handleStatusChange(delivery.id, e.target.value as Delivery['status'])}
                          className="text-xs border-0 bg-transparent focus:ring-0 p-0"
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="failed">Failed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onEdit(delivery)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit Delivery"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(delivery.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete Delivery"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{deliveries.length}</div>
            <div className="text-sm text-gray-600">Total Deliveries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {deliveries.filter(delivery => delivery.status === 'scheduled').length}
            </div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {deliveries.filter(delivery => delivery.status === 'in_transit').length}
            </div>
            <div className="text-sm text-gray-600">In Transit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {deliveries.filter(delivery => delivery.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600">Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {deliveries.filter(delivery => delivery.status === 'failed').length}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
