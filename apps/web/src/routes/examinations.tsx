import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { ClipboardList, BookOpen, Edit3, Award, Sparkles, Bot, Send } from 'lucide-react';

export const Route = createFileRoute('/examinations')({
  component: ExaminationsPage,
});

function ExaminationsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('exam-schedules');
  const [examSubject, setExamSubject] = React.useState('');
  const [generatedPaper, setGeneratedPaper] = React.useState<string | null>(null);

  const handleGeneratePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examSubject) return;
    setGeneratedPaper(
      `📝 AI Question Paper Generated for: ${examSubject}\n\nSection A: Multiple Choice Questions (10 Marks)\n1. Which of the following is the SI unit of force?\n   a) Joule  b) Newton  c) Watt  d) Pascal\n\nSection B: Short Answer Questions (15 Marks)\n2. Explain the principle of conservation of energy with two practical examples.\n\nSection C: Long Answer Case Study (25 Marks)\n3. Derive equation of motion under constant acceleration.`
    );
  };

  const submoduleTabs = [
    {
      id: 'exam-schedules',
      label: 'Exam Schedules & Seating',
      icon: <ClipboardList className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Term Exam Scheduling & Invigilation Matrix">
          <p className="text-xs text-muted-foreground">Configure Mid-Term, Final, and Practical exam dates, hall seating plans, and invigilator duties.</p>
        </VFCard>
      ),
    },
    {
      id: 'question-bank',
      label: 'Question Bank',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Subject Question Repository">
          <p className="text-xs text-muted-foreground">Store MCQs, short questions, long essay questions categorized by difficulty and bloom taxonomy level.</p>
        </VFCard>
      ),
    },
    {
      id: 'marks-entry',
      label: 'Marks Entry Matrix',
      icon: <Edit3 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Teacher Gradebook & Marks Matrix">
          <p className="text-xs text-muted-foreground">Inline cell editing spreadsheet matrix for teachers to enter raw marks and practical scores.</p>
        </VFCard>
      ),
    },
    {
      id: 'report-cards',
      label: 'Report Cards & GPA',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Result Processing & Automated Report Cards">
          <p className="text-xs text-muted-foreground">Calculate GPA, rank, class percentile, formative & summative grade breakdown, and print batch PDFs.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-paper-gen',
      label: 'AI Paper Generator',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Difficulty-Balanced Question Paper Generator</span>
          </div>
          <p className="text-xs text-muted-foreground">Generate balanced MCQs, short answer questions, and answer keys for any subject chapter.</p>

          <form onSubmit={handleGeneratePaper} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Class 10 Physics Mechanics Chapter 3..."
              value={examSubject}
              onChange={(e) => setExamSubject(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
              Generate Paper
            </VFButton>
          </form>

          {generatedPaper && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground space-y-2 animate-fade-in">
              <p className="whitespace-pre-line leading-relaxed font-mono">{generatedPaper}</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="07 — Examination & Assessment" 
        description="Exam schedules, question bank, seating plans, marks entry, report cards, and AI paper generation."
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
