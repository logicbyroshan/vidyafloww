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
  Sparkles,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { schoolProfile } = useGlobalStore();
  const [notice, setNotice] = React.useState<string | null>(null);

  // 12 Quick Action navigation shortcuts (3x4 Grid on the right)
  const quickActions = [
    { label: 'Attendance', desc: 'Daily roll call', route: '/attendance', icon: CalendarCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
    { label: 'Admissions', desc: 'Intake pipeline', route: '/admissions', icon: UserPlus, color: 'text-amber-400 bg-amber-500/10 border-amber-500/25' },
    { label: 'Students', desc: '360° directory', route: '/students', icon: GraduationCap, color: 'text-blue-400 bg-blue-500/10 border-blue-500/25' },
    { label: 'Teachers', desc: 'Faculty workload', route: '/staff', icon: Users, color: 'text-purple-400 bg-purple-500/10 border-purple-500/25' },
    { label: 'Timetable', desc: 'Periods & proxies', route: '/timetable', icon: Calendar, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25' },
    { label: 'Fees', desc: 'Dues & receipts', route: '/fees', icon: CreditCard, color: 'text-green-400 bg-green-500/10 border-green-500/25' },
    { label: 'Notices', desc: 'Broadcast circular', route: '/notices', icon: Bell, color: 'text-orange-400 bg-orange-500/10 border-orange-500/25' },
    { label: 'Homework', desc: 'Assignments queue', route: '/homework', icon: BookOpen, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25' },
    { label: 'Exams', desc: 'Marks & grades', route: '/examinations', icon: ClipboardList, color: 'text-violet-400 bg-violet-500/10 border-violet-500/25' },
    { label: 'Academics', desc: 'Sessions & syllabus', route: '/academics', icon: School, color: 'text-teal-400 bg-teal-500/10 border-teal-500/25' },
    { label: 'Reports', desc: 'CBSE / RTE audits', route: '/reports', icon: FileSpreadsheet, color: 'text-rose-400 bg-rose-500/10 border-rose-500/25' },
    { label: 'Settings', desc: 'School branding', route: '/settings', icon: Settings, color: 'text-slate-400 bg-slate-500/10 border-slate-500/25' },
  ];

  // 1. MAIN TAB: Command Hub (License Card, Today's Absences on Left | 3x4 Quick Action Grid on Right)
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

      {/* Main Split Layout: Left Content (7 cols) + Right Quick Actions Grid (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: License Card + Teacher/Student Absences Today */}
        <div className="xl:col-span-7 space-y-5">
          {/* Software License & Subscription Card */}
          <div className="p-5 bg-card border border-border rounded-lg shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3.5">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-foreground">{schoolProfile.name}</h2>
                    <VFBadge variant="success">Active License</VFBadge>
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                    {schoolProfile.affiliation} · {schoolProfile.city}
                  </p>
                </div>
              </div>

              <Link to="/settings">
                <VFButton size="sm" variant="outline" leftIcon={<Key className="h-3.5 w-3.5" />}>
                  Manage License
                </VFButton>
              </Link>
            </div>

            {/* License Remaining Days & Capacity Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-lg bg-background/60 border border-border space-y-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">License Validity</span>
                <p className="text-2xl font-black text-success">225 Days Left</p>
                <p className="text-xs text-muted-foreground font-semibold">Valid till 31 March 2027</p>
              </div>

              <div className="p-3.5 rounded-lg bg-background/60 border border-border space-y-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Student Seat Allocation</span>
                <p className="text-2xl font-black text-foreground">1,248 / 2,500</p>
                <p className="text-xs text-primary font-bold">50% Capacity Enrolled</p>
              </div>

              <div className="p-3.5 rounded-lg bg-background/60 border border-border space-y-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Edition & Cloud Sync</span>
                <p className="text-sm font-black text-foreground mt-0.5">Enterprise Suite</p>
                <p className="text-xs text-success font-bold flex items-center gap-1 mt-1">
                  <Server className="h-3 w-3" /> Online (AES-256 Encrypted)
                </p>
              </div>
            </div>
          </div>

          {/* Today's Teacher Absences & Substitute Proxies */}
          <VFCard
            title="Teacher Absences & Substitute Proxies Today"
            description="4 Faculty absent today (120 of 124 Present)"
          >
            <div className="divide-y divide-border -my-2 text-base">
              {[
                { teacher: 'Dr. Rajesh Sharma', dept: 'Physics (HOD)', reason: 'Medical Leave', proxy: 'Assigned: Mr. Verma (Period 3 Lab 204)', status: 'Proxy Assigned' },
                { teacher: 'Ms. Pooja Rao', dept: 'English Literature', reason: 'Casual Leave', proxy: 'Assigned: Mrs. Joshi (Period 5 Room 101)', status: 'Proxy Assigned' },
                { teacher: 'Mr. Deepak Mishra', dept: 'Hindi', reason: 'Board Seminar', proxy: 'Assigned: Mr. Gupta (Period 2 Room 102)', status: 'Proxy Assigned' },
                { teacher: 'Coach Vikram Singh', dept: 'Physical Education', reason: 'Morning Leave', proxy: 'Covered: Sports Squad (Period 6 Ground)', status: 'Covered' },
              ].map((t, i) => (
                <div key={i} className="py-2.5 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <div>
                    <p className="font-bold text-foreground">
                      {t.teacher} <span className="text-muted-foreground text-xs font-semibold">({t.dept})</span>
                    </p>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                      Reason: <span className="text-foreground">{t.reason}</span> · <span className="text-success font-bold">{t.proxy}</span>
                    </p>
                  </div>
                  <VFBadge variant="success" className="shrink-0 self-start sm:self-auto">
                    {t.status}
                  </VFBadge>
                </div>
              ))}
            </div>
          </VFCard>

          {/* Today's Student Absences & Flagged Attendance */}
          <VFCard
            title="Student Absences & Flagged Attendance Today"
            description="68 Pupils absent today (94.5% Overall Attendance)"
          >
            <div className="divide-y divide-border -my-2 text-base">
              {[
                { student: 'Priya Patel', class: 'Class 10-A', issue: '3rd Consecutive Absence (Uninformed)', action: 'WhatsApp Alert Sent' },
                { student: 'Sneha Singh', class: 'Class 11-Sci', issue: 'Bus Route 4 Delayed (09:15 AM)', action: 'Gate Pass Verified' },
                { student: 'Amit Patel', class: 'Class 8-A', issue: 'Uninformed Absenteeism', action: 'SMS Dispatched' },
                { student: 'Kavya Nair', class: 'Class 11-Com', issue: 'Approved Medical Leave (Aug 18 - 19)', action: 'Leave Approved' },
              ].map((s, i) => (
                <div key={i} className="py-2.5 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <div>
                    <p className="font-bold text-foreground">
                      {s.student} <span className="text-muted-foreground text-xs font-semibold">({s.class})</span>
                    </p>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                      Note: <span className="text-destructive font-bold">{s.issue}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-bold text-muted-foreground">{s.action}</span>
                    <VFButton
                      size="sm"
                      variant="outline"
                      leftIcon={<Send className="h-3 w-3" />}
                      onClick={() => setNotice(`Follow-up notice sent to guardian of ${s.student}.`)}
                    >
                      Follow Up
                    </VFButton>
                  </div>
                </div>
              ))}
            </div>
          </VFCard>
        </div>

        {/* RIGHT COLUMN: 3 by 4 Quick Action Command Grid */}
        <div className="xl:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-foreground tracking-tight flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Quick Action Hub
              </h3>
              <p className="text-xs text-muted-foreground font-medium">Direct one-click access to modules</p>
            </div>
            <VFBadge variant="outline">12 Shortcuts</VFBadge>
          </div>

          {/* 3 columns x 4 rows Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  to={action.route}
                  className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all flex flex-col items-center justify-center text-center group h-24 shadow-xs"
                >
                  <div className={`h-8 w-8 rounded-md flex items-center justify-center border ${action.color} mb-1.5 group-hover:scale-105 transition-transform`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-black text-foreground group-hover:text-primary transition-colors truncate w-full">
                    {action.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium truncate w-full">
                    {action.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // 2. SEPARATE TAB: Statistics & Analytics
  const analyticsContent = (
    <div className="space-y-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        <VFCard title="Fee Collection Status" description="Quarterly breakdown in ₹ Lakhs">
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
                { key: 'collected', color: '#10b981', name: 'Collected' },
                { key: 'target', color: '#f59e0b', name: 'Projected' },
              ]}
            />
          </div>
        </VFCard>
      </div>

      {/* Department Allocation Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { dept: 'Science & Math', count: '640 Students', staff: '38 Teachers', score: '94% GPA' },
          { dept: 'Languages & Arts', count: '480 Students', staff: '32 Teachers', score: '92% GPA' },
          { dept: 'Commerce & Economics', count: '420 Students', staff: '24 Teachers', score: '95% GPA' },
          { dept: 'Sports & Co-Curricular', count: '911 Active', staff: '18 Faculty', score: '14 Trophies' },
        ].map((d, i) => (
          <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-1 shadow-xs">
            <p className="font-bold text-foreground text-sm">{d.dept}</p>
            <p className="text-xl font-black text-primary">{d.count}</p>
            <div className="flex justify-between text-xs text-muted-foreground font-semibold pt-1 border-t border-border/70">
              <span>{d.staff}</span>
              <span className="text-success font-bold">{d.score}</span>
            </div>
          </div>
        ))}
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
