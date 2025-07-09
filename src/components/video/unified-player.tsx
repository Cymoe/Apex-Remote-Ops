'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface UnifiedVideoPlayerProps {
  videoUrl: string;
  moduleId: string;
  userId?: string;
  initialProgress?: number;
  onComplete?: () => void;
  className?: string;
}

export function UnifiedVideoPlayer({ 
  videoUrl, 
  moduleId, 
  userId, 
  initialProgress = 0,
  onComplete,
  className = ''
}: UnifiedVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState(initialProgress);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressSaveInterval = useRef<NodeJS.Timeout | null>(null);
  
  const supabase = createClient();
  
  // Determine if it's a Loom video
  const isLoomVideo = videoUrl.includes('loom.com');
  
  // Convert Loom share URL to embed URL if needed
  const embedUrl = isLoomVideo && videoUrl.includes('/share/') 
    ? videoUrl.replace('/share/', '/embed/')
    : videoUrl;

  // Save progress to database
  const saveProgress = async (currentTime: number, completed = false) => {
    if (!userId) return;
    
    // For Loom videos, we can't track exact time, so use percentage
    const progressPercentage = completed ? 100 : 
      (videoRef.current ? Math.round((currentTime / videoRef.current.duration) * 100) : 0);

    try {
      await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          last_watched_position: Math.floor(currentTime),
          progress_percentage: progressPercentage,
          completed: completed || progressPercentage >= 95,
          completed_at: completed ? new Date().toISOString() : null,
        });
      
      setLastSavedTime(currentTime);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Handle progress updates for HTML5 video
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    const progressPercent = (currentTime / duration) * 100;
    
    setProgress(progressPercent);
    
    // Save progress every 5 seconds
    if (Math.abs(currentTime - lastSavedTime) >= 5 && userId) {
      saveProgress(currentTime);
    }
    
    // Check for completion at 95%
    if (progressPercent >= 95 && !hasCompleted) {
      console.log('Video reached completion threshold');
      
      setHasCompleted(true);
      if (onComplete) {
        onComplete();
      }
      if (userId) {
        saveProgress(currentTime, true);
      }
    }
  };

  // Set up progress saving interval
  useEffect(() => {
    if (!userId || isLoomVideo) return;
    
    // Save progress every 30 seconds
    progressSaveInterval.current = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        saveProgress(videoRef.current.currentTime);
      }
    }, 30000);
    
    return () => {
      if (progressSaveInterval.current) {
        clearInterval(progressSaveInterval.current);
      }
      // Save progress on unmount
      if (videoRef.current) {
        saveProgress(videoRef.current.currentTime);
      }
    };
  }, [userId, isLoomVideo]);

  // Set initial progress for HTML5 video
  useEffect(() => {
    if (videoRef.current && initialProgress > 0 && !isLoomVideo) {
      videoRef.current.currentTime = initialProgress;
    }
  }, [initialProgress, isLoomVideo]);

  if (isLoomVideo) {
    // Render Loom iframe
    return (
      <div className={`relative ${className}`}>
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          
        </div>
        
      </div>
    );
  }

  // Render HTML5 video player
  return (
    <div className={`relative ${className}`}>
      <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full h-full"
          onLoadedData={() => setIsLoading(false)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            if (!hasCompleted) {
              setHasCompleted(true);
              if (onComplete) onComplete();
              if (userId && videoRef.current) {
                saveProgress(videoRef.current.currentTime, true);
              }
              
            }
          }}
        />
        
      </div>
      <div className="mt-2">
        <Progress value={progress} className="h-1" />
        <p className="text-xs text-medium-gray mt-1">
          {Math.round(progress)}% complete
        </p>
      </div>
    </div>
  );
}