import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Lock,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { VideoSection } from '@/components/course/video-section';l
import ProgressTracker from '@/components/progress-tracker';
import { CourseHeader } from '@/components/course/course-header';
import { EmptyModuleSection } from '@/components/course/empty-module-section';
import { EnhancedSidebar } from '@/components/course/enhanced-sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CourseDetailPageProps {
  params: { slug: string };
  searchParams: { module?: string };
}

async function getCourseWithModules(slug: string) {
  const supabase = createClient();
  
  console.log('Fetching course with slug:', slug);
  
  // Get course details
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (courseError) {
    console.error('Course fetch error:', courseError);
    throw new Error(`Failed to fetch course: ${courseError.message}`);
  }
  
  if (!course) {
    console.log('No course found with slug:', slug);
    return null;
  }

  console.log('Course found:', course.id);

  // Get all modules for this course
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', course.id)
    .order('order_index', { ascending: true });

  if (modulesError) {
    console.error('Modules fetch error:', modulesError);
    throw new Error(`Failed to fetch modules: ${modulesError.message}`);
  }
  
  console.log('Modules found:', modules?.length || 0);

  // Get user progress for these modules
  const { data: { user } } = await supabase.auth.getUser();
  let userProgress = new Map();
  
  if (user && modules) {
    const moduleIds = modules.map(m => m.id);
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .in('module_id', moduleIds);
    
    if (progress) {
      progress.forEach(p => {
        userProgress.set(p.module_id, p);
      });
    }
  }

  return {
    course,
    modules: modules || [],
    userProgress,
    userId: user?.id,
  };
}

export default async function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const courseData = await getCourseWithModules(resolvedParams.slug);
  
  if (!courseData) {
    notFound();
  }

  const { course, modules, userProgress, userId } = courseData;
  
  // Find the current module
  const currentModuleSlug = resolvedSearchParams.module || modules[0]?.slug;
  const currentModule = modules.find(m => m.slug === currentModuleSlug);
  const currentModuleIndex = modules.findIndex(m => m.slug === currentModuleSlug);
  
  console.log('Current module:', currentModule);
  console.log('Video URL:', currentModule?.video_url);
  
  if (!currentModule) {
    notFound();
  }

  // Calculate overall progress
  const completedModules = modules.filter(m => 
    userProgress.get(m.id)?.completed
  ).length;
  const progressPercentage = Math.round((completedModules / modules.length) * 100);

  // Get previous and next modules
  const previousModule = currentModuleIndex > 0 ? modules[currentModuleIndex - 1] : null;
  const nextModule = currentModuleIndex < modules.length - 1 ? modules[currentModuleIndex + 1] : null;

  // Find the highest completed module index
  let highestCompletedIndex = -1;
  modules.forEach((module, index) => {
    if (userProgress.get(module.id)?.completed) {
      highestCompletedIndex = Math.max(highestCompletedIndex, index);
    }
  });

  // REMOVED LOCKING - All modules are now accessible for development
  const isModuleAccessible = true;
  
  // Keep the old variable name for backward compatibility
  const isPreviousModuleCompleted = true;

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8">
      {/* Mobile Course Navigation */}
      <div className="lg:hidden sticky top-0 z-50 bg-background border-b border-border">
        <div className="p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Menu className="w-4 h-4 mr-2" />
                Course Content ({currentModuleIndex + 1}/{modules.length})
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
              <EnhancedSidebar
                modules={modules}
                currentModuleId={currentModule.id}
                userProgress={userProgress}
                courseSlug={resolvedParams.slug}
                highestCompletedIndex={highestCompletedIndex}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Course Sidebar - Desktop */}
      <aside className="hidden lg:block w-80 fixed top-0 left-64 bottom-0 border-r border-border overflow-y-auto bg-background z-40">
        <EnhancedSidebar
          modules={modules}
          currentModuleId={currentModule.id}
          userProgress={userProgress}
          courseSlug={resolvedParams.slug}
          highestCompletedIndex={highestCompletedIndex}
        />
      </aside>

      {/* Main Content - responsive padding and margins */}
      <main className="lg:ml-80 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 min-h-screen bg-background">
        {/* Course Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <CourseHeader
            courseTitle={course.title}
            courseDescription={course.description}
            initialCompletedCount={completedModules}
            totalModules={modules.length}
          />
        </div>

        {/* Navigation Bar */}
        <div className="bg-muted/50 rounded-lg p-3 sm:p-4 border border-border/50 mb-4 sm:mb-6">
          <div className="flex items-center justify-between gap-2 sm:gap-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              disabled={!previousModule}
              className="text-xs sm:text-sm"
              title={previousModule ? `Previous: ${previousModule.title}` : undefined}
            >
              <Link href={previousModule ? `/courses/${resolvedParams.slug}?module=${previousModule.slug}` : '#'}>
                <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Previous</span>
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="text-muted-foreground font-medium">Module {currentModuleIndex + 1} of {modules.length}</span>
              {isPreviousModuleCompleted && userId && (
                <>
                  <span className="text-muted-foreground hidden sm:inline">•</span>
                  <div className="hidden sm:block">
                    <ProgressTracker
                      moduleId={currentModule.id}
                      userId={userId ?? ''}
                      isCompleted={userProgress.get(currentModule.id)?.completed || false}
                    />
                  </div>
                </>
              )}
            </div>
            
            <Button
              size="sm"
              asChild
              disabled={!nextModule}
              className="bg-primary hover:bg-primary/90 text-xs sm:text-sm"
              title={nextModule ? `Next: ${nextModule.title}` : undefined}
            >
              <Link href={nextModule ? `/courses/${resolvedParams.slug}?module=${nextModule.slug}` : '#'}>
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Video Section */}
        <Card className="mb-4 sm:mb-6 lg:mb-8 w-full border-0 shadow-lg">
            <CardContent className="p-0">
              {currentModule.video_url ? (
                <VideoSection
                  videoUrl={currentModule.video_url}
                  moduleId={currentModule.id}
                  userId={userId ?? ''}
                  initialProgress={userProgress.get(currentModule.id)?.last_watched_position}
                  isCompleted={userProgress.get(currentModule.id)?.completed || false}
                />
              ) : (
                <EmptyModuleSection
                  moduleId={currentModule.id}
                  userId={userId ?? ''}
                  isCompleted={userProgress.get(currentModule.id)?.completed || false}
                  courseSlug={resolvedParams.slug}
                />
              )}
            </CardContent>
          </Card>

          {/* Module Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold leading-tight">{currentModule.title}</h1>
              {currentModule.tagline && (
                <p className="text-lg text-muted-foreground italic">{currentModule.tagline}</p>
              )}
            </div>
            
            {currentModule.description && (
              <p className="text-muted-foreground leading-relaxed">{currentModule.description}</p>
            )}
          </div>

          {/* Module Resources */}
          {currentModule.resources && currentModule.resources.length > 0 && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Resources</h3>
                <div className="space-y-2">
                  {currentModule.resources.map((resource: any, index: number) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {resource.title}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    );
}