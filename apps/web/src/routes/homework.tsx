import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  BookMarked,
  FileText,
  Clock,
  TrendingUp,
  Award,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Send,
  AlertCircle,
  Download,
  FolderGit,
  HelpCircle,
  RotateCcw,
  BarChart3,
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
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const homeworkData: HomeworkRecord[] = [
    { id: '1', code: 'HW-MATH-101', title: 'Quadratic Equations & Roots Working', subject: 'Mathematics', class: 'Class 10-A', dueDate: 'Today, 11:59 PM', submitted: 38, totalStudents: 42, status: 'Published' },
    { id: '2', code: 'HW-PHYS-102', title: 'Electromagnetism Numerical Exercises', subject: 'Physics', class: 'Class 10-A', dueDate: 'Tomorrow, 06:00 PM', submitted: 24, totalStudents: 42, status: 'Published' },
    { id: '3', code: 'HW-CHEM-103', title: 'Chemical Reactions & Stoichiometry', subject: 'Chemistry', class: 'Class 10-B', dueDate: '14 Aug, 11:59 PM', submitted: 12, totalStudents: 40, status: 'Published' },
  ];

  const homeworkColumns = [
    { header: 'Assignment Code', accessorKey: 'code', cell: (r: HomeworkRecord) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Title & Topic', accessorKey: 'title', cell: (r: HomeworkRecord) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Subject', accessorKey: 'subject' },
    { header: 'Class', accessorKey: 'class' },
    { header: 'Due Date', accessorKey: 'dueDate' },
    { header: 'Submissions', accessorKey: 'submitted', cell: (r: HomeworkRecord) => `${r.submitted} / ${r.totalStudents}` },
    { header: 'Status', accessorKey: 'status', cell: (r: HomeworkRecord) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Homework Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Assignments" value="12 Published" icon={<BookMarked className="h-5 w-5 text-primary" />} trend="up" trendLabel="4 Classes" />
        <VFStatCard title="Submissions Today" value="142 Homeworks" icon={<FileText className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="88% Turn-in Rate" />
        <VFStatCard title="Pending Grading" value="18 Submissions" icon={<Clock className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="Requires Review" />
        <VFStatCard title="Completion Rate" value="94.2%" icon={<TrendingUp className="h-5 w-5 text-purple-500" />} description="On-time Submissions" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Homework
  // ----------------------------------------------------
  const homeworkListContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Homework Master Register</h3>
          <p className="text-xs text-muted-foreground">Daily homework assignments across all subjects and grades.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Homework</VFButton>
      </div>
      <VFDataTable columns={homeworkColumns} data={homeworkData} filterPlaceholder="Search homework title..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Assignments
  // ----------------------------------------------------
  const assignmentsContent = (
    <div className="space-y-4">
      <VFCard title="Term & Unit Long-term Assignments">
        <p className="text-xs text-muted-foreground mb-3">Manage term-end research papers, case studies, and long-form assignments.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Worksheets
  // ----------------------------------------------------
  const worksheetsContent = (
    <div className="space-y-4">
      <VFCard title="Printable & Digital Practice Worksheets">
        <p className="text-xs text-muted-foreground mb-3">Repository of downloadable PDF worksheets with solution keys.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Projects
  // ----------------------------------------------------
  const projectsContent = (
    <div className="space-y-4">
      <VFCard title="Student Group & Capstone Projects">
        <p className="text-xs text-muted-foreground mb-3">Track group allocations, project milestones, and rubric evaluations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Question Sets
  // ----------------------------------------------------
  const questionSetsContent = (
    <div className="space-y-4">
      <VFCard title="Curated Homework Question Banks & Problem Sets">
        <p className="text-xs text-muted-foreground mb-3">Reusable problem sets classified by Bloom taxonomy difficulty levels.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Assignment Distribution
  // ----------------------------------------------------
  const distributionContent = (
    <div className="space-y-4">
      <VFCard title="Classroom & Group Assignment Dispatch Engine">
        <p className="text-xs text-muted-foreground mb-3">Distribute homework to specific sections, elective groups, or individual remedial students.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Student Submissions
  // ----------------------------------------------------
  const submissionsContent = (
    <div className="space-y-4">
      <VFCard title="Live Student Homework Submissions Inbox">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Digital PDF attachments, image uploads, and timestamped turn-in receipts.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Submission Review
  // ----------------------------------------------------
  const reviewContent = (
    <div className="space-y-4">
      <VFCard title="Teacher Annotation & PDF Correction Interface">
        <p className="text-xs text-muted-foreground mb-3">Review student PDF submissions with digital pen annotations and margin notes.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Evaluation & Marks
  // ----------------------------------------------------
  const evaluationContent = (
    <div className="space-y-4">
      <VFCard title="Homework Marking & Rubric Grading System">
        <p className="text-xs text-muted-foreground mb-3">Grade student homework using point scales (0-100) or rubric criteria.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Teacher Feedback
  // ----------------------------------------------------
  const feedbackContent = (
    <div className="space-y-4">
      <VFCard title="Personalized Teacher Comments & Voice Feedback">
        <p className="text-xs text-muted-foreground mb-3">Send constructive written and audio feedback to students and parents.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Resubmissions
  // ----------------------------------------------------
  const resubmissionsContent = (
    <div className="space-y-4">
      <VFCard title="Homework Correction & Resubmission Workflow">
        <p className="text-xs text-muted-foreground mb-3">Request students to correct errors and re-submit for revised grading.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Late Submissions
  // ----------------------------------------------------
  const lateSubmissionsContent = (
    <div className="space-y-4">
      <VFCard title="Late Turn-in Register & Penalty Rules">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Track overdue homework, late submission timestamps, and penalty point deductions.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Completion Tracking
  // ----------------------------------------------------
  const completionTrackingContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Class 10A Turn-in Rate" value="95.2%" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="40 / 42 Submitted" />
        <VFStatCard title="Class 9B Turn-in Rate" value="88.4%" icon={<TrendingUp className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="34 / 38 Submitted" />
        <VFStatCard title="Late Turn-in Average" value="4.2%" icon={<Clock className="h-5 w-5 text-amber-500" />} description="Across All Subjects" />
        <VFStatCard title="Defaulter Rate" value="2.1%" icon={<AlertCircle className="h-5 w-5 text-destructive" />} description="Unsubmitted Homework" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Homework Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Homework Completion Analytics & Defaulters Report">
        <p className="text-xs text-muted-foreground mb-3">Export class-wise homework completion statistics and parent notification logs.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Defaulters List (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Homework Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Homework Parameters & Default Grace Periods">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Default Due Cut-off Time" defaultValue="11:59 PM" />
          <VFSelect label="Late Submission Penalty Rule" options={[{ label: '10% Mark Penalty Per Day', value: '10pct' }, { label: 'Accept Without Penalty', value: 'none' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 16 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Homework Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'homework-list', label: 'Homework', icon: <BookMarked className="h-3.5 w-3.5" />, content: homeworkListContent },
    { id: 'assignments', label: 'Assignments', icon: <FileText className="h-3.5 w-3.5" />, content: assignmentsContent },
    { id: 'worksheets', label: 'Worksheets', icon: <FileText className="h-3.5 w-3.5" />, content: worksheetsContent },
    { id: 'projects', label: 'Projects', icon: <FolderGit className="h-3.5 w-3.5" />, content: projectsContent },
    { id: 'question-sets', label: 'Question Sets', icon: <HelpCircle className="h-3.5 w-3.5" />, content: questionSetsContent },
    { id: 'distribution', label: 'Assignment Distribution', icon: <Send className="h-3.5 w-3.5" />, content: distributionContent },
    { id: 'submissions', label: 'Student Submissions', icon: <FileText className="h-3.5 w-3.5" />, content: submissionsContent },
    { id: 'review', label: 'Submission Review', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: reviewContent },
    { id: 'evaluation', label: 'Evaluation & Marks', icon: <Award className="h-3.5 w-3.5" />, content: evaluationContent },
    { id: 'feedback', label: 'Teacher Feedback', icon: <Award className="h-3.5 w-3.5" />, content: feedbackContent },
    { id: 'resubmissions', label: 'Resubmissions', icon: <RotateCcw className="h-3.5 w-3.5" />, content: resubmissionsContent },
    { id: 'late-submissions', label: 'Late Submissions', icon: <Clock className="h-3.5 w-3.5" />, content: lateSubmissionsContent },
    { id: 'completion-tracking', label: 'Completion Tracking', icon: <TrendingUp className="h-3.5 w-3.5" />, content: completionTrackingContent },
    { id: 'reports', label: 'Homework Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Homework Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
