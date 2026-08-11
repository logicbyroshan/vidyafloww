import * as React from 'react';
import Lenis from 'lenis';
import { Link, useLocation } from '@tanstack/react-router';
import { cn, VFAvatar } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { useGlobalStore } from '../stores/globalStore';
import {
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
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

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

export function Sidebar() {
  const { sidebarExpanded, toggleSidebar, toggleAiChat } = useGlobalStore();
  const location = useLocation();
  const sidebarNavRef = React.useRef<HTMLDivElement | null>(null);

  // Initialize Lenis smooth scroll on Sidebar navigation viewport
  React.useEffect(() => {
    if (!sidebarNavRef.current) return;
    const lenis = new Lenis({
      wrapper: sidebarNavRef.current,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-card border-r border-border/60 transition-all duration-300 relative z-40 shrink-0 select-none',
        sidebarExpanded ? 'w-60' : 'w-16'
      )}
    >
      {/* Sidebar Header & Brand Logo (h-24 = 6rem matching combined h-12 Navbar + h-12 Tabbar height under fluid typography) */}
      <div className="flex h-24 items-center px-4 border-b border-border/60 relative shrink-0">
        {sidebarExpanded ? (
          <div className="flex items-center gap-3.5 w-full animate-fade-in">
            <img
              src="/logo.png"
              alt="VidyaMaxx Logo"
              className="h-14 w-14 object-contain shrink-0 drop-shadow-sm"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-2xl font-black tracking-tight leading-none text-foreground">
                Vidya<span className="text-primary">Maxx</span>
              </span>
              <span className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest mt-1">
                Enterprise Portal
              </span>
            </div>
          </div>
        ) : (
          <img
            src="/logo.png"
            alt="VidyaMaxx Logo"
            className="h-11 w-11 object-contain shrink-0 mx-auto animate-scale-in drop-shadow-sm"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center z-50 transition-all cursor-pointer shadow-md"
          title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarExpanded ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* 24 Main Modules Navigation List with Dedicated Left-Side Scrollbar (.sidebar-left-scrollbar) & Lenis */}
      <div ref={sidebarNavRef} className="flex-1 overflow-y-auto p-2.5 sidebar-left-scrollbar">
        <div dir="ltr" className="flex flex-col gap-1 w-full">
          {MODULE_REGISTRY.map((item) => {
            const Icon = ICON_MAP[item.iconName] || LayoutDashboard;
            const isActive =
              location.pathname === item.route ||
              (item.route !== '/' && location.pathname.startsWith(item.route));

            return (
              <Link
                key={item.id}
                to={item.route}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium outline-none',
                  isActive
                    ? 'bg-primary/12 text-primary font-bold border-l-2 border-primary rounded-r-lg rounded-l-xs'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                  !sidebarExpanded && 'justify-center px-0 py-2.5'
                )}
                title={!sidebarExpanded ? `${item.code}. ${item.label}` : undefined}
              >
                <Icon className={cn('h-4.5 w-4.5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground/70')} />
                {sidebarExpanded && (
                  <span className="animate-fade-in truncate leading-tight flex-1">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Global ✨ VidyaMaxx AI Button (Placed in footer right ABOVE User Profile) */}
      <div className="p-2.5 border-t border-border/60 bg-muted/20 shrink-0">
        <button
          onClick={toggleAiChat}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all outline-none font-bold text-xs cursor-pointer bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 shadow-xs group",
            !sidebarExpanded && "justify-center px-0 py-2.5"
          )}
          title="Open VidyaMaxx AI Assistant"
        >
          <Sparkles className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:scale-110" />
          {sidebarExpanded && <span className="truncate tracking-wide">VidyaMaxx AI</span>}
        </button>
      </div>

      {/* User Profile in Sidebar Bottom */}
      <div className="p-3 border-t border-border/60 bg-muted/15 shrink-0">
        <div className={cn('flex items-center gap-3', !sidebarExpanded && 'justify-center')}>
          <VFAvatar fallback="Roshan Singh" size="sm" className="h-8 w-8 text-xs shrink-0" />
          {sidebarExpanded && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-bold text-foreground truncate leading-none">Roshan Singh</p>
              <p className="text-[11px] text-muted-foreground truncate mt-1 uppercase tracking-wider font-semibold">Super Admin</p>
            </div>
          )}
          {sidebarExpanded && (
            <Link
              to="/login"
              className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-md hover:bg-muted"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
