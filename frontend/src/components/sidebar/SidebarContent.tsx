import { Folder, Sparkles, Terminal } from 'lucide-react';
import { SidebarSearchBar } from './SidebarSearchBar';
import { SidebarSection } from './SidebarSection';
import { ProjectOverview } from './ProjectOverview';
import { ActiveAgents } from './ActiveAgents';
import { SystemLog } from './SystemLog';
import { SidebarModeToggle } from './SidebarModeToggle';
import { SidebarTaskList } from './SidebarTaskList';
import { SidebarTaskDetail } from './SidebarTaskDetail';
import { SidebarSettings } from './SidebarSettings';
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

  // Settings mode: full height, no toggle or search
  if (mode === 'settings') {
    return <SidebarSettings />;
  }

  return (
    <div className="space-y-4">
      <SidebarModeToggle />
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
        </>
      )}
    </div>
  );
}
