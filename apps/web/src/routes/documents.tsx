import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { CreditCard, FileText, Award, FileCheck, ShieldCheck, Palette, CheckCircle2, Plus } from 'lucide-react';

export const Route = createFileRoute('/documents')({
  component: DocumentsPage,
});

function DocumentsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('id-card-mgmt');

  const submoduleTabs = [
    {
      id: 'id-card-mgmt',
      label: 'CardFlow ID Studio',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">GenXID Studio · Batch Smart ID Card Printing</h3>
              <p className="text-xs text-muted-foreground mt-0.5">High-resolution PVC card rendering, QR code embedding, and RFID chip encoding.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Batch Print ID Cards</VFButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card border border-border rounded-xl space-y-2">
              <span className="text-xs font-bold text-primary">Student Smart ID Layout</span>
              <p className="text-xs text-muted-foreground">Class 9 - Sec A Template · Front Photo + Emergency Contact QR Code + Barcode.</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-xl space-y-2">
              <span className="text-xs font-bold text-primary">Staff & Visitor Badge Layout</span>
              <p className="text-xs text-muted-foreground">Faculty Badge Template · RFID Smart Access Chip + Blood Group Badge.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'document-mgmt',
      label: 'Document Vault',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Institutional Document Vault & Archival System">
          <p className="text-xs text-muted-foreground">Store scanned birth certificates, marksheets, board affiliation letters, and land lease agreements with encryption.</p>
        </VFCard>
      ),
    },
    {
      id: 'certificate-mgmt',
      label: 'Certificate Engine',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Automated Certificate Generator Engine">
          <p className="text-xs text-muted-foreground">Generate sports merit certificates, academic excellence awards, and extra-curricular participation certificates.</p>
        </VFCard>
      ),
    },
    {
      id: 'transfer-certificate',
      label: 'Transfer Certificate (TC)',
      icon: <FileCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Transfer Certificate (TC) Issuance & No Dues Approval">
          <p className="text-xs text-muted-foreground">Process TC requests, verify No Dues clearance from Fee/Library/Sports, and issue counter-signed TC with serial tracking.</p>
        </VFCard>
      ),
    },
    {
      id: 'bonafide-character',
      label: 'Bonafide & Character',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Bonafide Student & Conduct Certificates">
          <p className="text-xs text-muted-foreground">Instant 1-click issuance of Bonafide Study Certificates for passport/bank accounts and Character Conduct Certificates.</p>
        </VFCard>
      ),
    },
    {
      id: 'employee-certificates',
      label: 'Employee Certificates',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Staff Experience & Relieving Certificates">
          <p className="text-xs text-muted-foreground">Generate teaching experience certificates, service tenure letters, and NOC certificates for staff members.</p>
        </VFCard>
      ),
    },
    {
      id: 'template-designer',
      label: 'Template Designer Studio',
      icon: <Palette className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Visual Drag-and-Drop Certificate & ID Template Studio">
          <p className="text-xs text-muted-foreground">Design custom certificate layouts, add school crest logos, signature blocks, and background watermarks.</p>
        </VFCard>
      ),
    },
    {
      id: 'digital-signature',
      label: 'Verification & Digital Signature',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Digital Signature & Public QR Document Verification">
          <p className="text-xs text-muted-foreground">Embed tamper-proof cryptographic QR codes on issued TCs and certificates for instant public online verification.</p>
        </VFCard>
      ),
    },
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
