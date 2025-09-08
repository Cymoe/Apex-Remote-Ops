'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApexLogo } from '@/components/apex-logo';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';

export default function ApplicationProcessingPage() {
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<any>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [territoryAvailable, setTerritoryAvailable] = useState<boolean | null>(null);

  const processingSteps = [
    "Verifying application details...",
    "Checking territory availability...",
    "Processing application fee...",
    "Reviewing qualification criteria...",
    "Preparing your results..."
  ];

  useEffect(() => {
    // Get application data from session
    const data = sessionStorage.getItem('applicationData');
    if (!data) {
      router.push('/apply');
      return;
    }
    
    setApplicationData(JSON.parse(data));
    
    // Simulate processing steps
    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          // After processing, check territory and redirect
          setTimeout(() => {
            // Simulate territory check (90% available)
            const isAvailable = Math.random() > 0.1;
            setTerritoryAvailable(isAvailable);
            
            // Redirect after showing result
            setTimeout(() => {
              if (isAvailable) {
                router.push('/operator-license');
              } else {
                router.push('/apply/rejected');
              }
            }, 2000);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <ApexLogo size="lg" className="mx-auto mb-12 [&_div]:from-amber-500 [&_div]:to-amber-600" />
        
        {territoryAvailable === null ? (
          <>
            <h1 className="text-3xl font-bold mb-8">Processing Your Application</h1>
            
            <div className="space-y-4 mb-12">
              {processingSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 text-left">
                  {index < processingStep ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : index === processingStep ? (
                    <Loader2 className="w-6 h-6 text-amber-500 animate-spin flex-shrink-0" />
                  ) : (
                    <Clock className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  )}
                  <span className={index <= processingStep ? 'text-white' : 'text-gray-500'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-gray-400">
              This typically takes 30-60 seconds. Please don't refresh the page.
            </p>
          </>
        ) : (
          <div className="animate-fade-in">
            {territoryAvailable ? (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-green-400">
                  Congratulations! You're Approved
                </h2>
                <p className="text-xl mb-2">
                  {applicationData?.desiredTerritory} is available!
                </p>
                <p className="text-gray-400">Redirecting to your offer page...</p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6">
                  <Clock className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-red-400">
                  Territory Unavailable
                </h2>
                <p className="text-xl mb-2">
                  Unfortunately, {applicationData?.desiredTerritory} is already taken.
                </p>
                <p className="text-gray-400">Redirecting to alternative options...</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}