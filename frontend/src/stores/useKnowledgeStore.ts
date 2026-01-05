import { create } from 'zustand';

interface KnowledgeStore {
  selectedTagId: string | null;
  searchQuery: string;
  setSelectedTagId: (tagId: string | null) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

export const useKnowledgeStore = create<KnowledgeStore>((set) => ({
  selectedTagId: null,
  searchQuery: '',

  setSelectedTagId: (tagId) => set({ selectedTagId: tagId }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  reset: () => set({ selectedTagId: null, searchQuery: '' }),
}));
