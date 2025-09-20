import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  company?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  updatedAt: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  inventoryAlerts: boolean;
  deliveryUpdates: boolean;
  marketingEmails: boolean;
  weeklyReports: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  sessionTimeout: number; // in minutes
  passwordLastChanged: string;
}

export interface BillingInfo {
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'past_due';
  nextBillingDate: string;
  amount: number;
  currency: string;
  paymentMethod: {
    type: 'card' | 'bank';
    last4: string;
    brand?: string;
  };
}

export interface ApplicationSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  units: 'metric' | 'imperial';
  autoSave: boolean;
  notificationsSound: boolean;
  dashboardRefresh: number; // in seconds
}

interface SettingsState {
  userProfile: UserProfile | null;
  notificationSettings: NotificationSettings;
  securitySettings: SecuritySettings;
  billingInfo: BillingInfo | null;
  applicationSettings: ApplicationSettings;
  isLoading: boolean;
  error: string | null;
  isModalOpen: {
    profile: boolean;
    notifications: boolean;
    security: boolean;
    billing: boolean;
    application: boolean;
  };
}

const initialNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  orderUpdates: true,
  inventoryAlerts: true,
  deliveryUpdates: true,
  marketingEmails: false,
  weeklyReports: true,
};

const initialSecuritySettings: SecuritySettings = {
  twoFactorEnabled: false,
  loginAlerts: true,
  sessionTimeout: 30,
  passwordLastChanged: new Date().toISOString(),
};

const initialApplicationSettings: ApplicationSettings = {
  theme: 'light',
  language: 'en',
  timezone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD',
  units: 'imperial',
  autoSave: true,
  notificationsSound: true,
  dashboardRefresh: 30,
};

const initialState: SettingsState = {
  userProfile: null,
  notificationSettings: initialNotificationSettings,
  securitySettings: initialSecuritySettings,
  billingInfo: null,
  applicationSettings: initialApplicationSettings,
  isLoading: false,
  error: null,
  isModalOpen: {
    profile: false,
    notifications: false,
    security: false,
    billing: false,
    application: false,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Fetch settings
    fetchSettingsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSettingsSuccess: (state, action: PayloadAction<{
      userProfile: UserProfile;
      billingInfo: BillingInfo;
    }>) => {
      state.isLoading = false;
      state.userProfile = action.payload.userProfile;
      state.billingInfo = action.payload.billingInfo;
      state.error = null;
    },
    fetchSettingsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Profile management
    updateProfileRequest: (state, _action: PayloadAction<Partial<UserProfile>>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isLoading = false;
      state.userProfile = action.payload;
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Notification settings
    updateNotificationSettings: (state, action: PayloadAction<Partial<NotificationSettings>>) => {
      state.notificationSettings = { ...state.notificationSettings, ...action.payload };
    },

    // Security settings
    updateSecuritySettings: (state, action: PayloadAction<Partial<SecuritySettings>>) => {
      state.securitySettings = { ...state.securitySettings, ...action.payload };
    },
    changePasswordRequest: (state, _action: PayloadAction<{ currentPassword: string; newPassword: string }>) => {
      state.isLoading = true;
      state.error = null;
    },
    changePasswordSuccess: (state) => {
      state.isLoading = false;
      state.securitySettings.passwordLastChanged = new Date().toISOString();
      state.error = null;
    },
    changePasswordFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Billing management
    updateBillingInfo: (state, action: PayloadAction<Partial<BillingInfo>>) => {
      if (state.billingInfo) {
        state.billingInfo = { ...state.billingInfo, ...action.payload };
      }
    },

    // Application settings
    updateApplicationSettings: (state, action: PayloadAction<Partial<ApplicationSettings>>) => {
      state.applicationSettings = { ...state.applicationSettings, ...action.payload };
    },

    // Modal management
    openModal: (state, action: PayloadAction<keyof SettingsState['isModalOpen']>) => {
      state.isModalOpen[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof SettingsState['isModalOpen']>) => {
      state.isModalOpen[action.payload] = false;
    },
    closeAllModals: (state) => {
      state.isModalOpen = {
        profile: false,
        notifications: false,
        security: false,
        billing: false,
        application: false,
      };
    },

    // Error management
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSettingsRequest,
  fetchSettingsSuccess,
  fetchSettingsFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updateNotificationSettings,
  updateSecuritySettings,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  updateBillingInfo,
  updateApplicationSettings,
  openModal,
  closeModal,
  closeAllModals,
  clearError,
} = settingsSlice.actions;

export default settingsSlice.reducer;
