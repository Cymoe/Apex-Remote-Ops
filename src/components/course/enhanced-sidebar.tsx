'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle2, Lock, PlayCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Component to handle thumbnail loading with error fallback
function ThumbnailImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
        <PlayCircle className="w-6 h-6 text-slate-500" />
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
          <div className="w-6 h-6 rounded-full border-2 border-slate-600 border-t-slate-400 animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-transform duration-200 group-hover:scale-105",
          isLoading && "opacity-0"
        )}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </>
  );
}

interface Module {
  id: string;
  title: string;
  slug: string;
  video_duration_minutes: number;
  order_index: number;
  section?: string;
  thumbnail_url?: string;
  video_url?: string;
}

interface UserProgress {
  completed: boolean;
}

interface EnhancedSidebarProps {
  modules: Module[];
  currentModuleId: string;
  userProgress: Map<string, UserProgress>;
  courseSlug: string;
  highestCompletedIndex: number;
}

// Dynamically create sections based on modules
const createSections = (modules: Module[]) => {
  const totalModules = modules.length;
  
  if (totalModules <= 5) {
    // Single section for small courses
    return [{
      title: 'All Modules',
      range: [1, totalModules] as [number, number],
      key: 'all-modules'
    }];
  } else if (totalModules <= 10) {
    // Two sections
    const midPoint = Math.ceil(totalModules / 2);
    return [
      {
        title: 'Part 1: Foundation',
        range: [1, midPoint] as [number, number],
        key: 'part-1'
      },
      {
        title: 'Part 2: Advanced',
        range: [midPoint + 1, totalModules] as [number, number],
        key: 'part-2'
      }
    ];
  } else {
    // Three sections for larger courses
    const firstThird = Math.ceil(totalModules / 3);
    const secondThird = Math.ceil((totalModules * 2) / 3);
    return [
      {
        title: 'Foundation',
        range: [1, firstThird] as [number, number],
        key: 'foundation'
      },
      {
        title: 'Intermediate',
        range: [firstThird + 1, secondThird] as [number, number],
        key: 'intermediate'
      },
      {
        title: 'Advanced',
        range: [secondThird + 1, totalModules] as [number, number],
        key: 'advanced'
      }
    ];
  }
};

export function EnhancedSidebar({ 
  modules, 
  currentModuleId, 
  userProgress, 
  courseSlug,
  highestCompletedIndex 
}: EnhancedSidebarProps) {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const sections = createSections(modules);

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  const getModulesForSection = (range: [number, number]) => {
    return modules.filter((_, index) => {
      const moduleNumber = index + 1;
      return moduleNumber >= range[0] && moduleNumber <= range[1];
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Extract thumbnail from video URL
  const getVideoThumbnail = (videoUrl?: string, thumbnailUrl?: string): string | null => {
    // If we already have a thumbnail URL, use it
    if (thumbnailUrl) return thumbnailUrl;
    
    if (!videoUrl) return null;
    
    // Loom videos - Currently disabled due to CDN restrictions
    if (videoUrl.includes('loom.com')) {
      // Loom requires authentication for thumbnails
      // Thumbnails should be manually added to the database
      return null;
    }
    
    // YouTube videos
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const youtubeMatch = videoUrl.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      if (youtubeMatch && youtubeMatch[1]) {
        return `https://img.youtube.com/vi/${youtubeMatch[1]}/mqdefault.jpg`;
      }
    }
    
    // Vimeo videos
    if (videoUrl.includes('vimeo.com')) {
      const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
      if (vimeoMatch && vimeoMatch[1]) {
        // Vimeo requires API access for thumbnails
        return null;
      }
    }
    
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-background sticky top-0 z-10">
        <h3 className="font-semibold text-lg">Course Content</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {sections.map(section => {
            const sectionModules = getModulesForSection(section.range);
            if (sectionModules.length === 0) return null;
            
            const isCollapsed = collapsedSections.has(section.key);
            const completedInSection = sectionModules.filter(m => userProgress.get(m.id)?.completed).length;
            const allCompleted = completedInSection === sectionModules.length;
            
            return (
              <div key={section.key} className="mb-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 flex-1">
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="font-medium text-sm">{section.title}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      allCompleted 
                        ? "bg-green-500/20 text-green-600" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {completedInSection}/{sectionModules.length}
                    </span>
                  </div>
                </button>
                
                {/* Section Modules */}
                {!isCollapsed && (
                  <div className="space-y-0.5 pb-2">
                    {sectionModules.map((module, sectionIndex) => {
                      const globalIndex = modules.findIndex(m => m.id === module.id);
                      const isCompleted = userProgress.get(module.id)?.completed;
                      const isLocked = globalIndex > 0 && globalIndex > highestCompletedIndex + 1;
                      const isCurrent = module.id === currentModuleId;
                      
                      const ModuleContent = (
                        <>
                          {/* Thumbnail */}
                          <div className="w-28 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0 relative group">
                            {(() => {
                              const thumbnail = getVideoThumbnail(module.video_url, module.thumbnail_url);
                              if (thumbnail) {
                                return (
                                  <>
                                    <ThumbnailImage src={thumbnail} alt={module.title} />
                                    {!isCompleted && !isLocked && (
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                                        <PlayCircle className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                      </div>
                                    )}
                                  </>
                                );
                              }
                              return (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                  <div className="relative z-10 flex flex-col items-center">
                                    <div className="text-slate-500 text-[10px] font-medium uppercase tracking-wider mb-1">Module {globalIndex + 1}</div>
                                    <PlayCircle className="w-7 h-7 text-slate-400" />
                                  </div>
                                </div>
                              );
                            })()}
                            {isCompleted && (
                              <div className="absolute bottom-1 right-1">
                                <div className="bg-green-600 rounded-full p-1 shadow-lg">
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            )}
                            {isLocked && (
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                                <Lock className="w-5 h-5 text-white/80" />
                              </div>
                            )}
                          </div>
                          
                          {/* Module Info */}
                          <div className="flex-1 min-w-0 py-1">
                            <p className={cn(
                              "text-sm leading-tight line-clamp-1",
                              isCurrent && "font-semibold text-primary",
                              isLocked && "text-muted-foreground",
                              !isCurrent && !isLocked && "text-foreground"
                            )}>
                              <span className="text-xs text-muted-foreground mr-1">{globalIndex + 1}.</span>
                              {module.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {formatDuration(module.video_duration_minutes)}
                              </span>
                              {isCompleted && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-green-600">Completed</span>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      );
                      
                      if (isLocked) {
                        return (
                          <div
                            key={module.id}
                            className="px-4 py-2 opacity-40"
                          >
                            <div className="flex gap-3 items-center">
                              {ModuleContent}
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <Link
                          key={module.id}
                          href={`/courses/${courseSlug}?module=${module.slug}`}
                          className={cn(
                            "flex gap-3 items-center px-4 py-2 transition-all duration-200",
                            isCurrent 
                              ? "bg-primary/10 border-l-[3px] border-primary shadow-sm" 
                              : "hover:bg-muted/50 border-l-[3px] border-transparent"
                          )}
                        >
                          {ModuleContent}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 