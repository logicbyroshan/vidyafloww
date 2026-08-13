import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  BookOpen,
  FileText,
  Sparkles,
  Clock,
  TrendingUp,
  Award,
  Users,
  Calendar,
  CheckCircle2,
  BookMarked,
  SlidersHorizontal,
  Bot,
  Send,
  Layers,
  BarChart3,
  Bookmark,
} from 'lucide-react';

export const Route = createFileRoute('/learning')({
  component: LearningPage,
});

function LearningPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');
  const [lessonTopic, setLessonTopic] = React.useState('');
  const [aiPlan, setAiPlan] = React.useState<string | null>(null);

  const handleGenerateLessonPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTopic) return;
    setAiPlan(
      `📚 AI Lesson Plan Generated for Topic: "${lessonTopic}"\n\n1. Learning Objectives:\n   - Understand core principles and real-world applications.\n   - Solve 5 sample practice problems independently.\n\n2. 45-Min Period Structure:\n   - 00:00-00:10: Introduction & Concept Recap\n   - 00:10-00:25: Interactive Board Explanation\n   - 00:25-00:35: Group Student Activity\n   - 00:35-00:45: Quiz & Homework Assignment`
    );
  };

  const classData = [
    { code: 'CLS-9A', class: 'Class 9', section: 'Section A', subject: 'Mathematics', totalStudents: 40, avgAtt: '96.2%', status: 'Active' },
    { code: 'CLS-9B', class: 'Class 9', section: 'Section B', subject: 'Mathematics', totalStudents: 38, avgAtt: '92.4%', status: 'Active' },
    { code: 'CLS-10A', class: 'Class 10', section: 'Section A', subject: 'Physics', totalStudents: 42, avgAtt: '95.0%', status: 'Active' },
    { code: 'CLS-11SCI', class: 'Class 11', section: 'Science A', subject: 'Advanced Physics', totalStudents: 36, avgAtt: '98.1%', status: 'Active' },
  ];

  const classColumns = [
    { header: 'Class Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Grade & Section', accessorKey: 'class', cell: (r: any) => <span className="font-bold text-foreground">{r.class} - {r.section}</span> },
    { header: 'Assigned Subject', accessorKey: 'subject' },
    { header: 'Total Students', accessorKey: 'totalStudents' },
    { header: 'Average Attendance', accessorKey: 'avgAtt', cell: (r: any) => <span className="font-mono font-bold text-emerald-500">{r.avgAtt}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Teaching Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Assigned Classes" value="4 Sections" icon={<Users className="h-5 w-5 text-primary" />} trend="up" trendLabel="156 Total Students" />
        <VFStatCard title="Weekly Periods" value="24 Periods" icon={<Clock className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="45-min slots" />
        <VFStatCard title="Syllabus Completion" value="68.4%" icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="Ahead of Target" />
        <VFStatCard title="Average Class GPA" value="3.84 / 4.0" icon={<Award className="h-5 w-5 text-purple-500" />} description="Term 1 Performance" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — My Classes
  // ----------------------------------------------------
  const myClassesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Teacher Assigned Classes Directory</h3>
          <p className="text-xs text-muted-foreground">Manage classroom rosters, student seating maps, and class performance trackers.</p>
        </div>
      </div>
      <VFDataTable columns={classColumns} data={classData} filterPlaceholder="Search class or subject..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — My Subjects
  // ----------------------------------------------------
  const mySubjectsContent = (
    <div className="space-y-4">
      <VFCard title="Assigned Teaching Subjects Catalog">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Mathematics (Class 9A & 9B)</span>
            <p className="text-muted-foreground text-xs mt-1">6 Periods / Week · CBSE Curriculum</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Physics (Class 10A)</span>
            <p className="text-muted-foreground text-xs mt-1">5 Periods / Week + 2 Lab Slots</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Advanced Physics (Class 11 Sci)</span>
            <p className="text-muted-foreground text-xs mt-1">6 Periods / Week + Optics Lab</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Lesson Planning (AI Generator)
  // ----------------------------------------------------
  const lessonPlanningContent = (
    <div className="space-y-4">
      <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <Bot className="h-5 w-5" />
          <span>VidyaFlow AI 45-Min Lesson Plan Generator</span>
        </div>
        <p className="text-xs text-muted-foreground">Input any chapter topic to auto-generate learning objectives, period timelines, and homework tasks.</p>

        <form onSubmit={handleGenerateLessonPlan} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Class 10 Physics Electromagnetism & Induction..."
            value={lessonTopic}
            onChange={(e) => setLessonTopic(e.target.value)}
            className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
            Generate Plan
          </VFButton>
        </form>

        {aiPlan && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground space-y-2 animate-fade-in">
            <p className="whitespace-pre-line leading-relaxed font-mono">{aiPlan}</p>
          </div>
        )}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Teaching Plans
  // ----------------------------------------------------
  const teachingPlansContent = (
    <div className="space-y-4">
      <VFCard title="Annual & Monthly Teaching Plans (CBSE Syllabus Pacing)">
        <p className="text-xs text-muted-foreground mb-3">Structured chapter pacing calendar aligned with national education board milestones.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Syllabus & Curriculum
  // ----------------------------------------------------
  const syllabusCurriculumContent = (
    <div className="space-y-4">
      <VFCard title="National Board & Institutional Syllabus Master">
        <p className="text-xs text-muted-foreground mb-3">CBSE / ICSE board curriculum guidelines, exam mark weights, and practical unit frameworks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Topics & Chapters
  // ----------------------------------------------------
  const topicsChaptersContent = (
    <div className="space-y-4">
      <VFCard title="Chapter & Topic Hierarchy Breakdown">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Unit 1: Quadratic Equations</span>
            <p className="text-muted-foreground text-xs mt-1">4 Topics · 8 Periods · Completed</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Unit 2: Arithmetic Progressions</span>
            <p className="text-muted-foreground text-xs mt-1">5 Topics · 10 Periods · In Progress</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Unit 3: Triangles & Geometry</span>
            <p className="text-muted-foreground text-xs mt-1">6 Topics · 12 Periods · Upcoming</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Lesson Notes
  // ----------------------------------------------------
  const lessonNotesContent = (
    <div className="space-y-4">
      <VFCard title="Digital Lesson Notes & Interactive Board Attachments">
        <p className="text-xs text-muted-foreground mb-3">Upload lecture PDFs, digital whiteboard snapshots, and student reference guides.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Teaching Diary
  // ----------------------------------------------------
  const teachingDiaryContent = (
    <div className="space-y-4">
      <VFCard title="Teacher Daily Log & Classroom Reflective Diary">
        <p className="text-xs text-muted-foreground mb-3">Record daily classroom observations, student participation notes, and period completion logs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Class Activities
  // ----------------------------------------------------
  const classActivitiesContent = (
    <div className="space-y-4">
      <VFCard title="Classroom Group Activities & Lab Practical Assignments">
        <p className="text-xs text-muted-foreground mb-3">Organize group projects, lab experiments, peer discussions, and interactive presentations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Learning Objectives
  // ----------------------------------------------------
  const learningObjectivesContent = (
    <div className="space-y-4">
      <VFCard title="Bloom Taxonomy Learning Objectives & Competency Mapping">
        <p className="text-xs text-muted-foreground mb-3">Define Knowledge, Understanding, Application, and Problem-Solving competencies.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Syllabus Progress
  // ----------------------------------------------------
  const syllabusProgressContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Class 9 Math Progress" value="72% Complete" icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="On Track" />
        <VFStatCard title="Class 10 Physics" value="68% Complete" icon={<TrendingUp className="h-5 w-5 text-primary" />} trend="up" trendLabel="On Track" />
        <VFStatCard title="Class 11 Physics" value="62% Complete" icon={<TrendingUp className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="Lab Completed" />
        <VFStatCard title="Overall Term Target" value="70% Required" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} description="By Aug 31" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Class Progress
  // ----------------------------------------------------
  const classProgressContent = (
    <div className="space-y-4">
      <VFCard title="Classroom Academic Progression & Benchmark Matrix">
        <p className="text-xs text-muted-foreground mb-3">Monitor class-wide quiz scores, homework submission rates, and learning outcomes.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Academic Performance
  // ----------------------------------------------------
  const academicPerformanceContent = (
    <div className="space-y-4">
      <VFCard title="Student Learning Performance & Diagnostic Analytics">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Identify high-performing students and students needing academic remedial support.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Teacher Planner
  // ----------------------------------------------------
  const teacherPlannerContent = (
    <div className="space-y-4">
      <VFCard title="Personalized Weekly Teacher Planner & Reminders">
        <p className="text-xs text-muted-foreground mb-3">Manage test correction deadlines, PTM preparations, and syllabus milestones.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Teaching Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Teaching Workspace Parameters & AI Preferences">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFSelect label="Default Lesson Plan Template" options={[{ label: 'CBSE 45-Min Standard', value: 'cbse45' }, { label: 'Bloom Taxonomy CBE Model', value: 'bloom' }]} />
          <VFSelect label="AI Assistant Prompt Model" options={[{ label: 'VidyaFlow AI 4.0 (Advanced)', value: 'vf4' }, { label: 'Standard Assistant', value: 'std' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 16 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Teaching Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'my-classes', label: 'My Classes', icon: <Users className="h-3.5 w-3.5" />, content: myClassesContent },
    { id: 'my-subjects', label: 'My Subjects', icon: <BookOpen className="h-3.5 w-3.5" />, content: mySubjectsContent },
    { id: 'lesson-planning', label: 'Lesson Planning', icon: <Sparkles className="h-3.5 w-3.5 text-primary" />, content: lessonPlanningContent },
    { id: 'teaching-plans', label: 'Teaching Plans', icon: <Calendar className="h-3.5 w-3.5" />, content: teachingPlansContent },
    { id: 'syllabus-curriculum', label: 'Syllabus & Curriculum', icon: <Layers className="h-3.5 w-3.5" />, content: syllabusCurriculumContent },
    { id: 'topics-chapters', label: 'Topics & Chapters', icon: <BookMarked className="h-3.5 w-3.5" />, content: topicsChaptersContent },
    { id: 'lesson-notes', label: 'Lesson Notes', icon: <FileText className="h-3.5 w-3.5" />, content: lessonNotesContent },
    { id: 'teaching-diary', label: 'Teaching Diary', icon: <Bookmark className="h-3.5 w-3.5" />, content: teachingDiaryContent },
    { id: 'class-activities', label: 'Class Activities', icon: <Users className="h-3.5 w-3.5" />, content: classActivitiesContent },
    { id: 'learning-objectives', label: 'Learning Objectives', icon: <Award className="h-3.5 w-3.5" />, content: learningObjectivesContent },
    { id: 'syllabus-progress', label: 'Syllabus Progress', icon: <TrendingUp className="h-3.5 w-3.5" />, content: syllabusProgressContent },
    { id: 'class-progress', label: 'Class Progress', icon: <TrendingUp className="h-3.5 w-3.5" />, content: classProgressContent },
    { id: 'academic-performance', label: 'Academic Performance', icon: <Award className="h-3.5 w-3.5" />, content: academicPerformanceContent },
    { id: 'teacher-planner', label: 'Teacher Planner', icon: <Calendar className="h-3.5 w-3.5" />, content: teacherPlannerContent },
    { id: 'settings', label: 'Teaching Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
