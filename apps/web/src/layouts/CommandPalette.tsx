import * as React from 'react';
import { VFDialog, VFBadge } from '@vidyamaxx/ui';
import {
  Search,
  LayoutDashboard,
  UserSquare,
  Users,
  GraduationCap,
  Calendar,
  CalendarCheck,
  ClipboardList,
  CircleDollarSign,
  Landmark,
  Briefcase,
  MessageSquare,
  Bus,
  BookOpen,
  Building,
  Package,
  Files,
  MonitorPlay,
  HeartHandshake,
  BarChart3,
  Bot,
  Settings,
  Plus,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const commands = [
    // Module Navigation
    { id: 'dash', icon: LayoutDashboard, label: 'Go to Dashboard & BI Radar', route: '/', category: 'Navigation', shortcut: '⌘1' },
    { id: 'admit', icon: UserSquare, label: 'Go to Admissions & Intake Queue', route: '/admissions', category: 'Navigation', shortcut: '⌘2' },
    { id: 'stud', icon: Users, label: 'Go to Student 360° Directory', route: '/students', category: 'Navigation', shortcut: '⌘3' },
    { id: 'acad', icon: GraduationCap, label: 'Go to Academics & Curriculum', route: '/academics', category: 'Navigation', shortcut: '⌘4' },
    { id: 'time', icon: Calendar, label: 'Go to Timetable & Scheduling', route: '/timetable', category: 'Navigation', shortcut: '⌘5' },
    { id: 'attend', icon: CalendarCheck, label: 'Go to Attendance & Biometrics', route: '/attendance', category: 'Navigation', shortcut: '⌘6' },
    { id: 'exam', icon: ClipboardList, label: 'Go to Examination & Report Cards', route: '/examinations', category: 'Navigation', shortcut: '⌘7' },
    { id: 'fin', icon: CircleDollarSign, label: 'Go to Fees & Student Finance', route: '/finance', category: 'Navigation', shortcut: '⌘8' },
    { id: 'acct', icon: Landmark, label: 'Go to Finance & Accounting Ledger', route: '/accounting', category: 'Navigation', shortcut: '⌘9' },
    { id: 'hr', icon: Briefcase, label: 'Go to HR & Staff Payroll', route: '/hr', category: 'Navigation', shortcut: '⌘H' },
    { id: 'comm', icon: MessageSquare, label: 'Go to Communication & DLT SMS', route: '/communication', category: 'Navigation', shortcut: '⌘C' },
    { id: 'trans', icon: Bus, label: 'Go to Transport & Live GPS Tracking', route: '/transport', category: 'Navigation', shortcut: '⌘T' },
    { id: 'lib', icon: BookOpen, label: 'Go to Library & Book Catalog', route: '/library', category: 'Navigation', shortcut: '⌘L' },
    { id: 'hostel', icon: Building, label: 'Go to Hostel & Campus Life', route: '/hostel', category: 'Navigation', shortcut: '⌘B' },
    { id: 'inv', icon: Package, label: 'Go to Inventory & Store Procurement', route: '/inventory', category: 'Navigation', shortcut: '⌘I' },
    { id: 'docs', icon: Files, label: 'Go to ID Studio & Document Vault', route: '/documents', category: 'Navigation', shortcut: '⌘D' },
    { id: 'lms', icon: MonitorPlay, label: 'Go to Digital Classroom (LMS)', route: '/lms', category: 'Navigation', shortcut: '⌘V' },
    { id: 'welf', icon: HeartHandshake, label: 'Go to Student Welfare & Discipline', route: '/welfare', category: 'Navigation', shortcut: '⌘W' },
    { id: 'rep', icon: BarChart3, label: 'Go to Reports & Compliance BI', route: '/reports', category: 'Navigation', shortcut: '⌘R' },
    { id: 'ai', icon: Bot, label: 'Go to VidyaFlow AI Command Center', route: '/ai', category: 'Navigation', shortcut: '⌘A' },
    { id: 'sett', icon: Settings, label: 'Go to School Admin & Configuration', route: '/settings', category: 'Navigation', shortcut: '⌘S' },

    // Quick Actions
    { id: 'act-new-admit', icon: Plus, label: 'New Admission Application', route: '/admissions', category: 'Actions', shortcut: 'Shift+A' },
    { id: 'act-ask-ai', icon: Sparkles, label: 'Ask VidyaFlow AI Assistant', route: '/ai', category: 'Actions', shortcut: 'Shift+K' },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keyboard navigation inside command palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      navigate({ to: filtered[selectedIndex].route });
      onClose();
    }
  };

  return (
    <VFDialog
      isOpen={isOpen}
      onClose={onClose}
      hideHeader={true}
      className="p-0 max-w-2xl bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl overflow-hidden shadow-2xl mt-16 animate-scale-in"
    >
      <div className="flex flex-col h-full -m-6 divide-y divide-border/60" onKeyDown={handleKeyDown}>
        {/* Top Search Input Bar */}
        <div className="flex items-center px-4 py-3 bg-card">
          <Search className="h-4 w-4 text-primary mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-9 bg-transparent outline-none text-xs text-foreground placeholder:text-muted-foreground font-medium"
            placeholder="Type a command or search across all 20 ERP modules..."
          />
        </div>

        {/* Command List Scroll View */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground space-y-1">
              <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="font-semibold text-foreground">No matching commands found</p>
              <p>Try searching for "Admissions", "Fees", "Timetable", or "AI"</p>
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    navigate({ to: cmd.route });
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all outline-none text-xs text-left cursor-pointer ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-bold border border-primary/30 shadow-xs'
                      : 'text-foreground hover:bg-muted/50 border border-transparent'
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="flex-1 truncate font-medium">{cmd.label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/60">
                      {cmd.shortcut}
                    </span>
                    <VFBadge variant={isSelected ? 'primary' : 'outline'} className="text-[10px] px-2 py-0.5">
                      {cmd.category}
                    </VFBadge>
                    <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isSelected ? 'translate-x-0.5 text-primary' : 'opacity-0'}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Footer Bar with Shortcuts & Close Button */}
        <div className="px-4 py-2.5 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px] font-bold text-foreground">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px] font-bold text-foreground">↵</kbd> Select
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 text-primary font-bold text-xs mr-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>VidyaFlow AI</span>
            </div>

            {/* Close Button in Bottom Footer */}
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-muted hover:bg-destructive/15 text-muted-foreground hover:text-destructive border border-border hover:border-destructive/30 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
              title="Close palette"
            >
              <X className="h-3.5 w-3.5" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </VFDialog>
  );
}
