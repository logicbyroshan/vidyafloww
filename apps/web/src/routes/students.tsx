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
  BarChart3,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const { activeSession, setActiveSession, academicSessions } = useGlobalStore();
  const [selectedStudent, setSelectedStudent] = React.useState<any | null>(null);
  const [selectedClassFilter, setSelectedClassFilter] = React.useState<string>('all');
  const [selectedTcFilter, setSelectedTcFilter] = React.useState<string>('all');

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

  const currentTcAndAlumniList = (tcAndAlumniDataBySession[activeSession] || tcAndAlumniDataBySession['2026–2027']).filter(
    (r) => {
      if (selectedTcFilter === 'tc') return r.type.includes('Transfer Certificate');
      if (selectedTcFilter === 'alumni') return r.type.includes('Passed Out');
      return true;
    }
  );

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

  // ─── TAB 1: CLEAN ENROLLED STUDENTS MASTER DIRECTORY ──────────────────────────
  const enrolledStudentsContent = (
    <div className="space-y-4">
      {/* Unified Single Control & Academic Command Bar */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3.5 shadow-xs">
        {/* Left: Academic Session Selector & Class Filters */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Academic Session Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25 text-primary">
            <Calendar className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-black uppercase tracking-wider text-primary/80">Session:</span>
            <select
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-foreground outline-none cursor-pointer pr-1 hover:text-primary transition-colors border-none"
            >
              {academicSessions.map((session) => (
                <option key={session} value={session} className="bg-card text-foreground font-bold">
                  {session} {session === '2026–2027' ? '(Active)' : '(Archived)'}
                </option>
              ))}
            </select>
          </div>

          {/* Class / Grade Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border">
            <span className="text-xs font-bold text-muted-foreground">Class:</span>
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-foreground outline-none cursor-pointer pr-1 hover:text-primary transition-colors border-none"
            >
              <option value="all" className="bg-card text-foreground font-bold">All Classes & Wings</option>
              <option value="Class 9" className="bg-card text-foreground font-bold">Class 9 Only</option>
              <option value="Class 10" className="bg-card text-foreground font-bold">Class 10 Only</option>
              <option value="Class 11" className="bg-card text-foreground font-bold">Class 11 Only</option>
              <option value="Class 12" className="bg-card text-foreground font-bold">Class 12 Only</option>
            </select>
          </div>

          {/* Quick Active Badge */}
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/40 border border-border text-xs font-bold text-muted-foreground">
            <span>Enrolled:</span>
            <span className="font-extrabold text-foreground">{currentEnrolledList.length} Students</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Roster
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Student
          </VFButton>
        </div>
      </div>

      {/* Selected Student Profile Preview Card (if open) */}
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

      {/* Main Clean Enrolled Students Table */}
      <VFDataTable
        columns={enrolledStudentColumns}
        data={currentEnrolledList}
        filterPlaceholder="Search by student name, roll number, or admission ID..."
      />
    </div>
  );

  // ─── TAB 2: CLEAN TRANSFERS, TC & ALUMNI REGISTRY ─────────────────────────────
  const tcAndAlumniContent = (
    <div className="space-y-4">
      {/* Unified Single Control & TC Command Bar */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3.5 shadow-xs">
        {/* Left: Academic Session & Category Filters */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Academic Session Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Calendar className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-400/80">Session:</span>
            <select
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-foreground outline-none cursor-pointer pr-1 hover:text-amber-400 transition-colors border-none"
            >
              {academicSessions.map((session) => (
                <option key={session} value={session} className="bg-card text-foreground font-bold">
                  {session} {session === '2026–2027' ? '(Active)' : '(Archived)'}
                </option>
              ))}
            </select>
          </div>

          {/* Record Category Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border">
            <span className="text-xs font-bold text-muted-foreground">Type:</span>
            <select
              value={selectedTcFilter}
              onChange={(e) => setSelectedTcFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-foreground outline-none cursor-pointer pr-1 hover:text-amber-400 transition-colors border-none"
            >
              <option value="all" className="bg-card text-foreground font-bold">All TC & Alumni Records</option>
              <option value="tc" className="bg-card text-foreground font-bold">Transfer Certificates (TC)</option>
              <option value="alumni" className="bg-card text-foreground font-bold">Passed Out Alumni</option>
            </select>
          </div>

          {/* Quick Count Badge */}
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/40 border border-border text-xs font-bold text-muted-foreground">
            <span>Records:</span>
            <span className="font-extrabold text-foreground">{currentTcAndAlumniList.length}</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export TC Ledger
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Issue New TC
          </VFButton>
        </div>
      </div>

      {/* Main Clean TC & Alumni Table */}
      <VFDataTable
        columns={tcAndAlumniColumns}
        data={currentTcAndAlumniList}
        filterPlaceholder="Search by student name, TC number, or destination school..."
      />
    </div>
  );

  // ─── TAB 3: DEDICATED STUDENT ANALYTICS & DEMOGRAPHICS ─────────────────────────
  const analyticsAndStatsContent = (
    <div className="space-y-6">
      {/* Session Context Banner */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-sm font-extrabold text-foreground">
              Institutional Intelligence Scope:
            </span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Calendar className="h-3.5 w-3.5" />
              <select
                value={activeSession}
                onChange={(e) => setActiveSession(e.target.value)}
                className="bg-transparent text-xs font-black text-foreground outline-none cursor-pointer pr-1 hover:text-blue-400 transition-colors border-none"
              >
                {academicSessions.map((session) => (
                  <option key={session} value={session} className="bg-card text-foreground font-bold">
                    AY {session} {session === '2026–2027' ? '(Active)' : '(Archived)'}
                  </option>
                ))}
              </select>
            </div>
            <VFBadge variant="outline">Verified CBSE Analytics</VFBadge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Insights PDF
          </VFButton>
        </div>
      </div>

      {/* Primary KPI Metrics Row */}
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

      {/* Secondary TC & Migration KPI Metrics Row */}
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

      {/* Demographic Matrix 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VFCard title="Gender Distribution" description="Current student population balance">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">640 Boys / 608 Girls</p>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 w-[51.2%]" />
              <div className="h-full bg-pink-500 w-[48.8%]" />
            </div>
            <p className="text-xs font-bold text-muted-foreground">51.2% Male · 48.8% Female</p>
          </div>
        </VFCard>

        <VFCard title="Quota & Reserved Seats" description="Compliance with RTE standards">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">186 Students</p>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[75%]" />
            </div>
            <p className="text-xs font-bold text-muted-foreground">15% RTE Quota fully compliant</p>
          </div>
        </VFCard>

        <VFCard title="House Allocations" description="Four competitive student squads">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">4 Houses</p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/25 text-center">Red: 312</span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/25 text-center">Blue: 310</span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/25 text-center">Green: 314</span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 text-center">Yellow: 312</span>
            </div>
          </div>
        </VFCard>
      </div>

      {/* Class-Wise Enrollment Breakdown */}
      <VFCard title="Class-Wise Enrollment Breakdown" description="Distribution across academic wings and sections">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-base pt-1">
          {[
            { grade: 'Class 9', total: '320 Students', sections: '4 Sections', standing: '96.2% Avg' },
            { grade: 'Class 10', total: '310 Students', sections: '4 Sections', standing: '97.8% Avg' },
            { grade: 'Class 11', total: '308 Students', sections: '4 Sections', standing: '94.5% Avg' },
            { grade: 'Class 12', total: '310 Students', sections: '4 Sections', standing: '98.1% Avg' },
          ].map((c, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-background/50 border border-border space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="font-black text-foreground text-base">{c.grade}</p>
                <VFBadge variant="outline">{c.sections}</VFBadge>
              </div>
              <p className="text-xl font-extrabold text-foreground">{c.total}</p>
              <p className="text-xs text-emerald-400 font-bold">{c.standing}</p>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ─── 3 CLEAN DEDICATED TABS ───────────────────────────────────────────────────
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
    {
      id: 'analytics_demographics',
      label: 'Student Analytics & Demographics',
      icon: <BarChart3 className="h-5 w-5" />,
      content: analyticsAndStatsContent,
    },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="enrolled" variant="top-bar" />
    </VFPageContainer>
  );
}
