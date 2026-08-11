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
  Files,
  FileText,
  Award,
  Sparkles,
  Plus,
  QrCode,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';

export const Route = createFileRoute('/documents')({
  component: DocumentsPage,
});

interface DocumentVaultRecord {
  id: string;
  docNo: string;
  owner: string;
  docType: string;
  category: string;
  uploadedDate: string;
  status: 'Verified' | 'Pending Verification' | 'Rejected' | 'Expired';
}

interface CertificateRequestRecord {
  id: string;
  reqNo: string;
  studentName: string;
  certType: string;
  requestDate: string;
  reason: string;
  status: 'Approved' | 'Pending Review' | 'Issued';
}

function DocumentsPage() {
  const documentsModule = MODULE_REGISTRY.find((m) => m.id === 'documents');

  const vaultData: DocumentVaultRecord[] = [
    { id: '1', docNo: 'DOC-STU-2026-001421', owner: 'Rahul Sharma', docType: 'Birth Certificate', category: 'Admission', uploadedDate: '10 Aug 2026', status: 'Verified' },
    { id: '2', docNo: 'DOC-STU-2026-001422', owner: 'Priya Patel', docType: 'Previous Marksheet', category: 'Academic', uploadedDate: '11 Aug 2026', status: 'Pending Verification' },
    { id: '3', docNo: 'DOC-EMP-2026-000821', owner: 'Dr. Suresh Verma', docType: 'B.Ed Degree Certificate', category: 'Employee', uploadedDate: '01 Jul 2026', status: 'Verified' },
    { id: '4', docNo: 'DOC-STU-2026-001423', owner: 'Aman Singh', docType: 'Address Proof (Aadhaar)', category: 'Identity', uploadedDate: '09 Aug 2026', status: 'Rejected' },
  ];

  const requestsData: CertificateRequestRecord[] = [
    { id: '1', reqNo: 'REQ-BON-2026-088', studentName: 'Rahul Sharma', certType: 'Bonafide Certificate', requestDate: '11 Aug 2026', reason: 'Passport Application', status: 'Pending Review' },
    { id: '2', reqNo: 'REQ-TC-2026-042', studentName: 'Neha Sharma', certType: 'Transfer Certificate (TC)', requestDate: '10 Aug 2026', reason: 'School Transfer', status: 'Approved' },
    { id: '3', reqNo: 'REQ-CHAR-2026-012', studentName: 'Rohit Kumar', certType: 'Character Conduct Certificate', requestDate: '09 Aug 2026', reason: 'Sports Event Entry', status: 'Issued' },
  ];

  // 16.1 Document Dashboard Submodule Content (ONLY Dashboard has top KPI Stat Cards!)
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Documents & Certificates Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 12,840 stored documents, 2,420 issued certificates, digital signatures, and public QR verifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Documents AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Upload Document</VFButton>
        </div>
      </div>

      {/* Feature 1 — Document KPI Cards (Dashboard Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Stored Documents" value="12,840" icon={<Files className="h-5 w-5 text-primary" />} trend="up" trendLabel="11,840 Verified" />
        <VFStatCard title="Total Issued Certificates" value="2,420" icon={<Award className="h-5 w-5 text-secondary" />} trend="up" trendLabel="420 Issued This Month" />
        <VFStatCard title="Pending Requests" value="84" icon={<FileText className="h-5 w-5 text-warning" />} description="12 TC · 42 Bonafide" />
        <VFStatCard title="Missing Student Docs" value="42" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} description="600 Missing Files Resolved" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pending Actions & Certificate Requests */}
        <VFSection title="Pending Certificate Requests & Approvals Queue" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Pending Verification</p>
              <p className="text-base font-bold text-warning mt-0.5">12 Documents</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Pending Signatures</p>
              <p className="text-base font-bold text-primary mt-0.5">3 Approvals</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Verification Requests</p>
              <p className="text-base font-bold text-secondary mt-0.5">6 External</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Expiring Docs</p>
              <p className="text-base font-bold text-destructive mt-0.5">18 Files</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Request No', accessorKey: 'reqNo', cell: (r: CertificateRequestRecord) => <span className="font-mono font-bold text-primary">{r.reqNo}</span> },
              { header: 'Student Name', accessorKey: 'studentName', cell: (r: CertificateRequestRecord) => <span className="font-bold text-foreground">{r.studentName}</span> },
              { header: 'Certificate Type', accessorKey: 'certType' },
              { header: 'Request Date', accessorKey: 'requestDate' },
              { header: 'Purpose / Reason', accessorKey: 'reason' },
              {
                header: 'Status',
                accessorKey: 'status',
                cell: (r: CertificateRequestRecord) => (
                  <VFBadge variant={r.status === 'Issued' ? 'success' : r.status === 'Approved' ? 'primary' : 'warning'}>
                    {r.status}
                  </VFBadge>
                ),
              },
            ]}
            data={requestsData}
            filterPlaceholder="Search student name or request number..."
          />
        </VFSection>

        {/* Recently Issued & Public QR Verification */}
        <VFCard title="Recently Issued & Public QR Verification">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-success/10 border border-success/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">✓ Bonafide — Aman Patel</span>
                <VFBadge variant="success">Issued</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">BON/2026/00421 · Signed by Principal · Valid</p>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">✓ Transfer Certificate — Neha Sharma</span>
                <VFBadge variant="primary">Issued</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">TC/2026/00092 · Counter-signed · Digital Vaulted</p>
            </div>
            <div className="p-2.5 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-foreground">Public QR Verification Portal</p>
                  <p className="text-muted-foreground text-xs">Cryptographic authenticity verification active</p>
                </div>
              </div>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 16.2 Dedicated Document Vault Submodule Content (NO REPEATING TOP STAT CARDS!)
  const vaultContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Central Institutional Document Vault</h3>
          <p className="text-xs text-muted-foreground">Encrypted document repository, version control stacks, and OCR text extraction search.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Upload Document</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Document ID', accessorKey: 'docNo', cell: (r: DocumentVaultRecord) => <span className="font-mono font-bold text-primary">{r.docNo}</span> },
          { header: 'Owner Name', accessorKey: 'owner', cell: (r: DocumentVaultRecord) => <span className="font-bold text-foreground">{r.owner}</span> },
          { header: 'Document Type', accessorKey: 'docType' },
          { header: 'Category', accessorKey: 'category' },
          { header: 'Uploaded Date', accessorKey: 'uploadedDate' },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r: DocumentVaultRecord) => (
              <VFBadge variant={r.status === 'Verified' ? 'success' : r.status === 'Rejected' ? 'danger' : 'warning'}>
                {r.status}
              </VFBadge>
            ),
          },
        ]}
        data={vaultData}
        filterPlaceholder="Search document number or owner..."
      />
    </div>
  );

  // 16.4 Specialized Certificate Template Live Preview Submodule Content (NO REPEATING TOP STAT CARDS!)
  const templatesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Dynamic Certificate Template Designer Studio</h3>
          <p className="text-xs text-muted-foreground">Configure Bonafide, Transfer Certificate (TC), Character, and Experience certificate templates with dynamic placeholders.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Template</VFButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-3">
          <VFCard title="Bonafide Study Certificate">
            <div className="space-y-2 text-xs mt-1">
              <p className="text-muted-foreground">Placeholders: &#123;&#123;student.name&#125;&#125;, &#123;&#123;class.name&#125;&#125;</p>
              <p className="font-bold text-success">Status: Published (v2)</p>
              <VFButton size="sm" variant="outline" className="w-full mt-2">Edit Template</VFButton>
            </div>
          </VFCard>
          <VFCard title="Transfer Certificate (TC)">
            <div className="space-y-2 text-xs mt-1">
              <p className="text-muted-foreground">Placeholders: &#123;&#123;tc.number&#125;&#125;, &#123;&#123;conduct&#125;&#125;</p>
              <p className="font-bold text-success">Status: Published (v3)</p>
              <VFButton size="sm" variant="outline" className="w-full mt-2">Edit Template</VFButton>
            </div>
          </VFCard>
        </div>

        {/* Dynamic Certificate Live Preview Card */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Live Certificate Preview (Bonafide)</h3>
            </div>
            <VFBadge variant="success">🔒 Authorized Signature Enforced</VFBadge>
          </div>

          {/* Certificate Border & Parchment Styling */}
          <div className="p-6 border-4 border-double border-primary/40 rounded-xl bg-muted/20 text-center space-y-4">
            <h2 className="text-base font-serif font-black tracking-widest text-primary uppercase">VidyaMaxx Academy of Excellence</h2>
            <p className="text-xs text-muted-foreground font-serif">Affiliated to Central Board of Secondary Education (CBSE)</p>
            <h3 className="text-sm font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4 uppercase tracking-wider py-1">Bonafide Student Certificate</h3>
            
            <p className="text-xs text-foreground/90 font-serif leading-relaxed max-w-lg mx-auto">
              This is to certify that <span className="font-bold text-primary">Rahul Sharma</span>, Son of <span className="font-bold">Mr. Rajesh Sharma</span>, is a bonafide student of Class <span className="font-bold">10-A</span> (Admission No: <span className="font-mono font-bold">ADM-2026-00421</span>) for the academic session 2026-2027.
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-border/60 text-xs">
              <div className="text-left font-mono">
                <p className="text-muted-foreground">Date: 11 August 2026</p>
                <p className="text-muted-foreground">Place: New Delhi</p>
              </div>
              <div className="p-1 bg-white rounded border border-border">
                <QrCode className="h-10 w-10 text-black" />
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground font-serif">Dr. Suresh Verma</p>
                <p className="text-[11px] text-primary font-bold">Principal Signature ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Submodule map — EVERY tab has its OWN clean dedicated view! No stat card repetition!
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    vault: vaultContent,
    verification: vaultContent,
    templates: templatesContent,
    generation: templatesContent,
    approvals: vaultContent,
    issuance: vaultContent,
    requests: vaultContent,
    history: vaultContent,
    'reports-settings': vaultContent,
  };

  const submoduleTabs = (documentsModule?.submodules || [
    { id: 'dashboard', label: 'Document Dashboard' },
    { id: 'vault', label: 'Document Vault' },
    { id: 'verification', label: 'Collection & Verification' },
    { id: 'templates', label: 'Certificate Templates' },
    { id: 'generation', label: 'Certificate Generation' },
    { id: 'approvals', label: 'Approval & Digital Signing' },
    { id: 'issuance', label: 'Issuance & Delivery' },
    { id: 'requests', label: 'Requests & Applications' },
    { id: 'history', label: 'Verification & History' },
    { id: 'reports-settings', label: 'Reports & Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Files className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || vaultContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
