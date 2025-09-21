import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowRight, Route, BookOpen, Target, PlayCircle, Download, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { getUserAccess } from '@/lib/user-access';
import { Button } from '@/components/ui/button';

async function getLastViewedModule(userId: string) {
  const supabase = await createClient();
  
  // Get the most recently updated progress
  const { data: lastProgress } = await supabase
    .from('user_progress')
    .select(`
      *,
      modules!inner(
        id,
        title,
        slug,
        course_id,
        courses!inner(
          slug,
          title
        )
      )
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  return lastProgress;
}

async function getFeaturedPath() {
  const supabase = await createClient();
  
  // Get the shortest learning path (good for beginners)
  const { data: path } = await supabase
    .from('learning_paths')
    .select('*')
    .order('estimated_duration_weeks', { ascending: true })
    .limit(1)
    .single();

  return path;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const userName = user?.user_metadata?.full_name || user?.email || 'there';
  const userAccess = await getUserAccess(user?.email || null);
  
  // Show different dashboards based on access level
  if (userAccess.purchaseType === 'video_only') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-pure-white">Welcome back, {userName}!</h1>
          <p className="text-sm sm:text-base text-medium-gray">Your Blueprint is ready to watch.</p>
        </div>
        
        {/* Video Access Card */}
        <Card className="bg-gradient-to-r from-deep-black to-slate-gray border-professional-blue/30 hover:border-professional-blue/50 transition-all">
          <Link href="/courses/blueprint-video" className="block">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <PlayCircle className="h-6 w-6 sm:h-8 sm:w-8 text-professional-blue shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg text-pure-white">20-Minute Blueprint</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-light-gray mt-1">
                      Your $30K/Month Remote Renovation Business
                    </CardDescription>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-professional-blue shrink-0 mt-1" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm sm:text-base text-medium-gray mb-3 line-clamp-2">
                The exact system our operators use to build location-independent contracting businesses
              </p>
            </CardContent>
          </Link>
        </Card>
        
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {/* Resources */}
          <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
            <Link href="/courses/blueprint-video?module=blueprint-resources" className="block h-full">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center justify-between text-pure-white">
                  <span className="flex items-center gap-2 min-w-0 flex-1">
                    <Download className="h-4 w-4 sm:h-5 sm:w-5 text-professional-blue shrink-0" />
                    <span className="text-sm sm:text-base truncate">Resources</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-professional-blue shrink-0" />
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-light-gray">
                  Templates & Scripts
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm sm:text-base text-medium-gray">
                  Crew hiring scripts, pricing calculator, and more
                </p>
              </CardContent>
            </Link>
          </Card>
          
          {/* WhatsApp Community */}
          <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
            <Link href="/courses/blueprint-video?module=blueprint-community" className="block h-full">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center justify-between text-pure-white">
                  <span className="flex items-center gap-2 min-w-0 flex-1">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-professional-blue shrink-0" />
                    <span className="text-sm sm:text-base truncate">Community</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-professional-blue shrink-0" />
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-light-gray">
                  Join WhatsApp Group
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm sm:text-base text-medium-gray">
                  Connect with active operators
                </p>
              </CardContent>
            </Link>
          </Card>
          
          {/* Upgrade CTA */}
          <Card className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/30 hover:border-amber-500/50 transition-all">
            <Link href="/upgrade" className="block h-full">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center justify-between text-amber-500">
                  <span className="flex items-center gap-2 min-w-0 flex-1">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                    <span className="text-sm sm:text-base truncate">Upgrade</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-amber-600">
                  Get Full Implementation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm sm:text-base text-amber-700">
                  Your $497 credits toward the full program
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
        
        {/* Upgrade Banner */}
        <Card className="bg-gradient-to-r from-amber-500/5 to-amber-600/5 border-amber-500/20">
          <CardHeader>
            <CardTitle className="text-xl text-amber-500 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Ready for Done-For-You Implementation?
            </CardTitle>
            <CardDescription className="text-light-gray mt-2">
              Upgrade to the full APEX Operator License and we'll build everything for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-medium-gray">Protected territory rights</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-medium-gray">Personal success coach for 90 days</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-medium-gray">Crew matching service</span>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold">
              <Link href="/upgrade">
                Apply for Full Program - Save $497
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Full program dashboard (existing code)
  const lastViewed = user ? await getLastViewedModule(user.id) : null;
  const featuredPath = await getFeaturedPath();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-pure-white">Welcome back, {userName}!</h1>
        <p className="text-sm sm:text-base text-medium-gray">Here's your snapshot. Let's get to work.</p>
      </div>
      
      {/* Featured Learning Path */}
      {featuredPath && (
        <Card className="bg-gradient-to-r from-deep-black to-slate-gray border-professional-blue/30 hover:border-professional-blue/50 transition-all">
          <Link href="/learning-paths" className="block">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Route className="h-6 w-6 sm:h-8 sm:w-8 text-professional-blue shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg text-pure-white">Start Your Journey</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-light-gray mt-1">
                      {featuredPath.title}
                    </CardDescription>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-professional-blue shrink-0 mt-1" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm sm:text-base text-medium-gray mb-3 line-clamp-2">{featuredPath.description}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-light-gray">
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                  Perfect for beginners
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{featuredPath.estimated_duration_weeks} weeks to complete</span>
              </div>
            </CardContent>
          </Link>
        </Card>
      )}
      
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
          <Link 
            href={lastViewed ? `/courses/${lastViewed.modules.courses.slug}?module=${lastViewed.modules.slug}` : '/courses'} 
            className="block h-full"
          >
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center justify-between text-pure-white">
                <span className="flex items-center gap-2 min-w-0 flex-1">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-professional-blue shrink-0" />
                  <span className="text-sm sm:text-base truncate">Continue Learning</span>
                </span>
                <ArrowRight className="h-4 w-4 text-professional-blue shrink-0" />
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-light-gray">
                {lastViewed ? 'Your last viewed module' : 'Start your journey'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {lastViewed ? (
                <>
                  <p className="font-semibold text-sm sm:text-base text-pure-white line-clamp-2">{lastViewed.modules.title}</p>
                  <p className="text-xs sm:text-sm text-medium-gray mt-1 line-clamp-1">
                    {lastViewed.modules.courses.title}
                  </p>
                  <div className="w-full bg-slate-gray rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-professional-blue to-action-yellow h-2 rounded-full transition-all" 
                      style={{ width: `${lastViewed.progress_percentage || 0}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm sm:text-base text-medium-gray">
                  Explore our comprehensive course library
                </p>
              )}
            </CardContent>
          </Link>
        </Card>
        <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
          <Link href="/chat" className="block h-full">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center justify-between text-pure-white">
                <span className="text-sm sm:text-base">Ask the Apex AI</span>
                <ArrowRight className="h-4 w-4 text-professional-blue shrink-0" />
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-light-gray">Get instant answers from your AI mentor.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm sm:text-base text-medium-gray italic line-clamp-3">"What's the best way to structure a weekly check-in with my remote project manager?"</p>
            </CardContent>
          </Link>
        </Card>
        <Card className="bg-deep-black border-slate-gray hover:border-professional-blue/50 transition-all">
          <Link href="/community" className="block h-full">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center justify-between text-pure-white">
                <span className="text-sm sm:text-base">Join the Conversation</span>
                <ArrowRight className="h-4 w-4 text-professional-blue shrink-0" />
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-light-gray">See what other members are discussing.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="font-semibold text-pure-white text-sm sm:text-base">Latest Topic:</p>
              <p className="text-sm sm:text-base text-medium-gray mt-1 line-clamp-2">"Best software for fleet tracking?"</p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}