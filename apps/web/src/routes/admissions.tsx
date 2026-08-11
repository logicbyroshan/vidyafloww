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
  MessageSquare,
  Send,
  AlertCircle,
  SlidersHorizontal,
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
  const [correctionNotice, setCorrectionNotice] = React.useState<string | null>(null);

  // Drag resizer handler for slide-over inspection panel
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

  // ----------------------------------------------------
  // SUBMODULE — Admission Enquiries
  // ----------------------------------------------------
  const enquiriesData = [
    { code: 'ENQ-2026-092', candidate: 'Siddharth Varma', grade: 'Class 9', guardian: 'Meena Varma', phone: '+91 98111 22233', source: 'Walk-in', status: 'Follow-up Due', nextAction: 'Campus Tour Tomorrow' },
    { code: 'ENQ-2026-093', candidate: 'Tanya Roy', grade: 'Class 11-Sci', guardian: 'Alok Roy', phone: '+91 98222 33344', source: 'Online Website', status: 'Form Issued', nextAction: 'Send WhatsApp Reminder' },
    { code: 'ENQ-2026-094', candidate: 'Devansh Joshi', grade: 'Class 6', guardian: 'Rakesh Joshi', phone: '+91 98333 44455', source: 'Parent Referral', status: 'Campus Tour Done', nextAction: 'Collect Application Fee' },
    { code: 'ENQ-2026-095', candidate: 'Rhea Sengupta', grade: 'Class 1', guardian: 'Sunil Sengupta', phone: '+91 98444 55566', source: 'Google Ads', status: 'New Lead', nextAction: 'Initial Counsellor Call' },
  ];

  const enquiriesContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <VFStatCard title="Total Enquiries Received" value="342" icon={<BrainCircuit className="h-5 w-5" />} trend="up" trendLabel="+28 this week" />
        <VFStatCard title="Walk-in Campus Tours" value="124" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="36 Tours Scheduled" />
        <VFStatCard title="Online Web Enquiries" value="188" icon={<Phone className="h-5 w-5" />} trend="neutral" trendLabel="Website & Social CRM" />
        <VFStatCard title="Pending Counsellor Follow-ups" value="30" icon={<Clock className="h-5 w-5" />} trend="down" trendLabel="Today's Target" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="Quick Register Parent Enquiry" className="lg:col-span-1">
          <div className="space-y-3 mt-2 text-xs">
            <VFInput label="Candidate Name" placeholder="e.g. Priyanshu Sharma" />
            <div className="grid grid-cols-2 gap-2">
              <VFSelect label="Grade" options={[{ label: 'Class 9', value: '9' }, { label: 'Class 11 Sci', value: '11-sci' }]} />
              <VFSelect label="Gender" options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]} />
            </div>
            <VFInput label="Guardian Name" placeholder="e.g. Rajesh Sharma" />
            <VFInput label="Guardian Phone" placeholder="+91 98000 00000" />
            <VFSelect label="Enquiry Source" options={[{ label: 'Walk-in Campus', value: 'walkin' }, { label: 'Online Website', value: 'online' }, { label: 'Parent Referral', value: 'referral' }]} />
            <VFButton size="sm" className="w-full mt-2" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              Save & Register Lead
            </VFButton>
          </div>
        </VFCard>

        <VFSection title="Active Parent Enquiries Register" className="lg:col-span-2">
          <VFDataTable
            columns={[
              { header: 'Enquiry Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono text-xs font-bold text-primary">{r.code}</span> },
              { header: 'Candidate', accessorKey: 'candidate', cell: (r: any) => <span className="font-bold text-foreground">{r.candidate}</span> },
              { header: 'Grade', accessorKey: 'grade' },
              { header: 'Source', accessorKey: 'source' },
              { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="warning">{r.status}</VFBadge> },
              { header: 'Next Action', accessorKey: 'nextAction', cell: (r: any) => <span className="text-xs text-muted-foreground">{r.nextAction}</span> },
            ]}
            data={enquiriesData}
            filterPlaceholder="Search enquiry candidate, guardian, or phone..."
          />
        </VFSection>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Admission CRM (Kanban & Lead Scoring)
  // ----------------------------------------------------
  const crmContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-primary" /> Lead Kanban Pipeline & AI Propensity Scoring
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Drag-and-drop lead stage progression with automated AI conversion scores.</p>
        </div>
        <VFBadge variant="primary">7 Pipeline Stages</VFBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
        {[
          { stage: 'NEW LEAD', count: 48, score: 'Avg Score: 45', color: 'border-blue-500/40 bg-blue-500/5', leads: ['Priyanshu (Class 9)', 'Anvi (Class 1)'] },
          { stage: 'CONTACTED', count: 32, score: 'Avg Score: 62', color: 'border-yellow-500/40 bg-yellow-500/5', leads: ['Siddharth (Class 9)', 'Tanya (Class 11)'] },
          { stage: 'INTERESTED', count: 24, score: 'Avg Score: 78', color: 'border-purple-500/40 bg-purple-500/5', leads: ['Devansh (Class 6)', 'Aarav (Class 9)'] },
          { stage: 'APPLICATION', count: 18, score: 'Avg Score: 89', color: 'border-primary/40 bg-primary/5', leads: ['Rohan (Class 6)', 'Kavya (Class 11)'] },
          { stage: 'CONVERTED', count: 12, score: 'Avg Score: 96', color: 'border-emerald-500/40 bg-emerald-500/5', leads: ['Ananya (Class 11)', 'Ishaan (Class 9)'] },
        ].map((s, i) => (
          <div key={i} className={`p-3.5 rounded-xl border ${s.color} space-y-3`}>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="font-bold text-foreground">{s.stage}</span>
              <VFBadge variant="outline">{s.count}</VFBadge>
            </div>
            <p className="text-[11px] text-primary font-semibold">{s.score}</p>
            <div className="space-y-1.5">
              {s.leads.map((l, idx) => (
                <div key={idx} className="p-2 bg-card border border-border/60 rounded-lg text-xs font-medium text-foreground shadow-2xs hover:border-primary/40 cursor-pointer">
                  {l}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="Scheduled Follow-up Roster">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { parent: 'Mr. Sunil Sengupta', candidate: 'Rhea Sengupta', date: 'Aug 12, 10:30 AM', action: 'Phone Call: Discuss Bus Route 4 Availability', assignee: 'Counsellor Priya' },
              { parent: 'Mrs. Meena Varma', candidate: 'Siddharth Varma', date: 'Aug 12, 02:00 PM', action: 'WhatsApp: Send Fee Structure PDF', assignee: 'Counsellor Amit' },
            ].map((f, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{f.parent} ({f.candidate})</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{f.action}</p>
                </div>
                <div className="text-right">
                  <VFBadge variant="warning">{f.date}</VFBadge>
                  <p className="text-[10px] text-muted-foreground mt-1">{f.assignee}</p>
                </div>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Admission Campaign ROI Matrix">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { campaign: 'Google Search Ads 2026', leads: '180 Leads', converted: '42 Enrolled', budget: '₹45,000', roi: '8.4x ROI' },
              { campaign: 'School Open House Event', leads: '95 Leads', converted: '38 Enrolled', budget: '₹20,000', roi: '12.2x ROI' },
              { campaign: 'Existing Parent Referral Scheme', leads: '68 Leads', converted: '32 Enrolled', budget: '₹10,000', roi: '15.6x ROI' },
            ].map((c, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{c.campaign}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{c.leads} · {c.converted}</p>
                </div>
                <div className="text-right">
                  <VFBadge variant="success">{c.roi}</VFBadge>
                  <p className="text-[10px] text-muted-foreground mt-1">Budget: {c.budget}</p>
                </div>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Admission Forms (Builder & Online Portal)
  // ----------------------------------------------------
  const formsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <VFStatCard title="Active Form Version" value="v2.4 (2026-27)" icon={<FileText className="h-5 w-5" />} trend="up" trendLabel="Published Live" />
        <VFStatCard title="Public Form Link" value="school.com/adm" icon={<BrainCircuit className="h-5 w-5" />} trend="neutral" trendLabel="SSL Encrypted" />
        <VFStatCard title="Application Fee Gateway" value="₹1,000 / Form" icon={<TrendingUp className="h-5 w-5" />} trend="up" trendLabel="Razorpay Live" />
        <VFStatCard title="Custom Fields Configured" value="14 Attributes" icon={<SlidersHorizontal className="h-5 w-5" />} description="RTE & Transport Rules" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="Drag & Drop Form Builder Palette">
          <p className="text-xs text-muted-foreground mb-3">Configure fields and conditional display rules for the 2026-27 online admission application form.</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {['Student Personal Details', 'Parent / Guardian Info', 'Previous Academic Records', 'Medical History & Allergies', 'Transport & Route Stop', 'RTE Reservation Category'].map((f, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <span className="font-bold text-foreground">{f}</span>
                <VFBadge variant="success">Active</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Form Templates & Conditional Rules">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-3 bg-primary/10 border border-primary/25 rounded-lg">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Conditional Rule #1: Transport Selection
              </span>
              <p className="text-muted-foreground mt-1 font-mono text-[11px]">WHEN [Transport Required] == 'YES' ➔ SHOW [Route Stop Dropdown & Fee]</p>
            </div>
            <div className="p-3 bg-muted/40 border border-border/60 rounded-lg">
              <span className="font-bold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Conditional Rule #2: Sibling Discount Rule
              </span>
              <p className="text-muted-foreground mt-1 font-mono text-[11px]">WHEN [Has Enrolled Sibling] == 'YES' ➔ SHOW [Sibling Roll No Field]</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Application Management (Main Queue)
  // ----------------------------------------------------
  const applicationsQueueContent = (
    <div className="space-y-4">
      {correctionNotice && (
        <div className="p-4 bg-warning/10 border border-warning/30 rounded-xl text-xs text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-warning shrink-0" />
            <span className="font-medium">{correctionNotice}</span>
          </div>
          <button onClick={() => setCorrectionNotice(null)} className="text-muted-foreground hover:text-foreground font-bold text-xs cursor-pointer">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Applications Received" value="148" icon={<UserSquare className="h-5 w-5" />} trend="up" trendLabel="+18 today" />
        <VFStatCard title="AI Instant Approved" value="42" icon={<Sparkles className="h-5 w-5" />} trend="up" trendLabel="Auto-screened" />
        <VFStatCard title="Interviews Pending" value="16" icon={<Clock className="h-5 w-5" />} trend="down" trendLabel="Scheduled for tomorrow" />
        <VFStatCard title="Doc Verified (OCR)" value="94.2%" icon={<FileCheck className="h-5 w-5" />} trend="up" trendLabel="124 documents processed" />
      </div>

      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <Filter className="h-4 w-4 text-primary" /> Filter by Application Workflow Stage:
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {['ALL', 'Submitted', 'AI Screened', 'Interview', 'Approved'].map((st) => (
            <button
              key={st}
              onClick={() => setActiveStageFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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

      <VFSection title="Applications Master Queue">
        <VFDataTable columns={columns} data={filteredApplicants} filterPlaceholder="Filter candidate name, grade, or recommendation..." />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Admission Assessment (Entrance Tests & Interviews)
  // ----------------------------------------------------
  const assessmentContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Entrance Test Builder Status">
          <p className="text-lg font-bold text-foreground mt-1">Class 9 & 11 Entrance Exam</p>
          <p className="text-xs text-primary font-bold mt-1">Subjects: Math, Science, English (100 Marks)</p>
        </VFCard>
        <VFCard title="Interview Roster Today">
          <p className="text-lg font-bold text-foreground mt-1">12 Panel Interviews Scheduled</p>
          <p className="text-xs text-success font-bold mt-1">Panel: Principal & Senior HODs</p>
        </VFCard>
        <VFCard title="Automated Merit List Generation">
          <p className="text-lg font-bold text-foreground mt-1">Batch 1 Ranking Calculated</p>
          <p className="text-xs text-muted-foreground mt-1">Composite Score = 60% Written + 40% Interview</p>
        </VFCard>
      </div>

      <VFCard title="Automated Merit Ranking & Evaluation Roster">
        <div className="space-y-3 mt-2 text-xs">
          {[
            { candidate: 'Aarav Sharma', grade: 'Class 9', testScore: '92/100', interviewScore: '98/100', composite: '94.4%', rank: 'Rank #1', status: 'Merit Approved' },
            { candidate: 'Ananya Verma', grade: 'Class 11-Sci', testScore: '88/100', interviewScore: '90/100', composite: '88.8%', rank: 'Rank #2', status: 'Interview Cleared' },
            { candidate: 'Kavya Nair', grade: 'Class 11-Com', testScore: '94/100', interviewScore: '92/100', composite: '93.2%', rank: 'Rank #3', status: 'Merit Approved' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border border-border/60">
              <div>
                <span className="font-bold text-foreground text-sm">{item.candidate} ({item.grade})</span>
                <p className="text-muted-foreground mt-0.5">Written Exam: {item.testScore} · Principal Interview: {item.interviewScore} · Score: {item.composite}</p>
              </div>
              <div className="flex items-center gap-3">
                <VFBadge variant="primary">{item.rank}</VFBadge>
                <VFBadge variant="success">{item.status}</VFBadge>
                <VFButton size="sm" variant="outline">Select Candidate</VFButton>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Admission Documents (AI OCR Verification)
  // ----------------------------------------------------
  const docsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="AI OCR Extraction Engine">
          <div className="flex justify-between items-center mt-2">
            <span className="text-2xl font-black text-success">98.4% Match</span>
            <VFBadge variant="success">Active Engine</VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Automated data extraction from Birth Certificates, Previous TCs, and Aadhaar copies.</p>
        </VFCard>
        <VFCard title="Document Mismatch Alerts">
          <span className="text-2xl font-black text-warning mt-2 block">2 Cases Flagged</span>
          <p className="text-xs text-muted-foreground mt-1">Spelling mismatch between Birth Certificate and Marksheet.</p>
        </VFCard>
        <VFCard title="Photo Verification & Face Quality">
          <span className="text-2xl font-black text-foreground mt-2 block">96% Quality Avg</span>
          <p className="text-xs text-success font-semibold mt-1">Background & lighting verified</p>
        </VFCard>
      </div>

      <VFCard title="Split-Screen AI Document OCR Inspection">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
          <div className="p-4 bg-muted/40 border border-border/60 rounded-xl space-y-2">
            <span className="font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Uploaded Document Scan (Birth Certificate)
            </span>
            <div className="h-36 bg-background rounded-lg border border-border flex items-center justify-center text-muted-foreground text-xs font-mono">
              [ Birth_Certificate_Aarav_Sharma.pdf Preview ]
            </div>
          </div>

          <div className="p-4 bg-muted/40 border border-border/60 rounded-xl space-y-2">
            <span className="font-bold text-foreground flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4 text-success" /> AI Extracted Verification Metadata
            </span>
            <div className="space-y-1.5 font-mono text-[11px] text-foreground">
              <p><span className="text-muted-foreground">Extracted Candidate Name:</span> Aarav Sharma (100% Match)</p>
              <p><span className="text-muted-foreground">Extracted Date of Birth:</span> 14-OCT-2011 (Verified)</p>
              <p><span className="text-muted-foreground">Extracted Father Name:</span> Rajesh Sharma (Verified)</p>
              <p><span className="text-muted-foreground">Issuing Municipal Authority:</span> MCD New Delhi</p>
            </div>
            <VFBadge variant="success" className="mt-2">OCR Verification Passed</VFBadge>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Enrollment (Auto Student Creation)
  // ----------------------------------------------------
  const enrollmentContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Offer Letter Generator">
          <span className="text-lg font-bold text-foreground block mt-2">12 Offer Letters Issued</span>
          <p className="text-xs text-muted-foreground mt-1">Auto PDF generation with fee schedules & joining dates.</p>
        </VFCard>
        <VFCard title="Confirmation Fee Receipt">
          <span className="text-lg font-bold text-foreground block mt-2">₹12.0 Lakhs Collected</span>
          <p className="text-xs text-success font-semibold mt-1">12 / 12 Admission Fees Paid</p>
        </VFCard>
        <VFCard title="Parent Portal Credentials">
          <span className="text-lg font-bold text-foreground block mt-2">12 Invites Sent</span>
          <p className="text-xs text-muted-foreground mt-1">SMS & Email login links generated.</p>
        </VFCard>
      </div>

      <VFCard title="Final Admission Approval & Automated Student Creation Wizard">
        <p className="text-xs text-muted-foreground mb-4">Automatically transfers confirmed applicants into Student 360 with scholar ID, section, and parent account.</p>
        <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground">Scholar ID Auto-Numbering Pattern:</span>
            <span className="font-mono font-bold text-primary">ADM-2026-XXX</span>
          </div>
          <p className="text-muted-foreground">Next Available Scholar ID: <span className="font-mono font-bold text-foreground">ADM-2026-006</span></p>
          <div className="flex gap-2 pt-2">
            <VFButton size="sm" leftIcon={<Check className="h-3.5 w-3.5" />}>Execute Enrollment & Generate Student 360 Record</VFButton>
            <VFButton size="sm" variant="outline">Issue Offer Letter PDF</VFButton>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Admission Analytics & Funnel
  // ----------------------------------------------------
  const analyticsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Enquiry ➔ Admission Rate" value="43.2%" icon={<TrendingUp className="h-5 w-5" />} trend="up" trendLabel="+5.8% vs last year" />
        <VFStatCard title="Grade 9 Intake Capacity" value="45 / 50" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="90% Seats Filled" />
        <VFStatCard title="Grade 11 Intake Capacity" value="66 / 80" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="82.5% Seats Filled" />
        <VFStatCard title="AI Admission Forecast" value="184 Enrolled" icon={<BrainCircuit className="h-5 w-5" />} trend="up" trendLabel="Predicted Final Intake" />
      </div>

      <VFCard title="7-Stage Admission Funnel Conversion Matrix">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-xs text-center mt-2">
          {[
            { stage: 'Enquiries', count: 342, conv: '100%' },
            { stage: 'Contacted', count: 280, conv: '81.8%' },
            { stage: 'Interested', count: 195, conv: '69.6%' },
            { stage: 'Applications', count: 148, conv: '75.8%' },
            { stage: 'Selected', count: 88, conv: '59.4%' },
            { stage: 'Enrolled', count: 76, conv: '86.3%' },
          ].map((fn, i) => (
            <div key={i} className="p-3 bg-muted/40 border border-border/60 rounded-xl space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{fn.stage}</span>
              <p className="text-xl font-black text-foreground">{fn.count}</p>
              <VFBadge variant="success" className="mx-auto text-[10px]">{fn.conv}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE — Admission Communication (Templates & Logs)
  // ----------------------------------------------------
  const communicationContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Messages Sent Today" value="284" icon={<Send className="h-5 w-5" />} trend="up" trendLabel="WhatsApp & SMS" />
        <VFStatCard title="Automated Triggers Active" value="8 Triggers" icon={<BrainCircuit className="h-5 w-5" />} trend="up" trendLabel="Workflow Engine" />
        <VFStatCard title="Delivery Success Rate" value="99.2%" icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendLabel="High Reachability" />
        <VFStatCard title="Parent Portal Active Users" value="124 Parents" icon={<Users className="h-5 w-5" />} description="Tracking Application Status" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="Admission Message Templates & Auto Triggers">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { template: 'Application Received Confirmation', trigger: 'On Application Submit', channel: 'WhatsApp & SMS', status: 'Active' },
              { template: 'Missing Document Reminder', trigger: 'On OCR Flag', channel: 'WhatsApp', status: 'Active' },
              { template: 'Principal Interview Slot Notification', trigger: 'On Slot Schedule', channel: 'SMS & Email', status: 'Active' },
              { template: 'Admission Offer & Fee Payment Link', trigger: 'On Selection', channel: 'WhatsApp & Email', status: 'Active' },
            ].map((t, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{t.template}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.trigger} · {t.channel}</p>
                </div>
                <VFBadge variant="success">{t.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Applicant Communication Roster & Parent Portal Status">
          <div className="space-y-2.5 text-xs mt-2">
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Aarav Sharma (ADM-2026-001)</p>
                <p className="text-muted-foreground text-xs mt-0.5">Offer Letter WhatsApp Sent · Delivered & Opened</p>
              </div>
              <VFBadge variant="primary">75% Portal Progress</VFBadge>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">Ananya Verma (ADM-2026-002)</p>
                <p className="text-muted-foreground text-xs mt-0.5">Interview Slot SMS Sent · Confirmed by Guardian</p>
              </div>
              <VFBadge variant="success">Confirmed</VFBadge>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // ALL 9 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'enquiries', label: 'Enquiries', icon: <BrainCircuit className="h-3.5 w-3.5" />, content: enquiriesContent },
    { id: 'admission-crm', label: 'Leads CRM', icon: <BrainCircuit className="h-3.5 w-3.5" />, content: crmContent },
    { id: 'admission-forms', label: 'Forms', icon: <FileText className="h-3.5 w-3.5" />, content: formsContent },
    { id: 'applications', label: 'Applications', icon: <UserSquare className="h-3.5 w-3.5" />, content: applicationsQueueContent },
    { id: 'assessment', label: 'Assessments', icon: <Sparkles className="h-3.5 w-3.5" />, content: assessmentContent },
    { id: 'admission-docs', label: 'Doc Verification', icon: <FileCheck className="h-3.5 w-3.5" />, content: docsContent },
    { id: 'enrollment', label: 'Enrollment', icon: <Plus className="h-3.5 w-3.5" />, content: enrollmentContent },
    { id: 'admission-analytics', label: 'Analytics', icon: <TrendingUp className="h-3.5 w-3.5" />, content: analyticsContent },
    { id: 'admission-communication', label: 'Communication', icon: <MessageSquare className="h-3.5 w-3.5" />, content: communicationContent },
  ];

  return (
    <VFPageContainer>
      {/* Admissions 9 Submodule Tab Bar */}
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
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  >
                    {inspectionWidth > 600 ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button onClick={() => setSelectedApplicant(null)} className="text-muted-foreground hover:text-foreground p-1 cursor-pointer">
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
              <VFButton variant="outline" size="sm" className="w-full" onClick={() => {
                setCorrectionNotice(`Request for Document Correction sent to guardian of ${selectedApplicant.name}.`);
                setSelectedApplicant(null);
              }}>
                Request Correction
              </VFButton>
            </div>
          </div>
        </div>
      )}
    </VFPageContainer>
  );
}
