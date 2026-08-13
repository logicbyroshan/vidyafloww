import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  BarChart3,
  FileText,
  Clock,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Plus,
  Download,
  Calendar,
  Layers,
  Database,
} from 'lucide-react';

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
});

function ReportsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const reportData = [
    { code: 'RPT-ADM-2026', title: 'Monthly Admissions & Conversion Analytics', category: 'Admissions', schedule: '1st of Every Month', format: 'PDF & Excel', recipients: 'Principal, Admissions Head', status: 'Active' },
    { code: 'RPT-FIN-2026', title: 'Term 1 Fee Collection Defaulters Ledger', category: 'Finance', schedule: 'Weekly (Mondays)', format: 'PDF Document', recipients: 'Accounts Officer', status: 'Active' },
    { code: 'RPT-ATT-2026', title: 'Below 75% Low Attendance Watchlist', category: 'Attendance', schedule: 'Daily 05:00 PM', format: 'Excel Sheet', recipients: 'Vice Principal', status: 'Active' },
  ];

  const reportColumns = [
    { header: 'Report Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Report Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Domain Category', accessorKey: 'category' },
    { header: 'Automated Schedule', accessorKey: 'schedule' },
    { header: 'Export Format', accessorKey: 'format', cell: (r: any) => <VFBadge variant="outline">{r.format}</VFBadge> },
    { header: 'Recipients', accessorKey: 'recipients' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Reports Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Generated Reports" value="142 Reports" icon={<BarChart3 className="h-5 w-5 text-primary" />} trend="up" trendLabel="This Academic Term" />
        <VFStatCard title="Scheduled Auto-Exports" value="18 Jobs" icon={<Calendar className="h-5 w-5 text-emerald-500" />} trend="neutral" trendLabel="Email & Cloud Sync" />
        <VFStatCard title="Custom Builder Templates" value="24 Templates" icon={<FileText className="h-5 w-5 text-amber-500" />} description="User Configured" />
        <VFStatCard title="Data Query Performance" value="1.2 Secs" icon={<TrendingUp className="h-5 w-5 text-purple-500" />} description="Indexed SQL Queries" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Student Reports
  // ----------------------------------------------------
  const studentReportsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Operational Student Administrative Reporting Workspace</h3>
          <p className="text-xs text-muted-foreground">Demographic breakdowns, student strength rosters, and category/gender distribution.</p>
        </div>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Student Master Report (PDF)</VFButton>
      </div>
      <VFDataTable columns={reportColumns} data={reportData} filterPlaceholder="Search report title or category..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Admission Reports
  // ----------------------------------------------------
  const admissionReportsContent = (
    <div className="space-y-4">
      <VFCard title="Enquiry Lead Pipeline & Funnel Conversion Reports">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Track lead sources, enquiry conversion rates, and seat occupancy percentages.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Attendance Reports
  // ----------------------------------------------------
  const attendanceReportsContent = (
    <div className="space-y-4">
      <VFCard title="Monthly Homeroom & Subject Attendance Summaries">
        <p className="text-xs text-muted-foreground mb-3">Class-wise attendance percentage, consecutive absent logs, and low attendance watchlists.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Academic Reports
  // ----------------------------------------------------
  const academicReportsContent = (
    <div className="space-y-4">
      <VFCard title="Syllabus Progress & Classroom Learning Analytics">
        <p className="text-xs text-muted-foreground mb-3">Syllabus completion pacing, lesson plan coverage, and teacher diary logs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Examination Reports
  // ----------------------------------------------------
  const examinationReportsContent = (
    <div className="space-y-4">
      <VFCard title="Term Exam Performance, Grade Distribution & Topper Lists">
        <p className="text-xs text-muted-foreground mb-3">Subject pass percentages, bell-curve grade distribution, and CBSE result summaries.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Fee Reports
  // ----------------------------------------------------
  const feeReportsContent = (
    <div className="space-y-4">
      <VFCard title="Fee Collection, Defaulter Ledgers & Concession Analytics">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-emerald-500 font-bold">Daily counter collection summaries, head-wise fee split, and defaulter ageings.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — HR Reports
  // ----------------------------------------------------
  const hrReportsContent = (
    <div className="space-y-4">
      <VFCard title="Staff Attrition, Biometric Attendance & Payroll Summary">
        <p className="text-xs text-muted-foreground mb-3">Monthly salary register, PF/ESI challans, and staff leave balance statements.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Library Reports
  // ----------------------------------------------------
  const libraryReportsContent = (
    <div className="space-y-4">
      <VFCard title="Book Circulation Statistics & Overdue Fine Ledgers">
        <p className="text-xs text-muted-foreground mb-3">Most borrowed books, category distribution, and library fine collections.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Transport Reports
  // ----------------------------------------------------
  const transportReportsContent = (
    <div className="space-y-4">
      <VFCard title="Bus Fleet Route Utilization & Fuel Expense Analytics">
        <p className="text-xs text-muted-foreground mb-3">Route capacity utilization, mileage km/L logs, and driver overtime hours.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Inventory Reports
  // ----------------------------------------------------
  const inventoryReportsContent = (
    <div className="space-y-4">
      <VFCard title="Consumable Stock Valuation & Department Issue Logs">
        <p className="text-xs text-muted-foreground mb-3">Stock movement ledgers, vendor purchase order reports, and low-stock alerts.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Activity Reports
  // ----------------------------------------------------
  const activityReportsContent = (
    <div className="space-y-4">
      <VFCard title="Extracurricular Participation & House Cup Standings">
        <p className="text-xs text-muted-foreground mb-3">Club participation rates, house championship points, and competition trophies.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Custom Reports
  // ----------------------------------------------------
  const customReportsContent = (
    <div className="space-y-4">
      <VFCard title="User-Defined Saved Custom Reports Library">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Custom operational query templates saved for quick 1-click execution.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Report Builder
  // ----------------------------------------------------
  const reportBuilderContent = (
    <div className="space-y-4">
      <VFCard title="Visual Drag-and-Drop Cross-Module Report Builder">
        <p className="text-xs text-muted-foreground mb-3">Select fields across Students, Fees, and Exams to build custom multi-domain reports.</p>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Launch Report Builder</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Data Explorer
  // ----------------------------------------------------
  const dataExplorerContent = (
    <div className="space-y-4">
      <VFCard title="Ad-Hoc Data Explorer & Visual SQL Query Console">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Explore raw data tables with filters, aggregations, and instant charting.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Exports
  // ----------------------------------------------------
  const exportsContent = (
    <div className="space-y-4">
      <VFCard title="Bulk File Export Manager (PDF, Excel, CSV, JSON)">
        <p className="text-xs text-muted-foreground mb-3">Download queued bulk export files with background generation notification.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — Scheduled Reports
  // ----------------------------------------------------
  const scheduledReportsContent = (
    <div className="space-y-4">
      <VFCard title="Automated Cron Scheduled Report Delivery">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Automated daily 08:00 AM attendance summary emailed to Principal inbox.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 18 — Report Templates
  // ----------------------------------------------------
  const reportTemplatesContent = (
    <div className="space-y-4">
      <VFCard title="Pre-Configured Executive Report Template Catalog">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">CBSE Board Annual Statement</span>
            <p className="text-muted-foreground text-xs mt-1">Pre-built format compliant with CBSE mandatory disclosure</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Financial Audit Trail Report</span>
            <p className="text-muted-foreground text-xs mt-1">CA auditor format fee and expense ledger</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">RTE 25% Reservation Report</span>
            <p className="text-muted-foreground text-xs mt-1">State Education Dept quota compliance statement</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 18 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Reports Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'student-reports', label: 'Student Reports', icon: <Users className="h-3.5 w-3.5" />, content: studentReportsContent },
    { id: 'admission-reports', label: 'Admission Reports', icon: <FileText className="h-3.5 w-3.5" />, content: admissionReportsContent },
    { id: 'attendance-reports', label: 'Attendance Reports', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: attendanceReportsContent },
    { id: 'academic-reports', label: 'Academic Reports', icon: <Award className="h-3.5 w-3.5" />, content: academicReportsContent },
    { id: 'examination-reports', label: 'Examination Reports', icon: <Award className="h-3.5 w-3.5" />, content: examinationReportsContent },
    { id: 'fee-reports', label: 'Fee Reports', icon: <TrendingUp className="h-3.5 w-3.5" />, content: feeReportsContent },
    { id: 'hr-reports', label: 'HR Reports', icon: <Users className="h-3.5 w-3.5" />, content: hrReportsContent },
    { id: 'library-reports', label: 'Library Reports', icon: <FileText className="h-3.5 w-3.5" />, content: libraryReportsContent },
    { id: 'transport-reports', label: 'Transport Reports', icon: <FileText className="h-3.5 w-3.5" />, content: transportReportsContent },
    { id: 'inventory-reports', label: 'Inventory Reports', icon: <Layers className="h-3.5 w-3.5" />, content: inventoryReportsContent },
    { id: 'activity-reports', label: 'Activity Reports', icon: <Award className="h-3.5 w-3.5" />, content: activityReportsContent },
    { id: 'custom-reports', label: 'Custom Reports', icon: <FileText className="h-3.5 w-3.5" />, content: customReportsContent },
    { id: 'report-builder', label: 'Report Builder', icon: <Plus className="h-3.5 w-3.5" />, content: reportBuilderContent },
    { id: 'data-explorer', label: 'Data Explorer', icon: <Database className="h-3.5 w-3.5" />, content: dataExplorerContent },
    { id: 'exports', label: 'Exports', icon: <Download className="h-3.5 w-3.5" />, content: exportsContent },
    { id: 'scheduled-reports', label: 'Scheduled Reports', icon: <Clock className="h-3.5 w-3.5" />, content: scheduledReportsContent },
    { id: 'report-templates', label: 'Report Templates', icon: <FileText className="h-3.5 w-3.5" />, content: reportTemplatesContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
