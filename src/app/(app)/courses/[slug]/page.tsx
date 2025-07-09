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
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { VideoSection } from '@/components/course/video-section';
import ProgressTracker from '@/components/progress-tracker';
import { CourseHeader } from '@/components/course/course-header';

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

  // Module is accessible if it's the first module, or if any module at or after its index has been completed
  const isModuleAccessible = currentModuleIndex === 0 || currentModuleIndex <= highestCompletedIndex + 1;
  
  // Keep the old variable name for backward compatibility
  const isPreviousModuleCompleted = isModuleAccessible;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Course Header */}
      <CourseHeader
        courseTitle={course.title}
        courseDescription={course.description}
        initialCompletedCount={completedModules}
        totalModules={modules.length}
      />

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-2">
          {/* Navigation Bar - Above video */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                disabled={!previousModule}
              >
                <Link href={previousModule ? `/courses/${resolvedParams.slug}?module=${previousModule.slug}` : '#'}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Link>
              </Button>
              
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Module {currentModuleIndex + 1} of {modules.length}</span>
                {isPreviousModuleCompleted && userId && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <ProgressTracker
                      moduleId={currentModule.id}
                      userId={userId}
                      isCompleted={userProgress.get(currentModule.id)?.completed || false}
                    />
                  </>
                )}
              </div>
              
              <Button
                size="sm"
                asChild
                disabled={!nextModule}
                className="bg-primary hover:bg-primary/90"
              >
                <Link href={nextModule ? `/courses/${resolvedParams.slug}?module=${nextModule.slug}` : '#'}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Video Player */}
          <Card>
            <CardContent className="p-0">
              {!isPreviousModuleCompleted ? (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Lock className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="font-semibold">Module Locked</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete the previous module to unlock this content
                      </p>
                    </div>
                    {previousModule && (
                      <Button asChild>
                        <Link href={`/courses/${resolvedParams.slug}?module=${previousModule.slug}`}>
                          Go to Previous Module
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ) : currentModule.video_url && userId ? (
                <VideoSection 
                  videoUrl={currentModule.video_url}
                  moduleId={currentModule.id}
                  userId={userId}
                  initialProgress={userProgress.get(currentModule.id)?.last_watched_position}
                  nextModuleUrl={nextModule ? `/courses/${resolvedParams.slug}?module=${nextModule.slug}` : undefined}
                  nextModuleTitle={nextModule?.title}
                  isCompleted={userProgress.get(currentModule.id)?.completed}
                />
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No video available for this module</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Module Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{currentModule.title}</h2>
              {currentModule.tagline && (
                <p className="text-lg text-muted-foreground italic">{currentModule.tagline}</p>
              )}
            </div>
            
            {currentModule.description && (
              <p className="text-muted-foreground">{currentModule.description}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Module {currentModuleIndex + 1} of {modules.length}
              </span>
            </div>

          </div>

          {/* Module Resources */}
          {currentModule.resources && currentModule.resources.length > 0 && (
            <Card>
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
        </div>

        {/* Sidebar - Module List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Course Content</h3>
          <div className="space-y-2">
            {modules.map((module, index) => {
              const isCompleted = userProgress.get(module.id)?.completed;
              const isLocked = index > 0 && index > highestCompletedIndex + 1;
              const isCurrent = module.id === currentModule.id;
              
              const content = (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <PlayCircle className={`w-5 h-5 flex-shrink-0 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
                    )}
                    <span className={`text-sm ${isCurrent ? 'font-semibold text-primary' : ''}`}>
                      {index + 1}. {module.title}
                    </span>
                  </div>
                </div>
              );

              if (isLocked) {
                return (
                  <div
                    key={module.id}
                    className="block p-3 rounded-lg border transition-all opacity-50 cursor-not-allowed border-transparent"
                  >
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={module.id}
                  href={`/courses/${resolvedParams.slug}?module=${module.slug}`}
                  className={`
                    block p-3 rounded-lg border transition-all cursor-pointer
                    ${isCurrent 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:bg-muted/50 border-transparent'
                    }
                  `}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}