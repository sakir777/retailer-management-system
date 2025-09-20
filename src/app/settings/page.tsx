'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, User, Bell, Shield, CreditCard, Loader2 } from 'lucide-react';
import { RootState } from '@/store';
import { 
  fetchSettingsRequest, 
  openModal, 
  closeModal
} from '@/store/slices/settingsSlice';
import ProfileModal from '@/components/settings/ProfileModal';
import NotificationSettingsModal from '@/components/settings/NotificationSettingsModal';
import SecurityModal from '@/components/settings/SecurityModal';
import BillingModal from '@/components/settings/BillingModal';
import ApplicationSettingsModal from '@/components/settings/ApplicationSettingsModal';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { 
    isLoading, 
    isModalOpen, 
    userProfile, 
    notificationSettings, 
    securitySettings, 
    billingInfo, 
    applicationSettings 
  } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    // Fetch settings data when component mounts
    dispatch(fetchSettingsRequest());
  }, [dispatch]);

  const handleModalOpen = (modalType: keyof typeof isModalOpen) => {
    dispatch(openModal(modalType));
  };

  const handleModalClose = (modalType: keyof typeof isModalOpen) => {
    dispatch(closeModal(modalType));
  };


  if (isLoading && !userProfile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="text-lg text-gray-600">Loading settings...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
        </div>

        {/* Settings Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Update your personal information and profile details.
            </p>
            <button 
              onClick={() => handleModalOpen('profile')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Profile
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Configure your notification preferences and alerts.
            </p>
            <button 
              onClick={() => handleModalOpen('notifications')}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Manage Notifications
            </button>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage your password and security settings.
            </p>
            <button 
              onClick={() => handleModalOpen('security')}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Security Settings
            </button>
          </div>

          {/* Billing */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Billing</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage your subscription and billing information.
            </p>
            <button 
              onClick={() => handleModalOpen('billing')}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Billing Settings
            </button>
          </div>

          {/* Application Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Application</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Configure application preferences and settings.
            </p>
            <button 
              onClick={() => handleModalOpen('application')}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
            >
              App Settings
            </button>
          </div>
        </div>

        {/* Quick Settings Overview */}
        {userProfile && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Current Plan</div>
                <div className="text-lg font-semibold text-blue-900 capitalize">
                  {billingInfo?.plan || 'Premium'}
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Notifications</div>
                <div className="text-lg font-semibold text-green-900">
                  {notificationSettings.emailNotifications ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-600 font-medium">Security</div>
                <div className="text-lg font-semibold text-red-900">
                  {securitySettings.twoFactorEnabled ? '2FA On' : '2FA Off'}
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-orange-600 font-medium">Theme</div>
                <div className="text-lg font-semibold text-orange-900 capitalize">
                  {applicationSettings.theme}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <ProfileModal 
          isOpen={isModalOpen.profile} 
          onClose={() => handleModalClose('profile')}
          userProfile={userProfile}
        />
        
        <NotificationSettingsModal 
          isOpen={isModalOpen.notifications} 
          onClose={() => handleModalClose('notifications')}
          notificationSettings={notificationSettings}
        />
        
        <SecurityModal 
          isOpen={isModalOpen.security} 
          onClose={() => handleModalClose('security')}
          securitySettings={securitySettings}
        />
        
        <BillingModal 
          isOpen={isModalOpen.billing} 
          onClose={() => handleModalClose('billing')}
          billingInfo={billingInfo}
        />
        
        <ApplicationSettingsModal 
          isOpen={isModalOpen.application} 
          onClose={() => handleModalClose('application')}
          applicationSettings={applicationSettings}
        />
      </div>
    </DashboardLayout>
  );
}
