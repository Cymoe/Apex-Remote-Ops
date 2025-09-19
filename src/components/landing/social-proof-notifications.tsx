'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const notifications = [
  { name: 'James M.', location: 'Phoenix, AZ', action: 'just applied', time: '2 minutes ago' },
  { name: 'Sarah K.', location: 'Dallas, TX', action: 'secured territory', time: '5 minutes ago' },
  { name: 'Mike R.', location: 'Houston, TX', action: 'started application', time: '8 minutes ago' },
  { name: 'Jennifer L.', location: 'Austin, TX', action: 'watching video', time: '12 minutes ago' },
  { name: 'David B.', location: 'Miami, FL', action: 'just enrolled', time: '15 minutes ago' },
  { name: 'Lisa T.', location: 'Denver, CO', action: 'viewing page', time: '18 minutes ago' },
  { name: 'Robert W.', location: 'Atlanta, GA', action: 'downloaded guide', time: '22 minutes ago' },
  { name: 'Amanda S.', location: 'Nashville, TN', action: 'just applied', time: '25 minutes ago' },
  { name: 'Chris P.', location: 'Las Vegas, NV', action: 'checking availability', time: '28 minutes ago' },
  { name: 'Nicole H.', location: 'Seattle, WA', action: 'secured spot', time: '32 minutes ago' },
];

export function SocialProofNotifications() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Start showing notifications after 3 seconds
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isPaused && isVisible) {
      const interval = setInterval(() => {
        setIsVisible(false);
        
        setTimeout(() => {
          setCurrentNotification((prev) => (prev + 1) % notifications.length);
          setIsVisible(true);
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, isVisible, currentNotification]);

  const handleClose = () => {
    setIsVisible(false);
    setIsPaused(true);
  };

  const notification = notifications[currentNotification];

  if (!isVisible || !notification) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 animate-slide-up"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 pr-10 max-w-sm">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {notification.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {notification.name} from {notification.location}
            </p>
            <p className="text-sm text-gray-600">{notification.action}</p>
            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}