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
  Bed,
  CheckCircle2,
  Ticket,
  Sparkles,
  Plus,
} from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelPage,
});

interface RoomRecord {
  id: string;
  roomNo: string;
  floor: string;
  type: string;
  capacity: number;
  occupied: number;
  available: number;
  status: 'Active' | 'Full' | 'Maintenance';
}

interface ResidentRecord {
  id: string;
  studentId: string;
  name: string;
  class: string;
  hostel: string;
  roomNo: string;
  bedNo: string;
  status: 'Resident' | 'On Leave' | 'Outpass';
}

interface OutpassRecord {
  id: string;
  outpassNo: string;
  studentName: string;
  roomNo: string;
  destination: string;
  outTime: string;
  expectedReturn: string;
  status: 'Approved' | 'Pending' | 'Late Return';
}

function HostelPage() {
  const hostelModule = MODULE_REGISTRY.find((m) => m.id === 'hostel');

  const roomsData: RoomRecord[] = [
    { id: '1', roomNo: 'A-101', floor: 'Floor 1', type: 'Double Bed', capacity: 2, occupied: 2, available: 0, status: 'Full' },
    { id: '2', roomNo: 'A-102', floor: 'Floor 1', type: '4-Bed Dorm', capacity: 4, occupied: 3, available: 1, status: 'Active' },
    { id: '3', roomNo: 'A-204', floor: 'Floor 2', type: '4-Bed Dorm', capacity: 4, occupied: 4, available: 0, status: 'Full' },
    { id: '4', roomNo: 'B-105', floor: 'Floor 1', type: 'Single Bed', capacity: 1, occupied: 0, available: 1, status: 'Active' },
  ];

  const residentsData: ResidentRecord[] = [
    { id: '1', studentId: 'ST-00421', name: 'Rahul Sharma', class: '10-A', hostel: 'Boys Hostel A', roomNo: 'A-204', bedNo: 'B-03', status: 'Resident' },
    { id: '2', studentId: 'ST-00422', name: 'Priya Patel', class: '10-A', hostel: 'Girls Hostel A', roomNo: 'C-102', bedNo: 'B-01', status: 'On Leave' },
    { id: '3', studentId: 'ST-00423', name: 'Aman Singh', class: '11-B', hostel: 'Boys Hostel A', roomNo: 'A-102', bedNo: 'B-02', status: 'Outpass' },
  ];

  const outpassData: OutpassRecord[] = [
    { id: '1', outpassNo: 'OTP-2026-088', studentName: 'Aman Singh', roomNo: 'A-102', destination: 'Main Market & Stationery', outTime: '04:00 PM', expectedReturn: '07:00 PM', status: 'Approved' },
    { id: '2', outpassNo: 'OTP-2026-089', studentName: 'Rohit Kumar', roomNo: 'A-204', destination: 'Medical Clinic Visit', outTime: '03:30 PM', expectedReturn: '06:00 PM', status: 'Late Return' },
  ];

  // 13.1 Hostel Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Hostel Management & Warden Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 4 residential hostels, 1,240 boarder students, night roll call attendance, outpasses, and mess operations.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Hostel AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Resident</VFButton>
        </div>
      </div>

      {/* Feature 1 — Hostel KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Hostel Buildings" value="4" icon={<Building className="h-5 w-5 text-primary" />} trend="up" trendLabel="1,240 Total Capacity" />
        <VFStatCard title="Occupied Beds" value="1,108" icon={<Bed className="h-5 w-5 text-secondary" />} trend="up" trendLabel="89.3% Occupancy Rate" />
        <VFStatCard title="Students Present" value="1,050" icon={<CheckCircle2 className="h-5 w-5 text-success" />} trend="up" trendLabel="Morning Roll Call Verified" />
        <VFStatCard title="Students On Leave / Outpass" value="50" icon={<Ticket className="h-5 w-5 text-warning" />} description="32 Leave · 18 Outpass" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Occupancy Overview & Roll Call */}
        <VFSection title="Hostel Building Occupancy & Today's Residence Status" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Boys Hostel A</p>
              <p className="text-base font-bold text-success mt-0.5">92% Occupied</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Girls Hostel A</p>
              <p className="text-base font-bold text-success mt-0.5">88% Occupied</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Boys Hostel B</p>
              <p className="text-base font-bold text-primary mt-0.5">76% Occupied</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Girls Hostel B</p>
              <p className="text-base font-bold text-primary mt-0.5">81% Occupied</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Student ID', accessorKey: 'studentId', cell: (r: ResidentRecord) => <span className="font-mono font-bold text-primary">{r.studentId}</span> },
              { header: 'Resident Name', accessorKey: 'name', cell: (r: ResidentRecord) => <span className="font-bold text-foreground">{r.name}</span> },
              { header: 'Class', accessorKey: 'class' },
              { header: 'Hostel Block', accessorKey: 'hostel' },
              { header: 'Room / Bed', accessorKey: 'roomNo', cell: (r: ResidentRecord) => `${r.roomNo} (${r.bedNo})` },
              {
                header: 'Residence Status',
                accessorKey: 'status',
                cell: (r: ResidentRecord) => (
                  <VFBadge variant={r.status === 'Resident' ? 'success' : r.status === 'On Leave' ? 'warning' : 'primary'}>
                    {r.status}
                  </VFBadge>
                ),
              },
            ]}
            data={residentsData}
            filterPlaceholder="Search resident name or room..."
          />
        </VFSection>

        {/* Attention Required & Outpasses */}
        <VFCard title="Attention Required & Outpass Queue">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">⚠ 8 Students Unaccounted</span>
                <VFBadge variant="warning">Roll Call Alert</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Morning roll call unverified in Boys Hostel A Floor 2</p>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🎟 4 Pending Outpass Requests</span>
                <VFBadge variant="primary">Review</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Weekend outpass requests awaiting warden signoff</p>
            </div>
            <div className="p-2.5 bg-muted/40 rounded-xl border border-border/60 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🍽 Today's Mess Schedule</span>
                <VFBadge variant="success">Breakfast Served</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Lunch scheduled for 12:30 PM (Poha + Milk Served)</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 13.3 Rooms & Beds Submodule Content
  const roomsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Hostel Room & Bed Inventory Matrix</h3>
          <p className="text-xs text-muted-foreground">Manage single, double, 4-bed dorm rooms, bed IDs (A101-B01), and room transfer logs.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Room</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Room No', accessorKey: 'roomNo', cell: (r: RoomRecord) => <span className="font-mono font-bold text-primary">{r.roomNo}</span> },
          { header: 'Building Floor', accessorKey: 'floor' },
          { header: 'Room Type', accessorKey: 'type', cell: (r: RoomRecord) => <span className="font-bold text-foreground">{r.type}</span> },
          { header: 'Total Beds', accessorKey: 'capacity', cell: (r: RoomRecord) => `${r.capacity} Beds` },
          { header: 'Occupied', accessorKey: 'occupied', cell: (r: RoomRecord) => `${r.occupied} Occupied` },
          { header: 'Available', accessorKey: 'available', cell: (r: RoomRecord) => <VFBadge variant="success">{r.available} Free</VFBadge> },
          { header: 'Status', accessorKey: 'status', cell: (r: RoomRecord) => <VFBadge variant={r.status === 'Full' ? 'warning' : 'success'}>{r.status}</VFBadge> },
        ]}
        data={roomsData}
        filterPlaceholder="Search room number or type..."
      />
    </div>
  );

  // 13.6 Leave & Outpass Submodule Content
  const outpassContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Outpass Requests & Gatekeeper Clearance Queue</h3>
          <p className="text-xs text-muted-foreground">Issue digital QR outpasses for weekend home visits, clinic visits, and market errands.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Outpass</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Outpass No', accessorKey: 'outpassNo', cell: (r: OutpassRecord) => <span className="font-mono font-bold text-primary">{r.outpassNo}</span> },
          { header: 'Student Name', accessorKey: 'studentName', cell: (r: OutpassRecord) => <span className="font-bold text-foreground">{r.studentName}</span> },
          { header: 'Room No', accessorKey: 'roomNo' },
          { header: 'Outing Destination', accessorKey: 'destination' },
          { header: 'Out Time', accessorKey: 'outTime' },
          { header: 'Expected Return', accessorKey: 'expectedReturn' },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r: OutpassRecord) => (
              <VFBadge variant={r.status === 'Approved' ? 'success' : r.status === 'Late Return' ? 'danger' : 'warning'}>
                {r.status}
              </VFBadge>
            ),
          },
        ]}
        data={outpassData}
        filterPlaceholder="Search outpasses or student..."
      />
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    buildings: dashboardContent,
    rooms: roomsContent,
    residents: dashboardContent,
    attendance: dashboardContent,
    outpass: outpassContent,
    mess: dashboardContent,
    visitors: dashboardContent,
    complaints: dashboardContent,
    'fees-reports': dashboardContent,
  };

  const submoduleTabs = (hostelModule?.submodules || [
    { id: 'dashboard', label: 'Hostel Dashboard' },
    { id: 'buildings', label: 'Hostel & Buildings' },
    { id: 'rooms', label: 'Rooms & Beds' },
    { id: 'residents', label: 'Student Residents' },
    { id: 'attendance', label: 'Hostel Attendance' },
    { id: 'outpass', label: 'Leave & Outpass' },
    { id: 'mess', label: 'Mess & Meals' },
    { id: 'visitors', label: 'Visitors & Security' },
    { id: 'complaints', label: 'Complaints & Maintenance' },
    { id: 'fees-reports', label: 'Hostel Fees & Reports' },
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
