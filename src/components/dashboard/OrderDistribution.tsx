'use client';

import { OrderDistribution as OrderDistributionType } from '@/store/slices/dashboardSlice';

interface OrderDistributionProps {
  data: OrderDistributionType[];
}

export default function OrderDistribution({ data }: OrderDistributionProps) {
  const totalOrders = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Status Distribution</h3>
        <p className="text-sm text-gray-600">Current order status breakdown</p>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = totalOrders > 0 ? (item.count / totalOrders) * 100 : 0;
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.status}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Orders</span>
          <span className="text-lg font-bold text-gray-900">{totalOrders}</span>
        </div>
      </div>
    </div>
  );
}
