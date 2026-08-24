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
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { schoolProfile } = useGlobalStore();
  const [notice, setNotice] = React.useState<string | null>(null);

  // 12 Quick Action navigation shortcuts (Square boxes on the right) with unified Indigo section theme
  const quickActions = [
    { label: 'Attendance', desc: 'Daily roll call', route: '/attendance', icon: CalendarCheck },
    { label: 'Admissions', desc: 'Intake pipeline', route: '/admissions', icon: UserPlus },
    { label: 'Students', desc: '360° directory', route: '/students', icon: GraduationCap },
    { label: 'Teachers', desc: 'Faculty load', route: '/staff', icon: Users },
    { label: 'Timetable', desc: 'Periods & proxy', route: '/timetable', icon: Calendar },
    { label: 'Fees', desc: 'Dues & receipts', route: '/fees', icon: CreditCard },
    { label: 'Notices', desc: 'Circular board', route: '/notices', icon: Bell },
    { label: 'Homework', desc: 'Assignments', route: '/homework', icon: BookOpen },
    { label: 'Exams', desc: 'Marks & grades', route: '/examinations', icon: ClipboardList },
    { label: 'Academics', desc: 'Grade structure', route: '/academics', icon: School },
    { label: 'Reports', desc: 'CBSE & RTE audit', route: '/reports', icon: FileSpreadsheet },
    { label: 'Settings', desc: 'School branding', route: '/settings', icon: Settings },
  ];

  return (
    <VFPageContainer className="p-4 sm:p-5 flex-1 flex flex-col min-h-0 space-y-5 animate-fade-in custom-scrollbar overflow-y-auto">
      {notice && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-sm text-foreground flex items-center justify-between animate-fade-in shrink-0">
          <div className="flex items-center gap-3">
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

      {/* 1. Top Full-Width KPI Metric Cards — Unified Sky Blue Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 shrink-0">
        <VFStatCard
          title="Total Students"
          value="2,451"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel="+12 this month"
          accentColor="blue"
        />
        <VFStatCard
          title="Teaching Staff"
          value="98.2%"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Optimal coverage"
          accentColor="blue"
        />
        <VFStatCard
          title="Today's Attendance"
          value="94.5%"
          icon={<CalendarCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="+1.2% vs yesterday"
          accentColor="blue"
        />
        <VFStatCard
          title="Pending Admissions"
          value="28"
          icon={<FileText className="h-5 w-5" />}
          trend="neutral"
          trendLabel="18 auto-verified"
          accentColor="blue"
        />
      </div>

      {/* 2. Main Split Layout: Left Absence Trackers + Right Quick Action Launchpad & License Card */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5 sm:gap-6 items-start">
        
        {/* LEFT COLUMN: Teacher & Student Absences Command Center */}
        <div className="space-y-5 min-w-0">
          {/* Today's Teacher Absences & Substitute Duty Assignment */}
          <VFCard
            title="Faculty Absences & Proxy Roster"
            description="4 Absent Today · 100% Substitute Coverage"
            className="border-amber-500/25 bg-gradient-to-br from-amber-500/8 via-card to-card"
            actions={<VFBadge variant="warning" className="text-xs font-bold">4 On Leave</VFBadge>}
          >
            <div className="space-y-3 pt-1">
              {[
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
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-3.5 sm:p-4 rounded-xl border border-border/80 bg-background/50 hover:bg-background/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  {/* Left: Teacher info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
                      {t.teacher.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-foreground text-sm truncate">{t.teacher}</p>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold shrink-0">
                          {t.reason}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">
                        {t.dept}
                      </p>
                    </div>
                  </div>

                  {/* Right: Proxy teacher and Reassign */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                    <div className="text-left sm:text-right">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 sm:justify-end">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        <span>{t.proxy}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-semibold">{t.slot}</p>
                    </div>
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs font-bold"
                      onClick={() => setNotice(`Substitute proxy updated for ${t.teacher}.`)}
                    >
                      Reassign
                    </VFButton>
                  </div>
                </div>
              ))}
            </div>
          </VFCard>

          {/* Today's Student Absences & Flagged Attendance */}
          <VFCard
            title="Student Attendance Exceptions & Alerts"
            description="68 Pupils Absent Today · 94.5% Net Attendance"
            className="border-rose-500/25 bg-gradient-to-br from-rose-500/8 via-card to-card"
            actions={<VFBadge variant="danger" className="text-xs font-bold">4 Alerts</VFBadge>}
          >
            <div className="space-y-3 pt-1">
              {[
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
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-3.5 sm:p-4 rounded-xl border border-border/80 bg-background/50 hover:bg-background/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-rose-500/15 text-rose-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-rose-500/30">
                      {s.student.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-foreground text-sm truncate">{s.student}</p>
                        <span className="text-xs text-muted-foreground font-semibold">
                          {s.class}
                        </span>
                      </div>
                      <p className={cn(
                        "text-xs font-semibold mt-0.5 truncate",
                        s.severity === 'danger' && 'text-rose-400',
                        s.severity === 'warning' && 'text-amber-400',
                        s.severity === 'neutral' && 'text-emerald-400'
                      )}>
                        {s.alert}
                      </p>
                    </div>
                  </div>

                  <VFButton
                    size="sm"
                    variant={s.severity === 'danger' ? 'danger' : 'outline'}
                    className="h-8 px-3.5 text-xs font-bold shrink-0 self-end sm:self-center"
                    onClick={() => setNotice(`Action "${s.action}" executed for ${s.student}.`)}
                  >
                    {s.action}
                  </VFButton>
                </div>
              ))}
            </div>
          </VFCard>
        </div>

        {/* RIGHT COLUMN: Quick Action Section Card + Software License Card */}
        <div className="space-y-5 min-w-0">
          
          {/* Quick Action Command Shortcuts Card — Unified Indigo Section Theme */}
          <VFCard
            title="Quick Action Command Shortcuts"
            description="1-Click direct launch into school administrative modules"
            className="border-indigo-500/25 bg-gradient-to-br from-indigo-500/8 via-card to-card"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={idx}
                    to={action.route}
                    className="p-3 rounded-xl border border-indigo-500/25 bg-gradient-to-b from-indigo-500/10 via-card to-card hover:border-indigo-400/60 hover:from-indigo-500/20 hover:shadow-indigo-500/10 transition-all duration-200 flex flex-col items-center justify-center text-center group shadow-xs select-none min-h-[96px] relative overflow-hidden"
                  >
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center border border-indigo-500/30 bg-indigo-500/15 text-indigo-400 mb-2 group-hover:scale-110 group-hover:bg-indigo-500/25 transition-all shrink-0 shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-indigo-400 transition-colors leading-snug w-full text-center truncate px-1">
                      {action.label}
                    </p>
                  </Link>
                );
              })}
            </div>
          </VFCard>

          {/* Software License & Subscription Card — Unified Emerald Section Theme */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-500/10 via-card to-card border border-emerald-500/30 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-foreground truncate">{schoolProfile.name}</h4>
                    <VFBadge variant="success">Active</VFBadge>
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold truncate mt-0.5">
                    {schoolProfile.affiliation}
                  </p>
                </div>
              </div>

              <Link to="/settings" className="shrink-0 ml-2">
                <VFButton size="sm" variant="outline" leftIcon={<Key className="h-3 w-3" />}>
                  Manage
                </VFButton>
              </Link>
            </div>

            {/* License Sub-Boxes */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Validity</span>
                <p className="text-base font-black text-emerald-400 whitespace-nowrap">225 Days</p>
                <p className="text-[10px] text-muted-foreground font-semibold">Mar 2027</p>
              </div>

              <div className="p-2.5 rounded-xl bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Capacity</span>
                <p className="text-base font-black text-foreground whitespace-nowrap">1,248</p>
                <p className="text-[10px] text-primary font-bold">50% Enrolled</p>
              </div>

              <div className="p-2.5 rounded-xl bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Security</span>
                <p className="text-base font-black text-foreground whitespace-nowrap">AES-256</p>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-0.5">
                  <Server className="h-3 w-3" /> Online
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </VFPageContainer>
  );
}
