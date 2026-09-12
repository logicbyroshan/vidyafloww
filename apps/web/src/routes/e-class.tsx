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
  PlayCircle,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/e-class')({
  component: EClassOverviewPage,
});

interface OnlineSessionCard {
  id: string;
  code: string;
  title: string;
  hindiTitle: string;
  subject: string;
  grade: string;
  instructor: string;
  time: string;
  attendees: number;
  status: 'Live Now' | 'Upcoming' | 'Recorded';
}

const FEATURED_SESSIONS: OnlineSessionCard[] = [
  {
    id: 'SESS-101',
    code: 'VIRT-101',
    title: 'Ray Optics & Lens Formula Revision',
    hindiTitle: 'रे ऑप्टिक्स व लेंस फॉर्मूला रिवीजन',
    subject: 'Physics',
    grade: 'Class 10-A',
    instructor: 'Dr. Sarah Connor',
    time: '10:00 AM – 10:45 AM',
    attendees: 38,
    status: 'Live Now',
  },
  {
    id: 'SESS-102',
    code: 'VIRT-102',
    title: 'Quadratic Polynomial Factorization',
    hindiTitle: 'क्वाड्रैटिक पॉलिनॉमियल्स फैक्टराइजेशन',
    subject: 'Mathematics',
    grade: 'Class 9-B',
    instructor: 'Prof. Rajesh Sharma',
    time: '02:00 PM – 02:45 PM',
    attendees: 42,
    status: 'Upcoming',
  },
  {
    id: 'SESS-103',
    code: 'VIRT-103',
    title: 'Organic Chemistry: Alkanes & Haloalkanes',
    hindiTitle: 'ऑर्गेनिक केमिस्ट्री: एल्केन्स व हैलोएल्केन्स',
    subject: 'Chemistry',
    grade: 'Class 12-Sci',
    instructor: 'Dr. Meenakshi Sundaram',
    time: 'Recorded · 52 mins',
    attendees: 128,
    status: 'Recorded',
  },
  {
    id: 'SESS-104',
    code: 'VIRT-104',
    title: 'Human Physiology & Neural Coordination',
    hindiTitle: 'ह्यूमन फिजियोलॉजी व न्यूरल को-ऑर्डिनेशन',
    subject: 'Biology',
    grade: 'Class 11-Bio',
    instructor: 'Dr. Anita Desai',
    time: 'Recorded · 48 mins',
    attendees: 94,
    status: 'Recorded',
  },
];

const RECENT_RECORDINGS = [
  {
    id: 'REC-2026-801',
    title: 'Linear Inequalities & Graphical Solutions',
    grade: 'Class 11-Sci',
    instructor: 'Prof. Rajesh Sharma',
    duration: '45 mins',
    date: '10 Sep 2026',
    views: 142,
  },
  {
    id: 'REC-2026-802',
    title: 'Thermodynamics & Heat Transfer Laws',
    grade: 'Class 11-Sci',
    instructor: 'Dr. Sarah Connor',
    duration: '50 mins',
    date: '09 Sep 2026',
    views: 98,
  },
  {
    id: 'REC-2026-803',
    title: 'Electromagnetic Induction & Faraday Laws',
    grade: 'Class 12-Sci',
    instructor: 'Dr. Sarah Connor',
    duration: '55 mins',
    date: '08 Sep 2026',
    views: 215,
  },
];

function EClassOverviewPage() {
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';
  const [activeModal, setActiveModal] = React.useState<OnlineSessionCard | null>(null);

  const standalonePort = '8016';
  const standaloneUrl = `http://localhost:${standalonePort}`;

  const handleLaunchStandalone = () => {
    window.open(standaloneUrl, '_blank', 'noopener,noreferrer');
    addNotification({
      title: isHindi ? 'ई-क्लास पोर्टल खोला जा रहा है' : 'Opening E-Classroom Portal',
      description: isHindi ? 'पोर्ट 8016 पर स्टैंडअलोन पोर्टल पर भेजा जा रहा है।' : 'Redirecting to dedicated e-class portal on port 8016.',
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
              {isHindi ? 'ई-क्लास व लाइव क्लासरूम हब (Virtual E-Classroom)' : 'Virtual E-Classroom & Lecture Hub'}
            </h1>
            <VFBadge variant="outline" className="text-[10.5px] font-mono font-bold bg-[#141414] text-muted-foreground">
              Port: {standalonePort}
            </VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isHindi
              ? 'लाइव वीडियो क्लासेस, इंटरएक्टिव व्हाइटबोर्ड, रिकॉर्डेड लेक्चर्स और फॉर्मूला रिपॉजिटरी।'
              : 'Live video classrooms, interactive whiteboard, lecture recording repository, and academic formulas.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="outline"
            size="sm"
            onClick={handleLaunchStandalone}
            className="rounded-[4px] gap-1.5 text-xs font-semibold h-8 bg-[#141414] hover:bg-[#1c1c1c] text-foreground border-border"
          >
            <PlayCircle className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{isHindi ? 'प्लेयर खोलें' : 'Open Player'}</span>
          </VFButton>
          <VFButton
            size="sm"
            onClick={handleLaunchStandalone}
            className="rounded-[4px] gap-1.5 text-xs font-bold h-8 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isHindi ? 'ई-क्लास पोर्टल लॉन्च करें' : 'Launch E-Class Portal'}</span>
          </VFButton>
        </div>
      </div>

      {/* ── SESSIONS GRID ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            {isHindi ? 'एक्टिव व अपकमिंग वर्चुअल क्लासेस' : 'Active & Upcoming Virtual Classroom Sessions'}
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">
            {FEATURED_SESSIONS.length} {isHindi ? 'क्लासेस' : 'Sessions'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {FEATURED_SESSIONS.map((sess) => (
            <div
              key={sess.id}
              onClick={() => setActiveModal(sess)}
              className="p-3.5 rounded-[4px] border border-border/80 bg-[#121212] hover:bg-[#161616] hover:border-zinc-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-[3px] bg-[#1a1a1a] border border-border text-[10.5px] font-mono font-bold text-foreground">
                    {sess.code}
                  </span>
                  <VFBadge variant={sess.status === 'Live Now' ? 'danger' : sess.status === 'Upcoming' ? 'warning' : 'outline'} className="text-[10px]">
                    {sess.status}
                  </VFBadge>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {isHindi ? sess.hindiTitle : sess.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {sess.grade} · {sess.subject}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="truncate">{sess.instructor}</span>
                <span className="font-mono font-semibold text-foreground shrink-0">{sess.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT RECORDINGS TABLE ── */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isHindi ? 'रीसेंट ऑन-डिमांड रिकॉर्डेड लेक्चर्स' : 'Recent On-Demand Recorded Lectures'}
            </span>
            <VFBadge variant="outline" className="text-[10px] font-mono bg-[#161616]">
              HD Video Repository
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'क्लास-वाइज डिजिटल लेक्चर्स, व्हाइटबोर्ड नोट्स व रिवीजन मटीरियल।'
            : 'Class-wise digital lectures, whiteboard annotations, and formula cheat sheets.'
        }
        className="rounded-[4px] border-border/90 bg-[#0d0d0d]"
        headerClassName="py-2.5 px-3.5"
        bodyClassName="p-0"
        actions={
          <button
            onClick={handleLaunchStandalone}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isHindi ? 'फुल वीडियो कैटलॉग देखें' : 'View Full Catalog'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 bg-[#121212] text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3.5">{isHindi ? 'लेक्चर टाइटल' : 'Lecture Title'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'क्लास' : 'Grade'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'इंस्ट्रक्टर' : 'Instructor'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'ड्यूरेशन' : 'Duration'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'व्यूज' : 'Views'}</th>
                <th className="py-2.5 px-3.5 text-right">{isHindi ? 'एक्शन' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {RECENT_RECORDINGS.map((r) => (
                <tr key={r.id} className="hover:bg-[#141414] transition-colors">
                  <td className="py-2.5 px-3.5 font-bold text-foreground">{r.title}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground font-mono">{r.grade}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{r.instructor}</td>
                  <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{r.duration}</td>
                  <td className="py-2.5 px-3.5 font-mono text-primary font-bold">{r.views}</td>
                  <td className="py-2.5 px-3.5 text-right">
                    <button
                      onClick={handleLaunchStandalone}
                      className="text-primary hover:underline text-[11px] font-bold cursor-pointer"
                    >
                      {isHindi ? 'चलाएं' : 'Play'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* ── SESSION MODAL ── */}
      {activeModal && (
        <VFDialog
          isOpen={Boolean(activeModal)}
          onClose={() => setActiveModal(null)}
          title={isHindi ? activeModal.hindiTitle : activeModal.title}
          description={`${activeModal.grade} · ${activeModal.subject} · ${activeModal.instructor}`}
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton variant="outline" size="sm" onClick={() => setActiveModal(null)}>
                {isHindi ? 'क्लोज़' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={() => {
                  setActiveModal(null);
                  handleLaunchStandalone();
                }}
                className="font-bold"
                leftIcon={<PlayCircle className="w-3.5 h-3.5" />}
              >
                {isHindi ? 'लाइव क्लासरूम जॉइन करें' : 'Join Live Classroom'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'शेड्यूल्ड टाइम:' : 'Scheduled Time:'}</span>
                <span className="font-mono text-foreground font-bold">{activeModal.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'एनरोल्ड स्टूडेंट्स:' : 'Registered Attendees:'}</span>
                <span className="font-bold text-emerald-400 font-mono">{activeModal.attendees} Students</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'क्लास स्टेटस:' : 'Session Status:'}</span>
                <span className="font-bold text-primary">{activeModal.status}</span>
              </div>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
