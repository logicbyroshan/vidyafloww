import { Link, useLocation } from '@tanstack/react-router';
import { cn, VFAvatar } from '@vidyamaxx/ui';
import {
  BarChart3,
  Bell,
  BookMarked,
  Calendar,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileSpreadsheet,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  School,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

interface NavItem {
  id: string;
  label: string;
  route: string;
  icon: LucideIcon;
}

interface NavGroup {
  items: NavItem[];
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', route: '/', icon: LayoutDashboard },
    ],
  },
  {
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
    items: [
      { id: 'homework', label: 'Homework', route: '/homework', icon: BookMarked },
      { id: 'examinations', label: 'Examinations', route: '/examinations', icon: ClipboardList },
    ],
  },
  {
    items: [
      { id: 'statistics', label: 'Statistics', route: '/statistics', icon: BarChart3 },
      { id: 'fees', label: 'Payments', route: '/fees', icon: CreditCard },
      { id: 'notices', label: 'Notices', route: '/notices', icon: Bell },
      { id: 'reports', label: 'Reports', route: '/reports', icon: FileSpreadsheet },
    ],
  },
  {
    items: [
      { id: 'settings', label: 'Settings', route: '/settings', icon: Settings },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR GEOMETRY (single source of truth)
//
//  Expanded width:    224px
//  Collapsed width:    64px
//  Icon size:          18px
//
//  Nav links are ALWAYS w-full, ALWAYS flex-row, NO Tailwind class switching.
//  Only inline `style` values transition — this gives pure CSS interpolation
//  which the browser renders at 60fps without any React re-render jank.
//
//  Collapsed paddingLeft = (64 - 18) / 2 = 23px  → icon perfectly centered
//  Expanded  paddingLeft = 14px                   → icon left-aligned
//
//  The sidebar width transition is 300ms and so is the paddingLeft transition.
//  Th// Collapsed icon center offset (px).
// Nav container is px-3 (12px each side), so link width in collapsed = 64-24 = 40px.
// To center an 18px icon: (40-18)/2 = 11px paddingLeft.
const COLLAPSED_ICON_PL = 11;
// Expanded left padding for left-aligned icon (link width = 214-24 = 190px)
// Equal to paddingRight so the link box looks symmetric inside.
// Matches implicit vertical padding: h-10 (40px) - icon (18px) / 2 = 11px.
const EXPANDED_LINK_PL = 11;
// Gap between icon and label in expanded mode
const EXPANDED_ICON_GAP = 10;

export function Sidebar() {
  const { sidebarExpanded } = useGlobalStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-black border-r border-border transition-[width] duration-300 ease-in-out relative z-40 shrink-0 select-none overflow-hidden',
        sidebarExpanded ? 'w-[214px]' : 'w-[64px]'
      )}
    >
      {/* ── HEADER ── 64px height, px-4 left padding, same as Navbar */}
      <div className="flex h-[64px] items-center border-b border-border bg-black relative shrink-0 px-4">
        {/* Logo: always visible at same left offset */}
        <div className="h-8 w-8 min-w-[32px] shrink-0 flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="VidyaMaxx Logo" className="h-8 w-8 object-contain" />
        </div>

        {/* Brand text: CSS-only fade + collapse via inline style */}
        <div
          className="flex flex-col min-w-0 overflow-hidden whitespace-nowrap"
          style={{
            opacity: sidebarExpanded ? 1 : 0,
            maxWidth: sidebarExpanded ? '160px' : '0px',
            marginLeft: sidebarExpanded ? '12px' : '0px',
            transition: 'opacity 300ms ease-in-out, max-width 300ms ease-in-out, margin-left 300ms ease-in-out',
          }}
        >
          <span className="text-[17px] font-black tracking-tight leading-none text-foreground">
            Vidya<span className="text-primary">Maxx</span>
          </span>
          <span className="text-[9px] text-muted-foreground font-bold tracking-wider uppercase mt-[3px]">
            School Management
          </span>
        </div>

      </div>

      {/* ── NAV LIST ── px-3 outer padding for generous breathing room from sidebar walls, py-3 vertical */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3">
        {NAVIGATION_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx}>
            {/* Full-bleed divider: -mx-3 cancels the px-3 container padding */}
            {groupIdx > 0 && (
              <div className="-mx-3 h-[1px] bg-border mt-3 mb-3" />
            )}

            <div className="flex flex-col gap-1.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.route === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.route);

                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    title={!sidebarExpanded ? item.label : undefined}
                    className={cn(
                      // Always full-width, always same height — NO class switching
                      'flex items-center h-10 w-full rounded-lg border outline-none overflow-hidden',
                      'transition-colors duration-150',
                      isActive
                        ? 'bg-[#1c1c1c] border-[#323232] text-foreground font-bold shadow-xs'
                        : 'border-transparent text-muted-foreground hover:bg-[#141414] hover:text-foreground font-medium'
                    )}
                    style={{
                      // paddingLeft transitions between centered (collapsed) and left-aligned (expanded)
                      paddingLeft: sidebarExpanded ? `${EXPANDED_LINK_PL}px` : `${COLLAPSED_ICON_PL}px`,
                      paddingRight: sidebarExpanded ? `${EXPANDED_LINK_PL}px` : '8px',
                      transition: 'padding-left 300ms ease-in-out, background-color 150ms, border-color 150ms',
                    }}
                  >
                    {/* Icon: always visible, fixed size */}
                    <Icon
                      className={cn(
                        'shrink-0 h-[18px] w-[18px]',
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    />

                    {/* Label: CSS fade + collapse — NO class switching */}
                    <span
                      className="text-sm whitespace-nowrap leading-none overflow-hidden font-[inherit]"
                      style={{
                        opacity: sidebarExpanded ? 1 : 0,
                        maxWidth: sidebarExpanded ? '140px' : '0px',
                        marginLeft: sidebarExpanded ? `${EXPANDED_ICON_GAP}px` : '0px',
                        transition: 'opacity 300ms ease-in-out, max-width 300ms ease-in-out, margin-left 300ms ease-in-out',
                      }}
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

      {/* ── BOTTOM USER BAR ── px-3 py-3, mirrors nav container */}
      <div className="border-t border-border bg-black shrink-0 px-3 py-3">
        {/* Inner row uses same paddingLeft transition as nav links */}
        <div
          className="flex items-center h-10 w-full overflow-hidden"
          style={{
            paddingLeft: sidebarExpanded ? `${EXPANDED_LINK_PL}px` : `${COLLAPSED_ICON_PL}px`,
            paddingRight: '8px',
            transition: 'padding-left 300ms ease-in-out',
          }}
        >
          {/* Avatar: always visible, same size/offset as nav icons */}
          <div className="h-8 w-8 min-w-[32px] max-w-[32px] shrink-0 flex items-center justify-center">
            <VFAvatar fallback="Roshan Singh" size="sm" className="h-8 w-8 text-xs rounded-md" />
          </div>

          {/* User info: fades on collapse */}
          <div
            className="flex flex-col min-w-0 overflow-hidden whitespace-nowrap"
            style={{
              opacity: sidebarExpanded ? 1 : 0,
              maxWidth: sidebarExpanded ? '120px' : '0px',
              marginLeft: sidebarExpanded ? `${EXPANDED_ICON_GAP}px` : '0px',
              transition: 'opacity 300ms ease-in-out, max-width 300ms ease-in-out, margin-left 300ms ease-in-out',
            }}
          >
            <p className="text-xs font-bold text-foreground truncate leading-none">Roshan Singh</p>
            <p className="text-[10px] text-muted-foreground font-semibold truncate mt-[3px]">Super Admin</p>
          </div>

          {/* Sign-out: fades on collapse */}
          <div
            className="ml-auto overflow-hidden flex items-center"
            style={{
              opacity: sidebarExpanded ? 1 : 0,
              maxWidth: sidebarExpanded ? '32px' : '0px',
              transition: 'opacity 300ms ease-in-out, max-width 300ms ease-in-out',
            }}
          >
            <Link
              to="/login"
              title="Sign Out"
              className="text-muted-foreground hover:text-destructive p-1.5 rounded-md hover:bg-muted transition-colors duration-200 shrink-0"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
