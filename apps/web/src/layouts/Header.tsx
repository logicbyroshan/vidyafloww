import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Search, Bell, Download, Building2, Shield, GraduationCap, Award, BookOpen, Calendar, ChevronDown, Check, BarChart3 } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { cn } from '@vidyamaxx/ui';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
}

export function Header({ onSearchClick, onNotificationsClick }: HeaderProps) {
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
        return <Shield className="h-4 w-4 text-primary" />;
      case 'graduation':
        return <GraduationCap className="h-4 w-4 text-primary" />;
      case 'award':
        return <Award className="h-4 w-4 text-primary" />;
      case 'book':
        return <BookOpen className="h-4 w-4 text-primary" />;
      case 'building':
      default:
        return <Building2 className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <header className="h-[64px] border-b border-border bg-card flex items-center justify-between px-5 sticky top-0 z-20 shrink-0 select-none">
      {/* Left: Custom Styled Active Academic Session Dropdown */}
      <div className="flex items-center gap-3">
        <div className="relative" ref={sessionMenuRef}>
          <button
            onClick={() => setIsSessionMenuOpen(!isSessionMenuOpen)}
            className="flex items-center gap-2.5 px-3.5 h-10 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/25 text-primary shadow-xs transition-all cursor-pointer outline-none group"
            title="Switch Academic Session"
          >
            <Calendar className="h-4.5 w-4.5 shrink-0 text-primary" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-primary/80">
                Session:
              </span>
              <span className="text-sm font-black text-foreground">
                {activeSession}
              </span>
              {activeSession === '2026–2027' && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 ml-0.5">
                  Active
                </span>
              )}
            </div>
            <ChevronDown className={cn("h-4 w-4 text-primary/80 transition-transform duration-200 ml-0.5", isSessionMenuOpen && "rotate-180")} />
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 inline-block animate-pulse ml-0.5" />
          </button>

          {/* Custom Animated Glassmorphic Dropdown Menu */}
          {isSessionMenuOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl border border-border bg-card shadow-2xl p-1.5 z-50 animate-scale-in space-y-1">
              <div className="px-2.5 py-1.5 border-b border-border/60 mb-1">
                <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wider block">
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
                      "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all cursor-pointer text-left font-bold outline-none",
                      isCurrent
                        ? "bg-primary/15 text-primary border border-primary/30 font-black"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className={cn("h-4 w-4", isCurrent ? "text-primary" : "text-muted-foreground")} />
                      <span>{session}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isActiveAY ? (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Active AY
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                          Archived
                        </span>
                      )}
                      {isCurrent && <Check className="h-4 w-4 text-primary ml-1 shrink-0" />}
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
          className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary hover:bg-muted border border-border px-3.5 h-10 rounded-xl transition-all cursor-pointer bg-muted/40 group"
          title="Institutional Statistics & Analytics Hub"
        >
          <BarChart3 className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Statistics</span>
        </Link>

        {/* Compact Search Trigger */}
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border px-3.5 h-10 rounded-xl transition-all outline-none cursor-pointer group"
          title="Search students, classes, records... (⌘K)"
        >
          <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="hidden md:inline text-sm font-semibold text-muted-foreground group-hover:text-foreground">
            Search
          </span>
          <kbd className="inline-flex h-5 select-none items-center rounded border border-border bg-background px-1.5 font-mono text-[11px] font-bold text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Export Button */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center gap-2 text-sm font-bold text-foreground hover:bg-muted border border-border px-3.5 rounded-xl transition-all cursor-pointer h-10"
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
        <div className="flex items-center gap-2.5 px-3 rounded-xl bg-muted/40 border border-border h-10 transition-all">
          <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 overflow-hidden">
            {renderSchoolEmblem()}
          </div>
          <span className="text-sm font-extrabold text-foreground tracking-tight max-w-[150px] truncate" title={schoolProfile.name}>
            {schoolProfile.name}
          </span>
        </div>
      </div>
    </header>
  );
}
