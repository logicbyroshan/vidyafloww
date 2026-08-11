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
  Bus,
  Users,
  Navigation,
  Wrench,
  AlertTriangle,
  Sparkles,
  Plus,
  Eye,
} from 'lucide-react';

export const Route = createFileRoute('/transport')({
  component: TransportPage,
});

interface RouteRecord {
  id: string;
  routeCode: string;
  vehicleNo: string;
  driver: string;
  stopsCount: number;
  studentsCount: number;
  departureTime: string;
  status: 'Active' | 'Delayed' | 'Maintenance';
}

interface VehicleRecord {
  id: string;
  regNo: string;
  type: string;
  capacity: number;
  assigned: number;
  driver: string;
  mileage: string;
  status: 'Active' | 'Idle' | 'Maintenance';
}

function TransportPage() {
  const transportModule = MODULE_REGISTRY.find((m) => m.id === 'transport');

  const routesData: RouteRecord[] = [
    { id: '1', routeCode: 'R-01', vehicleNo: 'MP-09-AB-1234', driver: 'Rajesh Kumar', stopsCount: 14, studentsCount: 38, departureTime: '07:10 AM', status: 'Active' },
    { id: '2', routeCode: 'R-02', vehicleNo: 'MP-09-AB-5521', driver: 'Suresh Pal', stopsCount: 12, studentsCount: 40, departureTime: '07:15 AM', status: 'Active' },
    { id: '3', routeCode: 'R-03', vehicleNo: 'MP-09-CD-9012', driver: 'Amit Singh', stopsCount: 16, studentsCount: 32, departureTime: '07:05 AM', status: 'Delayed' },
    { id: '4', routeCode: 'R-04', vehicleNo: 'MP-09-EF-3456', driver: 'Mahesh Sharma', stopsCount: 10, studentsCount: 35, departureTime: '07:20 AM', status: 'Active' },
  ];

  const vehiclesData: VehicleRecord[] = [
    { id: '1', regNo: 'MP-09-AB-1234', type: 'School Bus (Tata)', capacity: 40, assigned: 38, driver: 'Rajesh Kumar', mileage: '82,420 km', status: 'Active' },
    { id: '2', regNo: 'MP-09-AB-5521', type: 'School Bus (Eicher)', capacity: 40, assigned: 40, driver: 'Suresh Pal', mileage: '76,150 km', status: 'Active' },
    { id: '3', regNo: 'MP-09-CD-9012', type: 'School Bus (Tata)', capacity: 40, assigned: 32, driver: 'Amit Singh', mileage: '91,300 km', status: 'Maintenance' },
    { id: '4', regNo: 'MP-09-EF-3456', type: 'School Van (Force)', capacity: 20, assigned: 18, driver: 'Vikram Singh', mileage: '45,800 km', status: 'Active' },
  ];

  // 12.1 Transport Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Transport Command Center & Fleet Operations</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 42 school vehicles, 1,284 transport students, live GPS tracking, and route safety logs.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Transport AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Vehicle</VFButton>
        </div>
      </div>

      {/* Feature 1 — Transport KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Fleet Vehicles" value="42" icon={<Bus className="h-5 w-5 text-primary" />} trend="up" trendLabel="38 Active on Route" />
        <VFStatCard title="Transport Students" value="1,284" icon={<Users className="h-5 w-5 text-secondary" />} trend="up" trendLabel="1,192 Boarded Today" />
        <VFStatCard title="Not Boarded Today" value="92" icon={<AlertTriangle className="h-5 w-5 text-warning" />} description="14 Excused Leave" />
        <VFStatCard title="Vehicles in Maintenance" value="7" icon={<Wrench className="h-5 w-5 text-destructive" />} description="2 Service Due Soon" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Live Route Operations */}
        <VFSection title="Live Route Operations & Status" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Route R-01 (Green Park - Main Wing)</span>
                <VFBadge variant="success">🟢 Running</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Bus MP-09-AB-1234 · Driver: Rajesh · 38 Boarded</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Route R-02 (Vijay Nagar - Campus)</span>
                <VFBadge variant="success">🟢 Running</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Bus MP-09-AB-5521 · Driver: Suresh · 40 Boarded</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Route R-03 (Railway Colony)</span>
                <VFBadge variant="warning">🟡 Delayed +12m</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Bus MP-09-CD-9012 · Traffic congestion at Flyover</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Route R-04 (West Ring Road)</span>
                <VFBadge variant="outline">⚪ Scheduled</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Bus MP-09-EF-3456 · Starts 07:20 AM</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Route Code', accessorKey: 'routeCode', cell: (r: RouteRecord) => <span className="font-mono font-bold text-primary">{r.routeCode}</span> },
              { header: 'Vehicle No', accessorKey: 'vehicleNo' },
              { header: 'Assigned Driver', accessorKey: 'driver', cell: (r: RouteRecord) => <span className="font-bold text-foreground">{r.driver}</span> },
              { header: 'Stops', accessorKey: 'stopsCount', cell: (r: RouteRecord) => `${r.stopsCount} Stops` },
              { header: 'Students', accessorKey: 'studentsCount', cell: (r: RouteRecord) => `${r.studentsCount} Assigned` },
              { header: 'Departure', accessorKey: 'departureTime' },
              {
                header: 'Status',
                accessorKey: 'status',
                cell: (r: RouteRecord) => (
                  <VFBadge variant={r.status === 'Active' ? 'success' : r.status === 'Delayed' ? 'warning' : 'danger'}>
                    {r.status}
                  </VFBadge>
                ),
              },
            ]}
            data={routesData}
            filterPlaceholder="Search route code or driver..."
          />
        </VFSection>

        {/* Vehicle Health & Attention Required */}
        <VFCard title="Vehicle Health & Safety Alerts">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🚌 Bus MP-09-AB-1234</span>
                <VFBadge variant="warning">Service Due</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Engine oil & brake pad inspection due in 4 days</p>
            </div>
            <div className="p-2.5 bg-destructive/10 border border-destructive/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🚌 Bus MP-09-AB-5521</span>
                <VFBadge variant="danger">High Priority</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Brake inspection required before next shift</p>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">📄 Fleet Fitness Expiry</span>
                <VFBadge variant="primary">2 Documents</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">RTO Fitness certificate renewal due for 2 vans</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 12.2 Routes & Stops Submodule Content
  const routesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Transportation Network Routes & Stop Sequences</h3>
          <p className="text-xs text-muted-foreground">Configure morning/afternoon pickup stops, seat capacities, and expected ETAs.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Route</VFButton>
      </div>

      <div className="p-4 bg-card border border-border rounded-xl space-y-3">
        <h4 className="text-xs font-bold text-foreground">Route R-01 Stop Sequence & Capacity Overview</h4>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {['01 School Gate (07:10 AM)', '02 Vijay Nagar (07:22 AM)', '03 Main Market (07:30 AM)', '04 Green Park (07:38 AM)', '05 Railway Colony (07:48 AM)', '06 Main Campus (08:00 AM)'].map((stop, i) => (
            <React.Fragment key={i}>
              <div className="p-2 bg-muted/40 rounded-lg border border-border/60 font-semibold text-foreground whitespace-nowrap">
                📍 {stop}
              </div>
              {i < 5 && <span className="text-muted-foreground font-bold">➔</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <VFDataTable
        columns={[
          { header: 'Route Code', accessorKey: 'routeCode', cell: (r: RouteRecord) => <span className="font-mono font-bold text-primary">{r.routeCode}</span> },
          { header: 'Bus Vehicle No', accessorKey: 'vehicleNo' },
          { header: 'Assigned Driver', accessorKey: 'driver', cell: (r: RouteRecord) => <span className="font-bold text-foreground">{r.driver}</span> },
          { header: 'Stops', accessorKey: 'stopsCount', cell: (r: RouteRecord) => `${r.stopsCount} Stops` },
          { header: 'Students', accessorKey: 'studentsCount', cell: (r: RouteRecord) => `${r.studentsCount} / 40 Capacity` },
          { header: 'Departure', accessorKey: 'departureTime' },
          { header: 'Status', accessorKey: 'status', cell: (r: RouteRecord) => <VFBadge variant="success">{r.status}</VFBadge> },
        ]}
        data={routesData}
        filterPlaceholder="Search routes..."
      />
    </div>
  );

  // 12.3 Fleet & Vehicles Submodule Content
  const fleetContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Fleet & Vehicle Asset Registry</h3>
          <p className="text-xs text-muted-foreground">Manage school buses, vans, seat capacities, odometer mileages, and insurance compliance.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Vehicle</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Registration No', accessorKey: 'regNo', cell: (r: VehicleRecord) => <span className="font-mono font-bold text-primary">{r.regNo}</span> },
          { header: 'Vehicle Type', accessorKey: 'type', cell: (r: VehicleRecord) => <span className="font-bold text-foreground">{r.type}</span> },
          { header: 'Seat Capacity', accessorKey: 'capacity', cell: (r: VehicleRecord) => `${r.capacity} Seats` },
          { header: 'Assigned Students', accessorKey: 'assigned', cell: (r: VehicleRecord) => `${r.assigned} Assigned` },
          { header: 'Assigned Driver', accessorKey: 'driver' },
          { header: 'Odometer Mileage', accessorKey: 'mileage', cell: (r: VehicleRecord) => <span className="font-mono text-muted-foreground">{r.mileage}</span> },
          { header: 'Status', accessorKey: 'status', cell: (r: VehicleRecord) => <VFBadge variant={r.status === 'Active' ? 'success' : 'warning'}>{r.status}</VFBadge> },
        ]}
        data={vehiclesData}
        filterPlaceholder="Search vehicles..."
      />
    </div>
  );

  // 12.7 GPS & Live Tracking Submodule Content
  const gpsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Live GPS Fleet Location & Telematics Radar</h3>
          <p className="text-xs text-muted-foreground">Real-time GPS vehicle tracking, live speed monitoring, route deviation alerts, and parent tracking portals.</p>
        </div>
        <VFButton size="sm" variant="outline" leftIcon={<Navigation className="h-3.5 w-3.5 text-primary" />}>Refresh GPS Signal</VFButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VFCard title="Route R-01 (Bus MP-09-AB-1234)">
          <div className="space-y-2 text-xs mt-1">
            <p className="flex justify-between"><span className="text-muted-foreground">Speed:</span> <span className="font-mono font-bold text-success">32 km/h</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">Current Location:</span> <span className="font-bold text-foreground">Green Park Flyover</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">ETA to School:</span> <span className="font-mono font-bold text-primary">12 Minutes</span></p>
            <VFButton size="sm" variant="outline" className="w-full mt-2" leftIcon={<Eye className="h-3.5 w-3.5" />}>
              Open Live GPS Map
            </VFButton>
          </div>
        </VFCard>
        <VFCard title="Route R-02 (Bus MP-09-AB-5521)">
          <div className="space-y-2 text-xs mt-1">
            <p className="flex justify-between"><span className="text-muted-foreground">Speed:</span> <span className="font-mono font-bold text-success">28 km/h</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">Current Location:</span> <span className="font-bold text-foreground">Vijay Nagar Square</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">ETA to School:</span> <span className="font-mono font-bold text-primary">15 Minutes</span></p>
            <VFButton size="sm" variant="outline" className="w-full mt-2" leftIcon={<Eye className="h-3.5 w-3.5" />}>
              Open Live GPS Map
            </VFButton>
          </div>
        </VFCard>
        <VFCard title="Route R-03 (Bus MP-09-CD-9012)">
          <div className="space-y-2 text-xs mt-1">
            <p className="flex justify-between"><span className="text-muted-foreground">Speed:</span> <span className="font-mono font-bold text-warning">14 km/h (Slow)</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">Current Location:</span> <span className="font-bold text-foreground">Railway Colony Gate</span></p>
            <p className="flex justify-between"><span className="text-muted-foreground">ETA to School:</span> <span className="font-mono font-bold text-warning">24 Minutes (+12m)</span></p>
            <VFButton size="sm" variant="outline" className="w-full mt-2" leftIcon={<Eye className="h-3.5 w-3.5" />}>
              Open Live GPS Map
            </VFButton>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    routes: routesContent,
    fleet: fleetContent,
    drivers: fleetContent,
    'student-transport': dashboardContent,
    trips: dashboardContent,
    gps: gpsContent,
    incidents: dashboardContent,
    maintenance: fleetContent,
    'fees-reports': dashboardContent,
  };

  const submoduleTabs = (transportModule?.submodules || [
    { id: 'dashboard', label: 'Transport Dashboard' },
    { id: 'routes', label: 'Routes & Stops' },
    { id: 'fleet', label: 'Fleet & Vehicles' },
    { id: 'drivers', label: 'Drivers & Staff' },
    { id: 'student-transport', label: 'Student Transport' },
    { id: 'trips', label: 'Trips & Operations' },
    { id: 'gps', label: 'GPS & Live Tracking' },
    { id: 'incidents', label: 'Safety & Incidents' },
    { id: 'maintenance', label: 'Maintenance & Fuel' },
    { id: 'fees-reports', label: 'Transport Fees & Reports' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Bus className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
