import * as React from 'react';
import { Search, Bell, Menu, Moon, Sun, Monitor } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { VFAvatar, VFButton } from '@vidyamaxx/ui';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onNotificationsClick: () => void;
}

export function Header({ onMenuClick, onSearchClick, onNotificationsClick }: HeaderProps) {
  const { theme, setTheme, notifications } = useGlobalStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-muted-foreground hover:text-foreground p-1 rounded-md"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Global Search Button Placeholder */}
        <button
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted hover:bg-muted/80 border border-border px-3 py-1.5 rounded-md w-64 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search anything...</span>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <div className="flex bg-muted rounded-full p-1 border border-border">
          <button
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            title="Light Theme"
          >
            <Sun className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`p-1.5 rounded-full transition-colors ${theme === 'system' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            title="System Theme"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            title="Dark Theme"
          >
            <Moon className="h-4 w-4" />
          </button>
        </div>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-destructive rounded-full border-2 border-card animate-pulse" />
          )}
        </button>

        {/* User Menu */}
        <div className="ml-2 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium leading-none">Roshan Singh</span>
            <span className="text-xs text-muted-foreground mt-1">Super Admin</span>
          </div>
          <VFAvatar fallback="Roshan Singh" size="sm" />
        </div>
      </div>
    </header>
  );
}
