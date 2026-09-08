import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFPageHeader,
  VFButton,
  VFBadge,
  VFCard,
  VFStatCard,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Palette,
  ExternalLink,
  Sparkles,
  FileCheck2,
  CreditCard,
  Eye,
  Sliders,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/design-lab')({
  component: DesignLabOverviewPage,
});

interface TemplateItem {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'marksheet' | 'id-card' | 'certificate' | 'admit-card';
  dimensions: string;
  dpi: number;
  orientation: 'Portrait' | 'Landscape';
  compliance: string;
  previewColor: string;
  description: string;
  fieldsCount: number;
  updatedAt: string;
}

const TEMPLATE_PRESETS: TemplateItem[] = [
  {
    id: 'TPL-MS-01',
    title: 'CBSE Secondary Marksheet & Tabulation',
    hindiTitle: 'सीबीएसई माध्यमिक अंकतालिका व सारणी',
    category: 'marksheet',
    dimensions: '210 × 297 mm (A4)',
    dpi: 300,
    orientation: 'Portrait',
    compliance: 'CBSE / State Board Approved',
    previewColor: 'from-blue-950/60 to-slate-900',
    description: 'Bilingual marksheet layout with subject-wise theory & practical breakdown, auto-computed CGPA, school crest watermark, and QR validation.',
    fieldsCount: 18,
    updatedAt: '2 days ago',
  },
  {
    id: 'TPL-ID-01',
    title: 'Student Biometric PVC Smart Card',
    hindiTitle: 'छात्र बायोमेट्रिक स्मार्ट पीवीसी पहचान पत्र',
    category: 'id-card',
    dimensions: '85.6 × 53.98 mm (CR80)',
    dpi: 300,
    orientation: 'Portrait',
    compliance: 'ISO/IEC 7810 Standard',
    previewColor: 'from-emerald-950/60 to-slate-900',
    description: 'High-durability plastic PVC card layout featuring portrait headshot, RFID chip icon, emergency guardian contact, blood group, and barcode.',
    fieldsCount: 12,
    updatedAt: 'Yesterday',
  },
  {
    id: 'TPL-ID-02',
    title: 'Faculty & Operational Staff ID Badge',
    hindiTitle: 'शिक्षक व गैर-शैक्षणिक कर्मचारी पहचान पत्र',
    category: 'id-card',
    dimensions: '85.6 × 53.98 mm (CR80)',
    dpi: 300,
    orientation: 'Landscape',
    compliance: 'Standard Lanyard Format',
    previewColor: 'from-indigo-950/60 to-slate-900',
    description: 'Crisp institutional credential card with employee code, department badge, authorized signatory stamp, and security hologram placement.',
    fieldsCount: 10,
    updatedAt: '3 days ago',
  },
  {
    id: 'TPL-CERT-01',
    title: 'Annual Sports & Academic Merit Certificate',
    hindiTitle: 'वार्षिक खेलकूद व शैक्षणिक योग्यता प्रमाण पत्र',
    category: 'certificate',
    dimensions: '297 × 210 mm (A4)',
    dpi: 300,
    orientation: 'Landscape',
    compliance: 'Foil Emboss & High-Gloss Compatible',
    previewColor: 'from-amber-950/60 to-slate-900',
    description: 'Traditional ornate gold-leaf border with institutional seal, dynamic recipient name callout, achievement distinction, and dual signature slots.',
    fieldsCount: 8,
    updatedAt: '5 days ago',
  },
  {
    id: 'TPL-ADM-01',
    title: 'Board Examination Admit Card & Hall Ticket',
    hindiTitle: 'बोर्ड परीक्षा प्रवेश पत्र व हॉल टिकट',
    category: 'admit-card',
    dimensions: '210 × 297 mm (A4)',
    dpi: 300,
    orientation: 'Portrait',
    compliance: 'Anti-Tamper Examination Roster',
    previewColor: 'from-purple-950/60 to-slate-900',
    description: 'Candidate roll matrix, invigilator verification blocks, exam center timetable schedule, barcode roll lookup, and mandatory instructions checklist.',
    fieldsCount: 14,
    updatedAt: '1 week ago',
  },
  {
    id: 'TPL-CERT-02',
    title: 'Transfer & Character Certificate (TC/CC)',
    hindiTitle: 'स्थानांतरण व चरित्र प्रमाण पत्र',
    category: 'certificate',
    dimensions: '210 × 297 mm (A4)',
    dpi: 300,
    orientation: 'Portrait',
    compliance: 'Education Directorate Standard',
    previewColor: 'from-cyan-950/60 to-slate-900',
    description: 'Official departure certification record with admission registry serial number, student conduct remarks, fee clearance verification, and counter-signatures.',
    fieldsCount: 15,
    updatedAt: '2 weeks ago',
  },
];

const RECENT_BATCHES = [
  {
    id: 'BAT-2026-081',
    title: 'Class 10-A Final Term Tabulation Sheets',
    template: 'CBSE Secondary Marksheet',
    count: 42,
    generatedAt: 'Today, 11:30 AM',
    status: 'Ready',
    size: '18.4 MB',
  },
  {
    id: 'BAT-2026-080',
    title: 'Batch 2026 Student Smart PVC ID Cards',
    template: 'Student Biometric Smart Card',
    count: 120,
    generatedAt: 'Yesterday, 04:15 PM',
    status: 'Ready',
    size: '42.1 MB',
  },
  {
    id: 'BAT-2026-079',
    title: 'Inter-House Sports Meet Merit Certificates',
    template: 'Annual Sports Merit Certificate',
    count: 65,
    generatedAt: 'Sep 06, 2026',
    status: 'Ready',
    size: '28.6 MB',
  },
];

function DesignLabOverviewPage() {
  const { addNotification } = useGlobalStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = React.useState<TemplateItem | null>(null);

  const filteredTemplates = selectedCategory === 'all'
    ? TEMPLATE_PRESETS
    : TEMPLATE_PRESETS.filter((t) => t.category === selectedCategory);

  const handleLaunchStudio = (templateId?: string) => {
    const url = templateId
      ? `https://designlab.vidyafloww.com?template=${templateId}`
      : 'https://designlab.vidyafloww.com';
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: 'Opening Design Lab Studio',
      description: 'Redirecting to dedicated high-resolution studio on designlab.vidyafloww.com',
      type: 'info',
    });
  };

  return (
    <VFPageContainer className="space-y-4">
      <VFPageHeader
        title="Design Lab Studio"
        description="डिज़ाइन लैब स्टूडियो — Institutional vector document layout engine, marksheet tabulation, biometric PVC cards & certificates"
        actions={
          <div className="flex items-center gap-2">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => handleLaunchStudio()}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <Sliders className="w-3.5 h-3.5 text-muted-foreground" />
              Studio Presets
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={() => handleLaunchStudio()}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <span>Launch Dedicated Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </VFButton>
          </div>
        }
      />

      {/* Top Standalone Transition Banner */}
      <div className="p-4 rounded-[4px] border border-primary/30 bg-gradient-to-r from-primary/10 via-[#18181b] to-[#121214] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-[4px] bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">
                Dedicated Vector Design Subsystem Available
              </h2>
              <VFBadge variant="outline" className="text-[10px] font-mono border-primary/40 text-primary">
                designlab.vidyafloww.com · Port 8010
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
              All marksheets, admit cards, and smart PVC layouts are rendered client-side at 300 DPI vector precision.
              You can preview templates directly below or launch the specialized full-screen studio for multi-layer canvas editing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="primary"
            size="sm"
            onClick={() => handleLaunchStudio()}
            className="rounded-[4px] gap-1.5 font-bold text-xs"
          >
            <span>Open Studio Canvas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </VFButton>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <VFStatCard
          title="Active Templates"
          value="24 Presets"
          trend="up"
          trendLabel="+3 new"
          accentColor="primary"
          icon={<Palette className="w-4 h-4 text-primary" />}
        />
        <VFStatCard
          title="Documents Issued"
          value="3,480 Docs"
          trend="up"
          trendLabel="+14% this term"
          accentColor="emerald"
          icon={<FileCheck2 className="w-4 h-4 text-emerald-400" />}
        />
        <VFStatCard
          title="Vector Resolution"
          value="300 DPI"
          description="Lossless PDF/PNG"
          accentColor="cyan"
          icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
        />
        <VFStatCard
          title="Active Print Batches"
          value="3 Batches"
          description="227 documents in queue"
          accentColor="amber"
          icon={<CreditCard className="w-4 h-4 text-amber-400" />}
        />
      </div>

      {/* Template Presets Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-foreground">
              Institutional Template Catalog
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              ({filteredTemplates.length} available)
            </span>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 p-0.5 rounded-[4px] bg-[#141414] border border-border">
            {[
              { id: 'all', label: 'All Templates' },
              { id: 'marksheet', label: 'Marksheets' },
              { id: 'id-card', label: 'ID Cards' },
              { id: 'certificate', label: 'Certificates' },
              { id: 'admit-card', label: 'Admit Cards' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-[3px] transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group border border-border hover:border-primary/50 rounded-[4px] bg-[#141414] flex flex-col overflow-hidden transition-all duration-150 hover:shadow-lg"
            >
              {/* Visual Card Header Preview Mockup */}
              <div className={`h-28 bg-gradient-to-br ${template.previewColor} border-b border-border p-3.5 relative flex flex-col justify-between select-none`}>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-[3px] bg-black/60 border border-white/10 text-[10px] font-mono text-white/90">
                    {template.dimensions}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[3px] bg-primary/30 border border-primary/40 text-[10px] font-bold text-primary">
                    {template.dpi} DPI
                  </span>
                </div>

                {/* Visual Decorative Mini Canvas Lines */}
                <div className="space-y-1 opacity-70">
                  <div className="h-1.5 w-2/3 rounded-sm bg-white/40" />
                  <div className="h-1 w-1/2 rounded-sm bg-white/25" />
                  <div className="h-1 w-3/4 rounded-sm bg-white/15" />
                </div>

                <div className="text-[10px] font-medium text-white/60">
                  {template.compliance}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {template.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                    {template.hindiTitle}
                  </p>
                  <p className="text-xs text-muted-foreground/90 mt-2 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Specs Footer */}
                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>{template.fieldsCount} Data Slots</span>
                  <span>{template.orientation}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <VFButton
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewTemplate(template)}
                    className="w-full rounded-[4px] text-xs font-semibold gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </VFButton>
                  <VFButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleLaunchStudio(template.id)}
                    className="w-full rounded-[4px] text-xs font-semibold gap-1"
                  >
                    <span>Open in Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </VFButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Print Batches Table */}
      <VFCard
        title="Recent Production Export Batches"
        description="Recently compiled high-resolution document archives ready for local or institutional printing"
        className="rounded-[4px]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono bg-[#161616]">
                <th className="py-2.5 px-3 font-semibold">Batch Code</th>
                <th className="py-2.5 px-3 font-semibold">Batch Name</th>
                <th className="py-2.5 px-3 font-semibold">Base Template</th>
                <th className="py-2.5 px-3 font-semibold">Copies</th>
                <th className="py-2.5 px-3 font-semibold">File Size</th>
                <th className="py-2.5 px-3 font-semibold">Generated</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RECENT_BATCHES.map((b) => (
                <tr key={b.id} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                    {b.id}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-foreground">
                    {b.title}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    {b.template}
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    {b.count} documents
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">
                    {b.size}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    {b.generatedAt}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      {b.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => {
                        addNotification({
                          title: 'Downloading Batch PDF',
                          description: `Preparing download for ${b.id}...`,
                          type: 'success',
                        });
                      }}
                      className="px-2 py-1 rounded-[3px] bg-[#202023] hover:bg-[#2a2a2e] text-foreground font-semibold text-[11px] border border-[#2e2e32] transition-colors"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* Quick Template Preview Modal */}
      {previewTemplate && (
        <VFDialog
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          title={`Template Preview: ${previewTemplate.title}`}
          description={`${previewTemplate.dimensions} · ${previewTemplate.dpi} DPI Lossless Vector Model`}
          footerActions={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-muted-foreground font-mono">
                Compliance: {previewTemplate.compliance}
              </span>
              <div className="flex items-center gap-2">
                <VFButton
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewTemplate(null)}
                  className="rounded-[4px] text-xs"
                >
                  Close Preview
                </VFButton>
                <VFButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const id = previewTemplate.id;
                    setPreviewTemplate(null);
                    handleLaunchStudio(id);
                  }}
                  className="rounded-[4px] text-xs font-semibold gap-1.5"
                >
                  <span>Edit in Full Studio Canvas</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </VFButton>
              </div>
            </div>
          }
        >
          <div className="space-y-4 py-2">
            {/* Mock Vector Canvas Document Preview Box */}
            <div className="border border-border rounded-[4px] bg-[#0c0c0e] p-6 flex flex-col items-center justify-center min-h-[320px] shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

              <div className="w-full max-w-md bg-[#161618] border border-[#2c2c30] rounded-[4px] p-5 shadow-2xl space-y-4 relative z-10">
                <div className="flex items-center justify-between border-b border-[#2c2c30] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-[3px] bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary text-[10px]">
                      VF
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">VidyaFloww International Academy</p>
                      <p className="text-[10px] text-muted-foreground">CBSE Affiliation No. 2130982</p>
                    </div>
                  </div>
                  <VFBadge variant="outline" className="text-[9px] font-mono">
                    {previewTemplate.category.toUpperCase()}
                  </VFBadge>
                </div>

                <div className="space-y-2">
                  <h4 className="text-center font-bold text-sm text-foreground tracking-wide">
                    {previewTemplate.title.toUpperCase()}
                  </h4>
                  <p className="text-center text-[10px] text-muted-foreground font-mono">
                    ACADEMIC SESSION 2025–2026
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-[3px] bg-[#0e0e10] border border-[#222226]">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Candidate Name:</span>
                    <span className="font-semibold text-foreground">Aarav Sharma</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Enrollment Number:</span>
                    <span className="font-mono text-foreground font-semibold">ADM-2026-0811</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Class & Section:</span>
                    <span className="text-foreground">Class 10-A (Science)</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Roll Matrix:</span>
                    <span className="font-mono text-foreground font-semibold">#101042</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[9px] text-muted-foreground border-t border-[#2c2c30]">
                  <span>System Verified Checksum: 8f4a..91e0</span>
                  <span className="font-bold text-foreground">Controller of Examinations</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• <strong>Dynamic Binding</strong>: Automatically connects to student rosters, teacher credentials, or sports meet winners.</p>
              <p>• <strong>Zero Pixelation</strong>: All typography, tables, and watermarks render as pure vector curves in PDF output.</p>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}

