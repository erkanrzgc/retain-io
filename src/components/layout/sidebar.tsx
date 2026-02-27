import Link from 'next/link';
import { Home, LineChart, Users, Settings, Activity } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-slate-900 text-slate-100">
      <div className="flex h-14 items-center border-b border-slate-800 px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Activity className="h-6 w-6 text-indigo-500" />
          <span className="text-xl">Retain.io</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-slate-800 px-3 py-2 text-slate-100 transition-all hover:bg-slate-800/80"
          >
            <Home className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/dashboard/recoveries"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-slate-100"
          >
            <LineChart className="h-4 w-4" />
            Recoveries
          </Link>
          <Link
            href="/dashboard/customers"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-slate-100"
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-slate-100"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}
