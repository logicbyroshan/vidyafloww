import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFBadge } from '@vidyamaxx/ui';
import { BarChart3, ShieldCheck, Users, CircleDollarSign } from 'lucide-react';

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
});

function ReportsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('principal-command');

  const submoduleTabs = [
    {
      id: 'principal-command',
      label: 'Principal Command Center',
      icon: <BarChart3 className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border p-5 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Institutional School Health Tree
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
                <span className="text-muted-foreground">Total Students</span>
                <p className="text-lg font-bold text-foreground mt-1">2,480</p>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
                <span className="text-muted-foreground">Campus Attendance</span>
                <p className="text-lg font-bold text-success mt-1">96.4%</p>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
                <span className="text-muted-foreground">Fee Collection</span>
                <p className="text-lg font-bold text-primary mt-1">₹ 1.84 Cr</p>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
                <span className="text-muted-foreground">Active Staff</span>
                <p className="text-lg font-bold text-foreground mt-1">164</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'teacher-analytics',
      label: 'Teacher & Class Analytics',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="My Classes & Academic Performance Dashboard">
          <p className="text-xs text-muted-foreground">Class-wise performance distribution, homework completion metrics, and students at academic risk.</p>
        </VFCard>
      ),
    },
    {
      id: 'finance-hr-bi',
      label: 'Finance & HR BI Dashboards',
      icon: <CircleDollarSign className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Revenue Collections & Staff Workload BI">
          <p className="text-xs text-muted-foreground">Monthly revenue vs budget, outstanding dues forecast, payroll expenses, and teacher period workload distribution.</p>
        </VFCard>
      ),
    },
    {
      id: 'board-compliance',
      label: 'Board & Govt Compliance Reports',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-3">
          <VFCard title="Regulatory & State Board Compliance Export">
            <p className="text-xs text-muted-foreground mb-3">TRAI DLT SMS compliance logs, State Education Board regulatory data formats, and annual audit reports.</p>
            <div className="flex gap-2">
              <VFBadge variant="success">TRAI DLT Registered</VFBadge>
              <VFBadge variant="outline">CBSE Board Formats Ready</VFBadge>
            </div>
          </VFCard>
        </div>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="19 — Analytics, BI & Compliance" 
        description="Principal command center, teacher class analytics, finance BI, and regulatory board compliance."
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
