import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFBadge, VFButton } from '@vidyamaxx/ui';
import { CircleDollarSign, Users, Receipt, Landmark, Sparkles, Bot, CreditCard, FileText, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/finance')({
  component: FinancePage,
});

function FinancePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('fee-structures');

  const submoduleTabs = [
    {
      id: 'fee-structures',
      label: 'Fee Structures',
      icon: <CircleDollarSign className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Academic Session Fee Structure Matrix">
          <p className="text-xs text-muted-foreground">Class-wise annual fee packages, tuition fee heads, transport fee components, and installment due dates.</p>
        </VFCard>
      ),
    },
    {
      id: 'fee-types',
      label: 'Fee Types & Heads',
      icon: <Landmark className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Fee Heads & Ledger Master">
          <p className="text-xs text-muted-foreground">Tuition Fee, Admission Fee, Computer/Lab Fee, Library Fee, Sports Fee, Examination Fee, and Caution Money.</p>
        </VFCard>
      ),
    },
    {
      id: 'fee-assignments',
      label: 'Student Fee Allocation',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Fee Package & Category Assignments">
          <p className="text-xs text-muted-foreground">Assign customized fee plans per student, RTE quota exemptions, and staff child concessions.</p>
        </VFCard>
      ),
    },
    {
      id: 'fee-collection',
      label: 'Fee Collection Counter',
      icon: <Receipt className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Cash & POS Fee Receipt Counter">
          <p className="text-xs text-muted-foreground">Collect cash, cheque, Demand Draft (DD), or POS card payments at the cashier counter with instant receipt print.</p>
        </VFCard>
      ),
    },
    {
      id: 'receipts',
      label: 'Receipt Books & Cancellations',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Serial Receipt Books & Cancellation Audit Log">
          <p className="text-xs text-muted-foreground">Audit sequential receipt numbers, track cancelled receipts with mandatory reason logs, and reprint duplicate receipts.</p>
        </VFCard>
      ),
    },
    {
      id: 'discounts',
      label: 'Discounts & Waivers',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Sibling Discounts & Management Waivers">
          <p className="text-xs text-muted-foreground">Apply sibling discount rules, merit scholarship waivers, and principal discretionary concessions.</p>
        </VFCard>
      ),
    },
    {
      id: 'dues-defaulters',
      label: 'Dues & Defaulters',
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <VFCard title="Outstanding Fee Dues & Defaulter List">
            <p className="text-xs text-muted-foreground mb-3">Track unpaid installment balances, late fee penalty calculations, and send bulk WhatsApp payment reminders.</p>
            <VFButton size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>Send Bulk WhatsApp Defaulter Alerts</VFButton>
          </VFCard>
        </div>
      ),
    },
    {
      id: 'online-payments',
      label: 'Online Payments & Gateway',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Parent Portal Payment Gateway Integration">
          <p className="text-xs text-muted-foreground">Integrated Razorpay / Paytm / UPI payment links, automated webhooks, and daily bank reconciliation.</p>
        </VFCard>
      ),
    },
    {
      id: 'fee-reports',
      label: 'Fee Reports & AI Scoring',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Fee Defaulter Risk Scoring Engine</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI predicts which 50 student accounts are at risk of fee default based on payment timeliness, past installment delays, and communication logs.
          </p>
          <div className="flex gap-2">
            <VFBadge variant="warning">38 At-Risk Accounts Identified</VFBadge>
            <VFBadge variant="success">94.8% Collection Efficiency Rate</VFBadge>
          </div>
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
