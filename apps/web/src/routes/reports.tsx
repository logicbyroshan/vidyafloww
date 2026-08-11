import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
  VFAreaChart,
  VFBarChart,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  BarChart3,
  Users,
  Calendar,
  CreditCard,
  GraduationCap,
  Sparkles,
  Plus,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
});

interface AnalyticsMetricRecord {
  id: string;
  category: string;
  metricName: string;
  currentVal: string;
  prevVal: string;
  variance: string;
  status: 'Improved' | 'Declined' | 'Stable';
}

interface CustomReportTemplateRecord {
  id: string;
  code: string;
  reportTitle: string;
  dataSource: string;
  scheduleFrequency: string;
  lastGenerated: string;
}

function ReportsPage() {
  const reportsModule = MODULE_REGISTRY.find((m) => m.id === 'reports');

  const metricsData: AnalyticsMetricRecord[] = [
    { id: '1', category: 'Academic', metricName: 'Average Exam Performance', currentVal: '78.4%', prevVal: '75.3%', variance: '+3.1%', status: 'Improved' },
    { id: '2', category: 'Attendance', metricName: 'Overall Student Attendance Rate', currentVal: '94.2%', prevVal: '95.0%', variance: '-0.8%', status: 'Declined' },
    { id: '3', category: 'Finance', metricName: 'Term Fee Collection Velocity', currentVal: '₹82.4L (96.2%)', prevVal: '₹78.6L', variance: '+4.8%', status: 'Improved' },
    { id: '4', category: 'Operations', metricName: 'Parent Portal Active Engagement', currentVal: '86.0%', prevVal: '82.0%', variance: '+4.0%', status: 'Improved' },
  ];

  const reportTemplatesData: CustomReportTemplateRecord[] = [
    { id: '1', code: 'RPT-ATT-001', reportTitle: 'Weekly At-Risk Attendance & Chronic Absentee Roster', dataSource: 'Attendance + Students', scheduleFrequency: 'Weekly (Mondays 8:00 AM)', lastGenerated: 'Yesterday' },
    { id: '2', code: 'RPT-FIN-002', reportTitle: 'Fee Defaulter Aging & Collection Target Analysis', dataSource: 'Fees & Finance', scheduleFrequency: 'Monthly (1st Day)', lastGenerated: '01 Aug 2026' },
    { id: '3', code: 'RPT-EXM-003', reportTitle: 'Term 2 Board Exam Subject Difficulty & Fail Analysis', dataSource: 'Examinations', scheduleFrequency: 'Per Term Exam', lastGenerated: '10 Aug 2026' },
  ];

  // 22.1 Analytics Dashboard Submodule Content (ONLY Dashboard has top KPI Stat Cards!)
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs gap-3">
        <div>
          <h2 className="text-base font-bold text-foreground">Cross-Module Business Intelligence & Analytics</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time school-wide performance, student retention BI, fee collection velocity, and AI executive insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Filter className="h-3.5 w-3.5" />}>
            Session: 2026-27 ▼
          </VFButton>
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Analytics AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Build Custom Report</VFButton>
        </div>
      </div>

      {/* Feature 1 — Cross-Module KPI Cards (Dashboard Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Student Population" value="2,840" icon={<Users className="h-5 w-5 text-primary" />} trend="up" trendLabel="↑ 4.2% Growth (Retention 97.9%)" />
        <VFStatCard title="Overall Attendance Rate" value="94.2%" icon={<Calendar className="h-5 w-5 text-success" />} trend="down" trendLabel="↓ 0.8% (Grade 8 drop)" />
        <VFStatCard title="Average Exam Result" value="78.4%" icon={<GraduationCap className="h-5 w-5 text-secondary" />} trend="up" trendLabel="↑ 3.1% Pass Rate 92.8%" />
        <VFStatCard title="Total Fee Collection" value="₹82.4 Lakhs" icon={<CreditCard className="h-5 w-5 text-warning" />} trend="up" trendLabel="96.2% Target (Pending ₹3.2L)" />
      </div>

      {/* Feature 2 — Multi-Metric BI Area Chart */}
      <VFCard title="Monthly Academic Performance vs Attendance Velocity BI Trend">
        <VFAreaChart
          data={[
            { month: 'Apr', ExamAvg: 72, Attendance: 96, FeeCollection: 65 },
            { month: 'May', ExamAvg: 74, Attendance: 95, FeeCollection: 72 },
            { month: 'Jun', ExamAvg: 75, Attendance: 93, FeeCollection: 78 },
            { month: 'Jul', ExamAvg: 77, Attendance: 94, FeeCollection: 80 },
            { month: 'Aug', ExamAvg: 78.4, Attendance: 94.2, FeeCollection: 82.4 },
          ]}
          xKey="month"
          dataKeys={[
            { key: 'ExamAvg', name: 'Exam Average (%)', color: '#0891b2' },
            { key: 'Attendance', name: 'Attendance Rate (%)', color: '#16a34a' },
            { key: 'FeeCollection', name: 'Fee Collection (₹ L)', color: '#f97316' },
          ]}
          height={220}
        />
      </VFCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Trends & Metrics Table */}
        <VFSection title="Institutional BI Performance & Cross-Module Metrics" className="lg:col-span-2 space-y-4">
          <VFDataTable
            columns={[
              { header: 'Category', accessorKey: 'category', cell: (r: AnalyticsMetricRecord) => <VFBadge variant="outline">{r.category}</VFBadge> },
              { header: 'Metric Name', accessorKey: 'metricName', cell: (r: AnalyticsMetricRecord) => <span className="font-bold text-foreground">{r.metricName}</span> },
              { header: 'Current Value', accessorKey: 'currentVal', cell: (r: AnalyticsMetricRecord) => <span className="font-bold text-primary">{r.currentVal}</span> },
              { header: 'Previous Period', accessorKey: 'prevVal' },
              {
                header: 'Variance',
                accessorKey: 'variance',
                cell: (r: AnalyticsMetricRecord) => (
                  <VFBadge variant={r.status === 'Improved' ? 'success' : r.status === 'Declined' ? 'danger' : 'outline'}>
                    {r.variance}
                  </VFBadge>
                ),
              },
            ]}
            data={metricsData}
            filterPlaceholder="Search metric or category..."
          />
        </VFSection>

        {/* Executive AI Insights & Class Exam Performance Chart */}
        <VFCard title="Class-Wise Average Result BI Bar Chart">
          <div className="space-y-3 text-xs mt-1">
            <VFBarChart
              data={[
                { grade: 'Class 8', avg: 74 },
                { grade: 'Class 9', avg: 78 },
                { grade: 'Class 10', avg: 82 },
                { grade: 'Class 11', avg: 76 },
                { grade: 'Class 12', avg: 84 },
              ]}
              xKey="grade"
              dataKeys={[{ key: 'avg', name: 'Average Mark (%)', color: '#0891b2' }]}
              height={150}
            />

            <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <span className="font-bold text-foreground flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Executive AI Insight
              </span>
              <p className="text-muted-foreground text-xs">Class 12 Board preparation is performing 4.2% higher than state benchmark.</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Dedicated Academic & Subject BI Analytics Submodule (NO REPEATING TOP STAT CARDS!)
  const academicAnalyticsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Student Academic & Demographics Business Intelligence</h3>
          <p className="text-xs text-muted-foreground">Class-wise performance heatmaps, gender ratios, student retention curves, and board exam percentile trends.</p>
        </div>
        <VFButton size="sm" variant="outline">Export Academic BI</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Category', accessorKey: 'category', cell: (r: AnalyticsMetricRecord) => <VFBadge variant="outline">{r.category}</VFBadge> },
          { header: 'Metric Name', accessorKey: 'metricName', cell: (r: AnalyticsMetricRecord) => <span className="font-bold text-foreground">{r.metricName}</span> },
          { header: 'Current Value', accessorKey: 'currentVal', cell: (r: AnalyticsMetricRecord) => <span className="font-bold text-primary">{r.currentVal}</span> },
          { header: 'Previous Period', accessorKey: 'prevVal' },
          {
            header: 'Variance',
            accessorKey: 'variance',
            cell: (r: AnalyticsMetricRecord) => (
              <VFBadge variant={r.status === 'Improved' ? 'success' : r.status === 'Declined' ? 'danger' : 'outline'}>
                {r.variance}
              </VFBadge>
            ),
          },
        ]}
        data={metricsData}
        filterPlaceholder="Search academic BI metrics..."
      />
    </div>
  );

  // 22.9 Custom Report Builder Submodule Content (NO REPEATING TOP STAT CARDS!)
  const reportBuilderContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Drag-and-Drop & AI Natural Language Report Builder</h3>
          <p className="text-xs text-muted-foreground">Select data sources, custom multi-condition filters (AND/OR), aggregations, and automated PDF/Excel exports.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<FileSpreadsheet className="h-3.5 w-3.5 text-success" />}>Export Excel</VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>New Report Template</VFButton>
        </div>
      </div>

      <VFCard title="✨ Signature AI Natural Language Report Builder">
        <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl space-y-2 text-xs">
          <p className="font-semibold text-foreground">Prompt AI Report Builder:</p>
          <div className="p-2.5 bg-background border border-border rounded-lg text-muted-foreground font-mono text-xs">
            "Create a report showing students in Class 10 whose attendance is below 75% and average exam score is below 50%"
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-muted-foreground">Data Sources: Students + Attendance + Examinations · Filters: Class=10, Attendance&lt;75%, Marks&lt;50%</span>
            <VFButton size="sm">Generate Live Preview</VFButton>
          </div>
        </div>
      </VFCard>

      <VFDataTable
        columns={[
          { header: 'Report Code', accessorKey: 'code', cell: (r: CustomReportTemplateRecord) => <span className="font-mono font-bold text-primary">{r.code}</span> },
          { header: 'Report Title', accessorKey: 'reportTitle', cell: (r: CustomReportTemplateRecord) => <span className="font-bold text-foreground">{r.reportTitle}</span> },
          { header: 'Data Sources', accessorKey: 'dataSource', cell: (r: CustomReportTemplateRecord) => <VFBadge variant="outline">{r.dataSource}</VFBadge> },
          { header: 'Schedule Frequency', accessorKey: 'scheduleFrequency' },
          { header: 'Last Generated', accessorKey: 'lastGenerated' },
        ]}
        data={reportTemplatesData}
        filterPlaceholder="Search report title or code..."
      />
    </div>
  );

  // Submodule map — EVERY tab has its OWN clean dedicated view! No stat card repetition!
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    'academic-analytics': academicAnalyticsContent,
    'attendance-analytics': academicAnalyticsContent,
    'exam-analytics': academicAnalyticsContent,
    'finance-analytics': academicAnalyticsContent,
    'hr-analytics': academicAnalyticsContent,
    'operations-analytics': academicAnalyticsContent,
    'communication-analytics': academicAnalyticsContent,
    'report-builder': reportBuilderContent,
    'scheduled-reports': reportBuilderContent,
    'data-explorer': academicAnalyticsContent,
  };

  const submoduleTabs = (reportsModule?.submodules || [
    { id: 'dashboard', label: 'Analytics Dashboard' },
    { id: 'academic-analytics', label: 'Student & Academic Analytics' },
    { id: 'attendance-analytics', label: 'Attendance Analytics' },
    { id: 'exam-analytics', label: 'Exam & Performance Analytics' },
    { id: 'finance-analytics', label: 'Fees & Finance Analytics' },
    { id: 'hr-analytics', label: 'HR & Payroll Analytics' },
    { id: 'operations-analytics', label: 'Operations & Service Analytics' },
    { id: 'communication-analytics', label: 'Communication & Engagement' },
    { id: 'report-builder', label: 'Custom Report Builder' },
    { id: 'scheduled-reports', label: 'Scheduled Reports' },
    { id: 'data-explorer', label: 'Data Explorer & Audit' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <BarChart3 className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || academicAnalyticsContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
