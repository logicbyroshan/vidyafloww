import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { Bus, MapPin, Users, Navigation, Wrench, Plus, Eye } from 'lucide-react';

export const Route = createFileRoute('/transport')({
  component: TransportPage,
});

function TransportPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('vehicle-mgmt');

  const busData = [
    { busNo: 'BUS-01 (DL-01-AB-1234)', route: 'Route 101 - North Suburbs', driver: 'Ramesh Kumar (+91 98111 22233)', capacity: '52 Seats', status: 'On Route (Live)' },
    { busNo: 'BUS-02 (DL-01-CD-5678)', route: 'Route 102 - West Avenue', driver: 'Suresh Pal (+91 98222 33344)', capacity: '52 Seats', status: 'On Route (Live)' },
    { busNo: 'BUS-03 (DL-01-EF-9012)', route: 'Route 103 - South Ring', driver: 'Mahesh Singh (+91 98333 44455)', capacity: '40 Seats', status: 'In Depot' },
  ];

  const busColumns = [
    { header: 'Bus Vehicle No', accessorKey: 'busNo', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.busNo}</span> },
    { header: 'Assigned Route', accessorKey: 'route' },
    { header: 'Driver & Contact', accessorKey: 'driver' },
    { header: 'Capacity', accessorKey: 'capacity' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status.includes('Live') ? 'success' : 'outline'}>{r.status}</VFBadge> },
    { header: 'Action', accessorKey: 'action', cell: () => <VFButton size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />}>Live GPS Map</VFButton> },
  ];

  const submoduleTabs = [
    {
      id: 'vehicle-mgmt',
      label: 'Vehicle Fleet',
      icon: <Bus className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">School Bus Fleet & Transport Vehicles</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Manage school buses, vans, seat capacities, and fitness certificates.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Bus Vehicle</VFButton>
          </div>
          <VFDataTable columns={busColumns} data={busData} filterPlaceholder="Search bus vehicle, route, or driver..." />
        </div>
      ),
    },
    {
      id: 'route-mgmt',
      label: 'Route Mapping',
      icon: <Navigation className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Transport Routes & Morning/Evening Shifts">
          <p className="text-xs text-muted-foreground">Configure morning pickup routes, afternoon drop routes, total distance kilometers, and monthly fare slabs.</p>
        </VFCard>
      ),
    },
    {
      id: 'bus-stops',
      label: 'Bus Stop Management',
      icon: <MapPin className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Bus Stop Registry & Pickup Timings">
          <p className="text-xs text-muted-foreground">Add bus stops, set GPS coordinates, expected morning arrival times, and assigned monthly transport fee.</p>
        </VFCard>
      ),
    },
    {
      id: 'transport-allocation',
      label: 'Student Transport Allocation',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student & Staff Transport Allocation">
          <p className="text-xs text-muted-foreground">Assign students and teachers to specific bus routes, stops, and issue electronic bus travel cards.</p>
        </VFCard>
      ),
    },
    {
      id: 'crew-mgmt',
      label: 'Driver & Conductor Registry',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Bus Driver & Conductor Profiles">
          <p className="text-xs text-muted-foreground">Store heavy vehicle driving licenses, police verification certificates, and contact emergency numbers.</p>
        </VFCard>
      ),
    },
    {
      id: 'gps-tracking',
      label: 'Live GPS Tracking',
      icon: <Navigation className="h-3.5 w-3.5 text-primary" />,
      content: (
        <VFCard title="Real-Time Bus Location & Geo-Fencing Map">
          <p className="text-xs text-muted-foreground">Live GPS map tracking for parents, speed limit breach alerts, and automatic bus approaching SMS alerts.</p>
        </VFCard>
      ),
    },
    {
      id: 'compliance',
      label: 'Maintenance & Compliance',
      icon: <Wrench className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Vehicle Maintenance, Service & Insurance Compliance">
          <p className="text-xs text-muted-foreground">Track oil change schedules, tire replacements, pollution (PUC) certificates, and RTO vehicle insurance renewals.</p>
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
