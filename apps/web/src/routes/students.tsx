import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFBadge, VFButton, VFDataTable } from '@vidyamaxx/ui';
import { Users, User, ArrowRight, ShieldCheck, Award, Eye, FileText, Upload, Search, History, AlertOctagon } from 'lucide-react';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('directory');

  const studentData = [
    { admNo: 'ADM-2026-001', name: 'Aditya Verma', class: 'Class 9 - Sec A', roll: '101', house: 'Red House', status: 'Active Student' },
    { admNo: 'ADM-2026-002', name: 'Priya Sharma', class: 'Class 9 - Sec A', roll: '102', house: 'Blue House', status: 'Active Student' },
    { admNo: 'ADM-2026-003', name: 'Rahul Gupta', class: 'Class 9 - Sec B', roll: '103', house: 'Green House', status: 'Active Student' },
  ];

  const studentColumns = [
    { header: 'Admission No', accessorKey: 'admNo', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.admNo}</span> },
    { header: 'Student Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Class & Section', accessorKey: 'class' },
    { header: 'Roll No', accessorKey: 'roll' },
    { header: 'House', accessorKey: 'house', cell: (r: any) => <VFBadge variant="outline">{r.house}</VFBadge> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
    { header: 'Action', accessorKey: 'action', cell: () => <VFButton size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />}>View 360° Profile</VFButton> },
  ];

  const submoduleTabs = [
    {
      id: 'directory',
      label: 'Directory',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">Active Enrolled Student Master Directory</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Filter by Class, Section, House, Category, or Gender.</p>
            </div>
            <VFButton size="sm">Export Directory</VFButton>
          </div>
          <VFDataTable columns={studentColumns} data={studentData} filterPlaceholder="Search student name, roll no, or admission no..." />
        </div>
      ),
    },
    {
      id: 'profile-360',
      label: '360° Profile',
      icon: <User className="h-3.5 w-3.5" />,
      content: (
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
              <p className="text-base font-bold text-foreground mt-1">+91 98000 00000</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'lifecycle',
      label: 'Lifecycle',
      icon: <ArrowRight className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Lifecycle Pipeline State Machine">
          <div className="flex items-center justify-between text-xs font-semibold py-4 overflow-x-auto gap-2">
            {['Enquiry', 'Applicant', 'Admitted', 'Active Student', 'Promoted', 'Transferred', 'Alumni'].map((st, i) => (
              <React.Fragment key={st}>
                <div className={`px-3 py-1.5 rounded-lg border text-center whitespace-nowrap ${i === 3 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 border-border'}`}>
                  {st}
                </div>
                {i < 6 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </VFCard>
      ),
    },
    {
      id: 'allocation',
      label: 'Allocation',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Section, House & Roll Number Allocation">
          <p className="text-xs text-muted-foreground">Assign students to sections (Sec A, B, C), roll numbers, houses, and student categories (RTE / Staff Ward / General).</p>
        </VFCard>
      ),
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Identity & Academic Document Vault">
          <p className="text-xs text-muted-foreground">Birth certificates, Aadhaar / Passport copies, previous school TCs, marksheets, and medical fitness certificates.</p>
        </VFCard>
      ),
    },
    {
      id: 'bulk-data',
      label: 'Bulk Import',
      icon: <Upload className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Bulk Student Data Import & Updates">
          <p className="text-xs text-muted-foreground">Upload Excel / CSV student spreadsheets, auto-validate data fields, and perform bulk section roll number updates.</p>
        </VFCard>
      ),
    },
    {
      id: 'search-filter',
      label: 'Smart Search',
      icon: <Search className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Advanced Multi-Parametric Search Engine">
          <p className="text-xs text-muted-foreground">Filter students by blood group, bus route stop, category, guardian phone number, or academic grade percentile.</p>
        </VFCard>
      ),
    },
    {
      id: 'groups-categories',
      label: 'Houses & Clubs',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="House Allocations & Student Clubs">
          <p className="text-xs text-muted-foreground">Assign students to Red, Blue, Green, Yellow houses, sports squads, and extra-curricular clubs.</p>
        </VFCard>
      ),
    },
    {
      id: 'scholarships',
      label: 'Scholarships',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Scholarship Awards & Fee Concession Records">
          <p className="text-xs text-muted-foreground">Manage merit-based scholarships, financial aid concessions, and staff child fee exemptions.</p>
        </VFCard>
      ),
    },
    {
      id: 'timeline',
      label: 'Timeline',
      icon: <History className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Multi-Year Student Timeline & Activity Logs">
          <p className="text-xs text-muted-foreground">Chronological timeline of academic term results, attendance records, disciplinary notices, and fee receipts.</p>
        </VFCard>
      ),
    },
    {
      id: 'status-mgmt',
      label: 'Status',
      icon: <AlertOctagon className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Status Control (Active / Blocked / Archived)">
          <p className="text-xs text-muted-foreground">Manage active student enrollment, block access for TC withdrawal candidates, and archive graduated alumni profiles.</p>
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
