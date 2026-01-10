import { useNavigate } from 'react-router-dom';
import { Plus, Loader2, FolderOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProjects } from '@/hooks/useProjects';
import { useProject } from '@/contexts/ProjectContext';
import { ProjectFormDialog } from '@/components/dialogs/projects/ProjectFormDialog';
import { cn } from '@/lib/utils';
import { paths } from '@/lib/paths';

export function SidebarProjects() {
  const navigate = useNavigate();
  const { projects, isLoading } = useProjects();
  const { projectId: currentProjectId } = useProject();

  const handleCreateProject = async () => {
    try {
      await ProjectFormDialog.show({});
    } catch {
      // User cancelled
    }
  };

  const handleSelectProject = (projectId: string) => {
    // Navigation updates ProjectContext automatically via URL
    navigate(paths.project(projectId));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4" />
          <span className="font-medium">Projects</span>
        </div>
        <Button size="sm" variant="ghost" onClick={handleCreateProject}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-auto p-2 space-y-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            <p>No projects yet</p>
            <Button
              variant="link"
              size="sm"
              onClick={handleCreateProject}
              className="mt-2"
            >
              Create your first project
            </Button>
          </div>
        ) : (
          projects.map((project) => (
            <Card
              key={project.id}
              className={cn(
                'p-3 cursor-pointer transition-colors hover:bg-accent/50',
                currentProjectId === project.id && 'bg-accent'
              )}
              onClick={() => handleSelectProject(project.id)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">
                  {project.name}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
