import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFCard,
  VFButton,
  cn,
} from '@vidyafloww/ui';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
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
  glowColor: string;
}

// 20 Fixed Modules organized in a strict 5 × 4 grid layout with authentic transparent 3D icons from 3dicons.co
const FIXED_20_SHORTCUTS: ShortcutAction[] = [
  {
    id: 'students',
    label: 'Students',
    hindiLabel: 'स्टूडेंट डायरेक्टरी',
    desc: 'Directory & Profiles',
    hindiDesc: 'डॉक्यूमेंट्स & प्रोफाइल्स',
    route: '/students',
    iconSrc: '/icons/3d/students.png?v=5',
    glowColor: 'rgba(217, 119, 6, 0.06)',
  },
  {
    id: 'admissions',
    label: 'Admissions',
    hindiLabel: 'न्यू एडमिशन्स',
    desc: 'Intake & Verification',
    hindiDesc: 'एडमिशन & वेरिफिकेशन',
    route: '/admissions',
    iconSrc: '/icons/3d/admissions.png?v=5',
    glowColor: 'rgba(225, 29, 72, 0.06)',
  },
  {
    id: 'attendance',
    label: 'Attendance',
    hindiLabel: 'डेली अटेंडेंस',
    desc: 'Roll Call & Biometrics',
    hindiDesc: 'बायोमेट्रिक & रजिस्टर',
    route: '/attendance',
    iconSrc: '/icons/3d/attendance.png?v=5',
    glowColor: 'rgba(239, 68, 68, 0.06)',
  },
  {
    id: 'fees',
    label: 'Payments',
    hindiLabel: 'फीस & पेमेंट्स',
    desc: 'Dues & Receipts',
    hindiDesc: 'फीस ड्यूज & रसीदें',
    route: '/fees',
    iconSrc: '/icons/3d/fees.png?v=5',
    glowColor: 'rgba(190, 24, 93, 0.06)',
  },
  {
    id: 'teachers',
    label: 'Teachers',
    hindiLabel: 'टीचर्स & फैकल्टी',
    desc: 'Faculty & Roster',
    hindiDesc: 'वर्कलोड & रोस्टर',
    route: '/teachers',
    iconSrc: '/icons/3d/teachers.png?v=5',
    glowColor: 'rgba(219, 39, 119, 0.06)',
  },
  {
    id: 'timetable',
    label: 'Timetable',
    hindiLabel: 'टाइमटेबल',
    desc: 'Schedules & Periods',
    hindiDesc: 'शेड्यूल्स & पीरियड्स',
    route: '/timetable',
    iconSrc: '/icons/3d/timetable.png?v=5',
    glowColor: 'rgba(234, 88, 12, 0.06)',
  },
  {
    id: 'academics',
    label: 'Academics',
    hindiLabel: 'अकादमिक्स',
    desc: 'Curriculum & Classes',
    hindiDesc: 'करिकुलम & क्लासेज',
    route: '/academics',
    iconSrc: '/icons/3d/academics.png?v=5',
    glowColor: 'rgba(59, 130, 246, 0.06)',
  },
  {
    id: 'homework',
    label: 'Homework',
    hindiLabel: 'होमवर्क',
    desc: 'Assignments & Review',
    hindiDesc: 'असाइनमेंट्स & रिव्यू',
    route: '/homework',
    iconSrc: '/icons/3d/homework.png?v=5',
    glowColor: 'rgba(217, 119, 6, 0.06)',
  },
  {
    id: 'elibrary',
    label: 'E-Library',
    hindiLabel: 'ई-लाइब्रेरी',
    desc: 'Digital Books & NCERT',
    hindiDesc: 'डिजिटल बुक्स & NCERT',
    route: '/elibrary',
    iconSrc: '/icons/3d/elibrary.png?v=5',
    glowColor: 'rgba(147, 51, 234, 0.06)',
  },
  {
    id: 'examinations',
    label: 'Examinations',
    hindiLabel: 'एग्जाम्स & रिजल्ट्स',
    desc: 'Marks & Report Cards',
    hindiDesc: 'मार्क्स & रिपोर्ट कार्ड्स',
    route: '/examinations',
    iconSrc: '/icons/3d/examinations.png?v=5',
    glowColor: 'rgba(225, 29, 72, 0.06)',
  },
  {
    id: 'notices',
    label: 'Notices',
    hindiLabel: 'नोटिसेज & सर्कुलर्स',
    desc: 'Campus Broadcasts',
    hindiDesc: 'कैंपस ब्रॉडकास्ट्स',
    route: '/notices',
    iconSrc: '/icons/3d/notices.png?v=5',
    glowColor: 'rgba(234, 88, 12, 0.06)',
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    hindiLabel: 'स्कॉलरशिप्स',
    desc: 'Merit & Concessions',
    hindiDesc: 'मेरिट & कन्सेशन्स',
    route: '/scholarships',
    iconSrc: '/icons/3d/scholarships.png?v=5',
    glowColor: 'rgba(202, 138, 4, 0.06)',
  },
  {
    id: 'reports',
    label: 'Reports',
    hindiLabel: 'रिपोर्ट्स',
    desc: 'Analytics & Audits',
    hindiDesc: 'एनालिटिक्स & ऑडिट्स',
    route: '/reports',
    iconSrc: '/icons/3d/reports.png?v=5',
    glowColor: 'rgba(225, 29, 72, 0.06)',
  },
  {
    id: 'settings',
    label: 'Settings',
    hindiLabel: 'सेटिंग्स',
    desc: 'System & Branding',
    hindiDesc: 'सिस्टम & ब्रांडिंग',
    route: '/settings',
    iconSrc: '/icons/3d/settings.png?v=5',
    glowColor: 'rgba(244, 63, 94, 0.06)',
  },
  {
    id: 'statistics',
    label: 'Statistics',
    hindiLabel: 'स्टैटिस्टिक्स & एनालिटिक्स',
    desc: 'Analytics & Insights',
    hindiDesc: 'एनालिटिक्स & इनसाइट्स',
    route: '/statistics',
    iconSrc: '/icons/3d/statistics.png?v=5',
    glowColor: 'rgba(168, 85, 247, 0.06)',
  },
  {
    id: 'audit',
    label: 'Audit Log',
    hindiLabel: 'ऑडिट लॉग',
    desc: 'Activity & Audit Trail',
    hindiDesc: 'एक्टिविटी & ऑडिट ट्रेल',
    route: '/audit',
    iconSrc: '/icons/3d/audit.png?v=5',
    glowColor: 'rgba(99, 102, 241, 0.06)',
  },
  {
    id: 'security',
    label: 'Security',
    hindiLabel: 'सिक्योरिटी मैनेजमेंट',
    desc: 'Access & Permissions',
    hindiDesc: 'एक्सेस & परमिशन्स',
    route: '/security',
    iconSrc: '/icons/3d/security.png?v=5',
    glowColor: 'rgba(16, 185, 129, 0.06)',
  },
  {
    id: 'portal',
    label: 'Parent Portal',
    hindiLabel: 'पैरेंट पोर्टल',
    desc: 'Guardian Access Hub',
    hindiDesc: 'गार्जियन एक्सेस हब',
    route: '/portal',
    iconSrc: '/icons/3d/portal.png?v=5',
    glowColor: 'rgba(6, 182, 212, 0.06)',
  },
  {
    id: 'resources',
    label: 'Resources',
    hindiLabel: 'रिसोर्सेज',
    desc: 'Learning Materials',
    hindiDesc: 'लर्निंग मटेरियल्स',
    route: '/resources',
    iconSrc: '/icons/3d/resources.png?v=5',
    glowColor: 'rgba(217, 119, 6, 0.06)',
  },
];

// Clean, prominent 3D Icon Component with authentic transparent renders from 3dicons.co
function ThreeDIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex items-center justify-center shrink-0 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.30)] transition-transform duration-200 ease-out group-hover/shortcut:-translate-y-1 group-hover/shortcut:scale-105 pointer-events-none select-none"
        loading="lazy"
      />
    </div>
  );
}

export function DashboardPage() {
  const {
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
    {
      student: 'Aditya Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      class: 'Class 10-A · Roll #09',
      alert: 'Unexcused Half-Day Departure',
      severity: 'danger',
      action: 'Parent Alerted',
    },
    {
      student: 'Rhea Chawla',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
      class: 'Class 12-Com · Roll #17',
      alert: 'Medical Certificate Verification Pending',
      severity: 'warning',
      action: 'Request Slip',
    },
    {
      student: 'Tanvi Mehta',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      class: 'Class 9-A · Roll #11',
      alert: 'Repeated Bus Route 2 Delay (09:20 AM)',
      severity: 'warning',
      action: 'Driver Alerted',
    },
    {
      student: 'Arjun Rao',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
      class: 'Class 8-B · Roll #24',
      alert: '4th Consecutive Unreported Absence',
      severity: 'danger',
      action: 'Send SMS',
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

    // 1. Student Attendance Exceptions Section — clean natural list without internal scrollbar
    if (sectionId === 'student_attendance') {
      return (
        <div key="student_attendance" {...getSectionWrapperProps("w-full flex flex-col")}>
          <VFCard
            title={t('attendance.studentTab')}
            headerClassName="py-2.5 px-3.5 sm:px-4"
            className="rounded-[4px] border-border/80 bg-card shadow-xs flex flex-col"
            bodyClassName="p-3.5 sm:p-4 flex flex-col"
            actions={
              <Link to="/attendance">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="h-8 px-2.5 text-xs font-bold bg-[#141414] hover:bg-[#1f1f1f] text-foreground border-border cursor-pointer shadow-xs rounded-[4px]"
                  leftIcon={<SlidersHorizontal className="h-3.5 w-3.5 text-foreground" />}
                >
                  {isHindi ? 'व्यू ऑल' : 'View All'}
                </VFButton>
              </Link>
            }
          >
            <div className="space-y-2.5">
              {studentExceptions.slice(0, 6).map((s, i) => (
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
                {isHindi ? 'डैशबोर्ड कस्टमाइजेशन मोड एक्टिव' : 'Dashboard Customization Mode Active'}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isHindi ? 'कार्ड पोजीशन चेंज करने के लिए कॉर्नर ड्रैग कंट्रोल यूज़ करें।' : 'Use the corner arrow controls on any KPI card to rearrange their position.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                resetDashboardSectionOrder();
                resetDashboardKpiOrder();
                addNotification({ title: isHindi ? 'डैशबोर्ड रीसेट' : 'Dashboard Reset', description: isHindi ? 'डैशबोर्ड डिफ़ॉल्ट लेआउट पर रीसेट हुआ।' : 'Dashboard layout reset to default configuration.', type: 'info' });
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
              {isHindi ? 'डन' : 'Done Customizing'}
            </VFButton>
          </div>
        </div>
      )}

      {/* 1. Top Full-Width KPI Metric Hub */}
      <div className="rounded-[4px] border border-border/80 bg-card p-4 shadow-xs shrink-0 relative overflow-hidden group/kpihub">
        {/* Subtle ambient glow on Top KPI Metric Hub */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-60 group-hover/kpihub:opacity-90 z-0"
          style={{
            background: 'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(234, 88, 12, 0.025) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {currentKpis.map((kpiId, index) => renderKpiCard(kpiId, index))}
        </div>
      </div>

      {/* 2 + 3. Main Content: Quick Actions (60%) + Student Attendance (40%) */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">

        {/* LEFT: Quick Actions Hub — 60% width, 5 × 4 = 20 square box modules (sole height driver) */}
        <div className="w-full lg:w-[60%] flex-[60] min-w-0">
          <VFCard
            title={isHindi ? 'क्विक एक्शंस हब (Quick Actions)' : 'Quick Management Actions'}
            headerClassName="py-2.5 px-3.5 sm:px-4"
            className="border-border/80 bg-card shadow-xs rounded-[4px]"
            bodyClassName="p-2.5 sm:p-3"
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
            <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
              {FIXED_20_SHORTCUTS.map((action) => (
                <Link
                  key={action.id}
                  to={action.route}
                  className="aspect-square relative overflow-hidden p-2 sm:p-2.5 rounded-[4px] border border-border/75 bg-[#121212] hover:bg-[#171717] hover:border-border transition-all duration-200 flex flex-col items-center justify-between text-center group/shortcut shadow-xs hover:shadow-md cursor-pointer"
                >
                  {/* Subtle dark ambient glow inside card matching icon's color */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-35 group-hover/shortcut:opacity-70"
                    style={{
                      background: `radial-gradient(circle at 50% 32%, ${action.glowColor} 0%, rgba(18, 18, 18, 0) 55%)`,
                    }}
                  />

                  {/* Relative container for Icon so it floats above the ambient glow */}
                  <div className="relative z-1 flex-1 flex items-center justify-center w-full my-auto">
                    <ThreeDIcon src={action.iconSrc} alt={action.label} />
                  </div>

                  {/* Text footer */}
                  <div className="relative z-1 w-full pt-1">
                    <p className="text-[11.5px] sm:text-xs font-extrabold text-foreground group-hover/shortcut:text-primary transition-colors leading-tight truncate px-0.5">
                      {isHindi ? action.hindiLabel : action.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-medium mt-0.5 truncate px-0.5">
                      {isHindi ? action.hindiDesc : action.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </VFCard>
        </div>

        {/* RIGHT: Student Attendance — 40% width, natural flow matching page scroll */}
        <div className="w-full lg:w-[40%] flex-[40] min-w-0 flex flex-col">
          {renderSectionCard('student_attendance', 0)}
        </div>

      </div>
    </VFPageContainer>
  );
}
