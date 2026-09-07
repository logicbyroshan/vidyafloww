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
  { id: 'm1', sender: 'Dr. Sarah Connor', avatar: 'SC', time: '10:02 AM', text: 'Good morning class! Please turn to Chapter 9 Optics, slide 4 on the board.' },
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
  const [activeSidePanel, setActiveSidePanel] = React.useState<'chat' | 'participants' | 'notes' | null>(null);
  const [viewMode, setViewMode] = React.useState<'speaker' | 'grid'>('speaker');

  // Elapsed Timer (24:18 -> counts up)
  const [secondsElapsed, setSecondsElapsed] = React.useState(1458); // 24m 18s
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

  // Participants State
  const [participants, setParticipants] = React.useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [participantSearch, setParticipantSearch] = React.useState('');

  // Settings dialog
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  // Leave Confirm Dialog
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = React.useState(false);

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

    // Simulate quick peer response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now() + 1}`,
          sender: 'Dr. Sarah Connor',
          avatar: 'SC',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Noted! Moving to the next numerical derivation on lens maker formula.',
        },
      ]);
    }, 1200);
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
      description: next ? 'Teacher notified of your query.' : 'Hand status cleared.',
      type: 'info',
    });
  };

  const handleToggleScreenShare = () => {
    const next = !isScreenSharing;
    setIsScreenSharing(next);
    addNotification({
      title: next ? 'Screen Sharing Started' : 'Screen Sharing Ended',
      description: next ? 'Presenting display stream to room.' : 'Switched back to video grid.',
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
          1. GOOGLE MEET / ZOOM TOP APP BAR
          ────────────────────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-[#18191c] border-b border-[#28292d] px-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        {/* Left: Session Title & Code */}
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
              <span className="truncate">Host: Dr. Sarah Connor</span>
            </div>
          </div>
        </div>

        {/* Center: Live Status Indicators */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-rose-950/30 border border-rose-500/40 px-2.5 py-1 rounded-[3px] text-[11px] font-mono text-rose-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span>REC ● 1080p HD</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#202124] border border-[#323438] px-2.5 py-1 rounded-[3px] text-xs font-mono text-foreground font-semibold">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/20 border border-emerald-500/30 px-2 py-1 rounded-[3px]">
            <Shield className="h-3 w-3" />
            <span>E2E Encrypted</span>
          </div>
        </div>

        {/* Right: Layout Switcher & Return to Dashboard */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'speaker' ? 'grid' : 'speaker')}
            className="px-2.5 py-1.5 rounded-[3px] bg-[#222327] hover:bg-[#2c2d32] border border-[#383a40] text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
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
            className="p-1.5 rounded-[3px] bg-[#222327] hover:bg-[#2c2d32] border border-[#383a40] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Copy Joining Link"
          >
            <Copy className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsLeaveConfirmOpen(true)}
            className="px-3 py-1.5 rounded-[3px] bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ml-1"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            <span>{isHindi ? 'क्लास छोड़ें' : 'Leave Call'}</span>
          </button>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. MAIN STAGE CANVAS + OPTIONAL SIDEBAR
          ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden bg-[#0f0f11]">
        {/* Main Stage Grid Area */}
        <div className="flex-1 flex flex-col p-3 min-w-0 min-h-0 overflow-hidden relative">
          {viewMode === 'speaker' ? (
            /* ── SPEAKER / PRESENTATION MODE ── */
            <div className="flex-1 flex flex-col gap-3 min-h-0">
              {/* Primary Central Presentation / Hero Video */}
              <div className="flex-1 rounded-[4px] bg-[#1a1a1e] border border-[#2a2b30] relative overflow-hidden flex flex-col items-center justify-center group shadow-md min-h-0">
                {isScreenSharing ? (
                  /* Screen Share / Whiteboard Canvas */
                  <div className="w-full h-full p-4 flex flex-col justify-between bg-radial from-[#1e2025] to-[#141417]">
                    <div className="flex items-center justify-between w-full border-b border-[#303238] pb-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-[2px] bg-primary/20 text-primary font-mono text-[10px] font-bold border border-primary/40">
                          PRESENTING
                        </span>
                        <span className="font-semibold text-foreground">
                          Dr. Sarah Connor's Digital SmartBoard (Physics Optics Slide #04)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                        <span>1920x1080 @ 60fps</span>
                      </div>
                    </div>

                    {/* Interactive Physics Diagram Graphic */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                      <div className="max-w-xl w-full p-5 rounded-[4px] bg-[#111215] border border-[#2d2f36] space-y-3 text-left">
                        <div className="flex items-center justify-between border-b border-[#25262c] pb-2">
                          <h3 className="font-mono text-xs font-bold text-primary">
                            1. The Thin Lens Formula: 1/f = 1/v - 1/u
                          </h3>
                          <VFBadge variant="success" className="text-[10px] rounded-[2px]">CBSE Class 10 Syllabus</VFBadge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          • <strong className="text-foreground">u</strong> = Object distance from optical center (always negative by sign convention).
                          <br />
                          • <strong className="text-foreground">v</strong> = Image distance from optical center (positive for real, inverted image).
                          <br />
                          • <strong className="text-foreground">f</strong> = Focal length of convex lens (+ve) or concave lens (-ve).
                        </p>
                        <div className="p-2.5 rounded-[3px] bg-[#17181c] border border-[#2e3038] font-mono text-[11px] text-amber-300">
                          Example: An object is placed 20 cm in front of a convex lens of focal length 10 cm.
                          <br />
                          v = (u × f) / (u + f) = (-20 × 10) / (-20 + 10) = -200 / -10 = <strong className="text-emerald-400">+20 cm (Real, Inverted)</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full border-t border-[#303238] pt-2 text-[11px] text-muted-foreground">
                      <span>Interactive Pen & Laser Pointer Active</span>
                      <span className="text-primary font-mono font-semibold">Page 4 of 12</span>
                    </div>
                  </div>
                ) : (
                  /* Hero Teacher Video Tile */
                  <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-b from-[#1c1d22] to-[#121316]">
                    <div className="relative">
                      <div className="h-28 w-28 rounded-full bg-[#2a2c33] border-2 border-primary/60 flex items-center justify-center shadow-2xl">
                        <span className="font-black text-3xl text-foreground">SC</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-black">
                        <Volume2 className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="font-bold text-base text-foreground mt-4">Dr. Sarah Connor</p>
                    <p className="text-xs text-muted-foreground">Faculty In-Charge · Physics</p>
                  </div>
                )}

                {/* Speaker Floating Overlay Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-[3px] border border-border/40 text-xs">
                  <Volume2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-bold text-foreground">Dr. Sarah Connor (Host)</span>
                </div>
              </div>

              {/* Bottom Filmstrip of Student Tiles */}
              <div className="h-32 shrink-0 flex items-center gap-2.5 overflow-x-auto no-scrollbar pt-1">
                {/* Self Tile */}
                <div className="w-48 h-full rounded-[4px] bg-[#1a1a1e] border border-[#2d2f36] relative flex flex-col justify-between p-2 shrink-0 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">You</span>
                    {isHandRaised && <span className="text-sm">✋</span>}
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    {isCameraOff ? (
                      <div className="h-10 w-10 rounded-full bg-[#2a2c33] flex items-center justify-center font-bold text-xs text-foreground">
                        YOU
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-mono text-[10px] text-muted-foreground">
                        [ 1080p HD Cam ]
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-[#26272c] pt-1">
                    <span className="font-semibold text-foreground">Self Video</span>
                    {isMicMuted ? (
                      <MicOff className="h-3 w-3 text-rose-400" />
                    ) : (
                      <Mic className="h-3 w-3 text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Student Attendees Filmstrip */}
                {participants
                  .filter((p) => !p.isHost)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="w-48 h-full rounded-[4px] bg-[#1a1a1e] border border-[#2d2f36] hover:border-primary/50 relative flex flex-col justify-between p-2 shrink-0 transition-colors overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-foreground truncate">{p.roll.split('·')[0]}</span>
                        {p.isHandRaised && <span className="text-sm">✋</span>}
                      </div>

                      <div className="flex items-center justify-center flex-1">
                        <div className="h-10 w-10 rounded-full bg-[#27282e] border border-[#363840] flex items-center justify-center font-bold text-xs text-foreground">
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
            /* ── GALLERY 3X3 GRID MODE ── */
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
                    {p.isHandRaised && <span className="text-sm animate-bounce">✋</span>}
                  </div>

                  <div className="flex flex-col items-center justify-center flex-1 my-2">
                    <div className="h-14 w-14 rounded-full bg-[#27282e] border border-[#3a3c44] flex items-center justify-center text-base font-black text-foreground shadow-sm">
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
            SIDE PANELS (CHAT, PARTICIPANTS, NOTES)
            ────────────────────────────────────────────────────────────────────────── */}
        {activeSidePanel && (
          <aside className="w-80 md:w-96 bg-[#18191c] border-l border-[#28292d] flex flex-col shrink-0 z-10 transition-all">
            {/* Side Panel Header */}
            <div className="h-12 border-b border-[#28292d] px-4 flex items-center justify-between shrink-0">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                {activeSidePanel === 'chat' && <><MessageSquare className="h-4 w-4 text-primary" /> In-Call Chat</>}
                {activeSidePanel === 'participants' && <><Users className="h-4 w-4 text-primary" /> Participants ({participants.length + 30})</>}
                {activeSidePanel === 'notes' && <><PenTool className="h-4 w-4 text-primary" /> Study Notes & Formulae</>}
              </h3>
              <button
                type="button"
                onClick={() => setActiveSidePanel(null)}
                className="p-1 rounded-[3px] hover:bg-[#25262c] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* CHAT PANEL */}
            {activeSidePanel === 'chat' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                  <div className="p-2.5 rounded-[3px] bg-[#222327] border border-[#303238] text-[11px] text-muted-foreground text-center">
                    Messages are sent to everyone in this session and logged to the classroom transcript.
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

                {/* Chat Input Box */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-[#28292d] bg-[#161719] flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={isHindi ? 'संदेश टाइप करें...' : 'Send a message to everyone...'}
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

            {/* PARTICIPANTS PANEL */}
            {activeSidePanel === 'participants' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-3 border-b border-[#28292d] bg-[#161719]">
                  <input
                    type="text"
                    value={participantSearch}
                    onChange={(e) => setParticipantSearch(e.target.value)}
                    placeholder="Search attendee by name or roll..."
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
                          <div className="h-7 w-7 rounded-full bg-[#27282e] border border-[#363840] flex items-center justify-center font-bold text-[10px] shrink-0">
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
                  <span className="text-muted-foreground font-mono text-[11px]">Host Controls</span>
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
                    className="px-2 py-1 rounded-[3px] bg-[#24252a] hover:bg-[#2c2d32] border border-[#383a40] text-xs font-bold text-foreground transition-colors cursor-pointer"
                  >
                    Mute All
                  </button>
                </div>
              </div>
            )}

            {/* STUDY NOTES PANEL */}
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
          3. GOOGLE MEET / ZOOM BOTTOM CONTROL DOCK
          ────────────────────────────────────────────────────────────────────────── */}
      <footer className="h-16 bg-[#18191c] border-t border-[#28292d] px-4 flex items-center justify-between shrink-0 z-20 shadow-md">
        {/* Left: Meeting Code & Time info */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono font-bold text-foreground">{sessionCode}</span>
          <span>|</span>
          <span>WebRTC 1080p Studio</span>
        </div>

        {/* Center: Core Action Controls Dock */}
        <div className="flex items-center gap-2.5 mx-auto">
          {/* Mic Button */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`p-3 rounded-full border transition-all cursor-pointer ${
              isMicMuted
                ? 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          >
            {isMicMuted ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={handleToggleCamera}
            className={`p-3 rounded-full border transition-all cursor-pointer ${
              isCameraOff
                ? 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isCameraOff ? 'Turn On Camera' : 'Turn Off Camera'}
          >
            {isCameraOff ? <VideoOff className="h-4.5 w-4.5" /> : <Video className="h-4.5 w-4.5" />}
          </button>

          {/* Screen Share Button */}
          <button
            type="button"
            onClick={handleToggleScreenShare}
            className={`p-3 rounded-full border transition-all cursor-pointer ${
              isScreenSharing
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isScreenSharing ? 'Stop Presenting' : 'Share Screen'}
          >
            <Share2 className="h-4.5 w-4.5" />
          </button>

          {/* Raise Hand Button */}
          <button
            type="button"
            onClick={handleToggleHand}
            className={`p-3 rounded-full border transition-all cursor-pointer ${
              isHandRaised
                ? 'bg-amber-500 border-amber-500 text-black'
                : 'bg-[#2b2c31] border-[#3e4046] text-foreground hover:bg-[#38393f]'
            }`}
            title={isHandRaised ? 'Lower Hand' : 'Raise Hand'}
          >
            <Hand className="h-4.5 w-4.5" />
          </button>

          {/* End Call Button (Big Red Pill) */}
          <button
            type="button"
            onClick={() => setIsLeaveConfirmOpen(true)}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 ml-2"
            title="Leave Meeting"
          >
            <PhoneOff className="h-4.5 w-4.5" />
            <span className="hidden sm:inline font-bold">End</span>
          </button>
        </div>

        {/* Right: Drawer Toggles */}
        <div className="flex items-center gap-1.5">
          {/* Notes Toggle */}
          <button
            type="button"
            onClick={() => setActiveSidePanel(activeSidePanel === 'notes' ? null : 'notes')}
            className={`p-2.5 rounded-[4px] border transition-colors cursor-pointer ${
              activeSidePanel === 'notes'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-[#222327] border-[#36383e] text-muted-foreground hover:text-foreground'
            }`}
            title="Lecture Notes"
          >
            <PenTool className="h-4 w-4" />
          </button>

          {/* Chat Toggle */}
          <button
            type="button"
            onClick={() => setActiveSidePanel(activeSidePanel === 'chat' ? null : 'chat')}
            className={`p-2.5 rounded-[4px] border transition-colors cursor-pointer relative ${
              activeSidePanel === 'chat'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-[#222327] border-[#36383e] text-muted-foreground hover:text-foreground'
            }`}
            title="In-Call Chat"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">
              {messages.length}
            </span>
          </button>

          {/* Participants Toggle */}
          <button
            type="button"
            onClick={() => setActiveSidePanel(activeSidePanel === 'participants' ? null : 'participants')}
            className={`p-2.5 rounded-[4px] border transition-colors cursor-pointer relative ${
              activeSidePanel === 'participants'
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-[#222327] border-[#36383e] text-muted-foreground hover:text-foreground'
            }`}
            title="Participants Roster"
          >
            <Users className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 px-1 rounded-full bg-emerald-600 text-[9px] font-bold text-white flex items-center justify-center">
              38
            </span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-[4px] bg-[#222327] border border-[#36383e] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
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
              <p className="text-[10px] text-muted-foreground">Filters background noise automatically</p>
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
          Are you sure you want to disconnect from <strong>{sessionCode}</strong>? Your attendance session timestamp will be saved.
        </p>
      </VFDialog>
    </div>
  );
}
