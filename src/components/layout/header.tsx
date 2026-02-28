import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { UserNav } from '@/components/layout/user-nav';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 transition-colors">
      <div className="w-full flex-1">
        {/* We can put a search bar here later */}
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
