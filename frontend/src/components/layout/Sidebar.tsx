import { type ReactNode } from 'react';

interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="h-full w-full border-l border-border bg-background">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </aside>
  );
}
