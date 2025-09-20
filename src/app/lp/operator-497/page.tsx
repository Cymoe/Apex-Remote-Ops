'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ApexLogo } from '@/components/apex-logo';
import { Shield, Lock, Users, TrendingUp, CheckCircle, MapPin, Award, Building2, Star, Trophy, Clock, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Import conversion components
import { UrgencyBar } from '@/components/landing/urgency-bar';
import { ExitIntentPopup } from '@/components/landing/exit-intent-popup';
import { TwoStepApply } from '@/components/landing/two-step-apply';

export default function OptimizedHome() {
  const router = useRouter();
  const [availableSpots, setAvailableSpots] = useState(5);
  const [showGuarantee, setShowGuarantee] = useState(false);
  
  // Track scroll for sticky CTA
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 800);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailCapture = (email: string) => {
    // Send to email service
    console.log('Email captured:', email);
    // Redirect to application
    router.push('/apply?from=video');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header - Mobile Optimized */}
      <header className="px-4 py-2 border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <ApexLogo size="sm" className="md:hidden [&_div]:from-black [&_div]:to-gray-800" />
          <ApexLogo size="md" className="hidden md:block [&_div]:from-black [&_div]:to-gray-800" />
          <Link 
            href="/auth/sign-in" 
            className="text-xs md:text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Login
          </Link>
        </div>
      </header>


      {/* Hero Section - Mobile Optimized */}
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column - Copy */}
            <div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                Everything You Need to Build a{' '}
                <span className="text-blue-600">$30K+/Month</span>{' '}
                Remote Renovation Business
                <span className="text-gray-600 font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl block mt-3">
                  In One 20-Minute Video
                </span>
              </h1>
              
              {/* The killer value prop - THE BANGER */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                <p className="text-gray-800 font-medium text-lg">
                  <strong className="text-blue-900">The Business Model:</strong><br/>
                  Be the broker. Hire crews for painting, flooring, concrete, or remodeling jobs. 
                  You handle sales. They do the work. You keep 40-60% profit.
                  <br/><br/>
                  <strong className="text-green-700">I'll show you EXACTLY how in 20 minutes flat.</strong>
                </p>
              </div>
              
              {/* The Evolution Story */}
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-3 sm:p-4 mb-6">
                <p className="text-sm sm:text-base text-gray-800 font-medium">
                  <strong className="text-gray-900">Skip the Survival Phase:</strong><br/>
                  Most people spend 2-3 years just trying to survive, then another 2 years building systems that work.
                  We've already spent the years and millions building it.
                  <br/><br/>
                  <strong className="text-green-700">You get to skip straight to proven systems.</strong>
                </p>
              </div>

              {/* Value Props - Updated */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    <strong>No Tools, No Truck, No Experience:</strong> Just a laptop and phone
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    <strong>Average Deal Size:</strong> $3,500 (you keep $1,400-$2,100 per job)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    <strong>Work From Anywhere:</strong> Bali, Dubai, Singapore, Miami - manage crews remotely
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    <strong>Private WhatsApp Group:</strong> Real operators sharing what works
                  </span>
                </li>
              </ul>


              {/* Limited Seats Alert */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-lg font-bold text-gray-800 text-center mb-1">
                  <span className="line-through text-gray-600">Regular Price: $12,000</span>
                </p>
                <p className="text-2xl font-bold text-green-700 text-center mb-3">
                  Special Price: $497
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-semibold text-red-800">
                    Only {availableSpots} seats remaining at this price
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Two-Step Apply */}
            <div id="apply-form">
              <TwoStepApply />
            </div>
          </div>
        </div>
      </section>


      {/* Video Section - Mobile Optimized */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Video with play button overlay */}
          <div className="relative aspect-video bg-gray-900 rounded-xl shadow-2xl overflow-hidden group cursor-pointer">
            <iframe
              src="https://www.loom.com/embed/c954a298a53c45dfb558460b77a79552?autoplay=1"
              className="absolute inset-0 w-full h-full"
              style={{ border: '0' }}
              allowFullScreen
            />
            
          </div>
          
          <p className="text-sm text-gray-600 mt-6">
            <strong>⚠️ Important:</strong> This video reveals our exact pricing strategy 
            (normally $997 to access)
          </p>
        </div>
      </section>

      {/* Hidden Opportunity Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  The $68 Trillion Hidden Opportunity Everyone's Missing
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  While everyone fights over AI-threatened jobs, a massive wealth transfer is quietly happening in "boring" industries no one talks about.
                </p>
                <p className="text-gray-700 mt-3">
                  <strong>10,000 baby boomers retire every single day.</strong> Their home service businesses—worth trillions—need new operators. This closing window won't last forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Transformation Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/home_1.jpg"
                  alt="Day 0: The Hamster Wheel"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">Day 0: The Hamster Wheel</h3>
                  <p className="text-sm opacity-90">Trading time for money</p>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/home_2.jpg"
                  alt="Day 45: Building Systems"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">Day 45: Building Systems</h3>
                  <p className="text-sm opacity-90">Transitioning out of the grind</p>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/home_3.jpg"
                  alt="Day 90: True Freedom"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">Day 90: True Freedom</h3>
                  <p className="text-sm opacity-90">$30k/month from paradise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Myles Bio Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="/myles.jpg"
                alt="Myles Webb, Remote Operations"
                width={400}
                height={500}
                className="rounded-lg shadow-xl grayscale scale-110"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">FROM THE FOUNDER</p>
              <h2 className="text-3xl font-bold mb-4">
                "I Went From $0 to $1.2M Running Renovation Businesses From My Laptop"
              </h2>
              <p className="text-gray-700 mb-4">
                Hey, I'm Myles. Five years ago, I was stuck in the same trap you're in now. Trading time for money, watching my income plateau, knowing there had to be something better.
              </p>
              <p className="text-gray-700 mb-4">
                Then I discovered something counterintuitive: While everyone was chasing tech startups and crypto, the real money was hiding in "boring" businesses nobody wanted to talk about. Renovation. Flooring. Painting. The unsexy stuff that actually pays.
              </p>
              <p className="text-gray-700 mb-4">
                Today, I run multiple six-figure renovation businesses from anywhere—Bali, Miami, Portugal—using just my phone and laptop. No tools, no trucks, no on-site visits. Just smart systems and the right approach.
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Below is the exact 12-minute breakdown of how this model works. Watch it, then decide if you're ready to build something real.
              </p>
              <p className="italic text-gray-600">
                — Myles Webb, Remote Operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack Section - What's Included */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-wider text-green-600 mb-4">THE COMPLETE BLUEPRINT</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Get in the 20-Minute Video
            </h2>
            <p className="text-xl text-gray-600">
              No courses. No modules. Just one video with everything.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Value Stack Items */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">The Exact Crew Hiring Scripts</h4>
                  <p className="text-sm text-gray-600">Word-for-word scripts that get quality crews to say yes</p>
                </div>
              </div>
              <span className="text-gray-500 font-medium whitespace-nowrap">$2,000 Value</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center justify-between border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Territory Domination Strategy</h4>
                  <p className="text-sm text-gray-600">How to lock down your city and eliminate competition</p>
                </div>
              </div>
              <span className="text-gray-500 font-medium whitespace-nowrap">$3,000 Value</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center justify-between border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">The 60% Profit Pricing Formula</h4>
                  <p className="text-sm text-gray-600">My calculator that ensures 40-60% margins on every job</p>
                </div>
              </div>
              <span className="text-gray-500 font-medium whitespace-nowrap">$1,500 Value</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center justify-between border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Lead Generation System</h4>
                  <p className="text-sm text-gray-600">3 sources that deliver 50+ qualified leads per month</p>
                </div>
              </div>
              <span className="text-gray-500 font-medium whitespace-nowrap">$2,500 Value</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center justify-between border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">Contract Templates & Legal Docs</h4>
                  <p className="text-sm text-gray-600">The exact contracts I use (lawyer-approved)</p>
                </div>
              </div>
              <span className="text-gray-500 font-medium whitespace-nowrap">$1,000 Value</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center justify-between border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold">First 30 Days Roadmap</h4>
                  <p className="text-sm text-gray-600">Day-by-day plan to your first $10K month</p>
                </div>
              </div>
              <span className="text-gray-500 font-medium whitespace-nowrap">$2,000 Value</span>
            </div>
          </div>

          {/* Total Value */}
          <div className="bg-gray-900 text-white rounded-xl p-6 text-center">
            <p className="text-lg mb-2">Total Value of Everything You're Getting:</p>
            <p className="text-4xl font-bold mb-4">$12,000</p>
            <div className="w-full h-px bg-gray-700 my-4"></div>
            <p className="text-xl mb-2">But You Won't Pay $12,000...</p>
            <p className="text-xl mb-2">You Won't Even Pay $2,000...</p>
            <p className="text-3xl font-bold text-green-400">
              Get Everything Today For Just $497
            </p>
            <Button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold rounded-lg"
            >
              Yes! Give Me The 20-Minute Blueprint →
            </Button>
          </div>
        </div>
      </section>

      {/* Price Justification - Why Only $497? */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              "Why Would You Give Away $12,000 Worth of Secrets for $497?"
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong>Here's the truth:</strong> I used to charge $12,000 for my private coaching program where I'd spend 
                8 weeks teaching this exact system.
              </p>
              
              <p>
                But I realized something... <strong>95% of my students didn't need 8 weeks of hand-holding.</strong> 
                They just needed the blueprint - the exact steps, scripts, and strategies.
              </p>
              
              <p>
                So I did something crazy. I recorded <strong>EVERYTHING</strong> - every secret, every strategy, 
                every template - in one concentrated 20-minute video. No fluff. No filler. Just pure gold.
              </p>
              
              <p className="bg-white border-l-4 border-yellow-500 p-4 italic">
                "I'm basically putting myself out of business by giving this away for $497. But here's my bet: 
                <strong> 10% of you will want my help implementing and will upgrade to the $12K program.</strong> 
                The other 90%? You'll take this blueprint and run with it."
              </p>
              
              <p className="text-lg font-semibold">
                Either way, you win. And at $497, it's a no-brainer.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                ⚠️ Fair Warning: After 100 sales, the price goes to $997
              </p>
              <Button 
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-4 text-lg font-bold rounded-lg shadow-lg"
              >
                Lock In The $497 Price Now →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Mobile Optimized */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm uppercase tracking-wider text-blue-600 mb-3 md:mb-4">REAL RESULTS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Real Success Stories From Our Students
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Success Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 relative">
              <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                TOP PERFORMER
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MC
                </div>
                <div>
                  <h4 className="font-bold">Marcel C.</h4>
                  <p className="text-sm text-gray-600">Phoenix, AZ</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">$67,234/month</p>
              <p className="text-gray-700 mb-3 text-sm">
                "Quit my $85K job after month 4. Best decision ever. The system literally runs itself."
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Started 8 months ago</span>
              </div>
            </div>

            {/* Success Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SK
                </div>
                <div>
                  <h4 className="font-bold">Sarah K.</h4>
                  <p className="text-sm text-gray-600">Dallas, TX</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">$32,150/month</p>
              <p className="text-gray-700 mb-3 text-sm">
                "Single mom, needed flexibility. Hit $30K in month 5. My kids barely notice I work."
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Started 6 months ago</span>
              </div>
            </div>

            {/* Success Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MR
                </div>
                <div>
                  <h4 className="font-bold">Mike R.</h4>
                  <p className="text-sm text-gray-600">Atlanta, GA</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">$28,420/month</p>
              <p className="text-gray-700 mb-3 text-sm">
                "Was skeptical. Now running 3 crews remotely from Thailand. Living the dream."
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Started 5 months ago</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Average time to first $10K month: <strong>67 days</strong></p>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Watch More Video Testimonials →
            </Button>
          </div>
        </div>
      </section>

      {/* What You Get - Value Stack */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Hit $30K/Month
            </h2>
            <p className="text-xl text-gray-600">
              Not just training. A complete business system worth $47,982
            </p>
          </div>

          {/* Value Stack */}
          <div className="bg-gray-50 rounded-xl p-8 space-y-6">
            {[
              { name: '30-Day Launch System', value: '$4,997', desc: 'Step-by-step roadmap to your first deal' },
              { name: '127 Done-For-You Templates', value: '$2,997', desc: 'Contracts, SOPs, scripts, emails - everything' },
              { name: 'Crew Hiring & Training Videos', value: '$1,997', desc: 'Find, hire, and manage remote crews' },
              { name: 'Territory Protection Rights', value: '$19,997', desc: 'Exclusive access to your entire city' },
              { name: 'WhatsApp Mastermind (12 mo)', value: '$2,997', desc: 'Direct access to 6 & 7-figure operators' },
              { name: 'Weekly Group Coaching Calls', value: '$4,997', desc: 'Live troubleshooting every Tuesday' },
              { name: 'Vendor Network Access', value: '$9,997', desc: 'Pre-negotiated rates with 500+ suppliers' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg line-through text-gray-400">{item.value}</p>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t-2 border-gray-300">
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">Total Value:</p>
                <p className="text-2xl line-through text-gray-400">$47,982</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xl font-bold text-green-600">Your Investment Today:</p>
                <p className="text-3xl font-bold text-green-600">$6,997</p>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                or 3 payments of $2,497 (0% interest)
              </p>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-300">
            <div className="flex items-center gap-4">
              <Shield className="w-16 h-16 text-green-600" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  30-Day "Take Action" Guarantee
                </h3>
                <p className="text-gray-700">
                  Follow the system for 30 days. If you don't book your first job, 
                  we'll work with you 1-on-1 until you do, or refund 100%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Objection Handling */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Questions About the 20-Minute Blueprint
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Is this really everything, or do I need the $12k program?",
                a: "The 20-minute video contains 100% of the strategy and tactics. Nothing is held back. The $12k program is for people who want us to implement everything FOR them - done-for-you templates, personal coaching, hand-holding. If you're a self-starter who just needs the blueprint, the $497 video is all you need."
              },
              {
                q: "How is 20 minutes enough to teach everything?",
                a: "Because we cut out all the fluff, theory, and motivational padding. This is pure, concentrated information. Every second is actionable. It's like getting the answer key instead of taking the entire course. We show you exactly what to do, in what order, with what tools."
              },
              {
                q: "What exactly do I get for $497?",
                a: "One 20-minute video that reveals the entire system. Plus, we include the essential templates as a bonus: crew hiring scripts, pricing calculator, and client acquisition formula. That's it. No modules to navigate, no community to participate in, no weekly calls. Just the blueprint."
              },
              {
                q: "Why so cheap if this really works?",
                a: "Because charging $497 means we'll sell 100x more than at $12k. We make our money on volume, and some buyers will eventually upgrade to the full program. Plus, at this price point, there's no excuse not to try it. We'd rather have 1,000 operators succeeding than 10."
              },
              {
                q: "Can I really make $30k/month from a 20-minute video?",
                a: "The video shows you exactly how our top operators hit those numbers. Whether you execute is up to you. It's like having the recipe for Coca-Cola - the value is in the formula, not the time it takes to share it. Most operators see their first deal within 30 days of watching."
              },
              {
                q: "What if I watch it and it doesn't work for me?",
                a: "You have 30 days to get a full refund. No questions asked. Watch the video, try the system for a full month. If you don't see the potential or land your first deal, email us and we'll refund every penny. The risk is entirely on us."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all group">
                <summary className="p-5 cursor-pointer font-medium hover:bg-gray-50 flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-gray-700">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-green-500">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              30-Day "Watch It & Profit" Guarantee
            </h2>
            
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Watch the entire 20-minute blueprint. Implement what you learn for 30 full days. 
              If you don't see a clear path to $10k/month, or if you don't land your first deal, 
              we'll refund every penny.
            </p>
            
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold text-green-800 mb-3">
                Here's How Confident We Are:
              </p>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Watch the video as many times as you want</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Take notes, implement everything we teach</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use our templates and scripts for 30 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>If it doesn't work, get 100% of your money back</span>
                </li>
              </ul>
            </div>
            
            <p className="text-gray-600 mb-8">
              <strong>No tricks, no "action requirements," no hoops to jump through.</strong><br />
              If you're not thrilled, you don't pay. Period.
            </p>
            
            <Button 
              onClick={() => {
                const element = document.querySelector('#apply-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-bold shadow-xl"
            >
              Get Your Blueprint Risk-Free for $497
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Most operators make their investment back in the first deal.
            </p>
          </div>
        </div>
      </section>

      {/* Blue CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Claim Your Piece of This $84T Opportunity?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95">
              Watch our 20-minute training that reveals the exact system to build your remote renovation business
            </p>
            <Button 
              onClick={() => {
                const element = document.querySelector('#apply-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-4 text-lg font-bold shadow-xl transition-all transform hover:scale-105"
            >
              Get Instant Access for $497 →
            </Button>
            <p className="text-sm mt-4 opacity-90">
              Special price saves you $11,503 off the full program
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          {/* Urgency */}
          <div className="bg-red-600 text-white rounded-lg p-3 mb-8 animate-pulse">
            <p className="text-lg font-bold">
              ⚠️ WARNING: This $497 Price Expires When Timer Hits Zero
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            One Video. 20 Minutes. Everything You Need.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the blueprint and run with it
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
            <p className="text-lg text-gray-300 line-through mb-2">
              Regular Price: $12,000
            </p>
            <p className="text-5xl font-bold text-yellow-400 mb-4">
              Today Only: $497
            </p>
            <p className="text-2xl text-green-400 font-bold mb-6">
              You Save $11,503 (96% OFF)
            </p>
            
            <Button 
              onClick={() => {
                const element = document.querySelector('#apply-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-6 text-xl font-bold shadow-2xl"
            >
              Get Instant Access for $497 →
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                SSL Secure
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                30-Day Guarantee
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Watch Immediately
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-400">
            Questions? Email support@remoteops.ai<br />
            30-day money-back guarantee • Instant access after purchase
          </p>
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-40 lg:hidden shadow-2xl">
          <Button 
            onClick={() => {
              const element = document.querySelector('#apply-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 font-bold"
          >
            Get Your Blueprint - Only $497
          </Button>
        </div>
      )}

      {/* Floating Components */}
      <ExitIntentPopup onSubmit={handleEmailCapture} />

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-center text-sm text-gray-400">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white">Earnings Disclaimer</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
          <p>© 2025 APEX Operations LLC. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Earnings Disclaimer: Results are not typical and depend on effort and market conditions. 
            No guarantee of income. Your results may vary.
          </p>
          <p className="mt-2 text-xs">
            APEX Operator License is a business opportunity, not a "get rich quick" scheme.
          </p>
        </div>
      </footer>
    </div>
  );
}