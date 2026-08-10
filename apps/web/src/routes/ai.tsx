import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { Bot, Sparkles, AlertTriangle, ShieldCheck, Send } from 'lucide-react';

export const Route = createFileRoute('/ai')({
  component: AiPage,
});

function AiPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('unified-assistant');
  const [query, setQuery] = React.useState('');
  const [aiAnswer, setAiAnswer] = React.useState<string | null>(null);

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setAiAnswer(
      `📊 VidyaFlow AI Executive Summary for: "${query}"\n\n- Class 8 overall attendance down by 4.2% this month.\n- Mathematics term exam performance dropped 7% compared to last session.\n- 11 students identified as academically at-risk (remedial sessions recommended).`
    );
  };

  const submoduleTabs = [
    {
      id: 'unified-assistant',
      label: 'Unified AI Assistant',
      icon: <Bot className="h-3.5 w-3.5" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI ERP Executive Assistant</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI sits above the entire ERP (Students, Fees, Exams, HR, Attendance, Transport). Ask any cross-module question in natural language.
          </p>

          <form onSubmit={handleAskAI} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. How is Class 8 performing this month?..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
              Query ERP AI
            </VFButton>
          </form>

          {aiAnswer && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Sparkles className="h-4 w-4" /> VidyaFlow Executive Insight:
              </div>
              <p className="whitespace-pre-line leading-relaxed">{aiAnswer}</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'anomaly-detection',
      label: 'Automated Anomaly Detection',
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="System-Wide Anomaly & Irregularity Detector">
          <p className="text-xs text-muted-foreground">Automated monitoring of sudden attendance drops, unexplained fee waiver spikes, or grade deviations.</p>
        </VFCard>
      ),
    },
    {
      id: 'risk-intelligence',
      label: 'Predictive Risk Intelligence',
      icon: <Sparkles className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student At-Risk & Fee Default Predictive Scoring">
          <p className="text-xs text-muted-foreground">Machine learning models predicting student dropout risk, exam failures, and fee default probabilities.</p>
        </VFCard>
      ),
    },
    {
      id: 'prompt-controls',
      label: 'AI Prompt & Provider Controls',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="LLM Provider Configuration & Safety Guardrails">
          <p className="text-xs text-muted-foreground">Manage Gemini / OpenAI API keys, system prompt templates, rate limits, and data privacy guardrails.</p>
        </VFCard>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="20 — VidyaFlow AI" 
        description="Unified AI intelligence layer sitting above all ERP modules (Students, Fees, Exams, HR, Attendance)."
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
