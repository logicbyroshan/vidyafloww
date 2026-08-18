import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFBadge,
  VFTabs,
  VFCard,
  VFAreaChart,
  VFBarChart,
} from '@vidyamaxx/ui';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Clock,
  BookOpen,
  Activity,
  AlertTriangle,
  Award,
  Briefcase,
  Layers,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const [selectedNotice, setSelectedNotice] = React.useState<string | null>(null);

  // Student Attendance & Health Radar Mock Data
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
          className={`text-sm font-bold px-3 py-1 rounded-md ${
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

  // 1. Overview View
  const overviewContent = (
    <div className="space-y-6">
      {selectedNotice && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
            <span className="font-bold">{selectedNotice}</span>
          </div>
          <button
            onClick={() => setSelectedNotice(null)}
            className="text-muted-foreground hover:text-foreground text-base font-black cursor-pointer px-3 py-1.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Total Students"
          value="2,451"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendLabel="+12 this month"
        />
        <VFStatCard
          title="Teaching Staff"
          value="98.2%"
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendLabel="Optimal coverage"
        />
        <VFStatCard
          title="Today's Attendance"
          value="94.5%"
          icon={<CalendarCheck className="h-6 w-6" />}
          trend="up"
          trendLabel="+1.2% vs yesterday"
        />
        <VFStatCard
          title="Pending Admissions"
          value="28"
          icon={<FileText className="h-6 w-6" />}
          trend="neutral"
          trendLabel="18 auto-verified"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VFCard title="Attendance & Intake Trends" description="Monthly comparison for Academic Year 2026-2027">
          <VFAreaChart
            height={220}
            xKey="month"
            data={[
              { month: 'Apr', attendance: 92, intake: 210 },
              { month: 'May', attendance: 94, intake: 240 },
              { month: 'Jun', attendance: 91, intake: 190 },
              { month: 'Jul', attendance: 96, intake: 310 },
              { month: 'Aug', attendance: 95, intake: 280 },
              { month: 'Sep', attendance: 97, intake: 340 },
            ]}
            dataKeys={[
              { key: 'attendance', name: 'Attendance Rate (%)', color: '#06b6d4' },
              { key: 'intake', name: 'Admissions Intake', color: '#6366f1' },
            ]}
          />
        </VFCard>

        <VFCard title="Fee Collection Status" description="Quarterly breakdown in ₹ Lakhs">
          <VFBarChart
            height={220}
            xKey="quarter"
            data={[
              { quarter: 'Q1', collected: 84, target: 90 },
              { quarter: 'Q2', collected: 96, target: 95 },
              { quarter: 'Q3', collected: 78, target: 85 },
              { quarter: 'Q4', collected: 88, target: 92 },
            ]}
            dataKeys={[
              { key: 'collected', name: 'Collected', color: '#10b981' },
              { key: 'target', name: 'Target', color: '#f59e0b' },
            ]}
          />
        </VFCard>
      </div>

      {/* Table & Clean Flattened Action Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-foreground tracking-tight">Student Attendance Radar</h2>
            <span className="text-sm font-bold text-muted-foreground">Live real-time feed</span>
          </div>
          <VFDataTable columns={studentColumns} data={studentData} filterPlaceholder="Filter students by name or class..." />
        </div>

        <div className="space-y-4">
          {/* Priority Actions — Flat list with simple dividers, NO nested boxes */}
          <VFCard title="Priority Actions" description="Items requiring immediate attention">
            <div className="divide-y divide-border -my-2">
              <button
                onClick={() => setSelectedNotice('Fee reminder notice queued for 14 defaulters.')}
                className="w-full text-left py-3.5 px-2 hover:bg-muted/50 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    Fee Defaulters (14 Students)
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">Auto WhatsApp reminders ready</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedNotice('Parental alert trigger queued for Priya Patel.')}
                className="w-full text-left py-3.5 px-2 hover:bg-muted/50 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    Absence Alert: Priya Patel
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">3 consecutive absences flagged</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedNotice('Class 10-A substitute teacher auto-assigned.')}
                className="w-full text-left py-3.5 px-2 hover:bg-muted/50 rounded-lg transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    Staff Substitute Matched
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">Mr. Verma matched for Period 3</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>
            </div>
          </VFCard>

          {/* System Hardware Sync — Flat list, NO nested boxes */}
          <VFCard title="System Hardware Sync">
            <div className="divide-y divide-border -my-2">
              <div className="flex justify-between items-center py-3.5 px-2">
                <span className="flex items-center gap-2.5 text-base text-foreground font-bold">
                  <ShieldCheck className="h-5 w-5 text-success" /> OCR Document Engine
                </span>
                <VFBadge variant="success">Active</VFBadge>
              </div>
              <div className="flex justify-between items-center py-3.5 px-2">
                <span className="flex items-center gap-2.5 text-base text-foreground font-bold">
                  <ShieldCheck className="h-5 w-5 text-success" /> Biometric Gate Sync
                </span>
                <VFBadge variant="success">Online</VFBadge>
              </div>
            </div>
          </VFCard>
        </div>
      </div>
    </div>
  );

  // 2. Academic Insights View
  const academicContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <VFStatCard
          title="Institutional Score"
          value="96.4 / 100"
          icon={<Award className="h-6 w-6" />}
          trend="up"
          trendLabel="Grade A+ Status"
        />
        <VFStatCard
          title="Term Pass Rate"
          value="94.8%"
          icon={<GraduationCap className="h-6 w-6" />}
          trend="up"
          trendLabel="+2.4% vs Term 1"
        />
        <VFStatCard
          title="Syllabus On Track"
          value="92.1%"
          icon={<BookOpen className="h-6 w-6" />}
          trend="up"
          trendLabel="All Departments"
        />
        <VFStatCard
          title="At-Risk Learners"
          value="18"
          icon={<AlertTriangle className="h-6 w-6" />}
          trend="down"
          trendLabel="Under Remedial Plan"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Science Department" description="Physics, Chemistry, Biology">
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-muted-foreground">Average Score</span>
              <span className="text-lg font-black text-foreground">92.4%</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full w-[92%]" />
            </div>
          </div>
        </VFCard>

        <VFCard title="Mathematics Department" description="Algebra, Geometry, Calculus">
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-muted-foreground">Average Score</span>
              <span className="text-lg font-black text-foreground">89.6%</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[89%]" />
            </div>
          </div>
        </VFCard>

        <VFCard title="Humanities & Languages" description="English, Social Science, Hindi">
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-muted-foreground">Average Score</span>
              <span className="text-lg font-black text-foreground">86.8%</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full w-[86%]" />
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 3. Operations & Staff View
  const operationsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Total Staff"
          value="242"
          icon={<Users className="h-6 w-6" />}
          trend="up"
          trendLabel="164 Teaching · 78 Support"
        />
        <VFStatCard
          title="Average Load"
          value="26.4 Periods"
          icon={<Clock className="h-6 w-6" />}
          trend="neutral"
          trendLabel="Balanced weekly"
        />
        <VFStatCard
          title="Staff Attendance"
          value="97.5%"
          icon={<UserCheck className="h-6 w-6" />}
          trend="up"
          trendLabel="6 on planned leave"
        />
        <VFStatCard
          title="Substitutes Today"
          value="4"
          icon={<Briefcase className="h-6 w-6" />}
          trend="up"
          trendLabel="100% auto-matched"
        />
      </div>

      <VFCard title="Departmental Period Allocation">
        <div className="divide-y divide-border -my-2">
          {[
            { dept: 'Science Department', head: 'Dr. Rajesh Sharma', staff: '28 Teachers', load: '24 Periods / Wk', status: 'Optimal' },
            { dept: 'Mathematics Department', head: 'Mrs. Sunita Verma', staff: '32 Teachers', load: '26 Periods / Wk', status: 'Optimal' },
            { dept: 'Languages & Humanities', head: 'Mr. Arvind Gupta', staff: '40 Teachers', load: '22 Periods / Wk', status: 'Balanced' },
          ].map((d, i) => (
            <div key={i} className="py-4 px-2 flex items-center justify-between">
              <div>
                <p className="font-extrabold text-foreground text-base">{d.dept}</p>
                <p className="text-muted-foreground text-sm font-semibold mt-0.5">Head: {d.head} · {d.staff}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold text-foreground text-base">{d.load}</span>
                <VFBadge variant="success">{d.status}</VFBadge>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity className="h-5 w-5" />, content: overviewContent },
    { id: 'academic', label: 'Academic Insights', icon: <GraduationCap className="h-5 w-5" />, content: academicContent },
    { id: 'operations', label: 'Operations & Staff', icon: <Layers className="h-5 w-5" />, content: operationsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="overview" variant="top-bar" />
    </VFPageContainer>
  );
}
