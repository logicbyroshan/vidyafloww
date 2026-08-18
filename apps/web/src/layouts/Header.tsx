import { Search, Bell, Download, Building2, Shield, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
}

export function Header({ onSearchClick, onNotificationsClick }: HeaderProps) {
  const { notifications, schoolProfile } = useGlobalStore();
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
    <header className="h-[72px] border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-20 shrink-0 select-none">
      {/* Left: Searchbar */}
      <div className="flex items-center gap-4">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-3 text-base text-muted-foreground bg-muted/50 hover:bg-muted border border-border px-4 py-2 rounded-lg w-80 sm:w-[480px] lg:w-[580px] transition-all outline-none cursor-pointer group h-11"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="flex-1 text-left truncate text-base font-medium">Search students, classes, records...</span>
          <kbd className="hidden sm:inline-flex h-6 select-none items-center rounded border border-border bg-background px-2 font-mono text-xs font-bold text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions & Custom School Identity */}
      <div className="flex items-center gap-3">
        {/* Export */}
        <button
          onClick={() => {}}
          className="hidden md:flex items-center gap-2 text-base font-bold text-foreground hover:bg-muted border border-border px-3.5 py-2 rounded-lg transition-all cursor-pointer h-11"
          title="Export Data"
        >
          <Download className="h-5 w-5 shrink-0" />
          <span>Export</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted border border-border transition-colors outline-none cursor-pointer h-11 w-11 flex items-center justify-center"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 bg-destructive rounded-full" />
          )}
        </button>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-border mx-1" />

        {/* Dynamic School Logo & Name on Right */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-muted/40 border border-border h-11 transition-all">
          <div className="h-7 w-7 rounded-md bg-primary/15 flex items-center justify-center shrink-0 overflow-hidden">
            {renderSchoolEmblem()}
          </div>
          <span className="text-base font-extrabold text-foreground tracking-tight max-w-[220px] truncate" title={schoolProfile.name}>
            {schoolProfile.name}
          </span>
        </div>
      </div>
    </header>
  );
}
