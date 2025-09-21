'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SimpleVideoLandingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCTAClick = () => {
    setIsLoading(true);
    // Scroll to form or redirect to checkout
    router.push('/checkout/video');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Header */}
      <div className="text-center py-8">
        <div className="inline-block">
          <div className="text-2xl font-bold tracking-wider">APEX</div>
          <div className="text-xs opacity-60">Remote Operations</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 leading-tight">
          You&apos;re One Step Away From Learning How Anyone{' '}
          <span className="text-green-400">Can Build a $30K/Month</span>{' '}
          Remote Service Business
        </h1>

        {/* Trust Indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="flex -space-x-3">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-black"
              />
            ))}
          </div>
          <div className="text-sm text-gray-400 ml-3">
            <span className="text-yellow-500">★★★★★</span>
            <span className="ml-2">Trusted by operators nationwide</span>
          </div>
        </div>

        {/* Main Video */}
        <div className="relative mb-12">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src="https://www.loom.com/embed/c954a298a53c45dfb558460b77a79552?autoplay=0"
              className="w-full h-full"
              style={{ border: '0' }}
              allowFullScreen
            />
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Watch the full 20-minute blueprint (no fluff, pure strategy)
          </p>
        </div>

        {/* Primary CTA */}
        <div className="text-center mb-20">
          <Button
            onClick={handleCTAClick}
            disabled={isLoading}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-bold px-12 py-6 rounded-lg shadow-xl transition-all hover:scale-105"
          >
            {isLoading ? 'Loading...' : 'Get Access for $497'}
          </Button>
          <p className="text-gray-500 text-sm mt-4">
            ⚠️ Price returns to $997 after first 100 sales
          </p>
        </div>

        {/* Testimonial Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-12">
            Proof That Others Are Winning With This Strategy:
          </h2>

          {/* Testimonial Videos Grid */}
          <div className="space-y-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">How Marcel Went From:</h3>
                  <p className="text-green-400 text-2xl font-bold">
                    $0 To $67K/Month
                  </p>
                </div>
                <div className="text-gray-400">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-400">
                &quot;Quit my $85K job after month 4. The system literally runs itself.&quot;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">How Morgan Went From:</h3>
                  <p className="text-green-400 text-2xl font-bold">
                    Zero Experience To $32K/Month
                  </p>
                </div>
                <div className="text-gray-400">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <p className="text-gray-400">
                &quot;Started with zero experience. Now managing 4 crews from my laptop.&quot;
              </p>
            </div>

            {/* More Student Wins */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">More Student Wins:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div>Connor (NYC): $28K/mo in 5 months</div>
                <div>Sarah (TX): First $10K in 6 weeks</div>
                <div>Mike (FL): 3 crews, working remotely</div>
                <div>David (CA): Replaced corporate salary</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold mb-6">
            Ready to Build Your Remote Service Business?
          </h2>
          <Button
            onClick={handleCTAClick}
            disabled={isLoading}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-bold px-12 py-6 rounded-lg shadow-xl transition-all hover:scale-105 mb-8"
          >
            {isLoading ? 'Loading...' : 'Get The Blueprint → $497'}
          </Button>
          
          {/* Simple Guarantee */}
          <div className="max-w-2xl mx-auto text-center text-gray-400 text-sm">
            <p className="mb-4">
              <strong className="text-white">30-Day Guarantee:</strong> Watch the video, 
              implement the system. If you don&apos;t see a clear path to $10K/month, 
              get a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="border-t border-gray-900 py-8 px-4 text-center text-xs text-gray-500">
        <p className="mb-4">
          Copyright © {new Date().getFullYear()} APEX Operations LLC. All Rights Reserved.
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
        </div>
        <p className="max-w-3xl mx-auto mt-4 text-gray-600">
          DISCLAIMER: The results mentioned are not typical. Success depends on your background, 
          dedication, and market conditions. We make no earnings guarantees. This is a business 
          opportunity, not a get-rich-quick scheme. Your results may vary.
        </p>
      </footer>
    </div>
  );
}