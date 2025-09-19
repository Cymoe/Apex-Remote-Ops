'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime?: Date;
  onComplete?: () => void;
  className?: string;
}

export function CountdownTimer({ endTime, onComplete, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    // Get or set the countdown end time (24 hours from first visit)
    const getEndTime = () => {
      const stored = localStorage.getItem('countdownEndTime');
      if (stored) {
        return new Date(stored);
      } else {
        const end = new Date();
        end.setHours(end.getHours() + 24);
        localStorage.setItem('countdownEndTime', end.toISOString());
        return end;
      }
    };

    const targetTime = endTime || getEndTime();

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        clearInterval(timer);
        onComplete?.();
        // Reset timer for next 24 hours
        localStorage.removeItem('countdownEndTime');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  return (
    <div className={`flex items-center gap-1 sm:gap-2 md:gap-3 ${className}`}>
      <div className="text-center">
        <div className="bg-red-600 text-white rounded-lg px-2 sm:px-3 py-1 sm:py-2 min-w-[45px] sm:min-w-[55px] md:min-w-[60px]">
          <div className="text-lg sm:text-xl md:text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
        </div>
        <div className="text-xs mt-1 text-gray-600 hidden sm:block">Hours</div>
      </div>
      <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">:</div>
      <div className="text-center">
        <div className="bg-red-600 text-white rounded-lg px-2 sm:px-3 py-1 sm:py-2 min-w-[45px] sm:min-w-[55px] md:min-w-[60px]">
          <div className="text-lg sm:text-xl md:text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
        </div>
        <div className="text-xs mt-1 text-gray-600 hidden sm:block">Minutes</div>
      </div>
      <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">:</div>
      <div className="text-center">
        <div className="bg-red-600 text-white rounded-lg px-2 sm:px-3 py-1 sm:py-2 min-w-[45px] sm:min-w-[55px] md:min-w-[60px]">
          <div className="text-lg sm:text-xl md:text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
        </div>
        <div className="text-xs mt-1 text-gray-600 hidden sm:block">Seconds</div>
      </div>
    </div>
  );
}