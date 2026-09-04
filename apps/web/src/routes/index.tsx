import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFBadge,
  VFCard,
  VFButton,
  cn,
} from '@vidyafloww/ui';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  ShieldCheck,
  Key,
  Server,
  MessageSquare,
  Smartphone,
  Sparkles,
  Activity,
  SlidersHorizontal,
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
  DEFAULT_DASHBOARD_SECTIONS,
  DEFAULT_DASHBOARD_KPIS,
} from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

export interface ShortcutAction {
  id: string;
  label: string;
  hindiLabel: string;
  desc: string;
  hindiDesc: string;
  route: string;
  iconSrc: string;
}

// 20 Fixed Modules organized in a strict 4 × 5 grid layout with authentic transparent 3D icons from 3dicons.co
const FIXED_20_SHORTCUTS: ShortcutAction[] = [
  {
    id: 'students',
    label: 'Students',
    hindiLabel: 'छात्र निर्देशिका',
    desc: 'Directory & Profiles',
    hindiDesc: 'दस्तावेज व प्रोफाइल',
    route: '/students',
    iconSrc: '/icons/3d/students.png?v=5',
  },
  {
    id: 'admissions',
    label: 'Admissions',
    hindiLabel: 'नए प्रवेश',
    desc: 'Intake & Verification',
    hindiDesc: 'प्रवेश व सत्यापन',
    route: '/admissions',
    iconSrc: '/icons/3d/admissions.png?v=5',
  },
  {
    id: 'attendance',
    label: 'Attendance',
    hindiLabel: 'दैनिक उपस्थिति',
    desc: 'Roll Call & Biometrics',
    hindiDesc: 'बायोमेट्रिक व रजिस्टर',
    route: '/attendance',
    iconSrc: '/icons/3d/attendance.png?v=5',
  },
  {
    id: 'fees',
    label: 'Payments',
    hindiLabel: 'शुल्क व भुगतान',
    desc: 'Dues & Receipts',
    hindiDesc: 'शुल्क व रसीदें',
    route: '/fees',
    iconSrc: '/icons/3d/fees.png?v=5',
  },
  {
    id: 'teachers',
    label: 'Teachers',
    hindiLabel: 'शिक्षक व स्टाफ',
    desc: 'Faculty & Roster',
    hindiDesc: 'कार्यभार व रोस्टर',
    route: '/teachers',
    iconSrc: '/icons/3d/teachers.png?v=5',
  },
  {
    id: 'timetable',
    label: 'Timetable',
    hindiLabel: 'समय सारणी',
    desc: 'Schedules & Periods',
    hindiDesc: 'पीरियड्स व रूटीन',
    route: '/timetable',
    iconSrc: '/icons/3d/timetable.png?v=5',
  },
  {
    id: 'academics',
    label: 'Academics',
    hindiLabel: 'अकादमिक्स',
    desc: 'Curriculum & Classes',
    hindiDesc: 'कक्षा पाठ्यक्रम',
    route: '/academics',
    iconSrc: '/icons/3d/academics.png?v=5',
  },
  {
    id: 'homework',
    label: 'Homework',
    hindiLabel: 'गृहकार्य',
    desc: 'Assignments & Review',
    hindiDesc: 'असाइनमेंट व जांच',
    route: '/homework',
    iconSrc: '/icons/3d/homework.png?v=5',
  },
  {
    id: 'elibrary',
    label: 'E-Library',
    hindiLabel: 'ई-लाइब्रेरी',
    desc: 'Digital Books & NCERT',
    hindiDesc: 'डिजिटल पाठ्यपुस्तकें',
    route: '/elibrary',
    iconSrc: '/icons/3d/elibrary.png?v=5',
  },
  {
    id: 'examinations',
    label: 'Examinations',
    hindiLabel: 'परीक्षाएं व अंक',
    desc: 'Marks & Report Cards',
    hindiDesc: 'मार्कशीट व परिणाम',
    route: '/examinations',
    iconSrc: '/icons/3d/examinations.png?v=5',
  },
  {
    id: 'notices',
    label: 'Notices',
    hindiLabel: 'नोटिस व परिपत्र',
    desc: 'Campus Broadcasts',
    hindiDesc: 'घोषणाएं व संदेश',
    route: '/notices',
    iconSrc: '/icons/3d/notices.png?v=5',
  },
  {
    id: 'salary',
    label: 'Staff Salary',
    hindiLabel: 'वेतन प्रबंधन',
    desc: 'Payroll & Payslips',
    hindiDesc: 'पेरोल व वेतन पर्ची',
    route: '/salary',
    iconSrc: '/icons/3d/salary.png?v=5',
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    hindiLabel: 'छात्रवृत्ति',
    desc: 'Merit & Concessions',
    hindiDesc: 'फीस छूट व अनुदान',
    route: '/scholarships',
    iconSrc: '/icons/3d/scholarships.png?v=5',
  },
  {
    id: 'reports',
    label: 'Reports',
    hindiLabel: 'रिपोर्ट्स',
    desc: 'Analytics & Audits',
    hindiDesc: 'विश्लेषण व ऑडिट',
    route: '/reports',
    iconSrc: '/icons/3d/reports.png?v=5',
  },
  {
    id: 'settings',
    label: 'Settings',
    hindiLabel: 'सेटिंग्स',
    desc: 'System & Branding',
    hindiDesc: 'सत्र व विन्यास',
    route: '/settings',
    iconSrc: '/icons/3d/settings.png?v=5',
  },
  {
    id: 'statistics',
    label: 'Statistics',
    hindiLabel: 'आँकड़े व विश्लेषण',
    desc: 'Analytics & Insights',
    hindiDesc: 'रिपोर्ट व विश्लेषण',
    route: '/statistics',
    iconSrc: '/icons/3d/statistics.png?v=5',
  },
  {
    id: 'audit',
    label: 'Audit Log',
    hindiLabel: 'ऑडिट लॉग',
    desc: 'Activity & Audit Trail',
    hindiDesc: 'गतिविधि इतिहास',
    route: '/audit',
    iconSrc: '/icons/3d/audit.png?v=5',
  },
  {
    id: 'security',
    label: 'Security',
    hindiLabel: 'सुरक्षा प्रबंधन',
    desc: 'Access & Permissions',
    hindiDesc: 'पहुंच व अनुमतियां',
    route: '/security',
    iconSrc: '/icons/3d/security.png?v=5',
  },
  {
    id: 'portal',
    label: 'Parent Portal',
    hindiLabel: 'पालक पोर्टल',
    desc: 'Guardian Access Hub',
    hindiDesc: 'अभिभावक पहुंच',
    route: '/portal',
    iconSrc: '/icons/3d/portal.png?v=5',
  },
  {
    id: 'resources',
    label: 'Resources',
    hindiLabel: 'संसाधन भंडार',
    desc: 'Learning Materials',
    hindiDesc: 'शिक्षण सामग्री',
    route: '/resources',
    iconSrc: '/icons/3d/resources.png?v=5',
  },
];

// Clean, prominent 3D Icon Component — authentic transparent renders from 3dicons.co without any background or glow
function ThreeDIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex items-center justify-center shrink-0 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-200 ease-out group-hover/shortcut:-translate-y-1 group-hover/shortcut:scale-105 pointer-events-none select-none"
        loading="lazy"
      />
    </div>
  );
}

export function DashboardPage() {
  const {
    schoolProfile,
    dashboardSectionOrder,
    setDashboardSectionOrder,
    resetDashboardSectionOrder,
    addNotification,
    dashboardKpiOrder,
    setDashboardKpiOrder,
    resetDashboardKpiOrder,
    isDashboardEditMode,
    setDashboardEditMode,
  } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';
  React.useEffect(() => { document.title = t('page.dashboard') + ' \u2013 VidyaFloww'; }, [t]);

  // Section order array (excluding teacher_attendance & quick_shortcuts which is full-width)
  const currentSections = React.useMemo(() => {
    return dashboardSectionOrder && dashboardSectionOrder.length > 0
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

  // Swap sections handler
  const handleSwapSections = (fromIndex: number, toIndex?: number) => {
    const target = toIndex !== undefined ? toIndex : (fromIndex + 1) % currentSections.length;
    if (fromIndex === target) return;

    const nextOrder = [...currentSections];
    const temp = nextOrder[fromIndex];
    nextOrder[fromIndex] = nextOrder[target];
    nextOrder[target] = temp;
    setDashboardSectionOrder(nextOrder);
  };

  // Swap KPIs handler
  const handleSwapKpi = (fromIndex: number, toIndex?: number) => {
    const target = toIndex !== undefined ? toIndex : (fromIndex + 1) % currentKpis.length;
    if (fromIndex === target) return;

    const nextOrder = [...currentKpis];
    const temp = nextOrder[fromIndex];
    nextOrder[fromIndex] = nextOrder[target];
    nextOrder[target] = temp;
    setDashboardKpiOrder(nextOrder);
  };

  // Student exceptions items with photo avatars
  const studentExceptions = [
    {
      student: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      class: 'Class 10-A · Roll #18',
      alert: '3rd Consecutive Absence (Uninformed)',
      severity: 'danger',
      action: 'WhatsApp Alert',
    },
    {
      student: 'Sneha Singh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      class: 'Class 11-Sci · Roll #04',
      alert: 'Bus Route 4 Delayed (09:15 AM Arrival)',
      severity: 'warning',
      action: 'Issue Gate Pass',
    },
    {
      student: 'Amit Patel',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      class: 'Class 8-A · Roll #29',
      alert: 'Uninformed Absenteeism (No Note)',
      severity: 'danger',
      action: 'Send SMS',
    },
    {
      student: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      class: 'Class 12-Sci · Roll #02',
      alert: 'Early Gate Exit (Doctor Appointment)',
      severity: 'warning',
      action: 'Gate Pass Active',
    },
    {
      student: 'Kavya Nair',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      class: 'Class 11-Com · Roll #12',
      alert: 'Medical Leave (Aug 18 – Aug 19)',
      severity: 'neutral',
      action: 'Leave Approved',
    },
    {
      student: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      class: 'Class 9-B · Roll #31',
      alert: 'Late Gate Entry (3rd time this week)',
      severity: 'warning',
      action: 'Notify Parent',
    },
    {
      student: 'Ananya Joshi',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
      class: 'Class 7-C · Roll #15',
      alert: 'Infirmary Check-in (Mild Fever)',
      severity: 'warning',
      action: 'Call Parent',
    },
    {
      student: 'Vikramaditya Roy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      class: 'Class 10-B · Roll #22',
      alert: 'Unexcused Absence (2nd Day)',
      severity: 'danger',
      action: 'SMS Broadcast',
    },
  ];

  // Render individual KPI Card with sleek corner move handle
  const renderKpiCard = (kpiId: string, index: number) => {
    let kpiProps: any = {};
    if (kpiId === 'students') {
      kpiProps = {
        title: t('dashboard.totalStudents'),
        value: '2,451',
        icon: <Users className="h-5.5 w-5.5 text-foreground" />,
        trend: 'up',
        trendLabel: '+12 this month',
      };
    } else if (kpiId === 'staff' || kpiId === 'teachers') {
      kpiProps = {
        title: t('dashboard.totalTeachers'),
        value: '98.2%',
        icon: <GraduationCap className="h-5.5 w-5.5 text-foreground" />,
        trend: 'up',
        trendLabel: 'Optimal coverage',
      };
    } else if (kpiId === 'attendance') {
      kpiProps = {
        title: t('dashboard.todayAttendance'),
        value: '94.5%',
        icon: <CalendarCheck className="h-5.5 w-5.5 text-foreground" />,
        trend: 'up',
        trendLabel: '+1.2% vs yesterday',
      };
    } else if (kpiId === 'admissions') {
      kpiProps = {
        title: t('dashboard.newAdmissions'),
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
          dragOverKpiIdx === index && "ring-2 ring-primary/60 rounded-[4px] scale-[0.99]",
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
          className="bg-[#1a1a1a] border-border/80 hover:bg-[#222222] hover:border-blue-500/40 rounded-[4px]"
        />

        {/* Corner move handle — ONLY visible when Configure Dashboard is active */}
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
              className="p-0.5 rounded-[3px] text-muted-foreground/50 hover:text-primary hover:bg-[#252525] transition-all cursor-grab active:cursor-grabbing block"
              title="Click or Drag to move KPI card"
            >
              <Grip2x2 className="h-2.5 w-2.5" />
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render individual Section Card (Student attendance or License details)
  const renderSectionCard = (sectionId: string, index: number) => {
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
          className="p-0.5 rounded-[3px] text-muted-foreground/50 hover:text-primary hover:bg-[#252525] transition-all cursor-grab active:cursor-grabbing block"
          title="Click or Drag to move section card"
        >
          <Grip2x2 className="h-3 w-3" />
        </button>
      </div>
    ) : null;

    const getSectionWrapperProps = (extraClasses?: string) => ({
      className: cn(
        "relative group transition-all duration-200",
        dragOverSectionIdx === index && "ring-2 ring-primary/60 rounded-[4px] scale-[0.99]",
        draggedSectionIdx === index && "opacity-40",
        extraClasses
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
    });

    // 1. Student Attendance Exceptions Section — expands and gains height based on available vertical space
    if (sectionId === 'student_attendance') {
      return (
        <div key="student_attendance" {...getSectionWrapperProps("flex-1 min-h-0 flex flex-col")}>
          <VFCard
            title={t('attendance.studentTab')}
            description={isHindi ? "68 छात्र आज अनुपस्थित · 94.5% शुद्ध उपस्थिति" : "68 Pupils Absent Today · 94.5% Net Attendance"}
            className="flex-1 h-full min-h-0 rounded-[4px] border-border/80 bg-card shadow-xs flex flex-col"
            bodyClassName="p-4 flex-1 min-h-0 flex flex-col"
            actions={
              <VFBadge variant="danger" className="text-xs font-bold rounded-[3px]">{studentExceptions.length} {isHindi ? 'अलर्ट्स' : 'Alerts'}</VFBadge>
            }
          >
            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2.5 pr-1">
              {studentExceptions.map((s, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-[4px] border border-border/80 bg-[#1a1a1a] hover:bg-[#222222] hover:border-rose-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs shrink-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={s.avatar}
                      alt={s.student}
                      className="h-8 w-8 rounded-[4px] object-cover shrink-0 border border-border/80 shadow-xs"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs sm:text-[13px] font-bold text-foreground truncate">{s.student}</p>
                        <span className="text-[10.5px] font-mono text-muted-foreground">{s.class}</span>
                      </div>
                      <p
                        className={cn(
                          "text-[10.5px] font-bold mt-0.5 truncate",
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
                      "h-7 px-2.5 text-xs shrink-0 self-end sm:self-center rounded-[4px]",
                      s.severity !== 'danger' && "bg-[#141414] hover:bg-[#1f1f1f]"
                    )}
                    onClick={() => addNotification({ title: 'Action Executed', description: `${s.action} for ${s.student}.`, type: 'info' })}
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

    // 2. License Details & Quotas Section — cleanly anchored at the bottom of the right column
    if (sectionId === 'license_details') {
      return (
        <div key="license_details" {...getSectionWrapperProps("shrink-0")}>
          <VFCard
            title={
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-[4px] bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-base font-extrabold text-foreground truncate">{t('nav.license')}</span>
                <VFBadge variant="success" className="text-[10px] font-bold py-0 px-1.5 h-4.5 rounded-[3px]">{t('status.active')}</VFBadge>
              </div>
            }
            description={`${schoolProfile.name} · ${schoolProfile.affiliation}`}
            className="rounded-[4px] border-border/80 bg-card shadow-xs shrink-0"
            bodyClassName="p-4 flex flex-col gap-3 min-h-0 shrink-0"
            actions={
              <Link to="/license">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] border-border cursor-pointer rounded-[4px]"
                  leftIcon={<Key className="h-3.5 w-3.5" />}
                >
                  {t('action.edit')}
                </VFButton>
              </Link>
            }
          >
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="p-3 rounded-[4px] bg-[#1a1a1a] border border-border/80 text-center shadow-xs hover:bg-[#222222] hover:border-emerald-500/30 transition-all">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Validity</span>
                <p className="text-base sm:text-lg font-black text-emerald-400 whitespace-nowrap mt-0.5">225 Days</p>
                <p className="text-[11px] text-muted-foreground font-semibold">Mar 2027</p>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1a1a1a] border border-border/80 text-center shadow-xs hover:bg-[#222222] hover:border-emerald-500/30 transition-all">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Capacity</span>
                <p className="text-base sm:text-lg font-black text-foreground whitespace-nowrap mt-0.5">1,248</p>
                <p className="text-[11px] text-emerald-400 font-bold">50% Enrolled</p>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1a1a1a] border border-border/80 text-center shadow-xs hover:bg-[#222222] hover:border-emerald-500/30 transition-all">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Security</span>
                <p className="text-base sm:text-lg font-black text-foreground whitespace-nowrap mt-0.5">AES-256</p>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <Server className="h-3 w-3" /> Online
                </p>
              </div>
            </div>

            {/* Monthly Gateway & Token Quotas */}
            <div className="flex-1 min-h-0 p-3.5 rounded-[4px] bg-[#1a1a1a] border border-border/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-border/50 shrink-0">
                <span className="text-foreground text-xs uppercase tracking-wider font-extrabold flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                  Monthly Quotas & Gateway Balances
                </span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded-[3px] border border-emerald-500/20">
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
                      {isHindi ? 'SMS गेटवे डिस्पैच' : 'SMS Gateway Dispatches'}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      24,200 <span className="text-muted-foreground font-normal">/ 30,000 (80.6%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#262626] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300" style={{ width: '80.6%' }} />
                  </div>
                </div>

                {/* Cloud Sync & Processing Tokens */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      {isHindi ? 'क्लाउड सिंक व प्रोसेसिंग टोकन' : 'Cloud Sync & Processing Tokens'}
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
        <div className="p-4 rounded-[4px] border border-primary/50 bg-[#161616] text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-[4px] bg-primary/15 text-primary border border-primary/30 flex items-center justify-center shrink-0">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {isHindi ? 'डैशबोर्ड कस्टमाइजेशन मोड सक्रिय' : 'Dashboard Customization Mode Active'}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isHindi ? 'कार्ड की स्थिति बदलने के लिए कोने के ड्रैग कंट्रोल का उपयोग करें।' : 'Use the corner arrow controls on any KPI card to rearrange their position.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                resetDashboardSectionOrder();
                resetDashboardKpiOrder();
                addNotification({ title: isHindi ? 'डैशबोर्ड रीसेट' : 'Dashboard Reset', description: isHindi ? 'डैशबोर्ड डिफ़ॉल्ट लेआउट पर रीसेट किया गया।' : 'Dashboard layout reset to default configuration.', type: 'info' });
              }}
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2.5 py-1.5 rounded-[3px] border border-border bg-[#121212] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {isHindi ? 'लेआउट रीसेट करें' : 'Reset Layout'}
            </button>
            <VFButton
              size="sm"
              onClick={() => setDashboardEditMode(false)}
              className="h-8 px-3.5 text-xs font-bold rounded-[4px]"
              leftIcon={<Check className="h-3.5 w-3.5" />}
            >
              {isHindi ? 'पूरा हुआ' : 'Done Customizing'}
            </VFButton>
          </div>
        </div>
      )}

      {/* 1. Top Full-Width KPI Metric Hub */}
      <div className="rounded-[4px] border border-border/80 bg-card p-4 shadow-xs shrink-0 relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {currentKpis.map((kpiId, index) => renderKpiCard(kpiId, index))}
        </div>
      </div>

      {/* 2 + 3. Main Content: Quick Actions (60%) + Right Column (40%) */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">

        {/* LEFT: Quick Actions Hub — 60% width, 4 × 5 = 20 fixed modules */}
        <div className="w-full lg:w-[60%] flex-[60] min-w-0 flex flex-col">
          <VFCard
            title={
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-foreground">
                  {isHindi ? 'त्वरित प्रबंधन कार्य (Quick Actions)' : 'Quick Management Actions'}
                </span>
                <VFBadge variant="outline" className="text-[10px] font-mono font-bold py-0 px-2 h-5 rounded-[3px]">
                  20 Modules (4 × 5)
                </VFBadge>
              </div>
            }
            description={isHindi ? '20 प्रमुख प्रशासनिक एवं शैक्षणिक कार्यप्रणाली' : '20 Fixed Core Operational & Academic Management Modules'}
            className="flex-1 h-full border-border/80 bg-card shadow-xs rounded-[4px]"
            bodyClassName="p-3 sm:p-3.5 flex-1 flex flex-col justify-between"
            actions={
              <Link to="/shortcuts">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="h-8 px-2.5 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border cursor-pointer shadow-xs rounded-[4px]"
                  leftIcon={<SlidersHorizontal className="h-3.5 w-3.5 text-foreground" />}
                >
                  {t('action.edit')}
                </VFButton>
              </Link>
            }
          >
            <div className="grid grid-cols-4 gap-2.5">
              {FIXED_20_SHORTCUTS.map((action) => (
                <Link
                  key={action.id}
                  to={action.route}
                  className="p-2 sm:p-2.5 rounded-[4px] border border-border/75 bg-[#141414] hover:bg-[#1c1c1c] hover:border-primary/50 transition-all duration-200 flex flex-col items-center justify-between text-center group/shortcut shadow-xs hover:shadow-md min-h-[114px] sm:min-h-[122px] cursor-pointer"
                >
                  <div className="flex-1 flex items-center justify-center w-full my-auto">
                    <ThreeDIcon src={action.iconSrc} alt={action.label} />
                  </div>
                  <div className="w-full pt-1">
                    <p className="text-xs sm:text-[13px] font-extrabold text-foreground group-hover/shortcut:text-primary transition-colors leading-tight truncate px-1">
                      {isHindi ? action.hindiLabel : action.label}
                    </p>
                    <p className="text-[10.5px] text-muted-foreground font-medium mt-0.5 truncate px-1">
                      {isHindi ? action.hindiDesc : action.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </VFCard>
        </div>

        {/* RIGHT: Student Attendance (expands to fill height) + License (fixed at bottom) — 40% width */}
        <div className="w-full lg:w-[40%] flex-[40] min-w-0 flex flex-col gap-4">
          {renderSectionCard('student_attendance', 0)}
          {renderSectionCard('license_details', 1)}
        </div>

      </div>
    </VFPageContainer>
  );
}
