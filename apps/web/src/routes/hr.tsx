import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  CircleDollarSign,
  AlertTriangle,
  Sparkles,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle2,
  Award,
  ShieldCheck,
  Briefcase,
  Send,
  Eye,
} from 'lucide-react';

export const Route = createFileRoute('/hr')({
  component: HRPage,
});

interface EmployeeRecord {
  id: string;
  empId: string;
  name: string;
  dept: string;
  desig: string;
  status: 'Active' | 'Probation' | 'On Leave' | 'Resigned';
  joiningDate: string;
  salary: number;
}

interface CandidateRecord {
  id: string;
  name: string;
  position: string;
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Offer';
  experience: string;
  rating: number;
}

function HRPage() {
  const hrModule = MODULE_REGISTRY.find((m) => m.id === 'hr');

  const employees: EmployeeRecord[] = [
    { id: '1', empId: 'EMP-00421', name: 'Rahul Sharma', dept: 'Science Department', desig: 'Senior Mathematics Teacher', status: 'Active', joiningDate: '12 Jun 2023', salary: 43000 },
    { id: '2', empId: 'EMP-00422', name: 'Priya Patel', dept: 'Administration', desig: 'Senior Accountant', status: 'Active', joiningDate: '03 Apr 2024', salary: 52000 },
    { id: '3', empId: 'EMP-00423', name: 'Amit Kumar', dept: 'Physics', desig: 'Physics Lab Assistant', status: 'Probation', joiningDate: '15 Jan 2026', salary: 28000 },
    { id: '4', empId: 'EMP-00424', name: 'Dr. Sarah Connor', dept: 'Science Department', desig: 'Head of Science', status: 'Active', joiningDate: '10 Aug 2021', salary: 85000 },
    { id: '5', empId: 'EMP-00425', name: 'Vikram Singh', dept: 'Physical Education', desig: 'Sports Director', status: 'On Leave', joiningDate: '01 Nov 2022', salary: 48000 },
  ];

  const candidates: CandidateRecord[] = [
    { id: '1', name: 'Ananya Roy', position: 'English Teacher', stage: 'Interview', experience: '5 Yrs', rating: 8.5 },
    { id: '2', name: 'Rohan Gupta', position: 'Chemistry Lecturer', stage: 'Shortlisted', experience: '3 Yrs', rating: 8.0 },
    { id: '3', name: 'Sneha Verma', position: 'Primary Teacher', stage: 'Selected', experience: '4 Yrs', rating: 9.0 },
    { id: '4', name: 'Karan Malhotra', position: 'IT Administrator', stage: 'Offer', experience: '6 Yrs', rating: 8.8 },
  ];

  // 10.1 HR Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">HR & Workforce Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 486 school employees, payroll, recruitment pipelines, and staff appraisals.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask HR AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Employee</VFButton>
        </div>
      </div>

      {/* Feature 1 — HR KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Employees" value="486" icon={<Users className="h-5 w-5 text-primary" />} trend="up" trendLabel="462 Active Staff" />
        <VFStatCard title="Present Today" value="462" icon={<UserCheck className="h-5 w-5 text-success" />} trend="up" trendLabel="95.0% Attendance" />
        <VFStatCard title="On Leave / Absent" value="24" icon={<UserX className="h-5 w-5 text-warning" />} description="18 Absent · 6 Leave" />
        <VFStatCard title="Monthly Payroll" value="₹ 42.8 Lakhs" icon={<CircleDollarSign className="h-5 w-5 text-secondary" />} trend="up" trendLabel="August 2026 Draft" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Attendance Breakdown & Workforce Overview */}
        <VFSection title="Today's Employee Attendance & Workforce Breakdown" className="lg:col-span-2 space-y-4">
          <div className="p-4 bg-muted/30 border border-border/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Employee Attendance Rate (August 11, 2026)</span>
              <span className="text-success font-mono">95% Present</span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
              <div className="bg-success h-full" style={{ width: '95%' }} />
              <div className="bg-destructive h-full" style={{ width: '3%' }} />
              <div className="bg-warning h-full" style={{ width: '2%' }} />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success inline-block" /> Present (462)</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive inline-block" /> Absent (18)</div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning inline-block" /> On Leave (6)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Science Dept</p>
              <p className="text-base font-bold text-foreground mt-0.5">84 Staff</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Mathematics</p>
              <p className="text-base font-bold text-foreground mt-0.5">62 Staff</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Administration</p>
              <p className="text-base font-bold text-foreground mt-0.5">31 Staff</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Support Fleet</p>
              <p className="text-base font-bold text-foreground mt-0.5">45 Staff</p>
            </div>
          </div>
        </VFSection>

        {/* HR Alerts & Attention Required */}
        <VFCard title="Attention Required & HR Alerts">
          <div className="space-y-2.5 text-xs mt-1">
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span>7 Staff Documents Expiring Soon</span>
              </div>
              <VFBadge variant="warning">Review</VFBadge>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>4 Unapproved Leave Requests</span>
              </div>
              <VFBadge variant="primary">Approve</VFBadge>
            </div>
            <div className="p-2.5 bg-secondary/10 border border-secondary/30 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-secondary" />
                <span>3 Annual Appraisals Due</span>
              </div>
              <VFBadge variant="outline">Action</VFBadge>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 10.2 Employee Directory Submodule Content
  const directoryContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card border border-border p-3 rounded-xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, ID, phone..."
              className="w-full bg-muted/40 border border-border/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground focus:outline-hidden focus:border-primary"
            />
          </div>
          <VFButton size="sm" variant="outline" leftIcon={<Filter className="h-3.5 w-3.5" />}>Filter</VFButton>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <VFButton size="sm" variant="outline" leftIcon={<Upload className="h-3.5 w-3.5" />}>Bulk Import</VFButton>
          <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export CSV</VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Employee</VFButton>
        </div>
      </div>

      <VFDataTable
        columns={[
          { header: 'Employee ID', accessorKey: 'empId', cell: (r: EmployeeRecord) => <span className="font-mono font-bold text-primary">{r.empId}</span> },
          { header: 'Full Name', accessorKey: 'name', cell: (r: EmployeeRecord) => <span className="font-bold text-foreground">{r.name}</span> },
          { header: 'Department', accessorKey: 'dept' },
          { header: 'Designation', accessorKey: 'desig' },
          { header: 'Joining Date', accessorKey: 'joiningDate' },
          { header: 'Monthly Salary', accessorKey: 'salary', cell: (r: EmployeeRecord) => `₹ ${r.salary.toLocaleString('en-IN')}` },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r: EmployeeRecord) => (
              <VFBadge variant={r.status === 'Active' ? 'success' : r.status === 'Probation' ? 'warning' : 'danger'}>
                {r.status}
              </VFBadge>
            ),
          },
          {
            header: 'Actions',
            accessorKey: 'id',
            cell: () => (
              <VFButton size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />}>
                360° Profile
              </VFButton>
            ),
          },
        ]}
        data={employees}
        filterPlaceholder="Search employee directory..."
      />
    </div>
  );

  // 10.3 Employee Profile (Employee 360) Submodule Content
  const profileContent = (
    <div className="space-y-4">
      {/* Top Employee 360 Header Card */}
      <div className="bg-card border border-border p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-xl">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">Rahul Sharma</h2>
              <VFBadge variant="success">Active</VFBadge>
            </div>
            <p className="text-xs font-semibold text-primary">Senior Mathematics Teacher · Science Department</p>
            <p className="text-xs text-muted-foreground mt-0.5">ID: EMP-00421 · Joined: 12 Jun 2023 · Campus: Main Wing</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Briefcase className="h-3.5 w-3.5" />}>Promote / Revision</VFButton>
          <VFButton size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>Ask HR AI</VFButton>
        </div>
      </div>

      {/* Visual Career Timeline & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <VFCard title="Career & Promotion History" className="lg:col-span-2">
          <div className="relative border-l-2 border-primary/30 pl-4 space-y-4 my-2 text-xs">
            <div className="relative">
              <span className="absolute -left-[21px] top-0 h-3.5 w-3.5 rounded-full bg-primary border-2 border-background" />
              <p className="font-bold text-foreground">2026 — Promoted to Senior Mathematics Teacher</p>
              <p className="text-muted-foreground text-xs">Assigned Head of Grade 10 Curriculum & CBSE Board Coordinator.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[21px] top-0 h-3.5 w-3.5 rounded-full bg-muted-foreground border-2 border-background" />
              <p className="font-bold text-foreground">2025 — Transferred to Main Campus Science Department</p>
              <p className="text-muted-foreground text-xs">Relocated from Junior Wing Campus.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[21px] top-0 h-3.5 w-3.5 rounded-full bg-muted-foreground border-2 border-background" />
              <p className="font-bold text-foreground">2023 — Joined Springfield Academy</p>
              <p className="text-muted-foreground text-xs">Appointed as Assistant Mathematics Teacher.</p>
            </div>
          </div>
        </VFCard>

        <VFCard title="Personal & Emergency Details">
          <div className="space-y-2 text-xs">
            <p><span className="text-muted-foreground">Contact Phone:</span> <span className="font-semibold text-foreground">+91 98765 43210</span></p>
            <p><span className="text-muted-foreground">Email Address:</span> <span className="font-semibold text-foreground">rahul.sharma@vidyamaxx.edu</span></p>
            <p><span className="text-muted-foreground">Emergency Contact:</span> <span className="font-semibold text-foreground">Sunita Sharma (Spouse) - +91 98765 11223</span></p>
            <p><span className="text-muted-foreground">PF Account No:</span> <span className="font-mono font-bold text-primary">MH/BAN/00421/PF</span></p>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 10.4 Recruitment (Lightweight ATS) Submodule Content
  const recruitmentContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Open Positions" value="8" icon={<Briefcase className="h-5 w-5 text-primary" />} trend="up" trendLabel="3 Critical Posts" />
        <VFStatCard title="Active Applicants" value="142" icon={<Users className="h-5 w-5 text-secondary" />} trend="up" trendLabel="This Month" />
        <VFStatCard title="Interviews Scheduled" value="24" icon={<Clock className="h-5 w-5 text-warning" />} description="This Week" />
        <VFStatCard title="Offers Issued" value="7" icon={<CheckCircle2 className="h-5 w-5 text-success" />} trend="up" trendLabel="4 Accepted" />
      </div>

      <VFSection title="Candidate Pipeline (Applicant Tracking System)">
        <VFDataTable
          columns={[
            { header: 'Candidate Name', accessorKey: 'name', cell: (r: CandidateRecord) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Applied Position', accessorKey: 'position', cell: (r: CandidateRecord) => <span className="text-primary font-semibold">{r.position}</span> },
            { header: 'Experience', accessorKey: 'experience' },
            { header: 'AI Rating', accessorKey: 'rating', cell: (r: CandidateRecord) => <span className="font-bold text-success">★ {r.rating} / 10</span> },
            {
              header: 'Stage',
              accessorKey: 'stage',
              cell: (r: CandidateRecord) => (
                <VFBadge variant={r.stage === 'Selected' || r.stage === 'Offer' ? 'success' : 'warning'}>
                  {r.stage}
                </VFBadge>
              ),
            },
            {
              header: 'Action',
              accessorKey: 'id',
              cell: () => (
                <VFButton size="sm" variant="outline" leftIcon={<UserCheck className="h-3.5 w-3.5" />}>
                  Convert to Staff
                </VFButton>
              ),
            },
          ]}
          data={candidates}
          filterPlaceholder="Search candidates or applied positions..."
        />
      </VFSection>
    </div>
  );

  // 10.6 Payroll Submodule Content
  const payrollContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Gross Payroll (Aug 2026)" value="₹ 52.4 Lakhs" icon={<CircleDollarSign className="h-5 w-5 text-primary" />} trend="up" trendLabel="486 Staff" />
        <VFStatCard title="Total Statutory Deductions" value="₹ 7.8 Lakhs" icon={<ShieldCheck className="h-5 w-5 text-warning" />} description="PF, ESI & TDS Tax" />
        <VFStatCard title="Net Payout Amount" value="₹ 44.6 Lakhs" icon={<CheckCircle2 className="h-5 w-5 text-success" />} trend="up" trendLabel="Ready for Payout" />
        <VFStatCard title="Payroll Status" value="Approved" icon={<Sparkles className="h-5 w-5 text-secondary" />} trend="up" trendLabel="Finance Signed Off" />
      </div>

      <VFCard title="August 2026 Guided Payroll Run & Payslips">
        <div className="flex items-center justify-between mb-4 bg-muted/40 p-3 rounded-xl border border-border/60">
          <div>
            <p className="font-bold text-xs text-foreground">Guided Payroll Status: Ready for Bank File Generation</p>
            <p className="text-xs text-muted-foreground">486 Payslips generated and verified with 0 unresolved exceptions.</p>
          </div>
          <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
            Publish Payslips & Process Payout
          </VFButton>
        </div>
      </VFCard>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    directory: directoryContent,
    profiles: profileContent,
    recruitment: recruitmentContent,
    'attendance-leave': dashboardContent,
    payroll: payrollContent,
    'salary-structure': payrollContent,
    performance: profileContent,
    documents: directoryContent,
    reports: dashboardContent,
  };

  const submoduleTabs = (hrModule?.submodules || [
    { id: 'dashboard', label: 'HR Dashboard' },
    { id: 'directory', label: 'Employee Directory' },
    { id: 'profiles', label: 'Employee Profiles' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'attendance-leave', label: 'Attendance & Leave' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'salary-structure', label: 'Salary Structure' },
    { id: 'performance', label: 'Performance' },
    { id: 'documents', label: 'Employee Documents' },
    { id: 'reports', label: 'HR Reports' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Briefcase className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
