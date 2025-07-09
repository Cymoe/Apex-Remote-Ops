'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  CheckCircle2, 
  PlayCircle,
  Lock,
  ArrowRight,
  Sparkles,
  DollarSign,
  TrendingUp,
  Settings,
  Globe
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  slug: string;
  description?: string;
  tagline?: string;
  video_duration_minutes?: number;
  order_index: number;
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration_hours: number;
  modules?: Module[];
}

interface CourseCardsProps {
  courses: Course[];
  userProgress: Map<string, any>;
  userId?: string;
  nextModule: Module | null;
}

export function CourseCards({ courses, userProgress, userId, nextModule }: CourseCardsProps) {
  // Course metadata with icons and colors
  const courseMetadata: Record<number, { icon: any; color: string; gradient: string }> = {
    0: { 
      icon: DollarSign, 
      color: 'text-green-500', 
      gradient: 'from-green-500/20 to-green-600/10' 
    },
    1: { 
      icon: Settings, 
      color: 'text-blue-500', 
      gradient: 'from-blue-500/20 to-blue-600/10' 
    },
    2: { 
      icon: TrendingUp, 
      color: 'text-purple-500', 
      gradient: 'from-purple-500/20 to-purple-600/10' 
    },
    3: { 
      icon: Globe, 
      color: 'text-orange-500', 
      gradient: 'from-orange-500/20 to-orange-600/10' 
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {courses.map((course, courseIndex) => {
        const courseModules = course.modules || [];
        const completedInCourse = courseModules.filter(m => 
          userProgress.get(m.id)?.completed
        ).length;
        const progress = courseModules.length > 0 
          ? Math.round((completedInCourse / courseModules.length) * 100)
          : 0;
        
        const isCompleted = progress === 100;
        const isInProgress = completedInCourse > 0 && !isCompleted;
        const isLocked = courseIndex > 0 && userId && 
          !courses.slice(0, courseIndex).some(c => 
            (c.modules || []).some(m => userProgress.get(m.id)?.completed)
          );
        
        const meta = courseMetadata[courseIndex] || courseMetadata[0];
        const Icon = meta.icon;
        
        // Find next module in this course
        const nextModuleInCourse = courseModules.find(m => 
          !userProgress.get(m.id)?.completed
        );
        const isCurrentCourse = nextModule && courseModules.some(m => m.id === nextModule.id);

        return (
          <Card 
            key={course.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
              isLocked ? 'opacity-60' : ''
            } ${isCurrentCourse ? 'ring-2 ring-primary ring-offset-2' : ''}`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-50`} />
            
            {/* Content */}
            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                {/* Course Number & Icon */}
                <div className="flex items-center gap-4">
                  <div className={`relative ${isLocked ? 'opacity-50' : ''}`}>
                    <div className="text-6xl font-bold text-muted-foreground/20">
                      {courseIndex + 1}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 p-2 rounded-lg bg-white/90 dark:bg-black/90 shadow-md ${meta.color}`}>
                      {isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Ring */}
                {userId && !isLocked && (
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted-foreground/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                        className={`${meta.color} transition-all duration-500`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">{progress}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">
                    {course.title.replace('Marketing: ', '')}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{courseModules.length} modules</span>
                  <span>•</span>
                  <span>{course.duration_hours} hours</span>
                  {isInProgress && (
                    <>
                      <span>•</span>
                      <span className="text-primary font-medium">
                        {completedInCourse}/{courseModules.length} done
                      </span>
                    </>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {isLocked ? (
                    <Button variant="outline" disabled className="w-full">
                      <Lock className="w-4 h-4 mr-2" />
                      Complete Previous Course
                    </Button>
                  ) : isCompleted ? (
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/courses/${course.slug}`}>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Review Course
                      </Link>
                    </Button>
                  ) : isInProgress ? (
                    <Button asChild className="w-full" variant={isCurrentCourse ? "default" : "secondary"}>
                      <Link href={`/courses/${course.slug}${nextModuleInCourse ? `?module=${nextModuleInCourse.slug}` : ''}`}>
                        {isCurrentCourse && <Sparkles className="w-4 h-4 mr-2" />}
                        Continue Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href={`/courses/${course.slug}`}>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Course
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}