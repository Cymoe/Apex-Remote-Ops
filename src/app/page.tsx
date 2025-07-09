import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PlayCircle,
  BookOpen,
  MessageCircle,
  Calendar,
  Users,
  TrendingUp,
  Shield,
  CheckCircle2,
  ChevronDown,
  Globe,
  Award,
  Target,
  Briefcase,
  Clock,
  DollarSign
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

  const features = [
    {
      icon: BookOpen,
      title: "PADI-Style Certification Courses",
      description: "Progressive learning modules from Open Water Remote Operator to Master Instructor level"
    },
    {
      icon: MessageCircle,
      title: "Apex AI Mentor",
      description: "24/7 AI assistant trained on remote operations strategies and business systems"
    },
    {
      icon: Calendar,
      title: "Live Strategy Sessions",
      description: "Monthly group calls with successful remote operators sharing real-world insights"
    },
    {
      icon: Users,
      title: "Elite Operator Network",
      description: "Private community of location-independent contractors and consultants"
    },
    {
      icon: TrendingUp,
      title: "Business Exit Tools",
      description: "Professional pitch deck generator and M&A preparation resources"
    },
    {
      icon: Shield,
      title: "Proven Systems",
      description: "Battle-tested frameworks for remote team management and operations"
    }
  ];

  const targetAudiences = [
    {
      title: "Ambitious Contractors",
      description: "Established contractors ready to scale beyond local markets and build location-independent operations."
    },
    {
      title: "Remote-First Entrepreneurs", 
      description: "Business owners looking to systematize operations and manage teams from anywhere in the world."
    },
    {
      title: "High-Performing Consultants",
      description: "Professional service providers who want to build scalable, sellable businesses with remote operations."
    },
    {
      title: "Serial Entrepreneurs",
      description: "Experienced business builders interested in the contracting/consulting space with proven remote models."
    },
    {
      title: "Investment-Minded Operators",
      description: "People looking to build businesses designed for eventual sale, with strong systems and documented processes."
    }
  ];

  const benefits = [
    "Complete PADI-style certification progression from beginner to master level",
    "50+ hours of premium video content with monthly updates and new case studies",
    "Apex AI mentor with 24/7 access to strategic guidance and operational advice", 
    "Live monthly strategy sessions with 7-figure remote operators",
    "Professional pitch deck generator for business exits and M&A preparation",
    "Private network access to elite remote contractors and consultants",
    "Battle-tested systems for remote hiring, training, and team management",
    "Proven frameworks for scaling operations across multiple markets"
  ];

  const faqs = [
    {
      question: "Who is APEX Remote Operations for?",
      answer: "APEX is designed for established contractors, consultants, and entrepreneurs who want to build location-independent businesses. Our members typically have some business experience and are looking to scale beyond local markets or systematize their operations for eventual sale."
    },
    {
      question: "Do I need experience with remote operations to get started?",
      answer: "No prior remote operations experience is required. Our PADI-style certification system starts with Open Water Remote Operator fundamentals and progresses to advanced multi-market strategies. However, some business or contracting experience is helpful."
    },
    {
      question: "How quickly can I start seeing results?",
      answer: "Most members begin implementing remote systems within their first 30 days. The Open Water certification typically takes 2-3 weeks to complete, after which you'll have the foundational systems to start operating remotely. Full transformation to location-independence typically takes 6-12 months."
    },
    {
      question: "What if I need help after joining?",
      answer: "You'll have access to our Apex AI mentor 24/7, monthly live strategy sessions, and our private community of successful operators. Plus, our progressive certification system ensures you're never stuck without clear next steps."
    },
    {
      question: "How much money do I need to start?",
      answer: "The specific amount varies by industry and market, but most of our successful members started their remote transformation with $10K-50K in working capital. Our courses include detailed financial planning modules to help you determine your specific requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <Badge variant="secondary" className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/30">
            <Globe className="w-3 h-3 mr-1" />
            Invitation-Only Mastermind
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            Master Remote Operations Like a 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"> PADI Diver</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            The world's first certification system for location-independent contractors. 
            Progress from Open Water Remote Operator to Master Instructor, building a 
            scalable business you can run from anywhere.
          </p>

          {/* Video Placeholder */}
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden max-w-3xl mx-auto aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <PlayCircle className="w-16 h-16 text-blue-400 mx-auto" />
                <p className="text-gray-400">Watch: How I Built a $2M Remote Contracting Empire</p>
              </div>
            </div>
          </div>

          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
            Start Your Certification Journey
          </Button>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Here's what you'll get</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About the Instructor */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border-blue-600/30 overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold">Learn from the Instructor</h2>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                    <Award className="w-12 h-12 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Master Instructor Level</h3>
                    <p className="text-gray-400">Remote Operations Specialist</p>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto space-y-4 text-gray-300">
                  <p>
                    Built and scaled multiple 7-figure remote contracting businesses across different markets. 
                    Developed the PADI-inspired certification system used by hundreds of successful operators.
                  </p>
                  <p>
                    Former corporate executive turned location-independent entrepreneur. Now teaches others 
                    how to build businesses they can run from anywhere in the world.
                  </p>
                </div>

                <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                  View Full Background
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Who this is for</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">{audience.title}</h3>
                <p className="text-gray-400 max-w-md mx-auto">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Join APEX Remote Operations</h2>
            <div className="text-center">
              <span className="text-4xl font-bold">$497</span>
              <span className="text-xl text-gray-400"> / month</span>
              <span className="text-gray-500 ml-2">+ $997 certification fee</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg"
          >
            Start Your Certification
          </Button>

          <div className="space-y-4 text-left max-w-lg mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Frequently asked questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white text-left">{faq.question}</CardTitle>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to dive in?</h2>
          <p className="text-gray-400">
            Join the elite network of location-independent operators building the future of remote business.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            asChild
          >
            <Link href="/auth/sign-up">
              Begin Certification
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}