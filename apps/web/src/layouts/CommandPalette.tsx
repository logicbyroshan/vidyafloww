import * as React from 'react';
import { Command } from 'cmdk';
import { VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { useGlobalStore } from '../stores/globalStore';
import {
  Search,
  LayoutDashboard,
  UserSquare,
  Users,
  GraduationCap,
  Calendar,
  CalendarCheck,
  ClipboardList,
  CircleDollarSign,
  Landmark,
  Briefcase,
  BookOpen,
  Bus,
  Building,
  Package,
  MonitorPlay,
  Files,
  MessageSquare,
  Sparkles,
  UserCheck,
  BarChart3,
  ShieldCheck,
  Settings,
  Plus,
  ArrowRight,
  X,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const ICON_MAP: Record<string, any> = {
  LayoutDashboard,
  UserSquare,
  Users,
  GraduationCap,
  Calendar,
  CalendarCheck,
  ClipboardList,
  CircleDollarSign,
  Landmark,
  Briefcase,
  BookOpen,
  Bus,
  Building,
  Package,
  MonitorPlay,
  Files,
  MessageSquare,
  Sparkles,
  UserCheck,
  BarChart3,
  ShieldCheck,
  Settings,
};

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { toggleAiChat } = useGlobalStore();
  const [search, setSearch] = React.useState('');

  const commands = React.useMemo(() => {
    const moduleCommands = MODULE_REGISTRY.map((mod) => ({
      id: mod.id,
      icon: ICON_MAP[mod.iconName] || LayoutDashboard,
      label: `Go to ${mod.code}. ${mod.label}`,
      route: mod.route,
      category: 'Navigation',
      shortcut: `⌘${mod.code}`,
      onSelect: () => {
        navigate({ to: mod.route });
        onClose();
      },
    }));

    const actionCommands = [
      {
        id: 'act-new-admit',
        icon: Plus,
        label: 'New Admission Application',
        route: '/admissions',
        category: 'Actions',
        shortcut: 'Shift+A',
        onSelect: () => {
          navigate({ to: '/admissions' });
          onClose();
        },
      },
      {
        id: 'act-ask-ai',
        icon: Sparkles,
        label: 'Ask VidyaFlow AI Assistant',
        route: '',
        category: 'Actions',
        shortcut: 'Shift+K',
        onSelect: () => {
          onClose();
          toggleAiChat();
        },
      },
    ];

    return [...moduleCommands, ...actionCommands];
  }, [navigate, onClose, toggleAiChat]);

  if (!isOpen) return null;

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => { if (!open) onClose(); }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex items-start justify-center p-4 md:p-6 pt-20 animate-fade-in"
      label="Command Palette"
    >
      <div className="w-full max-w-2xl bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl overflow-hidden shadow-2xl animate-scale-in flex flex-col divide-y divide-border/60">
        {/* Top Search Input Bar */}
        <div className="flex items-center px-4 py-3 bg-card">
          <Search className="h-4 w-4 text-primary mr-3 shrink-0" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            className="flex-1 h-9 bg-transparent outline-none text-xs text-foreground placeholder:text-muted-foreground font-medium border-none focus:ring-0"
            placeholder="Type a command or search across all 24 ERP modules..."
            autoFocus
          />
        </div>

        {/* Command List Scroll View Powered by cmdk */}
        <Command.List className="max-h-[380px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
          <Command.Empty className="py-12 text-center text-xs text-muted-foreground space-y-1">
            <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="font-semibold text-foreground">No matching commands found</p>
            <p>Try searching for "Admissions", "Fees", "Timetable", "Security", or "AI"</p>
          </Command.Empty>

          <Command.Group heading="24 Main ERP Modules & Actions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest">
            {commands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <Command.Item
                  key={cmd.id}
                  value={`${cmd.label} ${cmd.category}`}
                  onSelect={cmd.onSelect}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all outline-none text-xs text-left cursor-pointer border border-transparent data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary data-[selected=true]:font-bold data-[selected=true]:border-primary/30 data-[selected=true]:shadow-xs text-foreground hover:bg-muted/50"
                >
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 bg-muted text-muted-foreground group-data-[selected=true]:bg-primary group-data-[selected=true]:text-primary-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="flex-1 truncate font-medium">{cmd.label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/60">
                      {cmd.shortcut}
                    </span>
                    <VFBadge variant="outline" className="text-xs px-2 py-0.5">
                      {cmd.category}
                    </VFBadge>
                    <ArrowRight className="h-3.5 w-3.5 opacity-40 group-data-[selected=true]:opacity-100 group-data-[selected=true]:text-primary transition-all" />
                  </div>
                </Command.Item>
              );
            })}
          </Command.Group>
        </Command.List>

        {/* Bottom Footer Bar with Shortcuts & Close Button */}
        <div className="px-4 py-2.5 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-xs font-bold text-foreground">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-xs font-bold text-foreground">↵</kbd> Select
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                onClose();
                toggleAiChat();
              }}
              className="flex items-center gap-1 text-primary font-bold text-xs hover:underline cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>VidyaFlow AI</span>
            </button>

            {/* Close Button in Bottom Footer */}
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-muted hover:bg-destructive/15 text-muted-foreground hover:text-destructive border border-border hover:border-destructive/30 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
              title="Close palette"
            >
              <X className="h-3.5 w-3.5" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
}
