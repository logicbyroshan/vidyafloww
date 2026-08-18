import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFCard,
  VFBadge,
  VFButton,
  VFStatCard,
  VFDataTable,
} from '@vidyamaxx/ui';
import {
  BookOpen,
  Calendar,
  Grid,
  GraduationCap,
  Plus,
  Download,
} from 'lucide-react';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

function AcademicsPage() {
  const subjectData = [
    { code: 'SUB-101', name: 'Mathematics', type: 'Core Compulsory', department: 'Science & Math', classes: 'Class 1 to 12', status: 'Active' },
    { code: 'SUB-102', name: 'Physics', type: 'Core Science', department: 'Science & Math', classes: 'Class 9 to 12', status: 'Active' },
    { code: 'SUB-103', name: 'Chemistry', type: 'Core Science', department: 'Science & Math', classes: 'Class 9 to 12', status: 'Active' },
    { code: 'SUB-104', name: 'English Literature', type: 'Language', department: 'Humanities & Languages', classes: 'Class 1 to 12', status: 'Active' },
    { code: 'SUB-105', name: 'Accountancy', type: 'Commerce Elective', department: 'Commerce & Economics', classes: 'Class 11 to 12', status: 'Active' },
  ];

  const subjectColumns = [
    {
      header: 'Subject Code',
      accessorKey: 'code',
      cell: (r: any) => <span className="font-mono font-bold text-primary text-base">{r.code}</span>,
    },
    {
      header: 'Subject Name',
      accessorKey: 'name',
      cell: (r: any) => <span className="font-extrabold text-foreground text-base">{r.name}</span>,
    },
    {
      header: 'Type',
      accessorKey: 'type',
      cell: (r: any) => <VFBadge variant="outline">{r.type}</VFBadge>,
    },
    {
      header: 'Department',
      accessorKey: 'department',
      cell: (r: any) => <span className="font-bold text-foreground text-base">{r.department}</span>,
    },
    {
      header: 'Assigned Grades',
      accessorKey: 'classes',
      cell: (r: any) => <span className="text-muted-foreground text-base font-semibold">{r.classes}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
  ];

  // 1. Structure & Sessions View
  const sessionsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Active Session"
          value="2026-2027"
          icon={<Calendar className="h-5 w-5" />}
          trend="up"
          trendLabel="Term 1 Live"
        />
        <VFStatCard
          title="Grades Configured"
          value="14 Grades"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Pre-K to Grade 12"
        />
        <VFStatCard
          title="Active Sections"
          value="48 Sections"
          icon={<Grid className="h-5 w-5" />}
          trend="up"
          trendLabel="Avg 38 / section"
        />
        <VFStatCard
          title="Subject Catalog"
          value="32 Subjects"
          icon={<BookOpen className="h-5 w-5" />}
          trend="up"
          trendLabel="CBSE / ICSE Aligned"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Active Session: 2026-2027" description="Academic calendar & terms">
          <div className="space-y-3 mt-1">
            <p className="text-base font-bold text-foreground">April 1, 2026 – March 31, 2027</p>
            <div className="flex gap-2">
              <VFBadge variant="success">Term 1 (Active)</VFBadge>
              <VFBadge variant="outline">Term 2 (Upcoming)</VFBadge>
            </div>
          </div>
        </VFCard>

        <VFCard title="Senior Secondary Streams" description="Specialized learning tracks">
          <div className="space-y-2 mt-1 text-base">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Science (PCM/PCB)</span>
              <span className="font-black text-foreground">180 Students</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Commerce & Economics</span>
              <span className="font-black text-foreground">130 Students</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Humanities & Arts</span>
              <span className="font-black text-foreground">98 Students</span>
            </div>
          </div>
        </VFCard>

        <VFCard title="Department Leadership" description="Heads of academic departments">
          <div className="space-y-2 mt-1 text-base">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Science & Math</span>
              <span className="font-black text-foreground">Dr. Rajesh Sharma</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Languages</span>
              <span className="font-black text-foreground">Mr. Arvind Gupta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Commerce</span>
              <span className="font-black text-foreground">Mrs. Sunita Verma</span>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 2. Curriculum & Subjects View
  const subjectsContent = (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-foreground tracking-tight">Subject Master Catalog</h2>
          <p className="text-sm text-muted-foreground font-medium">Course codes, evaluation schemes, and departmental affiliations</p>
        </div>
        <div className="flex items-center gap-2.5">
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Catalog
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Subject
          </VFButton>
        </div>
      </div>

      <VFDataTable
        columns={subjectColumns}
        data={subjectData}
        filterPlaceholder="Search subjects by code, name, or department..."
      />
    </div>
  );

  // 3. Class & Section Setup View
  const classesContent = (
    <div className="space-y-6">
      <VFCard title="Class & Section Allocations" description="Configured classrooms, room assignments, and student capacities">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-1 text-base">
          {[
            { class: 'Class 9-A', room: 'Room 101', teacher: 'Mrs. Sunita Verma', capacity: '38 / 40' },
            { class: 'Class 9-B', room: 'Room 102', teacher: 'Mr. Arvind Gupta', capacity: '36 / 40' },
            { class: 'Class 10-A', room: 'Room 201', teacher: 'Dr. Rajesh Sharma', capacity: '39 / 40' },
            { class: 'Class 10-B', room: 'Room 202', teacher: 'Ms. Pooja Rao', capacity: '37 / 40' },
            { class: 'Class 11-Sci', room: 'Lab 204', teacher: 'Dr. Nair', capacity: '35 / 40' },
            { class: 'Class 11-Com', room: 'Room 301', teacher: 'Mrs. Joshi', capacity: '32 / 40' },
            { class: 'Class 12-Sci', room: 'Lab 102', teacher: 'Mr. Das', capacity: '38 / 40' },
            { class: 'Class 12-Com', room: 'Room 302', teacher: 'Mr. Patel', capacity: '34 / 40' },
          ].map((c, i) => (
            <div key={i} className="border-b border-border pb-2 space-y-1">
              <div className="flex justify-between items-center">
                <p className="font-black text-foreground text-base">{c.class}</p>
                <VFBadge variant="outline">{c.room}</VFBadge>
              </div>
              <p className="text-muted-foreground text-sm font-semibold">{c.teacher}</p>
              <p className="text-xs text-primary font-bold">{c.capacity} Enrolled</p>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = [
    { id: 'structure', label: 'Academic Structure & Sessions', icon: <Calendar className="h-4 w-4" />, content: sessionsContent },
    { id: 'subjects', label: 'Curriculum & Subjects', icon: <BookOpen className="h-4 w-4" />, content: subjectsContent },
    { id: 'classes', label: 'Class & Section Setup', icon: <Grid className="h-4 w-4" />, content: classesContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="structure" variant="top-bar" />
    </VFPageContainer>
  );
}
