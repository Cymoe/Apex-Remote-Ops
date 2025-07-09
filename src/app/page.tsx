import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { ApexLogo } from '@/components/apex-logo';

export default async function Home() {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      redirect('/dashboard');
    }
  } catch (error) {
    console.error('Home page error:', error);
    // Continue to render the page even if auth check fails
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black relative" style={{ color: '#E8E6E3' }}>
      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Header */}
      <header className="relative z-20 px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <ApexLogo size="md" className="[&_div[class*='from-professional-blue']]:from-amber-500 [&_div[class*='to-professional-blue']]:to-amber-600 [&_div[class*='border-professional-blue']]:border-amber-500 [&_div[class*='text-professional-blue']]:text-amber-500" />
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 py-12 sm:py-16 md:py-24">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Video */}
          <div className="relative max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 blur-3xl opacity-50"></div>
            <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-gray-800/50">
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.loom.com/embed/c954a298a53c45dfb558460b77a79552?sid=b3f44326-8b4d-4f07-99d7-834091792472"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
              {/* Unmute indicator */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/60 backdrop-blur-md px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs font-mono tracking-wider text-gray-300">
                ▶ UNMUTE
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
            Launch a $10K/month remote<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>home service business
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto tracking-wide font-light leading-relaxed">
            A clear, step-by-step roadmap to build, automate,<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>and scale your service business from anywhere<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>—even with no prior experience.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-8 py-4 sm:px-10 sm:py-5 text-base font-medium rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(251,191,36,0.3)] hover:scale-[1.02] uppercase tracking-wider w-full sm:w-auto"
              asChild
            >
              <Link href="/auth/sign-up">
                Begin Application
              </Link>
            </Button>
          </div>

          {/* Exclusivity Indicators */}
          <div className="space-y-2 text-sm text-gray-400 font-mono">
            <p className="tracking-wider">[ 7 ] Positions Remaining</p>
            <p className="text-xs opacity-70">Next Review Cycle: 72:00:00</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
        <div className="mx-4 text-gray-600">◆</div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
      </div>

      {/* The Protocol Section */}
      <section className="py-16 sm:py-20 md:py-28 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-amber-500/70 text-xs uppercase tracking-[0.3em] mb-6 font-mono">DECLASSIFIED</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light mb-6 tracking-tight">
              Classified Capabilities: The APEX Protocol
            </h2>
            <p className="text-gray-400/90 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
              EVERYTHING you need to build your location-independent contracting empire.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group bg-gradient-to-b from-gray-900 to-gray-900/50 border-gray-800 hover:border-amber-600/30 transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] hover:translate-y-[-2px]">
              <CardContent className="p-6 sm:p-8 text-center">
                <p className="text-xs text-amber-500/60 uppercase tracking-[0.2em] mb-4 font-mono">Protocol A-1</p>
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🎓</div>
                <h4 className="text-lg font-medium mb-3 tracking-wide">PADI-Style Certification</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Progressive learning system</p>
              </CardContent>
            </Card>
            
            <Card className="group bg-gradient-to-b from-gray-900 to-gray-900/50 border-gray-800 hover:border-amber-600/30 transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] hover:translate-y-[-2px]">
              <CardContent className="p-6 sm:p-8 text-center">
                <p className="text-xs text-amber-500/60 uppercase tracking-[0.2em] mb-4 font-mono">Protocol A-2</p>
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🤖</div>
                <h4 className="text-lg font-medium mb-3 tracking-wide">AI Strategic Advisor</h4>
                <p className="text-gray-500 text-sm leading-relaxed">24/7 strategic guidance</p>
              </CardContent>
            </Card>
            
            <Card className="group bg-gradient-to-b from-gray-900 to-gray-900/50 border-gray-800 hover:border-amber-600/30 transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] hover:translate-y-[-2px] sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <p className="text-xs text-amber-500/60 uppercase tracking-[0.2em] mb-4 font-mono">Protocol A-3</p>
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">🚪</div>
                <h4 className="text-lg font-medium mb-3 tracking-wide">Exit Preparation Tools</h4>
                <p className="text-gray-500 text-sm leading-relaxed">M&A preparation resources</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
        <div className="mx-4 text-gray-600">◆</div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
      </div>

      {/* What is the idea Section */}
      <section className="py-20 md:py-28 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-light mb-10">
            What is the idea?
          </h2>
          <p className="text-xl text-gray-300/90 leading-relaxed mb-16 font-light">
            Build, buy, and operate multiple businesses from a distance. Liberate 
            yourself from the shackles of wage slavery, focusing instead on high-value 
            tasks rather than the mundane busywork of day-to-day operations.
          </p>
          
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-10 max-w-2xl mx-auto border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-center group">
                <span className="text-red-500 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">🚫</span>
                <span className="text-lg tracking-wide text-gray-300">This is NOT freelancing</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
              <div className="flex items-center gap-4 justify-center group">
                <span className="text-orange-500 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">💼</span>
                <span className="text-lg tracking-wide text-gray-300">This is NOT a remote job</span>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
              <div className="flex items-center gap-4 justify-center group">
                <span className="text-amber-500 text-2xl">🌍</span>
                <span className="text-lg font-medium tracking-wide">This IS business ownership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-16 px-4 bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* EVERYTHING Quote */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-light mb-8 text-gray-900 leading-relaxed">
              EVERYTHING I've used over the past 3 years and still use daily<br />
              will be accessible through this certification.
            </h2>
            <p className="text-lg text-gray-600 font-light tracking-wide">So, WHO is this certification for?</p>
          </div>

          {/* Three Main Personas */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Established Contractors</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tired of being limited by location?<br />
                Want to scale beyond your local market<br />
                and build operations you can manage<br />
                from anywhere? This system will free<br />
                you from geographical constraints.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Remote-First Entrepreneurs</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ready to turn your expertise into a<br />
                scalable business? This certification<br />
                gives you the fastest path to building<br />
                systems that work without your<br />
                constant presence.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Business Exit Strategists</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Operating consultancies or service<br />
                businesses but want to build<br />
                something sellable? This system<br />
                creates documented processes and<br />
                scalable operations that buyers love.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 px-10 py-4 rounded-2xl font-light tracking-wider border border-gray-700 shadow-[0_2px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
              asChild
            >
              <Link href="/auth/sign-up">
                Submit Application
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4 font-mono tracking-wide opacity-70">Qualification Required</p>
          </div>
        </div>
      </section>

      {/* Also Perfect For Section */}
      <section className="py-12 px-4 bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8 text-gray-700">
            Also perfect for...
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Aspiring Entrepreneurs</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Motivated individuals looking for a simple, scalable business to escape their 9-to-5 and build financial freedom.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Side Hustlers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  People who want to start a profitable home service business part-time before going full-time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Tradespeople & Blue-Collar Workers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Skilled workers (painters, cleaners, landscapers) looking to start their own business instead of working for someone else.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Burned-Out Corporate Professionals</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  High-achieving employees tired of corporate life who want more autonomy, flexibility, and control over their income.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* You're in the right place if Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-center mb-12">
              You're also in the right place if...
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <span className="text-blue-500 font-bold text-2xl">01</span>
                <p className="text-gray-300 text-lg">You want to learn how to become a top-level remote operator.</p>
              </div>
              
              <div className="flex gap-4">
                <span className="text-blue-500 font-bold text-2xl">02</span>
                <p className="text-gray-300 text-lg">You want to build more than just a job. You want to solve problems and build a sellable business.</p>
              </div>
              
              <div className="flex gap-4">
                <span className="text-blue-500 font-bold text-2xl">03</span>
                <p className="text-gray-300 text-lg">You want to use systems to scale 10x faster instead of working harder and longer hours.</p>
              </div>
              
              <div className="flex gap-4">
                <span className="text-blue-500 font-bold text-2xl">04</span>
                <p className="text-gray-300 text-lg">You want to leverage your expertise so you can literally 'earn while you travel'.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* But How Do You Actually Scale to 7 Figures? - Transition Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-light mb-6 text-center">
            But How Do You Actually Scale to 7 Figures?
          </h2>
          <p className="text-xl text-gray-300 mb-8 text-center">
            Now that you understand the vision, let me show you the proven system that's generated over $2M in revenue...
          </p>
          <p className="text-lg text-gray-400 mb-12 text-center">
            Introducing the APEX Remote Operations Certification
          </p>
          
          <div className="space-y-8 text-gray-300">
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">Stop using the same old remote work strategy...</h3>
              <p className="text-lg leading-relaxed">
                In today's competitive business world, to stay ahead, you need to be building location-independent operations 
                every single day—sometimes managing multiple markets at once!
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-light mb-3">Ever wonder how in just 3 years...</h3>
              <p className="text-lg leading-relaxed mb-3">
                I've built and scaled multiple 7-figure remote contracting businesses across different markets while 
                traveling the world? That's over <span className="text-green-500 font-bold">$2M in combined revenue</span>.
              </p>
              <p className="text-gray-400 italic">It just doesn't add up, does it?</p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-light mb-3">Well here's my secret...</h3>
              <p className="text-lg leading-relaxed">
                What if I told you there was a smarter, faster way to build scalable, location-independent operations 
                without spending years figuring it out?
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-12">
            <div>
              <h3 className="font-serif text-2xl font-light mb-4">How does it work?</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Use technology, people, and systems to work smarter, not harder, and build 
                businesses that generate steady income on their own. Once a business 
                becomes self-sustaining, move on to the next one, repeat the process and 
                continue to expand your portfolio.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-light mb-4">What can you expect to learn?</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                High leverage opportunity vehicles for consistent cash flow. Focus on 
                controllable outcomes with outsized returns. Create real value and develop 
                tangible skill sets. Build valuable assets that can be sold for lucrative exits.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Why am I doing this Section */}
      <section className="py-12 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-light mb-8">
            Why am I doing this?
          </h2>
          
          <div className="mb-8">
            <Image
              src="/heromyles.jpg"
              alt="Myles Webb on a boat"
              width={800}
              height={400}
              className="rounded-xl mx-auto"
            />
          </div>
          
          <div className="space-y-6 text-gray-300 text-base leading-relaxed text-left max-w-3xl mx-auto">
            <p>
              This is a specialized knowledge base designed to meet all the needs I had years ago. For the longest time I 
              wanted to travel and produce an income at the same time.
            </p>
            
            <p>
              We're experiencing an era where remote business is entirely feasible, whereas just one generation ago, this 
              wasn't the case. It's almost as if the world has been unlocked just for you to experience and enjoy.
            </p>
            
            <p>
              Although I may not have the resources for ongoing training, my goal remains to equip you with the essential 
              knowledge needed to embrace a location-independent lifestyle.
            </p>
            
            <div className="mt-8">
              <a 
                href="https://myleskameron.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 text-sm transition-colors"
              >
                More at myleskameron.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Wealth Section */}
      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-light mb-4">
            What is Wealth?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            True wealth encompasses all three dimensions
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-medium mb-3">Money Wealth</h3>
                <p className="text-gray-400 text-sm">
                  Earn your way into an excess of capital
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="text-xl font-medium mb-3">Time Wealth</h3>
                <p className="text-gray-400 text-sm">
                  Implement people and systems for freedom
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-xl font-medium mb-3">Location Wealth</h3>
                <p className="text-gray-400 text-sm">
                  Work and live anywhere in the world
                </p>
              </CardContent>
            </Card>
          </div>

          <Button 
            size="lg" 
            className="mt-10 bg-transparent hover:bg-amber-600/10 text-amber-500 border border-amber-600/50 px-8 py-3 text-base font-medium rounded-full hover:border-amber-600 transition-all"
            asChild
          >
            <Link href="/auth/sign-up">
              Request Access
            </Link>
          </Button>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
        <div className="mx-4 text-gray-600">◆</div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-light mb-12 text-center">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "Who is Remote Operations AI for?",
                answer: "This system is perfect for aspiring entrepreneurs, side hustlers, tradespeople looking to start their own business, investors seeking semi-passive income, and burned-out corporate professionals wanting more control over their work life.",
                defaultOpen: true
              },
              {
                question: "Do I need any technical or AI knowledge to use this system?",
                answer: "No technical knowledge required! Our system is designed for complete beginners. We provide step-by-step guidance and pre-built AI tools that work out of the box."
              },
              {
                question: "How quickly can I start making money?",
                answer: "Most members land their first client within 30 days of implementing our system. Some have closed deals worth $5,000+ in their first month."
              },
              {
                question: "What's the difference between the basic course and APEX Certification?",
                answer: "The basic course focuses on getting to your first $10K/month with fundamentals. APEX Certification is our advanced program for scaling to 7 figures, including PADI-style progression, AI mentorship, exit strategies, and access to our elite operator network."
              },
              {
                question: "How does the PADI-style certification work?",
                answer: "Similar to diving certifications, you progress through levels: Foundation (0-$10K), Advanced ($10-50K), Master ($50K-$500K), and Exit Ready ($500K+). Each level unlocks new strategies, tools, and network access."
              },
              {
                question: "What if I have questions or need help after purchasing?",
                answer: "You'll have access to our private community, weekly Q&A calls, and 24/7 AI mentor support. Plus, we offer a 30-day money-back guarantee if you're not satisfied."
              },
              {
                question: "How much money do I need to start?",
                answer: "You can start with less than $500. Our system shows you how to bootstrap your business and reinvest profits for growth without taking on debt."
              },
              {
                question: "Can I really build a business I can sell?",
                answer: "Yes! Our APEX members have successfully exited businesses for $500K to $2.1M. We teach you to build with the end in mind, creating documented systems and processes that make your business attractive to buyers."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-900/30 to-gray-900/10 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300">
                <details open={faq.defaultOpen} className="group">
                  <summary className="flex items-center justify-between p-8 cursor-pointer hover:bg-gray-900/20 transition-all">
                    <span className="text-lg font-light tracking-wide pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 text-xl font-thin text-gray-500 group-open:hidden opacity-50">+</span>
                    <span className="flex-shrink-0 text-xl font-thin text-gray-500 hidden group-open:block opacity-50">−</span>
                  </summary>
                  <div className="px-6 pb-6">
                    {faq.defaultOpen && (
                      <div className="space-y-3">
                        <p className="font-medium">You'll learn:</p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span>How to analyze your strengths and differentiate yourself from competitors</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span>The exact framework for identifying your ideal audience (who will actually pay for your expertise)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span>Which content pillars to focus on for maximum engagement and monetization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            <span>Why being "just another fitness creator" is keeping you stuck trading time for money</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    {!faq.defaultOpen && (
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    )}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* The Only One We've Ever Trusted */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Exclusive Header */}
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl sm:text-5xl font-light mb-8 leading-tight">
              In 3 Years, We've Only Shared This System With One Person
            </h2>
            <div className="flex items-center justify-center gap-4 text-amber-500/70 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent w-32"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-mono">Highly Exclusive</span>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent w-32"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Thousands have asked. We've said no to everyone. Except one.
            </p>
          </div>

          {/* Marcel's Story */}
          <Card className="bg-gradient-to-br from-amber-900/10 to-gray-900 border-amber-600/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-full min-h-[400px]">
                  <Image
                    src="/campos.jpg"
                    alt="Marcel Campos"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 md:block hidden"></div>
                </div>
                
                {/* Content Side */}
                <div className="p-8 md:p-12 space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-light mb-2 text-amber-500">Marcel Campos</h3>
                    <p className="text-gray-400 text-sm uppercase tracking-wide">Operator 001 • The Chosen One</p>
                  </div>
                  
                  <div className="space-y-4 text-gray-300">
                    <p className="text-lg font-medium">
                      An immigrant from Brazil who arrived with nothing but a bag and a dream.
                    </p>
                    
                    <p>
                      Marcel wasn't looking for handouts. He was a hard worker with bigger dreams than anyone we'd met. 
                      That's why we chose him.
                    </p>
                    
                    <p>
                      We gave him access to the APEX System - the same system we'd kept locked away for years. 
                      The transformation was immediate.
                    </p>
                  </div>
                  
                  <div className="border-t border-amber-600/30 pt-6">
                    <div className="text-4xl font-bold text-amber-500 mb-2">$3 Million</div>
                    <p className="text-gray-400">Current Status: [$3M Revenue - Verified]</p>
                    <p className="text-sm text-gray-500 mt-2">From zero to empire in 18 months</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Challenge */}
          <div className="text-center mt-16 space-y-6">
            <p className="text-xl text-gray-300 font-medium">
              If Marcel could do it - starting with nothing - what's your excuse?
            </p>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-400">
                But here's the thing: We're not looking for everyone. We're looking for the next Marcel. 
                Someone who won't just use this system, but will honor it. Someone who understands that 
                with great power comes great responsibility.
              </p>
            </div>
            
            <p className="text-amber-500 font-semibold text-lg">
              Are you worthy of this knowledge?
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 bg-black text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-light">
            Will You Be The Next One?
          </h2>
          <p className="text-lg text-gray-400">
            We're not accepting everyone. Only those who prove they're ready.
          </p>
          <Button 
            size="lg" 
            className="bg-amber-600 hover:bg-amber-700 text-black px-8 py-3 text-base font-bold rounded-lg"
            asChild
          >
            <Link href="/auth/sign-up">
              Apply For Access
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black text-center border-t border-gray-900">
        <p className="text-sm text-gray-500/80">
          © 2024 Remote Operations. All rights reserved.
        </p>
      </footer>
    </div>
  );
}