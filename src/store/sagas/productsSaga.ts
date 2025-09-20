import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} from '../slices/productsSlice';
import { Product } from '../slices/productsSlice';

// Mock API functions
const mockFetchProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      category: 'Electronics',
      stock: 50,
      sku: 'WH-001',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 299.99,
      category: 'Electronics',
      stock: 25,
      sku: 'SW-002',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Coffee Maker',
      description: 'Automatic drip coffee maker with programmable timer',
      price: 89.99,
      category: 'Appliances',
      stock: 15,
      sku: 'CM-003',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

const mockAddProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newProduct;
};

const mockUpdateProduct = async (product: Product): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    ...product,
    updatedAt: new Date().toISOString(),
  };
};

const mockDeleteProduct = async (productId: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return productId;
};

// Saga handlers
function* handleFetchProducts() {
  try {
    const products = yield call(mockFetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* handleAddProduct(action: ReturnType<typeof addProductRequest>) {
  try {
    const newProduct = yield call(mockAddProduct, action.payload);
    yield put(addProductSuccess(newProduct));
  } catch (error: any) {
    yield put(addProductFailure(error.message));
  }
}

function* handleUpdateProduct(action: ReturnType<typeof updateProductRequest>) {
  try {
    const updatedProduct = yield call(mockUpdateProduct, action.payload);
    yield put(updateProductSuccess(updatedProduct));
  } catch (error: any) {
    yield put(updateProductFailure(error.message));
  }
}

function* handleDeleteProduct(action: ReturnType<typeof deleteProductRequest>) {
  try {
    const productId = yield call(mockDeleteProduct, action.payload);
    yield put(deleteProductSuccess(productId));
  } catch (error: any) {
    yield put(deleteProductFailure(error.message));
  }
}

export default function* productsSaga() {
  yield takeEvery(fetchProductsRequest.type, handleFetchProducts);
  yield takeEvery(addProductRequest.type, handleAddProduct);
  yield takeEvery(updateProductRequest.type, handleUpdateProduct);
  yield takeEvery(deleteProductRequest.type, handleDeleteProduct);
}
