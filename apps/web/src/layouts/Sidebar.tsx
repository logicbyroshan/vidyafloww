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
  BookOpenCheck,
  BookMarked,
  ClipboardList,
  FolderGit2,
  Laptop,
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
    title: 'STUDENTS',
    items: [
      { id: 'admissions', label: 'Admissions', route: '/admissions', icon: UserPlus },
      { id: 'students', label: 'Students', route: '/students', icon: GraduationCap },
      { id: 'academics', label: 'Academics', route: '/academics', icon: School },
      { id: 'timetable', label: 'Timetable', route: '/timetable', icon: Calendar },
      { id: 'attendance', label: 'Attendance', route: '/attendance', icon: CalendarCheck },
    ],
  },
  {
    title: 'LEARNING',
    items: [
      { id: 'teaching', label: 'Teaching', route: '/learning', icon: BookOpenCheck },
      { id: 'homework', label: 'Homework', route: '/homework', icon: BookMarked },
      { id: 'examinations', label: 'Examinations', route: '/examinations', icon: ClipboardList },
      { id: 'learning-resources', label: 'Learning Resources', route: '/resources', icon: FolderGit2 },
      { id: 'online-classes', label: 'Online Classes', route: '/lms', icon: Laptop },
    ],
  },
  {
    title: 'SYSTEM',
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
        'flex flex-col h-full bg-card border-r border-border/60 transition-all duration-300 ease-in-out relative z-40 shrink-0 select-none overflow-visible',
        sidebarExpanded ? 'w-64' : 'w-20'
      )}
    >
      {/* Sidebar Header & Brand Logo */}
      <div className="flex h-20 items-center px-4 border-b border-border/60 relative shrink-0">
        <div className={cn('flex items-center w-full min-w-0 overflow-hidden', !sidebarExpanded && 'justify-center')}>
          <img
            src="/logo.png"
            alt="VidyaMaxx Logo"
            className="h-10 w-10 object-contain shrink-0 drop-shadow-sm transition-all duration-300 ease-in-out"
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
            <span className="text-[9px] font-bold text-muted-foreground/80 uppercase tracking-widest mt-1">
              Enterprise Portal
            </span>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:bg-muted flex items-center justify-center z-50 transition-all duration-200 cursor-pointer shadow-md"
          title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Categorized Navigation List */}
      <div className="flex-1 overflow-y-auto p-2.5 sidebar-left-scrollbar custom-scrollbar">
        <div className="flex flex-col w-full">
          {NAVIGATION_SECTIONS.map((section, secIdx) => (
            <div key={secIdx} className="flex flex-col">
              {section.title && (
                sidebarExpanded ? (
                  <div className="flex items-center gap-2 mt-4 mb-2 px-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 whitespace-nowrap">
                      {section.title}
                    </span>
                    <div className="h-[1px] flex-1 bg-border/50" />
                  </div>
                ) : (
                  <div className="flex justify-center my-2.5">
                    <div className="h-[1px] w-8 bg-border/50" />
                  </div>
                )
              )}

              <div className="flex flex-col gap-1 w-full">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.route ||
                    (item.route !== '/' && location.pathname.startsWith(item.route));

                  return (
                    <Link
                      key={item.id}
                      to={item.route}
                      className={cn(
                        'flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out text-sm outline-none overflow-hidden whitespace-nowrap',
                        isActive
                          ? 'bg-primary/15 text-primary font-bold border-l-3 border-primary rounded-r-lg rounded-l-none shadow-xs'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                        !sidebarExpanded && 'justify-center px-0'
                      )}
                      title={!sidebarExpanded ? `${section.title ? `${section.title}: ` : ''}${item.label}` : undefined}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5 shrink-0 transition-all duration-200',
                          isActive ? 'text-primary scale-105' : 'text-muted-foreground/80'
                        )}
                      />
                      <span
                        className={cn(
                          'transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap leading-tight text-sm font-semibold',
                          sidebarExpanded ? 'opacity-100 max-w-[170px] ml-3' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
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
      </div>

      {/* User Profile in Sidebar Bottom */}
      <div className="p-3 border-t border-border/60 bg-muted/15 shrink-0 overflow-hidden">
        <div className={cn('flex items-center w-full min-w-0', !sidebarExpanded && 'justify-center')}>
          <VFAvatar fallback="Roshan Singh" size="sm" className="h-9 w-9 text-xs shrink-0" />
          <div
            className={cn(
              'flex-1 min-w-0 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap',
              sidebarExpanded ? 'opacity-100 max-w-[130px] ml-3' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
            )}
          >
            <p className="text-xs font-bold text-foreground truncate leading-none">Roshan Singh</p>
            <p className="text-[10px] text-muted-foreground truncate mt-1 uppercase tracking-wider font-semibold">Super Admin</p>
          </div>
          <Link
            to="/login"
            className={cn(
              'text-muted-foreground hover:text-destructive transition-all duration-300 ease-in-out p-1.5 rounded-md hover:bg-muted shrink-0',
              sidebarExpanded ? 'opacity-100 max-w-[32px] ml-auto' : 'opacity-0 max-w-0 ml-0 pointer-events-none'
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
