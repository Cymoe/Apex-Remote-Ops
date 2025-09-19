import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  PlayCircle,
  Target,
  Users,
  Sparkles
} from 'lucide-react';
import { CourseCards } from '@/components/learning-paths/course-cards';

async function getLearningPathWithModules(slug: string) {
  try {
    const supabase = await createClient();
    
    // Get the learning path
    const { data: path, error: pathError } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('slug', slug)
      .single();

    if (pathError) {
      console.error('Database error fetching learning path:', pathError);
      return null;
    }
    
    if (!path) {
      console.error('No learning path found for slug:', slug);
      return null;
    }

    // Get all courses in this path with their modules
    if (!path.course_ids || path.course_ids.length === 0) {
      console.error('No course IDs found in learning path:', path);
      return null;
    }

  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select(`
      id,
      title,
      slug,
      description,
      level,
      duration_hours,
      modules (
        id,
        title,
        slug,
        description,
        tagline,
        video_duration_minutes,
        order_index
      )
    `)
    .in('id', path.course_ids)
    .order('order_index', { ascending: true });

  if (coursesError || !courses) {
    console.error('Error fetching courses:', coursesError);
    return null;
  }

  // Order courses according to course_ids array in learning path
  const orderedCourses = path.course_ids
    .map(courseId => courses.find(c => c.id === courseId))
    .filter(Boolean);

  // Get user progress for all modules
  const { data: { user } } = await supabase.auth.getUser();
  let userProgress = new Map();
  let completedCount = 0;
  let totalModules = 0;

  if (user && orderedCourses) {
    const allModuleIds = orderedCourses.flatMap(course => 
      course.modules?.map(m => m.id) || []
    );
    totalModules = allModuleIds.length;

    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .in('module_id', allModuleIds);

    if (progress) {
      progress.forEach(p => {
        userProgress.set(p.module_id, p);
        if (p.completed) completedCount++;
      });
    }
  }

  // Find the next incomplete module
  let nextModule = null;
  let nextCourseSlug = null;
  for (const course of orderedCourses) {
    for (const module of (course.modules || [])) {
      if (!userProgress.get(module.id)?.completed) {
        nextModule = module;
        nextCourseSlug = course.slug;
        break;
      }
    }
    if (nextModule) break;
  }

    return {
      path,
      courses: orderedCourses,
      userProgress,
      completedCount,
      totalModules,
      nextModule,
      nextCourseSlug,
      userId: user?.id
    };
  } catch (error) {
    console.error('Error in getLearningPathWithModules:', error);
    return null;
  }
}

export default async function LearningPathDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params || !params.slug) {
    console.error('No params or slug provided');
    notFound();
  }

  const data = await getLearningPathWithModules(params.slug);

  if (!data) {
    notFound();
  }

  const { path, courses, userProgress, completedCount, totalModules, nextModule, nextCourseSlug, userId } = data;
  const progressPercentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <Link 
        href="/learning-paths" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Learning Paths
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">{path.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{path.description}</p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            {path.estimated_duration_weeks} weeks
          </Badge>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Target className="w-4 h-4" />
            {totalModules} total modules
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            {path.target_audience}
          </span>
        </div>

        {/* Overall Progress */}
        {userId && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">
                {completedCount} of {totalModules} modules complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-right text-sm font-semibold text-primary">
              {progressPercentage}% Complete
            </p>
          </div>
        )}

        {/* Continue Learning Button */}
        {userId && nextModule && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Continue where you left off</p>
                  <p className="font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {nextModule.title}
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/courses/${nextCourseSlug}?module=${nextModule.slug}`}>
                    Continue Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-6" />

      {/* Course Cards - Visual Progress Grid */}
      <CourseCards 
        courses={courses}
        userProgress={userProgress}
        userId={userId}
        nextModule={nextModule}
      />

      {/* Completion Message */}
      {userId && progressPercentage === 100 && (
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Congratulations!</h3>
            <p className="text-muted-foreground">
              You've completed all modules in the {path.title} learning path.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Start Learning (for non-authenticated users) */}
      {!userId && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Sign in to track your progress and start learning
            </p>
            <Button asChild size="lg">
              <Link href="/auth/signin">
                Sign In to Start Learning
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}