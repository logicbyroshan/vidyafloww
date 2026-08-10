import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard } from '@vidyamaxx/ui';
import { Building, Bed, Utensils, FileText } from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelPage,
});

function HostelPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('hostel-rooms');

  const submoduleTabs = [
    {
      id: 'hostel-rooms',
      label: 'Hostel Buildings & Rooms',
      icon: <Building className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Residential Hostel Blocks & Floor Plans">
          <p className="text-xs text-muted-foreground">Manage Boys & Girls hostel blocks, room types (Single, Double, Quad), and resident warden assignments.</p>
        </VFCard>
      ),
    },
    {
      id: 'bed-allocations',
      label: 'Student Bed Allocations',
      icon: <Bed className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Resident Student Roster & Bed Allocation">
          <p className="text-xs text-muted-foreground">Allocate beds to boarder students, track vacant room availability, and collect hostel fees.</p>
        </VFCard>
      ),
    },
    {
      id: 'mess-meals',
      label: 'Mess & Meal Plans',
      icon: <Utensils className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Hostel Mess Menu & Dining Attendance">
          <p className="text-xs text-muted-foreground">Weekly breakfast, lunch, snack, and dinner meal menus with dietary preferences and mess attendance.</p>
        </VFCard>
      ),
    },
    {
      id: 'outpass-visitors',
      label: 'Outpass & Visitor Logs',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Outpass Approvals & Visitor Registry">
          <p className="text-xs text-muted-foreground">Process weekend night outpasses, parent visitor logs, warden gatekeeper approvals, and hostel complaints.</p>
        </VFCard>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="14 — Hostel & Campus Life" 
        description="Hostels, room/bed allocations, hostel attendance, mess meal plans, wardens, and outpass workflow."
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
