import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFBadge,
  VFButton,
  VFDataTable,
} from '@vidyafloww/ui';
import {
  BookOpen,
  Calendar,
  Grid,
  Plus,
  Download,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

function AcademicsPage() {
  const { addNotification } = useGlobalStore();
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
      cell: (r: any) => <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border text-xs">{r.code}</span>,
    },
    {
      header: 'Subject Name',
      accessorKey: 'name',
      cell: (r: any) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.name}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.department}</p>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'type',
      cell: (r: any) => <VFBadge variant="outline">{r.type}</VFBadge>,
    },
    {
      header: 'Assigned Grades',
      accessorKey: 'classes',
      cell: (r: any) => <span className="text-foreground text-xs font-semibold">{r.classes}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
  ];

  // 1. Structure & Sessions View
  const sessionsContent = (
    <div className="space-y-4 sm:space-y-6">
      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Active Session</span>
            <span className="text-2xl font-black text-foreground mt-1 block">2026–2027</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">Term 1 Live</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Grades Configured</span>
            <span className="text-2xl font-black text-foreground mt-1 block">14 Grades</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Pre-K to Grade 12</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Active Sections</span>
            <span className="text-2xl font-black text-foreground mt-1 block">48 Sections</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Avg 38 / section</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Subject Catalog</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">32 Subjects</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">CBSE Aligned</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-card border border-border/90 shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-sm text-foreground">Active Session: 2026–2027</h3>
            <p className="text-xs text-muted-foreground">Academic calendar & term milestones</p>
          </div>
          <div className="space-y-2.5 pt-1">
            <p className="text-xs font-mono font-bold text-foreground">April 1, 2026 – March 31, 2027</p>
            <div className="flex gap-2">
              <VFBadge variant="success">Term 1 (Active)</VFBadge>
              <VFBadge variant="outline">Term 2 (Upcoming)</VFBadge>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-card border border-border/90 shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-sm text-foreground">Senior Secondary Streams</h3>
            <p className="text-xs text-muted-foreground">Specialized learning tracks</p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground font-semibold">Science (PCM/PCB)</span>
              <span className="font-black text-foreground">180 Students</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground font-semibold">Commerce & Economics</span>
              <span className="font-black text-foreground">130 Students</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Humanities & Arts</span>
              <span className="font-black text-foreground">98 Students</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-card border border-border/90 shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-sm text-foreground">Department Leadership</h3>
            <p className="text-xs text-muted-foreground">Heads of academic departments</p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground font-semibold">Science & Math</span>
              <span className="font-black text-foreground">Dr. Rajesh Sharma</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-1.5">
              <span className="text-muted-foreground font-semibold">Languages</span>
              <span className="font-black text-foreground">Mr. Arvind Gupta</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Commerce</span>
              <span className="font-black text-foreground">Mrs. Sunita Verma</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. Curriculum & Subjects View
  const subjectsContent = (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-foreground tracking-tight">Subject Master Catalog</h2>
          <p className="text-xs text-muted-foreground font-medium">Course codes, evaluation schemes, and departmental affiliations</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => addNotification({ title: 'Catalog Exported', description: 'Academic subjects master roster exported as Excel file.', type: 'success' })}
          >
            Export Catalog
          </VFButton>
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => addNotification({ title: 'Add Subject', description: 'Subject creator modal will be available in a future update.', type: 'info' })}
          >
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
    <div className="space-y-4 sm:space-y-6">
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs space-y-3">
        <div>
          <h3 className="font-bold text-sm text-foreground">Class & Section Allocations</h3>
          <p className="text-xs text-muted-foreground">Configured classrooms, room assignments, and student capacities</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
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
            <div key={i} className="p-3 rounded-md bg-muted/40 border border-border/80 space-y-1">
              <div className="flex justify-between items-center">
                <p className="font-black text-foreground text-xs">{c.class}</p>
                <VFBadge variant="outline" className="text-[10px]">{c.room}</VFBadge>
              </div>
              <p className="text-muted-foreground text-[11px] font-semibold truncate">{c.teacher}</p>
              <p className="text-[10px] text-primary font-bold">{c.capacity} Enrolled</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'structure', label: 'Academic Structure & Sessions', icon: <Calendar className="h-4 w-4" />, content: sessionsContent },
    { id: 'subjects', label: 'Curriculum & Subjects', icon: <BookOpen className="h-4 w-4" />, content: subjectsContent },
    { id: 'classes', label: 'Class & Section Setup', icon: <Grid className="h-4 w-4" />, content: classesContent },
  ];

  return (
    <VFPageContainer className="space-y-3">
      <VFTabs items={tabs} defaultTabId="structure" variant="top-bar" />
    </VFPageContainer>
  );
}
