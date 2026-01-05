import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader } from '@/components/ui/loader';
import { Search, Tag, BookOpen, ArrowLeft } from 'lucide-react';
import { tagsApi } from '@/lib/api';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { useKnowledgeStore } from '@/stores/useKnowledgeStore';
import { paths } from '@/lib/paths';
import type { Tag as TagType, TaskWithAttemptStatus } from 'shared/types';
import { cn } from '@/lib/utils';

export default function KnowledgePage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [tags, setTags] = useState<TagType[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);

  const { selectedTagId, searchQuery, setSelectedTagId, setSearchQuery } = useKnowledgeStore();
  const { tasks, isLoading: tasksLoading } = useProjectTasks(projectId ?? '');

  // Load tags on mount
  useEffect(() => {
    const loadTags = async () => {
      try {
        const allTags = await tagsApi.list();
        setTags(allTags);
      } catch (error) {
        console.error('Failed to load tags:', error);
      } finally {
        setTagsLoading(false);
      }
    };
    loadTags();
  }, []);

  // Filter tasks by knowledge tag and search query
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks.filter((task) => {
      // Filter by knowledge tag
      if (selectedTagId && task.knowledge_tag_id !== selectedTagId) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description?.toLowerCase().includes(query) ?? false;
        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, selectedTagId, searchQuery]);

  // Get tag name by ID
  const getTagName = (tagId: string | null): string => {
    if (!tagId) return 'No Tag';
    const tag = tags.find(t => t.id === tagId);
    return tag?.tag_name ?? 'Unknown';
  };

  if (!projectId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No project selected</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Sidebar - Tag Filter */}
      <aside className="w-64 border-r bg-background p-4 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <h2 className="font-semibold">Knowledge</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Tag List */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Filter by Tag
          </p>

          <Button
            variant={selectedTagId === null ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setSelectedTagId(null)}
          >
            <Tag className="mr-2 h-4 w-4" />
            All Tasks
            <Badge variant="outline" className="ml-auto">
              {tasks?.length ?? 0}
            </Badge>
          </Button>

          {tagsLoading ? (
            <div className="py-4 text-center">
              <Loader />
            </div>
          ) : (
            tags.map((tag) => {
              const count = tasks?.filter(t => t.knowledge_tag_id === tag.id).length ?? 0;
              return (
                <Button
                  key={tag.id}
                  variant={selectedTagId === tag.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTagId(tag.id)}
                >
                  <Tag className="mr-2 h-4 w-4" />
                  {tag.tag_name}
                  <Badge variant="outline" className="ml-auto">
                    {count}
                  </Badge>
                </Button>
              );
            })
          )}
        </div>

        {/* Back to Project */}
        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate(paths.project(projectId))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Button>
        </div>
      </aside>

      {/* Main Content - Task List */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {selectedTagId ? getTagName(selectedTagId) : 'All Knowledge Items'}
          </h1>
          <p className="text-muted-foreground">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'item' : 'items'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {tasksLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {selectedTagId
                  ? 'No tasks with this tag yet'
                  : 'No tasks found'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                tagName={getTagName(task.knowledge_tag_id)}
                onClick={() => navigate(paths.task(projectId, task.id))}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

interface TaskCardProps {
  task: TaskWithAttemptStatus;
  tagName: string;
  onClick: () => void;
}

function TaskCard({ task, tagName, onClick }: TaskCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors hover:bg-accent/50',
        task.status === 'done' && 'opacity-60'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{task.title}</CardTitle>
          {task.knowledge_tag_id && (
            <Badge variant="secondary">{tagName}</Badge>
          )}
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
