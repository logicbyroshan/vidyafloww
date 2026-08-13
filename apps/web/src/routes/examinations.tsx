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
  ClipboardList,
  FileText,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Send,
  Download,
  BarChart3,
  Calendar,
  FileCheck,
} from 'lucide-react';

export const Route = createFileRoute('/examinations')({
  component: ExaminationsPage,
});

function ExaminationsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const examData = [
    { code: 'EXAM-2026-T1', title: 'Term 1 Mid-Year Examination', session: '2026-2027', dates: '18 Sep – 28 Sep', status: 'Scheduled' },
    { code: 'EXAM-2026-UT2', title: 'Unit Test 2 (Class 10 & 12)', session: '2026-2027', dates: '22 Aug – 25 Aug', status: 'Active Live' },
    { code: 'EXAM-2026-UT1', title: 'Unit Test 1 (All Grades)', session: '2026-2027', dates: '10 Jul – 15 Jul', status: 'Completed' },
  ];

  const examColumns = [
    { header: 'Exam Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Examination Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Session', accessorKey: 'session' },
    { header: 'Exam Dates', accessorKey: 'dates' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Completed' ? 'success' : r.status === 'Active Live' ? 'warning' : 'primary'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Examination Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Exam Session" value="Term 1 (2026-27)" icon={<Calendar className="h-5 w-5 text-primary" />} trend="up" trendLabel="48 Papers Scheduled" />
        <VFStatCard title="Total Candidates" value="1,248 Students" icon={<Users className="h-5 w-5 text-emerald-500" />} trend="neutral" trendLabel="100% Enrolled" />
        <VFStatCard title="Marks Entry Status" value="84.2% Complete" icon={<FileCheck className="h-5 w-5 text-amber-500" />} trend="up" trendLabel="Evaluation On Track" />
        <VFStatCard title="Average Pass Rate" value="96.4%" icon={<Award className="h-5 w-5 text-purple-500" />} description="Unit Test 1 Results" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Exam Management
  // ----------------------------------------------------
  const examManagementContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Institutional Examinations Directory</h3>
          <p className="text-xs text-muted-foreground">Configure major term examinations, pre-board exams, and annual assessments.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Examination</VFButton>
      </div>
      <VFDataTable columns={examColumns} data={examData} filterPlaceholder="Search exam title..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Test Management
  // ----------------------------------------------------
  const testManagementContent = (
    <div className="space-y-4">
      <VFCard title="Unit Tests & Class Periodic Assessments">
        <p className="text-xs text-muted-foreground mb-3">Manage weekly surprise tests, unit quizzes, and subject lab practical tests.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Assessment Types
  // ----------------------------------------------------
  const assessmentTypesContent = (
    <div className="space-y-4">
      <VFCard title="Assessment Types & Evaluation Weightages">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Summative Examination (SE)</span>
            <p className="text-muted-foreground text-xs mt-1">Weightage: 60% · Written Board Exam Format</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Formative Assessment (FA)</span>
            <p className="text-muted-foreground text-xs mt-1">Weightage: 20% · Periodic Unit Quizzes</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Internal / Practical (IA)</span>
            <p className="text-muted-foreground text-xs mt-1">Weightage: 20% · Lab Notebooks & Viva Voce</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Exam Schedule
  // ----------------------------------------------------
  const scheduleContent = (
    <div className="space-y-4">
      <VFCard title="Examination Timetable & Invigilation Roster">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Date sheet schedules, hall assignments, and invigilator duty rotations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Subject & Paper Setup
  // ----------------------------------------------------
  const subjectPaperSetupContent = (
    <div className="space-y-4">
      <VFCard title="Subject Question Paper & Max Marks Configuration">
        <p className="text-xs text-muted-foreground mb-3">Set maximum theory marks (70/80), practical marks (20/30), and passing thresholds.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Student Exam Assignment
  // ----------------------------------------------------
  const studentAssignmentContent = (
    <div className="space-y-4">
      <VFCard title="Candidate Roll Number Allocation & Hall Ticket Issuance">
        <p className="text-xs text-muted-foreground mb-3">Generate candidate roll numbers and issue exam admit cards with attendance eligibility checks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Marks Entry
  // ----------------------------------------------------
  const marksEntryContent = (
    <div className="space-y-4">
      <VFCard title="Teacher Marks Entry Console">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Fast keypad score entry with auto-grade calculation and validation bounds.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Marks Verification
  // ----------------------------------------------------
  const marksVerificationContent = (
    <div className="space-y-4">
      <VFCard title="HOD & Principal Marks Audit & Verification Radar">
        <p className="text-xs text-muted-foreground mb-3">Audit mark entries, approve grade alterations, and lock final mark registers.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Grades
  // ----------------------------------------------------
  const gradesContent = (
    <div className="space-y-4">
      <VFCard title="Grading Scale Schema (A1 to E2 Framework)">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mt-2 font-mono">
          {['A1: 91 - 100', 'A2: 81 - 90', 'B1: 71 - 80', 'B2: 61 - 70', 'C1: 51 - 60', 'C2: 41 - 50', 'D: 33 - 40', 'E: Below 33'].map((g, i) => (
            <div key={i} className="p-2.5 bg-muted/40 rounded border border-border/60 text-center font-bold text-foreground">{g}</div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Remarks
  // ----------------------------------------------------
  const remarksContent = (
    <div className="space-y-4">
      <VFCard title="Teacher & Class Teacher Report Card Remarks Library">
        <p className="text-xs text-muted-foreground mb-3">Pre-approved teacher feedback phrases and customized student performance comments.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Result Calculation
  // ----------------------------------------------------
  const resultCalculationContent = (
    <div className="space-y-4">
      <VFCard title="Automated Result & GPA Calculation Engine">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Calculate aggregate percentages, weighted GPAs, best-of-5 subject totals, and grace marks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Result Processing
  // ----------------------------------------------------
  const resultProcessingContent = (
    <div className="space-y-4">
      <VFCard title="Batch Result Processing & Moderation Control">
        <p className="text-xs text-muted-foreground mb-3">Apply moderation rules, detention lists, and pass/fail status flags.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Result Publishing
  // ----------------------------------------------------
  const resultPublishingContent = (
    <div className="space-y-4">
      <VFCard title="Result Publishing Pipeline to Student & Parent App">
        <p className="text-xs text-muted-foreground mb-3">Publish results online with digital signatures, OTP verification, and parent SMS alerts.</p>
        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Publish Term 1 Results Live</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Report Cards
  // ----------------------------------------------------
  const reportCardsContent = (
    <div className="space-y-4">
      <VFCard title="CBSE Format Comprehensive Digital Report Card Studio">
        <p className="text-xs text-muted-foreground mb-3">Generate printable PDF report cards with QR verification and school seal signatures.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Bulk Export Class 10 Report Cards (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Rank & Position
  // ----------------------------------------------------
  const rankPositionContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VFStatCard title="Class 10 Rank 1" value="Aditya Verma (98.6%)" icon={<Award className="h-5 w-5 text-amber-500" />} trend="up" trendLabel="Top Scholar" />
        <VFStatCard title="Class 10 Rank 2" value="Priya Sharma (97.8%)" icon={<Award className="h-5 w-5 text-slate-400" />} trend="up" trendLabel="High Honors" />
        <VFStatCard title="Class 10 Rank 3" value="Rahul Gupta (96.4%)" icon={<Award className="h-5 w-5 text-amber-700" />} trend="up" trendLabel="Honors" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — Result Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Examination Analytics & Subject Pass Percentage Reports">
        <p className="text-xs text-muted-foreground mb-3">Export subject performance comparison graphs, failure rates, and board statistics.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 18 — Examination Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Examination System Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Passing Threshold %" defaultValue="33.0%" />
          <VFSelect label="Default Grading Scale" options={[{ label: 'CBSE 9-Point Scale (A1 to E2)', value: 'cbse9' }, { label: '4-Point GPA System', value: 'gpa4' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 18 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Examination Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'exam-management', label: 'Exam Management', icon: <ClipboardList className="h-3.5 w-3.5" />, content: examManagementContent },
    { id: 'test-management', label: 'Test Management', icon: <FileText className="h-3.5 w-3.5" />, content: testManagementContent },
    { id: 'assessment-types', label: 'Assessment Types', icon: <Award className="h-3.5 w-3.5" />, content: assessmentTypesContent },
    { id: 'schedule', label: 'Exam Schedule', icon: <Calendar className="h-3.5 w-3.5" />, content: scheduleContent },
    { id: 'subject-paper-setup', label: 'Subject & Paper Setup', icon: <FileText className="h-3.5 w-3.5" />, content: subjectPaperSetupContent },
    { id: 'student-assignment', label: 'Student Exam Assignment', icon: <Users className="h-3.5 w-3.5" />, content: studentAssignmentContent },
    { id: 'marks-entry', label: 'Marks Entry', icon: <FileCheck className="h-3.5 w-3.5" />, content: marksEntryContent },
    { id: 'marks-verification', label: 'Marks Verification', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: marksVerificationContent },
    { id: 'grades', label: 'Grades', icon: <Award className="h-3.5 w-3.5" />, content: gradesContent },
    { id: 'remarks', label: 'Remarks', icon: <FileText className="h-3.5 w-3.5" />, content: remarksContent },
    { id: 'result-calculation', label: 'Result Calculation', icon: <TrendingUp className="h-3.5 w-3.5" />, content: resultCalculationContent },
    { id: 'result-processing', label: 'Result Processing', icon: <FileCheck className="h-3.5 w-3.5" />, content: resultProcessingContent },
    { id: 'result-publishing', label: 'Result Publishing', icon: <Send className="h-3.5 w-3.5" />, content: resultPublishingContent },
    { id: 'report-cards', label: 'Report Cards', icon: <Download className="h-3.5 w-3.5" />, content: reportCardsContent },
    { id: 'rank-position', label: 'Rank & Position', icon: <Award className="h-3.5 w-3.5" />, content: rankPositionContent },
    { id: 'reports', label: 'Result Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Examination Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
