import { Search, Bell, Sparkles, Download, Building2 } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  onOpenAiChat: () => void;
}

const SCHOOL = {
  name: 'Springfield Academy',
  logo: '/logo.png',
};

export function Header({ onSearchClick, onNotificationsClick, onOpenAiChat }: HeaderProps) {
  const { notifications } = useGlobalStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-12 border-b border-border/60 bg-card flex items-center justify-between px-4 sticky top-0 z-10 shrink-0 select-none">
      {/* Left: Searchbar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/60 hover:bg-muted border border-border/60 px-3 py-1 rounded-lg w-56 sm:w-72 transition-colors outline-none cursor-pointer"
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-left truncate text-xs">Search anything...</span>
          <kbd className="hidden sm:inline-flex h-4 select-none items-center rounded border border-border/60 bg-background px-1.5 font-mono text-[9px] font-bold opacity-70">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions & School Identity */}
      <div className="flex items-center gap-2.5">
        {/* Export */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted border border-border/60 px-2.5 py-[5px] rounded-lg transition-colors cursor-pointer"
          title="Export Data"
        >
          <Download className="h-3.5 w-3.5 shrink-0" />
          <span>Export</span>
        </button>

        {/* Ask AI */}
        <button
          onClick={onOpenAiChat}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary bg-primary/10 hover:bg-primary/20 border border-primary/25 px-2.5 py-[5px] rounded-lg transition-all cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>Ask AI</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors outline-none cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-destructive rounded-full border border-card" />
          )}
        </button>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-border/80 mx-0.5" />

        {/* School Logo & Name on Right */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/60">
          <div className="h-5 w-5 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Building2 className="h-3 w-3" />
          </div>
          <span className="text-xs font-bold text-foreground tracking-tight max-w-[140px] truncate">
            {SCHOOL.name}
          </span>
        </div>
      </div>
    </header>
  );
}
