import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
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
  BookOpen,
  Edit3,
  Award,
  Sparkles,
  Bot,
  Send,
  Calendar,
  Ticket,
  Grid,
  BarChart,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Check,
  Plus,
  Download,
  FileCheck,
  Users,
  ShieldCheck,
  Printer,
  RefreshCw,
  Lock,
} from 'lucide-react';

export const Route = createFileRoute('/examinations')({
  component: ExaminationsPage,
});

// Mock Data Types
interface QuestionBankItem {
  id: string;
  code: string;
  question: string;
  subject: string;
  class: string;
  chapter: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'Short' | 'Long' | 'Numerical';
  marks: number;
  status: 'Approved' | 'Review' | 'Draft';
}

interface StudentMarksRecord {
  id: string;
  rollNo: string;
  name: string;
  theory: number;
  practical: number;
  internal: number;
  total: number;
  grade: string;
  status: 'Pass' | 'Fail' | 'Absent';
}

function ExaminationsPage() {
  // Global State Variables
  const [selectedExam, setSelectedExam] = React.useState<string>('Half-Yearly Examination 2027');
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 10-A');
  const [selectedSubject, setSelectedSubject] = React.useState<string>('Mathematics');
  const [activeWizardStep, setActiveWizardStep] = React.useState<number>(1);
  const [aiPaperPrompt, setAiPaperPrompt] = React.useState<string>('');
  const [aiGeneratedPaper, setAiGeneratedPaper] = React.useState<string | null>(null);
  const [aiAnalysisPrompt, setAiAnalysisPrompt] = React.useState<string>('');
  const [aiAnalysisResponse, setAiAnalysisResponse] = React.useState<string | null>(null);
  const [isExamLocked] = React.useState<boolean>(false);

  // Question Bank Mock State (Submodule 7.4)
  const [questionBank] = React.useState<QuestionBankItem[]>([
    { id: '1', code: 'Q-101', question: 'What is the SI unit of force?', subject: 'Physics', class: 'Class 10', chapter: 'Mechanics', difficulty: 'Easy', type: 'MCQ', marks: 1, status: 'Approved' },
    { id: '2', code: 'Q-102', question: 'State Newton’s Second Law of Motion and derive F = ma.', subject: 'Physics', class: 'Class 10', chapter: 'Mechanics', difficulty: 'Medium', type: 'Short', marks: 3, status: 'Approved' },
    { id: '3', code: 'Q-103', question: 'Explain the principle of conservation of momentum with a rocket launch case study.', subject: 'Physics', class: 'Class 10', chapter: 'Mechanics', difficulty: 'Hard', type: 'Long', marks: 5, status: 'Approved' },
    { id: '4', code: 'Q-104', question: 'Calculate the acceleration of a 5kg body acted upon by a 20N force.', subject: 'Physics', class: 'Class 10', chapter: 'Mechanics', difficulty: 'Medium', type: 'Numerical', marks: 2, status: 'Review' },
  ]);

  // Student Marks Spreadsheet State (Submodule 7.9)
  const [marksData, setMarksData] = React.useState<StudentMarksRecord[]>([
    { id: '1', rollNo: '1001', name: 'Rahul Sharma', theory: 68, practical: 18, internal: 9, total: 95, grade: 'A1', status: 'Pass' },
    { id: '2', rollNo: '1002', name: 'Amit Patel', theory: 52, practical: 15, internal: 8, total: 75, grade: 'B1', status: 'Pass' },
    { id: '3', rollNo: '1003', name: 'Neha Jain', theory: 74, practical: 19, internal: 10, total: 100, grade: 'A1', status: 'Pass' },
    { id: '4', rollNo: '1004', name: 'Riya Singh', theory: 22, practical: 10, internal: 6, total: 38, grade: 'E', status: 'Fail' },
    { id: '5', rollNo: '1005', name: 'Vikas Kumar', theory: 61, practical: 16, internal: 8, total: 85, grade: 'A2', status: 'Pass' },
  ]);

  const handleTheoryChange = (id: string, newTheory: number) => {
    setMarksData(prev => prev.map(m => {
      if (m.id === id) {
        const clampedTheory = Math.min(80, Math.max(0, newTheory));
        const total = clampedTheory + m.practical + m.internal;
        let grade = 'E';
        let status: 'Pass' | 'Fail' = 'Fail';
        if (total >= 91) grade = 'A1';
        else if (total >= 81) grade = 'A2';
        else if (total >= 71) grade = 'B1';
        else if (total >= 61) grade = 'B2';
        else if (total >= 51) grade = 'C1';
        else if (total >= 40) grade = 'C2';
        if (total >= 40) status = 'Pass';
        return { ...m, theory: clampedTheory, total, grade, status };
      }
      return m;
    }));
  };

  // ----------------------------------------------------
  // SUBMODULE 7.1 — Examination Configuration (10 Features)
  // ----------------------------------------------------
  const examConfigContent = (
    <div className="space-y-4">
      {/* 1. Exam Types Catalog */}
      <VFCard title="1. Master Examination Types & Assessment Codes">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs mt-2">
          {['Unit Test', 'Periodic Test', 'Half-Yearly', 'Annual Exam', 'Pre-Board', 'Practical Exam', 'Internal Assessment', 'Entrance Test', 'Weekly Quiz', 'Custom Exam'].map((t, idx) => (
            <div key={t} className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <span className="font-bold text-foreground truncate">{t}</span>
              <VFBadge variant={idx < 7 ? 'success' : 'secondary'}>{idx < 7 ? 'Active' : 'Draft'}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>

      {/* 2 & 3. Weighted Components & Exam Scheme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="2. Weightage Distribution (Term 1)">
          <div className="space-y-2 text-xs mt-2">
            {[
              { component: 'Written Theory Exam', weight: '70%', max: '70 Marks', color: 'bg-primary/20 text-primary' },
              { component: 'Practical / Lab Work', weight: '15%', max: '15 Marks', color: 'bg-emerald-500/20 text-emerald-500' },
              { component: 'Internal Project / Assignment', weight: '10%', max: '10 Marks', color: 'bg-amber-500/20 text-amber-500' },
              { component: 'Classroom Attendance Weight', weight: '5%', max: '5 Marks', color: 'bg-blue-500/20 text-blue-500' },
            ].map((c, i) => (
              <div key={i} className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <span className="font-bold text-foreground">{c.component}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className={`px-2 py-0.5 rounded font-bold text-xs ${c.color}`}>{c.weight}</span>
                  <span className="text-muted-foreground text-[11px]">{c.max}</span>
                </div>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="3, 4 & 5. Marking & Result Criteria Rules">
          <div className="grid grid-cols-2 gap-3 text-xs mt-2">
            <VFInput label="Theory Max Marks" defaultValue="80 Marks" />
            <VFInput label="Passing Threshold" defaultValue="33.0%" />
            <VFInput label="Negative Marking" defaultValue="0.0 (Disabled)" />
            <VFInput label="Grace Marks Limit" defaultValue="Max 3 Marks" />
            <VFInput label="GPA Formula" defaultValue="CBSE 10-Point Scale" />
            <VFInput label="Rank Calculation" defaultValue="Class & Section Rank" />
          </div>
        </VFCard>
      </div>

      {/* 6, 7, 8 & 9. Promotion Rules, Calendar & Remarks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="6. Promotion Criteria Rules">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs space-y-1 mt-1">
            <span className="font-bold text-emerald-500 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> CBSE Standard Promotion Policy
            </span>
            <p className="text-muted-foreground text-[11px]">Student must score overall &ge; 33% in aggregate and pass at least 5 major subjects.</p>
          </div>
        </VFCard>

        <VFCard title="7. Exam Session Calendar Deadlines">
          <div className="space-y-1.5 text-xs font-mono mt-1">
            <div className="p-2 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>Exam Window:</span> <strong className="text-foreground">15 Mar – 28 Mar</strong>
            </div>
            <div className="p-2 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>Marks Lock Date:</span> <strong className="text-foreground">05 Apr 2027</strong>
            </div>
            <div className="p-2 bg-muted/40 rounded border border-border/60 flex justify-between">
              <span>Result Release:</span> <strong className="text-primary font-bold">10 Apr 2027</strong>
            </div>
          </div>
        </VFCard>

        <VFCard title="8 & 9. Remarks & Lock Configuration">
          <div className="space-y-2 text-xs mt-1">
            <VFSelect
              label="Default Remarks Set"
              options={[
                { label: 'Standard CBSE (Excellent / Good / Needs Imp)', value: 'CBSE' },
                { label: 'Qualitative Skills (Conceptual / Applied)', value: 'Qualitative' },
              ]}
            />
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-foreground">Lock Master Config:</span>
              <VFBadge variant={isExamLocked ? 'danger' : 'success'}>{isExamLocked ? '🔒 Locked' : '🟢 Open'}</VFBadge>
            </div>
          </div>
        </VFCard>
      </div>

      {/* 10. Examination Setup Wizard */}
      <VFCard title="10. First-Time Examination Setup Wizard">
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between text-xs overflow-x-auto custom-scrollbar pb-2">
            {['1 Exam Type', '2 Scheme', '3 Subjects', '4 Marks Rules', '5 Grades', '6 Promotion', '7 Result Settings', '8 Review', '9 Activate'].map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = activeWizardStep === stepNum;
              const isCompleted = activeWizardStep > stepNum;
              return (
                <button
                  key={step}
                  onClick={() => setActiveWizardStep(stepNum)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs shrink-0 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : isCompleted
                      ? 'bg-success/15 text-success border border-success/30'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="h-3 w-3" /> : stepNum}
                  <span>{step}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3.5 bg-muted/30 border border-border/60 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground text-xs">
                Step {activeWizardStep}: {['Exam Type Definition', 'Assessment Scheme', 'Subject Allocation', 'Marking & Passing Rules', 'Grading Scale Setup', 'Promotion Rules', 'Result Release Settings', 'Configuration Review', 'Final Activation'][activeWizardStep - 1]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Define master parameters for the 2027–28 Academic Session.</p>
            </div>
            <div className="flex items-center gap-2">
              <VFButton size="sm" variant="outline" disabled={activeWizardStep === 1} onClick={() => setActiveWizardStep(prev => Math.max(1, prev - 1))}>
                Back
              </VFButton>
              <VFButton size="sm" disabled={activeWizardStep === 9} onClick={() => setActiveWizardStep(prev => Math.min(9, prev + 1))}>
                Next Step
              </VFButton>
            </div>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.2 — Examination Management (10 Features)
  // ----------------------------------------------------
  const examMgmtContent = (
    <div className="space-y-4">
      {/* 12. Examination Dashboard KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Target Classes" value="18 Classes" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="Classes 6 to 12" />
        <VFStatCard title="Scheduled Papers" value="72 Papers" icon={<Calendar className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="15 Mar - 28 Mar" />
        <VFStatCard title="Exams Completed" value="41 / 72" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="57% Progress" />
        <VFStatCard title="Results Ready" value="8 Classes" icon={<Award className="h-5 w-5 text-amber-500" />} trend="up" trendLabel="Ready for Review" />
      </div>

      {/* 11 & 15. Active Exams List & Lifecycle Stepper */}
      <VFSection title="11, 13 & 15. Active Examinations & Lifecycle Status Pipeline">
        <VFDataTable
          columns={[
            { header: 'Examination Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Target Grades', accessorKey: 'grades' },
            { header: 'Papers', accessorKey: 'papers', cell: (r: any) => <span className="font-mono text-xs">{r.papers}</span> },
            { header: 'Dates', accessorKey: 'dates', cell: (r: any) => <span className="font-mono text-xs">{r.dates}</span> },
            { header: 'Lifecycle Stage', accessorKey: 'stage', cell: (r: any) => <VFBadge variant={r.stage === 'Ongoing' ? 'warning' : r.stage === 'Completed' ? 'success' : 'primary'}>{r.stage}</VFBadge> },
            { header: 'Actions', accessorKey: 'id', cell: () => (
              <div className="flex gap-1">
                <VFButton size="sm" variant="outline" className="h-7 px-2 text-xs">Manage</VFButton>
                <VFButton size="sm" variant="outline" className="h-7 px-2 text-xs">Instructions</VFButton>
              </div>
            ) },
          ]}
          data={[
            { id: '1', name: 'Half-Yearly Examination 2027', grades: 'Classes 6 – 10', papers: '42 Papers', dates: '15 Mar – 25 Mar', stage: 'Ongoing' },
            { id: '2', name: 'Class 12 Pre-Board Exam', grades: 'Class 12 (Sci/Com)', papers: '10 Papers', dates: '01 Mar – 10 Mar', stage: 'Completed' },
            { id: '3', name: 'Unit Test 2 (Class 8)', grades: 'Class 8-A, 8-B', papers: '6 Papers', dates: '05 Apr – 08 Apr', stage: 'Scheduled' },
          ]}
        />
      </VFSection>

      {/* 16, 17, 18 & 20. Instructions, Regulations, Documents & Archive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="16 & 17. Exam Regulations & Guidelines">
          <div className="space-y-2 text-xs mt-1">
            <div className="p-2.5 bg-muted/40 rounded border border-border/60">
              <span className="font-bold text-foreground">Calculators:</span> Non-programmable allowed for Class 11-12.
            </div>
            <div className="p-2.5 bg-muted/40 rounded border border-border/60">
              <span className="font-bold text-foreground">Entry Limit:</span> Late arrival prohibited after 15 mins.
            </div>
          </div>
        </VFCard>

        <VFCard title="18. Exam Printable Documents Center">
          <div className="space-y-2 mt-1">
            <VFButton size="sm" variant="outline" className="w-full justify-start text-xs" leftIcon={<Printer className="h-3.5 w-3.5" />}>
              Print Attendance Roster Sheet
            </VFButton>
            <VFButton size="sm" variant="outline" className="w-full justify-start text-xs" leftIcon={<Printer className="h-3.5 w-3.5" />}>
              Print Invigilation Duty List
            </VFButton>
          </div>
        </VFCard>

        <VFCard title="20. Examination Archive Security">
          <div className="space-y-2 text-xs mt-1">
            <p className="text-muted-foreground text-[11px]">Historical examination records are immutably archived upon result publication.</p>
            <VFButton size="sm" variant="outline" className="w-full text-xs" leftIcon={<Lock className="h-3.5 w-3.5" />}>
              View Historical Exam Archive
            </VFButton>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.3 — Test & Assessment Management (9 Features)
  // ----------------------------------------------------
  const testMgmtContent = (
    <div className="space-y-4">
      {/* 21 & 22. Create Test Form & Assessment Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="21. Create Formative Class Test / Quiz" className="lg:col-span-1">
          <div className="space-y-3 text-xs mt-1">
            <VFInput label="Test Title" defaultValue="Algebra Chapter Test" />
            <VFSelect
              label="Target Class"
              options={[{ label: 'Class 8-A', value: 'Class 8-A' }, { label: 'Class 9-B', value: 'Class 9-B' }]}
            />
            <VFInput label="Max Marks" defaultValue="20 Marks" />
            <VFInput label="Duration" defaultValue="40 Minutes" />
            <VFButton size="sm" className="w-full" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              Create & Schedule Test
            </VFButton>
          </div>
        </VFCard>

        {/* 25, 26 & 27. Continuous Assessment & Practical Console */}
        <VFSection title="25 & 26. Continuous Formative Assessment Tracker" className="lg:col-span-2">
          <VFDataTable
            columns={[
              { header: 'Assessment Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
              { header: 'Class / Subject', accessorKey: 'subject' },
              { header: 'Max Marks', accessorKey: 'max', cell: (r: any) => <span className="font-mono text-xs">{r.max}</span> },
              { header: 'Submitted', accessorKey: 'submitted', cell: (r: any) => <span className="font-mono text-xs text-emerald-500 font-bold">{r.submitted}</span> },
              { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
            ]}
            data={[
              { title: 'Algebra Weekly Quiz 2', subject: 'Class 8A • Math', max: '20 Marks', submitted: '32 / 34', status: 'Evaluated' },
              { title: 'Physics Optics Practical Task', subject: 'Class 10A • Physics', max: '15 Marks', submitted: '28 / 30', status: 'Evaluating' },
              { title: 'Chemistry Lab Observation', subject: 'Class 10A • Chem', max: '10 Marks', submitted: '30 / 30', status: 'Completed' },
            ]}
          />
        </VFSection>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.4 — Question Bank (10 Features)
  // ----------------------------------------------------
  const questionBankContent = (
    <div className="space-y-4">
      {/* 30 & 39. Question Repository Search & AI Generator */}
      <div className="flex flex-wrap items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <VFSelect
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(String(e.target.value))}
            options={[{ label: 'Physics', value: 'Physics' }, { label: 'Mathematics', value: 'Mathematics' }, { label: 'Chemistry', value: 'Chemistry' }]}
          />
          <VFSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(String(e.target.value))}
            options={[{ label: 'Class 10', value: 'Class 10-A' }, { label: 'Class 9', value: 'Class 9-A' }]}
          />
          <VFInput placeholder="Search question tags (#algebra, #mechanics)..." className="w-56" />
        </div>

        {/* 39. AI Question Generator Trigger */}
        <VFButton size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary-foreground" />}>
          + AI Generate Questions
        </VFButton>
      </div>

      {/* 30, 31, 32, 33 & 36. Question Master Table */}
      <VFSection title="30, 31 & 32. Reusable Question Repository & Bloom Metadata">
        <VFDataTable
          columns={[
            { header: 'Code', accessorKey: 'code', cell: (r: QuestionBankItem) => <span className="font-mono text-xs font-bold text-primary">{r.code}</span> },
            { header: 'Question Prompt', accessorKey: 'question', cell: (r: QuestionBankItem) => <span className="font-bold text-foreground text-xs">{r.question}</span> },
            { header: 'Chapter', accessorKey: 'chapter' },
            { header: 'Type', accessorKey: 'type', cell: (r: QuestionBankItem) => <VFBadge variant="primary">{r.type}</VFBadge> },
            { header: 'Difficulty', accessorKey: 'difficulty', cell: (r: QuestionBankItem) => <VFBadge variant={r.difficulty === 'Easy' ? 'success' : r.difficulty === 'Medium' ? 'warning' : 'danger'}>{r.difficulty}</VFBadge> },
            { header: 'Marks', accessorKey: 'marks', cell: (r: QuestionBankItem) => <span className="font-mono text-xs font-bold">{r.marks}m</span> },
            { header: 'Review Status', accessorKey: 'status', cell: (r: QuestionBankItem) => <VFBadge variant={r.status === 'Approved' ? 'success' : 'warning'}>{r.status}</VFBadge> },
          ]}
          data={questionBank}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.5 — Question Paper Designer (10 Features)
  // ----------------------------------------------------
  const paperDesignerContent = (
    <div className="space-y-4">
      {/* 49. AI Difficulty-Balanced Question Paper Generator */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4 shadow-xs">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">49. AI Question Paper Generator & Blueprint Compiler</h3>
            <p className="text-xs text-muted-foreground">Generates difficulty-balanced papers (30% Easy, 50% Medium, 20% Hard) adhering to CBSE blueprint rules.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <VFInput
            placeholder="e.g. Class 10 Physics Mechanics Chapters 1-4, 80 Marks, 30% Application questions..."
            value={aiPaperPrompt}
            onChange={(e: any) => setAiPaperPrompt(e.target.value)}
          />
          <VFButton
            size="sm"
            onClick={() => {
              if (aiPaperPrompt) {
                setAiGeneratedPaper(
                  `📝 AI Question Paper Compiled for Class 10 Physics Mechanics (80 Marks)\n\nSection A: MCQs (10 x 1m = 10 Marks)\n1. Which of the following is the SI unit of force?\n   a) Joule  b) Newton  c) Watt  d) Pascal\n\nSection B: Short Answer (5 x 3m = 15 Marks)\n2. State Newton's Second Law and derive F = ma.\n\nSection C: Long Answer Case Study (3 x 5m = 15 Marks)\n3. Explain principle of conservation of energy with rocket launch dynamics.`
                );
              }
            }}
          >
            Compile Paper
          </VFButton>
        </div>

        {aiGeneratedPaper && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground font-mono space-y-2 animate-fade-in">
            <p className="whitespace-pre-line leading-relaxed">{aiGeneratedPaper}</p>
          </div>
        )}
      </div>

      {/* 41, 43, 44 & 45. Paper Sections, Drag-Drop Builder & Marks Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="41 & 44. Live Paper Structure & Marks Distribution" className="lg:col-span-2">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { sec: 'Section A', desc: '10 Multiple Choice Questions (1m each)', marks: '10 Marks', status: 'Balanced' },
              { sec: 'Section B', desc: '5 Short Answer Questions (3m each)', marks: '15 Marks', status: 'Balanced' },
              { sec: 'Section C', desc: '4 Long Answer Questions (5m each)', marks: '20 Marks', status: 'Balanced' },
              { sec: 'Section D', desc: '2 Case Study Questions (5m each)', marks: '10 Marks', status: 'Balanced' },
            ].map((s, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">{s.sec} • {s.desc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-primary">{s.marks}</span>
                  <VFBadge variant="success">{s.status}</VFBadge>
                </div>
              </div>
            ))}

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-500">
              <span>Total Calculated Paper Score:</span>
              <span className="font-mono text-sm">80 / 80 Marks 🟢 100% Match</span>
            </div>
          </div>
        </VFCard>

        {/* 48. Paper Shuffling Set Generator */}
        <VFCard title="48. Paper Shuffling (Set A / B / C / D)" className="lg:col-span-1">
          <div className="space-y-2 text-xs mt-1">
            <p className="text-muted-foreground text-[11px]">Shuffles question sequence and options while keeping difficulty blueprint identical.</p>
            <VFButton size="sm" variant="outline" className="w-full text-xs" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
              Generate Set A, B, C, D PDFs
            </VFButton>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.6 — Exam Scheduling (8 Features)
  // ----------------------------------------------------
  const examSchedulingContent = (
    <div className="space-y-4">
      {/* 50 & 51. Exam Timetable & Conflict Detection */}
      <VFSection title="50 & 51. Master Datesheet & Conflict Detection Radar">
        <VFDataTable
          columns={[
            { header: 'Date', accessorKey: 'date', cell: (r: any) => <span className="font-mono font-bold text-foreground">{r.date}</span> },
            { header: 'Time Slot', accessorKey: 'time', cell: (r: any) => <span className="font-mono text-xs">{r.time}</span> },
            { header: 'Class', accessorKey: 'class' },
            { header: 'Subject', accessorKey: 'subject', cell: (r: any) => <span className="font-bold text-primary">{r.subject}</span> },
            { header: 'Conflict Check', accessorKey: 'conflict', cell: (r: any) => <VFBadge variant={r.conflict === 'Clean' ? 'success' : 'danger'}>{r.conflict}</VFBadge> },
          ]}
          data={[
            { date: '18 Mar 2027', time: '09:00 AM – 12:00 PM', class: 'Class 10', subject: 'Mathematics', conflict: 'Clean' },
            { date: '20 Mar 2027', time: '09:00 AM – 12:00 PM', class: 'Class 10', subject: 'Science', conflict: 'Clean' },
            { date: '22 Mar 2027', time: '09:00 AM – 12:00 PM', class: 'Class 10', subject: 'English', conflict: 'Clean' },
          ]}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.7 — Hall Ticket Management (8 Features)
  // ----------------------------------------------------
  const hallTicketContent = (
    <div className="space-y-4">
      {/* 61. Hall Ticket Status Tracking */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Eligible Students" value="120 Students" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="Class 10" />
        <VFStatCard title="Admit Cards Generated" value="120 / 120" icon={<Ticket className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="100% Ready" />
        <VFStatCard title="Downloaded by Parents" value="98 Students" icon={<Download className="h-5 w-5 text-primary" />} trend="up" trendLabel="81.6% Downloaded" />
        <VFStatCard title="Held / Fee Dues Flags" value="0 Holds" icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />} trend="neutral" trendLabel="All Cleared" />
      </div>

      {/* 58 & 62. Hall Ticket Preview & QR Token */}
      <VFCard title="58 & 62. Student Hall Ticket Preview & Encrypted QR Verification Token">
        <div className="p-4 bg-muted/40 rounded-xl border border-border/60 max-w-xl space-y-3 text-xs">
          <div className="flex justify-between items-start border-b border-border/60 pb-3">
            <div>
              <h4 className="font-bold text-foreground text-sm">SPRINGFIELD ACADEMY • HALL TICKET</h4>
              <p className="text-muted-foreground text-[11px]">Half-Yearly Examination 2027 • Roll #: 1001</p>
            </div>
            <div className="h-10 w-10 bg-primary/20 text-primary font-mono text-[10px] font-bold rounded flex items-center justify-center border border-primary/40">
              QR
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>Student Name: <strong className="text-foreground">Rahul Sharma</strong></div>
            <div>Class: <strong className="text-foreground">10-A</strong></div>
            <div>Father Name: <strong className="text-foreground">Suresh Sharma</strong></div>
            <div>Exam Venue: <strong className="text-foreground">Hall 1 (Desk A-04)</strong></div>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.8 — Exam Seating & Invigilation (10 Features)
  // ----------------------------------------------------
  const seatingContent = (
    <div className="space-y-4">
      {/* 68 & 75. Visual Seating Plan & Live Room Dashboard */}
      <VFSection title="68 & 75. Exam Hall 1 Visual Seating Layout Plan & Live Status">
        <div className="p-4 bg-card border border-border rounded-xl space-y-3 shadow-xs text-xs">
          <div className="flex justify-between items-center border-b border-border pb-2">
            <span className="font-bold text-foreground">Exam Hall 1 (Capacity: 60) • Invigilator: Mrs. Patel</span>
            <VFBadge variant="success">🟢 Exam Ongoing (09:00 AM – 12:00 PM)</VFBadge>
          </div>

          <div className="text-center font-bold text-muted-foreground py-1 bg-muted/40 rounded border border-border/40 uppercase tracking-widest text-[10px]">
            FRONT — BLACKBOARD / INVIGILATOR DESK
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            {[
              { desk: 'A1', student: 'Rahul (10A)', roll: '1001' },
              { desk: 'A2', student: 'Neha (9B)', roll: '902' },
              { desk: 'A3', student: 'Amit (10A)', roll: '1002' },
              { desk: 'A4', student: 'Riya (9B)', roll: '904' },
              { desk: 'B1', student: 'Vikas (10A)', roll: '1005' },
              { desk: 'B2', student: 'Priya (9B)', roll: '906' },
              { desk: 'B3', student: 'Rohan (10A)', roll: '1007' },
              { desk: 'B4', student: 'Ananya (9B)', roll: '908' },
            ].map(s => (
              <div key={s.desk} className="p-2.5 bg-muted/40 rounded-lg border border-border/60">
                <span className="font-mono font-bold text-primary">{s.desk}</span>
                <p className="font-bold text-foreground mt-0.5">{s.student}</p>
                <p className="text-muted-foreground text-[9px]">Roll #{s.roll}</p>
              </div>
            ))}
          </div>
        </div>
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.9 — Marks & Evaluation (12 Features)
  // ----------------------------------------------------
  const marksEvaluationContent = (
    <div className="space-y-4">
      {/* 76 & 78. Marks Entry Spreadsheet Grid */}
      <div className="flex flex-wrap items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <VFSelect
            value={selectedExam}
            onChange={(e) => setSelectedExam(String(e.target.value))}
            options={[{ label: 'Half-Yearly Examination 2027', value: 'Half-Yearly Examination 2027' }]}
          />
          <VFSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(String(e.target.value))}
            options={[{ label: 'Class 10-A', value: 'Class 10-A' }]}
          />
          <VFSelect
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(String(e.target.value))}
            options={[{ label: 'Mathematics', value: 'Mathematics' }]}
          />
        </div>

        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
          Lock & Submit Marks to HOD
        </VFButton>
      </div>

      <VFSection title={`76, 78 & 80. ${selectedClass} ${selectedSubject} Marks Gradebook Spreadsheet`}>
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
          <div className="space-y-2 text-xs">
            {marksData.map((m) => (
              <div key={m.id} className="p-3 bg-muted/30 rounded-xl border border-border/60 flex items-center justify-between gap-3">
                <div className="w-48">
                  <span className="font-mono text-[11px] font-bold text-primary">Roll #{m.rollNo}</span>
                  <p className="font-bold text-foreground text-sm">{m.name}</p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-muted-foreground block">Theory (80m)</label>
                    <input
                      type="number"
                      value={m.theory}
                      onChange={(e) => handleTheoryChange(m.id, parseInt(e.target.value) || 0)}
                      className="w-16 h-7 text-center rounded border border-border bg-background font-mono font-bold text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block">Practical (20m)</label>
                    <span className="font-mono font-bold text-foreground">{m.practical}m</span>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block">Internal (10m)</label>
                    <span className="font-mono font-bold text-foreground">{m.internal}m</span>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block">Total Score</label>
                    <span className="font-mono font-bold text-primary text-sm">{m.total}m</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${m.grade.startsWith('A') ? 'bg-emerald-500/20 text-emerald-500' : 'bg-destructive/20 text-destructive'}`}>
                    Grade: {m.grade}
                  </span>
                  <VFBadge variant={m.status === 'Pass' ? 'success' : 'danger'}>{m.status}</VFBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.10 — Grades & Result Processing (10 Features)
  // ----------------------------------------------------
  const gradesResultsContent = (
    <div className="space-y-4">
      {/* 88. Grade Scale Catalog */}
      <VFCard title="88. CBSE 10-Point Grade Scale Boundaries">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mt-2 font-mono">
          {[
            { range: '91 – 100%', grade: 'A1', point: '10.0' },
            { range: '81 – 90%', grade: 'A2', point: '9.0' },
            { range: '71 – 80%', grade: 'B1', point: '8.0' },
            { range: '61 – 70%', grade: 'B2', point: '7.0' },
            { range: '51 – 60%', grade: 'C1', point: '6.0' },
            { range: '41 – 50%', grade: 'C2', point: '5.0' },
            { range: '33 – 40%', grade: 'D', point: '4.0' },
            { range: '< 33%', grade: 'E', point: '0.0' },
          ].map(g => (
            <div key={g.grade} className="p-2 bg-muted/40 rounded border border-border/60 flex justify-between items-center">
              <span>{g.range}</span>
              <strong className="text-primary">{g.grade} ({g.point})</strong>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.11 — Report Cards & Result Publishing (10 Features)
  // ----------------------------------------------------
  const reportCardsContent = (
    <div className="space-y-4">
      {/* 102 & 107. Student Result Portal & QR Authenticator */}
      <VFCard title="102 & 107. Student Report Card Preview & QR Verification">
        <div className="p-4 bg-card border border-border rounded-xl max-w-xl space-y-3 text-xs shadow-xs">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <div>
              <h4 className="font-bold text-foreground text-sm">SPRINGFIELD ACADEMY • REPORT CARD</h4>
              <p className="text-muted-foreground text-[11px]">Rahul Sharma • Class 10-A • Session 2027–28</p>
            </div>
            <VFBadge variant="success">RESULT: PASSED (A1)</VFBadge>
          </div>

          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex justify-between py-1 border-b border-border/40"><span>Mathematics:</span><strong>95 / 100 (A1)</strong></div>
            <div className="flex justify-between py-1 border-b border-border/40"><span>Science:</span><strong>88 / 100 (A2)</strong></div>
            <div className="flex justify-between py-1 border-b border-border/40"><span>English:</span><strong>91 / 100 (A1)</strong></div>
          </div>

          <div className="pt-2 flex justify-between items-center font-bold text-xs">
            <span>Overall Score: <strong className="text-primary">91.3% (Rank #2)</strong></span>
            <VFButton size="sm" leftIcon={<Printer className="h-3.5 w-3.5" />}>Download PDF Marksheet</VFButton>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7.12 — Examination Analytics & Intelligence (15 Features)
  // ----------------------------------------------------
  const analyticsAiContent = (
    <div className="space-y-4">
      {/* 108. Analytics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Overall Pass Rate" value="94.8%" icon={<Award className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="+2.1% vs Last Term" />
        <VFStatCard title="Batch Average Score" value="78.4 Marks" icon={<BarChart className="h-5 w-5 text-primary" />} trend="up" trendLabel="Out of 100" />
        <VFStatCard title="Students At-Risk" value="3 Students" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} trend="down" trendLabel="Needs Remedial" />
        <VFStatCard title="Subject Topper Score" value="100 / 100" icon={<Award className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="Neha Jain (Math)" />
      </div>

      {/* 112 & 122. AI Learning Gap & Examination Assistant */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">112 & 122. AI Learning Gap Detector & Result Predictor</h3>
              <p className="text-xs text-muted-foreground">Identifies conceptual gaps in specific topics (e.g. algebraic fractions) and recommends remedial intervention.</p>
            </div>
          </div>
          <VFBadge variant="warning">34% Class 8A Learning Gap Detected</VFBadge>
        </div>

        <div className="flex gap-2">
          <VFInput
            placeholder="e.g. Which classes need academic intervention in Mathematics?"
            value={aiAnalysisPrompt}
            onChange={(e: any) => setAiAnalysisPrompt(e.target.value)}
          />
          <VFButton
            size="sm"
            onClick={() => {
              if (aiAnalysisPrompt) {
                setAiAnalysisResponse(`AI Analytics: Class 8C Mathematics performance dropped 12% in Fractions. Recommended 3 remedial revision sessions before Annuals.`);
              }
            }}
          >
            Ask AI
          </VFButton>
        </div>

        {aiAnalysisResponse && (
          <div className="p-3 bg-muted/40 border border-border rounded-lg text-foreground text-xs animate-fade-in">
            <span className="font-bold text-primary flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> AI Insight:
            </span>
            <p className="mt-1 leading-relaxed text-[11px]">{aiAnalysisResponse}</p>
          </div>
        )}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // MAPPING ALL 12 SUBMODULE TABS
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'exam-config', label: '7.1 Configuration', icon: <Sliders className="h-3.5 w-3.5" />, content: examConfigContent },
    { id: 'exam-mgmt', label: '7.2 Exam Management', icon: <ClipboardList className="h-3.5 w-3.5" />, content: examMgmtContent },
    { id: 'test-mgmt', label: '7.3 Test & Assessment', icon: <FileCheck className="h-3.5 w-3.5" />, content: testMgmtContent },
    { id: 'question-bank', label: '7.4 Question Bank', icon: <BookOpen className="h-3.5 w-3.5" />, content: questionBankContent },
    { id: 'paper-designer', label: '7.5 Paper Designer', icon: <Sparkles className="h-3.5 w-3.5 text-primary" />, content: paperDesignerContent },
    { id: 'exam-scheduling', label: '7.6 Exam Scheduling', icon: <Calendar className="h-3.5 w-3.5" />, content: examSchedulingContent },
    { id: 'hall-tickets', label: '7.7 Hall Tickets', icon: <Ticket className="h-3.5 w-3.5" />, content: hallTicketContent },
    { id: 'seating-invigilation', label: '7.8 Seating & Invigilation', icon: <Grid className="h-3.5 w-3.5" />, content: seatingContent },
    { id: 'marks-evaluation', label: '7.9 Marks & Evaluation', icon: <Edit3 className="h-3.5 w-3.5" />, content: marksEvaluationContent },
    { id: 'grades-results', label: '7.10 Grades & Processing', icon: <Award className="h-3.5 w-3.5" />, content: gradesResultsContent },
    { id: 'report-cards', label: '7.11 Report Cards', icon: <Printer className="h-3.5 w-3.5" />, content: reportCardsContent },
    { id: 'analytics-ai', label: '7.12 Analytics & Intelligence', icon: <Sparkles className="h-3.5 w-3.5 text-primary" />, content: analyticsAiContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        defaultTabId="exam-mgmt"
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
