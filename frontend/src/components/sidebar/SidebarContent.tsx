import { Folder, Sparkles, Terminal } from 'lucide-react';
import { SidebarSearchBar } from './SidebarSearchBar';
import { SidebarSection } from './SidebarSection';
import { ProjectOverview } from './ProjectOverview';
import { ActiveAgents } from './ActiveAgents';
import { SystemLog } from './SystemLog';
import { SidebarTaskList } from './SidebarTaskList';
import { SidebarTaskDetail } from './SidebarTaskDetail';
import { SidebarTaskCreate } from './SidebarTaskCreate';
import { SidebarSettings } from './SidebarSettings';
import { SidebarProjects } from './SidebarProjects';
import { SidebarProjectSettings } from './SidebarProjectSettings';
import { SidebarMcp } from './SidebarMcp';
import { SidebarAgents } from './SidebarAgents';
import { SidebarKnowledge } from './SidebarKnowledge';
import { useSidebar } from '@/contexts/SidebarContext';
import { useProject } from '@/contexts/ProjectContext';

function DashboardContent() {
  return (
    <>
      <SidebarSection icon={Folder} title="Project Overview">
        <ProjectOverview />
      </SidebarSection>

      <SidebarSection icon={Sparkles} title="Active Agents">
        <ActiveAgents />
      </SidebarSection>

      <SidebarSection icon={Terminal} title="System Log">
        <SystemLog />
      </SidebarSection>
    </>
  );
}

export function SidebarContent() {
  const { mode } = useSidebar();
  const { projectId } = useProject();

  // Full-height modes (no search bar)
  switch (mode) {
    case 'settings':
      return <SidebarSettings />;
    case 'projects':
      return <SidebarProjects />;
    case 'project-settings':
      return <SidebarProjectSettings />;
    case 'mcp':
      return <SidebarMcp />;
    case 'agents':
      return <SidebarAgents />;
    case 'knowledge':
      return <SidebarKnowledge />;
    case 'dashboard':
    case 'tasks':
    case 'task-detail':
    case 'task-create':
    case 'task-edit':
      // These modes use the search bar layout below
      break;
  }

  // Dashboard and task modes with search bar
  return (
    <div className="space-y-4">
      <SidebarSearchBar />

      {!projectId ? (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Select a project to get started
        </div>
      ) : (
        <>
          {mode === 'dashboard' && <DashboardContent />}
          {mode === 'tasks' && <SidebarTaskList projectId={projectId} />}
          {mode === 'task-detail' && (
            <SidebarTaskDetail projectId={projectId} />
          )}
          {(mode === 'task-create' || mode === 'task-edit') && (
            <SidebarTaskCreate projectId={projectId} />
          )}
        </>
      )}
    </div>
  );
}
