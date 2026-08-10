import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard } from '@vidyamaxx/ui';
import { Building, Bed, CalendarCheck, Utensils, CreditCard, Ticket } from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelPage,
});

function HostelPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('hostel-mgmt');

  const submoduleTabs = [
    {
      id: 'hostel-mgmt',
      label: 'Hostel Blocks',
      icon: <Building className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Boys & Girls Residential Hostel Blocks">
          <p className="text-xs text-muted-foreground">Manage Block A (Junior Boys), Block B (Senior Boys), and Block C (Girls Hostel) campus buildings.</p>
        </VFCard>
      ),
    },
    {
      id: 'room-mgmt',
      label: 'Floors & Rooms',
      icon: <Building className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Building Floor & Room Inventory">
          <p className="text-xs text-muted-foreground">Single occupancy, double occupancy, and 4-bed dorm room layouts with attached washroom facilities.</p>
        </VFCard>
      ),
    },
    {
      id: 'bed-allocation',
      label: 'Bed Allocation',
      icon: <Bed className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Bed Matrix & Student Allocation">
          <p className="text-xs text-muted-foreground">Assign boarder students to specific bed numbers (Room 204 - Bed B) with mattress and locker tags.</p>
        </VFCard>
      ),
    },
    {
      id: 'hostel-attendance',
      label: 'Hostel Night Attendance',
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Daily 09:00 PM Night Roll Call">
          <p className="text-xs text-muted-foreground">Warden night attendance check, absent student alerts, and emergency contact verification.</p>
        </VFCard>
      ),
    },
    {
      id: 'mess-mgmt',
      label: 'Mess & Meal Management',
      icon: <Utensils className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Weekly Mess Menu & Meal Coupon Counter">
          <p className="text-xs text-muted-foreground">Breakfast, Lunch, Evening Snacks, and Dinner weekly nutrition menu schedules and dietary requirements.</p>
        </VFCard>
      ),
    },
    {
      id: 'hostel-fees',
      label: 'Hostel Fees & Utilities',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Room Rent, Mess Charges & Laundry Dues">
          <p className="text-xs text-muted-foreground">Annual residential fee installments, electricity surcharge billing, and laundry service charges.</p>
        </VFCard>
      ),
    },
    {
      id: 'warden-ops',
      label: 'Warden Ops & Outpasses',
      icon: <Ticket className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Digital Outpass Request & Gatekeeper Pass">
          <p className="text-xs text-muted-foreground">Approve weekend home outpasses, parent visitor logs, emergency medical leaves, and campus gate passes.</p>
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
