'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProductTable from '@/components/products/ProductTable';
import ProductModal from '@/components/products/ProductModal';
import { Plus } from 'lucide-react';
import { RootState } from '@/store';
import { Product, fetchProductsRequest, selectProduct } from '@/store/slices/productsSlice';

export default function InventoryPage() {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state: RootState) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(selectProduct(null));
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    dispatch(selectProduct(product));
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
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory and stock levels</p>
          </div>
          <button 
            onClick={handleAddProduct}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Products Table */}
        <ProductTable onEdit={handleEditProduct} />

        {/* Product Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      </div>
    </DashboardLayout>
  );
}
