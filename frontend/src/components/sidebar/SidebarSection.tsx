import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface SidebarSectionProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function SidebarSection({
  icon: Icon,
  title,
  children,
}: SidebarSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <h3 className="text-xs font-semibold uppercase tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}
