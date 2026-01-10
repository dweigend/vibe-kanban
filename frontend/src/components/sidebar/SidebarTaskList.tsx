import { useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from '@/contexts/SidebarContext';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import type { TaskStatus, TaskWithAttemptStatus } from 'shared/types';

type StatusFilter = 'all' | TaskStatus;

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'todo', label: 'Todo' },
  { key: 'inprogress', label: 'Active' },
  { key: 'inreview', label: 'Review' },
  { key: 'done', label: 'Done' },
];

const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: 'bg-muted text-muted-foreground',
  inprogress: 'bg-blue-500/20 text-blue-500',
  inreview: 'bg-yellow-500/20 text-yellow-500',
  done: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

interface StatusFilterProps {
  active: StatusFilter;
  onChange: (filter: StatusFilter) => void;
}

function StatusFilterTabs({ active, onChange }: StatusFilterProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      {STATUS_FILTERS.map(({ key, label }) => (
        <Button
          key={key}
          variant={active === key ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(key)}
          className="shrink-0 text-xs px-2 h-7"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

interface TaskListItemProps {
  task: TaskWithAttemptStatus;
  isSelected: boolean;
  onClick: () => void;
}

function TaskListItem({ task, isSelected, onClick }: TaskListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded transition-colors ${
        isSelected ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'
      }`}
    >
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className={`text-xs ${STATUS_COLORS[task.status]}`}
        >
          {task.status}
        </Badge>
        {task.has_in_progress_attempt && (
          <Loader2 className="h-3 w-3 animate-spin text-blue-500 shrink-0" />
        )}
      </div>
      <div className="mt-1 text-sm font-medium truncate">{task.title}</div>
    </button>
  );
}

interface SidebarTaskListProps {
  projectId: string;
}

export function SidebarTaskList({ projectId }: SidebarTaskListProps) {
  const { tasks, tasksByStatus, isLoading } = useProjectTasks(projectId);
  const { selectTask, selectedTaskId } = useSidebar();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return tasks;
    return tasksByStatus[statusFilter] ?? [];
  }, [tasks, tasksByStatus, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        No tasks yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <StatusFilterTabs active={statusFilter} onChange={setStatusFilter} />
      <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredTasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            isSelected={selectedTaskId === task.id}
            onClick={() => selectTask(task.id)}
          />
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No {statusFilter} tasks
          </div>
        )}
      </div>
    </div>
  );
}
