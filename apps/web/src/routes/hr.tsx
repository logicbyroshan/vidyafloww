import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Briefcase,
  Users,
  Building,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Send,
  Download,
  FileText,
  BarChart3,
  Award,
  CreditCard,
  History,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const Route = createFileRoute('/hr')({
  component: HRPage,
});

function HRPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const staffData = [
    { empNo: 'EMP-2026-014', name: 'Dr. Sarah Connor', type: 'Teacher (PGT Physics)', dept: 'Science Department', designation: 'Senior PGT Teacher', joiningDate: '15 Jul 2021', salary: '₹68,000/mo', status: 'Active' },
    { empNo: 'EMP-2026-022', name: 'Mr. Rajesh Sharma', type: 'Teacher (TGT Math)', dept: 'Mathematics Dept', designation: 'TGT Teacher', joiningDate: '10 Aug 2022', salary: '₹54,000/mo', status: 'Active' },
    { empNo: 'EMP-2026-035', name: 'Mrs. Sunita Rao', type: 'Assistant / Admin Staff', dept: 'Front Office', designation: 'Reception Executive', joiningDate: '01 Jun 2023', salary: '₹32,000/mo', status: 'Active' },
  ];

  const staffColumns = [
    { header: 'Emp Code', accessorKey: 'empNo', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.empNo}</span> },
    { header: 'Employee Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Staff Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="outline">{r.type}</VFBadge> },
    { header: 'Department', accessorKey: 'dept' },
    { header: 'Designation', accessorKey: 'designation' },
    { header: 'Monthly Salary', accessorKey: 'salary', cell: (r: any) => <span className="font-mono font-bold text-foreground">{r.salary}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — HR Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total School Staff" value="142 Employees" icon={<Users className="h-5 w-5 text-primary" />} trend="up" trendLabel="98% Active" />
        <VFStatCard title="Monthly Payroll Bill" value="₹78,40,000" icon={<CreditCard className="h-5 w-5 text-emerald-500" />} trend="neutral" trendLabel="Processed On 1st" />
        <VFStatCard title="Today's Staff Attendance" value="96.4%" icon={<UserCheck className="h-5 w-5 text-amber-500" />} description="137 Present Today" />
        <VFStatCard title="Open Leave Requests" value="3 Requests" icon={<Briefcase className="h-5 w-5 text-purple-500" />} description="Pending Principal Sign-off" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Staff Directory
  // ----------------------------------------------------
  const directoryContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Employee Master Staff Directory</h3>
          <p className="text-xs text-muted-foreground font-mono">Teachers, Lab Assistants, Administrative Staff, Drivers, and Housekeeping.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Staff Member</VFButton>
      </div>
      <VFDataTable columns={staffColumns} data={staffData} filterPlaceholder="Search staff member, designation, or department..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Staff Profiles
  // ----------------------------------------------------
  const profilesContent = (
    <div className="space-y-4">
      <VFCard title="Comprehensive Employee Profile & Qualifications Vault">
        <p className="text-xs text-muted-foreground mb-3">Academic degrees, B.Ed. credentials, PAN card, Aadhaar, and emergency contacts.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Staff Types
  // ----------------------------------------------------
  const staffTypesContent = (
    <div className="space-y-4">
      <VFCard title="Staff Type Concept (Teacher / Assistant / Admin / Support)">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Teaching Faculty (PGT/TGT/PRT)</span>
            <p className="text-muted-foreground text-xs mt-1">68 Members · Classroom Teaching</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Lab & Classroom Assistant</span>
            <p className="text-muted-foreground text-xs mt-1">18 Members · Practical Lab Support</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Administrative & Accounts</span>
            <p className="text-muted-foreground text-xs mt-1">24 Members · Front Desk & Office</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Transport & Support Staff</span>
            <p className="text-muted-foreground text-xs mt-1">32 Members · Drivers, Maintenance</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Departments
  // ----------------------------------------------------
  const departmentsContent = (
    <div className="space-y-4">
      <VFCard title="Academic & Administrative Department Hierarchy">
        <p className="text-xs text-muted-foreground mb-3">Science, Mathematics, Humanities, Physical Education, Accounts, and Transport.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Designations
  // ----------------------------------------------------
  const designationsContent = (
    <div className="space-y-4">
      <VFCard title="Job Designations & Grade Bands Master">
        <p className="text-xs text-muted-foreground mb-3">Principal, Vice Principal, HOD, PGT, TGT, PRT, Senior Accountant, Executive.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Joining & Onboarding
  // ----------------------------------------------------
  const onboardingContent = (
    <div className="space-y-4">
      <VFCard title="New Employee Joining & Onboarding Checklist">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Offer letter generation, document verification, biometric enrollment, and email creation.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Staff Documents
  // ----------------------------------------------------
  const documentsContent = (
    <div className="space-y-4">
      <VFCard title="Staff Service Book & Document Vault">
        <p className="text-xs text-muted-foreground mb-3">Police verification, appointment letters, qualification certificates, and background checks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Staff Attendance
  // ----------------------------------------------------
  const attendanceContent = (
    <div className="space-y-4">
      <VFCard title="Biometric & Facial Recognition Staff Attendance Terminal">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Capture daily punch-in/punch-out timestamps with late arrival calculations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Leave Management
  // ----------------------------------------------------
  const leaveContent = (
    <div className="space-y-4">
      <VFCard title="Staff Leave Quota & Application Approval Workflow">
        <p className="text-xs text-muted-foreground mb-3">Casual Leave (CL), Earned Leave (EL), Medical Leave (ML), and Duty Leave (DL).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Work Assignments
  // ----------------------------------------------------
  const assignmentsContent = (
    <div className="space-y-4">
      <VFCard title="Teacher Class Load & Administrative Task Duties">
        <p className="text-xs text-muted-foreground mb-3">Assign house master duties, exam invigilation duties, and bus route responsibilities.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Staff Transfers
  // ----------------------------------------------------
  const transfersContent = (
    <div className="space-y-4">
      <VFCard title="Inter-Branch & Departmental Staff Transfers">
        <p className="text-xs text-muted-foreground mb-3">Record inter-campus transfers and department re-assignments.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Resignation & Exit
  // ----------------------------------------------------
  const exitContent = (
    <div className="space-y-4">
      <VFCard title="Employee Resignation, Exit Interview & No-Dues Clearance">
        <p className="text-xs text-muted-foreground mb-3">Clearance from Library, Accounts, IT, and issue Experience Certificate.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Employee History
  // ----------------------------------------------------
  const historyContent = (
    <div className="space-y-4">
      <VFCard title="Complete Service Record & Promotion History">
        <p className="text-xs text-muted-foreground mb-3">Historical timeline of salary increments, promotions, and annual performance appraisals.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Salary Structures
  // ----------------------------------------------------
  const salaryStructuresContent = (
    <div className="space-y-4">
      <VFCard title="7th Pay Commission & Custom Salary Scale Slabs">
        <p className="text-xs text-muted-foreground mb-3">Configure Basic Pay, HRA, Dearness Allowance (DA), Transport Allowance (TA), and PF.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Payroll Processing
  // ----------------------------------------------------
  const payrollContent = (
    <div className="space-y-4">
      <VFCard title="Monthly Payroll Calculation & Bank Direct Deposit Dispatch">
        <p className="text-xs text-muted-foreground mb-3 font-mono font-bold">Auto-calculate net pay based on biometric attendance and unpaid leave days.</p>
        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Run Monthly Payroll Batch</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — Advances & Loans
  // ----------------------------------------------------
  const loansContent = (
    <div className="space-y-4">
      <VFCard title="Staff Salary Advance & Emergency Loan Management">
        <p className="text-xs text-muted-foreground mb-3">Track salary advance disburser ledgers and monthly installment payroll deductions.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 18 — Deductions
  // ----------------------------------------------------
  const deductionsContent = (
    <div className="space-y-4">
      <VFCard title="PF, ESI, Professional Tax (PT) & TDS Tax Deductions">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Provident Fund (EPFO 12%), ESI, Professional Tax, and Income Tax TDS deductions.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 19 — Payslips
  // ----------------------------------------------------
  const payslipsContent = (
    <div className="space-y-4">
      <VFCard title="Digital Monthly Payslip Generator & Portal Download">
        <p className="text-xs text-muted-foreground mb-3">Generate password-protected PDF payslips sent automatically to staff emails.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Bulk Export Payslips (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 20 — Payroll Reports
  // ----------------------------------------------------
  const payrollReportsContent = (
    <div className="space-y-4">
      <VFCard title="Monthly Salary Sheet & Bank Direct Advice Reports">
        <p className="text-xs text-muted-foreground mb-3">Generate HDFC bank advice format text file for direct bulk salary transfer.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 21 — HR Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Staff Attrition, Attendance & HR Analytics Reports">
        <p className="text-xs text-muted-foreground mb-3">Staff turnover rate, department headcount distribution, and PF/ESI challans.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 22 — HR Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global HR Engine & Statutory Compliance Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Employee ID Code Prefix" defaultValue="EMP-2026-" />
          <VFSelect label="PF Employer Contribution Rate" options={[{ label: '12% of Basic Pay', value: '12' }, { label: 'Statutory Capped Cap', value: 'cap' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 22 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'HR Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'directory', label: 'Staff Directory', icon: <Users className="h-3.5 w-3.5" />, content: directoryContent },
    { id: 'profiles', label: 'Staff Profiles', icon: <Users className="h-3.5 w-3.5" />, content: profilesContent },
    { id: 'staff-types', label: 'Staff Types', icon: <Briefcase className="h-3.5 w-3.5" />, content: staffTypesContent },
    { id: 'departments', label: 'Departments', icon: <Building className="h-3.5 w-3.5" />, content: departmentsContent },
    { id: 'designations', label: 'Designations', icon: <Award className="h-3.5 w-3.5" />, content: designationsContent },
    { id: 'onboarding', label: 'Joining & Onboarding', icon: <UserCheck className="h-3.5 w-3.5" />, content: onboardingContent },
    { id: 'documents', label: 'Staff Documents', icon: <FileText className="h-3.5 w-3.5" />, content: documentsContent },
    { id: 'attendance', label: 'Staff Attendance', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: attendanceContent },
    { id: 'leave', label: 'Leave Management', icon: <Briefcase className="h-3.5 w-3.5" />, content: leaveContent },
    { id: 'assignments', label: 'Work Assignments', icon: <Briefcase className="h-3.5 w-3.5" />, content: assignmentsContent },
    { id: 'transfers', label: 'Staff Transfers', icon: <Building className="h-3.5 w-3.5" />, content: transfersContent },
    { id: 'exit', label: 'Resignation & Exit', icon: <History className="h-3.5 w-3.5" />, content: exitContent },
    { id: 'history', label: 'Employee History', icon: <History className="h-3.5 w-3.5" />, content: historyContent },
    { id: 'salary-structures', label: 'Salary Structures', icon: <CreditCard className="h-3.5 w-3.5" />, content: salaryStructuresContent },
    { id: 'payroll', label: 'Payroll Processing', icon: <CreditCard className="h-3.5 w-3.5" />, content: payrollContent },
    { id: 'loans', label: 'Advances & Loans', icon: <CreditCard className="h-3.5 w-3.5" />, content: loansContent },
    { id: 'deductions', label: 'Deductions', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: deductionsContent },
    { id: 'payslips', label: 'Payslips', icon: <Download className="h-3.5 w-3.5" />, content: payslipsContent },
    { id: 'payroll-reports', label: 'Payroll Reports', icon: <Download className="h-3.5 w-3.5" />, content: payrollReportsContent },
    { id: 'reports', label: 'HR Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'HR Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
