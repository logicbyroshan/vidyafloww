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
  UserCheck,
  PhoneCall,
  Calendar,
  MessageSquare,
  Sparkles,
  Plus,
  ArrowRight,
  QrCode,
} from 'lucide-react';

export const Route = createFileRoute('/front-office')({
  component: FrontOfficePage,
});

interface EnquiryRecord {
  id: string;
  enquiryNo: string;
  personName: string;
  phone: string;
  source: string;
  grade: string;
  session: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Lost';
}

interface VisitorRecord {
  id: string;
  passNo: string;
  visitorName: string;
  type: string;
  personToMeet: string;
  purpose: string;
  checkInTime: string;
  status: 'Checked In' | 'Expected' | 'Checked Out';
}

function FrontOfficePage() {
  const frontOfficeModule = MODULE_REGISTRY.find((m) => m.id === 'front-office');

  const enquiriesData: EnquiryRecord[] = [
    { id: '1', enquiryNo: 'ENQ-2026-00482', personName: 'Rahul Sharma (Parent: Rajesh)', phone: '+91 98111 22233', source: 'Website', grade: 'Grade 8', session: '2026-27', status: 'Follow-up' },
    { id: '2', enquiryNo: 'ENQ-2026-00483', personName: 'Priya Patel (Parent: Amit)', phone: '+91 98222 33344', source: 'Walk-in', grade: 'Grade 6', session: '2026-27', status: 'Contacted' },
    { id: '3', enquiryNo: 'ENQ-2026-00484', personName: 'Aman Singh (Parent: Vikram)', phone: '+91 98333 44455', source: 'Referral', grade: 'Grade 11 Sci', session: '2026-27', status: 'Converted' },
  ];

  const visitorsData: VisitorRecord[] = [
    { id: '1', passNo: 'V-2026-0042', visitorName: 'Rajesh Sharma', type: 'Parent', personToMeet: 'Principal', purpose: 'Grade 8 Admission Meeting', checkInTime: '09:15 AM', status: 'Checked In' },
    { id: '2', passNo: 'V-2026-0043', visitorName: 'ABC Publishers Representative', type: 'Vendor', personToMeet: 'Librarian', purpose: 'Book Catalog Delivery', checkInTime: '10:30 AM', status: 'Expected' },
    { id: '3', passNo: 'V-2026-0044', visitorName: 'Dr. Anita Desai', type: 'Guest Speaker', personToMeet: 'Vice Principal', purpose: 'Science Workshop Briefing', checkInTime: '11:45 AM', status: 'Checked Out' },
  ];

  // 19.1 Front Office Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Front Office & Reception Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 28 new admission enquiries, 12 follow-up calls due, visitor gate passes, and principal appointments.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Front Office AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>New Enquiry</VFButton>
        </div>
      </div>

      {/* Feature 1 — Front Office KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="New Enquiries Today" value="28 Enquiries" icon={<MessageSquare className="h-5 w-5 text-primary" />} trend="up" trendLabel="18 Open Leads" />
        <VFStatCard title="Today's Visitors" value="7 Checked In" icon={<UserCheck className="h-5 w-5 text-secondary" />} trend="up" trendLabel="48 Gate Passes Issued" />
        <VFStatCard title="Follow-ups Due Today" value="12 Calls" icon={<PhoneCall className="h-5 w-5 text-warning" />} description="2 Overdue Follow-ups" />
        <VFStatCard title="Scheduled Appointments" value="4 Meetings" icon={<Calendar className="h-5 w-5 text-success" />} description="6 Today Meetings" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Follow-ups & Master Enquiries */}
        <VFSection title="Today's Follow-ups Queue & Active Enquiries" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Rahul's Parent (Rajesh)</span>
                <VFBadge variant="warning">🟡 Call Due</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Grade 8 Admission Enquiry · Source: Website</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Amit Sharma</span>
                <VFBadge variant="primary">🔵 Follow-up</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Class 11 Fee Structure Enquiry · Source: Walk-in</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Neha Patel</span>
                <VFBadge variant="danger">🔴 Overdue</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Bus Route Transport Enquiry · Overdue 1 Day</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Enquiry No', accessorKey: 'enquiryNo', cell: (r: EnquiryRecord) => <span className="font-mono font-bold text-primary">{r.enquiryNo}</span> },
              { header: 'Applicant / Parent', accessorKey: 'personName', cell: (r: EnquiryRecord) => <span className="font-bold text-foreground">{r.personName}</span> },
              { header: 'Contact Phone', accessorKey: 'phone', cell: (r: EnquiryRecord) => <span className="font-mono text-muted-foreground">{r.phone}</span> },
              { header: 'Source', accessorKey: 'source', cell: (r: EnquiryRecord) => <VFBadge variant="outline">{r.source}</VFBadge> },
              { header: 'Grade / Session', accessorKey: 'grade', cell: (r: EnquiryRecord) => `${r.grade} (${r.session})` },
              {
                header: 'Status',
                accessorKey: 'status',
                cell: (r: EnquiryRecord) => (
                  <VFBadge variant={r.status === 'Converted' ? 'success' : r.status === 'Follow-up' ? 'warning' : 'primary'}>
                    {r.status}
                  </VFBadge>
                ),
              },
            ]}
            data={enquiriesData}
            filterPlaceholder="Search enquiry number or name..."
          />
        </VFSection>

        {/* Today's Visitor Gate Log */}
        <VFCard title="Today's Visitor Gate Log & Passes">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-success/10 border border-success/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">👤 Rajesh Sharma (Parent)</span>
                <VFBadge variant="success">Checked In 09:15 AM</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Pass V-2026-0042 · Meeting Principal</p>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">📦 ABC Publishers (Vendor)</span>
                <VFBadge variant="primary">Expected 10:30 AM</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Pass V-2026-0043 · Book Catalog Delivery</p>
            </div>
            <div className="p-2.5 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🚪 Reception Token Queue</span>
                <VFBadge variant="secondary">Now Serving #A002</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">3 Visitors waiting in front reception lounge</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 19.4 Visitor Management Submodule Content
  const visitorsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Front Desk Visitor & Gate Pass Security Registry</h3>
          <p className="text-xs text-muted-foreground">Register campus visitors, issue digital QR gate passes, notify meeting hosts, and log check-out timestamps.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<QrCode className="h-3.5 w-3.5" />}>Scan Pass QR</VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Register Visitor</VFButton>
        </div>
      </div>

      <VFDataTable
        columns={[
          { header: 'Pass No', accessorKey: 'passNo', cell: (r: VisitorRecord) => <span className="font-mono font-bold text-primary">{r.passNo}</span> },
          { header: 'Visitor Name', accessorKey: 'visitorName', cell: (r: VisitorRecord) => <span className="font-bold text-foreground">{r.visitorName}</span> },
          { header: 'Visitor Type', accessorKey: 'type', cell: (r: VisitorRecord) => <VFBadge variant="outline">{r.type}</VFBadge> },
          { header: 'Person to Meet', accessorKey: 'personToMeet', cell: (r: VisitorRecord) => <span className="font-bold text-primary">{r.personToMeet}</span> },
          { header: 'Purpose of Visit', accessorKey: 'purpose' },
          { header: 'Check-In Time', accessorKey: 'checkInTime' },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r: VisitorRecord) => (
              <VFBadge variant={r.status === 'Checked In' ? 'success' : r.status === 'Expected' ? 'primary' : 'outline'}>
                {r.status}
              </VFBadge>
            ),
          },
        ]}
        data={visitorsData}
        filterPlaceholder="Search pass number or visitor name..."
      />
    </div>
  );

  // 19.3 Pipeline & Follow-up Submodule Content
  const pipelineContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Admission Lead Pipeline & CRM Follow-up Stages</h3>
          <p className="text-xs text-muted-foreground">Track prospect progression from initial web enquiry to campus visit and admission conversion.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Schedule Follow-up</VFButton>
      </div>

      <VFCard title="Admission Prospect Funnel Stages (Enquiry ➔ Admission)">
        <div className="flex items-center justify-between text-xs font-semibold py-4 overflow-x-auto gap-2">
          {['1. New (1,000)', '2. Contacted (720)', '3. Interested (480)', '4. Visit Scheduled (320)', '5. Application (240)', '6. Admitted (180)'].map((st, i) => (
            <React.Fragment key={st}>
              <div className={`px-3 py-2 rounded-lg border text-center whitespace-nowrap ${i === 5 ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-muted/40 border-border text-muted-foreground'}`}>
                {st}
              </div>
              {i < 5 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    enquiries: dashboardContent,
    pipeline: pipelineContent,
    visitors: visitorsContent,
    appointments: dashboardContent,
    prospects: pipelineContent,
    communication: dashboardContent,
    forms: dashboardContent,
    operations: dashboardContent,
    'reports-settings': dashboardContent,
  };

  const submoduleTabs = (frontOfficeModule?.submodules || [
    { id: 'dashboard', label: 'Front Office Dashboard' },
    { id: 'enquiries', label: 'Enquiry Management' },
    { id: 'pipeline', label: 'Pipeline & Follow-up' },
    { id: 'visitors', label: 'Visitor Management' },
    { id: 'appointments', label: 'Appointments & Reception' },
    { id: 'prospects', label: 'Leads & Admission Prospects' },
    { id: 'communication', label: 'Calls & Communication' },
    { id: 'forms', label: 'Documents & Forms' },
    { id: 'operations', label: 'Tasks & Operations' },
    { id: 'reports-settings', label: 'Reports & Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <UserCheck className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
