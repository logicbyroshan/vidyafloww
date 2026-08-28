import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  BookMarked,
  Clock,
  Plus,
  Download,
} from 'lucide-react';

export const Route = createFileRoute('/homework')({
  component: HomeworkPage,
});

interface HomeworkRecord {
  id: string;
  code: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submitted: number;
  totalStudents: number;
  status: 'Published' | 'Draft' | 'Closed';
}

function HomeworkPage() {
  const homeworkData: HomeworkRecord[] = [
    { id: '1', code: 'HW-MATH-101', title: 'Quadratic Equations & Roots Working', subject: 'Mathematics', class: 'Class 10-A', dueDate: 'Today, 11:59 PM', submitted: 38, totalStudents: 42, status: 'Published' },
    { id: '2', code: 'HW-PHYS-102', title: 'Electromagnetism Numerical Exercises', subject: 'Physics', class: 'Class 10-A', dueDate: 'Tomorrow, 06:00 PM', submitted: 24, totalStudents: 42, status: 'Published' },
    { id: '3', code: 'HW-CHEM-103', title: 'Chemical Reactions & Stoichiometry', subject: 'Chemistry', class: 'Class 10-B', dueDate: '14 Aug, 11:59 PM', submitted: 12, totalStudents: 40, status: 'Published' },
  ];

  const homeworkColumns = [
    {
      header: 'Code',
      accessorKey: 'code',
      cell: (r: HomeworkRecord) => <span className="font-mono font-bold text-primary text-base">{r.code}</span>,
    },
    {
      header: 'Title & Topic',
      accessorKey: 'title',
      cell: (r: HomeworkRecord) => <span className="font-extrabold text-foreground text-base">{r.title}</span>,
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
      cell: (r: HomeworkRecord) => <span className="font-bold text-foreground text-base">{r.subject}</span>,
    },
    {
      header: 'Class',
      accessorKey: 'class',
      cell: (r: HomeworkRecord) => <span className="font-bold text-foreground text-base">{r.class}</span>,
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      cell: (r: HomeworkRecord) => <span className="text-muted-foreground text-base font-semibold">{r.dueDate}</span>,
    },
    {
      header: 'Submissions',
      accessorKey: 'submitted',
      cell: (r: HomeworkRecord) => <span className="font-black text-foreground text-base">{r.submitted} / {r.totalStudents}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: HomeworkRecord) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
  ];

  // 1. Homework List View
  const listContent = (
    <div className="space-y-6">
      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Active Homework</span>
            <span className="text-2xl font-black text-foreground mt-1 block">12 Published</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Across 4 classes</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Turned In Today</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">142</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">88% submission rate</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Pending Grading</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">18</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Requires review</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">On-Time Velocity</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">94.2%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Top institutional grade</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Homework Master Register</h2>
            <p className="text-sm text-muted-foreground font-medium">Assigned homework, deadlines, and submission monitoring</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Register
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Create Homework
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={homeworkColumns}
          data={homeworkData}
          filterPlaceholder="Search homework by title, code, or subject..."
        />
      </div>
    </div>
  );

  // 2. Grading Queue View
  const gradingContent = (
    <div className="space-y-6">
      <VFCard title="Pending Grading Submissions Queue" description="Student papers awaiting educator feedback">
        <div className="divide-y divide-border -my-2 text-base">
          {[
            { student: 'Rahul Sharma (Class 10-A)', assignment: 'Electromagnetism Numerical Exercises', turnInTime: 'Today at 02:30 PM', autoScore: '18 / 20' },
            { student: 'Priya Sharma (Class 10-A)', assignment: 'Quadratic Equations Working', turnInTime: 'Today at 03:15 PM', autoScore: '20 / 20' },
            { student: 'Kavya Nair (Class 11-Com)', assignment: 'Ledger Accounting Practicals', turnInTime: 'Today at 04:00 PM', autoScore: '19 / 20' },
          ].map((s, i) => (
            <div key={i} className="py-3.5 px-1 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground text-base">{s.student}</p>
                <p className="text-muted-foreground text-xs font-semibold mt-0.5">{s.assignment} · {s.turnInTime}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-black text-success text-base">{s.autoScore}</span>
                <VFButton size="sm" variant="outline">Review & Grade</VFButton>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = [
    { id: 'list', label: 'Active Homework & Register', icon: <BookMarked className="h-4 w-4" />, content: listContent },
    { id: 'grading', label: 'Grading Queue', icon: <Clock className="h-4 w-4" />, content: gradingContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="list" variant="top-bar" />
    </VFPageContainer>
  );
}
