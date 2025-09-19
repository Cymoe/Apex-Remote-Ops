import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Clock, Target, Users, CheckCircle2, DollarSign, TrendingUp, Settings, Globe, Waves, Compass, LifeBuoy, Crown } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  course_ids: string[];
  target_audience: string;
  estimated_duration_weeks: number;
  courses?: Course[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  level: string;
  duration_hours: number;
}

async function getLearningPaths() {
  const supabase = await createClient();
  
  // Get all learning paths
  const { data: paths, error } = await supabase
    .from('learning_paths')
    .select('*')
    .order('estimated_duration_weeks', { ascending: true });

  if (error || !paths) {
    console.error('Error fetching learning paths:', error);
    return [];
  }

  // Get all courses with module counts to map with learning paths
  const { data: courses } = await supabase
    .from('courses')
    .select(`
      id, 
      title, 
      slug, 
      level, 
      duration_hours,
      modules (count)
    `)
    .order('order_index', { ascending: true });

  // Map courses to each learning path with total module count
  const pathsWithCourses = paths.map(path => {
    const pathCourses = path.course_ids
      .map(courseId => courses?.find(c => c.id === courseId))
      .filter(Boolean) as any[];
    
    const totalModules = pathCourses.reduce((sum, course) => 
      sum + (course.modules?.[0]?.count || 0), 0
    );

    return {
      ...path,
      courses: pathCourses,
      totalModules
    };
  });

  return pathsWithCourses;
}

export default async function LearningPathsPage() {
  const paths = await getLearningPaths();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black -m-4 sm:-m-6 lg:-m-8">
      {/* Dark Ocean Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-[#000005]" />
        
        {/* Subtle wave pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="waves" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M0,100 Q50,80 100,100 T200,100" stroke="#3B82F6" strokeWidth="1" fill="none" />
                <path d="M0,150 Q50,130 100,150 T200,150" stroke="#3B82F6" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>
        
        {/* Deep water glow */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-professional-blue/5 to-transparent" />
        
        {/* Deep Sea Creatures - Extremely Subtle */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large mysterious shape 1 */}
          <div 
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
              left: '10%',
              top: '50%',
              animation: 'deepRise 45s ease-in-out infinite',
              filter: 'blur(40px)',
              transform: 'scale(2, 0.6)'
            }}
          />
          
          {/* Large mysterious shape 2 */}
          <div 
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.06) 0%, transparent 60%)',
              right: '5%',
              top: '60%',
              animation: 'deepRise 60s ease-in-out infinite 20s',
              filter: 'blur(60px)',
              transform: 'scale(1.5, 0.4) rotate(45deg)'
            }}
          />
          
          {/* Gentle waves */}
          <div className="absolute inset-x-0 top-32 h-64 opacity-[0.06]">
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
                animation: 'gentleWave 20s ease-in-out infinite',
                transform: 'translateY(0) scaleY(0.5)'
              }}
            />
          </div>
          
          {/* Light rays from above */}
          <div className="absolute inset-x-0 top-0 h-full overflow-hidden opacity-[0.03]">
            <div
              className="absolute w-32 h-full"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, transparent 30%)',
                left: '20%',
                transform: 'rotate(5deg)',
                animation: 'lightShift 30s ease-in-out infinite'
              }}
            />
            <div
              className="absolute w-24 h-full"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 25%)',
                left: '60%',
                transform: 'rotate(-3deg)',
                animation: 'lightShift 25s ease-in-out infinite 10s'
              }}
            />
          </div>
        </div>
      </div>
      
      
      {/* Ocean Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.1))`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pure-white mb-3 sm:mb-4 animate-fade-in">
            Your Learning Journey
          </h1>
          <p className="text-sm sm:text-base text-light-gray max-w-xl mx-auto animate-fade-in-delayed leading-relaxed">
            Navigate the river of knowledge from first drop to ocean mastery
          </p>
        </div>
        
        {/* River Flow Container */}
        <div className="relative mt-20 overflow-visible">
          {/* Central River Path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-professional-blue/20 via-professional-blue/40 to-professional-blue/20 -translate-x-1/2" />

          {/* Journey Stones */}
          <div className="relative">
            {paths.map((path, index) => {
              const totalHours = path.courses.reduce((sum, course) => sum + course.duration_hours, 0);
              const isEven = index % 2 === 0;
              
              // PADI-style course titles
              const padiCourseTitles = {
                'first-10k-fast': 'Open Water Remote Operator',
                'scale-to-100k': 'Advanced Remote Operations', 
                'building-machine': 'Rescue Operations Specialist',
                'multi-market': 'Remote Operations Divemaster'
              };

              // Define path metadata with PADI diving certification theme
              const pathMeta = {
                'first-10k-fast': { 
                  goal: 'Open Water Certified', 
                  courseCode: 'OWR-101',
                  icon: Waves, 
                  color: '#22c55e',
                  gradient: 'from-green-500/20 to-green-600/20',
                  glow: 'shadow-green-500/20'
                },
                'scale-to-100k': { 
                  goal: 'Advanced Certified', 
                  courseCode: 'ARO-201',
                  icon: Compass, 
                  color: '#3b82f6',
                  gradient: 'from-blue-500/20 to-blue-600/20',
                  glow: 'shadow-blue-500/20'
                },
                'building-machine': { 
                  goal: 'Rescue Specialist', 
                  courseCode: 'ROS-301',
                  icon: LifeBuoy, 
                  color: '#a855f7',
                  gradient: 'from-purple-500/20 to-purple-600/20',
                  glow: 'shadow-purple-500/20'
                },
                'multi-market': { 
                  goal: 'Divemaster Level', 
                  courseCode: 'ROD-401',
                  icon: Crown, 
                  color: '#fb923c',
                  gradient: 'from-orange-500/20 to-orange-600/20',
                  glow: 'shadow-orange-500/20'
                }
              };
              
              const meta = pathMeta[path.slug] || { 
                goal: '', 
                icon: Target, 
                color: '#6b7280',
                gradient: 'from-gray-500/20 to-gray-600/20',
                glow: 'shadow-gray-500/20'
              };
              const Icon = meta.icon;
              
              return (
                <div key={path.id} className={`relative mb-16 ${index === 0 ? 'mt-0' : ''}`}>
                  {/* Flowing Connector */}
                  {index > 0 && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-16 w-96 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 384 96">
                        <defs>
                          <linearGradient id={`flow-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={pathMeta[paths[index-1].slug]?.color || '#6b7280'} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={meta.color} stopOpacity="0.6" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 192 0 Q 192 48 192 96"
                          fill="none"
                          stroke={`url(#flow-${index})`}
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                        {/* Flow particles */}
                        <circle r="3" fill={meta.color} className="opacity-60">
                          <animateMotion dur="3s" repeatCount="indefinite">
                            <mpath href="#flow-path-${index}" />
                          </animateMotion>
                        </circle>
                      </svg>
                    </div>
                  )}
                  
                  {/* Stepping Stone Card */}
                  <div 
                    className={`relative mx-auto max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl ${
                      isEven ? 'lg:-translate-x-32 xl:-translate-x-40' : 'lg:translate-x-32 xl:translate-x-40'
                    } group`}
                    style={{ 
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Ripple Effect on Hover */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-r ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-transparent scale-0 group-hover:scale-150 transition-transform duration-1000" />
                    </div>
                    
                    <Link 
                      href={`/learning-paths/${path.slug}`}
                      className="block relative"
                    >
                      {/* Glassmorphism Card */}
                      <div className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl ${meta.glow} hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] active:shadow-xl overflow-hidden`}>
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-30 group-active:opacity-20 transition-opacity duration-150`} />
                        
                        {/* Number Badge */}
                        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20">
                          <div className="relative w-full h-full">
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${meta.gradient} blur-lg opacity-60`} />
                            <div className="absolute inset-1 sm:inset-2 rounded-full bg-carbon-black/80 backdrop-blur-sm flex items-center justify-center">
                              <span className="text-xl sm:text-2xl font-bold" style={{ color: meta.color }}>{index + 1}</span>
                            </div>
                          </div>
                        </div>
                        

                        
                        {/* Content */}
                        <div className="relative z-10 space-y-3 sm:space-y-4">
                          {/* Header */}
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className={`p-2 sm:p-2.5 rounded-lg bg-gradient-to-br ${meta.gradient} backdrop-blur-sm`}>
                                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-sm sm:text-base font-bold text-pure-white leading-tight">
                                      {padiCourseTitles[path.slug] || path.title}
                                    </h3>
                                    {index === 0 && (
                                      <Badge className="bg-green-500/90 text-white border-0 px-2 py-0.5 text-xs font-medium shrink-0">
                                        Start Here
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs sm:text-sm mt-1" style={{ color: meta.color }}>
                                    {meta.courseCode} • {meta.goal} • {path.estimated_duration_weeks} weeks
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-light-gray/80 text-xs sm:text-sm leading-relaxed line-clamp-2">
                              {path.description}
                            </p>
                          </div>
                          
                          {/* Stats */}
                          <div className="flex gap-3 sm:gap-4">
                            {[
                              { value: path.totalModules, label: 'Modules' },
                              { value: path.courses.length, label: 'Courses' },
                              { value: totalHours, label: 'Hours' }
                            ].map((stat, i) => (
                              <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                                <div className="text-base sm:text-lg font-bold text-pure-white">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-light-gray/60">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Skills Preview */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {path.courses.slice(0, 3).map((course) => (
                              <div 
                                key={course.id} 
                                className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 text-[10px] sm:text-xs text-light-gray/70 hover:bg-white/10 active:bg-white/15 transition-colors duration-150 cursor-pointer"
                              >
                                {course.title.replace('Marketing: ', '').replace(' for Leaders', '').slice(0, 20)}...
                              </div>
                            ))}
                            {path.courses.length > 3 && (
                              <div className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 text-[10px] sm:text-xs text-light-gray/60">
                                +{path.courses.length - 3}
                              </div>
                            )}
                          </div>
                          
                          {/* CTA */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-white/10 gap-2 sm:gap-0">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-light-gray/60">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                              <span className="text-xs sm:text-sm">{path.target_audience}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              className="gap-1.5 text-xs sm:text-sm font-medium hover:gap-2 active:gap-1 transition-all h-7 sm:h-8 px-3 sm:px-4 active:scale-95 shrink-0 self-end sm:self-auto"
                              style={{ color: meta.color }}
                            >
                              Dive In
                              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                          
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            
            {/* Ocean Achievement */}
            <div className="relative mt-16 sm:mt-24 lg:mt-32 mb-8 sm:mb-12 lg:mb-16">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 sm:px-8 lg:px-12 py-6 sm:py-8 text-center">
                    <Globe className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-orange-500" />
                    <h3 className="text-xl sm:text-2xl font-bold text-pure-white mb-3 sm:mb-4">Master Instructor Certification</h3>
                    <p className="text-sm sm:text-base text-light-gray/80 max-w-2xl mx-auto leading-relaxed px-4">Complete all certifications to achieve master-level remote operations expertise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}