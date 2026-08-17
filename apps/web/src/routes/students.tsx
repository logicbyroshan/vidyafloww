import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFCard,
  VFBadge,
  VFButton,
  VFDataTable,
  VFStatCard,
  VFInput,
  VFSelect,
} from '@vidyamaxx/ui';
import {
  Users,
  User,
  ArrowRight,
  Eye,
  Upload,
  Search,
  History,
  CreditCard,
  TrendingUp,
  UserCheck,
  UserX,
  RefreshCw,
  Copy,
  SlidersHorizontal,
  HelpCircle,
  BarChart3,
  Phone,
} from 'lucide-react';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('dashboard');

  const studentData = [
    { admNo: 'ADM-2026-001', name: 'Aditya Verma', class: 'Class 9', section: 'A', roll: '101', house: 'Red House', guardian: 'Rajesh Verma', phone: '+91 98765 43210', status: 'Active' },
    { admNo: 'ADM-2026-002', name: 'Priya Sharma', class: 'Class 9', section: 'A', roll: '102', house: 'Blue House', guardian: 'Sunita Sharma', phone: '+91 98123 45678', status: 'Active' },
    { admNo: 'ADM-2026-003', name: 'Rahul Gupta', class: 'Class 9', section: 'B', roll: '103', house: 'Green House', guardian: 'Vikram Gupta', phone: '+91 97654 32109', status: 'Active' },
    { admNo: 'ADM-2026-004', name: 'Kavya Nair', class: 'Class 11-Com', section: 'A', roll: '201', house: 'Yellow House', guardian: 'Suresh Nair', phone: '+91 99887 76655', status: 'Active' },
    { admNo: 'ADM-2026-005', name: 'Ishaan Malhotra', class: 'Class 11-Sci', section: 'B', roll: '202', house: 'Red House', guardian: 'Anil Malhotra', phone: '+91 98234 56789', status: 'Active' },
  ];

  const studentColumns = [
    { header: 'Admission No', accessorKey: 'admNo', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.admNo}</span> },
    { header: 'Student Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Class & Section', accessorKey: 'class', cell: (r: any) => <span>{r.class} - Sec {r.section}</span> },
    { header: 'Roll No', accessorKey: 'roll' },
    { header: 'House', accessorKey: 'house', cell: (r: any) => <VFBadge variant="outline">{r.house}</VFBadge> },
    { header: 'Guardian Phone', accessorKey: 'phone' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
    { header: 'Action', accessorKey: 'action', cell: () => <VFButton size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />}>360° Profile</VFButton> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Student Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Enrolled Students" value="1,248" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="+42 this term" />
        <VFStatCard title="Active Regular Students" value="1,210" icon={<UserCheck className="h-5 w-5" />} trend="up" trendLabel="96.9% Active" />
        <VFStatCard title="Pending Transfers (TC)" value="14" icon={<ArrowRight className="h-5 w-5" />} trend="neutral" trendLabel="In Process" />
        <VFStatCard title="Average Class Attendance" value="94.8%" icon={<TrendingUp className="h-5 w-5" />} trend="up" trendLabel="Above Target" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Gender Distribution">
          <p className="text-2xl font-black text-foreground mt-2">640 Boys / 608 Girls</p>
          <p className="text-xs text-success font-semibold mt-1">51.2% M · 48.8% F</p>
        </VFCard>
        <VFCard title="RTE & Reserved Quota">
          <p className="text-2xl font-black text-foreground mt-2">186 Reserved Students</p>
          <p className="text-xs text-muted-foreground mt-1">15% RTE Quota Compliant</p>
        </VFCard>
        <VFCard title="House Allocations">
          <p className="text-2xl font-black text-foreground mt-2">4 House Squads</p>
          <p className="text-xs text-primary font-semibold mt-1">Red, Blue, Green, Yellow</p>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — All Students
  // ----------------------------------------------------
  const allStudentsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Active Enrolled Student Master Directory</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Filter by Class, Section, House, Category, or Gender.</p>
        </div>
        <VFButton size="sm">Export Master Roster</VFButton>
      </div>
      <VFDataTable columns={studentColumns} data={studentData} filterPlaceholder="Search student name, roll no, or admission no..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Student Profiles
  // ----------------------------------------------------
  const profilesContent = (
    <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary font-black flex items-center justify-center text-lg">
            AV
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Aditya Verma (ADM-2026-001)</h3>
            <p className="text-xs text-muted-foreground">Class 9 - Sec A · Roll No: 101 · House: Red House</p>
          </div>
        </div>
        <VFBadge variant="success">Active Enrolled Student</VFBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
          <span className="text-muted-foreground">Attendance Rate</span>
          <p className="text-base font-bold text-success mt-1">98.2%</p>
        </div>
        <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
          <span className="text-muted-foreground">Current GPA / Rank</span>
          <p className="text-base font-bold text-primary mt-1">3.92 (Rank 3)</p>
        </div>
        <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
          <span className="text-muted-foreground">Fee Clearance</span>
          <p className="text-base font-bold text-foreground mt-1">Cleared (Term 1)</p>
        </div>
        <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
          <span className="text-muted-foreground">Guardian Contact</span>
          <p className="text-base font-bold text-foreground mt-1">+91 98765 43210</p>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Parent & Guardian Records
  // ----------------------------------------------------
  const guardiansContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Primary Guardian Contacts">
          <span className="text-2xl font-black text-foreground mt-2 block">1,248 Records</span>
          <p className="text-xs text-muted-foreground mt-1">100% Parent Phone & Email Verified</p>
        </VFCard>
        <VFCard title="Emergency Contacts">
          <span className="text-2xl font-black text-success mt-2 block">1,210 Configured</span>
          <p className="text-xs text-muted-foreground mt-1">Secondary phone & relationship linked</p>
        </VFCard>
        <VFCard title="Parent Portal Logins">
          <span className="text-2xl font-black text-primary mt-2 block">1,180 Active</span>
          <p className="text-xs text-muted-foreground mt-1">94.5% Adoption Rate</p>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Class & Section
  // ----------------------------------------------------
  const classSectionContent = (
    <div className="space-y-4">
      <VFCard title="Class & Section Allocation Matrix">
        <p className="text-xs text-muted-foreground mb-3">Manage student section allocations, roll number assignments, and class teacher mappings.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {['Class 9 - Sec A (40 Students)', 'Class 9 - Sec B (38 Students)', 'Class 11 - Sci Sec A (42 Students)', 'Class 11 - Com Sec A (36 Students)'].map((c, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <span className="font-bold text-foreground">{c}</span>
              <VFButton size="sm" variant="outline">Manage</VFButton>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Student ID & Identity
  // ----------------------------------------------------
  const idCardsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Student Smart ID Cards">
          <span className="text-2xl font-black text-primary mt-2 block">1,248 Issued</span>
          <p className="text-xs text-muted-foreground mt-1">RFID & QR Code Embedded</p>
        </VFCard>
        <VFCard title="Pending Re-issues">
          <span className="text-2xl font-black text-warning mt-2 block">8 Requests</span>
          <p className="text-xs text-muted-foreground mt-1">Lost Card Replacement Queue</p>
        </VFCard>
        <VFCard title="Biometric Sync">
          <span className="text-2xl font-black text-success mt-2 block">Synced Live</span>
          <p className="text-xs text-muted-foreground mt-1">Gate Turnstile Sync Active</p>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Student Status
  // ----------------------------------------------------
  const statusContent = (
    <div className="space-y-4">
      <VFCard title="Student Status Control (Active / Suspended / Archived)">
        <p className="text-xs text-muted-foreground mb-3">Manage enrollment states, long leave approvals, suspension logs, and alumni status.</p>
        <div className="space-y-2 text-xs">
          {[
            { student: 'Aditya Verma', admNo: 'ADM-001', status: 'Active Regular', reason: 'Enrolled' },
            { student: 'Ishaan Malhotra', admNo: 'ADM-005', status: 'Medical Leave', reason: 'Approved Leave till Aug 20' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border/60">
              <div>
                <span className="font-bold text-foreground">{item.student} ({item.admNo})</span>
                <p className="text-muted-foreground text-xs mt-0.5">Reason: {item.reason}</p>
              </div>
              <VFBadge variant="success">{item.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Promotion
  // ----------------------------------------------------
  const promotionContent = (
    <div className="space-y-4">
      <VFCard title="Annual Class Promotion Engine">
        <p className="text-xs text-muted-foreground mb-3">Batch promote students to the next academic session based on exam result thresholds.</p>
        <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground">Target Session:</span>
            <span className="font-mono font-bold text-primary">Academic Session 2027-28</span>
          </div>
          <div className="flex gap-2">
            <VFButton size="sm" leftIcon={<ArrowRight className="h-3.5 w-3.5" />}>Execute Batch Promotion</VFButton>
            <VFButton size="sm" variant="outline">Preview Detention List</VFButton>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Transfer
  // ----------------------------------------------------
  const transferContent = (
    <div className="space-y-4">
      <VFCard title="Transfer Certificate (TC) Issuance & Verification">
        <p className="text-xs text-muted-foreground mb-3">Issue official Transfer Certificates with digital signatures, dues clearance, and QR verification.</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border/60">
            <div>
              <span className="font-bold text-foreground">Rohan Gupta (ADM-2026-003)</span>
              <p className="text-muted-foreground text-xs mt-0.5">Reason: Guardian Relocation · Dues Cleared</p>
            </div>
            <VFButton size="sm">Generate TC PDF</VFButton>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Withdrawal
  // ----------------------------------------------------
  const withdrawalContent = (
    <div className="space-y-4">
      <VFCard title="Student Withdrawal & Cancellation Register">
        <p className="text-xs text-muted-foreground mb-3">Process parent withdrawal applications, fee refund calculations, and security deposit returns.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Re-admission
  // ----------------------------------------------------
  const readmissionContent = (
    <div className="space-y-4">
      <VFCard title="Student Re-admission & Re-activation Module">
        <p className="text-xs text-muted-foreground mb-3">Re-admit former students with restored academic history, old scholar ID, and fee status.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Student History
  // ----------------------------------------------------
  const historyContent = (
    <div className="space-y-4">
      <VFCard title="Multi-Year Student Timeline & Audit Logs">
        <p className="text-xs text-muted-foreground mb-3">Complete chronological history of academic report cards, attendance records, and disciplinary notices.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Bulk Student Operations
  // ----------------------------------------------------
  const bulkOpsContent = (
    <div className="space-y-4">
      <VFCard title="Bulk Student Operations & Section Re-allocations">
        <p className="text-xs text-muted-foreground mb-3">Perform bulk house assignments, roll number re-sequencing, and mass notifications.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Import & Export
  // ----------------------------------------------------
  const importExportContent = (
    <div className="space-y-4">
      <VFCard title="Bulk Student Data Import & Spreadsheet Export">
        <p className="text-xs text-muted-foreground mb-3">Upload Excel/CSV student rosters with field mapping and validation preview.</p>
        <div className="flex gap-2">
          <VFButton size="sm" leftIcon={<Upload className="h-3.5 w-3.5" />}>Import Excel File</VFButton>
          <VFButton size="sm" variant="outline">Download Sample CSV Template</VFButton>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Duplicate Management
  // ----------------------------------------------------
  const duplicatesContent = (
    <div className="space-y-4">
      <VFCard title="Duplicate Student Record Detection & Merge Engine">
        <p className="text-xs text-muted-foreground mb-3">System algorithm scans Aadhaar, phone, and name similarities to resolve duplicate records.</p>
        <VFBadge variant="success">0 Duplicate Conflicts Detected</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Student Search
  // ----------------------------------------------------
  const searchContent = (
    <div className="space-y-4">
      <VFCard title="Advanced Multi-Parametric Student Search Engine">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
          <VFInput label="Search Keyword" placeholder="Name, Roll No, Aadhaar, Phone..." />
          <VFSelect label="Filter Class" options={[{ label: 'All Classes', value: 'all' }, { label: 'Class 9', value: '9' }]} />
          <VFSelect label="Filter House" options={[{ label: 'All Houses', value: 'all' }, { label: 'Red House', value: 'red' }]} />
        </div>
        <VFButton size="sm" leftIcon={<Search className="h-3.5 w-3.5" />}>Search Students</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — Student Requests
  // ----------------------------------------------------
  const requestsContent = (
    <div className="space-y-4">
      <VFCard title="Parent & Student Service Requests Inbox">
        <p className="text-xs text-muted-foreground mb-3">Process requests for Bonafide Certificates, Bus Route Changes, ID card replacements, and address updates.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 18 — Student Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Student Lifecycle & Allocation Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Auto Scholar ID Prefix" defaultValue="ADM-2026-" />
          <VFSelect label="Default House Allocation Strategy" options={[{ label: 'Balanced Auto Distribution', value: 'auto' }, { label: 'Manual Assign', value: 'manual' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 18 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Student Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'all-students', label: 'All Students', icon: <Users className="h-3.5 w-3.5" />, content: allStudentsContent },
    { id: 'profiles', label: 'Student Profiles', icon: <User className="h-3.5 w-3.5" />, content: profilesContent },
    { id: 'guardians', label: 'Parent & Guardian Records', icon: <Phone className="h-3.5 w-3.5" />, content: guardiansContent },
    { id: 'class-section', label: 'Class & Section', icon: <Users className="h-3.5 w-3.5" />, content: classSectionContent },
    { id: 'id-cards', label: 'Student ID & Identity', icon: <CreditCard className="h-3.5 w-3.5" />, content: idCardsContent },
    { id: 'status', label: 'Student Status', icon: <UserCheck className="h-3.5 w-3.5" />, content: statusContent },
    { id: 'promotion', label: 'Promotion', icon: <ArrowRight className="h-3.5 w-3.5" />, content: promotionContent },
    { id: 'transfer', label: 'Transfer', icon: <ArrowRight className="h-3.5 w-3.5" />, content: transferContent },
    { id: 'withdrawal', label: 'Withdrawal', icon: <UserX className="h-3.5 w-3.5" />, content: withdrawalContent },
    { id: 'readmission', label: 'Re-admission', icon: <RefreshCw className="h-3.5 w-3.5" />, content: readmissionContent },
    { id: 'history', label: 'Student History', icon: <History className="h-3.5 w-3.5" />, content: historyContent },
    { id: 'bulk-operations', label: 'Bulk Student Operations', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: bulkOpsContent },
    { id: 'import-export', label: 'Import & Export', icon: <Upload className="h-3.5 w-3.5" />, content: importExportContent },
    { id: 'duplicates', label: 'Duplicate Management', icon: <Copy className="h-3.5 w-3.5" />, content: duplicatesContent },
    { id: 'search', label: 'Student Search', icon: <Search className="h-3.5 w-3.5" />, content: searchContent },
    { id: 'requests', label: 'Student Requests', icon: <HelpCircle className="h-3.5 w-3.5" />, content: requestsContent },
    { id: 'settings', label: 'Student Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
