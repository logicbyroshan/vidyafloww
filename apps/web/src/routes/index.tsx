import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFBadge,
  VFTabs,
  VFCard,
  VFAreaChart,
  VFBarChart,
  VFPieChart,
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
  Clock,
  BookOpen,
  Award,
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

  // 1. MAIN TAB: Command Hub
  const quickHubContent = (
    <div className="space-y-4">
      {notice && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Top Full-Width KPI Metric Cards — Unified Sky Blue Theme */}
      <div className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-5 sm:gap-6">
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

      {/* 2. Main Split Layout: Left Absence Trackers (50%) + Right Quick Action Square Grid & License Card (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-start overflow-hidden pt-1">
        
        {/* LEFT COLUMN: Teacher & Student Absences Command Center (50% width) */}
        <div className="space-y-6 min-w-0">
          {/* Today's Teacher Absences & Substitute Duty Assignment */}
          <VFCard
            title="Faculty Absences & Proxy Roster"
            description="4 Absent Today · 100% Substitute Coverage"
            className="border-amber-500/25 bg-gradient-to-br from-amber-500/8 via-card to-card"
            actions={<VFBadge variant="warning" className="text-xs">4 On Leave</VFBadge>}
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
                  className="p-3 rounded-lg border border-border/80 bg-background/50 hover:bg-background/80 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-amber-500/15 text-amber-400 font-black text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
                      {t.teacher.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-foreground text-sm truncate">{t.teacher}</p>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold shrink-0">
                          {t.reason}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">
                        {t.dept}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                        {t.proxy}
                      </div>
                      <p className="text-[11px] text-muted-foreground font-medium">{t.slot}</p>
                    </div>
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="h-8 px-2.5 text-xs"
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
            actions={<VFBadge variant="danger" className="text-xs">4 Alerts</VFBadge>}
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
                  className="p-3 rounded-lg border border-border/80 bg-background/50 hover:bg-background/80 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-rose-500/15 text-rose-400 font-black text-xs flex items-center justify-center shrink-0 border border-rose-500/30">
                      {s.student.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-foreground text-sm truncate">{s.student}</p>
                        <span className="text-[10px] text-muted-foreground font-semibold truncate hidden sm:inline">
                          {s.class}
                        </span>
                      </div>
                      <p className={cn(
                        "text-xs font-semibold truncate mt-0.5",
                        s.severity === 'danger' && 'text-destructive',
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
                    className="h-8 px-2.5 text-xs shrink-0"
                    onClick={() => setNotice(`Action "${s.action}" executed for ${s.student}.`)}
                  >
                    {s.action}
                  </VFButton>
                </div>
              ))}
            </div>
          </VFCard>
        </div>

        {/* RIGHT COLUMN: Quick Action Section Card 4×3 + Software License Card Below It (50% width) */}
        <div className="space-y-6 min-w-0">
          
          {/* Quick Action Command Shortcuts Card — Unified Indigo Section Theme */}
          <VFCard
            title="Quick Action Command Shortcuts"
            description="1-Click direct launch into school administrative modules"
            className="border-indigo-500/25 bg-gradient-to-br from-indigo-500/8 via-card to-card"
          >
            <div className="grid grid-cols-4 gap-3.5 pt-1.5">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={idx}
                    to={action.route}
                    className="aspect-square p-2.5 rounded-xl border border-indigo-500/25 bg-gradient-to-b from-indigo-500/10 via-card to-card hover:border-indigo-400/60 hover:from-indigo-500/20 hover:shadow-indigo-500/10 transition-all duration-200 flex flex-col items-center justify-center text-center group shadow-xs select-none min-w-0 relative overflow-hidden"
                  >
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center border border-indigo-500/30 bg-indigo-500/15 text-indigo-400 mb-2 group-hover:scale-110 group-hover:bg-indigo-500/25 transition-all shrink-0 shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-bold text-foreground group-hover:text-indigo-400 transition-colors leading-tight w-full truncate">
                      {action.label}
                    </p>
                  </Link>
                );
              })}
            </div>
          </VFCard>

          {/* Software License & Subscription Card — Unified Emerald Section Theme */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-500/10 via-card to-card border border-emerald-500/30 rounded-xl shadow-xs space-y-4">
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
              <div className="p-2 rounded-lg bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Validity</span>
                <p className="text-base font-black text-success whitespace-nowrap">225 Days</p>
                <p className="text-[10px] text-muted-foreground font-semibold">Mar 2027</p>
              </div>

              <div className="p-2 rounded-lg bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Capacity</span>
                <p className="text-base font-black text-foreground whitespace-nowrap">1,248</p>
                <p className="text-[10px] text-primary font-bold">50% Enrolled</p>
              </div>

              <div className="p-2 rounded-lg bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Security</span>
                <p className="text-base font-black text-foreground whitespace-nowrap">AES-256</p>
                <p className="text-[10px] text-success font-bold flex items-center justify-center gap-0.5">
                  <Server className="h-3 w-3" /> Online
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  // 2. SEPARATE TAB: Comprehensive Statistics & Analytics Suite (Clean, Calm & Unified)
  const analyticsContent = (
    <div className="space-y-5">
      {/* 1. Academic & Institutional Key Performance Indicators — Unified Sky Blue Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Academic GPA Index"
          value="3.84 / 4.0"
          icon={<Award className="h-5 w-5" />}
          trend="up"
          trendLabel="+0.12 vs Term 1"
          accentColor="blue"
        />
        <VFStatCard
          title="CBSE Pass Percentage"
          value="98.6%"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Board Standard 2026"
          accentColor="blue"
        />
        <VFStatCard
          title="Student-Teacher Ratio"
          value="19 : 1"
          icon={<Users className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Optimal individual focus"
          accentColor="blue"
        />
        <VFStatCard
          title="Fee Realization Rate"
          value="92.7%"
          icon={<CreditCard className="h-5 w-5" />}
          trend="up"
          trendLabel="₹4.86 Cr collected"
          accentColor="blue"
        />
      </div>

      {/* 2. Primary Comparative Trends (Area & Bar Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance & Student Intake Trends */}
        <VFCard title="Attendance & Intake Trends" description="Monthly comparison for Academic Year 2026-2027">
          <div className="h-64 mt-2">
            <VFAreaChart
              data={[
                { label: 'Apr', intake: 180, attendance: 92 },
                { label: 'May', intake: 220, attendance: 94 },
                { label: 'Jun', intake: 190, attendance: 91 },
                { label: 'Jul', intake: 310, attendance: 96 },
                { label: 'Aug', intake: 280, attendance: 95 },
                { label: 'Sep', intake: 340, attendance: 97 },
              ]}
              xKey="label"
              dataKeys={[
                { key: 'intake', color: '#3b82f6', name: 'Student Intake' },
                { key: 'attendance', color: '#10b981', name: 'Avg Attendance %' },
              ]}
            />
          </div>
        </VFCard>

        {/* Fee Collection Status vs Target */}
        <VFCard title="Fee Collection Status vs Target" description="Quarterly breakdown in ₹ Lakhs (Collected vs Projected)">
          <div className="h-64 mt-2">
            <VFBarChart
              data={[
                { label: 'Q1', target: 85, collected: 80 },
                { label: 'Q2', target: 95, collected: 92 },
                { label: 'Q3', target: 90, collected: 70 },
                { label: 'Q4', target: 100, collected: 88 },
              ]}
              xKey="label"
              dataKeys={[
                { key: 'collected', color: '#3b82f6', name: 'Collected Revenue' },
                { key: 'target', color: '#64748b', name: 'Target Budget' },
              ]}
            />
          </div>
        </VFCard>
      </div>

      {/* 3. Demographics & Grade Distribution — Clean Scannable Metric Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Student Enrollment by School Wing */}
        <VFCard title="Student Enrollment by School Wing" description="Class tier strength distribution across 1,248 pupils">
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <div className="shrink-0" style={{ width: 180, height: 180 }}>
              <VFPieChart
                data={[
                  { name: 'Primary (1-5)', value: 430, color: '#3b82f6' },
                  { name: 'Middle (6-8)', value: 374, color: '#60a5fa' },
                  { name: 'High School (9-10)', value: 250, color: '#93c5fd' },
                  { name: 'Senior Sec (11-12)', value: 194, color: '#bfdbfe' },
                ]}
                height={180}
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5 w-full flex-1">
              {[
                { title: 'Primary Wing', grade: 'Grades 1 – 5', count: '430', pct: '34.5%', dot: 'bg-blue-500' },
                { title: 'Middle School', grade: 'Grades 6 – 8', count: '374', pct: '30.0%', dot: 'bg-blue-400' },
                { title: 'High School', grade: 'Grades 9 – 10', count: '250', pct: '20.0%', dot: 'bg-blue-300' },
                { title: 'Senior Secondary', grade: 'Grades 11 – 12', count: '194', pct: '15.5%', dot: 'bg-blue-200' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-border/80 bg-background/50 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${item.dot} shrink-0`} />
                    <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                  </div>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <span className="text-base font-extrabold text-foreground">{item.count}</span>
                    <span className="text-[11px] font-semibold text-muted-foreground">{item.pct}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">{item.grade}</p>
                </div>
              ))}
            </div>
          </div>
        </VFCard>

        {/* Academic Grade Tier Distribution */}
        <VFCard title="Academic Grade Performance Tier" description="Term 1 evaluation marks distribution across 1,248 students">
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <div className="shrink-0" style={{ width: 180, height: 180 }}>
              <VFPieChart
                data={[
                  { name: 'Distinction (90%+)', value: 524, color: '#10b981' },
                  { name: 'First Division (80-89%)', value: 386, color: '#34d399' },
                  { name: 'Second Division (70-79%)', value: 225, color: '#6ee7b7' },
                  { name: 'Passing & Support (<70%)', value: 113, color: '#93c5fd' },
                ]}
                height={180}
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5 w-full flex-1">
              {[
                { label: 'Distinction', range: 'A1 · 90%+', count: '524', pct: '42.0%', dot: 'bg-emerald-500' },
                { label: 'First Division', range: 'A2 · 80 – 89%', count: '386', pct: '30.9%', dot: 'bg-emerald-400' },
                { label: 'Second Division', range: 'B1 · 70 – 79%', count: '225', pct: '18.0%', dot: 'bg-emerald-300' },
                { label: 'Passing / Support', range: 'B2 & Support', count: '113', pct: '9.1%', dot: 'bg-blue-300' },
              ].map((tier, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-border/80 bg-background/50 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${tier.dot} shrink-0`} />
                    <p className="text-xs font-bold text-foreground truncate">{tier.label}</p>
                  </div>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <span className="text-base font-extrabold text-foreground">{tier.count}</span>
                    <span className="text-[11px] font-semibold text-muted-foreground">{tier.pct}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">{tier.range}</p>
                </div>
              ))}
            </div>
          </div>
        </VFCard>
      </div>

      {/* 4. Department Performance & Academic Velocity Matrix */}
      <VFCard title="Department Academic Performance & Velocity" description="Faculty strength, departmental GPA standing, and curriculum pacing">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {[
            { dept: 'Science & Mathematics', count: '640 Pupils', staff: '38 Faculty', gpa: '94% GPA', pace: '98% Pace', status: 'On Track' },
            { dept: 'Languages & Humanities', count: '480 Pupils', staff: '32 Faculty', gpa: '92% GPA', pace: '95% Pace', status: 'On Track' },
            { dept: 'Commerce & Economics', count: '420 Pupils', staff: '24 Faculty', gpa: '95% GPA', pace: '97% Pace', status: 'Optimal' },
            { dept: 'Sports & Co-Curricular', count: '911 Pupils', staff: '18 Faculty', gpa: '14 Trophies', pace: '100% Active', status: 'Optimal' },
          ].map((d, i) => (
            <div key={i} className="p-3 rounded-lg bg-background/50 border border-border/80 space-y-2.5 hover:bg-background/80 transition-all">
              <div className="flex items-center justify-between">
                <p className="font-bold text-foreground text-xs truncate">{d.dept}</p>
                <VFBadge variant="success" className="text-[10px]">{d.status}</VFBadge>
              </div>
              <div>
                <p className="text-lg font-extrabold text-foreground">{d.count}</p>
                <p className="text-[11px] text-muted-foreground font-semibold">{d.staff}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/70 text-xs">
                <span className="font-bold text-emerald-400">{d.gpa}</span>
                <span className="font-semibold text-muted-foreground">{d.pace}</span>
              </div>
            </div>
          ))}
        </div>
      </VFCard>

      {/* 5. Attendance Health Risk & Payment Channels Analysis — Clean Visual Stat Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance Risk Classification */}
        <VFCard title="Attendance Health & Risk Segments" description="Biometric gate audit classification across 1,248 students">
          <div className="grid grid-cols-3 gap-3 pt-1">
            {[
              { label: 'Regular Attendance', subtitle: 'Above 90%', count: '1,120', pct: '89.7%', tag: 'Healthy', badgeVariant: 'success' as const },
              { label: 'Moderate Risk', subtitle: '75% – 89%', count: '94', pct: '7.5%', tag: 'Monitor', badgeVariant: 'warning' as const },
              { label: 'Critical Absentee', subtitle: 'Below 75%', count: '34', pct: '2.8%', tag: 'Action Req', badgeVariant: 'danger' as const },
            ].map((row, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-border/80 bg-background/50 space-y-1.5 text-center">
                <div className="flex justify-center">
                  <VFBadge variant={row.badgeVariant} className="text-[10px]">{row.tag}</VFBadge>
                </div>
                <p className="text-xl font-extrabold text-foreground">{row.count}</p>
                <p className="text-xs font-bold text-foreground truncate">{row.label}</p>
                <p className="text-[11px] text-muted-foreground font-medium">{row.subtitle} · {row.pct}</p>
              </div>
            ))}
          </div>
        </VFCard>

        {/* Digital Fee Payment Gateway Channels */}
        <VFCard title="Fee Collection Payment Channels" description="Breakdown of digital gateway transactions for Quarter 2">
          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { label: 'UPI & QR Gateway', provider: 'Razorpay / PayU', amount: '₹2.82 Cr', share: '58% of Total' },
              { label: 'Net Banking & RTGS', provider: 'Instant Transfer', amount: '₹1.16 Cr', share: '24% of Total' },
              { label: 'Cards & POS Portal', provider: 'Debit / Credit', amount: '₹58 Lakh', share: '12% of Total' },
              { label: 'Counter & Cheque', provider: 'Bank Clearance', amount: '₹30 Lakh', share: '6% of Total' },
            ].map((chan, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-border/80 bg-background/50 space-y-1">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold text-foreground truncate">{chan.label}</p>
                  <span className="text-[10px] font-semibold text-muted-foreground">{chan.share}</span>
                </div>
                <p className="text-base font-extrabold text-foreground">{chan.amount}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{chan.provider}</p>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Top Tabs: Only 2 tabs (Command Hub & Statistics & Insights)
  const tabs = [
    { id: 'quick-hub', label: 'Command Hub', icon: <Clock className="h-4 w-4" />, content: quickHubContent },
    { id: 'analytics', label: 'Statistics & Insights', icon: <Award className="h-4 w-4" />, content: analyticsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="quick-hub" variant="top-bar" />
    </VFPageContainer>
  );
}
