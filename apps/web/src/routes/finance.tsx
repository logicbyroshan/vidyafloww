import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFBadge, VFButton } from '@vidyamaxx/ui';
import { CircleDollarSign, Users, Receipt, Landmark, Sparkles, Bot } from 'lucide-react';

export const Route = createFileRoute('/finance')({
  component: FinancePage,
});

function FinancePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('fee-structures');

  const submoduleTabs = [
    {
      id: 'fee-structures',
      label: 'Fee Structures & Heads',
      icon: <CircleDollarSign className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Fee Heads & Academic Session Fee Structures">
          <p className="text-xs text-muted-foreground">Tuition Fee, Transport Fee, Lab Fee, Sports Fee, Admission Fee, and Installment schedules.</p>
        </VFCard>
      ),
    },
    {
      id: 'student-assignments',
      label: 'Student Fee Assignments & Discounts',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Fee Allocation & Concession Rules">
          <p className="text-xs text-muted-foreground">Assign fee packages per class, apply staff ward discounts, merit scholarships, and sibling concessions.</p>
        </VFCard>
      ),
    },
    {
      id: 'receipts-dues',
      label: 'Receipts, Dues & Defaulters',
      icon: <Receipt className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Fee Collection, Outstanding Dues & Defaulter List">
          <p className="text-xs text-muted-foreground">Print payment receipts, track installment dues, generate automated late fee penalties, and send SMS reminders.</p>
        </VFCard>
      ),
    },
    {
      id: 'general-accounting',
      label: 'General Ledger, Cashbook & Vouchers',
      icon: <Landmark className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="09 — School-Wide Accounting & Cashbook System">
          <p className="text-xs text-muted-foreground">Chart of Accounts, Cashbook, Bank Reconciliation, Payment/Receipt Vouchers, Expense Approvals, and Budget vs Actual reports.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-defaulter-predict',
      label: 'AI Defaulter Risk Predictor',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Fee Defaulter Risk Scoring Engine</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            "Which 50 students are most likely to become fee defaulters next month?" AI analyzes historical payment timeliness, family communication logs, and installment patterns to flag risks early.
          </p>
          <div className="flex gap-2">
            <VFBadge variant="warning">38 At-Risk Accounts Identified</VFBadge>
            <VFBadge variant="success">94.8% Collection Efficiency Rate</VFBadge>
          </div>
          <VFButton size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
            Run AI Risk Analysis
          </VFButton>
        </div>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="08 & 09 — Fees, Student Finance & General Accounting" 
        description="Fee structures, installments, discounts, receipts, cashbook ledger, and AI defaulter prediction."
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
