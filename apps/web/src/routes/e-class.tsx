import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFStatCard,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Video,
  PlayCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Tv,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Download,
  Copy,
  Radio,
} from 'lucide-react';

export const Route = createFileRoute('/e-class')({
  component: EClassOnlineClassPage,
});

interface OnlineSession {
  code: string;
  title: string;
  grade: string;
  subject: string;
  host: string;
  time: string;
  platform: 'VidyaClass Live' | 'Zoom Integration' | 'Google Meet';
  attendees: number;
  status: 'Live Now' | 'Upcoming' | 'Completed';
  meetingLink: string;
}

interface RecordedLecture {
  id: string;
  title: string;
  subject: string;
  grade: string;
  instructor: string;
  duration: string;
  date: string;
  views: number;
  fileSize: string;
}

const INITIAL_SESSIONS: OnlineSession[] = [
  {
    code: 'VIRT-101',
    title: 'Class 10 Physics: Ray Optics & Lens Formula Revision',
    grade: 'Class 10-A',
    subject: 'Physics',
    host: 'Dr. Sarah Connor',
    time: '10:00 AM – 10:45 AM',
    platform: 'VidyaClass Live',
    attendees: 38,
    status: 'Live Now',
    meetingLink: 'https://meet.vidyafloww.org/room/phys-10a',
  },
  {
    code: 'VIRT-102',
    title: 'Class 9 Math: Quadratic Polynomial Factorization',
    grade: 'Class 9-B',
    subject: 'Mathematics',
    host: 'Prof. Rajesh Sharma',
    time: '02:00 PM – 02:45 PM',
    platform: 'VidyaClass Live',
    attendees: 0,
    status: 'Upcoming',
    meetingLink: 'https://meet.vidyafloww.org/room/math-9b',
  },
  {
    code: 'VIRT-103',
    title: 'Class 11 Chemistry: Organic Reaction Mechanisms Lab',
    grade: 'Class 11-Sci',
    subject: 'Chemistry',
    host: 'Mr. Vikram Singh',
    time: '03:30 PM – 04:15 PM',
    platform: 'Zoom Integration',
    attendees: 0,
    status: 'Upcoming',
    meetingLink: 'https://zoom.us/j/9847120938',
  },
  {
    code: 'VIRT-099',
    title: 'Class 12 Biology: Genetics & Inheritance Principles',
    grade: 'Class 12-Sci',
    subject: 'Biology',
    host: 'Dr. Anita Desai',
    time: 'Yesterday, 11:00 AM',
    platform: 'VidyaClass Live',
    attendees: 35,
    status: 'Completed',
    meetingLink: 'https://meet.vidyafloww.org/archive/bio-12',
  },
];

const RECORDED_VAULT: RecordedLecture[] = [
  { id: 'REC-201', title: 'Newton’s Laws of Motion & Friction Mechanics', subject: 'Physics', grade: 'Class 10', instructor: 'Dr. Sarah Connor', duration: '44:12', date: '04 Sep 2026', views: 84, fileSize: '280 MB' },
  { id: 'REC-202', title: 'Coordinate Geometry & Straight Line Distance Formula', subject: 'Mathematics', grade: 'Class 9', instructor: 'Prof. Rajesh Sharma', duration: '41:50', date: '03 Sep 2026', views: 92, fileSize: '245 MB' },
  { id: 'REC-203', title: 'Periodic Classification & Chemical Bonding Dynamics', subject: 'Chemistry', grade: 'Class 10', instructor: 'Mr. Vikram Singh', duration: '47:30', date: '01 Sep 2026', views: 110, fileSize: '315 MB' },
  { id: 'REC-204', title: 'Cell Structure & Membrane Permeability', subject: 'Biology', grade: 'Class 9', instructor: 'Dr. Anita Desai', duration: '38:15', date: '28 Aug 2026', views: 76, fileSize: '210 MB' },
];

function EClassOnlineClassPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'ई-क्लास' : 'E-Class') + ' – VidyaFloww';
  }, [isHindi]);

  const [sessions, setSessions] = React.useState<OnlineSession[]>(INITIAL_SESSIONS);
  const [recordings] = React.useState<RecordedLecture[]>(RECORDED_VAULT);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);
  const [activeLiveModal, setActiveLiveModal] = React.useState<OnlineSession | null>(null);

  // New session form
  const [formTitle, setFormTitle] = React.useState('');
  const [formGrade, setFormGrade] = React.useState('Class 10-A');
  const [formSubject, setFormSubject] = React.useState('Physics');
  const [formTime, setFormTime] = React.useState('11:00 AM – 11:45 AM');
  const [formPlatform, setFormPlatform] = React.useState<'VidyaClass Live' | 'Zoom Integration' | 'Google Meet'>('VidyaClass Live');

  // Simulated classroom control
  const [isMicMuted, setIsMicMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);

  const handleScheduleClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newSession: OnlineSession = {
      code: `VIRT-${Math.floor(100 + Math.random() * 900)}`,
      title: formTitle.trim(),
      grade: formGrade,
      subject: formSubject,
      host: 'Faculty Host',
      time: formTime,
      platform: formPlatform,
      attendees: 0,
      status: 'Upcoming',
      meetingLink: `https://meet.vidyafloww.org/room/${formSubject.toLowerCase()}-${Date.now().toString().slice(-4)}`,
    };

    setSessions([newSession, ...sessions]);
    setIsScheduleModalOpen(false);
    setFormTitle('');
    addNotification({
      title: isHindi ? 'ऑनलाइन कक्षा शेड्यूल की गई' : 'Live Class Scheduled',
      description: `"${newSession.title}" has been added to timetable.`,
      type: 'success',
    });
  };

  // ----------------------------------------------------
  // TAB 1: Live Class Timetable
  // ----------------------------------------------------
  const timetableContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'लाइव व आगामी वर्चुअल व्याख्यान' : 'Live & Scheduled Virtual Lecture Sessions'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'विद्याक्लास एचडी वेबआरटीसी, ज़ूम व गूगल मीट सत्र' : 'Real-time WebRTC sessions, attendee counters, and invite links'}
          </p>
        </div>
        <VFButton
          size="sm"
          leftIcon={<Plus className="h-3.5 w-3.5" />}
          onClick={() => setIsScheduleModalOpen(true)}
          className="rounded-md font-bold"
        >
          {isHindi ? 'क्लास शेड्यूल करें' : 'Schedule Class'}
        </VFButton>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'सत्र कोड' : 'Session Code'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'व्याख्यान शीर्षक' : 'Lecture Title'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'कक्षा / सेक्शन' : 'Grade'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'शिक्षक' : 'Instructor'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'शेड्यूल समय' : 'Time'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'प्लेटफ़ॉर्म' : 'Platform'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'उपस्थिति' : 'Attendees'}</th>
                <th className="py-2.5 px-3">{t('col.status')}</th>
                <th className="py-2.5 px-3 text-right">{t('col.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {sessions.map((item) => (
                <tr key={item.code} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">{item.code}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground max-w-[240px] truncate">{item.title}</td>
                  <td className="py-2.5 px-3 font-medium text-foreground">{item.grade}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{item.host}</td>
                  <td className="py-2.5 px-3 text-muted-foreground font-mono">{item.time}</td>
                  <td className="py-2.5 px-3">
                    <VFBadge variant="outline" className="text-[10px] font-medium">{item.platform}</VFBadge>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-foreground">
                    {item.status === 'Live Now' ? (
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {item.attendees} Live
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-mono">{item.attendees}</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <VFBadge
                      variant={item.status === 'Live Now' ? 'danger' : item.status === 'Upcoming' ? 'primary' : 'success'}
                      className="text-[10px]"
                    >
                      {item.status}
                    </VFBadge>
                  </td>
                  <td className="py-2.5 px-3 text-right space-x-1.5">
                    {item.status === 'Live Now' ? (
                      <VFButton
                        size="sm"
                        variant="danger"
                        className="rounded-md text-[11px] h-7 px-2.5 font-bold"
                        leftIcon={<Radio className="h-3 w-3" />}
                        onClick={() => setActiveLiveModal(item)}
                      >
                        {isHindi ? 'ज्वाइन करें' : 'Join Room'}
                      </VFButton>
                    ) : item.status === 'Upcoming' ? (
                      <VFButton
                        size="sm"
                        variant="outline"
                        className="rounded-md text-[11px] h-7 px-2"
                        leftIcon={<Copy className="h-3 w-3" />}
                        onClick={() => {
                          navigator.clipboard.writeText(item.meetingLink);
                          addNotification({
                            title: isHindi ? 'लिंक कॉपी किया गया' : 'Link Copied',
                            description: 'Meeting invitation link copied to clipboard.',
                            type: 'info',
                          });
                        }}
                      >
                        {isHindi ? 'लिंक' : 'Copy Link'}
                      </VFButton>
                    ) : (
                      <VFButton
                        size="sm"
                        variant="outline"
                        className="rounded-md text-[11px] h-7 px-2"
                        leftIcon={<PlayCircle className="h-3 w-3" />}
                      >
                        {isHindi ? 'रिकॉर्डिंग' : 'Replay'}
                      </VFButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 2: Launch Virtual Room (Live Engine)
  // ----------------------------------------------------
  const launchContent = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-3">
        <VFCard title={isHindi ? 'वर्चुअल क्लासरूम ट्रांसमीटर' : 'VidyaClass WebRTC HD Studio'} className="rounded-md">
          <div className="relative aspect-video bg-[#0a0a0a] border border-border/80 rounded-md flex flex-col items-center justify-center overflow-hidden">
            {isVideoOff ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <VideoOff className="h-10 w-10 text-muted-foreground/60" />
                <span className="text-xs font-semibold">Camera is currently turned off</span>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-sm bg-rose-600 text-white font-mono text-[10px] font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      LIVE WEBRTC
                    </span>
                    <span className="text-xs text-white font-bold">Class 10 Physics: Ray Optics Revision</span>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 bg-black/60 px-2 py-0.5 rounded-sm border border-border/50">
                    38 Students Connected
                  </span>
                </div>

                <div className="text-center py-10">
                  <p className="text-xs text-muted-foreground font-mono">
                    [ Interactive Whiteboard &amp; HD Video Streaming Active ]
                  </p>
                </div>

                {/* Live Controls */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMicMuted(!isMicMuted)}
                    className={`p-2 rounded-md border ${isMicMuted ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-[#1e1e1e] border-border text-foreground hover:bg-[#252525]'}`}
                  >
                    {isMicMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-2 rounded-md border ${isVideoOff ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-[#1e1e1e] border-border text-foreground hover:bg-[#252525]'}`}
                  >
                    {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  </button>
                  <VFButton
                    size="sm"
                    variant="outline"
                    className="rounded-md text-xs font-bold"
                    leftIcon={<Share2 className="h-3.5 w-3.5" />}
                  >
                    Share Screen
                  </VFButton>
                  <VFButton
                    size="sm"
                    variant="danger"
                    className="rounded-md text-xs font-bold"
                    onClick={() => {
                      addNotification({
                        title: 'Live Session Concluded',
                        description: 'Recording processing initiated in digital vault.',
                        type: 'info',
                      });
                    }}
                  >
                    End Class
                  </VFButton>
                </div>
              </div>
            )}
          </div>
        </VFCard>
      </div>

      <div className="lg:col-span-1 space-y-3">
        <VFCard title={isHindi ? 'सक्रिय सहभागिता' : 'Active Participants (38)'} className="rounded-md">
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 text-xs">
            {[
              { name: 'Rahul Sharma', roll: 'Roll #42', status: 'Mic Off', ping: '24ms' },
              { name: 'Priya Verma', roll: 'Roll #18', status: 'Active', ping: '19ms' },
              { name: 'Amit Kumar', roll: 'Roll #05', status: 'Active', ping: '31ms' },
              { name: 'Sneha Patel', roll: 'Roll #29', status: 'Hand Raised', ping: '22ms' },
              { name: 'Karan Singh', roll: 'Roll #14', status: 'Mic Off', ping: '28ms' },
              { name: 'Ananya Roy', roll: 'Roll #03', status: 'Active', ping: '18ms' },
            ].map((st, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-md bg-[#141414] border border-border/70">
                <div>
                  <p className="font-bold text-foreground">{st.name}</p>
                  <p className="text-[10px] text-muted-foreground">{st.roll}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold ${st.status === 'Hand Raised' ? 'text-amber-400' : 'text-muted-foreground'}`}>
                    {st.status}
                  </span>
                  <p className="text-[9px] font-mono text-emerald-400">{st.ping}</p>
                </div>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 3: Recorded Lectures Vault
  // ----------------------------------------------------
  const vaultContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'ऑन-डिमांड वीडियो लाइब्रेरी' : 'Recorded Lecture Archive & Study Materials'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'छात्रों के लिए 24/7 उपलब्ध रिकॉर्डेड कक्षाएं व नोट्स' : 'High-definition recordings with automatic chapter marks and downloadable notes'}
          </p>
        </div>
        <VFBadge variant="outline" className="font-mono text-xs w-fit">
          142 Total Lectures Saved
        </VFBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {recordings.map((rec) => (
          <div key={rec.id} className="p-3.5 rounded-md border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <VFBadge variant="outline" className="text-[10px] font-mono">{rec.grade}</VFBadge>
                  <span className="text-[11px] font-semibold text-primary">{rec.subject}</span>
                </div>
                <h4 className="text-xs font-bold text-foreground line-clamp-1">{rec.title}</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">{rec.instructor} · {rec.date}</p>
              </div>
              <div className="p-2 rounded-md bg-[#161616] text-primary border border-border/60">
                <PlayCircle className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/60 pt-2.5 mt-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {rec.duration} ({rec.views} views)
              </span>
              <div className="flex items-center gap-2">
                <VFButton size="sm" variant="outline" className="h-6 px-2 text-[10px] rounded-sm" leftIcon={<Download className="h-2.5 w-2.5" />}>
                  Notes ({rec.fileSize})
                </VFButton>
                <VFButton size="sm" className="h-6 px-2 text-[10px] rounded-sm font-bold">
                  Play
                </VFButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'timetable', label: isHindi ? 'टाइमटेबल व सत्र' : 'Sessions Timetable', icon: <Calendar className="h-4 w-4" />, content: timetableContent },
    { id: 'launch', label: isHindi ? 'लाइव क्लासरूम' : 'Launch Virtual Room', icon: <Tv className="h-4 w-4" />, content: launchContent },
    { id: 'vault', label: isHindi ? 'रिकॉर्डेड लेक्चर्स' : 'Recorded Vault', icon: <PlayCircle className="h-4 w-4" />, content: vaultContent },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── Header Toolbar ── */}
      <div className="p-3.5 rounded-md bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
            <Video className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-foreground tracking-tight">
                {isHindi ? 'ई-क्लास' : 'E-Class'}
              </span>
              <VFBadge variant="success" className="text-[10px] font-bold font-mono">
                {isHindi ? 'WebRTC लाइव सक्षम' : 'WebRTC HD Live'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'वर्चुअल क्लासरूम, लाइव व्याख्यान टाइमटेबल, रिकॉर्डेड लेक्चर लाइब्रेरी' : 'Live video classroom lectures, virtual attendance & on-demand lecture vault'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setIsScheduleModalOpen(true)}
            className="rounded-md font-bold"
          >
            {isHindi ? 'सत्र शेड्यूल करें' : 'Schedule Live Class'}
          </VFButton>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <VFStatCard
          title={isHindi ? 'सक्रिय लाइव कक्षाएं' : 'Live Classes Running'}
          value="1 Session"
          icon={<Radio className="h-4.5 w-4.5 text-rose-500" />}
          trend="up"
          trendLabel="38 students active"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'आज के सत्र' : 'Today’s Sessions'}
          value="8 Classes"
          icon={<Calendar className="h-4.5 w-4.5 text-primary" />}
          trend="neutral"
          trendLabel="Grades 9 - 12"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'रिकॉर्डेड लेक्चर्स' : 'Recorded Vault'}
          value="142 Videos"
          icon={<PlayCircle className="h-4.5 w-4.5 text-emerald-500" />}
          trend="up"
          trendLabel="24/7 on demand"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'औसत वर्चुअल उपस्थिति' : 'Avg Virtual Attendance'}
          value="94.2%"
          icon={<CheckCircle2 className="h-4.5 w-4.5 text-purple-400" />}
          trend="up"
          trendLabel="+3.4% this month"
          className="rounded-md"
        />
      </div>

      {/* ── Tabs Navigation ── */}
      <VFTabs items={tabs} defaultTabId="timetable" variant="top-bar" />

      {/* ── Schedule Class Dialog ── */}
      <VFDialog
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title={isHindi ? 'नई ऑनलाइन क्लास शेड्यूल करें' : 'Schedule Online Live Class'}
        description={isHindi ? 'वर्चुअल सत्र का शीर्षक, कक्षा, समय व इंजन चुनें' : 'Configure room title, grade section, schedule time, and meeting engine'}
        className="max-w-md rounded-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsScheduleModalOpen(false)}
              className="rounded-md"
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={handleScheduleClass}
              disabled={!formTitle.trim()}
              className="rounded-md font-bold"
            >
              {isHindi ? 'शेड्यूल करें' : 'Schedule Session'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleScheduleClass} className="space-y-3 text-xs mt-1">
          <div>
            <label className="block font-bold text-foreground mb-1">
              {isHindi ? 'व्याख्यान शीर्षक' : 'Session / Lecture Title'}
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Class 10 Physics Optics Revision"
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'कक्षा व सेक्शन' : 'Grade'}</label>
              <select
                value={formGrade}
                onChange={(e) => setFormGrade(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Class 9-A">Class 9-A</option>
                <option value="Class 9-B">Class 9-B</option>
                <option value="Class 10-A">Class 10-A</option>
                <option value="Class 11-Sci">Class 11-Sci</option>
                <option value="Class 12-Sci">Class 12-Sci</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'विषय' : 'Subject'}</label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'समय स्लॉट' : 'Time Slot'}</label>
              <input
                type="text"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                placeholder="10:00 AM – 10:45 AM"
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'प्लेटफ़ॉर्म इंजन' : 'Platform Engine'}</label>
              <select
                value={formPlatform}
                onChange={(e: any) => setFormPlatform(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="VidyaClass Live">VidyaClass Live (WebRTC HD)</option>
                <option value="Zoom Integration">Zoom Integration</option>
                <option value="Google Meet">Google Meet</option>
              </select>
            </div>
          </div>
        </form>
      </VFDialog>

      {/* ── Join Room Dialog ── */}
      {activeLiveModal && (
        <VFDialog
          isOpen={true}
          onClose={() => setActiveLiveModal(null)}
          title={`Connecting to ${activeLiveModal.title}`}
          description="Connecting you securely to the encrypted WebRTC live media stream..."
          className="max-w-md rounded-md"
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setActiveLiveModal(null)}
                className="rounded-md"
              >
                {t('action.close')}
              </VFButton>
              <VFButton
                variant="danger"
                size="sm"
                leftIcon={<Radio className="h-3.5 w-3.5" />}
                onClick={() => {
                  setActiveLiveModal(null);
                  addNotification({
                    title: 'Joined Live Classroom',
                    description: `Connected to ${activeLiveModal.code} stream.`,
                    type: 'success',
                  });
                }}
                className="rounded-md font-bold"
              >
                Enter Audio &amp; Video Room
              </VFButton>
            </div>
          }
        >
          <div className="p-3 bg-[#141414] border border-border/80 rounded-md space-y-2 text-xs text-muted-foreground">
            <p>Session: <strong className="text-foreground">{activeLiveModal.code}</strong></p>
            <p>Host: <strong className="text-foreground">{activeLiveModal.host}</strong></p>
            <p>Attendees: <strong className="text-emerald-400">{activeLiveModal.attendees} Students currently online</strong></p>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
