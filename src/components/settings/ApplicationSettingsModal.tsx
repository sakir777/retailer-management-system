'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ApplicationSettings, updateApplicationSettings, clearError } from '@/store/slices/settingsSlice';
import { X, Save, Settings, Palette, Globe, Clock, DollarSign, Ruler, Save as SaveIcon, Volume2 } from 'lucide-react';

interface ApplicationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationSettings?: ApplicationSettings;
}

export default function ApplicationSettingsModal({ isOpen, onClose, applicationSettings }: ApplicationSettingsModalProps) {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.settings);
  
  const [settings, setSettings] = useState<ApplicationSettings>({
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    units: 'imperial',
    autoSave: true,
    notificationsSound: true,
    dashboardRefresh: 30,
  });

  useEffect(() => {
    if (applicationSettings) {
      setSettings(applicationSettings);
    }
  }, [applicationSettings]);

  const handleSettingChange = (key: keyof ApplicationSettings, value: ApplicationSettings[keyof ApplicationSettings]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateApplicationSettings(settings));
    onClose();
  };

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  if (!isOpen) return null;

  const themes = [
    { value: 'light', label: 'Light', description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark', description: 'Easy on the eyes' },
    { value: 'auto', label: 'Auto', description: 'Follows system preference' },
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' },
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  ];

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '12/25/2023' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '25/12/2023' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2023-12-25' },
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY', example: '25-12-2023' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
  ];

  const refreshIntervals = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
    { value: 600, label: '10 minutes' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Settings className="h-6 w-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Application Settings</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Appearance */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Appearance</span>
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => handleSettingChange('theme', theme.value)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      settings.theme === theme.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{theme.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Language & Region</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  id="timezone"
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Date & Time</span>
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Date Format</label>
              <div className="grid grid-cols-2 gap-3">
                {dateFormats.map((format) => (
                  <button
                    key={format.value}
                    type="button"
                    onClick={() => handleSettingChange('dateFormat', format.value)}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      settings.dateFormat === format.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{format.label}</div>
                    <div className="text-sm text-gray-600 mt-1">{format.example}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Currency & Units */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Currency & Units</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  {currencies.map((curr) => (
                    <option key={curr.value} value={curr.value}>
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Measurement Units</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleSettingChange('units', 'metric')}
                    className={`flex-1 p-3 border-2 rounded-lg text-center transition-all ${
                      settings.units === 'metric'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Ruler className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-medium text-gray-900">Metric</div>
                    <div className="text-sm text-gray-600">kg, cm, m</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSettingChange('units', 'imperial')}
                    className={`flex-1 p-3 border-2 rounded-lg text-center transition-all ${
                      settings.units === 'imperial'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Ruler className="h-5 w-5 mx-auto mb-1" />
                    <div className="font-medium text-gray-900">Imperial</div>
                    <div className="text-sm text-gray-600">lb, ft, in</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Behavior */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <SaveIcon className="h-5 w-5" />
              <span>Behavior</span>
            </h3>

            <div className="space-y-4">
              {/* Auto Save */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <SaveIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Auto Save</h4>
                    <p className="text-sm text-gray-500">Automatically save changes as you work</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Notification Sound */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Volume2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Notification Sound</h4>
                    <p className="text-sm text-gray-500">Play sounds for notifications</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSettingChange('notificationsSound', !settings.notificationsSound)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.notificationsSound ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notificationsSound ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Dashboard Refresh */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Dashboard Refresh Rate</h4>
                    <p className="text-sm text-gray-500">How often the dashboard updates automatically</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {refreshIntervals.map((interval) => (
                    <button
                      key={interval.value}
                      type="button"
                      onClick={() => handleSettingChange('dashboardRefresh', interval.value)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        settings.dashboardRefresh === interval.value
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {interval.label}
                    </button>
                  ))}
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
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2 transition-colors"
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
