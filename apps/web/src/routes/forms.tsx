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
  ClipboardCheck,
  Plus,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  Clock,
  FileText,
  BarChart3,
  Sparkles,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

export const Route = createFileRoute('/forms')({
  component: SurveysFormsPage,
});

function SurveysFormsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const formData = [
    { code: 'FRM-2026-08', title: 'Annual Parent Satisfaction Survey 2026', type: 'Parent Survey', audience: 'Whole School', target: '1,248 Parents', responses: '980 Received', status: 'Active Survey' },
    { code: 'FRM-2026-05', title: 'Class 11 Stream Preference Selection', type: 'Student Form', audience: 'Class 10 Students', target: '240 Students', responses: '235 Received', status: 'Closed' },
    { code: 'FRM-2026-12', title: 'Annual Educational Tour Parent Consent', type: 'Consent Form', audience: 'Class 9 to 12', target: '480 Parents', responses: '462 Approved', status: 'Active Consent' },
  ];

  const formColumns = [
    { header: 'Form Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Form / Survey Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Form Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="outline">{r.type}</VFBadge> },
    { header: 'Target Audience', accessorKey: 'audience' },
    { header: 'Submissions', accessorKey: 'responses', cell: (r: any) => <span className="font-mono font-bold text-emerald-500">{r.responses}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Forms Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Forms & Surveys" value="8 Live Forms" icon={<ClipboardCheck className="h-5 w-5 text-primary" />} trend="up" trendLabel="Parent & Staff" />
        <VFStatCard title="Total Submissions" value="1,840 Received" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="94.2% Response Rate" />
        <VFStatCard title="Pending Approvals" value="12 Submissions" icon={<FileCheck className="h-5 w-5 text-amber-500" />} description="Consent Slips" />
        <VFStatCard title="Form Templates" value="18 Ready" icon={<FileText className="h-5 w-5 text-purple-500" />} description="Pre-configured Forms" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Form Builder
  // ----------------------------------------------------
  const builderContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Drag & Drop Form Builder Studio</h3>
          <p className="text-xs text-muted-foreground font-mono font-bold text-emerald-500">Design custom forms, surveys, polls, and consent slips with custom fields.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create New Form</VFButton>
      </div>
      <VFDataTable columns={formColumns} data={formData} filterPlaceholder="Search form title or type..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Student Forms
  // ----------------------------------------------------
  const studentFormsContent = (
    <div className="space-y-4">
      <VFCard title="Student Elective Choice & Club Registration Forms">
        <p className="text-xs text-muted-foreground mb-3">Collect student subject choices, club preferences, and sports registrations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Parent Forms
  // ----------------------------------------------------
  const parentFormsContent = (
    <div className="space-y-4">
      <VFCard title="Parent Consent, Medical & Picnic Authorization Slips">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Digital parent signature slips for picnic trips and medical declarations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Staff Forms
  // ----------------------------------------------------
  const staffFormsContent = (
    <div className="space-y-4">
      <VFCard title="Staff Leave Requisition & Resource Request Forms">
        <p className="text-xs text-muted-foreground mb-3">Internal staff feedback forms and equipment requisitions.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Surveys
  // ----------------------------------------------------
  const surveysContent = (
    <div className="space-y-4">
      <VFCard title="Annual School Quality & Parent Satisfaction Surveys">
        <p className="text-xs text-muted-foreground mb-3">Anonymized parent and student feedback surveys on teaching quality and infrastructure.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Feedback
  // ----------------------------------------------------
  const feedbackContent = (
    <div className="space-y-4">
      <VFCard title="Continuous Stakeholder Feedback Inbox">
        <p className="text-xs text-muted-foreground mb-3">Continuous feedback collection from parents, alumni, and staff.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Polls
  // ----------------------------------------------------
  const pollsContent = (
    <div className="space-y-4">
      <VFCard title="Quick 1-Click Opinion Polls">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-emerald-500 font-bold">Quick single-question opinion polls on mobile app.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Consent Forms
  // ----------------------------------------------------
  const consentFormsContent = (
    <div className="space-y-4">
      <VFCard title="Legal & Field Trip Consent Forms">
        <p className="text-xs text-muted-foreground mb-3">Digital OTP verified parent consent slips for field trips and sports events.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Registration Forms
  // ----------------------------------------------------
  const registrationFormsContent = (
    <div className="space-y-4">
      <VFCard title="Event & Competition Online Registration Forms">
        <p className="text-xs text-muted-foreground mb-3">Public and internal event registration forms.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Form Approvals
  // ----------------------------------------------------
  const approvalsContent = (
    <div className="space-y-4">
      <VFCard title="Form Submission Approval & Review Pipeline">
        <p className="text-xs text-muted-foreground mb-3">Review and approve submitted student forms before data synchronization.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Responses
  // ----------------------------------------------------
  const responsesContent = (
    <div className="space-y-4">
      <VFCard title="Form Submission Responses Inbox & Spreadsheet View">
        <p className="text-xs text-muted-foreground mb-3">View and search raw response submissions in real-time grid view.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Response Analysis
  // ----------------------------------------------------
  const responseAnalysisContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Responses" value="1,840 Received" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="Across 8 Forms" />
        <VFStatCard title="Parent Satisfaction" value="4.8 / 5.0" icon={<Sparkles className="h-5 w-5 text-amber-500" />} trend="up" trendLabel="High Rating" />
        <VFStatCard title="Avg Completion Time" value="3.5 Mins" icon={<Clock className="h-5 w-5 text-primary" />} description="Per Form" />
        <VFStatCard title="Pending Approvals" value="12 Forms" icon={<FileCheck className="h-5 w-5 text-purple-500" />} description="Awaiting Action" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Form Templates
  // ----------------------------------------------------
  const templatesContent = (
    <div className="space-y-4">
      <VFCard title="Pre-Built Form & Survey Template Library">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Picnic Consent Form Template</span>
            <p className="text-muted-foreground text-xs mt-1">Pre-configured parent authorization fields with OTP</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Subject Preference Template</span>
            <p className="text-muted-foreground text-xs mt-1">Class 11 stream choice selection matrix</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Teacher Evaluation Template</span>
            <p className="text-muted-foreground text-xs mt-1">Anonymized student feedback survey</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Form Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Form Engine Parameters & Access Controls">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Max File Upload Size per Form" defaultValue="10 MB" />
          <VFSelect label="Allow Anonymous Responses" options={[{ label: 'Disabled (Requires Login)', value: 'false' }, { label: 'Enabled for Feedback Forms', value: 'true' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 15 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Forms Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'builder', label: 'Form Builder', icon: <ClipboardCheck className="h-3.5 w-3.5" />, content: builderContent },
    { id: 'student-forms', label: 'Student Forms', icon: <Users className="h-3.5 w-3.5" />, content: studentFormsContent },
    { id: 'parent-forms', label: 'Parent Forms', icon: <Users className="h-3.5 w-3.5" />, content: parentFormsContent },
    { id: 'staff-forms', label: 'Staff Forms', icon: <Users className="h-3.5 w-3.5" />, content: staffFormsContent },
    { id: 'surveys', label: 'Surveys', icon: <HelpCircle className="h-3.5 w-3.5" />, content: surveysContent },
    { id: 'feedback', label: 'Feedback', icon: <FileText className="h-3.5 w-3.5" />, content: feedbackContent },
    { id: 'polls', label: 'Polls', icon: <Sparkles className="h-3.5 w-3.5" />, content: pollsContent },
    { id: 'consent-forms', label: 'Consent Forms', icon: <FileCheck className="h-3.5 w-3.5" />, content: consentFormsContent },
    { id: 'registration-forms', label: 'Registration Forms', icon: <Plus className="h-3.5 w-3.5" />, content: registrationFormsContent },
    { id: 'approvals', label: 'Form Approvals', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: approvalsContent },
    { id: 'responses', label: 'Responses', icon: <FileText className="h-3.5 w-3.5" />, content: responsesContent },
    { id: 'response-analysis', label: 'Response Analysis', icon: <BarChart3 className="h-3.5 w-3.5" />, content: responseAnalysisContent },
    { id: 'templates', label: 'Form Templates', icon: <FileText className="h-3.5 w-3.5" />, content: templatesContent },
    { id: 'settings', label: 'Form Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
