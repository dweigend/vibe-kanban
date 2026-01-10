import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Loader2, Clock, GitBranch, Play, Pencil, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from '@/contexts/SidebarContext';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { useTaskAttempts } from '@/hooks/useTaskAttempts';
import { useTaskMutations, useProjectRepos, useRepoBranchSelection } from '@/hooks';
import { useUserSystem } from '@/components/ConfigProvider';
import { ExecutorProfileSelector } from '@/components/settings';
import BranchSelector from '@/components/tasks/BranchSelector';
import type { TaskStatus, Workspace, Tag, ExecutorProfileId } from 'shared/types';
import { tagsApi } from '@/lib/api';

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
  const { selectedTaskId, clearTask, setMode } = useSidebar();
  const { tasksById } = useProjectTasks(projectId);
  const { data: attempts, isLoading: attemptsLoading } = useTaskAttempts(
    selectedTaskId ?? undefined
  );
  const { createAndStart } = useTaskMutations(projectId);
  const { system, profiles } = useUserSystem();
  const { data: projectRepos = [] } = useProjectRepos(projectId);
  const { configs: repoBranchConfigs, isLoading: branchesLoading } =
    useRepoBranchSelection({
      repos: projectRepos,
      enabled: projectRepos.length > 0,
    });

  // Tags state
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    tagsApi.list().then(setTags).catch(console.error);
  }, []);

  // Start attempt state
  const [showStartForm, setShowStartForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ExecutorProfileId | null>(
    system.config?.executor_profile || null
  );
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  // Set default branch when configs load
  useEffect(() => {
    if (repoBranchConfigs.length > 0 && !selectedBranch) {
      setSelectedBranch(repoBranchConfigs[0].targetBranch);
    }
  }, [repoBranchConfigs, selectedBranch]);

  const task = selectedTaskId ? tasksById[selectedTaskId] : null;

  // Get tag names for display
  const taskTagNames = useMemo(() => {
    if (!task || !task.knowledge_tag_ids) return [];
    return task.knowledge_tag_ids
      .map((id) => tags.find((t) => t.id === id)?.tag_name)
      .filter(Boolean) as string[];
  }, [task, tags]);

  const canStartAttempt = task && !task.has_in_progress_attempt && task.status !== 'done';

  const handleStartAttempt = async () => {
    if (!task || !selectedProfile || !selectedBranch) return;

    setIsStarting(true);
    try {
      const repos = repoBranchConfigs.map((config) => ({
        repo_id: config.repoId,
        target_branch: selectedBranch,
      }));

      await createAndStart.mutateAsync({
        task: {
          project_id: projectId,
          title: task.title,
          description: task.description,
          status: null,
          parent_workspace_id: null,
          image_ids: null,
          shared_task_id: null,
          knowledge_tag_ids: task.knowledge_tag_ids?.length ? task.knowledge_tag_ids : null,
        },
        executor_profile_id: selectedProfile,
        repos,
      });
      setShowStartForm(false);
    } catch (err) {
      console.error('Failed to start attempt:', err);
    } finally {
      setIsStarting(false);
    }
  };

  if (!selectedTaskId) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        No task selected
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        Task not found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMode('task-edit')}
          className="p-1 h-7 w-7"
          title="Edit task"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      {/* Status and Progress */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={STATUS_COLORS[task.status]}>
            {task.status}
          </Badge>
          {task.has_in_progress_attempt && (
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          )}
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}

        {/* Knowledge Tags */}
        {taskTagNames.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {taskTagNames.map((tagName) => (
              <Badge key={tagName} variant="secondary" className="text-xs gap-1">
                <TagIcon className="h-3 w-3" />
                {tagName}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Start Attempt Section */}
      {canStartAttempt && (
        <div className="space-y-2 pt-2 border-t">
          {!showStartForm ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStartForm(true)}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Attempt
            </Button>
          ) : (
            <div className="space-y-3 p-3 border rounded-md bg-muted/30">
              <ExecutorProfileSelector
                profiles={profiles}
                selectedProfile={selectedProfile}
                onProfileSelect={setSelectedProfile}
                showLabel={true}
                className="space-y-2"
              />

              {repoBranchConfigs.length > 0 && !branchesLoading && (
                <div className="space-y-2">
                  <label className="text-xs font-medium">Branch</label>
                  <BranchSelector
                    branches={repoBranchConfigs[0].branches}
                    selectedBranch={selectedBranch}
                    onBranchSelect={setSelectedBranch}
                    placeholder="Select branch..."
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStartForm(false)}
                  disabled={isStarting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleStartAttempt}
                  disabled={!selectedProfile || !selectedBranch || isStarting}
                  className="flex-1"
                >
                  {isStarting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Attempts List */}
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
