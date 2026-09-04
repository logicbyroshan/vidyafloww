import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFSelect,
  VFInput,
  VFDialog,
  VFDrawer,
  VFTable,
  VFTableHead,
  VFTableHeaderCell,
  VFTableBody,
  VFTableRow,
  VFTableCell,
  VFCard,
  cn,
} from '@vidyafloww/ui';
import {
  ClipboardList,
  Plus,
  Download,
  Check,
  Award,
  Calendar,
  Clock,
  Settings2,
  Building2,
  Printer,
  Edit3,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/examinations')({
  component: ExaminationsPage,
});

export interface ExamPaper {
  id: string;
  date: string;
  displayDate: string;
  subject: string;
  paperCode: string;
  grade: string;
  timeSlot: string;
  duration: string;
  hall: string;
  maxMarks: number;
  invigilator: string;
  status: 'Completed' | 'Active Today' | 'Upcoming';
}

export interface ExamRecord {
  id: string;
  code: string;
  title: string;
  session: string;
  grade: string;
  dates: string;
  totalCandidates: number;
  marksEnteredPct: number;
  status: 'Scheduled' | 'Active Live' | 'Evaluation' | 'Completed' | 'Published';
  papersCount: number;
  timetable: ExamPaper[];
}

export interface SubjectMarksScheme {
  id: string;
  subject: string;
  code: string;
  theoryMax: number;
  practicalMax: number;
  internalMax: number;
  totalMax: number;
  passCriteriaPct: number;
  separateTheoryPass: boolean;
}

export interface ClassMarksScheme {
  classId: string;
  className: string;
  board: string;
  description: string;
  subjects: SubjectMarksScheme[];
}

const DEFAULT_TIMETABLE_T1: ExamPaper[] = [
  { id: 'P1', date: '2026-09-18', displayDate: '18 Sep 2026 (Mon)', subject: 'Mathematics', paperCode: 'Code: 041', grade: 'Class 10 (A, B, C)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Hall A1–A4 (Block 1)', maxMarks: 80, invigilator: 'Dr. Rajesh Sharma', status: 'Completed' },
  { id: 'P2', date: '2026-09-21', displayDate: '21 Sep 2026 (Thu)', subject: 'Science (Physics, Chem & Bio)', paperCode: 'Code: 086', grade: 'Class 10 (A, B, C)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Hall A1–A4 (Block 1)', maxMarks: 80, invigilator: 'Mrs. Sunita Verma', status: 'Completed' },
  { id: 'P3', date: '2026-09-23', displayDate: '23 Sep 2026 (Sat)', subject: 'English Language & Literature', paperCode: 'Code: 184', grade: 'Class 10 (A, B, C)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Hall B1–B3 (Block 2)', maxMarks: 80, invigilator: 'Mr. Arvind Saxena', status: 'Active Today' },
  { id: 'P4', date: '2026-09-25', displayDate: '25 Sep 2026 (Mon)', subject: 'Social Science (History, Geo, Civics)', paperCode: 'Code: 087', grade: 'Class 10 (A, B, C)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Hall A1–A4 (Block 1)', maxMarks: 80, invigilator: 'Ms. Meenakshi Iyer', status: 'Upcoming' },
  { id: 'P5', date: '2026-09-28', displayDate: '28 Sep 2026 (Thu)', subject: 'Hindi Course-A / Course-B', paperCode: 'Code: 002', grade: 'Class 10 (A, B, C)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Hall B1–B4 (Block 2)', maxMarks: 80, invigilator: 'Pt. Rameshwar Dayal', status: 'Upcoming' },
  { id: 'P6', date: '2026-09-30', displayDate: '30 Sep 2026 (Sat)', subject: 'Information Technology (Skill 402)', paperCode: 'Code: 402', grade: 'Class 10 (A, B, C)', timeSlot: '09:00 AM – 11:00 AM', duration: '2 Hours', hall: 'Computer Labs 1 & 2', maxMarks: 50, invigilator: 'Mr. Pradeep Rawat', status: 'Upcoming' },
];

const INITIAL_EXAMS: ExamRecord[] = [
  {
    id: '1',
    code: 'EXAM-2026-T1',
    title: 'Term 1 Mid-Year Summative Examination',
    session: '2026–2027',
    grade: 'All Classes (6–12)',
    dates: '18 Sep – 30 Sep 2026',
    totalCandidates: 1248,
    marksEnteredPct: 84,
    status: 'Active Live',
    papersCount: 6,
    timetable: DEFAULT_TIMETABLE_T1,
  },
  {
    id: '2',
    code: 'EXAM-2026-UT2',
    title: 'Periodic Unit Test 2 (Secondary & Sr. Sec)',
    session: '2026–2027',
    grade: 'Class 9, 10, 11, 12',
    dates: '22 Aug – 25 Aug 2026',
    totalCandidates: 620,
    marksEnteredPct: 100,
    status: 'Evaluation',
    papersCount: 4,
    timetable: [
      { id: 'UT2-1', date: '2026-08-22', displayDate: '22 Aug 2026 (Mon)', subject: 'Mathematics', paperCode: '041', grade: 'Class 9 & 10', timeSlot: '08:30 AM – 10:00 AM', duration: '1.5 Hours', hall: 'Regular Classrooms', maxMarks: 40, invigilator: 'Class Teachers', status: 'Completed' },
      { id: 'UT2-2', date: '2026-08-23', displayDate: '23 Aug 2026 (Tue)', subject: 'Science', paperCode: '086', grade: 'Class 9 & 10', timeSlot: '08:30 AM – 10:00 AM', duration: '1.5 Hours', hall: 'Regular Classrooms', maxMarks: 40, invigilator: 'Class Teachers', status: 'Completed' },
      { id: 'UT2-3', date: '2026-08-24', displayDate: '24 Aug 2026 (Wed)', subject: 'Social Science', paperCode: '087', grade: 'Class 9 & 10', timeSlot: '08:30 AM – 10:00 AM', duration: '1.5 Hours', hall: 'Regular Classrooms', maxMarks: 40, invigilator: 'Class Teachers', status: 'Completed' },
      { id: 'UT2-4', date: '2026-08-25', displayDate: '25 Aug 2026 (Thu)', subject: 'English', paperCode: '184', grade: 'Class 9 & 10', timeSlot: '08:30 AM – 10:00 AM', duration: '1.5 Hours', hall: 'Regular Classrooms', maxMarks: 40, invigilator: 'Class Teachers', status: 'Completed' },
    ],
  },
  {
    id: '3',
    code: 'EXAM-2026-PRE',
    title: 'Pre-Board Mock Examination 1 (CBSE)',
    session: '2026–2027',
    grade: 'Class 10 & 12',
    dates: '02 Dec – 14 Dec 2026',
    totalCandidates: 380,
    marksEnteredPct: 0,
    status: 'Scheduled',
    papersCount: 5,
    timetable: [
      { id: 'PB-1', date: '2026-12-02', displayDate: '02 Dec 2026 (Wed)', subject: 'Physics / Accountancy', paperCode: '042 / 055', grade: 'Class 12 (Sci/Com)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Auditorium Hall', maxMarks: 70, invigilator: 'External Observers', status: 'Upcoming' },
      { id: 'PB-2', date: '2026-12-05', displayDate: '05 Dec 2026 (Sat)', subject: 'Chemistry / Business Studies', paperCode: '043 / 054', grade: 'Class 12 (Sci/Com)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Auditorium Hall', maxMarks: 70, invigilator: 'External Observers', status: 'Upcoming' },
      { id: 'PB-3', date: '2026-12-08', displayDate: '08 Dec 2026 (Tue)', subject: 'Mathematics / Applied Maths', paperCode: '041 / 241', grade: 'Class 12', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Auditorium Hall', maxMarks: 80, invigilator: 'External Observers', status: 'Upcoming' },
      { id: 'PB-4', date: '2026-12-11', displayDate: '11 Dec 2026 (Fri)', subject: 'English Core', paperCode: '301', grade: 'Class 12', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Auditorium Hall', maxMarks: 80, invigilator: 'External Observers', status: 'Upcoming' },
      { id: 'PB-5', date: '2026-12-14', displayDate: '14 Dec 2026 (Mon)', subject: 'Biology / Economics', paperCode: '044 / 030', grade: 'Class 12 (Sci/Com)', timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Auditorium Hall', maxMarks: 70, invigilator: 'External Observers', status: 'Upcoming' },
    ],
  },
];

const INITIAL_MARKS_SCHEMES: Record<string, ClassMarksScheme> = {
  'class-10': {
    classId: 'class-10',
    className: 'Class 10 (Secondary - CBSE Board)',
    board: 'CBSE Aligned (80 Theory + 20 Internal Assessment)',
    description: 'Passing criterion requires 33% overall aggregate. 20 Marks Internal Assessment comprises Periodic Tests (5), Multiple Assessment (5), Portfolio (5), and Subject Enrichment (5).',
    subjects: [
      { id: 's1', subject: 'Mathematics (Standard / Basic)', code: '041 / 241', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's2', subject: 'Science (Physics, Chemistry & Life Processes)', code: '086', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's3', subject: 'Social Science (Hist, Geo, Pol Sci, Econ)', code: '087', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's4', subject: 'English Language & Literature', code: '184', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's5', subject: 'Hindi Course-A / Course-B', code: '002 / 085', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's6', subject: 'Information Technology (Vocational Skill)', code: '402', theoryMax: 50, practicalMax: 50, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
    ],
  },
  'class-12-sci': {
    classId: 'class-12-sci',
    className: 'Class 12 - Science (PCM / PCB)',
    board: 'CBSE Senior Secondary (70 Theory + 30 Practical / Lab Viva)',
    description: 'CBSE Mandatory Regulation: Candidate MUST secure minimum 33% in Theory (23/70) AND 33% in Practical Examination (10/30) separately to qualify.',
    subjects: [
      { id: 's12-1', subject: 'Physics', code: '042', theoryMax: 70, practicalMax: 30, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
      { id: 's12-2', subject: 'Chemistry', code: '043', theoryMax: 70, practicalMax: 30, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
      { id: 's12-3', subject: 'Biology', code: '044', theoryMax: 70, practicalMax: 30, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
      { id: 's12-4', subject: 'Mathematics', code: '041', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's12-5', subject: 'English Core', code: '301', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's12-6', subject: 'Computer Science (Python)', code: '083', theoryMax: 70, practicalMax: 30, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
    ],
  },
  'class-12-com': {
    classId: 'class-12-com',
    className: 'Class 12 - Commerce & Humanities',
    board: 'CBSE Senior Secondary (80 Theory + 20 Project / Viva)',
    description: 'Candidates must pass separately in Theory and Project/Viva work with 33% threshold per subject.',
    subjects: [
      { id: 's12c-1', subject: 'Accountancy', code: '055', theoryMax: 80, practicalMax: 20, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
      { id: 's12c-2', subject: 'Business Studies', code: '054', theoryMax: 80, practicalMax: 20, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
      { id: 's12c-3', subject: 'Economics', code: '030', theoryMax: 80, practicalMax: 20, internalMax: 0, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: true },
      { id: 's12c-4', subject: 'Applied Mathematics', code: '241', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's12c-5', subject: 'English Core', code: '301', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
    ],
  },
  'class-9': {
    classId: 'class-9',
    className: 'Class 9 (Secondary Foundation)',
    board: 'Continuous & Comprehensive Evaluation (80 Exam + 20 Internal)',
    description: 'Evaluation pattern mirrored to Board standards for smooth transition to Grade 10.',
    subjects: [
      { id: 's9-1', subject: 'Mathematics', code: '041', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's9-2', subject: 'Science', code: '086', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's9-3', subject: 'Social Science', code: '087', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's9-4', subject: 'English Language', code: '184', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's9-5', subject: 'Hindi Course-A', code: '002', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
    ],
  },
  'class-6-8': {
    classId: 'class-6-8',
    className: 'Class 6–8 (Middle School Foundation)',
    board: 'Uniform Assessment Scheme (80 Half-Yearly + 20 Periodic Assessment)',
    description: 'Term-end exam (80 marks) + Periodic Test (10 marks) + Notebook submission (5 marks) + Subject Enrichment activity (5 marks).',
    subjects: [
      { id: 's6-1', subject: 'Mathematics', code: 'M-MID', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's6-2', subject: 'Science & Nature', code: 'S-MID', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's6-3', subject: 'Social Science', code: 'SS-MID', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's6-4', subject: 'English Grammar & Literature', code: 'ENG-MID', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's6-5', subject: 'Hindi Reader & Vyakaran', code: 'HIN-MID', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
      { id: 's6-6', subject: 'Sanskrit / Third Language', code: 'SKT-MID', theoryMax: 80, practicalMax: 0, internalMax: 20, totalMax: 100, passCriteriaPct: 33, separateTheoryPass: false },
    ],
  },
};

const CBSE_GRADING_SCALE = [
  { grade: 'A1', min: 91, max: 100, desc: 'Outstanding · Top 1/8th of passed candidates', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  { grade: 'A2', min: 81, max: 90, desc: 'Excellent · Next 1/8th of passed candidates', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
  { grade: 'B1', min: 71, max: 80, desc: 'Very Good · Next 1/8th of passed candidates', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
  { grade: 'B2', min: 61, max: 70, desc: 'Good · Next 1/8th of passed candidates', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  { grade: 'C1', min: 51, max: 60, desc: 'Fair · Next 1/8th of passed candidates', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  { grade: 'C2', min: 41, max: 50, desc: 'Average · Next 1/8th of passed candidates', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
  { grade: 'D', min: 33, max: 40, desc: 'Pass · Minimum qualifying score threshold', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' },
  { grade: 'E', min: 0, max: 32, desc: 'Essential Repeat · Compartment / Remedial required', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
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
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'परीक्षा प्रबंधन' : 'Examinations & Assessments') + ' \u2013 VidyaFloww';
  }, [isHindi]);

  // Main Active Tab View: timetable | scheme | marks
  const [activeView, setActiveView] = React.useState<'timetable' | 'scheme' | 'marks'>('timetable');

  // Exam list & Selected Exam for Timetable
  const [exams, setExams] = React.useState<ExamRecord[]>(INITIAL_EXAMS);
  const [selectedExamId, setSelectedExamId] = React.useState<string>(INITIAL_EXAMS[0].id);

  // Marks Schemes by Class
  const [marksSchemes, setMarksSchemes] = React.useState<Record<string, ClassMarksScheme>>(INITIAL_MARKS_SCHEMES);
  const [selectedSchemeClass, setSelectedSchemeClass] = React.useState<string>('class-10');
  const [isEditingScheme, setIsEditingScheme] = React.useState(false);
  const [editingSubjects, setEditingSubjects] = React.useState<SubjectMarksScheme[]>(INITIAL_MARKS_SCHEMES['class-10'].subjects);

  // Marks entry state
  const [marksData, setMarksData] = React.useState<StudentMarkRow[]>(INITIAL_STUDENT_MARKS);
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 10-A');

  // Drawers & Modals
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = React.useState(false);
  const [isAddPaperModalOpen, setIsAddPaperModalOpen] = React.useState(false);

  // Add new exam form state
  const [newExamTitle, setNewExamTitle] = React.useState('');
  const [newExamCode, setNewExamCode] = React.useState(`EXAM-2026-0${exams.length + 1}`);
  const [newExamSession] = React.useState('2026–2027');
  const [newExamGrade, setNewExamGrade] = React.useState('All Classes (6–12)');
  const [newExamDates, setNewExamDates] = React.useState('15 Nov – 28 Nov 2026');
  const [newExamCandidates, setNewExamCandidates] = React.useState(600);

  // Add paper form state
  const [paperSubject, setPaperSubject] = React.useState('');
  const [paperCode, setPaperCode] = React.useState('');
  const [paperDate] = React.useState('2026-09-29');
  const [paperDisplayDate, setPaperDisplayDate] = React.useState('29 Sep 2026 (Tue)');
  const [paperTimeSlot, setPaperTimeSlot] = React.useState('09:00 AM – 12:00 PM');
  const [paperDuration] = React.useState('3 Hours');
  const [paperHall, setPaperHall] = React.useState('Hall A1–A4 (Block 1)');
  const [paperMaxMarks, setPaperMaxMarks] = React.useState(80);
  const [paperInvigilator, setPaperInvigilator] = React.useState('Senior Faculty');

  // Active exam object
  const activeExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  // When class changes in Scheme view, load that class's subjects
  React.useEffect(() => {
    if (marksSchemes[selectedSchemeClass]) {
      setEditingSubjects([...marksSchemes[selectedSchemeClass].subjects]);
      setIsEditingScheme(false);
    }
  }, [selectedSchemeClass, marksSchemes]);

  // Handle Save Edited Scheme for selected class
  const handleSaveClassScheme = () => {
    // Validate each subject sums to 100
    const invalid = editingSubjects.find((s) => s.theoryMax + s.practicalMax + s.internalMax !== s.totalMax);
    if (invalid) {
      addNotification({
        title: isHindi ? 'योजना सत्यापन विफल' : 'Invalid Marks Scheme',
        description: `Subject "${invalid.subject}" marks (Theory: ${invalid.theoryMax} + Practical: ${invalid.practicalMax} + Internal: ${invalid.internalMax}) do not equal total ${invalid.totalMax}.`,
        type: 'warning',
      });
      return;
    }

    setMarksSchemes((prev) => ({
      ...prev,
      [selectedSchemeClass]: {
        ...prev[selectedSchemeClass],
        subjects: editingSubjects,
      },
    }));
    setIsEditingScheme(false);

    addNotification({
      title: isHindi ? 'अंक योजना सहेजी गई' : 'Marks Scheme Updated',
      description: `${marksSchemes[selectedSchemeClass]?.className} marks & evaluation weights saved successfully.`,
      type: 'success',
    });
  };

  // Reset to default board scheme
  const handleResetToBoardScheme = () => {
    const defaultScheme = INITIAL_MARKS_SCHEMES[selectedSchemeClass];
    if (defaultScheme) {
      setEditingSubjects([...defaultScheme.subjects]);
      setMarksSchemes((prev) => ({
        ...prev,
        [selectedSchemeClass]: { ...defaultScheme },
      }));
      setIsEditingScheme(false);
      addNotification({
        title: isHindi ? 'मानक योजना पुनः स्थापित' : 'Reset to CBSE Standard',
        description: `Reverted ${defaultScheme.className} to official board criteria.`,
        type: 'info',
      });
    }
  };

  // Handle Schedule Exam Submit
  const handleCreateExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) return;

    const created: ExamRecord = {
      id: String(Date.now()),
      code: newExamCode.trim(),
      title: newExamTitle.trim(),
      session: newExamSession,
      grade: newExamGrade,
      dates: newExamDates,
      totalCandidates: Number(newExamCandidates) || 500,
      marksEnteredPct: 0,
      status: 'Scheduled',
      papersCount: 5,
      timetable: [
        { id: `NEW-1`, date: '2026-11-16', displayDate: '16 Nov 2026 (Mon)', subject: 'Core Subject 1', paperCode: 'Code: 001', grade: newExamGrade, timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Main Exam Halls', maxMarks: 80, invigilator: 'Department Faculty', status: 'Upcoming' },
        { id: `NEW-2`, date: '2026-11-19', displayDate: '19 Nov 2026 (Thu)', subject: 'Core Subject 2', paperCode: 'Code: 002', grade: newExamGrade, timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Main Exam Halls', maxMarks: 80, invigilator: 'Department Faculty', status: 'Upcoming' },
        { id: `NEW-3`, date: '2026-11-23', displayDate: '23 Nov 2026 (Mon)', subject: 'Core Subject 3', paperCode: 'Code: 003', grade: newExamGrade, timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Main Exam Halls', maxMarks: 80, invigilator: 'Department Faculty', status: 'Upcoming' },
        { id: `NEW-4`, date: '2026-11-26', displayDate: '26 Nov 2026 (Thu)', subject: 'Language / Elective', paperCode: 'Code: 004', grade: newExamGrade, timeSlot: '09:00 AM – 12:00 PM', duration: '3 Hours', hall: 'Main Exam Halls', maxMarks: 80, invigilator: 'Department Faculty', status: 'Upcoming' },
        { id: `NEW-5`, date: '2026-11-28', displayDate: '28 Nov 2026 (Sat)', subject: 'Skill / Vocational', paperCode: 'Code: 005', grade: newExamGrade, timeSlot: '09:00 AM – 11:00 AM', duration: '2 Hours', hall: 'Lab Centers', maxMarks: 50, invigilator: 'Lab Instructors', status: 'Upcoming' },
      ],
    };

    setExams([created, ...exams]);
    setSelectedExamId(created.id);
    setIsScheduleDrawerOpen(false);
    setNewExamTitle('');
    setNewExamCode(`EXAM-2026-0${exams.length + 2}`);

    addNotification({
      title: isHindi ? 'परीक्षा व समय-सारणी प्रकाशित' : 'Exam & Timetable Published',
      description: `"${created.title}" [${created.code}] scheduled with 5 papers.`,
      type: 'success',
    });
  };

  // Add single paper to active exam timetable
  const handleAddPaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperSubject.trim()) return;

    const newPaper: ExamPaper = {
      id: `P-${Date.now()}`,
      date: paperDate,
      displayDate: paperDisplayDate,
      subject: paperSubject.trim(),
      paperCode: paperCode.trim() || 'Sub Code: 101',
      grade: activeExam.grade,
      timeSlot: paperTimeSlot,
      duration: paperDuration,
      hall: paperHall,
      maxMarks: Number(paperMaxMarks) || 80,
      invigilator: paperInvigilator,
      status: 'Upcoming',
    };

    setExams((prev) =>
      prev.map((ex) =>
        ex.id === activeExam.id
          ? {
              ...ex,
              papersCount: ex.timetable.length + 1,
              timetable: [...ex.timetable, newPaper],
            }
          : ex
      )
    );

    setIsAddPaperModalOpen(false);
    setPaperSubject('');
    setPaperCode('');

    addNotification({
      title: isHindi ? 'प्रश्नपत्र समय-सारणी में जोड़ा गया' : 'Paper Added to Date Sheet',
      description: `${newPaper.subject} scheduled for ${newPaper.displayDate}.`,
      type: 'success',
    });
  };

  const currentScheme = marksSchemes[selectedSchemeClass] || marksSchemes['class-10'];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* 1. Header Action Toolbar (No redundant page title) */}
      <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 shrink-0 shadow-xs">
        {/* Left: Session Badge & 3 Main View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Active Session & Term Status Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#1a1a1a] border border-border/80 text-xs font-mono">
            <ClipboardList className="h-3.5 w-3.5 text-purple-400" />
            <span className="font-bold text-foreground">{isHindi ? 'सत्र 2026–27' : 'AY 2026–27'}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="h-4 w-[1px] bg-border/80 hidden sm:block" />

          {/* 3 Unified View Tabs */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-0.5 rounded-[4px] border border-border/70 text-xs">
            <button
              type="button"
              onClick={() => setActiveView('timetable')}
              className={cn(
                "px-3 py-1 font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5",
                activeView === 'timetable'
                  ? "bg-[#242424] text-foreground shadow-xs border border-border/70"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span>{isHindi ? 'समय-सारणी (टाइमटेबल)' : 'Exam Timetable'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('scheme')}
              className={cn(
                "px-3 py-1 font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5",
                activeView === 'scheme'
                  ? "bg-[#242424] text-foreground shadow-xs border border-border/70"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Settings2 className="h-3.5 w-3.5 text-teal-400" />
              <span>{isHindi ? 'कक्षावार अंक योजना' : 'Marks Scheme (Class-wise)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('marks')}
              className={cn(
                "px-3 py-1 font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5",
                activeView === 'marks'
                  ? "bg-[#242424] text-foreground shadow-xs border border-border/70"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Award className="h-3.5 w-3.5 text-primary" />
              <span>{isHindi ? 'अंक प्रविष्टि रजिस्टर' : 'Marks Entry Register'}</span>
            </button>
          </div>
        </div>

        {/* Right Actions: Export & Schedule New Exam */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            onClick={() => {
              addNotification({
                title: isHindi ? 'समय-सारणी एक्सपोर्ट की गई' : 'Exam Schedule Exported',
                description: `Exported official date sheet for ${activeExam.title} (PDF/Excel).`,
                type: 'success',
              });
            }}
            className="h-8 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground rounded-[4px]"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            {isHindi ? 'एक्सपोर्ट' : 'Export'}
          </VFButton>

          <VFButton
            size="sm"
            onClick={() => setIsScheduleDrawerOpen(true)}
            className="h-8 px-3 text-xs font-bold shadow-xs rounded-[4px] bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? 'नई परीक्षा शेड्यूल करें' : '+ Schedule Exam'}
          </VFButton>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 1: EXAM TIMETABLE & DATE SHEET
          ══════════════════════════════════════════════════════════════════════ */}
      {activeView === 'timetable' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
          {/* Exam Selector Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
            {exams.map((ex) => {
              const isSelected = ex.id === activeExam.id;
              return (
                <div
                  key={ex.id}
                  onClick={() => setSelectedExamId(ex.id)}
                  className={cn(
                    "p-3 rounded-[4px] border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none shadow-xs",
                    isSelected
                      ? "bg-[#18181c] border-purple-500/60 ring-1 ring-purple-500/40"
                      : "bg-[#141414] border-border/80 hover:bg-[#181818] hover:border-zinc-500/60"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase">
                        {ex.code}
                      </span>
                      <h3 className="font-extrabold text-foreground text-sm leading-tight mt-0.5">
                        {ex.title}
                      </h3>
                      <p className="text-xs text-purple-400 font-semibold mt-1 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {ex.dates}
                      </p>
                    </div>
                    <VFBadge
                      variant={
                        ex.status === 'Active Live'
                          ? 'danger'
                          : ex.status === 'Evaluation'
                          ? 'warning'
                          : ex.status === 'Published'
                          ? 'success'
                          : 'outline'
                      }
                      className="text-[11px] font-bold shrink-0"
                    >
                      {ex.status}
                    </VFBadge>
                  </div>

                  <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>{ex.grade}</span>
                    <span className="font-bold text-foreground">
                      {ex.timetable.length} {isHindi ? 'प्रश्नपत्र' : 'Papers'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Exam Date Sheet Header & Controls */}
          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-[4px] bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                  <span>{activeExam.title}</span>
                  <span className="font-mono text-xs text-muted-foreground">({activeExam.code})</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isHindi ? 'संस्थागत आधिकारिक समय-सारणी व कक्ष आवंटन' : 'Official Academic Date Sheet & Hall Allocations'} · {activeExam.dates}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <VFButton
                size="sm"
                variant="outline"
                onClick={() => setIsAddPaperModalOpen(true)}
                className="h-8 px-3 text-xs font-bold rounded-[4px] bg-[#1a1a1a] hover:bg-[#222] border-border text-foreground"
                leftIcon={<Plus className="h-3.5 w-3.5 text-purple-400" />}
              >
                {isHindi ? 'प्रश्नपत्र जोड़ें' : '+ Add Paper'}
              </VFButton>
              <VFButton
                size="sm"
                variant="outline"
                onClick={() => {
                  window.print();
                }}
                className="h-8 px-3 text-xs font-bold rounded-[4px] bg-[#1a1a1a] hover:bg-[#222] border-border text-foreground"
                leftIcon={<Printer className="h-3.5 w-3.5" />}
              >
                {isHindi ? 'प्रिंट स्लिप' : 'Print Date Sheet'}
              </VFButton>
            </div>
          </div>

          {/* Official Date Sheet — Card Grid Layout */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-0.5">
            <div className="space-y-2.5 pb-4">
              {activeExam.timetable.map((paper, idx) => {
                const statusColor =
                  paper.status === 'Completed'
                    ? 'border-l-emerald-500 bg-emerald-500/5'
                    : paper.status === 'Active Today'
                    ? 'border-l-rose-500 bg-rose-500/5'
                    : 'border-l-purple-500/40 bg-[#141414]';

                return (
                  <div
                    key={paper.id}
                    className={cn(
                      'flex items-stretch gap-0 rounded-[4px] border border-border/80 overflow-hidden border-l-4 transition-all duration-150 hover:border-border',
                      statusColor
                    )}
                  >
                    {/* Date Block — Left Panel */}
                    <div className="w-[100px] shrink-0 flex flex-col items-center justify-center bg-[#111113] border-r border-border/80 px-3 py-3 text-center">
                      <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
                        {paper.displayDate.split(' ')[1]} {paper.displayDate.split(' ')[2]}
                      </span>
                      <span className="text-3xl font-black text-foreground leading-none">
                        {paper.displayDate.split(' ')[0]}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground mt-0.5 uppercase">
                        {paper.displayDate.match(/\(([^)]+)\)/)?.[1] || ''}
                      </span>
                    </div>

                    {/* Center: Subject + Time Info */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3">
                      {/* Subject Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/25 px-1.5 py-0.5 rounded-[3px] uppercase tracking-wider whitespace-nowrap">
                            {paper.paperCode}
                          </span>
                          <span className="text-[11px] font-mono text-muted-foreground">
                            · {isHindi ? 'क्रमांक' : 'Paper'} {idx + 1} / {activeExam.timetable.length}
                          </span>
                        </div>
                        <h4 className="font-black text-foreground text-sm leading-tight truncate">
                          {paper.subject}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {paper.grade}
                        </p>
                      </div>

                      {/* Time & Hall */}
                      <div className="flex sm:flex-col gap-3 sm:gap-1 text-xs sm:text-right shrink-0">
                        <div className="flex items-center gap-1.5 text-foreground font-mono font-bold whitespace-nowrap">
                          <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span>{paper.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground font-medium whitespace-nowrap">
                          <Building2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                          <span>{paper.hall}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Marks + Invigilator + Status */}
                    <div className="w-[160px] shrink-0 flex flex-col items-center justify-center border-l border-border/80 px-3 py-3 gap-1.5 bg-[#111113]">
                      <div className="text-center">
                        <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Max Marks</p>
                        <p className="text-2xl font-black text-emerald-400 leading-none mt-0.5">{paper.maxMarks}</p>
                        <p className="text-[10px] font-medium text-muted-foreground mt-0.5">{paper.duration}</p>
                      </div>
                      <div className="w-full border-t border-border/60 pt-1.5 text-center">
                        <p className="text-[10px] text-muted-foreground truncate">{paper.invigilator}</p>
                      </div>
                      <VFBadge
                        variant={
                          paper.status === 'Completed'
                            ? 'success'
                            : paper.status === 'Active Today'
                            ? 'danger'
                            : 'outline'
                        }
                        className="text-[11px] font-bold"
                      >
                        {paper.status === 'Active Today' ? (
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                            {isHindi ? 'आज' : 'Live'}
                          </span>
                        ) : paper.status === 'Completed' ? (
                          isHindi ? 'संपन्न' : 'Done'
                        ) : (
                          isHindi ? 'आगामी' : 'Upcoming'
                        )}
                      </VFBadge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 2: CLASS-WISE MARKS SCHEME & WEIGHTAGES CONFIGURATOR
          ══════════════════════════════════════════════════════════════════════ */}
      {activeView === 'scheme' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3 overflow-y-auto custom-scrollbar pr-0.5">
          {/* Class Switcher Strip */}
          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-[4px] bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
                <Settings2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-foreground">
                  {isHindi ? 'कक्षावार अंक योजना व मूल्यांकन मापदंड' : 'Class-wise Marks Scheme & Evaluation Weightages'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isHindi ? 'प्रत्येक कक्षा के लिए सैद्धांतिक, प्रायोगिक और आंतरिक मूल्यांकन अंक निर्धारित करें।' : 'Configure theory, practical, and internal assessment allocations per class.'}
                </p>
              </div>
            </div>

            {/* Class Dropdown Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
                {isHindi ? 'कक्षा चुनें:' : 'Select Grade:'}
              </span>
              <div className="w-64">
                <VFSelect
                  value={selectedSchemeClass}
                  onChange={(e) => setSelectedSchemeClass(String(e.target.value))}
                  options={[
                    { label: 'Class 10 (Secondary - CBSE)', value: 'class-10' },
                    { label: 'Class 12 - Science (PCM/PCB)', value: 'class-12-sci' },
                    { label: 'Class 12 - Commerce & Humanities', value: 'class-12-com' },
                    { label: 'Class 9 (Secondary Foundation)', value: 'class-9' },
                    { label: 'Class 6–8 (Middle School)', value: 'class-6-8' },
                  ]}
                  className="bg-[#1a1a1a] border-border h-8 text-xs font-bold rounded-[4px]"
                />
              </div>
            </div>
          </div>

          {/* Active Class Scheme Detail Banner */}
          <div className="p-4 rounded-[4px] bg-[#18181c] border border-teal-500/30 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shrink-0">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h4 className="font-extrabold text-foreground text-base">{currentScheme.className}</h4>
                <span className="text-xs font-mono font-bold text-teal-400 border border-teal-500/40 bg-teal-500/10 px-2 py-0.5 rounded-[3px]">
                  {currentScheme.board}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                {currentScheme.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!isEditingScheme ? (
                <VFButton
                  size="sm"
                  onClick={() => setIsEditingScheme(true)}
                  className="h-8 px-3 text-xs font-bold rounded-[4px] bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                  leftIcon={<Edit3 className="h-3.5 w-3.5" />}
                >
                  {isHindi ? 'योजना संपादित करें' : 'Edit Scheme'}
                </VFButton>
              ) : (
                <div className="flex items-center gap-2">
                  <VFButton
                    size="sm"
                    variant="outline"
                    onClick={handleResetToBoardScheme}
                    className="h-8 px-2.5 text-xs font-bold rounded-[4px] bg-[#1a1a1a] border-border text-muted-foreground hover:text-foreground"
                    leftIcon={<RotateCcw className="h-3 w-3" />}
                  >
                    {isHindi ? 'रीसेट' : 'Reset to Board'}
                  </VFButton>
                  <VFButton
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingSubjects([...currentScheme.subjects]);
                      setIsEditingScheme(false);
                    }}
                    className="h-8 px-2.5 text-xs font-bold rounded-[4px] bg-[#1a1a1a] border-border text-foreground"
                  >
                    {isHindi ? 'रद्द करें' : 'Cancel'}
                  </VFButton>
                  <VFButton
                    size="sm"
                    onClick={handleSaveClassScheme}
                    className="h-8 px-3 text-xs font-bold rounded-[4px] bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                    leftIcon={<Save className="h-3.5 w-3.5" />}
                  >
                    {isHindi ? 'सहेजें' : 'Save Scheme'}
                  </VFButton>
                </div>
              )}
            </div>
          </div>

          {/* Subject-Wise Marks Allocation Table */}
          <VFCard className="bg-[#141414] border-border/80" bodyClassName="p-0 overflow-x-auto">
            <VFTable className="rounded-none border-0 text-xs">
              <VFTableHead className="bg-[#1a1a1a]">
                <VFTableRow>
                  <VFTableHeaderCell className="py-3 px-4 text-xs font-bold text-muted-foreground">{isHindi ? 'विषय' : 'Subject'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground">{isHindi ? 'कोड' : 'Subject Code'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'सैद्धांतिक (Theory Max)' : 'Theory Marks'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'प्रायोगिक (Practical/Lab)' : 'Practical Marks'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'आंतरिक (Internal/Periodic)' : 'Internal Assessment'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'कुल योग' : 'Total Marks'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'उत्तीर्णांक (Pass %)' : 'Passing Criteria'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-4 text-xs font-bold text-muted-foreground text-right">{isHindi ? 'सत्यापन' : 'Validation'}</VFTableHeaderCell>
                </VFTableRow>
              </VFTableHead>
              <VFTableBody>
                {editingSubjects.map((sub, idx) => {
                  const currentTotal = sub.theoryMax + sub.practicalMax + sub.internalMax;
                  const isValidTotal = currentTotal === sub.totalMax;

                  return (
                    <VFTableRow key={sub.id} className="hover:bg-[#1a1a1a]/70">
                      <VFTableCell className="py-3 px-4 font-extrabold text-foreground text-xs">
                        {sub.subject}
                      </VFTableCell>
                      <VFTableCell className="py-3 px-3 font-mono font-bold text-muted-foreground text-xs">
                        {sub.code}
                      </VFTableCell>

                      {/* Theory Max Input / Display */}
                      <VFTableCell className="py-2 px-3 text-center">
                        {isEditingScheme ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={sub.theoryMax}
                            onChange={(e) => {
                              const updated = [...editingSubjects];
                              updated[idx].theoryMax = Number(e.target.value) || 0;
                              setEditingSubjects(updated);
                            }}
                            className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:ring-1 focus:ring-primary/50 mx-auto"
                          />
                        ) : (
                          <span className="font-mono font-bold text-foreground text-xs">{sub.theoryMax}</span>
                        )}
                      </VFTableCell>

                      {/* Practical Max Input / Display */}
                      <VFTableCell className="py-2 px-3 text-center">
                        {isEditingScheme ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={sub.practicalMax}
                            onChange={(e) => {
                              const updated = [...editingSubjects];
                              updated[idx].practicalMax = Number(e.target.value) || 0;
                              setEditingSubjects(updated);
                            }}
                            className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:ring-1 focus:ring-primary/50 mx-auto"
                          />
                        ) : (
                          <span className="font-mono font-bold text-foreground text-xs">{sub.practicalMax}</span>
                        )}
                      </VFTableCell>

                      {/* Internal Max Input / Display */}
                      <VFTableCell className="py-2 px-3 text-center">
                        {isEditingScheme ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={sub.internalMax}
                            onChange={(e) => {
                              const updated = [...editingSubjects];
                              updated[idx].internalMax = Number(e.target.value) || 0;
                              setEditingSubjects(updated);
                            }}
                            className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:ring-1 focus:ring-primary/50 mx-auto"
                          />
                        ) : (
                          <span className="font-mono font-bold text-foreground text-xs">{sub.internalMax}</span>
                        )}
                      </VFTableCell>

                      {/* Total Marks */}
                      <VFTableCell className="py-3 px-3 text-center font-mono font-black text-xs text-foreground">
                        {currentTotal} / {sub.totalMax}
                      </VFTableCell>

                      {/* Passing Criteria */}
                      <VFTableCell className="py-3 px-3 text-center">
                        <span className="font-mono text-xs font-bold text-muted-foreground">
                          {sub.passCriteriaPct}% {sub.separateTheoryPass ? '(Separate)' : '(Aggregate)'}
                        </span>
                      </VFTableCell>

                      {/* Validation Status Badge */}
                      <VFTableCell className="py-3 px-4 text-right">
                        {isValidTotal ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 font-mono">
                            <CheckCircle2 className="h-3.5 w-3.5" /> 100% OK
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 font-mono">
                            <AlertCircle className="h-3.5 w-3.5" /> ≠ 100
                          </span>
                        )}
                      </VFTableCell>
                    </VFTableRow>
                  );
                })}
              </VFTableBody>
            </VFTable>
          </VFCard>

          {/* Standard Grading Scale Matrix Reference */}
          <div className="p-4 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-foreground text-sm flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                {isHindi ? 'आधिकारिक सीबीएसई 9-पॉइंट ग्रेडिंग पैमाना' : 'CBSE 9-Point Grading Scale'}
              </h4>
              <span className="text-xs font-mono text-muted-foreground">Auto-computed on marks entry</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {CBSE_GRADING_SCALE.map((g) => (
                <div key={g.grade} className={cn("p-3 rounded-[4px] border text-center font-mono", g.color)}>
                  <p className="text-xl font-black">{g.grade}</p>
                  <p className="text-xs font-bold mt-0.5">{g.min}–{g.max}%</p>
                  <p className="text-[10px] opacity-70 mt-0.5 leading-tight">{g.desc.split('·')[0].trim()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 3: MARKS ENTRY REGISTER VIEW
          ══════════════════════════════════════════════════════════════════════ */}
      {activeView === 'marks' && (
        <div className="space-y-3 flex-1 min-h-0 flex flex-col">
          {/* Class Selector Bar */}
          <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-foreground uppercase tracking-wider whitespace-nowrap">
                {isHindi ? 'कक्षा व वर्ग चुनें:' : 'Select Class & Section:'}
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
                  className="bg-[#1a1a1a] border-border h-8 text-xs font-bold rounded-[4px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-[4px] border border-emerald-500/30">
                {isHindi ? 'CBSE मानक 500-अंक प्रणाली' : 'CBSE Standard 500-Mark Matrix'}
              </span>
              <VFButton
                size="sm"
                variant="outline"
                onClick={() => {
                  addNotification({
                    title: isHindi ? 'अंक रजिस्टर एक्सपोर्ट किया गया' : 'Marksheet Register Exported',
                    description: `Exported ${selectedClass} official marks ledger as Excel document.`,
                    type: 'success',
                  });
                }}
                className="h-8 px-3 text-xs font-bold bg-[#1a1a1a] border-border rounded-[4px]"
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                {isHindi ? 'एक्सल एक्सपोर्ट' : 'Export Excel'}
              </VFButton>
            </div>
          </div>

          {/* Marks Table */}
          <VFCard className="bg-[#141414] border-border/80 flex-1 min-h-0" bodyClassName="p-0 overflow-y-auto custom-scrollbar">
            <VFTable className="rounded-none border-0 text-xs">
              <VFTableHead className="bg-[#1a1a1a] sticky top-0 z-10">
                <VFTableRow>
                  <VFTableHeaderCell className="py-3 px-4 text-xs font-bold text-muted-foreground">{isHindi ? 'अनुक्रमांक' : 'Roll No'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground">{isHindi ? 'विद्यार्थी का नाम' : 'Student Name'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'गणित (100)' : 'Maths (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'विज्ञान (100)' : 'Science (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'अंग्रेजी (100)' : 'English (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'सामाजिक (100)' : 'Social (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center">{isHindi ? 'हिंदी (100)' : 'Hindi (100)'}</VFTableHeaderCell>
                  <VFTableHeaderCell className="py-3 px-3 text-xs font-bold text-muted-foreground text-center font-mono">{isHindi ? 'कुल योग' : 'Total (500)'}</VFTableHeaderCell>
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
                          updated[idx].grade = updated[idx].pct >= 91 ? 'A1' : updated[idx].pct >= 81 ? 'A2' : updated[idx].pct >= 71 ? 'B1' : updated[idx].pct >= 61 ? 'B2' : updated[idx].pct >= 51 ? 'C1' : updated[idx].pct >= 41 ? 'C2' : updated[idx].pct >= 33 ? 'D' : 'E';
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
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
                          updated[idx].grade = updated[idx].pct >= 91 ? 'A1' : updated[idx].pct >= 81 ? 'A2' : updated[idx].pct >= 71 ? 'B1' : updated[idx].pct >= 61 ? 'B2' : updated[idx].pct >= 51 ? 'C1' : updated[idx].pct >= 41 ? 'C2' : updated[idx].pct >= 33 ? 'D' : 'E';
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
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
                          updated[idx].grade = updated[idx].pct >= 91 ? 'A1' : updated[idx].pct >= 81 ? 'A2' : updated[idx].pct >= 71 ? 'B1' : updated[idx].pct >= 61 ? 'B2' : updated[idx].pct >= 51 ? 'C1' : updated[idx].pct >= 41 ? 'C2' : updated[idx].pct >= 33 ? 'D' : 'E';
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
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
                          updated[idx].grade = updated[idx].pct >= 91 ? 'A1' : updated[idx].pct >= 81 ? 'A2' : updated[idx].pct >= 71 ? 'B1' : updated[idx].pct >= 61 ? 'B2' : updated[idx].pct >= 51 ? 'C1' : updated[idx].pct >= 41 ? 'C2' : updated[idx].pct >= 33 ? 'D' : 'E';
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
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
                          updated[idx].grade = updated[idx].pct >= 91 ? 'A1' : updated[idx].pct >= 81 ? 'A2' : updated[idx].pct >= 71 ? 'B1' : updated[idx].pct >= 61 ? 'B2' : updated[idx].pct >= 51 ? 'C1' : updated[idx].pct >= 41 ? 'C2' : updated[idx].pct >= 33 ? 'D' : 'E';
                          setMarksData(updated);
                        }}
                        className="w-16 h-8 text-center bg-[#1a1a1a] border border-border rounded-[4px] font-mono font-bold text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 mx-auto"
                      />
                    </VFTableCell>

                    <VFTableCell className="py-3 px-3 font-mono font-black text-foreground text-center text-xs">
                      {row.total}
                    </VFTableCell>
                    <VFTableCell className="py-3 px-3 font-mono font-black text-emerald-400 text-center text-xs">
                      {row.pct}%
                    </VFTableCell>
                    <VFTableCell className="py-3 px-4 text-right">
                      <VFBadge variant={row.pct >= 90 ? 'success' : row.pct >= 70 ? 'primary' : 'warning'} className="text-[11px] font-bold">
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

      {/* ══════════════════════════════════════════════════════════════════════
          DRAWER: SCHEDULE NEW EXAMINATION & BUILD DATE SHEET
          ══════════════════════════════════════════════════════════════════════ */}
      <VFDrawer
        isOpen={isScheduleDrawerOpen}
        onClose={() => setIsScheduleDrawerOpen(false)}
        hideHeader={true}
        title={isHindi ? 'नई परीक्षा व समय-सारणी शेड्यूल करें' : 'Schedule New Examination & Build Timetable'}
        className="w-[640px] min-w-[320px] sm:min-w-[640px] max-w-[95vw]"
        bodyClassName="p-0 flex flex-col overflow-hidden"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3">
            <span className="text-xs text-muted-foreground font-mono">
              Academic Session: <strong className="text-foreground">{newExamSession}</strong>
            </span>
            <div className="flex items-center gap-2">
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setIsScheduleDrawerOpen(false)}
                className="rounded-[4px] h-8 text-xs font-bold"
              >
                {isHindi ? 'रद्द करें' : 'Cancel'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={handleCreateExamSubmit}
                className="rounded-[4px] h-8 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                leftIcon={<Check className="h-3.5 w-3.5" />}
              >
                {isHindi ? 'परीक्षा शेड्यूल प्रकाशित करें' : 'Publish Exam Schedule'}
              </VFButton>
            </div>
          </div>
        }
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="w-full bg-[#111113] border-b border-[#242428] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[4px] bg-[#161619] border border-[#27272e] flex items-center justify-center text-purple-400">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-foreground">
                  {isHindi ? 'नई परीक्षा व समय-सारणी शेड्यूल करें' : 'Schedule New Examination & Date Sheet'}
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  {isHindi ? 'परीक्षा शीर्षक, तिथियां, लक्षित कक्षाएं व प्रश्नपत्र समय-सारणी सेट करें।' : 'Set examination metadata, eligible classes, and subject date sheet.'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 custom-scrollbar text-xs">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'परीक्षा शीर्षक' : 'Examination Title'}</label>
              <VFInput
                required
                placeholder="e.g. Term 2 Annual Board Summative Examination"
                value={newExamTitle}
                onChange={(e) => setNewExamTitle(e.target.value)}
                className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'परीक्षा कोड' : 'Exam Code'}</label>
                <VFInput
                  value={newExamCode}
                  onChange={(e) => setNewExamCode(e.target.value)}
                  className="bg-[#1a1a1a] border-border font-mono h-8 text-xs rounded-[4px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'उम्मीदवारों की संख्या' : 'Total Candidates'}</label>
                <VFInput
                  type="number"
                  value={String(newExamCandidates)}
                  onChange={(e) => setNewExamCandidates(Number(e.target.value))}
                  className="bg-[#1a1a1a] border-border font-mono h-8 text-xs rounded-[4px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'परीक्षा तिथियां' : 'Date Span'}</label>
                <VFInput
                  placeholder="e.g. 15 Nov – 28 Nov 2026"
                  value={newExamDates}
                  onChange={(e) => setNewExamDates(e.target.value)}
                  className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'लक्षित कक्षाएं' : 'Target Grades'}</label>
                <VFSelect
                  value={newExamGrade}
                  onChange={(e) => setNewExamGrade(String(e.target.value))}
                  options={[
                    { label: 'All Classes (6–12)', value: 'All Classes (6–12)' },
                    { label: 'Class 9 & 10 (Secondary)', value: 'Class 9 & 10' },
                    { label: 'Class 11 & 12 (Sr. Secondary)', value: 'Class 11 & 12' },
                    { label: 'Class 10 Board Candidates Only', value: 'Class 10' },
                  ]}
                  className="bg-[#1a1a1a] border-border h-8 text-xs font-bold rounded-[4px]"
                />
              </div>
            </div>

            {/* Timetable Preset Preview Banner */}
            <div className="p-3 rounded-[4px] bg-[#181818] border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  {isHindi ? 'शुरुआती समय-सारणी' : 'Initial Subject Date Sheet'}
                </span>
                <span className="text-[11px] font-mono text-emerald-400">5 Standard Papers Included</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Saving will generate an automatic 5-subject date sheet aligned with CBSE shifts (09:00 AM – 12:00 PM) which you can further customize paper-by-paper.
              </p>
            </div>
          </div>
        </div>
      </VFDrawer>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: ADD SINGLE PAPER TO DATE SHEET
          ══════════════════════════════════════════════════════════════════════ */}
      <VFDialog
        isOpen={isAddPaperModalOpen}
        onClose={() => setIsAddPaperModalOpen(false)}
        title={isHindi ? 'समय-सारणी में नया प्रश्नपत्र जोड़ें' : 'Add Paper to Date Sheet'}
        description={`Add subject paper to "${activeExam.title}".`}
      >
        <form onSubmit={handleAddPaperSubmit} className="space-y-3 pt-1 text-xs">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">{isHindi ? 'विषय का नाम' : 'Subject Name'}</label>
            <VFInput
              required
              placeholder="e.g. Sanskrit Course-B / Biology"
              value={paperSubject}
              onChange={(e) => setPaperSubject(e.target.value)}
              className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'प्रश्नपत्र कोड' : 'Paper Code'}</label>
              <VFInput
                placeholder="e.g. Code: 122"
                value={paperCode}
                onChange={(e) => setPaperCode(e.target.value)}
                className="bg-[#1a1a1a] border-border font-mono h-8 text-xs rounded-[4px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'पूर्णांक' : 'Max Marks'}</label>
              <VFInput
                type="number"
                value={String(paperMaxMarks)}
                onChange={(e) => setPaperMaxMarks(Number(e.target.value))}
                className="bg-[#1a1a1a] border-border font-mono h-8 text-xs rounded-[4px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'परीक्षा तिथि' : 'Exam Date'}</label>
              <VFInput
                placeholder="e.g. 29 Sep 2026 (Tue)"
                value={paperDisplayDate}
                onChange={(e) => setPaperDisplayDate(e.target.value)}
                className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'समय व अवधि' : 'Time Shift'}</label>
              <VFInput
                value={paperTimeSlot}
                onChange={(e) => setPaperTimeSlot(e.target.value)}
                className="bg-[#1a1a1a] border-border font-mono h-8 text-xs rounded-[4px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'परीक्षा कक्ष / हॉल' : 'Exam Hall'}</label>
              <VFInput
                value={paperHall}
                onChange={(e) => setPaperHall(e.target.value)}
                className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'कक्ष निरीक्षक' : 'Invigilator'}</label>
              <VFInput
                value={paperInvigilator}
                onChange={(e) => setPaperInvigilator(e.target.value)}
                className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsAddPaperModalOpen(false)}>
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Check className="h-4 w-4" />}>
              {isHindi ? 'प्रश्नपत्र जोड़ें' : 'Save to Timetable'}
            </VFButton>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
