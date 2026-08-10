import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFInput,
  VFSelect,
  VFDatePicker,
  VFTabs,
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
  ArrowLeft,
  Upload,
  Check,
  Maximize2,
  Minimize2,
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
  {
    id: '1',
    applicantId: 'ADM-2026-001',
    name: 'Aarav Sharma',
    appliedGrade: 'Class 9',
    previousSchool: 'Delhi Public School',
    guardianName: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    aiFitScore: 96,
    ocrDocStatus: 'Verified',
    aiRecommendation: 'Instant Admit',
    stage: 'AI Screened',
    appliedDate: '2026-08-08',
  },
  {
    id: '2',
    applicantId: 'ADM-2026-002',
    name: 'Ananya Verma',
    appliedGrade: 'Class 11-Sci',
    previousSchool: 'St. Xavier High School',
    guardianName: 'Sunita Verma',
    phone: '+91 98123 45678',
    aiFitScore: 89,
    ocrDocStatus: 'Verified',
    aiRecommendation: 'Schedule Interview',
    stage: 'Interview',
    appliedDate: '2026-08-09',
  },
  {
    id: '3',
    applicantId: 'ADM-2026-003',
    name: 'Rohan Gupta',
    appliedGrade: 'Class 6',
    previousSchool: 'Modern School',
    guardianName: 'Vikram Gupta',
    phone: '+91 97654 32109',
    aiFitScore: 64,
    ocrDocStatus: 'Flagged',
    aiRecommendation: 'Needs Review',
    stage: 'Submitted',
    appliedDate: '2026-08-09',
  },
  {
    id: '4',
    applicantId: 'ADM-2026-004',
    name: 'Kavya Nair',
    appliedGrade: 'Class 11-Com',
    previousSchool: 'Kendriya Vidyalaya',
    guardianName: 'Suresh Nair',
    phone: '+91 99887 76655',
    aiFitScore: 94,
    ocrDocStatus: 'Verified',
    aiRecommendation: 'Instant Admit',
    stage: 'Approved',
    appliedDate: '2026-08-07',
  },
  {
    id: '5',
    applicantId: 'ADM-2026-005',
    name: 'Ishaan Deshmukh',
    appliedGrade: 'Class 1',
    previousSchool: 'Little Angels Nursery',
    guardianName: 'Meera Deshmukh',
    phone: '+91 91234 56789',
    aiFitScore: 82,
    ocrDocStatus: 'Pending',
    aiRecommendation: 'Schedule Interview',
    stage: 'Submitted',
    appliedDate: '2026-08-10',
  },
];

function AdmissionsPage() {
  const [applicants, setApplicants] = React.useState<Applicant[]>(INITIAL_APPLICANTS);
  const [selectedApplicant, setSelectedApplicant] = React.useState<Applicant | null>(null);
  const [isFullScreenFormOpen, setIsFullScreenFormOpen] = React.useState(false);
  const [filterStage, setFilterStage] = React.useState<string>('All');
  const [notice, setNotice] = React.useState<string | null>(null);

  // Resizable drawer state for Inspection
  const [inspectionWidth, setInspectionWidth] = React.useState(520);
  const [isDragging, setIsDragging] = React.useState(false);

  // Resizer move effect
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const maxAllowed = window.innerWidth * 0.5; // Max 50vw
      const minAllowed = 400;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= minAllowed && newWidth <= maxAllowed) {
        setInspectionWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = 'auto';
    };

    if (isDragging) {
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // New Full Screen Form State
  const [newForm, setNewForm] = React.useState({
    name: '',
    dob: '2012-05-14',
    gender: 'Male',
    bloodGroup: 'O+',
    nationality: 'Indian',
    primaryLang: 'English',
    govtId: '',
    appliedGrade: 'Class 9',
    academicSession: '2026-2027',
    previousSchool: '',
    prevMarks: '92%',
    tcNumber: '',
    secondLang: 'Hindi',
    fatherName: '',
    motherName: '',
    guardianName: '',
    relation: 'Father',
    phone: '',
    email: '',
    address: '123 Park Avenue, New Delhi',
    transportRoute: 'No Transport',
    hostelRequired: 'Day Scholar',
    medicalNotes: 'None',
    emergencyContact: '',
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name || !newForm.guardianName) return;

    const calculatedScore = Math.floor(Math.random() * 25) + 75;
    const newApplicant: Applicant = {
      id: String(Date.now()),
      applicantId: `ADM-2026-0${applicants.length + 1}`,
      name: newForm.name,
      appliedGrade: newForm.appliedGrade,
      previousSchool: newForm.previousSchool || 'Greenwood International',
      guardianName: newForm.guardianName,
      phone: newForm.phone || '+91 99001 12233',
      aiFitScore: calculatedScore,
      ocrDocStatus: 'Verified',
      aiRecommendation: calculatedScore > 90 ? 'Instant Admit' : 'Schedule Interview',
      stage: 'AI Screened',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setApplicants([newApplicant, ...applicants]);
    setIsFullScreenFormOpen(false);
    setNotice(`Application submitted for "${newApplicant.name}". AI Fit Score evaluated at ${newApplicant.aiFitScore}%.`);
  };

  const filteredApplicants = filterStage === 'All'
    ? applicants
    : applicants.filter((a) => a.stage === filterStage || a.aiRecommendation === filterStage);

  const columns = [
    {
      header: 'Applicant ID',
      accessorKey: 'applicantId',
      cell: (row: Applicant) => (
        <span className="font-mono text-xs text-primary font-bold">{row.applicantId}</span>
      ),
    },
    {
      header: 'Student Name & Details',
      accessorKey: 'name',
      cell: (row: Applicant) => (
        <div>
          <p className="font-bold text-foreground text-xs">{row.name}</p>
          <p className="text-[11px] text-muted-foreground">{row.previousSchool} • Guard: {row.guardianName}</p>
        </div>
      ),
    },
    {
      header: 'Grade',
      accessorKey: 'appliedGrade',
      cell: (row: Applicant) => (
        <span className="text-xs px-2.5 py-0.5 bg-muted rounded border border-border font-medium">
          {row.appliedGrade}
        </span>
      ),
    },
    {
      header: 'AI Fit Score',
      accessorKey: 'aiFitScore',
      cell: (row: Applicant) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-muted rounded-md overflow-hidden border border-border">
            <div
              className={`h-full rounded-md ${
                row.aiFitScore >= 90
                  ? 'bg-success'
                  : row.aiFitScore >= 75
                  ? 'bg-primary'
                  : 'bg-warning'
              }`}
              style={{ width: `${row.aiFitScore}%` }}
            />
          </div>
          <span className="text-xs font-bold text-foreground">{row.aiFitScore}%</span>
        </div>
      ),
    },
    {
      header: 'OCR Docs Audit',
      accessorKey: 'ocrDocStatus',
      cell: (row: Applicant) => (
        <span
          className={`text-[11px] px-2.5 py-0.5 rounded font-medium inline-flex items-center gap-1 ${
            row.ocrDocStatus === 'Verified'
              ? 'bg-success/15 text-success border border-success/30'
              : row.ocrDocStatus === 'Pending'
              ? 'bg-warning/15 text-warning border border-warning/30'
              : 'bg-destructive/15 text-destructive border border-destructive/30'
          }`}
        >
          {row.ocrDocStatus === 'Verified' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          {row.ocrDocStatus}
        </span>
      ),
    },
    {
      header: 'AI Verdict',
      accessorKey: 'aiRecommendation',
      cell: (row: Applicant) => (
        <span
          className={`text-[11px] px-2.5 py-0.5 rounded font-semibold inline-flex items-center gap-1 ${
            row.aiRecommendation === 'Instant Admit'
              ? 'bg-primary/15 text-primary border border-primary/30'
              : row.aiRecommendation === 'Schedule Interview'
              ? 'bg-info/15 text-info border border-info/30'
              : 'bg-muted text-muted-foreground border border-border'
          }`}
        >
          <Sparkles className="h-3 w-3" />
          {row.aiRecommendation}
        </span>
      ),
    },
    {
      header: 'Action',
      accessorKey: 'id',
      cell: (row: Applicant) => (
        <button
          onClick={() => setSelectedApplicant(row)}
          className="text-[11px] bg-muted hover:bg-primary/20 text-foreground hover:text-primary px-3 py-1 rounded-lg border border-border hover:border-primary/40 transition-all flex items-center gap-1 font-medium"
        >
          <Eye className="h-3.5 w-3.5" /> Inspect Report
        </button>
      ),
    },
  ];

  // Full Screen Admission View
  if (isFullScreenFormOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto flex flex-col animate-fade-in custom-scrollbar">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullScreenFormOpen(false)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Admissions Queue
            </button>
            <span className="text-border">|</span>
            <span className="text-sm font-bold text-foreground">New Student Admission Application</span>
          </div>

          <div className="flex items-center gap-2">
            <VFButton variant="outline" size="sm" onClick={() => setIsFullScreenFormOpen(false)}>
              Cancel
            </VFButton>
            <VFButton size="sm" onClick={handleCreateApplication} leftIcon={<Check className="h-3.5 w-3.5" />}>
              Submit & Screen Application
            </VFButton>
          </div>
        </header>

        <div className="flex-1 w-full max-w-full px-8 py-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="border-b border-border pb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Student Admission Registration</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Complete the applicant details below. All transcripts and documents will be automatically processed by OCR engines.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Academic Session: 2026-2027
              </span>
            </div>
          </div>

          <form onSubmit={handleCreateApplication} className="space-y-6 text-xs">
            {/* Section 1: Personal Details */}
            <div className="bg-card border border-border/80 p-5 rounded-xl space-y-4">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/60 pb-2.5">
                <UserSquare className="h-4 w-4 text-primary" /> 1. Student Personal Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <VFInput
                  label="Student Full Name"
                  required
                  placeholder="e.g. Aditya Verma"
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                />
                <VFDatePicker
                  label="Date of Birth"
                  placeholder="Select birth date"
                  value={newForm.dob}
                  onChange={(e) => setNewForm({ ...newForm, dob: e.target.value })}
                />
                <VFSelect
                  label="Gender"
                  value={newForm.gender}
                  onChange={(e) => setNewForm({ ...newForm, gender: String(e.target.value) })}
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                  ]}
                />
                <VFSelect
                  label="Blood Group"
                  value={newForm.bloodGroup}
                  onChange={(e) => setNewForm({ ...newForm, bloodGroup: String(e.target.value) })}
                  options={[
                    { label: 'O +ve', value: 'O+' },
                    { label: 'O -ve', value: 'O-' },
                    { label: 'A +ve', value: 'A+' },
                    { label: 'A -ve', value: 'A-' },
                    { label: 'B +ve', value: 'B+' },
                    { label: 'B -ve', value: 'B-' },
                    { label: 'AB +ve', value: 'AB+' },
                    { label: 'AB -ve', value: 'AB-' },
                  ]}
                />
                <VFInput
                  label="Nationality"
                  placeholder="e.g. Indian"
                  value={newForm.nationality}
                  onChange={(e) => setNewForm({ ...newForm, nationality: e.target.value })}
                />
                <VFInput
                  label="Primary Language"
                  placeholder="e.g. English"
                  value={newForm.primaryLang}
                  onChange={(e) => setNewForm({ ...newForm, primaryLang: e.target.value })}
                />
                <VFInput
                  label="Aadhar / Govt ID Number"
                  placeholder="12-digit Aadhar or Govt ID"
                  value={newForm.govtId}
                  onChange={(e) => setNewForm({ ...newForm, govtId: e.target.value })}
                />
              </div>
            </div>

            {/* Section 2: Academic Details */}
            <div className="bg-card border border-border/80 p-5 rounded-xl space-y-4">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/60 pb-2.5">
                <FileCheck className="h-4 w-4 text-primary" /> 2. Academic Intake & Schooling Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <VFSelect
                  label="Grade Seeking Admission"
                  required
                  value={newForm.appliedGrade}
                  onChange={(e) => setNewForm({ ...newForm, appliedGrade: String(e.target.value) })}
                  options={[
                    { label: 'Class 1', value: 'Class 1' },
                    { label: 'Class 6', value: 'Class 6' },
                    { label: 'Class 9', value: 'Class 9' },
                    { label: 'Class 11-Sci', value: 'Class 11-Sci' },
                    { label: 'Class 11-Com', value: 'Class 11-Com' },
                  ]}
                />
                <VFSelect
                  label="Academic Session"
                  value={newForm.academicSession}
                  onChange={(e) => setNewForm({ ...newForm, academicSession: String(e.target.value) })}
                  options={[
                    { label: '2026 - 2027', value: '2026-2027' },
                    { label: '2027 - 2028', value: '2027-2028' },
                  ]}
                />
                <VFInput
                  label="Previous School Attended"
                  placeholder="e.g. St. Marks High School"
                  value={newForm.previousSchool}
                  onChange={(e) => setNewForm({ ...newForm, previousSchool: e.target.value })}
                />
                <VFInput
                  label="Previous Score / Grade %"
                  placeholder="e.g. 94%"
                  value={newForm.prevMarks}
                  onChange={(e) => setNewForm({ ...newForm, prevMarks: e.target.value })}
                />
                <VFInput
                  label="Transfer Certificate (TC) No."
                  placeholder="e.g. TC-88219"
                  value={newForm.tcNumber}
                  onChange={(e) => setNewForm({ ...newForm, tcNumber: e.target.value })}
                />
                <VFSelect
                  label="Second Language Preference"
                  value={newForm.secondLang}
                  onChange={(e) => setNewForm({ ...newForm, secondLang: String(e.target.value) })}
                  options={[
                    { label: 'Hindi', value: 'Hindi' },
                    { label: 'Sanskrit', value: 'Sanskrit' },
                    { label: 'French', value: 'French' },
                    { label: 'German', value: 'German' },
                    { label: 'Spanish', value: 'Spanish' },
                  ]}
                />
              </div>
            </div>

            {/* Section 3: Parent & Guardian Contacts */}
            <div className="bg-card border border-border/80 p-5 rounded-xl space-y-4">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/60 pb-2.5">
                <BrainCircuit className="h-4 w-4 text-primary" /> 3. Parent, Guardian & Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <VFInput
                  label="Father's Full Name"
                  placeholder="e.g. Rajesh Verma"
                  value={newForm.fatherName}
                  onChange={(e) => setNewForm({ ...newForm, fatherName: e.target.value })}
                />
                <VFInput
                  label="Mother's Full Name"
                  placeholder="e.g. Sunita Verma"
                  value={newForm.motherName}
                  onChange={(e) => setNewForm({ ...newForm, motherName: e.target.value })}
                />
                <VFInput
                  label="Primary Guardian Name"
                  required
                  placeholder="e.g. Ramesh Verma"
                  value={newForm.guardianName}
                  onChange={(e) => setNewForm({ ...newForm, guardianName: e.target.value })}
                />
                <VFInput
                  label="Contact Phone Number"
                  placeholder="+91 98000 00000"
                  value={newForm.phone}
                  onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                />
                <VFInput
                  label="Email Address"
                  type="email"
                  placeholder="guardian@email.com"
                  value={newForm.email}
                  onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                />
                <div className="sm:col-span-2 lg:col-span-3">
                  <VFInput
                    label="Residential Address"
                    placeholder="123 Park Avenue, Block B, New Delhi"
                    value={newForm.address}
                    onChange={(e) => setNewForm({ ...newForm, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Facilities & Transportation */}
            <div className="bg-card border border-border/80 p-5 rounded-xl space-y-4">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border/60 pb-2.5">
                <Upload className="h-4 w-4 text-primary" /> 4. Facilities, Transport & Medical Notes
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <VFSelect
                  label="School Bus / Transport Route"
                  value={newForm.transportRoute}
                  onChange={(e) => setNewForm({ ...newForm, transportRoute: String(e.target.value) })}
                  options={[
                    { label: 'No Transport (Self / Private)', value: 'No Transport' },
                    { label: 'Route 1 - City Center / Metro', value: 'Route 1' },
                    { label: 'Route 2 - North Suburbs', value: 'Route 2' },
                    { label: 'Route 3 - South Campus Express', value: 'Route 3' },
                    { label: 'Route 4 - East District Line', value: 'Route 4' },
                  ]}
                />
                <VFSelect
                  label="Hostel Accommodation"
                  value={newForm.hostelRequired}
                  onChange={(e) => setNewForm({ ...newForm, hostelRequired: String(e.target.value) })}
                  options={[
                    { label: 'Day Scholar', value: 'Day Scholar' },
                    { label: 'Full Boarder (Hostel)', value: 'Full Boarder' },
                    { label: 'Weekly Boarder', value: 'Weekly Boarder' },
                  ]}
                />
                <VFInput
                  label="Medical Conditions / Allergies"
                  placeholder="e.g. None or Asthma"
                  value={newForm.medicalNotes}
                  onChange={(e) => setNewForm({ ...newForm, medicalNotes: e.target.value })}
                />
                <VFInput
                  label="Emergency Contact Person"
                  placeholder="e.g. Uncle / +91 91100 22334"
                  value={newForm.emergencyContact}
                  onChange={(e) => setNewForm({ ...newForm, emergencyContact: e.target.value })}
                />
              </div>
            </div>

            {/* Section 5: Documents Upload */}
            <div className="bg-card border border-border/80 p-5 rounded-xl space-y-3">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Upload className="h-4 w-4 text-primary" /> 5. Attach Documents for Automated OCR Verification
              </h2>
              <div className="border-2 border-dashed border-border/80 p-6 rounded-xl text-center space-y-2 hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
                <Upload className="h-8 w-8 text-primary/60 mx-auto" />
                <p className="text-xs font-semibold text-foreground">Drop Transfer Certificates, Marksheets or ID proof here</p>
                <p className="text-[11px] text-muted-foreground">Automated OCR engines will extract and verify grade percentages instantly.</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <VFButton variant="outline" type="button" onClick={() => setIsFullScreenFormOpen(false)}>
                Cancel
              </VFButton>
              <VFButton type="submit">Submit Application</VFButton>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <VFPageContainer className="p-6 max-w-full space-y-6">
      {notice && (
        <div className="p-3 bg-primary/10 border border-primary/25 rounded-xl text-xs text-foreground flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{notice}</span>
          </div>
          <button onClick={() => setNotice(null)} className="text-muted-foreground hover:text-foreground text-xs font-semibold">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">02 — Admissions & Enrollment</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Streamlined applicant screening, parent enquiries, entrance tests, and OCR document verification.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={() => setIsFullScreenFormOpen(true)}>
          New Admission Application
        </VFButton>
      </div>

      {/* Admissions Submodule Tab Bar */}
      <VFTabs 
        items={[
          { id: 'applications', label: 'Applications Queue', icon: <UserSquare className="h-3.5 w-3.5" />, content: null },
          { id: 'enquiries', label: 'Parent Enquiries & Leads', icon: <BrainCircuit className="h-3.5 w-3.5" />, content: null },
          { id: 'ocr-verify', label: 'OCR Document Verification', icon: <FileCheck className="h-3.5 w-3.5" />, content: null },
          { id: 'merit-list', label: 'Entrance Tests & Merit List', icon: <Sparkles className="h-3.5 w-3.5" />, content: null },
          { id: 'scholar-no', label: 'Scholar No. & Allocator', icon: <Plus className="h-3.5 w-3.5" />, content: null },
        ]}
        defaultTabId="applications"
        variant="underline"
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <VFStatCard
          title="Total Intake Applications"
          value={String(applicants.length + 42)}
          icon={<UserSquare />}
          trend="up"
          trendLabel="+18 this week"
        />
        <VFStatCard
          title="Auto-Screened Rate"
          value="88.4%"
          icon={<BrainCircuit />}
          description="0.4s avg processing time"
        />
        <VFStatCard
          title="Document Verification Rate"
          value="96.2%"
          icon={<FileCheck />}
          trend="up"
          trendLabel="Marksheets & IDs verified"
        />
        <VFStatCard
          title="Average Match Index"
          value="86 / 100"
          icon={<Sparkles />}
          description="High academic fit pool"
        />
      </div>

      {/* Pipeline Stage Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-3 overflow-x-auto custom-scrollbar">
        {['All', 'Instant Admit', 'AI Screened', 'Interview', 'Approved'].map((stage) => (
          <button
            key={stage}
            onClick={() => setFilterStage(stage)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              filterStage === stage
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
            }`}
          >
            {stage}
          </button>
        ))}
      </div>

      {/* 100% Full-Width Applications Queue Table */}
      <VFSection title="Applications Queue">
        <VFDataTable
          columns={columns}
          data={filteredApplicants}
          filterPlaceholder="Filter candidate name, grade, or recommendation..."
        />
      </VFSection>

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
                  <span className="text-[10px] font-mono text-primary font-bold uppercase">{selectedApplicant.applicantId}</span>
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
