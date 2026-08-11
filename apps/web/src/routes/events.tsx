import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
  VFBarChart,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  Sparkles,
  Calendar,
  Users,
  Trophy,
  Plus,
  Bus,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const Route = createFileRoute('/events')({
  component: EventsPage,
});

interface EventRecord {
  id: string;
  code: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  organizer: string;
  capacity: string;
  status: 'Registration Open' | 'Upcoming' | 'Ongoing' | 'Completed';
}

interface ClubRecord {
  id: string;
  clubName: string;
  category: string;
  coordinator: string;
  membersCount: number;
  meetingSchedule: string;
  status: 'Active' | 'Recruiting';
}

function EventsPage() {
  const eventsModule = MODULE_REGISTRY.find((m) => m.id === 'events');

  const eventsData: EventRecord[] = [
    { id: '1', code: 'EVT-2026-088', title: 'Inter-House Annual Sports Meet 2026', category: 'Sports', date: '20 Aug 2026', venue: 'Main Campus Stadium', organizer: 'Coach Rajesh Kumar', capacity: '1,200 Seats', status: 'Registration Open' },
    { id: '2', code: 'EVT-2026-089', title: 'National Science & Robotics Expo', category: 'Academic', date: '10 Sep 2026', venue: 'Innovation Lab', organizer: 'Dr. Suresh Verma', capacity: '300 Seats', status: 'Upcoming' },
    { id: '3', code: 'EVT-2026-090', title: 'Inter-House Cricket Tournament', category: 'Sports', date: '11 Aug 2026', venue: 'Sports Ground A', organizer: 'Sports Dept', capacity: '200 Seats', status: 'Ongoing' },
  ];

  const clubsData: ClubRecord[] = [
    { id: '1', clubName: 'VidyaMaxx Science & Innovation Club', category: 'STEM', coordinator: 'Dr. Suresh Verma', membersCount: 42, meetingSchedule: 'Fridays 3:30 PM', status: 'Active' },
    { id: '2', clubName: 'Coding & Robotics League', category: 'Technology', coordinator: 'Anita Desai', membersCount: 38, meetingSchedule: 'Wednesdays 4:00 PM', status: 'Active' },
    { id: '3', clubName: 'Literary & Public Speaking Club', category: 'Cultural', coordinator: 'Rajesh Kumar', membersCount: 24, meetingSchedule: 'Thursdays 3:30 PM', status: 'Active' },
  ];

  // 18.1 Events Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Events & Extracurricular Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Plan school events, manage 1,240 active participants, inter-house sports tournaments, and student activity portfolios.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Events AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Event</VFButton>
        </div>
      </div>

      {/* Feature 1 — Event KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Upcoming Events" value="8 Scheduled" icon={<Calendar className="h-5 w-5 text-primary" />} trend="up" trendLabel="Next 30 Days" />
        <VFStatCard title="Total Participants" value="1,240" icon={<Users className="h-5 w-5 text-secondary" />} trend="up" trendLabel="78% Participation Rate" />
        <VFStatCard title="Active Clubs & Societies" value="12 Active" icon={<Sparkles className="h-5 w-5 text-success" />} description="420 Club Members" />
        <VFStatCard title="Inter-House Trophies" value="34 Awards" icon={<Trophy className="h-5 w-5 text-warning" />} description="Blue House: 120 Pts 🥇" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Schedule & Upcoming Events */}
        <VFSection title="Today's Events & Inter-House Sports Schedule" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">🏏 Inter-House Cricket</span>
                <VFBadge variant="success">🟢 10:00 AM</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Sports Ground A · Blue vs Red House</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">🎭 Drama Workshop</span>
                <VFBadge variant="primary">🔵 01:00 PM</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Main Auditorium · Annual Play Auditions</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">📚 Science Club</span>
                <VFBadge variant="primary">🔵 03:30 PM</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Innovation Lab · Solar Project Session</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Event Code', accessorKey: 'code', cell: (r: EventRecord) => <span className="font-mono font-bold text-primary">{r.code}</span> },
              { header: 'Event Title', accessorKey: 'title', cell: (r: EventRecord) => <span className="font-bold text-foreground">{r.title}</span> },
              { header: 'Category', accessorKey: 'category', cell: (r: EventRecord) => <VFBadge variant="outline">{r.category}</VFBadge> },
              { header: 'Date', accessorKey: 'date' },
              { header: 'Venue', accessorKey: 'venue' },
              { header: 'Capacity', accessorKey: 'capacity' },
              {
                header: 'Status',
                accessorKey: 'status',
                cell: (r: EventRecord) => (
                  <VFBadge variant={r.status === 'Ongoing' ? 'success' : r.status === 'Registration Open' ? 'primary' : 'warning'}>
                    {r.status}
                  </VFBadge>
                ),
              },
            ]}
            data={eventsData}
            filterPlaceholder="Search event title or venue..."
          />
        </VFSection>

        {/* House Points Leaderboard Bar Chart */}
        <VFCard title="Inter-House Championship Scoreboard">
          <div className="space-y-3 text-xs mt-1">
            <VFBarChart
              data={[
                { house: 'Blue', points: 120 },
                { house: 'Red', points: 110 },
                { house: 'Green', points: 96 },
                { house: 'Yellow', points: 88 },
              ]}
              xKey="house"
              dataKeys={[{ key: 'points', name: 'House Points', color: '#0891b2' }]}
              height={160}
            />

            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>🥇 1. Blue House</span>
                <span className="font-mono text-primary">120 Pts</span>
              </div>
              <p className="text-muted-foreground text-xs">Cricket + Debating Champions</p>
            </div>

            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">⚠ Auditorium Venue Conflict</span>
                <VFBadge variant="warning">Alert</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Auditorium booked twice for 13 Aug (Drama vs Seminar)</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 18.2 Specialized Event Calendar View Submodule Content
  const calendarContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Central Institutional Event Calendar — August 2026</h3>
          <p className="text-xs text-muted-foreground">Color-coded event schedule by category (Sports 🏏, Academic 📚, Cultural 🎭, Trip 🚌).</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline">Today</VFButton>
          <VFButton size="sm">Month View</VFButton>
        </div>
      </div>

      {/* Interactive Month Grid */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-muted-foreground mb-2 pb-2 border-b border-border">
          <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const hasEvent = day === 11 || day === 15 || day === 20 || day === 24;
            return (
              <div
                key={day}
                className={`min-h-[70px] p-1.5 rounded-lg border text-left flex flex-col justify-between ${day === 11 ? 'bg-primary/10 border-primary font-bold' : 'bg-muted/30 border-border'}`}
              >
                <span className="text-xs font-semibold text-foreground">{day}</span>
                {hasEvent && (
                  <VFBadge variant={day === 11 ? 'success' : day === 15 ? 'warning' : 'primary'} className="text-[9px] px-1 py-0 justify-start truncate">
                    {day === 11 ? '🏏 Cricket' : day === 15 ? '🇮🇳 Indep. Day' : day === 20 ? '🏃 Sports Day' : '🔬 Science Expo'}
                  </VFBadge>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // 18.5 Specialized Clubs Directory Grid Submodule Content
  const clubsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Extracurricular Clubs & STEM Societies Cards Directory</h3>
          <p className="text-xs text-muted-foreground">Manage STEM, Robotics, Literary, Drama, and Eco clubs, student leadership roles, and recurring meeting sessions.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Club</VFButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubsData.map((c) => (
          <VFCard key={c.id} title={c.clubName}>
            <div className="space-y-2 text-xs mt-1">
              <div className="flex items-center justify-between">
                <VFBadge variant="outline">{c.category}</VFBadge>
                <VFBadge variant="success">{c.status}</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Faculty Coordinator: <span className="font-bold text-foreground">{c.coordinator}</span></p>
              <p className="text-muted-foreground text-xs">Meeting Schedule: <span className="font-mono text-primary">{c.meetingSchedule}</span></p>
              <div className="pt-2 flex items-center justify-between border-t border-border">
                <span className="font-bold text-foreground">{c.membersCount} Active Members</span>
                <VFButton size="sm" variant="ghost" className="text-xs h-7">View Roster</VFButton>
              </div>
            </div>
          </VFCard>
        ))}
      </div>
    </div>
  );

  // 18.7 Specialized Educational Trips Logistics Submodule Content
  const tripsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Educational Excursions, Bus Logistics & Parent Consent</h3>
          <p className="text-xs text-muted-foreground">Logistics management, bus vehicle assignment, supervisor contacts, and digital parent consent forms.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Trip</VFButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <VFCard title="Science Center & Planetarium Educational Tour">
          <div className="space-y-2 text-xs mt-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" /> City Science Center
              </span>
              <VFBadge variant="primary">Departure 06:00 AM</VFBadge>
            </div>
            <p className="text-muted-foreground text-xs">Target Audience: Class 11 Science · 30 Students Capacity</p>
            <div className="p-2.5 bg-muted/40 rounded-xl border border-border space-y-1">
              <p className="font-bold text-foreground flex items-center gap-1 text-xs">
                <Bus className="h-3.5 w-3.5 text-secondary" /> Vehicle Assignment: Bus 01 (Driver: Mr. Singh)
              </p>
              <p className="text-muted-foreground text-xs">Supervisors: Dr. Suresh Verma & Anita Desai</p>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-success flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> 28 / 30 Parent Consents Approved
              </span>
              <VFButton size="sm" variant="outline">View Manifest</VFButton>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    calendar: calendarContent,
    events: dashboardContent,
    registrations: dashboardContent,
    clubs: clubsContent,
    competitions: dashboardContent,
    trips: tripsContent,
    operations: dashboardContent,
    recognition: dashboardContent,
    'reports-settings': dashboardContent,
  };

  const submoduleTabs = (eventsModule?.submodules || [
    { id: 'dashboard', label: 'Events Dashboard' },
    { id: 'calendar', label: 'Event Calendar' },
    { id: 'events', label: 'Event Management' },
    { id: 'registrations', label: 'Registrations & Participation' },
    { id: 'clubs', label: 'Activities & Clubs' },
    { id: 'competitions', label: 'Competitions & Sports' },
    { id: 'trips', label: 'Trips & Excursions' },
    { id: 'operations', label: 'Event Operations' },
    { id: 'recognition', label: 'Attendance & Recognition' },
    { id: 'reports-settings', label: 'Reports & Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Sparkles className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
