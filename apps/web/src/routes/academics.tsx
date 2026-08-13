import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFCard,
  VFBadge,
  VFButton,
  VFStatCard,
  VFSelect,
  VFDataTable,
} from '@vidyamaxx/ui';
import {
  BookOpen,
  Layers,
  Calendar,
  Building,
  Users,
  Grid,
  Clock,
  ShieldCheck,
  SlidersHorizontal,
  GraduationCap,
  Briefcase,
} from 'lucide-react';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

function AcademicsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('dashboard');

  const subjectData = [
    { code: 'SUB-101', name: 'Mathematics', type: 'Core Compulsory', department: 'Science & Math', classes: 'Class 1 to 12', status: 'Active' },
    { code: 'SUB-102', name: 'Physics', type: 'Core Science', department: 'Science & Math', classes: 'Class 9 to 12', status: 'Active' },
    { code: 'SUB-103', name: 'Chemistry', type: 'Core Science', department: 'Science & Math', classes: 'Class 9 to 12', status: 'Active' },
    { code: 'SUB-104', name: 'English Literature', type: 'Language', department: 'Humanities & Languages', classes: 'Class 1 to 12', status: 'Active' },
    { code: 'SUB-105', name: 'Accountancy', type: 'Commerce Elective', department: 'Commerce & Economics', classes: 'Class 11 to 12', status: 'Active' },
  ];

  const subjectColumns = [
    { header: 'Subject Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Subject Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="outline">{r.type}</VFBadge> },
    { header: 'Department', accessorKey: 'department' },
    { header: 'Assigned Grades', accessorKey: 'classes' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Academic Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Academic Session" value="2026-2027" icon={<Calendar className="h-5 w-5" />} trend="up" trendLabel="Term 1 Live" />
        <VFStatCard title="Total Configured Classes" value="14 Grades" icon={<GraduationCap className="h-5 w-5" />} trend="neutral" trendLabel="Pre-K to Grade 12" />
        <VFStatCard title="Active Sections" value="48 Sections" icon={<Grid className="h-5 w-5" />} trend="up" trendLabel="Avg 38 per Sec" />
        <VFStatCard title="Offered Subjects" value="32 Subjects" icon={<BookOpen className="h-5 w-5" />} trend="up" trendLabel="CBSE / ICSE Aligned" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Academic Departments">
          <p className="text-2xl font-black text-foreground mt-2">6 Departments</p>
          <p className="text-xs text-muted-foreground mt-1">Math, Science, Languages, Humanities, Commerce, IT</p>
        </VFCard>
        <VFCard title="Stream Allocation">
          <p className="text-2xl font-black text-foreground mt-2">3 Sr. Sec Streams</p>
          <p className="text-xs text-primary font-semibold mt-1">Science, Commerce, Arts/Humanities</p>
        </VFCard>
        <VFCard title="House Squads">
          <p className="text-2xl font-black text-foreground mt-2">4 House Divisions</p>
          <p className="text-xs text-success font-semibold mt-1">Red, Blue, Green, Yellow</p>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Academic Sessions
  // ----------------------------------------------------
  const sessionsContent = (
    <div className="space-y-4">
      <VFCard title="Academic Sessions & Term Calendar Configuration">
        <p className="text-xs text-muted-foreground mb-3">Define academic year start/end dates, term splits, exam breaks, and vacation schedules.</p>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
            <div>
              <span className="font-bold text-foreground">Academic Year 2026-2027 (Current Active)</span>
              <p className="text-muted-foreground text-xs mt-0.5">Apr 1, 2026 – Mar 31, 2027 · Term 1 & Term 2</p>
            </div>
            <VFBadge variant="success">Active Session</VFBadge>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Classes
  // ----------------------------------------------------
  const classesContent = (
    <div className="space-y-4">
      <VFCard title="Grade / Class Master Catalog">
        <p className="text-xs text-muted-foreground mb-3">Configure standard class grades (Nursery to Grade 12) with academic level classifications.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Sections
  // ----------------------------------------------------
  const sectionsContent = (
    <div className="space-y-4">
      <VFCard title="Class Section Master Configuration">
        <p className="text-xs text-muted-foreground mb-3">Configure section divisions (Sec A, Sec B, Sec C) and max seat capacities per classroom.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Streams
  // ----------------------------------------------------
  const streamsContent = (
    <div className="space-y-4">
      <VFCard title="Senior Secondary Academic Streams (Class 11 & 12)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Science Stream</span>
            <p className="text-muted-foreground text-xs mt-1">PCM / PCB / PCMB + Computer Sci / Physical Ed</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Commerce Stream</span>
            <p className="text-muted-foreground text-xs mt-1">Accountancy, Business Studies, Economics, Math</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Humanities / Arts</span>
            <p className="text-muted-foreground text-xs mt-1">History, Political Sci, Psychology, Sociology</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Departments
  // ----------------------------------------------------
  const departmentsContent = (
    <div className="space-y-4">
      <VFCard title="Academic Departments & Faculty Division">
        <p className="text-xs text-muted-foreground mb-3">Manage faculty department divisions, HOD appointments, and budget allocations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Subjects
  // ----------------------------------------------------
  const subjectsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Institutional Subject Master Catalog</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Core compulsory subjects, language options, and stream electives.</p>
        </div>
        <VFButton size="sm" leftIcon={<BookOpen className="h-3.5 w-3.5" />}>Add New Subject</VFButton>
      </div>
      <VFDataTable columns={subjectColumns} data={subjectData} filterPlaceholder="Search subject name, code, or department..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Subject Groups
  // ----------------------------------------------------
  const subjectGroupsContent = (
    <div className="space-y-4">
      <VFCard title="Subject Groups & Elective Clusters">
        <p className="text-xs text-muted-foreground mb-3">Group optional subjects into elective pools (e.g. Group A: Computer Science / Informatics Practices / PE).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Class-Subject Mapping
  // ----------------------------------------------------
  const classSubjectMappingContent = (
    <div className="space-y-4">
      <VFCard title="Class-Wise Subject Allocation & Weekly Hours">
        <p className="text-xs text-muted-foreground mb-3">Assign mandatory and elective subjects per class grade with weekly period credit limits.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Student-Subject Mapping
  // ----------------------------------------------------
  const studentSubjectMappingContent = (
    <div className="space-y-4">
      <VFCard title="Student Elective Language & Stream Subject Choices">
        <p className="text-xs text-muted-foreground mb-3">Map individual student choices for 2nd language, 3rd language, and Class 11/12 electives.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Teacher-Subject Mapping
  // ----------------------------------------------------
  const teacherSubjectMappingContent = (
    <div className="space-y-4">
      <VFCard title="Teacher-Subject Allocation & Workload Credit Assignment">
        <p className="text-xs text-muted-foreground mb-3">Map subject teachers to specific class sections and track weekly teaching hours.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Houses
  // ----------------------------------------------------
  const housesContent = (
    <div className="space-y-4">
      <VFCard title="Institutional House Divisions & Master Mentors">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs mt-2">
          {['Red House (Ignis)', 'Blue House (Aqua)', 'Green House (Terra)', 'Yellow House (Sol)'].map((h, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 text-center">
              <span className="font-bold text-foreground">{h}</span>
              <p className="text-muted-foreground text-xs mt-1">312 Allocated Students</p>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Academic Calendar
  // ----------------------------------------------------
  const calendarContent = (
    <div className="space-y-4">
      <VFCard title="Institutional Academic Calendar & Event Roster">
        <p className="text-xs text-muted-foreground mb-3">Term exam dates, PTM schedules, school holidays, and annual sports week.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Working Days
  // ----------------------------------------------------
  const workingDaysContent = (
    <div className="space-y-4">
      <VFCard title="Working Days & Institutional Holiday Roster">
        <p className="text-xs text-muted-foreground mb-3">Configure 5-day / 6-day week schedules, gazetted holidays, and restricted holidays.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Academic Policies
  // ----------------------------------------------------
  const policiesContent = (
    <div className="space-y-4">
      <VFCard title="Academic Policies, Attendance Thresholds & Grading Rules">
        <p className="text-xs text-muted-foreground mb-3">Set minimum 75% attendance rule for exam hall tickets and grading scale thresholds (A1 to E).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Academic Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Academic Structure Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFSelect label="Default Education Board Framework" options={[{ label: 'CBSE (Central Board of Secondary Education)', value: 'cbse' }, { label: 'ICSE / ISC', value: 'icse' }]} />
          <VFSelect label="Grading System Schema" options={[{ label: '9-Point Scale (A1 to E)', value: '9point' }, { label: '4-Point GPA System', value: '4point' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 16 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Academic Dashboard', icon: <GraduationCap className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'sessions', label: 'Academic Sessions', icon: <Calendar className="h-3.5 w-3.5" />, content: sessionsContent },
    { id: 'classes', label: 'Classes', icon: <GraduationCap className="h-3.5 w-3.5" />, content: classesContent },
    { id: 'sections', label: 'Sections', icon: <Grid className="h-3.5 w-3.5" />, content: sectionsContent },
    { id: 'streams', label: 'Streams', icon: <Layers className="h-3.5 w-3.5" />, content: streamsContent },
    { id: 'departments', label: 'Departments', icon: <Building className="h-3.5 w-3.5" />, content: departmentsContent },
    { id: 'subjects', label: 'Subjects', icon: <BookOpen className="h-3.5 w-3.5" />, content: subjectsContent },
    { id: 'subject-groups', label: 'Subject Groups', icon: <Grid className="h-3.5 w-3.5" />, content: subjectGroupsContent },
    { id: 'class-subject-mapping', label: 'Class-Subject Mapping', icon: <Layers className="h-3.5 w-3.5" />, content: classSubjectMappingContent },
    { id: 'student-subject-mapping', label: 'Student-Subject Mapping', icon: <Users className="h-3.5 w-3.5" />, content: studentSubjectMappingContent },
    { id: 'teacher-subject-mapping', label: 'Teacher-Subject Mapping', icon: <Briefcase className="h-3.5 w-3.5" />, content: teacherSubjectMappingContent },
    { id: 'houses', label: 'Houses', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: housesContent },
    { id: 'calendar', label: 'Academic Calendar', icon: <Calendar className="h-3.5 w-3.5" />, content: calendarContent },
    { id: 'working-days', label: 'Working Days', icon: <Clock className="h-3.5 w-3.5" />, content: workingDaysContent },
    { id: 'policies', label: 'Academic Policies', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: policiesContent },
    { id: 'settings', label: 'Academic Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
