'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Home, Bot, BookOpen, Users, Settings, Shield, Route, FileText, ExternalLink, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ApexLogo } from '@/components/apex-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface MobileNavProps {
  user?: any;
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-carbon-black border-b border-slate-gray p-4 flex items-center justify-between md:hidden">
      <Link href="/dashboard" onClick={() => setOpen(false)}>
        <ApexLogo size="sm" />
      </Link>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 bg-carbon-black p-0 flex flex-col">
          {/* User info at top */}
          <div className="p-4 border-b border-slate-gray">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-slate-gray">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-professional-blue to-action-yellow text-pure-white font-semibold text-sm">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-pure-white">{userName}</p>
                <p className="text-xs text-medium-gray truncate">{user?.email || 'Not logged in'}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button 
                  key={item.label} 
                  variant="ghost" 
                  className={cn(
                    "justify-start w-full transition-all duration-200",
                    isActive 
                      ? "text-white bg-professional-blue/20 hover:bg-professional-blue/30 border-l-2 border-professional-blue hover:text-white" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className={cn("mr-2 h-4 w-4", isActive && "text-white")} />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
            
            <Separator className="my-4" />
            
            {/* Pitch Deck & Platform Links */}
            <Button 
              variant="ghost" 
              className={cn(
                "justify-start w-full transition-all duration-200",
                pathname === '/pitch-deck'
                  ? "text-white bg-professional-blue/20 hover:bg-professional-blue/30 border-l-2 border-professional-blue hover:text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/pitch-deck">
                <FileText className={cn("mr-2 h-4 w-4", pathname === '/pitch-deck' && "text-white")} />
                Pitch Deck
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              className="justify-start w-full transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
              asChild
            >
              <a href="https://bill-umber.vercel.app/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Platform
              </a>
            </Button>
            
            <Separator className="my-4" />
            
            {/* Admin Section */}
            <Button 
              variant="ghost" 
              className={cn(
                "justify-start w-full transition-all duration-200",
                pathname === '/admin/courses'
                  ? "text-white bg-professional-blue/20 hover:bg-professional-blue/30 border-l-2 border-professional-blue hover:text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/admin/courses">
                <Shield className={cn("mr-2 h-4 w-4", pathname === '/admin/courses' && "text-white")} />
                Manage Courses
              </Link>
            </Button>
          </nav>
          
          {/* Account actions at bottom */}
          <div className="p-4 border-t border-slate-gray space-y-2">
            <Button 
              variant="ghost" 
              className="justify-start w-full transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Link>
            </Button>
            <form action="/auth/sign-out" method="post">
              <Button 
                type="submit" 
                variant="ghost" 
                className="justify-start w-full transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}