import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Building2,
  Users,
  Award,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Download,
  Utensils,
  DoorOpen,
  Bed,
  ShieldAlert,
  BarChart3,
  Calendar,
} from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelPage,
});

function HostelPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const hostelData = [
    { code: 'BLK-A', name: 'Boys Hostel Block A', totalRooms: 40, totalBeds: 120, occupied: 112, warden: 'Mr. S.P. Sharma', status: 'Active' },
    { code: 'BLK-B', name: 'Girls Hostel Block B', totalRooms: 40, totalBeds: 120, occupied: 118, warden: 'Mrs. Sunita Rao', status: 'Active' },
    { code: 'BLK-C', name: 'Senior Wing Block C', totalRooms: 20, totalBeds: 40, occupied: 36, warden: 'Dr. Ramanujan K', status: 'Active' },
  ];

  const hostelColumns = [
    { header: 'Block Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Hostel Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Rooms', accessorKey: 'totalRooms' },
    { header: 'Bed Capacity', accessorKey: 'totalBeds' },
    { header: 'Occupied', accessorKey: 'occupied', cell: (r: any) => <span className="font-mono font-bold text-emerald-500">{r.occupied}</span> },
    { header: 'Warden In-Charge', accessorKey: 'warden' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Hostel Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Resident Students" value="266 Resident" icon={<Users className="h-5 w-5 text-primary" />} trend="up" trendLabel="95% Occupancy" />
        <VFStatCard title="Active Outpasses" value="8 Students" icon={<DoorOpen className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="Weekend Passes" />
        <VFStatCard title="Night Attendance" value="100% Verified" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="0 Unaccounted" />
        <VFStatCard title="Mess Meals Served" value="798 Meals/Day" icon={<Utensils className="h-5 w-5 text-purple-500" />} description="Breakfast, Lunch, Dinner" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Hostels & Buildings
  // ----------------------------------------------------
  const buildingsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Hostel Blocks & Dormitory Buildings Directory</h3>
          <p className="text-xs text-muted-foreground">Manage hostel blocks, warden assignments, and building capacity.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Hostel Block</VFButton>
      </div>
      <VFDataTable columns={hostelColumns} data={hostelData} filterPlaceholder="Search hostel block..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Floors
  // ----------------------------------------------------
  const floorsContent = (
    <div className="space-y-4">
      <VFCard title="Building Floor Hierarchy & Layout Plan">
        <p className="text-xs text-muted-foreground mb-3">Ground Floor, 1st Floor, 2nd Floor room allocation matrix.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Rooms
  // ----------------------------------------------------
  const roomsContent = (
    <div className="space-y-4">
      <VFCard title="Hostel Rooms & Accommodation Types (Single / Double / Triple)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Room 101 (Triple Bed)</span>
            <p className="text-muted-foreground text-xs mt-1">Block A · 3 Beds · 3 Occupied</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Room 102 (Triple Bed)</span>
            <p className="text-muted-foreground text-xs mt-1">Block A · 3 Beds · 2 Occupied (1 Free)</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Room 201 (Single Deluxe)</span>
            <p className="text-muted-foreground text-xs mt-1">Senior Wing Block C · 1 Bed · Occupied</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Beds
  // ----------------------------------------------------
  const bedsContent = (
    <div className="space-y-4">
      <VFCard title="Bed-Level Accession & Asset ID Tracking">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Unique bed numbers (e.g. Bed 101-A, Bed 101-B, Bed 101-C) with mattress asset tags.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Student Allocation
  // ----------------------------------------------------
  const studentAllocationContent = (
    <div className="space-y-4">
      <VFCard title="Hostel Room & Bed Allocation Engine">
        <p className="text-xs text-muted-foreground mb-3">Assign resident students to specific hostel rooms and beds based on grade and house.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Room Transfers
  // ----------------------------------------------------
  const transfersContent = (
    <div className="space-y-4">
      <VFCard title="Room Transfer & Bed Swap Request Module">
        <p className="text-xs text-muted-foreground mb-3">Process student room change requests with warden approval workflow.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Hostel Attendance
  // ----------------------------------------------------
  const attendanceContent = (
    <div className="space-y-4">
      <VFCard title="Night Roll-Call Attendance Terminal (09:00 PM)">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Warden mobile app biometric check for night dormitory presence.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Leave Management
  // ----------------------------------------------------
  const leaveContent = (
    <div className="space-y-4">
      <VFCard title="Hostel Overnight & Vacation Leave Applications">
        <p className="text-xs text-muted-foreground mb-3">Parent OTP verified overnight leave applications.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Outpass Management
  // ----------------------------------------------------
  const outpassContent = (
    <div className="space-y-4">
      <VFCard title="Digital Outpass & Gate Pass System">
        <p className="text-xs text-muted-foreground mb-3">Issue QR code outpasses for local market outings and weekend home visits.</p>
        <VFBadge variant="warning">8 Active Outpasses Issued</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Visitors
  // ----------------------------------------------------
  const visitorsContent = (
    <div className="space-y-4">
      <VFCard title="Hostel Visitor Register & Parent Entry Log">
        <p className="text-xs text-muted-foreground mb-3">Log visitor Aadhaar numbers, relationship verification, and visiting room timestamps.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Hostel Incidents
  // ----------------------------------------------------
  const incidentsContent = (
    <div className="space-y-4">
      <VFCard title="Hostel Disciplinary & Medical Incident Log">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-destructive">Record warden incident reports, late night curfews, and infirmary visits.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Mess Management
  // ----------------------------------------------------
  const messContent = (
    <div className="space-y-4">
      <VFCard title="Weekly Mess Menu Planner & Meal Count Tracker">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs mt-2">
          {['Breakfast (07:30 AM)', 'Lunch (01:00 PM)', 'Evening Snacks (05:00 PM)', 'Dinner (08:00 PM)'].map((m, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 text-center font-bold text-foreground">{m}</div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Hostel Fees
  // ----------------------------------------------------
  const feesContent = (
    <div className="space-y-4">
      <VFCard title="Quarterly Room Rent & Mess Fee Demands">
        <p className="text-xs text-muted-foreground mb-3">Hostel room rent and mess fee collection ledgers.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Hostel Inventory
  // ----------------------------------------------------
  const inventoryContent = (
    <div className="space-y-4">
      <VFCard title="Hostel Furniture, Linen & Appliance Inventory">
        <p className="text-xs text-muted-foreground mb-3">Track beds, study tables, chairs, water coolers, and laundry machines.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Hostel Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Hostel Occupancy & Mess Analytics Reports">
        <p className="text-xs text-muted-foreground mb-3">Monthly occupancy percentage, outpass statistics, and mess food consumption trends.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Hostel Report (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — Hostel Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Hostel Parameters & Curfew Time Rules">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Night Curfew Time" defaultValue="08:30 PM" />
          <VFInput label="Night Roll Call Time" defaultValue="09:00 PM" />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 17 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Hostel Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'buildings', label: 'Hostels & Buildings', icon: <Building2 className="h-3.5 w-3.5" />, content: buildingsContent },
    { id: 'floors', label: 'Floors', icon: <Building2 className="h-3.5 w-3.5" />, content: floorsContent },
    { id: 'rooms', label: 'Rooms', icon: <DoorOpen className="h-3.5 w-3.5" />, content: roomsContent },
    { id: 'beds', label: 'Beds', icon: <Bed className="h-3.5 w-3.5" />, content: bedsContent },
    { id: 'student-allocation', label: 'Student Allocation', icon: <Users className="h-3.5 w-3.5" />, content: studentAllocationContent },
    { id: 'transfers', label: 'Room Transfers', icon: <DoorOpen className="h-3.5 w-3.5" />, content: transfersContent },
    { id: 'attendance', label: 'Hostel Attendance', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: attendanceContent },
    { id: 'leave', label: 'Leave Management', icon: <Calendar className="h-3.5 w-3.5" />, content: leaveContent },
    { id: 'outpass', label: 'Outpass Management', icon: <DoorOpen className="h-3.5 w-3.5" />, content: outpassContent },
    { id: 'visitors', label: 'Visitors', icon: <Users className="h-3.5 w-3.5" />, content: visitorsContent },
    { id: 'incidents', label: 'Hostel Incidents', icon: <ShieldAlert className="h-3.5 w-3.5" />, content: incidentsContent },
    { id: 'mess', label: 'Mess Management', icon: <Utensils className="h-3.5 w-3.5" />, content: messContent },
    { id: 'fees', label: 'Hostel Fees', icon: <Award className="h-3.5 w-3.5" />, content: feesContent },
    { id: 'inventory', label: 'Hostel Inventory', icon: <Building2 className="h-3.5 w-3.5" />, content: inventoryContent },
    { id: 'reports', label: 'Hostel Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Hostel Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
