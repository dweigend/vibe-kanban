import { useNavigate } from 'react-router-dom';
import { Bot, Server, ExternalLink, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUserSystem } from '@/components/ConfigProvider';

export function SidebarMcp() {
  const navigate = useNavigate();
  const { profiles } = useUserSystem();

  const openFullSettings = () => {
    navigate('/settings/mcp');
  };

  const agentList = profiles ? Object.keys(profiles) : [];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <span className="font-medium">MCP Servers</span>
        </div>
        <Button size="sm" variant="ghost" onClick={openFullSettings}>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <p className="text-xs text-muted-foreground">
          Configure MCP servers for each agent profile
        </p>

        <div className="space-y-2">
          {agentList.map((agent) => (
            <Card
              key={agent}
              className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={openFullSettings}
            >
              <div className="flex items-center gap-3">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{agent}</span>
              </div>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={openFullSettings}
        >
          <Settings2 className="h-4 w-4 mr-2" />
          Configure MCP
        </Button>
      </div>
    </div>
  );
}
