'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Verified } from 'lucide-react';

interface TwitterTestimonial {
  id: string;
  name: string;
  username: string;
  initials: string;
  earnings: string;
  quote: string;
  startDate: string;
  isVerified?: boolean;
  likes: number;
  retweets: number;
  replies: number;
  timestamp: string;
}

const testimonials: TwitterTestimonial[] = [
  {
    id: '1',
    name: 'Marcel Campos',
    username: 'marcelcampos_tx',
    initials: 'MC',
    earnings: '$67,234/month',
    quote: "Quit my $85K job after month 4. Best decision ever. The system literally runs itself. 🔥",
    startDate: 'Started 8 months ago',
    isVerified: true,
    likes: 247,
    retweets: 89,
    replies: 34,
    timestamp: '2h'
  },
  {
    id: '2',
    name: 'Morgan Montgomery',
    username: 'morganmont_fl',
    initials: 'MM',
    earnings: '$32,150/month',
    quote: "Started with zero experience. Now managing 4 crews from my laptop. System works perfectly. 💪",
    startDate: 'Started 6 months ago',
    isVerified: true,
    likes: 189,
    retweets: 67,
    replies: 28,
    timestamp: '4h'
  },
  {
    id: '3',
    name: 'Connor Gross',
    username: 'connorgross_nyc',
    initials: 'CG',
    earnings: '$28,420/month',
    quote: "Was skeptical. Now running 3 crews remotely from Thailand. Living the dream. 🌴",
    startDate: 'Started 5 months ago',
    isVerified: true,
    likes: 156,
    retweets: 45,
    replies: 19,
    timestamp: '6h'
  }
];

export function TwitterTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentTestimonial];

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Twitter Post */}
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
              {testimonial.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-900 text-sm">{testimonial.name}</span>
                {testimonial.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                <span className="text-gray-400">·</span>
                <span className="text-gray-500 text-sm">{testimonial.timestamp}</span>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>

          {/* Tweet Content */}
          <div className="mb-3">
            <p className="text-gray-900 text-sm leading-relaxed mb-2">
              {testimonial.quote}
            </p>
            
            {/* Earnings Highlight */}
            <div className="bg-gray-50 rounded-lg p-3 mb-2">
              <p className="text-lg font-bold text-gray-900">{testimonial.earnings}</p>
              <p className="text-xs text-gray-600">{testimonial.startDate}</p>
            </div>
          </div>

          {/* Twitter Actions */}
          <div className="flex items-center justify-between text-gray-500 max-w-sm">
            <div className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{testimonial.replies}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-green-500 cursor-pointer transition-colors">
              <Share className="w-4 h-4" />
              <span className="text-xs">{testimonial.retweets}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-red-500 cursor-pointer transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{testimonial.likes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Static version for multiple cards display
export function TwitterTestimonialsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          {/* Twitter Post */}
          <div className="p-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                {testimonial.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-gray-900 text-sm">{testimonial.name}</span>
                  {testimonial.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-sm">{testimonial.timestamp}</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>

            {/* Tweet Content */}
            <div className="mb-3">
              <p className="text-gray-900 text-sm leading-relaxed mb-2">
                {testimonial.quote}
              </p>
              
              {/* Earnings Highlight */}
              <div className="bg-gray-50 rounded-lg p-3 mb-2">
                <p className="text-lg font-bold text-gray-900">{testimonial.earnings}</p>
                <p className="text-xs text-gray-600">{testimonial.startDate}</p>
              </div>
            </div>

            {/* Twitter Actions */}
            <div className="flex items-center justify-between text-gray-500 max-w-sm">
              <div className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{testimonial.replies}</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-green-500 cursor-pointer transition-colors">
                <Share className="w-4 h-4" />
                <span className="text-xs">{testimonial.retweets}</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-red-500 cursor-pointer transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-xs">{testimonial.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
