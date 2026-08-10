import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFButton, VFBadge } from '@vidyamaxx/ui';
import { Settings, Building, ShieldCheck, Sliders, History, Plus } from 'lucide-react';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('school-campuses');

  const submoduleTabs = [
    {
      id: 'school-campuses',
      label: 'School Profile & Campuses',
      icon: <Building className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Multi-Campus / Branch Configuration</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Manage school organization settings, branch details, and main campus parameters.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Campus Branch</VFButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VFCard title="VidyaMaxx Main Campus - New Delhi">
              <p className="text-xs text-muted-foreground">Code: CAMPUS-01 · 2,480 Active Students · 164 Staff Members</p>
              <VFBadge variant="success" className="mt-2">Primary Branch</VFBadge>
            </VFCard>
            <VFCard title="VidyaMaxx North Suburbs Branch">
              <p className="text-xs text-muted-foreground">Code: CAMPUS-02 · 1,120 Active Students · 78 Staff Members</p>
              <VFBadge variant="outline" className="mt-2">Regional Campus</VFBadge>
            </VFCard>
          </div>
        </div>
      ),
    },
    {
      id: 'sessions-classes',
      label: 'Academic Sessions & Classes',
      icon: <Settings className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Academic Years, Session Periods, Classes & Sections">
          <p className="text-xs text-muted-foreground">Configure active academic session (2026-2027), class definitions (Nursery to Class 12), and section allocations.</p>
        </VFCard>
      ),
    },
    {
      id: 'roles-permissions',
      label: 'Roles & RBAC Permissions',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Role-Based Access Control (RBAC) & User Management">
          <p className="text-xs text-muted-foreground">Define custom user roles (Super Admin, Principal, Vice Principal, Accountant, Teacher, Librarian, Parent) and permission matrices.</p>
        </VFCard>
      ),
    },
    {
      id: 'custom-fields',
      label: 'Custom Fields Engine',
      icon: <Sliders className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Dynamic Custom Attributes & Dynamic Forms">
          <p className="text-xs text-muted-foreground">Add custom input fields (EAV) to Student profiles, Employee records, and Admission forms without code changes.</p>
        </VFCard>
      ),
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs & Security',
      icon: <History className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="System Activity Audit Trails & Data Security">
          <p className="text-xs text-muted-foreground">Immutable audit logs tracking user logins, data edits, fee receipts issued, and data export activity.</p>
        </VFCard>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="01 — School Administration & System Config" 
        description="Organization, campus/branch management, academic sessions, RBAC permissions, custom fields, and audit logs."
      />
      <VFTabs 
        items={submoduleTabs} 
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="underline"
      />
    </VFPageContainer>
  );
}
