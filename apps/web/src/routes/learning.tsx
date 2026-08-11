import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  MonitorPlay,
  FileText,
  Sparkles,
  Plus,
  Flame,
  Clock,
  TrendingUp,
  Award,
} from 'lucide-react';

export const Route = createFileRoute('/learning')({
  component: LearningPage,
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

interface QuizRecord {
  id: string;
  quizCode: string;
  title: string;
  subject: string;
  questionsCount: number;
  duration: string;
  avgScore: string;
  status: 'Active' | 'Completed';
}

function LearningPage() {
  const learningModule = MODULE_REGISTRY.find((m) => m.id === 'learning');

  const homeworkData: HomeworkRecord[] = [
    { id: '1', code: 'HW-MATH-101', title: 'Quadratic Equations & Roots Working', subject: 'Mathematics', class: '10-A', dueDate: 'Today, 11:59 PM', submitted: 38, totalStudents: 42, status: 'Published' },
    { id: '2', code: 'HW-PHYS-102', title: 'Electromagnetism Numerical Exercises', subject: 'Physics', class: '10-A', dueDate: 'Tomorrow, 06:00 PM', submitted: 24, totalStudents: 42, status: 'Published' },
    { id: '3', code: 'HW-CHEM-103', title: 'Chemical Reactions & Stoichiometry', subject: 'Chemistry', class: '10-B', dueDate: '14 Aug, 11:59 PM', submitted: 12, totalStudents: 40, status: 'Published' },
  ];

  const quizzesData: QuizRecord[] = [
    { id: '1', quizCode: 'QZ-MATH-01', title: 'Quadratic Equations Practice Test', subject: 'Mathematics', questionsCount: 10, duration: '20 min', avgScore: '8.4 / 10', status: 'Active' },
    { id: '2', quizCode: 'QZ-PHYS-02', title: 'Newton Laws of Motion Mock Quiz', subject: 'Physics', questionsCount: 15, duration: '30 min', avgScore: '9.1 / 10', status: 'Active' },
  ];

  // 15.1 Learning Dashboard Submodule Content (ONLY Dashboard has top KPI Stat Cards!)
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Welcome Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Good morning, Rahul 👋</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Here is what you need to complete today. Keep up your 6-day learning streak!</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-warning/10 border border-warning/30 rounded-lg text-xs font-bold text-warning">
            <Flame className="h-4 w-4 text-warning" />
            6 Day Streak
          </div>
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Learning AI
          </VFButton>
        </div>
      </div>

      {/* Feature 1 — Learning KPI Cards (Dashboard Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Today's Work" value="4 Tasks" icon={<FileText className="h-5 w-5 text-primary" />} trend="up" trendLabel="2 Completed" />
        <VFStatCard title="Due Soon" value="2 Items" icon={<Clock className="h-5 w-5 text-warning" />} description="1 Math · 1 Physics" />
        <VFStatCard title="Overall Progress" value="78%" icon={<TrendingUp className="h-5 w-5 text-success" />} trend="up" trendLabel="+4% This Week" />
        <VFStatCard title="Average Score" value="84 / 100" icon={<Award className="h-5 w-5 text-secondary" />} description="Class Rank: #4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Learning & Course Progress */}
        <VFSection title="Today's Scheduled Learning & Homework" className="lg:col-span-2 space-y-4">
          <div className="space-y-3 mb-4">
            <div className="p-4 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">📐 Mathematics · Quadratic Equations</span>
                <VFBadge variant="warning">Due Today, 11:59 PM</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Homework #101 · Complete questions 1 to 10 from Chapter 4 with full working.</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-primary">Progress: 80% Complete</span>
                <VFButton size="sm">Continue Homework</VFButton>
              </div>
            </div>

            <div className="p-4 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">🧪 Science · Chemical Reactions & Equations</span>
                <VFBadge variant="primary">Lesson · 20 min</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Interactive Video Lesson · Balancing chemical equations with step-by-step examples.</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-muted-foreground">Not Started</span>
                <VFButton size="sm" variant="outline">Start Lesson</VFButton>
              </div>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Assignment Code', accessorKey: 'code', cell: (r: HomeworkRecord) => <span className="font-mono font-bold text-primary">{r.code}</span> },
              { header: 'Title & Topic', accessorKey: 'title', cell: (r: HomeworkRecord) => <span className="font-bold text-foreground">{r.title}</span> },
              { header: 'Subject', accessorKey: 'subject' },
              { header: 'Class', accessorKey: 'class' },
              { header: 'Due Date', accessorKey: 'dueDate' },
              { header: 'Submissions', accessorKey: 'submitted', cell: (r: HomeworkRecord) => `${r.submitted} / ${r.totalStudents}` },
            ]}
            data={homeworkData}
            filterPlaceholder="Search homework title or subject..."
          />
        </VFSection>

        {/* Upcoming Work & Recent Activity */}
        <VFCard title="Upcoming Work & Recent Quiz Results">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-success/10 border border-success/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">⭐ Physics Quiz Result</span>
                <VFBadge variant="success">9 / 10</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Completed yesterday · Score: 90% (Newton Laws)</p>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">📚 English Reading Assignment</span>
                <VFBadge variant="primary">Due 13 Aug</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Chapter 3 Literature Analysis</p>
            </div>
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🧪 Chemistry Online Practice</span>
                <VFBadge variant="warning">Due 15 Aug</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">15 Practice Questions on Periodic Slabs</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Dedicated Homework & Assignments Submodule Content (NO REPEATING TOP STAT CARDS!)
  const homeworkContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Homework & Classroom Assignments Directory</h3>
          <p className="text-xs text-muted-foreground">Create assignments, track submission counts, grade student solutions, and issue digital feedback.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Homework</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Assignment Code', accessorKey: 'code', cell: (r: HomeworkRecord) => <span className="font-mono font-bold text-primary">{r.code}</span> },
          { header: 'Title & Topic', accessorKey: 'title', cell: (r: HomeworkRecord) => <span className="font-bold text-foreground">{r.title}</span> },
          { header: 'Subject', accessorKey: 'subject' },
          { header: 'Class', accessorKey: 'class' },
          { header: 'Due Date', accessorKey: 'dueDate' },
          { header: 'Submissions', accessorKey: 'submitted', cell: (r: HomeworkRecord) => `${r.submitted} / ${r.totalStudents}` },
        ]}
        data={homeworkData}
        filterPlaceholder="Search homework title or subject..."
      />
    </div>
  );

  // 15.2 Dedicated Lessons Submodule Content (NO REPEATING TOP STAT CARDS!)
  const lessonsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Course Lessons & Curriculum Topics Directory</h3>
          <p className="text-xs text-muted-foreground">Browse structured chapters, topics, video lessons, teacher notes, and learning objectives.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Lesson</VFButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VFCard title="Chapter 1 — Quadratic Equations">
          <div className="space-y-2 text-xs mt-1">
            <p className="text-muted-foreground">Topics: 4 Topics · 2 Videos · 1 Homework</p>
            <p className="font-bold text-success">Completion: 80% Completed</p>
            <VFButton size="sm" variant="outline" className="w-full mt-2">Open Chapter</VFButton>
          </div>
        </VFCard>
        <VFCard title="Chapter 2 — Arithmetic Progressions">
          <div className="space-y-2 text-xs mt-1">
            <p className="text-muted-foreground">Topics: 5 Topics · 3 Videos · 2 Practice Tests</p>
            <p className="font-bold text-primary">Completion: 45% Completed</p>
            <VFButton size="sm" variant="outline" className="w-full mt-2">Open Chapter</VFButton>
          </div>
        </VFCard>
        <VFCard title="Chapter 3 — Triangles & Geometry">
          <div className="space-y-2 text-xs mt-1">
            <p className="text-muted-foreground">Topics: 6 Topics · 4 Videos · 1 Assignment</p>
            <p className="font-bold text-muted-foreground">Completion: Not Started</p>
            <VFButton size="sm" variant="outline" className="w-full mt-2">Open Chapter</VFButton>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 15.5 Dedicated Quizzes & Practice Submodule Content (NO REPEATING TOP STAT CARDS!)
  const quizzesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Interactive Quizzes & Adaptive Practice Engine</h3>
          <p className="text-xs text-muted-foreground">MCQs, Fill-in-blanks, numerical questions, question bank pools, and instant explanations.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Quiz</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Quiz Code', accessorKey: 'quizCode', cell: (r: QuizRecord) => <span className="font-mono font-bold text-primary">{r.quizCode}</span> },
          { header: 'Quiz Title', accessorKey: 'title', cell: (r: QuizRecord) => <span className="font-bold text-foreground">{r.title}</span> },
          { header: 'Subject', accessorKey: 'subject' },
          { header: 'Questions', accessorKey: 'questionsCount', cell: (r: QuizRecord) => `${r.questionsCount} MCQs` },
          { header: 'Duration', accessorKey: 'duration' },
          { header: 'Class Avg Score', accessorKey: 'avgScore', cell: (r: QuizRecord) => <span className="font-mono font-bold text-success">{r.avgScore}</span> },
          { header: 'Status', accessorKey: 'status', cell: (r: QuizRecord) => <VFBadge variant="success">{r.status}</VFBadge> },
        ]}
        data={quizzesData}
        filterPlaceholder="Search quiz title or subject..."
      />
    </div>
  );

  // Submodule map — EVERY tab has its OWN clean dedicated view! No stat card repetition!
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    lessons: lessonsContent,
    homework: homeworkContent,
    resources: lessonsContent,
    quizzes: quizzesContent,
    evaluation: homeworkContent,
    'study-plans': lessonsContent,
    progress: homeworkContent,
    'teacher-workspace': homeworkContent,
    'analytics-settings': homeworkContent,
  };

  const submoduleTabs = (learningModule?.submodules || [
    { id: 'dashboard', label: 'Learning Dashboard' },
    { id: 'lessons', label: 'Lessons & Course Content' },
    { id: 'homework', label: 'Homework & Assignments' },
    { id: 'resources', label: 'Learning Resources' },
    { id: 'quizzes', label: 'Quizzes & Practice' },
    { id: 'evaluation', label: 'Submission & Evaluation' },
    { id: 'study-plans', label: 'Study Plans & Paths' },
    { id: 'progress', label: 'Student Progress' },
    { id: 'teacher-workspace', label: 'Teacher Workspace' },
    { id: 'analytics-settings', label: 'Analytics & Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <MonitorPlay className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || homeworkContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
