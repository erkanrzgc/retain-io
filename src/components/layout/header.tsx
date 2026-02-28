"use client";

import { Button } from '@/components/ui/button';
import { Bell, Menu, Activity } from 'lucide-react';
import { UserNav } from '@/components/layout/user-nav';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/components/layout/sidebar';
export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 md:px-6 transition-colors">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-14 items-center border-b border-zinc-200 dark:border-zinc-800 px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
              <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
              <span className="text-xl">Retain.io</span>
            </Link>
          </div>
          <nav className="grid items-start px-2 py-4 text-sm font-medium gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-zinc-800/50 text-indigo-700 dark:text-zinc-100 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
      </div>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <ModeToggle />
      <UserNav />
    </header>
  );
}
