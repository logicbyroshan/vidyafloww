import * as React from 'react';
import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';
import { NotificationsPanel } from './NotificationsPanel';
import { ToastContainer } from './ToastContainer';
import { AIChatDrawer } from '../components/AIChatDrawer';
import { useGlobalStore, initTheme } from '../stores/globalStore';
import { VFPage } from '@vidyamaxx/ui';
import { Smartphone, Monitor } from 'lucide-react';

export function AppShell() {
  const { addNotification } = useGlobalStore();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  // Screen width detector for min-1000px constraint
  React.useEffect(() => {
    const checkWidth = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Initialize theme on mount
  React.useEffect(() => {
    initTheme();
    const timer = setTimeout(() => {
      addNotification({
        title: 'Welcome to VidyaMaxx',
        description: 'Your enterprise school management platform is ready.',
        type: 'info',
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut for command palette
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mobile / Small Screen Blocker (< 1000px width)
  if (isSmallScreen) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
          <Smartphone className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Desktop Screen Required</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed">
          VidyaMaxx Web Command Portal is optimized exclusively for desktop viewports (<span className="text-primary font-semibold">minimum 1000px width</span>).
        </p>
        <div className="mt-6 p-4 bg-muted border border-border rounded-xl max-w-sm text-xs text-muted-foreground flex items-center gap-3 text-left">
          <Monitor className="h-5 w-5 text-primary shrink-0" />
          <span>Please resize your browser or switch to a desktop screen to continue. For mobile access, please use the VidyaMaxx Mobile App.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Maximum 1920px desktop wrapper */}
      <div className="max-w-[1920px] mx-auto min-w-[1000px] h-screen overflow-hidden flex flex-row">
        <VFPage className="flex-row h-screen overflow-hidden w-full">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Header */}
            <Header
              onSearchClick={() => setIsCommandPaletteOpen(true)}
              onNotificationsClick={() => setIsNotificationsOpen(true)}
              onOpenAiChat={() => setIsAiChatOpen(true)}
            />

            {/* Scrollable Page Content */}
            <main className="flex-1 overflow-y-auto bg-background relative custom-scrollbar">
              <Outlet />
            </main>
          </div>

          {/* Overlays & Drawers */}
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
          />
          <NotificationsPanel
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />
          <AIChatDrawer
            isOpen={isAiChatOpen}
            onClose={() => setIsAiChatOpen(false)}
          />
          <ToastContainer />
        </VFPage>
      </div>
    </div>
  );
}
