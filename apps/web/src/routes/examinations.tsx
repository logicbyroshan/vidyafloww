import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { ClipboardList, BookOpen, Edit3, Award, Sparkles, Bot, Send, Calendar, Ticket, Grid, BarChart } from 'lucide-react';

export const Route = createFileRoute('/examinations')({
  component: ExaminationsPage,
});

function ExaminationsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('exam-mgmt');
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
      id: 'exam-mgmt',
      label: 'Examination Management',
      icon: <ClipboardList className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Term & Annual Examination Setup">
          <p className="text-xs text-muted-foreground">Configure Mid-Term, Annual Board, Unit Tests, and Practical examination sessions.</p>
        </VFCard>
      ),
    },
    {
      id: 'test-mgmt',
      label: 'Test Management',
      icon: <ClipboardList className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Weekly & Formative Class Tests">
          <p className="text-xs text-muted-foreground">Schedule weekly subject quizzes, chapter surprise tests, and internal assessment marks.</p>
        </VFCard>
      ),
    },
    {
      id: 'assessment-mgmt',
      label: 'Assessment Framework',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Formative & Summative Assessment Rules">
          <p className="text-xs text-muted-foreground">Configure 40% Formative (FA) + 60% Summative (SA) weightages per subject course.</p>
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
      id: 'paper-designer',
      label: 'Question Paper Designer & AI',
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
    {
      id: 'exam-scheduling',
      label: 'Exam Timetable',
      icon: <Calendar className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Exam Datesheet & Invigilation Duty Matrix">
          <p className="text-xs text-muted-foreground">Set subject exam dates, start/end times, and assign teacher invigilator duties.</p>
        </VFCard>
      ),
    },
    {
      id: 'hall-tickets',
      label: 'Hall Tickets',
      icon: <Ticket className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Hall Ticket & Admit Card Printing">
          <p className="text-xs text-muted-foreground">Generate and print batch PDF hall tickets with student photos, exam roll numbers, and venue rules.</p>
        </VFCard>
      ),
    },
    {
      id: 'exam-seating',
      label: 'Exam Seating Plan',
      icon: <Grid className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Automated Hall Seating Plan Generator">
          <p className="text-xs text-muted-foreground">Arrange alternate student seating across examination halls to prevent cheating.</p>
        </VFCard>
      ),
    },
    {
      id: 'marks-mgmt',
      label: 'Marks Management & Entry',
      icon: <Edit3 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Teacher Gradebook & Marks Matrix">
          <p className="text-xs text-muted-foreground">Inline cell editing spreadsheet matrix for teachers to enter raw marks and practical scores.</p>
        </VFCard>
      ),
    },
    {
      id: 'grade-mgmt',
      label: 'Grade Management & GPA',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Grading Scales & GPA Calculation Rules">
          <p className="text-xs text-muted-foreground">Define grading scales (A1, A2, B1, B2) and calculate term SGPA / CGPA automatically.</p>
        </VFCard>
      ),
    },
    {
      id: 'report-cards',
      label: 'Report Card Management',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Automated Report Cards & Teacher Remarks">
          <p className="text-xs text-muted-foreground">Generate comprehensive CBSE/ICSE format report cards with teacher remarks and principal sign-off.</p>
        </VFCard>
      ),
    },
    {
      id: 'result-analytics',
      label: 'Result Analytics',
      icon: <BarChart className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Class-Wise Pass Percentile & Subject Performance">
          <p className="text-xs text-muted-foreground">Analyze pass rates, subject toppers, subject average scores, and remedial student rosters.</p>
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
