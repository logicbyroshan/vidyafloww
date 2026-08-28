import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFTabs,
} from '@vidyamaxx/ui';
import {
  ClipboardList,
  FileText,
  Award,
  CheckCircle2,
  Plus,
  Download,
  BarChart3,
  FileCheck,
  Printer,
  Check,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/examinations')({
  component: ExaminationsPage,
});

interface ExamRecord {
  id: string;
  code: string;
  title: string;
  session: string;
  grade: string;
  dates: string;
  totalCandidates: number;
  marksEnteredPct: number;
  status: 'Scheduled' | 'Active Live' | 'Evaluation' | 'Completed' | 'Published';
}

const EXAM_DATA: ExamRecord[] = [
  { id: '1', code: 'EXAM-2026-T1', title: 'Term 1 Mid-Year Summative Examination', session: '2026–2027', grade: 'All Classes (6–12)', dates: '18 Sep – 28 Sep 2026', totalCandidates: 1248, marksEnteredPct: 84, status: 'Active Live' },
  { id: '2', code: 'EXAM-2026-UT2', title: 'Periodic Unit Test 2 (Secondary & Sr. Sec)', session: '2026–2027', grade: 'Class 9, 10, 11, 12', dates: '22 Aug – 25 Aug 2026', totalCandidates: 620, marksEnteredPct: 100, status: 'Evaluation' },
  { id: '3', code: 'EXAM-2026-UT1', title: 'Periodic Unit Test 1 (Foundation)', session: '2026–2027', grade: 'All Classes (6–12)', dates: '10 Jul – 15 Jul 2026', totalCandidates: 1248, marksEnteredPct: 100, status: 'Published' },
];

interface MarksEntryRow {
  rollNo: string;
  name: string;
  maths: number;
  science: number;
  english: number;
  social: number;
  hindi: number;
  total: number;
  pct: number;
  grade: string;
}

const INITIAL_MARKS: MarksEntryRow[] = [
  { rollNo: '901', name: 'Aditya Verma', maths: 98, science: 96, english: 94, social: 97, hindi: 92, total: 477, pct: 95.4, grade: 'A1' },
  { rollNo: '902', name: 'Priya Sharma', maths: 92, science: 94, english: 96, social: 90, hindi: 95, total: 467, pct: 93.4, grade: 'A1' },
  { rollNo: '903', name: 'Rahul Gupta', maths: 78, science: 82, english: 80, social: 75, hindi: 84, total: 399, pct: 79.8, grade: 'B1' },
  { rollNo: '904', name: 'Kavya Nair', maths: 94, science: 90, english: 98, social: 92, hindi: 94, total: 468, pct: 93.6, grade: 'A1' },
  { rollNo: '905', name: 'Ishaan Malhotra', maths: 65, science: 70, english: 72, social: 68, hindi: 74, total: 349, pct: 69.8, grade: 'B2' },
];

function ExaminationsPage() {
  const { activeSession } = useGlobalStore();
  const [activeTab, setActiveTab] = React.useState<string>('overview');
  const [marksData] = React.useState<MarksEntryRow[]>(INITIAL_MARKS);
  const [notice, setNotice] = React.useState<string | null>(null);

  const examColumns = [
    {
      header: 'Exam Code',
      accessorKey: 'code',
      cell: (r: ExamRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
          {r.code}
        </span>
      ),
    },
    {
      header: 'Examination Title',
      accessorKey: 'title',
      cell: (r: ExamRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.title}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.grade}</p>
        </div>
      ),
    },
    {
      header: 'Session',
      accessorKey: 'session',
      cell: (r: ExamRecord) => <span className="font-mono text-foreground font-semibold text-xs">{r.session}</span>,
    },
    {
      header: 'Exam Dates',
      accessorKey: 'dates',
      cell: (r: ExamRecord) => <span className="text-foreground font-medium text-xs">{r.dates}</span>,
    },
    {
      header: 'Marks Progress',
      accessorKey: 'marksEnteredPct',
      cell: (r: ExamRecord) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-xs">{r.marksEnteredPct}%</span>
          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden border border-border/50">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${r.marksEnteredPct}%` }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: ExamRecord) => (
        <VFBadge variant={r.status === 'Published' ? 'success' : r.status === 'Active Live' ? 'warning' : 'outline'}>
          {r.status}
        </VFBadge>
      ),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (r: ExamRecord) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<ClipboardList className="h-4 w-4" />}
          onClick={() => {
            setActiveTab('marks');
            setNotice(`Loaded evaluation sheet for ${r.code}.`);
          }}
        >
          Enter Marks
        </VFButton>
      ),
    },
  ];

  // 1. Overview Hub
  const overviewContent = (
    <div className="space-y-6">
      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Active Session</span>
            <span className="text-2xl font-black text-foreground mt-1 block">Term 1 Live</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">48 Papers Scheduled</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Enrolled Candidates</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">1,248 Students</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">100% Admit Cards Issued</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Marks Entry Status</span>
            <span className="text-2xl font-black text-foreground mt-1 block">84.2%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Teacher Evaluation On Track</span>
          </div>
          <div className="p-4 rounded-md bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Pass Benchmark</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">96.4%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Unit Test 1 Aggregated</span>
          </div>
        </div>
      </div>

      {/* Ranks & Scholars Podium */}
      <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-2 border-b border-border/60">
          <Award className="h-4 w-4 text-amber-400" />
          <span>Academic Scholars & Grade Toppers (Term Examination)</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-md bg-muted/30 border border-border/60">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block">🥇 Rank 1 Scholar</span>
            <span className="text-lg font-black text-foreground mt-1 block">Aditya Verma (95.4%)</span>
            <span className="text-xs text-muted-foreground mt-0.5 block">Class 9-A · Total: 477 / 500</span>
          </div>
          <div className="p-4 rounded-md bg-muted/30 border border-border/60">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wide block">🥈 Rank 2 Scholar</span>
            <span className="text-lg font-black text-foreground mt-1 block">Kavya Nair (93.6%)</span>
            <span className="text-xs text-muted-foreground mt-0.5 block">Class 11-Com · Total: 468 / 500</span>
          </div>
          <div className="p-4 rounded-md bg-muted/30 border border-border/60">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide block">🥉 Rank 3 Scholar</span>
            <span className="text-lg font-black text-foreground mt-1 block">Priya Sharma (93.4%)</span>
            <span className="text-xs text-muted-foreground mt-0.5 block">Class 9-A · Total: 467 / 500</span>
          </div>
        </div>
      </div>

      {/* Scheduled Exams Directory Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Institutional Examination Schedule</h2>
            <p className="text-sm text-muted-foreground font-medium">Session {activeSession} major term examinations and periodic assessments</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Date Sheet
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Create Examination
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={examColumns}
          data={EXAM_DATA}
          filterPlaceholder="Search examinations by title or code..."
        />
      </div>
    </div>
  );

  // 2. Marks Entry Hub
  const marksContent = (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-4 rounded-lg border border-border/80 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-foreground">Teacher Score Entry Console · Class 9-A (Term 1)</h3>
          <p className="text-xs text-muted-foreground">Auto calculates Total Score, Percentage %, and CBSE 9-Point Grade (A1 to E2)</p>
        </div>
        <div className="flex items-center gap-2.5">
          <VFButton
            size="sm"
            variant="outline"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => alert('Exporting evaluation sheet as Excel...')}
          >
            Export Sheet
          </VFButton>
          <VFButton
            size="sm"
            leftIcon={<Check className="h-4 w-4" />}
            onClick={() => setNotice('Marks entries successfully saved and locked for verification.')}
          >
            Save Marks Register
          </VFButton>
        </div>
      </div>

      <div className="border border-border/80 rounded-lg bg-card overflow-x-auto shadow-xs custom-scrollbar">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-xs font-black text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3">Roll</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-3 py-3 text-center">Maths (100)</th>
              <th className="px-3 py-3 text-center">Science (100)</th>
              <th className="px-3 py-3 text-center">English (100)</th>
              <th className="px-3 py-3 text-center">Social (100)</th>
              <th className="px-3 py-3 text-center">Hindi (100)</th>
              <th className="px-4 py-3 text-center">Total (500)</th>
              <th className="px-4 py-3 text-center">% Score</th>
              <th className="px-4 py-3 text-center">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 font-medium">
            {marksData.map((m) => (
              <tr key={m.rollNo} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono font-bold text-foreground">{m.rollNo}</td>
                <td className="px-4 py-3 font-bold text-foreground">{m.name}</td>
                <td className="px-3 py-3 text-center font-mono">{m.maths}</td>
                <td className="px-3 py-3 text-center font-mono">{m.science}</td>
                <td className="px-3 py-3 text-center font-mono">{m.english}</td>
                <td className="px-3 py-3 text-center font-mono">{m.social}</td>
                <td className="px-3 py-3 text-center font-mono">{m.hindi}</td>
                <td className="px-4 py-3 text-center font-mono font-black text-foreground">{m.total}</td>
                <td className="px-4 py-3 text-center font-mono font-bold text-emerald-400">{m.pct}%</td>
                <td className="px-4 py-3 text-center">
                  <span className="font-bold px-2 py-0.5 rounded bg-muted text-foreground border border-border text-xs">
                    {m.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 3. Digital Report Card Hub
  const reportCardsContent = (
    <div className="space-y-6">
      <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
          <div>
            <h3 className="text-base font-bold text-foreground">CBSE Digital Report Card Studio</h3>
            <p className="text-xs text-muted-foreground">Standard formatted marksheet with school crest, grading schema, and digital signature</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Printer className="h-4 w-4" />}
              onClick={() => window.print()}
            >
              Print Report Card
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => setNotice('Downloaded bulk PDF report cards for Class 9-A.')}
            >
              Bulk PDF Export
            </VFButton>
          </div>
        </div>

        {/* Printable Visual Report Card Frame */}
        <div className="p-6 rounded-lg bg-muted/20 border border-border/80 space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-1 pb-4 border-b border-border">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Springfield International Academy</span>
            <h2 className="text-2xl font-black text-foreground tracking-tight">Official Academic Achievement Report</h2>
            <p className="text-xs font-mono text-muted-foreground">Session {activeSession} · Term 1 Mid-Year Examination</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground font-bold block">Student Name:</span>
              <span className="text-sm font-bold text-foreground block mt-0.5">Aditya Verma</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block">Admission No:</span>
              <span className="text-sm font-mono font-bold text-foreground block mt-0.5">ADM-2026-0841</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block">Class & Section:</span>
              <span className="text-sm font-bold text-foreground block mt-0.5">Class 9 - Section A</span>
            </div>
            <div>
              <span className="text-muted-foreground font-bold block">Overall Standing:</span>
              <span className="text-sm font-bold text-emerald-400 block mt-0.5">Rank 1 (Grade A1)</span>
            </div>
          </div>

          <div className="border border-border rounded-md overflow-hidden bg-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-foreground font-black uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-4 py-2.5">Subject</th>
                  <th className="px-4 py-2.5 text-center">Max Marks</th>
                  <th className="px-4 py-2.5 text-center">Marks Obtained</th>
                  <th className="px-4 py-2.5 text-center">CBSE Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                <tr><td className="px-4 py-2 font-bold text-foreground">Mathematics</td><td className="px-4 py-2 text-center font-mono">100</td><td className="px-4 py-2 text-center font-mono font-bold">98</td><td className="px-4 py-2 text-center font-bold text-emerald-400">A1</td></tr>
                <tr><td className="px-4 py-2 font-bold text-foreground">General Science</td><td className="px-4 py-2 text-center font-mono">100</td><td className="px-4 py-2 text-center font-mono font-bold">96</td><td className="px-4 py-2 text-center font-bold text-emerald-400">A1</td></tr>
                <tr><td className="px-4 py-2 font-bold text-foreground">English Language & Lit</td><td className="px-4 py-2 text-center font-mono">100</td><td className="px-4 py-2 text-center font-mono font-bold">94</td><td className="px-4 py-2 text-center font-bold text-emerald-400">A1</td></tr>
                <tr><td className="px-4 py-2 font-bold text-foreground">Social Science</td><td className="px-4 py-2 text-center font-mono">100</td><td className="px-4 py-2 text-center font-mono font-bold">97</td><td className="px-4 py-2 text-center font-bold text-emerald-400">A1</td></tr>
                <tr><td className="px-4 py-2 font-bold text-foreground">Hindi Course-A</td><td className="px-4 py-2 text-center font-mono">100</td><td className="px-4 py-2 text-center font-mono font-bold">92</td><td className="px-4 py-2 text-center font-bold text-emerald-400">A1</td></tr>
                <tr className="bg-muted/40 font-black text-sm border-t border-border">
                  <td className="px-4 py-2.5 text-foreground">Aggregate Total</td>
                  <td className="px-4 py-2.5 text-center font-mono">500</td>
                  <td className="px-4 py-2.5 text-center font-mono text-foreground">477 (95.4%)</td>
                  <td className="px-4 py-2.5 text-center text-emerald-400">A1 Distinction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Examination Dashboard', icon: <BarChart3 className="h-4 w-4" />, content: overviewContent },
    { id: 'marks', label: 'Marks Entry & Evaluation', icon: <FileCheck className="h-4 w-4" />, content: marksContent },
    { id: 'report-cards', label: 'Digital Report Cards', icon: <FileText className="h-4 w-4" />, content: reportCardsContent },
  ];

  return (
    <VFPageContainer className="space-y-2.5 sm:space-y-3">
      {notice && (
        <div className="p-4 bg-muted/60 border border-border rounded-md text-sm text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      <VFTabs
        items={tabs}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        variant="top-bar"
      />
    </VFPageContainer>
  );
}

