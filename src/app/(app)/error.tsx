'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto bg-deep-black border-slate-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pure-white">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-medium-gray">
            An unexpected error has occurred. We apologize for the inconvenience.
          </p>
          <Button 
            onClick={reset}
            className="w-full bg-professional-blue hover:bg-professional-blue/90"
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}