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
        sidebarExpanded ? 'w-52' : 'w-16'
      )}
    >
      {/* Sidebar Header & Brand Logo — height is strictly h-[58px] to match Navbar perfectly */}
      <div className="flex h-[58px] items-center px-3.5 border-b border-border relative shrink-0">
        <div className={cn('flex items-center w-full min-w-0 overflow-hidden', !sidebarExpanded && 'justify-center')}>
          <img
            src="/logo.png"
            alt="VidyaMaxx Logo"
            className="h-8 w-8 object-contain shrink-0 drop-shadow-xs transition-all duration-300 ease-in-out"
          />
          <div
            className={cn(
              'flex flex-col min-w-0 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
              sidebarExpanded ? 'opacity-100 max-w-[160px] ml-2.5' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
            )}
          >
            <span className="text-lg font-black tracking-tight leading-none text-foreground">
              Vidya<span className="text-primary">Maxx</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase mt-0.5">
              School Management
            </span>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center z-50 transition-all duration-200 cursor-pointer shadow-xs"
          title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarExpanded ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Categorized Navigation List */}
      <div className="flex-1 overflow-y-auto p-2 sidebar-left-scrollbar custom-scrollbar space-y-2">
        {NAVIGATION_SECTIONS.map((section, secIdx) => (
          <div
            key={secIdx}
            className={cn(
              "space-y-1",
              secIdx > 0 && "border-t border-border/70 pt-2 mt-1.5"
            )}
          >
            {section.title && sidebarExpanded && (
              <div className="px-2.5 pt-0.5 pb-0.5">
                <span className="text-[10px] font-black text-primary/90 uppercase tracking-widest">
                  {section.title}
                </span>
              </div>
            )}
            {section.title && !sidebarExpanded && (
              <div className="flex justify-center my-0.5">
                <div className="h-[1px] w-4 bg-border" />
              </div>
            )}

            <div className="space-y-0.5">
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
                      'flex items-center transition-all duration-150 text-xs outline-none whitespace-nowrap font-bold',
                      sidebarExpanded ? 'w-full h-9 px-2.5 py-1.5 rounded-lg' : 'w-9 h-9 mx-auto rounded-lg justify-center p-0',
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/30 shadow-xs font-black'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                    )}
                    title={!sidebarExpanded ? item.label : undefined}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    />
                    <span
                      className={cn(
                        'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap leading-none',
                        sidebarExpanded ? 'opacity-100 max-w-[150px] ml-2.5 font-semibold' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
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
      <div className="p-2 border-t border-border bg-card/60 shrink-0">
        <div className={cn('flex items-center w-full min-w-0', sidebarExpanded ? 'gap-2' : 'justify-center')}>
          <VFAvatar fallback="Roshan Singh" size="sm" className="h-8 w-8 text-xs shrink-0 rounded-lg" />
          <div
            className={cn(
              'flex-1 min-w-0 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
              sidebarExpanded ? 'opacity-100 max-w-[120px] ml-2' : 'opacity-0 max-w-0 pointer-events-none hidden'
            )}
          >
            <p className="text-xs font-bold text-foreground truncate leading-none">Roshan Singh</p>
            <p className="text-[10px] text-muted-foreground font-semibold truncate mt-0.5">Super Admin</p>
          </div>
          <Link
            to="/login"
            className={cn(
              'text-muted-foreground hover:text-destructive transition-all duration-200 p-1.5 rounded-lg hover:bg-muted shrink-0',
              sidebarExpanded ? 'opacity-100 ml-auto' : 'opacity-0 max-w-0 pointer-events-none hidden'
            )}
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
