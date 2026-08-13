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
  ShieldAlert,
  FileCheck,
  Building,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Download,
  Clock,
  Award,
  BarChart3,
} from 'lucide-react';

export const Route = createFileRoute('/compliance')({
  component: CompliancePage,
});

function CompliancePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const complianceData = [
    { code: 'CMP-REG-01', title: 'Permanent Student Admission Register (Form 6)', authority: 'CBSE / State Edu Dept', board: 'CBSE', renewalDate: 'Permanent Record', status: 'Compliant' },
    { code: 'CMP-RTE-25', title: 'RTE 25% EWS Reservation Enrollment Register', authority: 'District Education Officer (DEO)', board: 'State Board', renewalDate: 'Annual (March)', status: 'Verified' },
    { code: 'CMP-SAF-09', title: 'Fire Safety & Structural Stability Certificate', authority: 'Municipal Fire Dept', board: 'Govt Regulatory', renewalDate: '15 Oct 2026', status: 'Renewal Pending' },
  ];

  const complianceColumns = [
    { header: 'Compliance Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Statutory Register / Certificate', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Regulatory Authority', accessorKey: 'authority' },
    { header: 'Affiliation Board', accessorKey: 'board', cell: (r: any) => <VFBadge variant="outline">{r.board}</VFBadge> },
    { header: 'Next Renewal Due', accessorKey: 'renewalDate' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Renewal Pending' ? 'warning' : 'success'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Compliance Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Statutory Audit Readiness" value="100% Compliant" icon={<ShieldAlert className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="CBSE & State Board" />
        <VFStatCard title="Mandatory Registers" value="12 Registers" icon={<FileCheck className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="Digitized & Audited" />
        <VFStatCard title="Affiliation Valid Till" value="31 Mar 2030" icon={<Award className="h-5 w-5 text-purple-500" />} description="CBSE Affiliation #1630982" />
        <VFStatCard title="Pending Renewals" value="1 Certificate" icon={<Clock className="h-5 w-5 text-amber-500" />} description="Fire NOC Due Oct" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Mandatory Registers
  // ----------------------------------------------------
  const mandatoryRegistersContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Mandatory Indian School Statutory Registers (CBSE / ICSE / State Board)</h3>
          <p className="text-xs text-muted-foreground font-mono font-bold text-emerald-500">Board/State-specific compliance models (Admission Register Form 6, Staff Service Book, RTE 25% Register).</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Statutory Record</VFButton>
      </div>
      <VFDataTable columns={complianceColumns} data={complianceData} filterPlaceholder="Search statutory register or board..." />
    </div>
  );

  // ----------------------------------------------------
  // ALL 13 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Compliance Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'mandatory-registers', label: 'Mandatory Registers', icon: <FileCheck className="h-3.5 w-3.5" />, content: mandatoryRegistersContent },
    { id: 'records', label: 'Compliance Records', icon: <ShieldAlert className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'board-records', label: 'Board Records', icon: <Award className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'government-records', label: 'Government Records', icon: <Building className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'affiliation-records', label: 'Affiliation Records', icon: <Award className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'inspection-records', label: 'Inspection Records', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'statutory-documents', label: 'Statutory Documents', icon: <FileCheck className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'tasks', label: 'Compliance Tasks', icon: <Clock className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'deadlines', label: 'Compliance Deadlines', icon: <Clock className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'retention', label: 'Record Retention', icon: <FileCheck className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'reports', label: 'Compliance Reports', icon: <Download className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'settings', label: 'Compliance Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: dashboardContent },
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
