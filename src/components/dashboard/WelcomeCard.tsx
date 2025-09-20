'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Calendar, Clock } from 'lucide-react';

export default function WelcomeCard() {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const currentDateString = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className="text-blue-100 mb-4">
            Here's what's happening with your retail business today.
          </p>
          <div className="flex items-center space-x-4 text-sm text-blue-100">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{currentDateString}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-black">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
