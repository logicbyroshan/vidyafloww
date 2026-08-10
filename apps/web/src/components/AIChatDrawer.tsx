import * as React from 'react';
import { Sparkles, X, Send, Bot, User, Maximize2, Minimize2 } from 'lucide-react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export function AIChatDrawer({ isOpen, onClose, initialPrompt }: AIChatDrawerProps) {
  const [input, setInput] = React.useState('');
  const [drawerWidth, setDrawerWidth] = React.useState(480);
  const [isDragging, setIsDragging] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello Roshan! I am VidyaCopilot. How can I assist you with school management today?',
      timestamp: 'Just now',
    },
  ]);
  const [isThinking, setIsThinking] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Drag handler for resizing drawer up to 50vw
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const maxAllowed = window.innerWidth * 0.5; // Max 50vw
      const minAllowed = 380;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= minAllowed && newWidth <= maxAllowed) {
        setDrawerWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = 'auto';
    };

    if (isDragging) {
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.body.style.userSelect = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  React.useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      let replyText = `I have processed your request for "${text}". All updates have been verified.`;
      if (text.toLowerCase().includes('fee') || text.toLowerCase().includes('defaulter')) {
        replyText = 'AI Fee Analysis: 14 students flagged with pending fees >15 days. Automated notification batch generated for approval.';
      } else if (text.toLowerCase().includes('attendance')) {
        replyText = 'AI Attendance Alert: Overall attendance is 94.5%. 8 students flagged for consecutive absences.';
      } else if (text.toLowerCase().includes('admission')) {
        replyText = 'AI Admissions Summary: 28 total intake applications. 18 auto-verified with high match scores (>90%).';
      }

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background/50 backdrop-blur-xs flex justify-end">
      <div
        style={{ width: `${drawerWidth}px`, maxWidth: '50vw' }}
        className="bg-card border-l border-border h-full flex flex-col shadow-2xl animate-slide-in-right relative select-none"
      >
        {/* Left Edge Drag Resizer (Clean, no harsh orange highlights) */}
        <div
          onMouseDown={() => setIsDragging(true)}
          className="absolute left-0 top-0 bottom-0 w-2 -ml-1 cursor-ew-resize flex items-center justify-center z-20 group"
        >
          <div className="w-1 h-8 rounded-full bg-border group-hover:bg-primary/70 transition-colors" />
        </div>

        {/* Header */}
        <div className="h-16 px-5 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Bot className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                VidyaCopilot
                <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.2 rounded font-semibold">AI</span>
              </h3>
              <p className="text-[11px] text-muted-foreground">Always-on School Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setDrawerWidth(drawerWidth > 500 ? 480 : Math.floor(window.innerWidth * 0.45))}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {drawerWidth > 500 ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="h-8 w-8 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground font-medium rounded-tr-none shadow-xs'
                    : 'bg-muted border border-border text-foreground rounded-tl-none'
                }`}
              >
                <p className="text-xs">{msg.text}</p>
                <span
                  className={`text-[9px] block mt-1 ${
                    msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="h-8 w-8 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 mt-0.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 items-center">
              <div className="h-8 w-8 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-primary animate-spin" />
              </div>
              <div className="p-3.5 bg-muted border border-border rounded-2xl text-muted-foreground text-xs animate-pulse">
                VidyaCopilot is processing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2.5 bg-muted/30 border-t border-border flex gap-2 overflow-x-auto custom-scrollbar">
          {['Analyze Fees', 'Attendance Summary', 'Intake Report'].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-card hover:bg-primary/15 text-muted-foreground hover:text-primary px-3 py-1.5 rounded-lg border border-border transition-all whitespace-nowrap shrink-0 font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-4 border-t border-border bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask VidyaCopilot or request action..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-all shrink-0 shadow-xs"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
