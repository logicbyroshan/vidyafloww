import * as React from 'react';
import { Outlet } from '@tanstack/react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CommandPalette } from './CommandPalette';
import { NotificationsPanel } from './NotificationsPanel';
import { ToastContainer } from './ToastContainer';
import { useGlobalStore, initTheme } from '../stores/globalStore';
import { VFPage } from '@vidyaflow/ui';

export function AppShell() {
  const { setSidebarExpanded, addNotification } = useGlobalStore();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  // Initialize theme on mount
  React.useEffect(() => {
    initTheme();
    
    // Add a mock notification for testing on mount (only once)
    const timer = setTimeout(() => {
      addNotification({
        title: 'Welcome to VidyaFlow',
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

  const handleMobileMenuClick = () => {
    setSidebarExpanded(true); // Or toggle based on logic
  };

  return (
    <VFPage className="flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <Header
          onMenuClick={handleMobileMenuClick}
          onSearchClick={() => setIsCommandPaletteOpen(true)}
          onNotificationsClick={() => setIsNotificationsOpen(true)}
        />

        {/* Scrollable Page Content (Router Outlet) */}
        <main className="flex-1 overflow-y-auto bg-background/50 relative">
          <Outlet />
        </main>
      </div>

      {/* Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <ToastContainer />
    </VFPage>
  );
}
