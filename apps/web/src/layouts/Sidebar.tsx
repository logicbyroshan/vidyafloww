import { Link, useLocation } from '@tanstack/react-router';
import { cn, VFAvatar } from '@vidyamaxx/ui';
import { useGlobalStore } from '../stores/globalStore';
import {
  LayoutDashboard,
  Users,
  UserSquare,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  CircleDollarSign,
  Briefcase,
  BookOpen,
  Bus,
  Building,
  MessageSquare,
  Files,
  BarChart3,
  Bot,
  Settings,
  Calendar,
  Package,
  MonitorPlay,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard & BI', icon: LayoutDashboard, route: '/' },
  { id: 'admissions', label: 'Admissions', icon: UserSquare, route: '/admissions' },
  { id: 'students', label: 'Student 360°', icon: Users, route: '/students' },
  { id: 'academics', label: 'Academics', icon: GraduationCap, route: '/academics' },
  { id: 'timetable', label: 'Timetable', icon: Calendar, route: '/timetable' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, route: '/attendance' },
  { id: 'examinations', label: 'Examinations', icon: ClipboardList, route: '/examinations' },
  { id: 'finance', label: 'Fees & Finance', icon: CircleDollarSign, route: '/finance' },
  { id: 'hr', label: 'HR & Payroll', icon: Briefcase, route: '/hr' },
  { id: 'communication', label: 'Communication', icon: MessageSquare, route: '/communication' },
  { id: 'transport', label: 'Transport', icon: Bus, route: '/transport' },
  { id: 'library', label: 'Library', icon: BookOpen, route: '/library' },
  { id: 'hostel', label: 'Hostel & Life', icon: Building, route: '/hostel' },
  { id: 'inventory', label: 'Inventory & Procurement', icon: Package, route: '/inventory' },
  { id: 'documents', label: 'ID & Documents', icon: Files, route: '/documents' },
  { id: 'lms', label: 'Digital Classroom', icon: MonitorPlay, route: '/lms' },
  { id: 'welfare', label: 'Student Welfare', icon: HeartHandshake, route: '/welfare' },
  { id: 'reports', label: 'Reports & Compliance', icon: BarChart3, route: '/reports' },
  { id: 'ai', label: 'VidyaFlow AI', icon: Bot, route: '/ai' },
  { id: 'settings', label: 'School Admin', icon: Settings, route: '/settings' },
];

export function Sidebar() {
  const { sidebarExpanded, toggleSidebar } = useGlobalStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-card border-r border-border transition-all duration-300 relative z-20 shrink-0',
        sidebarExpanded ? 'w-56' : 'w-14'
      )}
    >
      {/* Sidebar Header & Brand Logo */}
      <div className="flex h-11 items-center px-3 border-b border-border/60 relative">
        {sidebarExpanded ? (
          <div className="flex items-center gap-2 font-black text-sm text-foreground tracking-tight w-full animate-fade-in">
            <img src="/logo.png" alt="VidyaMaxx Logo" className="h-6 w-6 object-contain shrink-0" />
            <span>
              Vidya<span className="text-primary">Maxx</span>
            </span>
          </div>
        ) : (
          <img src="/logo.png" alt="VidyaMaxx Logo" className="h-6 w-6 object-contain shrink-0 mx-auto animate-scale-in" />
        )}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center z-30 transition-all cursor-pointer"
          title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarExpanded ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-0.5 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.route ||
            (item.route !== '/' && location.pathname.startsWith(item.route));

          return (
            <Link
              key={item.id}
              to={item.route}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-all text-[11px] font-medium outline-none',
                isActive
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                !sidebarExpanded && 'justify-center px-0'
              )}
              title={!sidebarExpanded ? item.label : undefined}
            >
              <Icon className={cn('h-3.5 w-3.5 shrink-0', isActive && 'text-primary')} />
              {sidebarExpanded && <span className="animate-fade-in truncate">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* User Profile in Sidebar Bottom */}
      <div className="p-2.5 border-t border-border/60 bg-muted/15">
        <div className={cn('flex items-center gap-2', !sidebarExpanded && 'justify-center')}>
          <VFAvatar fallback="Roshan Singh" size="sm" />
          {sidebarExpanded && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-[11px] font-bold text-foreground truncate leading-tight">Roshan Singh</p>
              <p className="text-[9px] text-muted-foreground truncate mt-0.5 uppercase tracking-wider">Super Admin</p>
            </div>
          )}
          {sidebarExpanded && (
            <Link
              to="/login"
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
              title="Sign Out"
            >
              <LogOut className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
