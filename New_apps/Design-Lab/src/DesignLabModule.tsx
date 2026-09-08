import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Palette,
  Printer,
  Download,
  Sparkles,
  FileCheck2,
  Award,
  CreditCard,
  Layers,
  Building2,
  School,
  Sliders,
} from 'lucide-react';

export const Route = createFileRoute('/design-lab')({
  component: DesignLabPage,
});

type TemplateType = 'marksheet' | 'student-id' | 'staff-id' | 'certificate' | 'admit-card';
type ColorScheme = 'navy-gold' | 'royal-emerald' | 'crimson' | 'cyber-slate';

interface SampleStudent {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNo: string;
  admissionNo: string;
  dob: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  phone: string;
  photoUrl: string;
  totalMarks: number;
  maxMarks: number;
  percentage: string;
  cgpa: string;
}

const SAMPLE_STUDENTS: SampleStudent[] = [
  {
    id: 'STU-001',
    name: 'Aarav Sharma',
    grade: 'Grade 10',
    section: 'A',
    rollNo: '1001',
    admissionNo: 'VF-2022-8419',
    dob: '14 May 2011',
    bloodGroup: 'O+',
    fatherName: 'Rajesh Sharma',
    motherName: 'Sunita Sharma',
    phone: '+91 98112 44321',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    totalMarks: 472,
    maxMarks: 500,
    percentage: '94.4%',
    cgpa: '9.6',
  },
  {
    id: 'STU-002',
    name: 'Priya Verma',
    grade: 'Grade 10',
    section: 'A',
    rollNo: '1002',
    admissionNo: 'VF-2022-8420',
    dob: '28 Aug 2011',
    bloodGroup: 'B+',
    fatherName: 'Sunil Verma',
    motherName: 'Kavita Verma',
    phone: '+91 98701 55432',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    totalMarks: 489,
    maxMarks: 500,
    percentage: '97.8%',
    cgpa: '9.9',
  },
  {
    id: 'STU-003',
    name: 'Rohan Gupta',
    grade: 'Grade 10',
    section: 'B',
    rollNo: '1014',
    admissionNo: 'VF-2022-8501',
    dob: '03 Dec 2010',
    bloodGroup: 'A+',
    fatherName: 'Deepak Gupta',
    motherName: 'Neelam Gupta',
    phone: '+91 99114 88301',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    totalMarks: 446,
    maxMarks: 500,
    percentage: '89.2%',
    cgpa: '9.1',
  },
];

const SCHOLASTIC_SUBJECTS = [
  { code: '041', name: 'Mathematics Standard', theoryMax: 80, theoryObt: 76, pracMax: 20, pracObt: 19, total: 95, grade: 'A1' },
  { code: '086', name: 'Science & Practical Experiments', theoryMax: 80, theoryObt: 74, pracMax: 20, pracObt: 20, total: 94, grade: 'A1' },
  { code: '184', name: 'English Language & Literature', theoryMax: 80, theoryObt: 73, pracMax: 20, pracObt: 19, total: 92, grade: 'A1' },
  { code: '085', name: 'Hindi Course - A', theoryMax: 80, theoryObt: 77, pracMax: 20, pracObt: 20, total: 97, grade: 'A1' },
  { code: '087', name: 'Social Sciences & Civics', theoryMax: 80, theoryObt: 75, pracMax: 20, pracObt: 19, total: 94, grade: 'A1' },
];

function DesignLabPage() {
  const { lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'डिजाइन लैब व प्रिंट स्टूडियो' : 'Design Lab & Print Studio') + ' – VidyaFloww';
  }, [isHindi]);

  const [activeTab, setActiveTab] = React.useState<'studio' | 'batch'>('studio');
  const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateType>('marksheet');
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('navy-gold');
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');
  const [showBarcode, setShowBarcode] = React.useState(true);
  const [showWatermark, setShowWatermark] = React.useState(true);
  const [showSignatures, setShowSignatures] = React.useState(true);
  const [showSeal, setShowSeal] = React.useState(true);
  const [selectedStudentIndex, setSelectedStudentIndex] = React.useState(0);

  const [isPrintModalOpen, setIsPrintModalOpen] = React.useState(false);
  const [batchClass, setBatchClass] = React.useState('Grade 10-A (38 Students)');
  const [batchDocType, setBatchDocType] = React.useState('Student RFID ID Cards');
  const [isBatchGenerating, setIsBatchGenerating] = React.useState(false);

  const student = SAMPLE_STUDENTS[selectedStudentIndex];

  // Theme styles lookup
  const getThemeColors = (scheme: ColorScheme) => {
    switch (scheme) {
      case 'navy-gold':
        return { primary: '#1e3a8a', accent: '#f59e0b', border: '#1e40af', bgTint: 'rgba(30, 58, 138, 0.08)' };
      case 'royal-emerald':
        return { primary: '#065f46', accent: '#10b981', border: '#047857', bgTint: 'rgba(6, 95, 70, 0.08)' };
      case 'crimson':
        return { primary: '#881337', accent: '#f43f5e', border: '#9f1239', bgTint: 'rgba(136, 19, 55, 0.08)' };
      case 'cyber-slate':
      default:
        return { primary: '#18181b', accent: '#6366f1', border: '#27272a', bgTint: 'rgba(99, 102, 241, 0.08)' };
    }
  };

  const colors = getThemeColors(colorScheme);

  const handlePrintTrigger = () => {
    setIsPrintModalOpen(true);
  };

  const handleBatchGenerate = () => {
    setIsBatchGenerating(true);
    setTimeout(() => {
      setIsBatchGenerating(false);
      addNotification({
        title: isHindi ? 'बैच तैयार हुआ' : 'Batch Generated Successfully',
        description: `Generated 38 documents for ${batchClass} as ${batchDocType}.`,
        type: 'success',
      });
    }, 1200);
  };

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-4">
      {/* ── SINGLE UNIFIED HEADER (Standardized Design System) ── */}
      <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: Tab Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70">
            <button
              type="button"
              id="tab-template-studio"
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Palette className="h-3.5 w-3.5" />
              {isHindi ? 'टेम्पलेट स्टूडियो व डिजाइनर' : 'Template Studio & Designer'}
            </button>
            <button
              type="button"
              id="tab-batch-print"
              onClick={() => setActiveTab('batch')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'batch'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Printer className="h-3.5 w-3.5" />
              {isHindi ? 'बैच प्रिंट व जनरेशन' : 'Batch Generation & Queue'}
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={handlePrintTrigger}
            className="h-8 px-3.5 text-xs font-bold shadow-xs rounded-[4px]"
            leftIcon={<Printer className="h-3.5 w-3.5" />}
          >
            {isHindi ? 'प्रिंट व एक्सपोर्ट करें' : 'Print / Export'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: TEMPLATE STUDIO & LIVE CANVAS
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'studio' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Template Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-[#141414] border border-border/80 p-2.5 rounded-[4px]">
            <span className="text-xs text-muted-foreground font-semibold px-2">{isHindi ? 'दस्तावेज़ प्रारूप:' : 'Template:'}</span>
            <button
              type="button"
              onClick={() => {
                setSelectedTemplate('marksheet');
                setOrientation('portrait');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedTemplate === 'marksheet'
                  ? 'bg-[#252525] text-primary border border-primary/50'
                  : 'bg-[#181818] text-muted-foreground hover:text-foreground border border-border/70'
              }`}
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>CBSE Holistic Marksheet</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTemplate('student-id');
                setOrientation('portrait');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedTemplate === 'student-id'
                  ? 'bg-[#252525] text-primary border border-primary/50'
                  : 'bg-[#181818] text-muted-foreground hover:text-foreground border border-border/70'
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Student RFID ID Card</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTemplate('staff-id');
                setOrientation('landscape');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedTemplate === 'staff-id'
                  ? 'bg-[#252525] text-primary border border-primary/50'
                  : 'bg-[#181818] text-muted-foreground hover:text-foreground border border-border/70'
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>Staff Access Badge</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTemplate('certificate');
                setOrientation('landscape');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedTemplate === 'certificate'
                  ? 'bg-[#252525] text-primary border border-primary/50'
                  : 'bg-[#181818] text-muted-foreground hover:text-foreground border border-border/70'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>Certificate of Merit</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedTemplate('admit-card');
                setOrientation('portrait');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedTemplate === 'admit-card'
                  ? 'bg-[#252525] text-primary border border-primary/50'
                  : 'bg-[#181818] text-muted-foreground hover:text-foreground border border-border/70'
              }`}
            >
              <School className="h-3.5 w-3.5" />
              <span>Exam Admit Card</span>
            </button>
          </div>

          {/* Main 2-Column Studio: Canvas (Left) + Customizer Panel (Right) */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* ── CANVAS VIEWPORT (8 cols) ── */}
            <div className="lg:col-span-8 bg-[#0e0e0e] border border-border/80 rounded-[4px] p-4 flex flex-col items-center justify-start overflow-y-auto min-h-[460px]">
              {/* Document Sheet Preview */}
              <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-border/60 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  Live Preview: <strong className="text-foreground capitalize">{selectedTemplate.replace('-', ' ')}</strong>
                </span>
                <span className="font-mono text-xs">A4 / Standard ISO Spec · 300 DPI Rendering</span>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  TEMPLATE 1: CBSE HOLISTIC MARKSHEET
                  ───────────────────────────────────────────────────────────── */}
              {selectedTemplate === 'marksheet' && (
                <div
                  className="w-full max-w-[620px] bg-white text-slate-900 rounded-[4px] shadow-2xl p-6 relative border border-slate-300 font-sans select-none my-2 transition-all"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Watermark */}
                  {showWatermark && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-30deg]">
                      <span className="text-6xl font-black tracking-widest text-slate-900 uppercase">
                        VIDYAFLOWW
                      </span>
                    </div>
                  )}

                  {/* Top School Header */}
                  <div className="text-center border-b-2 pb-3 border-slate-900">
                    <div className="flex items-center justify-center gap-3">
                      {showSeal && (
                        <div
                          className="h-12 w-12 rounded-[3px] flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: colors.primary }}
                        >
                          VF
                        </div>
                      )}
                      <div>
                        <h1
                          className="text-lg font-black uppercase tracking-wider leading-tight"
                          style={{ color: colors.primary }}
                        >
                          VIDYAFLOWW INTERNATIONAL ACADEMY
                        </h1>
                        <p className="text-[11px] font-bold text-slate-600">
                          AFFILIATED TO CENTRAL BOARD OF SECONDARY EDUCATION (CBSE), NEW DELHI
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          Institutional Campus, Sector 12, Dwarka, New Delhi · Affiliation No. 2130889
                        </p>
                      </div>
                    </div>
                    <div className="mt-2.5 inline-block px-4 py-0.5 rounded-[2px] bg-slate-900 text-white font-bold text-xs uppercase tracking-widest">
                      ACADEMIC SESSION 2025–2026 · PROGRESS REPORT
                    </div>
                  </div>

                  {/* Student Details Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 text-[11px] border-b border-slate-300">
                    <div>
                      <span className="text-slate-500 block">Student Name:</span>
                      <strong className="text-slate-900 text-xs">{student.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Roll No & Section:</span>
                      <strong className="text-slate-900 text-xs">{student.rollNo} (Class {student.grade}-{student.section})</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Admission No:</span>
                      <strong className="text-slate-900 font-mono text-xs">{student.admissionNo}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Father’s Name:</span>
                      <span className="text-slate-800 font-medium">{student.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Mother’s Name:</span>
                      <span className="text-slate-800 font-medium">{student.motherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Attendance Record:</span>
                      <strong className="text-slate-900 font-mono">186 / 194 (95.8%)</strong>
                    </div>
                  </div>

                  {/* Marks Table */}
                  <div className="mt-3">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 font-bold border-y border-slate-300">
                          <th className="py-1.5 px-2">Code</th>
                          <th className="py-1.5 px-2">Scholastic Subject</th>
                          <th className="py-1.5 px-2 text-center">Theory (80)</th>
                          <th className="py-1.5 px-2 text-center">IA / Prac (20)</th>
                          <th className="py-1.5 px-2 text-center">Total (100)</th>
                          <th className="py-1.5 px-2 text-center">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {SCHOLASTIC_SUBJECTS.map((sub) => (
                          <tr key={sub.code}>
                            <td className="py-1 px-2 font-mono text-slate-500">{sub.code}</td>
                            <td className="py-1 px-2 font-semibold text-slate-800">{sub.name}</td>
                            <td className="py-1 px-2 text-center font-mono">{sub.theoryObt}</td>
                            <td className="py-1 px-2 text-center font-mono">{sub.pracObt}</td>
                            <td className="py-1 px-2 text-center font-mono font-bold text-slate-900">{sub.total}</td>
                            <td className="py-1 px-2 text-center font-bold text-emerald-700">{sub.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Box */}
                  <div className="mt-3.5 p-2 rounded-[2px] bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-600 block text-[10px]">Grand Total Marks:</span>
                      <strong className="text-slate-900 text-sm font-mono">{student.totalMarks} / {student.maxMarks}</strong>
                    </div>
                    <div>
                      <span className="text-slate-600 block text-[10px]">Overall Percentage:</span>
                      <strong className="text-emerald-700 text-sm font-mono font-black">{student.percentage}</strong>
                    </div>
                    <div>
                      <span className="text-slate-600 block text-[10px]">Result Classification:</span>
                      <span className="px-2 py-0.5 rounded-[2px] bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
                        PASSED WITH DISTINCTION
                      </span>
                    </div>
                  </div>

                  {/* Signatures & Barcode */}
                  <div className="mt-6 pt-3 border-t border-slate-300 flex items-end justify-between text-[10px] text-slate-600">
                    <div className="text-center">
                      <div className="w-28 border-b border-slate-400 mb-1" />
                      <span>Class Teacher</span>
                    </div>

                    {showBarcode && (
                      <div className="text-center">
                        <div className="font-mono tracking-widest text-[9px] text-slate-400">||| | |||| | ||| |||| |</div>
                        <span className="text-[9px] font-mono text-slate-400">AUTH: {student.admissionNo}</span>
                      </div>
                    )}

                    <div className="text-center">
                      <div className="w-28 border-b border-slate-400 mb-1" />
                      <strong className="block text-slate-800">Principal's Seal</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TEMPLATE 2: STUDENT RFID SMART ID CARD
                  ───────────────────────────────────────────────────────────── */}
              {selectedTemplate === 'student-id' && (
                <div
                  className="w-[320px] bg-white text-slate-900 rounded-[6px] shadow-2xl overflow-hidden border border-slate-300 font-sans select-none my-6 transition-all relative"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Card Lanyard Hole */}
                  <div className="w-full flex justify-center pt-2">
                    <div className="w-10 h-2 rounded-[2px] bg-slate-300" />
                  </div>

                  {/* Header Banner */}
                  <div
                    className="p-3 text-white text-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <h3 className="text-xs font-black tracking-wider uppercase">VIDYAFLOWW ACADEMY</h3>
                    <p className="text-[9px] tracking-widest uppercase text-slate-200">STUDENT IDENTITY CARD · 2026</p>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col items-center text-center">
                    {/* Photo with Accent Ring */}
                    <div
                      className="h-20 w-20 rounded-[4px] p-0.5 mb-2.5 overflow-hidden shadow-sm border-2"
                      style={{ borderColor: colors.accent }}
                    >
                      <img
                        src={student.photoUrl}
                        alt={student.name}
                        className="h-full w-full object-cover rounded-[2px]"
                      />
                    </div>

                    <h2 className="text-sm font-black text-slate-900">{student.name}</h2>
                    <span className="text-xs font-bold text-slate-600 block mt-0.5">
                      {student.grade} - Section {student.section}
                    </span>

                    {/* Metadata Table */}
                    <div className="w-full mt-3 py-2 border-y border-slate-200 grid grid-cols-2 gap-1 text-[11px] text-left">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Roll Number:</span>
                        <strong className="text-slate-900 font-mono">{student.rollNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Blood Group:</span>
                        <strong className="text-red-600 font-bold">{student.bloodGroup}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Admission ID:</span>
                        <strong className="text-slate-900 font-mono text-[10px]">{student.admissionNo}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Emergency Call:</span>
                        <span className="text-slate-800 font-mono text-[10px]">{student.phone}</span>
                      </div>
                    </div>

                    {/* Barcode & Hologram Band */}
                    {showBarcode && (
                      <div className="w-full mt-3 flex items-center justify-between px-2">
                        <div className="text-left font-mono tracking-tighter text-xs">
                          |||| ||| | ||||| || |||
                        </div>
                        <div
                          className="px-1.5 py-0.5 text-[8px] font-bold rounded-[2px] text-white"
                          style={{ backgroundColor: colors.accent }}
                        >
                          RFID CHIP
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Ribbon */}
                  <div className="bg-slate-100 py-1.5 px-3 text-center border-t border-slate-200 text-[9px] text-slate-500">
                    Valid across library, cafeteria & biometric turnstiles · Non-transferable
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TEMPLATE 3: STAFF ACCESS & ID BADGE
                  ───────────────────────────────────────────────────────────── */}
              {selectedTemplate === 'staff-id' && (
                <div
                  className="w-[440px] bg-white text-slate-900 rounded-[6px] shadow-2xl overflow-hidden border border-slate-300 font-sans select-none my-8 transition-all"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
                  }}
                >
                  <div
                    className="h-3 w-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <div className="p-4 flex items-center gap-4">
                    <div className="h-24 w-20 bg-slate-200 rounded-[3px] border border-slate-300 shrink-0 overflow-hidden flex items-center justify-center text-slate-400 font-bold">
                      PHOTO
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          NON-TEACHING STAFF CARD
                        </span>
                        <span
                          className="px-1.5 py-0.5 text-[9px] font-black uppercase text-white rounded-[2px]"
                          style={{ backgroundColor: colors.accent }}
                        >
                          ACCESS LEVEL 2
                        </span>
                      </div>
                      <h2 className="text-base font-black text-slate-900 mt-1">Surender Rawat</h2>
                      <p className="text-xs font-bold text-slate-600">Senior Heavy Bus Driver</p>

                      <div className="mt-2.5 grid grid-cols-2 gap-1 text-[11px] border-t border-slate-200 pt-1.5">
                        <div>
                          <span className="text-slate-400 block text-[9px]">STAFF ID:</span>
                          <strong className="font-mono text-slate-900">STF-DRV-014</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">DEPARTMENT:</span>
                          <strong className="text-slate-900">Transport Fleet</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 text-white p-2 px-4 flex items-center justify-between text-[10px]">
                    <span className="font-mono">POLICE VERIFIED: POL-DEL-2024</span>
                    <span className="font-mono text-amber-400">VALID TILL: 2027</span>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TEMPLATE 4: CERTIFICATE OF MERIT
                  ───────────────────────────────────────────────────────────── */}
              {selectedTemplate === 'certificate' && (
                <div
                  className="w-full max-w-[620px] bg-amber-50/40 text-slate-900 rounded-[4px] shadow-2xl p-6 relative border-4 border-double border-amber-600 font-serif select-none my-2 transition-all"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="text-center">
                    <h3 className="text-xs font-sans tracking-widest uppercase font-bold text-amber-800">
                      VIDYAFLOWW INTERNATIONAL ACADEMY
                    </h3>
                    <h1 className="text-2xl font-black text-slate-900 mt-1 uppercase tracking-wider font-serif">
                      Certificate of Merit
                    </h1>
                    <p className="text-xs italic text-slate-600 mt-0.5">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>

                    <div className="my-4">
                      <span className="text-xl font-bold text-slate-900 border-b-2 border-amber-600 px-6 pb-1 inline-block">
                        {student.name}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed font-sans">
                      of <strong>{student.grade} - {student.section}</strong> for securing <strong>First Rank in Annual Academic & STEM Olympiad</strong> with an outstanding score of <strong>{student.percentage}</strong> during academic session 2025-2026.
                    </p>

                    <div className="mt-8 flex items-end justify-between px-8 text-xs font-sans text-slate-700">
                      <div className="text-center">
                        <div className="w-24 border-b border-slate-500 mb-1" />
                        <span>Academic Dean</span>
                      </div>
                      <div className="h-10 w-10 rounded-full border-2 border-amber-600 flex items-center justify-center text-amber-700 font-bold text-[10px]">
                        SEAL
                      </div>
                      <div className="text-center">
                        <div className="w-24 border-b border-slate-500 mb-1" />
                        <span>Principal</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TEMPLATE 5: EXAM ADMIT CARD / HALL TICKET
                  ───────────────────────────────────────────────────────────── */}
              {selectedTemplate === 'admit-card' && (
                <div
                  className="w-full max-w-[560px] bg-white text-slate-900 rounded-[4px] shadow-2xl p-5 border border-slate-300 font-sans select-none my-2 transition-all"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="text-center border-b pb-2 border-slate-900">
                    <h2 className="text-sm font-black uppercase text-slate-900">VIDYAFLOWW INTERNATIONAL ACADEMY</h2>
                    <h3 className="text-xs font-bold text-indigo-700 uppercase">ANNUAL EXAMINATION 2026 · HALL TICKET / ADMIT CARD</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 text-[11px] border-b border-slate-200">
                    <div className="col-span-2 space-y-1">
                      <div><span className="text-slate-500">Candidate Name:</span> <strong className="text-slate-900">{student.name}</strong></div>
                      <div><span className="text-slate-500">Exam Roll Number:</span> <strong className="font-mono text-slate-900">{student.rollNo}</strong></div>
                      <div><span className="text-slate-500">Class & Section:</span> <strong>{student.grade}-{student.section}</strong></div>
                      <div><span className="text-slate-500">Center:</span> <strong>Hall 201 (Science Block)</strong></div>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-20 w-16 bg-slate-100 border border-slate-300 rounded-[2px] overflow-hidden">
                        <img src={student.photoUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700 border-y border-slate-300">
                          <th className="py-1 px-2">Date</th>
                          <th className="py-1 px-2">Time</th>
                          <th className="py-1 px-2">Subject</th>
                          <th className="py-1 px-2 text-right">Invigilator Sign</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr><td className="py-1 px-2 font-mono">15 Sep 2026</td><td className="py-1 px-2 font-mono">09:00 AM</td><td className="py-1 px-2 font-semibold">Mathematics Standard</td><td className="py-1 px-2 text-right">_______</td></tr>
                        <tr><td className="py-1 px-2 font-mono">18 Sep 2026</td><td className="py-1 px-2 font-mono">09:00 AM</td><td className="py-1 px-2 font-semibold">Science & Practical</td><td className="py-1 px-2 text-right">_______</td></tr>
                        <tr><td className="py-1 px-2 font-mono">21 Sep 2026</td><td className="py-1 px-2 font-mono">09:00 AM</td><td className="py-1 px-2 font-semibold">English Core</td><td className="py-1 px-2 text-right">_______</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                    <strong>Instructions:</strong> Must carry this Admit Card & ID Card daily. Reporting time 08:30 AM sharp.
                  </div>
                </div>
              )}
            </div>

            {/* ── CUSTOMIZATION CONTROLS PANEL (4 cols) ── */}
            <div className="lg:col-span-4 bg-[#141414] border border-border/80 rounded-[4px] p-3.5 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-primary" />
                  {isHindi ? 'डिजाइन सेटिंग्स' : 'Customization Studio'}
                </h3>
                <span className="text-[10px] font-mono text-muted-foreground">Reactive Engine</span>
              </div>

              {/* Sample Student Switcher */}
              <div className="space-y-1.5">
                <label className="block text-muted-foreground font-semibold">
                  {isHindi ? 'डेटा पूर्वावलोकन छात्र:' : 'Preview Record:'}
                </label>
                <select
                  value={selectedStudentIndex}
                  onChange={(e) => setSelectedStudentIndex(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#181818] text-foreground text-xs focus:outline-none"
                >
                  {SAMPLE_STUDENTS.map((s, idx) => (
                    <option key={s.id} value={idx}>
                      {s.name} ({s.grade}-{s.section} · Roll {s.rollNo})
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Palette Picker */}
              <div className="space-y-2">
                <label className="block text-muted-foreground font-semibold">
                  {isHindi ? 'कलर थीम एक्सेंट:' : 'Theme Accent Scheme:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setColorScheme('navy-gold')}
                    className={`p-2 rounded-[3px] border text-left flex items-center gap-2 cursor-pointer ${
                      colorScheme === 'navy-gold' ? 'border-primary bg-[#202020]' : 'border-border/70 bg-[#161616]'
                    }`}
                  >
                    <div className="h-4 w-4 rounded-[2px] bg-[#1e3a8a] border border-amber-400 shrink-0" />
                    <div>
                      <strong className="block text-foreground text-[11px]">Navy & Gold</strong>
                      <span className="text-[10px] text-muted-foreground">CBSE Classic</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setColorScheme('royal-emerald')}
                    className={`p-2 rounded-[3px] border text-left flex items-center gap-2 cursor-pointer ${
                      colorScheme === 'royal-emerald' ? 'border-primary bg-[#202020]' : 'border-border/70 bg-[#161616]'
                    }`}
                  >
                    <div className="h-4 w-4 rounded-[2px] bg-[#065f46] border border-emerald-400 shrink-0" />
                    <div>
                      <strong className="block text-foreground text-[11px]">Emerald</strong>
                      <span className="text-[10px] text-muted-foreground">Eco Excellence</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setColorScheme('crimson')}
                    className={`p-2 rounded-[3px] border text-left flex items-center gap-2 cursor-pointer ${
                      colorScheme === 'crimson' ? 'border-primary bg-[#202020]' : 'border-border/70 bg-[#161616]'
                    }`}
                  >
                    <div className="h-4 w-4 rounded-[2px] bg-[#881337] border border-rose-400 shrink-0" />
                    <div>
                      <strong className="block text-foreground text-[11px]">Crimson</strong>
                      <span className="text-[10px] text-muted-foreground">Heritage Royal</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setColorScheme('cyber-slate')}
                    className={`p-2 rounded-[3px] border text-left flex items-center gap-2 cursor-pointer ${
                      colorScheme === 'cyber-slate' ? 'border-primary bg-[#202020]' : 'border-border/70 bg-[#161616]'
                    }`}
                  >
                    <div className="h-4 w-4 rounded-[2px] bg-[#18181b] border border-indigo-500 shrink-0" />
                    <div>
                      <strong className="block text-foreground text-[11px]">Cyber Dark</strong>
                      <span className="text-[10px] text-muted-foreground">Modern Digital</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Orientation Switch */}
              <div className="space-y-1.5">
                <label className="block text-muted-foreground font-semibold">
                  {isHindi ? 'दस्तावेज़ ओरिएंटेशन:' : 'Document Orientation:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrientation('portrait')}
                    className={`py-1.5 px-3 rounded-[3px] text-xs font-bold border cursor-pointer ${
                      orientation === 'portrait' ? 'bg-[#252525] border-primary text-foreground' : 'bg-[#181818] border-border/70 text-muted-foreground'
                    }`}
                  >
                    Portrait (Vertical)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientation('landscape')}
                    className={`py-1.5 px-3 rounded-[3px] text-xs font-bold border cursor-pointer ${
                      orientation === 'landscape' ? 'bg-[#252525] border-primary text-foreground' : 'bg-[#181818] border-border/70 text-muted-foreground'
                    }`}
                  >
                    Landscape (Horizontal)
                  </button>
                </div>
              </div>

              {/* Elements Toggles */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <label className="block text-muted-foreground font-semibold">
                  {isHindi ? 'तत्व टॉगल करें:' : 'Visible Document Elements:'}
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground">Scannable Barcode & QR</span>
                    <input
                      type="checkbox"
                      checked={showBarcode}
                      onChange={(e) => setShowBarcode(e.target.checked)}
                      className="rounded-[2px] bg-[#181818] border-border"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground">Institutional Watermark</span>
                    <input
                      type="checkbox"
                      checked={showWatermark}
                      onChange={(e) => setShowWatermark(e.target.checked)}
                      className="rounded-[2px] bg-[#181818] border-border"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground">Official School Crest / Seal</span>
                    <input
                      type="checkbox"
                      checked={showSeal}
                      onChange={(e) => setShowSeal(e.target.checked)}
                      className="rounded-[2px] bg-[#181818] border-border"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground">Authorized Signature Lines</span>
                    <input
                      type="checkbox"
                      checked={showSignatures}
                      onChange={(e) => setShowSignatures(e.target.checked)}
                      className="rounded-[2px] bg-[#181818] border-border"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-border/60 space-y-2">
                <VFButton
                  className="w-full h-8 text-xs font-bold rounded-[3px]"
                  leftIcon={<Printer className="h-3.5 w-3.5" />}
                  onClick={handlePrintTrigger}
                >
                  {isHindi ? 'दस्तावेज़ प्रिंट करें' : 'Print Current Document'}
                </VFButton>
                <VFButton
                  variant="outline"
                  className="w-full h-8 text-xs font-bold rounded-[3px]"
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                  onClick={() => {
                    addNotification({
                      title: isHindi ? 'पीडीएफ तैयार' : 'High-Res PDF Exported',
                      description: `${selectedTemplate} exported at 300 DPI for ${student.name}.`,
                      type: 'success',
                    });
                  }}
                >
                  {isHindi ? 'पीडीएफ डाउनलोड करें' : 'Download 300 DPI PDF'}
                </VFButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 2: BATCH PRINT & GENERATION QUEUE
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'batch' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3.5 bg-[#141414] border-b border-border/80 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  {isHindi ? 'थोक प्रिंट व प्रमाण-पत्र निर्माण' : 'Bulk Batch Document Generation'}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isHindi ? 'पूरी कक्षा के मार्कशीट, आईडी कार्ड या प्रवेश पत्र एक साथ प्रिंट करें' : 'Generate and print complete classroom batches with automated roll indexing'}
                </p>
              </div>
              <VFBadge variant="outline" className="font-mono text-xs px-2.5 py-1 rounded-[3px]">
                Active Print Queue
              </VFBadge>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-[3px] bg-[#161616] border border-border/80 space-y-3">
                <h4 className="text-sm font-bold text-foreground">1. Select Target Group</h4>
                <select
                  value={batchClass}
                  onChange={(e) => setBatchClass(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#181818] text-foreground text-xs focus:outline-none"
                >
                  <option value="Grade 10-A (38 Students)">Grade 10-A (38 Students)</option>
                  <option value="Grade 10-B (40 Students)">Grade 10-B (40 Students)</option>
                  <option value="Grade 11-Science (42 Students)">Grade 11-Science (42 Students)</option>
                  <option value="Grade 12-Commerce (35 Students)">Grade 12-Commerce (35 Students)</option>
                  <option value="All Non-Teaching Staff (42 Members)">All Non-Teaching Staff (42 Members)</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Includes full roster with photos, parent contacts and registered Aadhaar tokens.
                </p>
              </div>

              <div className="p-3.5 rounded-[3px] bg-[#161616] border border-border/80 space-y-3">
                <h4 className="text-sm font-bold text-foreground">2. Document Type</h4>
                <select
                  value={batchDocType}
                  onChange={(e) => setBatchDocType(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#181818] text-foreground text-xs focus:outline-none"
                >
                  <option value="Student RFID ID Cards">Student RFID ID Cards (Plastic PVC Spec)</option>
                  <option value="CBSE Term Marksheets">CBSE Term Marksheets (Formal A4)</option>
                  <option value="Annual Merit Certificates">Annual Merit Certificates (Heavy Parchment)</option>
                  <option value="Board Exam Admit Cards">Board Exam Admit Cards (Laser Duplex)</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Applied theme: <strong className="text-foreground capitalize">{colorScheme.replace('-', ' ')}</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-[3px] bg-[#161616] border border-border/80 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-foreground">3. Execution</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Packages ready for thermal card printer or central high-volume Xerox laser presses.
                  </p>
                </div>
                <VFButton
                  onClick={handleBatchGenerate}
                  disabled={isBatchGenerating}
                  className="w-full h-8 text-xs font-bold rounded-[3px]"
                  leftIcon={<Printer className="h-3.5 w-3.5" />}
                >
                  {isBatchGenerating ? 'Compiling Batch...' : 'Generate & Queue Batch'}
                </VFButton>
              </div>
            </div>
          </div>

          {/* Recent Batch Runs Table */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3.5 bg-[#141414] border-b border-border/80">
              <h4 className="text-sm font-bold text-foreground">Recent Production Batches</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-3 px-4 text-xs font-semibold">Batch ID</th>
                    <th className="py-3 px-4 text-xs font-semibold">Class / Target</th>
                    <th className="py-3 px-4 text-xs font-semibold">Document Format</th>
                    <th className="py-3 px-4 text-xs font-semibold">Cards / Pages</th>
                    <th className="py-3 px-4 text-xs font-semibold">Status</th>
                    <th className="py-3 px-4 text-xs font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-xs text-primary">BATCH-2026-081</td>
                    <td className="py-3 px-4 text-foreground font-bold text-sm">Grade 10-A</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">Student RFID ID Cards</td>
                    <td className="py-3 px-4 font-mono text-xs font-bold text-foreground">38 Cards</td>
                    <td className="py-3 px-4">
                      <VFBadge variant="success" className="text-xs px-2 py-0.5 rounded-[3px]">
                        Printed & Dispatched
                      </VFBadge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          addNotification({
                            title: 'Re-printing Batch',
                            description: 'Sent 38 cards to PVC thermal printer spooler.',
                            type: 'info',
                          });
                        }}
                        className="px-3 py-1.5 rounded-[3px] bg-[#1c1c1c] hover:bg-[#252525] border border-border/80 text-xs font-bold text-foreground cursor-pointer"
                      >
                        Reprint
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-xs text-primary">BATCH-2026-079</td>
                    <td className="py-3 px-4 text-foreground font-bold text-sm">Grade 12-Science</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">CBSE Mid-Term Marksheets</td>
                    <td className="py-3 px-4 font-mono text-xs font-bold text-foreground">42 Pages</td>
                    <td className="py-3 px-4">
                      <VFBadge variant="success" className="text-xs px-2 py-0.5 rounded-[3px]">
                        Archived in Vault
                      </VFBadge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          addNotification({
                            title: 'Downloading Batch',
                            description: 'ZIP archive containing 42 PDF files downloaded.',
                            type: 'info',
                          });
                        }}
                        className="px-3 py-1.5 rounded-[3px] bg-[#1c1c1c] hover:bg-[#252525] border border-border/80 text-xs font-bold text-foreground cursor-pointer"
                      >
                        Download ZIP
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Print / Export Dialog ── */}
      <VFDialog
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        title={isHindi ? 'प्रिंट व पीडीएफ तैयार' : 'Print & PDF Spooler'}
        description={isHindi ? 'चयनित दस्तावेज़ उच्च रिज़ॉल्यूशन में प्रिंट करें' : 'Send document to network laser printer or export as high-fidelity vector PDF'}
        className="max-w-md rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsPrintModalOpen(false)}
              className="rounded-[3px]"
            >
              {isHindi ? 'बंद करें' : 'Close'}
            </VFButton>
            <VFButton
              size="sm"
              onClick={() => {
                window.print();
                setIsPrintModalOpen(false);
              }}
              className="rounded-[3px]"
            >
              {isHindi ? 'प्रिंट डायलॉग खोलें' : 'Send to Printer'}
            </VFButton>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div className="p-3 bg-[#161616] border border-border/80 rounded-[3px] space-y-1.5">
            <span className="text-xs font-bold text-foreground block">Ready for Production</span>
            <p className="text-xs text-muted-foreground">
              Document: <strong className="text-foreground capitalize">{selectedTemplate.replace('-', ' ')}</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Recipient: <strong className="text-foreground">{student.name} ({student.admissionNo})</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Resolution: <strong className="text-emerald-400 font-mono">300 DPI Vector High-Definition</strong>
            </p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Clicking <strong>Send to Printer</strong> invokes your system printer dialog with pre-configured page margins.
          </p>
        </div>
      </VFDialog>
    </VFPageContainer>
  );
}
