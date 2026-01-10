import { useNavigate } from 'react-router-dom';
import { Settings2, FolderCog, GitBranch, FileCode, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProject } from '@/contexts/ProjectContext';
import { useProjects } from '@/hooks/useProjects';

export function SidebarProjectSettings() {
  const navigate = useNavigate();
  const { projectId } = useProject();
  const { projects } = useProjects();

  const currentProject = projects.find((p) => p.id === projectId);

  const openFullSettings = () => {
    if (projectId) {
      navigate(`/settings/projects?projectId=${projectId}`);
    } else {
      navigate('/settings/projects');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FolderCog className="h-4 w-4" />
          <span className="font-medium">Project Settings</span>
        </div>
        <Button size="sm" variant="ghost" onClick={openFullSettings}>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {!projectId || !currentProject ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Select a project first
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{currentProject.name}</h3>
              <p className="text-xs text-muted-foreground">
                Configure repositories and scripts
              </p>
            </div>

            <div className="space-y-2">
              <Card className="p-3">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Repositories</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Manage git repositories
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-3">
                <div className="flex items-center gap-3">
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Scripts</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Setup, dev, cleanup scripts
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={openFullSettings}
            >
              <Settings2 className="h-4 w-4 mr-2" />
              Open Full Settings
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
