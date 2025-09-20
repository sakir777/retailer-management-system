'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { NotificationSettings, updateNotificationSettings, clearError } from '@/store/slices/settingsSlice';
import { X, Save, Bell, Mail, Smartphone, AlertTriangle, Truck, TrendingUp, BarChart3 } from 'lucide-react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationSettings?: NotificationSettings;
}

export default function NotificationSettingsModal({ isOpen, onClose, notificationSettings }: NotificationSettingsModalProps) {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.settings);
  
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    inventoryAlerts: true,
    deliveryUpdates: true,
    marketingEmails: false,
    weeklyReports: true,
  });

  useEffect(() => {
    if (notificationSettings) {
      setSettings(notificationSettings);
    }
  }, [notificationSettings]);

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateNotificationSettings(settings));
    onClose();
  };

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  if (!isOpen) return null;

  const notificationCategories = [
    {
      key: 'emailNotifications' as keyof NotificationSettings,
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      key: 'pushNotifications' as keyof NotificationSettings,
      title: 'Push Notifications',
      description: 'Receive push notifications in your browser',
      icon: Smartphone,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      key: 'orderUpdates' as keyof NotificationSettings,
      title: 'Order Updates',
      description: 'Get notified about order status changes',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      key: 'inventoryAlerts' as keyof NotificationSettings,
      title: 'Inventory Alerts',
      description: 'Receive alerts when inventory is low',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      key: 'deliveryUpdates' as keyof NotificationSettings,
      title: 'Delivery Updates',
      description: 'Get notified about delivery status changes',
      icon: Truck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      key: 'marketingEmails' as keyof NotificationSettings,
      title: 'Marketing Emails',
      description: 'Receive promotional emails and updates',
      icon: Mail,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      key: 'weeklyReports' as keyof NotificationSettings,
      title: 'Weekly Reports',
      description: 'Receive weekly performance reports',
      icon: BarChart3,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <p className="text-gray-600">
              Choose which notifications you&apos;d like to receive. You can always change these settings later.
            </p>

            {notificationCategories.map((category) => {
              const IconComponent = category.icon;
              const isEnabled = settings[category.key];
              
              return (
                <div
                  key={category.key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleToggle(category.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isEnabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Notification Frequency</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    You&apos;ll receive notifications based on your settings above. 
                    Email notifications are sent immediately, while push notifications 
                    appear in real-time when you have the application open.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-900">Important Notifications</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Critical alerts like low inventory and failed deliveries will 
                    always be sent regardless of your notification preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
