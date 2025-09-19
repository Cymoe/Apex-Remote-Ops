import { createClient } from '@/lib/supabase/server';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  Calendar, 
  Award, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  GraduationCap,
  Building2,
  Megaphone,
  Wrench,
  Rocket,
  DollarSign,
  Monitor,
  Settings
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration_hours: number;
  order_index: number;
  level?: string;
  category?: string;
  estimated_weeks?: number;
  is_published?: boolean;
}

interface Module {
  id: string;
  course_id: string;
  title: string;
  video_duration_minutes: number;
}

interface UserProgress {
  module_id: string;
  completed: boolean;
  progress_percentage: number;
}

async function getCourses() {
  const supabase = await createClient();
  
  // Get all published courses
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  if (coursesError) {
    console.error('Error fetching courses:', coursesError);
    return [];
  }

  // Get all modules
  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id, course_id, title, video_duration_minutes');

  if (modulesError) {
    console.error('Error fetching modules:', modulesError);
    return courses || [];
  }

  // Get user progress
  const { data: { user } } = await supabase.auth.getUser();
  let userProgress: UserProgress[] = [];
  
  if (user) {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('module_id, completed, progress_percentage')
      .eq('user_id', user.id);
    
    userProgress = progress || [];
  }

  // Calculate progress and duration for each course
  const coursesWithProgress = courses?.map(course => {
    const courseModules = modules?.filter(m => m.course_id === course.id) || [];
    const completedModules = courseModules.filter(module => 
      userProgress.some(p => p.module_id === module.id && p.completed)
    ).length;
    
    const progressPercentage = courseModules.length > 0 
      ? Math.round((completedModules / courseModules.length) * 100)
      : 0;

    // Calculate course duration from modules if not set
    const courseDuration = course.duration_hours || 
      Math.round(courseModules.reduce((sum, m) => sum + (m.video_duration_minutes || 0), 0) / 60);

    // Debug logging for courses that might be showing as "Coming Soon"
    if (courseModules.length === 0) {
      console.log(`Course "${course.title}" has no modules found. Course ID: ${course.id}`);
    }

    return {
      ...course,
      duration_hours: courseDuration,
      moduleCount: courseModules.length,
      completedModules,
      progressPercentage,
    };
  }) || [];

  return coursesWithProgress;
}

// Course Card Component
function CourseCard({ course, isComingSoon = false }: { course: any; isComingSoon?: boolean }) {
  const isCompleted = !isComingSoon && course.progressPercentage === 100;
  const isInProgress = !isComingSoon && course.progressPercentage > 0 && course.progressPercentage < 100;
  const isSoftwareCourse = course.title?.includes('[Your Software]') || course.title?.includes('Software]');
  
  return (
    <Link href={isComingSoon ? '#' : `/courses/${course.slug}`} className={isComingSoon ? 'cursor-not-allowed' : ''}>
      <Card className={`h-full transition-all duration-300 ${
        isComingSoon ? 'opacity-60 border-dashed' : 'hover:shadow-lg hover:-translate-y-1'
      } ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}`}>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <h3 className="font-semibold text-base sm:text-lg line-clamp-2 flex-1 min-w-0">
                {course.title}
              </h3>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {isSoftwareCourse && (
                  <Badge variant="secondary" className="text-xs hidden sm:flex">
                    <Monitor className="w-3 h-3 mr-1" />
                    Platform
                  </Badge>
                )}
                {isComingSoon && (
                  <Badge variant="outline" className="text-xs">
                    Soon
                  </Badge>
                )}
                {isCompleted && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0" />}
              </div>
            </div>
            
            {/* Description for coming soon */}
            {isComingSoon && course.description && (
              <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                {course.description}
              </p>
            )}
            
            {/* Quick Info */}
            {!isComingSoon && (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                  {course.moduleCount || 0} modules
                </span>
                {course.estimated_weeks && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      {course.estimated_weeks}w
                    </span>
                  </>
                )}
              </div>
            )}
            
            {/* Progress or Status */}
            {!isComingSoon && isInProgress ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progressPercentage}%</span>
                </div>
                <Progress value={course.progressPercentage} className="h-1.5 sm:h-2" />
              </div>
            ) : !isComingSoon && isCompleted ? (
              <div className="flex items-center gap-2 text-sm sm:text-base text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </div>
            ) : !isComingSoon ? (
              <Button variant="outline" size="sm" className="w-full text-sm sm:text-base">
                <PlayCircle className="w-4 h-4 mr-2" />
                Start Course
              </Button>
            ) : (
              <div className="text-sm sm:text-base text-muted-foreground text-center py-2">
                Available soon
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default async function CoursesPage() {
  const courses = await getCourses();
  
  // Get user data for personalization
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Calculate overall stats dynamically
  const completedCourses = courses.filter(c => c.progressPercentage === 100).length;
  const inProgressCourses = courses.filter(c => c.progressPercentage > 0 && c.progressPercentage < 100).length;
  const totalCourses = courses.length;
  
  // Find next recommended course
  const nextCourse = courses.find(c => c.progressPercentage === 0) || 
                     courses.find(c => c.progressPercentage > 0 && c.progressPercentage < 100);
  
  // No longer need hardcoded coming soon courses - they're all in the database now
  
  // Organize existing courses by category with more granular sections
  const foundationCourses = courses.filter(c => 
    c.category === 'foundation' || 
    c.title.includes('Foundation') || 
    c.title.includes('Business Setup') ||
    c.title.includes('Market Selection') ||
    c.title.includes('Virtual Office') ||
    c.title.includes('Licensing') ||
    c.title.includes('Software] Setup')
  );
  
  // Split Getting Customers into Marketing and Sales
  const marketingCourses = courses.filter(c => 
    c.title.includes('Marketing') || 
    c.title.includes('SEO') ||
    (c.category === 'client-acquisition' && !c.title.includes('Sales'))
  );
  
  const salesCourses = courses.filter(c => 
    c.title.includes('Sales') ||
    c.title.includes('Lead Management') ||
    c.title.includes('Customer Success') ||
    (c.category === 'sales')
  );
  
  // Split Operations into Job Execution and Operations Management
  const jobExecutionCourses = courses.filter(c => 
    c.title.includes('Estimation') || 
    c.title.includes('Procurement') || 
    c.title.includes('Project Management') ||
    c.title.includes('Job Monitoring') ||
    c.title.includes('Jobs & Scheduling')
  );
  
  const operationsManagementCourses = courses.filter(c => 
    c.title.includes('Operations & Fulfillment') ||
    c.title.includes('Daily Accountability') ||
    c.title.includes('Crisis Management') ||
    c.title.includes('Supplier Network') ||
    c.title.includes('Legal, HR') ||
    c.title.includes('Reporting in')
  );
  
  const teamCourses = courses.filter(c => 
    c.category === 'team-building' || 
    c.title.includes('Subcontractor') ||
    c.title.includes('Recruiting') ||
    c.title.includes('Training') ||
    c.title.includes('Team Tools') ||
    c.title.includes('Finding Your Local Champion')
  );
  
  const scalingCourses = courses.filter(c => 
    c.category === 'growth' || 
    c.category === 'finance' || 
    c.title.includes('Financial') || 
    c.title.includes('Multi-Market') ||
    c.title.includes('Remote Financial Controls')
  );
  
  const exitCourses = courses.filter(c => 
    c.title.includes('Sellable Value') || 
    c.title.includes('Preparing for Sale') || 
    c.title.includes('Sale Process')
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header & Stats */}
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Your Learning Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Master the systems and strategies for building a location-independent contracting empire.
          </p>
        </div>
        
        {/* Progress Overview */}
        {user && (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-base text-muted-foreground">Completed</p>
                    <p className="text-xl sm:text-2xl font-bold">{completedCourses}</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-base text-muted-foreground">In Progress</p>
                    <p className="text-xl sm:text-2xl font-bold">{inProgressCourses}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm sm:text-base text-muted-foreground">Total Courses</p>
                    <p className="text-xl sm:text-2xl font-bold">{totalCourses}</p>
                  </div>
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Recommended Next Course */}
      {user && nextCourse && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <p className="text-sm sm:text-base font-medium text-primary">Recommended Next</p>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{nextCourse.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2">{nextCourse.description}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-muted-foreground">
                  <span>{nextCourse.moduleCount} modules</span>
                  {nextCourse.estimated_weeks && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span>{nextCourse.estimated_weeks} weeks</span>
                    </>
                  )}
                  {nextCourse.progressPercentage > 0 && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-primary font-medium">{nextCourse.progressPercentage}% complete</span>
                    </>
                  )}
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto shrink-0">
                <Link href={`/courses/${nextCourse.slug}`}>
                  {nextCourse.progressPercentage > 0 ? 'Continue' : 'Start'} Course
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Categories */}
      <div className="space-y-8 sm:space-y-10">
        {/* Foundation & Setup */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Foundation & Setup</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Build your remote empire's foundation</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {foundationCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Marketing */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Marketing</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Attract customers from anywhere</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {marketingCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Sales */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Sales</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Close deals and retain customers</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {salesCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Job Execution */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Job Execution</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Run projects flawlessly remotely</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {jobExecutionCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Operations Management */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Operations Management</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Systems for sustainable growth</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {operationsManagementCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Building Your Team */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Building Your Team</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Find and manage great people remotely</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {teamCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Scaling Up */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Scaling Up</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Multiply your success across markets</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {scalingCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Exit Ready */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-semibold">Exit Ready</h2>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">Build value and cash out</span>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            {exitCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}