import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { BookOpen, FileText, ClipboardList, Bot, Sparkles, Send, Layers, CheckCircle2, Award, FolderOpen } from 'lucide-react';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

function AcademicsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('curriculum');
  const [lessonTopic, setLessonTopic] = React.useState('');
  const [aiPlan, setAiPlan] = React.useState<string | null>(null);

  const handleGenerateLessonPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTopic) return;
    setAiPlan(
      `📚 AI Lesson Plan Generated for Topic: "${lessonTopic}"\n\n1. Learning Objectives:\n   - Understand core principles and real-world applications.\n   - Solve 5 sample practice problems independently.\n\n2. 45-Min Period Structure:\n   - 00:00-00:10: Introduction & Concept Recap\n   - 00:10-00:25: Interactive Board Explanation\n   - 00:25-00:35: Group Student Activity\n   - 00:35-00:45: Quiz & Homework Assignment`
    );
  };

  const submoduleTabs = [
    {
      id: 'curriculum',
      label: 'Curriculum Management',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="National Board & Institutional Curriculum Structure">
          <p className="text-xs text-muted-foreground">Define CBSE / ICSE / State Board curriculum frameworks, grade credits, and term evaluation criteria.</p>
        </VFCard>
      ),
    },
    {
      id: 'subjects',
      label: 'Subject Management',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Subject Master Catalog">
          <p className="text-xs text-muted-foreground">Manage core subjects (Mathematics, Physics, Chemistry, Biology, English) and elective languages.</p>
        </VFCard>
      ),
    },
    {
      id: 'class-subjects',
      label: 'Class-Subject Mapping',
      icon: <Layers className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Class-Wise Subject Allocation & Weekly Hours">
          <p className="text-xs text-muted-foreground">Assign mandatory and elective subjects per class grade with weekly period credit limits.</p>
        </VFCard>
      ),
    },
    {
      id: 'student-subjects',
      label: 'Student Electives Allocation',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Elective Language & Stream Choices">
          <p className="text-xs text-muted-foreground">Allocate second languages (Hindi, Sanskrit, French, German) and Class 11/12 Science/Commerce/Arts streams.</p>
        </VFCard>
      ),
    },
    {
      id: 'syllabus',
      label: 'Syllabus & Chapter Tracking',
      icon: <ClipboardList className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Syllabus Progress & Unit Completion">
          <p className="text-xs text-muted-foreground">Track chapter-wise syllabus completion percentages across academic terms and teacher logs.</p>
        </VFCard>
      ),
    },
    {
      id: 'lesson-planning',
      label: 'Lesson Plans & AI Generator',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI 45-Min Lesson Plan Generator</span>
          </div>
          <p className="text-xs text-muted-foreground">Input any chapter topic to auto-generate learning objectives, period timelines, and homework tasks.</p>

          <form onSubmit={handleGenerateLessonPlan} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Class 10 Biology Photosynthesis..."
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
      ),
    },
    {
      id: 'outcomes-competencies',
      label: 'Outcomes & Competencies',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Competency-Based Education (CBE) & Outcomes">
          <p className="text-xs text-muted-foreground">Define bloom taxonomy level learning outcomes, problem-solving skills, and practical lab competencies.</p>
        </VFCard>
      ),
    },
    {
      id: 'classwork',
      label: 'Classwork Management',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Daily Classwork & Interactive Board Notes">
          <p className="text-xs text-muted-foreground">Log daily classroom exercises, digital board notes, and teacher observation logs.</p>
        </VFCard>
      ),
    },
    {
      id: 'homework',
      label: 'Homework & Assignments',
      icon: <ClipboardList className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Homework Assignment Engine & Submission Tracking">
          <p className="text-xs text-muted-foreground">Assign daily homework, set due dates, send automatic parent app alerts, and track student submissions.</p>
        </VFCard>
      ),
    },
    {
      id: 'resources',
      label: 'Study Material & Remedial Work',
      icon: <FolderOpen className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Academic Study Material & Remedial Assignments">
          <p className="text-xs text-muted-foreground">Repository of downloadable chapter PDFs, sample question papers, and remedial worksheets for struggling students.</p>
        </VFCard>
      ),
    },
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
