import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Tag, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { tagsApi } from '@/lib/api';
import { useProject } from '@/contexts/ProjectContext';
import { useProjectTasks } from '@/hooks/useProjectTasks';
import { useKnowledgeStore } from '@/stores/useKnowledgeStore';
import { paths } from '@/lib/paths';
import type { Tag as TagType } from 'shared/types';

export function SidebarKnowledge() {
  const navigate = useNavigate();
  const { projectId } = useProject();
  const [tags, setTags] = useState<TagType[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);

  const { selectedTagId, searchQuery, setSelectedTagId, setSearchQuery } =
    useKnowledgeStore();
  const { tasks } = useProjectTasks(projectId ?? '');

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

  const handleTagClick = (tagId: string | null) => {
    setSelectedTagId(tagId);
    if (projectId) {
      navigate(paths.knowledge(projectId));
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <BookOpen className="h-4 w-4" />
        <span className="font-medium">Knowledge</span>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      {/* Tag List */}
      <div className="flex-1 overflow-auto p-2 space-y-1">
        {!projectId ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Select a project first
          </div>
        ) : tagsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <>
            <Button
              variant={selectedTagId === null ? 'secondary' : 'ghost'}
              className="w-full justify-start h-9"
              onClick={() => handleTagClick(null)}
            >
              <Tag className="mr-2 h-4 w-4" />
              <span className="flex-1 text-left">All Items</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {tasks?.length ?? 0}
              </Badge>
            </Button>

            {tags.map((tag) => {
              const count =
                tasks?.filter((t) => t.knowledge_tag_ids?.includes(tag.id))
                  .length ?? 0;
              return (
                <Button
                  key={tag.id}
                  variant={selectedTagId === tag.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start h-9"
                  onClick={() => handleTagClick(tag.id)}
                >
                  <Tag className="mr-2 h-4 w-4" />
                  <span className="flex-1 text-left truncate">{tag.tag_name}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {count}
                  </Badge>
                </Button>
              );
            })}

            {tags.length === 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No tags yet
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
