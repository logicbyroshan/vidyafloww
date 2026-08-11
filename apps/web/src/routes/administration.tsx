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
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  Building,
  Sparkles,
  Plus,
  ShieldCheck,
  Lock,
  GitMerge,
  ArrowRight,
  Layers,
} from 'lucide-react';

export const Route = createFileRoute('/administration')({
  component: AdministrationPage,
});

interface DepartmentRecord {
  id: string;
  deptCode: string;
  deptName: string;
  headOfDept: string;
  staffCount: number;
  activeBudget: string;
  status: 'Active' | 'Under Review';
}

interface WorkflowRecord {
  id: string;
  workflowId: string;
  workflowName: string;
  moduleScope: string;
  stagesCount: number;
  approvalChain: string;
  status: 'Active' | 'Draft';
}

function AdministrationPage() {
  const adminModule = MODULE_REGISTRY.find((m) => m.id === 'administration');

  const departmentsData: DepartmentRecord[] = [
    { id: '1', deptCode: 'DEPT-ACAD', deptName: 'Academic & Curriculum Department', headOfDept: 'Dr. Suresh Verma', staffCount: 120, activeBudget: '₹42.5 Lakhs', status: 'Active' },
    { id: '2', deptCode: 'DEPT-FIN', deptName: 'Finance & Accounts Administration', headOfDept: 'Anita Sharma', staffCount: 12, activeBudget: '₹18.0 Lakhs', status: 'Active' },
    { id: '3', deptCode: 'DEPT-OPER', deptName: 'Campus Operations & Transport', headOfDept: 'Rajesh Kumar', staffCount: 48, activeBudget: '₹25.0 Lakhs', status: 'Active' },
  ];

  const workflowsData: WorkflowRecord[] = [
    { id: '1', workflowId: 'WF-FIN-001', workflowName: 'Fee Discount & Concession Approval Workflow', moduleScope: 'Fees & Finance', stagesCount: 3, approvalChain: 'Accountant → Principal → Managing Trustee', status: 'Active' },
    { id: '2', workflowId: 'WF-HR-002', workflowName: 'Staff Extended Leave Approval Workflow', moduleScope: 'HR & Staff', stagesCount: 2, approvalChain: 'HOD → Principal', status: 'Active' },
    { id: '3', workflowId: 'WF-EXM-003', workflowName: 'Term Marksheet Modification Audit Workflow', moduleScope: 'Examinations', stagesCount: 3, approvalChain: 'Teacher → Exam Controller → Principal', status: 'Active' },
  ];

  // 20.1 Administration Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Institutional Governance & Administration Hub</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Central source of truth for active academic session (2026-27), multi-stage approval workflows, departments, and governance policies.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Admin AI
          </VFButton>
          <VFButton size="sm" variant="outline" leftIcon={<Lock className="h-3.5 w-3.5" />}>
            Session Lock: 2026-27 🔒
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Department</VFButton>
        </div>
      </div>

      {/* Feature 1 — Administration KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Academic Session" value="2026 - 2027" icon={<Building className="h-5 w-5 text-primary" />} trend="up" trendLabel="Session Lock Active 🔒" />
        <VFStatCard title="Institutional Departments" value="8 Active" icon={<Layers className="h-5 w-5 text-secondary" />} description="242 Total Employees" />
        <VFStatCard title="Approval Workflows" value="14 Active" icon={<GitMerge className="h-5 w-5 text-success" />} description="0 Pending Escalations" />
        <VFStatCard title="Governance Audit Status" value="100% Compliant" icon={<ShieldCheck className="h-5 w-5 text-warning" />} description="Immutable Logs Enabled" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Departments Directory & Master List */}
        <VFSection title="Institutional Departments & Budget Allocations" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Total Staff</p>
              <p className="text-base font-bold text-primary mt-0.5">242 Members</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Active Workflows</p>
              <p className="text-base font-bold text-success mt-0.5">14 Chains</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Operating Budget</p>
              <p className="text-base font-bold text-secondary mt-0.5">₹ 85.5 Lakhs</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Policy Status</p>
              <p className="text-base font-bold text-warning mt-0.5">18 Active Policies</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Dept Code', accessorKey: 'deptCode', cell: (r: DepartmentRecord) => <span className="font-mono font-bold text-primary">{r.deptCode}</span> },
              { header: 'Department Name', accessorKey: 'deptName', cell: (r: DepartmentRecord) => <span className="font-bold text-foreground">{r.deptName}</span> },
              { header: 'Head of Department', accessorKey: 'headOfDept' },
              { header: 'Staff Count', accessorKey: 'staffCount', cell: (r: DepartmentRecord) => `${r.staffCount} Staff` },
              { header: 'Active Budget', accessorKey: 'activeBudget', cell: (r: DepartmentRecord) => <span className="font-mono text-success font-bold">{r.activeBudget}</span> },
              { header: 'Status', accessorKey: 'status', cell: (r: DepartmentRecord) => <VFBadge variant="success">{r.status}</VFBadge> },
            ]}
            data={departmentsData}
            filterPlaceholder="Search department code or name..."
          />
        </VFSection>

        {/* Multi-Stage Approval Workflow Summary */}
        <VFCard title="Multi-Stage Approval Workflows">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-3 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">💳 Fee Discount Approval</span>
                <VFBadge variant="primary">3 Stages</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs font-mono">Accountant → Principal → Managing Trustee</p>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">📝 Marksheet Modification</span>
                <VFBadge variant="primary">3 Stages</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs font-mono">Teacher → Exam Controller → Principal</p>
            </div>
            <div className="p-2.5 bg-success/10 border border-success/30 rounded-xl space-y-1">
              <span className="font-bold text-foreground">🟢 Governance Audit Stream</span>
              <p className="text-muted-foreground text-xs">All administrative policy changes are logged with immutable audit IDs.</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 20.7 Specialized Multi-Stage Workflow Visual Stepper Submodule Content
  const workflowsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Multi-Stage Approval Workflows Builder</h3>
          <p className="text-xs text-muted-foreground">Define role-based approval hierarchies for financial concessions, staff leave, marks modifications, and purchase orders.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>New Approval Chain</VFButton>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workflowsData.map((wf) => (
          <VFCard key={wf.id} title={wf.workflowName}>
            <div className="space-y-3 text-xs mt-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-primary font-bold">{wf.workflowId}</span>
                <VFBadge variant="success">{wf.status}</VFBadge>
              </div>
              <p className="text-muted-foreground">Module Scope: <span className="font-bold text-foreground">{wf.moduleScope}</span></p>

              {/* Visual Approval Chain Stepper */}
              <div className="p-3 bg-muted/40 rounded-xl border border-border flex items-center gap-2 overflow-x-auto">
                <div className="px-3 py-1.5 bg-card border border-border rounded-lg text-foreground font-bold">
                  Stage 1: Accountant
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="px-3 py-1.5 bg-card border border-border rounded-lg text-foreground font-bold">
                  Stage 2: Principal
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="px-3 py-1.5 bg-primary/20 border border-primary/40 rounded-lg text-primary font-bold">
                  Stage 3: Managing Trustee
                </div>
              </div>
            </div>
          </VFCard>
        ))}
      </div>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    governance: dashboardContent,
    sessions: dashboardContent,
    structures: dashboardContent,
    departments: dashboardContent,
    policies: dashboardContent,
    workflows: workflowsContent,
    permissions: dashboardContent,
    audit: dashboardContent,
    'reports-settings': dashboardContent,
  };

  const submoduleTabs = (adminModule?.submodules || [
    { id: 'dashboard', label: 'Administration Dashboard' },
    { id: 'governance', label: 'Institutional Governance' },
    { id: 'sessions', label: 'Academic Sessions' },
    { id: 'structures', label: 'Class & Section Structures' },
    { id: 'departments', label: 'Departments & Offices' },
    { id: 'policies', label: 'Institutional Policies' },
    { id: 'workflows', label: 'Approval Workflows' },
    { id: 'permissions', label: 'Roles & Governance' },
    { id: 'audit', label: 'Administrative Audit Trail' },
    { id: 'reports-settings', label: 'Reports & Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Building className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
