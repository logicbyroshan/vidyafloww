import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFBadge,
  VFButton,
  VFDataTable,
  VFStatCard,
  cn,
} from '@vidyamaxx/ui';
import {
  Users,
  UserCheck,
  TrendingUp,
  ArrowRight,
  Eye,
  Plus,
  Download,
  Calendar,
  GraduationCap,
  FileCheck2,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const { activeSession, setActiveSession, academicSessions } = useGlobalStore();
  const [selectedStudent, setSelectedStudent] = React.useState<any | null>(null);
  const [selectedClassFilter, setSelectedClassFilter] = React.useState<string>('all');

  // Enrolled active students dataset (Session-aware)
  const allStudentsBySession: Record<string, any[]> = {
    '2026–2027': [
      { admNo: 'ADM-2026-001', name: 'Aditya Verma', class: 'Class 9', section: 'A', roll: '101', house: 'Red House', guardian: 'Rajesh Verma', phone: '+91 98765 43210', status: 'Active', attendance: '98.2%', gpa: '3.92', session: '2026–2027' },
      { admNo: 'ADM-2026-002', name: 'Priya Sharma', class: 'Class 9', section: 'A', roll: '102', house: 'Blue House', guardian: 'Sunita Sharma', phone: '+91 98123 45678', status: 'Active', attendance: '95.4%', gpa: '3.88', session: '2026–2027' },
      { admNo: 'ADM-2026-003', name: 'Rahul Gupta', class: 'Class 9', section: 'B', roll: '103', house: 'Green House', guardian: 'Vikram Gupta', phone: '+91 97654 32109', status: 'Active', attendance: '91.0%', gpa: '3.45', session: '2026–2027' },
      { admNo: 'ADM-2026-004', name: 'Kavya Nair', class: 'Class 11-Com', section: 'A', roll: '201', house: 'Yellow House', guardian: 'Suresh Nair', phone: '+91 99887 76655', status: 'Active', attendance: '97.5%', gpa: '3.95', session: '2026–2027' },
      { admNo: 'ADM-2026-005', name: 'Ishaan Malhotra', class: 'Class 11-Sci', section: 'B', roll: '202', house: 'Red House', guardian: 'Anil Malhotra', phone: '+91 98234 56789', status: 'Active', attendance: '94.0%', gpa: '3.70', session: '2026–2027' },
      { admNo: 'ADM-2026-006', name: 'Sneha Rao', class: 'Class 10', section: 'A', roll: '108', house: 'Blue House', guardian: 'Mahesh Rao', phone: '+91 97711 22334', status: 'Active', attendance: '96.2%', gpa: '3.81', session: '2026–2027' },
      { admNo: 'ADM-2026-007', name: 'Vikram Mehta', class: 'Class 12-Com', section: 'A', roll: '304', house: 'Green House', guardian: 'Deepak Mehta', phone: '+91 98345 67890', status: 'Active', attendance: '92.8%', gpa: '3.62', session: '2026–2027' },
      { admNo: 'ADM-2026-008', name: 'Ananya Deshmukh', class: 'Class 12-Sci', section: 'A', roll: '305', house: 'Yellow House', guardian: 'Sanjay Deshmukh', phone: '+91 98456 78901', status: 'Active', attendance: '99.1%', gpa: '3.98', session: '2026–2027' },
    ],
    '2025–2026': [
      { admNo: 'ADM-2025-012', name: 'Rohan Sen', class: 'Class 10', section: 'A', roll: '112', house: 'Red House', guardian: 'Arun Sen', phone: '+91 98111 22233', status: 'Archived', attendance: '94.5%', gpa: '3.75', session: '2025–2026' },
      { admNo: 'ADM-2025-045', name: 'Tanvi Joshi', class: 'Class 11-Com', section: 'B', roll: '215', house: 'Blue House', guardian: 'Vikas Joshi', phone: '+91 98222 33344', status: 'Archived', attendance: '96.0%', gpa: '3.89', session: '2025–2026' },
      { admNo: 'ADM-2025-078', name: 'Karan Singhal', class: 'Class 12-Sci', section: 'A', roll: '310', house: 'Green House', guardian: 'Rajesh Singhal', phone: '+91 98333 44455', status: 'Archived', attendance: '93.2%', gpa: '3.65', session: '2025–2026' },
    ],
    '2024–2025': [
      { admNo: 'ADM-2024-009', name: 'Meera Iyer', class: 'Class 12-Hum', section: 'A', roll: '301', house: 'Yellow House', guardian: 'K. Iyer', phone: '+91 98444 55566', status: 'Archived', attendance: '95.8%', gpa: '3.91', session: '2024–2025' },
      { admNo: 'ADM-2024-034', name: 'Devendra Chouhan', class: 'Class 12-Sci', section: 'B', roll: '318', house: 'Red House', guardian: 'N. Chouhan', phone: '+91 98555 66677', status: 'Archived', attendance: '91.4%', gpa: '3.50', session: '2024–2025' },
    ],
  };

  // TC & Alumni / Passed out dataset (Session-aware)
  const tcAndAlumniDataBySession: Record<string, any[]> = {
    '2026–2027': [
      { tcNo: 'TC-2026-089', admNo: 'ADM-2025-104', name: 'Simran Kaur', type: 'Transfer Certificate (TC)', previousClass: 'Class 10-B', destination: 'DPS International, Noida (Parent Relocation)', issueDate: '12 Aug 2026', status: 'TC Issued', tcReason: 'Parent Transfer', conduct: 'Exemplary' },
      { tcNo: 'TC-2026-090', admNo: 'ADM-2024-055', name: 'Harshit Saxena', type: 'Transfer Certificate (TC)', previousClass: 'Class 11-Sci', destination: 'The Heritage School, Gurgaon', issueDate: '18 Aug 2026', status: 'TC Issued', tcReason: 'Board Stream Shift', conduct: 'Good' },
      { tcNo: 'TC-2026-091', admNo: 'ADM-2025-212', name: 'Divya Khurana', type: 'Transfer Certificate (TC)', previousClass: 'Class 8-A', destination: 'Army Public School, Pune', issueDate: '19 Aug 2026', status: 'Principal Review', tcReason: 'Defense Posting', conduct: 'Excellent' },
      { tcNo: 'ALUM-2026-001', admNo: 'ADM-2022-014', name: 'Aarav Pillai', type: 'Passed Out (Alumni)', previousClass: 'Class 12-Sci (2026 Batch)', destination: 'IIT Bombay · B.Tech CSE', issueDate: '30 May 2026', status: 'Passed Out', tcReason: 'CBSE Board Clearance (97.4%)', conduct: 'Distinction' },
      { tcNo: 'ALUM-2026-002', admNo: 'ADM-2022-088', name: 'Neha Bhattacharya', type: 'Passed Out (Alumni)', previousClass: 'Class 12-Com (2026 Batch)', destination: 'SRCC Delhi · B.Com (Hons)', issueDate: '30 May 2026', status: 'Passed Out', tcReason: 'CBSE Board Clearance (98.2%)', conduct: 'Distinction' },
      { tcNo: 'ALUM-2026-003', admNo: 'ADM-2022-105', name: 'Riddhima Kapoor', type: 'Passed Out (Alumni)', previousClass: 'Class 12-Hum (2026 Batch)', destination: 'St. Stephen’s College · BA Economics', issueDate: '30 May 2026', status: 'Passed Out', tcReason: 'CBSE Board Clearance (96.8%)', conduct: 'Distinction' },
    ],
    '2025–2026': [
      { tcNo: 'ALUM-2025-014', admNo: 'ADM-2021-002', name: 'Siddharth Roy', type: 'Passed Out (Alumni)', previousClass: 'Class 12-Sci (2025 Batch)', destination: 'BITS Pilani', issueDate: '28 May 2025', status: 'Passed Out', tcReason: 'CBSE Board Clearance (95.6%)', conduct: 'Distinction' },
      { tcNo: 'TC-2025-044', admNo: 'ADM-2023-087', name: 'Manav Chawla', type: 'Transfer Certificate (TC)', previousClass: 'Class 9-A', destination: 'Modern School, Barakhamba', issueDate: '15 Oct 2025', status: 'TC Issued', tcReason: 'Residential Change', conduct: 'Good' },
    ],
    '2024–2025': [
      { tcNo: 'ALUM-2024-008', admNo: 'ADM-2020-001', name: 'Varun Grover', type: 'Passed Out (Alumni)', previousClass: 'Class 12-Sci (2024 Batch)', destination: 'AIIMS New Delhi', issueDate: '25 May 2024', status: 'Passed Out', tcReason: 'CBSE Board Clearance (99.0%)', conduct: 'Distinction' },
    ],
  };

  const currentEnrolledList = (allStudentsBySession[activeSession] || allStudentsBySession['2026–2027']).filter(
    (s) => selectedClassFilter === 'all' || s.class.includes(selectedClassFilter)
  );

  const currentTcAndAlumniList = tcAndAlumniDataBySession[activeSession] || tcAndAlumniDataBySession['2026–2027'];

  // Table Columns for Tab 1: Enrolled Students
  const enrolledStudentColumns = [
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
          <div className="h-8 w-8 rounded-lg bg-primary/15 text-primary font-bold text-sm flex items-center justify-center shrink-0 border border-primary/20">
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
      cell: (r: any) => (
        <VFBadge variant={r.status === 'Active' ? 'success' : 'outline'}>
          {r.status}
        </VFBadge>
      ),
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

  // Table Columns for Tab 2: TC & Passed Out / Alumni
  const tcAndAlumniColumns = [
    {
      header: 'Record / TC No',
      accessorKey: 'tcNo',
      cell: (r: any) => (
        <div className="flex flex-col">
          <span className="font-mono font-bold text-amber-400 text-sm">{r.tcNo}</span>
          <span className="font-mono text-xs text-muted-foreground">{r.admNo}</span>
        </div>
      ),
    },
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-amber-500/15 text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
            {r.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-foreground text-base">{r.name}</span>
            <span className="text-xs text-muted-foreground font-semibold">{r.previousClass}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category Type',
      accessorKey: 'type',
      cell: (r: any) => (
        <span className={cn(
          "text-xs font-bold px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5",
          r.type.includes('Passed Out')
            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            : "bg-amber-500/15 text-amber-400 border-amber-500/30"
        )}>
          {r.type.includes('Passed Out') ? <GraduationCap className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
          {r.type}
        </span>
      ),
    },
    {
      header: 'Reason / Board Standing',
      accessorKey: 'tcReason',
      cell: (r: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground truncate max-w-[220px]">{r.tcReason}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[220px]">{r.destination}</span>
        </div>
      ),
    },
    {
      header: 'Issue / Release Date',
      accessorKey: 'issueDate',
      cell: (r: any) => <span className="font-mono text-sm font-semibold text-muted-foreground">{r.issueDate}</span>,
    },
    {
      header: 'Verification Status',
      accessorKey: 'status',
      cell: (r: any) => (
        <VFBadge variant={r.status === 'Passed Out' || r.status === 'TC Issued' ? 'success' : 'warning'}>
          {r.status}
        </VFBadge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: (r: any) => (
        <div className="flex items-center gap-2">
          <VFButton
            size="sm"
            variant="outline"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() => alert(`Downloading official Certificate for ${r.name} (${r.tcNo})`)}
          >
            Certificate
          </VFButton>
        </div>
      ),
    },
  ];

  // ─── TAB 1 CONTENT: ENROLLED STUDENTS MASTER ROSTER ───────────────────────────
  const enrolledStudentsContent = (
    <div className="space-y-6">
      {/* Session Banner with Quick Switcher */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-card to-card border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 border border-primary/30">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-foreground">
                Active Session Roster: <span className="text-primary">{activeSession}</span>
              </h3>
              <VFBadge variant={activeSession === '2026–2027' ? 'success' : 'outline'}>
                {activeSession === '2026–2027' ? 'Current Academic Term' : 'Historical Archive'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
              Showing active enrolled students registered in academic session {activeSession}
            </p>
          </div>
        </div>

        {/* Quick Session Switch Buttons */}
        <div className="flex items-center gap-2 shrink-0 bg-background/60 p-1 rounded-xl border border-border">
          <span className="text-xs font-bold text-muted-foreground px-2">Switch Session:</span>
          {academicSessions.map((session) => (
            <button
              key={session}
              onClick={() => setActiveSession(session)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                activeSession === session
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {session}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats for Enrolled Students */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total Enrolled"
          value={activeSession === '2026–2027' ? "1,248" : "1,180"}
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel={`Session ${activeSession}`}
          accentColor="blue"
        />
        <VFStatCard
          title="Regular Attendance"
          value="96.9%"
          icon={<UserCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="1,210 Active"
          accentColor="blue"
        />
        <VFStatCard
          title="Active Class Divisions"
          value="16 Sections"
          icon={<FileText className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Classes 9 to 12"
          accentColor="blue"
        />
        <VFStatCard
          title="Academic Average"
          value="94.8%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="Term 1 Benchmark"
          accentColor="blue"
        />
      </div>

      {/* Selected Student Profile Drawer/Card */}
      {selectedStudent && (
        <div className="p-5 bg-card border border-primary/40 rounded-xl shadow-xs animate-fade-in space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary font-black flex items-center justify-center text-base shrink-0 border border-primary/30">
                {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground">{selectedStudent.name}</h3>
                <p className="text-sm text-muted-foreground font-semibold">{selectedStudent.admNo} · {selectedStudent.class} (Sec {selectedStudent.section}) · Session {selectedStudent.session}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <VFBadge variant="success">Active Student</VFBadge>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-sm text-muted-foreground hover:text-foreground font-bold px-2.5 py-1 rounded-lg hover:bg-muted cursor-pointer transition-colors"
              >
                ✕ Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Attendance Rate</p>
              <p className="text-xl font-black text-emerald-400 mt-1">{selectedStudent.attendance}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">GPA / Rank</p>
              <p className="text-xl font-black text-primary mt-1">{selectedStudent.gpa} (Top 5%)</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Guardian Contact</p>
              <p className="text-sm font-bold text-foreground mt-1">{selectedStudent.guardian}</p>
              <p className="text-xs text-muted-foreground font-mono">{selectedStudent.phone}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Assigned House</p>
              <p className="text-base font-bold text-foreground mt-1">{selectedStudent.house}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Enrolled Students Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">
              Enrolled Students Master Roster ({activeSession})
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              Manage and view 360° academic records for session {activeSession}
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Filter by Grade */}
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="bg-card border border-border text-xs font-bold text-foreground rounded-xl px-3 py-2 outline-none cursor-pointer h-9"
            >
              <option value="all">All Classes & Grades</option>
              <option value="Class 9">Class 9 Only</option>
              <option value="Class 10">Class 10 Only</option>
              <option value="Class 11">Class 11 Only</option>
              <option value="Class 12">Class 12 Only</option>
            </select>

            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Roster
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Add Student
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={enrolledStudentColumns}
          data={currentEnrolledList}
          filterPlaceholder="Search by student name, roll number, or admission ID..."
        />
      </div>
    </div>
  );

  // ─── TAB 2 CONTENT: TRANSFERS, TC & PASSED OUT / ALUMNI ───────────────────────
  const tcAndAlumniContent = (
    <div className="space-y-6">
      {/* Session Context Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-card to-card border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-foreground">
                Transfers, TC & Alumni Registry: <span className="text-amber-400">{activeSession}</span>
              </h3>
              <VFBadge variant="warning">TC & Alumni Bureau</VFBadge>
            </div>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
              Official archive of students graduated, migrated, or issued Transfer Certificates (TC)
            </p>
          </div>
        </div>

        {/* Quick Session Switch */}
        <div className="flex items-center gap-2 shrink-0 bg-background/60 p-1 rounded-xl border border-border">
          <span className="text-xs font-bold text-muted-foreground px-2">Session:</span>
          {academicSessions.map((session) => (
            <button
              key={session}
              onClick={() => setActiveSession(session)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                activeSession === session
                  ? "bg-amber-500 text-black font-extrabold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {session}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats for TC & Alumni */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total TC Issued"
          value="142"
          icon={<FileCheck2 className="h-5 w-5" />}
          trend="up"
          trendLabel="+14 this term"
          accentColor="amber"
        />
        <VFStatCard
          title="Graduated / Alumni"
          value="310"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Class 12 Batch"
          accentColor="amber"
        />
        <VFStatCard
          title="Pending Verification"
          value="3 Requests"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Principal Queue"
          accentColor="amber"
        />
        <VFStatCard
          title="CBSE Migration Rate"
          value="100%"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="Fully Compliant"
          accentColor="amber"
        />
      </div>

      {/* Main TC & Alumni Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">
              Transfer Certificate & Alumni Archive ({activeSession})
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              Official records of students issued Transfer Certificates, withdrawals, and alumni graduations
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export TC Ledger
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Issue New TC
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={tcAndAlumniColumns}
          data={currentTcAndAlumniList}
          filterPlaceholder="Search by student name, TC number, or destination school..."
        />
      </div>
    </div>
  );

  // ─── STRICTLY ONLY 2 TABS AS REQUESTED ─────────────────────────────────────────
  const tabs = [
    {
      id: 'enrolled',
      label: 'Enrolled Students',
      icon: <Users className="h-5 w-5" />,
      badge: currentEnrolledList.length,
      content: enrolledStudentsContent,
    },
    {
      id: 'transfers_alumni',
      label: 'Transfers, TC & Alumni',
      icon: <GraduationCap className="h-5 w-5" />,
      badge: currentTcAndAlumniList.length,
      content: tcAndAlumniContent,
    },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="enrolled" variant="top-bar" />
    </VFPageContainer>
  );
}
