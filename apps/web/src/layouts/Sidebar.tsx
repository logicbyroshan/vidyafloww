import { Link, useLocation } from '@tanstack/react-router';
import { cn, VFAvatar } from '@vidyamaxx/ui';
import { useGlobalStore } from '../stores/globalStore';
import {
  LayoutDashboard,
  UserPlus,
  GraduationCap,
  School,
  Calendar,
  CalendarCheck,
  Users,
  BookMarked,
  ClipboardList,
  CreditCard,
  Bell,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  LucideIcon,
  BarChart3,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  route: string;
  icon: LucideIcon;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const NAVIGATION_SECTIONS: NavSection[] = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', route: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Management',
    items: [
      { id: 'students', label: 'Students', route: '/students', icon: GraduationCap },
      { id: 'admissions', label: 'Admissions', route: '/admissions', icon: UserPlus },
      { id: 'attendance', label: 'Attendance', route: '/attendance', icon: CalendarCheck },
      { id: 'academics', label: 'Academics', route: '/academics', icon: School },
      { id: 'timetable', label: 'Timetable', route: '/timetable', icon: Calendar },
      { id: 'staff', label: 'Teachers', route: '/staff', icon: Users },
    ],
  },
  {
    title: 'Academics',
    items: [
      { id: 'homework', label: 'Homework', route: '/homework', icon: BookMarked },
      { id: 'examinations', label: 'Examinations', route: '/examinations', icon: ClipboardList },
    ],
  },
  {
    title: 'Finance & Operations',
    items: [
      { id: 'statistics', label: 'Statistics', route: '/statistics', icon: BarChart3 },
      { id: 'fees', label: 'Fees & Payments', route: '/fees', icon: CreditCard },
      { id: 'notices', label: 'Notices', route: '/notices', icon: Bell },
      { id: 'reports', label: 'Reports', route: '/reports', icon: FileSpreadsheet },
    ],
  },
  {
    title: 'General',
    items: [
      { id: 'settings', label: 'Settings', route: '/settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const { sidebarExpanded, toggleSidebar } = useGlobalStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-card border-r border-border transition-all duration-300 ease-in-out relative z-40 shrink-0 select-none overflow-visible',
        sidebarExpanded ? 'w-56' : 'w-20'
      )}
    >
      {/* Sidebar Header & Brand Logo — height is strictly h-[64px] to match Navbar perfectly */}
      <div className="flex h-[64px] items-center px-4 border-b border-border relative shrink-0">
        <div className={cn('flex items-center w-full min-w-0 overflow-hidden', !sidebarExpanded && 'justify-center')}>
          <img
            src="/logo.png"
            alt="VidyaMaxx Logo"
            className="h-9 w-9 object-contain shrink-0 drop-shadow-xs transition-all duration-300 ease-in-out"
          />
          <div
            className={cn(
              'flex flex-col min-w-0 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
              sidebarExpanded ? 'opacity-100 max-w-[160px] ml-3' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
            )}
          >
            <span className="text-xl font-black tracking-tight leading-none text-foreground">
              Vidya<span className="text-primary">Maxx</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase mt-1">
              School Management
            </span>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center z-50 transition-all duration-200 cursor-pointer shadow-xs"
          title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Categorized Navigation List */}
      <div className="flex-1 overflow-y-auto p-2.5 sidebar-left-scrollbar custom-scrollbar space-y-2.5">
        {NAVIGATION_SECTIONS.map((section, secIdx) => (
          <div
            key={secIdx}
            className={cn(
              "space-y-1",
              secIdx > 0 && "border-t border-border/70 pt-2.5 mt-2"
            )}
          >
            {section.title && sidebarExpanded && (
              <div className="px-3 pt-0.5 pb-0.5">
                <span className="text-[11px] font-black text-primary/90 uppercase tracking-widest">
                  {section.title}
                </span>
              </div>
            )}
            {section.title && !sidebarExpanded && (
              <div className="flex justify-center my-1">
                <div className="h-[1px] w-5 bg-border" />
              </div>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.route === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.route);

                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className={cn(
                      'flex items-center transition-all duration-150 text-sm outline-none whitespace-nowrap font-bold',
                      sidebarExpanded ? 'w-full h-10 px-3 py-2 rounded-xl' : 'w-10 h-10 mx-auto rounded-xl justify-center p-0',
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/30 shadow-xs font-black'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                    )}
                    title={!sidebarExpanded ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        'h-4.5 w-4.5 shrink-0 transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    />
                    <span
                      className={cn(
                        'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap leading-none',
                        sidebarExpanded ? 'opacity-100 max-w-[150px] ml-3 font-semibold' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile in Sidebar Bottom */}
      <div className="p-2.5 border-t border-border bg-card/60 shrink-0">
        <div className={cn('flex items-center w-full min-w-0', sidebarExpanded ? 'gap-2.5' : 'justify-center')}>
          <VFAvatar fallback="Roshan Singh" size="sm" className="h-9 w-9 text-xs shrink-0 rounded-lg" />
          <div
            className={cn(
              'flex-1 min-w-0 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
              sidebarExpanded ? 'opacity-100 max-w-[120px] ml-2.5' : 'opacity-0 max-w-0 pointer-events-none hidden'
            )}
          >
            <p className="text-sm font-bold text-foreground truncate leading-none">Roshan Singh</p>
            <p className="text-xs text-muted-foreground font-semibold truncate mt-1">Super Admin</p>
          </div>
          <Link
            to="/login"
            className={cn(
              'text-muted-foreground hover:text-destructive transition-all duration-200 p-2 rounded-lg hover:bg-muted shrink-0',
              sidebarExpanded ? 'opacity-100 ml-auto' : 'opacity-0 max-w-0 pointer-events-none hidden'
            )}
            title="Sign Out"
          >
            <LogOut className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
