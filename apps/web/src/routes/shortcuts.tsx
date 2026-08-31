import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFCard,
  VFButton,
  VFBadge,
  cn,
} from '@vidyafloww/ui';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  Bell,
  FileSpreadsheet,
  Settings,
  Calendar,
  UserPlus,
  ClipboardList,
  School,
  BookOpen,
  Laptop,
  BookOpenCheck,
  Smartphone,
  Search,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  Plus,
  BarChart3,
} from 'lucide-react';
import { useGlobalStore, DEFAULT_DASHBOARD_SHORTCUTS } from '../stores/globalStore';

export const Route = createFileRoute('/shortcuts')({
  component: ShortcutsConfigPage,
});

export interface ShortcutAction {
  id: string;
  label: string;
  desc: string;
  route: string;
  icon: any;
  category: 'Core' | 'Academic' | 'Finance' | 'Communication' | 'Operations' | 'System';
}

export const ALL_SHORTCUT_ACTIONS: ShortcutAction[] = [
  { id: 'attendance', label: 'Attendance', desc: 'Daily roll call & biometric logs', route: '/attendance', icon: CalendarCheck, category: 'Core' },
  { id: 'admissions', label: 'Admissions', desc: 'Intake pipeline & lead verification', route: '/admissions', icon: UserPlus, category: 'Core' },
  { id: 'students', label: 'Students', desc: '360° student directory & dossiers', route: '/students', icon: GraduationCap, category: 'Core' },
  { id: 'staff', label: 'Teachers', desc: 'Faculty profiles & workload matrix', route: '/staff', icon: Users, category: 'Academic' },
  { id: 'timetable', label: 'Timetable', desc: 'Class schedules & proxy assignment', route: '/timetable', icon: Calendar, category: 'Academic' },
  { id: 'fees', label: 'Payments', desc: 'Dues collection & digital receipts', route: '/fees', icon: CreditCard, category: 'Finance' },
  { id: 'notices', label: 'Notices', desc: 'Campus circulars & broadcasts', route: '/notices', icon: Bell, category: 'Communication' },
  { id: 'homework', label: 'Homework', desc: 'Daily assignments & submissions', route: '/homework', icon: BookOpen, category: 'Academic' },
  { id: 'examinations', label: 'Exams', desc: 'Marksheets, grades & report cards', route: '/examinations', icon: ClipboardList, category: 'Academic' },
  { id: 'academics', label: 'Academics', desc: 'Grade hierarchy & wing structure', route: '/academics', icon: School, category: 'Academic' },
  { id: 'statistics', label: 'Statistics', desc: 'Institutional telemetry & analytics', route: '/statistics', icon: BarChart3, category: 'Operations' },
  { id: 'reports', label: 'Reports', desc: 'CBSE, RTE compliance & export audit', route: '/reports', icon: FileSpreadsheet, category: 'Operations' },
  { id: 'settings', label: 'Settings', desc: 'School branding, logos & AY session', route: '/settings', icon: Settings, category: 'System' },
  { id: 'lms', label: 'E-Learning', desc: 'Digital courses & lesson library', route: '/lms', icon: Laptop, category: 'Academic' },
  { id: 'resources', label: 'Library', desc: 'Resource catalog & book registers', route: '/resources', icon: BookOpenCheck, category: 'Operations' },
  { id: 'portal', label: 'Parent Portal', desc: 'Guardian access & communications', route: '/portal', icon: Smartphone, category: 'Communication' },
];

function ShortcutsConfigPage() {
  const { dashboardShortcuts, setDashboardShortcuts, resetDashboardShortcuts } = useGlobalStore();

  const [selectedIds, setSelectedIds] = React.useState<string[]>(
    dashboardShortcuts && dashboardShortcuts.length > 0 ? dashboardShortcuts : DEFAULT_DASHBOARD_SHORTCUTS
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [saveToast, setSaveToast] = React.useState(false);

  // Sync state if store updates
  React.useEffect(() => {
    if (dashboardShortcuts && dashboardShortcuts.length > 0) {
      setSelectedIds(dashboardShortcuts);
    }
  }, [dashboardShortcuts]);

  const categories = ['All', 'Core', 'Academic', 'Finance', 'Communication', 'Operations', 'System'];

  // Reordering handlers
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= selectedIds.length) return;

    setSelectedIds((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) {
        alert('You must keep at least 1 shortcut enabled on your dashboard.');
        return;
      }
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handleSave = () => {
    setDashboardShortcuts(selectedIds);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  const handleReset = () => {
    resetDashboardShortcuts();
    setSelectedIds(DEFAULT_DASHBOARD_SHORTCUTS);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  // Filtered lists
  const activeShortcutObjects = selectedIds
    .map((id) => ALL_SHORTCUT_ACTIONS.find((a) => a.id === id))
    .filter((a): a is ShortcutAction => Boolean(a));

  const filteredInactive = ALL_SHORTCUT_ACTIONS.filter((a) => {
    const isInactive = !selectedIds.includes(a.id);
    const matchesSearch = !searchQuery || a.label.toLowerCase().includes(searchQuery.toLowerCase()) || a.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    return isInactive && matchesSearch && matchesCategory;
  });

  return (
    <VFPageContainer className="space-y-4 max-w-7xl mx-auto py-2">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border/80 bg-card shadow-xs">
        <div className="flex items-center gap-3.5">
          <Link to="/">
            <VFButton
              size="sm"
              variant="outline"
              className="h-9 px-3 bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border cursor-pointer shadow-xs"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Dashboard
            </VFButton>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-foreground tracking-tight">Configure Quick Actions</h2>
              <VFBadge variant="primary" className="text-xs font-bold font-mono">
                {selectedIds.length} / {ALL_SHORTCUT_ACTIONS.length} Active
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              Customize module shortcuts and arrange display sequence for your command launchpad.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted/40 transition-colors border border-transparent hover:border-border cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset (12)
          </button>
          <VFButton
            size="sm"
            onClick={handleSave}
            className="h-9 px-4 text-xs font-bold cursor-pointer"
            leftIcon={<Check className="h-4 w-4" />}
          >
            Save Changes
          </VFButton>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="p-3.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0" />
            <span>Dashboard shortcuts updated successfully! Changes are live on your home workspace.</span>
          </div>
          <Link to="/" className="underline text-emerald-300 hover:text-white font-black">
            Go to Dashboard →
          </Link>
        </div>
      )}

      {/* Main Grid: Left Reordering Manager + Right Live Visual Dashboard Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT COLUMN: Active Shortcuts Reordering Studio (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <VFCard
            title="Active Dashboard Shortcuts"
            description="Drag or use arrow buttons to arrange position. Top items appear first in the launchpad."
            actions={
              <button
                onClick={() => setSelectedIds(ALL_SHORTCUT_ACTIONS.map(a => a.id))}
                className="text-xs font-bold text-primary hover:underline px-2 py-1"
              >
                Enable All ({ALL_SHORTCUT_ACTIONS.length})
              </button>
            }
            bodyClassName="p-4 space-y-2.5 max-h-[580px] overflow-y-auto no-scrollbar"
          >
            {activeShortcutObjects.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="p-3 rounded-md bg-[#161616] border border-border/90 hover:border-primary/60 flex items-center justify-between gap-3 transition-all shadow-xs group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Position Number Pill */}
                    <span className="h-6 w-6 rounded bg-[#222222] border border-border text-xs font-mono font-black text-primary flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>

                    {/* Icon */}
                    <div className="h-9 w-9 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-foreground truncate">{action.label}</p>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase px-1.5 py-0.2 rounded bg-[#202020] border border-border/80">
                          {action.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">{action.desc}</p>
                    </div>
                  </div>

                  {/* Reorder and Remove Action Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className={cn(
                        "h-7 w-7 rounded border border-border bg-[#141414] flex items-center justify-center transition-colors shadow-xs",
                        index === 0 ? "opacity-25 cursor-not-allowed text-muted-foreground" : "hover:bg-[#222222] hover:text-foreground cursor-pointer text-foreground"
                      )}
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === selectedIds.length - 1}
                      className={cn(
                        "h-7 w-7 rounded border border-border bg-[#141414] flex items-center justify-center transition-colors shadow-xs",
                        index === selectedIds.length - 1 ? "opacity-25 cursor-not-allowed text-muted-foreground" : "hover:bg-[#222222] hover:text-foreground cursor-pointer text-foreground"
                      )}
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggle(action.id)}
                      className="h-7 px-2 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded border border-rose-500/30 transition-colors ml-1 cursor-pointer"
                      title="Remove from Dashboard"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </VFCard>

          {/* Inactive Shortcuts Available to Add */}
          {filteredInactive.length > 0 && (
            <VFCard
              title="Available Inactive Modules"
              description="Click to activate and add these modules to your dashboard shortcut grid."
              bodyClassName="p-4 space-y-3"
            >
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-1">
                <div className="relative flex-1">
                  <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search inactive modules..."
                    className="w-full pl-8 pr-3 h-8 rounded-md bg-[#141414] border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer shrink-0",
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-[#161616] text-muted-foreground hover:text-foreground border border-border"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredInactive.map((action) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      className="p-3 rounded-md bg-[#121212] border border-border/70 hover:border-border flex items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="h-8 w-8 rounded-md bg-[#1a1a1a] text-muted-foreground border border-border/80 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-foreground truncate">{action.label}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{action.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggle(action.id)}
                        className="h-7 px-2.5 text-xs font-bold text-primary hover:bg-primary/10 rounded border border-primary/40 flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add
                      </button>
                    </div>
                  );
                })}
              </div>
            </VFCard>
          )}
        </div>

        {/* RIGHT COLUMN: Live Real-Time Dashboard Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-4">
          <VFCard
            title="Live Launchpad Preview"
            description="Real-time representation of how your shortcuts grid renders on the home dashboard."
            actions={
              <VFBadge variant="success" className="text-xs font-mono font-bold">
                {activeShortcutObjects.length} Tiles
              </VFBadge>
            }
            bodyClassName="p-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto no-scrollbar">
              {activeShortcutObjects.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-md border border-border/80 bg-[#1a1a1a] hover:bg-[#222222] hover:border-indigo-500/50 transition-all flex flex-col items-center justify-center text-center shadow-xs select-none min-h-[96px]"
                  >
                    <div className="h-9 w-9 rounded-md flex items-center justify-center border border-indigo-500/30 bg-indigo-500/15 text-indigo-400 mb-1.5 shadow-xs">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <p className="text-xs font-bold text-foreground truncate w-full px-1">
                      {action.label}
                    </p>
                    <span className="text-[9px] text-muted-foreground font-mono mt-0.5 block truncate">
                      #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </VFCard>
        </div>

      </div>
    </VFPageContainer>
  );
}
