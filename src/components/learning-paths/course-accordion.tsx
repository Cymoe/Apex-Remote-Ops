'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  PlayCircle,
  ChevronDown,
  ChevronRight,
  Lock,
  ArrowRight,
  Zap
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

interface CourseAccordionProps {
  courses: Course[];
  userProgress: Map<string, any>;
  userId?: string;
  nextModule: Module | null;
}

export function CourseAccordion({ courses, userProgress, userId, nextModule }: CourseAccordionProps) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {courses.map((course, courseIndex) => {
        const courseModules = course.modules || [];
        const completedInCourse = courseModules.filter(m => 
          userProgress.get(m.id)?.completed
        ).length;
        const courseProgress = courseModules.length > 0 
          ? Math.round((completedInCourse / courseModules.length) * 100)
          : 0;
        const isExpanded = expandedCourse === course.id;
        const isCompleted = courseProgress === 100;
        const hasStarted = completedInCourse > 0;
        const isLocked = courseIndex > 0 && !hasStarted && userId && 
          !courses.slice(0, courseIndex).some(c => 
            (c.modules || []).some(m => userProgress.get(m.id)?.completed)
          );

        return (
          <Card 
            key={course.id} 
            className={`overflow-hidden transition-all duration-200 ${
              isExpanded ? 'shadow-lg border-primary/20' : ''
            } ${isLocked ? 'opacity-60' : ''}`}
          >
            <CardHeader 
              className={`cursor-pointer select-none ${
                isCompleted ? 'bg-success-green/5' : hasStarted ? 'bg-primary/5' : ''
              }`}
              onClick={() => !isLocked && toggleCourse(course.id)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          Course {courseIndex + 1}: {course.title}
                        </CardTitle>
                        {isCompleted && (
                          <CheckCircle2 className="w-5 h-5 text-success-green" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="w-3 h-3" />
                      <span>{courseModules.length} modules</span>
                    </div>
                  </div>
                </div>
                
                {/* Compact Progress */}
                {userId && !isLocked && (
                  <div className="flex items-center gap-3">
                    <Progress value={courseProgress} className="h-1.5 flex-1" />
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {completedInCourse}/{courseModules.length}
                    </span>
                  </div>
                )}

                {isLocked && (
                  <p className="text-xs text-muted-foreground italic">
                    Complete previous courses to unlock
                  </p>
                )}
              </div>
            </CardHeader>

            {isExpanded && !isLocked && (
              <CardContent className="p-0 border-t">
                <div className="divide-y">
                  {courseModules
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((module, moduleIndex) => {
                      const isModuleCompleted = userProgress.get(module.id)?.completed;
                      const isNext = module.id === nextModule?.id;

                      return (
                        <Link
                          key={module.id}
                          href={`/courses/${course.slug}?module=${module.slug}`}
                          className={`
                            block p-4 hover:bg-muted/50 transition-colors
                            ${isNext ? 'bg-primary/5 border-l-4 border-primary' : ''}
                            ${isModuleCompleted ? 'opacity-75' : ''}
                          `}
                        >
                          <div className="flex items-start gap-3">
                            {/* Module Status */}
                            <div className="flex-shrink-0 mt-0.5">
                              {isModuleCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-success-green" />
                              ) : (
                                <div className={`
                                  w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-semibold
                                  ${isNext ? 'border-primary text-primary bg-primary/10' : 'border-muted-foreground/30 text-muted-foreground/50'}
                                `}>
                                  {moduleIndex + 1}
                                </div>
                              )}
                            </div>

                            {/* Module Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className={`font-medium text-sm ${isModuleCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                    {module.title}
                                  </h4>
                                  {module.tagline && (
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                      {module.tagline}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  {module.video_duration_minutes && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {module.video_duration_minutes}m
                                    </span>
                                  )}
                                  <PlayCircle className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="p-4 bg-muted/30 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {course.duration_hours} hours total
                    </span>
                    {hasStarted && !isCompleted && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/courses/${course.slug}`}>
                          Continue Course
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    )}
                    {!hasStarted && (
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.slug}`}>
                          Start Course
                          <PlayCircle className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}