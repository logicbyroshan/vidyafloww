import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  UserPlus,
  FileCheck,
  CheckCircle2,
  Phone,
  Eye,
  Plus,
  Download,
  TrendingUp,
} from 'lucide-react';

export const Route = createFileRoute('/admissions')({
  component: AdmissionsPage,
});

interface Applicant {
  id: string;
  applicantId: string;
  name: string;
  appliedGrade: string;
  previousSchool: string;
  guardianName: string;
  phone: string;
  fitScore: number;
  ocrDocStatus: 'Verified' | 'Pending' | 'Flagged';
  recommendation: 'Instant Admit' | 'Schedule Interview' | 'Needs Review' | 'Rejected';
  stage: 'Submitted' | 'Screened' | 'Interview' | 'Approved';
  appliedDate: string;
}

const INITIAL_APPLICANTS: Applicant[] = [
  { id: '1', applicantId: 'ADM-2026-001', name: 'Aarav Sharma', appliedGrade: 'Class 9', previousSchool: 'Delhi Public School', guardianName: 'Rajesh Sharma', phone: '+91 98765 43210', fitScore: 96, ocrDocStatus: 'Verified', recommendation: 'Instant Admit', stage: 'Screened', appliedDate: '2026-08-08' },
  { id: '2', applicantId: 'ADM-2026-002', name: 'Ananya Verma', appliedGrade: 'Class 11-Sci', previousSchool: 'St. Xavier High School', guardianName: 'Sunita Verma', phone: '+91 98123 45678', fitScore: 89, ocrDocStatus: 'Verified', recommendation: 'Schedule Interview', stage: 'Interview', appliedDate: '2026-08-09' },
  { id: '3', applicantId: 'ADM-2026-003', name: 'Rohan Gupta', appliedGrade: 'Class 6', previousSchool: 'Modern School', guardianName: 'Vikram Gupta', phone: '+91 97654 32109', fitScore: 64, ocrDocStatus: 'Flagged', recommendation: 'Needs Review', stage: 'Submitted', appliedDate: '2026-08-09' },
  { id: '4', applicantId: 'ADM-2026-004', name: 'Kavya Nair', appliedGrade: 'Class 11-Com', previousSchool: 'Kendriya Vidyalaya', guardianName: 'Suresh Nair', phone: '+91 99887 76655', fitScore: 92, ocrDocStatus: 'Verified', recommendation: 'Instant Admit', stage: 'Approved', appliedDate: '2026-08-07' },
  { id: '5', applicantId: 'ADM-2026-005', name: 'Ishaan Malhotra', appliedGrade: 'Class 9', previousSchool: 'Ryan International', guardianName: 'Anil Malhotra', phone: '+91 98234 56789', fitScore: 48, ocrDocStatus: 'Pending', recommendation: 'Needs Review', stage: 'Submitted', appliedDate: '2026-08-10' },
];

function AdmissionsPage() {
  const [applicants] = React.useState<Applicant[]>(INITIAL_APPLICANTS);
  const [selectedApplicant, setSelectedApplicant] = React.useState<Applicant | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  const applicantColumns = [
    {
      header: 'Applicant ID',
      accessorKey: 'applicantId',
      cell: (r: Applicant) => <span className="font-mono font-bold text-primary text-base">{r.applicantId}</span>,
    },
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: Applicant) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-primary/15 text-primary font-bold text-sm flex items-center justify-center shrink-0">
            {r.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="font-extrabold text-foreground text-base leading-tight">{r.name}</p>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.previousSchool}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Grade',
      accessorKey: 'appliedGrade',
      cell: (r: Applicant) => <span className="font-bold text-foreground text-base">{r.appliedGrade}</span>,
    },
    {
      header: 'Guardian / Phone',
      accessorKey: 'phone',
      cell: (r: Applicant) => <span className="text-base font-bold text-foreground">{r.guardianName} <span className="text-muted-foreground font-mono text-sm block font-normal">({r.phone})</span></span>,
    },
    {
      header: 'Fit Score',
      accessorKey: 'fitScore',
      cell: (r: Applicant) => (
        <div className="flex items-center gap-2">
          <span className="font-black text-base">{r.fitScore}%</span>
          <div className="h-2 w-14 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${r.fitScore >= 80 ? 'bg-success' : r.fitScore >= 60 ? 'bg-warning' : 'bg-destructive'}`}
              style={{ width: `${r.fitScore}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Doc Verification',
      accessorKey: 'ocrDocStatus',
      cell: (r: Applicant) => (
        <VFBadge variant={r.ocrDocStatus === 'Verified' ? 'success' : r.ocrDocStatus === 'Flagged' ? 'danger' : 'warning'}>
          {r.ocrDocStatus}
        </VFBadge>
      ),
    },
    {
      header: 'Stage',
      accessorKey: 'stage',
      cell: (r: Applicant) => <VFBadge variant="outline">{r.stage}</VFBadge>,
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (r: Applicant) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-4 w-4" />}
          onClick={() => setSelectedApplicant(r)}
        >
          Review
        </VFButton>
      ),
    },
  ];

  // 1. Overview & Funnel
  const overviewContent = (
    <div className="space-y-6">
      {notice && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-black cursor-pointer px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Total Inquiries"
          value="342"
          icon={<Phone className="h-5 w-5" />}
          trend="up"
          trendLabel="+28 this week"
          accentColor="cyan"
        />
        <VFStatCard
          title="Applications Received"
          value="148"
          icon={<FileCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="18 submitted today"
          accentColor="amber"
        />
        <VFStatCard
          title="Merit Approved"
          value="88"
          icon={<CheckCircle2 className="h-5 w-5" />}
          trend="up"
          trendLabel="Ready for enrollment"
          accentColor="purple"
        />
        <VFStatCard
          title="Final Enrolled"
          value="76"
          icon={<UserPlus className="h-5 w-5" />}
          trend="up"
          trendLabel="86.3% conversion"
          accentColor="emerald"
        />
      </div>

      {/* Visual Funnel Pipeline */}
      <VFCard title="Admissions Conversion Funnel" description="Real-time candidate progression through the enrollment lifecycle">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-base pt-1">
          <div className="border-b border-border pb-2 space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">1. Inquiries</p>
            <p className="text-3xl font-black text-foreground">342</p>
            <VFBadge variant="outline" className="mt-0.5">100% Inflow</VFBadge>
          </div>
          <div className="border-b border-border pb-2 space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">2. Applications</p>
            <p className="text-3xl font-black text-foreground">148</p>
            <VFBadge variant="outline" className="mt-0.5">43.2% Applied</VFBadge>
          </div>
          <div className="border-b border-border pb-2 space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">3. Screened & Merit</p>
            <p className="text-3xl font-black text-foreground">88</p>
            <VFBadge variant="success" className="mt-0.5">59.4% Passed</VFBadge>
          </div>
          <div className="border-b border-border pb-2 space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">4. Enrolled</p>
            <p className="text-3xl font-black text-foreground">76</p>
            <VFBadge variant="success" className="mt-0.5">86.3% Finalized</VFBadge>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // 2. Applications Roster View
  const applicationsContent = (
    <div className="space-y-6">
      {/* Selected Applicant Card */}
      {selectedApplicant && (
        <div className="p-5 bg-card border border-primary/40 rounded-lg shadow-sm animate-fade-in space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-primary/15 text-primary font-black flex items-center justify-center text-base shrink-0">
                {selectedApplicant.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground">{selectedApplicant.name} ({selectedApplicant.applicantId})</h3>
                <p className="text-sm text-muted-foreground font-semibold">Applied for {selectedApplicant.appliedGrade} · Prev: {selectedApplicant.previousSchool}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <VFBadge variant={selectedApplicant.ocrDocStatus === 'Verified' ? 'success' : 'warning'}>
                Docs: {selectedApplicant.ocrDocStatus}
              </VFBadge>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-sm text-muted-foreground hover:text-foreground font-bold px-2.5 py-1 rounded-md hover:bg-muted cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">AI Fit Score</p>
              <p className="text-xl font-black text-primary mt-0.5">{selectedApplicant.fitScore}%</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recommendation</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedApplicant.recommendation}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Guardian Contact</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedApplicant.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Submission Date</p>
              <p className="text-base font-bold text-foreground mt-0.5">{selectedApplicant.appliedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-border">
            <VFButton
              size="sm"
              onClick={() => {
                setNotice(`Candidate ${selectedApplicant.name} approved for instant enrollment!`);
                setSelectedApplicant(null);
              }}
            >
              Approve & Issue Admission Letter
            </VFButton>
            <VFButton
              size="sm"
              variant="outline"
              onClick={() => {
                setNotice(`Interview invite sent to ${selectedApplicant.name}.`);
                setSelectedApplicant(null);
              }}
            >
              Schedule Interview
            </VFButton>
          </div>
        </div>
      )}

      {/* Main Applicant Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Candidate Applications Master Roster</h2>
            <p className="text-sm text-muted-foreground font-medium">Review incoming student intake and auto-verified documents</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Roster
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              New Application
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={applicantColumns}
          data={applicants}
          filterPlaceholder="Search candidates by name, ID, or school..."
        />
      </div>
    </div>
  );

  // 3. Inquiries & Leads View
  const inquiriesContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Open Inquiries" description="Leads from Website & Open Days">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">48 Uncontacted</p>
            <p className="text-sm text-muted-foreground font-medium">Auto WhatsApp welcome sequences dispatched</p>
            <VFButton size="sm" className="w-full">
              Dispatch Follow-Up Reminders
            </VFButton>
          </div>
        </VFCard>

        <VFCard title="Campus Tour Bookings" description="Scheduled in-person visits">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">16 Scheduled</p>
            <p className="text-sm text-muted-foreground font-medium">Next slot: Tomorrow at 10:00 AM</p>
            <VFButton size="sm" variant="outline" className="w-full">
              View Tour Schedule
            </VFButton>
          </div>
        </VFCard>

        <VFCard title="Lead Source Breakdown" description="Acquisition channel performance">
          <div className="space-y-2 mt-1 text-base">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Direct School Website</span>
              <span className="font-black text-foreground">58%</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span className="text-muted-foreground font-semibold">Parent Referrals</span>
              <span className="font-black text-foreground">24%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Social & Search Ads</span>
              <span className="font-black text-foreground">18%</span>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Admissions Overview & Funnel', icon: <TrendingUp className="h-4 w-4" />, content: overviewContent },
    { id: 'applications', label: 'Applications Roster', icon: <FileCheck className="h-4 w-4" />, content: applicationsContent },
    { id: 'inquiries', label: 'Inquiries & Leads', icon: <Phone className="h-4 w-4" />, content: inquiriesContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="overview" variant="top-bar" />
    </VFPageContainer>
  );
}
