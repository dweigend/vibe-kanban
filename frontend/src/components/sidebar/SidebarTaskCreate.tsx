import { useCallback, useState, useMemo, useEffect } from 'react';
import { useForm, useStore } from '@tanstack/react-form';
import { ArrowLeft, Plus, Check, X, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import WYSIWYGEditor from '@/components/ui/wysiwyg';
import BranchSelector from '@/components/tasks/BranchSelector';
import RepoBranchSelector from '@/components/tasks/RepoBranchSelector';
import { ExecutorProfileSelector } from '@/components/settings';
import { useUserSystem } from '@/components/ConfigProvider';
import {
  useTaskMutations,
  useProjectRepos,
  useRepoBranchSelection,
} from '@/hooks';
import { useSidebar } from '@/contexts/SidebarContext';
import type { ExecutorProfileId, Tag } from 'shared/types';
import { tagsApi } from '@/lib/api';

interface SidebarTaskCreateProps {
  projectId: string;
}

type RepoBranch = { repoId: string; branch: string };

type TaskFormValues = {
  title: string;
  description: string;
  executorProfileId: ExecutorProfileId | null;
  repoBranches: RepoBranch[];
  autoStart: boolean;
  knowledgeTagIds: string[];
};

export function SidebarTaskCreate({ projectId }: SidebarTaskCreateProps) {
  const { setMode } = useSidebar();
  const { createTask, createAndStart } = useTaskMutations(projectId);
  const { system, profiles, loading: userSystemLoading } = useUserSystem();
  const { data: projectRepos = [] } = useProjectRepos(projectId);
  const { configs: repoBranchConfigs, isLoading: branchesLoading } =
    useRepoBranchSelection({
      repos: projectRepos,
      enabled: projectRepos.length > 0,
    });

  const [tags, setTags] = useState<Tag[]>([]);
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    tagsApi.list().then(setTags).catch(console.error);
  }, []);

  const defaultRepoBranches = useMemo((): RepoBranch[] => {
    return repoBranchConfigs
      .filter((c) => c.targetBranch !== null)
      .map((c) => ({ repoId: c.repoId, branch: c.targetBranch! }));
  }, [repoBranchConfigs]);

  const defaultValues = useMemo((): TaskFormValues => {
    const baseProfile = system.config?.executor_profile || null;
    return {
      title: '',
      description: '',
      executorProfileId: baseProfile,
      repoBranches: defaultRepoBranches,
      autoStart: true,
      knowledgeTagIds: [],
    };
  }, [system.config?.executor_profile, defaultRepoBranches]);

  const handleSubmit = async ({ value }: { value: TaskFormValues }) => {
    const task = {
      project_id: projectId,
      title: value.title,
      description: value.description,
      status: null,
      task_type: null,
      parent_workspace_id: null,
      image_ids: null,
      shared_task_id: null,
      knowledge_tag_ids:
        value.knowledgeTagIds.length > 0 ? value.knowledgeTagIds : null,
    };

    if (value.autoStart && value.executorProfileId) {
      const repos = value.repoBranches.map((rb) => ({
        repo_id: rb.repoId,
        target_branch: rb.branch,
      }));
      await createAndStart.mutateAsync(
        {
          task,
          executor_profile_id: value.executorProfileId,
          repos,
        },
        { onSuccess: () => setMode('tasks') }
      );
    } else {
      await createTask.mutateAsync(task, { onSuccess: () => setMode('tasks') });
    }
  };

  const validator = (value: TaskFormValues): string | undefined => {
    if (!value.title.trim().length) return 'Title required';
    if (value.autoStart) {
      if (!value.executorProfileId) return 'Executor profile required';
      if (
        value.repoBranches.length === 0 ||
        value.repoBranches.some((rb) => !rb.branch)
      ) {
        return 'Branch required for all repos';
      }
    }
  };

  const form = useForm({
    defaultValues,
    onSubmit: handleSubmit,
    validators: {
      onMount: ({ value }) => validator(value),
      onChange: ({ value }) => validator(value),
    },
  });

  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  const handleBack = useCallback(() => {
    setMode('tasks');
  }, [setMode]);

  const loading = branchesLoading || userSystemLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const isSingleRepo = repoBranchConfigs.length === 1;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-1 h-7 w-7"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-semibold">New Task</h2>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {/* Title */}
        <form.Field name="title">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="task-title" className="text-xs font-medium">
                Title
              </Label>
              <Input
                id="task-title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Task title..."
                disabled={isSubmitting}
                autoFocus
              />
            </div>
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-xs font-medium">Description</Label>
              <WYSIWYGEditor
                placeholder="Add more details..."
                value={field.state.value}
                onChange={(desc) => field.handleChange(desc)}
                disabled={isSubmitting}
                projectId={projectId}
                className="min-h-[120px] border rounded-md"
              />
            </div>
          )}
        </form.Field>

        {/* Knowledge Tags */}
        <form.Field name="knowledgeTagIds">
          {(field) => {
            const selectedTagIds = field.state.value;
            const getTagName = (id: string) =>
              tags.find((t) => t.id === id)?.tag_name ?? id;

            const handleCreateTag = async () => {
              if (!newTagName.trim()) return;
              try {
                const newTag = await tagsApi.create({
                  tag_name: newTagName.trim().replace(/\s+/g, '-'),
                  content: newTagName.trim(),
                });
                setTags([...tags, newTag]);
                field.handleChange([...selectedTagIds, newTag.id]);
                setNewTagName('');
                setIsCreatingTag(false);
              } catch (e) {
                console.error('Failed to create tag:', e);
              }
            };

            return (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Knowledge Tags</Label>

                {selectedTagIds.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedTagIds.map((tagId) => (
                      <Badge key={tagId} variant="secondary" className="gap-1 pr-1 text-xs">
                        {getTagName(tagId)}
                        <button
                          type="button"
                          onClick={() =>
                            field.handleChange(
                              selectedTagIds.filter((id) => id !== tagId)
                            )
                          }
                          className="ml-1 hover:text-destructive"
                          disabled={isSubmitting}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" disabled={isSubmitting}>
                      <TagIcon className="mr-2 h-3 w-3" />
                      {selectedTagIds.length > 0 ? 'Manage Tags' : 'Add Tags'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {tags.map((tag) => {
                      const isSelected = selectedTagIds.includes(tag.id);
                      return (
                        <DropdownMenuCheckboxItem
                          key={tag.id}
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            const newTags = checked
                              ? [...selectedTagIds, tag.id]
                              : selectedTagIds.filter((id) => id !== tag.id);
                            field.handleChange(newTags);
                          }}
                        >
                          {tag.tag_name}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                    {tags.length > 0 && <DropdownMenuSeparator />}
                    {isCreatingTag ? (
                      <div className="p-2 flex gap-2">
                        <Input
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="Tag name"
                          className="h-7 text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCreateTag();
                            }
                            if (e.key === 'Escape') {
                              setIsCreatingTag(false);
                              setNewTagName('');
                            }
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          className="h-7 px-2"
                          onClick={handleCreateTag}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenuItem onClick={() => setIsCreatingTag(true)}>
                        <Plus className="mr-2 h-3 w-3" /> New Tag
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          }}
        </form.Field>

        {/* AutoStart Section */}
        <form.Field name="autoStart">
          {(autoStartField) => (
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center gap-2">
                <Switch
                  id="autostart-switch"
                  checked={autoStartField.state.value}
                  onCheckedChange={(checked) => autoStartField.handleChange(checked)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="autostart-switch" className="text-xs cursor-pointer">
                  Start immediately
                </Label>
              </div>

              {autoStartField.state.value && (
                <div className="space-y-3">
                  {/* Executor Profile */}
                  <form.Field name="executorProfileId">
                    {(field) => (
                      <ExecutorProfileSelector
                        profiles={profiles}
                        selectedProfile={field.state.value}
                        onProfileSelect={(profile) => field.handleChange(profile)}
                        disabled={isSubmitting}
                        showLabel={true}
                        className="space-y-2"
                      />
                    )}
                  </form.Field>

                  {/* Branch Selector */}
                  {isSingleRepo ? (
                    <form.Field name="repoBranches">
                      {(field) => {
                        const config = repoBranchConfigs[0];
                        const selectedBranch =
                          field.state.value.find((v) => v.repoId === config.repoId)
                            ?.branch ?? config.targetBranch;
                        return (
                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Branch</Label>
                            <BranchSelector
                              branches={config.branches}
                              selectedBranch={selectedBranch}
                              onBranchSelect={(branch) => {
                                field.handleChange([{ repoId: config.repoId, branch }]);
                              }}
                              placeholder="Select branch..."
                            />
                          </div>
                        );
                      }}
                    </form.Field>
                  ) : (
                    <form.Field name="repoBranches">
                      {(field) => {
                        const configs = repoBranchConfigs.map((config) => ({
                          ...config,
                          targetBranch:
                            field.state.value.find((v) => v.repoId === config.repoId)
                              ?.branch ?? config.targetBranch,
                        }));
                        return (
                          <RepoBranchSelector
                            configs={configs}
                            onBranchChange={(repoId, branch) => {
                              const newValue = field.state.value.map((v) =>
                                v.repoId === repoId ? { ...v, branch } : v
                              );
                              if (!newValue.find((v) => v.repoId === repoId)) {
                                newValue.push({ repoId, branch });
                              }
                              field.handleChange(newValue);
                            }}
                            isLoading={branchesLoading}
                            showLabel={true}
                          />
                        );
                      }}
                    </form.Field>
                  )}
                </div>
              )}
            </div>
          )}
        </form.Field>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t">
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            values: state.values,
          })}
        >
          {({ canSubmit, isSubmitting, values }) => {
            const buttonText = isSubmitting
              ? values.autoStart
                ? 'Starting...'
                : 'Creating...'
              : values.autoStart
                ? 'Create & Start'
                : 'Create';

            return (
              <Button
                onClick={() => form.handleSubmit()}
                disabled={!canSubmit}
                className="w-full"
              >
                {buttonText}
              </Button>
            );
          }}
        </form.Subscribe>
      </div>
    </div>
  );
}
