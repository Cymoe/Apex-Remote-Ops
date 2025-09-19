'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LinearCourseList } from './linear-course-list';
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

interface CollapsibleCourseSectionProps {
  title: string;
  description: string;
  courses: Course[];
  currentUserId?: string;
  defaultOpen?: boolean;
}

export function CollapsibleCourseSection({
  title,
  description,
  courses,
  currentUserId,
  defaultOpen = false
}: CollapsibleCourseSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Calculate section progress
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.progressPercentage === 100).length;
  const inProgressCourses = courses.filter(c => c.progressPercentage > 0 && c.progressPercentage < 100).length;
  const sectionProgress = totalCourses > 0 
    ? Math.round((courses.reduce((sum, c) => sum + c.progressPercentage, 0) / totalCourses))
    : 0;

  // Find current course in this section
  const currentCourse = courses.find(c => c.progressPercentage > 0 && c.progressPercentage < 100) 
    || courses.find(c => c.progressPercentage === 0);

  return (
    <div className="border border-slate-gray rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-slate-gray/20 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Section Info */}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="text-base sm:text-lg font-semibold text-pure-white" title={description}>
                {title}
              </h2>
              <span className="text-xs sm:text-sm text-medium-gray">
                {completedCourses}/{totalCourses} courses
              </span>
              {completedCourses === totalCourses && (
                <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                  Completed
                </span>
              )}
              {inProgressCourses > 0 && (
                <span className="text-xs bg-professional-blue/20 text-professional-blue px-2 py-0.5 rounded-full">
                  In Progress
                </span>
              )}
            </div>
            
            {/* Compact Progress Info */}
            {sectionProgress > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <Progress value={sectionProgress} className="h-1 w-16 sm:w-20" />
                <span className="text-xs text-medium-gray">{sectionProgress}%</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Expand/Collapse Icon */}
        <div className="shrink-0 ml-3">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-medium-gray" />
          ) : (
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-medium-gray" />
          )}
        </div>
      </button>
      
      {/* Collapsible Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="p-4 sm:p-6 pt-0">
          <LinearCourseList 
            courses={courses} 
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  );
}