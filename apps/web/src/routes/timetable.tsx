import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
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
  Calendar,
  Clock,
  Users,
  Building,
  RefreshCw,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  BookOpen,
  Award,
  Download,
  AlertTriangle,
  Grid,
  Send,
} from 'lucide-react';

export const Route = createFileRoute('/timetable')({
  component: TimetablePage,
});

function TimetablePage() {
  const [selectedTeacher, setSelectedTeacher] = React.useState<string>('Dr. Sarah Connor');
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 9-A');
  const [selectedRoom, setSelectedRoom] = React.useState<string>('Physics Lab 2');
  const [activeVersion, setActiveVersion] = React.useState<string>('Published v4');
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const periodConfig = [
    { id: '1', order: 1, name: 'Period 1', start: '08:00 AM', end: '08:45 AM', type: 'Class', duration: '45 mins', status: 'Active' },
    { id: '2', order: 2, name: 'Period 2', start: '08:45 AM', end: '09:30 AM', type: 'Class', duration: '45 mins', status: 'Active' },
    { id: '3', order: 3, name: 'Period 3', start: '09:30 AM', end: '10:15 AM', type: 'Class', duration: '45 mins', status: 'Active' },
    { id: '4', order: 4, name: 'Morning Recess', start: '10:15 AM', end: '10:30 AM', type: 'Break', duration: '15 mins', status: 'Active' },
    { id: '5', order: 5, name: 'Period 4', start: '10:30 AM', end: '11:15 AM', type: 'Class', duration: '45 mins', status: 'Active' },
    { id: '6', order: 6, name: 'Period 5', start: '11:15 AM', end: '12:00 PM', type: 'Class', duration: '45 mins', status: 'Active' },
    { id: '7', order: 7, name: 'Lunch Break', start: '12:00 PM', end: '12:45 PM', type: 'Break', duration: '45 mins', status: 'Active' },
    { id: '8', order: 8, name: 'Period 6', start: '12:45 PM', end: '01:30 PM', type: 'Class', duration: '45 mins', status: 'Active' },
    { id: '9', order: 9, name: 'Period 7', start: '01:30 PM', end: '02:15 PM', type: 'Class', duration: '45 mins', status: 'Active' },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Timetable Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Schedule Version" value="Published v4" icon={<Calendar className="h-5 w-5" />} trend="up" trendLabel="Live Term 1" />
        <VFStatCard title="Scheduled Period Slots" value="184 Slots/Day" icon={<Clock className="h-5 w-5" />} trend="neutral" trendLabel="48 Classes Active" />
        <VFStatCard title="Today's Substitutions" value="4 Proxies" icon={<RefreshCw className="h-5 w-5" />} trend="down" trendLabel="100% Cover Assigned" />
        <VFStatCard title="Schedule Quality Score" value="94 / 100" icon={<Award className="h-5 w-5" />} trend="up" trendLabel="0 Conflicts Found" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Master Timetable
  // ----------------------------------------------------
  const masterTimetableContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Institutional Master Timetable Matrix</h3>
          <p className="text-xs text-muted-foreground">Consolidated view across all 48 sections and 124 teachers.</p>
        </div>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Master PDF</VFButton>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Class Timetable
  // ----------------------------------------------------
  const classTimetableContent = (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <VFSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(String(e.target.value))}
            options={[
              { label: 'Class 9 - Section A', value: 'Class 9-A' },
              { label: 'Class 10 - Section B', value: 'Class 10-B' },
              { label: 'Class 11 - Science', value: 'Class 11-Sci' },
            ]}
          />
          <VFSelect
            value={activeVersion}
            onChange={(e) => setActiveVersion(String(e.target.value))}
            options={[
              { label: 'Published v4 (Live)', value: 'Published v4' },
              { label: 'Review v3 (Draft)', value: 'Review v3' },
            ]}
          />
        </div>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export PDF</VFButton>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="text-sm font-bold text-foreground">{selectedClass} Weekly Schedule</h3>
          <span className="text-xs text-muted-foreground font-mono">Click cell to edit</span>
        </div>

        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="bg-muted/60 p-3 rounded-lg font-bold text-center border border-border/60">Period</div>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
            <div key={d} className="bg-muted/60 p-3 rounded-lg font-bold text-center border border-border/60 text-foreground">{d}</div>
          ))}
          {['P1', 'P2', 'P3', 'P4', 'P5'].map((p) => (
            <React.Fragment key={p}>
              <div className="p-3 bg-muted/30 border border-border/60 rounded-lg text-center font-mono font-bold text-muted-foreground">{p}</div>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <div key={`${day}-${p}`} className="p-3 bg-card border border-border/70 rounded-lg text-left">
                  <p className="font-bold text-foreground text-xs">Mathematics</p>
                  <p className="text-[11px] text-primary">Prof. Sharma</p>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Teacher Timetable
  // ----------------------------------------------------
  const teacherTimetableContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <VFSelect
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(String(e.target.value))}
          options={[
            { label: 'Dr. Sarah Connor (Physics)', value: 'Dr. Sarah Connor' },
            { label: 'Prof. Rajesh Sharma (Math)', value: 'Prof. Rajesh Sharma' },
          ]}
        />
        <VFBadge variant="success">Workload: 24 / 28 Periods</VFBadge>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Room Timetable
  // ----------------------------------------------------
  const roomTimetableContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <VFSelect
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(String(e.target.value))}
          options={[
            { label: 'Physics Lab 2', value: 'Physics Lab 2' },
            { label: 'Computer Lab 3', value: 'Comp Lab 3' },
          ]}
        />
        <VFBadge variant="primary">Utilization: 82%</VFBadge>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Period Structure
  // ----------------------------------------------------
  const periodStructureContent = (
    <div className="space-y-4">
      <VFSection title="Period & Slot Hierarchy Definition">
        <VFDataTable
          columns={[
            { header: 'Order', accessorKey: 'order', cell: (r: any) => <span className="font-mono text-xs font-bold text-primary">#{r.order}</span> },
            { header: 'Slot Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Start', accessorKey: 'start' },
            { header: 'End', accessorKey: 'end' },
            { header: 'Slot Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant={r.type === 'Class' ? 'primary' : 'warning'}>{r.type}</VFBadge> },
            { header: 'Duration', accessorKey: 'duration' },
          ]}
          data={periodConfig}
          filterPlaceholder="Search period or slot..."
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Subject Scheduling
  // ----------------------------------------------------
  const subjectSchedulingContent = (
    <div className="space-y-4">
      <VFCard title="Subject Weekly Period Requirements & Double Slots">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Configure periods per week per subject for each grade level.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Teacher Workload
  // ----------------------------------------------------
  const teacherWorkloadContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Average Teacher Load" value="24.2 Periods/Wk" icon={<Clock className="h-5 w-5" />} trend="up" trendLabel="Balanced Load" />
        <VFStatCard title="Max Cap Compliant" value="100% Staff" icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendLabel="Under 28 Cap" />
        <VFStatCard title="Overloaded Teachers" value="0 Staff" icon={<AlertCircle className="h-5 w-5" />} trend="neutral" trendLabel="0 Exceptions" />
        <VFStatCard title="Free Prep Slots" value="6.4 / Teacher" icon={<Users className="h-5 w-5" />} description="Weekly Average" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Free Periods
  // ----------------------------------------------------
  const freePeriodsContent = (
    <div className="space-y-4">
      <VFCard title="Teacher Free Period Matrix (Available for Proxy Cover)">
        <p className="text-xs text-muted-foreground mb-3">Live availability tracker across all periods of the day.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Substitution
  // ----------------------------------------------------
  const substitutionsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Absent Teachers Today" value="4 Staff" icon={<Users className="h-5 w-5" />} trend="down" trendLabel="4 Leaves Today" />
        <VFStatCard title="Periods Needing Cover" value="11 Slots" icon={<Clock className="h-5 w-5" />} trend="neutral" trendLabel="Requires Proxy" />
        <VFStatCard title="Proxy Assigned" value="9 / 11" icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendLabel="82% Covered" />
        <VFStatCard title="Pending Substitutes" value="2 Slots" icon={<AlertCircle className="h-5 w-5" />} trend="down" trendLabel="Action Needed" />
      </div>

      <VFCard title="AI Substitute Recommendation & One-Click Bulk Assignment">
        <div className="space-y-3 text-xs mt-2">
          {[
            { period: 'Period 3 (09:30 AM)', absent: 'Dr. Sarah Connor', subject: 'Physics', class: 'Class 9-A', proxy: 'Mrs. Anita Desai', match: '94% Match', status: 'Assigned' },
            { period: 'Period 5 (11:15 AM)', absent: 'Prof. Rajesh Sharma', subject: 'Math', class: 'Class 8-B', proxy: 'Mr. Vikram Singh', match: '88% Match', status: 'Assigned' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground text-sm">{item.period} • {item.class}</span>
                <p className="text-muted-foreground text-xs mt-0.5">{item.subject} (Absent: {item.absent}) · Proxy: {item.proxy}</p>
              </div>
              <VFBadge variant={item.status === 'Assigned' ? 'success' : 'warning'}>{item.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Timetable Conflicts
  // ----------------------------------------------------
  const conflictsContent = (
    <div className="space-y-4">
      <VFCard title="Conflict Audit & Collision Prevention Engine">
        <div className="p-3 bg-success/10 border border-success/30 rounded-lg flex items-center justify-between text-xs">
          <span className="font-bold text-success flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> 0 Hard Conflicts (No Teacher Collision)
          </span>
          <VFBadge variant="success">100% Valid</VFBadge>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Room Conflicts
  // ----------------------------------------------------
  const roomConflictsContent = (
    <div className="space-y-4">
      <VFCard title="Room Over-Booking & Capacity Conflict Radar">
        <div className="p-3 bg-success/10 border border-success/30 rounded-lg flex items-center justify-between text-xs">
          <span className="font-bold text-success flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> 0 Room Over-Booking Conflicts
          </span>
          <VFBadge variant="success">All Labs Free</VFBadge>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Temporary Changes
  // ----------------------------------------------------
  const temporaryChangesContent = (
    <div className="space-y-4">
      <VFCard title="Temporary One-Day Schedule Overrides">
        <p className="text-xs text-muted-foreground mb-3">Apply special event schedules (Annual Sports Day / PTM) without modifying the base master timetable.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Timetable Publishing
  // ----------------------------------------------------
  const publishingContent = (
    <div className="space-y-4">
      <VFCard title="Timetable Publishing & Notification Pipeline">
        <p className="text-xs text-muted-foreground mb-3">Publish approved timetable versions to Parent App, Teacher App, and Student Portal.</p>
        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Publish Timetable v4 Live</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Timetable Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Weekly Periods" value="920 Slots" icon={<Clock className="h-5 w-5" />} trend="up" trendLabel="Across Campus" />
        <VFStatCard title="Lab Utilization Rate" value="78.4%" icon={<Building className="h-5 w-5" />} trend="up" trendLabel="High Efficiency" />
        <VFStatCard title="Free Slot Distribution" value="100% Fair" icon={<CheckCircle2 className="h-5 w-5" />} description="Balanced" />
        <VFStatCard title="Exportable Schedules" value="48 Classes" icon={<Download className="h-5 w-5" />} description="PDF & Excel" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Timetable Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Timetable Engine Settings & Rules">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Standard Period Duration" defaultValue="45 mins" />
          <VFInput label="Max Periods Per Teacher / Day" defaultValue="6" />
          <VFSelect label="AI Optimization Model" options={[{ label: 'Minimize Teacher Idle Time', value: 'minimize_idle' }, { label: 'Balanced Spread', value: 'balanced' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 16 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Timetable Dashboard', icon: <Calendar className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'master-timetable', label: 'Master Timetable', icon: <Grid className="h-3.5 w-3.5" />, content: masterTimetableContent },
    { id: 'class-timetable', label: 'Class Timetable', icon: <Calendar className="h-3.5 w-3.5" />, content: classTimetableContent },
    { id: 'teacher-timetable', label: 'Teacher Timetable', icon: <Users className="h-3.5 w-3.5" />, content: teacherTimetableContent },
    { id: 'room-timetable', label: 'Room Timetable', icon: <Building className="h-3.5 w-3.5" />, content: roomTimetableContent },
    { id: 'period-structure', label: 'Period Structure', icon: <Clock className="h-3.5 w-3.5" />, content: periodStructureContent },
    { id: 'subject-scheduling', label: 'Subject Scheduling', icon: <BookOpen className="h-3.5 w-3.5" />, content: subjectSchedulingContent },
    { id: 'teacher-workload', label: 'Teacher Workload', icon: <Clock className="h-3.5 w-3.5" />, content: teacherWorkloadContent },
    { id: 'free-periods', label: 'Free Periods', icon: <UserCheck className="h-3.5 w-3.5" />, content: freePeriodsContent },
    { id: 'substitutions', label: 'Substitution', icon: <RefreshCw className="h-3.5 w-3.5" />, content: substitutionsContent },
    { id: 'conflicts', label: 'Timetable Conflicts', icon: <AlertTriangle className="h-3.5 w-3.5" />, content: conflictsContent },
    { id: 'room-conflicts', label: 'Room Conflicts', icon: <AlertTriangle className="h-3.5 w-3.5" />, content: roomConflictsContent },
    { id: 'temporary-changes', label: 'Temporary Changes', icon: <RefreshCw className="h-3.5 w-3.5" />, content: temporaryChangesContent },
    { id: 'publishing', label: 'Timetable Publishing', icon: <Send className="h-3.5 w-3.5" />, content: publishingContent },
    { id: 'reports', label: 'Timetable Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Timetable Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
