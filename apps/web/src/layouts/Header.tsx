import * as React from 'react';
import { Search, Bell, Sparkles, Download } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useLocation } from '@tanstack/react-router';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  onOpenAiChat: () => void;
}

export function Header({ onSearchClick, onNotificationsClick, onOpenAiChat }: HeaderProps) {
  const { notifications } = useGlobalStore();
  const location = useLocation();
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Dynamic Breadcrumb Label based on Route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/admissions')) return 'Admissions';
    if (path.startsWith('/students')) return 'Students';
    if (path.startsWith('/academics')) return 'Academics';
    if (path.startsWith('/attendance')) return 'Attendance';
    if (path.startsWith('/examinations')) return 'Examinations';
    if (path.startsWith('/finance')) return 'Finance';
    if (path.startsWith('/hr')) return 'HR';
    if (path.startsWith('/library')) return 'Library';
    if (path.startsWith('/transport')) return 'Transport';
    if (path.startsWith('/hostel')) return 'Hostel';
    if (path.startsWith('/communication')) return 'Communication';
    if (path.startsWith('/documents')) return 'Documents';
    if (path.startsWith('/reports')) return 'Reports';
    if (path.startsWith('/ai')) return 'AI Insights';
    if (path.startsWith('/settings')) return 'Settings';
    return 'Portal';
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10 shadow-xs">
      {/* Left Side: Breadcrumb & Title in Navbar */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">VidyaMaxx</span>
        <span className="text-xs text-muted-foreground/60">/</span>
        <span className="text-xs font-bold text-foreground">{getPageTitle()}</span>
      </div>

      {/* Right Side: Export Action, Search Bar, Ask AI, Notifications */}
      <div className="flex items-center gap-3">
        {/* Export Button in Navbar */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 border border-border px-3 py-1.5 rounded-lg transition-colors"
          title="Export Page Report"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </button>

        {/* Global Search Bar (Right Side) */}
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 text-xs text-muted-foreground bg-muted hover:bg-muted/80 border border-border px-3 py-1.5 rounded-lg w-52 sm:w-60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left truncate">Search anything...</span>
          <kbd className="hidden sm:inline-flex h-4 select-none items-center gap-1 rounded border border-border bg-background px-1 font-mono text-[10px] font-medium opacity-80">
            ⌘K
          </kbd>
        </button>

        {/* Ask AI Button */}
        <button
          onClick={onOpenAiChat}
          className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 hover:bg-primary/20 border border-primary/25 px-3 py-1.5 rounded-lg font-semibold transition-all"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ask AI</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={onNotificationsClick}
          className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors outline-none"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full border border-card animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
}
