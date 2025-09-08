'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ApexLogo } from '@/components/apex-logo';
import { Shield, Lock, Clock, Users, TrendingUp, CheckCircle, MapPin, Award, CreditCard, Calendar, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ApplicationData {
  firstName: string;
  email: string;
  desiredTerritory: string;
}

export default function OperatorLicensePage() {
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [territoryAvailable, setTerritoryAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Get application data from session
    const data = sessionStorage.getItem('applicationData');
    if (data) {
      const parsed = JSON.parse(data);
      setApplicationData({
        firstName: parsed.firstName,
        email: parsed.email,
        desiredTerritory: parsed.desiredTerritory
      });
      // Check if territory is available (mock check)
      const takenTerritories = ['Phoenix, AZ', 'Dallas, TX', 'Miami, FL'];
      setTerritoryAvailable(!takenTerritories.includes(parsed.desiredTerritory));
    } else {
      // Redirect if no application data
      router.push('/');
    }
  }, [router]);

  const handlePurchase = async (paymentType: 'full' | 'plan') => {
    setIsLoading(true);
    
    try {
      // In production, this would integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store purchase info
      sessionStorage.setItem('purchaseType', paymentType);
      sessionStorage.setItem('purchaseAmount', paymentType === 'full' ? '6997' : '2497');
      
      // Redirect to success page
      router.push('/welcome');
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!applicationData) {
    return null; // Loading state
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <ApexLogo size="md" className="[&_div]:from-black [&_div]:to-gray-800" />
          <div className="text-sm text-gray-600">
            Logged in as: <span className="font-semibold">{applicationData.email}</span>
          </div>
        </div>
      </header>

      {/* Territory Status Alert */}
      {territoryAvailable ? (
        <div className="bg-green-50 border-b-2 border-green-200 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Great news! {applicationData.desiredTerritory} is available. Secure it now before someone else does.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border-b-2 border-yellow-200 px-4 py-3">
          <div className="max-w-6xl mx-auto">
            <p className="text-yellow-800 font-medium">
              {applicationData.desiredTerritory} was recently taken, but nearby territories are available. 
              Contact support@remoteops.ai to discuss alternatives.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Congratulations {applicationData.firstName},<br />
            <span className="text-blue-600">You Qualify for an APEX License!</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Based on your application, you're approved to join our growing network of 
            operators building remote service businesses
          </p>
          
          <div className="inline-flex items-center gap-3 bg-red-50 border-2 border-red-200 rounded-full px-6 py-3">
            <Clock className="w-5 h-5 text-red-600" />
            <span className="font-semibold">This page expires in 30 minutes</span>
          </div>
        </div>
      </section>

      {/* Quick Decision Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Full Payment */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-green-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-semibold">
                SAVE $494
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Full Payment</h3>
                <p className="text-4xl font-bold mb-4">$6,997</p>
                <p className="text-gray-600 mb-6">One-time investment</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Immediate territory lock</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Instant access to everything</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Save $494 vs payment plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Priority WhatsApp access</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handlePurchase('full')}
                  disabled={isLoading || !territoryAvailable}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-bold"
                >
                  {isLoading ? 'Processing...' : 'Secure My Territory Now →'}
                </Button>
              </div>
            </div>

            {/* Payment Plan */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-300">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Payment Plan</h3>
                <p className="text-4xl font-bold mb-4">3 × $2,497</p>
                <p className="text-gray-600 mb-6">Total: $7,491</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>$2,497 today</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>Then 2 monthly payments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>Same instant access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span>Territory locked today</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => handlePurchase('plan')}
                  disabled={isLoading || !territoryAvailable}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-bold"
                >
                  {isLoading ? 'Processing...' : 'Start with $2,497 →'}
                </Button>
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-12 text-center bg-gray-900 text-white rounded-xl p-8">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-bold mb-4">30-Day Implementation Guarantee</h3>
            <p className="max-w-2xl mx-auto">
              Follow the 30-day launch plan. Use the templates. Hire your first crew. 
              If you don't book your first job within 30 days, we'll refund 100% of your investment. 
              No questions asked. You keep all the materials.
            </p>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Here's Exactly What Happens Next</h2>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Instant Access (Within 60 Seconds)</h3>
                <p className="text-gray-600">
                  Your login credentials arrive via email. Access the operator vault with all 50+ SOPs, 
                  templates, and systems. Download everything immediately.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Territory Lock (Immediate)</h3>
                <p className="text-gray-600">
                  {applicationData.desiredTerritory} is marked as taken in our system. 
                  You receive your official territory certificate via email.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">WhatsApp Invitation (Within 2 Hours)</h3>
                <p className="text-gray-600">
                  You'll receive a personal invitation to the operators-only WhatsApp group. 
                  47 successful operators ready to help you launch.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">30-Day Launch Calendar (Day 1)</h3>
                <p className="text-gray-600">
                  Follow the exact day-by-day plan Marcel used. Week 1: Business setup. 
                  Week 2: Hiring. Week 3: Systems. Week 4: First customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reminder of What's Included */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Quick Reminder: Everything You're Getting</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <p className="font-semibold">SOPs & Templates</p>
              <p className="text-sm text-gray-600">Ready to use</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <p className="font-semibold">Exclusive Territory</p>
              <p className="text-sm text-gray-600">{applicationData.desiredTerritory}</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
              <p className="font-semibold">Active Operators</p>
              <p className="text-sm text-gray-600">In WhatsApp group</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">30</div>
              <p className="font-semibold">Day Launch Plan</p>
              <p className="text-sm text-gray-600">Step by step</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <h3 className="text-xl font-bold mb-4">Next Q1 Onboarding: Monday, January 20th</h3>
            <p className="text-gray-700 mb-6">
              All new operators start together. Group momentum is powerful. 
              Don't miss this cohort and wait until April.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => handlePurchase('full')}
                disabled={isLoading || !territoryAvailable}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Pay in Full ($6,997)
              </Button>
              <Button 
                onClick={() => handlePurchase('plan')}
                disabled={isLoading || !territoryAvailable}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start Payment Plan ($2,497)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Questions</h2>
          
          <div className="space-y-4">
            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="p-4 cursor-pointer font-medium hover:bg-gray-50">
                What if I can't start right away?
              </summary>
              <div className="p-4 pt-0 text-gray-600">
                You have lifetime access once you purchase. However, we strongly recommend starting with your 
                cohort for maximum support and momentum. The WhatsApp group is most active during launches.
              </div>
            </details>
            
            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="p-4 cursor-pointer font-medium hover:bg-gray-50">
                Can I change my territory later?
              </summary>
              <div className="p-4 pt-0 text-gray-600">
                Yes, if your desired territory becomes available. You can also add additional territories 
                for $2,997 each (existing operators get 50% off additional territories).
              </div>
            </details>
            
            <details className="bg-white border border-gray-200 rounded-lg">
              <summary className="p-4 cursor-pointer font-medium hover:bg-gray-50">
                Is financing available beyond the 3-pay option?
              </summary>
              <div className="p-4 pt-0 text-gray-600">
                For qualified applicants, we partner with Affirm for extended financing. 
                Contact support@remoteops.ai before purchasing to discuss options.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            {applicationData.firstName}, Your Territory Awaits
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            In 30 days, you could have your first crew running. In 90 days, you could be at $10K/month. 
            In 18 months? Ask Marcel about his $3M.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-8">
            <p className="text-sm text-gray-400 mb-6">
              Remember: This page expires in 30 minutes. After that, your territory goes back 
              into the pool for other applicants.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => handlePurchase('full')}
                disabled={isLoading || !territoryAvailable}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Secure Full License ($6,997)
                </span>
              </Button>
              <Button 
                onClick={() => handlePurchase('plan')}
                disabled={isLoading || !territoryAvailable}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Start with Payment Plan
                </span>
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            Questions? Email support@remoteops.ai or text (555) 123-4567<br />
            We typically respond within 10 minutes during business hours.
          </p>
        </div>
      </section>
    </div>
  );
}