import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFBadge,
  VFTabs,
  VFCard,
  VFButton,
} from '@vidyamaxx/ui';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  UserCheck,
  Clock,
  BookOpen,
  Activity,
  AlertTriangle,
  Award,
  Briefcase,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const [selectedNotice, setSelectedNotice] = React.useState<string | null>(null);

  // Student Health Radar Mock Data
  const studentData = [
    { id: '1', name: 'Rahul Sharma', class: '10-A', status: 'Present', riskScore: 'Low (4%)', aiInsight: 'Optimal Performance', lastUpdate: '08:30 AM' },
    { id: '2', name: 'Priya Patel', class: '10-A', status: 'Absent', riskScore: 'High (78%)', aiInsight: '3rd consecutive absence', lastUpdate: '08:35 AM' },
    { id: '3', name: 'Amit Kumar', class: '9-B', status: 'Present', riskScore: 'Low (8%)', aiInsight: 'Math improvement +14%', lastUpdate: '08:20 AM' },
    { id: '4', name: 'Sneha Singh', class: '11-Sci', status: 'Late', riskScore: 'Med (42%)', aiInsight: 'Late arrival pattern', lastUpdate: '09:15 AM' },
    { id: '5', name: 'Vikram Mehta', class: '12-Com', status: 'Present', riskScore: 'Low (2%)', aiInsight: 'Scholarship candidate', lastUpdate: '08:25 AM' },
  ];

  const studentColumns = [
    { header: 'Student Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Class', accessorKey: 'class' },
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
          className={`text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 w-max ${
            r.riskScore.startsWith('High')
              ? 'bg-destructive/15 text-destructive border border-destructive/30'
              : r.riskScore.startsWith('Med')
              ? 'bg-warning/15 text-warning border border-warning/30'
              : 'bg-success/15 text-success border border-success/30'
          }`}
        >
          {r.riskScore}
        </span>
      ),
    },
    {
      header: 'AI Note',
      accessorKey: 'aiInsight',
      cell: (r: any) => (
        <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
          <Sparkles className="h-3.5 w-3.5 text-primary/80 shrink-0" />
          {r.aiInsight}
        </span>
      ),
    },
    { header: 'Updated', accessorKey: 'lastUpdate' },
  ];

  // 1. System Overview Submodule Content
  const overviewContent = (
    <div className="space-y-4">
      {selectedNotice && (
        <div className="p-4 bg-primary/10 border border-primary/25 rounded-xl text-xs text-foreground flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium">{selectedNotice}</span>
          </div>
          <button onClick={() => setSelectedNotice(null)} className="text-muted-foreground hover:text-foreground text-xs font-bold cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Enrolled Students" value="2,451" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="+12 this month" />
        <VFStatCard title="Teaching Staff Efficiency" value="98.2%" icon={<GraduationCap className="h-5 w-5" />} trend="up" trendLabel="Optimal schedule allocation" />
        <VFStatCard title="Today's Attendance" value="94.5%" icon={<CalendarCheck className="h-5 w-5" />} trend="up" trendLabel="+1.2% vs yesterday" />
        <VFStatCard title="Pending Applications" value="28" icon={<FileText className="h-5 w-5" />} trend="down" trendLabel="18 auto-verified" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFSection title="Student Attendance & Health Radar" className="lg:col-span-2">
          <VFDataTable columns={studentColumns} data={studentData} filterPlaceholder="Search student name or class..." />
        </VFSection>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Recommended Actions
              </h2>
              <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-md font-bold">3 Ready</span>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => setSelectedNotice('Fee Reminder notice queued for 14 defaulters.')}
                className="w-full text-left p-3.5 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Review Fee Defaulters (14)</p>
                    <span className="text-xs bg-primary/15 text-primary px-1.5 py-0.2 rounded-md font-semibold">AI Badge</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Auto WhatsApp reminders prepared</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedNotice('Parental alert trigger queued for Priya Patel.')}
                className="w-full text-left p-3.5 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Absence Alert (Priya Patel)</p>
                    <span className="text-xs bg-warning/15 text-warning px-1.5 py-0.2 rounded-md font-semibold">AI Flag</span>
                  </div>
                  <p className="text-xs text-muted-foreground">3 consecutive absences flagged</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedNotice('Class 10-A substitute teacher auto-assigned.')}
                className="w-full text-left p-3.5 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Staff Absence Substitute</p>
                    <span className="text-xs bg-success/15 text-success px-1.5 py-0.2 rounded-md font-semibold">AI Match</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Mr. Verma matched (Free Period 3)</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-foreground border-b border-border pb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> System Operational Status
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-muted/30 rounded-lg border border-border/60">
                <span className="flex items-center gap-2 text-foreground font-medium">
                  <ShieldCheck className="h-4 w-4 text-success" /> OCR Document Engine
                </span>
                <span className="text-success font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Operational
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-muted/30 rounded-lg border border-border/60">
                <span className="flex items-center gap-2 text-foreground font-medium">
                  <ShieldCheck className="h-4 w-4 text-success" /> Biometric Sync
                </span>
                <span className="text-success font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. Principal Radar Submodule Content
  const principalRadarContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <VFStatCard title="Institutional Health Score" value="96.4 / 100" icon={<Award className="h-5 w-5" />} trend="up" trendLabel="Grade A+ Status" />
        <VFStatCard title="Term Exam Pass Rate" value="94.8%" icon={<GraduationCap className="h-5 w-5" />} trend="up" trendLabel="+2.4% vs Term 1" />
        <VFStatCard title="Fee Collection Liquidity" value="89.2%" icon={<DollarSign className="h-5 w-5" />} trend="neutral" trendLabel="₹1.84 Cr Collected" />
        <VFStatCard title="Staff Retention Rate" value="98.6%" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="Optimal Culture" />
      </div>

      <VFSection title="Multi-Branch Campus Comparison">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-card border border-border rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground text-sm">Main Campus (New Delhi)</span>
              <VFBadge variant="success">98.1% Capacity</VFBadge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Students</span>
                <p className="font-bold text-foreground mt-0.5">2,480</p>
              </div>
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Attendance</span>
                <p className="font-bold text-success mt-0.5">96.2%</p>
              </div>
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Staff Load</span>
                <p className="font-bold text-primary mt-0.5">164 Staff</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card border border-border rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground text-sm">North Suburbs Branch</span>
              <VFBadge variant="outline">84.2% Capacity</VFBadge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Students</span>
                <p className="font-bold text-foreground mt-0.5">1,120</p>
              </div>
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Attendance</span>
                <p className="font-bold text-success mt-0.5">93.8%</p>
              </div>
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Staff Load</span>
                <p className="font-bold text-primary mt-0.5">78 Staff</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-card border border-border rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground text-sm">Westside Primary Branch</span>
              <VFBadge variant="primary">91.0% Capacity</VFBadge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Students</span>
                <p className="font-bold text-foreground mt-0.5">850</p>
              </div>
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Attendance</span>
                <p className="font-bold text-success mt-0.5">95.4%</p>
              </div>
              <div className="p-2 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Staff Load</span>
                <p className="font-bold text-primary mt-0.5">52 Staff</p>
              </div>
            </div>
          </div>
        </div>
      </VFSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="Institutional Regulatory & Board Compliance">
          <div className="space-y-3 text-xs mt-2">
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">CBSE Annual Institutional Audit</p>
                <p className="text-muted-foreground text-xs">Infrastructure & Staff Ratios verified</p>
              </div>
              <VFBadge variant="success">Passed 100%</VFBadge>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">RTE Act Compliance & Seat Allocation</p>
                <p className="text-muted-foreground text-xs">25% Economically Weaker Section reserved</p>
              </div>
              <VFBadge variant="success">Compliant</VFBadge>
            </div>
          </div>
        </VFCard>

        <VFCard title="Strategic Executive Directives">
          <div className="space-y-3 text-xs mt-2">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/25 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Term 2 Examination Admit Card Release</p>
                <p className="text-muted-foreground text-xs">Auto-hold enabled for fee defaulters &gt; ₹15,000</p>
              </div>
              <VFBadge variant="primary">Active Rule</VFBadge>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Smart Lab Infrastructure Upgrade</p>
                <p className="text-muted-foreground text-xs">₹12.5L procurement order queued</p>
              </div>
              <VFBadge variant="outline">In Review</VFBadge>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 3. Teacher Portal Submodule Content
  const teacherPortalContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Welcome Back, Dr. Rajesh Sharma</h3>
            <p className="text-xs text-muted-foreground">Senior Physics Educator · Class Teacher 10-A</p>
          </div>
        </div>
        <VFBadge variant="success">4 Periods Today</VFBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="Today's Teaching Schedule">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { period: 'Period 1 (08:30 - 09:15)', class: 'Class 10-A (Physics Lab)', topic: 'Electromagnetic Induction', status: 'Completed' },
              { period: 'Period 3 (10:15 - 11:00)', class: 'Class 12-Sci (Physics)', topic: 'Wave Optics & Interference', status: 'In Progress' },
              { period: 'Period 5 (12:15 - 01:00)', class: 'Class 9-B (General Science)', topic: 'Laws of Motion', status: 'Upcoming' },
              { period: 'Period 7 (02:00 - 02:45)', class: 'Class 10-B (Physics)', topic: 'Light Reflection', status: 'Upcoming' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border/60">
                <div>
                  <p className="font-bold text-foreground">{p.class}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.period} · {p.topic}</p>
                </div>
                <VFBadge variant={p.status === 'Completed' ? 'success' : p.status === 'In Progress' ? 'warning' : 'outline'}>{p.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Pending Grading & Homework Submissions">
          <div className="space-y-3 mt-2 text-xs">
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Class 10-A Physics Term Assignment</p>
                <p className="text-muted-foreground text-xs mt-0.5">38 of 40 Submissions Received</p>
              </div>
              <VFButton size="sm" variant="outline">Grade Papers</VFButton>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Class 12-Sci Optics Numerical Quiz</p>
                <p className="text-muted-foreground text-xs mt-0.5">Auto-graded by AI Engine (Avg: 84%)</p>
              </div>
              <VFButton size="sm" variant="outline">View Results</VFButton>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Class 9-B Motion Practicals Log</p>
                <p className="text-muted-foreground text-xs mt-0.5">28 of 32 Submissions Pending Review</p>
              </div>
              <VFButton size="sm" variant="outline">Open Portal</VFButton>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 4. Student View Submodule Content
  const studentViewContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-card border border-border rounded-xl text-center shadow-xs">
          <span className="text-muted-foreground uppercase font-bold text-[10px] tracking-wider">Attendance Gauge</span>
          <p className="text-2xl font-black text-success mt-2">98.2%</p>
          <p className="text-xs text-muted-foreground mt-1">1 Present Day Missed</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-xl text-center shadow-xs">
          <span className="text-muted-foreground uppercase font-bold text-[10px] tracking-wider">Current Academic Rank</span>
          <p className="text-2xl font-black text-primary mt-2">Rank #3</p>
          <p className="text-xs text-muted-foreground mt-1">GPA 3.92 / 4.0</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-xl text-center shadow-xs">
          <span className="text-muted-foreground uppercase font-bold text-[10px] tracking-wider">Fee Clearance</span>
          <p className="text-2xl font-black text-foreground mt-2">₹0 Due</p>
          <p className="text-xs text-success font-semibold mt-1">Term 1 Receipt Paid</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-xl text-center shadow-xs">
          <span className="text-muted-foreground uppercase font-bold text-[10px] tracking-wider">Library Books Issued</span>
          <p className="text-2xl font-black text-foreground mt-2">2 Books</p>
          <p className="text-xs text-muted-foreground mt-1">Due in 5 Days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="Upcoming Exams & Assessment Schedule">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { subject: 'Physics Mid-Term Exam', date: 'Aug 14, 2026', duration: '3 Hours', syllabus: 'Chapters 1 - 6' },
              { subject: 'Mathematics Unit Test', date: 'Aug 18, 2026', duration: '1.5 Hours', syllabus: 'Calculus & Vectors' },
              { subject: 'Chemistry Lab Evaluation', date: 'Aug 22, 2026', duration: '2 Hours', syllabus: 'Organic Synthesis' },
            ].map((e, idx) => (
              <div key={idx} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{e.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.syllabus} · {e.duration}</p>
                </div>
                <VFBadge variant="outline">{e.date}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Recent Academic Achievements & Certificates">
          <div className="space-y-2.5 text-xs mt-2">
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-foreground">Science Olympiad 1st Rank</p>
                  <p className="text-xs text-muted-foreground">National Level Competition</p>
                </div>
              </div>
              <VFBadge variant="primary">Gold Medal</VFBadge>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-success shrink-0" />
                <div>
                  <p className="font-bold text-foreground">100% Attendance Award</p>
                  <p className="text-xs text-muted-foreground">Academic Term 1</p>
                </div>
              </div>
              <VFBadge variant="success">Certificate</VFBadge>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 5. Revenue Radar Submodule Content
  const feeBreakdownData = [
    { head: 'Tuition Fee (Q2)', total: '₹2.80 Cr', collected: '₹2.52 Cr', pending: '₹28.0 L', rate: '90.0%' },
    { head: 'Transport Route Fee', total: '₹85.0 L', collected: '₹78.2 L', pending: '₹6.8 L', rate: '92.0%' },
    { head: 'Hostel & Mess Charges', total: '₹62.0 L', collected: '₹55.8 L', pending: '₹6.2 L', rate: '90.0%' },
    { head: 'Lab & Computer Fee', total: '₹35.0 L', collected: '₹34.0 L', pending: '₹1.0 L', rate: '97.1%' },
    { head: 'Examination Fee', total: '₹23.0 L', collected: '₹22.5 L', pending: '₹50.0 K', rate: '97.8%' },
  ];

  const feeColumns = [
    { header: 'Fee Category / Head', accessorKey: 'head', cell: (r: any) => <span className="font-bold text-foreground">{r.head}</span> },
    { header: 'Total Billed', accessorKey: 'total' },
    { header: 'Collected', accessorKey: 'collected', cell: (r: any) => <span className="text-success font-bold">{r.collected}</span> },
    { header: 'Pending Dues', accessorKey: 'pending', cell: (r: any) => <span className="text-destructive font-bold">{r.pending}</span> },
    { header: 'Collection Rate', accessorKey: 'rate', cell: (r: any) => <VFBadge variant="success">{r.rate}</VFBadge> },
  ];

  const revenueRadarContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Annual Fee Revenue" value="₹4.85 Cr" icon={<DollarSign className="h-5 w-5" />} trend="up" trendLabel="+8.4% YoY" />
        <VFStatCard title="Online Payment Gateway" value="₹3.12 Cr" icon={<TrendingUp className="h-5 w-5" />} trend="up" trendLabel="64% via UPI/Netbanking" />
        <VFStatCard title="Total Dues Outstanding" value="₹24.8 Lakhs" icon={<AlertTriangle className="h-5 w-5" />} trend="down" trendLabel="14 Critical Defaulters" />
        <VFStatCard title="Scholarships Granted" value="₹18.5 Lakhs" icon={<Award className="h-5 w-5" />} trend="neutral" trendLabel="42 Beneficiaries" />
      </div>

      <VFSection title="Fee Heads Collection & Cashbook Summary">
        <VFDataTable columns={feeColumns} data={feeBreakdownData} filterPlaceholder="Search fee category..." />
      </VFSection>
    </div>
  );

  // 6. Academic Quality Submodule Content
  const academicQualityContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Top Performing Subject">
          <p className="text-lg font-bold text-foreground mt-1">Physics & Mathematics</p>
          <p className="text-xs text-success font-bold mt-1">94.2% Class Average</p>
        </VFCard>
        <VFCard title="Remedial Support Flagged">
          <p className="text-lg font-bold text-foreground mt-1">Chemistry (Class 9-B)</p>
          <p className="text-xs text-warning font-bold mt-1">24 Students Flagged for Extra Remedial</p>
        </VFCard>
        <VFCard title="Board Exam Merit Candidates">
          <p className="text-lg font-bold text-foreground mt-1">42 Candidates</p>
          <p className="text-xs text-primary font-bold mt-1">Predicted &gt;95% Percentile</p>
        </VFCard>
      </div>

      <VFCard title="Departmental Academic Performance Breakdown">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <p className="font-bold text-foreground">Science Department</p>
            <p className="text-muted-foreground mt-0.5">Physics, Chem, Bio · 92.4% Avg</p>
            <VFBadge variant="success" className="mt-2">Optimal Progress</VFBadge>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <p className="font-bold text-foreground">Mathematics Department</p>
            <p className="text-muted-foreground mt-0.5">Algebra, Calculus · 89.6% Avg</p>
            <VFBadge variant="success" className="mt-2">Strong Growth</VFBadge>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <p className="font-bold text-foreground">Humanities & Languages</p>
            <p className="text-muted-foreground mt-0.5">English, History · 86.8% Avg</p>
            <VFBadge variant="outline" className="mt-2">On Track</VFBadge>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // 7. Staff Workload Submodule Content
  const staffWorkloadContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Active Staff" value="242 Staff" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="164 Teaching · 78 Support" />
        <VFStatCard title="Average Weekly Load" value="26.4 Periods" icon={<Clock className="h-5 w-5" />} trend="up" trendLabel="Balanced Workload" />
        <VFStatCard title="Staff Attendance Today" value="97.5%" icon={<UserCheck className="h-5 w-5" />} trend="neutral" trendLabel="6 Staff Members on Leave" />
        <VFStatCard title="Substitute Matched Today" value="4 Substitutes" icon={<Briefcase className="h-5 w-5" />} trend="up" trendLabel="100% Free Period Auto-Matched" />
      </div>

      <VFCard title="Departmental Period Allocation & Free Period Availability">
        <div className="space-y-2.5 text-xs mt-2">
          {[
            { dept: 'Physics & Science Department', head: 'Dr. Rajesh Sharma', totalStaff: '28 Teachers', load: '24 Periods / Wk', status: 'Optimal' },
            { dept: 'Mathematics Department', head: 'Mrs. Sunita Verma', totalStaff: '32 Teachers', load: '26 Periods / Wk', status: 'Optimal' },
            { dept: 'Languages & Humanities', head: 'Mr. Arvind Gupta', totalStaff: '40 Teachers', load: '22 Periods / Wk', status: 'Balanced' },
          ].map((d, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{d.dept}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Head: {d.head} · {d.totalStaff}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground">{d.load}</span>
                <VFBadge variant="success">{d.status}</VFBadge>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // 8. AI Executive Submodule Content
  const aiExecutiveContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="AI Insights Triggered" value="142" icon={<Sparkles className="h-5 w-5" />} trend="up" trendLabel="+34 This Week" />
        <VFStatCard title="Auto Reminders Sent" value="1,280" icon={<Activity className="h-5 w-5" />} trend="up" trendLabel="WhatsApp & SMS" />
        <VFStatCard title="Anomaly Detection Rate" value="98.4%" icon={<ShieldCheck className="h-5 w-5" />} trend="up" trendLabel="High Precision" />
        <VFStatCard title="Staff Time Saved" value="145 Hours" icon={<Clock className="h-5 w-5" />} trend="up" trendLabel="This Month" />
      </div>

      <div className="bg-card border border-border p-4 rounded-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">VidyaFlow Autonomous AI Radar</h3>
            <p className="text-xs text-muted-foreground">Continuous predictive monitoring across attendance, fee defaulters, and academic drop-offs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-muted/40 rounded-xl border border-border/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Absenteeism Risk Prediction</span>
              <VFBadge variant="warning">94% Accuracy</VFBadge>
            </div>
            <p className="text-muted-foreground">AI flagged 3 candidates likely to exceed 15% absenteeism threshold before end of term.</p>
          </div>

          <div className="p-4 bg-muted/40 rounded-xl border border-border/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Fee Defaulter Propensity</span>
              <VFBadge variant="primary">AI Automation</VFBadge>
            </div>
            <p className="text-muted-foreground">Auto-generated WhatsApp payment links scheduled to trigger on 1st of every month.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const submoduleTabs = [
    { id: 'overview', label: 'Overview', icon: <Activity className="h-3.5 w-3.5" />, content: overviewContent },
    { id: 'principal-radar', label: 'Principal Radar', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: principalRadarContent },
    { id: 'teacher-portal', label: 'Teacher Portal', icon: <GraduationCap className="h-3.5 w-3.5" />, content: teacherPortalContent },
    { id: 'student-view', label: 'Student View', icon: <Users className="h-3.5 w-3.5" />, content: studentViewContent },
    { id: 'revenue-radar', label: 'Revenue Radar', icon: <DollarSign className="h-3.5 w-3.5" />, content: revenueRadarContent },
    { id: 'academic-quality', label: 'Academic Quality', icon: <BookOpen className="h-3.5 w-3.5" />, content: academicQualityContent },
    { id: 'staff-workload', label: 'Staff Workload', icon: <Clock className="h-3.5 w-3.5" />, content: staffWorkloadContent },
    { id: 'ai-executive', label: 'AI Executive', icon: <Sparkles className="h-3.5 w-3.5 text-primary" />, content: aiExecutiveContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        defaultTabId="overview"
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
