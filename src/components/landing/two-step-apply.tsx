'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackEmailCapture, trackTerritoryCheck, trackCTAClick, trackFormInteraction } from '@/lib/analytics/tracker';

const availableTerritories = [
  'Houston, TX',
  'Austin, TX', 
  'Atlanta, GA',
  'Nashville, TN',
  'Tampa, FL',
  'Charlotte, NC',
  'San Antonio, TX',
  'Orlando, FL',
  'Raleigh, NC',
  'Jacksonville, FL'
];

const takenTerritories = [
  'Phoenix, AZ',
  'Dallas, TX',
  'Miami, FL',
  'Denver, CO',
  'Las Vegas, NV',
  'Chicago, IL',
  'San Diego, CA'
];

export function TwoStepApply() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [territory, setTerritory] = useState('');
  const [customTerritory, setCustomTerritory] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [territoryStatus, setTerritoryStatus] = useState<'available' | 'taken' | null>(null);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    
    // Track email capture
    trackEmailCapture('two-step-apply');
    trackCTAClick('check-availability', 'two-step-form');
    
    // Simulate checking territory availability
    setTimeout(() => {
      const selectedTerritory = territory === 'other' ? customTerritory : territory;
      const isTaken = takenTerritories.some(t => 
        t.toLowerCase().includes(selectedTerritory.toLowerCase().split(',')[0])
      );
      
      // Track territory check
      trackTerritoryCheck(selectedTerritory, !isTaken);
      
      setTerritoryStatus(isTaken ? 'taken' : 'available');
      setIsChecking(false);
      
      if (!isTaken) {
        // Save to localStorage for the application form
        localStorage.setItem('applicationData', JSON.stringify({
          email,
          territory: selectedTerritory,
          preQualified: true
        }));
        
        setTimeout(() => {
          setStep(2);
        }, 1500);
      }
    }, 1500);
  };

  const handleFullApplication = () => {
    // Track conversion
    trackCTAClick('complete-application', 'two-step-form-step-2');
    
    // For $497 video purchase, go to simple checkout
    // Save data for pre-filling
    localStorage.setItem('applicationData', JSON.stringify({
      email,
      territory: territory === 'other' ? customTerritory : territory,
      purchaseType: 'video'
    }));
    
    // Redirect to simple checkout for video purchase
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border-2 border-blue-500 p-4 sm:p-6 md:p-8">
      {step === 1 ? (
        <form onSubmit={handleStep1Submit} className="space-y-4 md:space-y-6">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Get Your 20-Minute Blueprint
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Check if the special price is still available for your area
            </p>
            <p className="text-lg font-bold text-green-600 mt-2">
              Only $497 Today (Save $11,503)
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div className="w-20 h-1 bg-gray-300" />
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold">
              2
            </div>
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Territory
            </label>
            <select
              value={territory}
              onChange={(e) => {
                setTerritory(e.target.value);
                trackFormInteraction('two-step-apply', 'territory-select');
              }}
              onFocus={() => trackFormInteraction('two-step-apply', 'territory-focus')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            >
              <option value="">Select your territory...</option>
              <optgroup label="Available Now">
                {availableTerritories.map(t => (
                  <option key={t} value={t}>{t} ✅</option>
                ))}
              </optgroup>
              <optgroup label="Currently Taken">
                {takenTerritories.map(t => (
                  <option key={t} value={t} disabled>{t} ❌</option>
                ))}
              </optgroup>
              <option value="other">Other (Enter Below)</option>
            </select>
          </div>

          {territory === 'other' && (
            <input
              type="text"
              value={customTerritory}
              onChange={(e) => setCustomTerritory(e.target.value)}
              placeholder="Enter your city, state"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              required
            />
          )}

          <Button
            type="submit"
            disabled={isChecking}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 md:py-4 text-base md:text-lg font-semibold"
          >
            {isChecking ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Checking Your Special Price...
              </span>
            ) : (
              'Get Instant Access →'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            🔒 Secure checkout • 30-day guarantee • Instant access
          </p>
        </form>
      ) : (
        <div className="space-y-4 md:space-y-6 animate-fadeIn">
          <div className="text-center">
            {territoryStatus === 'available' ? (
              <>
                <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-green-500 mx-auto mb-3 md:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Perfect! Your Special Price is Active!
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {territory || customTerritory} qualifies for the $497 blueprint price
                </p>
                <p className="text-xs text-red-600 mt-2">
                  ⚠️ Price held for 20 minutes only
                </p>
              </>
            ) : (
              <>
                <CheckCircle className="w-12 sm:w-16 h-12 sm:h-16 text-green-500 mx-auto mb-3 md:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Special Pricing Still Available!
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  While {territory || customTerritory} has an operator, you can still access the blueprint
                </p>
              </>
            )}
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="w-20 h-1 bg-green-500" />
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold animate-pulse">
              2
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">What You're Getting:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✅ The Complete 20-Minute Blueprint Video</li>
              <li>✅ Crew Hiring Scripts & Templates</li>
              <li>✅ Territory Domination Strategy</li>
              <li>✅ Pricing Calculator & Profit Formula</li>
              <li>✅ 30-Day Money-Back Guarantee</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-green-200">
              <p className="text-center">
                <span className="text-gray-500 line-through">Regular: $12,000</span>
                <span className="text-green-700 font-bold text-lg ml-2">Today: $497</span>
              </p>
            </div>
          </div>

          <Button
            onClick={handleFullApplication}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 md:py-4 text-base md:text-lg font-semibold"
          >
            Get Instant Access for $497 →
          </Button>

          <p className="text-xs text-gray-500 text-center">
            🔒 Secure Payment • SSL Encrypted • 30-Day Guarantee
          </p>
        </div>
      )}
    </div>
  );
}