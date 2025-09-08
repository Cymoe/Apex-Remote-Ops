'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ApexLogo } from '@/components/apex-logo';
import { Shield, Lock, Users, TrendingUp, CheckCircle, MapPin, Award, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [availableSpots, setAvailableSpots] = useState(2);
  const [totalOperators, setTotalOperators] = useState(3);
  const [avgMonthlyRevenue, setAvgMonthlyRevenue] = useState(42000);
  
  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && availableSpots > 3) {
        setAvailableSpots(prev => prev - 1);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [availableSpots]);

  const handleApply = () => {
    router.push('/apply');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="px-4 py-6 border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <ApexLogo size="md" className="[&_div]:from-black [&_div]:to-gray-800" />
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-gray-600">Q4 Spots:</span>
              <span className="font-bold text-red-600">{availableSpots} remaining</span>
            </div>
            <Link 
              href="/auth/sign-in" 
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Operator Login
            </Link>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight">
              Build a $30K+/Month<br />
              <span className="text-gray-900 font-bold">Property Renovation Business</span><br />
              <span className="text-gray-600 font-normal">Without Ever Going On-Site</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Be the broker. Hire crews for painting, flooring, concrete, or remodeling jobs. 
              You handle sales. They do the work. You keep 40-60% profit.
            </p>


            {/* CTA */}
            <div>
              <Button 
                onClick={handleApply}
                className="bg-gray-900 hover:bg-black text-white px-8 py-6 text-base font-medium rounded-md transition-colors"
              >
                Apply Now →
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                $97 application • 3-minute form
              </p>
              <p className="text-xs text-gray-400 mt-2">
                New territories open based on population and service type
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Business Wins 2025-2028 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-3">The Perfect Storm</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Now Is The Perfect Time
            </h2>
          </div>
          
          <div className="space-y-8 text-lg leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">AI Can't Replace Physical Work</h3>
              <p className="text-gray-600">
                Tech workers are losing jobs to ChatGPT. But AI can't paint walls, install flooring, or fix a leaking roof. 
                Physical renovation work is forever human.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Essential Services = Recession-Proof Revenue</h3>
              <p className="text-gray-600">
                When pipes burst or roofs leak, people have no choice but to fix them. 
                Unlike luxury purchases, property maintenance is mandatory. The demand never stops.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Build an Asset, Not a Job</h3>
              <p className="text-gray-600">
                No boss. No layoffs. No corporate politics. You're building a business that pays you forever, 
                not a job that can disappear tomorrow.
              </p>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              <span className="font-bold text-gray-900">Reality check:</span> Tech laid off 260,000 people in 2024. 
              Meanwhile, our 3 operators averaged $42K/month. 
              <span className="block mt-2 font-semibold text-gray-900">Which side would you rather be on?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Who Is This For?</h2>
            <p className="text-lg text-gray-600">
              I'll share everything. Every system. Every secret. Nothing held back.
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-2">
              But only with the right people.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Established Contractors */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">1. Established Contractors</h3>
              <p className="text-gray-600 mb-3">
                Successful locally. Trapped geographically. Ready for true freedom.
              </p>
              <p className="text-sm text-gray-500">
                NOW: $500K+ local → NEXT: $1M+ anywhere
              </p>
            </div>
            
            {/* Remote Entrepreneurs */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Remote Entrepreneurs</h3>
              <p className="text-gray-600 mb-3">
                High performers. No more time-for-money trades. Ready to scale.
              </p>
              <p className="text-sm text-gray-500">
                NOW: Expertise → NEXT: $10K/month system
              </p>
            </div>
            
            {/* Exit Strategists */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Exit Strategists</h3>
              <p className="text-gray-600 mb-3">
                Building to sell. Maximum valuation. True empire builders.
              </p>
              <p className="text-sm text-gray-500">
                NOW: Operator → NEXT: 7-figure exit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            The $30K/Month Ceiling That Traps Every Contractor
          </h2>
          
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              You've built a solid local business. You're making decent money. But you're still trading hours for dollars, 
              tied to job sites, managing crews in person, and watching your margins shrink as you scale.
            </p>
            
            <p className="font-semibold">
              Meanwhile, a new breed of "Remote Operators" are quietly revolutionizing the game:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold mb-3">Traditional Contractor</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Stuck in one location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Trading time for money</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Managing crews in person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Income tied to hours worked</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border-2 border-blue-200">
                <h4 className="font-bold mb-3">Remote Operator (You)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Operate from anywhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Systems run the business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Virtual crew management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Income scales without you</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-xl font-semibold text-center">
              The difference? They have the systems. And now, so can you.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See How The Remote Operator Model Works
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Watch this 12-minute case study to see how contractors are building 
            profitable remote service businesses
          </p>
          
          {/* Video Embed */}
          <div className="relative aspect-video bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src="https://www.loom.com/embed/c954a298a53c45dfb558460b77a79552"
              className="absolute inset-0 w-full h-full"
              style={{ border: '0' }}
              allowFullScreen
            />
          </div>
          
          <p className="text-sm text-gray-600 mt-6">
            <strong>1,284+ contractors</strong> have watched this video
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">The Proof</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Real Operators. Real Results. Real Fast.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Marcel */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/marcel-avatar.jpg"
                  alt="Marcel C."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold">Marcel C.</h4>
                  <p className="text-sm text-gray-600">Phoenix, AZ</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-2">$67K/month</p>
              <p className="text-gray-700 mb-4">
                "Started 8 months ago while still working full-time. Now running 3 crews 
                and just quit my job last month."
              </p>
              <p className="text-sm text-gray-500">Interior Remodeling</p>
            </div>

            {/* Sarah */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/sarah-avatar.jpg"
                  alt="Sarah K."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold">Sarah K.</h4>
                  <p className="text-sm text-gray-600">Dallas, TX</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-2">$32K/month</p>
              <p className="text-gray-700 mb-4">
                "Went from zero to $30K/month in 5 months. The systems and templates 
                saved me years of trial and error."
              </p>
              <p className="text-sm text-gray-500">Painting & Flooring</p>
            </div>

            {/* Mike */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/mike-avatar.jpg"
                  alt="Mike R."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold">Mike R.</h4>
                  <p className="text-sm text-gray-600">Atlanta, GA</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-2">$28K/month</p>
              <p className="text-gray-700 mb-4">
                "Started with one concrete crew. Now handling patios, driveways, and turf 
                installs. The systems made scaling easy."
              </p>
              <p className="text-sm text-gray-500">Exterior Renovation</p>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-8">
            Average operator reaches $10K/month by day 90
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">What You Get</h2>
          
          <div className="space-y-6 text-lg text-gray-600 mb-12">
            <p>
              <strong className="text-gray-900">The complete APEX system</strong> for building and managing a remote renovation business. 
              Everything you need to go from zero to $30K+/month.
            </p>
            
            <ul className="space-y-3">
              <li>• 50+ SOPs, contracts, and templates (copy/paste ready)</li>
              <li>• Proven hiring scripts and training videos for crews</li>
              <li>• Marketing campaigns that actually generate leads</li>
              <li>• Pricing calculators and profit margin tools</li>
              <li>• WhatsApp group with 3 active operators</li>
              <li>• Weekly implementation calls</li>
              <li>• Vendor lists and supplier relationships</li>
            </ul>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <p className="text-2xl font-bold text-gray-900 mb-2">Investment: $6,997</p>
            <p className="text-gray-600 mb-8">
              Or 3 payments of $2,497. Includes 12 months access.
            </p>
            <Button 
              onClick={handleApply}
              className="bg-gray-900 hover:bg-black text-white px-8 py-6 text-base font-medium rounded-md transition-colors"
            >
              Apply Now →
            </Button>
          </div>
        </div>
      </section>


      {/* What's Included - Detailed */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Everything You Get With Your License
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-blue-600" />
                Complete Business Systems
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>30-Day Launch Roadmap (day-by-day plan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Service Setup Templates (HVAC, Plumbing, Electrical, More)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Pricing Calculators & Profit Margin Tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Legal Contracts & Service Agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Insurance & Bonding Guidelines</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Crew Management Systems
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Remote Hiring Scripts & Interview Process</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Training Videos & Onboarding Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Daily Accountability Tracking Sheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Quality Control Photo Checklists</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Performance Bonus Structures</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Growth & Marketing
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Google Ads Templates (Proven Winners)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Facebook Lead Generation Campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>5-Star Review Generation System</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Referral Program Templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Local SEO Domination Guide</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                Exclusive Benefits
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Territory Protection (No competition)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>WhatsApp Operator Mastermind</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Verified Vendor Network Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Quarterly Virtual Meetups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>License Transfer Rights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Territory Map */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Territory Availability</h2>
            <p className="text-gray-600">Each license includes exclusive rights to your chosen territory</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-red-100 text-red-800 p-3 rounded text-center font-medium">Phoenix - TAKEN</div>
              <div className="bg-red-100 text-red-800 p-3 rounded text-center font-medium">Dallas - TAKEN</div>
              <div className="bg-red-100 text-red-800 p-3 rounded text-center font-medium">Miami - TAKEN</div>
              <div className="bg-green-100 text-green-800 p-3 rounded text-center font-medium">Houston - AVAILABLE</div>
              <div className="bg-red-100 text-red-800 p-3 rounded text-center font-medium">Denver - TAKEN</div>
              <div className="bg-green-100 text-green-800 p-3 rounded text-center font-medium">Austin - AVAILABLE</div>
              <div className="bg-red-100 text-red-800 p-3 rounded text-center font-medium">Las Vegas - TAKEN</div>
              <div className="bg-green-100 text-green-800 p-3 rounded text-center font-medium">Atlanta - AVAILABLE</div>
              <div className="bg-red-100 text-red-800 p-3 rounded text-center font-medium">Chicago - TAKEN</div>
              <div className="bg-green-100 text-green-800 p-3 rounded text-center font-medium">Nashville - AVAILABLE</div>
              <div className="bg-red-100 text-red-800 p-3 rounded text-center font-medium">San Diego - TAKEN</div>
              <div className="bg-green-100 text-green-800 p-3 rounded text-center font-medium">Tampa - AVAILABLE</div>
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't see your city? Apply to check availability. New territories open based on population.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Common Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "What exactly is an Operator License?",
                a: "It's your exclusive right to use the APEX systems in your territory. You get all templates, SOPs, vendor lists, and ongoing support. Think of it as a business-in-a-box with built-in territory protection."
              },
              {
                q: "Do I need contracting experience?",
                a: "No. Marcel had zero experience. The system includes hiring scripts to find experienced crews. You manage the business, they do the work."
              },
              {
                q: "How fast can I realistically hit $10K/month?",
                a: "87% of operators hit $10K by day 90. The 30-day launch plan gets your first crew operational in week 3-4. Scale depends on your market and execution speed."
              },
              {
                q: "What if someone already has my city?",
                a: "Each major metro is divided by population. If Phoenix is taken, you might get Scottsdale or Tempe. During application, you'll see all available territories."
              },
              {
                q: "Can I sell my license later?",
                a: "Yes. Your territory license is a transferable asset. As you build revenue, it becomes more valuable. Several operators have sold for 5-10x monthly revenue."
              },
              {
                q: "What's included in the WhatsApp group?",
                a: "Real-time support from 47 successful operators. Share wins, get vendor recommendations, troubleshoot challenges. Not for basic questions - for strategic collaboration."
              },
              {
                q: "Why $6,997?",
                a: "You're not buying information (that's free online). You're buying proven systems, territory rights, and access to a network doing $2.3M/month combined. Most operators make this back in month 1-2."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <summary className="p-4 cursor-pointer font-medium hover:bg-gray-50">
                  {faq.q}
                </summary>
                <div className="p-4 pt-0 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {availableSpots} Spots Remaining for Q4 2025
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Limited enrollment to ensure quality support for all students.
          </p>
          
          <div className="bg-gray-900 rounded-lg p-8 mb-8">
            <p className="text-2xl font-bold text-amber-500 mb-2">
              APEX Operator License
            </p>
            <p className="text-3xl font-bold mb-4">$6,997</p>
            <p className="text-gray-400 mb-6">or 3 payments of $2,497</p>
            
            <Button 
              onClick={handleApply}
              size="lg"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black px-12 py-6 text-lg font-bold"
            >
              Apply for Your Territory Now →
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              $97 application fee • Instant approval • Start Monday
            </p>
          </div>
          
          <p className="text-sm text-gray-400">
            Questions? Email support@remoteops.ai<br />
            Average response time: 2 hours during business hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-center text-sm text-gray-400">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white">Earnings Disclaimer</Link>
          </div>
          <p>© {new Date().getFullYear()} APEX Operations LLC. All rights reserved.</p>
          <p className="mt-2">Results shown are not typical. Your results will vary based on market conditions and effort.</p>
          <p className="mt-2">APEX Operator License is a business opportunity, not a guarantee of income.</p>
        </div>
      </footer>
    </div>
  );
}