import { Compass, Code, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type AgentStatus = 'IDLE' | 'BUSY';

interface Agent {
  name: string;
  icon: typeof Compass;
  status: AgentStatus;
  task?: string;
}

const AGENTS: Agent[] = [
  { name: 'Architect', icon: Compass, status: 'IDLE' },
  {
    name: 'Coder',
    icon: Code,
    status: 'BUSY',
    task: '> refactoring sidebar_component.tsx',
  },
  { name: 'Researcher', icon: Search, status: 'IDLE' },
];

export function ActiveAgents() {
  return (
    <div className="space-y-2">
      {AGENTS.map((agent) => (
        <AgentCard key={agent.name} agent={agent} />
      ))}
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const isBusy = agent.status === 'BUSY';
  const Icon = agent.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded border p-3',
        isBusy ? 'border-coding bg-coding/10' : 'border-border bg-card'
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded',
          isBusy
            ? 'bg-coding text-coding-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium">{agent.name}</span>
          <Badge
            variant={isBusy ? 'default' : 'outline'}
            className={cn(
              'text-xs',
              isBusy && 'bg-coding text-coding-foreground'
            )}
          >
            {agent.status}
          </Badge>
        </div>
        {agent.task && (
          <p className="text-xs text-muted-foreground font-mono truncate">
            {agent.task}
          </p>
        )}
      </div>
    </div>
  );
}
