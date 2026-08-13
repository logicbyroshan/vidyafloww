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

export const Route = createFileRoute('/grievances')({
  component: ComplaintsGrievancesPage,
});

function ComplaintsGrievancesPage() {
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
          <p className="text-xs text-muted-foreground font-mono font-bold text-emerald-500">Classify complaints into Academic, Transport, Hostel, Accounts, or Safety.</p>
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
  // ALL 13 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Complaints Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'types', label: 'Complaint Types', icon: <FileText className="h-3.5 w-3.5" />, content: typesContent },
    { id: 'new-complaint', label: 'New Complaint', icon: <Plus className="h-3.5 w-3.5" />, content: newComplaintContent },
    { id: 'inbox', label: 'Complaint Inbox', icon: <HeartHandshake className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'assignment', label: 'Assignment', icon: <Users className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'investigation', label: 'Investigation', icon: <Clock className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'communication', label: 'Communication', icon: <Send className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'escalation', label: 'Escalation', icon: <AlertCircle className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'resolution', label: 'Resolution', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'closure', label: 'Closure', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'history', label: 'Complaint History', icon: <History className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'reports', label: 'Complaint Reports', icon: <Download className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'settings', label: 'Complaint Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: dashboardContent },
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
