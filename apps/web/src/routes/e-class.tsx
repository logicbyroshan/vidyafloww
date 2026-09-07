import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFDrawer,
} from '@vidyafloww/ui';
import {
  PlayCircle,
  Calendar,
  Plus,
  Download,
  Copy,
  Radio,
  ExternalLink,
} from 'lucide-react';

export const Route = createFileRoute('/e-class')({
  component: EClassPage,
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

function EClassPage() {
  const navigate = useNavigate();
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'ई-क्लास' : 'E-Class') + ' – VidyaFloww';
  }, [isHindi]);

  const [activeTab, setActiveTab] = React.useState<'timetable' | 'vault'>('timetable');
  const [sessions, setSessions] = React.useState<OnlineSession[]>(INITIAL_SESSIONS);
  const [recordings] = React.useState<RecordedLecture[]>(RECORDED_VAULT);
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = React.useState(false);

  // New session form
  const [formTitle, setFormTitle] = React.useState('');
  const [formGrade, setFormGrade] = React.useState('Class 10-A');
  const [formSubject, setFormSubject] = React.useState('Physics');
  const [formDate, setFormDate] = React.useState('Today');
  const [formTime, setFormTime] = React.useState('11:00 AM – 11:45 AM');
  const [formPlatform, setFormPlatform] = React.useState<'VidyaClass Live' | 'Zoom Integration' | 'Google Meet'>('VidyaClass Live');
  const [formDescription, setFormDescription] = React.useState('');
  const [autoRecord, setAutoRecord] = React.useState(true);
  const [muteOnEntry, setMuteOnEntry] = React.useState(true);
  const [notifyParents, setNotifyParents] = React.useState(true);

  const handleScheduleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formTitle.trim()) return;

    const newSession: OnlineSession = {
      code: `VIRT-${Math.floor(100 + Math.random() * 900)}`,
      title: formTitle.trim(),
      grade: formGrade,
      subject: formSubject,
      host: 'Faculty Member',
      time: `${formDate}, ${formTime}`,
      platform: formPlatform,
      attendees: 0,
      status: 'Upcoming',
      meetingLink: `https://meet.vidyafloww.org/room/${formGrade.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    };

    setSessions([newSession, ...sessions]);
    setIsScheduleDrawerOpen(false);
    setFormTitle('');
    setFormDescription('');
    addNotification({
      title: isHindi ? 'ई-क्लास शेड्यूल हुई' : 'E-Class Scheduled Successfully',
      description: `Session "${newSession.title}" added to academic timetable.`,
      type: 'success',
    });
  };

  const handleJoinRoom = (sessionCode: string) => {
    navigate({
      to: '/live-room',
      search: { session: sessionCode },
    });
  };

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── SINGLE UNIFIED HEADER (No Double Header, No Stat Cards) ── */}
      <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: 2 Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70">
            <button
              type="button"
              id="tab-timetable"
              onClick={() => setActiveTab('timetable')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'timetable'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              {isHindi ? 'लाइव टाइमटेबल व सत्र' : 'Live Timetable & Sessions'}
            </button>
            <button
              type="button"
              id="tab-vault"
              onClick={() => setActiveTab('vault')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <PlayCircle className="h-3.5 w-3.5" />
              {isHindi ? 'रिकॉर्डेड लेक्चर्स' : 'Recorded Vault'}
            </button>
          </div>

          <div className="h-5 w-[1px] bg-border/80 hidden sm:block" />
          <VFBadge variant="success" className="font-mono text-xs hidden sm:inline-flex rounded-[3px]">
            {isHindi ? 'WebRTC लाइव' : 'WebRTC HD Live'}
          </VFBadge>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => setIsScheduleDrawerOpen(true)}
            className="h-8 px-3 text-xs font-bold shadow-xs rounded-[4px]"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? '+ क्लास शेड्यूल करें' : '+ Schedule E-Class'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: LIVE TIMETABLE & SESSIONS
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'timetable' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
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
                        <VFBadge variant="outline" className="text-[10px] font-medium rounded-[3px]">{item.platform}</VFBadge>
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
                          className="text-[10px] rounded-[3px]"
                        >
                          {item.status}
                        </VFBadge>
                      </td>
                      <td className="py-2.5 px-3 text-right space-x-1.5">
                        {item.status === 'Live Now' ? (
                          <VFButton
                            size="sm"
                            variant="danger"
                            className="rounded-[3px] text-[11px] h-7 px-2.5 font-bold shadow-xs"
                            leftIcon={<Radio className="h-3 w-3 animate-pulse" />}
                            onClick={() => handleJoinRoom(item.code)}
                          >
                            {isHindi ? 'ज्वाइन करें' : 'Join Room'}
                          </VFButton>
                        ) : item.status === 'Upcoming' ? (
                          <div className="inline-flex items-center gap-1.5">
                            <VFButton
                              size="sm"
                              variant="outline"
                              className="rounded-[3px] text-[11px] h-7 px-2.5 font-bold"
                              leftIcon={<Copy className="h-3 w-3" />}
                              onClick={() => {
                                navigator.clipboard?.writeText(item.meetingLink);
                                addNotification({
                                  title: isHindi ? 'लिंक कॉपी हुआ' : 'Invite Link Copied',
                                  description: item.meetingLink,
                                  type: 'info',
                                });
                              }}
                            >
                              {isHindi ? 'लिंक' : 'Copy'}
                            </VFButton>
                            <VFButton
                              size="sm"
                              className="rounded-[3px] text-[11px] h-7 px-2.5 font-bold"
                              leftIcon={<ExternalLink className="h-3 w-3" />}
                              onClick={() => handleJoinRoom(item.code)}
                            >
                              {isHindi ? 'प्रारंभ' : 'Start'}
                            </VFButton>
                          </div>
                        ) : (
                          <VFButton
                            size="sm"
                            variant="ghost"
                            className="rounded-[3px] text-[11px] h-7 px-2"
                            onClick={() => {
                              setActiveTab('vault');
                            }}
                          >
                            {isHindi ? 'रिकॉर्डिंग देखें' : 'View Archive'}
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
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 2: RECORDED LECTURE VAULT
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'vault' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recordings.map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-[4px] border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-[3px] bg-[#111111] border border-border/60 flex items-center justify-center mb-2.5 overflow-hidden group">
                    <PlayCircle className="h-9 w-9 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
                    <span className="absolute bottom-1.5 right-1.5 font-mono text-[10px] bg-black/80 text-foreground px-1.5 py-0.5 rounded-[2px]">
                      {rec.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-snug">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {rec.instructor} · <span className="font-semibold text-foreground">{rec.grade}</span>
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{rec.views} views · {rec.fileSize}</span>
                  <div className="flex items-center gap-1">
                    <VFButton
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 rounded-[2px]"
                      title="Download Notes & Video"
                      onClick={() => {
                        addNotification({
                          title: isHindi ? 'डाउनलोड शुरू हुआ' : 'Download Started',
                          description: `${rec.title} notes PDF & MP4.`,
                          type: 'info',
                        });
                      }}
                    >
                      <Download className="h-3 w-3" />
                    </VFButton>
                    <VFButton
                      size="sm"
                      className="h-6 px-2 text-[10px] rounded-[3px] font-bold"
                      onClick={() => {
                        addNotification({
                          title: isHindi ? 'प्लेयर शुरू हुआ' : 'Playing Lecture',
                          description: rec.title,
                          type: 'info',
                        });
                      }}
                    >
                      Play
                    </VFButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SCHEDULE E-CLASS SLIDE-OVER DRAWER (Requested: Open Drawer)
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDrawer
        isOpen={isScheduleDrawerOpen}
        onClose={() => setIsScheduleDrawerOpen(false)}
        title={isHindi ? 'नई ई-क्लास शेड्यूल करें' : 'Schedule Virtual E-Class'}
        description={isHindi ? 'कक्षा, विषय, समय, इंजन व डिजिटल क्लासरूम सेटिंग्स कॉन्फ़िगर करें' : 'Configure live room parameters, curriculum topic, schedule window and engine'}
        className="max-w-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsScheduleDrawerOpen(false)}
              className="rounded-[3px]"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleScheduleSubmit}
              className="rounded-[3px]"
            >
              {isHindi ? 'शेड्यूल कन्फर्म करें' : 'Confirm Schedule'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-3.5 py-1 text-xs">
          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {isHindi ? 'व्याख्यान शीर्षक व विषय' : 'Lecture / Session Title'}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 4 Motion: Force & Laws of Physics"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'कक्षा' : 'Grade & Section'}
              </label>
              <select
                value={formGrade}
                onChange={(e) => setFormGrade(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Class 9-A">Class 9-A</option>
                <option value="Class 9-B">Class 9-B</option>
                <option value="Class 10-A">Class 10-A</option>
                <option value="Class 10-B">Class 10-B</option>
                <option value="Class 11-Sci">Class 11-Sci</option>
                <option value="Class 12-Sci">Class 12-Sci</option>
              </select>
            </div>

            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'विषय' : 'Subject'}
              </label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'तारीख' : 'Date'}
              </label>
              <select
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'समय स्लॉट' : 'Time Window'}
              </label>
              <input
                type="text"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                placeholder="10:00 AM – 10:45 AM"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {isHindi ? 'मीटिंग इंजन' : 'Streaming Platform'}
            </label>
            <select
              value={formPlatform}
              onChange={(e) => setFormPlatform(e.target.value as any)}
              className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
            >
              <option value="VidyaClass Live">VidyaClass Live (WebRTC HD Studio)</option>
              <option value="Zoom Integration">Zoom Cloud Integration</option>
              <option value="Google Meet">Google Meet Integration</option>
            </select>
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {isHindi ? 'पाठ विवरण व निर्देश' : 'Lesson Overview & Preparation'}
            </label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Keep Chapter 4 NCERT book ready. Homework review will precede numerical solving."
              className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>

          {/* Smart Classroom Permissions */}
          <div className="p-3 rounded-[3px] bg-[#141414] border border-border/80 space-y-2.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
              {isHindi ? 'वर्चुअल क्लासरूम नियंत्रण' : 'Classroom Policies & Controls'}
            </span>

            <label className="flex items-center justify-between text-xs cursor-pointer">
              <span className="text-foreground">{isHindi ? 'छात्रों का माइक प्रारंभ में म्यूट रखें' : 'Mute student microphones on entry'}</span>
              <input
                type="checkbox"
                checked={muteOnEntry}
                onChange={(e) => setMuteOnEntry(e.target.checked)}
                className="rounded-[2px] accent-primary"
              />
            </label>

            <label className="flex items-center justify-between text-xs cursor-pointer">
              <span className="text-foreground">{isHindi ? 'क्लाउड रिकॉर्डिंग स्वतः प्रारंभ करें' : 'Automatic cloud recording to vault'}</span>
              <input
                type="checkbox"
                checked={autoRecord}
                onChange={(e) => setAutoRecord(e.target.checked)}
                className="rounded-[2px] accent-primary"
              />
            </label>

            <label className="flex items-center justify-between text-xs cursor-pointer">
              <span className="text-foreground">{isHindi ? 'अभिभावक व छात्रों को एसएमएस सूचना' : 'Dispatch SMS & Portal alerts'}</span>
              <input
                type="checkbox"
                checked={notifyParents}
                onChange={(e) => setNotifyParents(e.target.checked)}
                className="rounded-[2px] accent-primary"
              />
            </label>
          </div>
        </form>
      </VFDrawer>
    </VFPageContainer>
  );
}
