'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Bot, BookOpen, Users, Settings, Shield, Route, FileText, ExternalLink, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ApexLogo } from '@/components/apex-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface SidebarContentProps {
  user: any;
}

export function SidebarContent({ user }: SidebarContentProps) {
  const pathname = usePathname();
  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/learning-paths', label: 'Learning Paths', icon: Route },
    { href: '/courses', label: 'All Courses', icon: BookOpen },
    { href: '/chat', label: 'Apex AI', icon: Bot },
    { href: '/community', label: 'Community', icon: Users },
  ];

  const userInitial = user?.email?.charAt(0).toUpperCase() || '?';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <aside className="w-64 flex flex-col border-r border-slate-gray bg-carbon-black hidden md:flex h-screen">
      {/* Fixed logo section */}
      <div className="p-4 pb-2">
        <Link href="/dashboard">
          <ApexLogo size="sm" />
        </Link>
      </div>
      
      {/* Navigation section - only scrolls if needed */}
      <div className="flex-1 px-4 pb-2">
        <nav className="flex flex-col space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button 
                key={item.label} 
                variant="ghost" 
                className={cn(
                  "justify-start transition-all duration-200 h-9",
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
          
          {/* Separator */}
          <div className="py-1">
            <Separator className="bg-slate-gray/50" />
          </div>
          
          {/* Pitch Deck Link */}
          <Button 
            variant="ghost" 
            className={cn(
              "justify-start w-full transition-all duration-200 h-9",
              pathname === '/pitch-deck'
                ? "text-white bg-professional-blue/20 hover:bg-professional-blue/30 border-l-2 border-professional-blue hover:text-white" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98]"
            )}
            asChild
          >
            <Link href="/pitch-deck">
              <FileText className={cn("mr-2 h-4 w-4", pathname === '/pitch-deck' && "text-white")} />
              Pitch Deck
            </Link>
          </Button>
          
          {/* Platform Link */}
          <Button 
            variant="ghost" 
            className="justify-start w-full transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.98] h-9"
            asChild
          >
            <a href="https://bill-umber.vercel.app/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Platform
            </a>
          </Button>
          
          {/* Admin section */}
          <div className="py-1">
            <Separator className="bg-slate-gray/50" />
          </div>
          
          <Button 
            variant="ghost" 
            className={cn(
              "justify-start w-full transition-all duration-200 h-9",
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
        </nav>
      </div>
      
      {/* User section fixed at bottom */}
      <div className="border-t border-slate-gray">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full p-4 flex items-center gap-3 hover:bg-slate-gray/50 transition-colors">
              <Avatar className="h-10 w-10 ring-2 ring-slate-gray">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-professional-blue to-action-yellow text-pure-white font-semibold text-sm">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-pure-white">{userName}</p>
                <p className="text-xs text-medium-gray truncate">{user?.email || 'Not logged in'}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side="top" 
            align="start" 
            className="bg-deep-black border-slate-gray min-w-[240px] mb-2"
          >
            <DropdownMenuItem asChild className="text-light-gray hover:text-pure-white hover:bg-slate-gray focus:bg-slate-gray focus:text-pure-white cursor-pointer">
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-light-gray hover:text-pure-white hover:bg-slate-gray focus:bg-slate-gray focus:text-pure-white cursor-pointer">
              <form action="/auth/sign-out" method="post">
                <button type="submit" className="w-full flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
} 