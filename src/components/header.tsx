import { createClient } from '@/lib/supabase/server';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MobileNav } from '@/components/mobile-nav';

export async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userInitial = user?.email?.charAt(0).toUpperCase() || '?';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-gray bg-carbon-black px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <MobileNav />
        <Link href="/dashboard" className="text-xl font-bold text-pure-white md:hidden">
          APEX
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-slate-gray hover:ring-professional-blue transition-all">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-professional-blue to-action-yellow text-pure-white font-semibold text-sm">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-deep-black border-slate-gray min-w-[200px]">
          <DropdownMenuLabel className="text-pure-white font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-medium-gray">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-gray" />
          <DropdownMenuItem asChild className="text-light-gray hover:text-pure-white hover:bg-slate-gray focus:bg-slate-gray focus:text-pure-white cursor-pointer">
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-light-gray hover:text-pure-white hover:bg-slate-gray focus:bg-slate-gray focus:text-pure-white cursor-pointer">
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-gray" />
          <DropdownMenuItem asChild className="text-light-gray hover:text-pure-white hover:bg-slate-gray focus:bg-slate-gray focus:text-pure-white cursor-pointer">
            <form action="/auth/sign-out" method="post">
              <button type="submit" className="w-full text-left">
                Log out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}