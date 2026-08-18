import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFCard,
  VFBadge,
  VFButton,
  VFDataTable,
  VFStatCard,
} from '@vidyamaxx/ui';
import {
  Users,
  UserCheck,
  TrendingUp,
  ArrowRight,
  Eye,
  Plus,
  Download,
  Layers,
} from 'lucide-react';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const [selectedStudent, setSelectedStudent] = React.useState<any | null>(null);

  const studentData = [
    { admNo: 'ADM-2026-001', name: 'Aditya Verma', class: 'Class 9', section: 'A', roll: '101', house: 'Red House', guardian: 'Rajesh Verma', phone: '+91 98765 43210', status: 'Active', attendance: '98.2%', gpa: '3.92' },
    { admNo: 'ADM-2026-002', name: 'Priya Sharma', class: 'Class 9', section: 'A', roll: '102', house: 'Blue House', guardian: 'Sunita Sharma', phone: '+91 98123 45678', status: 'Active', attendance: '95.4%', gpa: '3.88' },
    { admNo: 'ADM-2026-003', name: 'Rahul Gupta', class: 'Class 9', section: 'B', roll: '103', house: 'Green House', guardian: 'Vikram Gupta', phone: '+91 97654 32109', status: 'Active', attendance: '91.0%', gpa: '3.45' },
    { admNo: 'ADM-2026-004', name: 'Kavya Nair', class: 'Class 11-Com', section: 'A', roll: '201', house: 'Yellow House', guardian: 'Suresh Nair', phone: '+91 99887 76655', status: 'Active', attendance: '97.5%', gpa: '3.95' },
    { admNo: 'ADM-2026-005', name: 'Ishaan Malhotra', class: 'Class 11-Sci', section: 'B', roll: '202', house: 'Red House', guardian: 'Anil Malhotra', phone: '+91 98234 56789', status: 'Active', attendance: '94.0%', gpa: '3.70' },
  ];

  const studentColumns = [
    {
      header: 'Admission No',
      accessorKey: 'admNo',
      cell: (r: any) => <span className="font-mono font-bold text-primary text-base">{r.admNo}</span>,
    },
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-primary/15 text-primary font-bold text-sm flex items-center justify-center shrink-0">
            {r.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="font-extrabold text-foreground text-base">{r.name}</span>
        </div>
      ),
    },
    {
      header: 'Class & Section',
      accessorKey: 'class',
      cell: (r: any) => <span className="text-foreground font-bold text-base">{r.class} · Sec {r.section}</span>,
    },
    {
      header: 'Roll No',
      accessorKey: 'roll',
      cell: (r: any) => <span className="font-bold text-foreground text-base">{r.roll}</span>,
    },
    {
      header: 'House',
      accessorKey: 'house',
      cell: (r: any) => <VFBadge variant="outline">{r.house}</VFBadge>,
    },
    {
      header: 'Guardian Phone',
      accessorKey: 'phone',
      cell: (r: any) => <span className="text-muted-foreground font-mono text-base font-semibold">{r.phone}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: (r: any) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-4 w-4" />}
          onClick={() => setSelectedStudent(r)}
        >
          View Profile
        </VFButton>
      ),
    },
  ];

  // 1. Directory View
  const directoryContent = (
    <div className="space-y-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Total Enrolled"
          value="1,248"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel="+42 this term"
        />
        <VFStatCard
          title="Regular Attendance"
          value="96.9%"
          icon={<UserCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="1,210 Active"
        />
        <VFStatCard
          title="Pending Transfers"
          value="14"
          icon={<ArrowRight className="h-5 w-5" />}
          trend="neutral"
          trendLabel="TC in process"
        />
        <VFStatCard
          title="Academic Average"
          value="94.8%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="Above target"
        />
      </div>

      {/* Selected Student Profile */}
      {selectedStudent && (
        <div className="p-5 bg-card border border-primary/40 rounded-lg shadow-sm animate-fade-in space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/15 text-primary font-black flex items-center justify-center text-base shrink-0">
                {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground">{selectedStudent.name}</h3>
                <p className="text-sm text-muted-foreground font-semibold">{selectedStudent.admNo} · {selectedStudent.class} (Sec {selectedStudent.section})</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <VFBadge variant="success">Active Student</VFBadge>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-sm text-muted-foreground hover:text-foreground font-bold px-2.5 py-1 rounded-md hover:bg-muted cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Attendance Rate</p>
              <p className="text-xl font-black text-success mt-0.5">{selectedStudent.attendance}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GPA / Rank</p>
              <p className="text-xl font-black text-primary mt-0.5">{selectedStudent.gpa} (Top 5%)</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Guardian Contact</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedStudent.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Assigned House</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedStudent.house}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Table Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Enrolled Students Master Roster</h2>
            <p className="text-sm text-muted-foreground font-medium">Manage and view 360° academic and attendance records</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Roster
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Add Student
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={studentColumns}
          data={studentData}
          filterPlaceholder="Search by student name, roll number, or admission ID..."
        />
      </div>
    </div>
  );

  // 2. Demographics View
  const demographicsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Gender Distribution" description="Current student population balance">
          <div className="space-y-2 mt-1">
            <p className="text-2xl font-black text-foreground">640 Boys / 608 Girls</p>
            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden flex">
              <div className="h-full bg-primary w-[51.2%]" />
              <div className="h-full bg-secondary w-[48.8%]" />
            </div>
            <p className="text-sm font-bold text-muted-foreground">51.2% Male · 48.8% Female</p>
          </div>
        </VFCard>

        <VFCard title="Quota & Reserved Seats" description="Compliance with RTE standards">
          <div className="space-y-2 mt-1">
            <p className="text-2xl font-black text-foreground">186 Students</p>
            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success w-[75%]" />
            </div>
            <p className="text-sm font-bold text-muted-foreground">15% RTE Quota fully compliant</p>
          </div>
        </VFCard>

        <VFCard title="House Allocations" description="Four competitive student squads">
          <div className="space-y-2 mt-1">
            <p className="text-2xl font-black text-foreground">4 Houses</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/25">Red: 312</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/25">Blue: 310</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/25">Green: 314</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25">Yellow: 312</span>
            </div>
          </div>
        </VFCard>
      </div>

      <VFCard title="Class-Wise Enrollment Breakdown">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-base">
          {[
            { grade: 'Class 9', total: '320 Students', sections: '4 Sections' },
            { grade: 'Class 10', total: '310 Students', sections: '4 Sections' },
            { grade: 'Class 11', total: '308 Students', sections: '4 Sections' },
            { grade: 'Class 12', total: '310 Students', sections: '4 Sections' },
          ].map((c, i) => (
            <div key={i} className="border-b border-border pb-2 space-y-1">
              <p className="font-black text-foreground text-base">{c.grade}</p>
              <p className="text-muted-foreground font-bold text-sm">{c.total}</p>
              <VFBadge variant="outline" className="mt-0.5">{c.sections}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // 3. Transfers & Promotion View
  const operationsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Transfer Certificate (TC) Requests" description="Outgoing student migration">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">14 Pending</p>
            <p className="text-sm text-muted-foreground font-medium">8 Verified by Principal · 6 in Review</p>
            <VFButton size="sm" variant="outline" className="w-full">
              Process TC Applications
            </VFButton>
          </div>
        </VFCard>

        <VFCard title="Annual Batch Promotion" description="Next academic session setup">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">Term 2 Ready</p>
            <p className="text-sm text-muted-foreground font-medium">Automated criteria check configured</p>
            <VFButton size="sm" className="w-full">
              Run Promotion Check
            </VFButton>
          </div>
        </VFCard>

        <VFCard title="ID Card Issuance" description="Smart RFID student identity cards">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">1,248 Active</p>
            <p className="text-sm text-muted-foreground font-medium">0 Defective badges reported</p>
            <VFButton size="sm" variant="outline" className="w-full">
              Batch Print ID Cards
            </VFButton>
          </div>
        </VFCard>
      </div>
    </div>
  );

  const tabs = [
    { id: 'directory', label: 'Student Directory', icon: <Users className="h-4 w-4" />, content: directoryContent },
    { id: 'demographics', label: 'Demographics & Distribution', icon: <Layers className="h-4 w-4" />, content: demographicsContent },
    { id: 'transfers', label: 'Transfers & Batch Ops', icon: <ArrowRight className="h-4 w-4" />, content: operationsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="directory" variant="top-bar" />
    </VFPageContainer>
  );
}
