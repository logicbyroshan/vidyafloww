import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Users,
  UserCheck,
  Award,
  Clock,
  Plus,
  Download,
  Eye,
  BookOpen,
} from 'lucide-react';

export const Route = createFileRoute('/staff')({
  component: StaffPage,
});

interface StaffRecord {
  id: string;
  code: string;
  name: string;
  designation: string;
  department: string;
  subject: string;
  assignedClasses: string;
  phone: string;
  email: string;
  attendance: string;
  weeklyPeriods: number;
  status: 'Active' | 'On Leave' | 'Probation';
}

function StaffPage() {
  const [selectedStaff, setSelectedStaff] = React.useState<StaffRecord | null>(null);

  const staffData: StaffRecord[] = [
    {
      id: '1',
      code: 'EMP-T101',
      name: 'Mrs. Sunita Verma',
      designation: 'Senior PGT Educator',
      department: 'Science & Math',
      subject: 'Mathematics',
      assignedClasses: 'Class 9-A, Class 10-A, Class 12-Sci',
      phone: '+91 98765 11223',
      email: 's.verma@springfield.edu.in',
      attendance: '98.5%',
      weeklyPeriods: 24,
      status: 'Active',
    },
    {
      id: '2',
      code: 'EMP-T102',
      name: 'Dr. Rajesh Sharma',
      designation: 'Head of Department (HOD)',
      department: 'Science & Math',
      subject: 'Physics',
      assignedClasses: 'Class 10-A, Class 11-Sci, Class 12-Sci',
      phone: '+91 98123 22334',
      email: 'r.sharma@springfield.edu.in',
      attendance: '96.0%',
      weeklyPeriods: 22,
      status: 'Active',
    },
    {
      id: '3',
      code: 'EMP-T103',
      name: 'Mr. Arvind Gupta',
      designation: 'TGT Educator',
      department: 'Humanities & Languages',
      subject: 'Social Science',
      assignedClasses: 'Class 8-A, Class 9-B',
      phone: '+91 97654 33445',
      email: 'a.gupta@springfield.edu.in',
      attendance: '94.2%',
      weeklyPeriods: 26,
      status: 'Active',
    },
    {
      id: '4',
      code: 'EMP-T104',
      name: 'Ms. Pooja Rao',
      designation: 'PGT Educator',
      department: 'Humanities & Languages',
      subject: 'English Literature',
      assignedClasses: 'Class 9-A, Class 10-B, Class 11-Com',
      phone: '+91 99887 44556',
      email: 'p.rao@springfield.edu.in',
      attendance: '92.0%',
      weeklyPeriods: 25,
      status: 'On Leave',
    },
    {
      id: '5',
      code: 'EMP-T105',
      name: 'Dr. Ramesh Nair',
      designation: 'Senior Faculty',
      department: 'Science & Math',
      subject: 'Chemistry',
      assignedClasses: 'Class 11-Sci, Class 12-Sci',
      phone: '+91 98234 55667',
      email: 'r.nair@springfield.edu.in',
      attendance: '99.0%',
      weeklyPeriods: 20,
      status: 'Active',
    },
  ];

  const staffColumns = [
    {
      header: 'Staff ID',
      accessorKey: 'code',
      cell: (r: StaffRecord) => <span className="font-mono font-bold text-primary text-base">{r.code}</span>,
    },
    {
      header: 'Staff Name',
      accessorKey: 'name',
      cell: (r: StaffRecord) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-primary/15 text-primary font-bold text-sm flex items-center justify-center shrink-0">
            {r.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="font-extrabold text-foreground text-base leading-tight">{r.name}</p>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.designation}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Department',
      accessorKey: 'department',
      cell: (r: StaffRecord) => <span className="text-foreground font-bold text-base">{r.department}</span>,
    },
    {
      header: 'Primary Subject',
      accessorKey: 'subject',
      cell: (r: StaffRecord) => <span className="font-bold text-foreground text-base">{r.subject}</span>,
    },
    {
      header: 'Weekly Load',
      accessorKey: 'weeklyPeriods',
      cell: (r: StaffRecord) => <span className="font-black text-foreground text-base">{r.weeklyPeriods} Periods</span>,
    },
    {
      header: 'Attendance',
      accessorKey: 'attendance',
      cell: (r: StaffRecord) => <span className="font-black text-success text-base">{r.attendance}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: StaffRecord) => <VFBadge variant={r.status === 'Active' ? 'success' : 'warning'}>{r.status}</VFBadge>,
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: (r: StaffRecord) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-4 w-4" />}
          onClick={() => setSelectedStaff(r)}
        >
          View Profile
        </VFButton>
      ),
    },
  ];

  // 1. Staff Directory View
  const directoryContent = (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Total Faculty Strength"
          value="124 Staff"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel="94 Teaching · 30 Admin"
          accentColor="blue"
        />
        <VFStatCard
          title="Today's Present"
          value="120 Present"
          icon={<UserCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="96.8% Staff Attendance"
          accentColor="emerald"
        />
        <VFStatCard
          title="Avg Period Load"
          value="23.4 / Wk"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Optimal work balance"
          accentColor="amber"
        />
        <VFStatCard
          title="Faculty Retention"
          value="98.2%"
          icon={<Award className="h-5 w-5" />}
          trend="up"
          trendLabel="Top academic satisfaction"
          accentColor="purple"
        />
      </div>

      {/* Selected Staff 360 Card */}
      {selectedStaff && (
        <div className="p-5 bg-card border border-primary/40 rounded-lg shadow-sm animate-fade-in space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/15 text-primary font-black flex items-center justify-center text-base shrink-0">
                {selectedStaff.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground">{selectedStaff.name} ({selectedStaff.code})</h3>
                <p className="text-sm text-muted-foreground font-semibold">{selectedStaff.designation} · {selectedStaff.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <VFBadge variant="success">{selectedStaff.status}</VFBadge>
              <button
                onClick={() => setSelectedStaff(null)}
                className="text-sm text-muted-foreground hover:text-foreground font-bold px-2.5 py-1 rounded-md hover:bg-muted cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Assigned Classes</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedStaff.assignedClasses}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact Phone</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedStaff.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Official Email</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedStaff.email}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Weekly Workload</p>
              <p className="text-xl font-black text-primary mt-0.5">{selectedStaff.weeklyPeriods} Periods/Week</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Staff Roster Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Faculty & Staff Master Directory</h2>
            <p className="text-sm text-muted-foreground font-medium">Manage teacher allocations, departments, and payroll profiles</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Roster
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Add Staff Member
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={staffColumns}
          data={staffData}
          filterPlaceholder="Search staff by name, ID, or subject..."
        />
      </div>
    </div>
  );

  // 2. Department Workload Matrix View
  const workloadContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Science & Mathematics" description="Department strength: 38 Educators">
          <div className="space-y-2 mt-1 text-base">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Total Weekly Periods</span>
              <span className="font-black text-foreground">840 Periods</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Average Load / Teacher</span>
              <span className="font-black text-foreground">22.1 Periods</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Capacity Utilization</span>
              <span className="font-black text-success">92% Optimal</span>
            </div>
          </div>
        </VFCard>

        <VFCard title="Humanities & Languages" description="Department strength: 32 Educators">
          <div className="space-y-2 mt-1 text-base">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Total Weekly Periods</span>
              <span className="font-black text-foreground">720 Periods</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Average Load / Teacher</span>
              <span className="font-black text-foreground">22.5 Periods</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Capacity Utilization</span>
              <span className="font-black text-success">94% Optimal</span>
            </div>
          </div>
        </VFCard>

        <VFCard title="Commerce & Social Sciences" description="Department strength: 24 Educators">
          <div className="space-y-2 mt-1 text-base">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Total Weekly Periods</span>
              <span className="font-black text-foreground">520 Periods</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Average Load / Teacher</span>
              <span className="font-black text-foreground">21.6 Periods</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Capacity Utilization</span>
              <span className="font-black text-success">89% Optimal</span>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  const tabs = [
    { id: 'directory', label: 'Faculty Directory', icon: <Users className="h-4 w-4" />, content: directoryContent },
    { id: 'workload', label: 'Department Workload Matrix', icon: <BookOpen className="h-4 w-4" />, content: workloadContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="directory" variant="top-bar" />
    </VFPageContainer>
  );
}
