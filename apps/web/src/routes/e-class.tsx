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
  Video,
  ExternalLink,
  PlayCircle,
  Users,
  ArrowRight,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

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
  color: string;
}

const FEATURED_SESSIONS: OnlineSessionCard[] = [
  {
    id: 'SESS-101',
    code: 'VIRT-101',
    title: 'Ray Optics & Lens Formula Revision',
    hindiTitle: 'किरण प्रकाशिकी व लेंस सूत्र पुनरावृत्ति',
    subject: 'Physics',
    grade: 'Class 10-A',
    instructor: 'Dr. Sarah Connor',
    time: '10:00 AM – 10:45 AM',
    attendees: 38,
    status: 'Live Now',
    color: 'from-blue-950/60 to-slate-900',
  },
  {
    id: 'SESS-102',
    code: 'VIRT-102',
    title: 'Quadratic Polynomial Factorization',
    hindiTitle: 'द्विघात बहुपद गुणनखंड विधि',
    subject: 'Mathematics',
    grade: 'Class 9-B',
    instructor: 'Prof. Rajesh Sharma',
    time: '02:00 PM – 02:45 PM',
    attendees: 42,
    status: 'Upcoming',
    color: 'from-amber-950/60 to-slate-900',
  },
  {
    id: 'SESS-103',
    code: 'VIRT-103',
    title: 'Organic Chemistry: Alkanes & Haloalkanes',
    hindiTitle: 'कार्बनिक रसायन: एल्केन व हैलोएल्केन',
    subject: 'Chemistry',
    grade: 'Class 12-Sci',
    instructor: 'Dr. Meenakshi Sundaram',
    time: 'Recorded · 52 mins',
    attendees: 128,
    status: 'Recorded',
    color: 'from-emerald-950/60 to-slate-900',
  },
  {
    id: 'SESS-104',
    code: 'VIRT-104',
    title: 'Human Physiology & Neural Coordination',
    hindiTitle: 'मानव शरीर विज्ञान व तंत्रिका समन्वय',
    subject: 'Biology',
    grade: 'Class 11-Bio',
    instructor: 'Dr. Anita Desai',
    time: 'Recorded · 48 mins',
    attendees: 94,
    status: 'Recorded',
    color: 'from-purple-950/60 to-slate-900',
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
  const { addNotification, language } = useGlobalStore();
  const isHindi = language === 'hi';
  const [activeModal, setActiveModal] = React.useState<OnlineSessionCard | null>(null);

  const standalonePort = '8016';
  const standaloneUrl = `http://localhost:${standalonePort}`;

  const handleLaunchStandalone = () => {
    window.open(standaloneUrl, '_blank', 'noopener,noreferrer');
    addNotification({
      title: isHindi ? 'ई-कक्षा पोर्टल खोला जा रहा है' : 'Opening E-Classroom Portal',
      description: isHindi ? 'पोर्ट 8016 पर स्टैंडअलोन पोर्टल पर भेजा जा रहा है।' : 'Redirecting to dedicated e-class portal on port 8016.',
      type: 'info',
    });
  };

  return (
    <VFPageContainer className="space-y-4">
      {/* ── TOP HEADER / LAUNCH BANNER ── */}
      <VFPageHeader
        title={isHindi ? 'ई-कक्षा व लाइव क्लासरूम हब' : 'Virtual E-Classroom & Live Meeting Hub'}
        description={
          isHindi
            ? 'लाइव वीडियो कक्षाएं, इंटरएक्टिव व्हाइटबोर्ड, रिकॉर्डेड व्याख्यान और फॉर्मूला रिपॉजिटरी (Port: 8016)'
            : 'Live video classrooms, interactive whiteboard, lecture recording repository, and academic formulas (Port: 8016)'
        }
        actions={
          <div className="flex items-center gap-2">
            <VFButton
              size="sm"
              variant="outline"
              onClick={handleLaunchStandalone}
              className="text-xs font-semibold gap-1.5 border-border/80 bg-[#121212] hover:bg-[#1a1a1a]"
              leftIcon={<ExternalLink className="w-3.5 h-3.5 text-primary" />}
            >
              {isHindi ? 'नये टैब में खोलें' : 'Open in New Window'}
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleLaunchStandalone}
              className="text-xs font-bold gap-1.5 bg-primary hover:bg-primary/90 text-white shadow-xs"
              leftIcon={<Video className="w-3.5 h-3.5" />}
            >
              {isHindi ? 'ई-कक्षा पोर्टल लॉन्च करें' : 'Launch E-Class Portal'}
            </VFButton>
          </div>
        }
      />

      {/* ── HIGH LEVEL KPI STATS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <VFStatCard
          title={isHindi ? 'लाइव सत्र चालू' : 'Live Sessions Running'}
          value="2 Classes"
          trend="up"
          trendLabel={isHindi ? '76 छात्र जुड़े हैं' : '76 Students connected'}
          icon={<Radio className="w-5 h-5 text-rose-400 animate-pulse" />}
        />
        <VFStatCard
          title={isHindi ? 'रिकॉर्डेड व्याख्यान' : 'Recorded Lectures'}
          value="142 Videos"
          trend="up"
          trendLabel={isHindi ? '+8 इस सप्ताह' : '+8 this week'}
          icon={<PlayCircle className="w-5 h-5 text-primary" />}
        />
        <VFStatCard
          title={isHindi ? 'औसत उपस्थिति दर' : 'Avg Virtual Attendance'}
          value="94.2%"
          trend="neutral"
          trendLabel={isHindi ? 'उत्कृष्ट सहभागिता' : 'High engagement'}
          icon={<Users className="w-5 h-5 text-emerald-400" />}
        />
        <VFStatCard
          title={isHindi ? 'सबसिस्टम स्थिति' : 'Subsystem Status'}
          value="Port 8016"
          trend="up"
          trendLabel="Ready for standalone hosting"
          icon={<ShieldCheck className="w-5 h-5 text-cyan-400" />}
        />
      </div>

      {/* ── FEATURED SESSIONS ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-foreground">
              {isHindi ? 'सक्रिय व आगामी वर्चुअल कक्षाएं' : 'Active & Upcoming Virtual Classroom Sessions'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'दैनिक ऑनलाइन वीडियो सत्र और लाइव रूम' : 'Daily scheduled online video sessions and live rooms'}
            </p>
          </div>
          <button
            onClick={handleLaunchStandalone}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isHindi ? 'पूरा पोर्टल देखें' : 'View Full Hub'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {FEATURED_SESSIONS.map((sess) => (
            <div
              key={sess.id}
              onClick={() => setActiveModal(sess)}
              className="p-3.5 rounded-[4px] border border-border/80 bg-[#121212] hover:bg-[#181818] hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-[3px] bg-[#1a1a1a] border border-border text-[10.5px] font-mono font-bold text-primary">
                    {sess.code}
                  </span>
                  <VFBadge variant={sess.status === 'Live Now' ? 'danger' : sess.status === 'Upcoming' ? 'warning' : 'outline'}>
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
        title={isHindi ? 'हाल ही में रिकॉर्ड किए गए व्याख्यान' : 'Recent On-Demand Recorded Lectures'}
        description={
          isHindi
            ? 'कक्षावार डिजिटल व्याख्यान, व्हाइटबोर्ड नोट्स व रिवीजन सामग्री।'
            : 'Class-wise digital lectures, whiteboard annotations, and formula cheat sheets.'
        }
        actions={
          <VFButton
            size="sm"
            onClick={handleLaunchStandalone}
            className="text-xs font-bold gap-1 bg-primary text-white"
            leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
          >
            {isHindi ? 'प्लेयर में खोलें' : 'Open in Player'}
          </VFButton>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'शीर्षक' : 'Lecture Title'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'कक्षा' : 'Grade'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'शिक्षक' : 'Instructor'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'अवधि' : 'Duration'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'व्यूज' : 'Views'}</th>
                <th className="py-2.5 px-3 text-right">{isHindi ? 'एक्शन' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {RECENT_RECORDINGS.map((rec) => (
                <tr key={rec.id} className="hover:bg-[#161616] transition-colors">
                  <td className="py-2.5 px-3 font-bold text-foreground">{rec.title}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{rec.grade}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{rec.instructor}</td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">{rec.duration}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">{rec.views} views</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={handleLaunchStandalone}
                      className="px-2.5 py-1 rounded-[3px] bg-[#1a1a1a] hover:bg-[#252525] border border-border text-[11px] font-bold text-primary transition-colors cursor-pointer"
                    >
                      {isHindi ? 'देखें' : 'Play'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* ── SESSION DETAILS MODAL ── */}
      {activeModal && (
        <VFDialog
          isOpen={Boolean(activeModal)}
          onClose={() => setActiveModal(null)}
          title={isHindi ? activeModal.hindiTitle : activeModal.title}
          description={`${activeModal.grade} · ${activeModal.subject} · ${activeModal.instructor}`}
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton variant="outline" size="sm" onClick={() => setActiveModal(null)}>
                {isHindi ? 'बंद करें' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={() => {
                  setActiveModal(null);
                  handleLaunchStandalone();
                }}
                className="font-bold bg-primary text-white"
                leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                {isHindi ? 'क्लास रूम में प्रवेश करें' : 'Enter Class Room'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'सत्र कोड:' : 'Session Code:'}</span>
                <span className="font-mono font-bold text-primary">{activeModal.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'शेड्यूल्ड समय:' : 'Scheduled Time:'}</span>
                <span className="font-mono text-foreground">{activeModal.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'उपस्थित छात्र:' : 'Registered Attendees:'}</span>
                <span className="font-bold text-emerald-400">{activeModal.attendees} Students</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'सबसिस्टम पोर्ट:' : 'Subsystem Port:'}</span>
                <span className="font-mono text-cyan-400">8016</span>
              </div>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
