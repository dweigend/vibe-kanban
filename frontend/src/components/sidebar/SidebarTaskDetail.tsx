import { ArrowLeft, Loader2, Clock, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from '@/contexts/SidebarContext';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { useTaskAttempts } from '@/hooks/useTaskAttempts';
import type { TaskStatus, Workspace } from 'shared/types';

const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: 'bg-muted text-muted-foreground',
  inprogress: 'bg-blue-500/20 text-blue-500',
  inreview: 'bg-yellow-500/20 text-yellow-500',
  done: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface AttemptItemProps {
  attempt: Workspace;
}

function AttemptItem({ attempt }: AttemptItemProps) {
  const isSetupComplete = !!attempt.setup_completed_at;

  return (
    <div className="p-2 border rounded text-sm bg-muted/30">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs">{attempt.id.slice(0, 8)}</span>
        <Badge
          variant="outline"
          className={`text-xs ${isSetupComplete ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}
        >
          {isSetupComplete ? 'Ready' : 'Setup'}
        </Badge>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <Clock className="h-3 w-3" />
        {formatDate(attempt.created_at)}
      </div>
      {attempt.branch && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <GitBranch className="h-3 w-3" />
          <span className="truncate">{attempt.branch}</span>
        </div>
      )}
    </div>
  );
}

interface SidebarTaskDetailProps {
  projectId: string;
}

export function SidebarTaskDetail({ projectId }: SidebarTaskDetailProps) {
  const { selectedTaskId, clearTask } = useSidebar();
  const { tasksById } = useProjectTasks(projectId);
  const { data: attempts, isLoading: attemptsLoading } = useTaskAttempts(
    selectedTaskId ?? undefined
  );

  if (!selectedTaskId) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        No task selected
      </div>
    );
  }

  const task = tasksById[selectedTaskId];

  if (!task) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        Task not found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={clearTask}
          className="p-1 h-7 w-7"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-semibold truncate flex-1">{task.title}</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={STATUS_COLORS[task.status]}>
            {task.status}
          </Badge>
          {task.has_in_progress_attempt && (
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          )}
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}
      </div>

      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground">
          Attempts
        </h3>
        {attemptsLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        ) : !attempts || attempts.length === 0 ? (
          <div className="text-sm text-muted-foreground py-2">
            No attempts yet
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {attempts.map((attempt) => (
              <AttemptItem key={attempt.id} attempt={attempt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
