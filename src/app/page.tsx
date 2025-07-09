'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { ApexLogo } from '@/components/apex-logo';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          redirect('/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();

    // Exit intent
    let hasShownExitIntent = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        hasShownExitIntent = true;
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleInviteCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode) {
      window.location.href = `/auth/sign-up?invite=${inviteCode}`;
    }
  };

  return (
    <>
      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowExitIntent(false)} />
          <div className="relative bg-gradient-to-b from-gray-900 to-black border border-amber-500/20 rounded-2xl p-8 sm:p-12 max-w-md w-full shadow-[0_0_100px_rgba(251,191,36,0.2)]">
            <button 
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center space-y-6">
              <div className="text-amber-500 text-5xl">⚠️</div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light">
                Access Expires Soon
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                This page will not be available after your session expires. 
                Only those with invitation codes can bypass the waiting list.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-6 py-3 rounded-xl font-medium w-full"
                  onClick={() => {
                    setShowExitIntent(false);
                    document.getElementById('cta-button')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Secure My Position
                </Button>
              </div>
              <p className="text-xs text-gray-600 font-mono">
                Session expires in 14:59
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black relative animate-fadeIn">
      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Header */}
      <header className="relative z-20 px-4 pt-8 animate-fadeInUp">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <ApexLogo size="md" className="[&_div[class*='from-professional-blue']]:from-amber-500 [&_div[class*='to-professional-blue']]:to-amber-600 [&_div[class*='border-professional-blue']]:border-amber-500 [&_div[class*='text-professional-blue']]:text-amber-500" />
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 md:pb-36">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Video */}
          <div className="relative max-w-2xl mx-auto mb-8 sm:mb-10 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 blur-3xl opacity-50 animate-subtleFloat"></div>
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

          {/* Authority Bar */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-mono text-gray-400 mb-8 animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              <span>Proven System</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              <span>$3M+ Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">✓</span>
              <span>12-Week Program</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.2] tracking-tight animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            Launch a $10K/month<br />
            home service empire
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-400/80 max-w-2xl mx-auto tracking-wide font-extralight leading-relaxed">
            Build and operate location-independent<br />
            service businesses from anywhere in the world.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              id="cta-button"
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-8 py-4 sm:px-10 sm:py-5 text-base font-medium rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(251,191,36,0.3)] hover:scale-[1.02] uppercase tracking-wider w-full sm:w-auto"
              asChild
            >
              <Link href="/auth/sign-up">
                Request Invitation
              </Link>
            </Button>
            
            {/* Invitation Code */}
            <div className="mt-4">
              {!showInviteCode ? (
                <button 
                  onClick={() => setShowInviteCode(true)}
                  className="text-xs text-gray-500 hover:text-amber-500 transition-colors font-mono tracking-wider"
                >
                  Have an invitation code?
                </button>
              ) : (
                <form onSubmit={handleInviteCodeSubmit} className="flex gap-2 justify-center animate-fadeIn">
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    placeholder="ENTER CODE"
                    className="bg-gray-900 border border-gray-700 rounded px-3 py-1 text-xs font-mono uppercase tracking-wider focus:border-amber-500 focus:outline-none transition-colors w-28"
                    maxLength={8}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="text-xs text-amber-500 hover:text-amber-400 font-mono"
                  >
                    →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Exclusivity Indicators */}
          <div className="space-y-3 text-sm text-gray-400 font-mono">
            <p className="tracking-wider text-amber-500/80">[ 5 ] Positions Remaining</p>
            <p className="text-xs opacity-60">By Invitation Only • 12-Week Intensive</p>
            <p className="text-xs opacity-50">Previous Applicants: 2,847 | Accepted: 3</p>
            <p className="text-xs text-amber-500/60">Next Review: 71 Hours 42 Minutes</p>
          </div>
        </div>
      </section>

      {/* Dynamic Scarcity Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Positions Claimed */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-extralight text-amber-500 mb-2">3/7</div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-mono">Positions Claimed</p>
              <p className="text-xs text-gray-500 mt-1">January Cohort</p>
            </div>
            
            {/* Next Review */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-extralight text-white mb-2">71:42</div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-mono">Until Next Review</p>
              <p className="text-xs text-gray-500 mt-1">Hours : Minutes</p>
            </div>
            
            {/* Applications From */}
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-extralight text-amber-500 mb-2">24</div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-mono">Countries</p>
              <p className="text-xs text-gray-500 mt-1">Global Reach</p>
            </div>
          </div>
          
          {/* World Map Placeholder */}
          <div className="mt-12 relative h-64 bg-gradient-to-b from-gray-900/20 to-gray-900/5 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-600 text-sm font-mono tracking-wider opacity-50">[ OPERATOR LOCATIONS CLASSIFIED ]</p>
            </div>
            {/* Dots representing operators */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
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
      <section className="py-24 sm:py-32 md:py-40 px-4 bg-gradient-to-b from-gray-950 via-black to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-8 font-mono animate-fadeIn">PROVEN METHODOLOGY</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight mb-8 tracking-tight">
              The APEX Protocol
            </h2>
            <p className="text-gray-300/80 max-w-2xl mx-auto text-lg sm:text-xl font-extralight leading-relaxed">
              The complete methodology for building your location-independent empire.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-gray-800/30 rounded-2xl overflow-hidden">
            <div className="bg-black p-10 sm:p-12 text-center group hover:bg-gray-950/50 transition-all duration-500">
              <p className="text-xs text-amber-500/40 uppercase tracking-[0.3em] mb-8 font-mono group-hover:text-amber-500/60 transition-colors">PHASE 1 • WEEK 1-4</p>
              <div className="w-20 h-20 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-amber-500/30 transition-all">
                  <span className="text-2xl">I</span>
                </div>
              </div>
              <h4 className="font-serif text-2xl font-extralight mb-4 tracking-wide">Foundation</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Market research. Service architecture.<br />First $10K month.</p>
            </div>
            
            <div className="bg-black p-10 sm:p-12 text-center group hover:bg-gray-950/50 transition-all duration-500">
              <p className="text-xs text-amber-500/40 uppercase tracking-[0.3em] mb-8 font-mono group-hover:text-amber-500/60 transition-colors">PHASE 2 • WEEK 5-8</p>
              <div className="w-20 h-20 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-amber-500/30 transition-all">
                  <span className="text-2xl">II</span>
                </div>
              </div>
              <h4 className="font-serif text-2xl font-extralight mb-4 tracking-wide">Systems</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Process automation. Team structure.<br />Scale to $50K months.</p>
            </div>
            
            <div className="bg-black p-10 sm:p-12 text-center group hover:bg-gray-950/50 transition-all duration-500">
              <p className="text-xs text-amber-500/40 uppercase tracking-[0.3em] mb-8 font-mono group-hover:text-amber-500/60 transition-colors">PHASE 3 • WEEK 9-12</p>
              <div className="w-20 h-20 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-amber-500/30 transition-all">
                  <span className="text-2xl">III</span>
                </div>
              </div>
              <h4 className="font-serif text-2xl font-extralight mb-4 tracking-wide">Empire</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Geographic expansion. Exit preparation.<br />7-figure trajectory.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-amber-500/40 text-xs font-mono tracking-[0.3em]">
              MARCEL'S EXACT BLUEPRINT • $0 TO $3M IN 18 MONTHS
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
        <div className="mx-4 text-gray-600">◆</div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
      </div>

      {/* The Selection Process Section */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-amber-500/70 text-xs uppercase tracking-[0.3em] mb-6 font-mono">CONFIDENTIAL</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight mb-6 tracking-tight">
              The Selection Process
            </h2>
            <p className="text-gray-400/80 max-w-2xl mx-auto text-lg sm:text-xl font-extralight leading-relaxed">
              Every 72 hours, we review applications. Only those who meet our criteria advance.
            </p>
          </div>

          <div className="grid gap-8 max-w-3xl mx-auto">
            <div className="flex gap-6 items-start">
              <span className="text-amber-500/60 font-mono text-sm mt-1">01</span>
              <div>
                <h3 className="font-medium text-lg mb-2">Initial Application</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Submit your background, vision, and commitment level. We assess your readiness for transformation.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <span className="text-amber-500/60 font-mono text-sm mt-1">02</span>
              <div>
                <h3 className="font-medium text-lg mb-2">Strategic Assessment</h3>
                <p className="text-gray-400 text-sm leading-relaxed">If selected, you'll undergo a comprehensive evaluation of your business acumen and growth potential.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <span className="text-amber-500/60 font-mono text-sm mt-1">03</span>
              <div>
                <h3 className="font-medium text-lg mb-2">NDA & Investment Discussion</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Approved candidates sign confidentiality agreements and discuss the investment required for their transformation.</p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <span className="text-amber-500/60 font-mono text-sm mt-1">04</span>
              <div>
                <h3 className="font-medium text-lg mb-2">Acceptance & Onboarding</h3>
                <p className="text-gray-400 text-sm leading-relaxed">The chosen few begin their 12-week intensive journey. No refunds. Total commitment required.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center space-y-3">
            <p className="text-amber-500/70 text-sm font-mono tracking-wide">
              PROTECTED BY NDA • NO REFUNDS • RESULTS NOT TYPICAL
            </p>
            <p className="text-gray-600 text-xs font-mono">
              FIVE-FIGURE INVESTMENT • PAYMENT PLANS AVAILABLE
            </p>
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
      <section className="py-24 sm:py-32 md:py-40 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extralight mb-10 sm:mb-14">
            The Philosophy
          </h2>
          <p className="text-gray-400/90 text-base sm:text-lg font-light leading-relaxed mb-12 sm:mb-16">
            Build, buy, and operate multiple businesses from a distance. Liberate 
            yourself from the shackles of wage slavery, focusing instead on high-value 
            tasks rather than the mundane busywork of day-to-day operations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-px bg-gray-800/20 rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="bg-black p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-red-900/50 flex items-center justify-center">
                <span className="text-red-500/60 text-2xl font-extralight">—</span>
              </div>
              <p className="text-lg font-extralight text-gray-400">NOT Freelancing</p>
              <p className="text-xs text-gray-600 mt-2">No clients. No hourly rates.</p>
            </div>
            <div className="bg-black p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-orange-900/50 flex items-center justify-center">
                <span className="text-orange-500/60 text-2xl font-extralight">—</span>
              </div>
              <p className="text-lg font-extralight text-gray-400">NOT Remote Jobs</p>
              <p className="text-xs text-gray-600 mt-2">No bosses. No schedules.</p>
            </div>
            <div className="bg-black p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-amber-900/50 flex items-center justify-center bg-gradient-to-br from-amber-500/10 to-amber-600/5">
                <span className="text-amber-500 text-2xl">✓</span>
              </div>
              <p className="text-lg font-medium">Empire Building</p>
              <p className="text-xs text-amber-500/60 mt-2">Own systems. Scale infinitely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-20 sm:py-28 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* EVERYTHING Quote */}
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-8 font-mono">THE COVENANT</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight mb-8 leading-tight">
              I'll share everything. Every system. Every secret.<br className="hidden sm:block" />
              Nothing held back.
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 font-extralight">But only with the right people.</p>
          </div>

          {/* Three Main Personas */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl blur-xl group-hover:from-amber-500/10 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl p-10 h-full hover:border-amber-500/20 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full blur-lg"></div>
                  <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center border border-gray-700">
                    <span className="text-3xl">I</span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-extralight mb-6 text-center">Established Contractors</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 text-center">
                  Successful locally. Trapped geographically. Ready for true freedom.
                </p>
                <div className="border-t border-gray-800 pt-6">
                  <p className="text-xs text-gray-500 font-mono uppercase text-center">
                    NOW: $500K+ LOCAL<br />
                    <span className="text-amber-500/60">NEXT: $1M+ ANYWHERE</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl blur-xl group-hover:from-amber-500/10 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl p-10 h-full hover:border-amber-500/20 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full blur-lg"></div>
                  <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center border border-gray-700">
                    <span className="text-3xl">II</span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-extralight mb-6 text-center">Remote Entrepreneurs</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 text-center">
                  High performers. No more time-for-money trades. Ready to scale.
                </p>
                <div className="border-t border-gray-800 pt-6">
                  <p className="text-xs text-gray-500 font-mono uppercase text-center">
                    NOW: EXPERTISE<br />
                    <span className="text-amber-500/60">NEXT: $10K/MONTH SYSTEM</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl blur-xl group-hover:from-amber-500/10 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl p-10 h-full hover:border-amber-500/20 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full blur-lg"></div>
                  <div className="relative w-full h-full bg-black rounded-full flex items-center justify-center border border-gray-700">
                    <span className="text-3xl">III</span>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-extralight mb-6 text-center">Exit Strategists</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 text-center">
                  Building to sell. Maximum valuation. True empire builders.
                </p>
                <div className="border-t border-gray-800 pt-6">
                  <p className="text-xs text-gray-500 font-mono uppercase text-center">
                    NOW: OPERATOR<br />
                    <span className="text-amber-500/60">NEXT: 7-FIGURE EXIT</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-300 mb-8 text-xl font-extralight">
              If you see yourself above, we should talk.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-12 py-5 rounded-2xl font-medium tracking-wider transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(251,191,36,0.3)] hover:scale-[1.02] uppercase"
              asChild
            >
              <Link href="/auth/sign-up">
                Request Your Invitation
              </Link>
            </Button>
            <p className="text-xs text-gray-600 mt-6 font-mono tracking-[0.2em]">LIMITED TO 7 OPERATORS ANNUALLY</p>
          </div>
        </div>
      </section>


      {/* You're in the right place if Section */}
      <section className="py-20 sm:py-28 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight">
              You belong here if...
            </h2>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-px h-16 bg-gradient-to-b from-amber-500/20 to-transparent"></div>
              <p className="text-gray-300 text-xl font-extralight leading-relaxed group-hover:text-white transition-colors">
                You seek mastery in remote operations at the highest level
              </p>
            </div>
            
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-px h-16 bg-gradient-to-b from-amber-500/30 to-transparent"></div>
              <p className="text-gray-300 text-xl font-extralight leading-relaxed group-hover:text-white transition-colors">
                You're building an empire, not just another business
              </p>
            </div>
            
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-px h-16 bg-gradient-to-b from-amber-500/40 to-transparent"></div>
              <p className="text-gray-300 text-xl font-extralight leading-relaxed group-hover:text-white transition-colors">
                You understand that true wealth comes from systems, not sweat
              </p>
            </div>
            
            <div className="flex gap-8 items-start group">
              <div className="flex-shrink-0 w-px h-16 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
              <p className="text-gray-300 text-xl font-extralight leading-relaxed group-hover:text-white transition-colors">
                You demand complete sovereignty over your time and location
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* But How Do You Actually Scale to 7 Figures? - Transition Section */}
      <section className="py-12 sm:py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light mb-6">
            But How Do You Actually Scale to 7 Figures?
          </h2>
          <div className="space-y-6 text-lg text-gray-300/90 font-light leading-relaxed">
            <p>
              You don't get there by working harder or putting in more hours. That's a losing game. The top 1% of operators, the ones who build empires while traveling the world, think differently. 
            </p>
            <p>
              They build with <span className="text-white font-medium">leverage</span>. They build with <span className="text-white font-medium">systems</span>. They focus on creating asymmetric opportunities where the upside is massive and the downside is capped.
            </p>
            <p className="font-medium text-white">
              Here’s how it works:
            </p>
            <ul className="list-disc list-inside space-y-3 pl-2">
              <li>
                <span className="font-medium text-white">We build Systems for Growth:</span> Create repeatable processes for sales, operations, and fulfillment that run without your daily involvement.
              </li>
              <li>
                <span className="font-medium text-white">We use Leverage to Scale:</span> Implement technology and talent to multiply your output, so you can manage multiple markets at once.
              </li>
              <li>
                <span className="font-medium text-white">We Engineer for Exit:</span> Structure your business from day one to be a sellable asset, not just a job.
              </li>
            </ul>
            <p>
              This is the blueprint for building a location-independent contracting empire. This is the APEX Protocol.
            </p>
          </div>
        </div>
      </section>



      {/* Why I'm Doing This Section */}
      <section className="py-20 sm:py-28 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-8 font-mono">THE FOUNDER</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight mb-10">
            Why I'm Doing This
          </h2>
          
          <div className="mb-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl blur-3xl"></div>
              <Image
                src="/heromyles.jpg"
                alt="Myles Webb"
                width={800}
                height={400}
                className="relative rounded-2xl mx-auto max-w-full h-auto shadow-2xl"
              />
            </div>
          </div>
          
          <div className="space-y-6 text-gray-400/90 text-base sm:text-lg font-light leading-relaxed text-left max-w-3xl mx-auto">
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
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-extralight text-amber-500 mb-2">2</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Successful Exits</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extralight text-amber-500 mb-2">$3M+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Generated</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extralight text-amber-500 mb-2">24</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Countries</p>
            </div>
          </div>
          
          <div className="mt-10">
            <a 
              href="https://myleskameron.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-500/60 hover:text-amber-500 transition-all duration-300 group"
            >
              <span className="text-sm font-mono tracking-wider">VERIFY TRACK RECORD</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* What is Wealth Section */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-extralight mb-6">
            What is Wealth?
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl font-light mb-6 max-w-2xl mx-auto">
            Most chase one. Few achieve all three.
          </p>
          <p className="text-gray-300 text-xl sm:text-2xl font-extralight mb-16 max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{animationDelay: '0.5s'}}>
            Money without time is poverty. Time without freedom is prison.<br />
            Only all three create a life worth living.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl p-10 h-full transition-all duration-300 hover:border-amber-500/30">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">₿</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-light mb-4 text-amber-500">Capital Freedom</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Beyond income. Build systems that generate wealth while you sleep.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl p-10 h-full transition-all duration-300 hover:border-amber-500/30">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">∞</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-light mb-4 text-amber-500">Time Sovereignty</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Own your calendar. Let systems and teams execute your vision.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800 rounded-xl p-10 h-full transition-all duration-300 hover:border-amber-500/30">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🗺</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-light mb-4 text-amber-500">Location Independence</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Run your empire from Bali, Dubai, or your hometown. True freedom.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-gray-500 text-sm font-mono mb-8">
              APEX OPERATORS ACHIEVE ALL THREE
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-10 py-4 text-base font-medium rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(251,191,36,0.3)] hover:scale-[1.02] uppercase tracking-wider"
              asChild
            >
              <Link href="/auth/sign-up">
                Request Invitation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
        <div className="mx-4 text-gray-600">◆</div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full max-w-xs"></div>
      </div>

      {/* Essential Information Section */}
      <section className="py-24 sm:py-32 md:py-40 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-8 font-mono">FREQUENTLY ASKED</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight">
              Essential Information
            </h2>
          </div>

          <div className="space-y-px bg-gray-800/20 rounded-2xl overflow-hidden">
            {[
              {
                question: "Who is this for?",
                answer: "Established contractors trapped by geography. Remote entrepreneurs ready to scale. Business builders who want location independence. Those ready to invest in transformation, not just information."
              },
              {
                question: "What is the investment?",
                answer: "This is a high-touch, 12-week intensive program. Investment details are discussed after application approval. We only work with those who see the value in premium transformation."
              },
              {
                question: "How selective is the process?",
                answer: "Extremely. We accept 7 operators annually from thousands of applications. We review applications every 72 hours and only advance those who demonstrate readiness for this level of success."
              },
              {
                question: "What results can I expect?",
                answer: "Marcel went from $0 to $3M in 18 months using this exact system. While results vary, our operators typically reach $10K/month within 90 days and build toward 7-figure exits."
              },
              {
                question: "Is this another course?",
                answer: "No. This is a complete business transformation system with direct mentorship, proven blueprints, and access to our elite operator network. You're buying a new future, not just information."
              },
              {
                question: "What is the time commitment?",
                answer: "The 12-week intensive requires 10-15 hours per week minimum. This is for serious operators only. If you're looking for passive income or get-rich-quick schemes, this isn't for you."
              },
              {
                question: "Are there refunds?",
                answer: "No refunds. We only accept those fully committed to transformation. Our vetting process ensures mutual fit. Once you're in, you're expected to execute."
              },
              {
                question: "What happens after 12 weeks?",
                answer: "You become part of the APEX Network permanently. Lifetime access to our systems, annual summits, deal flow, and the brotherhood of elite operators building empires worldwide."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-black border-b border-gray-800/50 last:border-b-0">
                <details className="group">
                  <summary className="flex items-center justify-between p-8 cursor-pointer hover:bg-gray-950/50 transition-all">
                    <span className="text-lg font-extralight tracking-wide pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 text-2xl font-thin text-gray-600 group-open:hidden">+</span>
                    <span className="flex-shrink-0 text-2xl font-thin text-gray-600 hidden group-open:block">−</span>
                  </summary>
                  <div className="px-8 pb-8">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Network Section */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-8 font-mono">BY INVITATION ONLY</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight mb-8 tracking-tight">
              The APEX Network
            </h2>
            <p className="text-gray-300/80 max-w-2xl mx-auto text-lg sm:text-xl font-extralight leading-relaxed">
              A brotherhood of empire builders. Operating worldwide. Building forever.
            </p>
          </div>

          {/* Network Stats */}
          <div className="grid md:grid-cols-4 gap-px bg-gray-800/20 rounded-2xl overflow-hidden mb-16">
            <div className="bg-black p-8 text-center">
              <div className="text-4xl font-extralight text-amber-500 mb-2">7</div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">Operators/Year</p>
            </div>
            <div className="bg-black p-8 text-center">
              <div className="text-4xl font-extralight text-white mb-2">$3M+</div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">Avg Revenue</p>
            </div>
            <div className="bg-black p-8 text-center">
              <div className="text-4xl font-extralight text-amber-500 mb-2">∞</div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">Lifetime Access</p>
            </div>
            <div className="bg-black p-8 text-center">
              <div className="text-4xl font-extralight text-white mb-2">100%</div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-mono">Location Free</p>
            </div>
          </div>

          {/* Network Benefits */}
          <div className="space-y-px bg-gray-800/20 rounded-2xl overflow-hidden">
            <div className="bg-black p-12 text-center">
              <h3 className="font-serif text-2xl font-extralight mb-8">Member Privileges</h3>
              <div className="grid md:grid-cols-3 gap-12">
                <div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full flex items-center justify-center border border-gray-800">
                    <span className="text-2xl">I</span>
                  </div>
                  <h4 className="font-medium mb-3 text-amber-500/80">Annual Summit</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Mykonos 2025<br />
                    Private villa. 3 days.<br />
                    Operators only.
                  </p>
                </div>
                <div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full flex items-center justify-center border border-gray-800">
                    <span className="text-2xl">II</span>
                  </div>
                  <h4 className="font-medium mb-3 text-amber-500/80">Deal Flow</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    First access to acquisitions.<br />
                    Vetted opportunities.<br />
                    Operator-to-operator deals.
                  </p>
                </div>
                <div>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full flex items-center justify-center border border-gray-800">
                    <span className="text-2xl">III</span>
                  </div>
                  <h4 className="font-medium mb-3 text-amber-500/80">Brotherhood</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Direct line to all operators.<br />
                    Monthly mastermind calls.<br />
                    Forever connected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-amber-500/40 text-xs font-mono tracking-[0.3em]">
              ONCE IN, ALWAYS IN • NO EXCEPTIONS
            </p>
          </div>
        </div>
      </section>

      {/* The Only One We've Ever Trusted */}
      <section className="py-16 sm:py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Exclusive Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 leading-tight">
              In 3 Years, We've Only Shared This System With One Person
            </h2>
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-amber-500/70 mb-6 sm:mb-8 md:mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent w-16 sm:w-32"></div>
              <span className="text-xs uppercase tracking-[0.3em] font-mono">Highly Exclusive</span>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent w-16 sm:w-32"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Thousands have asked. We've said no to everyone. Except one.
            </p>
          </div>

          {/* Marcel's Story */}
          <Card className="bg-gradient-to-br from-amber-900/10 to-gray-900 border-amber-600/30 overflow-hidden hover-lift">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 sm:h-80 md:h-full md:min-h-[400px]">
                  <Image
                    src="/campos.jpg"
                    alt="Marcel Campos"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/80"></div>
                </div>
                
                {/* Content Side */}
                <div className="p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-light mb-2 text-amber-500">Marcel Campos</h3>
                    <p className="text-gray-400 text-sm uppercase tracking-wide">Operator 001 • The Chosen One</p>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
                    <p className="text-base sm:text-lg font-medium">
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
                  
                  <div className="bg-card border-t-4 border-blueprint-blue-500 rounded-lg p-4 sm:p-6 mt-4 sm:mt-6">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-500 mb-2">$3 Million</div>
                    <p className="text-gray-300 text-sm sm:text-base">Current Status: [$3M Revenue - Verified]</p>
                    <p className="text-xs sm:text-sm text-gray-400/80 mt-2">From zero to empire in 18 months</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Challenge */}
          <div className="text-center mt-12 sm:mt-16 space-y-4 sm:space-y-6">
            <p className="text-lg sm:text-xl text-gray-300 font-medium">
              If Marcel could do it - starting with nothing - what's your excuse?
            </p>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                But here's the thing: We're not looking for everyone. We're looking for the next Marcel. 
                Someone who won't just use this system, but will honor it. Someone who understands that 
                with great power comes great responsibility.
              </p>
            </div>
            
            <p className="text-amber-500 font-semibold text-base sm:text-lg">
              Are you worthy of this knowledge?
            </p>
          </div>
        </div>
      </section>

      {/* Other Operators Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-6 font-mono">VERIFIED RESULTS</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-extralight mb-4">
              The Few Who Made It
            </h3>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Privacy protected. Results verified. Names withheld by request.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Operator 002 */}
            <div className="bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800 rounded-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-amber-500/60 text-xs font-mono mb-2">OPERATOR 002</p>
                  <p className="text-xl font-light">Former Tech Executive</p>
                  <p className="text-sm text-gray-500 mt-1">Singapore → Global</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-amber-500">$1.8M</p>
                  <p className="text-xs text-gray-500">14 months</p>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-6">
                <p className="text-sm text-gray-400 italic">
                  "Left a $300K corporate job. Now running operations from 5 countries. 
                  The system works if you work the system."
                </p>
              </div>
            </div>

            {/* Operator 003 */}
            <div className="bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800 rounded-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-amber-500/60 text-xs font-mono mb-2">OPERATOR 003</p>
                  <p className="text-xl font-light">Construction Veteran</p>
                  <p className="text-sm text-gray-500 mt-1">Texas → Nationwide</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-amber-500">$2.4M</p>
                  <p className="text-xs text-gray-500">Exit pending</p>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-6">
                <p className="text-sm text-gray-400 italic">
                  "20 years swinging hammers. Now I manage 3 markets remotely. 
                  Building to sell for 7 figures."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-600 font-mono">
              RESULTS INDEPENDENTLY VERIFIED • TYPICAL RESULTS: $0
            </p>
          </div>
        </div>
      </section>

      {/* Exclusive Statement */}
      <section className="py-16 sm:py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-extralight leading-relaxed animate-fadeIn">
            <span className="text-gray-400">Not everyone can.</span><br />
            <span className="text-gray-300">Not everyone will.</span><br />
            <span className="text-amber-500/80">Almost no one does.</span>
          </p>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-20 sm:py-24 px-4 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-8 font-mono">THE PROCESS</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-extralight mb-6">
              What Happens After You Apply
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every application is personally reviewed. Here's exactly what to expect.
            </p>
          </div>

          <div className="space-y-px bg-gray-800/20 rounded-2xl overflow-hidden">
            <div className="bg-black p-8 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full flex items-center justify-center border border-gray-800">
                <span className="text-amber-500/60 font-mono text-sm">24h</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Application Acknowledged</h3>
                <p className="text-sm text-gray-400">You'll receive confirmation that your application entered our review queue. No automated responses.</p>
              </div>
            </div>

            <div className="bg-black p-8 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full flex items-center justify-center border border-gray-800">
                <span className="text-amber-500/60 font-mono text-sm">72h</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Review & Decision</h3>
                <p className="text-sm text-gray-400">Your application is reviewed during our 72-hour cycle. Most applicants receive a polite decline.</p>
              </div>
            </div>

            <div className="bg-black p-8 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-full flex items-center justify-center border border-gray-800">
                <span className="text-amber-500/60 font-mono text-sm">7d</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Strategic Assessment Call</h3>
                <p className="text-sm text-gray-400">Selected applicants receive a 45-minute assessment call. We evaluate your readiness and fit.</p>
              </div>
            </div>

            <div className="bg-black p-8 flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full flex items-center justify-center border border-gray-800">
                <span className="text-amber-500 text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-medium mb-2">Final Acceptance</h3>
                <p className="text-sm text-gray-400">The chosen few sign NDAs, complete investment, and begin their transformation immediately.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              <span className="text-amber-500/60">97%</span> of applicants don't make it past review.<br />
              <span className="text-xs text-gray-600">This is by design.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 px-4 bg-black text-center">
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight">
            Will You Be The Next One?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400/80 font-extralight leading-relaxed">
            We select only those who demonstrate readiness for this level of success.
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-10 py-4 text-base font-medium rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(251,191,36,0.3)] hover:scale-[1.02] uppercase tracking-wider w-full sm:w-auto"
              asChild
            >
              <Link href="/auth/sign-up">
                Request Invitation
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-6 font-mono tracking-wide opacity-60">Limited to 7 Operators Annually</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 sm:py-20 px-4 bg-black">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Company */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500/40 mb-6">APEX OPERATIONS</h4>
              <p className="text-xs text-gray-600 leading-loose">
                Elite operator development<br />
                Delaware, United States<br />
                Founded 2021
              </p>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500/40 mb-6">LEGAL</h4>
              <div className="space-y-3">
                <a href="/terms" className="block text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</a>
                <a href="/privacy" className="block text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy</a>
                <a href="/nda" className="block text-xs text-gray-600 hover:text-gray-400 transition-colors">NDA</a>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500/40 mb-6">CONTACT</h4>
              <p className="text-xs text-gray-600 leading-loose">
                By application only<br />
                <span className="text-amber-500/60">apply@remoteops.ai</span>
              </p>
            </div>
            
            {/* Security */}
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500/40 mb-6">SECURED BY</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-amber-500/40 rounded-full"></div>
                  <span className="text-xs text-gray-600">256-bit encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-amber-500/40 rounded-full"></div>
                  <span className="text-xs text-gray-600">SSL certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-1 bg-amber-500/40 rounded-full"></div>
                  <span className="text-xs text-gray-600">NDA protected</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-900/50 text-center space-y-4">
            <p className="text-[10px] text-gray-700 font-mono tracking-[0.3em]">
              NO REFUNDS • RESULTS NOT TYPICAL • SERIOUS INQUIRIES ONLY
            </p>
            <p className="text-[10px] text-gray-800">
              © {new Date().getFullYear()} APEX Operations LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}