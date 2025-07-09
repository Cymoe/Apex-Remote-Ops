'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Bot, BookOpen, Users, Settings, X, Route, FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ApexLogo } from '@/components/apex-logo';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/learning-paths', label: 'Learning Paths', icon: Route },
    { href: '/courses', label: 'All Courses', icon: BookOpen },
    { href: '/pitch-deck', label: 'Pitch Deck', icon: FileText },
    { href: '/chat', label: 'Apex AI', icon: Bot },
    { href: '/community', label: 'Community', icon: Users },
    { href: 'https://bill-umber.vercel.app/', label: 'Platform', icon: ExternalLink, external: true },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden"
          size="icon"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-carbon-black border-slate-gray p-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-gray">
            <Link 
              href="/dashboard" 
              onClick={() => setOpen(false)}
            >
              <ApexLogo size="sm" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-medium-gray hover:text-pure-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              if (item.external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      'text-light-gray hover:bg-deep-black hover:text-pure-white'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </a>
                );
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-professional-blue text-pure-white'
                      : 'text-light-gray hover:bg-deep-black hover:text-pure-white'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="border-t border-slate-gray p-4">
            <form action="/auth/sign-out" method="post">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start text-light-gray hover:bg-deep-black hover:text-pure-white"
                onClick={() => setOpen(false)}
              >
                Log out
              </Button>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}