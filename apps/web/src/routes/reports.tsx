import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFTabs,
  VFBadge,
} from '@vidyafloww/ui';
import {
  FileSpreadsheet,
  BarChart3,
  ShieldCheck,
  Download,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
});

interface ReportTemplate {
  id: string;
  code: string;
  name: string;
  category: 'Academics' | 'Attendance' | 'Finance' | 'Compliance';
  format: 'Excel (.xlsx)' | 'PDF (.pdf)' | 'Both';
  frequency: string;
  lastGenerated: string;
  status: 'Ready';
}

function ReportsPage() {
  const [downloadAlert, setDownloadAlert] = React.useState<string | null>(null);

  const reportList: ReportTemplate[] = [
    { id: '1', code: 'REP-CBSE-01', name: 'CBSE Annual Accreditation Compliance Report', category: 'Compliance', format: 'PDF (.pdf)', frequency: 'Annual', lastGenerated: 'Today, 09:30 AM', status: 'Ready' },
    { id: '2', code: 'REP-ATT-02', name: 'Monthly Student & Staff Attendance Audit Register', category: 'Attendance', format: 'Excel (.xlsx)', frequency: 'Monthly', lastGenerated: 'Today, 08:00 AM', status: 'Ready' },
    { id: '3', code: 'REP-FEE-03', name: 'Quarterly Fee Collection & Defaulter Audit Report', category: 'Finance', format: 'Excel (.xlsx)', frequency: 'Quarterly', lastGenerated: 'Yesterday', status: 'Ready' },
    { id: '4', code: 'REP-ACAD-04', name: 'Term 1 Grade Performance & GPA Analysis', category: 'Academics', format: 'Both', frequency: 'Term-wise', lastGenerated: '12 Aug 2026', status: 'Ready' },
    { id: '5', code: 'REP-RTE-05', name: 'RTE 25% Reservation Verification Report', category: 'Compliance', format: 'PDF (.pdf)', frequency: 'Session-wise', lastGenerated: '10 Aug 2026', status: 'Ready' },
  ];

  const reportColumns = [
    {
      header: 'Report Code',
      accessorKey: 'code',
      cell: (r: ReportTemplate) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border text-xs">
          {r.code}
        </span>
      ),
    },
    {
      header: 'Report Title',
      accessorKey: 'name',
      cell: (r: ReportTemplate) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.name}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.category} Audit</p>
        </div>
      ),
    },
    {
      header: 'Export Format',
      accessorKey: 'format',
      cell: (r: ReportTemplate) => <VFBadge variant="outline">{r.format}</VFBadge>,
    },
    {
      header: 'Frequency',
      accessorKey: 'frequency',
      cell: (r: ReportTemplate) => <span className="text-foreground font-bold text-xs">{r.frequency}</span>,
    },
    {
      header: 'Last Exported',
      accessorKey: 'lastGenerated',
      cell: (r: ReportTemplate) => <span className="text-muted-foreground text-xs font-semibold">{r.lastGenerated}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: ReportTemplate) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (r: ReportTemplate) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Download className="h-3.5 w-3.5" />}
          onClick={() => setDownloadAlert(`Generating and downloading ${r.name}...`)}
        >
          Export Now
        </VFButton>
      ),
    },
  ];

  // 1. Report Center View
  const reportCenterContent = (
    <div className="space-y-4 sm:space-y-6">
      {downloadAlert && (
        <div className="p-4 bg-muted/60 border border-border rounded-md text-sm text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{downloadAlert}</span>
          </div>
          <button
            onClick={() => setDownloadAlert(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Audit Registers</span>
            <span className="text-2xl font-black text-foreground mt-1 block">18 Ready</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">1-Click Excel Export</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">CBSE Compliance</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">100% Ready</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">Board Standard 2026</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Attendance Accuracy</span>
            <span className="text-2xl font-black text-foreground mt-1 block">99.8%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Biometric Linked</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Fee Reconciliations</span>
            <span className="text-2xl font-black text-foreground mt-1 block">₹4.86 Cr</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Quarter 2 Audited</span>
          </div>
        </div>
      </div>

      {/* Main Reports Master Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-foreground tracking-tight">Institutional Reports & Analytics Master</h2>
            <p className="text-xs text-muted-foreground font-medium">Export official state board audits, academic performance summaries, and financial reports</p>
          </div>
          <VFButton
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => setDownloadAlert('Downloading complete school master audit bundle (ZIP)...')}
          >
            Export Full Audit Bundle
          </VFButton>
        </div>

        <VFDataTable
          columns={reportColumns}
          data={reportList}
          filterPlaceholder="Search report templates by name, code, or category..."
        />
      </div>
    </div>
  );

  const tabs = [
    { id: 'reports', label: 'Institutional Reports', icon: <FileSpreadsheet className="h-4 w-4" />, content: reportCenterContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="reports" variant="top-bar" />
    </VFPageContainer>
  );
}
