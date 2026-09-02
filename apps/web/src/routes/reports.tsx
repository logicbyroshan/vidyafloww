import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFSelect,
  VFDialog,
  VFInput,
} from '@vidyafloww/ui';
import {
  FileSpreadsheet,
  Download,
  Plus,
  Check,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
});

interface ReportTemplate {
  id: string;
  code: string;
  name: string;
  category: 'Compliance' | 'Attendance' | 'Finance' | 'Academics';
  format: 'Excel (.xlsx)' | 'PDF (.pdf)' | 'Both';
  frequency: string;
  lastGenerated: string;
  status: 'Ready';
}

const INITIAL_REPORTS: ReportTemplate[] = [
  { id: '1', code: 'REP-CBSE-01', name: 'CBSE Annual Accreditation Compliance Report', category: 'Compliance', format: 'PDF (.pdf)', frequency: 'Annual Audit', lastGenerated: 'Today, 09:30 AM', status: 'Ready' },
  { id: '2', code: 'REP-ATT-02', name: 'Monthly Student & Staff Attendance Audit Register', category: 'Attendance', format: 'Excel (.xlsx)', frequency: 'Monthly', lastGenerated: 'Today, 08:00 AM', status: 'Ready' },
  { id: '3', code: 'REP-FEE-03', name: 'Quarterly Fee Collection & Defaulter Audit Report', category: 'Finance', format: 'Excel (.xlsx)', frequency: 'Quarterly', lastGenerated: 'Yesterday, 04:30 PM', status: 'Ready' },
  { id: '4', code: 'REP-ACAD-04', name: 'Term 1 Grade Performance & GPA Analysis Master', category: 'Academics', format: 'Both', frequency: 'Term-wise', lastGenerated: '12 Aug 2026', status: 'Ready' },
  { id: '5', code: 'REP-RTE-05', name: 'RTE 25% EWS Reservation Verification Report', category: 'Compliance', format: 'PDF (.pdf)', frequency: 'Session-wise', lastGenerated: '10 Aug 2026', status: 'Ready' },
  { id: '6', code: 'REP-TC-06', name: 'Transfer Certificate (TC) Issuance Ledger & Log', category: 'Compliance', format: 'Excel (.xlsx)', frequency: 'Realtime', lastGenerated: '08 Aug 2026', status: 'Ready' },
];

function ReportsPage() {
  const { addNotification } = useGlobalStore();
  const { t } = useTranslation();
  React.useEffect(() => { document.title = t('page.reports') + ' \u2013 VidyaFloww'; }, [t]);
  const [reports, setReports] = React.useState<ReportTemplate[]>(INITIAL_REPORTS);
  const [categoryFilter, setCategoryFilter] = React.useState<string>('All');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = React.useState(false);

  const [customReport, setCustomReport] = React.useState({
    name: '',
    category: 'Academics',
    format: 'Excel (.xlsx)',
    frequency: 'On-Demand',
  });

  const handleGenerateReport = (rName: string) => {
    addNotification({
      title: 'Report Generated & Exported',
      description: `Successfully compiled "${rName}". Downloading file...`,
      type: 'success',
    });
  };

  const handleCreateCustomReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReport.name) return;

    const added: ReportTemplate = {
      id: String(Date.now()),
      code: `REP-CUST-0${reports.length + 1}`,
      name: customReport.name,
      category: customReport.category as any,
      format: customReport.format as any,
      frequency: customReport.frequency,
      lastGenerated: 'Just Now',
      status: 'Ready',
    };

    setReports([added, ...reports]);
    setIsGenerateModalOpen(false);
    setCustomReport({ name: '', category: 'Academics', format: 'Excel (.xlsx)', frequency: 'On-Demand' });
    addNotification({
      title: 'Custom Report Compiled',
      description: `"${added.name}" added to reports repository.`,
      type: 'success',
    });
  };

  const filteredReports = React.useMemo(() => {
    if (categoryFilter === 'All') return reports;
    return reports.filter((r) => r.category === categoryFilter);
  }, [reports, categoryFilter]);

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
      header: 'Report Title & Category',
      accessorKey: 'name',
      cell: (r: ReportTemplate) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.name}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.category} Analytics</p>
        </div>
      ),
    },
    {
      header: 'Format',
      accessorKey: 'format',
      cell: (r: ReportTemplate) => (
        <VFBadge variant="outline" className="font-mono text-[11px]">
          {r.format}
        </VFBadge>
      ),
    },
    {
      header: 'Frequency',
      accessorKey: 'frequency',
      cell: (r: ReportTemplate) => <span className="text-foreground font-bold text-xs">{r.frequency}</span>,
    },
    {
      header: 'Last Compiled',
      accessorKey: 'lastGenerated',
      cell: (r: ReportTemplate) => <span className="text-muted-foreground text-xs font-semibold">{r.lastGenerated}</span>,
    },
    {
      header: t('col.status'),
      accessorKey: 'status',
      cell: (r: ReportTemplate) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
    {
      header: t('col.action'),
      accessorKey: 'action',
      cell: (r: ReportTemplate) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Download className="h-3.5 w-3.5" />}
          onClick={() => handleGenerateReport(r.name)}
        >
          Export Now
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* 1. Header Toolbar Box */}
      <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <FileSpreadsheet className="h-4 w-4" />
          </div>
          <span className="text-base font-extrabold text-foreground tracking-tight">
            {t('page.reports')}
          </span>
          <VFBadge variant="success" className="text-[10px] font-bold font-mono">
            CBSE & State Aligned
          </VFBadge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => setIsGenerateModalOpen(true)}
            className="h-9 px-3.5 text-xs font-bold shadow-xs"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {t('action.generate')}
          </VFButton>
        </div>
      </div>

      {/* 2. Global Dropdown Filters Bar */}
      <div className="p-3 rounded-lg bg-[#141414] border border-border/80 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <span className="text-xs font-extrabold text-foreground uppercase tracking-wider whitespace-nowrap">
            {t('action.filter')}:
          </span>
          <div className="w-56">
            <VFSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(String(e.target.value))}
              options={[
                { label: 'All Report Categories', value: 'All' },
                { label: 'Compliance & Legal', value: 'Compliance' },
                { label: 'Attendance Audit', value: 'Attendance' },
                { label: 'Finance & Accounts', value: 'Finance' },
                { label: 'Academics & GPA', value: 'Academics' },
              ]}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>
        </div>

        <span className="text-xs font-mono text-muted-foreground font-semibold">
          {filteredReports.length} Reports Ready
        </span>
      </div>

      {/* 3. Main Reports Table */}
      <VFDataTable
        columns={reportColumns}
        data={filteredReports}
        filterPlaceholder={t('form.searchFees')}
      />

      {/* Custom Report Builder Modal */}
      <VFDialog
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate Custom Analytical Report"
        description="Select criteria, date range, and export format to compile an instant audit dossier."
      >
        <form onSubmit={handleCreateCustomReport} className="space-y-3.5 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Report Name / Description *</label>
            <VFInput
              required
              placeholder="e.g. Q2 Bus Fleet Route Utilization Audit"
              value={customReport.name}
              onChange={(e) => setCustomReport({ ...customReport, name: e.target.value })}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Category Domain</label>
              <VFSelect
                value={customReport.category}
                onChange={(e) => setCustomReport({ ...customReport, category: String(e.target.value) })}
                options={[
                  { label: 'Academics & Performance', value: 'Academics' },
                  { label: 'Compliance & Accreditation', value: 'Compliance' },
                  { label: 'Attendance & Gate Logs', value: 'Attendance' },
                  { label: 'Finance & Defaulters', value: 'Finance' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Export Format</label>
              <VFSelect
                value={customReport.format}
                onChange={(e) => setCustomReport({ ...customReport, format: String(e.target.value) })}
                options={[
                  { label: 'Excel (.xlsx)', value: 'Excel (.xlsx)' },
                  { label: 'PDF (.pdf)', value: 'PDF (.pdf)' },
                  { label: 'Bundled (.zip)', value: 'Both' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsGenerateModalOpen(false)}>
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Check className="h-4 w-4" />}>
              Compile & Export
            </VFButton>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
