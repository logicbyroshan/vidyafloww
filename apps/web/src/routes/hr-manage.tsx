import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Search,
  Plus,
  ShieldCheck,
  Clock,
  Building2,
  Phone,
  CheckCircle2,
  Truck,
  Sparkles,
  Users,
} from 'lucide-react';

export const Route = createFileRoute('/hr-manage')({
  component: HRManagementPage,
});

export interface StaffMember {
  id: string;
  name: string;
  department: 'Transport' | 'Housekeeping' | 'Security' | 'Dining & Hostel' | 'Maintenance' | 'Administration';
  role: string;
  phone: string;
  shift: 'Morning (06:00 - 14:00)' | 'General (08:30 - 17:00)' | 'Evening (13:00 - 21:00)' | 'Night (20:00 - 06:00)';
  assignedArea: string;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  verification: 'Verified' | 'Pending';
  policeVerificationNo: string;
  aadhaarMasked: string;
  joinDate: string;
  monthlyWage: string;
  emergencyContact: { name: string; relation: string; phone: string };
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'STF-DRV-014',
    name: 'Surender Rawat',
    department: 'Transport',
    role: 'Senior Heavy Bus Driver',
    phone: '+91 98112 45901',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Bus #04 (Route 2 — Preet Vihar)',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2024-9921',
    aadhaarMasked: '•••• •••• 4091',
    joinDate: '12 Aug 2021',
    monthlyWage: '₹28,500',
    emergencyContact: { name: 'Sunita Rawat', relation: 'Spouse', phone: '+91 98112 45902' },
  },
  {
    id: 'STF-DRV-019',
    name: 'Mohammad Irfan',
    department: 'Transport',
    role: 'School Bus Driver',
    phone: '+91 98701 88412',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Bus #07 (Route 5 — Rohini)',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2025-3310',
    aadhaarMasked: '•••• •••• 1184',
    joinDate: '04 Jan 2023',
    monthlyWage: '₹26,000',
    emergencyContact: { name: 'Ayesha Irfan', relation: 'Spouse', phone: '+91 98701 88419' },
  },
  {
    id: 'STF-CLN-022',
    name: 'Ram Charan Lal',
    department: 'Housekeeping',
    role: 'Lead Campus Sanitation Specialist',
    phone: '+91 97180 23119',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Academic Block A (Ground & 1st Floor)',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2023-8812',
    aadhaarMasked: '•••• •••• 9920',
    joinDate: '15 Mar 2020',
    monthlyWage: '₹19,500',
    emergencyContact: { name: 'Geeta Devi', relation: 'Spouse', phone: '+91 97180 23120' },
  },
  {
    id: 'STF-CLN-027',
    name: 'Sunita Devi',
    department: 'Housekeeping',
    role: 'Sanitation Staff',
    phone: '+91 96541 33091',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Primary Wing Classrooms & Washrooms',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2024-5541',
    aadhaarMasked: '•••• •••• 7731',
    joinDate: '10 Jun 2022',
    monthlyWage: '₹18,000',
    emergencyContact: { name: 'Manoj Kumar', relation: 'Brother', phone: '+91 96541 33095' },
  },
  {
    id: 'STF-SEC-005',
    name: 'Subhash Chandra Bose',
    department: 'Security',
    role: 'Chief Security Supervisor',
    phone: '+91 98103 77210',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'Main Institutional Gate A & CCTV Hub',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2022-1002',
    aadhaarMasked: '•••• •••• 3410',
    joinDate: '01 Nov 2019',
    monthlyWage: '₹32,000',
    emergencyContact: { name: 'Anita Bose', relation: 'Spouse', phone: '+91 98103 77215' },
  },
  {
    id: 'STF-SEC-012',
    name: 'Joginder Singh',
    department: 'Security',
    role: 'Night Armed Patrol Guard',
    phone: '+91 99114 66209',
    shift: 'Night (20:00 - 06:00)',
    assignedArea: 'Hostel Perimeter & Sports Complex',
    status: 'Off Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2023-4401',
    aadhaarMasked: '•••• •••• 5590',
    joinDate: '18 Jul 2021',
    monthlyWage: '₹24,000',
    emergencyContact: { name: 'Harpreet Kaur', relation: 'Spouse', phone: '+91 99114 66211' },
  },
  {
    id: 'STF-HOS-008',
    name: 'Kailash Chand',
    department: 'Dining & Hostel',
    role: 'Head Chef & Nutrition Supervisor',
    phone: '+91 97119 55320',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Main Hostel Central Kitchen',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2023-6623',
    aadhaarMasked: '•••• •••• 8840',
    joinDate: '22 Oct 2021',
    monthlyWage: '₹31,000',
    emergencyContact: { name: 'Meena Chand', relation: 'Spouse', phone: '+91 97119 55325' },
  },
  {
    id: 'STF-MNT-003',
    name: 'Deepak Sharma',
    department: 'Maintenance',
    role: 'Senior Campus Electrician',
    phone: '+91 98912 00451',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'Campus Substation, Gensets & HVAC',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2022-7719',
    aadhaarMasked: '•••• •••• 6632',
    joinDate: '05 Sep 2020',
    monthlyWage: '₹27,500',
    emergencyContact: { name: 'Rajesh Sharma', relation: 'Father', phone: '+91 98912 00455' },
  },
  {
    id: 'STF-ADM-011',
    name: 'Pooja Kashyap',
    department: 'Administration',
    role: 'Front Office & Transport Dispatcher',
    phone: '+91 98188 33201',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'Administrative Block Dispatch Counter',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2024-1189',
    aadhaarMasked: '•••• •••• 2291',
    joinDate: '14 Feb 2024',
    monthlyWage: '₹25,000',
    emergencyContact: { name: 'Vikram Kashyap', relation: 'Spouse', phone: '+91 98188 33209' },
  },
  {
    id: 'STF-MNT-009',
    name: 'Balwant Rai',
    department: 'Maintenance',
    role: 'Plumbing & Water Purification Specialist',
    phone: '+91 98711 66502',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'RO Plants, Water Coolers & Drainage',
    status: 'On Leave',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2023-9901',
    aadhaarMasked: '•••• •••• 8819',
    joinDate: '01 Aug 2022',
    monthlyWage: '₹22,000',
    emergencyContact: { name: 'Suman Rai', relation: 'Spouse', phone: '+91 98711 66509' },
  },
];

function HRManagementPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'स्टाफ एचआर प्रबंधन' : 'Non-Teaching Staff HR') + ' – VidyaFloww';
  }, [isHindi]);

  const [activeTab, setActiveTab] = React.useState<'directory' | 'shifts'>('directory');
  const [staffList, setStaffList] = React.useState<StaffMember[]>(INITIAL_STAFF);
  const [departmentFilter, setDepartmentFilter] = React.useState<string>('All');
  const [shiftFilter, setShiftFilter] = React.useState<string>('All');
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const [isOnboardModalOpen, setIsOnboardModalOpen] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<StaffMember | null>(null);

  // New staff form state
  const [newName, setNewName] = React.useState('');
  const [newDepartment, setNewDepartment] = React.useState<StaffMember['department']>('Housekeeping');
  const [newRole, setNewRole] = React.useState('');
  const [newPhone, setNewPhone] = React.useState('');
  const [newShift, setNewShift] = React.useState<StaffMember['shift']>('Morning (06:00 - 14:00)');
  const [newArea, setNewArea] = React.useState('');
  const [newWage, setNewWage] = React.useState('₹20,000');
  const [newEmergencyPhone, setNewEmergencyPhone] = React.useState('');

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim() || !newRole.trim()) return;

    const deptCodeMap: Record<string, string> = {
      Transport: 'DRV',
      Housekeeping: 'CLN',
      Security: 'SEC',
      'Dining & Hostel': 'HOS',
      Maintenance: 'MNT',
      Administration: 'ADM',
    };

    const code = deptCodeMap[newDepartment] || 'GEN';
    const randomNum = Math.floor(10 + Math.random() * 90);

    const newMember: StaffMember = {
      id: `STF-${code}-0${randomNum}`,
      name: newName.trim(),
      department: newDepartment,
      role: newRole.trim(),
      phone: newPhone.trim(),
      shift: newShift,
      assignedArea: newArea.trim() || 'Campus General Allocation',
      status: 'On Duty',
      verification: 'Verified',
      policeVerificationNo: `POL-DEL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      aadhaarMasked: '•••• •••• ' + Math.floor(1000 + Math.random() * 9000),
      joinDate: 'Today',
      monthlyWage: newWage.trim() || '₹22,000',
      emergencyContact: {
        name: 'Family Contact',
        relation: 'Relative',
        phone: newEmergencyPhone.trim() || newPhone.trim(),
      },
    };

    setStaffList([newMember, ...staffList]);
    setIsOnboardModalOpen(false);
    setNewName('');
    setNewRole('');
    setNewPhone('');
    setNewArea('');
    setNewEmergencyPhone('');

    addNotification({
      title: isHindi ? 'स्टाफ जोड़ा गया' : 'Staff Member Onboarded',
      description: `${newMember.name} (${newMember.role}) registered with ID ${newMember.id}.`,
      type: 'success',
    });
  };

  const handleStatusToggle = (staffId: string, nextStatus: StaffMember['status']) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, status: nextStatus } : s))
    );
    if (selectedStaff && selectedStaff.id === staffId) {
      setSelectedStaff((prev) => prev ? { ...prev, status: nextStatus } : null);
    }
    addNotification({
      title: isHindi ? 'स्थिति अपडेट' : 'Duty Status Updated',
      description: `Staff member marked as ${nextStatus}.`,
      type: 'info',
    });
  };

  // Filter staff
  const filteredStaff = staffList.filter((s) => {
    if (departmentFilter !== 'All' && s.department !== departmentFilter) return false;
    if (shiftFilter !== 'All' && !s.shift.includes(shiftFilter)) return false;
    if (statusFilter !== 'All' && s.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.assignedArea.toLowerCase().includes(q) ||
        s.phone.includes(q)
      );
    }
    return true;
  });

  const onDutyCount = staffList.filter((s) => s.status === 'On Duty').length;
  const onLeaveCount = staffList.filter((s) => s.status === 'On Leave').length;
  const verifiedCount = staffList.filter((s) => s.verification === 'Verified').length;

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-4">
      {/* ── SINGLE UNIFIED HEADER (Standardized Design System) ── */}
      <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: Tab Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70">
            <button
              type="button"
              id="tab-staff-directory"
              onClick={() => setActiveTab('directory')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'directory'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              {isHindi ? 'स्टाफ डायरेक्टरी व रोस्टर' : 'Staff Directory & Roster'}
            </button>
            <button
              type="button"
              id="tab-shift-matrix"
              onClick={() => setActiveTab('shifts')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'shifts'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              {isHindi ? 'शिफ्ट कवरेज व ड्यूटी स्थिति' : 'Shift Coverage & Duty Matrix'}
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => setIsOnboardModalOpen(true)}
            className="h-8 px-3.5 text-xs font-bold shadow-xs rounded-[4px]"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? '+ नया स्टाफ जोड़ें' : '+ Onboard Staff'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: STAFF DIRECTORY & ROSTER
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'directory' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#141414] border border-border/80 p-3 rounded-[4px]">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 bg-[#181818] px-2.5 py-1.5 rounded-[3px] border border-border/70">
                <span className="text-xs text-muted-foreground font-semibold">{isHindi ? 'विभाग:' : 'Dept:'}</span>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs font-bold text-foreground focus:ring-0 p-0 cursor-pointer"
                >
                  <option value="All">{isHindi ? 'सभी विभाग' : 'All Departments'}</option>
                  <option value="Transport">Transport (Drivers/Conductors)</option>
                  <option value="Housekeeping">Housekeeping & Sanitation</option>
                  <option value="Security">Security & Surveillance</option>
                  <option value="Dining & Hostel">Dining, Cooks & Hostel</option>
                  <option value="Maintenance">Maintenance & Electricians</option>
                  <option value="Administration">General Administration</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-[#181818] px-2.5 py-1.5 rounded-[3px] border border-border/70">
                <span className="text-xs text-muted-foreground font-semibold">{isHindi ? 'शिफ्ट:' : 'Shift:'}</span>
                <select
                  value={shiftFilter}
                  onChange={(e) => setShiftFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs font-bold text-foreground focus:ring-0 p-0 cursor-pointer"
                >
                  <option value="All">{isHindi ? 'सभी शिफ्ट्स' : 'All Shifts'}</option>
                  <option value="Morning">Morning (06:00 - 14:00)</option>
                  <option value="General">General (08:30 - 17:00)</option>
                  <option value="Evening">Evening (13:00 - 21:00)</option>
                  <option value="Night">Night (20:00 - 06:00)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-[#181818] px-2.5 py-1.5 rounded-[3px] border border-border/70">
                <span className="text-xs text-muted-foreground font-semibold">{isHindi ? 'ड्यूटी स्थिति:' : 'Duty:'}</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs font-bold text-foreground focus:ring-0 p-0 cursor-pointer"
                >
                  <option value="All">{isHindi ? 'सभी' : 'All Status'}</option>
                  <option value="On Duty">On Duty</option>
                  <option value="Off Duty">Off Duty</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="relative w-full lg:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'नाम, आईडी या बस/एरिया खोजें...' : 'Search staff, role or area...'}
                className="w-full px-3 py-1.5 pl-8 border border-border rounded-[3px] bg-[#181818] text-foreground text-xs focus:outline-none"
              />
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-3 px-4 text-xs font-semibold">{isHindi ? 'स्टाफ आईडी' : 'Staff ID'}</th>
                    <th className="py-3 px-4 text-xs font-semibold">{isHindi ? 'कर्मचारी नाम व पद' : 'Staff Name & Role'}</th>
                    <th className="py-3 px-4 text-xs font-semibold">{isHindi ? 'विभाग' : 'Department'}</th>
                    <th className="py-3 px-4 text-xs font-semibold">{isHindi ? 'शिफ्ट' : 'Shift Timing'}</th>
                    <th className="py-3 px-4 text-xs font-semibold">{isHindi ? 'आवंटित वाहन / क्षेत्र' : 'Assigned Area / Vehicle'}</th>
                    <th className="py-3 px-4 text-xs font-semibold">{isHindi ? 'सत्यापन' : 'Verification'}</th>
                    <th className="py-3 px-4 text-xs font-semibold">{t('col.status')}</th>
                    <th className="py-3 px-4 text-xs font-semibold text-right">{t('col.action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-muted-foreground text-xs">
                        {isHindi ? 'कोई कर्मचारी नहीं मिला।' : 'No non-teaching staff found matching filters.'}
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-xs text-primary">{staff.id}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm font-bold text-foreground">{staff.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{staff.role}</div>
                        </td>
                        <td className="py-3 px-4">
                          <VFBadge variant="outline" className="text-xs px-2 py-0.5 rounded-[3px]">
                            {staff.department}
                          </VFBadge>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{staff.shift}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs font-medium text-foreground max-w-[200px] truncate block">
                            {staff.assignedArea}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <VFBadge
                            variant={staff.verification === 'Verified' ? 'success' : 'warning'}
                            className="text-xs px-2 py-0.5 rounded-[3px] inline-flex items-center gap-1"
                          >
                            <ShieldCheck className="h-3 w-3" />
                            {staff.verification}
                          </VFBadge>
                        </td>
                        <td className="py-3 px-4">
                          <VFBadge
                            variant={
                              staff.status === 'On Duty'
                                ? 'success'
                                : staff.status === 'On Leave'
                                ? 'danger'
                                : 'outline'
                            }
                            className="text-xs px-2 py-0.5 rounded-[3px]"
                          >
                            {staff.status}
                          </VFBadge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedStaff(staff)}
                            className="px-3 py-1.5 rounded-[3px] bg-[#1c1c1c] hover:bg-[#252525] border border-border/80 text-xs font-bold text-foreground transition-colors cursor-pointer"
                          >
                            {isHindi ? 'प्रोफाइल' : 'Profile'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 2: SHIFT COVERAGE & DUTY MATRIX
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'shifts' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-[4px] border border-border/80 bg-card space-y-1">
              <span className="text-xs text-muted-foreground font-semibold">Total Non-Teaching Staff</span>
              <p className="text-xl font-bold font-mono text-foreground">{staffList.length}</p>
              <span className="text-xs text-muted-foreground">Excludes instructional faculty</span>
            </div>
            <div className="p-3.5 rounded-[4px] border border-border/80 bg-card space-y-1">
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Active On Duty Today
              </span>
              <p className="text-xl font-bold font-mono text-emerald-400">{onDutyCount}</p>
              <span className="text-xs text-muted-foreground">94.5% planned shift attendance</span>
            </div>
            <div className="p-3.5 rounded-[4px] border border-border/80 bg-card space-y-1">
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                On Approved Leave
              </span>
              <p className="text-xl font-bold font-mono text-amber-400">{onLeaveCount}</p>
              <span className="text-xs text-muted-foreground">Replacement roster deployed</span>
            </div>
            <div className="p-3.5 rounded-[4px] border border-border/80 bg-card space-y-1">
              <span className="text-xs text-primary font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Police & Aadhaar Verified
              </span>
              <p className="text-xl font-bold font-mono text-primary">{verifiedCount} / {staffList.length}</p>
              <span className="text-xs text-muted-foreground">100% background checks clear</span>
            </div>
          </div>

          {/* Department Coverage Matrix */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3.5 bg-[#141414] border-b border-border/80 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {isHindi ? 'विभागवार ड्यूटी व कवरेज रिपोर्ट' : 'Departmental Deployment & Coverage Overview'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isHindi ? 'परिवहन, सुरक्षा, स्वच्छता व मेस की सक्रिय दैनिक उपस्थिति' : 'Real-time ground coverage for transport, security, housekeeping and hostel dining'}
                </p>
              </div>
              <VFBadge variant="success" className="font-mono text-xs px-2.5 py-1 rounded-[3px]">
                All Posts Manned
              </VFBadge>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-[3px] bg-[#161616] border border-border/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-primary" />
                    Transport Operations
                  </span>
                  <VFBadge variant="success" className="text-xs px-2 py-0.5 rounded-[3px]">100% Covered</VFBadge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All morning student bus routes manned by certified heavy drivers and verified conductors.
                </p>
                <div className="text-xs font-mono text-muted-foreground pt-2.5 border-t border-border/50 flex justify-between">
                  <span>Drivers On-Duty:</span>
                  <strong className="text-foreground">14 Active</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-[3px] bg-[#161616] border border-border/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Campus Security & Gate
                  </span>
                  <VFBadge variant="success" className="text-xs px-2 py-0.5 rounded-[3px]">4/4 Gates Active</VFBadge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Main Gate, Visitor Reception, Bus Bay and Hostel Perimeter security guards on position.
                </p>
                <div className="text-xs font-mono text-muted-foreground pt-2.5 border-t border-border/50 flex justify-between">
                  <span>Guards On-Duty:</span>
                  <strong className="text-foreground">8 Active / 2 Standby</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-[3px] bg-[#161616] border border-border/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    Housekeeping & Sanitation
                  </span>
                  <VFBadge variant="success" className="text-xs px-2 py-0.5 rounded-[3px]">Optimal</VFBadge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pre-assembly sanitization complete across Blocks A, B, and Primary school corridors.
                </p>
                <div className="text-xs font-mono text-muted-foreground pt-2.5 border-t border-border/50 flex justify-between">
                  <span>Sanitation Staff:</span>
                  <strong className="text-foreground">16 Active</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Onboard Staff Dialog ── */}
      <VFDialog
        isOpen={isOnboardModalOpen}
        onClose={() => setIsOnboardModalOpen(false)}
        title={isHindi ? 'नया गैर-शिक्षक कर्मचारी जोड़ें' : 'Onboard Non-Teaching Staff Member'}
        description={isHindi ? 'चालक, सफाईकर्मी, सुरक्षा गार्ड या सहायक का विवरण भरें' : 'Register drivers, cleaners, security personnel, mess staff or technicians'}
        className="max-w-lg rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsOnboardModalOpen(false)}
              className="rounded-[3px]"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleOnboardSubmit}
              className="rounded-[3px]"
            >
              {isHindi ? 'कर्मचारी दर्ज करें' : 'Register Staff'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleOnboardSubmit} className="space-y-3 py-1 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'कर्मचारी का पूरा नाम' : 'Full Name'} *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Surender Rawat"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'विभाग' : 'Department'} *
              </label>
              <select
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Transport">Transport</option>
                <option value="Housekeeping">Housekeeping & Sanitation</option>
                <option value="Security">Security</option>
                <option value="Dining & Hostel">Dining & Hostel</option>
                <option value="Maintenance">Maintenance & Electrician</option>
                <option value="Administration">General Administration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'पद / भूमिका' : 'Role / Designation'} *
              </label>
              <input
                type="text"
                required
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. Senior Bus Driver"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'संपर्क मोबाइल नंबर' : 'Primary Phone'} *
              </label>
              <input
                type="tel"
                required
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+91 98112 00000"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'शिफ्ट समय' : 'Shift Timing'}
              </label>
              <select
                value={newShift}
                onChange={(e) => setNewShift(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Morning (06:00 - 14:00)">Morning (06:00 - 14:00)</option>
                <option value="General (08:30 - 17:00)">General (08:30 - 17:00)</option>
                <option value="Evening (13:00 - 21:00)">Evening (13:00 - 21:00)</option>
                <option value="Night (20:00 - 06:00)">Night (20:00 - 06:00)</option>
              </select>
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'मासिक वेतन स्तर' : 'Monthly Wage Tier'}
              </label>
              <input
                type="text"
                value={newWage}
                onChange={(e) => setNewWage(e.target.value)}
                placeholder="₹24,000"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {isHindi ? 'आवंटित वाहन / कार्य क्षेत्र' : 'Assigned Vehicle or Campus Floor Area'}
            </label>
            <input
              type="text"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              placeholder="e.g. Bus #04 (Route 2) or Academic Block B"
              className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {isHindi ? 'आपातकालीन संपर्क नंबर' : 'Emergency Contact Mobile'}
            </label>
            <input
              type="tel"
              value={newEmergencyPhone}
              onChange={(e) => setNewEmergencyPhone(e.target.value)}
              placeholder="+91 98112 11111 (Spouse / Family)"
              className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>
        </form>
      </VFDialog>

      {/* ── Staff Profile & Duty Actions Dialog ── */}
      {selectedStaff && (
        <VFDialog
          isOpen={!!selectedStaff}
          onClose={() => setSelectedStaff(null)}
          title={`${selectedStaff.name} (${selectedStaff.id})`}
          description={`${selectedStaff.role} · Department of ${selectedStaff.department}`}
          className="max-w-md rounded-[4px]"
          footerActions={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5">
                {selectedStaff.status !== 'On Duty' ? (
                  <VFButton
                    size="sm"
                    variant="success"
                    className="rounded-[3px] text-xs font-bold"
                    onClick={() => handleStatusToggle(selectedStaff.id, 'On Duty')}
                  >
                    Mark On Duty
                  </VFButton>
                ) : (
                  <VFButton
                    size="sm"
                    variant="outline"
                    className="rounded-[3px] text-xs font-bold"
                    onClick={() => handleStatusToggle(selectedStaff.id, 'On Leave')}
                  >
                    Grant Leave
                  </VFButton>
                )}
              </div>
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setSelectedStaff(null)}
                className="rounded-[3px]"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-3 py-1 text-xs">
            <div className="p-3 bg-[#161616] border border-border/80 rounded-[3px] space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground block font-semibold">Shift Timing:</span>
                  <span className="font-mono text-foreground">{selectedStaff.shift}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-semibold">Monthly Salary:</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedStaff.monthlyWage}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border/50">
                <span className="text-muted-foreground block font-semibold">Assigned Duty Post:</span>
                <span className="text-foreground font-medium">{selectedStaff.assignedArea}</span>
              </div>
            </div>

            <div className="p-3 bg-[#161616] border border-border/80 rounded-[3px] space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Institutional Verification & Documents
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
                <div>
                  <span>Aadhaar ID:</span>
                  <strong className="block text-foreground font-mono">{selectedStaff.aadhaarMasked}</strong>
                </div>
                <div>
                  <span>Police Clearance Ref:</span>
                  <strong className="block text-foreground font-mono">{selectedStaff.policeVerificationNo}</strong>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#161616] border border-border/80 rounded-[3px] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Emergency Contact
              </span>
              <p className="text-foreground text-xs flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary" />
                {selectedStaff.emergencyContact.name} ({selectedStaff.emergencyContact.relation}):{' '}
                <strong className="font-mono">{selectedStaff.emergencyContact.phone}</strong>
              </p>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
