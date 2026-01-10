import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SidebarSearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search knowledge base..."
        className="pl-9 bg-card border-border"
      />
    </div>
  );
}
