import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { Briefcase, UserCheck, FileText, CalendarCheck, CreditCard, Award, LogOut, CheckSquare, Plus, Eye } from 'lucide-react';

export const Route = createFileRoute('/hr')({
  component: HRPage,
});

function HRPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('employee-360');

  const staffData = [
    { empId: 'EMP-1001', name: 'Dr. Sarah Connor', dept: 'Science Department', desig: 'Head of Department', salary: '₹ 85,000 / mo', status: 'Active Staff' },
    { empId: 'EMP-1002', name: 'Prof. Rajesh Sharma', dept: 'Mathematics', desig: 'Senior Teacher', salary: '₹ 72,000 / mo', status: 'Active Staff' },
    { empId: 'EMP-1003', name: 'Anita Desai', dept: 'Chemistry', desig: 'Assistant Teacher', salary: '₹ 58,000 / mo', status: 'Active Staff' },
  ];

  const staffColumns = [
    { header: 'Employee ID', accessorKey: 'empId', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.empId}</span> },
    { header: 'Employee Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Department', accessorKey: 'dept' },
    { header: 'Designation', accessorKey: 'desig' },
    { header: 'Monthly Salary', accessorKey: 'salary' },
    { header: 'Status', accessorKey: 'status', cell: () => <VFBadge variant="success">Active Staff</VFBadge> },
    { header: 'Action', accessorKey: 'action', cell: () => <VFButton size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />}>View HR Profile</VFButton> },
  ];

  const submoduleTabs = [
    {
      id: 'employee-360',
      label: 'Employee 360° Profile',
      icon: <Briefcase className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">School Staff & Faculty Directory</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Manage teaching staff, administrative staff, transport drivers, and support personnel.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add New Staff</VFButton>
          </div>
          <VFDataTable columns={staffColumns} data={staffData} filterPlaceholder="Search employee name, ID, or department..." />
        </div>
      ),
    },
    {
      id: 'recruitment',
      label: 'Recruitment & Job Openings',
      icon: <UserCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Applicant Tracking & Teacher Recruitment">
          <p className="text-xs text-muted-foreground">Post job vacancies, review resumes, schedule interview rounds, and issue offer letters.</p>
        </VFCard>
      ),
    },
    {
      id: 'onboarding',
      label: 'Staff Onboarding',
      icon: <UserCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Employee Onboarding & Employment Contracts">
          <p className="text-xs text-muted-foreground">Contract signing, background verification checks, system ID creation, and orientation schedules.</p>
        </VFCard>
      ),
    },
    {
      id: 'employee-docs',
      label: 'Employee Documents',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Staff Credential & Academic Qualification Vault">
          <p className="text-xs text-muted-foreground">Store B.Ed / M.Sc degree certificates, BEd marksheets, identity IDs, and experience certificates.</p>
        </VFCard>
      ),
    },
    {
      id: 'employee-tasks',
      label: 'Tasks & Activity Delegation',
      icon: <CheckSquare className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Staff Duty Assignment & Activity Tracker">
          <p className="text-xs text-muted-foreground">Assign exam invigilation duties, bus duty assignments, event coordination tasks, and track completion.</p>
        </VFCard>
      ),
    },
    {
      id: 'employee-attendance',
      label: 'Staff Attendance',
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Employee Biometric Check-in & Punch Log">
          <p className="text-xs text-muted-foreground">Daily teacher biometric check-in timestamps, shift hours worked, and overtime calculations.</p>
        </VFCard>
      ),
    },
    {
      id: 'employee-leave',
      label: 'Employee Leave Balances',
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Casual, Sick & Earned Leave Balance Management">
          <p className="text-xs text-muted-foreground">Casual Leave (CL), Sick Leave (SL), Earned Leave (EL), Maternity Leave balances and principal signoffs.</p>
        </VFCard>
      ),
    },
    {
      id: 'payroll',
      label: 'Payroll & Monthly Salary',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Monthly Payroll Run & Payslip Generation">
          <p className="text-xs text-muted-foreground">Calculate Basic + HRA + DA allowances, PF/ESI statutory deductions, process net salary payout, and email PDF payslips.</p>
        </VFCard>
      ),
    },
    {
      id: 'advances-loans',
      label: 'Staff Advances & Loans',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Salary Advance Requests & EMI Deductions">
          <p className="text-xs text-muted-foreground">Issue salary advance loans to staff and auto-deduct monthly installments from payroll runs.</p>
        </VFCard>
      ),
    },
    {
      id: 'appraisals',
      label: 'Performance & Appraisals',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Annual Staff Appraisal & Feedback Ratings">
          <p className="text-xs text-muted-foreground">Principal & HOD annual performance reviews, student feedback scores, and salary increment recommendations.</p>
        </VFCard>
      ),
    },
    {
      id: 'employee-exit',
      label: 'Exit & Experience Certificates',
      icon: <LogOut className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Relieving Workflow & Experience Certificate Generator">
          <p className="text-xs text-muted-foreground">Manage staff resignations, No Dues clearance checksheets, and issue official Experience & Relieving Certificates.</p>
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
