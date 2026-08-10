import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard } from '@vidyamaxx/ui';
import { BarChart3, Users, GraduationCap, CalendarCheck, CircleDollarSign, Briefcase, Sliders, FileText } from 'lucide-react';

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
});

function ReportsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('executive-dashboard');

  const submoduleTabs = [
    {
      id: 'executive-dashboard',
      label: 'Executive Command Center',
      icon: <BarChart3 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Institutional Executive Command Center">
          <p className="text-xs text-muted-foreground">Real-time KPI overview of total student count (3,600), today's attendance rate (98.2%), fee collection total (₹ 1.84 Cr), and active staff (242).</p>
        </VFCard>
      ),
    },
    {
      id: 'student-analytics',
      label: 'Student Demographics BI',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Demographics & Intake Funnel BI">
          <p className="text-xs text-muted-foreground">Class-wise gender ratios, RTE category distribution, transport usage percentages, and campus migration analytics.</p>
        </VFCard>
      ),
    },
    {
      id: 'academic-analytics',
      label: 'Academic Performance BI',
      icon: <GraduationCap className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Academic Results & Grade Percentile Analytics">
          <p className="text-xs text-muted-foreground">Multi-year term comparison, class average GPA trends, subject difficulty heatmaps, and board exam pass rates.</p>
        </VFCard>
      ),
    },
    {
      id: 'attendance-analytics',
      label: 'Attendance Analytics',
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Attendance Heatmaps & Absenteeism Radar">
          <p className="text-xs text-muted-foreground">Day-of-week attendance drop patterns, weather-correlated absenteeism, and chronic absentee student rosters.</p>
        </VFCard>
      ),
    },
    {
      id: 'financial-analytics',
      label: 'Financial Revenue BI',
      icon: <CircleDollarSign className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Fee Collection, Outstanding Dues & Revenue Analytics">
          <p className="text-xs text-muted-foreground">Monthly collection velocity curves, head-wise fee breakdown, outstanding defaulter aging, and operating expense ratios.</p>
        </VFCard>
      ),
    },
    {
      id: 'hr-analytics',
      label: 'HR & Workload BI',
      icon: <Briefcase className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Teacher Period Workload & HR Retention BI">
          <p className="text-xs text-muted-foreground">Teacher period allocations, staff leave utilization percentages, teacher-student ratios, and employee turnover trends.</p>
        </VFCard>
      ),
    },
    {
      id: 'report-builder',
      label: 'Custom Report Builder',
      icon: <Sliders className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Drag-and-Drop Dynamic Custom Report Engine">
          <p className="text-xs text-muted-foreground">Select custom data fields, filter conditions, group-by aggregations, and export to Excel, CSV, or PDF.</p>
        </VFCard>
      ),
    },
    {
      id: 'compliance-reporting',
      label: 'Government & Board Exports',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="UDISE+ Regulatory & Board Compliance Exports">
          <p className="text-xs text-muted-foreground">Generate automated UDISE+ government portal data files, CBSE affiliation reports, and State Education Department compliance spreadsheets.</p>
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
