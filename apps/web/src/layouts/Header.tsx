import { Search, Bell, Download, Building2, Shield, GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
}

export function Header({ onSearchClick, onNotificationsClick }: HeaderProps) {
  const { notifications, schoolProfile, activeSession, setActiveSession, academicSessions } = useGlobalStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

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
      {/* Left: Active Academic Session Control */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/25 text-primary shadow-xs transition-all" title="Active Academic Session">
          <Calendar className="h-4.5 w-4.5 shrink-0 text-primary" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-primary/80">
              Session:
            </span>
            <select
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="bg-transparent text-sm font-black text-foreground outline-none cursor-pointer pr-1 hover:text-primary transition-colors border-none"
            >
              {academicSessions.map((session) => (
                <option key={session} value={session} className="bg-card text-foreground font-bold">
                  {session} {session === '2026–2027' ? '(Active)' : '(Archived)'}
                </option>
              ))}
            </select>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 inline-block animate-pulse ml-0.5" />
        </div>
      </div>

      {/* Right: Search, Export, Notifications & School Identity */}
      <div className="flex items-center gap-3 shrink-0">
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
