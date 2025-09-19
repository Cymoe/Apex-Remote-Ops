'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/apex-logo';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [availableSpots, setAvailableSpots] = useState(7);
  
  // Get current quarter dynamically
  const getCurrentQuarter = () => {
    const month = new Date().getMonth();
    if (month < 3) return 'Q1';
    if (month < 6) return 'Q2';
    if (month < 9) return 'Q3';
    return 'Q4';
  };
  
  // Get upcoming quarter
  const getUpcomingQuarter = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    if (month < 3) return 'Q2';
    if (month < 6) return 'Q3';
    if (month < 9) return 'Q4';
    return `Q1 ${year + 1}`;
  };
  
  const handleApply = () => {
    router.push('/apply');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <ApexLogo size="md" className="[&_div]:from-black [&_div]:to-gray-800" />
          <div className="flex items-center gap-6">
            <Button 
              onClick={handleApply}
              size="sm"
              className="hidden sm:flex bg-gray-900 text-white hover:bg-gray-800 border-gray-900"
            >
              Apply for {getUpcomingQuarter()}
            </Button>
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

      {/* Author Editorial Section */}
      <section className="py-12 px-4 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-2/5">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <Image 
                  src="/myles.jpg" 
                  alt="Myles Webb - Remote Operations Expert" 
                  width={400} 
                  height={500} 
                  className="w-full grayscale contrast-110 scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>
            <div className="lg:w-3/5">
              <div className="prose prose-lg">
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">FROM THE FOUNDER</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  "I Went From $0 to $1.2M Running Renovation Businesses From My Laptop"
                </h3>
                <p className="text-gray-700 mb-4">
                  Hey, I'm Myles. Five years ago, I was stuck in the same trap you're in now. 
                  Trading time for money, watching my income plateau, knowing there had to be something better.
                </p>
                <p className="text-gray-700 mb-4">
                  Then I discovered something counterintuitive: While everyone was chasing tech startups and crypto, 
                  the real money was hiding in "boring" businesses nobody wanted to talk about. 
                  Renovation. Flooring. Painting. The unsexy stuff that actually pays.
                </p>
                <p className="text-gray-700 mb-4">
                  Today, I run multiple six-figure renovation businesses from anywhere—Bali, Miami, Portugal—using 
                  just my phone and laptop. No tools, no truck, no on-site visits. Just smart systems and the right approach.
                </p>
                <p className="text-gray-900 font-semibold">
                  Below is the exact 12-minute breakdown of how this model works. 
                  Watch it, then decide if you're ready to build something real.
                </p>
                <p className="text-gray-600 italic mt-4">
                  — Myles Webb, Remote Operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Video Embed */}
          <div className="relative aspect-video bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src="https://www.loom.com/embed/c954a298a53c45dfb558460b77a79552"
              className="absolute inset-0 w-full h-full"
              style={{ border: '0' }}
              allowFullScreen
            />
          </div>
          
          {/* CTA after video */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Want the complete system to build your remote renovation business?</p>
            <Link href="/lp/operator-497">
              <Button className="bg-gray-900 text-white border-gray-900 hover:bg-gray-800">
                See Our Special Training Offer →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Hidden Opportunity */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  The $84 Trillion Hidden Opportunity Everyone's Missing
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  While everyone fights over AI-threatened jobs, a massive wealth transfer is quietly happening in "boring" industries no one talks about.
                </p>
                <p className="text-lg text-gray-700">
                  <strong>10,000 baby boomers retire every single day.</strong> With 52% of businesses owned by people 55+, 
                  trillions in home service businesses need new operators. This closing window won't last forever.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl font-bold text-gray-900 mb-2">$84T</div>
              <p className="text-sm text-gray-600">Wealth Transfer Through 2045</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000</div>
              <p className="text-sm text-gray-600">Boomers Retiring Daily</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-4xl font-bold text-gray-900 mb-2">90 Days</div>
              <p className="text-sm text-gray-600">To Your First $30K Month</p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why "Unsexy" Businesses Are Your Goldmine:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700"><strong>Zero Silicon Valley Competition:</strong> While everyone chases the next app, renovation businesses print money quietly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700"><strong>Recession-Proof Revenue:</strong> Pipes burst in any economy. Roofs leak regardless of stock prices.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700"><strong>AI-Immune Forever:</strong> ChatGPT can't swing a hammer or install flooring</span>
              </li>
            </ul>
          </div>

          {/* The Reality vs The Possibility */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Escape The Corporate Trap</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative">
                <Image 
                  src="/home_1.jpg" 
                  alt="Stressed office worker - corporate burnout" 
                  width={400} 
                  height={300} 
                  className="rounded-lg shadow-lg w-full h-64 object-cover opacity-90"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <p className="text-white font-semibold">Your Monday Morning</p>
                  <p className="text-gray-200 text-sm">Another week, same cubicle</p>
                </div>
              </div>
              <div className="relative">
                <Image 
                  src="/home_3.jpg" 
                  alt="Overwhelmed with deadlines and stress" 
                  width={400} 
                  height={300} 
                  className="rounded-lg shadow-lg w-full h-64 object-cover opacity-90"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <p className="text-white font-semibold">Your Friday Night</p>
                  <p className="text-gray-200 text-sm">Exhausted, nothing to show</p>
                </div>
              </div>
              <div className="relative">
                <Image 
                  src="/home_2.jpg" 
                  alt="Working from paradise - the result" 
                  width={400} 
                  height={300} 
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <p className="text-white font-semibold">Your New Reality</p>
                  <p className="text-gray-200 text-sm">90 days from today</p>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-700 mt-6 text-lg">
              <strong>The choice is yours:</strong> Another day in the box, or 90 days to freedom?
            </p>
          </div>

          {/* Project Types That Make This Possible */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">The Projects That Print Money</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <Image 
                  src="/bath.png" 
                  alt="Bathroom remodeling projects" 
                  width={300} 
                  height={200} 
                  className="rounded-lg shadow-md w-full h-40 object-cover mb-3"
                />
                <p className="font-semibold text-gray-900">Bathroom Remodels</p>
                <p className="text-sm text-gray-600">$8-15K avg • 2 weeks</p>
              </div>
              <div className="text-center">
                <Image 
                  src="/deckpatio.png" 
                  alt="Deck and patio installations" 
                  width={300} 
                  height={200} 
                  className="rounded-lg shadow-md w-full h-40 object-cover mb-3"
                />
                <p className="font-semibold text-gray-900">Deck & Patio</p>
                <p className="text-sm text-gray-600">$10-25K • Summer rush</p>
              </div>
              <div className="text-center">
                <Image 
                  src="/eco.png" 
                  alt="Eco-friendly renovations" 
                  width={300} 
                  height={200} 
                  className="rounded-lg shadow-md w-full h-40 object-cover mb-3"
                />
                <p className="font-semibold text-gray-900">Eco Upgrades</p>
                <p className="text-sm text-gray-600">$5-20K • Rebates</p>
              </div>
              <div className="text-center">
                <Image 
                  src="/biophilic.png" 
                  alt="Biophilic design and living walls" 
                  width={300} 
                  height={200} 
                  className="rounded-lg shadow-md w-full h-40 object-cover mb-3"
                />
                <p className="font-semibold text-gray-900">Biophilic Design</p>
                <p className="text-sm text-gray-600">$15-40K • Premium clients</p>
              </div>
            </div>
            
            {/* Additional Project Types */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-8">
              <p className="text-sm font-semibold text-gray-700 mb-3">Plus These High-Margin Services:</p>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Garage renovations and floor coating</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Outdoor hardscaping</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Sauna/cold plunge installation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Outdoor home/landscape lighting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Emergency restoration (flooding/fire)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Exterior brick painting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Concrete/asphalt resurfacing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Sports courts (basketball, batting, putting greens)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>High-end playgrounds/play gyms</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Custom closet & garage shelving</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Excavations</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Retrofitting for seniors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Commercial construction</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Pool building/cleaning</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Paving & asphalt</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Pet waste removal</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Garage door installation/repairs</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Insulation/performance contracting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Glass installers</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Awnings/storm shutters</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>Junk removal</span>
                </div>
              </div>
            </div>
            
            <p className="text-center text-gray-700 mt-6 text-lg font-semibold">
              You broker the deals. Crews do the work. You keep 40-60% profit.
            </p>
          </div>
          
          {/* CTA Box for Special Offer */}
          <div className="bg-zinc-900/95 rounded-xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Claim Your Piece of This $84T Opportunity?
            </h3>
            <p className="text-zinc-300 mb-6">
              Watch our 20-minute training that reveals the exact system to build your remote renovation business
            </p>
            <Link href="/lp/operator-497">
              <Button className="bg-white text-zinc-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Get Instant Access for $497 →
              </Button>
            </Link>
            <p className="text-zinc-400 text-sm mt-4">
              Special price saves you $11,503 off the full program
            </p>
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
              Meanwhile, our operators averaged $42K/month. 
              <span className="block mt-2 font-semibold text-gray-900">Which side would you rather be on?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 px-4 bg-gray-50">
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

      {/* The Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">
            The $30K/Month Ceiling That Traps Every Contractor
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            You've built a solid local business. You're making decent money. But you're still trading hours for dollars, 
            tied to job sites, managing crews in person, and watching your margins shrink as you scale.
          </p>
          
          <p className="text-lg text-gray-700 text-center mb-8">
            Meanwhile, a new breed of "Remote Operators" are quietly revolutionizing the game:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Contractor */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-red-600">Traditional Contractor</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span className="text-gray-700">Stuck in one location</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span className="text-gray-700">Trading time for money</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span className="text-gray-700">Managing crews in person</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span className="text-gray-700">Income tied to hours worked</span>
                </li>
              </ul>
            </div>
            
            {/* Remote Operator */}
            <div className="bg-gray-900 text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Remote Operator (You)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Operate from anywhere</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Systems run the business</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Virtual crew management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-100">Income scales without you</span>
                </li>
              </ul>
            </div>
          </div>
          
          <p className="text-lg font-semibold text-center mt-8 text-gray-900">
            The difference? They have the systems. And now, so can you.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Remote Renovation Empire?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the next cohort of Remote Operators and transform your business in 90 days.
          </p>
          <Button 
            onClick={handleApply}
            className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 text-lg font-medium rounded-md transition-colors"
          >
            Apply Now →
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            Apply for {getUpcomingQuarter()} • $97 application fee
          </p>
          
          {/* Alternative Path */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 mb-3">Not ready to apply?</p>
            <Link href="/lp/operator-497" className="text-gray-400 hover:text-gray-300 font-medium">
              Start with our $497 video training instead →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <ApexLogo size="sm" className="[&_div]:from-black [&_div]:to-gray-800" />
              <span className="text-sm text-gray-600">© 2024 Remote Operations. All rights reserved.</span>
            </div>
            
            <nav className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-black">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-black">
                Terms
              </Link>
              <Link href="/nda" className="text-sm text-gray-600 hover:text-black">
                NDA
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}