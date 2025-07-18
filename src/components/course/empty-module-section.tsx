'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface EmptyModuleSectionProps {
  moduleId: string;
  userId: string;
  isCompleted: boolean;
  nextModuleUrl?: string;
  courseSlug: string;
}

export function EmptyModuleSection({ 
  moduleId, 
  userId, 
  isCompleted,
  nextModuleUrl,
  courseSlug
}: EmptyModuleSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(isCompleted);
  const router = useRouter();
  const supabase = createClient();

  const handleComplete = async () => {
    setIsLoading(true);
    
    try {
      await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          completed: true,
          progress_percentage: 100,
          completed_at: new Date().toISOString(),
        });

      setHasCompleted(true);
      
      // Refresh the page to update the sidebar
      router.refresh();
      
      // If there's a next module, navigate to it after a short delay
      if (nextModuleUrl) {
        setTimeout(() => {
          router.push(nextModuleUrl);
        }, 1000);
      }
    } catch (error) {
      console.error('Error marking module as complete:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="aspect-video bg-muted flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">No video available for this module</p>
        {userId && !hasCompleted && (
          <Button 
            onClick={handleComplete}
            disabled={isLoading}
          >
            {isLoading ? 'Marking as Complete...' : 'Mark as Complete'}
          </Button>
        )}
        {hasCompleted && (
          <div className="px-6 py-2 bg-green-600/20 text-green-600 rounded-lg font-medium">
            ✓ Module Completed
          </div>
        )}
      </div>
    </div>
  );
} 