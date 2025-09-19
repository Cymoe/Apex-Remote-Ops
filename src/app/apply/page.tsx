'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/apex-logo';
import { ArrowLeft, Lock, CreditCard, CheckCircle } from 'lucide-react';

interface ApplicationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Business Info
  currentRevenue: string;
  businessExperience: string;
  desiredTerritory: string;
  
  // Qualifying Questions
  capitalAvailable: string;
  timelineToStart: string;
  whyApply: string;
  
  // Agreement
  agreedToTerms: boolean;
}

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoBuyer, setIsVideoBuyer] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentRevenue: '',
    businessExperience: '',
    desiredTerritory: '',
    capitalAvailable: '',
    timelineToStart: '',
    whyApply: '',
    agreedToTerms: false
  });

  // Check if user is a video buyer and pre-fill data
  useEffect(() => {
    // Only check for video buyer data if coming from the landing page
    const urlParams = new URLSearchParams(window.location.search);
    const fromVideo = urlParams.get('from') === 'video';
    
    if (fromVideo) {
      // First check localStorage for recent data
      const videoBuyerData = localStorage.getItem('videoBuyerData');
      if (videoBuyerData) {
        const parsed = JSON.parse(videoBuyerData);
        
        // Also verify with database
        fetch(`/api/purchases/check-video-buyer?email=${encodeURIComponent(parsed.email)}`)
          .then(res => res.json())
          .then(data => {
            if (data.isVideoBuyer) {
              setIsVideoBuyer(true);
              setApplicationData(prev => ({
                ...prev,
                firstName: data.purchaseData.firstName || parsed.firstName || '',
                lastName: data.purchaseData.lastName || parsed.lastName || '',
                email: data.purchaseData.email || parsed.email || '',
                desiredTerritory: data.purchaseData.territory || parsed.territory || ''
              }));
              // Skip to business info for video buyers (they already gave personal info)
              setCurrentStep(2);
            }
          })
          .catch(err => {
            console.error('Error checking video buyer status:', err);
            // Fall back to localStorage data
            setIsVideoBuyer(true);
            setApplicationData(prev => ({
              ...prev,
              firstName: parsed.firstName || '',
              lastName: parsed.lastName || '',
              email: parsed.email || '',
              desiredTerritory: parsed.territory || ''
            }));
            setCurrentStep(2);
          });
      }
    }
  }, []);

  const updateField = (field: keyof ApplicationData, value: string | boolean) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const canProceedToStep2 = () => {
    return applicationData.firstName && 
           applicationData.lastName && 
           applicationData.email && 
           applicationData.phone;
  };

  const canProceedToStep3 = () => {
    return applicationData.currentRevenue && 
           applicationData.businessExperience && 
           applicationData.desiredTerritory;
  };

  const canSubmit = () => {
    return applicationData.capitalAvailable && 
           applicationData.timelineToStart && 
           applicationData.whyApply && 
           applicationData.agreedToTerms;
  };

  const handlePaymentAndSubmit = async () => {
    if (!canSubmit()) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit application to backend
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      // Store application data for thank you page
      sessionStorage.setItem('applicationData', JSON.stringify({
        ...applicationData,
        applicationId: result.applicationId,
      }));
      
      // In production, integrate with Stripe for $97 payment here
      // For now, redirect to thank you page
      router.push('/apply/thank-you');
      
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Application submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <ApexLogo size="md" className="[&_div]:from-black [&_div]:to-gray-800" />
          <div className="w-16" />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-100 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className={`text-sm ${currentStep >= 1 ? 'font-semibold' : 'text-gray-500'}`}>Personal Info</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4">
              <div className={`h-full bg-blue-600 transition-all duration-300`} style={{ width: currentStep >= 2 ? '100%' : '0%' }} />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
              </div>
              <span className={`text-sm ${currentStep >= 2 ? 'font-semibold' : 'text-gray-500'}`}>Business Info</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4">
              <div className={`h-full bg-blue-600 transition-all duration-300`} style={{ width: currentStep >= 3 ? '100%' : '0%' }} />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {currentStep > 3 ? <CheckCircle className="w-5 h-5" /> : '3'}
              </div>
              <span className={`text-sm ${currentStep >= 3 ? 'font-semibold' : 'text-gray-500'}`}>Qualification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Special Message for Video Buyers */}
        {isVideoBuyer && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Welcome Back, Video Buyer!</p>
                <p className="text-sm text-green-700 mt-1">
                  Your $497 video purchase counts toward the full program. 
                  We've pre-filled your information to make this quick.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {isVideoBuyer ? 'Upgrade to Full Implementation' : 'Apply for APEX Operator License'}
          </h1>
          <p className="text-gray-600">
            {isVideoBuyer 
              ? 'Get done-for-you setup, protected territory, and personal coaching'
              : 'Complete this application to see if you qualify for territory rights'}
          </p>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={applicationData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={applicationData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={applicationData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                value={applicationData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                required
              />
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!canProceedToStep2()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Continue to Business Info →
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Revenue *</label>
              <select
                value={applicationData.currentRevenue}
                onChange={(e) => updateField('currentRevenue', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                required
              >
                <option value="">Select revenue range</option>
                <option value="0">$0 - Not started yet</option>
                <option value="1-10k">$1,000 - $10,000/month</option>
                <option value="10-30k">$10,000 - $30,000/month</option>
                <option value="30-50k">$30,000 - $50,000/month</option>
                <option value="50k+">$50,000+/month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Experience *</label>
              <select
                value={applicationData.businessExperience}
                onChange={(e) => updateField('businessExperience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                required
              >
                <option value="">Select your experience</option>
                <option value="none">No business experience</option>
                <option value="employee">Currently employed, want to start</option>
                <option value="contractor">Contractor/Freelancer</option>
                <option value="business-owner">Business owner (non-service)</option>
                <option value="service-owner">Service business owner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Desired Territory *</label>
              <input
                type="text"
                value={applicationData.desiredTerritory}
                onChange={(e) => updateField('desiredTerritory', e.target.value)}
                placeholder="e.g. Phoenix, AZ or Miami, FL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Enter your preferred city and state</p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="flex-1 border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
              >
                ← Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedToStep3()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue to Qualification →
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capital Available for Investment *</label>
              <select
                value={applicationData.capitalAvailable}
                onChange={(e) => updateField('capitalAvailable', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                required
              >
                <option value="">Select capital range</option>
                <option value="<10k">Less than $10,000</option>
                <option value="10-25k">$10,000 - $25,000</option>
                <option value="25-50k">$25,000 - $50,000</option>
                <option value="50-100k">$50,000 - $100,000</option>
                <option value="100k+">$100,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline to Start *</label>
              <select
                value={applicationData.timelineToStart}
                onChange={(e) => updateField('timelineToStart', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                required
              >
                <option value="">Select timeline</option>
                <option value="immediately">Immediately</option>
                <option value="1-month">Within 1 month</option>
                <option value="3-months">Within 3 months</option>
                <option value="6-months">Within 6 months</option>
                <option value="exploring">Just exploring options</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to become an APEX Operator? *</label>
              <textarea
                value={applicationData.whyApply}
                onChange={(e) => updateField('whyApply', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-900"
                placeholder="Tell us about your goals and why you're interested in the APEX system..."
                required
              />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={applicationData.agreedToTerms}
                  onChange={(e) => updateField('agreedToTerms', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  I understand this is a serious business opportunity requiring a $6,997 investment 
                  (payment plans available) and I'm prepared to commit to the 30-day launch process. 
                  I agree to pay the $97 application fee to have my application reviewed.
                </span>
              </label>
            </div>

            <div className="border-t pt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Application Fee: $97</p>
                    <p className="text-sm text-gray-600">One-time fee. Instant approval if qualified.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                  className="flex-1 border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handlePaymentAndSubmit}
                  disabled={!canSubmit() || isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" />
                      Pay $97 & Submit Application
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}