'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  PlayCircle,
  Clock,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  moduleCount: number;
  estimated_weeks?: number;
  progressPercentage: number;
  completedModules: number;
  order_index: number;
}

interface LinearCourseListProps {
  courses: Course[];
  currentUserId?: string;
}

export function LinearCourseList({ courses, currentUserId }: LinearCourseListProps) {
  // Sort courses by order_index to ensure proper sequence
  const sortedCourses = [...courses].sort((a, b) => a.order_index - b.order_index);
  
  // Find the first incomplete course
  const firstIncompleteIndex = sortedCourses.findIndex(course => course.progressPercentage < 100);
  const currentCourseIndex = firstIncompleteIndex === -1 ? sortedCourses.length - 1 : firstIncompleteIndex;

  return (
    <div className="space-y-4">
      {sortedCourses.map((course, index) => {
        const isCompleted = course.progressPercentage === 100;
        const isInProgress = course.progressPercentage > 0 && course.progressPercentage < 100;
        const isCurrent = index === currentCourseIndex;
        const isLocked = !currentUserId || (index > currentCourseIndex && !isInProgress);
        const isNext = index === currentCourseIndex + 1;

        return (
          <div key={course.id} className="relative">
            {/* Connection Line */}
            {index < sortedCourses.length - 1 && (
              <div 
                className={cn(
                  "absolute left-[22px] top-[48px] w-[2px] h-[calc(100%+16px)] -z-10",
                  isCompleted ? "bg-green-500" : "bg-slate-gray"
                )}
              />
            )}

            <Card 
              className={cn(
                "transition-all duration-300",
                isCompleted && "border-green-500/30 bg-green-500/5",
                isCurrent && "border-professional-blue shadow-lg shadow-professional-blue/10",
                isLocked && "opacity-60"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Step Indicator */}
                  <div className="shrink-0">
                    {isCompleted ? (
                      <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                    ) : isInProgress || isCurrent ? (
                      <div className="w-11 h-11 rounded-full bg-professional-blue flex items-center justify-center">
                        <span className="text-white font-semibold">{index + 1}</span>
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-slate-gray flex items-center justify-center">
                        {isLocked ? (
                          <Lock className="w-5 h-5 text-medium-gray" />
                        ) : (
                          <span className="text-light-gray font-semibold">{index + 1}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-pure-white">
                            {course.title}
                          </h3>
                          {isCurrent && !isCompleted && (
                            <span className="text-xs bg-professional-blue/20 text-professional-blue px-2 py-1 rounded-full">
                              Current
                            </span>
                          )}
                          {isNext && (
                            <span className="text-xs bg-slate-gray/50 text-medium-gray px-2 py-1 rounded-full">
                              Up Next
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-light-gray mb-3 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Course Metadata */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-medium-gray mb-3">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.moduleCount} modules
                          </span>
                          {course.estimated_weeks && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.estimated_weeks} weeks
                            </span>
                          )}
                          {isInProgress && (
                            <span className="flex items-center gap-1 text-professional-blue">
                              <PlayCircle className="w-4 h-4" />
                              {course.completedModules}/{course.moduleCount} completed
                            </span>
                          )}
                        </div>

                        {/* Progress Bar */}
                        {(isInProgress || isCompleted) && (
                          <div className="space-y-1">
                            <Progress 
                              value={course.progressPercentage} 
                              className="h-2"
                            />
                            <p className="text-xs text-medium-gray">
                              {course.progressPercentage}% complete
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0">
                        {!isLocked ? (
                          <Button
                            asChild
                            variant={isCompleted ? "outline" : isCurrent ? "default" : "secondary"}
                            size="sm"
                          >
                            <Link href={`/courses/${course.slug}`}>
                              {isCompleted ? (
                                <>Review</>
                              ) : isInProgress ? (
                                <>Continue</>
                              ) : (
                                <>Start</>
                              )}
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        ) : (
                          <div className="text-sm text-medium-gray flex items-center gap-1">
                            <Lock className="w-4 h-4" />
                            <span>Locked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}