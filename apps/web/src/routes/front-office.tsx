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
  HeartHandshake,
  AlertCircle,
  Users,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Send,
  Download,
  History,
  BarChart3,
  ShieldAlert,
  FileText,
} from 'lucide-react';

export const Route = createFileRoute('/front-office')({
  component: FrontOfficePage,
});

function FrontOfficePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const complaintData = [
    { ticketNo: 'TKT-2026-042', subject: 'Bus Route 4 Morning Pickup Delay', category: 'Transport', filedBy: 'Parent (Aditya Verma)', assignedTo: 'Transport Head', priority: 'High', status: 'In Progress' },
    { ticketNo: 'TKT-2026-039', subject: 'Canteen Food Hygiene Inquiry', category: 'Infrastructure & Mess', filedBy: 'Parent Council', assignedTo: 'Hostel Warden', priority: 'Medium', status: 'Under Investigation' },
    { ticketNo: 'TKT-2026-031', subject: 'Fee Receipt Duplicate Issue', category: 'Accounts & Billing', filedBy: 'Parent (Priya Sharma)', assignedTo: 'Fee Counter Clerk', priority: 'Low', status: 'Resolved' },
  ];

  const complaintColumns = [
    { header: 'Ticket No', accessorKey: 'ticketNo', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.ticketNo}</span> },
    { header: 'Subject & Topic', accessorKey: 'subject', cell: (r: any) => <span className="font-bold text-foreground">{r.subject}</span> },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Filed By', accessorKey: 'filedBy' },
    { header: 'Assigned Custodian', accessorKey: 'assignedTo' },
    { header: 'Priority', accessorKey: 'priority', cell: (r: any) => <VFBadge variant={r.priority === 'High' ? 'danger' : 'warning'}>{r.priority}</VFBadge> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Resolved' ? 'success' : 'primary'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Complaints Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Open Grievance Tickets" value="6 Active" icon={<AlertCircle className="h-5 w-5 text-amber-500" />} trend="down" trendLabel="-4 Resolved Today" />
        <VFStatCard title="Avg Resolution Time" value="24 Hours" icon={<Clock className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="Within SLA Goal" />
        <VFStatCard title="High Priority Tickets" value="1 Urgent" icon={<ShieldAlert className="h-5 w-5 text-rose-500" />} description="Transport Delay" />
        <VFStatCard title="Resolution Satisfaction" value="98.2%" icon={<CheckCircle2 className="h-5 w-5 text-purple-500" />} description="Parent Feedback" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Complaint Types
  // ----------------------------------------------------
  const typesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Grievance Category & SLA Matrix</h3>
          <p className="text-xs text-muted-foreground">Classify complaints into Academic, Transport, Hostel, Accounts, or Safety.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Complaint Category</VFButton>
      </div>
      <VFDataTable columns={complaintColumns} data={complaintData} filterPlaceholder="Search ticket no or subject..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — New Complaint
  // ----------------------------------------------------
  const newComplaintContent = (
    <div className="space-y-4">
      <VFCard title="Log New Student or Parent Grievance Ticket">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Complainant Name & Contact" placeholder="e.g. Parent of Rahul Verma" />
          <VFSelect label="Grievance Category" options={[{ label: 'Transport & Bus Routes', value: 'trans' }, { label: 'Academic & Teaching', value: 'acad' }, { label: 'Hostel & Mess', value: 'host' }]} />
          <VFInput label="Subject / Brief Title" placeholder="e.g. Bus Pickup Delay" />
          <VFSelect label="Priority Level" options={[{ label: 'High (Immediate Action Required)', value: 'high' }, { label: 'Medium', value: 'med' }, { label: 'Low', value: 'low' }]} />
        </div>
        <VFButton size="sm" className="mt-4" leftIcon={<Send className="h-3.5 w-3.5" />}>Submit Grievance Ticket</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Complaint Inbox
  // ----------------------------------------------------
  const inboxContent = (
    <div className="space-y-4">
      <VFCard title="Centralized Grievance Ticket Inbox">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Incoming tickets submitted via Parent App, Web Portal, or Reception Counter.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Assignment
  // ----------------------------------------------------
  const assignmentContent = (
    <div className="space-y-4">
      <VFCard title="Officer & Departmental Custodian Ticket Assignment">
        <p className="text-xs text-muted-foreground mb-3">Assign tickets to Transport Manager, Academic Coordinator, or Hostel Warden.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Investigation
  // ----------------------------------------------------
  const investigationContent = (
    <div className="space-y-4">
      <VFCard title="Fact-Finding & Internal Investigation Notes">
        <p className="text-xs text-muted-foreground mb-3">Internal staff notes, driver interview logs, and evidence attachments.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Communication
  // ----------------------------------------------------
  const communicationContent = (
    <div className="space-y-4">
      <VFCard title="Complainant SMS & Email Resolution Status Updates">
        <p className="text-xs text-muted-foreground mb-3">Keep parents informed with automated status update SMS alerts.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Escalation
  // ----------------------------------------------------
  const escalationContent = (
    <div className="space-y-4">
      <VFCard title="SLA Breach & Management Escalation Matrix">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-rose-500 font-bold">Auto-escalate unresolved tickets to Principal after 48 hours.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Resolution
  // ----------------------------------------------------
  const resolutionContent = (
    <div className="space-y-4">
      <VFCard title="Corrective Action Plan & Resolution Summary">
        <p className="text-xs text-muted-foreground mb-3">Record corrective action taken and staff resolution notes.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Closure
  // ----------------------------------------------------
  const closureContent = (
    <div className="space-y-4">
      <VFCard title="Complainant OTP Sign-Off & Ticket Closure">
        <p className="text-xs text-muted-foreground mb-3">Close ticket upon parent satisfaction OTP verification.</p>
        <VFBadge variant="success">Parent Satisfaction Verified</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Complaint History
  // ----------------------------------------------------
  const historyContent = (
    <div className="space-y-4">
      <VFCard title="Historical Grievance Resolution Audit Archive">
        <p className="text-xs text-muted-foreground mb-3">Archive of closed complaints across past academic terms.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Complaint Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Grievance SLA Compliance & Department Benchmark Reports">
        <p className="text-xs text-muted-foreground mb-3">Export category breakdown, SLA compliance percentages, and recurring issue trends.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Grievance Report (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Complaint Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Grievance Engine & SLA Hour Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Standard SLA Resolution Time" defaultValue="24 Hours" />
          <VFInput label="Escalation Time Threshold" defaultValue="48 Hours" />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 13 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Complaints Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'types', label: 'Complaint Types', icon: <FileText className="h-3.5 w-3.5" />, content: typesContent },
    { id: 'new-complaint', label: 'New Complaint', icon: <Plus className="h-3.5 w-3.5" />, content: newComplaintContent },
    { id: 'inbox', label: 'Complaint Inbox', icon: <HeartHandshake className="h-3.5 w-3.5" />, content: inboxContent },
    { id: 'assignment', label: 'Assignment', icon: <Users className="h-3.5 w-3.5" />, content: assignmentContent },
    { id: 'investigation', label: 'Investigation', icon: <Clock className="h-3.5 w-3.5" />, content: investigationContent },
    { id: 'communication', label: 'Communication', icon: <Send className="h-3.5 w-3.5" />, content: communicationContent },
    { id: 'escalation', label: 'Escalation', icon: <AlertCircle className="h-3.5 w-3.5" />, content: escalationContent },
    { id: 'resolution', label: 'Resolution', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: resolutionContent },
    { id: 'closure', label: 'Closure', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: closureContent },
    { id: 'history', label: 'Complaint History', icon: <History className="h-3.5 w-3.5" />, content: historyContent },
    { id: 'reports', label: 'Complaint Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Complaint Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
