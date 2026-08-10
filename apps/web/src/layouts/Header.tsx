import { Search, Bell, Sparkles, Download } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  onOpenAiChat: () => void;
}

// School identity — update this to match the school using the software
const SCHOOL = {
  name: 'Springfield Academy',
  logo: '/logo.png',
};

export function Header({ onSearchClick, onNotificationsClick, onOpenAiChat }: HeaderProps) {
  const { notifications } = useGlobalStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-11 border-b border-border/60 bg-card flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
      {/* Left: School Welcome */}
      <div className="flex items-center gap-2.5">
        <span className="text-xs text-muted-foreground font-medium">Welcome,</span>
        <img
          src={SCHOOL.logo}
          alt={SCHOOL.name}
          className="h-5 w-5 object-contain rounded shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <span className="text-sm font-black text-foreground tracking-tight">{SCHOOL.name}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Export */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 border border-border/60 px-2.5 py-[5px] rounded-md transition-colors"
          title="Export"
        >
          <Download className="h-3 w-3 shrink-0" />
          <span>Export</span>
        </button>

        {/* Search */}
        <button
          onClick={onSearchClick}
          className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted hover:bg-muted/80 border border-border/60 px-2.5 py-[5px] rounded-md w-44 sm:w-52 transition-colors outline-none"
        >
          <Search className="h-3 w-3 shrink-0" />
          <span className="flex-1 text-left truncate text-xs">Search anything...</span>
          <kbd className="hidden sm:inline-flex h-4 select-none items-center rounded border border-border/60 bg-background px-1 font-mono text-[9px] font-bold opacity-70">
            ⌘K
          </kbd>
        </button>

        {/* Ask AI */}
        <button
          onClick={onOpenAiChat}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary bg-primary/10 hover:bg-primary/20 border border-primary/25 px-2.5 py-[5px] rounded-md transition-all"
        >
          <Sparkles className="h-3 w-3 shrink-0" />
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
