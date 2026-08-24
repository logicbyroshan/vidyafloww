import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Search, Bell, Download, Building2, Shield, GraduationCap, Award, BookOpen, Calendar, ChevronDown, Check, BarChart3, Sparkles } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { cn } from '@vidyamaxx/ui';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  onAIClick?: () => void;
}

export function Header({ onSearchClick, onNotificationsClick, onAIClick }: HeaderProps) {
  const { notifications, schoolProfile, activeSession, setActiveSession, academicSessions } = useGlobalStore();
  const [isSessionMenuOpen, setIsSessionMenuOpen] = React.useState(false);
  const sessionMenuRef = React.useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sessionMenuRef.current && !sessionMenuRef.current.contains(event.target as Node)) {
        setIsSessionMenuOpen(false);
      }
    };
    if (isSessionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSessionMenuOpen]);

  const renderSchoolEmblem = () => {
    if (schoolProfile.customLogoUrl) {
      return (
        <img
          src={schoolProfile.customLogoUrl}
          alt={schoolProfile.name}
          className="h-7 w-7 object-contain rounded-md shrink-0"
        />
      );
    }

    switch (schoolProfile.logoPreset) {
      case 'shield':
        return <Shield className="h-4 w-4 text-foreground" />;
      case 'graduation':
        return <GraduationCap className="h-4 w-4 text-foreground" />;
      case 'award':
        return <Award className="h-4 w-4 text-foreground" />;
      case 'book':
        return <BookOpen className="h-4 w-4 text-foreground" />;
      case 'building':
      default:
        return <Building2 className="h-4 w-4 text-foreground" />;
    }
  };

  return (
    <header className="h-[64px] border-b border-border bg-card flex items-center justify-between px-5 sticky top-0 z-20 shrink-0 select-none">
      {/* Left: Custom Styled Active Academic Session Dropdown */}
      <div className="flex items-center gap-3">
        <div className="relative" ref={sessionMenuRef}>
          <button
            onClick={() => setIsSessionMenuOpen(!isSessionMenuOpen)}
            className="flex items-center gap-2.5 px-3 h-9 rounded-xl bg-muted/40 hover:bg-muted border border-border text-foreground shadow-xs transition-all cursor-pointer outline-none group"
            title="Switch Academic Session"
          >
            <Calendar className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <span>Session:</span>
              <span className="text-sm font-bold text-foreground font-mono">
                {activeSession}
              </span>
            </div>
            {activeSession === '2026–2027' && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Active
              </span>
            )}
            <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ml-0.5", isSessionMenuOpen && "rotate-180")} />
          </button>

          {/* Custom Animated Glassmorphic Dropdown Menu */}
          {isSessionMenuOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl border border-border bg-card shadow-2xl p-1.5 z-50 animate-scale-in space-y-1">
              <div className="px-2.5 py-1.5 border-b border-border/60 mb-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Select Academic Session
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  Changes live institutional database context
                </span>
              </div>
              {academicSessions.map((session) => {
                const isCurrent = session === activeSession;
                const isActiveAY = session === '2026–2027';
                return (
                  <button
                    key={session}
                    onClick={() => {
                      setActiveSession(session);
                      setIsSessionMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-sm transition-all cursor-pointer text-left font-semibold outline-none",
                      isCurrent
                        ? "bg-muted text-foreground border border-border font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 flex items-center justify-center shrink-0">
                        {isCurrent ? (
                          <Check className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                        )}
                      </div>
                      <span className="font-mono text-xs">{session}</span>
                    </div>
                    <div>
                      {isActiveAY ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Active AY
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                          Archived
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: Statistics, Search, Export, Notifications & School Identity */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Unified Statistics Direct Nav Trigger */}
        <Link
          to="/statistics"
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border px-3.5 h-10 rounded-xl transition-all cursor-pointer bg-muted/30 group"
          title="Institutional Statistics & Analytics Hub"
        >
          <BarChart3 className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
          <span className="hidden sm:inline">Statistics</span>
        </Link>

        {/* AI Copilot Direct Trigger */}
        {onAIClick && (
          <button
            onClick={onAIClick}
            className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/30 px-3.5 h-10 rounded-xl transition-all cursor-pointer shadow-xs group"
            title="Open VidyaMaxx AI Assistant (Shift+K)"
          >
            <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
            <kbd className="inline-flex h-5 select-none items-center rounded border border-primary/30 bg-primary/15 px-1.5 font-mono text-[10px] font-bold text-primary">
              ⇧K
            </kbd>
          </button>
        )}

        {/* Compact Search Trigger */}
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground bg-muted/40 hover:bg-muted border border-border px-3.5 h-10 rounded-xl transition-all outline-none cursor-pointer group"
          title="Search students, classes, records... (⌘K)"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="hidden md:inline text-sm font-medium text-muted-foreground group-hover:text-foreground">
            Search
          </span>
          <kbd className="inline-flex h-5 select-none items-center rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Export Button */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border px-3.5 rounded-xl transition-all cursor-pointer h-10"
          title="Export Data"
        >
          <Download className="h-4 w-4 shrink-0" />
          <span>Export</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted border border-border transition-colors outline-none cursor-pointer h-10 w-10 flex items-center justify-center"
          title="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-destructive rounded-full" />
          )}
        </button>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-border mx-0.5 hidden sm:block" />

        {/* Dynamic School Logo & Name on Right */}
        <div className="flex items-center gap-2.5 px-3 rounded-xl bg-muted/30 border border-border h-10 transition-all">
          <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
            {renderSchoolEmblem()}
          </div>
          <span className="text-sm font-bold text-foreground tracking-tight max-w-[150px] truncate" title={schoolProfile.name}>
            {schoolProfile.name}
          </span>
        </div>
      </div>
    </header>
  );
}
