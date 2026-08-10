import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { BookOpen, FileText, ClipboardList, Bot, Sparkles, Send } from 'lucide-react';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

function AcademicsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('curriculum');
  const [topicPrompt, setTopicPrompt] = React.useState('');
  const [aiLessonPlan, setAiLessonPlan] = React.useState<string | null>(null);

  const handleGenerateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicPrompt) return;
    setAiLessonPlan(
      `📚 AI Lesson Plan Generated for: "${topicPrompt}"\n\n🎯 Objectives:\n- Understand core concepts of ${topicPrompt}.\n- Apply knowledge in real-world scenarios.\n\n🧪 Classroom Activities (45 min):\n- 10 min: Interactive Introduction & Slides.\n- 20 min: Group Experiment / Case Study.\n- 15 min: Q&A & Concept Check Quiz.\n\n📝 Assessment & Homework:\n- Solve Chapter Exercises 1 to 5.`
    );
  };

  const submoduleTabs = [
    {
      id: 'curriculum',
      label: 'Curriculum & Subjects',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Curriculum & Subject Groups Matrix">
          <p className="text-xs text-muted-foreground">Manage core subjects, elective courses, subject groups, and weekly period distributions.</p>
        </VFCard>
      ),
    },
    {
      id: 'syllabus',
      label: 'Syllabus & Lesson Plans',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Syllabus Completion & Teaching Plans">
          <p className="text-xs text-muted-foreground">Track chapter progress, learning outcomes, syllabus milestones, and teacher logbooks.</p>
        </VFCard>
      ),
    },
    {
      id: 'homework',
      label: 'Homework & Assignments',
      icon: <ClipboardList className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Classwork & Assignment Distribution">
          <p className="text-xs text-muted-foreground">Assign daily homework, upload study notes, and track student submission deadlines.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-planner',
      label: 'AI Lesson Planner',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Lesson Plan Generator</span>
          </div>
          <p className="text-xs text-muted-foreground">Enter a subject topic to auto-generate objectives, classroom activities, assessment questions, and homework prompts.</p>

          <form onSubmit={handleGenerateLesson} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Create a Class 8 science lesson plan for Photosynthesis..."
              value={topicPrompt}
              onChange={(e) => setTopicPrompt(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
              Generate Plan
            </VFButton>
          </form>

          {aiLessonPlan && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground space-y-2 animate-fade-in">
              <p className="whitespace-pre-line leading-relaxed">{aiLessonPlan}</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="04 — Academics & Curriculum" 
        description="The academic engine: subjects, lesson plans, syllabus, and AI lesson generation."
      />
      <VFTabs 
        items={submoduleTabs} 
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="underline"
      />
    </VFPageContainer>
  );
}
