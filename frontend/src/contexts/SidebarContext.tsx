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
  MODE: 'sidebar-mode',
  SELECTED_TASK: 'sidebar-task-id',
} as const;

const DEFAULT_WIDTH = 320;

export type SidebarMode = 'dashboard' | 'tasks' | 'task-detail' | 'settings';

interface SidebarState {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
  width: number;
  setWidth: (width: number) => void;
  mode: SidebarMode;
  setMode: (mode: SidebarMode) => void;
  selectedTaskId: string | null;
  selectTask: (taskId: string) => void;
  clearTask: () => void;
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
  const [mode, setModeState] = useState<SidebarMode>(() =>
    loadFromStorage(STORAGE_KEYS.MODE, 'dashboard' as SidebarMode)
  );
  const [selectedTaskId, setSelectedTaskIdState] = useState<string | null>(() =>
    loadFromStorage(STORAGE_KEYS.SELECTED_TASK, null)
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COLLAPSED, collapsed);
  }, [collapsed]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WIDTH, width);
  }, [width]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.MODE, mode);
  }, [mode]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SELECTED_TASK, selectedTaskId);
  }, [selectedTaskId]);

  const setCollapsed = (value: boolean) => setCollapsedState(value);
  const toggle = () => setCollapsedState((prev: boolean) => !prev);
  const setWidth = (value: number) => setWidthState(value);

  const setMode = (value: SidebarMode) => {
    setModeState(value);
    if (value !== 'task-detail') {
      setSelectedTaskIdState(null);
    }
  };

  const selectTask = (taskId: string) => {
    setSelectedTaskIdState(taskId);
    setModeState('task-detail');
  };

  const clearTask = () => {
    setSelectedTaskIdState(null);
    setModeState('tasks');
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggle,
        width,
        setWidth,
        mode,
        setMode,
        selectedTaskId,
        selectTask,
        clearTask,
      }}
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
