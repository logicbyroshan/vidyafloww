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
  ShieldCheck,
  Users,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
} from 'lucide-react';

export const Route = createFileRoute('/administration')({
  component: AdministrationPage,
});

interface DepartmentRecord {
  id: string;
  code: string;
  name: string;
  head: string;
  employeeCount: number;
  status: 'Active' | 'Inactive';
}

interface AuditRecord {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  beforeVal: string;
  afterVal: string;
}

function AdministrationPage() {
  const adminModule = MODULE_REGISTRY.find((m) => m.id === 'administration');

  const departmentsData: DepartmentRecord[] = [
    { id: '1', code: 'DEP-ACAD', name: 'Academic & Teaching Faculty', head: 'Dr. Suresh Verma', employeeCount: 120, status: 'Active' },
    { id: '2', code: 'DEP-FIN', name: 'Finance, Accounts & Billing', head: 'Rajesh Sharma', employeeCount: 14, status: 'Active' },
    { id: '3', code: 'DEP-ADMIN', name: 'Front Desk & Administration', head: 'Priya Patel', employeeCount: 18, status: 'Active' },
    { id: '4', code: 'DEP-TRN', name: 'Transport & Fleet Logistics', head: 'Vikram Singh', employeeCount: 32, status: 'Active' },
  ];

  const auditData: AuditRecord[] = [
    { id: '1', timestamp: 'Today 10:42 AM', user: 'Roshan (Super Admin)', action: 'Section 10-A Class Teacher Updated', beforeVal: 'Mr. Sharma', afterVal: 'Ms. Patel' },
    { id: '2', timestamp: 'Today 10:30 AM', user: 'Roshan (Super Admin)', action: 'New Department Created (DEP-ROB)', beforeVal: 'None', afterVal: 'Robotics & STEM Dept' },
    { id: '3', timestamp: 'Today 09:52 AM', user: 'Dr. Verma (Principal)', action: 'Blue House Coordinator Reassigned', beforeVal: 'Coach Rajesh', afterVal: 'Anita Desai' },
  ];

  // 20.1 Administration Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">School Administration Governance Hub</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Central source of truth for institution profile, academic sessions, 42 classes, 12 departments, and role permissions.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Admin AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Department</VFButton>
        </div>
      </div>

      {/* Feature 1 — School Administration KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Session" value="2026–2027" icon={<Calendar className="h-5 w-5 text-primary" />} trend="up" trendLabel="Term 2 Active 🟢" />
        <VFStatCard title="Total Students" value="2,840 Students" icon={<Users className="h-5 w-5 text-secondary" />} description="42 Classes · 86 Sections" />
        <VFStatCard title="Departments & Staff" value="12 Depts" icon={<Building className="h-5 w-5 text-success" />} description="184 Active Employees" />
        <VFStatCard title="Enforced Policies" value="24 Policies" icon={<ShieldCheck className="h-5 w-5 text-warning" />} description="3 Approvals Pending ⌛" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Module Health & Configuration Status */}
        <VFSection title="Module Configuration Health & Institutional Status" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">Academic Session</span>
              <p className="text-xs text-success font-semibold flex items-center gap-1">🟢 Configured (2026-27)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">Fee Engine</span>
              <p className="text-xs text-success font-semibold flex items-center gap-1">🟢 Configured (100%)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">Timetable & Rooms</span>
              <p className="text-xs text-success font-semibold flex items-center gap-1">🟢 Configured (86 Sec)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">Exam Grading</span>
              <p className="text-xs text-warning font-semibold flex items-center gap-1">⚠ 2 Incomplete Sets</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Dept Code', accessorKey: 'code', cell: (r: DepartmentRecord) => <span className="font-mono font-bold text-primary">{r.code}</span> },
              { header: 'Department Name', accessorKey: 'name', cell: (r: DepartmentRecord) => <span className="font-bold text-foreground">{r.name}</span> },
              { header: 'Department Head', accessorKey: 'head' },
              { header: 'Staff Count', accessorKey: 'employeeCount', cell: (r: DepartmentRecord) => `${r.employeeCount} Staff` },
              { header: 'Status', accessorKey: 'status', cell: (r: DepartmentRecord) => <VFBadge variant="success">{r.status}</VFBadge> },
            ]}
            data={departmentsData}
            filterPlaceholder="Search department name or code..."
          />
        </VFSection>

        {/* Administrative Alerts & Audit Logs */}
        <VFCard title="Administrative Alerts & Recent Audit Trail">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">⚠ 3 Pending Approvals</span>
                <VFBadge variant="warning">Action Needed</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Fee Discount (&gt; ₹50,000) & Purchase Requisitions</p>
            </div>
            <div className="p-2.5 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🔒 Session Lock Status</span>
                <VFBadge variant="secondary">2026-27 Active</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">2025-26 Historical Session Archived & Read-Only</p>
            </div>
            <div className="p-2.5 bg-muted/40 border border-border rounded-xl space-y-1">
              <span className="font-bold text-foreground">Audit Log Snapshot</span>
              {auditData.map((a) => (
                <div key={a.id} className="text-[11px] border-t border-border/40 pt-1.5 mt-1">
                  <p className="font-semibold text-foreground">{a.action}</p>
                  <p className="text-muted-foreground">{a.user} · {a.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 20.8 Approvals & Workflows Submodule Content
  const workflowsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Enterprise Administrative Workflow & Approval Engine</h3>
          <p className="text-xs text-muted-foreground">Define multi-stage approval hierarchies for fee discounts, staff leaves, purchase requisitions, and certificates.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Workflow</VFButton>
      </div>

      <VFCard title="Multi-Level Approval Hierarchy Example (Fee Discount > ₹50,000)">
        <div className="flex items-center justify-between text-xs font-semibold py-4 overflow-x-auto gap-2">
          {['1. Teacher Request', '2. Department Head', '3. Finance Officer', '4. Principal Approval', '5. Approved & Executed'].map((st, i) => (
            <React.Fragment key={st}>
              <div className={`px-3 py-2 rounded-lg border text-center whitespace-nowrap ${i === 3 ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-muted/40 border-border text-muted-foreground'}`}>
                {st}
              </div>
              {i < 4 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    profile: dashboardContent,
    sessions: dashboardContent,
    'classes-sections': dashboardContent,
    departments: dashboardContent,
    'academic-config': dashboardContent,
    governance: dashboardContent,
    'approvals-workflows': workflowsContent,
    'roles-permissions': dashboardContent,
    'reports-audit': dashboardContent,
  };

  const submoduleTabs = (adminModule?.submodules || [
    { id: 'dashboard', label: 'Administration Dashboard' },
    { id: 'profile', label: 'School Profile & Org' },
    { id: 'sessions', label: 'Academic Sessions' },
    { id: 'classes-sections', label: 'Classes, Sections & Houses' },
    { id: 'departments', label: 'Departments & Hierarchy' },
    { id: 'academic-config', label: 'Academic Configuration' },
    { id: 'governance', label: 'Policies & Governance' },
    { id: 'approvals-workflows', label: 'Workflows & Approvals' },
    { id: 'roles-permissions', label: 'Users & Access Control' },
    { id: 'reports-audit', label: 'Reports & Audit Logs' },
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
