'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { notFound, redirect, useRouter } from 'next/navigation';
import { getUserAccessClient } from '@/lib/user-access-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Download, MessageCircle, Lock, Sparkles, CheckCircle2, FileText, Calculator, Users } from 'lucide-react';

export default function BlueprintVideoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    async function checkAccess() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/sign-in');
        return;
      }
      
      const userAccess = await getUserAccessClient(user.email || null);
      
      // Check if user has video access
      if (!userAccess.hasVideoAccess && userAccess.purchaseType !== 'video_only') {
        router.push('/404');
        return;
      }
      
      setHasAccess(true);
      setLoading(false);
    }
    
    checkAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-2 border-professional-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <Link 
        href="/dashboard" 
        className="inline-flex items-center gap-2 text-medium-gray hover:text-pure-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </Link>

      {/* Video Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-pure-white">Your 20-Minute Blueprint</h1>
        <p className="text-light-gray">Everything you need to build a $30K/month remote renovation business</p>
      </div>

      {/* Main Video */}
      <Card className="bg-deep-black border-slate-gray">
        <CardContent className="p-0">
          <div className="aspect-video bg-slate-gray/20 rounded-lg overflow-hidden">
            <iframe
              src="https://www.loom.com/embed/5097dbc601a745909df6c6d850e6d2cc"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
              title="20-Minute Blueprint Video"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resources Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-pure-white">Your Resources</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {/* Crew Hiring Script */}
          <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pure-white">
                <FileText className="h-5 w-5 text-professional-blue" />
                <span className="text-base">Crew Hiring Script</span>
              </CardTitle>
              <CardDescription className="text-light-gray">
                Word-for-word script to recruit crews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-professional-blue hover:bg-professional-blue/80"
                onClick={() => alert('Download link will be provided here')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Script
              </Button>
            </CardContent>
          </Card>

          {/* Pricing Calculator */}
          <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pure-white">
                <Calculator className="h-5 w-5 text-professional-blue" />
                <span className="text-base">Pricing Calculator</span>
              </CardTitle>
              <CardDescription className="text-light-gray">
                Calculate your profit margins instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-professional-blue hover:bg-professional-blue/80"
                onClick={() => alert('Calculator link will be provided here')}
              >
                <Download className="h-4 w-4 mr-2" />
                Get Calculator
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Community */}
          <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pure-white">
                <Users className="h-5 w-5 text-professional-blue" />
                <span className="text-base">WhatsApp Group</span>
              </CardTitle>
              <CardDescription className="text-light-gray">
                Join 200+ active operators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a href="https://wa.me/message/YOUR_WHATSAPP_ID" target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Locked Content Teaser */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-pure-white">Full Implementation Program</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Locked Module Examples */}
          <Card className="bg-deep-black/50 border-slate-gray/50 opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-medium-gray">
                <span className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Territory Protection System
                </span>
              </CardTitle>
              <CardDescription className="text-medium-gray/80">
                Secure exclusive rights to your chosen market
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-deep-black/50 border-slate-gray/50 opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-medium-gray">
                <span className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  90-Day Coaching Program
                </span>
              </CardTitle>
              <CardDescription className="text-medium-gray/80">
                Personal success coach guides your launch
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-deep-black/50 border-slate-gray/50 opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-medium-gray">
                <span className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Crew Matching Service
                </span>
              </CardTitle>
              <CardDescription className="text-medium-gray/80">
                We find and vet your renovation crews
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-deep-black/50 border-slate-gray/50 opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-medium-gray">
                <span className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Lead Generation System
                </span>
              </CardTitle>
              <CardDescription className="text-medium-gray/80">
                Done-for-you marketing that brings clients
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Upgrade CTA */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-500 flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            Ready for Done-For-You Implementation?
          </CardTitle>
          <CardDescription className="text-light-gray mt-2">
            You've seen the blueprint. Now let us build it for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-pure-white font-medium">Your $497 Credits Applied</p>
                <p className="text-sm text-medium-gray">100% of your purchase goes toward the full program</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-pure-white font-medium">Protected Territory</p>
                <p className="text-sm text-medium-gray">Exclusive rights to your chosen market</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-pure-white font-medium">90-Day Success Coaching</p>
                <p className="text-sm text-medium-gray">Personal coach guides your every step</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-pure-white font-medium">Crew Matching Service</p>
                <p className="text-sm text-medium-gray">We find and vet your renovation teams</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold">
              <Link href="/upgrade">
                Apply for Full Program - Save $497
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}