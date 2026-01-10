import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  FolderOpen,
  FolderCog,
  Settings,
  BookOpen,
  Plus,
  PanelRight,
  PanelRightClose,
  Bot,
  Cpu,
  LayoutGrid,
  Square,
} from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useProject } from '@/contexts/ProjectContext';
import { useOpenProjectInEditor } from '@/hooks/useOpenProjectInEditor';
import { OpenInIdeButton } from '@/components/ide/OpenInIdeButton';
import { useProjectRepos } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserSystem } from '@/components/ConfigProvider';

function NavDivider() {
  return (
    <div
      className="mx-2 h-6 w-px bg-border/60"
      role="separator"
      aria-orientation="vertical"
    />
  );
}

interface NavIconButtonProps {
  icon: typeof FolderOpen;
  label: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}

function NavIconButton({
  icon: Icon,
  label,
  to,
  onClick,
  disabled,
  active,
}: NavIconButtonProps) {
  const button = (
    <Button
      variant="ghost"
      size="icon"
      className={`h-9 w-9 ${active ? 'bg-accent' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="bottom">{label} (coming soon)</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (to) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${active ? 'bg-accent' : ''}`}
              asChild
              aria-label={label}
            >
              <Link to={to}>
                <Icon className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="bottom">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Navbar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId, project } = useProject();
  const handleOpenInEditor = useOpenProjectInEditor(project || null);
  const { loginStatus } = useUserSystem();
  const {
    collapsed,
    toggle,
    mode: sidebarMode,
    setMode,
    setCollapsed,
  } = useSidebar();

  const { data: repos } = useProjectRepos(projectId);
  const isSingleRepoProject = repos?.length === 1;

  const { t } = useTranslation(['tasks', 'common']);

  // Navbar is global, but the share tasks toggle only makes sense on the tasks route
  const isTasksRoute = /^\/projects\/[^/]+\/tasks/.test(location.pathname);
  const showSharedTasks = searchParams.get('shared') !== 'off';
  const shouldShowSharedToggle =
    isTasksRoute && project?.remote_project_id != null;

  const handleSharedToggle = useCallback(
    (checked: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (checked) {
        params.delete('shared');
      } else {
        params.set('shared', 'off');
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const handleCreateTask = () => {
    if (projectId) {
      openSidebarMode('task-create');
    }
  };

  const handleOpenInIDE = () => {
    handleOpenInEditor();
  };

  const isOAuthLoggedIn = loginStatus?.status === 'loggedin';

  // Helper to open sidebar with specific mode
  const openSidebarMode = (mode: typeof sidebarMode) => {
    setMode(mode);
    setCollapsed(false);
  };

  // Check active sidebar modes for highlighting
  const isProjectsActive = sidebarMode === 'projects';
  const isProjectSettingsActive = sidebarMode === 'project-settings';
  const isMcpActive = sidebarMode === 'mcp';
  const isAgentsActive = sidebarMode === 'agents';
  const isKnowledgeActive = sidebarMode === 'knowledge';
  const isSettingsActive = sidebarMode === 'settings';

  return (
    <div className="border-b bg-background">
      <div className="w-full px-3">
        <div className="flex items-center h-12 py-2">
          <div className="flex-1 flex items-center">
            <Link
              to="/projects"
              className="font-semibold text-foreground hover:text-foreground/80 transition-colors"
            >
              Knowledge Orchestrator
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-1">
            {isOAuthLoggedIn && shouldShowSharedToggle ? (
              <>
                <div className="flex items-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Switch
                            checked={showSharedTasks}
                            onCheckedChange={handleSharedToggle}
                            aria-label={t('tasks:filters.sharedToggleAria')}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        {t('tasks:filters.sharedToggleTooltip')}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <NavDivider />
              </>
            ) : null}

            {/* Navigation Group */}
            <div className="flex items-center gap-1">
              <NavIconButton
                icon={collapsed ? PanelRight : PanelRightClose}
                label={collapsed ? 'Show sidebar' : 'Hide sidebar'}
                onClick={toggle}
              />
              <NavIconButton
                icon={FolderOpen}
                label="Projects"
                onClick={() => openSidebarMode('projects')}
                active={isProjectsActive}
              />
              {projectId && (
                <>
                  <NavIconButton
                    icon={FolderCog}
                    label="Project Settings"
                    onClick={() => openSidebarMode('project-settings')}
                    active={isProjectSettingsActive}
                  />
                  <NavIconButton
                    icon={BookOpen}
                    label="Knowledge"
                    onClick={() => openSidebarMode('knowledge')}
                    active={isKnowledgeActive}
                  />
                </>
              )}
              <NavIconButton
                icon={Bot}
                label="MCP Servers"
                onClick={() => openSidebarMode('mcp')}
                active={isMcpActive}
              />
              <NavIconButton
                icon={Cpu}
                label="Agents"
                onClick={() => openSidebarMode('agents')}
                active={isAgentsActive}
              />
              <NavIconButton icon={LayoutGrid} label="View Toggle" disabled />
            </div>

            <NavDivider />

            {/* Action Group */}
            <div className="flex items-center gap-1">
              {isSingleRepoProject && (
                <OpenInIdeButton
                  onClick={handleOpenInIDE}
                  className="h-9 w-9"
                />
              )}
              {projectId && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={handleCreateTask}
                        aria-label="Create new task"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">New Task</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <NavIconButton
                icon={Settings}
                label="Settings"
                onClick={() => openSidebarMode('settings')}
                active={isSettingsActive}
              />
              <NavIconButton icon={Square} label="Accent Color" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
