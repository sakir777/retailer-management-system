'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Truck, Plus, Search, Filter } from 'lucide-react';

export default function DeliveriesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Delivery Management</h1>
            <p className="text-gray-600 mt-1">Track and manage delivery operations</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Schedule Delivery</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search deliveries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Management</h3>
          <p className="text-gray-600 mb-6">
            This page will contain your delivery tracking and management features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Delivery Tracking</h4>
              <p className="text-sm text-gray-600">Real-time tracking of delivery status</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Route Optimization</h4>
              <p className="text-sm text-gray-600">Optimize delivery routes for efficiency</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Delivery Analytics</h4>
              <p className="text-sm text-gray-600">Analyze delivery performance and metrics</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
