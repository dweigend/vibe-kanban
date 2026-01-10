import { LayoutDashboard, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar, SidebarMode } from '@/contexts/SidebarContext';

const modes: {
  key: SidebarMode;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'tasks', label: 'Tasks', icon: ListTodo },
];

export function SidebarModeToggle() {
  const { mode, setMode } = useSidebar();

  return (
    <div className="flex gap-1 p-2 border-b border-border">
      {modes.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={
            mode === key || (mode === 'task-detail' && key === 'tasks')
              ? 'default'
              : 'ghost'
          }
          size="sm"
          onClick={() => setMode(key)}
          className="flex-1 gap-1.5"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Button>
      ))}
    </div>
  );
}
