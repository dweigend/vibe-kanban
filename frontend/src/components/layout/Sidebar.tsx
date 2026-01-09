import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'sidebar-collapsed';

interface SidebarProps {
  children?: ReactNode;
  defaultCollapsed?: boolean;
}

export function Sidebar({ children, defaultCollapsed = false }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return defaultCollapsed;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCollapsed;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  const toggle = () => setCollapsed((prev: boolean) => !prev);

  return (
    <aside
      className={cn(
        'h-full border-l border-border bg-background transition-all duration-200',
        collapsed ? 'w-12' : 'w-80'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!collapsed && (
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        )}
      </div>
    </aside>
  );
}
