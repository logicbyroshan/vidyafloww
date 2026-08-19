import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
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
      cell: (r: ReportTemplate) => <span className="font-mono font-bold text-primary text-base">{r.code}</span>,
    },
    {
      header: 'Report Title',
      accessorKey: 'name',
      cell: (r: ReportTemplate) => (
        <div>
          <p className="font-extrabold text-foreground text-base leading-tight">{r.name}</p>
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
      cell: (r: ReportTemplate) => <span className="text-foreground font-bold text-base">{r.frequency}</span>,
    },
    {
      header: 'Last Exported',
      accessorKey: 'lastGenerated',
      cell: (r: ReportTemplate) => <span className="text-muted-foreground text-base font-semibold">{r.lastGenerated}</span>,
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
    <div className="space-y-6">
      {downloadAlert && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
            <span className="font-bold">{downloadAlert}</span>
          </div>
          <button
            onClick={() => setDownloadAlert(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Audit Registers"
          value="18 Ready"
          icon={<FileSpreadsheet className="h-5 w-5" />}
          trend="up"
          trendLabel="1-Click Excel Export"
          accentColor="cyan"
        />
        <VFStatCard
          title="CBSE Compliance"
          value="100% Ready"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="Board Standard 2026"
          accentColor="emerald"
        />
        <VFStatCard
          title="Attendance Accuracy"
          value="99.8%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="Biometric Gate Linked"
          accentColor="blue"
        />
        <VFStatCard
          title="Fee Reconciliations"
          value="₹4.86 Cr"
          icon={<BarChart3 className="h-5 w-5" />}
          trend="up"
          trendLabel="Quarter 2 Audited"
          accentColor="amber"
        />
      </div>

      {/* Main Reports Master Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Institutional Reports & Analytics Master</h2>
            <p className="text-sm text-muted-foreground font-medium">Export official state board audits, academic performance summaries, and financial reports</p>
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
