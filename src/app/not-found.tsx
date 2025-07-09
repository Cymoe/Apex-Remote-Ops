import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <FileX className="w-16 h-16 text-medium-gray mx-auto" />
        <h1 className="text-4xl font-bold text-pure-white">404</h1>
        <h2 className="text-2xl text-pure-white">Page Not Found</h2>
        <p className="text-medium-gray max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-professional-blue hover:bg-professional-blue/90">
          <Link href="/">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}