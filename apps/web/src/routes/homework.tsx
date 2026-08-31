import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFTabs,
  VFBadge,
} from '@vidyafloww/ui';
import {
  BookMarked,
  Clock,
  Plus,
  Download,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

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
  const { addNotification } = useGlobalStore();
  const homeworkData: HomeworkRecord[] = [
    { id: '1', code: 'HW-MATH-101', title: 'Quadratic Equations & Roots Working', subject: 'Mathematics', class: 'Class 10-A', dueDate: 'Today, 11:59 PM', submitted: 38, totalStudents: 42, status: 'Published' },
    { id: '2', code: 'HW-PHYS-102', title: 'Electromagnetism Numerical Exercises', subject: 'Physics', class: 'Class 10-A', dueDate: 'Tomorrow, 06:00 PM', submitted: 24, totalStudents: 42, status: 'Published' },
    { id: '3', code: 'HW-CHEM-103', title: 'Chemical Reactions & Stoichiometry', subject: 'Chemistry', class: 'Class 10-B', dueDate: '14 Aug, 11:59 PM', submitted: 12, totalStudents: 40, status: 'Published' },
  ];

  const homeworkColumns = [
    {
      header: 'Code',
      accessorKey: 'code',
      cell: (r: HomeworkRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border text-xs">
          {r.code}
        </span>
      ),
    },
    {
      header: 'Title & Topic',
      accessorKey: 'title',
      cell: (r: HomeworkRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.title}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.subject}</p>
        </div>
      ),
    },
    {
      header: 'Class',
      accessorKey: 'class',
      cell: (r: HomeworkRecord) => <span className="font-bold text-foreground text-xs">{r.class}</span>,
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      cell: (r: HomeworkRecord) => <span className="text-muted-foreground text-xs font-semibold">{r.dueDate}</span>,
    },
    {
      header: 'Submissions',
      accessorKey: 'submitted',
      cell: (r: HomeworkRecord) => (
        <span className="font-mono font-bold text-foreground text-xs">
          {r.submitted} / {r.totalStudents}
        </span>
      ),
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
            <h2 className="text-base font-black text-foreground tracking-tight">Homework Master Register</h2>
            <p className="text-xs text-muted-foreground font-medium">Assigned homework, deadlines, and submission monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => addNotification({ title: 'Register Exported', description: 'Homework submissions register exported as CSV file.', type: 'success' })}
            >
              Export Register
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => addNotification({ title: 'Create Homework', description: 'Homework creator modal will be available in a future update.', type: 'info' })}
            >
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
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs space-y-3">
        <div>
          <h3 className="font-bold text-sm text-foreground">Pending Grading Submissions Queue</h3>
          <p className="text-xs text-muted-foreground">Student papers awaiting educator evaluation and rubric feedback</p>
        </div>
        <div className="divide-y divide-border/60 text-xs">
          {[
            { student: 'Rahul Sharma (Class 10-A)', assignment: 'Electromagnetism Numerical Exercises', turnInTime: 'Today at 02:30 PM', autoScore: '18 / 20' },
            { student: 'Priya Sharma (Class 10-A)', assignment: 'Quadratic Equations Working', turnInTime: 'Today at 03:15 PM', autoScore: '20 / 20' },
            { student: 'Kavya Nair (Class 11-Com)', assignment: 'Ledger Accounting Practicals', turnInTime: 'Today at 04:00 PM', autoScore: '19 / 20' },
          ].map((s, i) => (
            <div key={i} className="py-3 px-1 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground text-xs">{s.student}</p>
                <p className="text-muted-foreground text-[11px] font-semibold mt-0.5">{s.assignment} · {s.turnInTime}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-emerald-400 text-xs">{s.autoScore}</span>
                <VFButton
                  size="sm"
                  variant="outline"
                   onClick={() => addNotification({ title: 'Review Opened', description: `Review modal opened for ${s.student}.`, type: 'info' })}
                >
                  Review & Grade
                </VFButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'list', label: 'Active Homework & Register', icon: <BookMarked className="h-4 w-4" />, content: listContent },
    { id: 'grading', label: 'Grading Queue', icon: <Clock className="h-4 w-4" />, content: gradingContent },
  ];

  return (
    <VFPageContainer className="space-y-3">
      <VFTabs items={tabs} defaultTabId="list" variant="top-bar" />
    </VFPageContainer>
  );
}
