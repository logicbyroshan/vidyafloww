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
        'flex flex-col h-full bg-card border-r border-border transition-all duration-300 relative z-20 shrink-0 select-none',
        sidebarExpanded ? 'w-60' : 'w-16'
      )}
    >
      {/* Sidebar Header & Brand Logo */}
      <div className="flex h-14 items-center px-3.5 border-b border-border/60 relative shrink-0">
        {sidebarExpanded ? (
          <div className="flex items-center gap-3 font-black text-base text-foreground tracking-tight w-full animate-fade-in">
            <img
              src="/logo.png"
              alt="VidyaMaxx Logo"
              className="h-7 w-7 object-contain shrink-0"
              style={{ height: '28px', width: '28px' }}
            />
            <span className="truncate">
              Vidya<span className="text-primary">Maxx</span>
            </span>
          </div>
        ) : (
          <img
            src="/logo.png"
            alt="VidyaMaxx Logo"
            className="h-7 w-7 object-contain shrink-0 mx-auto animate-scale-in"
            style={{ height: '28px', width: '28px' }}
          />
        )}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center z-30 transition-all cursor-pointer shadow-sm"
          title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarExpanded ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1 custom-scrollbar">
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
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium outline-none',
                isActive
                  ? 'bg-primary/10 text-primary font-bold shadow-xs'
                  : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
                !sidebarExpanded && 'justify-center px-0 py-2.5'
              )}
              title={!sidebarExpanded ? item.label : undefined}
            >
              <Icon className={cn('h-4.5 w-4.5 shrink-0', isActive && 'text-primary')} />
              {sidebarExpanded && <span className="animate-fade-in truncate leading-tight">{item.label}</span>}
            </Link>
          );
        })}
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
