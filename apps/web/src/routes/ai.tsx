import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge } from '@vidyamaxx/ui';
import { Bot, Send, FileCheck, GraduationCap, Users, DollarSign, Cpu, Search } from 'lucide-react';

export const Route = createFileRoute('/ai')({
  component: AIPage,
});

function AIPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('ai-assistant');
  const [promptText, setPromptText] = React.useState('');
  const [chatLog, setChatLog] = React.useState<Array<{ role: string; text: string }>>([
    { role: 'assistant', text: 'Hello! I am VidyaFlow AI, your autonomous school intelligence assistant. How can I help you today?' },
  ]);

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText) return;
    const userMsg = promptText;
    setPromptText('');
    setChatLog((prev) => [
      ...prev,
      { role: 'user', text: userMsg },
      { role: 'assistant', text: `🤖 VidyaFlow AI Analysis:\nProcessing query "${userMsg}". All institutional metrics updated. Fee collection efficiency is at 94.8%, attendance is at 98.2%, and 0 timetable conflicts detected.` },
    ]);
  };

  const submoduleTabs = [
    {
      id: 'ai-assistant',
      label: 'AI School Assistant',
      icon: <Bot className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Bot className="h-5 w-5 text-primary" />
              <span>VidyaFlow AI Executive Natural Language Command</span>
            </div>
            <VFBadge variant="success">Online & Connected</VFBadge>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar p-2">
            {chatLog.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-xs max-w-2xl font-mono leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted/50 border border-border text-foreground'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendPrompt} className="flex gap-2 pt-2 border-t border-border">
            <input
              type="text"
              placeholder="e.g. Show me fee defaulters in Class 10 with overdue > ₹ 15,000..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
              Execute Command
            </VFButton>
          </form>
        </div>
      ),
    },
    {
      id: 'ai-doc-intel',
      label: 'AI Document OCR',
      icon: <FileCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="AI Document OCR & Data Extractor">
          <p className="text-xs text-muted-foreground">Extract marksheet grades, student birth dates, transfer certificate serial numbers, and Aadhaar IDs automatically from scanned uploads.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-academic-intel',
      label: 'AI Academic Intelligence',
      icon: <GraduationCap className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="AI Academic Risk Scoring & Question Generator">
          <p className="text-xs text-muted-foreground">Predict student exam failure risks, generate customized remedial worksheets, and design balanced question papers.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-student-intel',
      label: 'AI Student Intelligence',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="AI Chronic Absenteeism & Dropout Predictor">
          <p className="text-xs text-muted-foreground">Early warning machine learning models predicting student dropout risk, chronic absenteeism, and behavioral anomalies.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-financial-intel',
      label: 'AI Financial Intelligence',
      icon: <DollarSign className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="AI Defaulter Prediction & Revenue Optimizer">
          <p className="text-xs text-muted-foreground">Machine learning model for fee defaulter risk classification, cashflow forecasting, and automated payment reminder scheduling.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-automation',
      label: 'AI Agents & Automation',
      icon: <Cpu className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Autonomous Operational AI Agents">
          <p className="text-xs text-muted-foreground">Autonomous agents for proxy teacher scheduling, bus route GPS optimization, and automatic parent inquiry qualification.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-search-engine',
      label: 'AI Search Engine',
      icon: <Search className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Natural Language Semantic Search Engine">
          <p className="text-xs text-muted-foreground">Search entire institutional database using plain natural language questions (e.g. 'Find all Class 8 students with high math scores').</p>
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
