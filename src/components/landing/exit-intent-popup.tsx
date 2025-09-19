'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackExitIntent, trackEmailCapture } from '@/lib/analytics/tracker';

interface ExitIntentPopupProps {
  onSubmit: (email: string) => void;
}

export function ExitIntentPopup({ onSubmit }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if mobile device (basic check)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     window.innerWidth < 768;
    
    // Don't show exit intent on mobile devices
    if (isMobile) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        trackExitIntent(true, false);
      }
    };

    // Add delay before activating to avoid immediate trigger
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email);
      setIsVisible(false);
      // Track conversion
      trackExitIntent(false, true);
      trackEmailCapture('exit-intent-popup');
      // Save to localStorage to avoid showing again
      localStorage.setItem('exitIntentShown', 'true');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('exitIntentShown', 'true');
  };

  // Check if already shown in this session
  useEffect(() => {
    const shown = localStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 animate-scaleIn">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Urgency Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-red-800 font-medium text-center">
              🔥 Special Offer Expires in 23:59:47
            </p>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Wait! Save 50% RIGHT NOW
            </h2>
            <p className="text-lg text-gray-600">
              Get the <span className="font-semibold">20-Minute Blueprint</span> for just $247 (50% OFF the $497 price)
            </p>
          </div>

          {/* Value Props */}
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span>
              The complete system in 20 minutes
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span>
              Save $250 if you act now
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span>
              30-day money-back guarantee
            </li>
          </ul>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your best email..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-semibold"
            >
              Claim 50% OFF - Only $247 →
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Instant access after purchase. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}