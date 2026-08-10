import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { MonitorPlay, Video, PlayCircle, BookOpen, FileText, UploadCloud, HelpCircle, Bot, Sparkles, Send } from 'lucide-react';

export const Route = createFileRoute('/lms')({
  component: LMSPage,
});

function LMSPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('lms-core');
  const [query, setQuery] = React.useState('');
  const [aiAnswer, setAiAnswer] = React.useState<string | null>(null);

  const handleAskTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setAiAnswer(
      `🤖 VidyaFlow AI Tutor Response:\n\nRegarding "${query}":\nGreat question! In physics/mathematics, this concept is explained by breaking down the fundamental laws into key components. Here is a 3-step breakdown:\n1. Core Definition: Key relationship between mass, energy, and velocity.\n2. Key Equation: F = ma or E = mc².\n3. Exam Tip: Remember to write units clearly in numerical problems!`
    );
  };

  const submoduleTabs = [
    {
      id: 'lms-core',
      label: 'Digital Classroom (LMS)',
      icon: <MonitorPlay className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Integrated Learning Management Ecosystem">
          <p className="text-xs text-muted-foreground">Unified digital learning dashboard for live video classes, homework submissions, recorded lectures, and interactive AI tutoring.</p>
        </VFCard>
      ),
    },
    {
      id: 'online-classes',
      label: 'Live Online Classes',
      icon: <Video className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Live Classroom Streaming (Zoom / Google Meet)">
          <p className="text-xs text-muted-foreground">Launch 1-click live online classes with automated student attendance capture and screen sharing.</p>
        </VFCard>
      ),
    },
    {
      id: 'recorded-classes',
      label: 'Recorded Video Lectures',
      icon: <PlayCircle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Chapter Video Recording Library">
          <p className="text-xs text-muted-foreground">Stream high-definition recorded class lectures organized by subject, chapter, and topic.</p>
        </VFCard>
      ),
    },
    {
      id: 'tutorials-courses',
      label: 'Tutorials & Courses',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Self-Paced Course Modules & Tutorials">
          <p className="text-xs text-muted-foreground">Structured self-paced video modules, foundation prep courses, and competitive exam masterclasses.</p>
        </VFCard>
      ),
    },
    {
      id: 'study-material',
      label: 'Digital Study Material',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Chapter PDFs, Notes & Slides Vault">
          <p className="text-xs text-muted-foreground">Teacher presentation slides, chapter summary PDFs, formula sheets, and solved textbook examples.</p>
        </VFCard>
      ),
    },
    {
      id: 'online-assignments',
      label: 'Online Submissions',
      icon: <UploadCloud className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Assignment Submission & Grading">
          <p className="text-xs text-muted-foreground">Students upload PDF / photo answers, teachers annotate and grade submissions online with instant feedback.</p>
        </VFCard>
      ),
    },
    {
      id: 'quizzes',
      label: 'Online Quizzes',
      icon: <HelpCircle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Interactive Timed Quizzes & Auto-Grading">
          <p className="text-xs text-muted-foreground">Multiple-choice quizzes (MCQs) with automatic grading, instant score display, and detailed answer explanations.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-tutor',
      label: 'VidyaFlow AI Tutor',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Interactive Academic Tutor</span>
          </div>
          <p className="text-xs text-muted-foreground">24/7 AI tutor assistance for students to ask homework doubts, clarify complex concepts, or solve practice problems.</p>

          <form onSubmit={handleAskTutor} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Explain Newton's Third Law with real world examples..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
              Ask AI Tutor
            </VFButton>
          </form>

          {aiAnswer && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground space-y-2 animate-fade-in">
              <p className="whitespace-pre-line leading-relaxed font-mono">{aiAnswer}</p>
            </div>
          )}
        </div>
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
