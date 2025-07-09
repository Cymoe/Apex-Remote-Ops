import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen,
  MessageCircle,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  CheckCircle2,
  Globe,
  Award,
  Target,
  Star,
  ArrowRight,
  PlayCircle,
  Zap,
  DollarSign,
  Clock,
  BarChart3
} from 'lucide-react';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">The Remote Operations Certification That Got Me $2M+ in Revenue</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Master Remote Operations Like a{' '}
            <span className="text-blue-600">PADI Diver</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every guide and step-by-step process you need to build your first or next 7-figure location-independent contracting business.
          </p>

          {/* Loom Video */}
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden max-w-4xl mx-auto" style={{ aspectRatio: '16/9' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.loom.com/embed/c954a298a53c45dfb558460b77a79552?sid=b3f44326-8b4d-4f07-99d7-834091792472"
                frameBorder="0"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '1rem'
                }}
              />
            </div>
          </div>

          {/* Primary CTA */}
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
            asChild
          >
            <Link href="/auth/sign-up">
              Start Your Certification Journey
            </Link>
          </Button>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Stop using the same old remote work strategy...
          </h2>
          
          <div className="space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
            <p>
              In today's competitive business world, to stay ahead, you need to be building 
              <strong> location-independent operations every single day</strong>—sometimes managing multiple markets at once!
            </p>
            
            <p className="text-xl font-semibold text-gray-900">
              But seriously, who has the time to figure out remote team management, systems, and scaling from scratch?
            </p>
            
            <p>
              Ever wonder how in just 3 years, I've built and scaled multiple 7-figure remote contracting businesses 
              across different markets while traveling the world? That's over <strong>$2M in combined revenue</strong>.
            </p>
            
            <p className="text-xl font-semibold text-gray-900">
              It just doesn't add up, does it?
            </p>
            
            <p className="text-2xl font-bold text-blue-600">
              Well here's my secret...
            </p>
            
            <p>
              What if I told you there was a smarter, faster way to build scalable, location-independent 
              operations without spending years figuring it out, struggling with team management, or being tied to one location?
            </p>
            
            <p>
              Welcome to my <strong>Remote Operations Certification</strong> – the exact methods I used to scale 
              <strong> hundreds of contractors and consultants</strong> across multiple markets in 36 months. 
              This system consistently produces profitable, scalable businesses. And now, for the first time ever, 
              I'm giving you the complete blueprint.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            The Most Powerful Remote Operations System Ever Made.
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This certification includes EVERYTHING you need to build your location-independent contracting empire.
          </p>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Including mastering remote team management, how to scale across markets, and how to find 
            a proven vault of pre-tested operational systems.
          </p>
          
          {/* Visual representation */}
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">PADI-Style Certification</h3>
                <p className="text-sm text-gray-600">Progressive learning system</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Apex AI Mentor</h3>
                <p className="text-sm text-gray-600">24/7 strategic guidance</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Business Exit Tools</h3>
                <p className="text-sm text-gray-600">M&A preparation resources</p>
              </div>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-full"
            asChild
          >
            <Link href="/auth/sign-up">
              Get Certified Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-blue-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            EVERYTHING I've used over the past 3 years and still use daily will be accessible through this certification.
          </h2>
          
          <p className="text-center text-xl text-gray-600 mb-12">
            So, WHO is this certification for?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "🏗️",
                title: "Established Contractors",
                description: "Tired of being limited by location? Want to scale beyond your local market and build operations you can manage from anywhere? This system will free you from geographical constraints."
              },
              {
                icon: "🚀",
                title: "Remote-First Entrepreneurs",
                description: "Ready to turn your expertise into a scalable business? This certification gives you the fastest path to building systems that work without your constant presence."
              },
              {
                icon: "💼",
                title: "Business Exit Strategists",
                description: "Operating consultancies or service businesses but want to build something sellable? This system creates documented processes and scalable operations that buyers love."
              }
            ].map((item, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-full"
              asChild
            >
              <Link href="/auth/sign-up">
                This Is Me - Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            If That's You, Then You're in the Right Place.
          </h2>
          
          <p className="text-xl text-gray-600">You're also in the right place if...</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                text: "You want to learn how to become a top-level remote operator."
              },
              {
                number: "02", 
                text: "You want to build more than just a job. You want to solve problems and build a sellable business."
              },
              {
                number: "03",
                text: "You want to use systems to scale 10x faster instead of working harder and longer hours."
              },
              {
                number: "04",
                text: "You want to leverage your expertise so you can literally 'earn while you travel'."
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm bg-gray-50">
                <CardContent className="p-8">
                  <div className="text-3xl font-bold text-gray-900 mb-4">{item.number}</div>
                  <p className="text-lg text-gray-700 leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-full"
            asChild
          >
            <Link href="/auth/sign-up">
              Give Me The System
            </Link>
          </Button>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Here is how this certification is the next step for you:
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  In the certification, you'll learn how to find markets, what systems to build, 
                  when to scale, and how to manage remote teams.
                </p>
                
                <p className="text-lg text-gray-700">
                  Each of these is essential to your success.
                </p>
                
                <p className="text-lg text-gray-700">
                  Through this certification, you will learn the fastest way to scale, 
                  avoid months of trial and error, and build a business you can sell.
                </p>
                
                <p className="text-lg font-semibold text-gray-900">
                  It's like skipping the line to location independence.
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-full"
                asChild
              >
                <Link href="/auth/sign-up">
                  Start Building My Empire
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-1/2 space-y-4">
              {[
                "Finding Your Market",
                "Understanding Remote Operations",
                "Building Your Team", 
                "Scaling & Exit Strategy"
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">{item}</span>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Real Results From APEX Members
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                result: "$1.2M Revenue",
                timeframe: "18 months",
                description: "Built remote HVAC operation across 3 states"
              },
              {
                result: "4x Growth",
                timeframe: "12 months", 
                description: "Scaled consulting practice to $500K ARR"
              },
              {
                result: "Sold for $2.1M",
                timeframe: "24 months",
                description: "Exited remote cleaning service business"
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{item.result}</div>
                  <div className="text-sm text-gray-500 mb-4">in {item.timeframe}</div>
                  <p className="text-gray-700">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Join APEX Remote Operations
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-gray-900">$497</div>
                <div className="text-xl text-gray-600">/ month</div>
                <div className="text-sm text-gray-500">+ $997 one-time certification fee</div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-full"
                asChild
              >
                <Link href="/auth/sign-up">
                  Start Your Certification
                </Link>
              </Button>
              
              <div className="space-y-3 text-left">
                {[
                  "Complete PADI-style certification progression",
                  "50+ hours of premium video content with monthly updates",
                  "Apex AI mentor with 24/7 access to strategic guidance",
                  "Live monthly strategy sessions with 7-figure operators",
                  "Professional pitch deck generator for business exits",
                  "Private network of elite remote contractors",
                  "Battle-tested systems for remote team management",
                  "Proven frameworks for scaling across multiple markets"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to build your remote empire?
          </h2>
          <p className="text-xl text-gray-300">
            Join the elite network of location-independent operators building the future of business.
          </p>
          <Button 
            size="lg" 
            className="bg-white hover:bg-gray-100 text-black px-8 py-4 text-lg font-semibold rounded-full"
            asChild
          >
            <Link href="/auth/sign-up">
              Begin Certification Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}