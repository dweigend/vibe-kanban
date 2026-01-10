import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

const STORAGE_KEYS = {
  COLLAPSED: 'sidebar-collapsed',
  WIDTH: 'sidebar-width',
} as const;

const DEFAULT_WIDTH = 320;

interface SidebarState {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
  width: number;
  setWidth: (width: number) => void;
}

const SidebarContext = createContext<SidebarState | null>(null);

interface SidebarProviderProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [collapsed, setCollapsedState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.COLLAPSED, defaultCollapsed)
  );
  const [width, setWidthState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.WIDTH, DEFAULT_WIDTH)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COLLAPSED, collapsed);
  }, [collapsed]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WIDTH, width);
  }, [width]);

  const setCollapsed = (value: boolean) => setCollapsedState(value);
  const toggle = () => setCollapsedState((prev: boolean) => !prev);
  const setWidth = (value: number) => setWidthState(value);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, toggle, width, setWidth }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarState {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
