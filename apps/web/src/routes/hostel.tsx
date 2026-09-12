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
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/hostel')({
  component: HostelOverviewPage,
});

interface OutpassItem {
  id: string;
  name: string;
  room: string;
  purpose: string;
  departure: string;
  expectedReturn: string;
  guardianPhone: string;
  status: 'Approved' | 'Out Campus' | 'Overdue';
}

const ACTIVE_OUTPASSES: OutpassItem[] = [
  {
    id: 'OUT-881',
    name: 'Rahul Sharma',
    room: 'A-101 (Bed 1)',
    purpose: 'Weekend Home Visit',
    departure: 'Friday 05:00 PM',
    expectedReturn: 'Sunday 07:00 PM',
    guardianPhone: '+91 98111 00123',
    status: 'Out Campus',
  },
  {
    id: 'OUT-882',
    name: 'Amit Kumar',
    room: 'A-102 (Bed 1)',
    purpose: 'Inter-School Football Meet',
    departure: 'Saturday 08:30 AM',
    expectedReturn: 'Today 06:00 PM',
    guardianPhone: '+91 98111 00456',
    status: 'Out Campus',
  },
  {
    id: 'OUT-883',
    name: 'Divya Singh',
    room: 'B-202 (Bed 2)',
    purpose: 'Family Function (Out of City)',
    departure: 'Thursday 02:00 PM',
    expectedReturn: 'Monday 08:00 AM',
    guardianPhone: '+91 98111 00678',
    status: 'Out Campus',
  },
  {
    id: 'OUT-884',
    name: 'Aman Sharma',
    room: 'C-301 (Bed 1)',
    purpose: 'Dental Appointment & Checkup',
    departure: 'Today 10:00 AM',
    expectedReturn: 'Today 04:30 PM',
    guardianPhone: '+91 98111 00888',
    status: 'Approved',
  },
];

const RESIDENTIAL_BLOCKS = [
  {
    blockId: 'BLK-A',
    name: 'Block A · Senior Boys Wing',
    hindiName: 'ब्लॉक A · सीनियर छात्र विंग',
    warden: 'Prof. R.K. Saxena',
    wardenPhone: '+91 98111 00991',
    capacity: 120,
    occupied: 114,
    status: 'Full Capacity (95%)',
  },
  {
    blockId: 'BLK-B',
    name: 'Block B · Junior Boys Wing',
    hindiName: 'ब्लॉक B · जूनियर छात्र विंग',
    warden: 'Mr. Arvind Gupta',
    wardenPhone: '+91 98111 00992',
    capacity: 100,
    occupied: 88,
    status: '12 Beds Available',
  },
  {
    blockId: 'BLK-C',
    name: 'Block C · Girls Residential Wing',
    hindiName: 'ब्लॉक C · छात्रा आवासीय विंग',
    warden: 'Dr. Sunita Narain',
    wardenPhone: '+91 98111 00993',
    capacity: 140,
    occupied: 132,
    status: '8 Beds Available',
  },
];

function HostelOverviewPage() {
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';
  const [selectedPass, setSelectedPass] = React.useState<OutpassItem | null>(null);

  const standalonePort = '8011';
  const standaloneUrl = `http://localhost:${standalonePort}`;

  const handleLaunchHostelPortal = (path = '') => {
    const url = `${standaloneUrl}${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: isHindi ? 'छात्रावास पोर्टल खोला जा रहा है' : 'Opening Hostel Portal',
      description: isHindi ? 'पोर्ट 8011 पर आवासीय प्रबंधन पोर्टल पर भेजा जा रहा है।' : 'Redirecting to residential hostel portal on port 8011.',
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
              {isHindi ? 'छात्रावास व आवासीय प्रबंधन (Residential Hostel)' : 'Residential Hostel & Dormitories'}
            </h1>
            <VFBadge variant="outline" className="text-[10.5px] font-mono font-bold bg-[#141414] text-muted-foreground">
              Port: {standalonePort}
            </VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isHindi
              ? 'छात्रावास कमरा आवंटन, वार्डन रोस्टर, छात्र आउटपास गेटपास व मेस प्रबंधन।'
              : 'Dormitory bed allocation, warden duty roster, student outpass gate passes & mess meal schedules.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => handleLaunchHostelPortal()}
            className="rounded-[4px] gap-1.5 text-xs font-bold h-8 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isHindi ? 'छात्रावास पोर्टल लॉन्च करें' : 'Launch Hostel Portal'}</span>
          </VFButton>
        </div>
      </div>

      {/* ── RESIDENTIAL BLOCKS GRID ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            {isHindi ? 'आवासीय ब्लॉक्स व क्षमता स्थिति' : 'Residential Dormitory Blocks & Bed Occupancy'}
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">
            3 {isHindi ? 'सक्रिय विंग्स' : 'Active Blocks'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {RESIDENTIAL_BLOCKS.map((blk) => (
            <div
              key={blk.blockId}
              onClick={() => handleLaunchHostelPortal(`/blocks/${blk.blockId}`)}
              className="p-3.5 rounded-[4px] border border-border/80 bg-[#121212] hover:bg-[#161616] hover:border-zinc-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-[3px] bg-[#1a1a1a] border border-border text-[10.5px] font-mono font-bold text-foreground">
                    {blk.blockId}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-[3px] border border-emerald-500/20">
                    {blk.occupied}/{blk.capacity} Beds
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {isHindi ? blk.hindiName : blk.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {isHindi ? 'वार्डन:' : 'Resident Warden:'} {blk.warden}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-mono text-[10.5px]">{blk.wardenPhone}</span>
                <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVE OUTPASS & GATE REGISTER TABLE ── */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isHindi ? 'सक्रिय छात्र आउटपास व गेट रजिस्टर' : 'Active Student Outpass & Gatepass Register'}
            </span>
            <VFBadge variant="outline" className="text-[10px] font-mono bg-[#161616]">
              Real-Time Gate Logs
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'सप्ताहांत गृह प्रवास, चिकित्सा अनुमति व स्वीकृत आउटपास की वास्तविक स्थिति।'
            : 'Weekend home visit leaves, guardian approvals, and return time logs.'
        }
        className="rounded-[4px] border-border/90 bg-[#0d0d0d]"
        headerClassName="py-2.5 px-3.5"
        bodyClassName="p-0"
        actions={
          <button
            onClick={() => handleLaunchHostelPortal('/outpasses')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isHindi ? 'पूरा आउटपास लेजर' : 'Full Outpass Ledger'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 bg-[#121212] text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3.5">{isHindi ? 'पास आईडी' : 'Pass ID'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'छात्र का नाम' : 'Student Name'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'कमरा / बेड' : 'Room & Bed'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'उद्देश्य' : 'Purpose'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'प्रस्थान' : 'Departure'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'अनुमानित वापसी' : 'Expected Return'}</th>
                <th className="py-2.5 px-3.5 text-right">{isHindi ? 'स्थिति' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {ACTIVE_OUTPASSES.map((pass) => (
                <tr
                  key={pass.id}
                  onClick={() => setSelectedPass(pass)}
                  className="hover:bg-[#141414] transition-colors cursor-pointer"
                >
                  <td className="py-2.5 px-3.5 font-mono font-bold text-primary">{pass.id}</td>
                  <td className="py-2.5 px-3.5 font-bold text-foreground">{pass.name}</td>
                  <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{pass.room}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{pass.purpose}</td>
                  <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{pass.departure}</td>
                  <td className="py-2.5 px-3.5 font-mono font-semibold text-foreground">{pass.expectedReturn}</td>
                  <td className="py-2.5 px-3.5 text-right">
                    <VFBadge variant={pass.status === 'Approved' ? 'primary' : 'warning'} className="text-[10px]">
                      {pass.status}
                    </VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* ── OUTPASS DETAIL MODAL ── */}
      {selectedPass && (
        <VFDialog
          isOpen={Boolean(selectedPass)}
          onClose={() => setSelectedPass(null)}
          title={`${selectedPass.id} — ${selectedPass.name}`}
          description={`${selectedPass.room} · ${selectedPass.purpose}`}
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton variant="outline" size="sm" onClick={() => setSelectedPass(null)}>
                {isHindi ? 'बंद करें' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={() => {
                  setSelectedPass(null);
                  handleLaunchHostelPortal(`/outpasses/${selectedPass.id}`);
                }}
                className="font-bold"
                leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                {isHindi ? 'आउटपास सत्यापित करें' : 'Verify Outpass'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'अभिभावक संपर्क:' : 'Guardian Mobile:'}</span>
                <span className="font-mono text-foreground">{selectedPass.guardianPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'प्रस्थान समय:' : 'Departure Time:'}</span>
                <span className="font-mono text-foreground">{selectedPass.departure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'वापसी समय:' : 'Return Deadline:'}</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedPass.expectedReturn}</span>
              </div>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
