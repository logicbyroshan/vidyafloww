import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
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
  UserSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  FileCheck,
  BrainCircuit,
  Plus,
  ShieldCheck,
  Eye,
  FileText,
  X,
  Maximize2,
  Minimize2,
  Phone,
  Filter,
  Check,
  TrendingUp,
  Users,
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
  aiFitScore: number;
  ocrDocStatus: 'Verified' | 'Pending' | 'Flagged';
  aiRecommendation: 'Instant Admit' | 'Schedule Interview' | 'Needs Review' | 'Rejected';
  stage: 'Submitted' | 'AI Screened' | 'Interview' | 'Approved';
  appliedDate: string;
}

const INITIAL_APPLICANTS: Applicant[] = [
  { id: '1', applicantId: 'ADM-2026-001', name: 'Aarav Sharma', appliedGrade: 'Class 9', previousSchool: 'Delhi Public School', guardianName: 'Rajesh Sharma', phone: '+91 98765 43210', aiFitScore: 96, ocrDocStatus: 'Verified', aiRecommendation: 'Instant Admit', stage: 'AI Screened', appliedDate: '2026-08-08' },
  { id: '2', applicantId: 'ADM-2026-002', name: 'Ananya Verma', appliedGrade: 'Class 11-Sci', previousSchool: 'St. Xavier High School', guardianName: 'Sunita Verma', phone: '+91 98123 45678', aiFitScore: 89, ocrDocStatus: 'Verified', aiRecommendation: 'Schedule Interview', stage: 'Interview', appliedDate: '2026-08-09' },
  { id: '3', applicantId: 'ADM-2026-003', name: 'Rohan Gupta', appliedGrade: 'Class 6', previousSchool: 'Modern School', guardianName: 'Vikram Gupta', phone: '+91 97654 32109', aiFitScore: 64, ocrDocStatus: 'Flagged', aiRecommendation: 'Needs Review', stage: 'Submitted', appliedDate: '2026-08-09' },
  { id: '4', applicantId: 'ADM-2026-004', name: 'Kavya Nair', appliedGrade: 'Class 11-Com', previousSchool: 'Kendriya Vidyalaya', guardianName: 'Suresh Nair', phone: '+91 99887 76655', aiFitScore: 92, ocrDocStatus: 'Verified', aiRecommendation: 'Instant Admit', stage: 'Approved', appliedDate: '2026-08-07' },
  { id: '5', applicantId: 'ADM-2026-005', name: 'Ishaan Malhotra', appliedGrade: 'Class 9', previousSchool: 'Ryan International', guardianName: 'Anil Malhotra', phone: '+91 98234 56789', aiFitScore: 48, ocrDocStatus: 'Pending', aiRecommendation: 'Needs Review', stage: 'Submitted', appliedDate: '2026-08-10' },
];

function AdmissionsPage() {
  const [selectedApplicant, setSelectedApplicant] = React.useState<Applicant | null>(null);
  const [inspectionWidth, setInspectionWidth] = React.useState(520);
  const [isDragging, setIsDragging] = React.useState(false);
  const [activeStageFilter, setActiveStageFilter] = React.useState<string>('ALL');

  // Drag resizer handler
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 380 && newWidth < 850) {
        setInspectionWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const filteredApplicants = activeStageFilter === 'ALL'
    ? INITIAL_APPLICANTS
    : INITIAL_APPLICANTS.filter(a => a.stage === activeStageFilter);

  // Table Columns Definition
  const columns = [
    { header: 'Applicant ID', accessorKey: 'applicantId', cell: (row: Applicant) => <span className="font-mono text-xs font-bold text-primary">{row.applicantId}</span> },
    { header: 'Candidate Name', accessorKey: 'name', cell: (row: Applicant) => <span className="font-bold text-foreground">{row.name}</span> },
    { header: 'Grade Applied', accessorKey: 'appliedGrade' },
    { header: 'Guardian Phone', accessorKey: 'phone' },
    {
      header: 'AI Fit Score',
      accessorKey: 'aiFitScore',
      cell: (row: Applicant) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden border border-border">
            <div className={`h-full ${row.aiFitScore >= 80 ? 'bg-primary' : row.aiFitScore >= 60 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${row.aiFitScore}%` }} />
          </div>
          <span className="text-xs font-bold text-foreground">{row.aiFitScore}%</span>
        </div>
      ),
    },
    {
      header: 'OCR Doc Status',
      accessorKey: 'ocrDocStatus',
      cell: (row: Applicant) => (
        <VFBadge variant={row.ocrDocStatus === 'Verified' ? 'success' : row.ocrDocStatus === 'Pending' ? 'warning' : 'danger'}>
          {row.ocrDocStatus}
        </VFBadge>
      ),
    },
    {
      header: 'AI Verdict',
      accessorKey: 'aiRecommendation',
      cell: (row: Applicant) => (
        <VFBadge variant={row.aiRecommendation === 'Instant Admit' ? 'primary' : row.aiRecommendation === 'Schedule Interview' ? 'warning' : 'outline'}>
          {row.aiRecommendation}
        </VFBadge>
      ),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (row: Applicant) => (
        <VFButton size="sm" variant="outline" leftIcon={<Eye className="h-3.5 w-3.5" />} onClick={() => setSelectedApplicant(row)}>
          Inspect Report
        </VFButton>
      ),
    },
  ];

  // 1. Enquiries Submodule Content
  const enquiriesData = [
    { code: 'ENQ-2026-092', candidate: 'Siddharth Varma', grade: 'Class 9', guardian: 'Meena Varma', phone: '+91 98111 22233', source: 'Walk-in', status: 'Follow-up Due' },
    { code: 'ENQ-2026-093', candidate: 'Tanya Roy', grade: 'Class 11-Sci', guardian: 'Alok Roy', phone: '+91 98222 33344', source: 'Online Website', status: 'Form Issued' },
    { code: 'ENQ-2026-094', candidate: 'Devansh Joshi', grade: 'Class 6', guardian: 'Rakesh Joshi', phone: '+91 98333 44455', source: 'Parent Referral', status: 'Campus Tour Done' },
  ];

  const enquiriesContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <VFStatCard title="Total Enquiries" value="342" icon={<BrainCircuit className="h-5 w-5" />} trend="up" trendLabel="+28 this week" />
        <VFStatCard title="Walk-in Tours" value="124" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="36 Tours Scheduled" />
        <VFStatCard title="Online Enquiries" value="188" icon={<Phone className="h-5 w-5" />} trend="neutral" trendLabel="Website & Social CRM" />
        <VFStatCard title="Pending Follow-ups" value="30" icon={<Clock className="h-5 w-5" />} trend="down" trendLabel="Today's Target" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <VFCard title="Quick Register Parent Enquiry" className="lg:col-span-1">
          <div className="space-y-3 mt-2 text-xs">
            <VFInput label="Candidate Name" placeholder="e.g. Priyanshu Sharma" />
            <VFSelect label="Applying for Grade" options={[{ label: 'Class 9', value: '9' }, { label: 'Class 11 Science', value: '11-sci' }]} />
            <VFInput label="Guardian Phone" placeholder="+91 98000 00000" />
            <VFSelect label="Enquiry Source" options={[{ label: 'Walk-in Campus', value: 'walkin' }, { label: 'Online Website', value: 'online' }]} />
            <VFButton size="sm" className="w-full mt-2" leftIcon={<Plus className="h-3.5 w-3.5" />}>Register Enquiry</VFButton>
          </div>
        </VFCard>

        <VFSection title="Active Parent Enquiries Register" className="lg:col-span-2">
          <VFDataTable
            columns={[
              { header: 'Enquiry Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono text-xs font-bold text-primary">{r.code}</span> },
              { header: 'Candidate', accessorKey: 'candidate' },
              { header: 'Grade', accessorKey: 'grade' },
              { header: 'Source', accessorKey: 'source' },
              { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="warning">{r.status}</VFBadge> },
            ]}
            data={enquiriesData}
            filterPlaceholder="Search enquiry candidate or phone..."
          />
        </VFSection>
      </div>
    </div>
  );

  // 2. Leads CRM Submodule Content
  const leadsCRMContent = (
    <div className="space-y-6">
      <VFCard title="Admission Lead Pipeline Stage Matrix">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3 text-xs">
          {[
            { stage: 'New Lead', count: 48, color: 'border-blue-500/40 bg-blue-500/5' },
            { stage: 'Contacted', count: 32, color: 'border-yellow-500/40 bg-yellow-500/5' },
            { stage: 'Campus Tour', count: 24, color: 'border-purple-500/40 bg-purple-500/5' },
            { stage: 'Form Submitted', count: 18, color: 'border-primary/40 bg-primary/5' },
            { stage: 'Enrolled', count: 12, color: 'border-emerald-500/40 bg-emerald-500/5' },
          ].map((s, i) => (
            <div key={i} className={`p-4 rounded-xl border ${s.color} space-y-2`}>
              <span className="font-bold text-foreground block">{s.stage}</span>
              <p className="text-2xl font-black text-foreground">{s.count} Leads</p>
              <p className="text-sm text-muted-foreground">Auto-synced from CRM</p>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // 3. Forms Submodule Content
  const formsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <VFCard title="Online Admission Form Status">
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-foreground">Active for Session 2026-27</span>
            <VFBadge variant="success">Live Online</VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Public portal accepting submissions with Razorpay fee integration (₹1,000 application fee).</p>
        </VFCard>
        <VFCard title="Custom Field Attributes">
          <span className="text-lg font-bold text-foreground block mt-2">14 Custom Attributes</span>
          <p className="text-xs text-muted-foreground mt-1">RTE Category, Hostel Required, Bus Transport Stop, Second Language Preference.</p>
        </VFCard>
        <VFCard title="Form Submissions Today">
          <span className="text-lg font-bold text-foreground block mt-2">18 Submissions</span>
          <p className="text-xs text-success font-bold mt-1">12 Auto Verified by OCR Engine</p>
        </VFCard>
      </div>
    </div>
  );

  // 4. Applications Queue Submodule Content (Main Queue View)
  const applicationsQueueContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <VFStatCard title="Total Applications Received" value="148" icon={<UserSquare className="h-5 w-5" />} trend="up" trendLabel="+18 today" />
        <VFStatCard title="AI Instant Approved" value="42" icon={<Sparkles className="h-5 w-5" />} trend="up" trendLabel="Auto-screened" />
        <VFStatCard title="Interviews Pending" value="16" icon={<Clock className="h-5 w-5" />} trend="down" trendLabel="Scheduled for tomorrow" />
        <VFStatCard title="Doc Verified (OCR)" value="94.2%" icon={<FileCheck className="h-5 w-5" />} description="124 documents processed" />
      </div>

      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <Filter className="h-4 w-4 text-primary" /> Filter by Pipeline Stage:
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {['ALL', 'Submitted', 'AI Screened', 'Interview', 'Approved'].map((st) => (
            <button
              key={st}
              onClick={() => setActiveStageFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeStageFilter === st
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <VFSection title="Applications Queue">
        <VFDataTable columns={columns} data={filteredApplicants} filterPlaceholder="Filter candidate name, grade, or recommendation..." />
      </VFSection>
    </div>
  );

  // 5. Assessments Submodule Content
  const assessmentContent = (
    <div className="space-y-6">
      <VFCard title="Entrance Test & Principal Interview Merit Ranking">
        <div className="space-y-3 mt-2 text-xs">
          {[
            { candidate: 'Aarav Sharma', grade: 'Class 9', testScore: '92/100', interviewScore: '98/100', rank: 'Rank #1', status: 'Merit List Approved' },
            { candidate: 'Ananya Verma', grade: 'Class 11-Sci', testScore: '88/100', interviewScore: '90/100', rank: 'Rank #2', status: 'Interview Cleared' },
            { candidate: 'Kavya Nair', grade: 'Class 11-Com', testScore: '94/100', interviewScore: '92/100', rank: 'Rank #3', status: 'Merit List Approved' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border border-border/60">
              <div>
                <span className="font-bold text-foreground text-sm">{item.candidate} ({item.grade})</span>
                <p className="text-muted-foreground mt-0.5">Written Score: {item.testScore} · Principal Interview: {item.interviewScore}</p>
              </div>
              <div className="flex items-center gap-3">
                <VFBadge variant="primary">{item.rank}</VFBadge>
                <VFBadge variant="success">{item.status}</VFBadge>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // 6. Doc Verification Submodule Content
  const docsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <VFCard title="OCR Verification Engine">
          <div className="flex justify-between items-center mt-2">
            <span className="text-2xl font-black text-success">98.4% Match</span>
            <VFBadge variant="success">Active AI Engine</VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Automated scan of Birth Certificates, Previous School TCs, and Aadhaar copies.</p>
        </VFCard>
        <VFCard title="Flagged Document Anomalies">
          <span className="text-2xl font-black text-warning mt-2 block">2 Cases</span>
          <p className="text-xs text-muted-foreground mt-1">Name spelling mismatch between birth certificate and previous marksheet.</p>
        </VFCard>
        <VFCard title="Missing Documents Tracker">
          <span className="text-2xl font-black text-foreground mt-2 block">14 Candidates</span>
          <p className="text-xs text-muted-foreground mt-1">Pending Transfer Certificate (TC) original submission.</p>
        </VFCard>
      </div>
    </div>
  );

  // 7. Enrollment Submodule Content
  const enrollmentContent = (
    <div className="space-y-6">
      <VFCard title="Final Admission Approval & Scholar ID Auto-Generator">
        <p className="text-xs text-muted-foreground mb-4">Assign scholar numbers, allocate sections, and issue student identity records.</p>
        <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground">Scholar ID Auto Numbering Pattern:</span>
            <span className="font-mono font-bold text-primary">ADM-2026-XXX</span>
          </div>
          <p className="text-muted-foreground">Next Available Scholar ID: <span className="font-mono font-bold text-foreground">ADM-2026-006</span></p>
          <VFButton size="sm" leftIcon={<Check className="h-3.5 w-3.5" />}>Run Final Enrollment Wizard</VFButton>
        </div>
      </VFCard>
    </div>
  );

  // 8. Analytics Submodule Content
  const analyticsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <VFStatCard title="Enquiry ➔ Admission Conversion" value="43.2%" icon={<TrendingUp className="h-5 w-5" />} trend="up" trendLabel="+5.8% vs last year" />
        <VFStatCard title="Grade 9 Intake Capacity" value="45 / 50 Seats" icon={<Users className="h-5 w-5" />} description="90% Seats Filled" />
        <VFStatCard title="Grade 11 Intake Capacity" value="66 / 80 Seats" icon={<Users className="h-5 w-5" />} description="82.5% Seats Filled" />
      </div>
    </div>
  );

  const submoduleTabs = [
    { id: 'enquiries', label: 'Enquiries', icon: <BrainCircuit className="h-3.5 w-3.5" />, content: enquiriesContent },
    { id: 'admission-crm', label: 'Leads CRM', icon: <BrainCircuit className="h-3.5 w-3.5" />, content: leadsCRMContent },
    { id: 'admission-forms', label: 'Forms', icon: <FileText className="h-3.5 w-3.5" />, content: formsContent },
    { id: 'applications', label: 'Applications', icon: <UserSquare className="h-3.5 w-3.5" />, content: applicationsQueueContent },
    { id: 'assessment', label: 'Assessments', icon: <Sparkles className="h-3.5 w-3.5" />, content: assessmentContent },
    { id: 'admission-docs', label: 'Doc Verification', icon: <FileCheck className="h-3.5 w-3.5" />, content: docsContent },
    { id: 'enrollment', label: 'Enrollment', icon: <Plus className="h-3.5 w-3.5" />, content: enrollmentContent },
    { id: 'admission-analytics', label: 'Analytics', icon: <BrainCircuit className="h-3.5 w-3.5" />, content: analyticsContent },
  ];

  return (
    <VFPageContainer>
      {/* Admissions Submodule Tab Bar */}
      <VFTabs 
        items={submoduleTabs}
        defaultTabId="applications"
        variant="top-bar"
      />

      {/* Resizable Candidate Inspection Report Slide-Over */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-background/50 backdrop-blur-xs flex justify-end">
          <div
            style={{ width: `${inspectionWidth}px`, maxWidth: '50vw' }}
            className="bg-card border-l border-border h-full p-6 shadow-2xl flex flex-col justify-between animate-slide-in-right relative select-none"
          >
            {/* Left Edge Drag Handle */}
            <div
              onMouseDown={() => setIsDragging(true)}
              className="absolute left-0 top-0 bottom-0 w-2 -ml-1 cursor-ew-resize flex items-center justify-center z-20 group"
            >
              <div className="w-1 h-8 rounded-full bg-border group-hover:bg-primary/70 transition-colors" />
            </div>

            <div className="space-y-5 overflow-y-auto custom-scrollbar">
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <span className="text-xs font-mono text-primary font-bold uppercase">{selectedApplicant.applicantId}</span>
                  <h3 className="font-bold text-foreground text-base">{selectedApplicant.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedApplicant.appliedGrade} • {selectedApplicant.previousSchool}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setInspectionWidth(inspectionWidth > 600 ? 520 : Math.floor(window.innerWidth * 0.45))}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {inspectionWidth > 600 ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button onClick={() => setSelectedApplicant(null)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Fit score dial */}
              <div className="p-4 bg-muted/60 border border-border rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Candidate AI Match Index
                  </span>
                  <span className="text-sm font-bold text-primary">{selectedApplicant.aiFitScore}/100</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${selectedApplicant.aiFitScore}%` }} />
                </div>
              </div>

              {/* Document verification status */}
              <div className="space-y-2 text-xs">
                <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Document OCR Verification</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-primary" /> Previous Marksheet (10th)
                    </span>
                    <span className="text-success font-semibold text-xs flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> 98% Match
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Identity & Aadhaar Proof
                    </span>
                    <span className="text-success font-semibold text-xs flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex gap-2">
              <VFButton size="sm" className="w-full" onClick={() => setSelectedApplicant(null)}>
                Approve Candidate
              </VFButton>
              <VFButton variant="outline" size="sm" className="w-full" onClick={() => setSelectedApplicant(null)}>
                Schedule Interview
              </VFButton>
            </div>
          </div>
        </div>
      )}
    </VFPageContainer>
  );
}
