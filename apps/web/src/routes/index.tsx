import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFBadge,
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
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const [selectedNotice, setSelectedNotice] = React.useState<string | null>(null);

  const mockData = [
    {
      id: '1',
      name: 'Rahul Sharma',
      class: '10-A',
      status: 'Present',
      riskScore: 'Low (4%)',
      aiInsight: 'Optimal Performance',
      lastUpdate: '08:30 AM',
    },
    {
      id: '2',
      name: 'Priya Patel',
      class: '10-A',
      status: 'Absent',
      riskScore: 'High (78%)',
      aiInsight: '3rd consecutive absence',
      lastUpdate: '08:35 AM',
    },
    {
      id: '3',
      name: 'Amit Kumar',
      class: '9-B',
      status: 'Present',
      riskScore: 'Low (8%)',
      aiInsight: 'Math improvement +14%',
      lastUpdate: '08:20 AM',
    },
    {
      id: '4',
      name: 'Sneha Singh',
      class: '11-Sci',
      status: 'Late',
      riskScore: 'Med (42%)',
      aiInsight: 'Late arrival pattern',
      lastUpdate: '09:15 AM',
    },
    {
      id: '5',
      name: 'Vikram Mehta',
      class: '12-Com',
      status: 'Present',
      riskScore: 'Low (2%)',
      aiInsight: 'Scholarship candidate',
      lastUpdate: '08:25 AM',
    },
  ];

  const columns = [
    { header: 'Student Name', accessorKey: 'name', sortable: true },
    { header: 'Class', accessorKey: 'class', sortable: true },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row: any) => (
        <VFBadge
          variant={
            row.status === 'Present'
              ? 'success'
              : row.status === 'Absent'
              ? 'danger'
              : 'warning'
          }
        >
          {row.status}
        </VFBadge>
      ),
    },
    {
      header: 'Risk Score',
      accessorKey: 'riskScore',
      cell: (row: any) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 w-max ${
            row.riskScore.startsWith('High')
              ? 'bg-destructive/15 text-destructive border border-destructive/30'
              : row.riskScore.startsWith('Med')
              ? 'bg-warning/15 text-warning border border-warning/30'
              : 'bg-success/15 text-success border border-success/30'
          }`}
        >
          {row.riskScore}
        </span>
      ),
    },
    {
      header: 'AI Note',
      accessorKey: 'aiInsight',
      cell: (row: any) => (
        <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
          <Sparkles className="h-3.5 w-3.5 text-primary/80 shrink-0" />
          {row.aiInsight}
        </span>
      ),
    },
    { header: 'Updated', accessorKey: 'lastUpdate' },
  ];

  return (
    <VFPageContainer className="p-6 max-w-full space-y-6">
      {/* Toast Notice */}
      {selectedNotice && (
        <div className="p-4 bg-primary/10 border border-primary/25 rounded-xl text-xs text-foreground flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium">{selectedNotice}</span>
          </div>
          <button
            onClick={() => setSelectedNotice(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <VFStatCard
          title="Total Enrolled Students"
          value="2,451"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel="+12 this month"
        />
        <VFStatCard
          title="Teaching Staff Efficiency"
          value="98.2%"
          icon={<GraduationCap className="h-5 w-5" />}
          description="Optimal schedule allocation"
        />
        <VFStatCard
          title="Today's Attendance"
          value="94.5%"
          icon={<CalendarCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="+1.2% vs yesterday"
        />
        <VFStatCard
          title="Pending Applications"
          value="28"
          icon={<FileText className="h-5 w-5" />}
          trend="down"
          trendLabel="18 auto-verified"
        />
      </div>

      {/* Main Grid: 2/3 Attendance Radar, 1/3 AI Action Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Table Section */}
        <VFSection title="Student Attendance & Health Radar" className="lg:col-span-2">
          <VFDataTable
            columns={columns}
            data={mockData}
            filterPlaceholder="Search student name or class..."
          />
        </VFSection>

        {/* Right Side Widgets Column */}
        <div className="space-y-6">
          {/* AI Action Engine Widget Box */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Recommended Actions
              </h2>
              <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-md font-bold">
                3 Ready
              </span>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => setSelectedNotice('Fee Reminder notice queued for 14 defaulters.')}
                className="w-full text-left p-3.5 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      Review Fee Defaulters (14)
                    </p>
                    <span className="text-[9px] bg-primary/15 text-primary px-1.5 py-0.2 rounded font-semibold">
                      AI Badge
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Auto WhatsApp reminders prepared</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedNotice('Parental alert trigger queued for Priya Patel.')}
                className="w-full text-left p-3.5 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      Absence Alert (Priya Patel)
                    </p>
                    <span className="text-[9px] bg-warning/15 text-warning px-1.5 py-0.2 rounded font-semibold">
                      AI Flag
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">3 consecutive absences flagged</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              <button
                onClick={() => setSelectedNotice('Class 10-A substitute teacher auto-assigned.')}
                className="w-full text-left p-3.5 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      Staff Absence Substitute
                    </p>
                    <span className="text-[9px] bg-success/15 text-success px-1.5 py-0.2 rounded font-semibold">
                      AI Match
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Mr. Verma matched (Free Period 3)</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>
            </div>
          </div>

          {/* System Operational Status Widget Box */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-3">
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
    </VFPageContainer>
  );
}
