import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { MonitorPlay, BookOpen, HelpCircle, Bot, Sparkles, Send } from 'lucide-react';

export const Route = createFileRoute('/lms')({
  component: LmsPage,
});

function LmsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('online-classes');
  const [aiQuestion, setAiQuestion] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState<string | null>(null);

  const handleAskTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion) return;
    setAiResponse(
      `Great question! Here is a step-by-step breakdown of "${aiQuestion}":\n1. Identify given values and formula.\n2. Substitute variables into the equation.\n3. Verify your result with a quick check question!`
    );
  };

  const submoduleTabs = [
    {
      id: 'online-classes',
      label: 'Online Classes & Lectures',
      icon: <MonitorPlay className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VFCard title="Live Stream Room - Class 10 Mathematics">
              <p className="text-xs text-muted-foreground mb-3">Topic: Quadratic Equations & Graphing Roots</p>
              <div className="aspect-video bg-muted/60 rounded-lg flex items-center justify-center border border-border">
                <MonitorPlay className="h-10 w-10 text-primary/40" />
              </div>
            </VFCard>
            <VFCard title="Recorded Lecture Archive">
              <div className="space-y-2 text-xs">
                {['Physics: Newton laws of motion', 'Chemistry: Periodic Trends & Orbitals', 'English: Literature Analysis'].map((rec, i) => (
                  <div key={i} className="p-2.5 bg-muted/40 rounded-lg flex items-center justify-between border border-border/60">
                    <span>{rec}</span>
                    <VFButton size="sm" variant="ghost">Watch Video</VFButton>
                  </div>
                ))}
              </div>
            </VFCard>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-notes',
      label: 'Digital Notes & E-Books',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Curated Digital Study Material Repository">
          <p className="text-xs text-muted-foreground">Download chapter PDFs, teacher slides, revision formula sheets, and reference e-books.</p>
        </VFCard>
      ),
    },
    {
      id: 'quizzes',
      label: 'Homework & Interactive Quizzes',
      icon: <HelpCircle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Online Quizzes & Assignment Submissions">
          <p className="text-xs text-muted-foreground">Auto-graded MCQ quizzes, subjective homework uploads, and teacher feedback scores.</p>
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
            <span>VidyaFlow AI Adaptive Tutor</span>
          </div>
          <p className="text-xs text-muted-foreground">Ask any doubt in Science, Math, History or Literature. The AI Tutor adapts difficulty to your understanding.</p>

          <form onSubmit={handleAskTutor} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. I don't understand how photosynthesis works..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
              Ask Tutor
            </VFButton>
          </form>

          {aiResponse && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Sparkles className="h-4 w-4" /> VidyaFlow AI Tutor Response:
              </div>
              <p className="whitespace-pre-line leading-relaxed">{aiResponse}</p>
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
