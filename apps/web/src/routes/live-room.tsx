import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFButton,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  Hand,
  MessageSquare,
  Users,
  PhoneOff,
  Copy,
  Settings,
  Shield,
  Radio,
  Clock,
  Send,
  PenTool,
  Grid,
  Volume2,
  X,
  LayoutTemplate,
  Globe,
  Search,
  Eraser,
  ArrowRight,
  Highlighter,
  Trash2,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface LiveRoomSearch {
  session?: string;
}

export const Route = createFileRoute('/live-room')({
  validateSearch: (search: Record<string, unknown>): LiveRoomSearch => ({
    session: typeof search.session === 'string' ? search.session : 'VIRT-101',
  }),
  component: LiveRoomMeetPage,
});

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  text: string;
  isSelf?: boolean;
}

interface Participant {
  id: string;
  name: string;
  roll: string;
  avatar: string;
  isMuted: boolean;
  isCameraOn: boolean;
  isHandRaised: boolean;
  isSpeaking: boolean;
  isHost?: boolean;
}

interface AcademicSearchItem {
  id: string;
  title: string;
  category: string;
  formula?: string;
  summary: string;
  verifiedSource: string;
}

const ACADEMIC_SEARCH_DATABASE: AcademicSearchItem[] = [
  {
    id: 'REF-01',
    title: 'Thin Lens Formula & Linear Magnification',
    category: 'Ray Optics (Class 10 & 12)',
    formula: '1/f = 1/v - 1/u  |  m = v/u = h\'/h',
    summary: 'Relates object distance (u), image distance (v), and focal length (f). Magnification m > 0 indicates virtual and erect image; m < 0 indicates real and inverted image.',
    verifiedSource: 'NCERT Physics Ch. 9 / CBSE 2026',
  },
  {
    id: 'REF-02',
    title: 'Lens Maker\'s Formula & Refractive Power',
    category: 'Advanced Optics',
    formula: '1/f = (n - 1) × (1/R1 - 1/R2)  |  P = 1/f (Dioptres)',
    summary: 'Determines focal length of a lens based on refractive index n of lens material relative to surrounding medium, and radii of curvature R1 and R2.',
    verifiedSource: 'NCERT Physics Part II · Sec 9.5',
  },
  {
    id: 'REF-03',
    title: 'Snell\'s Law of Refraction & Critical Angle',
    category: 'Wave & Ray Optics',
    formula: 'n1 × sin(θ1) = n2 × sin(θ2)  |  sin(θc) = 1/n',
    summary: 'Refractive index of glass n ≈ 1.50; water n ≈ 1.33; air n ≈ 1.00. Total internal reflection occurs when angle of incidence exceeds critical angle in a denser medium.',
    verifiedSource: 'DIKSHA Open Academic Repository',
  },
  {
    id: 'REF-04',
    title: 'New Cartesian Sign Convention Guidelines',
    category: 'Standard Physics Convention',
    formula: 'u is always -ve  |  f(convex) is +ve  |  f(concave) is -ve',
    summary: 'All distances are measured from the optical center along the principal axis. Distances in direction of incident ray are positive, opposite are negative.',
    verifiedSource: 'CBSE Curriculum Standard 2026',
  },
  {
    id: 'REF-05',
    title: 'Power of Combination of Thin Lenses in Contact',
    category: 'Optical Instruments',
    formula: 'P = P1 + P2 + P3 + ...  |  1/f = 1/f1 + 1/f2 + 1/f3',
    summary: 'When multiple thin lenses are kept in coaxial contact, their powers add algebraically. Net magnification is the product: m = m1 × m2 × m3.',
    verifiedSource: 'NCERT Reference Handbook',
  },
];

const INITIAL_PARTICIPANTS: Participant[] = [
  { id: '1', name: 'Dr. Sarah Connor (Host)', roll: 'Faculty ID #082', avatar: 'SC', isMuted: false, isCameraOn: true, isHandRaised: false, isSpeaking: true, isHost: true },
  { id: '2', name: 'Rahul Sharma', roll: 'Roll #42 · Class 10-A', avatar: 'RS', isMuted: true, isCameraOn: true, isHandRaised: false, isSpeaking: false },
  { id: '3', name: 'Priya Verma', roll: 'Roll #18 · Class 10-A', avatar: 'PV', isMuted: false, isCameraOn: true, isHandRaised: false, isSpeaking: false },
  { id: '4', name: 'Sneha Patel', roll: 'Roll #29 · Class 10-A', avatar: 'SP', isMuted: true, isCameraOn: true, isHandRaised: true, isSpeaking: false },
  { id: '5', name: 'Amit Kumar', roll: 'Roll #05 · Class 10-A', avatar: 'AK', isMuted: true, isCameraOn: false, isHandRaised: false, isSpeaking: false },
  { id: '6', name: 'Karan Malhotra', roll: 'Roll #14 · Class 10-A', avatar: 'KM', isMuted: true, isCameraOn: true, isHandRaised: false, isSpeaking: false },
  { id: '7', name: 'Ananya Roy', roll: 'Roll #03 · Class 10-A', avatar: 'AR', isMuted: true, isCameraOn: true, isHandRaised: false, isSpeaking: false },
  { id: '8', name: 'Vikram Singh', roll: 'Roll #21 · Class 10-A', avatar: 'VS', isMuted: true, isCameraOn: false, isHandRaised: false, isSpeaking: false },
];

const INITIAL_CHAT: ChatMessage[] = [
  { id: 'm1', sender: 'Dr. Sarah Connor', avatar: 'SC', time: '10:02 AM', text: 'Good morning class! Please observe the ray diagram on the board.' },
  { id: 'm2', sender: 'Rahul Sharma', avatar: 'RS', time: '10:03 AM', text: 'Good morning ma’am, audio and presentation screen are loud and clear.' },
  { id: 'm3', sender: 'Sneha Patel', avatar: 'SP', time: '10:07 AM', text: 'Ma’am, will the focal length sign convention apply negatively for concave lens?' },
  { id: 'm4', sender: 'Dr. Sarah Connor', avatar: 'SC', time: '10:08 AM', text: 'Exactly Sneha, concave focal length is always taken negative in the Cartesian grid.' },
];

function LiveRoomMeetPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';

  const sessionCode = search.session || 'VIRT-101';

  // Controls State
  const [isMicMuted, setIsMicMuted] = React.useState(false);
  const [isCameraOff, setIsCameraOff] = React.useState(false);
  const [isScreenSharing, setIsScreenSharing] = React.useState(true);
  const [isHandRaised, setIsHandRaised] = React.useState(false);
  const [activeSidePanel, setActiveSidePanel] = React.useState<'chat' | 'participants' | 'notes' | 'search' | null>(null);
  const [viewMode, setViewMode] = React.useState<'speaker' | 'grid'>('speaker');

  // Drawing Canvas State (Requested: Tools to draw and teach)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isDrawingMode, setIsDrawingMode] = React.useState(true);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [activeDrawTool, setActiveDrawTool] = React.useState<'pen' | 'arrow' | 'highlighter' | 'eraser'>('pen');
  const [drawColor, setDrawColor] = React.useState<string>('#facc15'); // default vivid yellow
  const [strokeWidth, setStrokeWidth] = React.useState<number>(3);
  const [boardBackground, setBoardBackground] = React.useState<'optics' | 'grid' | 'blackboard' | 'ruled'>('optics');
  const [boardNotesList, setBoardNotesList] = React.useState<string[]>([
    '• Sign Convention: u = -20 cm, f = +10 cm',
    '• Lens Equation: 1/f = 1/v - 1/u',
    '• Calculated Image Distance: v = +20 cm (Real, Inverted)',
  ]);

  // Elapsed Timer (24:18 -> counts up)
  const [secondsElapsed, setSecondsElapsed] = React.useState(1458);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Chat State
  const [messages, setMessages] = React.useState<ChatMessage[]>(INITIAL_CHAT);
  const [chatInput, setChatInput] = React.useState('');
  const chatBottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeSidePanel === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeSidePanel]);

  // In-Class Web Search State (Requested: In-class web searches)
  const [webSearchQuery, setWebSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<AcademicSearchItem[]>(ACADEMIC_SEARCH_DATABASE);

  // Participants State
  const [participants, setParticipants] = React.useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [participantSearch, setParticipantSearch] = React.useState('');

  // Dialogs
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = React.useState(false);

  // Resize canvas to match display size
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [viewMode, activeSidePanel]);

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeDrawTool === 'eraser') {
      ctx.clearRect(x - 12, y - 12, 24, 24);
    } else if (activeDrawTool === 'highlighter') {
      ctx.strokeStyle = drawColor + '40';
      ctx.lineWidth = strokeWidth * 3.5;
      ctx.lineCap = 'square';
    } else {
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    setIsMouseDown(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown || !isDrawingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeDrawTool === 'eraser') {
      ctx.clearRect(x - 12, y - 12, 24, 24);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsMouseDown(false);
  };

  const clearWhiteboardCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    addNotification({
      title: 'Whiteboard Cleared',
      description: 'Drawing strokes wiped from teaching canvas.',
      type: 'info',
    });
  };

  // Quick Plot Ray Diagram Demo (draws realistic optical rays on canvas)
  const handlePlotRayDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;
    const midX = w / 2;

    // Principal Axis line (Cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, midY);
    ctx.lineTo(w - 40, midY);
    ctx.stroke();

    // Convex Lens Vertical plane (Emerald)
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(midX, midY - 140);
    ctx.lineTo(midX, midY + 140);
    ctx.stroke();

    // Object Arrow (Vivid Yellow)
    const objX = midX - 220;
    const objHeight = 80;
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(objX, midY);
    ctx.lineTo(objX, midY - objHeight);
    ctx.stroke();

    // Incident Ray parallel to principal axis (Red)
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(objX, midY - objHeight);
    ctx.lineTo(midX, midY - objHeight);
    ctx.stroke();

    // Refracted Ray through Focus F2 (Red)
    const focusX = midX + 110;
    ctx.beginPath();
    ctx.moveTo(midX, midY - objHeight);
    ctx.lineTo(midX + 260, midY + objHeight * 1.3);
    ctx.stroke();

    // Ray passing undeviated through Optical Center (White)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(objX, midY - objHeight);
    ctx.lineTo(midX + 240, midY + objHeight * 1.1);
    ctx.stroke();

    // Image Arrow (Vivid Green, Real & Inverted)
    const imgX = midX + 220;
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(imgX, midY);
    ctx.lineTo(imgX, midY + objHeight);
    ctx.stroke();

    // Annotations text
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('Object (h)', objX - 10, midY - objHeight - 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('O (Optical Center)', midX - 20, midY + 22);
    ctx.fillText('F2 (Focus)', focusX - 15, midY + 22);
    ctx.fillStyle = '#4ade80';
    ctx.fillText('Image (h\') Real/Inverted', imgX - 30, midY + objHeight + 22);

    addNotification({
      title: 'Optical Ray Diagram Plotted',
      description: 'Convex lens parallel & optical center rays drawn on board.',
      type: 'success',
    });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'You (Faculty / Student)',
      avatar: 'YOU',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: chatInput.trim(),
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now() + 1}`,
          sender: 'Dr. Sarah Connor',
          avatar: 'SC',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Noted! Take down the lens maker derivation and ray directions in your notebooks.',
        },
      ]);
    }, 1200);
  };

  // In-Class Web Search Handling
  const handlePerformSearch = (query: string) => {
    setWebSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(ACADEMIC_SEARCH_DATABASE);
      return;
    }
    const filtered = ACADEMIC_SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase()) ||
        (item.formula && item.formula.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filtered);
  };

  const handlePasteSearchResultToBoard = (item: AcademicSearchItem) => {
    const note = `• ${item.title}: ${item.formula || item.summary.slice(0, 70)}`;
    setBoardNotesList((prev) => [...prev, note]);
    addNotification({
      title: 'Added to Whiteboard',
      description: `"${item.title}" reference placed on teacher board.`,
      type: 'success',
    });
  };

  const handleShareSearchResultToChat = (item: AcademicSearchItem) => {
    const shareText = `📚 Academic Reference: ${item.title} -> Formula: ${item.formula || item.summary} (Source: ${item.verifiedSource})`;
    setMessages((prev) => [
      ...prev,
      {
        id: `share_${Date.now()}`,
        sender: 'Faculty Reference Desk',
        avatar: 'REF',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: shareText,
      },
    ]);
    addNotification({
      title: 'Shared to Class Chat',
      description: `Citation for "${item.title}" sent to students.`,
      type: 'info',
    });
  };

  const handleToggleMic = () => {
    const next = !isMicMuted;
    setIsMicMuted(next);
    addNotification({
      title: next ? 'Microphone Muted' : 'Microphone Active',
      description: next ? 'Others cannot hear you.' : 'Your voice is live in the room.',
      type: next ? 'warning' : 'success',
    });
  };

  const handleToggleCamera = () => {
    const next = !isCameraOff;
    setIsCameraOff(next);
    addNotification({
      title: next ? 'Camera Turned Off' : 'Camera Turned On',
      description: next ? 'Displaying profile avatar tile.' : 'Broadcasting 1080p HD camera feed.',
      type: next ? 'info' : 'success',
    });
  };

  const handleToggleHand = () => {
    const next = !isHandRaised;
    setIsHandRaised(next);
    addNotification({
      title: next ? 'Hand Raised ✋' : 'Hand Lowered',
      description: next ? 'Teacher notified of your question.' : 'Hand cleared.',
      type: 'info',
    });
  };

  const handleToggleScreenShare = () => {
    const next = !isScreenSharing;
    setIsScreenSharing(next);
    addNotification({
      title: next ? 'Screen Sharing Started' : 'Screen Sharing Stopped',
      description: next ? 'Displaying interactive board stream.' : 'Returned to camera gallery.',
      type: 'info',
    });
  };

  const handleLeaveMeeting = () => {
    setIsLeaveConfirmOpen(false);
    addNotification({
      title: 'Left E-Class Room',
      description: `Disconnected from session ${sessionCode}.`,
      type: 'info',
    });
    navigate({ to: '/e-class' });
  };

  return (
    <div className="w-full h-screen bg-[#121214] text-foreground flex flex-col overflow-hidden select-none font-sans">
      {/* ──────────────────────────────────────────────────────────────────────────
          1. TOP APP BAR
          ────────────────────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-[#18191c] border-b border-[#28292d] px-4 flex items-center justify-between shrink-0 z-20 shadow-xs">
        {/* Left: Session Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-[4px] bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
            <Radio className="h-4 w-4 text-primary animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-foreground truncate tracking-tight">
                Class 10 Physics: Ray Optics & Lens Formula Revision
              </h1>
              <VFBadge variant="outline" className="font-mono text-[10px] hidden sm:inline-flex rounded-[3px] border-border/80">
                {sessionCode}
              </VFBadge>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>Class 10-A</span>
              <span>·</span>
              <span className="truncate">Mentor: Dr. Sarah Connor</span>
            </div>
          </div>
        </div>

        {/* Center: Live Recording & Timer */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-rose-950/30 border border-rose-500/40 px-2.5 py-1 rounded-[3px] text-[11px] font-mono text-rose-400 font-bold">
            <span className="h-2 w-2 rounded-[1px] bg-rose-500 animate-ping" />
            <span>REC ● 1080p HD</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#202124] border border-[#323438] px-2.5 py-1 rounded-[3px] text-xs font-mono text-foreground font-semibold">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/20 border border-emerald-500/30 px-2 py-1 rounded-[3px]">
            <Shield className="h-3 w-3" />
            <span>Encrypted WebRTC</span>
          </div>
        </div>

        {/* Right: Layout & Leave Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'speaker' ? 'grid' : 'speaker')}
            className="px-2.5 py-1.5 rounded-[4px] bg-[#222327] hover:bg-[#2c2d32] border border-[#383a40] text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Toggle View Mode"
          >
            {viewMode === 'speaker' ? <Grid className="h-3.5 w-3.5" /> : <LayoutTemplate className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{viewMode === 'speaker' ? 'Gallery View' : 'Speaker View'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(`https://meet.vidyafloww.org/room/${sessionCode.toLowerCase()}`);
              addNotification({
                title: 'Meeting Link Copied',
                description: `https://meet.vidyafloww.org/room/${sessionCode.toLowerCase()}`,
                type: 'info',
              });
            }}
            className="p-1.5 rounded-[4px] bg-[#222327] hover:bg-[#2c2d32] border border-[#383a40] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Copy Joining Link"
          >
            <Copy className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsLeaveConfirmOpen(true)}
            className="px-3.5 py-1.5 rounded-[4px] bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ml-1 shadow-xs"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            <span>{isHindi ? 'क्लास छोड़ें' : 'Leave Call'}</span>
          </button>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. MAIN STAGE CANVAS + INTERACTIVE DRAWING TOOLS
          ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden bg-[#0e0e11]">
        {/* Main Stage Grid Area */}
        <div className="flex-1 flex flex-col p-3 min-w-0 min-h-0 overflow-hidden relative">
          {viewMode === 'speaker' ? (
            /* ── SPEAKER / WHITEBOARD INTERACTIVE MODE ── */
            <div className="flex-1 flex flex-col gap-2.5 min-h-0">
              {/* PRIMARY CENTRAL WHITEBOARD & TEACHING STAGE */}
              <div
                className={`flex-1 rounded-[4px] border relative overflow-hidden flex flex-col shadow-xs min-h-0 transition-all ${
                  boardBackground === 'optics'
                    ? 'bg-[#141519] border-[#2d2e35]'
                    : boardBackground === 'grid'
                    ? 'bg-[#0f1013] border-[#2d2e35]'
                    : boardBackground === 'blackboard'
                    ? 'bg-[#111113] border-[#222225]'
                    : 'bg-[#17181c] border-[#2d2e35]'
                }`}
                style={
                  boardBackground === 'grid'
                    ? {
                        backgroundImage: `linear-gradient(#252730 1px, transparent 1px), linear-gradient(90deg, #252730 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                      }
                    : boardBackground === 'ruled'
                    ? {
                        backgroundImage: `linear-gradient(#262832 1px, transparent 1px)`,
                        backgroundSize: '100% 28px',
                      }
                    : {}
                }
              >
                {/* ── FLOATING TEACHER DRAWING & TEACHING TOOLBAR ── */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 bg-[#1e2025]/95 backdrop-blur-md border border-[#383a42] px-3 py-1.5 rounded-[4px] flex items-center gap-2 shadow-lg max-w-[95%] overflow-x-auto no-scrollbar">
                  {/* Tool Selection */}
                  <div className="flex items-center gap-1 border-r border-[#383a42] pr-2">
                    <button
                      type="button"
                      onClick={() => { setActiveDrawTool('pen'); setIsDrawingMode(true); }}
                      className={`p-1.5 rounded-[3px] transition-colors cursor-pointer ${
                        activeDrawTool === 'pen' && isDrawingMode
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-[#282a30]'
                      }`}
                      title="Pen Tool (Freehand Writing)"
                    >
                      <PenTool className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDrawTool('arrow'); setIsDrawingMode(true); }}
                      className={`p-1.5 rounded-[3px] transition-colors cursor-pointer ${
                        activeDrawTool === 'arrow' && isDrawingMode
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-[#282a30]'
                      }`}
                      title="Ray / Arrow Pointer Tool"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDrawTool('highlighter'); setIsDrawingMode(true); }}
                      className={`p-1.5 rounded-[3px] transition-colors cursor-pointer ${
                        activeDrawTool === 'highlighter' && isDrawingMode
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-[#282a30]'
                      }`}
                      title="Highlighter Tool"
                    >
                      <Highlighter className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveDrawTool('eraser'); setIsDrawingMode(true); }}
                      className={`p-1.5 rounded-[3px] transition-colors cursor-pointer ${
                        activeDrawTool === 'eraser' && isDrawingMode
                          ? 'bg-rose-600 text-white font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-[#282a30]'
                      }`}
                      title="Eraser Tool"
                    >
                      <Eraser className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Color Palette (Sharp Geometric Swatches) */}
                  <div className="flex items-center gap-1.5 border-r border-[#383a42] pr-2">
                    {[
                      { color: '#facc15', label: 'Vivid Yellow' },
                      { color: '#38bdf8', label: 'Optical Cyan' },
                      { color: '#4ade80', label: 'Emerald Green' },
                      { color: '#f87171', label: 'Laser Red' },
                      { color: '#ffffff', label: 'Crisp White' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => setDrawColor(c.color)}
                        className={`h-4 w-4 rounded-[2px] transition-transform cursor-pointer border ${
                          drawColor === c.color ? 'scale-125 border-white ring-1 ring-white/50' : 'border-black/50'
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.label}
                      />
                    ))}
                  </div>

                  {/* Stroke Width Selector */}
                  <div className="flex items-center gap-1 border-r border-[#383a42] pr-2">
                    {[
                      { size: 2, label: 'Fine' },
                      { size: 4, label: 'Medium' },
                      { size: 8, label: 'Bold' },
                    ].map((sw) => (
                      <button
                        key={sw.size}
                        type="button"
                        onClick={() => setStrokeWidth(sw.size)}
                        className={`px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono transition-colors cursor-pointer ${
                          strokeWidth === sw.size
                            ? 'bg-[#2e3038] text-foreground font-bold border border-[#484a54]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {sw.label}
                      </button>
                    ))}
                  </div>

                  {/* Board Background Selector */}
                  <div className="flex items-center gap-1 border-r border-[#383a42] pr-2">
                    <select
                      value={boardBackground}
                      onChange={(e) => setBoardBackground(e.target.value as any)}
                      className="bg-[#26282e] border border-[#3e404a] text-foreground text-[10px] font-semibold rounded-[3px] px-1.5 py-1 focus:outline-none cursor-pointer"
                      title="Board Theme"
                    >
                      <option value="optics">Physics Optics</option>
                      <option value="grid">Coordinate Grid</option>
                      <option value="blackboard">Matte Blackboard</option>
                      <option value="ruled">Ruled Notebook</option>
                    </select>
                  </div>

                  {/* Quick Action: Plot Demo Ray Diagram */}
                  <button
                    type="button"
                    onClick={handlePlotRayDiagram}
                    className="px-2 py-1 rounded-[3px] bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    title="Plot Convex Lens Optical Ray Diagram Demonstration"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Plot Ray Diagram</span>
                  </button>

                  {/* Clear Canvas */}
                  <button
                    type="button"
                    onClick={clearWhiteboardCanvas}
                    className="p-1 rounded-[3px] hover:bg-rose-950/40 text-muted-foreground hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                    title="Clear Whiteboard Strokes"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* ── HTML5 INTERACTIVE DRAWING CANVAS LAYER ── */}
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                />

                {/* ── UNDERLYING TEACHING CONTENT & DERIVATION SHEET ── */}
                <div className="w-full h-full p-6 pt-16 flex flex-col justify-between pointer-events-none select-none z-0">
                  <div className="flex items-center justify-between border-b border-[#2a2c34] pb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-[2px] bg-primary/20 text-primary font-mono text-[10px] font-bold border border-primary/40">
                        INTERACTIVE BOARD
                      </span>
                      <span className="font-semibold text-foreground">
                        NCERT Physics Chapter 9: Spherical Lenses & Optical Formulations
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Slide 4 of 12 · Digital Pen Active (Click & Drag to Draw)
                    </span>
                  </div>

                  {/* Content Cards / Formulas */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-auto max-w-4xl mx-auto w-full">
                    <div className="p-3.5 rounded-[4px] bg-[#17181c]/90 border border-[#2d2f36] space-y-2">
                      <div className="flex items-center justify-between border-b border-[#26282e] pb-1.5">
                        <span className="font-mono text-xs font-bold text-amber-300">
                          1. Thin Lens Equation
                        </span>
                        <VFBadge variant="success" className="text-[9px] rounded-[2px]">Standard</VFBadge>
                      </div>
                      <p className="font-mono text-base font-black text-foreground text-center py-1 bg-[#121316] rounded-[3px] border border-[#25262c]">
                        1 / f = 1 / v - 1 / u
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Where <strong className="text-foreground">u</strong> = Object distance, <strong className="text-foreground">v</strong> = Image distance, <strong className="text-foreground">f</strong> = Focal length.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-[4px] bg-[#17181c]/90 border border-[#2d2f36] space-y-2">
                      <div className="flex items-center justify-between border-b border-[#26282e] pb-1.5">
                        <span className="font-mono text-xs font-bold text-sky-400">
                          2. Linear Magnification (m)
                        </span>
                        <VFBadge variant="outline" className="text-[9px] rounded-[2px]">Ratio</VFBadge>
                      </div>
                      <p className="font-mono text-base font-black text-foreground text-center py-1 bg-[#121316] rounded-[3px] border border-[#25262c]">
                        m = v / u = Height of Image (h&apos;) / Height of Object (h)
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        For convex lens forming real & inverted image, magnification is <strong className="text-rose-400">negative (-)</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Whiteboard Notes List (Updated when pasting from Web Search) */}
                  <div className="p-2.5 rounded-[3px] bg-[#16171a]/95 border border-[#2c2e35] text-[11px] text-muted-foreground space-y-1">
                    <span className="font-bold text-foreground block text-[10px] uppercase tracking-wider">
                      Teacher Working Notes & Reference Inputs:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-foreground font-mono text-[10px]">
                      {boardNotesList.map((note, idx) => (
                        <div key={idx} className="truncate bg-[#1a1b20] p-1 rounded-[2px] border border-[#292b32]">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Speaker Floating Badge */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-xs px-2.5 py-1 rounded-[3px] border border-border/40 text-xs">
                  <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-bold text-foreground">Dr. Sarah Connor (Host)</span>
                </div>
              </div>

              {/* Bottom Filmstrip of Student Attendees */}
              <div className="h-28 shrink-0 flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
                {/* Self Tile (Sharp corners) */}
                <div className="w-44 h-full rounded-[4px] bg-[#1a1a1e] border border-[#2d2f36] relative flex flex-col justify-between p-2 shrink-0 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">You</span>
                    {isHandRaised && <span className="text-xs">✋</span>}
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    {isCameraOff ? (
                      <div className="h-8 w-8 rounded-[4px] bg-[#2a2c33] border border-[#3e4048] flex items-center justify-center font-bold text-xs text-foreground">
                        YOU
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-mono text-[9px] text-muted-foreground">
                        [ Live Cam ]
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-[#26272c] pt-1">
                    <span className="font-semibold text-foreground">Self View</span>
                    {isMicMuted ? (
                      <MicOff className="h-3 w-3 text-rose-400" />
                    ) : (
                      <Mic className="h-3 w-3 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Other Students */}
                {participants
                  .filter((p) => !p.isHost)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="w-44 h-full rounded-[4px] bg-[#1a1a1e] border border-[#2d2f36] hover:border-primary/50 relative flex flex-col justify-between p-2 shrink-0 transition-colors overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground truncate">{p.roll.split('·')[0]}</span>
                        {p.isHandRaised && <span className="text-xs">✋</span>}
                      </div>

                      <div className="flex items-center justify-center flex-1">
                        <div className="h-8 w-8 rounded-[4px] bg-[#27282e] border border-[#363840] flex items-center justify-center font-bold text-xs text-foreground">
                          {p.avatar}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-[#26272c] pt-1">
                        <span className="font-bold text-foreground truncate">{p.name}</span>
                        {p.isMuted ? (
                          <MicOff className="h-3 w-3 text-rose-400 shrink-0" />
                        ) : (
                          <Mic className="h-3 w-3 text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* ── GALLERY 3X3 GRID MODE (Sharp Geometric Tiles) ── */
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2.5 min-h-0 overflow-y-auto">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="rounded-[4px] bg-[#1a1a1e] border border-[#2d2f36] relative flex flex-col justify-between p-3 overflow-hidden group hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between w-full">
                    {p.isHost ? (
                      <VFBadge variant="primary" className="text-[9px] rounded-[2px]">HOST</VFBadge>
                    ) : (
                      <span className="text-[10px] font-mono text-muted-foreground">{p.roll.split('·')[0]}</span>
                    )}
                    {p.isHandRaised && <span className="text-sm">✋</span>}
                  </div>

                  <div className="flex flex-col items-center justify-center flex-1 my-2">
                    <div className="h-12 w-12 rounded-[4px] bg-[#27282e] border border-[#3a3c44] flex items-center justify-center text-sm font-black text-foreground shadow-xs">
                      {p.avatar}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#26272c]">
                    <span className="font-bold text-foreground truncate">{p.name}</span>
                    {p.isMuted ? (
                      <MicOff className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                    ) : (
                      <Mic className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ──────────────────────────────────────────────────────────────────────────
            SIDE PANELS (CHAT, PARTICIPANTS, NOTES, IN-CLASS WEB SEARCH)
            ────────────────────────────────────────────────────────────────────────── */}
        {activeSidePanel && (
          <aside className="w-80 md:w-96 bg-[#18191c] border-l border-[#28292d] flex flex-col shrink-0 z-20 transition-all">
            {/* Header */}
            <div className="h-12 border-b border-[#28292d] px-4 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                {activeSidePanel === 'chat' && <><MessageSquare className="h-4 w-4 text-primary" /> In-Call Chat</>}
                {activeSidePanel === 'participants' && <><Users className="h-4 w-4 text-primary" /> Participants (38)</>}
                {activeSidePanel === 'search' && <><Globe className="h-4 w-4 text-sky-400" /> In-Class Web Search</>}
                {activeSidePanel === 'notes' && <><BookOpen className="h-4 w-4 text-amber-400" /> Study Notes</>}
              </h3>
              <button
                type="button"
                onClick={() => setActiveSidePanel(null)}
                className="p-1 rounded-[3px] hover:bg-[#25262c] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 1. IN-CLASS WEB SEARCH & ACADEMIC VAULT (Requested Feature) */}
            {activeSidePanel === 'search' && (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Search Bar */}
                <div className="p-3 border-b border-[#28292d] bg-[#161719] space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={webSearchQuery}
                      onChange={(e) => handlePerformSearch(e.target.value)}
                      placeholder="Search formulas, NCERT topics, constants..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-[3px] bg-[#202125] border border-[#32343a] text-foreground text-xs focus:outline-none focus:border-primary"
                    />
                    <Search className="h-3.5 w-3.5 absolute left-2.5 top-2 text-muted-foreground" />
                  </div>

                  {/* Quick Topics Filter Chips */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-[10px]">
                    {['All', 'Lens Formula', 'Snell\'s Law', 'Sign Convention', 'Power'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handlePerformSearch(chip === 'All' ? '' : chip)}
                        className={`px-2 py-0.5 rounded-[2px] border font-semibold shrink-0 transition-colors cursor-pointer ${
                          (chip === 'All' && !webSearchQuery) || webSearchQuery === chip
                            ? 'bg-sky-500/20 text-sky-400 border-sky-500/40'
                            : 'bg-[#1f2025] text-muted-foreground border-[#32343a] hover:text-foreground'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results List */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-[4px] bg-[#202125] border border-[#32343a] hover:border-primary/40 space-y-2 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-sky-400 uppercase font-mono">{item.category}</span>
                        <VFBadge variant="success" className="text-[8px] rounded-[2px]">{item.verifiedSource.split('/')[0]}</VFBadge>
                      </div>

                      <h4 className="font-bold text-foreground text-xs leading-snug">{item.title}</h4>

                      {item.formula && (
                        <div className="p-2 rounded-[3px] bg-[#17181c] border border-[#292b31] font-mono text-[11px] text-amber-300 font-bold">
                          {item.formula}
                        </div>
                      )}

                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-[#292b31] text-[10px]">
                        <button
                          type="button"
                          onClick={() => handlePasteSearchResultToBoard(item)}
                          className="px-2 py-1 rounded-[3px] bg-[#282a30] hover:bg-[#32343c] text-foreground font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <PenTool className="h-2.5 w-2.5 text-primary" />
                          <span>Paste to Board</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShareSearchResultToChat(item)}
                          className="px-2 py-1 rounded-[3px] bg-[#282a30] hover:bg-[#32343c] text-foreground font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Send className="h-2.5 w-2.5 text-sky-400" />
                          <span>Share in Chat</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. IN-CALL CHAT PANEL */}
            {activeSidePanel === 'chat' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  <div className="p-2.5 rounded-[3px] bg-[#222327] border border-[#303238] text-[11px] text-muted-foreground text-center">
                    Messages are delivered in real-time to all 38 class participants.
                  </div>

                  {messages.map((m) => (
                    <div key={m.id} className={`space-y-1 ${m.isSelf ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground justify-start">
                        <span className="font-bold text-foreground">{m.sender}</span>
                        <span>·</span>
                        <span>{m.time}</span>
                      </div>
                      <div
                        className={`p-2.5 rounded-[4px] text-xs inline-block max-w-[85%] leading-relaxed ${
                          m.isSelf
                            ? 'bg-primary text-primary-foreground font-medium text-left'
                            : 'bg-[#222328] border border-[#32343a] text-foreground'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-[#28292d] bg-[#161719] flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={isHindi ? 'संदेश टाइप करें...' : 'Ask question or post message...'}
                    className="flex-1 px-3 py-2 rounded-[3px] bg-[#202125] border border-[#32343a] text-foreground text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-[3px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* 3. PARTICIPANTS PANEL */}
            {activeSidePanel === 'participants' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-3 border-b border-[#28292d] bg-[#161719]">
                  <input
                    type="text"
                    value={participantSearch}
                    onChange={(e) => setParticipantSearch(e.target.value)}
                    placeholder="Search participant by name..."
                    className="w-full px-3 py-1.5 rounded-[3px] bg-[#202125] border border-[#32343a] text-foreground text-xs focus:outline-none"
                  />
                </div>

                <div className="flex-1 p-2 overflow-y-auto space-y-1 text-xs">
                  {participants
                    .filter((p) => p.name.toLowerCase().includes(participantSearch.toLowerCase()))
                    .map((p) => (
                      <div
                        key={p.id}
                        className="p-2 rounded-[3px] hover:bg-[#202125] flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="h-7 w-7 rounded-[3px] bg-[#27282e] border border-[#363840] flex items-center justify-center font-bold text-[10px] shrink-0">
                            {p.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground truncate text-xs">{p.name}</p>
                            <p className="text-[10px] text-muted-foreground">{p.roll}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {p.isHandRaised && <span className="text-xs">✋</span>}
                          {p.isMuted ? (
                            <MicOff className="h-3.5 w-3.5 text-rose-400" />
                          ) : (
                            <Mic className="h-3.5 w-3.5 text-emerald-400" />
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="p-3 border-t border-[#28292d] bg-[#161719] flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono text-[11px]">Teacher Controls</span>
                  <button
                    type="button"
                    onClick={() => {
                      setParticipants((prev) => prev.map((p) => (p.isHost ? p : { ...p, isMuted: true })));
                      addNotification({
                        title: 'All Attendees Muted',
                        description: 'Microphones muted by host.',
                        type: 'info',
                      });
                    }}
                    className="px-2.5 py-1 rounded-[3px] bg-[#24252a] hover:bg-[#2c2d32] border border-[#383a40] text-xs font-bold text-foreground transition-colors cursor-pointer"
                  >
                    Mute All
                  </button>
                </div>
              </div>
            )}

            {/* 4. NOTES PANEL */}
            {activeSidePanel === 'notes' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-[3px] bg-[#202124] border border-[#323438] space-y-2">
                  <h4 className="font-bold text-foreground">Lecture Key Points:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    <li>Convex lens forms real and virtual images depending on object distance.</li>
                    <li>Object beyond 2F forms real inverted diminished image between F and 2F.</li>
                    <li>Magnification m = v / u = h&apos; / h.</li>
                    <li>Power of lens P = 1 / f (in meters), measured in Dioptres (D).</li>
                  </ul>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. BOTTOM CONTROL DOCK (Strict Sharp Geometric Buttons - NO rounded-full)
          ────────────────────────────────────────────────────────────────────────── */}
      <footer className="h-16 bg-[#18191c] border-t border-[#28292d] px-4 flex items-center justify-between shrink-0 z-20 shadow-md">
        {/* Left: Meeting Code & Mode Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono font-bold text-foreground">{sessionCode}</span>
          <span>|</span>
          <span className="text-emerald-400 font-mono flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-[1px] bg-emerald-500" />
            WebRTC HD Studio
          </span>
        </div>

        {/* Center: Core Action Controls Dock (Sharp rounded-[4px] corners) */}
        <div className="flex items-center gap-2 mx-auto">
          {/* Mic Button */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`h-10 px-3.5 rounded-[4px] border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isMicMuted
                ? 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMicMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span className="hidden sm:inline">{isMicMuted ? 'Muted' : 'Mic On'}</span>
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={handleToggleCamera}
            className={`h-10 px-3.5 rounded-[4px] border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isCameraOff
                ? 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isCameraOff ? 'Turn On Camera' : 'Turn Off Camera'}
          >
            {isCameraOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            <span className="hidden sm:inline">{isCameraOff ? 'Cam Off' : 'Video'}</span>
          </button>

          {/* Screen Share Button */}
          <button
            type="button"
            onClick={handleToggleScreenShare}
            className={`h-10 px-3.5 rounded-[4px] border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isScreenSharing
                ? 'bg-primary border-primary text-primary-foreground shadow-xs'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isScreenSharing ? 'Stop Presenting' : 'Share Screen'}
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Whiteboard / Draw Tools Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsDrawingMode(!isDrawingMode);
              addNotification({
                title: !isDrawingMode ? 'Whiteboard Drawing Enabled' : 'Whiteboard Drawing Paused',
                description: !isDrawingMode ? 'Click and drag on the screen to draw.' : 'Drawing overlay hidden.',
                type: 'info',
              });
            }}
            className={`h-10 px-3.5 rounded-[4px] border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isDrawingMode
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title="Toggle Whiteboard Drawing"
          >
            <PenTool className="h-4 w-4" />
            <span className="hidden md:inline">Draw Tools</span>
          </button>

          {/* In-Class Web Search Toggle (Requested feature) */}
          <button
            type="button"
            onClick={() => setActiveSidePanel(activeSidePanel === 'search' ? null : 'search')}
            className={`h-10 px-3.5 rounded-[4px] border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeSidePanel === 'search'
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-400'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title="In-Class Web Search & NCERT Knowledge Vault"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Web Search</span>
          </button>

          {/* Raise Hand Button */}
          <button
            type="button"
            onClick={handleToggleHand}
            className={`h-10 px-3.5 rounded-[4px] border font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isHandRaised
                ? 'bg-amber-500 border-amber-500 text-black font-extrabold'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isHandRaised ? 'Lower Hand' : 'Raise Hand'}
          >
            <Hand className="h-4 w-4" />
            <span className="hidden sm:inline">{isHandRaised ? 'Raised ✋' : 'Raise'}</span>
          </button>

          {/* End Call Button (Sharp Rectangular Red Button) */}
          <button
            type="button"
            onClick={() => setIsLeaveConfirmOpen(true)}
            className="h-10 px-4 rounded-[4px] bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ml-1"
            title="Leave Meeting"
          >
            <PhoneOff className="h-4 w-4" />
            <span>End Call</span>
          </button>
        </div>

        {/* Right: Drawer Toggles */}
        <div className="flex items-center gap-1.5">
          {/* Notes Toggle */}
          <button
            type="button"
            onClick={() => setActiveSidePanel(activeSidePanel === 'notes' ? null : 'notes')}
            className={`h-10 w-10 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer ${
              activeSidePanel === 'notes'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-[#222327] border-[#36383e] text-muted-foreground hover:text-foreground'
            }`}
            title="Lecture Notes"
          >
            <BookOpen className="h-4 w-4" />
          </button>

          {/* Chat Toggle */}
          <button
            type="button"
            onClick={() => setActiveSidePanel(activeSidePanel === 'chat' ? null : 'chat')}
            className={`h-10 w-10 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer relative ${
              activeSidePanel === 'chat'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-[#222327] border-[#36383e] text-muted-foreground hover:text-foreground'
            }`}
            title="In-Call Chat"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-[2px] bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">
              {messages.length}
            </span>
          </button>

          {/* Participants Toggle */}
          <button
            type="button"
            onClick={() => setActiveSidePanel(activeSidePanel === 'participants' ? null : 'participants')}
            className={`h-10 w-10 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer relative ${
              activeSidePanel === 'participants'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-[#222327] border-[#36383e] text-muted-foreground hover:text-foreground'
            }`}
            title="Participants Roster"
          >
            <Users className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 px-1 rounded-[2px] bg-emerald-600 text-[9px] font-bold text-white flex items-center justify-center">
              38
            </span>
          </button>

          {/* Settings Toggle */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="h-10 w-10 rounded-[4px] bg-[#222327] border border-[#36383e] text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
            title="Audio & Video Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </footer>

      {/* ── Settings Dialog ── */}
      <VFDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Audio & Video Settings"
        description="Configure devices, video stream resolution, and noise cancellation"
        className="max-w-md rounded-[4px]"
        footerActions={
          <VFButton
            size="sm"
            onClick={() => {
              setIsSettingsOpen(false);
              addNotification({
                title: 'Settings Saved',
                description: 'Audio & video preferences updated.',
                type: 'success',
              });
            }}
            className="rounded-[3px]"
          >
            Done
          </VFButton>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div>
            <label className="block text-muted-foreground font-semibold mb-1">Microphone Input</label>
            <select className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#181818] text-foreground text-xs focus:outline-none">
              <option>Default - Internal Microphone (Realtek Audio)</option>
              <option>External USB Headset Mic</option>
            </select>
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">Speaker Output</label>
            <select className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#181818] text-foreground text-xs focus:outline-none">
              <option>Default - Speakers / Headphones (Realtek Audio)</option>
            </select>
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">Camera Device</label>
            <select className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#181818] text-foreground text-xs focus:outline-none">
              <option>Integrated HD Webcam (1920x1080)</option>
            </select>
          </div>

          <div className="p-2.5 rounded-[3px] bg-[#181818] border border-border/80 flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">AI Noise Cancellation</p>
              <p className="text-[10px] text-muted-foreground">Filters classroom acoustic echo & background noise</p>
            </div>
            <span className="text-emerald-400 font-bold text-xs">Active</span>
          </div>
        </div>
      </VFDialog>

      {/* ── Leave Meeting Confirmation Dialog ── */}
      <VFDialog
        isOpen={isLeaveConfirmOpen}
        onClose={() => setIsLeaveConfirmOpen(false)}
        title={isHindi ? 'क्या आप क्लास छोड़ना चाहते हैं?' : 'Leave E-Class Session?'}
        description={isHindi ? 'आप किसी भी समय टाइमटेबल से पुनः जुड़ सकते हैं।' : 'You can rejoin anytime from the Live Timetable tab.'}
        className="max-w-sm rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsLeaveConfirmOpen(false)}
              className="rounded-[3px]"
            >
              {isHindi ? 'रुकें' : 'Stay in Call'}
            </VFButton>
            <VFButton
              size="sm"
              variant="danger"
              onClick={handleLeaveMeeting}
              className="rounded-[3px]"
            >
              {isHindi ? 'क्लास छोड़ें' : 'Leave Call'}
            </VFButton>
          </div>
        }
      >
        <p className="text-xs text-muted-foreground py-1">
          Are you sure you want to disconnect from <strong>{sessionCode}</strong>? Your attendance and lesson notes will be stored in your digital portfolio.
        </p>
      </VFDialog>
    </div>
  );
}
