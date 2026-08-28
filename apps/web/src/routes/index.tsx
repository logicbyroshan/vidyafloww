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
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { schoolProfile } = useGlobalStore();
  const [notice, setNotice] = React.useState<string | null>(null);

  // 12 Quick Action navigation shortcuts
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

  return (
    <VFPageContainer className="space-y-3.5 sm:space-y-4">
      {/* Dynamic Action Toast / Notice Banner */}
      {notice && (
        <div className="bg-primary/10 border border-primary/30 text-foreground px-3.5 py-2.5 rounded-md flex items-center justify-between text-sm shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
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

      {/* 1. Top Full-Width KPI Metric Hub — Clean Big Card without Top Header Bar & Clean Stat Numbers */}
      <div className="rounded-lg border border-border/80 bg-[#121215] p-3 sm:p-3.5 shadow-xs shrink-0 relative overflow-hidden">
        {/* Top Highlight Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-transparent z-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-3.5">
          <VFStatCard
            title="Total Students"
            value="2,451"
            icon={<Users className="h-5.5 w-5.5 text-blue-400" />}
            trend="up"
            trendLabel="+12 this month"
            accentColor="none"
            showTopBar={false}
            className="bg-[#09090b] border-border/80 hover:border-blue-500/40"
          />
          <VFStatCard
            title="Teaching Staff"
            value="98.2%"
            icon={<GraduationCap className="h-5.5 w-5.5 text-blue-400" />}
            trend="up"
            trendLabel="Optimal coverage"
            accentColor="none"
            showTopBar={false}
            className="bg-[#09090b] border-border/80 hover:border-blue-500/40"
          />
          <VFStatCard
            title="Today's Attendance"
            value="94.5%"
            icon={<CalendarCheck className="h-5.5 w-5.5 text-blue-400" />}
            trend="up"
            trendLabel="+1.2% vs yesterday"
            accentColor="none"
            showTopBar={false}
            className="bg-[#09090b] border-border/80 hover:border-blue-500/40"
          />
          <VFStatCard
            title="Pending Admissions"
            value="28"
            icon={<FileText className="h-5.5 w-5.5 text-blue-400" />}
            trend="neutral"
            trendLabel="18 auto-verified"
            accentColor="none"
            showTopBar={false}
            className="bg-[#09090b] border-border/80 hover:border-blue-500/40"
          />
        </div>
      </div>

      {/* 2. Main Split Layout: Left Absence Trackers + Right Quick Action Launchpad & License Card */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3.5 sm:gap-4 items-start">
        
        {/* LEFT COLUMN: Teacher & Student Absences Command Center */}
        <div className="space-y-3.5 sm:space-y-4 min-w-0">
          
          {/* Today's Teacher Absences & Substitute Duty Assignment */}
          <VFCard
            title="Faculty Absences & Proxy Roster"
            description="4 Absent Today · 100% Substitute Coverage"
            accentColor="amber"
            className="h-[460px]"
            bodyClassName="p-4 sm:p-5"
            actions={<VFBadge variant="warning" className="text-xs font-bold">{facultyAbsences.length} Records</VFBadge>}
          >
            <div className="h-full overflow-y-auto no-scrollbar space-y-3">
              {facultyAbsences.map((t, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-3.5 rounded-md border border-border/80 bg-[#09090b] hover:bg-black hover:border-amber-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-md bg-amber-500/15 text-amber-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
                      {t.teacher.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-foreground truncate">{t.teacher}</p>
                      <p className="text-[11px] text-muted-foreground font-medium truncate">{t.dept}</p>
                    </div>
                  </div>

                  {/* Center: Leave Reason */}
                  <div className="text-left sm:text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {t.reason}
                    </span>
                  </div>

                  {/* Right: Proxy arrangement */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 text-right">
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-bold text-emerald-400 flex items-center sm:justify-end gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {t.proxy}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">{t.slot}</p>
                    </div>
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs"
                      onClick={() => setNotice(`Reassigned proxy for ${t.teacher}`)}
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
            accentColor="rose"
            className="h-[460px]"
            bodyClassName="p-4 sm:p-5"
            actions={<VFBadge variant="danger" className="text-xs font-bold">{studentExceptions.length} Alerts</VFBadge>}
          >
            <div className="h-full overflow-y-auto no-scrollbar space-y-3">
              {studentExceptions.map((s, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-3.5 rounded-md border border-border/80 bg-[#09090b] hover:bg-black hover:border-rose-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-md bg-rose-500/15 text-rose-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-rose-500/30">
                      {s.student.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-foreground truncate">{s.student}</p>
                        <span className="text-[11px] font-mono text-muted-foreground">{s.class}</span>
                      </div>
                      <p className={cn(
                        "text-[11px] font-bold mt-0.5 truncate",
                        s.severity === 'danger' ? 'text-rose-400' : s.severity === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                      )}>
                        {s.alert}
                      </p>
                    </div>
                  </div>

                  <VFButton
                    size="sm"
                    variant={s.severity === 'danger' ? 'danger' : 'outline'}
                    className="h-8 px-3 text-xs shrink-0 self-end sm:self-center"
                    onClick={() => setNotice(`Executed: ${s.action} for ${s.student}`)}
                  >
                    {s.action}
                  </VFButton>
                </div>
              ))}
            </div>
          </VFCard>
        </div>

        {/* RIGHT COLUMN: Quick Action Section Card + Unified License & Quotas Card */}
        <div className="space-y-3.5 sm:space-y-4 min-w-0">
          
          {/* Quick Action Command Shortcuts Card */}
          <VFCard
            title="Quick Action Command Shortcuts"
            accentColor="indigo"
            className="h-[460px]"
            bodyClassName="p-4 sm:p-5"
          >
            <div className="h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 content-stretch">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={idx}
                    to={action.route}
                    className="p-2.5 rounded-md border border-border/80 bg-[#09090b] hover:bg-black hover:border-indigo-500/50 transition-all duration-200 flex flex-col items-center justify-center text-center group shadow-xs select-none h-full min-h-[92px] relative overflow-hidden"
                  >
                    <div className="h-9 w-9 rounded-md flex items-center justify-center border border-indigo-500/30 bg-indigo-500/15 text-indigo-400 mb-1.5 group-hover:scale-105 group-hover:bg-indigo-500/25 transition-all shrink-0 shadow-xs">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-indigo-400 transition-colors leading-snug w-full text-center truncate px-1">
                      {action.label}
                    </p>
                  </Link>
                );
              })}
            </div>
          </VFCard>

          {/* Software License & Monthly Token Quotas Hub — Unified Single Card (h-[460px]) */}
          <div className="rounded-lg border border-border/80 bg-[#121215] shadow-xs h-[460px] flex flex-col justify-between relative overflow-hidden">
            {/* Top Highlight Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent z-10" />

            {/* Header with Emerald Gradient Accent */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/80 bg-gradient-to-r from-emerald-500/18 via-emerald-500/6 to-transparent shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-foreground truncate">{schoolProfile.name}</h4>
                    <VFBadge variant="success" className="text-xs font-bold">Active</VFBadge>
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

            {/* Dark Grey Body with Solid Black Sub-Cards — Spacious & Balanced Distribution */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4 min-h-0">
              {/* 1. License Primary KPI Tiles (Solid Black bg-[#09090b]) */}
              <div className="grid grid-cols-3 gap-3 shrink-0">
                <div className="p-3 rounded-md bg-[#09090b] border border-border/80 text-center shadow-xs hover:border-emerald-500/30 transition-all">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Validity</span>
                  <p className="text-base sm:text-lg font-black text-emerald-400 whitespace-nowrap mt-0.5">225 Days</p>
                  <p className="text-[11px] text-muted-foreground font-semibold">Mar 2027</p>
                </div>

                <div className="p-3 rounded-md bg-[#09090b] border border-border/80 text-center shadow-xs hover:border-emerald-500/30 transition-all">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Capacity</span>
                  <p className="text-base sm:text-lg font-black text-foreground whitespace-nowrap mt-0.5">1,248</p>
                  <p className="text-[11px] text-emerald-400 font-bold">50% Enrolled</p>
                </div>

                <div className="p-3 rounded-md bg-[#09090b] border border-border/80 text-center shadow-xs hover:border-emerald-500/30 transition-all">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Security</span>
                  <p className="text-base sm:text-lg font-black text-foreground whitespace-nowrap mt-0.5">AES-256</p>
                  <p className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <Server className="h-3 w-3" /> Online
                  </p>
                </div>
              </div>

              {/* 2. Monthly Gateway & Token Quotas — Full-Height Spacious Box with Sleek Thinner Progress Bars */}
              <div className="flex-1 min-h-0 p-3.5 sm:p-4 rounded-md bg-[#09090b] border border-border/80 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2.5 border-b border-border/50 shrink-0">
                  <span className="text-foreground text-xs uppercase tracking-wider font-extrabold flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 text-emerald-400" />
                    Monthly Quotas & Gateway Balances
                  </span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Resets Sep 1
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-around py-1.5 space-y-3.5">
                  {/* WhatsApp Messages */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-foreground">
                        <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                        WhatsApp Broadcast Messages
                      </span>
                      <span className="font-mono text-xs text-emerald-400 font-bold">
                        8,450 <span className="text-muted-foreground font-normal">/ 10,000 (84.5%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-border/70 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300" style={{ width: '84.5%' }} />
                    </div>
                  </div>

                  {/* SMS Messages */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-foreground">
                        <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                        SMS Gateway Dispatches
                      </span>
                      <span className="font-mono text-xs text-emerald-400 font-bold">
                        24,200 <span className="text-muted-foreground font-normal">/ 30,000 (80.6%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-border/70 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300" style={{ width: '80.6%' }} />
                    </div>
                  </div>

                  {/* AI Compute Tokens */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        AI & OCR Compute Tokens
                      </span>
                      <span className="font-mono text-xs text-emerald-400 font-bold">
                        412,500 <span className="text-muted-foreground font-normal">/ 500,000 (82.5%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-border/70 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300" style={{ width: '82.5%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </VFPageContainer>
  );
}
