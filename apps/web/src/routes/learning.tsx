import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Users,
  Sparkles,
} from 'lucide-react';

export const Route = createFileRoute('/learning')({
  component: LearningPage,
});

function LearningPage() {
  const [lessonTopic, setLessonTopic] = React.useState('');
  const [generatedPlan, setGeneratedPlan] = React.useState<string | null>(null);

  const handleGenerateLessonPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTopic.trim()) return;
    setGeneratedPlan(
      `Structured 45-Min Lesson Plan for "${lessonTopic}":\n\n` +
      `1. Learning Objectives:\n` +
      `   • Introduce foundational concepts with practical real-world applications.\n` +
      `   • Guide students through 3 interactive problem examples.\n\n` +
      `2. Time Breakdown:\n` +
      `   • 00:00 - 00:10: Concept introduction & previous recap\n` +
      `   • 00:10 - 00:25: Guided explanation & demonstration\n` +
      `   • 00:25 - 00:35: Small group peer exercise\n` +
      `   • 00:35 - 00:45: Rapid recap quiz & homework assignment`
    );
  };

  const classData = [
    { code: 'CLS-9A', class: 'Class 9', section: 'Section A', subject: 'Mathematics', totalStudents: 40, avgAtt: '96.2%', status: 'Active' },
    { code: 'CLS-9B', class: 'Class 9', section: 'Section B', subject: 'Mathematics', totalStudents: 38, avgAtt: '92.4%', status: 'Active' },
    { code: 'CLS-10A', class: 'Class 10', section: 'Section A', subject: 'Physics', totalStudents: 42, avgAtt: '95.0%', status: 'Active' },
    { code: 'CLS-11SCI', class: 'Class 11', section: 'Science A', subject: 'Advanced Physics', totalStudents: 36, avgAtt: '98.1%', status: 'Active' },
  ];

  const classColumns = [
    {
      header: 'Class Code',
      accessorKey: 'code',
      cell: (r: any) => <span className="font-mono font-bold text-primary text-base">{r.code}</span>,
    },
    {
      header: 'Grade & Section',
      accessorKey: 'class',
      cell: (r: any) => <span className="font-extrabold text-foreground text-base">{r.class} - {r.section}</span>,
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
      cell: (r: any) => <span className="font-bold text-foreground text-base">{r.subject}</span>,
    },
    {
      header: 'Students',
      accessorKey: 'totalStudents',
      cell: (r: any) => <span className="font-black text-foreground text-base">{r.totalStudents} Students</span>,
    },
    {
      header: 'Avg Attendance',
      accessorKey: 'avgAtt',
      cell: (r: any) => <span className="font-black text-success text-base">{r.avgAtt}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
  ];

  // 1. Classes & Dashboard View
  const classesContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Assigned Classes"
          value="4 Sections"
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel="156 Total Students"
        />
        <VFStatCard
          title="Weekly Periods"
          value="24 Periods"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendLabel="45-min slots"
        />
        <VFStatCard
          title="Syllabus Pacing"
          value="68.4%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="Ahead of schedule"
        />
        <VFStatCard
          title="Average Class GPA"
          value="3.84 / 4.0"
          icon={<Award className="h-5 w-5" />}
          trend="up"
          trendLabel="Term 1 Average"
        />
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-black text-foreground tracking-tight">Teacher Assigned Classes</h2>
          <p className="text-sm text-muted-foreground font-medium">Active sections and student attendance tracking</p>
        </div>
        <VFDataTable
          columns={classColumns}
          data={classData}
          filterPlaceholder="Search class or subject..."
        />
      </div>
    </div>
  );

  // 2. Lesson Planner View
  const plannerContent = (
    <div className="space-y-6">
      <VFCard title="Interactive Lesson Plan Generator" description="Create structured 45-minute lesson timelines in seconds">
        <form onSubmit={handleGenerateLessonPlan} className="space-y-4 mt-1">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={lessonTopic}
              onChange={(e) => setLessonTopic(e.target.value)}
              placeholder="Enter topic name (e.g. Electromagnetic Induction, Quadratic Equations)..."
              className="flex-1 px-4 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium h-11"
            />
            <VFButton type="submit" size="sm" leftIcon={<Sparkles className="h-4 w-4" />}>
              Generate Plan
            </VFButton>
          </div>

          {generatedPlan && (
            <div className="p-4 bg-muted/30 border border-border rounded-lg animate-fade-in">
              <pre className="text-base text-foreground font-sans whitespace-pre-wrap leading-relaxed">
                {generatedPlan}
              </pre>
            </div>
          )}
        </form>
      </VFCard>
    </div>
  );

  // 3. Syllabus Tracker View
  const syllabusContent = (
    <div className="space-y-6">
      <VFCard title="Curriculum Syllabus Pacing" description="Term-wise chapter completion status">
        <div className="space-y-4 mt-1">
          {[
            { subject: 'Class 9 Mathematics', chapters: '9 of 14 Chapters Completed', progress: 64 },
            { subject: 'Class 10 Physics', chapters: '11 of 15 Chapters Completed', progress: 73 },
            { subject: 'Class 11 Advanced Physics', chapters: '8 of 12 Chapters Completed', progress: 66 },
          ].map((s, i) => (
            <div key={i} className="space-y-1.5 text-base">
              <div className="flex justify-between font-bold">
                <span className="text-foreground text-base">{s.subject}</span>
                <span className="text-muted-foreground text-sm font-semibold">{s.chapters} ({s.progress}%)</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = [
    { id: 'classes', label: 'My Classes & Dashboard', icon: <Users className="h-4 w-4" />, content: classesContent },
    { id: 'planner', label: 'Lesson Planner', icon: <Sparkles className="h-4 w-4" />, content: plannerContent },
    { id: 'syllabus', label: 'Syllabus Tracker', icon: <BookOpen className="h-4 w-4" />, content: syllabusContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="classes" variant="top-bar" />
    </VFPageContainer>
  );
}
