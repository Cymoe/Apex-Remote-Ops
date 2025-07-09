'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StylePreviewProps {
  style: string;
  selected: boolean;
  onClick: () => void;
}

const styleConfigs = {
  'silicon-valley': {
    name: 'Silicon Valley',
    description: 'Modern, bold, gradient-heavy',
    preview: {
      background: 'linear-gradient(135deg, #6B46C1 0%, #2563EB 100%)',
      accent: '#14B8A6',
      features: ['Gradients', 'Bold Typography', 'Modern Charts']
    }
  },
  'investment-banking': {
    name: 'Investment Banking',
    description: 'Conservative, data-focused',
    preview: {
      background: '#FFFFFF',
      accent: '#1E40AF',
      features: ['Clean Tables', 'Professional', 'Data-Heavy']
    }
  },
  'visual': {
    name: 'Visual Impact',
    description: 'Graphics-heavy, colorful',
    preview: {
      background: 'linear-gradient(45deg, #0F172A 0%, #2563EB 100%)',
      accent: '#FB923C',
      features: ['Bold Graphics', 'Visual Stats', 'Dynamic']
    }
  },
  'modern': {
    name: 'Modern Charts',
    description: 'Data viz with Chart.js',
    preview: {
      background: '#F8FAFC',
      accent: '#10B981',
      features: ['Chart.js', 'Clean Design', 'Data Focus']
    }
  }
};

export function StylePreview({ style, selected, onClick }: StylePreviewProps) {
  const config = styleConfigs[style as keyof typeof styleConfigs];
  
  if (!config) return null;
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        "border-2 rounded-lg overflow-hidden",
        selected ? "border-primary shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
      )}
    >
      {/* Mini preview */}
      <div className="aspect-[16/10] relative">
        <div 
          className="absolute inset-0"
          style={{ background: config.preview.background }}
        >
          {/* Header simulation */}
          <div className="p-3">
            <div className="bg-white/20 rounded h-3 w-24 mb-2"></div>
            <div className="bg-white/40 rounded h-2 w-16"></div>
          </div>
          
          {/* Content simulation */}
          <div className="px-3 space-y-2">
            <div className="flex gap-2">
              <div 
                className="rounded h-8 w-8"
                style={{ backgroundColor: config.preview.accent }}
              ></div>
              <div className="flex-1 space-y-1">
                <div className="bg-white/30 rounded h-2 w-full"></div>
                <div className="bg-white/20 rounded h-2 w-3/4"></div>
              </div>
            </div>
          </div>
          
          {/* Chart/Visual simulation */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex gap-1">
              {[60, 80, 45, 90].map((height, i) => (
                <div 
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ 
                    height: `${height * 0.4}px`,
                    backgroundColor: config.preview.accent,
                    opacity: 0.8 - (i * 0.1)
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Selected overlay */}
        {selected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="bg-primary text-white rounded-full p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Details */}
      <div className="p-3 bg-white">
        <h4 className="font-semibold text-sm">{config.name}</h4>
        <p className="text-xs text-gray-600 mt-0.5">{config.description}</p>
        
        {/* Features */}
        <div className="flex flex-wrap gap-1 mt-2">
          {config.preview.features.map((feature, i) => (
            <span 
              key={i}
              className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-600"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}