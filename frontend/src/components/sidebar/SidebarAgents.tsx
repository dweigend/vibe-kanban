import { useNavigate } from 'react-router-dom';
import { Cpu, ExternalLink, Settings2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserSystem } from '@/components/ConfigProvider';
import { cn } from '@/lib/utils';

export function SidebarAgents() {
  const navigate = useNavigate();
  const { config, profiles } = useUserSystem();

  const openFullSettings = () => {
    navigate('/settings/agents');
  };

  const agentList = profiles ? Object.keys(profiles) : [];
  const currentAgent = config?.executor_profile?.executor;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4" />
          <span className="font-medium">Agent Profiles</span>
        </div>
        <Button size="sm" variant="ghost" onClick={openFullSettings}>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <p className="text-xs text-muted-foreground">
          Configure coding agent profiles and settings
        </p>

        <div className="space-y-2">
          {agentList.map((agent) => {
            const isActive = agent === currentAgent;
            return (
              <Card
                key={agent}
                className={cn(
                  'p-3 cursor-pointer hover:bg-accent/50 transition-colors',
                  isActive && 'border-primary'
                )}
                onClick={openFullSettings}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{agent}</span>
                  </div>
                  {isActive && (
                    <Badge variant="outline" className="text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={openFullSettings}
        >
          <Settings2 className="h-4 w-4 mr-2" />
          Configure Agents
        </Button>
      </div>
    </div>
  );
}
