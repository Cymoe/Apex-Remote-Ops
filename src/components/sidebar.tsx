'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Bot, BookOpen, Users, Settings, Shield, Route, FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ApexLogo } from '@/components/apex-logo';

export function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/learning-paths', label: 'Learning Paths', icon: Route },
    { href: '/courses', label: 'All Courses', icon: BookOpen },
    { href: '/pitch-deck', label: 'Pitch Deck', icon: FileText },
    { href: '/chat', label: 'Apex AI', icon: Bot },
    { href: '/community', label: 'Community', icon: Users },
  ];

  return (
    <aside className="w-64 flex-col border-r border-slate-gray bg-carbon-black p-4 hidden md:flex">
      <div className="mb-8">
        <Link href="/dashboard">
          <ApexLogo size="sm" />
        </Link>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button 
              key={item.label} 
              variant="ghost" 
              className={cn(
                "justify-start transition-all duration-200",
                isActive 
                  ? "text-white bg-professional-blue/20 hover:bg-professional-blue/30 border-l-2 border-professional-blue hover:text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98]"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className={cn("mr-2 h-4 w-4", isActive && "text-white")} />
                {item.label}
              </Link>
            </Button>
          );
        })}
        
        {/* Platform Link */}
        <Button 
          variant="ghost" 
          className="justify-start w-full transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98] mt-4"
          asChild
        >
          <a href="https://bill-umber.vercel.app/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Platform
          </a>
        </Button>
      </nav>
      <div className="mt-auto space-y-2">
        <Button 
          variant="ghost" 
          className={cn(
            "justify-start w-full transition-all duration-200",
            pathname === '/admin/courses'
              ? "text-white bg-professional-blue/20 hover:bg-professional-blue/30 border-l-2 border-professional-blue hover:text-white" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98]"
          )}
          asChild
        >
          <Link href="/admin/courses">
            <Shield className={cn("mr-2 h-4 w-4", pathname === '/admin/courses' && "text-white")} />
            Manage Courses
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={cn(
            "justify-start w-full transition-all duration-200",
            pathname === '/settings'
              ? "text-white bg-professional-blue/20 hover:bg-professional-blue/30 border-l-2 border-professional-blue hover:text-white" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98]"
          )}
          asChild
        >
          <Link href="/settings">
            <Settings className={cn("mr-2 h-4 w-4", pathname === '/settings' && "text-white")} />
            Account Settings
          </Link>
        </Button>
      </div>
    </aside>
  );
}