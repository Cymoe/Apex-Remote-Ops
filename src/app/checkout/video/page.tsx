'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';

export default function VideoCheckoutPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      // Store purchase data
      const purchaseData = {
        firstName,
        lastName,
        email,
        purchaseType: 'video',
        amount: 497
      };

      // Save to session for video access page
      sessionStorage.setItem('purchaseData', JSON.stringify(purchaseData));

      // Record the purchase
      const response = await fetch('/api/purchases/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseData)
      });

      if (!response.ok) {
        throw new Error('Failed to process purchase');
      }

      // Redirect to video access page
      router.push('/video-access');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/lp/simple-497" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Checkout Form */}
          <div>
            <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  placeholder="john@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You&apos;ll receive access details at this email
                </p>
              </div>

              {/* Payment Method Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-2">Payment processing via Stripe</p>
                <p className="text-xs text-gray-400">
                  In production, Stripe Elements would appear here
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isProcessing || !email || !firstName || !lastName}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-bold"
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase → $497'}
              </Button>

              <p className="text-xs text-center text-gray-500">
                By purchasing, you agree to our{' '}
                <Link href="/terms" className="underline">terms</Link> and{' '}
                <Link href="/privacy" className="underline">privacy policy</Link>
              </p>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium">20-Minute Blueprint Video</span>
                  <span className="font-bold">$497</span>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Complete system walkthrough</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Crew hiring scripts & templates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>WhatsApp community access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Today</span>
                  <span className="text-green-600">$497</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  One-time payment • Instant access
                </p>
              </div>

              {/* Urgency */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️ Special pricing ends after 100 sales
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Regular price: $997
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 italic mb-3">
                &quot;This 20-minute video changed everything. I went from zero to $10K 
                in my second month. The WhatsApp group alone is worth 10x the price.&quot;
              </p>
              <p className="text-xs text-gray-500">
                - Marcel C., Texas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}