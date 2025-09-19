'use client';

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { CountdownTimer } from './countdown-timer';

interface UrgencyBarProps {
  spotsRemaining?: number;
}

export function UrgencyBar({ 
  spotsRemaining: initialSpots = 5
}: UrgencyBarProps) {
  const [spotsRemaining, setSpotsRemaining] = useState(initialSpots);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Make bar sticky after scrolling
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate spot reduction over time
  useEffect(() => {
    const timer = setTimeout(() => {
      if (spotsRemaining > 2 && Math.random() > 0.7) {
        setSpotsRemaining(prev => prev - 1);
      }
    }, 30000); // Every 30 seconds

    return () => clearTimeout(timer);
  }, [spotsRemaining]);

  return (
    <div 
      className={`
        ${isSticky ? 'fixed top-0 left-0 right-0 z-40 shadow-lg' : 'relative'}
        bg-gradient-to-r from-red-600 to-red-700 text-white transition-all duration-300
      `}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Spots Remaining */}
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            <span className="font-bold text-sm md:text-base">
              ⚠️ Only {spotsRemaining} Spots Left for Q4 2025
            </span>
          </div>

          {/* Center: Countdown */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Offer Expires In:</span>
            <CountdownTimer className="scale-75 md:scale-100" />
          </div>

        </div>
      </div>
    </div>
  );
}