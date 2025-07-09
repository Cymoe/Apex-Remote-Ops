'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error details for debugging
    console.error('Global error occurred:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <html>
      <body className="bg-deep-black text-pure-white">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-4">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-medium-gray">
              A critical error has occurred. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-professional-blue text-white rounded hover:bg-professional-blue/90"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}