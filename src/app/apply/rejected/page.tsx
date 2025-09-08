'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ApexLogo } from '@/components/apex-logo';
import { MapPin, ArrowRight, AlertCircle } from 'lucide-react';

const alternativeTerritories = [
  "Phoenix, AZ",
  "Las Vegas, NV", 
  "San Antonio, TX",
  "Orlando, FL",
  "Portland, OR",
  "Nashville, TN",
  "Charlotte, NC",
  "Kansas City, MO"
];

export default function RejectedPage() {
  const [applicationData, setApplicationData] = useState<any>(null);
  const [availableTerritories, setAvailableTerritories] = useState<string[]>([]);

  useEffect(() => {
    // Get application data
    const data = sessionStorage.getItem('applicationData');
    if (data) {
      setApplicationData(JSON.parse(data));
    }
    
    // Get 3 random available territories
    const shuffled = [...alternativeTerritories].sort(() => 0.5 - Math.random());
    setAvailableTerritories(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="px-4 py-6 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <ApexLogo size="md" className="[&_div]:from-amber-500 [&_div]:to-amber-600" />
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/20 rounded-full mb-6">
            <AlertCircle className="w-10 h-10 text-yellow-500" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {applicationData?.desiredTerritory} Is Already Taken
          </h1>
          
          <p className="text-xl text-gray-300 mb-12">
            But don't worry - we have {alternativeTerritories.length} other prime territories available right now
          </p>

          {/* Available Territories */}
          <div className="bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Available Territories</h2>
            <div className="grid gap-4 mb-8">
              {availableTerritories.map((territory) => (
                <div 
                  key={territory}
                  className="bg-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <span className="text-lg font-medium">{territory}</span>
                  </div>
                  <span className="text-green-400 text-sm">Available Now</span>
                </div>
              ))}
            </div>
            
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-black"
              asChild
            >
              <Link href="/apply">
                Apply for Different Territory →
              </Link>
            </Button>
          </div>

          {/* Alternative Options */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Other Options</h3>
            <div className="space-y-4 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">1.</span>
                <div>
                  <p className="font-semibold">Join the Waitlist</p>
                  <p className="text-gray-400 text-sm">
                    Get notified if {applicationData?.desiredTerritory} becomes available
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">2.</span>
                <div>
                  <p className="font-semibold">Partner Territory</p>
                  <p className="text-gray-400 text-sm">
                    Split a territory with another operator (50/50 revenue share)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">3.</span>
                <div>
                  <p className="font-semibold">Adjacent Territory</p>
                  <p className="text-gray-400 text-sm">
                    Choose a nearby city with similar demographics
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12">
            <p className="text-gray-400 mb-4">
              Want to discuss your options?
            </p>
            <Button 
              variant="outline"
              className="border-gray-600 hover:bg-gray-700"
              asChild
            >
              <a href="mailto:support@remoteops.ai">
                Contact Support Team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}