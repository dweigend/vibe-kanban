import { useCallback } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/SearchContext';
import { useProject } from '@/contexts/ProjectContext';

export function SidebarSearchBar() {
  const { query, setQuery, active, registerInputRef } = useSearch();
  const { project } = useProject();

  const setSearchBarRef = useCallback(
    (node: HTMLInputElement | null) => {
      registerInputRef(node);
    },
    [registerInputRef]
  );

  if (!active) {
    return (
      <div className="relative opacity-50">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Select a project..."
          disabled
          className="pl-9 bg-card border-border"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={setSearchBarRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={project ? `Search ${project.name}...` : 'Search...'}
        className="pl-9 bg-card border-border"
      />
    </div>
  );
}
