import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';

interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={cn(
        'h-full border-l border-border bg-background transition-all duration-200',
        collapsed ? 'w-0 overflow-hidden' : 'w-80'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </aside>
  );
}
