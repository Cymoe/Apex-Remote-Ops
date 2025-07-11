import Link from 'next/link';
import { CheckCircle, Mail, Calendar, ArrowLeft } from 'lucide-react';
import { ApexLogo } from '@/components/apex-logo';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <ApexLogo size="lg" className="[&_div[class*='from-professional-blue']]:from-amber-500 [&_div[class*='to-professional-blue']]:to-amber-600 [&_div[class*='border-professional-blue']]:border-amber-500 [&_div[class*='text-professional-blue']]:text-amber-500" />
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-mono text-gray-100">
            Application Received
          </h1>

          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Thank you for your time and thoughtful responses. We're reviewing your application now.
          </p>

          {/* What Happens Next */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 mt-8 text-left">
            <h2 className="text-xl font-mono text-amber-500 mb-6">What Happens Next</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-100 font-medium mb-1">Check Your Email</h3>
                  <p className="text-gray-400 text-sm">
                    You'll receive an email within the next few minutes with your application results and next steps.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-100 font-medium mb-1">Schedule Your Call</h3>
                  <p className="text-gray-400 text-sm">
                    If you qualify, you'll receive a calendar link to schedule a confidential strategy session with our team.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <span className="text-amber-500 font-mono text-sm">48h</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-100 font-medium mb-1">Decision Timeline</h3>
                  <p className="text-gray-400 text-sm">
                    All applicants receive a response within 48 hours. Qualified applicants should book their call immediately as slots are limited.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mt-6">
            <p className="text-sm text-amber-500">
              <strong>Important:</strong> Check your spam folder if you don't see our email within 10 minutes. 
              Add apex@remoteops.ai to your contacts to ensure delivery.
            </p>
          </div>

          {/* Return Button */}
          <div className="pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}