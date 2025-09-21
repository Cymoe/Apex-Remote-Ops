'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ApexLogo } from '@/components/apex-logo';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Import conversion components
import { UrgencyBar } from '@/components/landing/urgency-bar';
import { ExitIntentPopup } from '@/components/landing/exit-intent-popup';
import { TwoStepApply } from '@/components/landing/two-step-apply';
import { TwitterTestimonialsGrid } from '@/components/landing/twitter-testimonials';

export default function OptimizedHome() {
  const router = useRouter();
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
                Build a <span className="text-blue-600">$30K/Month</span><br />
                Remote Home Service Business<br />
                <span className="text-gray-600 font-normal text-base sm:text-lg md:text-xl">
                  (In One 20-Minute Video)
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
                    <strong>Work From Anywhere:</strong> Bali, Dubai, Miami, or from home - manage crews remotely
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    <strong>Private WhatsApp Group:</strong> Real operators sharing what works
                  </span>
                </li>
              </ul>


            </div>

            {/* Right Column - Video + Form */}
            <div className="space-y-6">
              {/* Video */}
              <div className="relative aspect-video bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
                <iframe
                  src="https://www.loom.com/embed/c954a298a53c45dfb558460b77a79552?autoplay=1"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: '0' }}
                  allowFullScreen
                />
              </div>
              
              {/* Form */}
              <div id="apply-form">
                <TwoStepApply />
              </div>
              
              {/* Pricing Box */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-lg font-bold text-gray-800 text-center mb-1">
                  <span className="line-through text-gray-600">Regular Price: $997</span>
                </p>
                <p className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-3">
                  Special Price: $497
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-semibold text-red-800">
                    ⚠️ Only 13 spots left at this price
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* WhatsApp Community Section - Major Value Add */}
      <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-green-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 15.5c0 .55-.45 1-1 1H7.5c-.55 0-1-.45-1-1v-11c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v11z"/>
                </svg>
              </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                  Join Our Community of Winners
                </h2>
              <p className="text-lg text-gray-600">
                Connect with operators building remote service businesses
              </p>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-700">
                Discuss AI tools, systems, hiring, and making money with service businesses.
                <br />
                Share what's working. Get help when stuck.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">
                Included with your purchase • WhatsApp invite sent after payment
              </p>
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
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
                I've condensed everything into the 20-minute video above. Watch it, then decide if you're ready to build something real.
              </p>
              <p className="italic text-gray-600">
                — Myles Webb, Remote Operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Projects That Print Money Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-green-600 mb-3">THE OPPORTUNITY</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              The Projects That Print Money
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              <strong>You don't do ANY of this work</strong> - you broker it. 
              Crews do the labor, you manage from your laptop. <strong>40-60% profit margins.</strong>
            </p>
          </div>

          {/* Featured High-Ticket Services */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 md:p-6 border-2 border-blue-200">
                <div className="mb-2 sm:mb-3 relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image src="/bath.png" alt="Bathroom Remodels" fill className="object-cover" />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">Bathroom Remodels</h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-0.5 sm:mb-1">$8-15K</p>
                <p className="text-xs sm:text-sm text-gray-600">Average project</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 md:p-6 border-2 border-green-200">
                <div className="mb-2 sm:mb-3 relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image src="/deckpatio.png" alt="Deck & Patio" fill className="object-cover" />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">Deck & Patio</h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 mb-0.5 sm:mb-1">$10-25K</p>
                <p className="text-xs sm:text-sm text-gray-600">Summer rush</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 sm:p-4 md:p-6 border-2 border-yellow-200">
                <div className="mb-2 sm:mb-3 relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image src="/eco.png" alt="Eco Upgrades" fill className="object-cover" />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">Eco Upgrades</h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-700 mb-0.5 sm:mb-1">$5-20K</p>
                <p className="text-xs sm:text-sm text-gray-600">Rebates available</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 md:p-6 border-2 border-purple-200">
                <div className="mb-2 sm:mb-3 relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image src="/biophilic.png" alt="Biophilic Design" fill className="object-cover" />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">Biophilic Design</h3>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700 mb-0.5 sm:mb-1">$15-40K</p>
                <p className="text-xs sm:text-sm text-gray-600">Premium clients</p>
              </div>
            </div>

          {/* Additional Services Grid */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="font-bold text-lg mb-6 text-center">
              Plus These High-Margin Services You Can Broker:
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Garage floor coating
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Outdoor hardscaping
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Sauna/cold plunge install
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Landscape lighting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Emergency restoration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Exterior brick painting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Concrete resurfacing
                </li>
              </ul>
              
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Sports courts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Premium playgrounds
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Custom closet systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Excavation projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Senior retrofitting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Commercial construction
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Pool building/cleaning
                </li>
              </ul>
              
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Paving & asphalt
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Pet waste removal
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Garage door install
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Insulation services
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Glass installation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Awnings/shutters
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Junk removal
                </li>
              </ul>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-700 font-medium mb-2">
                🎯 <strong>The Strategy:</strong> Pick ONE to start. Master it. Then expand.
              </p>
              <p className="text-sm text-gray-600">
                Every service above can generate $10-30K/month when operated correctly
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg shadow-lg"
            >
              Learn How to Broker These Services → $497
            </Button>
          </div>
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

      {/* Price Justification - Why Only $497? */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              "Why Only $497?"
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong>Here's the truth:</strong> I used to charge thousands for my private coaching program where I'd spend 
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
                <strong> 10% of you will want my help implementing and will upgrade to the full APEX license.</strong> 
                The other 90%? You'll take this blueprint and run with it."
              </p>
              
              <p className="text-lg font-semibold">
                Either way, you win. And at $497, it's a no-brainer.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">
                ⚠️ Only 13 spots left at $497 (then price goes to $997)
              </p>
              <Button 
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-lg shadow-lg whitespace-nowrap"
              >
                <span className="block sm:hidden">Get $497 Price →</span>
                <span className="hidden sm:block">Lock In The $497 Price Now →</span>
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
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Real Success Stories From Our Students
            </h2>
          </div>

          {/* Twitter-style testimonials */}
          <div className="mb-6 md:mb-8">
            <TwitterTestimonialsGrid />
          </div>

          <div className="text-center">
            <p className="text-gray-600">Average time to first $10K month: <strong>67 days</strong></p>
            <p className="text-xs text-gray-500 mt-2">*Results not typical. See earnings disclaimer.</p>
          </div>
        </div>
      </section>

      {/* What You Get - Value Stack */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              What You Get for $497
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              The complete blueprint and community access
            </p>
          </div>

          {/* Value Stack */}
          <div className="bg-gray-50 rounded-xl p-8 space-y-6">
            {[
              { name: '20-Minute Video Blueprint', value: '$997', desc: 'The exact system revealed step-by-step' },
              { name: 'Crew Hiring Scripts', value: '$497', desc: 'Word-for-word scripts that get crews to say yes' },
              { name: 'Pricing Calculator', value: '$297', desc: '60% profit margin formula on every job' },
              { name: 'Client Acquisition Templates', value: '$397', desc: 'Proven templates for getting your first customers' },
              { name: 'WhatsApp Community Access', value: '$297', desc: 'Connect with active operators sharing what works' },
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
                <p className="text-lg sm:text-xl font-bold">Total Value:</p>
                <p className="text-xl sm:text-2xl line-through text-gray-400">$2,485</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg sm:text-xl font-bold text-green-600">Your Investment Today:</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">$497</p>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                One-time payment - instant access
              </p>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-300">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              ✅ 30-Day Money-Back Guarantee
                </h3>
                <p className="text-gray-700">
                  Watch the video and implement the strategies for 30 days. 
                  If you don't see a clear path to $10K/month, get a full refund.
                </p>
          </div>
        </div>
      </section>

      {/* FAQ - Objection Handling */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
            Questions About the 20-Minute Blueprint
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Is this really everything, or do I need the full APEX license?",
                a: "The 20-minute video contains the exact blueprint I used to build my business. You'll learn the crew hiring scripts, pricing formulas, lead generation methods, and get access to our private WhatsApp group where operators share what's working now."
              },
              {
                q: "How is 20 minutes enough to teach everything?",
                a: "Because we cut out all the fluff, theory, and motivational padding. This is pure, concentrated information. Every second is actionable. It's like getting the answer key instead of taking the entire course. We show you exactly what to do, in what order, with what tools."
              },
              {
                q: "What exactly do I get for $497?",
                a: "One 20-minute video that reveals the entire system. Plus, you get access to our private WhatsApp community where real operators share what's working now - AI tools, systems, hiring strategies, and scaling tactics. We also include essential templates as a bonus: crew hiring scripts, pricing calculator, and client acquisition formula. Simple and actionable."
              },
              {
                q: "Why so cheap if this really works?",
                a: "Because I want to prove this works at scale. At $497, there's no excuse not to try it. Plus, you get access to our WhatsApp community where successful operators are sharing real strategies daily."
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
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              30-Day "Watch It & Profit" Guarantee
            </h2>
            
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Watch the entire 20-minute blueprint. Implement what you learn for 30 full days. 
              If you don't see a clear path to $10k/month, 
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
                const element = document.querySelector('#apply-form');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold shadow-xl rounded-lg"
            >
              <span className="block sm:hidden">Get Blueprint - $497</span>
              <span className="hidden sm:block">Get Your Blueprint Risk-Free for $497</span>
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
              Watch our 20-minute training that reveals the exact system<br />
              to build your $30K/month remote home service business
            </p>
            <Button 
              onClick={() => {
                const element = document.querySelector('#apply-form');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-blue-700 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold shadow-xl transition-all transform hover:scale-105 rounded-lg"
            >
              <span className="block sm:hidden">Get Access - $497</span>
              <span className="hidden sm:block">Get Instant Access for $497 →</span>
            </Button>
            <p className="text-sm mt-4 opacity-90">
              Only 13 spots left at $497 (returns to $997 after)
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            One Video. 20 Minutes. Everything You Need.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the blueprint and run with it
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
            <p className="text-lg text-gray-300 line-through mb-2">
              Regular Price: $997
            </p>
            <p className="text-5xl font-bold text-yellow-400 mb-4">
              Today Only: $497
            </p>
            <p className="text-2xl text-green-400 font-bold mb-6">
              You Save $500 (50% OFF)
            </p>
            
            <Button 
              onClick={() => {
                const element = document.querySelector('#apply-form');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold shadow-2xl rounded-lg"
            >
              <span className="block sm:hidden">Get Access for $497 →</span>
              <span className="hidden sm:block">Get Instant Access for $497 →</span>
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-300">
              <span>
                🔒 SSL Secure
              </span>
              <span>
                ✅ 30-Day Guarantee
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
              const element = document.querySelector('#apply-form');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-sm sm:text-base font-bold rounded-lg"
          >
            Get Blueprint - $497
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
          <p>© {new Date().getFullYear()} APEX Operations LLC. All rights reserved.</p>
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