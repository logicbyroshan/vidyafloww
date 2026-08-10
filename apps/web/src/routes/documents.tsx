import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFButton, VFBadge } from '@vidyamaxx/ui';
import { QrCode, FileText, Award, Upload, Sparkles, Bot, Printer } from 'lucide-react';

export const Route = createFileRoute('/documents')({
  component: DocumentsPage,
});

function DocumentsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('cardflow-id-studio');

  const submoduleTabs = [
    {
      id: 'cardflow-id-studio',
      label: 'CardFlow / GenXID Studio',
      icon: <QrCode className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-foreground">CardFlow / GenXID ID Card Designer</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Generate Student IDs, Staff IDs, Visitor Passes, and Bus Passes with QR codes.</p>
            </div>
            <VFButton size="sm" leftIcon={<Printer className="h-3.5 w-3.5" />}>Bulk Print ID Cards</VFButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: 'Student ID Card', name: 'Aditya Verma', role: 'Class 9 - Sec A', idNo: 'STU-2026-091' },
              { type: 'Employee ID Card', name: 'Dr. Sarah Connor', role: 'Senior Physics HOD', idNo: 'EMP-2026-012' },
              { type: 'Bus Travel Pass', name: 'Rohan Sharma', role: 'Route 3 - South Campus', idNo: 'BUS-2026-441' },
            ].map((card, i) => (
              <div key={i} className="p-4 bg-gradient-to-br from-card to-muted/40 border border-border/80 rounded-xl space-y-3 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{card.type}</span>
                  <QrCode className="h-5 w-5 text-foreground/80" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-foreground">{card.name}</h4>
                  <p className="text-xs text-muted-foreground">{card.role}</p>
                  <p className="text-[11px] font-mono text-primary mt-1">{card.idNo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'transfer-certificate',
      label: 'Transfer Certificate (TC)',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Transfer Certificate (TC) Serial Workflow">
          <p className="text-xs text-muted-foreground">Automated TC serial numbering, library/fee clearance checks, board verification, and auto-archival.</p>
        </VFCard>
      ),
    },
    {
      id: 'certificates',
      label: 'Bonafide & Character Certs',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Bonafide, Conduct & Experience Certificates">
          <p className="text-xs text-muted-foreground">Print official school bonafide certificates, conduct certificates, and staff experience letters.</p>
        </VFCard>
      ),
    },
    {
      id: 'ocr-document-hub',
      label: 'AI OCR Scanned Document Hub',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow Batch OCR Scanned Document Extractor</span>
          </div>
          <p className="text-xs text-muted-foreground">Upload 500 scanned admission forms. AI detects student photos, extracts fields, matches documents, and flags errors.</p>
          <div className="border-2 border-dashed border-border/80 p-6 rounded-xl text-center space-y-2 cursor-pointer bg-muted/20 hover:border-primary/50 transition-colors">
            <Upload className="h-8 w-8 text-primary/60 mx-auto" />
            <p className="text-xs font-semibold text-foreground">Drop scanned batch files or PDF bundles here</p>
            <VFBadge variant="outline">Supported: PDF, PNG, JPEG, TIFF</VFBadge>
          </div>
        </div>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="16 — ID, Documents & Certificates" 
        description="CardFlow / GenXID studio, Student & Employee IDs, TCs, Bonafide certificates, and AI OCR batch processing."
      />
      <VFTabs 
        items={submoduleTabs} 
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="underline"
      />
    </VFPageContainer>
  );
}
