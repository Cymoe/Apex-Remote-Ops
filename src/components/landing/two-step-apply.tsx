'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { trackEmailCapture, trackCTAClick, trackFormInteraction } from '@/lib/analytics/tracker';

export function TwoStepApply() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Track email capture
    trackEmailCapture('two-step-apply');
    trackCTAClick('get-instant-access', 'two-step-form');
    
    // Save email for checkout
    localStorage.setItem('applicationData', JSON.stringify({
      email,
      purchaseType: 'video'
    }));
    
    // Send email to backend to capture lead
    console.log('Sending email to capture lead API:', email);
    try {
      const response = await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'two-step-form',
          metadata: {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
          }
        })
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (!response.ok) {
        console.error('Failed to capture lead:', data);
      }
    } catch (error) {
      console.error('Error capturing lead:', error);
      // Continue anyway - don't block the user
    }
    
    // Short delay for UX then redirect to checkout
    setTimeout(() => {
      router.push('/checkout');
    }, 500);
  };


  return (
    <div className="bg-white rounded-xl shadow-xl border-2 border-blue-500 p-4 sm:p-6 md:p-8">
      <form onSubmit={handleStep1Submit} className="space-y-4 md:space-y-6">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Get Your 20-Minute Blueprint
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Get instant access to the complete blueprint
            </p>
            <p className="text-lg font-bold text-green-600 mt-2">
              Only $497 Today (Save $500)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                trackFormInteraction('two-step-apply', 'email');
              }}
              onFocus={() => trackFormInteraction('two-step-apply', 'email-focus')}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              autoComplete="email"
              name="email"
              required
            />
          </div>


          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 md:py-4 text-base md:text-lg font-semibold"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Securing Your Spot...
              </span>
            ) : (
              'Get Instant Access →'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            🔒 Secure checkout • 30-day guarantee • Instant access
          </p>
        </form>
    </div>
  );
}