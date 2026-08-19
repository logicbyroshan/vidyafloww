import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFButton,
  VFCard,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Calendar,
  Clock,
  RefreshCw,
  Award,
  Download,
  Users,
} from 'lucide-react';

export const Route = createFileRoute('/timetable')({
  component: TimetablePage,
});

function TimetablePage() {
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 9-A');

  const periodConfig = [
    { id: '1', order: 1, name: 'Period 1', start: '08:00 AM', end: '08:45 AM', type: 'Class', duration: '45 mins' },
    { id: '2', order: 2, name: 'Period 2', start: '08:45 AM', end: '09:30 AM', type: 'Class', duration: '45 mins' },
    { id: '3', order: 3, name: 'Period 3', start: '09:30 AM', end: '10:15 AM', type: 'Class', duration: '45 mins' },
    { id: '4', order: 4, name: 'Morning Break', start: '10:15 AM', end: '10:30 AM', type: 'Break', duration: '15 mins' },
    { id: '5', order: 5, name: 'Period 4', start: '10:30 AM', end: '11:15 AM', type: 'Class', duration: '45 mins' },
    { id: '6', order: 6, name: 'Period 5', start: '11:15 AM', end: '12:00 PM', type: 'Class', duration: '45 mins' },
    { id: '7', order: 7, name: 'Lunch Break', start: '12:00 PM', end: '12:45 PM', type: 'Break', duration: '45 mins' },
    { id: '8', order: 8, name: 'Period 6', start: '12:45 PM', end: '01:30 PM', type: 'Class', duration: '45 mins' },
    { id: '9', order: 9, name: 'Period 7', start: '01:30 PM', end: '02:15 PM', type: 'Class', duration: '45 mins' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const scheduleGrid: Record<string, { subject: string; teacher: string; room: string }[]> = {
    'Monday': [
      { subject: 'Mathematics', teacher: 'Mrs. Verma', room: 'Room 101' },
      { subject: 'Physics', teacher: 'Dr. Sharma', room: 'Lab 204' },
      { subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101' },
      { subject: 'Chemistry', teacher: 'Dr. Nair', room: 'Lab 102' },
      { subject: 'Biology', teacher: 'Mr. Kumar', room: 'Room 101' },
      { subject: 'Physical Ed', teacher: 'Coach Singh', room: 'Ground' },
      { subject: 'Computer Sci', teacher: 'Mr. Das', room: 'Lab 3' },
    ],
    'Tuesday': [
      { subject: 'Physics', teacher: 'Dr. Sharma', room: 'Lab 204' },
      { subject: 'Mathematics', teacher: 'Mrs. Verma', room: 'Room 101' },
      { subject: 'Social Sci', teacher: 'Mr. Patel', room: 'Room 101' },
      { subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101' },
      { subject: 'Chemistry', teacher: 'Dr. Nair', room: 'Lab 102' },
      { subject: 'Library', teacher: 'Mrs. Joshi', room: 'Library' },
      { subject: 'Mathematics', teacher: 'Mrs. Verma', room: 'Room 101' },
    ],
    'Wednesday': [
      { subject: 'Chemistry', teacher: 'Dr. Nair', room: 'Lab 102' },
      { subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101' },
      { subject: 'Mathematics', teacher: 'Mrs. Verma', room: 'Room 101' },
      { subject: 'Physics', teacher: 'Dr. Sharma', room: 'Lab 204' },
      { subject: 'Hindi', teacher: 'Mr. Mishra', room: 'Room 101' },
      { subject: 'Art & Craft', teacher: 'Ms. Roy', room: 'Studio 1' },
      { subject: 'Biology', teacher: 'Mr. Kumar', room: 'Room 101' },
    ],
    'Thursday': [
      { subject: 'Mathematics', teacher: 'Mrs. Verma', room: 'Room 101' },
      { subject: 'Biology', teacher: 'Mr. Kumar', room: 'Room 101' },
      { subject: 'Physics', teacher: 'Dr. Sharma', room: 'Lab 204' },
      { subject: 'Computer Sci', teacher: 'Mr. Das', room: 'Lab 3' },
      { subject: 'Social Sci', teacher: 'Mr. Patel', room: 'Room 101' },
      { subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101' },
      { subject: 'Chemistry', teacher: 'Dr. Nair', room: 'Lab 102' },
    ],
    'Friday': [
      { subject: 'English', teacher: 'Ms. Gupta', room: 'Room 101' },
      { subject: 'Mathematics', teacher: 'Mrs. Verma', room: 'Room 101' },
      { subject: 'Social Sci', teacher: 'Mr. Patel', room: 'Room 101' },
      { subject: 'Physics', teacher: 'Dr. Sharma', room: 'Lab 204' },
      { subject: 'Music / Drama', teacher: 'Mr. Ali', room: 'Auditorium' },
      { subject: 'Chemistry', teacher: 'Dr. Nair', room: 'Lab 102' },
      { subject: 'Club Activity', teacher: 'Faculty Squad', room: 'Campus' },
    ],
  };

  // 1. Weekly Class Schedule View
  const scheduleContent = (
    <div className="space-y-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Active Schedule"
          value="Version 4.2"
          icon={<Calendar className="h-5 w-5" />}
          trend="up"
          trendLabel="Live Term 2"
          accentColor="cyan"
        />
        <VFStatCard
          title="Daily Slots"
          value="184 Slots"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendLabel="48 sections"
          accentColor="blue"
        />
        <VFStatCard
          title="Today's Substitutes"
          value="4 Proxies"
          icon={<RefreshCw className="h-5 w-5" />}
          trend="down"
          trendLabel="100% assigned"
          accentColor="amber"
        />
        <VFStatCard
          title="Schedule Quality"
          value="98 / 100"
          icon={<Award className="h-5 w-5" />}
          trend="up"
          trendLabel="0 slot conflicts"
          accentColor="emerald"
        />
      </div>

      {/* Class Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-60">
            <VFSelect
              value={selectedClass}
              onChange={(e) => setSelectedClass(String(e.target.value))}
              options={[
                { label: 'Class 9 - Section A', value: 'Class 9-A' },
                { label: 'Class 10 - Section B', value: 'Class 10-B' },
                { label: 'Class 11 - Science', value: 'Class 11-Sci' },
                { label: 'Class 12 - Commerce', value: 'Class 12-Com' },
              ]}
            />
          </div>
          <span className="text-sm font-bold text-foreground">Class Teacher: Mrs. Sunita Verma</span>
        </div>
        <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
          Export Weekly PDF
        </VFButton>
      </div>

      {/* Timetable Grid */}
      <div className="border border-border rounded-lg bg-card overflow-x-auto custom-scrollbar">
        <table className="w-full text-base text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-4 font-black text-xs text-muted-foreground uppercase tracking-wider">Day</th>
              {periodConfig.filter(p => p.type === 'Class').map((p) => (
                <th key={p.id} className="p-4 font-black text-xs text-muted-foreground whitespace-nowrap">
                  {p.name} <span className="text-[11px] text-muted-foreground block font-semibold mt-0.5">{p.start}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {days.map((day) => (
              <tr key={day} className="hover:bg-muted/30 transition-colors">
                <td className="p-4 font-black text-foreground bg-muted/20 whitespace-nowrap text-base">{day}</td>
                {(scheduleGrid[day] || []).map((slot, idx) => (
                  <td key={idx} className="p-2.5 min-w-[140px]">
                    <div className="p-2.5 rounded-md bg-muted/30 border border-border space-y-0.5">
                      <p className="font-bold text-foreground text-sm leading-tight">{slot.subject}</p>
                      <p className="text-xs font-semibold text-muted-foreground">{slot.teacher}</p>
                      <p className="text-[11px] text-primary font-bold">{slot.room}</p>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 2. Teacher & Substitution View
  const substitutionContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="Today's Auto-Matched Substitutes">
          <div className="divide-y divide-border -my-2 text-base">
            {[
              { teacher: 'Dr. Rajesh Sharma (Absent)', sub: 'Assigned: Mr. Verma', period: 'Period 3 · Physics Lab 204' },
              { teacher: 'Ms. Pooja Rao (Leave)', sub: 'Assigned: Mrs. Joshi', period: 'Period 5 · English Room 101' },
            ].map((s, i) => (
              <div key={i} className="py-3 px-1 space-y-0.5">
                <p className="font-bold text-destructive text-sm">{s.teacher}</p>
                <p className="font-bold text-success text-sm">{s.sub}</p>
                <p className="text-muted-foreground text-xs font-semibold">{s.period}</p>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Faculty Period Workload">
          <div className="divide-y divide-border -my-2 text-base">
            {[
              { name: 'Dr. Rajesh Sharma (Physics)', load: '24 / 28 Periods', status: 'Optimal' },
              { name: 'Mrs. Sunita Verma (Maths)', load: '26 / 28 Periods', status: 'Optimal' },
              { name: 'Mr. Arvind Gupta (Social)', load: '22 / 28 Periods', status: 'Available' },
            ].map((f, i) => (
              <div key={i} className="flex justify-between items-center py-3 px-1">
                <div>
                  <p className="font-bold text-foreground text-sm">{f.name}</p>
                  <p className="text-muted-foreground text-xs font-semibold mt-0.5">{f.load}</p>
                </div>
                <VFBadge variant="success">{f.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Room & Laboratory Utilization">
          <div className="divide-y divide-border -my-2 text-base">
            <div className="py-3 px-1 flex justify-between items-center">
              <span className="font-bold text-foreground text-sm">Physics Lab 204</span>
              <span className="font-black text-success text-sm">85% Utilized</span>
            </div>
            <div className="py-3 px-1 flex justify-between items-center">
              <span className="font-bold text-foreground text-sm">Chemistry Lab 102</span>
              <span className="font-black text-success text-sm">90% Utilized</span>
            </div>
            <div className="py-3 px-1 flex justify-between items-center">
              <span className="font-bold text-foreground text-sm">Computer Lab 3</span>
              <span className="font-black text-primary text-sm">75% Utilized</span>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 3. Bell Timings View
  const bellContent = (
    <div className="space-y-6">
      <VFCard title="Daily Campus Bell Timing Structure" description="Standardized bell rings for academic sessions">
        <div className="divide-y divide-border -my-2">
          {periodConfig.map((p) => (
            <div key={p.id} className="py-3 px-1 flex items-center justify-between text-base">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-black text-primary w-20">{p.start}</span>
                <div>
                  <p className="font-bold text-foreground text-base">{p.name}</p>
                  <p className="text-muted-foreground text-xs font-semibold">{p.duration} ({p.start} – {p.end})</p>
                </div>
              </div>
              <VFBadge variant={p.type === 'Class' ? 'primary' : 'outline'}>{p.type}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = [
    { id: 'schedule', label: 'Class Schedule Matrix', icon: <Calendar className="h-4 w-4" />, content: scheduleContent },
    { id: 'substitutions', label: 'Substitutes & Workload', icon: <Users className="h-4 w-4" />, content: substitutionContent },
    { id: 'bell', label: 'Bell Timings & Structure', icon: <Clock className="h-4 w-4" />, content: bellContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="schedule" variant="top-bar" />
    </VFPageContainer>
  );
}
