import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFCard,
  VFDialog,
} from '@vidyafloww/ui';
import {
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

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
  description: string;
  fieldsCount: number;
}

const TEMPLATE_PRESETS: TemplateItem[] = [
  {
    id: 'TPL-MS-01',
    title: 'CBSE Secondary Marksheet & Tabulation',
    hindiTitle: 'सीबीएसई सेकेंडरी मार्कशीट एंड टेबुलेशन',
    category: 'marksheet',
    dimensions: '210 × 297 mm (A4)',
    dpi: 300,
    orientation: 'Portrait',
    compliance: 'CBSE / State Board Approved',
    description: 'Bilingual marksheet layout with subject-wise theory & practical breakdown, auto-computed CGPA, and QR validation.',
    fieldsCount: 18,
  },
  {
    id: 'TPL-ID-01',
    title: 'Student Biometric PVC Smart Card',
    hindiTitle: 'स्टूडेंट बायोमेट्रिक स्मार्ट PVC आईडी कार्ड',
    category: 'id-card',
    dimensions: '85.6 × 53.98 mm (CR80)',
    dpi: 300,
    orientation: 'Portrait',
    compliance: 'ISO/IEC 7810 Standard',
    description: 'High-durability plastic PVC card layout featuring portrait headshot, RFID chip icon, emergency contact, and barcode.',
    fieldsCount: 12,
  },
  {
    id: 'TPL-ID-02',
    title: 'Faculty & Operational Staff ID Badge',
    hindiTitle: 'टीचर्स एंड स्टाफ आईडी कार्ड बैज',
    category: 'id-card',
    dimensions: '85.6 × 53.98 mm (CR80)',
    dpi: 300,
    orientation: 'Landscape',
    compliance: 'Standard Lanyard Format',
    description: 'Crisp institutional credential card with employee code, department badge, and authorized signatory stamp.',
    fieldsCount: 10,
  },
  {
    id: 'TPL-CERT-01',
    title: 'Annual Sports & Academic Merit Certificate',
    hindiTitle: 'एनुअल स्पोर्ट्स एंड मेरिट सर्टिफिकेट',
    category: 'certificate',
    dimensions: '297 × 210 mm (A4)',
    dpi: 300,
    orientation: 'Landscape',
    compliance: 'Foil Emboss Compatible',
    description: 'Traditional ornate gold-leaf border with institutional seal, dynamic recipient name callout, and dual signature slots.',
    fieldsCount: 8,
  },
];

const PRINT_QUEUE = [
  {
    batchId: 'BATCH-2026-901',
    template: 'Student Biometric PVC Smart Card',
    target: 'Class 10-A (42 Cards)',
    format: 'PVC Plastic (300 DPI)',
    status: 'Ready to Print',
    createdAt: 'Today, 09:30 AM',
  },
  {
    batchId: 'BATCH-2026-902',
    template: 'CBSE Secondary Marksheet',
    target: 'Class 12-Sci (38 Sheets)',
    format: 'Heavyweight Matte Paper',
    status: 'Queued',
    createdAt: 'Today, 08:45 AM',
  },
  {
    batchId: 'BATCH-2026-903',
    template: 'Academic Merit Certificate',
    target: 'Sports Meet Winners (15 Sheets)',
    format: 'Gold Foil Border Parchment',
    status: 'Exported PDF',
    createdAt: 'Yesterday',
  },
];

function DesignLabOverviewPage() {
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';
  const [selectedTemplate, setSelectedTemplate] = React.useState<TemplateItem | null>(null);

  const standalonePort = '8015';
  const standaloneUrl = `http://localhost:${standalonePort}`;

  const handleLaunchDesignStudio = (path = '') => {
    const url = `${standaloneUrl}${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: isHindi ? 'डिजाइन स्टूडियो ओपन हो रहा है' : 'Opening Design Studio',
      description: isHindi ? 'पोर्ट 8015 पर डॉक्यूमेंट डिज़ाइनर पर रिडायरेक्ट किया जा रहा है।' : 'Redirecting to visual template studio on port 8015.',
      type: 'info',
    });
  };

  return (
    <VFPageContainer className="space-y-4 w-full">
      {/* ── TOP TOOLBAR BAR ── */}
      <div className="p-3 rounded-[4px] bg-[#0d0d0d] border border-border/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
              {isHindi ? 'डिजाइन लैब एंड प्रिंटिंग सेंटर (Design Lab & Card Studio)' : 'Design Lab & Document Publisher'}
            </h1>
            <VFBadge variant="outline" className="text-[10.5px] font-mono font-bold bg-[#141414] text-muted-foreground">
              Port: {standalonePort}
            </VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isHindi
              ? 'आईडी कार्ड्स, मार्कशीट्स, एडमिट कार्ड्स, सर्टिफिकेट्स और TC का विजुअल डिज़ाइन एंड बैच प्रिंटिंग स्टूडियो।'
              : 'Visual template studio for student ID cards, report cards, admit cards, hall tickets & certificates.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => handleLaunchDesignStudio()}
            className="rounded-[4px] gap-1.5 text-xs font-bold h-8 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isHindi ? 'डिजाइन स्टूडियो लॉन्च करें' : 'Launch Design Studio'}</span>
          </VFButton>
        </div>
      </div>

      {/* ── TEMPLATES GRID ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            {isHindi ? 'स्टैंडर्ड डॉक्यूमेंट्स एंड कार्ड टेम्पलेट्स' : 'Standard Document & Identity Card Presets'}
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">
            {TEMPLATE_PRESETS.length} {isHindi ? 'टेम्पलेट्स' : 'Presets'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {TEMPLATE_PRESETS.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl)}
              className="p-3.5 rounded-[4px] border border-border/80 bg-[#121212] hover:bg-[#161616] hover:border-zinc-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-[3px] bg-[#1a1a1a] border border-border text-[10.5px] font-mono font-bold text-foreground uppercase">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {tpl.dimensions}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {isHindi ? tpl.hindiTitle : tpl.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                    {tpl.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-mono text-[10.5px]">{tpl.fieldsCount} Data Fields</span>
                <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BATCH PRINT & EXPORT QUEUE TABLE ── */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isHindi ? 'बैच प्रिंटिंग एंड एक्सपोर्ट क्यू' : 'Batch Print & Document Export Queue'}
            </span>
            <VFBadge variant="outline" className="text-[10px] font-mono bg-[#161616]">
              Vector PDF / CMYK
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'क्लास-वाइज़ PVC कार्ड्स, मार्कशीट्स और सर्टिफिकेट्स प्रिंटिंग स्टेटस।'
            : 'Recent card generation jobs, print spooler status, and high-res vector exports.'
        }
        className="rounded-[4px] border-border/90 bg-[#0d0d0d]"
        headerClassName="py-2.5 px-3.5"
        bodyClassName="p-0"
        actions={
          <button
            onClick={() => handleLaunchDesignStudio('/print-queue')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isHindi ? 'पूरी प्रिंट क्यू देखें' : 'Full Print Spooler'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 bg-[#121212] text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3.5">{isHindi ? 'बैच आईडी' : 'Batch ID'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'टेम्पलेट' : 'Template'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'टारगेट ग्रुप / काउंट' : 'Target Group'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'प्रिंट फॉर्मेट' : 'Media Format'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'टाइम' : 'Queued At'}</th>
                <th className="py-2.5 px-3.5 text-right">{isHindi ? 'स्टेटस' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {PRINT_QUEUE.map((job) => (
                <tr key={job.batchId} className="hover:bg-[#141414] transition-colors">
                  <td className="py-2.5 px-3.5 font-mono font-bold text-primary">{job.batchId}</td>
                  <td className="py-2.5 px-3.5 font-bold text-foreground">{job.template}</td>
                  <td className="py-2.5 px-3.5 text-foreground">{job.target}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{job.format}</td>
                  <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{job.createdAt}</td>
                  <td className="py-2.5 px-3.5 text-right">
                    <VFBadge variant={job.status === 'Ready to Print' ? 'success' : job.status === 'Queued' ? 'warning' : 'primary'} className="text-[10px]">
                      {job.status}
                    </VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* ── TEMPLATE MODAL ── */}
      {selectedTemplate && (
        <VFDialog
          isOpen={Boolean(selectedTemplate)}
          onClose={() => setSelectedTemplate(null)}
          title={isHindi ? selectedTemplate.hindiTitle : selectedTemplate.title}
          description={`${selectedTemplate.category.toUpperCase()} · ${selectedTemplate.dimensions} · ${selectedTemplate.dpi} DPI`}
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton variant="outline" size="sm" onClick={() => setSelectedTemplate(null)}>
                {isHindi ? 'क्लोज़ करें' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={() => {
                  setSelectedTemplate(null);
                  handleLaunchDesignStudio(`/editor/${selectedTemplate.id}`);
                }}
                className="font-bold"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                {isHindi ? 'डिजाइन एडिटर में खोलें' : 'Open in Design Studio'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'स्टैंडर्ड कंप्लायंस:' : 'Compliance Standard:'}</span>
                <span className="font-semibold text-foreground">{selectedTemplate.compliance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'ओरिएंटेशन:' : 'Orientation:'}</span>
                <span className="font-mono text-foreground">{selectedTemplate.orientation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'डायनामिक डेटा फील्ड्स:' : 'Variable Data Fields:'}</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedTemplate.fieldsCount} Fields</span>
              </div>
            </div>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              {selectedTemplate.description}
            </p>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}

