'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/apex-logo';
import { ArrowLeft, Lock, CreditCard, CheckCircle, Shield, Clock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(13);
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });

  useEffect(() => {
    // Get pre-filled data from localStorage if coming from landing page
    const savedData = localStorage.getItem('applicationData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({
        ...prev,
        email: parsed.email || ''
      }));
    }

    // Dynamic spots counter
    const lastVisit = localStorage.getItem('checkoutLastVisit');
    const savedSpots = localStorage.getItem('spotsRemaining');
    const now = Date.now();
    
    if (lastVisit && savedSpots) {
      const hoursSinceLastVisit = (now - parseInt(lastVisit)) / (1000 * 60 * 60);
      const previousSpots = parseInt(savedSpots);
      
      // Decrease spots based on time passed (simulate others buying)
      // Roughly 1 spot every 2-3 hours, but random
      const spotsGone = Math.floor(hoursSinceLastVisit / (2 + Math.random()));
      const newSpots = Math.max(3, previousSpots - spotsGone); // Never go below 3
      
      setSpotsLeft(newSpots);
    } else {
      // First visit - start with 11-13 spots randomly
      const initialSpots = 11 + Math.floor(Math.random() * 3);
      setSpotsLeft(initialSpots);
    }
    
    // Save current visit time and spots
    localStorage.setItem('checkoutLastVisit', now.toString());
    localStorage.setItem('spotsRemaining', spotsLeft.toString());

    // Real-time decrease while on page (every 2-5 minutes)
    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        const newSpots = Math.max(3, prev - 1);
        localStorage.setItem('spotsRemaining', newSpots.toString());
        return newSpots;
      });
    }, (120 + Math.random() * 180) * 1000); // 2-5 minutes randomly

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Save data to localStorage as backup
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      localStorage.setItem('videoBuyerData', JSON.stringify({
        firstName,
        lastName,
        email: formData.email,
        purchasedAt: new Date().toISOString()
      }));

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment setup failed:', error);
      alert('Failed to start checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Checkout Form - Optimized for Single Screen */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-4">
          <ApexLogo size="sm" className="h-8" />
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Lock className="w-3 h-3" />
            <span>SSL Secure</span>
          </div>
        </div>

        {/* Urgency + Price at TOP for mobile */}
        <div className={`bg-gradient-to-r ${spotsLeft <= 5 ? 'from-red-50 to-red-100' : 'from-red-50 to-yellow-50'} border ${spotsLeft <= 5 ? 'border-red-300' : 'border-red-200'} rounded-lg p-3 mb-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <p className={`text-xs font-semibold ${spotsLeft <= 5 ? 'text-red-900' : 'text-red-800'}`}>
                {spotsLeft <= 5 ? '⚠️ ' : ''}Only {spotsLeft} spots left at this price
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 line-through text-xs">$997</span>
              <span className="text-xl font-bold text-green-600">$497</span>
            </div>
          </div>
        </div>

        {/* Product Title - Compact */}
        <div className="mb-3">
          <h1 className="text-lg font-bold text-gray-900">20-Minute Blueprint Video</h1>
          <p className="text-xs text-gray-600">Everything you need for a $30K+/month business</p>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Complete Your Order</h3>
            
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="John Smith"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-sm"
                autoComplete="name"
                name="name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-sm"
                autoComplete="email"
                name="email"
                required
              />
            </div>
          </div>

          {/* Submit Button - Moved UP for mobile */}
          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-base font-bold"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Redirecting to Stripe...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Complete Purchase - $497
              </span>
            )}
          </Button>

          {/* Guarantee - Compact */}
          <div className="text-center text-xs text-gray-400">
            <CheckCircle className="w-3 h-3 text-green-500 inline mr-1" />
            30-Day Money-Back Guarantee
          </div>
        </form>

        {/* What's Included - Below the fold on mobile */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200 mt-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">✅ Everything you get today:</p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">20-Minute Blueprint Video</p>
                <p className="text-xs text-gray-600">The exact system to build your $30K/month business</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Private WhatsApp Community</p>
                <p className="text-xs text-gray-600">Connect with operators doing $30K+ monthly</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Complete Template Pack</p>
                <p className="text-xs text-gray-600">Scripts, calculators, contracts - everything you need</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">$497 Full Program Credit</p>
                <p className="text-xs text-gray-600">Upgrade anytime and save your entire investment</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Watch Anytime</span>
            </div>
          </div>
        </div>
        
        {/* Customer Support */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Most operators make their investment back in the first deal
          </p>
        </div>
        
      </div>
    </div>
  );
}