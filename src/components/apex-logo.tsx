import { Globe } from 'lucide-react';

interface ApexLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ApexLogo({ size = 'md', className = '' }: ApexLogoProps) {
  const sizeClasses = {
    sm: {
      container: 'w-32 h-16',
      globe: 'w-6 h-6',
      apex: 'text-lg',
      subtitle: 'text-[8px]'
    },
    md: {
      container: 'w-40 h-20',
      globe: 'w-8 h-8',
      apex: 'text-xl',
      subtitle: 'text-[10px]'
    },
    lg: {
      container: 'w-48 h-24',
      globe: 'w-10 h-10',
      apex: 'text-2xl',
      subtitle: 'text-xs'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`${classes.container} ${className}`}>
      <div className="flex items-center gap-3 h-full">
        {/* Globe Badge */}
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-professional-blue/20 to-action-yellow/20 blur-sm"></div>
          
          {/* Inner circle */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-professional-blue to-professional-blue/80 flex items-center justify-center border-2 border-professional-blue/30">
            <Globe className={`${classes.globe} text-white`} />
          </div>
          
          {/* Signal waves */}
          <div className="absolute -inset-2 opacity-30">
            <div className="absolute inset-0 rounded-full border border-professional-blue/40 animate-pulse"></div>
            <div className="absolute inset-1 rounded-full border border-professional-blue/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <div className={`${classes.apex} font-bold text-white leading-none tracking-wide`}>
            APEX
          </div>
          <div className={`${classes.subtitle} text-professional-blue/80 font-medium uppercase tracking-widest mt-0.5`}>
            Remote Operations
          </div>
        </div>
      </div>
    </div>
  );
} 