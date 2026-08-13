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
  FileText,
  FileCheck,
  Award,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Download,
  ShieldCheck,
  BarChart3,
  History,
  Archive,
} from 'lucide-react';

export const Route = createFileRoute('/documents')({
  component: DocumentsPage,
});

function DocumentsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const docData = [
    { code: 'DOC-2026-TC01', title: 'Transfer Certificate (TC)', student: 'Rohan Gupta (ADM-003)', type: 'Transfer Certificate', issuedDate: '10 Aug 2026', status: 'Issued' },
    { code: 'DOC-2026-BF02', title: 'Bonafide Student Certificate', student: 'Aditya Verma (ADM-001)', type: 'Bonafide', issuedDate: '12 Aug 2026', status: 'Issued' },
    { code: 'DOC-2026-CC03', title: 'Character & Conduct Certificate', student: 'Priya Sharma (ADM-002)', type: 'Character', issuedDate: '08 Aug 2026', status: 'Issued' },
  ];

  const docColumns = [
    { header: 'Document Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Certificate Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Student Name', accessorKey: 'student' },
    { header: 'Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="outline">{r.type}</VFBadge> },
    { header: 'Issued Date', accessorKey: 'issuedDate' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Documents Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Issued Certificates" value="384 Documents" icon={<FileCheck className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="100% Digitally Signed" />
        <VFStatCard title="Pending Requests" value="6 Requests" icon={<FileText className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="Requires Verification" />
        <VFStatCard title="TC Certificates Issued" value="14 Issued" icon={<Award className="h-5 w-5 text-primary" />} description="Session 2026-27" />
        <VFStatCard title="Digital Verification QR" value="100% Active" icon={<ShieldCheck className="h-5 w-5 text-purple-500" />} description="Anti-Fraud Portal Live" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Student Documents
  // ----------------------------------------------------
  const studentDocumentsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Student Master Document Vault</h3>
          <p className="text-xs text-muted-foreground">Aadhaar cards, birth certificates, previous marksheets, and medical records.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Upload Student Doc</VFButton>
      </div>
      <VFDataTable columns={docColumns} data={docData} filterPlaceholder="Search student or certificate..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Staff Documents
  // ----------------------------------------------------
  const staffDocumentsContent = (
    <div className="space-y-4">
      <VFCard title="Faculty & Staff Qualification Document Vault">
        <p className="text-xs text-muted-foreground mb-3">Degree certificates, B.Ed. credentials, police verification, and experience letters.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Document Requests
  // ----------------------------------------------------
  const requestsContent = (
    <div className="space-y-4">
      <VFCard title="Parent & Student Certificate Request Inbox">
        <p className="text-xs text-muted-foreground mb-3">Process parent app applications for Bonafide, Fee, and Character certificates.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Document Templates
  // ----------------------------------------------------
  const documentTemplatesContent = (
    <div className="space-y-4">
      <VFCard title="Official Institutional Letterhead & Document Templates">
        <p className="text-xs text-muted-foreground mb-3">Design custom school letterheads, recommendation letters, and official notices.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Certificate Templates
  // ----------------------------------------------------
  const certificateTemplatesContent = (
    <div className="space-y-4">
      <VFCard title="Border & Layout Certificate Template Studio">
        <p className="text-xs text-muted-foreground mb-3">Design certificate borders, watermark crests, and principal signature fields.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Bonafide Certificate
  // ----------------------------------------------------
  const bonafideContent = (
    <div className="space-y-4">
      <VFCard title="Bonafide Student Certificate Generator">
        <p className="text-xs text-muted-foreground mb-3">Issue official bonafide certificates for bus passes, passport applications, and bank accounts.</p>
        <VFButton size="sm" leftIcon={<Download className="h-3.5 w-3.5" />}>Generate Bonafide PDF</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Transfer Certificate
  // ----------------------------------------------------
  const transferContent = (
    <div className="space-y-4">
      <VFCard title="Official Transfer Certificate (TC) Module">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Counter-signed TC generator with Education Department serial numbers and dues verification.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Character Certificate
  // ----------------------------------------------------
  const characterContent = (
    <div className="space-y-4">
      <VFCard title="Character & Conduct Certificate Generator">
        <p className="text-xs text-muted-foreground mb-3">Issue conduct certificates reflecting discipline history and extracurricular participation.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Study Certificate
  // ----------------------------------------------------
  const studyContent = (
    <div className="space-y-4">
      <VFCard title="Continuous Study & Attendance Certificate Generator">
        <p className="text-xs text-muted-foreground mb-3">Issue multi-year study certificates for government reservation quotas.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Fee Certificate
  // ----------------------------------------------------
  const feeCertificateContent = (
    <div className="space-y-4">
      <VFCard title="Tuition Fee Paid Certificate (Income Tax Sec 80C)">
        <p className="text-xs text-muted-foreground mb-3">Generate annual fee paid certificates for parent income tax exemption claims.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Other Certificates
  // ----------------------------------------------------
  const otherCertificatesContent = (
    <div className="space-y-4">
      <VFCard title="Sports, Merit & Co-Curricular Event Certificates">
        <p className="text-xs text-muted-foreground mb-3">Issue annual sports day, science fair, and inter-school competition certificates.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Document Generation
  // ----------------------------------------------------
  const generationContent = (
    <div className="space-y-4">
      <VFCard title="Bulk Batch Certificate Generation Engine">
        <p className="text-xs text-muted-foreground mb-3">Generate class-wide graduation certificates or ID cards in a single batch.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Digital Signature
  // ----------------------------------------------------
  const digitalSignatureContent = (
    <div className="space-y-4">
      <VFCard title="Principal Cryptographic Digital Signature & e-Sign Studio">
        <p className="text-xs text-muted-foreground mb-3 font-mono font-bold">Apply secure PKI digital signatures to generated PDF certificates.</p>
        <VFBadge variant="success">Digital Signature Certificate Active</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Document Verification
  // ----------------------------------------------------
  const verificationContent = (
    <div className="space-y-4">
      <VFCard title="Public QR Code Certificate Anti-Fraud Verification Portal">
        <p className="text-xs text-muted-foreground mb-3">External verification portal allowing third parties to scan QR code and verify authenticity.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Issue History
  // ----------------------------------------------------
  const issueHistoryContent = (
    <div className="space-y-4">
      <VFCard title="Complete Issued Certificate Audit Log & Registry">
        <p className="text-xs text-muted-foreground mb-3">Chronological history of every certificate issued by the institution.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — Document Archive
  // ----------------------------------------------------
  const archiveContent = (
    <div className="space-y-4">
      <VFCard title="Long-Term Institutional Document Archive & Cloud Backup">
        <p className="text-xs text-muted-foreground mb-3">Encrypted long-term storage of alumnus records and archived certificates.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 18 — Document Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Document System Parameters & Security Rules">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Certificate Serial Prefix" defaultValue="VIDYA-2026-" />
          <VFSelect label="Watermark Security Level" options={[{ label: 'High (QR + Hologram Overlay)', value: 'high' }, { label: 'Standard QR', value: 'std' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 18 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Documents Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'student-documents', label: 'Student Documents', icon: <FileText className="h-3.5 w-3.5" />, content: studentDocumentsContent },
    { id: 'staff-documents', label: 'Staff Documents', icon: <Users className="h-3.5 w-3.5" />, content: staffDocumentsContent },
    { id: 'requests', label: 'Document Requests', icon: <FileText className="h-3.5 w-3.5" />, content: requestsContent },
    { id: 'document-templates', label: 'Document Templates', icon: <FileText className="h-3.5 w-3.5" />, content: documentTemplatesContent },
    { id: 'certificate-templates', label: 'Certificate Templates', icon: <Award className="h-3.5 w-3.5" />, content: certificateTemplatesContent },
    { id: 'bonafide', label: 'Bonafide Certificate', icon: <Award className="h-3.5 w-3.5" />, content: bonafideContent },
    { id: 'transfer', label: 'Transfer Certificate', icon: <Award className="h-3.5 w-3.5" />, content: transferContent },
    { id: 'character', label: 'Character Certificate', icon: <Award className="h-3.5 w-3.5" />, content: characterContent },
    { id: 'study', label: 'Study Certificate', icon: <Award className="h-3.5 w-3.5" />, content: studyContent },
    { id: 'fee-certificate', label: 'Fee Certificate', icon: <Award className="h-3.5 w-3.5" />, content: feeCertificateContent },
    { id: 'other-certificates', label: 'Other Certificates', icon: <Award className="h-3.5 w-3.5" />, content: otherCertificatesContent },
    { id: 'generation', label: 'Document Generation', icon: <FileCheck className="h-3.5 w-3.5" />, content: generationContent },
    { id: 'digital-signature', label: 'Digital Signature', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: digitalSignatureContent },
    { id: 'verification', label: 'Document Verification', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: verificationContent },
    { id: 'issue-history', label: 'Issue History', icon: <History className="h-3.5 w-3.5" />, content: issueHistoryContent },
    { id: 'archive', label: 'Document Archive', icon: <Archive className="h-3.5 w-3.5" />, content: archiveContent },
    { id: 'settings', label: 'Document Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
