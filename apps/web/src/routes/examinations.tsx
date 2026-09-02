import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFSelect,
  VFInput,
  VFDialog,
  VFTable,
  VFTableHead,
  VFTableHeaderCell,
  VFTableBody,
  VFTableRow,
  VFTableCell,
  VFCard,
} from '@vidyafloww/ui';
import {
  ClipboardList,
  Plus,
  Download,
  Check,
  FileCheck,
  Award,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

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

const INITIAL_EXAMS: ExamRecord[] = [
  { id: '1', code: 'EXAM-2026-T1', title: 'Term 1 Mid-Year Summative Examination', session: '2026–2027', grade: 'All Classes (6–12)', dates: '18 Sep – 28 Sep 2026', totalCandidates: 1248, marksEnteredPct: 84, status: 'Active Live' },
  { id: '2', code: 'EXAM-2026-UT2', title: 'Periodic Unit Test 2 (Secondary & Sr. Sec)', session: '2026–2027', grade: 'Class 9, 10, 11, 12', dates: '22 Aug – 25 Aug 2026', totalCandidates: 620, marksEnteredPct: 100, status: 'Evaluation' },
  { id: '3', code: 'EXAM-2026-UT1', title: 'Periodic Unit Test 1 (Foundation)', session: '2026–2027', grade: 'All Classes (6–12)', dates: '10 Jul – 15 Jul 2026', totalCandidates: 1248, marksEnteredPct: 100, status: 'Published' },
  { id: '4', code: 'EXAM-2026-PRE', title: 'Pre-Board Mock Examination 1 (CBSE)', session: '2026–2027', grade: 'Class 10 & 12', dates: '02 Dec – 14 Dec 2026', totalCandidates: 380, marksEnteredPct: 0, status: 'Scheduled' },
];

interface StudentMarkRow {
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

const INITIAL_STUDENT_MARKS: StudentMarkRow[] = [
  { rollNo: '101', name: 'Aditya Verma', maths: 98, science: 96, english: 94, social: 97, hindi: 92, total: 477, pct: 95.4, grade: 'A1' },
  { rollNo: '102', name: 'Priya Sharma', maths: 92, science: 94, english: 96, social: 90, hindi: 95, total: 467, pct: 93.4, grade: 'A1' },
  { rollNo: '103', name: 'Rahul Gupta', maths: 78, science: 82, english: 80, social: 75, hindi: 84, total: 399, pct: 79.8, grade: 'B1' },
  { rollNo: '104', name: 'Sneha Rao', maths: 94, science: 90, english: 98, social: 92, hindi: 94, total: 468, pct: 93.6, grade: 'A1' },
  { rollNo: '105', name: 'Ishaan Malhotra', maths: 65, science: 70, english: 72, social: 68, hindi: 74, total: 349, pct: 69.8, grade: 'B2' },
];

function ExaminationsPage() {
  const { addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';
  React.useEffect(() => { document.title = t('page.examinations') + ' \u2013 VidyaFloww'; }, [t]);
  const [activeView, setActiveView] = React.useState<'schedule' | 'marks'>('schedule');
  const [exams, setExams] = React.useState<ExamRecord[]>(INITIAL_EXAMS);
  const [marksData, setMarksData] = React.useState<StudentMarkRow[]>(INITIAL_STUDENT_MARKS);
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 10-A');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  const [newExam, setNewExam] = React.useState<Partial<ExamRecord>>({
    code: `EXAM-2026-0${exams.length + 1}`,
    title: '',
    session: '2026–2027',
    grade: 'All Classes (9–12)',
    dates: '10 Nov – 20 Nov 2026',
    totalCandidates: 500,
    marksEnteredPct: 0,
    status: 'Scheduled',
  });

  const handleScheduleExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExam.title) return;

    const added: ExamRecord = {
      id: String(Date.now()),
      code: newExam.code || `EXAM-2026-0${exams.length + 1}`,
      title: newExam.title,
      session: newExam.session || '2026–2027',
      grade: newExam.grade || 'All Classes (9–12)',
      dates: newExam.dates || '10 Nov – 20 Nov 2026',
      totalCandidates: Number(newExam.totalCandidates) || 500,
      marksEnteredPct: 0,
      status: (newExam.status as any) || 'Scheduled',
    };

    setExams([...exams, added]);
    setIsScheduleModalOpen(false);
    addNotification({
      title: isHindi ? 'परीक्षा शेड्यूल की गई' : 'Exam Scheduled',
      description: `"${added.title}" [${added.code}] dates published to academic calendar.`,
      type: 'success',
    });
  };

  const handleExportMarksheet = () => {
    addNotification({
      title: isHindi ? 'मार्कशीट एक्सपोर्ट की गई' : 'Marksheet Register Exported',
      description: `Exported ${selectedClass} official marks ledger as Excel document.`,
      type: 'success',
    });
  };

  const examColumns = [
    {
      header: isHindi ? 'परीक्षा कोड' : 'Exam Code',
      accessorKey: 'code',
      cell: (r: ExamRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border text-xs">
          {r.code}
        </span>
      ),
    },
    {
      header: isHindi ? 'परीक्षा शीर्षक व कक्षा' : 'Examination Title & Target',
      accessorKey: 'title',
      cell: (r: ExamRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.title}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.grade}</p>
        </div>
      ),
    },
    {
      header: isHindi ? 'सत्र' : 'Session',
      accessorKey: 'session',
      cell: (r: ExamRecord) => <span className="font-mono text-foreground font-bold text-xs">{r.session}</span>,
    },
    {
      header: isHindi ? 'परीक्षा तिथियां' : 'Exam Schedule Dates',
      accessorKey: 'dates',
      cell: (r: ExamRecord) => <span className="text-muted-foreground text-xs font-semibold">{r.dates}</span>,
    },
    {
      header: isHindi ? 'मूल्यांकन प्रगति' : 'Evaluation Progress',
      accessorKey: 'marksEnteredPct',
      cell: (r: ExamRecord) => (
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono font-bold">
            <span className="text-foreground">{r.totalCandidates} {isHindi ? 'छात्र' : 'Candidates'}</span>
            <span className="text-emerald-400">{r.marksEnteredPct}%</span>
          </div>
          <div className="w-24 h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden border border-border/60">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${r.marksEnteredPct}%` }} />
          </div>
        </div>
      ),
    },
    {
      header: t('col.status'),
      accessorKey: 'status',
      cell: (r: ExamRecord) => (
        <VFBadge
          variant={
            r.status === 'Active Live'
              ? 'danger'
              : r.status === 'Evaluation'
              ? 'warning'
              : r.status === 'Published'
              ? 'success'
              : 'outline'
          }
        >
          {r.status === 'Active Live' ? (isHindi ? 'लाइव जारी' : r.status) : r.status === 'Evaluation' ? (isHindi ? 'मूल्यांकन' : r.status) : r.status === 'Published' ? (isHindi ? 'प्रकाशित' : r.status) : (isHindi ? 'शेड्यूल्ड' : r.status)}
        </VFBadge>
      ),
    },
    {
      header: t('col.action'),
      accessorKey: 'action',
      cell: () => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<FileCheck className="h-3.5 w-3.5" />}
          onClick={() => setActiveView('marks')}
        >
          {isHindi ? 'अंक दर्ज करें' : 'Enter Marks'}
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* 1. Header Toolbar Box */}
      <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
              <ClipboardList className="h-4 w-4" />
            </div>
            <span className="text-base font-extrabold text-foreground tracking-tight">
              {t('page.examinations')}
            </span>
            <VFBadge variant="success" className="text-[10px] font-bold font-mono">
              Term 1 Active
            </VFBadge>
          </div>

          <div className="h-5 w-[1px] bg-border/80 hidden sm:block" />

          {/* View Switchers */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-md border border-border/70">
            <button
              type="button"
              onClick={() => setActiveView('schedule')}
              className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                activeView === 'schedule'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('exam.schedule')}
            </button>
            <button
              type="button"
              onClick={() => setActiveView('marks')}
              className={`px-3 py-1 text-xs font-bold rounded transition-colors flex items-center gap-1.5 ${
                activeView === 'marks'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Award className="h-3 w-3 text-primary" />
              {t('exam.results')}
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            onClick={handleExportMarksheet}
            className="h-9 px-3.5 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            {t('action.export')}
          </VFButton>
          <VFButton
            size="sm"
            onClick={() => setIsScheduleModalOpen(true)}
            className="h-9 px-3.5 text-xs font-bold shadow-xs"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {t('action.add') + ' ' + t('nav.examinations')}
          </VFButton>
        </div>
      </div>

      {/* 2. Schedule View */}
      {activeView === 'schedule' && (
        <VFDataTable
          columns={examColumns}
          data={exams}
          filterPlaceholder="Search examinations by code, title, or target grades..."
        />
      )}

      {/* 3. Marks Entry Register View */}
      {activeView === 'marks' && (
        <div className="space-y-3 flex-1 min-h-0 flex flex-col">
          {/* Class Selector Bar */}
          <div className="p-3 rounded-lg bg-[#141414] border border-border/80 flex items-center justify-between gap-3 shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                Select Class & Section:
              </span>
              <div className="w-56">
                <VFSelect
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(String(e.target.value))}
                  options={[
                    { label: 'Class 9 - Section A', value: 'Class 9-A' },
                    { label: 'Class 10 - Section A', value: 'Class 10-A' },
                    { label: 'Class 10 - Section B', value: 'Class 10-B' },
                    { label: 'Class 11 - Science', value: 'Class 11-Sci' },
                    { label: 'Class 12 - Commerce', value: 'Class 12-Com' },
                  ]}
                  className="bg-[#1a1a1a] border-border h-9 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                {isHindi ? 'CBSE मानक 500-अंक प्रणाली' : 'CBSE Standard 500-Mark Matrix'}
              </span>
            </div>
          </div>

          {/* Marks Table */}
          <VFCard className="bg-[#141414] border-border/80 flex-1 min-h-0" bodyClassName="p-0 overflow-x-auto">
            <VFTable className="rounded-none border-0">
              <VFTableHead className="bg-[#1a1a1a]">
                <VFTableRow>
                  <VFTableHeaderCell className="py-3 px-4 text-xs font-bold text-muted-foreground">{t('col.rollNo')}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground">{t('col.studentName')}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'गणित (100)' : 'Maths (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'विज्ञान (100)' : 'Science (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'अंग्रेजी (100)' : 'English (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'सामाजिक विज्ञान (100)' : 'Social (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'हिंदी (100)' : 'Hindi (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center font-mono">{isHindi ? 'कुल योग' : 'Total'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center font-mono">{isHindi ? 'प्रतिशत %' : 'Pct %'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-4 text-xs font-bold text-muted-foreground text-right">{isHindi ? 'ग्रेड' : 'Grade'}</VFTableHeaderCell>
                </VFTableRow>
              </VFTableHead>
              <VFTableBody>
                {marksData.map((row, idx) => (
                  <VFTableRow key={row.rollNo} className="hover:bg-[#1a1a1a]/70">
                    <VFTableCell className="py-3 px-4 font-mono font-bold text-foreground text-xs">{row.rollNo}</VFTableCell>
                    <VFTableCell className="py-3 px-3 font-extrabold text-foreground text-xs">{row.name}</VFTableCell>
                    
                    {/* Maths input */}
                    <VFTableCell className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.maths}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = [...marksData];
                          updated[idx].maths = val;
                          updated[idx].total = val + row.science + row.english + row.social + row.hindi;
                          updated[idx].pct = Number((updated[idx].total / 5).toFixed(1));
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
                      />
                    </VFTableCell>

                    {/* Science input */}
                    <VFTableCell className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.science}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = [...marksData];
                          updated[idx].science = val;
                          updated[idx].total = row.maths + val + row.english + row.social + row.hindi;
                          updated[idx].pct = Number((updated[idx].total / 5).toFixed(1));
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
                      />
                    </VFTableCell>

                    {/* English input */}
                    <VFTableCell className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.english}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = [...marksData];
                          updated[idx].english = val;
                          updated[idx].total = row.maths + row.science + val + row.social + row.hindi;
                          updated[idx].pct = Number((updated[idx].total / 5).toFixed(1));
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
                      />
                    </VFTableCell>

                    {/* Social input */}
                    <VFTableCell className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.social}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = [...marksData];
                          updated[idx].social = val;
                          updated[idx].total = row.maths + row.science + row.english + val + row.hindi;
                          updated[idx].pct = Number((updated[idx].total / 5).toFixed(1));
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
                      />
                    </VFTableCell>

                    {/* Hindi input */}
                    <VFTableCell className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={row.hindi}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updated = [...marksData];
                          updated[idx].hindi = val;
                          updated[idx].total = row.maths + row.science + row.english + row.social + val;
                          updated[idx].pct = Number((updated[idx].total / 5).toFixed(1));
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
                      />
                    </VFTableCell>

                    <VFTableCell className="py-3 px-3 font-mono font-black text-foreground text-center text-xs">
                      {row.total}
                    </VFTableCell>
                    <VFTableCell className="py-3 px-3 font-mono font-black text-emerald-400 text-center text-xs">
                      {row.pct}%
                    </VFTableCell>
                    <VFTableCell className="py-3 px-4 text-right">
                      <VFBadge variant={row.pct >= 90 ? 'success' : row.pct >= 75 ? 'primary' : 'warning'} className="text-[10px] font-bold">
                        {row.grade}
                      </VFBadge>
                    </VFTableCell>
                  </VFTableRow>
                ))}
              </VFTableBody>
            </VFTable>
          </VFCard>
        </div>
      )}

      {/* Schedule Exam Modal */}
      <VFDialog
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule New Examination"
        description="Configure exam dates, session, and eligible student grade tiers."
      >
        <form onSubmit={handleScheduleExam} className="space-y-3.5 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Examination Title</label>
            <VFInput
              required
              placeholder="e.g. Term 2 Annual Final Examination"
              value={newExam.title}
              onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Exam Code</label>
              <VFInput
                value={newExam.code}
                onChange={(e) => setNewExam({ ...newExam, code: e.target.value })}
                className="bg-[#1a1a1a] border-border font-mono h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Candidate Strength</label>
              <VFInput
                type="number"
                value={String(newExam.totalCandidates)}
                onChange={(e) => setNewExam({ ...newExam, totalCandidates: Number(e.target.value) })}
                className="bg-[#1a1a1a] border-border font-mono h-9 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Schedule Dates</label>
              <VFInput
                placeholder="e.g. 15 Mar – 25 Mar 2027"
                value={newExam.dates}
                onChange={(e) => setNewExam({ ...newExam, dates: e.target.value })}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Target Grades</label>
              <VFSelect
                value={newExam.grade || 'All Classes (9–12)'}
                onChange={(e) => setNewExam({ ...newExam, grade: String(e.target.value) })}
                options={[
                  { label: 'All Classes (6–12)', value: 'All Classes (6–12)' },
                  { label: 'Class 9 & 10 (Secondary)', value: 'Class 9 & 10' },
                  { label: 'Class 11 & 12 (Sr. Secondary)', value: 'Class 11 & 12' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Check className="h-4 w-4" />}>
              Publish Schedule
            </VFButton>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
