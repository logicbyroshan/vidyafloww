import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFBadge,
  VFCard,
  VFButton,
  cn,
} from '@vidyamaxx/ui';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  CreditCard,
  Bell,
  FileSpreadsheet,
  Settings,
  Calendar,
  UserPlus,
  Key,
  Server,
  ClipboardList,
  School,
  MessageSquare,
  Smartphone,
  Sparkles,
  Activity,
  SlidersHorizontal,
  Laptop,
  BookOpenCheck,
  BarChart3,
  RotateCcw,
  Check,
  LayoutGrid,
} from 'lucide-react';

// 2×2 (4-dot) compact Grip Icon for ultra-minimal corner placement
function Grip2x2({ className }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className={className}>
      <circle cx="2.5" cy="2.5" r="1.1" />
      <circle cx="7.5" cy="2.5" r="1.1" />
      <circle cx="2.5" cy="7.5" r="1.1" />
      <circle cx="7.5" cy="7.5" r="1.1" />
    </svg>
  );
}
import {
  useGlobalStore,
  DEFAULT_DASHBOARD_SHORTCUTS,
  DEFAULT_DASHBOARD_SECTIONS,
  DEFAULT_DASHBOARD_KPIS,
} from '../stores/globalStore';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

export interface ShortcutAction {
  id: string;
  label: string;
  desc: string;
  route: string;
  icon: any;
  category: string;
}

// Master pool of all 18 configurable institutional shortcuts
const ALL_SHORTCUT_ACTIONS: ShortcutAction[] = [
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
  { id: 'statistics', label: 'Statistics', desc: 'Institutional telemetry & demographics', route: '/statistics', icon: BarChart3, category: 'Analytics' },
  { id: 'reports', label: 'Reports', desc: 'CBSE, RTE compliance & export audit', route: '/reports', icon: FileSpreadsheet, category: 'Operations' },
  { id: 'settings', label: 'Settings', desc: 'School branding, logos & AY session', route: '/settings', icon: Settings, category: 'System' },
  { id: 'lms', label: 'E-Learning', desc: 'Digital courses & lesson library', route: '/lms', icon: Laptop, category: 'Academic' },
  { id: 'resources', label: 'Library', desc: 'Resource catalog & book registers', route: '/resources', icon: BookOpenCheck, category: 'Operations' },
  { id: 'portal', label: 'Parent Portal', desc: 'Guardian access & communications', route: '/portal', icon: Smartphone, category: 'Communication' },
];

function DashboardPage() {
  const {
    schoolProfile,
    dashboardShortcuts,
    dashboardSectionOrder,
    setDashboardSectionOrder,
    resetDashboardSectionOrder,
    dashboardKpiOrder,
    setDashboardKpiOrder,
    resetDashboardKpiOrder,
    isDashboardEditMode,
    setDashboardEditMode,
  } = useGlobalStore();

  const [notice, setNotice] = React.useState<string | null>(null);

  // Active shortcut items
  const activeShortcuts = React.useMemo(() => {
    const ids = dashboardShortcuts && dashboardShortcuts.length > 0 ? dashboardShortcuts : DEFAULT_DASHBOARD_SHORTCUTS;
    return ids
      .map((id) => ALL_SHORTCUT_ACTIONS.find((a) => a.id === id))
      .filter((a): a is ShortcutAction => Boolean(a));
  }, [dashboardShortcuts]);

  // Section order array
  const currentSections = React.useMemo(() => {
    return dashboardSectionOrder && dashboardSectionOrder.length === 4
      ? dashboardSectionOrder
      : DEFAULT_DASHBOARD_SECTIONS;
  }, [dashboardSectionOrder]);

  // KPI order array
  const currentKpis = React.useMemo(() => {
    return dashboardKpiOrder && dashboardKpiOrder.length === 4
      ? dashboardKpiOrder
      : DEFAULT_DASHBOARD_KPIS;
  }, [dashboardKpiOrder]);

  // Drag and drop states for dashboard customization
  const [draggedKpiIdx, setDraggedKpiIdx] = React.useState<number | null>(null);
  const [draggedSectionIdx, setDraggedSectionIdx] = React.useState<number | null>(null);
  const [dragOverKpiIdx, setDragOverKpiIdx] = React.useState<number | null>(null);
  const [dragOverSectionIdx, setDragOverSectionIdx] = React.useState<number | null>(null);

  // Swap sections handler (click cycles forward, drag drops onto target)
  const handleSwapSections = (fromIndex: number, toIndex?: number) => {
    const target = toIndex !== undefined ? toIndex : (fromIndex + 1) % currentSections.length;
    if (fromIndex === target) return;

    const nextOrder = [...currentSections];
    const temp = nextOrder[fromIndex];
    nextOrder[fromIndex] = nextOrder[target];
    nextOrder[target] = temp;
    setDashboardSectionOrder(nextOrder);
  };

  // Swap KPIs handler (click cycles forward, drag drops onto target)
  const handleSwapKpi = (fromIndex: number, toIndex?: number) => {
    const target = toIndex !== undefined ? toIndex : (fromIndex + 1) % currentKpis.length;
    if (fromIndex === target) return;

    const nextOrder = [...currentKpis];
    const temp = nextOrder[fromIndex];
    nextOrder[fromIndex] = nextOrder[target];
    nextOrder[target] = temp;
    setDashboardKpiOrder(nextOrder);
  };

  // Faculty absence roster items
  const facultyAbsences = [
    {
      teacher: 'Dr. Rajesh Sharma',
      dept: 'Physics · Senior HOD',
      reason: 'Medical Leave',
      proxy: 'Mr. Arvind Gupta',
      slot: 'Period 3 (Lab 204)',
    },
    {
      teacher: 'Ms. Pooja Rao',
      dept: 'English Literature',
      reason: 'Casual Leave',
      proxy: 'Mrs. S. Joshi',
      slot: 'Period 5 (Room 101)',
    },
    {
      teacher: 'Mr. Deepak Mishra',
      dept: 'Hindi Department',
      reason: 'Board Seminar',
      proxy: 'Mr. R. Verma',
      slot: 'Period 2 (Room 102)',
    },
    {
      teacher: 'Coach Vikram Singh',
      dept: 'Physical Education',
      reason: 'Morning Duty',
      proxy: 'Sports Squad',
      slot: 'Period 6 (Ground)',
    },
    {
      teacher: 'Mrs. Ananya Sen',
      dept: 'Mathematics · Dept Head',
      reason: 'Official Workshop',
      proxy: 'Mr. K. Nambiar',
      slot: 'Period 4 (Room 302)',
    },
  ];

  // Student exceptions items
  const studentExceptions = [
    {
      student: 'Priya Patel',
      class: 'Class 10-A · Roll #18',
      alert: '3rd Consecutive Absence (Uninformed)',
      severity: 'danger',
      action: 'WhatsApp Alert',
    },
    {
      student: 'Sneha Singh',
      class: 'Class 11-Sci · Roll #04',
      alert: 'Bus Route 4 Delayed (09:15 AM Arrival)',
      severity: 'warning',
      action: 'Issue Gate Pass',
    },
    {
      student: 'Amit Patel',
      class: 'Class 8-A · Roll #29',
      alert: 'Uninformed Absenteeism (No Note)',
      severity: 'danger',
      action: 'Send SMS',
    },
    {
      student: 'Kavya Nair',
      class: 'Class 11-Com · Roll #12',
      alert: 'Medical Leave (Aug 18 – Aug 19)',
      severity: 'neutral',
      action: 'Leave Approved',
    },
    {
      student: 'Rohan Deshmukh',
      class: 'Class 9-B · Roll #31',
      alert: 'Late Gate Entry (3rd time this week)',
      severity: 'warning',
      action: 'Notify Parent',
    },
  ];

  // Render individual KPI Card with sleek corner move handle
  const renderKpiCard = (kpiId: string, index: number) => {
    let kpiProps: any = {};
    if (kpiId === 'students') {
      kpiProps = {
        title: 'Total Students',
        value: '2,451',
        icon: <Users className="h-5.5 w-5.5 text-foreground" />,
        trend: 'up',
        trendLabel: '+12 this month',
      };
    } else if (kpiId === 'staff') {
      kpiProps = {
        title: 'Teaching Staff',
        value: '98.2%',
        icon: <GraduationCap className="h-5.5 w-5.5 text-foreground" />,
        trend: 'up',
        trendLabel: 'Optimal coverage',
      };
    } else if (kpiId === 'attendance') {
      kpiProps = {
        title: "Today's Attendance",
        value: '94.5%',
        icon: <CalendarCheck className="h-5.5 w-5.5 text-foreground" />,
        trend: 'up',
        trendLabel: '+1.2% vs yesterday',
      };
    } else if (kpiId === 'admissions') {
      kpiProps = {
        title: 'Pending Admissions',
        value: '28',
        icon: <FileText className="h-5.5 w-5.5 text-foreground" />,
        trend: 'neutral',
        trendLabel: '18 auto-verified',
      };
    }

    return (
      <div
        key={kpiId}
        className={cn(
          "relative group transition-all duration-200",
          dragOverKpiIdx === index && "ring-2 ring-primary/60 rounded-lg scale-[0.99]",
          draggedKpiIdx === index && "opacity-40"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          if (draggedKpiIdx !== null && draggedKpiIdx !== index) {
            setDragOverKpiIdx(index);
          }
        }}
        onDragLeave={() => {
          setDragOverKpiIdx(null);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragOverKpiIdx(null);
          if (draggedKpiIdx !== null && draggedKpiIdx !== index) {
            handleSwapKpi(draggedKpiIdx, index);
            setDraggedKpiIdx(null);
          }
        }}
      >
        <VFStatCard
          {...kpiProps}
          accentColor="none"
          showTopBar={false}
          className="bg-[#1a1a1a] border-border/80 hover:bg-[#222222] hover:border-blue-500/40"
        />

        {/* Corner move handle — 2×2 4-dot icon in the extreme top-right corner, ONLY visible when Configure Dashboard is active */}
        {isDashboardEditMode && (
          <div className="absolute top-1 right-1 z-30 transition-all duration-150 animate-in fade-in zoom-in-95">
            <button
              type="button"
              draggable
              onDragStart={(e) => {
                setDraggedKpiIdx(index);
                e.dataTransfer.setData('text/plain', `kpi-${index}`);
              }}
              onDragEnd={() => {
                setDraggedKpiIdx(null);
                setDragOverKpiIdx(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleSwapKpi(index);
              }}
              className="p-0.5 rounded text-muted-foreground/50 hover:text-primary hover:bg-[#252525] transition-all cursor-grab active:cursor-grabbing block"
              title="Click or Drag to move KPI card"
            >
              <Grip2x2 className="h-2.5 w-2.5" />
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render individual Section Card
  const renderSectionCard = (sectionId: string, index: number) => {
    // 2×2 4-dot Grip icon — in the extreme top-right corner, 0 extra padding, ONLY visible when Configure Dashboard is active
    const cornerHandle = isDashboardEditMode ? (
      <div className="absolute top-1 right-1 z-30 transition-all duration-150 animate-in fade-in zoom-in-95">
        <button
          type="button"
          draggable
          onDragStart={(e) => {
            setDraggedSectionIdx(index);
            e.dataTransfer.setData('text/plain', `section-${index}`);
          }}
          onDragEnd={() => {
            setDraggedSectionIdx(null);
            setDragOverSectionIdx(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSwapSections(index);
          }}
          className="p-0.5 rounded text-muted-foreground/50 hover:text-primary hover:bg-[#252525] transition-all cursor-grab active:cursor-grabbing block"
          title="Click or Drag to move section card"
        >
          <Grip2x2 className="h-3 w-3" />
        </button>
      </div>
    ) : null;

    const sectionWrapperProps = {
      className: cn(
        "relative group transition-all duration-200",
        dragOverSectionIdx === index && "ring-2 ring-primary/60 rounded-lg scale-[0.99]",
        draggedSectionIdx === index && "opacity-40"
      ),
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedSectionIdx !== null && draggedSectionIdx !== index) {
          setDragOverSectionIdx(index);
        }
      },
      onDragLeave: () => {
        setDragOverSectionIdx(null);
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        setDragOverSectionIdx(null);
        if (draggedSectionIdx !== null && draggedSectionIdx !== index) {
          handleSwapSections(draggedSectionIdx, index);
          setDraggedSectionIdx(null);
        }
      },
    };

    // 1. Teacher Attendance Section
    if (sectionId === 'teacher_attendance') {
      return (
        <div key="teacher_attendance" {...sectionWrapperProps}>
          <VFCard
            title="Teacher Attendance"
            description="4 Absent Today · 100% Substitute Coverage"
            className="h-[460px]"
            bodyClassName="p-4"
            actions={
              <VFBadge variant="warning" className="text-xs font-bold">{facultyAbsences.length} Records</VFBadge>
            }
          >
            <div className="h-full overflow-y-auto no-scrollbar space-y-3">
              {facultyAbsences.map((t, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-md border border-border/80 bg-[#1a1a1a] hover:bg-[#222222] hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 shadow-xs"
                >
                  {/* Left: Avatar + Name + Leave Badge + Dept */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="h-9 w-9 rounded-md bg-amber-500/15 text-amber-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
                      {t.teacher.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs sm:text-sm font-bold text-foreground truncate">{t.teacher}</p>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                          {t.reason}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium truncate mt-0.5">{t.dept}</p>
                    </div>
                  </div>

                  {/* Right: Proxy arrangement + Reassign button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {t.proxy}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{t.slot}</p>
                    </div>
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-xs bg-[#141414] hover:bg-[#1f1f1f] border-border text-foreground font-semibold"
                      onClick={() => setNotice(`Reassigned proxy for ${t.teacher}`)}
                    >
                      Reassign
                    </VFButton>
                  </div>
                </div>
              ))}
            </div>
          </VFCard>
          {cornerHandle}
        </div>
      );
    }

    // 2. Student Attendance Section
    if (sectionId === 'student_attendance') {
      return (
        <div key="student_attendance" {...sectionWrapperProps}>
          <VFCard
            title="Student Attendance"
            description="68 Pupils Absent Today · 94.5% Net Attendance"
            className="h-[460px]"
            bodyClassName="p-4"
            actions={
              <VFBadge variant="danger" className="text-xs font-bold">{studentExceptions.length} Alerts</VFBadge>
            }
          >
            <div className="h-full overflow-y-auto no-scrollbar space-y-3">
              {studentExceptions.map((s, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-md border border-border/80 bg-[#1a1a1a] hover:bg-[#222222] hover:border-rose-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-md bg-rose-500/15 text-rose-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-rose-500/30">
                      {s.student.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-foreground truncate">{s.student}</p>
                        <span className="text-[11px] font-mono text-muted-foreground">{s.class}</span>
                      </div>
                      <p
                        className={cn(
                          "text-[11px] font-bold mt-0.5 truncate",
                          s.severity === 'danger' ? 'text-rose-400' : s.severity === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                        )}
                      >
                        {s.alert}
                      </p>
                    </div>
                  </div>

                  <VFButton
                    size="sm"
                    variant={s.severity === 'danger' ? 'danger' : 'outline'}
                    className={cn(
                      "h-8 px-3 text-xs shrink-0 self-end sm:self-center",
                      s.severity !== 'danger' && "bg-[#141414] hover:bg-[#1f1f1f]"
                    )}
                    onClick={() => setNotice(`Executed: ${s.action} for ${s.student}`)}
                  >
                    {s.action}
                  </VFButton>
                </div>
              ))}
            </div>
          </VFCard>
          {cornerHandle}
        </div>
      );
    }

    // 3. Quick Shortcuts Section
    if (sectionId === 'quick_shortcuts') {
      return (
        <div key="quick_shortcuts" {...sectionWrapperProps}>
          <VFCard
            title="Quick Shortcuts"
            description={`${activeShortcuts.length} of ${ALL_SHORTCUT_ACTIONS.length} Shortcuts Active`}
            className="h-[460px]"
            bodyClassName="p-4"
            actions={
              <Link to="/shortcuts">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="h-8 px-2.5 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border cursor-pointer shadow-xs"
                  leftIcon={<SlidersHorizontal className="h-3.5 w-3.5 text-foreground" />}
                >
                  Configure
                </VFButton>
              </Link>
            }
          >
            <div className="h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 content-stretch overflow-y-auto no-scrollbar">
              {activeShortcuts.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={idx}
                    to={action.route}
                    className="p-3 rounded-md border border-border/80 bg-[#1a1a1a] hover:bg-[#222222] hover:border-[#383838] transition-all duration-200 flex flex-col items-center justify-center text-center group/shortcut shadow-xs select-none h-full min-h-[96px] relative overflow-hidden"
                  >
                    <div className="h-9 w-9 rounded-md flex items-center justify-center border border-border/80 bg-[#222222] text-foreground mb-1.5 group-hover/shortcut:scale-105 group-hover/shortcut:bg-[#2c2c2c] group-hover/shortcut:border-[#444444] transition-all shrink-0 shadow-xs">
                      <Icon className="h-4.5 w-4.5 text-foreground" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-foreground group-hover/shortcut:text-white transition-colors leading-snug w-full text-center truncate px-1">
                      {action.label}
                    </p>
                  </Link>
                );
              })}
            </div>
          </VFCard>
          {cornerHandle}
        </div>
      );
    }

    // 4. License Details Section
    if (sectionId === 'license_details') {
      return (
        <div key="license_details" {...sectionWrapperProps}>
          <VFCard
            title={
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-base font-extrabold text-foreground truncate">License Details</span>
                <VFBadge variant="success" className="text-[10px] font-bold py-0 px-1.5 h-4.5">Active</VFBadge>
              </div>
            }
            description={`${schoolProfile.name} · ${schoolProfile.affiliation}`}
            className="h-[460px]"
            bodyClassName="p-4 flex flex-col gap-3 min-h-0"
            actions={
              <Link to="/license">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] border-border cursor-pointer"
                  leftIcon={<Key className="h-3.5 w-3.5" />}
                >
                  Manage
                </VFButton>
              </Link>
            }
          >
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/80 text-center shadow-xs hover:bg-[#222222] hover:border-emerald-500/30 transition-all">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Validity</span>
                <p className="text-base sm:text-lg font-black text-emerald-400 whitespace-nowrap mt-0.5">225 Days</p>
                <p className="text-[11px] text-muted-foreground font-semibold">Mar 2027</p>
              </div>

              <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/80 text-center shadow-xs hover:bg-[#222222] hover:border-emerald-500/30 transition-all">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Capacity</span>
                <p className="text-base sm:text-lg font-black text-foreground whitespace-nowrap mt-0.5">1,248</p>
                <p className="text-[11px] text-emerald-400 font-bold">50% Enrolled</p>
              </div>

              <div className="p-3 rounded-md bg-[#1a1a1a] border border-border/80 text-center shadow-xs hover:bg-[#222222] hover:border-emerald-500/30 transition-all">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Security</span>
                <p className="text-base sm:text-lg font-black text-foreground whitespace-nowrap mt-0.5">AES-256</p>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <Server className="h-3 w-3" /> Online
                </p>
              </div>
            </div>

            {/* 2. Monthly Gateway & Token Quotas (Consistent gap-3 matching) */}
            <div className="flex-1 min-h-0 p-3.5 rounded-md bg-[#1a1a1a] border border-border/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-border/50 shrink-0">
                <span className="text-foreground text-xs uppercase tracking-wider font-extrabold flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                  Monthly Quotas & Gateway Balances
                </span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  Resets Sep 1
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-around py-1 space-y-3">
                {/* WhatsApp Messages */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                      WhatsApp Broadcast Messages
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      8,450 <span className="text-muted-foreground font-normal">/ 10,000 (84.5%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#262626] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300" style={{ width: '84.5%' }} />
                  </div>
                </div>

                {/* SMS Messages */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                      SMS Gateway Dispatches
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      24,200 <span className="text-muted-foreground font-normal">/ 30,000 (80.6%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#262626] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300" style={{ width: '80.6%' }} />
                  </div>
                </div>

                {/* AI Compute Tokens */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      AI & OCR Compute Tokens
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      412,500 <span className="text-muted-foreground font-normal">/ 500,000 (82.5%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#262626] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300" style={{ width: '82.5%' }} />
                  </div>
                </div>
              </div>
            </div>
          </VFCard>
          {cornerHandle}
        </div>
      );
    }

    return null;
  };

  return (
    <VFPageContainer className="space-y-4">
      {/* Configure Dashboard Banner (Visible when isDashboardEditMode is ON) */}
      {isDashboardEditMode && (
        <div className="p-4 rounded-lg border border-primary/50 bg-[#161616] text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary/15 text-primary border border-primary/30 flex items-center justify-center shrink-0">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-foreground">Dashboard Customization Mode Active</p>
              <p className="text-[11px] text-muted-foreground">
                Use the corner arrow controls on any KPI card or section card to rearrange their position.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                resetDashboardSectionOrder();
                resetDashboardKpiOrder();
                setNotice('Reset dashboard layout to default configuration.');
              }}
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border bg-[#121212] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Layout
            </button>
            <VFButton
              size="sm"
              onClick={() => setDashboardEditMode(false)}
              className="h-8 px-3.5 text-xs font-bold"
              leftIcon={<Check className="h-3.5 w-3.5" />}
            >
              Done Customizing
            </VFButton>
          </div>
        </div>
      )}

      {/* Dynamic Action Toast / Notice Banner */}
      {notice && (
        <div className="bg-primary/10 border border-primary/30 text-foreground px-4 py-3 rounded-md flex items-center justify-between text-sm shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Top Full-Width KPI Metric Hub — outer p-4, inner gap-4 (Level 1 → Level 2) */}
      <div className="rounded-lg border border-border/80 bg-card p-4 shadow-xs shrink-0 relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {currentKpis.map((kpiId, index) => renderKpiCard(kpiId, index))}
        </div>
      </div>

      {/* 2. Main 2×2 Section Grid — outer gap-4 matching Level 1 spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {currentSections.map((sectionId, index) => renderSectionCard(sectionId, index))}
      </div>
    </VFPageContainer>
  );
}
