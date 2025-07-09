'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedVideoPlayer } from '@/components/video/unified-player';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface VideoSectionProps {
  videoUrl: string;
  moduleId: string;
  userId: string;
  initialProgress?: number;
  nextModuleUrl?: string;
  nextModuleTitle?: string;
  isCompleted?: boolean;
}

export function VideoSection({ 
  videoUrl, 
  moduleId, 
  userId, 
  initialProgress = 0,
  nextModuleUrl,
  nextModuleTitle,
  isCompleted: initialCompleted = false
}: VideoSectionProps) {
  const [showContinue, setShowContinue] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleVideoComplete = async () => {
    console.log('Video completed, saving progress...');
    
    // Save completion to database
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

      // Show continue button and start countdown if there's a next module
      if (nextModuleUrl) {
        setShowContinue(true);
        setIsCountingDown(true);
      } else {
        // Just refresh if no next module
        router.refresh();
      }
    } catch (error) {
      console.error('Error saving completion:', error);
    }
  };

  // Countdown effect
  useEffect(() => {
    if (!isCountingDown || !nextModuleUrl) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push(nextModuleUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountingDown, nextModuleUrl, router]);

  return (
    <div className="relative">
      <UnifiedVideoPlayer 
        videoUrl={videoUrl}
        moduleId={moduleId}
        userId={userId}
        initialProgress={initialProgress}
        onComplete={handleVideoComplete}
      />
      
      {/* Continue to next module overlay */}
      {showContinue && nextModuleUrl && (
        <div className="absolute bottom-4 right-4 bg-deep-black/95 backdrop-blur-sm rounded-lg p-4 max-w-sm animate-in slide-in-from-bottom-2">
          <p className="text-sm text-medium-gray mb-2">Up next:</p>
          <p className="font-semibold text-pure-white mb-3">{nextModuleTitle}</p>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push(nextModuleUrl)}
              className="bg-professional-blue hover:bg-professional-blue/90"
            >
              Continue {isCountingDown && `(${countdown})`}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsCountingDown(false);
                setShowContinue(false);
              }}
              className="text-medium-gray hover:text-pure-white"
            >
              Stay here
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}