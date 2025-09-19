'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/apex-logo';
import { CheckCircle, Download, Users, Calendar, MapPin, Rocket, Lock, ExternalLink } from 'lucide-react';

interface PurchaseData {
  firstName: string;
  email: string;
  territory: string;
  purchaseType: string;
  amount: string;
}

export default function WelcomePage() {
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [whatsappLink] = useState('https://chat.whatsapp.com/XXXXXXX'); // Replace with real link
  
  useEffect(() => {
    // Get data from session
    const appData = sessionStorage.getItem('applicationData');
    const purchaseType = sessionStorage.getItem('purchaseType');
    const purchaseAmount = sessionStorage.getItem('purchaseAmount');
    
    if (appData) {
      const parsed = JSON.parse(appData);
      setPurchaseData({
        firstName: parsed.firstName,
        email: parsed.email,
        territory: parsed.desiredTerritory,
        purchaseType: purchaseType || 'full',
        amount: purchaseAmount || '6997'
      });
      
      // Clear session data for security
      sessionStorage.clear();
    }
  }, []);

  if (!purchaseData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your operator dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <ApexLogo size="md" className="[&_div]:from-amber-500 [&_div]:to-amber-600" />
          <div className="text-sm text-gray-400">
            Operator: <span className="text-amber-500 font-semibold">{purchaseData.email}</span>
          </div>
        </div>
      </header>

      {/* Success Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to APEX, {purchaseData.firstName}!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            You are now Operator #{String(Math.floor(Math.random() * 50) + 48).padStart(3, '0')} • Territory: {purchaseData.territory}
          </p>
          
          <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-3">
            <Rocket className="w-5 h-5 text-amber-500" />
            <span className="text-amber-500 font-semibold">Your 30-Day Launch Starts Now</span>
          </div>
        </div>
      </section>

      {/* Quick Start Actions */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Complete These 4 Steps Right Now</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Download Your Operator Vault</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    All 50+ SOPs, templates, contracts, and systems in one ZIP file.
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    <Download className="w-4 h-4 mr-2" />
                    Download Vault (247MB)
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Join the WhatsApp Mastermind</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Connect with 47 active operators. Real-time support and deals.
                  </p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.open(whatsappLink, '_blank')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Join WhatsApp Group
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Claim Your Territory Certificate</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Official documentation of your exclusive {purchaseData.territory} rights.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    Generate Certificate
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Schedule Onboarding Call</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Optional 15-min orientation with our success team.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 hover:bg-gray-700"
                    onClick={() => window.open('https://calendly.com/apex-onboarding', '_blank')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Onboarding
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 30-Day Launch Calendar */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your 30-Day Launch Calendar</h2>
            <p className="text-gray-400">Follow this exact sequence. Don't skip steps. Trust the process.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Week 1 */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-amber-500 mb-4">Week 1: Foundation</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Business registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Insurance setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Bank accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Service selection</span>
                </li>
              </ul>
            </div>

            {/* Week 2 */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-amber-500 mb-4">Week 2: Hiring</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Post job ads</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Interview crews</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Background checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Onboard first crew</span>
                </li>
              </ul>
            </div>

            {/* Week 3 */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-amber-500 mb-4">Week 3: Marketing</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Google Ads launch</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Facebook campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Local SEO setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Review generation</span>
                </li>
              </ul>
            </div>

            {/* Week 4 */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="font-bold text-amber-500 mb-4">Week 4: Revenue</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>First 10 leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Close first jobs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Quality control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span>Scale to $10K/mo</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">
              <Calendar className="w-4 h-4 mr-2" />
              Download Full 30-Day Checklist
            </Button>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-yellow-500" />
              Important Information
            </h3>
            
            <div className="space-y-4 text-gray-300">
              <div>
                <p className="font-semibold mb-1">Your Login Credentials:</p>
                <p className="text-sm">Check your email ({purchaseData.email}) for your portal login details.</p>
              </div>
              
              <div>
                <p className="font-semibold mb-1">Territory Protection:</p>
                <p className="text-sm">{purchaseData.territory} is now exclusively yours. No other APEX operator can market there.</p>
              </div>
              
              <div>
                <p className="font-semibold mb-1">Annual Renewal:</p>
                <p className="text-sm">Your license renews January 2026 for $997. Set a reminder.</p>
              </div>
              
              {purchaseData.purchaseType === 'plan' && (
                <div>
                  <p className="font-semibold mb-1">Payment Schedule:</p>
                  <p className="text-sm">Next payment of $2,497 due in 30 days. Final payment in 60 days.</p>
                </div>
              )}
              
              <div>
                <p className="font-semibold mb-1">Support:</p>
                <p className="text-sm">
                  Email: support@remoteops.ai<br />
                  WhatsApp: Best for quick questions<br />
                  Response time: Usually within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 px-4 bg-gray-800 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Empire?</h2>
          <p className="text-gray-400 mb-8">
            47 operators are building wealth right now. Your territory is waiting. 
            The systems are proven. All that's missing is your execution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-black"
              onClick={() => window.location.href = '/dashboard'}
            >
              Access Dashboard →
            </Button>
            <Button 
              variant="outline"
              className="border-gray-600 hover:bg-gray-700"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Join WhatsApp Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>Welcome to the APEX Network. Let's build something extraordinary.</p>
      </footer>
    </div>
  );
}