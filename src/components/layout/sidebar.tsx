"use client";

import Link from 'next/link';
import { Home, LineChart, Users, Settings, Activity, Snowflake } from 'lucide-react';
import { useSnow } from '@/components/providers/snow-provider';

export function Sidebar() {
  const { isSnowing, toggleSnow } = useSnow();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 justify-between transition-colors">
      <div>
        <div className="flex h-14 items-center border-b border-zinc-200 dark:border-zinc-800 px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-500" />
          <span className="text-xl">Retain.io</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-2 text-sm font-medium gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-indigo-50 dark:bg-zinc-800/50 text-indigo-700 dark:text-zinc-100 px-3 py-2.5 transition-all font-semibold"
          >
            <Home className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/dashboard/recoveries"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <LineChart className="h-4 w-4" />
            Recoveries
          </Link>
          <Link
            href="/dashboard/customers"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
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
