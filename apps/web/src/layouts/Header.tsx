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
    <header className="h-11 border-b border-border/60 bg-card flex items-center justify-between px-4 sticky top-0 z-10">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-muted-foreground font-medium">VidyaMaxx</span>
        <span className="text-[11px] text-muted-foreground/40">/</span>
        <span className="text-[11px] font-bold text-foreground">{getPageTitle()}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Export */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 border border-border/60 px-2.5 py-1.5 rounded-md transition-colors"
          title="Export"
        >
          <Download className="h-3 w-3" />
          <span>Export</span>
        </button>

        {/* Search */}
        <button
          onClick={onSearchClick}
          className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted hover:bg-muted/80 border border-border/60 px-2.5 py-1.5 rounded-md w-44 sm:w-52 transition-colors outline-none"
        >
          <Search className="h-3 w-3 shrink-0" />
          <span className="flex-1 text-left truncate text-[10px]">Search anything...</span>
          <kbd className="hidden sm:inline-flex h-4 select-none items-center rounded border border-border/60 bg-background px-1 font-mono text-[9px] font-bold opacity-70 tracking-tight">
            ⌘K
          </kbd>
        </button>

        {/* Ask AI */}
        <button
          onClick={onOpenAiChat}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 hover:bg-primary/20 border border-primary/25 px-2.5 py-1.5 rounded-md transition-all"
        >
          <Sparkles className="h-3 w-3" />
          <span>Ask AI</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors outline-none"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-destructive rounded-full border border-card" />
          )}
        </button>
      </div>
    </header>
  );
}
