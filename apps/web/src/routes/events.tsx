import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Sparkles,
  Calendar,
  Users,
  Clock,
  SlidersHorizontal,
  Plus,
  Send,
  Download,
  BarChart3,
  Award,
  Bell,
} from 'lucide-react';

export const Route = createFileRoute('/events')({
  component: EventsCalendarPage,
});

function EventsCalendarPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const eventData = [
    { code: 'EVT-2026-SP01', title: 'Annual Inter-School Sports Day', date: '25 Sep 2026', time: '08:00 AM – 04:00 PM', venue: 'Main School Ground', organizer: 'Sports Dept', status: 'Scheduled' },
    { code: 'EVT-2026-PTM1', title: 'Term 1 Parent-Teacher Meeting (PTM)', date: '12 Sep 2026', time: '09:00 AM – 01:00 PM', venue: 'Classrooms (All Grades)', organizer: 'Academic Desk', status: 'Scheduled' },
    { code: 'EVT-2026-SCI2', title: 'CBSE Regional Science Symposium', date: '18 Aug 2026', time: '10:00 AM – 03:00 PM', venue: 'Auditorium Hall A', organizer: 'Science Dept', status: 'Active Live' },
  ];

  const eventColumns = [
    { header: 'Event Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Event / Function Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Event Date', accessorKey: 'date' },
    { header: 'Time Slot', accessorKey: 'time' },
    { header: 'Venue / Hall', accessorKey: 'venue' },
    { header: 'Organizer', accessorKey: 'organizer' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Active Live' ? 'warning' : 'primary'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Events Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Upcoming Events" value="12 Events" icon={<Sparkles className="h-5 w-5 text-primary" />} trend="up" trendLabel="Next 30 Days" />
        <VFStatCard title="Next Major PTM" value="12 Sep 2026" icon={<Calendar className="h-5 w-5 text-emerald-500" />} description="Term 1 Progress Report" />
        <VFStatCard title="Total Registrations" value="1,420 RSVPs" icon={<Users className="h-5 w-5 text-amber-500" />} trend="up" trendLabel="Parents & Students" />
        <VFStatCard title="Official Holidays" value="18 Days" icon={<Clock className="h-5 w-5 text-purple-500" />} description="Academic Year 2026-27" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — School Calendar
  // ----------------------------------------------------
  const calendarContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Official Academic & Event Master Calendar</h3>
          <p className="text-xs text-muted-foreground font-mono">Synchronized master schedule for holidays, exams, functions, and PTMs.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Calendar Event</VFButton>
      </div>
      <VFDataTable columns={eventColumns} data={eventData} filterPlaceholder="Search event title or venue..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Events
  // ----------------------------------------------------
  const eventsContent = (
    <div className="space-y-4">
      <VFCard title="School Events & Function Management Master">
        <p className="text-xs text-muted-foreground mb-3">Configure stage schedules, chief guest invitations, and event budget allocations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Meetings
  // ----------------------------------------------------
  const meetingsContent = (
    <div className="space-y-4">
      <VFCard title="Institutional Administrative & Committee Meetings">
        <p className="text-xs text-muted-foreground mb-3">School Management Committee (SMC), safety committee, and board meetings.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Parent-Teacher Meetings (PTM)
  // ----------------------------------------------------
  const ptmContent = (
    <div className="space-y-4">
      <VFCard title="Parent-Teacher Meeting (PTM) Slot Booking Engine">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-emerald-500 font-bold">Time slot booking for 1-on-1 parent-teacher consultations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Staff Meetings
  // ----------------------------------------------------
  const staffMeetingsContent = (
    <div className="space-y-4">
      <VFCard title="Faculty Staff Meetings & Department Briefings">
        <p className="text-xs text-muted-foreground mb-3">Record agendas, attendance, and minutes of meeting (MOM) notes for staff assemblies.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — School Functions
  // ----------------------------------------------------
  const functionsContent = (
    <div className="space-y-4">
      <VFCard title="Annual Day, Founders Day & Graduation Ceremony">
        <p className="text-xs text-muted-foreground mb-3">Large-scale institutional functions, auditorium seating charts, and rehearsal schedules.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Competitions
  // ----------------------------------------------------
  const competitionsContent = (
    <div className="space-y-4">
      <VFCard title="Academic, Debate & Science Competition Schedules">
        <p className="text-xs text-muted-foreground mb-3">Inter-school and intra-school competitive events catalog.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Holidays
  // ----------------------------------------------------
  const holidaysContent = (
    <div className="space-y-4">
      <VFCard title="Gazetted & School Local Holiday Master List">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2 font-mono">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Independence Day</span>
            <p className="text-muted-foreground text-xs mt-1">15 Aug 2026 · National Holiday</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Teacher's Day</span>
            <p className="text-muted-foreground text-xs mt-1">05 Sep 2026 · Institutional Celebration</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Gandhi Jayanti</span>
            <p className="text-muted-foreground text-xs mt-1">02 Oct 2026 · National Holiday</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Event Registration
  // ----------------------------------------------------
  const registrationContent = (
    <div className="space-y-4">
      <VFCard title="Online Event Registration & RSVP Management">
        <p className="text-xs text-muted-foreground mb-3">Parent and student online registration for school functions and competitions.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Reminders
  // ----------------------------------------------------
  const remindersContent = (
    <div className="space-y-4">
      <VFCard title="Automated Event Push Notifications & SMS Reminders">
        <p className="text-xs text-muted-foreground mb-3">Dispatch 24-hour prior event reminders to registered attendees.</p>
        <VFButton size="sm" leftIcon={<Bell className="h-3.5 w-3.5" />}>Send Event Reminders</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Event Communication
  // ----------------------------------------------------
  const communicationContent = (
    <div className="space-y-4">
      <VFCard title="Event Broadcast Bulletins & Parent Invitations">
        <p className="text-xs text-muted-foreground mb-3">Digital invitations, RSVP tracking, and event updates.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Event Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Event Turnout Analytics & Budget Utilization Reports">
        <p className="text-xs text-muted-foreground mb-3">Export attendance statistics, budget vs actual expenses, and feedback ratings.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Event Summary (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Calendar Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Academic Calendar Parameters & Sync Options">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFSelect label="Default Calendar View" options={[{ label: 'Monthly Grid', value: 'month' }, { label: 'Weekly Agenda', value: 'week' }]} />
          <VFInput label="Public iCal Sync Feed URL" defaultValue="https://vidyamaxx.edu/calendar/ical" />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 14 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Events Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'calendar', label: 'School Calendar', icon: <Calendar className="h-3.5 w-3.5" />, content: calendarContent },
    { id: 'events', label: 'Events', icon: <Sparkles className="h-3.5 w-3.5" />, content: eventsContent },
    { id: 'meetings', label: 'Meetings', icon: <Users className="h-3.5 w-3.5" />, content: meetingsContent },
    { id: 'ptm', label: 'Parent-Teacher Meetings', icon: <Users className="h-3.5 w-3.5" />, content: ptmContent },
    { id: 'staff-meetings', label: 'Staff Meetings', icon: <Users className="h-3.5 w-3.5" />, content: staffMeetingsContent },
    { id: 'functions', label: 'School Functions', icon: <Award className="h-3.5 w-3.5" />, content: functionsContent },
    { id: 'competitions', label: 'Competitions', icon: <Award className="h-3.5 w-3.5" />, content: competitionsContent },
    { id: 'holidays', label: 'Holidays', icon: <Clock className="h-3.5 w-3.5" />, content: holidaysContent },
    { id: 'registration', label: 'Event Registration', icon: <Plus className="h-3.5 w-3.5" />, content: registrationContent },
    { id: 'reminders', label: 'Reminders', icon: <Bell className="h-3.5 w-3.5" />, content: remindersContent },
    { id: 'communication', label: 'Event Communication', icon: <Send className="h-3.5 w-3.5" />, content: communicationContent },
    { id: 'reports', label: 'Event Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Calendar Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
