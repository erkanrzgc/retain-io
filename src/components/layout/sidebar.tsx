"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LineChart, Users, Settings, Activity, Snowflake } from 'lucide-react';
import { useSnow } from '@/components/providers/snow-provider';

export const navLinks = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Recoveries', href: '/dashboard/recoveries', icon: LineChart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const { isSnowing, toggleSnow } = useSnow();
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 justify-between transition-colors">
      <div>
        <div className="flex h-14 items-center border-b border-zinc-200 dark:border-zinc-800 px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
          <span className="text-xl">Retain.io</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-2 text-sm font-medium gap-1">
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
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      </div>
      
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 flex flex-col items-center">
        <button
          onClick={toggleSnow}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-sm font-medium ${
            isSnowing 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
              : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <Snowflake className={`h-4 w-4 ${isSnowing ? 'animate-pulse text-indigo-100' : ''}`} />
          Let it Snow
        </button>
      </div>
    </div>
  );
}
