import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { Building, Calendar, Settings, Layers, CalendarCheck, ShieldCheck, CheckCircle2, History, Plus } from 'lucide-react';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('school-org');

  const campusData = [
    { code: 'CAMPUS-01', name: 'VidyaMaxx Main Campus - New Delhi', type: 'Primary Branch', students: '2,480 Students', staff: '164 Staff', status: 'Active' },
    { code: 'CAMPUS-02', name: 'VidyaMaxx North Suburbs Branch', type: 'Regional Campus', students: '1,120 Students', staff: '78 Staff', status: 'Active' },
  ];

  const campusColumns = [
    { header: 'Branch Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Campus Name', accessorKey: 'name' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Student Enrolled', accessorKey: 'students' },
    { header: 'Active Staff', accessorKey: 'staff' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  const submoduleTabs = [
    {
      id: 'school-org',
      label: 'Organization',
      icon: <Building className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">Multi-Campus & Branch Profile Management</h3>
              <p className="text-xs text-muted-foreground mt-0.5">School identity, logo branding, affiliation codes, and regional branch profiles.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Campus Branch</VFButton>
          </div>
          <VFDataTable columns={campusColumns} data={campusData} filterPlaceholder="Search branch code or campus..." />
        </div>
      ),
    },
    {
      id: 'academic-sessions',
      label: 'Sessions',
      icon: <Calendar className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Academic Years, Session Rollover & Locking">
          <p className="text-xs text-muted-foreground mb-3">Active Session: 2026-2027 (Starts April 01 ➔ Ends March 31). Historical sessions: 2025-2026 [Locked], 2024-2025 [Archived].</p>
          <div className="flex gap-2">
            <VFBadge variant="success">Active Session: 2026-2027</VFBadge>
            <VFBadge variant="outline">Rollover Wizard Ready</VFBadge>
          </div>
        </VFCard>
      ),
    },
    {
      id: 'classes-sections',
      label: 'Classes',
      icon: <Settings className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Class Definition & Section Allocation">
          <p className="text-xs text-muted-foreground">Manage grade structures (Nursery through Grade 12), section limits (Sec A, B, C), and max class capacities.</p>
        </VFCard>
      ),
    },
    {
      id: 'dept-structure',
      label: 'Departments',
      icon: <Layers className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Organizational Departments, Wings & Houses">
          <p className="text-xs text-muted-foreground">Primary Wing, Senior Secondary Wing, Science Department, Humanities Department, and Red/Blue/Green Houses.</p>
        </VFCard>
      ),
    },
    {
      id: 'academic-calendar',
      label: 'Calendar',
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="School Calendar, Holidays & Working Days">
          <p className="text-xs text-muted-foreground">Set official 220 working days, national gazetted holidays, term exam windows, and annual sports days.</p>
        </VFCard>
      ),
    },
    {
      id: 'roles-permissions',
      label: 'Roles & RBAC',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Role-Based Access Control (RBAC)">
          <p className="text-xs text-muted-foreground">Configure permission matrices for Super Admin, Principal, Vice Principal, Accountant, Teacher, Librarian, and Parent roles.</p>
        </VFCard>
      ),
    },
    {
      id: 'approval-workflows',
      label: 'Approvals',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Multi-Level Approval Rules & Escalation">
          <p className="text-xs text-muted-foreground">Fee waiver approval chain, purchase request escalation rules, and employee leave multi-level signoffs.</p>
        </VFCard>
      ),
    },
    {
      id: 'school-config',
      label: 'System & Logs',
      icon: <History className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="System Configuration, Custom Fields & Audit Trails">
          <p className="text-xs text-muted-foreground">System numbering formats, custom profile attributes (EAV), and immutable security audit log streams.</p>
        </VFCard>
      ),
    },
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
