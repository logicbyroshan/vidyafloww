import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard } from '@vidyamaxx/ui';
import { Briefcase, UserCheck, CreditCard, FileText, Award } from 'lucide-react';

export const Route = createFileRoute('/hr')({
  component: HrPage,
});

function HrPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('employee-profiles');

  const submoduleTabs = [
    {
      id: 'employee-profiles',
      label: 'Employee Profiles & Directory',
      icon: <Briefcase className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Staff Directory & Department Mapping">
          <p className="text-xs text-muted-foreground">Teaching and non-teaching staff profiles, designations, contact details, and qualifications.</p>
        </VFCard>
      ),
    },
    {
      id: 'onboarding',
      label: 'Onboarding & Contracts',
      icon: <UserCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Applicant Recruitment & Staff Onboarding">
          <p className="text-xs text-muted-foreground">Candidate interview tracking, background document verification, employment contracts, and probation management.</p>
        </VFCard>
      ),
    },
    {
      id: 'payroll',
      label: 'Payroll Processing & Salary',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Monthly Salary & Allowances Engine">
          <p className="text-xs text-muted-foreground">Basic pay, HRA, DA, Provident Fund (PF), ESI, salary advances, and loan repayments.</p>
        </VFCard>
      ),
    },
    {
      id: 'payslips-tax',
      label: 'Payslips & Tax Deductions',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Digital Payslips & Tax Reports">
          <p className="text-xs text-muted-foreground">Generate monthly PDF payslips, TDS tax deductions, and Form 16 annual tax certificates.</p>
        </VFCard>
      ),
    },
    {
      id: 'appraisals-certs',
      label: 'Appraisals & Experience Certificates',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Performance Reviews & Staff Relieving Certificates">
          <p className="text-xs text-muted-foreground">Annual performance appraisal ratings, promotion letters, exit clearances, and experience certificates.</p>
        </VFCard>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="10 — HR & Payroll" 
        description="Employee lifecycle: recruitment, onboarding, attendance, payroll, tax, and experience certificates."
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
