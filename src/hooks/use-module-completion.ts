'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseModuleCompletionProps {
  moduleId: string;
  nextModuleUrl?: string;
  nextModuleTitle?: string;
  autoAdvance?: boolean;
}

export function useModuleCompletion({
  moduleId,
  nextModuleUrl,
  nextModuleTitle,
  autoAdvance = true
}: UseModuleCompletionProps) {
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  let countdownInterval: NodeJS.Timeout | null = null;

  // Listen for module completion events
  useEffect(() => {
    const handleModuleComplete = (event: CustomEvent) => {
      if (event.detail.moduleId === moduleId && autoAdvance && nextModuleUrl) {
        startCountdown();
      }
    };

    window.addEventListener('moduleComplete' as any, handleModuleComplete);
    
    return () => {
      window.removeEventListener('moduleComplete' as any, handleModuleComplete);
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [moduleId, nextModuleUrl, autoAdvance]);

  const startCountdown = () => {
    setShowCountdown(true);
    let count = 5;
    setCountdown(count);
    
    countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
        router.push(nextModuleUrl!);
      }
    }, 1000);
  };

  const cancelCountdown = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    setShowCountdown(false);
    setCountdown(5);
  };

  const skipToNext = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    router.push(nextModuleUrl!);
  };

  return {
    showCountdown,
    countdown,
    cancelCountdown,
    skipToNext,
    nextModuleTitle
  };
}