import { call, put, takeEvery, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';
import {
  fetchSettingsRequest,
  fetchSettingsSuccess,
  fetchSettingsFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  UserProfile,
  BillingInfo,
} from '../slices/settingsSlice';

// Mock API functions
const mockApiCall = (delay: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, delay));

const mockFetchSettings = async (): Promise<{ userProfile: UserProfile; billingInfo: BillingInfo }> => {
  await mockApiCall(800);
  
  // Mock user profile data
  const userProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced retailer with 10+ years in the industry',
    company: 'Retail Solutions Inc.',
    address: {
      street: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    updatedAt: new Date().toISOString(),
  };

  // Mock billing info
  const billingInfo = {
    plan: 'premium' as const,
    status: 'active' as const,
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    amount: 79,
    currency: 'USD',
    paymentMethod: {
      type: 'card' as const,
      last4: '4242',
      brand: 'Visa',
    },
  };

  return { userProfile, billingInfo };
};

const mockUpdateProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  await mockApiCall(600);
  
  // Simulate API response with updated profile
  const updatedProfile: UserProfile = {
    id: profileData.id || '1',
    name: profileData.name || 'John Doe',
    email: profileData.email || 'john.doe@example.com',
    phone: profileData.phone,
    avatar: profileData.avatar,
    bio: profileData.bio,
    company: profileData.company,
    address: profileData.address,
    updatedAt: new Date().toISOString(),
  };
  
  return updatedProfile;
};

const mockChangePassword = async (passwordData: { currentPassword: string; newPassword: string }) => {
  await mockApiCall(800);
  
  // Simulate password validation
  if (passwordData.currentPassword === 'wrongpassword') {
    throw new Error('Current password is incorrect');
  }
  
  if (passwordData.newPassword.length < 8) {
    throw new Error('New password must be at least 8 characters long');
  }
  
  return { success: true };
};

// Saga functions
function* fetchSettingsSaga(): Generator<CallEffect<{ userProfile: UserProfile; billingInfo: BillingInfo }> | PutEffect, void, { userProfile: UserProfile; billingInfo: BillingInfo }> {
  try {
    const data: { userProfile: UserProfile; billingInfo: BillingInfo } = yield call(mockFetchSettings);
    yield put(fetchSettingsSuccess(data));
  } catch (error) {
    yield put(fetchSettingsFailure(error instanceof Error ? error.message : 'Failed to fetch settings'));
  }
}

function* updateProfileSaga(action: ReturnType<typeof updateProfileRequest>): Generator<CallEffect<UserProfile> | PutEffect, void, UserProfile> {
  try {
    const updatedProfile: UserProfile = yield call(mockUpdateProfile, action.payload);
    yield put(updateProfileSuccess(updatedProfile));
  } catch (error) {
    yield put(updateProfileFailure(error instanceof Error ? error.message : 'Failed to update profile'));
  }
}

function* changePasswordSaga(action: ReturnType<typeof changePasswordRequest>): Generator<CallEffect<{ success: boolean }> | PutEffect, void, { success: boolean }> {
  try {
    const _result: { success: boolean } = yield call(mockChangePassword, action.payload);
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordFailure(error instanceof Error ? error.message : 'Failed to change password'));
  }
}

// Root saga
export default function* settingsSaga(): Generator<ForkEffect, void, unknown> {
  yield takeEvery(fetchSettingsRequest.type, fetchSettingsSaga);
  yield takeEvery(updateProfileRequest.type, updateProfileSaga);
  yield takeEvery(changePasswordRequest.type, changePasswordSaga);
}
