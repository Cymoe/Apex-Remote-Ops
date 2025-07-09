'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface ProgressTrackerProps {
  moduleId: string;
  userId: string;
  isCompleted: boolean;
}

export default function ProgressTracker({ 
  moduleId, 
  userId, 
  isCompleted: initialCompleted
}: ProgressTrackerProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Sync with parent prop changes
  useEffect(() => {
    setIsCompleted(initialCompleted);
  }, [initialCompleted]);

  const handleToggleComplete = async () => {
    const newCompletedState = !isCompleted;
    
    // Optimistic update - update UI immediately
    setIsCompleted(newCompletedState);
    
    // Emit event for parent components to update
    window.dispatchEvent(new CustomEvent('moduleCompletionChanged', { 
      detail: { moduleId, isCompleted: newCompletedState } 
    }));
    
    setIsLoading(true);
    
    try {
      console.log('Toggling completion:', { moduleId, userId, newCompletedState });
      
      const upsertData: any = {
        user_id: userId,
        module_id: moduleId,
        completed: newCompletedState,
        progress_percentage: newCompletedState ? 100 : 0,
      };

      if (newCompletedState) {
        upsertData.completed_at = new Date().toISOString();
      } else {
        upsertData.completed_at = null;
      }

      const { data, error } = await supabase
        .from('user_progress')
        .upsert(upsertData, {
          onConflict: 'user_id,module_id'
        })
        .select();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // Revert optimistic update on error
        setIsCompleted(!newCompletedState);
        window.dispatchEvent(new CustomEvent('moduleCompletionChanged', { 
          detail: { moduleId, isCompleted: !newCompletedState } 
        }));
        
        setIsLoading(false);
        return;
      }
      
      console.log('Upsert successful:', data);
      setIsLoading(false);
      
      // Light refresh to sync server state
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error('Error toggling module completion:', error);
      
      // Revert optimistic update on error
      setIsCompleted(!newCompletedState);
      window.dispatchEvent(new CustomEvent('moduleCompletionChanged', { 
        detail: { moduleId, isCompleted: !newCompletedState } 
      }));
      
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isCompleted ? "ghost" : "secondary"}
      size="sm"
      onClick={handleToggleComplete}
      disabled={isLoading}
      className={isCompleted ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : ''}
    >
      {isLoading ? (
        'Loading...'
      ) : isCompleted ? (
        <>
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Completed
        </>
      ) : (
        'Mark Complete'
      )}
    </Button>
  );
}