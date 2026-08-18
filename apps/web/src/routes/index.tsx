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
  Send,
  UserCheck,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { schoolProfile } = useGlobalStore();
  const [notice, setNotice] = React.useState<string | null>(null);

  // 12 Quick Action navigation shortcuts (Square boxes on the right)
  const quickActions = [
    { label: 'Attendance', desc: 'Daily roll call', route: '/attendance', icon: CalendarCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
    { label: 'Admissions', desc: 'Intake pipeline', route: '/admissions', icon: UserPlus, color: 'text-amber-400 bg-amber-500/10 border-amber-500/25' },
    { label: 'Students', desc: '360° directory', route: '/students', icon: GraduationCap, color: 'text-blue-400 bg-blue-500/10 border-blue-500/25' },
    { label: 'Teachers', desc: 'Faculty load', route: '/staff', icon: Users, color: 'text-purple-400 bg-purple-500/10 border-purple-500/25' },
    { label: 'Timetable', desc: 'Periods & proxy', route: '/timetable', icon: Calendar, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25' },
    { label: 'Fees', desc: 'Dues & receipts', route: '/fees', icon: CreditCard, color: 'text-green-400 bg-green-500/10 border-green-500/25' },
    { label: 'Notices', desc: 'Circular board', route: '/notices', icon: Bell, color: 'text-orange-400 bg-orange-500/10 border-orange-500/25' },
    { label: 'Homework', desc: 'Assignments', route: '/homework', icon: BookOpen, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25' },
    { label: 'Exams', desc: 'Marks & grades', route: '/examinations', icon: ClipboardList, color: 'text-violet-400 bg-violet-500/10 border-violet-500/25' },
    { label: 'Academics', desc: 'Grade structure', route: '/academics', icon: School, color: 'text-teal-400 bg-teal-500/10 border-teal-500/25' },
    { label: 'Reports', desc: 'CBSE & RTE audit', route: '/reports', icon: FileSpreadsheet, color: 'text-rose-400 bg-rose-500/10 border-rose-500/25' },
    { label: 'Settings', desc: 'School branding', route: '/settings', icon: Settings, color: 'text-slate-400 bg-slate-500/10 border-slate-500/25' },
  ];

  // 1. MAIN TAB: Command Hub
  const quickHubContent = (
    <div className="space-y-5">
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

      {/* 1. Top Full-Width KPI Metric Cards */}
      <div className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-5">
        <VFStatCard
          title="Total Students"
          value="2,451"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel="+12 this month"
        />
        <VFStatCard
          title="Teaching Staff"
          value="98.2%"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Optimal coverage"
        />
        <VFStatCard
          title="Today's Attendance"
          value="94.5%"
          icon={<CalendarCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="+1.2% vs yesterday"
        />
        <VFStatCard
          title="Pending Admissions"
          value="28"
          icon={<FileText className="h-5 w-5" />}
          trend="neutral"
          trendLabel="18 auto-verified"
        />
      </div>

      {/* 2. Main Split Layout: Left Absence Trackers (50%) + Right Quick Action Square Grid & License Card (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start overflow-hidden">
        
        {/* LEFT COLUMN: Teacher & Student Absences Command Center (50% width) */}
        <div className="space-y-5 min-w-0">
          {/* Today's Teacher Absences & Substitute Duty Assignment */}
          <VFCard
            title="Teacher Absences & Substitute Duty Today"
            description="4 Faculty absent today (120 of 124 Present)"
          >
            <div className="divide-y divide-border -my-2">
              {[
                { teacher: 'Dr. Rajesh Sharma', dept: 'Physics (HOD)', reason: 'Medical Leave', duty: 'Proxy: Mr. Verma (P3 Lab 204)', status: 'Proxy Assigned' },
                { teacher: 'Ms. Pooja Rao', dept: 'English Literature', reason: 'Casual Leave', duty: 'Proxy: Mrs. Joshi (P5 Room 101)', status: 'Proxy Assigned' },
                { teacher: 'Mr. Deepak Mishra', dept: 'Hindi', reason: 'Board Seminar', duty: 'Proxy: Mr. Gupta (P2 Room 102)', status: 'Proxy Assigned' },
                { teacher: 'Coach Vikram Singh', dept: 'Physical Education', reason: 'Morning Leave', duty: 'Sports Squad (P6 Ground)', status: 'Covered' },
              ].map((t, i) => (
                <div key={i} className="py-3 px-1 flex flex-row items-center justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className="font-extrabold text-foreground text-sm truncate shrink-0 max-w-[130px]">
                        {t.teacher}
                      </p>
                      <span className="text-xs text-muted-foreground font-bold truncate">({t.dept})</span>
                      <VFBadge variant="success" className="text-[10px] shrink-0">
                        {t.status}
                      </VFBadge>
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground truncate">
                      <span className="font-bold text-foreground">{t.reason}</span> · <span className="text-success font-bold">{t.duty}</span>
                    </p>
                  </div>
                  <div className="shrink-0">
                    <VFButton
                      size="sm"
                      variant="outline"
                      leftIcon={<UserCheck className="h-3.5 w-3.5" />}
                      onClick={() => setNotice(`Duty proxy reassigned for ${t.teacher}.`)}
                    >
                      Assign
                    </VFButton>
                  </div>
                </div>
              ))}
            </div>
          </VFCard>

          {/* Today's Student Absences & Flagged Attendance */}
          <VFCard
            title="Student Absences & Flagged Attendance Today"
            description="68 Pupils absent today (94.5% Overall Attendance)"
          >
            <div className="divide-y divide-border -my-2">
              {[
                { student: 'Priya Patel', class: 'Class 10-A', issue: '3rd Consecutive Absence (Uninformed)', action: 'WhatsApp Alert' },
                { student: 'Sneha Singh', class: 'Class 11-Sci', issue: 'Bus Route 4 Delayed (09:15 AM Arrival)', action: 'Gate Pass' },
                { student: 'Amit Patel', class: 'Class 8-A', issue: 'Uninformed Absenteeism (No Leave Note)', action: 'SMS Dispatched' },
                { student: 'Kavya Nair', class: 'Class 11-Com', issue: 'Approved Medical Leave (Aug 18 - 19)', action: 'Leave Approved' },
              ].map((s, i) => (
                <div key={i} className="py-3 px-1 flex flex-row items-center justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className="font-extrabold text-foreground text-sm truncate shrink-0 max-w-[120px]">
                        {s.student}
                      </p>
                      <span className="text-xs text-muted-foreground font-bold truncate">({s.class})</span>
                    </div>
                    <p className="text-xs font-bold text-destructive truncate">
                      {s.issue}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <VFButton
                      size="sm"
                      variant="outline"
                      leftIcon={<Send className="h-3 w-3" />}
                      onClick={() => setNotice(`Follow-up notice dispatched to guardian of ${s.student}.`)}
                    >
                      Follow Up
                    </VFButton>
                  </div>
                </div>
              ))}
            </div>
          </VFCard>
        </div>

        {/* RIGHT COLUMN: Quick Action Square Grid 4×3 + Software License Card Below It (50% width) */}
        <div className="space-y-5 min-w-0">
          
          {/* Quick Action Square Grid — 3 cols × 4 rows */}
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  to={action.route}
                  className="aspect-square p-2 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all flex flex-col items-center justify-center text-center group shadow-xs select-none min-w-0"
                >
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${action.color} mb-2 group-hover:scale-110 transition-transform shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors leading-tight w-full truncate">
                    {action.label}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Software License & Subscription Card (Equal 20px gap below quick actions) */}
          <div className="p-5 bg-card border border-border rounded-lg shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3.5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-foreground">{schoolProfile.name}</h4>
                    <VFBadge variant="success">Active</VFBadge>
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold">
                    {schoolProfile.affiliation}
                  </p>
                </div>
              </div>

              <Link to="/settings">
                <VFButton size="sm" variant="outline" leftIcon={<Key className="h-3.5 w-3.5" />}>
                  Manage
                </VFButton>
              </Link>
            </div>

            {/* License Sub-Boxes: Square/Balanced Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Validity</span>
                <p className="text-xl font-black text-success">225 Days</p>
                <p className="text-xs text-muted-foreground font-semibold">Till 31 Mar 2027</p>
              </div>

              <div className="p-3 rounded-lg bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Capacity</span>
                <p className="text-xl font-black text-foreground">1,248 Seats</p>
                <p className="text-xs text-primary font-bold">50% Enrolled</p>
              </div>

              <div className="p-3 rounded-lg bg-background/60 border border-border space-y-0.5 text-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Security</span>
                <p className="text-xl font-black text-foreground">AES-256</p>
                <p className="text-xs text-success font-bold flex items-center justify-center gap-1">
                  <Server className="h-3.5 w-3.5" /> Online
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  // 2. SEPARATE TAB: Comprehensive Statistics & Analytics Suite
  const analyticsContent = (
    <div className="space-y-6">
      {/* 1. Academic & Institutional Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <VFStatCard
          title="Academic GPA Index"
          value="3.84 / 4.0"
          icon={<Award className="h-5 w-5" />}
          trend="up"
          trendLabel="+0.12 vs Term 1"
        />
        <VFStatCard
          title="CBSE Pass Percentage"
          value="98.6%"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Board Standard 2026"
        />
        <VFStatCard
          title="Student-Teacher Ratio"
          value="19 : 1"
          icon={<Users className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Optimal individual focus"
        />
        <VFStatCard
          title="Fee Realization Rate"
          value="92.7%"
          icon={<CreditCard className="h-5 w-5" />}
          trend="up"
          trendLabel="₹4.86 Cr collected"
        />
      </div>

      {/* 2. Primary Comparative Trends (Area & Bar Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                { key: 'intake', color: '#6366f1', name: 'Student Intake' },
                { key: 'attendance', color: '#06b6d4', name: 'Avg Attendance %' },
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
                { key: 'collected', color: '#10b981', name: 'Collected Revenue' },
                { key: 'target', color: '#f59e0b', name: 'Target Budget' },
              ]}
            />
          </div>
        </VFCard>
      </div>

      {/* 3. Demographics & Distribution (Donut / Pie Charts with Legends) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Student Enrollment by School Wing */}
        <VFCard title="Student Enrollment by School Wing" description="Class tier strength distribution across 1,248 pupils">
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <div className="shrink-0" style={{ width: 220, height: 220 }}>
              <VFPieChart
                data={[
                  { name: 'Primary Wing (1-5)', value: 430, color: '#3b82f6' },
                  { name: 'Middle School (6-8)', value: 374, color: '#06b6d4' },
                  { name: 'High School (9-10)', value: 250, color: '#10b981' },
                  { name: 'Senior Sec (11-12)', value: 194, color: '#f59e0b' },
                ]}
                height={220}
              />
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: 'Primary Wing (Gr. 1-5)', value: '430', pct: '34.5%', color: 'bg-blue-500', bar: '35%' },
                { label: 'Middle School (Gr. 6-8)', value: '374', pct: '30.0%', color: 'bg-cyan-500', bar: '30%' },
                { label: 'High School (Gr. 9-10)', value: '250', pct: '20.0%', color: 'bg-emerald-500', bar: '20%' },
                { label: 'Senior Sec (Gr. 11-12)', value: '194', pct: '15.5%', color: 'bg-amber-500', bar: '15.5%' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color} shrink-0`} />
                      <span className="font-bold text-foreground">{item.label}</span>
                    </div>
                    <span className="font-black text-foreground tabular-nums">{item.value} <span className="text-muted-foreground font-semibold">({item.pct})</span></span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: item.bar }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VFCard>

        {/* Academic Grade Tier Distribution */}
        <VFCard title="Academic Grade Performance Tier" description="Term 1 evaluation marks distribution across 1,248 students">
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <div className="shrink-0" style={{ width: 220, height: 220 }}>
              <VFPieChart
                data={[
                  { name: 'Distinction (A1 - 90%+)', value: 524, color: '#10b981' },
                  { name: 'First Div (A2 - 80-89%)', value: 386, color: '#3b82f6' },
                  { name: 'Second Div (B1 - 70-79%)', value: 225, color: '#f59e0b' },
                  { name: 'Average (B2 - 60-69%)', value: 88, color: '#8b5cf6' },
                  { name: 'Needs Support (<60%)', value: 25, color: '#ef4444' },
                ]}
                height={220}
              />
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: 'Distinction (A1 · 90%+)', value: '524', pct: '42.0%', color: 'bg-emerald-500', bar: '42%' },
                { label: 'First Div (A2 · 80-89%)', value: '386', pct: '30.9%', color: 'bg-blue-500', bar: '31%' },
                { label: 'Second Div (B1 · 70-79%)', value: '225', pct: '18.0%', color: 'bg-amber-500', bar: '18%' },
                { label: 'Average (B2 · 60-69%)', value: '88', pct: '7.1%', color: 'bg-purple-500', bar: '7%' },
                { label: 'Remedial Support (<60%)', value: '25', pct: '2.0%', color: 'bg-rose-500', bar: '2%' },
              ].map((tier, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${tier.color} shrink-0`} />
                      <span className="font-bold text-foreground">{tier.label}</span>
                    </div>
                    <span className="font-black text-foreground tabular-nums">{tier.value} <span className="text-muted-foreground font-semibold">({tier.pct})</span></span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${tier.color}`} style={{ width: tier.bar, minWidth: '6px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VFCard>
      </div>

      {/* 4. Department Academic Performance & Syllabus Pacing Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { dept: 'Science & Mathematics', count: '640 Students', staff: '38 Teachers', score: '94% Dept GPA', pace: '98% Syllabus Completed' },
          { dept: 'Languages & Humanities', count: '480 Students', staff: '32 Teachers', score: '92% Dept GPA', pace: '95% Syllabus Completed' },
          { dept: 'Commerce & Economics', count: '420 Students', staff: '24 Teachers', score: '95% Dept GPA', pace: '97% Syllabus Completed' },
          { dept: 'Sports & Co-Curricular', count: '911 Active', staff: '18 Faculty', score: '14 National Trophies', pace: '100% Activity Active' },
        ].map((d, i) => (
          <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <p className="font-extrabold text-foreground text-sm truncate">{d.dept}</p>
              <VFBadge variant="success" className="text-[10px]">Optimal</VFBadge>
            </div>
            <p className="text-2xl font-black text-primary">{d.count}</p>
            <div className="space-y-1 text-xs text-muted-foreground font-semibold pt-1 border-t border-border/70">
              <div className="flex justify-between">
                <span>Faculty Strength:</span>
                <span className="font-bold text-foreground">{d.staff}</span>
              </div>
              <div className="flex justify-between">
                <span>Academic Standing:</span>
                <span className="text-success font-bold">{d.score}</span>
              </div>
              <div className="flex justify-between">
                <span>Curriculum Pacing:</span>
                <span className="text-foreground font-bold">{d.pace}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Attendance Health Risk & Payment Channels Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Attendance Risk Classification */}
        <VFCard title="Attendance Health & Risk Segments" description="Biometric gate audit classification across 1,248 students">
          <div className="space-y-4 mt-2">
            {[
              { label: 'Regular Attendance (Above 90%)', count: '1,120 Pupils', pct: '89.7%', bar: '89.7%', colorBar: 'bg-emerald-500', colorText: 'text-emerald-400' },
              { label: 'Moderate Risk (75% – 89%)', count: '94 Pupils', pct: '7.5%', bar: '7.5%', colorBar: 'bg-amber-500', colorText: 'text-amber-400' },
              { label: 'Critical Absentee Risk (Below 75%)', count: '34 Pupils', pct: '2.8%', bar: '2.8%', colorBar: 'bg-rose-500', colorText: 'text-rose-400' },
            ].map((row, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm font-bold mb-1.5">
                  <span className="text-foreground">{row.label}</span>
                  <span className={`${row.colorText} font-black tabular-nums`}>{row.count} ({row.pct})</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.colorBar}`} style={{ width: row.bar, minWidth: '12px' }} />
                </div>
              </div>
            ))}
          </div>
        </VFCard>

        {/* Digital Fee Payment Gateway Channels */}
        <VFCard title="Fee Collection Payment Channels" description="Breakdown of digital gateway transactions for Quarter 2">
          <div className="space-y-3.5 mt-2">
            <div>
              <div className="flex justify-between text-sm font-bold pb-1">
                <span className="text-foreground">UPI & QR Gateway (Razorpay / PayU)</span>
                <span className="text-primary font-black">₹2.82 Cr (58%)</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '58%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold pb-1">
                <span className="text-foreground">Net Banking & Instant RTGS</span>
                <span className="text-cyan-400 font-black">₹1.16 Cr (24%)</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold pb-1">
                <span className="text-foreground">Credit / Debit Card Online Portal</span>
                <span className="text-amber-400 font-black">₹58 Lakh (12%)</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold pb-1">
                <span className="text-foreground">Bank Cheque / Counter Deposit</span>
                <span className="text-muted-foreground font-black">₹30 Lakh (6%)</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-muted-foreground/50 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 3. Operations & Hardware Sync View
  const operationsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Biometric Gate Hardware Sync" description="Turnstiles & RFID scanners">
          <div className="divide-y divide-border -my-2 text-base">
            <div className="flex justify-between items-center py-3 px-1">
              <span className="font-bold text-foreground text-sm">Gate Terminal 1 (Main)</span>
              <VFBadge variant="success">Online (0ms lag)</VFBadge>
            </div>
            <div className="flex justify-between items-center py-3 px-1">
              <span className="font-bold text-foreground text-sm">Gate Terminal 2 (North)</span>
              <VFBadge variant="success">Online (0ms lag)</VFBadge>
            </div>
            <div className="flex justify-between items-center py-3 px-1">
              <span className="font-bold text-foreground text-sm">Staff RFID Terminal</span>
              <VFBadge variant="success">Online</VFBadge>
            </div>
          </div>
        </VFCard>

        <VFCard title="SMS & WhatsApp Gateway" description="Carrier delivery pipelines">
          <div className="space-y-2 mt-1 text-base">
            <p className="text-2xl font-black text-foreground">99.8% Delivery</p>
            <p className="text-muted-foreground text-sm font-semibold">Active carriers: Twilio & Gupshup</p>
            <VFBadge variant="success">Gateway Operational</VFBadge>
          </div>
        </VFCard>

        <VFCard title="Automated Nightly Backups" description="Encrypted disaster recovery">
          <div className="space-y-2 mt-1 text-base">
            <p className="text-2xl font-black text-foreground">Daily 02:00 AM</p>
            <p className="text-muted-foreground text-sm font-semibold">Last backup: Today at 02:00 AM (248MB)</p>
            <VFBadge variant="outline">Encrypted AES-256</VFBadge>
          </div>
        </VFCard>
      </div>
    </div>
  );

  const tabs = [
    { id: 'quick-hub', label: 'Command Hub', icon: <Clock className="h-4 w-4" />, content: quickHubContent },
    { id: 'analytics', label: 'Statistics & Insights', icon: <Award className="h-4 w-4" />, content: analyticsContent },
    { id: 'operations', label: 'Operations & Hardware', icon: <ShieldCheck className="h-4 w-4" />, content: operationsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="quick-hub" variant="top-bar" />
    </VFPageContainer>
  );
}
