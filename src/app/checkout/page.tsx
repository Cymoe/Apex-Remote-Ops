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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    territory: ''
  });

  useEffect(() => {
    // Get pre-filled data from localStorage if coming from landing page
    const savedData = localStorage.getItem('applicationData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(prev => ({
        ...prev,
        email: parsed.email || '',
        territory: parsed.territory || ''
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Integrate Stripe payment here
      // For now, simulate payment success
      
      // Save purchase data for video access page
      sessionStorage.setItem('purchaseData', JSON.stringify({
        ...formData,
        purchaseType: 'video',
        amount: 497,
        timestamp: new Date().toISOString()
      }));
      
      // Also save to localStorage for future upgrade to full program
      localStorage.setItem('videoBuyerData', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        territory: formData.territory,
        purchasedAt: new Date().toISOString()
      }));

      // Track purchase in database
      await fetch('/api/purchases/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: 497,
          product: '20-minute-blueprint'
        })
      });

      // Redirect to video access page
      router.push('/video-access');
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="px-4 py-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <ApexLogo size="sm" className="[&_div]:from-black [&_div]:to-gray-800" />
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock className="w-3 h-3" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Checkout Form */}
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Product Summary */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            20-Minute Blueprint Video
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Everything you need to build a $30K+/month remote renovation business
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-500 line-through text-sm">$12,000</span>
              <span className="text-2xl font-bold text-green-600 ml-2">$497</span>
            </div>
            <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
              Save $11,503
            </span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Information</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                required
              />
            </div>
          </div>

          {/* Payment Section (Placeholder for Stripe) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-sm">Stripe payment form will go here</p>
              <p className="text-xs mt-2">Card • PayPal • Apple Pay</p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 py-4 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              Secure Payment
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Instant Access
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-bold"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Payment...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Complete Purchase - $497
              </span>
            )}
          </Button>

          {/* Guarantee */}
          <div className="text-center text-sm text-gray-600 mt-4">
            <CheckCircle className="w-5 h-5 text-green-500 inline mr-1" />
            30-Day Money-Back Guarantee
          </div>
        </form>
      </div>
    </div>
  );
}