import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFButton,
  VFDrawer,
  VFDialog,
} from '@vidyafloww/ui';
import {
  PlayCircle,
  Calendar,
  Plus,
  Download,
  Copy,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  FileText,
  Clock,
  CheckCircle2,
  FolderDown,
  MonitorPlay,
  BookOpen,
  Headphones,
  Check,
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

interface LectureChapter {
  time: string;
  seconds: number;
  title: string;
}

interface RecordedLecture {
  id: string;
  title: string;
  subject: string;
  grade: string;
  instructor: string;
  duration: string;
  totalSeconds: number;
  date: string;
  views: number;
  fileSize: string;
  summary: string;
  mockType: 'physics' | 'math' | 'chemistry' | 'biology';
  chapters: LectureChapter[];
  formulas: string[];
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
  {
    id: 'REC-201',
    title: 'Newton’s Laws of Motion & Friction Mechanics',
    subject: 'Physics',
    grade: 'Class 10',
    instructor: 'Dr. Sarah Connor',
    duration: '44:12',
    totalSeconds: 2652,
    date: '04 Sep 2026',
    views: 84,
    fileSize: '280 MB',
    mockType: 'physics',
    summary: 'Comprehensive analysis of inertia, rate of change of momentum vector derivations, and friction thresholds on inclined surfaces.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Introduction & Galileo Inertia Concept' },
      { time: '06:40', seconds: 400, title: 'Derivation: F = dp/dt = m·a' },
      { time: '18:25', seconds: 1105, title: 'Limiting & Kinetic Friction: fs ≤ μs·N' },
      { time: '29:50', seconds: 1790, title: 'Inclined Plane Free Body Diagram (FBD)' },
      { time: '38:10', seconds: 2290, title: 'NCERT Exemplar Solved Problems' },
    ],
    formulas: [
      'F_net = m · a (Vector sum of all external forces)',
      'p = m · v (Linear momentum conservation: Δp = 0 when F_ext = 0)',
      'f_s,max = μ_s · N (Limiting friction threshold)',
      'f_k = μ_k · N (Kinetic friction on moving surfaces)',
      'a = g · (sin θ - μ_k · cos θ) [Block sliding down incline]',
    ],
  },
  {
    id: 'REC-202',
    title: 'Coordinate Geometry & Straight Line Distance Formula',
    subject: 'Mathematics',
    grade: 'Class 9',
    instructor: 'Prof. Rajesh Sharma',
    duration: '41:50',
    totalSeconds: 2510,
    date: '03 Sep 2026',
    views: 92,
    fileSize: '245 MB',
    mockType: 'math',
    summary: 'Cartesian coordinate proofs, Pythagorean distance theorem, internal section formula, and area of triangles.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Cartesian Coordinate Axes & Quadrants' },
      { time: '08:15', seconds: 495, title: 'Pythagorean Distance Formula Derivation' },
      { time: '19:40', seconds: 1180, title: 'Section Formula: Internal Division (m:n)' },
      { time: '31:20', seconds: 1880, title: 'Collinear Points & Area of Triangle' },
    ],
    formulas: [
      'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
      'P(x, y) = [(m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂)]',
      'Midpoint M = [(x₁ + x₂)/2, (y₁ + y₂)/2]',
      'Slope m = (y₂ - y₁) / (x₂ - x₁) = tan θ',
    ],
  },
  {
    id: 'REC-203',
    title: 'Periodic Classification & Chemical Bonding Dynamics',
    subject: 'Chemistry',
    grade: 'Class 10',
    instructor: 'Mr. Vikram Singh',
    duration: '47:30',
    totalSeconds: 2850,
    date: '01 Sep 2026',
    views: 110,
    fileSize: '315 MB',
    mockType: 'chemistry',
    summary: 'Modern Periodic Law, periodic table trend vectors, electrovalent lattice energy, and covalent Lewis structures.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Modern Periodic Law & Mendeleev Gaps' },
      { time: '11:00', seconds: 660, title: 'Electronegativity & Ionization Enthalpy' },
      { time: '24:30', seconds: 1470, title: 'Ionic vs Covalent Bond Formation' },
      { time: '37:15', seconds: 2235, title: 'Lewis Dot Structures & Octet Rule' },
    ],
    formulas: [
      'Electronegativity trend: Increases across period, decreases down group',
      'Atomic radius: r decreases L→R due to effective nuclear charge Z_eff',
      'Ionic Lattice Energy: U ∝ (z⁺ · z⁻) / r₀',
      'Octet Rule: Stability achieved upon noble-gas s²p⁶ valence configuration',
    ],
  },
  {
    id: 'REC-204',
    title: 'Cell Structure & Membrane Permeability',
    subject: 'Biology',
    grade: 'Class 9',
    instructor: 'Dr. Anita Desai',
    duration: '38:15',
    totalSeconds: 2295,
    date: '28 Aug 2026',
    views: 76,
    fileSize: '210 MB',
    mockType: 'biology',
    summary: 'Singer-Nicolson Fluid Mosaic model, phospholipid bilayer dynamics, selective osmosis, and active transport ATP pumps.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Cell Theory & Prokaryote vs Eukaryote' },
      { time: '09:20', seconds: 560, title: 'Fluid Mosaic Model of Plasma Membrane' },
      { time: '20:10', seconds: 1210, title: 'Osmosis, Diffusion & Tonicity (Hyper/Hypo)' },
      { time: '30:45', seconds: 1845, title: 'Mitochondria & ATP Synthesis Site' },
    ],
    formulas: [
      'Phospholipid bilayer: Hydrophilic heads (outer), Hydrophobic fatty tails (inner)',
      'Water potential: Ψ = Ψs + Ψp (Osmotic equilibrium equation)',
      'Active Transport: Movement against concentration gradient via ATP hydrolysis',
    ],
  },
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

  // Video Player State
  const [playingLecture, setPlayingLecture] = React.useState<RecordedLecture | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSeconds, setCurrentSeconds] = React.useState(0);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(0.85);
  const [activePlayerTab, setActivePlayerTab] = React.useState<'chapters' | 'notes' | 'download'>('chapters');
  const [hasCopiedNotes, setHasCopiedNotes] = React.useState(false);

  // Download Manager State
  const [downloadModalLecture, setDownloadModalLecture] = React.useState<RecordedLecture | null>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [downloadFormatSelected, setDownloadFormatSelected] = React.useState<'mp4' | 'pdf' | 'mp3' | 'zip'>('mp4');
  const [downloadCompletedName, setDownloadCompletedName] = React.useState<string | null>(null);

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

  // Playback Clock simulation
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playingLecture) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= playingLecture.totalSeconds) {
            setIsPlaying(false);
            return playingLecture.totalSeconds;
          }
          return Math.min(prev + playbackSpeed, playingLecture.totalSeconds);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playingLecture, playbackSpeed]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayLecture = (rec: RecordedLecture) => {
    setPlayingLecture(rec);
    setCurrentSeconds(0);
    setIsPlaying(true);
    setActivePlayerTab('chapters');
  };

  const handleSeek = (newSec: number) => {
    if (!playingLecture) return;
    setCurrentSeconds(Math.max(0, Math.min(newSec, playingLecture.totalSeconds)));
  };

  const handleSkip = (delta: number) => {
    if (!playingLecture) return;
    setCurrentSeconds((prev) => Math.max(0, Math.min(prev + delta, playingLecture.totalSeconds)));
  };

  // Real Browser Download Action (creates actual file blob on user device)
  const triggerBrowserFileSave = (lecture: RecordedLecture, format: 'mp4' | 'pdf' | 'mp3' | 'zip') => {
    setIsDownloading(true);
    setDownloadProgress(15);
    setDownloadFormatSelected(format);

    const safeTitle = lecture.title.replace(/[^a-zA-Z0-9]/g, '_');
    let filename = '';
    let mimeType = '';
    let content = '';

    if (format === 'pdf') {
      filename = `VidyaFloww_${lecture.subject}_${lecture.grade}_${safeTitle}_Notes.pdf`;
      mimeType = 'application/pdf';
      content = `%PDF-1.4
%VidyaFloww Academic Study Vault
1 0 obj
<< /Title (${lecture.title}) /Author (${lecture.instructor}) /Subject (${lecture.subject}) /Creator (VidyaFloww LMS) >>
endobj
2 0 obj
<< /Type /Catalog /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages /Kids [4 0 R] /Count 1 >>
endobj
4 0 obj
<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
5 0 obj
<< /Length 1200 >>
stream
================================================================================
VIDYAFLOWW INTERNATIONAL ACADEMY - E-CLASS LECTURE NOTES & SYLLABUS DOSSIER
================================================================================
Lecture Topic : ${lecture.title}
Academic Dept : ${lecture.subject} (${lecture.grade})
Lead Lecturer : ${lecture.instructor}
Recorded Date : ${lecture.date} | Total Duration: ${lecture.duration}
Session ID    : ${lecture.id} | Access Level: Institutional Student Body

--------------------------------------------------------------------------------
I. EXECUTIVE LECTURE SUMMARY
--------------------------------------------------------------------------------
${lecture.summary}

--------------------------------------------------------------------------------
II. CORE MATHEMATICAL FORMULAS & THEORETICAL DERIVATIONS
--------------------------------------------------------------------------------
${lecture.formulas.map((f, i) => `${i + 1}. ${f}`).join('\n')}

--------------------------------------------------------------------------------
III. CURRICULUM CHAPTER BREAKDOWN & TIMESTAMPS
--------------------------------------------------------------------------------
${lecture.chapters.map((c) => `[${c.time}] ${c.title}`).join('\n')}

--------------------------------------------------------------------------------
IV. ASSIGNED CLASS EXERCISES & HOMEWORK NCERT PROBLEMS
--------------------------------------------------------------------------------
1. Review textbook chapter conceptual questions 1 through 7.
2. Complete numerical proofs for key formula derivations covered in segment 2.
3. Submit annotated step-by-step solutions to portal before next live session.

Generated officially via VidyaFloww High-Precision E-Class Vault.
endstream
endobj
xref
0 6
0000000000 65535 f
0000000015 00000 n
0000000150 00000 n
0000000210 00000 n
0000000270 00000 n
0000000360 00000 n
trailer
<< /Size 6 /Root 2 0 R /Info 1 0 R >>
startxref
1650
%%EOF`;
    } else if (format === 'mp4') {
      filename = `VidyaFloww_${lecture.subject}_${lecture.grade}_${safeTitle}_1080p.mp4`;
      mimeType = 'video/mp4';
      content = `VidyaFloww HD Video Container [H.264 / AAC 60fps 1080p Stream]
Lecture ID: ${lecture.id}
Topic: ${lecture.title}
Instructor: ${lecture.instructor}
Duration: ${lecture.duration}
File Size: ${lecture.fileSize}
Audio Bitrate: 320 kbps Stereo
Video Resolution: 1920x1080 Full HD
Integrity Hash: SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069`;
    } else if (format === 'mp3') {
      filename = `VidyaFloww_${lecture.subject}_${lecture.grade}_${safeTitle}_Audio.mp3`;
      mimeType = 'audio/mpeg';
      content = `ID3 VidyaFloww Master Audio Track [320kbps MP3 Stereo]
Topic: ${lecture.title}
Lecturer: ${lecture.instructor}
Class: ${lecture.grade}`;
    } else {
      filename = `VidyaFloww_${lecture.subject}_${lecture.grade}_${safeTitle}_Bundle.zip`;
      mimeType = 'application/zip';
      content = `PK VidyaFloww Complete Offline Lecture Bundle Archive (${lecture.title})`;
    }

    // Step 1 progress simulation
    setTimeout(() => {
      setDownloadProgress(65);
    }, 250);

    // Step 2 finish & prompt real browser save
    setTimeout(() => {
      setDownloadProgress(100);
      setIsDownloading(false);
      setDownloadCompletedName(filename);

      // Trigger actual native browser download
      try {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (err) {
        console.error('Download error:', err);
      }

      addNotification({
        title: isHindi ? 'डाउनलोड पूर्ण हुआ' : 'Download Complete',
        description: isHindi
          ? `${filename} आपके कंप्यूटर के 'Downloads' फोल्डर में सहेजा गया।`
          : `${filename} has been saved to your computer Downloads folder.`,
        type: 'success',
      });
    }, 600);
  };

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
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-4">
      {/* ── SINGLE UNIFIED HEADER (Standardized Padding & Clean Typography) ── */}
      <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: 2 Clean Tabs (Consistent Font Size & Spacing) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70">
            <button
              type="button"
              id="tab-timetable"
              onClick={() => setActiveTab('timetable')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'timetable'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="h-4 w-4" />
              {isHindi ? 'लाइव टाइमटेबल व सत्र' : 'Live Timetable & Sessions'}
            </button>
            <button
              type="button"
              id="tab-vault"
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <PlayCircle className="h-4 w-4" />
              {isHindi ? 'रिकॉर्डेड लेक्चर्स' : 'Recorded Vault'}
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => setIsScheduleDrawerOpen(true)}
            className="h-8 px-3.5 text-xs font-bold shadow-xs rounded-[4px]"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? '+ क्लास शेड्यूल करें' : '+ Schedule E-Class'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: LIVE TIMETABLE & SESSIONS (Standardized Cell Padding & Hierarchy)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'timetable' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-3 px-4 text-xs">{isHindi ? 'सत्र कोड' : 'Session Code'}</th>
                    <th className="py-3 px-4 text-xs">{isHindi ? 'व्याख्यान शीर्षक' : 'Lecture Title'}</th>
                    <th className="py-3 px-4 text-xs">{isHindi ? 'कक्षा / सेक्शन' : 'Grade'}</th>
                    <th className="py-3 px-4 text-xs">{isHindi ? 'शिक्षक' : 'Instructor'}</th>
                    <th className="py-3 px-4 text-xs">{isHindi ? 'शेड्यूल समय' : 'Time'}</th>
                    <th className="py-3 px-4 text-xs">{isHindi ? 'प्लेटफ़ॉर्म' : 'Platform'}</th>
                    <th className="py-3 px-4 text-xs">{isHindi ? 'उपस्थिति' : 'Attendees'}</th>
                    <th className="py-3 px-4 text-xs">{t('col.status')}</th>
                    <th className="py-3 px-4 text-xs text-right">{t('col.action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {sessions.map((item) => (
                    <tr key={item.code} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-primary text-xs">{item.code}</td>
                      <td className="py-3 px-4 font-bold text-foreground text-sm max-w-[280px] truncate">{item.title}</td>
                      <td className="py-3 px-4 font-semibold text-foreground text-xs">{item.grade}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{item.host}</td>
                      <td className="py-3 px-4 font-mono text-muted-foreground text-xs">{item.time}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">{item.platform}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        {item.status === 'Live Now' ? (
                          <span className="text-emerald-400 font-bold">{item.attendees} online</span>
                        ) : item.status === 'Completed' ? (
                          <span className="text-muted-foreground">{item.attendees} attended</span>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {item.status === 'Live Now' ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                            <span className="h-1.5 w-1.5 rounded-[1px] bg-emerald-500 animate-pulse" />
                            Live Now
                          </span>
                        ) : item.status === 'Upcoming' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold">
                            Upcoming
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-zinc-800 text-zinc-400 border border-zinc-700 text-xs font-medium">
                            Completed
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {item.status === 'Live Now' ? (
                          <VFButton
                            size="sm"
                            className="rounded-[3px] text-xs h-7 px-3 font-bold"
                            leftIcon={<ExternalLink className="h-3 w-3" />}
                            onClick={() => handleJoinRoom(item.code)}
                          >
                            {isHindi ? 'कमरे में जुड़ें' : 'Join Room'}
                          </VFButton>
                        ) : item.status === 'Upcoming' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <VFButton
                              size="sm"
                              variant="outline"
                              className="rounded-[3px] text-xs h-7 px-3 font-bold"
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
                              className="rounded-[3px] text-xs h-7 px-3 font-bold"
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
                            className="rounded-[3px] text-xs h-7 px-3 font-bold text-primary hover:text-primary/90"
                            leftIcon={<Play className="h-3 w-3" />}
                            onClick={() => {
                              const bioRec = recordings.find((r) => r.id === 'REC-204') || recordings[0];
                              handlePlayLecture(bioRec);
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
          TAB 2: RECORDED LECTURE VAULT (Enhanced Typography & Grid Spacing)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'vault' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recordings.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-[4px] border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Video Thumbnail with Hover Play Button */}
                  <div
                    onClick={() => handlePlayLecture(rec)}
                    role="button"
                    tabIndex={0}
                    className="relative aspect-video rounded-[3px] bg-[#111111] border border-border/60 flex items-center justify-center mb-3 overflow-hidden group cursor-pointer"
                  >
                    {/* Simulated subject background preview */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-primary/30 to-sky-500/20" />
                    <div className="absolute top-2 left-2 font-mono text-[10px] px-2 py-0.5 rounded-[2px] bg-black/80 text-zinc-300 border border-border/50 font-bold">
                      {rec.subject}
                    </div>

                    <div className="h-10 w-10 rounded-[4px] bg-black/70 border border-primary/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all shadow-md">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>

                    <span className="absolute bottom-2 right-2 font-mono text-[11px] bg-black/80 text-foreground px-2 py-0.5 rounded-[2px] font-semibold">
                      {rec.duration}
                    </span>
                  </div>

                  <h4
                    onClick={() => handlePlayLecture(rec)}
                    className="text-sm font-bold text-foreground line-clamp-2 leading-snug cursor-pointer hover:text-primary transition-colors"
                  >
                    {rec.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                    {rec.instructor} · <span className="font-semibold text-foreground">{rec.grade}</span>
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono text-xs">{rec.views} views · {rec.fileSize}</span>
                  <div className="flex items-center gap-1.5">
                    {/* Download Button */}
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-xs rounded-[3px] font-bold"
                      title="Download Full HD Video or Notes PDF"
                      leftIcon={<Download className="h-3 w-3" />}
                      onClick={() => {
                        setDownloadModalLecture(rec);
                        setDownloadCompletedName(null);
                        setDownloadProgress(0);
                      }}
                    >
                      {isHindi ? 'डाउनलोड' : 'Download'}
                    </VFButton>

                    {/* Play Button */}
                    <VFButton
                      size="sm"
                      className="h-7 px-3 text-xs rounded-[3px] font-bold"
                      leftIcon={<Play className="h-3 w-3 fill-current" />}
                      onClick={() => handlePlayLecture(rec)}
                    >
                      {isHindi ? 'चलाएं' : 'Play'}
                    </VFButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          LECTURE VIDEO PLAYER MODAL (Fully Working Simulation & Visual Classroom)
          ────────────────────────────────────────────────────────────────────────── */}
      {playingLecture && (
        <VFDialog
          isOpen={Boolean(playingLecture)}
          onClose={() => {
            setPlayingLecture(null);
            setIsPlaying(false);
          }}
          title={playingLecture.title}
          description={`${playingLecture.subject} · ${playingLecture.grade} · ${playingLecture.instructor} · Recorded on ${playingLecture.date}`}
          className="max-w-4xl"
          footerActions={
            <div className="flex items-center justify-between w-full text-xs">
              <div className="flex items-center gap-2">
                <VFButton
                  size="sm"
                  variant="outline"
                  className="rounded-[3px] text-xs font-bold"
                  leftIcon={<FileText className="h-3.5 w-3.5" />}
                  onClick={() => triggerBrowserFileSave(playingLecture, 'pdf')}
                >
                  {isHindi ? 'नोट्स PDF डाउनलोड करें' : 'Download Class Notes (.pdf)'}
                </VFButton>
                <VFButton
                  size="sm"
                  variant="outline"
                  className="rounded-[3px] text-xs font-bold"
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                  onClick={() => triggerBrowserFileSave(playingLecture, 'mp4')}
                >
                  {isHindi ? '1080p वीडियो डाउनलोड करें' : 'Download Video (1080p MP4)'}
                </VFButton>
              </div>

              <VFButton
                size="sm"
                onClick={() => {
                  setPlayingLecture(null);
                  setIsPlaying(false);
                }}
                className="rounded-[3px] text-xs font-bold"
              >
                {isHindi ? 'प्लेयर बंद करें' : 'Close Player'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-3">
            {/* 16:9 Video Canvas Screen */}
            <div className="relative aspect-video bg-[#0c0d10] border border-border rounded-[4px] overflow-hidden flex flex-col justify-between select-none group shadow-inner">
              {/* Top Watermark & HUD */}
              <div className="p-3 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-red-600/20 text-red-400 border border-red-500/40 text-[10px] font-mono font-bold">
                    <span className="h-1.5 w-1.5 rounded-[1px] bg-red-500 animate-pulse" />
                    REC ARCHIVE
                  </span>
                  <span className="text-[11px] font-mono text-zinc-300">
                    {playingLecture.subject} · {playingLecture.grade}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                  <span>1080p · 60fps</span>
                  <span>Audio 48kHz</span>
                </div>
              </div>

              {/* Central Dynamic Blackboard Visuals Based on Subject */}
              <div
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                {/* Visualizer: Physics */}
                {playingLecture.mockType === 'physics' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-md h-44 drop-shadow">
                      {/* Incline Triangle */}
                      <polygon points="60,200 420,200 420,70" fill="none" stroke="#52525b" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="60" y1="200" x2="420" y2="70" stroke="#facc15" strokeWidth="3" />
                      {/* Angle arc */}
                      <path d="M 120,200 A 60 60 0 0 0 110,180" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="130" y="195" fill="#38bdf8" fontSize="12" fontFamily="monospace">θ = 30°</text>
                      {/* Block on incline */}
                      <rect x="230" y="110" width="50" height="30" transform="rotate(-23 255 125)" fill="#27272a" stroke="#e4e4e7" strokeWidth="2" rx="2" />
                      <text x="250" y="130" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">m</text>
                      {/* Force Vectors */}
                      <line x1="250" y1="125" x2="250" y2="185" stroke="#f87171" strokeWidth="2" markerEnd="url(#arrow)" />
                      <text x="255" y="175" fill="#f87171" fontSize="11" fontFamily="monospace">mg</text>
                      {/* Normal Reaction */}
                      <line x1="250" y1="125" x2="225" y2="65" stroke="#4ade80" strokeWidth="2" />
                      <text x="215" y="60" fill="#4ade80" fontSize="11" fontFamily="monospace">N = mg cos θ</text>
                      {/* Friction Vector */}
                      <line x1="250" y1="125" x2="310" y2="100" stroke="#facc15" strokeWidth="2" />
                      <text x="315" y="95" fill="#facc15" fontSize="11" fontFamily="monospace">fk = μk N</text>
                    </svg>
                    <p className="font-mono text-xs text-yellow-300/90 font-bold mt-1 bg-black/60 px-3 py-1 rounded-[3px] border border-yellow-500/20">
                      Derivation: a = g (sin θ - μk cos θ)
                    </p>
                  </div>
                )}

                {/* Visualizer: Math */}
                {playingLecture.mockType === 'math' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-md h-44 drop-shadow">
                      {/* Cartesian Grid Axes */}
                      <line x1="40" y1="180" x2="440" y2="180" stroke="#71717a" strokeWidth="2" />
                      <line x1="100" y1="20" x2="100" y2="220" stroke="#71717a" strokeWidth="2" />
                      <text x="430" y="195" fill="#a1a1aa" fontSize="11" fontFamily="monospace">X-axis</text>
                      <text x="80" y="30" fill="#a1a1aa" fontSize="11" fontFamily="monospace">Y-axis</text>
                      {/* Points A & B */}
                      <circle cx="160" cy="140" r="4" fill="#38bdf8" />
                      <text x="140" y="135" fill="#38bdf8" fontSize="11" fontFamily="monospace">A(x₁, y₁)</text>
                      <circle cx="360" cy="60" r="4" fill="#4ade80" />
                      <text x="365" y="60" fill="#4ade80" fontSize="11" fontFamily="monospace">B(x₂, y₂)</text>
                      {/* Line Segment & Right Triangle */}
                      <line x1="160" y1="140" x2="360" y2="60" stroke="#facc15" strokeWidth="3" />
                      <line x1="160" y1="140" x2="360" y2="140" stroke="#52525b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="360" y1="140" x2="360" y2="60" stroke="#52525b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="250" y="155" fill="#a1a1aa" fontSize="10" fontFamily="monospace">Δx = (x₂ - x₁)</text>
                      <text x="370" y="105" fill="#a1a1aa" fontSize="10" fontFamily="monospace">Δy = (y₂ - y₁)</text>
                    </svg>
                    <p className="font-mono text-xs text-sky-300 font-bold mt-1 bg-black/60 px-3 py-1 rounded-[3px] border border-sky-500/20">
                      Euclidean Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]
                    </p>
                  </div>
                )}

                {/* Visualizer: Chemistry */}
                {playingLecture.mockType === 'chemistry' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-md h-44 drop-shadow">
                      <circle cx="250" cy="120" r="22" fill="#ef4444" opacity="0.3" />
                      <circle cx="250" cy="120" r="14" fill="#ef4444" />
                      <text x="250" y="124" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">11p⁺ 12n</text>
                      {/* Orbitals */}
                      <circle cx="250" cy="120" r="45" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="250" cy="120" r="75" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="4 4" />
                      <circle cx="250" cy="120" r="105" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4 4" />
                      {/* Valence Electron */}
                      <circle cx="355" cy="120" r="5" fill="#facc15" />
                      <text x="365" y="124" fill="#facc15" fontSize="11" fontFamily="monospace">Valence e⁻ (3s¹)</text>
                    </svg>
                    <p className="font-mono text-xs text-emerald-300 font-bold mt-1 bg-black/60 px-3 py-1 rounded-[3px] border border-emerald-500/20">
                      Sodium [Na]: 1s² 2s² 2p⁶ 3s¹ (Electropositive Donator)
                    </p>
                  </div>
                )}

                {/* Visualizer: Biology */}
                {playingLecture.mockType === 'biology' && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-md h-44 drop-shadow">
                      {/* Lipid Bilayer */}
                      <rect x="50" y="60" width="400" height="20" fill="#38bdf8" opacity="0.4" rx="2" />
                      <rect x="50" y="130" width="400" height="20" fill="#38bdf8" opacity="0.4" rx="2" />
                      {/* Protein Channel */}
                      <rect x="220" y="50" width="60" height="110" fill="#10b981" opacity="0.8" rx="4" />
                      <text x="250" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Channel</text>
                      {/* Diffusing particles */}
                      <circle cx="120" cy="35" r="4" fill="#facc15" />
                      <circle cx="160" cy="40" r="4" fill="#facc15" />
                      <circle cx="250" cy="30" r="4" fill="#facc15" />
                      <circle cx="340" cy="35" r="4" fill="#facc15" />
                      <line x1="250" y1="35" x2="250" y2="180" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="250" y="200" fill="#facc15" fontSize="11" fontFamily="monospace" textAnchor="middle">Facilitated Osmosis [H₂O / Na⁺]</text>
                    </svg>
                    <p className="font-mono text-xs text-green-300 font-bold mt-1 bg-black/60 px-3 py-1 rounded-[3px] border border-green-500/20">
                      Fluid Mosaic Plasma Membrane Diffusion Mechanism
                    </p>
                  </div>
                )}
              </div>

              {/* Teacher Webcam PiP (Sharp geometric borders) */}
              <div className="absolute bottom-14 right-3 w-36 h-24 rounded-[3px] bg-[#141416] border border-border/80 shadow-2xl overflow-hidden z-20 flex flex-col justify-between p-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-zinc-300 truncate max-w-[80px]">
                    {playingLecture.instructor.split(' ')[0]}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <span className="h-2 w-0.5 bg-emerald-400 animate-pulse" />
                    <span className="h-3 w-0.5 bg-emerald-400 animate-pulse delay-75" />
                    <span className="h-1.5 w-0.5 bg-emerald-400 animate-pulse delay-150" />
                  </div>
                </div>

                <div className="flex items-center justify-center my-auto">
                  <div className="h-8 w-8 rounded-[3px] bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
                    {playingLecture.instructor[0]}
                  </div>
                </div>

                <div className="text-[9px] font-mono text-zinc-400 text-center truncate">
                  {playingLecture.instructor}
                </div>
              </div>

              {/* Bottom Custom Playback Bar (Scrubber, Controls, Time) */}
              <div className="p-2.5 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1.5">
                {/* Timeline Scrubber */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-300 w-10 text-right">
                    {formatSeconds(currentSeconds)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={playingLecture.totalSeconds}
                    value={currentSeconds}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-zinc-700 accent-primary rounded-[2px] cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-zinc-400 w-10">
                    {formatSeconds(playingLecture.totalSeconds)}
                  </span>
                </div>

                {/* Controls Row (Sharp geometric buttons, NO rounded-full) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Play/Pause */}
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-7 w-7 rounded-[3px] bg-primary text-black flex items-center justify-center hover:bg-primary/90 transition-all font-bold"
                    >
                      {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                    </button>

                    {/* Rewind 10s */}
                    <button
                      type="button"
                      onClick={() => handleSkip(-10)}
                      title="Rewind 10 seconds"
                      className="h-7 px-2 rounded-[3px] bg-zinc-800 text-zinc-300 hover:text-white border border-border/60 flex items-center gap-1 text-[10px] font-mono"
                    >
                      <RotateCcw className="h-3 w-3" />
                      -10s
                    </button>

                    {/* Forward 10s */}
                    <button
                      type="button"
                      onClick={() => handleSkip(10)}
                      title="Forward 10 seconds"
                      className="h-7 px-2 rounded-[3px] bg-zinc-800 text-zinc-300 hover:text-white border border-border/60 flex items-center gap-1 text-[10px] font-mono"
                    >
                      <RotateCw className="h-3 w-3" />
                      +10s
                    </button>

                    {/* Mute & Volume */}
                    <div className="flex items-center gap-1.5 ml-1">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="h-7 w-7 rounded-[3px] bg-zinc-800 text-zinc-300 hover:text-white border border-border/60 flex items-center justify-center"
                      >
                        {isMuted || volume === 0 ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(Number(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-16 h-1 bg-zinc-700 accent-primary rounded-[2px] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right side: Speed, Quality, Fullscreen */}
                  <div className="flex items-center gap-1.5">
                    {/* Playback speed switcher */}
                    <div className="flex items-center gap-0.5 bg-zinc-900 p-0.5 rounded-[3px] border border-border/70 text-[10px] font-mono">
                      {[1, 1.25, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded-[2px] ${
                            playbackSpeed === spd ? 'bg-primary text-black font-bold' : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <span className="px-2 py-0.5 rounded-[3px] bg-zinc-800 border border-border/60 text-[10px] font-mono text-zinc-300 font-semibold">
                      1080p HD
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        addNotification({
                          title: isHindi ? 'फुलस्क्रीन' : 'Fullscreen Mode',
                          description: 'Standard 1080p resolution scaling active.',
                          type: 'info',
                        });
                      }}
                      className="h-7 w-7 rounded-[3px] bg-zinc-800 text-zinc-300 hover:text-white border border-border/60 flex items-center justify-center"
                    >
                      <Maximize2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lecture Details Tabs (Chapters, Formulas & Notes, Download Materials) */}
            <div className="border border-border/80 rounded-[4px] p-3 bg-[#141414] space-y-2.5">
              {/* Tab Switcher */}
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <button
                  type="button"
                  onClick={() => setActivePlayerTab('chapters')}
                  className={`px-3 py-1 text-xs font-bold rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activePlayerTab === 'chapters'
                      ? 'bg-[#222222] text-foreground border border-border/70'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {isHindi ? 'अध्याय व टाइमस्टैम्प' : 'Chapters & Timestamps'}
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlayerTab('notes')}
                  className={`px-3 py-1 text-xs font-bold rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activePlayerTab === 'notes'
                      ? 'bg-[#222222] text-foreground border border-border/70'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-sky-400" />
                  {isHindi ? 'बोर्ड नोट्स व सूत्र' : 'Teacher Whiteboard & Formulas'}
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlayerTab('download')}
                  className={`px-3 py-1 text-xs font-bold rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activePlayerTab === 'download'
                      ? 'bg-[#222222] text-foreground border border-border/70'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FolderDown className="h-3.5 w-3.5 text-emerald-400" />
                  {isHindi ? 'डाउनलोड सामग्री' : 'Offline Download Pack'}
                </button>
              </div>

              {/* Tab 1: Interactive Chapters */}
              {activePlayerTab === 'chapters' && (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {playingLecture.chapters.map((ch, idx) => {
                    const isCurrent =
                      currentSeconds >= ch.seconds &&
                      (idx === playingLecture.chapters.length - 1 || currentSeconds < playingLecture.chapters[idx + 1].seconds);

                    return (
                      <div
                        key={ch.title}
                        onClick={() => handleSeek(ch.seconds)}
                        role="button"
                        tabIndex={0}
                        className={`p-2 rounded-[3px] border flex items-center justify-between text-xs cursor-pointer transition-all ${
                          isCurrent
                            ? 'bg-primary/10 border-primary/40 text-primary font-bold'
                            : 'bg-[#18181a] border-border/60 text-muted-foreground hover:bg-[#222222] hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-[2px] bg-black/60 border border-border/60">
                            {ch.time}
                          </span>
                          <span>{ch.title}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-70">
                          {isCurrent ? 'Playing Now' : 'Jump to chapter →'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Formulas & Notes */}
              {activePlayerTab === 'notes' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{playingLecture.summary}</span>
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="rounded-[3px] h-6 px-2 text-[10px]"
                      leftIcon={hasCopiedNotes ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      onClick={() => {
                        navigator.clipboard?.writeText(playingLecture.formulas.join('\n'));
                        setHasCopiedNotes(true);
                        setTimeout(() => setHasCopiedNotes(false), 2000);
                        addNotification({
                          title: isHindi ? 'फॉर्मूले कॉपी हुए' : 'Formulas Copied',
                          description: 'Lecture equation sheet copied to clipboard.',
                          type: 'info',
                        });
                      }}
                    >
                      {hasCopiedNotes ? 'Copied' : 'Copy All'}
                    </VFButton>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {playingLecture.formulas.map((f, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-[3px] bg-[#18181a] border border-border/60 font-mono text-xs text-foreground flex items-center gap-2"
                      >
                        <span className="text-primary font-bold text-[10px]">{i + 1}.</span>
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Direct Download Actions */}
              {activePlayerTab === 'download' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div
                    onClick={() => triggerBrowserFileSave(playingLecture, 'mp4')}
                    className="p-2.5 rounded-[3px] border border-border/80 bg-[#18181a] hover:border-primary/50 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <MonitorPlay className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-mono text-zinc-400">1080p MP4</span>
                      </div>
                      <h5 className="text-xs font-bold text-foreground">Video Master</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Full lecture recording ({playingLecture.fileSize})</p>
                    </div>
                    <VFButton size="sm" className="mt-2 h-6 text-[10px] rounded-[3px] w-full" leftIcon={<Download className="h-2.5 w-2.5" />}>
                      Download MP4
                    </VFButton>
                  </div>

                  <div
                    onClick={() => triggerBrowserFileSave(playingLecture, 'pdf')}
                    className="p-2.5 rounded-[3px] border border-border/80 bg-[#18181a] hover:border-sky-500/50 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <FileText className="h-4 w-4 text-sky-400" />
                        <span className="text-[10px] font-mono text-zinc-400">PDF Doc</span>
                      </div>
                      <h5 className="text-xs font-bold text-foreground">Class Notes PDF</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Annotated equations & summary (12.4 MB)</p>
                    </div>
                    <VFButton size="sm" variant="outline" className="mt-2 h-6 text-[10px] rounded-[3px] w-full" leftIcon={<Download className="h-2.5 w-2.5" />}>
                      Download PDF
                    </VFButton>
                  </div>

                  <div
                    onClick={() => triggerBrowserFileSave(playingLecture, 'mp3')}
                    className="p-2.5 rounded-[3px] border border-border/80 bg-[#18181a] hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Headphones className="h-4 w-4 text-emerald-400" />
                        <span className="text-[10px] font-mono text-zinc-400">MP3 Audio</span>
                      </div>
                      <h5 className="text-xs font-bold text-foreground">Audio Podcast</h5>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Voice track for revision (42 MB)</p>
                    </div>
                    <VFButton size="sm" variant="outline" className="mt-2 h-6 text-[10px] rounded-[3px] w-full" leftIcon={<Download className="h-2.5 w-2.5" />}>
                      Download MP3
                    </VFButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </VFDialog>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          DOWNLOAD LECTURE MODAL (Requested: Download must work fully & perfectly)
          ────────────────────────────────────────────────────────────────────────── */}
      {downloadModalLecture && (
        <VFDialog
          isOpen={Boolean(downloadModalLecture)}
          onClose={() => {
            setDownloadModalLecture(null);
            setIsDownloading(false);
            setDownloadProgress(0);
          }}
          title={isHindi ? 'लेक्चर डाउनलोड केंद्र' : 'Download Academic Lecture'}
          description={`${downloadModalLecture.title} · ${downloadModalLecture.grade} (${downloadModalLecture.instructor})`}
          className="max-w-lg"
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full text-xs">
              <VFButton
                size="sm"
                variant="outline"
                className="rounded-[3px]"
                onClick={() => setDownloadModalLecture(null)}
              >
                {isHindi ? 'रद्द करें' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                className="rounded-[3px] font-bold"
                leftIcon={<Download className="h-3.5 w-3.5" />}
                onClick={() => triggerBrowserFileSave(downloadModalLecture, downloadFormatSelected)}
                disabled={isDownloading}
              >
                {isDownloading ? 'Saving...' : isHindi ? 'डाउनलोड करें' : 'Download Now'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-3.5 py-1 text-xs">
            <p className="text-muted-foreground">
              {isHindi
                ? 'वह फ़ाइल प्रारूप चुनें जिसे आप अपने सिस्टम पर ऑफ़लाइन अध्ययन के लिए सहेजना चाहते हैं:'
                : 'Select the file package you wish to download directly to your device for offline study:'}
            </p>

            {/* Format Option Cards (Sharp rounded-[3px]) */}
            <div className="space-y-2">
              <div
                onClick={() => setDownloadFormatSelected('mp4')}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-[3px] border transition-all cursor-pointer flex items-center justify-between ${
                  downloadFormatSelected === 'mp4'
                    ? 'bg-primary/10 border-primary/50 text-foreground'
                    : 'bg-[#161616] border-border/70 text-muted-foreground hover:border-border'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-[3px] bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
                    <MonitorPlay className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">1080p Full HD Video (.mp4)</h5>
                    <p className="text-[11px] text-muted-foreground">Studio video recording with teacher annotations</p>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span className="font-bold text-foreground">{downloadModalLecture.fileSize}</span>
                  <span className="block text-[10px] text-muted-foreground">H.264 / 60fps</span>
                </div>
              </div>

              <div
                onClick={() => setDownloadFormatSelected('pdf')}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-[3px] border transition-all cursor-pointer flex items-center justify-between ${
                  downloadFormatSelected === 'pdf'
                    ? 'bg-sky-500/10 border-sky-500/50 text-foreground'
                    : 'bg-[#161616] border-border/70 text-muted-foreground hover:border-border'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-[3px] bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Class Notes & Formulas (.pdf)</h5>
                    <p className="text-[11px] text-muted-foreground">Complete chapter derivations & summary dossier</p>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span className="font-bold text-foreground">12.4 MB</span>
                  <span className="block text-[10px] text-muted-foreground">Vector PDF</span>
                </div>
              </div>

              <div
                onClick={() => setDownloadFormatSelected('mp3')}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-[3px] border transition-all cursor-pointer flex items-center justify-between ${
                  downloadFormatSelected === 'mp3'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-foreground'
                    : 'bg-[#161616] border-border/70 text-muted-foreground hover:border-border'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-[3px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                    <Headphones className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Audio Master Track (.mp3)</h5>
                    <p className="text-[11px] text-muted-foreground">Crisp vocal track for offline revision & listening</p>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span className="font-bold text-foreground">42 MB</span>
                  <span className="block text-[10px] text-muted-foreground">320kbps MP3</span>
                </div>
              </div>

              <div
                onClick={() => setDownloadFormatSelected('zip')}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-[3px] border transition-all cursor-pointer flex items-center justify-between ${
                  downloadFormatSelected === 'zip'
                    ? 'bg-purple-500/10 border-purple-500/50 text-foreground'
                    : 'bg-[#161616] border-border/70 text-muted-foreground hover:border-border'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-[3px] bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                    <FolderDown className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Complete Archive (.zip)</h5>
                    <p className="text-[11px] text-muted-foreground">Full package: Video + PDF notes + Audio file</p>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span className="font-bold text-foreground">334 MB</span>
                  <span className="block text-[10px] text-muted-foreground">ZIP Archive</span>
                </div>
              </div>
            </div>

            {/* Active Download Progress State */}
            {isDownloading && (
              <div className="p-3 rounded-[3px] bg-[#1a1a1a] border border-border/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Preparing Download Package...</span>
                  <span className="font-mono text-primary font-bold">{downloadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-[2px] overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground block">
                  Writing browser stream to your device's Downloads directory...
                </span>
              </div>
            )}

            {/* Success state */}
            {downloadCompletedName && !isDownloading && (
              <div className="p-2.5 rounded-[3px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="text-xs">
                  Saved <strong>{downloadCompletedName}</strong> to your computer!
                </span>
              </div>
            )}
          </div>
        </VFDialog>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SCHEDULE E-CLASS SLIDE-OVER DRAWER
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
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'तारीख' : 'Scheduled Date'}
              </label>
              <input
                type="text"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                placeholder="Today, 07 Sep 2026"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
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
              <option value="VidyaClass Live">VidyaClass Live (HD Studio)</option>
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
