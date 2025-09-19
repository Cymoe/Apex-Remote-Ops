'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/apex-logo';
import { Play, Download, CheckCircle, ArrowRight, Clock, Users, TrendingUp } from 'lucide-react';

interface PurchaseData {
  firstName: string;
  lastName: string;
  email: string;
  territory?: string;
  purchaseType: string;
  amount: number;
}

export default function VideoAccessPage() {
  const router = useRouter();
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  
  useEffect(() => {
    // Get purchase data from session
    const data = sessionStorage.getItem('purchaseData');
    if (data) {
      setPurchaseData(JSON.parse(data));
    } else {
      // If no purchase data, redirect to checkout
      router.push('/');
    }
  }, [router]);

  const handleVideoEnd = () => {
    setHasWatchedVideo(true);
    // Track video completion
    // This would trigger showing the upsell more prominently
  };

  const handleUpgradeClick = () => {
    // Save video buyer status for streamlined application
    if (purchaseData) {
      localStorage.setItem('videoBuyerData', JSON.stringify({
        ...purchaseData,
        isVideoBuyer: true,
        watchedVideo: hasWatchedVideo
      }));
    }
    router.push('/apply?from=video');
  };

  if (!purchaseData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="px-4 py-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <ApexLogo size="md" className="[&_div]:from-amber-500 [&_div]:to-amber-600" />
          <div className="text-sm text-gray-400">
            Welcome back, <span className="text-amber-500 font-semibold">{purchaseData.firstName}</span>
          </div>
        </div>
      </header>

      {/* Video Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-8 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h2 className="text-xl font-bold mb-1">Purchase Successful!</h2>
            <p className="text-sm text-gray-300">Your 20-Minute Blueprint is ready to watch</p>
          </div>

          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden mb-8">
            <div className="aspect-video flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <Play className="w-20 h-20 text-white/50 mx-auto mb-4" />
                <p className="text-gray-400">Video player will be embedded here</p>
                <p className="text-sm text-gray-500 mt-2">Duration: 20:47</p>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">
              The 20-Minute Blueprint: Your $30K/Month Remote Renovation Business
            </h1>
            <p className="text-gray-300 mb-6">
              In this video, I reveal the exact system our operators use to build 
              location-independent contracting businesses. No fluff, no theory - 
              just the proven blueprint that works.
            </p>

            {/* Download Resources */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="font-bold mb-4">📁 Download Your Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-3 bg-gray-700 rounded hover:bg-gray-600 transition">
                  <Download className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <p className="font-medium">Crew Hiring Scripts</p>
                    <p className="text-xs text-gray-400">PDF - 2.3MB</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 bg-gray-700 rounded hover:bg-gray-600 transition">
                  <Download className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <p className="font-medium">Pricing Calculator</p>
                    <p className="text-xs text-gray-400">Excel - 1.1MB</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 bg-gray-700 rounded hover:bg-gray-600 transition">
                  <Download className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <p className="font-medium">Territory Analysis</p>
                    <p className="text-xs text-gray-400">PDF - 4.7MB</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-3 bg-gray-700 rounded hover:bg-gray-600 transition">
                  <Download className="w-5 h-5 text-amber-500" />
                  <div className="text-left">
                    <p className="font-medium">30-Day Launch Plan</p>
                    <p className="text-xs text-gray-400">PDF - 3.2MB</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell Section - Always visible but more prominent after watching */}
      <section className={`py-16 px-4 ${hasWatchedVideo ? 'bg-gradient-to-b from-gray-900 to-amber-900/20' : 'bg-gray-800'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {hasWatchedVideo ? (
              <>
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 mb-6">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-red-500">Limited Time Offer for Video Buyers</span>
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  Now You Know the System...<br />
                  Want Us to Implement It FOR You?
                </h2>
              </>
            ) : (
              <h2 className="text-3xl font-bold mb-4">
                Want Implementation Support?
              </h2>
            )}
            
            <p className="text-xl text-gray-300 mb-8">
              Upgrade to the full APEX Operator License and get everything done for you
            </p>
          </div>

          {/* What's Included in Full Program */}
          <div className="bg-gray-900 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Full $12,000 Implementation Program Includes:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Protected Territory Rights</p>
                    <p className="text-sm text-gray-400">Exclusive access to your chosen area</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Done-For-You Setup</p>
                    <p className="text-sm text-gray-400">We build your entire business system</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Personal Success Coach</p>
                    <p className="text-sm text-gray-400">Weekly 1-on-1 calls for 90 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Crew Matching Service</p>
                    <p className="text-sm text-gray-400">We connect you with vetted contractors</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Lead Generation System</p>
                    <p className="text-sm text-gray-400">Pre-built funnels and ad campaigns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Operations Playbook</p>
                    <p className="text-sm text-gray-400">200+ SOPs and templates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Operator Community</p>
                    <p className="text-sm text-gray-400">Network with successful operators</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Lifetime Updates</p>
                    <p className="text-sm text-gray-400">Always get the latest strategies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offer for Video Buyers */}
            {hasWatchedVideo && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-6">
                <p className="text-center text-lg mb-2">
                  <span className="font-bold text-amber-500">Special Offer for Video Buyers:</span>
                </p>
                <p className="text-center text-2xl font-bold">
                  Your $497 counts toward the program!
                </p>
                <p className="text-center text-gray-400">
                  Pay only $11,503 more (instead of full $12,000)
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="text-center">
              <Button
                onClick={handleUpgradeClick}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-8 py-4 text-lg font-bold"
              >
                Apply for Full Implementation Program
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-400 mt-4">
                Limited territories available • Application required
              </p>
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800 rounded-lg p-4">
              <Users className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">87%</p>
              <p className="text-xs text-gray-400">Hit $10K in 90 days</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <TrendingUp className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">$42K</p>
              <p className="text-xs text-gray-400">Avg. monthly revenue</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">15hrs</p>
              <p className="text-xs text-gray-400">Weekly time invested</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 text-center text-sm text-gray-400">
        <p>© 2025 APEX Operations LLC. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/support" className="hover:text-white">Support</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}