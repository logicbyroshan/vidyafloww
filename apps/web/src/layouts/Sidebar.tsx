import * as React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@vidyaflow/ui';
import { useGlobalStore } from '../stores/globalStore';
import {
  LayoutDashboard, Users, UserSquare, GraduationCap, CalendarCheck,
  ClipboardList, CircleDollarSign, Briefcase, BookOpen, Bus,
  Building, MessageSquare, Files, BarChart3, Bot, Settings,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/' },
  { id: 'admissions', label: 'Admissions', icon: UserSquare, route: '/admissions' },
  { id: 'students', label: 'Students', icon: Users, route: '/students' },
  { id: 'academics', label: 'Academics', icon: GraduationCap, route: '/academics' },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, route: '/attendance' },
  { id: 'examinations', label: 'Examinations', icon: ClipboardList, route: '/examinations' },
  { id: 'finance', label: 'Finance', icon: CircleDollarSign, route: '/finance' },
  { id: 'hr', label: 'HR', icon: Briefcase, route: '/hr' },
  { id: 'library', label: 'Library', icon: BookOpen, route: '/library' },
  { id: 'transport', label: 'Transport', icon: Bus, route: '/transport' },
  { id: 'hostel', label: 'Hostel', icon: Building, route: '/hostel' },
  { id: 'communication', label: 'Communication', icon: MessageSquare, route: '/communication' },
  { id: 'documents', label: 'Documents', icon: Files, route: '/documents' },
  { id: 'reports', label: 'Reports', icon: BarChart3, route: '/reports' },
  { id: 'ai', label: 'AI Insights', icon: Bot, route: '/ai' },
  { id: 'settings', label: 'Settings', icon: Settings, route: '/settings' },
];

export function Sidebar() {
  const { sidebarExpanded, toggleSidebar } = useGlobalStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-card border-r border-border transition-all duration-300 relative z-20",
        sidebarExpanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-border px-4">
        {sidebarExpanded ? (
          <div className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight w-full animate-fade-in">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <span className="text-lg">V</span>
            </div>
            VidyaFlow
          </div>
        ) : (
          <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold animate-scale-in">
            V
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route || (item.route !== '/' && location.pathname.startsWith(item.route));

          return (
            <Link
              key={item.id}
              to={item.route}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ring-offset-card",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                !sidebarExpanded && "justify-center px-0"
              )}
              title={!sidebarExpanded ? item.label : undefined}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
              {sidebarExpanded && <span className="animate-fade-in truncate">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-border">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title={sidebarExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {sidebarExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>
    </aside>
  );
}
