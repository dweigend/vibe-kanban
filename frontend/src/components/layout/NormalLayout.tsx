import { Outlet, useSearchParams } from 'react-router-dom';
import { DevBanner } from '@/components/DevBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

export function NormalLayout() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get('view');
  const shouldHideNavbar = view === 'preview' || view === 'diffs';

  return (
    <div className="flex h-screen flex-col">
      <DevBanner />
      {!shouldHideNavbar && <Navbar />}
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        <Sidebar>
          <div className="text-sm text-muted-foreground">
            Sidebar Content
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
