'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft } from 'lucide-react';

interface CourseHeaderProps {
  courseTitle: string;
  courseDescription: string;
  initialCompletedCount: number;
  totalModules: number;
  onCompletionChange?: (isCompleted: boolean) => void;
}

export function CourseHeader({ 
  courseTitle, 
  courseDescription, 
  initialCompletedCount, 
  totalModules,
  onCompletionChange
}: CourseHeaderProps) {
  const [completedCount, setCompletedCount] = useState(initialCompletedCount);
  const progressPercentage = Math.round((completedCount / totalModules) * 100);

  // Listen for completion changes from child components
  useEffect(() => {
    const handleCompletionUpdate = (event: CustomEvent) => {
      const { isCompleted } = event.detail;
      setCompletedCount(prev => isCompleted ? prev + 1 : Math.max(0, prev - 1));
    };

    window.addEventListener('moduleCompletionChanged' as any, handleCompletionUpdate);
    return () => {
      window.removeEventListener('moduleCompletionChanged' as any, handleCompletionUpdate);
    };
  }, []);

  return (
    <div className="space-y-4">
      <Link 
        href="/courses"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Courses
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold">{courseTitle}</h1>
        <p className="text-muted-foreground mt-2">{courseDescription}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Badge variant={progressPercentage === 100 ? "default" : "secondary"}>
          {completedCount}/{totalModules} modules completed
        </Badge>
        <div className="flex items-center gap-2">
          <Progress value={progressPercentage} className="w-32 h-2" />
          <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
        </div>
      </div>
    </div>
  );
}