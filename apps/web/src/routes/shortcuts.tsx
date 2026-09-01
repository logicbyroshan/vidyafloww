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
  Trash2,
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
  { id: 'teachers', label: 'Teachers', desc: 'Faculty profiles & workload matrix', route: '/teachers', icon: Users, category: 'Academic' },
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

const MAX_SHORTCUTS = 12;

function ShortcutsConfigPage() {
  const { dashboardShortcuts, setDashboardShortcuts, resetDashboardShortcuts, addNotification } = useGlobalStore();

  const [selectedIds, setSelectedIds] = React.useState<string[]>(
    dashboardShortcuts && dashboardShortcuts.length > 0 ? dashboardShortcuts.slice(0, MAX_SHORTCUTS) : DEFAULT_DASHBOARD_SHORTCUTS.slice(0, MAX_SHORTCUTS)
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const [saveToast, setSaveToast] = React.useState(false);

  // Sync state if store updates
  React.useEffect(() => {
    if (dashboardShortcuts && dashboardShortcuts.length > 0) {
      setSelectedIds(dashboardShortcuts.slice(0, MAX_SHORTCUTS));
    }
  }, [dashboardShortcuts]);

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

  const handleAdd = (id: string) => {
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= MAX_SHORTCUTS) {
      addNotification({
        title: 'Limit Reached',
        description: `You can select a maximum of ${MAX_SHORTCUTS} shortcuts for the dashboard.`,
        type: 'warning',
      });
      return;
    }
    setSelectedIds((prev) => [...prev, id]);
  };

  const handleRemove = (id: string) => {
    if (selectedIds.length <= 1) {
      addNotification({
        title: 'Minimum Required',
        description: 'You must keep at least 1 quick action shortcut active.',
        type: 'warning',
      });
      return;
    }
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleSave = () => {
    setDashboardShortcuts(selectedIds);
    setSaveToast(true);
    addNotification({
      title: 'Quick Actions Saved',
      description: `${selectedIds.length} shortcuts updated on your dashboard command center.`,
      type: 'success',
    });
    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  const handleReset = () => {
    resetDashboardShortcuts();
    setSelectedIds(DEFAULT_DASHBOARD_SHORTCUTS.slice(0, MAX_SHORTCUTS));
    setSaveToast(true);
    addNotification({
      title: 'Defaults Restored',
      description: 'Standard 12 quick action shortcuts reset to default order.',
      type: 'info',
    });
    setTimeout(() => {
      setSaveToast(false);
    }, 3000);
  };

  // 1. Active items in sequence
  const activeShortcutObjects = selectedIds
    .map((id) => ALL_SHORTCUT_ACTIONS.find((a) => a.id === id))
    .filter((a): a is ShortcutAction => Boolean(a));

  // 2. All shortcuts sorted: active ones on top, inactive ones below
  const sortedAllShortcuts = React.useMemo(() => {
    return [...ALL_SHORTCUT_ACTIONS].sort((a, b) => {
      const aActive = selectedIds.includes(a.id);
      const bActive = selectedIds.includes(b.id);
      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;
      if (aActive && bActive) {
        return selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id);
      }
      return 0;
    });
  }, [selectedIds]);

  // Filtered list for left side
  const filteredSortedShortcuts = React.useMemo(() => {
    return sortedAllShortcuts.filter((a) => {
      return (
        !searchQuery ||
        a.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [sortedAllShortcuts, searchQuery]);

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3.5 w-full">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-border bg-[#101010] shadow-xs shrink-0">
        <div className="flex items-center gap-3">
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
              <h2 className="text-base sm:text-lg font-black text-foreground tracking-tight">Configure Quick Actions</h2>
              <VFBadge variant="primary" className="text-xs font-bold font-mono">
                {selectedIds.length} / {MAX_SHORTCUTS} Active
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              Select and arrange up to 12 quick action shortcuts for your institutional home launchpad.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-muted/40 transition-colors border border-transparent hover:border-border cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Defaults (12)
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

      {/* Save Notification Banner */}
      {saveToast && (
        <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 shrink-0">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0" />
            <span>Dashboard quick action shortcuts updated successfully! Changes are live on your home workspace.</span>
          </div>
          <Link to="/" className="underline text-emerald-300 hover:text-white font-black">
            Go to Dashboard →
          </Link>
        </div>
      )}

      {/* Main Full-Width Split Layout: Left Pool (All with Active sorted on top) + Right Dashboard Grid (12 Slots) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT COLUMN: All Shortcuts Pool (Active on Top with Remove, Inactive below with Add) (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col min-h-0">
          <VFCard
            title={
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-foreground">Available Actions Pool</span>
                <VFBadge variant="outline" className="text-[11px] font-mono font-bold bg-[#161616]">
                  {filteredSortedShortcuts.length} Modules
                </VFBadge>
              </div>
            }
            description="Active shortcuts appear at the top. Click Add or Remove to customize your launchpad."
            className="h-full flex flex-col min-h-0 bg-[#0d0d0d] border-border/90"
            bodyClassName="p-3.5 flex flex-col flex-1 min-h-0 space-y-3 overflow-hidden"
          >
            {/* Full Width Search Bar */}
            <div className="relative shrink-0">
              <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search action modules by title or keyword..."
                className="w-full pl-8 pr-3 h-8.5 rounded-md bg-[#141414] border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Scrollable List of All Modules */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar space-y-2 pr-1">
              {filteredSortedShortcuts.map((action) => {
                const Icon = action.icon;
                const isActive = selectedIds.includes(action.id);
                const activeIndex = selectedIds.indexOf(action.id);

                return (
                  <div
                    key={action.id}
                    className={cn(
                      "p-2.5 rounded-lg border transition-all flex items-center justify-between gap-3 shadow-xs",
                      isActive
                        ? "bg-[#141414] border-[#2c2c2c] hover:border-[#3a3a3a]"
                        : "bg-[#0f0f0f] border-border/60 hover:border-border opacity-75 hover:opacity-100"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Status indicator or Position Tag */}
                      {isActive ? (
                        <span className="h-6 w-6 rounded bg-[#202020] border border-[#303030] text-[11px] font-mono font-black text-primary flex items-center justify-center shrink-0 shadow-2xs">
                          {activeIndex + 1}
                        </span>
                      ) : (
                        <span className="h-6 w-6 rounded bg-[#181818] border border-border text-[10px] font-mono text-muted-foreground flex items-center justify-center shrink-0">
                          +
                        </span>
                      )}

                      {/* Icon box (matching dashboard sleek colors) */}
                      <div className={cn(
                        "h-8 w-8 rounded-md flex items-center justify-center shrink-0 shadow-xs border",
                        isActive
                          ? "bg-[#1e1e1e] border-[#303030] text-foreground"
                          : "bg-[#161616] border-border text-muted-foreground"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-xs font-bold truncate", isActive ? "text-foreground" : "text-muted-foreground")}>
                            {action.label}
                          </p>
                          <span className="text-[9px] font-mono text-muted-foreground uppercase px-1.5 py-0.2 rounded bg-[#1c1c1c] border border-border/70">
                            {action.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">{action.desc}</p>
                      </div>
                    </div>

                    {/* Action Button: Remove if Active, Add if Inactive */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      {isActive ? (
                        <button
                          onClick={() => handleRemove(action.id)}
                          className="h-7 px-2.5 text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-md border border-rose-500/30 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                          title="Remove from quick actions"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAdd(action.id)}
                          disabled={selectedIds.length >= MAX_SHORTCUTS}
                          className={cn(
                            "h-7 px-2.5 text-[11px] font-bold rounded-md border flex items-center gap-1 transition-colors shadow-2xs",
                            selectedIds.length >= MAX_SHORTCUTS
                              ? "opacity-30 border-border text-muted-foreground cursor-not-allowed"
                              : "text-primary hover:bg-primary/10 border-primary/40 cursor-pointer"
                          )}
                          title={selectedIds.length >= MAX_SHORTCUTS ? "Max 12 shortcuts reached" : "Add to quick actions"}
                        >
                          <Plus className="h-3 w-3" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </VFCard>
        </div>

        {/* RIGHT COLUMN: Active Launchpad Preview (Max 12 Slots, Exact Dashboard Styling) (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col min-h-0">
          <VFCard
            title={
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-foreground">Dashboard Quick Actions Launchpad</span>
                <VFBadge variant="success" className="text-[11px] font-mono font-bold">
                  {selectedIds.length} / {MAX_SHORTCUTS} Slots
                </VFBadge>
              </div>
            }
            description="Live preview of your 12-slot launchpad. Use the arrow controls or remove buttons to adjust."
            className="h-full flex flex-col min-h-0 bg-[#0d0d0d] border-border/90"
            bodyClassName="p-3.5 flex flex-col flex-1 min-h-0 space-y-3 overflow-hidden"
          >
            {/* 12-Slot Dashboard Grid Preview (4 cols on large screens, 3 cols on medium) */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {/* Active items */}
                {activeShortcutObjects.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      className="p-3 rounded-lg border border-border/80 bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#383838] transition-all flex flex-col items-center justify-between text-center group shadow-xs select-none min-h-[108px] relative overflow-hidden"
                    >
                      {/* Top bar with sequence number & reorder controls */}
                      <div className="w-full flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                        <span className="font-mono font-black text-primary px-1.5 py-0.2 rounded bg-[#1c1c1c] border border-[#2a2a2a]">
                          #{idx + 1}
                        </span>
                        <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 'up')}
                            disabled={idx === 0}
                            className={cn(
                              "p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-[#242424] cursor-pointer",
                              idx === 0 && "opacity-20 cursor-not-allowed"
                            )}
                            title="Move left/up"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, 'down')}
                            disabled={idx === selectedIds.length - 1}
                            className={cn(
                              "p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-[#242424] cursor-pointer",
                              idx === selectedIds.length - 1 && "opacity-20 cursor-not-allowed"
                            )}
                            title="Move right/down"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Icon container (matching dashboard styling) */}
                      <div className="h-9 w-9 rounded-md flex items-center justify-center border border-border/80 bg-[#1e1e1e] text-foreground mb-1 group-hover:scale-105 group-hover:bg-[#282828] group-hover:border-[#3e3e3e] transition-all shrink-0 shadow-xs">
                        <Icon className="h-4.5 w-4.5 text-foreground" />
                      </div>

                      {/* Label */}
                      <p className="text-xs font-bold text-foreground group-hover:text-white transition-colors leading-snug w-full text-center truncate px-1">
                        {action.label}
                      </p>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => handleRemove(action.id)}
                        className="mt-1 text-[10px] font-semibold text-muted-foreground hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove shortcut"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}

                {/* Available empty placeholder slots if < 12 */}
                {Array.from({ length: Math.max(0, MAX_SHORTCUTS - activeShortcutObjects.length) }).map((_, emptyIdx) => {
                  const slotNum = activeShortcutObjects.length + emptyIdx + 1;
                  return (
                    <div
                      key={`empty-${emptyIdx}`}
                      className="p-3 rounded-lg border border-dashed border-border/60 bg-[#0e0e0e]/50 flex flex-col items-center justify-center text-center select-none min-h-[108px] text-muted-foreground/60 space-y-1"
                    >
                      <div className="h-8 w-8 rounded-md border border-dashed border-border/60 flex items-center justify-center text-xs font-mono font-bold">
                        {slotNum}
                      </div>
                      <span className="text-[10px] font-semibold">Available Slot</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </VFCard>
        </div>

      </div>
    </VFPageContainer>
  );
}
