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
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  Sparkles,
  Calendar,
  Users,
  Trophy,
  Plus,
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

        {/* House Points Leaderboard & Alerts */}
        <VFCard title="Inter-House Leaderboard & Alerts">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>🥇 1. Blue House</span>
                <span className="font-mono text-primary">120 Pts</span>
              </div>
              <p className="text-muted-foreground text-xs">Cricket + Debating Champions</p>
            </div>
            <div className="p-2.5 bg-secondary/10 border border-secondary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>🥈 2. Red House</span>
                <span className="font-mono text-secondary">110 Pts</span>
              </div>
              <p className="text-muted-foreground text-xs">Athletics + Drama Winners</p>
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

  // 18.5 Clubs Submodule Content
  const clubsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Extracurricular Clubs & Societies Directory</h3>
          <p className="text-xs text-muted-foreground">Manage STEM, Robotics, Literary, Drama, and Eco clubs, student leadership roles, and recurring meeting sessions.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Club</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Club Name', accessorKey: 'clubName', cell: (r: ClubRecord) => <span className="font-bold text-foreground">{r.clubName}</span> },
          { header: 'Category', accessorKey: 'category', cell: (r: ClubRecord) => <VFBadge variant="outline">{r.category}</VFBadge> },
          { header: 'Faculty Coordinator', accessorKey: 'coordinator' },
          { header: 'Active Members', accessorKey: 'membersCount', cell: (r: ClubRecord) => `${r.membersCount} Students` },
          { header: 'Meeting Schedule', accessorKey: 'meetingSchedule' },
          { header: 'Status', accessorKey: 'status', cell: (r: ClubRecord) => <VFBadge variant="success">{r.status}</VFBadge> },
        ]}
        data={clubsData}
        filterPlaceholder="Search club name or category..."
      />
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    calendar: dashboardContent,
    events: dashboardContent,
    registrations: dashboardContent,
    clubs: clubsContent,
    competitions: dashboardContent,
    trips: dashboardContent,
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
