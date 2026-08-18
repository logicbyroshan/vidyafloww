import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
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
  ArrowRight,
  Send,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const { schoolProfile } = useGlobalStore();
  const [notice, setNotice] = React.useState<string | null>(null);

  // Student Attendance Radar Data
  const studentData = [
    { id: '1', name: 'Rahul Sharma', class: '10-A', status: 'Present', riskScore: 'Low (4%)', note: 'Optimal Attendance', lastUpdate: '08:30 AM' },
    { id: '2', name: 'Priya Patel', class: '10-A', status: 'Absent', riskScore: 'High (78%)', note: '3rd consecutive absence', lastUpdate: '08:35 AM' },
    { id: '3', name: 'Amit Kumar', class: '9-B', status: 'Present', riskScore: 'Low (8%)', note: 'Math progress +14%', lastUpdate: '08:20 AM' },
    { id: '4', name: 'Sneha Singh', class: '11-Sci', status: 'Late', riskScore: 'Med (42%)', note: 'Bus 4 late arrival', lastUpdate: '09:15 AM' },
    { id: '5', name: 'Vikram Mehta', class: '12-Com', status: 'Present', riskScore: 'Low (2%)', note: 'Scholarship student', lastUpdate: '08:25 AM' },
  ];

  const studentColumns = [
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: any) => <span className="font-extrabold text-foreground text-base">{r.name}</span>,
    },
    {
      header: 'Class',
      accessorKey: 'class',
      cell: (r: any) => <span className="font-bold text-foreground text-base">{r.class}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: any) => (
        <VFBadge variant={r.status === 'Present' ? 'success' : r.status === 'Absent' ? 'danger' : 'warning'}>
          {r.status}
        </VFBadge>
      ),
    },
    {
      header: 'Risk Score',
      accessorKey: 'riskScore',
      cell: (r: any) => (
        <span
          className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
            r.riskScore.startsWith('High')
              ? 'bg-destructive/15 text-destructive border border-destructive/25'
              : r.riskScore.startsWith('Med')
              ? 'bg-warning/15 text-warning border border-warning/25'
              : 'bg-success/15 text-success border border-success/25'
          }`}
        >
          {r.riskScore}
        </span>
      ),
    },
    {
      header: 'Remarks',
      accessorKey: 'note',
      cell: (r: any) => <span className="text-base text-muted-foreground font-medium">{r.note}</span>,
    },
    {
      header: 'Updated',
      accessorKey: 'lastUpdate',
      cell: (r: any) => <span className="text-base text-muted-foreground font-mono font-bold">{r.lastUpdate}</span>,
    },
  ];

  // Quick Action navigation shortcuts
  const quickActions = [
    { label: 'Mark Daily Attendance', desc: 'Roll call for classes', route: '/attendance', icon: CalendarCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'New Admission Intake', desc: 'Review & admit candidates', route: '/admissions', icon: UserPlus, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'Students Directory', desc: '360° student records', route: '/students', icon: GraduationCap, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { label: 'Teachers', desc: 'Faculty load & profiles', route: '/staff', icon: Users, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { label: 'Timetable & Proxies', desc: 'Period matrix & cover', route: '/timetable', icon: Calendar, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { label: 'Fees & Collections', desc: 'Record dues & receipts', route: '/fees', icon: CreditCard, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
    { label: 'Broadcast Notice', desc: 'Announce via SMS & App', route: '/notices', icon: Bell, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
    { label: 'Homework Register', desc: 'Assignments & grading', route: '/homework', icon: BookOpen, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Compliance Reports', desc: 'CBSE & RTE audits', route: '/reports', icon: FileSpreadsheet, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { label: 'Portal Settings', desc: 'School logo & identity', route: '/settings', icon: Settings, color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' },
  ];

  // 1. MAIN TAB: Quick Command Center (No Statistics here per user request)
  const quickHubContent = (
    <div className="space-y-6">
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

      {/* Software License & Institutional Identity Banner */}
      <div className="p-5 bg-card border border-border rounded-lg shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-black text-foreground">{schoolProfile.name} — Command Portal</h2>
                <VFBadge variant="success">Enterprise License Active</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                {schoolProfile.affiliation} · {schoolProfile.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link to="/settings">
              <VFButton size="sm" variant="outline" leftIcon={<Key className="h-3.5 w-3.5" />}>
                Manage License
              </VFButton>
            </Link>
          </div>
        </div>

        {/* License Specifications & Sync Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm pt-1">
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">License Edition</span>
            <span className="font-bold text-foreground mt-0.5 block">VidyaMaxx Enterprise Suite</span>
          </div>
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Validity Period</span>
            <span className="font-bold text-success mt-0.5 block">Valid till 31 March 2027</span>
          </div>
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Student Seat Allocation</span>
            <span className="font-bold text-foreground mt-0.5 block">1,248 / 2,500 Enrolled (50%)</span>
          </div>
          <div>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Server & Cloud Sync</span>
            <span className="font-bold text-primary mt-0.5 flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5" /> Online · Encrypted AES-256
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-foreground tracking-tight">Quick Action Command Hub</h3>
            <p className="text-xs text-muted-foreground font-medium">Direct shortcuts to key school workflows</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                to={action.route}
                className="p-3.5 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-muted/40 transition-all flex flex-col justify-between group h-28 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className={`h-8 w-8 rounded-md flex items-center justify-center border ${action.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors truncate">
                    {action.label}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">
                    {action.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Live Absence & Attendance Tracker Today (Teachers & Students NOT Present) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. Teacher Absences & Assigned Substitutes Today */}
        <VFCard
          title="Teacher Absences & Substitute Proxies Today"
          description="4 Faculty absent today (120 of 124 Present)"
        >
          <div className="divide-y divide-border -my-2 text-base">
            {[
              { teacher: 'Dr. Rajesh Sharma', dept: 'Physics (HOD)', reason: 'Medical Checkup', proxy: 'Assigned: Mr. Verma (Period 3 Lab 204)', status: 'Proxy Assigned' },
              { teacher: 'Ms. Pooja Rao', dept: 'English Literature', reason: 'Casual Leave', proxy: 'Assigned: Mrs. Joshi (Period 5 Room 101)', status: 'Proxy Assigned' },
              { teacher: 'Mr. Deepak Mishra', dept: 'Hindi', reason: 'Duty Leave / Board Seminar', proxy: 'Assigned: Mr. Gupta (Period 2 Room 102)', status: 'Proxy Assigned' },
              { teacher: 'Coach Vikram Singh', dept: 'Physical Education', reason: 'Half-Day Leave (Morning)', proxy: 'Covered: Sports Squad (Period 6 Ground)', status: 'Covered' },
            ].map((t, i) => (
              <div key={i} className="py-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-foreground text-sm">
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

        {/* 2. Student Absences & Flagged Roll Call Today */}
        <VFCard
          title="Student Absences & Flagged Attendance Today"
          description="68 Pupils absent today (94.5% Daily Attendance)"
        >
          <div className="divide-y divide-border -my-2 text-base">
            {[
              { student: 'Priya Patel', class: 'Class 10-A', issue: '3rd Consecutive Absence (Uninformed)', action: 'WhatsApp Alert Sent' },
              { student: 'Sneha Singh', class: 'Class 11-Sci', issue: 'Bus Route 4 Delayed (Arrival 09:15 AM)', action: 'Gate Pass Verified' },
              { student: 'Amit Patel', class: 'Class 8-A', issue: 'Uninformed Absenteeism', action: 'SMS Dispatched' },
              { student: 'Kavya Nair', class: 'Class 11-Com', issue: 'Approved Medical Leave (Aug 18 - 19)', action: 'Leave Approved' },
            ].map((s, i) => (
              <div key={i} className="py-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-foreground text-sm">
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

      {/* Student Attendance Radar Table */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-black text-foreground tracking-tight">Live Student Attendance Radar</h3>
          <p className="text-xs text-muted-foreground font-medium">Real-time gate and classroom roll call stream</p>
        </div>

        <VFDataTable
          columns={studentColumns}
          data={studentData}
          filterPlaceholder="Search radar by student name or class..."
        />
      </div>
    </div>
  );

  // 2. SEPARATE TAB: Statistics & Analytics (KPIs and Charts moved here)
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
    { id: 'quick-hub', label: 'Command Hub & Live Radar', icon: <Clock className="h-4 w-4" />, content: quickHubContent },
    { id: 'analytics', label: 'Statistics & Insights', icon: <Award className="h-4 w-4" />, content: analyticsContent },
    { id: 'operations', label: 'Operations & Hardware', icon: <ShieldCheck className="h-4 w-4" />, content: operationsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="quick-hub" variant="top-bar" />
    </VFPageContainer>
  );
}
