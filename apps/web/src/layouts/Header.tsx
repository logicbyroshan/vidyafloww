import * as React from 'react';
import { Search, Bell, Building2, Shield, GraduationCap, Award, BookOpen, Calendar, ChevronDown, Check, LayoutGrid, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useRouterState } from '@tanstack/react-router';
import { useGlobalStore } from '../stores/globalStore';
import { cn } from '@vidyafloww/ui';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
}

export function Header({ onSearchClick, onNotificationsClick }: HeaderProps) {
  const {
    notifications,
    schoolProfile,
    activeSession,
    setActiveSession,
    academicSessions,
    isDashboardEditMode,
    toggleDashboardEditMode,
    sidebarExpanded,
    toggleSidebar,
  } = useGlobalStore();
  const [isSessionMenuOpen, setIsSessionMenuOpen] = React.useState(false);
  const sessionMenuRef = React.useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const { location } = useRouterState();
  const isOnDashboard = location.pathname === '/';

  // Universal Live Date & Time Clock
  const [currentDateTime, setCurrentDateTime] = React.useState(() => new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateStr = React.useMemo(() => {
    // E.g. "Thu, 20 Aug 2026 • 08:30 AM"
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const datePart = currentDateTime.toLocaleDateString('en-US', options);
    const timePart = currentDateTime.toLocaleTimeString('en-US', timeOptions);
    return `${datePart} • ${timePart}`;
  }, [currentDateTime]);

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

  const getLogoTheme = () => {
    switch (schoolProfile.logoPreset) {
      case 'shield':
        return {
          badge: 'bg-blue-950/30 border-blue-500/35 hover:border-blue-500/55 shadow-[0_0_10px_rgba(59,130,246,0.12)]',
          iconContainer: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
          icon: <Shield className="h-4 w-4 text-blue-400 shrink-0" />,
        };
      case 'graduation':
        return {
          badge: 'bg-purple-950/30 border-purple-500/35 hover:border-purple-500/55 shadow-[0_0_10px_rgba(168,85,247,0.12)]',
          iconContainer: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
          icon: <GraduationCap className="h-4 w-4 text-purple-400 shrink-0" />,
        };
      case 'award':
        return {
          badge: 'bg-amber-950/30 border-amber-500/35 hover:border-amber-500/55 shadow-[0_0_10px_rgba(245,158,11,0.12)]',
          iconContainer: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
          icon: <Award className="h-4 w-4 text-amber-400 shrink-0" />,
        };
      case 'book':
        return {
          badge: 'bg-emerald-950/30 border-emerald-500/35 hover:border-emerald-500/55 shadow-[0_0_10px_rgba(16,185,129,0.12)]',
          iconContainer: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
          icon: <BookOpen className="h-4 w-4 text-emerald-400 shrink-0" />,
        };
      case 'building':
      default:
        return {
          badge: 'bg-orange-950/30 border-orange-500/35 hover:border-orange-500/55 shadow-[0_0_10px_rgba(249,115,22,0.12)]',
          iconContainer: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
          icon: <Building2 className="h-4 w-4 text-orange-400 shrink-0" />,
        };
    }
  };

  const logoTheme = getLogoTheme();

  return (
    <header className="h-[64px] border-b border-border bg-black flex items-center justify-between px-4 sticky top-0 z-20 shrink-0 select-none">
      {/* Left: Sidebar Toggle + Academic Session Dropdown */}
      <div className="flex items-center gap-2.5">
        {/* Sidebar Toggle — same square box as Search/Notification buttons */}
        <button
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground rounded-md bg-[#0e0e0e] hover:bg-[#161616] border border-border transition-colors outline-none cursor-pointer h-9 w-9 aspect-square flex items-center justify-center shadow-xs shrink-0"
          title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarExpanded
            ? <PanelLeftClose className="h-4 w-4" />
            : <PanelLeftOpen className="h-4 w-4" />}
        </button>

        <div className="relative" ref={sessionMenuRef}>
          <button
            onClick={() => setIsSessionMenuOpen(!isSessionMenuOpen)}
            className="flex items-center gap-2.5 px-3 h-9 rounded-md bg-[#0e0e0e] hover:bg-[#161616] border border-border text-foreground shadow-xs transition-all cursor-pointer outline-none group"
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
            <div className="absolute left-0 mt-2 w-64 rounded-lg border border-border bg-[#0e0e0e] shadow-2xl p-1.5 z-50 animate-scale-in space-y-1">
              <div className="px-2.5 py-1.5 border-b border-border/60 mb-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Select Academic Session
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
                      "flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-sm transition-all cursor-pointer text-left font-semibold outline-none",
                      isCurrent
                        ? "bg-[#1c1c1c] text-foreground border border-border font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-[#161616]"
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
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Active AY
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
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

      {/* Right: Configure Dashboard Button, Search, Notifications & School Identity */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Configure Dashboard Button — only visible on the Dashboard page */}
        {isOnDashboard && (
          <button
            onClick={toggleDashboardEditMode}
            className={cn(
              "flex items-center gap-1.5 px-3 h-9 rounded-md text-xs font-bold transition-all cursor-pointer border shadow-xs outline-none",
              isDashboardEditMode
                ? "bg-[#1f1f1f] text-foreground border-primary/60 shadow-xs ring-1 ring-primary/40"
                : "bg-[#0e0e0e] hover:bg-[#161616] text-muted-foreground hover:text-foreground border-border"
            )}
            title={isDashboardEditMode ? "Exit Dashboard Configuration" : "Configure Dashboard & Rearrange Cards"}
          >
            <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-foreground" />
            <span className="hidden sm:inline text-foreground font-semibold">
              {isDashboardEditMode ? "Done Customizing" : "Configure Dashboard"}
            </span>
          </button>
        )}

        {/* Square Search Button Beside Notifications */}
        <button
          onClick={onSearchClick}
          className="relative text-muted-foreground hover:text-foreground rounded-md bg-[#0e0e0e] hover:bg-[#161616] border border-border transition-colors outline-none cursor-pointer h-9 w-9 aspect-square flex items-center justify-center shadow-xs group"
          title="Search students, faculty, records... (⌘K / Ctrl+K)"
        >
          <Search className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative text-muted-foreground hover:text-foreground rounded-md bg-[#0e0e0e] hover:bg-[#161616] border border-border transition-colors outline-none cursor-pointer h-9 w-9 aspect-square flex items-center justify-center shadow-xs"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
          )}
        </button>

        {/* Universal Live Date & Time Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-md bg-[#0e0e0e] border border-border text-foreground font-mono text-xs font-bold shadow-xs select-none" title="Universal Academic System Date & Time">
          <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{formattedDateStr}</span>
        </div>

        {/* Divider */}
        <div className="h-5 w-[1px] bg-border mx-0.5 hidden sm:block" />

        {/* Dynamic Colorful School Logo & Name Badge on Right */}
        <div className={cn(
          "flex items-center gap-2 px-2.5 rounded-md border h-9 transition-all shadow-xs",
          logoTheme.badge
        )}>
          <div className={cn(
            "h-6 w-6 rounded flex items-center justify-center shrink-0 overflow-hidden border",
            logoTheme.iconContainer
          )}>
            {schoolProfile.customLogoUrl ? (
              <img
                src={schoolProfile.customLogoUrl}
                alt={schoolProfile.name}
                className="h-full w-full object-contain"
              />
            ) : (
              logoTheme.icon
            )}
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-foreground tracking-tight max-w-[160px] truncate" title={schoolProfile.name}>
            {schoolProfile.name}
          </span>
        </div>
      </div>
    </header>
  );
}
