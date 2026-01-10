import { Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MOCK_PROJECT = {
  name: 'vibe-kanban',
  description: [
    '// Redesigning the core orchestration interface.',
    '// Focus: High contrast, sharp edges.',
  ],
  tags: ['React', 'Tailwind', 'MCP'],
};

export function ProjectOverview() {
  return (
    <div className="rounded border border-border bg-card p-3 space-y-3">
      <div className="flex items-start justify-between">
        <h4 className="text-lg font-semibold">{MOCK_PROJECT.name}</h4>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
          <Pencil className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1 font-mono text-sm text-muted-foreground">
        {MOCK_PROJECT.description.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {MOCK_PROJECT.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
