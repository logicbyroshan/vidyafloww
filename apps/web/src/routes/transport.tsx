import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Bus,
  MapPin,
  Users,
  Clock,
  Award,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Send,
  Download,
  Navigation,
  Wrench,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';

export const Route = createFileRoute('/transport')({
  component: TransportPage,
});

function TransportPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const busData = [
    { number: 'DL-01-AB-104', route: 'Route 4 (North Suburbs)', driver: 'Mr. Ramesh Kumar', capacity: '42 Seats', assigned: 38, gps: 'Live 🟢 (Speed 34km/h)', status: 'Active' },
    { number: 'DL-01-AB-108', route: 'Route 8 (East City)', driver: 'Mr. Suresh Pal', capacity: '45 Seats', assigned: 42, gps: 'Live 🟢 (Speed 28km/h)', status: 'Active' },
    { number: 'DL-01-AB-112', route: 'Route 12 (West Campus)', driver: 'Mr. Anil Verma', capacity: '40 Seats', assigned: 36, gps: 'Live 🟢 (At Stop 4)', status: 'Active' },
  ];

  const busColumns = [
    { header: 'Vehicle Number', accessorKey: 'number', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.number}</span> },
    { header: 'Assigned Route', accessorKey: 'route', cell: (r: any) => <span className="font-bold text-foreground">{r.route}</span> },
    { header: 'Driver Name', accessorKey: 'driver' },
    { header: 'Capacity', accessorKey: 'capacity' },
    { header: 'Assigned Students', accessorKey: 'assigned', cell: (r: any) => `${r.assigned} Students` },
    { header: 'Live GPS Status', accessorKey: 'gps', cell: (r: any) => <span className="font-mono text-xs text-emerald-500 font-bold">{r.gps}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Transport Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Bus Fleet" value="14 Vehicles" icon={<Bus className="h-5 w-5 text-primary" />} trend="up" trendLabel="100% On Road Today" />
        <VFStatCard title="Total Transport Students" value="480 Students" icon={<Users className="h-5 w-5 text-emerald-500" />} trend="neutral" trendLabel="Across 12 Routes" />
        <VFStatCard title="GPS Live Tracking" value="14 / 14 Online" icon={<Navigation className="h-5 w-5 text-amber-500" />} description="Speed & Geofence Active" />
        <VFStatCard title="Maintenance Due" value="1 Vehicle" icon={<Wrench className="h-5 w-5 text-purple-500" />} description="Scheduled Maintenance" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Vehicles
  // ----------------------------------------------------
  const vehiclesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">School Vehicle Fleet Master Catalog</h3>
          <p className="text-xs text-muted-foreground">Buses, vans, capacity specs, registration numbers, and insurance records.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add New Vehicle</VFButton>
      </div>
      <VFDataTable columns={busColumns} data={busData} filterPlaceholder="Search vehicle number or route..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Routes
  // ----------------------------------------------------
  const routesContent = (
    <div className="space-y-4">
      <VFCard title="Transport Bus Route Optimization & Master Pathways">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Route 4: North Suburbs</span>
            <p className="text-muted-foreground text-xs mt-1">12 Stops · 38 Students Assigned · Bus #104</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Route 8: East City Ring</span>
            <p className="text-muted-foreground text-xs mt-1">15 Stops · 42 Students Assigned · Bus #108</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Route 12: West Campus Express</span>
            <p className="text-muted-foreground text-xs mt-1">8 Stops · 36 Students Assigned · Bus #112</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Stops
  // ----------------------------------------------------
  const stopsContent = (
    <div className="space-y-4">
      <VFCard title="Bus Stop Pick-up / Drop-off Point Master">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Geofenced pick-up points with expected morning and evening arrival times.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Drivers
  // ----------------------------------------------------
  const driversContent = (
    <div className="space-y-4">
      <VFCard title="Bus Driver Credentials & Commercial License Vault">
        <p className="text-xs text-muted-foreground mb-3">Heavy vehicle driving licenses, police verification, and alcohol test logs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Attendants
  // ----------------------------------------------------
  const attendantsContent = (
    <div className="space-y-4">
      <VFCard title="Bus Helper & Female Attendant Roster">
        <p className="text-xs text-muted-foreground mb-3">Assign female bus attendants for junior student safety and RFID boarding checks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Student Transport Assignment
  // ----------------------------------------------------
  const studentAssignmentContent = (
    <div className="space-y-4">
      <VFCard title="Student Transport Allocation & Stop Assignment">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Assign students to specific bus routes, pick-up stops, and monthly transport slabs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Vehicle Assignment
  // ----------------------------------------------------
  const vehicleAssignmentContent = (
    <div className="space-y-4">
      <VFCard title="Vehicle-to-Route & Driver Assignment Matrix">
        <p className="text-xs text-muted-foreground mb-3">Map physical buses to specific route schedules and primary/standby drivers.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Trip Management
  // ----------------------------------------------------
  const tripsContent = (
    <div className="space-y-4">
      <VFCard title="Morning & Afternoon Bus Trip Dispatch Log">
        <p className="text-xs text-muted-foreground mb-3">Trip start timestamps, campus gate departure logs, and return arrival verification.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Transport Attendance
  // ----------------------------------------------------
  const attendanceContent = (
    <div className="space-y-4">
      <VFCard title="Live RFID Bus Boarding & Alighting Attendance">
        <p className="text-xs text-muted-foreground mb-3">Instant parent app notifications when student taps RFID card upon entering bus.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — GPS & Tracking
  // ----------------------------------------------------
  const gpsTrackingContent = (
    <div className="space-y-4">
      <VFCard title="Real-Time Bus GPS Tracking & Geofence Monitor">
        <p className="text-xs text-muted-foreground mb-3 font-mono font-bold">Live map telemetry, current speed, route deviation alerts, and ETA notifications.</p>
        <VFBadge variant="success">14 Fleet Telemetry Feeds Active</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Transport Fees
  // ----------------------------------------------------
  const feesContent = (
    <div className="space-y-4">
      <VFCard title="Distance-Based Transport Fee Slabs">
        <p className="text-xs text-muted-foreground mb-3">Slab A (0-5 km: ₹2,500/qtr), Slab B (5-10 km: ₹3,500/qtr), Slab C (10+ km: ₹4,500/qtr).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Vehicle Documents
  // ----------------------------------------------------
  const documentsContent = (
    <div className="space-y-4">
      <VFCard title="RC, Fitness Certificate & Insurance Vault">
        <p className="text-xs text-muted-foreground mb-3">Track annual RTO fitness renewal deadlines, pollution (PUC) certificates, and insurance policies.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Vehicle Maintenance
  // ----------------------------------------------------
  const maintenanceContent = (
    <div className="space-y-4">
      <VFCard title="Fuel Efficiency & Garage Servicing Records">
        <p className="text-xs text-muted-foreground mb-3">Record diesel refueling logs, mileage km/L, oil changes, and tire replacements.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Transport Notifications
  // ----------------------------------------------------
  const notificationsContent = (
    <div className="space-y-4">
      <VFCard title="Parent App Bus Delay & ETA SMS Broadcast">
        <p className="text-xs text-muted-foreground mb-3">Send instant alerts for traffic delays, breakdown proxies, or route changes.</p>
        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Broadcast Delay Alert</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Transport Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Transport Analytics & Fuel Utilization Reports">
        <p className="text-xs text-muted-foreground mb-3">Route profitability, fuel cost per student, and bus utilization rates.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Transport Report (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — Transport Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Transport Parameters & Speed Limit Rules">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Max Bus Speed Limit" defaultValue="40 km/h" />
          <VFSelect label="GPS Ping Interval" options={[{ label: '10 Seconds (Live Realtime)', value: '10s' }, { label: '30 Seconds', value: '30s' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 17 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Transport Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'vehicles', label: 'Vehicles', icon: <Bus className="h-3.5 w-3.5" />, content: vehiclesContent },
    { id: 'routes', label: 'Routes', icon: <Navigation className="h-3.5 w-3.5" />, content: routesContent },
    { id: 'stops', label: 'Stops', icon: <MapPin className="h-3.5 w-3.5" />, content: stopsContent },
    { id: 'drivers', label: 'Drivers', icon: <Users className="h-3.5 w-3.5" />, content: driversContent },
    { id: 'attendants', label: 'Attendants', icon: <Users className="h-3.5 w-3.5" />, content: attendantsContent },
    { id: 'student-assignment', label: 'Student Transport Assignment', icon: <Users className="h-3.5 w-3.5" />, content: studentAssignmentContent },
    { id: 'vehicle-assignment', label: 'Vehicle Assignment', icon: <Bus className="h-3.5 w-3.5" />, content: vehicleAssignmentContent },
    { id: 'trips', label: 'Trip Management', icon: <Clock className="h-3.5 w-3.5" />, content: tripsContent },
    { id: 'attendance', label: 'Transport Attendance', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: attendanceContent },
    { id: 'gps-tracking', label: 'GPS & Tracking', icon: <Navigation className="h-3.5 w-3.5" />, content: gpsTrackingContent },
    { id: 'fees', label: 'Transport Fees', icon: <Award className="h-3.5 w-3.5" />, content: feesContent },
    { id: 'documents', label: 'Vehicle Documents', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: documentsContent },
    { id: 'maintenance', label: 'Vehicle Maintenance', icon: <Wrench className="h-3.5 w-3.5" />, content: maintenanceContent },
    { id: 'notifications', label: 'Transport Notifications', icon: <Send className="h-3.5 w-3.5" />, content: notificationsContent },
    { id: 'reports', label: 'Transport Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Transport Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
