import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFDrawer,
  cn,
} from '@vidyamaxx/ui';
import {
  CheckCircle2,
  Phone,
  Eye,
  Plus,
  Download,
  MessageSquare,
  Copy,
  Check,
  X,
  Edit3,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Award,
  FileText,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/admissions')({
  component: AdmissionsPage,
});

interface Applicant {
  id: string;
  applicantId: string;
  name: string;
  avatarUrl: string;
  appliedGrade: string;
  previousSchool: string;
  previousMarks: string;
  guardianName: string;
  guardianRelation: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  fitScore: number;
  ocrDocStatus: 'Verified' | 'Pending' | 'Flagged';
  recommendation: 'Instant Admit' | 'Schedule Interview' | 'Needs Review' | 'Rejected';
  stage: 'Submitted' | 'Screened' | 'Interview' | 'Approved';
  appliedDate: string;
  tcAvailable: boolean;
  birthCertVerified: boolean;
  medicalClearance: boolean;
  notes?: string;
}

const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: '1',
    applicantId: 'ADM-2026-001',
    name: 'Aarav Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 9',
    previousSchool: 'Delhi Public School',
    previousMarks: '94.6% (Grade A1)',
    guardianName: 'Rajesh Sharma',
    guardianRelation: 'Father',
    phone: '+91 98765 43210',
    email: 'rajesh.sharma@gmail.com',
    address: 'Flat 401, Apex Towers, Sector 62, Noida',
    dob: '14 May 2011',
    fitScore: 96,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Screened',
    appliedDate: '2026-08-08',
    tcAvailable: true,
    birthCertVerified: true,
    medicalClearance: true,
    notes: 'Exceptional academic track record with state-level science olympiad medal.',
  },
  {
    id: '2',
    applicantId: 'ADM-2026-002',
    name: 'Ananya Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 11-Sci',
    previousSchool: 'St. Xavier High School',
    previousMarks: '91.2% (Grade A1)',
    guardianName: 'Sunita Verma',
    guardianRelation: 'Mother',
    phone: '+91 98123 45678',
    email: 'sunita.v@outlook.com',
    address: 'B-14, Green Park Extension, New Delhi',
    dob: '22 Jan 2009',
    fitScore: 89,
    ocrDocStatus: 'Verified',
    recommendation: 'Schedule Interview',
    stage: 'Interview',
    appliedDate: '2026-08-09',
    tcAvailable: true,
    birthCertVerified: true,
    medicalClearance: true,
    notes: 'Applying for Physics-Maths-Computer Science stream. Interview scheduled.',
  },
  {
    id: '3',
    applicantId: 'ADM-2026-003',
    name: 'Rohan Gupta',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 6',
    previousSchool: 'Modern School',
    previousMarks: '74.0% (Grade B1)',
    guardianName: 'Vikram Gupta',
    guardianRelation: 'Father',
    phone: '+91 97654 32109',
    email: 'vikram.gupta@corp.in',
    address: '88, Anand Vihar, New Delhi',
    dob: '18 Sep 2014',
    fitScore: 64,
    ocrDocStatus: 'Flagged',
    recommendation: 'Needs Review',
    stage: 'Submitted',
    appliedDate: '2026-08-09',
    tcAvailable: false,
    birthCertVerified: true,
    medicalClearance: false,
    notes: 'Transfer certificate missing counter-signature from previous school district.',
  },
  {
    id: '4',
    applicantId: 'ADM-2026-004',
    name: 'Kavya Nair',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 11-Com',
    previousSchool: 'Kendriya Vidyalaya',
    previousMarks: '93.8% (Grade A1)',
    guardianName: 'Suresh Nair',
    guardianRelation: 'Father',
    phone: '+91 99887 76655',
    email: 'suresh.nair@kerala.org',
    address: '102, Palm Grove, Gurgaon',
    dob: '05 Mar 2009',
    fitScore: 92,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Approved',
    appliedDate: '2026-08-07',
    tcAvailable: true,
    birthCertVerified: true,
    medicalClearance: true,
    notes: 'Admitted on merit. Fee link dispatched.',
  },
  {
    id: '5',
    applicantId: 'ADM-2026-005',
    name: 'Ishaan Malhotra',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 9',
    previousSchool: 'Ryan International',
    previousMarks: '68.5% (Grade B2)',
    guardianName: 'Anil Malhotra',
    guardianRelation: 'Father',
    phone: '+91 98234 56789',
    email: 'anil.malhotra@yahoo.com',
    address: 'House 56, Sector 15, Faridabad',
    dob: '30 Nov 2010',
    fitScore: 48,
    ocrDocStatus: 'Pending',
    recommendation: 'Needs Review',
    stage: 'Submitted',
    appliedDate: '2026-08-10',
    tcAvailable: false,
    birthCertVerified: false,
    medicalClearance: true,
    notes: 'Awaiting birth certificate verification and prior mark sheets.',
  },
];

function AdmissionsPage() {
  const { activeSession } = useGlobalStore();
  const [applicantList, setApplicantList] = React.useState<Applicant[]>(INITIAL_APPLICANTS);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [isEditingApplicant, setIsEditingApplicant] = React.useState<boolean>(false);
  const [applicantFormData, setApplicantFormData] = React.useState<Applicant | null>(null);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  const activeApplicant =
    selectedApplicantIndex !== null && selectedApplicantIndex >= 0 && selectedApplicantIndex < applicantList.length
      ? applicantList[selectedApplicantIndex]
      : null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openApplicantDrawer = (app: Applicant) => {
    const idx = applicantList.findIndex((a) => a.id === app.id);
    setSelectedApplicantIndex(idx >= 0 ? idx : 0);
    setIsEditingApplicant(false);
    setApplicantFormData(null);
    setIsDrawerOpen(true);
  };

  const handleStartEdit = () => {
    if (activeApplicant) {
      setApplicantFormData({ ...activeApplicant });
      setIsEditingApplicant(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingApplicant(false);
    setApplicantFormData(null);
  };

  const handleSaveApplicant = () => {
    if (!applicantFormData || selectedApplicantIndex === null) return;
    const updated = [...applicantList];
    updated[selectedApplicantIndex] = { ...applicantFormData };
    setApplicantList(updated);
    setIsEditingApplicant(false);
    setApplicantFormData(null);
    setNotice(`Updated candidate profile for ${applicantFormData.name}.`);
  };

  const handleApproveAdmit = () => {
    if (selectedApplicantIndex === null) return;
    const updated = [...applicantList];
    updated[selectedApplicantIndex] = {
      ...updated[selectedApplicantIndex],
      stage: 'Approved',
      recommendation: 'Instant Admit',
    };
    setApplicantList(updated);
    setNotice(`Admission offer letter issued to ${updated[selectedApplicantIndex].name}!`);
    setIsDrawerOpen(false);
  };

  const handlePrevApplicant = () => {
    if (selectedApplicantIndex !== null && selectedApplicantIndex > 0) {
      setIsEditingApplicant(false);
      setApplicantFormData(null);
      setSelectedApplicantIndex(selectedApplicantIndex - 1);
    }
  };

  const handleNextApplicant = () => {
    if (selectedApplicantIndex !== null && selectedApplicantIndex < applicantList.length - 1) {
      setIsEditingApplicant(false);
      setApplicantFormData(null);
      setSelectedApplicantIndex(selectedApplicantIndex + 1);
    }
  };

  const applicantColumns = [
    {
      header: 'Applicant ID',
      accessorKey: 'applicantId',
      cell: (r: Applicant) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
          {r.applicantId}
        </span>
      ),
    },
    {
      header: 'Candidate Name',
      accessorKey: 'name',
      cell: (r: Applicant) => (
        <div className="flex items-center gap-3.5">
          <div
            className="overflow-hidden rounded-xl border border-border shadow-xs w-11 h-[56px] bg-muted shrink-0"
            style={{ aspectRatio: '19.5 / 25' }}
          >
            <img src={r.avatarUrl} alt={r.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-extrabold text-foreground text-sm leading-tight">{r.name}</p>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.previousSchool}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Applied Grade',
      accessorKey: 'appliedGrade',
      cell: (r: Applicant) => <span className="font-bold text-foreground text-sm">{r.appliedGrade}</span>,
    },
    {
      header: 'Guardian / Contact',
      accessorKey: 'phone',
      cell: (r: Applicant) => (
        <div>
          <span className="text-sm font-bold text-foreground block">{r.guardianName}</span>
          <span className="text-xs text-muted-foreground font-mono">{r.phone}</span>
        </div>
      ),
    },
    {
      header: 'AI Fit Score',
      accessorKey: 'fitScore',
      cell: (r: Applicant) => (
        <div className="flex items-center gap-2">
          <span className="font-black text-sm text-foreground">{r.fitScore}%</span>
          <div className="h-2 w-14 bg-muted rounded-full overflow-hidden border border-border/50">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                r.fitScore >= 80 ? 'bg-emerald-400' : r.fitScore >= 60 ? 'bg-amber-400' : 'bg-rose-400'
              )}
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
      cell: (r: Applicant) => (
        <VFBadge variant={r.stage === 'Approved' ? 'success' : 'outline'}>{r.stage}</VFBadge>
      ),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (r: Applicant) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-4 w-4" />}
          onClick={() => openApplicantDrawer(r)}
        >
          Review Application
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="p-4 sm:p-5 flex-1 flex flex-col min-h-0 space-y-4">
      {notice && (
        <div className="p-4 bg-muted/60 border border-border rounded-xl text-sm text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Total Inquiries</span>
            <span className="text-2xl font-black text-foreground mt-1 block">342 Leads</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">+28 new this week</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Applications Received</span>
            <span className="text-2xl font-black text-foreground mt-1 block">148 Applied</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">18 submitted today</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Merit Screened</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">88 Cleared</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">Ready for Enrollment</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Final Enrolled</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">76 Students</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">86.3% conversion rate</span>
          </div>
        </div>
      </div>

      {/* Main Candidate Table */}
      <VFDataTable
        columns={applicantColumns}
        data={applicantList}
        filterPlaceholder="Search candidates by name, applicant ID, or school..."
        rightActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => alert('Exporting candidate admissions master list as CSV...')}
            >
              Export Roster
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => alert('Opening new offline intake application form...')}
            >
              New Application
            </VFButton>
          </>
        }
      />

      {/* 360° ADMISSIONS APPLICANT REVIEW DRAWER */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsEditingApplicant(false);
          setApplicantFormData(null);
          setIsDrawerOpen(false);
        }}
        hideHeader={true}
        title={activeApplicant ? activeApplicant.name : 'Candidate Dossier'}
        className="w-[960px] max-w-[96vw] sm:max-w-4xl lg:max-w-5xl"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {isEditingApplicant ? (
              <>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-lg border border-border">
                    {applicantFormData?.applicantId || activeApplicant?.applicantId}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Modifying Applicant Records
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4" />}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Check className="h-4 w-4" />}
                    onClick={handleSaveApplicant}
                  >
                    Save Changes
                  </VFButton>
                </div>
              </>
            ) : (
              <>
                {/* 1. Bottom Stepper */}
                <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-xl border border-border">
                  <button
                    onClick={handlePrevApplicant}
                    disabled={selectedApplicantIndex === 0}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Previous Candidate"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-mono font-bold px-3 text-foreground select-none">
                    {selectedApplicantIndex !== null ? selectedApplicantIndex + 1 : 1} of {applicantList.length}
                  </span>
                  <button
                    onClick={handleNextApplicant}
                    disabled={selectedApplicantIndex === applicantList.length - 1}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Next Candidate"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* 2. Action Buttons: Close on left, Action on right */}
                <div className="flex items-center gap-2.5">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4 text-muted-foreground" />}
                    onClick={() => {
                      setIsEditingApplicant(false);
                      setApplicantFormData(null);
                      setIsDrawerOpen(false);
                    }}
                  >
                    Close
                  </VFButton>
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit3 className="h-4 w-4" />}
                    onClick={handleStartEdit}
                  >
                    Edit Application
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<CheckCircle2 className="h-4 w-4" />}
                    onClick={handleApproveAdmit}
                  >
                    Approve & Issue Offer
                  </VFButton>
                </div>
              </>
            )}
          </div>
        }
      >
        {activeApplicant && (
          <div className="space-y-6 animate-fade-in pb-4">
            {/* 1. EDIT MODE */}
            {isEditingApplicant ? (
              <div className="space-y-6 animate-fade-in">
                {/* Header Banner */}
                <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative overflow-hidden rounded-xl border border-border shadow-xs w-16 h-[82px] bg-muted shrink-0"
                      style={{ aspectRatio: '19.5 / 25' }}
                    >
                      <img
                        src={applicantFormData?.avatarUrl || activeApplicant.avatarUrl}
                        alt={applicantFormData?.name || activeApplicant.name}
                        style={{ aspectRatio: '19.5 / 25' }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-muted text-foreground border border-border">
                          {applicantFormData?.applicantId || activeApplicant.applicantId}
                        </span>
                        <VFBadge variant="warning">Edit Mode Active</VFBadge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mt-1 tracking-tight">
                        Editing {applicantFormData?.name || activeApplicant.name}'s Application
                      </h3>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-semibold text-muted-foreground">
                    Target Session: {activeSession}
                  </div>
                </div>

                {/* Section 1: Candidate Identity */}
                <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>Candidate Identity & Applied Grade</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.name || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, name: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-bold text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Applied Grade / Class
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.appliedGrade || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, appliedGrade: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.dob || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, dob: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Application Stage
                      </label>
                      <select
                        value={applicantFormData?.stage || 'Submitted'}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, stage: e.target.value as any })}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['Submitted', 'Screened', 'Interview', 'Approved'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        OCR Doc Verification
                      </label>
                      <select
                        value={applicantFormData?.ocrDocStatus || 'Pending'}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, ocrDocStatus: e.target.value as any })}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['Verified', 'Pending', 'Flagged'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Photo URL (19.5 : 25 Aspect Ratio)
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.avatarUrl || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, avatarUrl: e.target.value })}
                        className="w-full h-11 px-4 text-xs font-mono text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Guardian & Contact */}
                <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Parent / Guardian & Contact Records</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Primary Guardian Name
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.guardianName || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, guardianName: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-bold text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.phone || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, phone: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-mono font-bold text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Guardian Email
                      </label>
                      <input
                        type="email"
                        value={applicantFormData?.email || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, email: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-mono text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.address || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, address: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-xl focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* 2. VIEW MODE */
              <div className="space-y-6 animate-fade-in">
                {/* Hero Card */}
                <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-md flex items-center gap-6 relative overflow-hidden flex-wrap sm:flex-nowrap">
                  <div className="relative shrink-0 mx-auto sm:mx-0">
                    <div
                      className="relative overflow-hidden rounded-2xl border border-border shadow-md w-28 h-[143.5px] bg-muted flex items-center justify-center"
                      style={{ aspectRatio: '19.5 / 25' }}
                    >
                      <img
                        src={activeApplicant.avatarUrl}
                        alt={activeApplicant.name}
                        style={{ aspectRatio: '19.5 / 25' }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className={cn(
                        'absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ring-2',
                        activeApplicant.stage === 'Approved' ? 'bg-emerald-500 ring-emerald-500/20' : 'bg-amber-500 ring-amber-500/20'
                      )}
                      title={activeApplicant.stage}
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3 text-center sm:text-left">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight truncate w-full sm:w-auto">
                        {activeApplicant.name}
                      </h3>
                      <VFBadge
                        variant={activeApplicant.stage === 'Approved' ? 'success' : activeApplicant.stage === 'Interview' ? 'warning' : 'outline'}
                        className="px-3 py-1 text-xs font-bold mx-auto sm:mx-0"
                      >
                        Stage: {activeApplicant.stage}
                      </VFBadge>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-mono flex-wrap justify-center sm:justify-start">
                      <span className="font-bold text-foreground bg-muted px-2.5 py-0.5 rounded-md border border-border">{activeApplicant.applicantId}</span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">Applied: {activeApplicant.appliedGrade}</span>
                      <span>•</span>
                      <span className="text-foreground font-medium">Prev: {activeApplicant.previousSchool}</span>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start pt-0.5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold bg-muted/60 text-foreground border border-border">
                        <Award className="h-3.5 w-3.5 text-muted-foreground" />
                        Prev Score: {activeApplicant.previousMarks}
                      </span>
                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-muted/60 text-muted-foreground border border-border">
                        Submitted: {activeApplicant.appliedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4 Enclosed KPI Stat Tiles */}
                <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/90 shadow-xs">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">AI Fit Score</span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">{activeApplicant.fitScore}%</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">High Academic Aptitude</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Doc Verification</span>
                      <span className="text-2xl font-black text-foreground mt-1 block">{activeApplicant.ocrDocStatus}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">OCR Document Checks</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Recommendation</span>
                      <span className="text-xl font-bold text-foreground mt-1 block">{activeApplicant.recommendation}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">Automated Screening</span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Conversion Probability</span>
                      <span className="text-2xl font-black text-emerald-400 mt-1 block">94.5%</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">Parent Confirmed Interest</span>
                    </div>
                  </div>
                </div>

                {/* Parent & Contact Records */}
                <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Parent & Guardian Records</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Primary Guardian</span>
                      <span className="text-base font-bold text-foreground block mt-1">{activeApplicant.guardianName} ({activeApplicant.guardianRelation})</span>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Date of Birth</span>
                      <span className="text-base font-bold text-foreground block mt-1">{activeApplicant.dob}</span>
                    </div>

                    <div className="sm:col-span-2 p-4 rounded-xl bg-muted/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Contact Number</span>
                        <span className="font-mono text-lg font-bold text-foreground mt-1 block">{activeApplicant.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(`https://wa.me/${activeApplicant.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                          className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>WhatsApp Parent</span>
                        </button>
                        <button
                          onClick={() => handleCopy(activeApplicant.phone, 'phone')}
                          className="px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 border border-border text-foreground text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          {copiedKey === 'phone' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                          <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Guardian Email</span>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className="font-mono text-sm font-semibold text-foreground truncate">{activeApplicant.email}</span>
                        <button
                          onClick={() => handleCopy(activeApplicant.email, 'email')}
                          className="text-xs text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                        >
                          {copiedKey === 'email' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Residential Address</span>
                      <span className="text-sm font-semibold text-foreground mt-1 block truncate">{activeApplicant.address}</span>
                    </div>
                  </div>
                </div>

                {/* Prior Academic Dossier & Document Check */}
                <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Prior Academic Records & Document Checklist</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Transfer Certificate</span>
                      <span className={cn('text-sm font-bold mt-1 block', activeApplicant.tcAvailable ? 'text-emerald-400' : 'text-rose-400')}>
                        {activeApplicant.tcAvailable ? '✓ Received & Verified' : '✕ Pending Submission'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Birth Certificate</span>
                      <span className={cn('text-sm font-bold mt-1 block', activeApplicant.birthCertVerified ? 'text-emerald-400' : 'text-amber-400')}>
                        {activeApplicant.birthCertVerified ? '✓ Verified (OCR Match)' : '⚠ Under Verification'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/60">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Medical Fitness</span>
                      <span className={cn('text-sm font-bold mt-1 block', activeApplicant.medicalClearance ? 'text-emerald-400' : 'text-muted-foreground')}>
                        {activeApplicant.medicalClearance ? '✓ Cleared' : 'Pending Certificate'}
                      </span>
                    </div>
                  </div>

                  {activeApplicant.notes && (
                    <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-xs text-muted-foreground">
                      <span className="font-bold text-foreground block mb-1">Admissions Officer Remarks:</span>
                      {activeApplicant.notes}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </VFDrawer>
    </VFPageContainer>
  );
}

