import { useRef, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from 'react-resizable-panels';
import { DevBanner } from '@/components/DevBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { SidebarContent } from '@/components/sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

export function NormalLayout() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');
  const shouldHideNavbar = view === 'preview' || view === 'diffs';
  const { collapsed, setCollapsed } = useSidebar();
  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    if (collapsed) {
      sidebarPanelRef.current?.collapse();
    } else {
      sidebarPanelRef.current?.expand();
    }
  }, [collapsed]);

  return (
    <div className="flex h-screen flex-col">
      <DevBanner />
      {!shouldHideNavbar && <Navbar />}
      <PanelGroup
        direction="horizontal"
        className="flex-1 min-h-0"
        autoSaveId="normalLayout.mainSidebar"
      >
        <Panel
          id="main"
          order={1}
          defaultSize={collapsed ? 100 : 75}
          minSize={40}
          className="min-w-0 min-h-0 overflow-hidden"
        >
          <Outlet />
        </Panel>

        <PanelResizeHandle
          className={cn(
            'relative z-30 bg-border cursor-col-resize group touch-none',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
            'transition-all w-1 hover:w-1.5 hover:bg-muted-foreground/20'
          )}
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 bg-muted/90 border border-border rounded-full px-1.5 py-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          </div>
        </PanelResizeHandle>

        <Panel
          ref={sidebarPanelRef}
          id="sidebar"
          order={2}
          defaultSize={collapsed ? 0 : 25}
          minSize={0}
          maxSize={35}
          collapsible
          collapsedSize={0}
          onCollapse={() => setCollapsed(true)}
          onExpand={() => setCollapsed(false)}
          className="min-w-0 min-h-0 overflow-hidden"
        >
          <Sidebar>
            <SidebarContent />
          </Sidebar>
        </Panel>
      </PanelGroup>
    </div>
  );
}
