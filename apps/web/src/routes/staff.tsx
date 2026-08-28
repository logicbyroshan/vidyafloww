import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFDrawer,
} from '@vidyamaxx/ui';
import {
  UserCheck,
  Plus,
  Download,
  Eye,
  BookOpen,
  Phone,
  MessageSquare,
  Copy,
  Check,
  X,
  Edit3,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/staff')({
  component: StaffPage,
});

interface StaffRecord {
  id: string;
  code: string;
  name: string;
  avatarUrl: string;
  designation: string;
  department: string;
  subject: string;
  secondarySubject?: string;
  assignedClasses: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  qualification: string;
  experience: string;
  salaryGrade: string;
  attendance: string;
  weeklyPeriods: number;
  status: 'Active' | 'On Leave' | 'Probation';
  joinDate: string;
}

const INITIAL_STAFF: StaffRecord[] = [
  {
    id: '1',
    code: 'EMP-T101',
    name: 'Mrs. Sunita Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    designation: 'Senior PGT Educator',
    department: 'Science & Math',
    subject: 'Mathematics',
    secondarySubject: 'Statistics',
    assignedClasses: 'Class 9-A, Class 10-A, Class 12-Sci',
    phone: '+91 98765 11223',
    email: 's.verma@springfield.edu.in',
    address: 'B-402, Green Valley Apartments, Sector 12, New Delhi',
    dob: '12 Aug 1984',
    qualification: 'M.Sc. Mathematics (Delhi University), B.Ed.',
    experience: '14 Years',
    salaryGrade: 'Grade PGT-8 (Senior Scale)',
    attendance: '98.5%',
    weeklyPeriods: 24,
    status: 'Active',
    joinDate: '15 Jul 2012',
  },
  {
    id: '2',
    code: 'EMP-T102',
    name: 'Dr. Rajesh Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    designation: 'Head of Department (HOD)',
    department: 'Science & Math',
    subject: 'Physics',
    secondarySubject: 'Applied Electronics',
    assignedClasses: 'Class 10-A, Class 11-Sci, Class 12-Sci',
    phone: '+91 98123 22334',
    email: 'r.sharma@springfield.edu.in',
    address: '14-A, Faculty Enclave, Vasant Kunj, New Delhi',
    dob: '28 Nov 1978',
    qualification: 'Ph.D. Physics (IIT Delhi), M.Sc., B.Ed.',
    experience: '18 Years',
    salaryGrade: 'Grade HOD-1 (Executive)',
    attendance: '96.0%',
    weeklyPeriods: 22,
    status: 'Active',
    joinDate: '10 Jun 2008',
  },
  {
    id: '3',
    code: 'EMP-T103',
    name: 'Mr. Arvind Gupta',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    designation: 'TGT Educator',
    department: 'Humanities & Languages',
    subject: 'Social Science',
    secondarySubject: 'History & Civics',
    assignedClasses: 'Class 8-A, Class 9-B',
    phone: '+91 97654 33445',
    email: 'a.gupta@springfield.edu.in',
    address: '77, Anand Lok Colony, New Delhi',
    dob: '05 Jan 1988',
    qualification: 'M.A. History (JNU), B.Ed.',
    experience: '9 Years',
    salaryGrade: 'Grade TGT-5',
    attendance: '94.2%',
    weeklyPeriods: 26,
    status: 'Active',
    joinDate: '01 Aug 2017',
  },
  {
    id: '4',
    code: 'EMP-T104',
    name: 'Ms. Pooja Rao',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    designation: 'PGT Educator',
    department: 'Humanities & Languages',
    subject: 'English Literature',
    secondarySubject: 'Creative Writing',
    assignedClasses: 'Class 9-A, Class 10-B, Class 11-Com',
    phone: '+91 99887 44556',
    email: 'p.rao@springfield.edu.in',
    address: 'C-12, Defence Colony, New Delhi',
    dob: '19 Oct 1990',
    qualification: 'M.A. English (St. Stephen\'s), B.Ed.',
    experience: '7 Years',
    salaryGrade: 'Grade PGT-4',
    attendance: '92.0%',
    weeklyPeriods: 25,
    status: 'On Leave',
    joinDate: '15 Jul 2019',
  },
  {
    id: '5',
    code: 'EMP-T105',
    name: 'Dr. Ramesh Nair',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    designation: 'Senior Faculty',
    department: 'Science & Math',
    subject: 'Chemistry',
    secondarySubject: 'Biochemistry',
    assignedClasses: 'Class 11-Sci, Class 12-Sci',
    phone: '+91 98234 55667',
    email: 'r.nair@springfield.edu.in',
    address: '502, Palm Heights, Gurgaon',
    dob: '03 Mar 1976',
    qualification: 'Ph.D. Organic Chemistry (IISc), B.Ed.',
    experience: '20 Years',
    salaryGrade: 'Grade PGT-9 (Senior Scale)',
    attendance: '99.0%',
    weeklyPeriods: 20,
    status: 'Active',
    joinDate: '10 Jan 2006',
  },
];

function StaffPage() {
  const { activeSession } = useGlobalStore();
  const [staffList, setStaffList] = React.useState<StaffRecord[]>(INITIAL_STAFF);
  const [selectedStaffIndex, setSelectedStaffIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isEditingStaff, setIsEditingStaff] = React.useState<boolean>(false);
  const [staffFormData, setStaffFormData] = React.useState<StaffRecord | null>(null);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const activeStaff =
    selectedStaffIndex !== null && selectedStaffIndex >= 0 && selectedStaffIndex < staffList.length
      ? staffList[selectedStaffIndex]
      : null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openStaffDrawer = (staff: StaffRecord) => {
    const idx = staffList.findIndex((s) => s.id === staff.id);
    setSelectedStaffIndex(idx >= 0 ? idx : 0);
    setIsEditingStaff(false);
    setStaffFormData(null);
    setIsDrawerOpen(true);
  };

  const handleStartEdit = () => {
    if (activeStaff) {
      setStaffFormData({ ...activeStaff });
      setIsEditingStaff(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingStaff(false);
    setStaffFormData(null);
  };

  const handleSaveStaff = () => {
    if (!staffFormData || selectedStaffIndex === null) return;
    const updated = [...staffList];
    updated[selectedStaffIndex] = { ...staffFormData };
    setStaffList(updated);
    setIsEditingStaff(false);
    setStaffFormData(null);
  };

  const handlePrevStaff = () => {
    if (selectedStaffIndex !== null && selectedStaffIndex > 0) {
      setIsEditingStaff(false);
      setStaffFormData(null);
      setSelectedStaffIndex(selectedStaffIndex - 1);
    }
  };

  const handleNextStaff = () => {
    if (selectedStaffIndex !== null && selectedStaffIndex < staffList.length - 1) {
      setIsEditingStaff(false);
      setStaffFormData(null);
      setSelectedStaffIndex(selectedStaffIndex + 1);
    }
  };

  const staffColumns = [
    {
      header: 'Staff ID',
      accessorKey: 'code',
      cell: (r: StaffRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
          {r.code}
        </span>
      ),
    },
    {
      header: 'Faculty Member',
      accessorKey: 'name',
      cell: (r: StaffRecord) => (
        <div className="flex items-center gap-3.5">
          <div
            className="overflow-hidden rounded-md border border-border shadow-xs w-11 h-[56px] bg-muted shrink-0"
            style={{ aspectRatio: '19.5 / 25' }}
          >
            <img src={r.avatarUrl} alt={r.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-extrabold text-foreground text-sm leading-tight">{r.name}</p>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.designation}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Department',
      accessorKey: 'department',
      cell: (r: StaffRecord) => <span className="text-foreground font-bold text-sm">{r.department}</span>,
    },
    {
      header: 'Primary Subject',
      accessorKey: 'subject',
      cell: (r: StaffRecord) => <span className="font-semibold text-foreground text-sm">{r.subject}</span>,
    },
    {
      header: 'Weekly Load',
      accessorKey: 'weeklyPeriods',
      cell: (r: StaffRecord) => <span className="font-bold text-foreground text-sm">{r.weeklyPeriods} Periods/Wk</span>,
    },
    {
      header: 'Attendance',
      accessorKey: 'attendance',
      cell: (r: StaffRecord) => <span className="font-mono font-bold text-emerald-400 text-sm">{r.attendance}</span>,
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
          onClick={() => openStaffDrawer(r)}
        >
          View Profile
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="space-y-2.5 sm:space-y-3">
      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Faculty Strength</span>
            <span className="text-2xl font-black text-foreground mt-1 block">124 Staff</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">94 Teaching · 30 Admin</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Today's Present</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">120 Present</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">96.8% Staff Attendance</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Average Load</span>
            <span className="text-2xl font-black text-foreground mt-1 block">23.4 / Wk</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Balanced Teaching Hours</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Faculty Retention</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">98.2%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Exemplary Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Main Staff Master Table */}
      <VFDataTable
        columns={staffColumns}
        data={staffList}
        filterPlaceholder="Search faculty by name, staff ID, department, or subject..."
        rightActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => alert('Exporting complete faculty and staff roster as CSV...')}
            >
              Export Roster
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => alert('Opening new faculty onboarding form...')}
            >
              Add Staff Member
            </VFButton>
          </>
        }
      />

      {/* 360° STAFF PROFILE SIDE DRAWER */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsEditingStaff(false);
          setStaffFormData(null);
          setIsDrawerOpen(false);
        }}
        hideHeader={true}
        title={activeStaff ? activeStaff.name : 'Faculty Dossier'}
        className="w-[960px] max-w-[96vw] sm:max-w-4xl lg:max-w-5xl"
        bodyClassName="p-5 sm:p-6 space-y-4"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {isEditingStaff ? (
              <>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-lg border border-border">
                    {staffFormData?.code || activeStaff?.code}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Modifying Faculty Profile
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4" />}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Check className="h-4 w-4" />}
                    onClick={handleSaveStaff}
                  >
                    Save Changes
                  </VFButton>
                </div>
              </>
            ) : (
              <>
                {/* 1. Bottom Stepper */}
                <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-md border border-border">
                  <button
                    onClick={handlePrevStaff}
                    disabled={selectedStaffIndex === 0}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Previous Staff Member"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-mono font-bold px-3 text-foreground select-none">
                    {selectedStaffIndex !== null ? selectedStaffIndex + 1 : 1} of {staffList.length}
                  </span>
                  <button
                    onClick={handleNextStaff}
                    disabled={selectedStaffIndex === staffList.length - 1}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Next Staff Member"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* 2. Action Buttons: Close on left, Edit on right */}
                <div className="flex items-center gap-2.5">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4 text-muted-foreground" />}
                    onClick={() => {
                      setIsEditingStaff(false);
                      setStaffFormData(null);
                      setIsDrawerOpen(false);
                    }}
                  >
                    Close
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Edit3 className="h-4 w-4" />}
                    onClick={handleStartEdit}
                  >
                    Edit Profile
                  </VFButton>
                </div>
              </>
            )}
          </div>
        }
      >
        {activeStaff && (
          <div className="space-y-6 animate-fade-in pb-4">
            {/* 1. EDIT MODE */}
            {isEditingStaff ? (
              <div className="space-y-6 animate-fade-in">
                {/* Header Banner */}
                <div className="p-5 rounded-lg bg-card border border-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative overflow-hidden rounded-md border border-border shadow-xs w-16 h-[82px] bg-muted shrink-0"
                      style={{ aspectRatio: '19.5 / 25' }}
                    >
                      <img
                        src={staffFormData?.avatarUrl || activeStaff.avatarUrl}
                        alt={staffFormData?.name || activeStaff.name}
                        style={{ aspectRatio: '19.5 / 25' }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-muted text-foreground border border-border">
                          {staffFormData?.code || activeStaff.code}
                        </span>
                        <VFBadge variant="warning">Edit Mode Active</VFBadge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mt-1 tracking-tight">
                        Editing {staffFormData?.name || activeStaff.name}'s Profile
                      </h3>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-semibold text-muted-foreground">
                    Academic Year {activeSession}
                  </div>
                </div>

                {/* Section 1: Personal & Position Info */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <span>Faculty Designation & Position</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        value={staffFormData?.name || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, name: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-bold text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Designation Title
                      </label>
                      <input
                        type="text"
                        value={staffFormData?.designation || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, designation: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Academic Department
                      </label>
                      <select
                        value={staffFormData?.department || 'Science & Math'}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, department: e.target.value })}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['Science & Math', 'Humanities & Languages', 'Commerce & Social Sciences', 'Computer Science & AI', 'Sports & Arts'].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Primary Subject
                      </label>
                      <input
                        type="text"
                        value={staffFormData?.subject || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, subject: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Employment Status
                      </label>
                      <select
                        value={staffFormData?.status || 'Active'}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, status: e.target.value as any })}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['Active', 'On Leave', 'Probation'].map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Assigned Classes & Sections
                      </label>
                      <input
                        type="text"
                        value={staffFormData?.assignedClasses || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, assignedClasses: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Photo URL (19.5 : 25 Aspect Ratio)
                      </label>
                      <input
                        type="text"
                        value={staffFormData?.avatarUrl || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, avatarUrl: e.target.value })}
                        className="w-full h-11 px-4 text-xs font-mono text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact & Personal Records */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Contact & Address Records</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        value={staffFormData?.phone || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, phone: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-mono font-bold text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Official Institutional Email
                      </label>
                      <input
                        type="email"
                        value={staffFormData?.email || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, email: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-mono text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        value={staffFormData?.address || ''}
                        onChange={(e) => setStaffFormData({ ...staffFormData!, address: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* 2. VIEW MODE */
              <div className="space-y-6 animate-fade-in">
                {/* Hero Card */}
                <div className="p-6 rounded-lg bg-card border border-border/80 shadow-md flex items-center gap-6 relative overflow-hidden flex-wrap sm:flex-nowrap">
                  <div className="relative shrink-0 mx-auto sm:mx-0">
                    <div
                      className="relative overflow-hidden rounded-lg border border-border shadow-md w-28 h-[143.5px] bg-muted flex items-center justify-center"
                      style={{ aspectRatio: '19.5 / 25' }}
                    >
                      <img
                        src={activeStaff.avatarUrl}
                        alt={activeStaff.name}
                        style={{ aspectRatio: '19.5 / 25' }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-card ring-2 ring-emerald-500/20" title="Active Faculty" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3 text-center sm:text-left">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight truncate w-full sm:w-auto">
                        {activeStaff.name}
                      </h3>
                      <VFBadge variant={activeStaff.status === 'Active' ? 'success' : 'warning'} className="px-3 py-1 text-xs font-bold mx-auto sm:mx-0">
                        {activeStaff.status}
                      </VFBadge>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-mono flex-wrap justify-center sm:justify-start">
                      <span className="font-bold text-foreground bg-muted px-2.5 py-0.5 rounded-md border border-border">{activeStaff.code}</span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">{activeStaff.designation}</span>
                      <span>•</span>
                      <span className="text-foreground font-medium">{activeStaff.department}</span>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start pt-0.5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold bg-muted/60 text-foreground border border-border">
                        <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                        {activeStaff.subject}
                      </span>
                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-muted/60 text-muted-foreground border border-border">
                        Exp: {activeStaff.experience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4 Enclosed KPI Stat Tiles */}
                <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Weekly Load</span>
                      <span className="text-2xl font-black text-foreground mt-1 block">{activeStaff.weeklyPeriods} Periods</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">Standard Workload</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Attendance Rate</span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">{activeStaff.attendance}</span>
                      <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">Exemplary Regularity</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Salary Grade</span>
                      <span className="text-xl font-bold text-foreground mt-1 block">{activeStaff.salaryGrade.split(' ')[1] || 'PGT-8'}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">{activeStaff.salaryGrade}</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Years of Service</span>
                      <span className="text-2xl font-black text-foreground mt-1 block">{activeStaff.experience}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">Joined {activeStaff.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Family Records */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Contact & Communications</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 p-4 rounded-md bg-muted/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Contact Phone</span>
                        <span className="font-mono text-lg font-bold text-foreground mt-1 block">{activeStaff.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`https://wa.me/${activeStaff.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                          className="px-4 py-2 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Message on WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleCopy(activeStaff.phone, 'phone')}
                          className="px-3.5 py-2 rounded-md bg-muted hover:bg-muted/80 border border-border text-foreground text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          {copiedKey === 'phone' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                          <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Official Email</span>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className="font-mono text-sm font-semibold text-foreground truncate">{activeStaff.email}</span>
                        <button
                          onClick={() => handleCopy(activeStaff.email, 'email')}
                          className="text-xs text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                        >
                          {copiedKey === 'email' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Residential Address</span>
                      <span className="text-sm font-semibold text-foreground mt-1 block truncate">{activeStaff.address}</span>
                    </div>
                  </div>
                </div>

                {/* Academic Qualifications & Allocations */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>Qualifications & Academic Allocations</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Qualifications</span>
                      <span className="text-sm font-bold text-foreground mt-1 block">{activeStaff.qualification}</span>
                    </div>
                    <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Assigned Classes</span>
                      <span className="text-sm font-bold text-foreground mt-1 block">{activeStaff.assignedClasses}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </VFDrawer>
    </VFPageContainer>
  );
}

