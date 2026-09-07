import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFStatCard,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  BookOpenCheck,
  Clock,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  CheckCircle2,
  Calendar,
  Plus,
  BookOpen,
  Printer,
  School,
} from 'lucide-react';

export const Route = createFileRoute('/teaching')({
  component: TeachingPage,
});

interface ClassWorkload {
  code: string;
  grade: string;
  section: string;
  subject: string;
  room: string;
  students: number;
  avgAttendance: string;
  weeklyPeriods: number;
  status: 'Active' | 'Review';
}

interface LessonPlanItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: string;
  date: string;
  objectives: string[];
  outline: string;
}

const INITIAL_CLASSES: ClassWorkload[] = [
  { code: 'CLS-10A', grade: 'Class 10', section: 'A', subject: 'Physics', room: 'Lab 204', students: 42, avgAttendance: '95.2%', weeklyPeriods: 6, status: 'Active' },
  { code: 'CLS-09B', grade: 'Class 9', section: 'B', subject: 'Mathematics', room: 'Room 108', students: 38, avgAttendance: '92.4%', weeklyPeriods: 6, status: 'Active' },
  { code: 'CLS-11SCI', grade: 'Class 11', section: 'Science', subject: 'Advanced Physics', room: 'Lab 201', students: 36, avgAttendance: '98.1%', weeklyPeriods: 7, status: 'Active' },
  { code: 'CLS-09A', grade: 'Class 9', section: 'A', subject: 'Mathematics', room: 'Room 105', students: 40, avgAttendance: '96.0%', weeklyPeriods: 5, status: 'Active' },
];

const INITIAL_PLANS: LessonPlanItem[] = [
  {
    id: 'LP-101',
    title: 'Electromagnetic Induction & Faraday’s Laws',
    subject: 'Physics',
    grade: 'Class 10',
    duration: '45 mins',
    date: 'Today, 10:00 AM',
    objectives: [
      'Understand magnetic flux variation and induced electromotive force.',
      'Demonstrate Lenz’s law with coil and bar magnet simulation.',
      'Solve 2 numerical problems on induced EMF formula.',
    ],
    outline: '00-10m: Concept recap & coil demonstration\n10-25m: Faraday equation & magnetic flux derivation\n25-35m: Student peer calculation in pairs\n35-45m: Rapid exit quiz & homework assignment (Ch. 6 Q1-4)',
  },
  {
    id: 'LP-102',
    title: 'Quadratic Equations: Factorization & Discriminant',
    subject: 'Mathematics',
    grade: 'Class 9',
    duration: '45 mins',
    date: 'Tomorrow, 09:15 AM',
    objectives: [
      'Identify roots through split-the-middle-term method.',
      'Interpret real vs imaginary roots using discriminant D = b² - 4ac.',
    ],
    outline: '00-08m: Homework review & quadratic standard form\n08-22m: Step-by-step factorization examples on board\n22-35m: Guided worksheet exercise with 5 polynomial problems\n35-45m: Doubt clearing & assignment submission prompt',
  },
];

const SYLLABUS_CHAPTERS = [
  { id: 'CH-1', subject: 'Class 10 Physics', name: 'Light: Reflection & Refraction', status: 'Completed', completionDate: '12 Aug 2026', weight: '12 Marks' },
  { id: 'CH-2', subject: 'Class 10 Physics', name: 'The Human Eye & Colourful World', status: 'Completed', completionDate: '28 Aug 2026', weight: '8 Marks' },
  { id: 'CH-3', subject: 'Class 10 Physics', name: 'Electricity & Ohm’s Law', status: 'In Progress', completionDate: 'Est. 18 Sep', weight: '14 Marks' },
  { id: 'CH-4', subject: 'Class 10 Physics', name: 'Magnetic Effects of Electric Current', status: 'Upcoming', completionDate: 'Est. 05 Oct', weight: '10 Marks' },
  { id: 'CH-5', subject: 'Class 10 Physics', name: 'Sources of Energy', status: 'Upcoming', completionDate: 'Est. 22 Oct', weight: '6 Marks' },
];

const DAILY_SCHEDULE = [
  { period: 'Period 1', time: '08:30 - 09:15', class: 'Class 10 - A', subject: 'Physics', room: 'Lab 204', type: 'Lecture' },
  { period: 'Period 2', time: '09:15 - 10:00', class: 'Class 9 - B', subject: 'Mathematics', room: 'Room 108', type: 'Problem Solving' },
  { period: 'Break', time: '10:00 - 10:20', class: '—', subject: 'Recess / Staff Room', room: 'Staff Lounge', type: 'Break' },
  { period: 'Period 3', time: '10:20 - 11:05', class: 'Class 11 - Sci', subject: 'Advanced Physics', room: 'Lab 201', type: 'Lab Practical' },
  { period: 'Period 4', time: '11:05 - 11:50', class: 'Free Period', subject: 'Lesson Planning / Doubt Desk', room: 'Faculty Cabin #12', type: 'Prep' },
  { period: 'Period 5', time: '12:30 - 01:15', class: 'Class 9 - A', subject: 'Mathematics', room: 'Room 105', type: 'Lecture' },
];

function TeachingPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'शिक्षण व पाठ योजना' : 'Teaching & Lesson Plans') + ' – VidyaFloww';
  }, [isHindi]);

  const [classes] = React.useState<ClassWorkload[]>(INITIAL_CLASSES);
  const [plans, setPlans] = React.useState<LessonPlanItem[]>(INITIAL_PLANS);
  const [activePlan, setActivePlan] = React.useState<LessonPlanItem | null>(null);
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = React.useState(false);

  // New Lesson Plan Form State
  const [newTitle, setNewTitle] = React.useState('');
  const [newSubject, setNewSubject] = React.useState('Physics');
  const [newGrade, setNewGrade] = React.useState('Class 10');
  const [newObjective, setNewObjective] = React.useState('');
  const [isGeneratingAI, setIsGeneratingAI] = React.useState(false);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPlan: LessonPlanItem = {
      id: `LP-${Date.now().toString().slice(-3)}`,
      title: newTitle.trim(),
      subject: newSubject,
      grade: newGrade,
      duration: '45 mins',
      date: 'Today, Just now',
      objectives: newObjective.trim() ? [newObjective.trim()] : [
        'Understand foundational concepts with real-world applications.',
        'Solve 3 interactive problem examples in class.',
      ],
      outline: `00-10m: Concept introduction & previous recap\n10-25m: Structured explanation of ${newTitle}\n25-35m: Small group peer exercise\n35-45m: Rapid recap quiz & homework assignment`,
    };

    setPlans([newPlan, ...plans]);
    setIsNewPlanModalOpen(false);
    setNewTitle('');
    setNewObjective('');
    addNotification({
      title: isHindi ? 'पाठ योजना बनाई गई' : 'Lesson Plan Created',
      description: isHindi ? `"${newPlan.title}" सफलतापूर्वक सहेजा गया।` : `"${newPlan.title}" has been saved.`,
      type: 'success',
    });
  };

  const handleAIAssist = () => {
    if (!newTitle.trim()) {
      setNewTitle('Thermodynamics & Heat Engine Cycles');
    }
    setIsGeneratingAI(true);
    setTimeout(() => {
      setIsGeneratingAI(false);
      setNewObjective('Derive Carnot efficiency formula and explain real-life refrigeration cycles.');
    }, 400);
  };

  // ----------------------------------------------------
  // TAB 1: Assigned Classes & Workload
  // ----------------------------------------------------
  const classesContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'असाइंड कक्षाएं व छात्र रोस्टर' : 'Faculty Assigned Classes & Workload'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'कक्षा उपस्थिति, साप्ताहिक पीरियड्स और कक्ष संख्या' : 'Active grade sections, student strength, and room allocations'}
          </p>
        </div>
        <VFBadge variant="outline" className="font-mono text-xs w-fit">
          {classes.reduce((acc, c) => acc + c.students, 0)} {isHindi ? 'कुल छात्र' : 'Total Students'}
        </VFBadge>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'क्लास कोड' : 'Class Code'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'कक्षा व सेक्शन' : 'Grade & Section'}</th>
                <th className="py-2.5 px-3">{t('col.subject')}</th>
                <th className="py-2.5 px-3">{isHindi ? 'कक्ष संख्या' : 'Room'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'छात्र संख्या' : 'Students'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'साप्ताहिक पीरियड्स' : 'Weekly Periods'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'औसत उपस्थिति' : 'Avg Attendance'}</th>
                <th className="py-2.5 px-3 text-right">{t('col.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {classes.map((cls) => (
                <tr key={cls.code} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">{cls.code}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">{cls.grade} – {cls.section}</td>
                  <td className="py-2.5 px-3 text-foreground font-medium">{cls.subject}</td>
                  <td className="py-2.5 px-3 text-muted-foreground font-mono">{cls.room}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">{cls.students}</td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">{cls.weeklyPeriods} periods/wk</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{cls.avgAttendance}</td>
                  <td className="py-2.5 px-3 text-right">
                    <VFBadge variant="success" className="text-[10px]">{cls.status}</VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 2: Interactive Lesson Planner
  // ----------------------------------------------------
  const plannerContent = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'पाठ योजना संग्रह' : 'Saved Lesson Plans'}
          </h3>
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setIsNewPlanModalOpen(true)}
            className="rounded-md"
          >
            {isHindi ? 'नई योजना' : 'New Plan'}
          </VFButton>
        </div>

        <div className="space-y-2">
          {plans.map((p) => {
            const isSelected = activePlan?.id === p.id || (!activePlan && plans[0]?.id === p.id);
            return (
              <div
                key={p.id}
                onClick={() => setActivePlan(p)}
                className={`p-3 rounded-md border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#1c1c1c] border-primary/50 text-foreground'
                    : 'bg-card border-border/80 hover:bg-[#161616] text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-primary font-bold">{p.id}</span>
                  <span className="text-[10px] text-muted-foreground">{p.duration}</span>
                </div>
                <h4 className="text-xs font-bold text-foreground mt-1 line-clamp-1">{p.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-[11px]">
                  <VFBadge variant="outline" className="text-[10px] px-1.5 py-0">{p.grade}</VFBadge>
                  <span className="text-muted-foreground">{p.subject}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-2">
        {(() => {
          const current = activePlan || plans[0];
          if (!current) return null;
          return (
            <VFCard
              title={current.title}
              description={`${current.grade} · ${current.subject} · ${current.duration} Timeline`}
              className="rounded-md"
            >
              <div className="space-y-4 text-xs mt-2">
                <div>
                  <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {isHindi ? 'सीखने के मुख्य उद्देश्य (Learning Objectives)' : 'Learning Objectives'}
                  </h4>
                  <ul className="space-y-1 pl-4 list-disc text-muted-foreground">
                    {current.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border/80 pt-3">
                  <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {isHindi ? '45 मिनट समय विभाजन (Time Breakdown)' : '45-Min Class Period Breakdown'}
                  </h4>
                  <div className="p-3 bg-[#121212] border border-border/70 rounded-md font-mono text-xs whitespace-pre-wrap text-foreground/90 leading-relaxed">
                    {current.outline}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <VFButton
                    size="sm"
                    variant="outline"
                    leftIcon={<Printer className="h-3.5 w-3.5" />}
                    onClick={() => window.print()}
                    className="rounded-md"
                  >
                    {isHindi ? 'प्रिंट करें' : 'Print Plan'}
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<BookOpen className="h-3.5 w-3.5" />}
                    onClick={() => {
                      addNotification({
                        title: isHindi ? 'कक्षा में शुरू किया गया' : 'Active in Classroom',
                        description: `Timer started for "${current.title}".`,
                        type: 'info',
                      });
                    }}
                    className="rounded-md"
                  >
                    {isHindi ? 'क्लास में शुरू करें' : 'Launch in Class'}
                  </VFButton>
                </div>
              </div>
            </VFCard>
          );
        })()}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 3: Curriculum Syllabus Pacing
  // ----------------------------------------------------
  const syllabusContent = (
    <div className="space-y-4">
      <div className="p-3.5 rounded-md bg-[#141414] border border-border/80 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'सीबीएसई / एनईपी 2020 पाठ्यक्रम प्रगति' : 'CBSE / NEP 2020 Curriculum Pacing Tracker'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'टर्म 1 और टर्म 2 के अध्यायवार पूर्णता आंकड़े' : 'Term 1 & Term 2 chapter-wise completion and exam weightage'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-foreground">68.4% Completed</span>
          <p className="text-[10px] text-emerald-400 font-semibold">{isHindi ? 'शेड्यूल से 4 दिन आगे' : '4 Days Ahead of Target'}</p>
        </div>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">{isHindi ? 'विषय' : 'Subject'}</th>
              <th className="py-2.5 px-3">{isHindi ? 'अध्याय शीर्षक' : 'Chapter Title'}</th>
              <th className="py-2.5 px-3">{isHindi ? 'परीक्षा अंक' : 'Weightage'}</th>
              <th className="py-2.5 px-3">{isHindi ? 'पूर्णता तिथि' : 'Completion Date'}</th>
              <th className="py-2.5 px-3 text-right">{t('col.status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {SYLLABUS_CHAPTERS.map((ch) => (
              <tr key={ch.id} className="hover:bg-[#1a1a1a] transition-colors">
                <td className="py-2.5 px-3 font-mono text-muted-foreground">{ch.id}</td>
                <td className="py-2.5 px-3 font-bold text-foreground">{ch.subject}</td>
                <td className="py-2.5 px-3 text-foreground font-medium">{ch.name}</td>
                <td className="py-2.5 px-3 font-mono text-primary font-bold">{ch.weight}</td>
                <td className="py-2.5 px-3 font-mono text-muted-foreground">{ch.completionDate}</td>
                <td className="py-2.5 px-3 text-right">
                  <VFBadge
                    variant={ch.status === 'Completed' ? 'success' : ch.status === 'In Progress' ? 'primary' : 'outline'}
                    className="text-[10px]"
                  >
                    {ch.status}
                  </VFBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 4: Faculty Daily Routine
  // ----------------------------------------------------
  const routineContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'दैनिक शिक्षण समय-सारणी (आज का शेड्यूल)' : 'Faculty Daily Teaching Routine (Today’s Schedule)'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'पीरियड वार टाइमटेबल, कक्षा कक्ष व लैब आवंटन' : 'Slot-wise timetable, classrooms, and allocated prep slots'}
          </p>
        </div>
        <VFBadge variant="outline" className="font-mono text-xs">
          Monday, 07 Sep 2026
        </VFBadge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {DAILY_SCHEDULE.map((slot, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-md border flex flex-col justify-between ${
              slot.type === 'Break'
                ? 'bg-[#121212] border-dashed border-border/80 opacity-70'
                : slot.type === 'Prep'
                ? 'bg-[#151515] border-border/80'
                : 'bg-card border-border/90 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-primary">{slot.period}</span>
              <VFBadge
                variant={slot.type === 'Break' ? 'outline' : slot.type === 'Prep' ? 'warning' : 'success'}
                className="text-[10px]"
              >
                {slot.type}
              </VFBadge>
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">{slot.class}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{slot.subject}</p>
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-2 mt-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {slot.time}
              </span>
              <span className="font-mono text-foreground font-semibold">{slot.room}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'classes', label: isHindi ? 'मेरी कक्षाएं व रोस्टर' : 'My Classes & Workload', icon: <School className="h-4 w-4" />, content: classesContent },
    { id: 'planner', label: isHindi ? 'लेसन प्लानर' : 'Lesson Planner', icon: <Sparkles className="h-4 w-4" />, content: plannerContent },
    { id: 'syllabus', label: isHindi ? 'सिलेबस ट्रैकर' : 'Syllabus Tracker', icon: <BookOpen className="h-4 w-4" />, content: syllabusContent },
    { id: 'routine', label: isHindi ? 'दैनिक रूटीन' : 'Daily Routine', icon: <Calendar className="h-4 w-4" />, content: routineContent },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── Header Toolbar ── */}
      <div className="p-3.5 rounded-md bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <BookOpenCheck className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-foreground tracking-tight">
                {isHindi ? 'शिक्षण व पाठ योजना' : 'Teaching & Lesson Plans'}
              </span>
              <VFBadge variant="success" className="text-[10px] font-bold font-mono">
                {isHindi ? 'NEP 2020 संरेखित' : 'NEP 2020 Aligned'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'शिक्षक कक्षा रोस्टर, एआई-संचालित पाठ योजना व पाठ्यक्रम प्रगति' : 'Faculty workload, AI-assisted lesson timelines & curriculum pacing'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setIsNewPlanModalOpen(true)}
            className="rounded-md font-bold"
          >
            {isHindi ? 'नई पाठ योजना' : 'Create Lesson Plan'}
          </VFButton>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <VFStatCard
          title={isHindi ? 'असाइंड कक्षाएं' : 'Assigned Classes'}
          value="4 Sections"
          icon={<Users className="h-4.5 w-4.5" />}
          trend="up"
          trendLabel={isHindi ? 'कुल 156 छात्र' : '156 Total Students'}
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'साप्ताहिक पीरियड्स' : 'Weekly Teaching Load'}
          value="24 Periods"
          icon={<Clock className="h-4.5 w-4.5" />}
          trend="neutral"
          trendLabel="18 hrs/wk standard"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'सिलेबस गति' : 'Syllabus Completion'}
          value="68.4%"
          icon={<TrendingUp className="h-4.5 w-4.5" />}
          trend="up"
          trendLabel={isHindi ? 'शेड्यूल से 4 दिन आगे' : '4 Days Ahead'}
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'औसत क्लास GPA' : 'Class Performance'}
          value="3.84 / 4.0"
          icon={<Award className="h-4.5 w-4.5" />}
          trend="up"
          trendLabel={isHindi ? 'टर्म 1 औसत' : 'Term 1 Avg'}
          className="rounded-md"
        />
      </div>

      {/* ── Main Tab Navigation ── */}
      <VFTabs items={tabs} defaultTabId="classes" variant="top-bar" />

      {/* ── Create Lesson Plan Dialog ── */}
      <VFDialog
        isOpen={isNewPlanModalOpen}
        onClose={() => setIsNewPlanModalOpen(false)}
        title={isHindi ? 'नई पाठ योजना बनाएं' : 'Create New Lesson Plan'}
        description={isHindi ? '45 मिनट की संरचित पाठ योजना व सीखने के उद्देश्य दर्ज करें' : 'Build a 45-minute structured teaching timeline and learning objectives'}
        className="max-w-md rounded-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsNewPlanModalOpen(false)}
              className="rounded-md"
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={handleCreatePlan}
              disabled={!newTitle.trim()}
              className="rounded-md font-bold"
            >
              {isHindi ? 'सहेजें' : 'Save Plan'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleCreatePlan} className="space-y-3 text-xs mt-1">
          <div>
            <label className="block font-bold text-foreground mb-1">
              {isHindi ? 'पाठ विषय / शीर्षक' : 'Lesson Topic / Title'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Electromagnetic Induction"
                className="flex-1 px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <VFButton
                type="button"
                size="sm"
                variant="outline"
                leftIcon={<Sparkles className="h-3 w-3 text-amber-400" />}
                onClick={handleAIAssist}
                disabled={isGeneratingAI}
                className="rounded-md text-[11px] shrink-0"
              >
                {isGeneratingAI ? 'AI...' : 'AI Suggest'}
              </VFButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'विषय' : 'Subject'}</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'कक्षा' : 'Grade'}</label>
              <select
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-foreground mb-1">
              {isHindi ? 'मुख्य सीखने के उद्देश्य' : 'Primary Learning Objective'}
            </label>
            <textarea
              rows={3}
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              placeholder="e.g. Derive induced EMF equation and solve 2 numerical exercises..."
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
