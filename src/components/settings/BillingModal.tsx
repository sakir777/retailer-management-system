'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { BillingInfo, updateBillingInfo, clearError } from '@/store/slices/settingsSlice';
import { X, CreditCard, Calendar, DollarSign, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  billingInfo?: BillingInfo | null;
}

export default function BillingModal({ isOpen, onClose, billingInfo }: BillingModalProps) {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.settings);
  
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise'>('premium');
  const [isChangingPlan, setIsChangingPlan] = useState(false);

  useEffect(() => {
    if (billingInfo) {
      setSelectedPlan(billingInfo.plan);
    }
  }, [billingInfo]);

  const handleClose = () => {
    dispatch(clearError());
    setIsChangingPlan(false);
    onClose();
  };

  const handlePlanChange = (plan: 'basic' | 'premium' | 'enterprise') => {
    setSelectedPlan(plan);
    setIsChangingPlan(true);
  };

  const confirmPlanChange = () => {
    if (billingInfo) {
      dispatch(updateBillingInfo({
        ...billingInfo,
        plan: selectedPlan,
      }));
    }
    setIsChangingPlan(false);
  };

  const cancelPlanChange = () => {
    if (billingInfo) {
      setSelectedPlan(billingInfo.plan);
    }
    setIsChangingPlan(false);
  };

  if (!isOpen) return null;

  const plans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: 29,
      description: 'Perfect for small businesses',
      features: [
        'Up to 100 products',
        'Basic order management',
        'Email support',
        'Standard reporting',
      ],
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: 79,
      description: 'Most popular for growing businesses',
      features: [
        'Up to 1,000 products',
        'Advanced order management',
        'Priority support',
        'Advanced analytics',
        'Inventory alerts',
        'API access',
      ],
      color: 'border-blue-500',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: true,
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      price: 199,
      description: 'For large-scale operations',
      features: [
        'Unlimited products',
        'Full order management suite',
        '24/7 phone support',
        'Custom analytics',
        'Advanced inventory management',
        'Full API access',
        'Custom integrations',
        'Dedicated account manager',
      ],
      color: 'border-purple-500',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'past_due':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4" />;
      case 'past_due':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Billing & Subscription</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Current Subscription */}
          {billingInfo && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Current Subscription</h3>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 capitalize">
                      {billingInfo.plan} Plan
                    </h4>
                    <p className="text-sm text-gray-600">
                      ${billingInfo.amount}/{billingInfo.currency === 'USD' ? 'month' : 'year'}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(billingInfo.status)}`}>
                    {getStatusIcon(billingInfo.status)}
                    <span className="capitalize">{billingInfo.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Next billing:</span>
                    <span className="font-medium">{new Date(billingInfo.nextBillingDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Payment method:</span>
                    <span className="font-medium">
                      {billingInfo.paymentMethod.brand} •••• {billingInfo.paymentMethod.last4}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">${billingInfo.amount}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                    <ExternalLink className="h-4 w-4" />
                    <span>Update Payment Method</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700">
                    <ExternalLink className="h-4 w-4" />
                    <span>Download Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Plan Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Choose Your Plan</h3>
              {isChangingPlan && (
                <div className="flex space-x-2">
                  <button
                    onClick={cancelPlanChange}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPlanChange}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Confirm Change
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? `${plan.color} bg-opacity-5`
                      : 'border-gray-200 hover:border-gray-300'
                  } ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                  onClick={() => handlePlanChange(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                    
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>

                    <button
                      className={`w-full mt-6 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                        selectedPlan === plan.id
                          ? plan.buttonColor
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                    </button>
                  </div>

                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Features included:</h5>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Payment Methods</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Manage your payment methods and billing information securely.
                    </p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Manage Payment Methods →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900">Billing History</h4>
                    <p className="text-sm text-green-700 mt-1">
                      View and download your past invoices and payment history.
                    </p>
                    <button className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium">
                      View Billing History →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
