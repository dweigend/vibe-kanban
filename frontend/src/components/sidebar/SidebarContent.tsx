import { Folder, Sparkles, Terminal } from 'lucide-react';
import { SidebarSearchBar } from './SidebarSearchBar';
import { SidebarSection } from './SidebarSection';
import { ProjectOverview } from './ProjectOverview';
import { ActiveAgents } from './ActiveAgents';
import { SystemLog } from './SystemLog';

export function SidebarContent() {
  return (
    <div className="space-y-6">
      <SidebarSearchBar />

      <SidebarSection icon={Folder} title="Project Overview">
        <ProjectOverview />
      </SidebarSection>

      <SidebarSection icon={Sparkles} title="Active Agents">
        <ActiveAgents />
      </SidebarSection>

      <SidebarSection icon={Terminal} title="System Log">
        <SystemLog />
      </SidebarSection>
    </div>
  );
}
