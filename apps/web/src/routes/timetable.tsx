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
  VFDatePicker,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Calendar,
  Clock,
  Users,
  Building,
  RefreshCw,
  Sparkles,
  Bot,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  BookOpen,
  Award,
  Check,
  Plus,
  Download,
  ClipboardList,
  CalendarDays,
  Cpu,
  Zap,
  AlertTriangle,
  Lock,
  Unlock,
  X,
  Play,
} from 'lucide-react';

export const Route = createFileRoute('/timetable')({
  component: TimetablePage,
});

// Types & Mock Interfaces
interface TimetableCell {
  id: string;
  day: string;
  period: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  isDouble?: boolean;
  type: 'Class' | 'Break' | 'Lab' | 'Free';
}

function TimetablePage() {
  // State for active cell editor modal
  const [editingCell, setEditingCell] = React.useState<TimetableCell | null>(null);
  const [selectedTeacher, setSelectedTeacher] = React.useState<string>('Dr. Sarah Connor');
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 9-A');
  const [selectedRoom, setSelectedRoom] = React.useState<string>('Physics Lab 2');
  const [activeVersion, setActiveVersion] = React.useState<string>('Published v4');
  const [conflictNotice, setConflictNotice] = React.useState<string | null>(null);
  const [isAiGenerating, setIsAiGenerating] = React.useState<boolean>(false);
  const [aiAssistantInput, setAiAssistantInput] = React.useState<string>('');
  const [aiAssistantResponse, setAiAssistantResponse] = React.useState<string | null>(null);
  const [activeWizardStep, setActiveWizardStep] = React.useState<number>(1);
  const [simulatedAbsentTeacher, setSimulatedAbsentTeacher] = React.useState<string>('Prof. Rajesh Sharma');
  const [isSimulating, setIsSimulating] = React.useState<boolean>(false);

  // 1. Timetable Period Configuration Mock Data
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

  // 2. Initial Class Timetable Matrix Data
  const initialGrid: TimetableCell[] = [
    { id: 'm1', day: 'Monday', period: 'P1', time: '08:00-08:45', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 204', type: 'Class' },
    { id: 'm2', day: 'Monday', period: 'P2', time: '08:45-09:30', subject: 'Physics', teacher: 'Dr. Sarah Connor', room: 'Physics Lab 2', type: 'Lab', isDouble: true },
    { id: 'm3', day: 'Monday', period: 'P3', time: '09:30-10:15', subject: 'Physics', teacher: 'Dr. Sarah Connor', room: 'Physics Lab 2', type: 'Lab', isDouble: true },
    { id: 'm4', day: 'Monday', period: 'P4', time: '10:30-11:15', subject: 'English', teacher: 'Mrs. Anita Desai', room: 'Room 204', type: 'Class' },
    { id: 'm5', day: 'Monday', period: 'P5', time: '11:15-12:00', subject: 'Chemistry', teacher: 'Mr. Vikram Singh', room: 'Room 204', type: 'Class' },
    { id: 't1', day: 'Tuesday', period: 'P1', time: '08:00-08:45', subject: 'Physics', teacher: 'Dr. Sarah Connor', room: 'Physics Lab 2', type: 'Class' },
    { id: 't2', day: 'Tuesday', period: 'P2', time: '08:45-09:30', subject: 'Chemistry', teacher: 'Mr. Vikram Singh', room: 'Chem Lab 1', type: 'Class' },
    { id: 't3', day: 'Tuesday', period: 'P3', time: '09:30-10:15', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 204', type: 'Class' },
    { id: 't4', day: 'Tuesday', period: 'P4', time: '10:30-11:15', subject: 'Computer Sci', teacher: 'Mr. Amit Joshi', room: 'Comp Lab 3', type: 'Lab' },
    { id: 't5', day: 'Tuesday', period: 'P5', time: '11:15-12:00', subject: 'Social Studies', teacher: 'Mrs. Meena Varma', room: 'Room 204', type: 'Class' },
    { id: 'w1', day: 'Wednesday', period: 'P1', time: '08:00-08:45', subject: 'English', teacher: 'Mrs. Anita Desai', room: 'Room 204', type: 'Class' },
    { id: 'w2', day: 'Wednesday', period: 'P2', time: '08:45-09:30', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 204', type: 'Class' },
    { id: 'w3', day: 'Wednesday', period: 'P3', time: '09:30-10:15', subject: 'Biology', teacher: 'Dr. Priya Nair', room: 'Bio Lab', type: 'Class' },
    { id: 'w4', day: 'Wednesday', period: 'P4', time: '10:30-11:15', subject: 'Physics', teacher: 'Dr. Sarah Connor', room: 'Room 204', type: 'Class' },
    { id: 'w5', day: 'Wednesday', period: 'P5', time: '11:15-12:00', subject: 'Physical Ed', teacher: 'Coach Rakesh', room: 'Ground', type: 'Class' },
    { id: 'th1', day: 'Thursday', period: 'P1', time: '08:00-08:45', subject: 'Chemistry', teacher: 'Mr. Vikram Singh', room: 'Room 204', type: 'Class' },
    { id: 'th2', day: 'Thursday', period: 'P2', time: '08:45-09:30', subject: 'English', teacher: 'Mrs. Anita Desai', room: 'Room 204', type: 'Class' },
    { id: 'th3', day: 'Thursday', period: 'P3', time: '09:30-10:15', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 204', type: 'Class' },
    { id: 'th4', day: 'Thursday', period: 'P4', time: '10:30-11:15', subject: 'Computer Sci', teacher: 'Mr. Amit Joshi', room: 'Comp Lab 3', type: 'Lab' },
    { id: 'th5', day: 'Thursday', period: 'P5', time: '11:15-12:00', subject: 'Social Studies', teacher: 'Mrs. Meena Varma', room: 'Room 204', type: 'Class' },
    { id: 'f1', day: 'Friday', period: 'P1', time: '08:00-08:45', subject: 'Computer Sci', teacher: 'Mr. Amit Joshi', room: 'Comp Lab 3', type: 'Lab' },
    { id: 'f2', day: 'Friday', period: 'P2', time: '08:45-09:30', subject: 'Social Studies', teacher: 'Mrs. Meena Varma', room: 'Room 204', type: 'Class' },
    { id: 'f3', day: 'Friday', period: 'P3', time: '09:30-10:15', subject: 'Physical Ed', teacher: 'Coach Rakesh', room: 'Ground', type: 'Class' },
    { id: 'f4', day: 'Friday', period: 'P4', time: '10:30-11:15', subject: 'Mathematics', teacher: 'Prof. Rajesh Sharma', room: 'Room 204', type: 'Class' },
    { id: 'f5', day: 'Friday', period: 'P5', time: '11:15-12:00', subject: 'Library Period', teacher: 'Librarian Mr. Ray', room: 'Library', type: 'Class' },
  ];

  const [gridData, setGridData] = React.useState<TimetableCell[]>(initialGrid);

  // ----------------------------------------------------
  // SUBMODULE 5.1 — Timetable Configuration (10 Features)
  // ----------------------------------------------------
  const configContent = (
    <div className="space-y-4">
      {/* 1. Academic Schedule Setup */}
      <VFCard title="1 & 2. Academic Schedule Setup & Period/Break Configuration">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs mt-2">
          <VFSelect label="Academic Session" options={[{ label: '2027–28 (Upcoming)', value: '2027' }, { label: '2026–27 (Current)', value: '2026' }]} />
          <VFSelect label="Campus Branch" options={[{ label: 'Main Campus (New Delhi)', value: 'main' }, { label: 'North Suburbs Branch', value: 'north' }]} />
          <VFInput label="School Start Time" defaultValue="08:00 AM" />
          <VFInput label="School End Time" defaultValue="02:30 PM" />
        </div>

        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">Working Days:</span>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <label key={day} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-md border border-border/60 cursor-pointer">
                <input type="checkbox" defaultChecked={day !== 'Sat'} className="rounded text-primary focus:ring-primary h-3 w-3" />
                <span>{day}</span>
              </label>
            ))}
          </div>
          <VFButton size="sm" leftIcon={<Check className="h-3.5 w-3.5" />}>Save Schedule Setup</VFButton>
        </div>
      </VFCard>

      {/* 2. Reorderable Period & Break Table */}
      <VFSection title="Period & Break Hierarchy Definition (9 Active Slots)">
        <VFDataTable
          columns={[
            { header: 'Order', accessorKey: 'order', cell: (r: any) => <span className="font-mono text-xs font-bold text-primary">#{r.order}</span> },
            { header: 'Period Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Start Time', accessorKey: 'start' },
            { header: 'End Time', accessorKey: 'end' },
            { header: 'Slot Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant={r.type === 'Class' ? 'primary' : 'warning'}>{r.type}</VFBadge> },
            { header: 'Duration', accessorKey: 'duration' },
            { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
          ]}
          data={periodConfig}
          filterPlaceholder="Search period or slot name..."
        />
      </VFSection>

      {/* 3 & 4. Schedule Templates & Working Day Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="3. Reusable Schedule Templates">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { template: 'Normal Day Schedule (9 Periods)', status: 'Active', desc: 'Standard 45-min teaching slots with 2 breaks' },
              { template: 'Saturday Half-Day Schedule (5 Periods)', status: 'Active', desc: '08:00 AM - 12:30 PM abbreviated slots' },
              { template: 'Examination Schedule (2 Long Slots)', status: 'Active', desc: '3-hour exam slots with invigilator rotation' },
              { template: 'Winter Schedule (Delayed Start)', status: 'Draft', desc: '08:30 AM start for fog season' },
            ].map((t, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{t.template}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{t.desc}</p>
                </div>
                <VFBadge variant={t.status === 'Active' ? 'success' : 'outline'}>{t.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="4. Exceptional Working Day Rules & Overrides">
          <div className="space-y-2.5 text-xs mt-2">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground">🟢 Working Day: Mon - Fri</span>
                <p className="text-muted-foreground text-xs mt-0.5">Standard timetable applies across all campuses</p>
              </div>
              <VFBadge variant="success">Active</VFBadge>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground">🔵 Independence Day Holiday (Aug 15)</span>
                <p className="text-muted-foreground text-xs mt-0.5">National holiday override — all periods suspended</p>
              </div>
              <VFBadge variant="primary">Holiday</VFBadge>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground">🟡 Working Saturday (Aug 22)</span>
                <p className="text-muted-foreground text-xs mt-0.5">Compensatory half-day schedule enabled</p>
              </div>
              <VFBadge variant="warning">Special</VFBadge>
            </div>
          </div>
        </VFCard>
      </div>

      {/* 5, 6, 7 & 8. Subject/Teacher Rules & Double Period Constraints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="5. Subject Periods/Week">
          <div className="space-y-2 text-xs mt-2">
            {[
              { subject: 'Mathematics', weekly: '6 Periods', double: 'No' },
              { subject: 'Physics Lab', weekly: '4 Periods', double: 'Yes (2+2)' },
              { subject: 'Computer Sci', weekly: '4 Periods', double: 'Yes (2+2)' },
              { subject: 'English', weekly: '5 Periods', double: 'No' },
            ].map((s, i) => (
              <div key={i} className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex justify-between items-center">
                <span className="font-bold text-foreground">{s.subject}</span>
                <span className="text-muted-foreground">{s.weekly} · Double: {s.double}</span>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="6 & 7. Teacher & Class Rules">
          <div className="space-y-2 text-xs mt-2">
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60">
              <span className="font-bold text-foreground">Max Load: 6 periods/day, 30/week</span>
              <p className="text-muted-foreground text-[11px] mt-0.5">Avoid 3 consecutive periods rule active</p>
            </div>
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60">
              <span className="font-bold text-foreground">No Same Subject Twice/Day</span>
              <p className="text-muted-foreground text-[11px] mt-0.5">Except for double lab practical sessions</p>
            </div>
          </div>
        </VFCard>

        <VFCard title="8 & 9. Constraint Rule Engine">
          <div className="space-y-2 text-xs mt-2">
            <div className="p-2.5 bg-destructive/10 border border-destructive/30 rounded-lg">
              <span className="font-bold text-destructive flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" /> HARD: Zero Teacher Collisions
              </span>
              <p className="text-muted-foreground text-[11px] mt-0.5">Mandatory block on double-booking</p>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/25 rounded-lg">
              <span className="font-bold text-primary flex items-center gap-1">
                <Unlock className="h-3.5 w-3.5" /> SOFT: Morning Preference
              </span>
              <p className="text-muted-foreground text-[11px] mt-0.5">Schedule core subjects in P1-P3</p>
            </div>
          </div>
        </VFCard>
      </div>

      {/* 10. Timetable Setup Wizard (10-Step Interactive Progress Stepper) */}
      <VFCard title="10. Timetable Setup Wizard & Publishing Pipeline">
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between text-xs overflow-x-auto custom-scrollbar pb-2">
            {[
              '1 Schedule', '2 Periods', '3 Classes', '4 Subjects', '5 Teachers',
              '6 Rooms', '7 Rules', '8 Generate', '9 Review', '10 Publish'
            ].map((step, idx) => {
              const stepNum = idx + 1;
              const isActive = activeWizardStep === stepNum;
              const isCompleted = activeWizardStep > stepNum;
              return (
                <button
                  key={step}
                  onClick={() => setActiveWizardStep(stepNum)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs shrink-0 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : isCompleted
                      ? 'bg-success/15 text-success border border-success/30'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="h-3 w-3" /> : stepNum}
                  <span>{step}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-muted/30 border border-border/60 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground text-xs">
                Step {activeWizardStep}: {['Academic Schedule', 'Period Setup', 'Class Allocation', 'Subject Requirements', 'Teacher Availability', 'Room Booking', 'Constraint Rules', 'AI Timetable Generation', 'Conflict Audit Review', 'Final Publishing'][activeWizardStep - 1]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeWizardStep === 8 ? 'AI Engine is ready to build optimal matrix.' : activeWizardStep === 10 ? 'Publishing will notify 124 teachers & 2,450 parents.' : 'Configure parameters before proceeding.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <VFButton size="sm" variant="outline" disabled={activeWizardStep === 1} onClick={() => setActiveWizardStep(prev => Math.max(1, prev - 1))}>
                Back
              </VFButton>
              <VFButton size="sm" disabled={activeWizardStep === 10} onClick={() => setActiveWizardStep(prev => Math.min(10, prev + 1))}>
                Next Step
              </VFButton>
            </div>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5.2 — Class Timetable (8 Features)
  // ----------------------------------------------------
  const classTimetableContent = (
    <div className="space-y-4">
      {/* Filters & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
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
          <VFSelect
            value={activeVersion}
            onChange={(e) => setActiveVersion(String(e.target.value))}
            options={[
              { label: 'Published v4 (Live)', value: 'Published v4' },
              { label: 'Review v3 (Draft)', value: 'Review v3' },
              { label: 'Draft v2 (Archived)', value: 'Draft v2' },
            ]}
          />
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/60 text-xs">
            <button className="px-2.5 py-1 rounded bg-primary text-primary-foreground font-bold shadow-2xs">Week</button>
            <button className="px-2.5 py-1 text-muted-foreground hover:text-foreground font-medium">Day</button>
            <button className="px-2.5 py-1 text-muted-foreground hover:text-foreground font-medium">Month</button>
            <button className="px-2.5 py-1 text-muted-foreground hover:text-foreground font-medium">List</button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <VFBadge variant="success" className="h-8 px-3">Status: Published Live</VFBadge>
          <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>
            Export PDF / Excel
          </VFButton>
        </div>
      </div>

      {/* 15. Live Conflict Alert Banner */}
      {conflictNotice && (
        <div className="p-3.5 bg-destructive/15 border border-destructive/30 rounded-xl text-xs flex items-center justify-between animate-fade-in text-foreground">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            <span className="font-bold">{conflictNotice}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setConflictNotice(null)} className="px-2 py-1 bg-destructive text-destructive-foreground font-bold rounded hover:opacity-90 cursor-pointer">
              Resolve Conflict
            </button>
            <button onClick={() => setConflictNotice(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 11. Interactive Class Timetable Grid */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">{selectedClass} Master Weekly Schedule</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">Click any cell to open Timetable Cell Editor</span>
        </div>

        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="bg-muted/60 p-3 rounded-lg font-bold text-center border border-border/60">Time / Period</div>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => (
            <div key={d} className="bg-muted/60 p-3 rounded-lg font-bold text-center border border-border/60 text-foreground">{d}</div>
          ))}

          {['P1 (08:00-08:45)', 'P2 (08:45-09:30)', 'P3 (09:30-10:15)', 'P4 (10:30-11:15)', 'P5 (11:15-12:00)'].map((pLabel, pIdx) => {
            const periodKey = `P${pIdx + 1}`;
            return (
              <React.Fragment key={periodKey}>
                <div className="p-3 bg-muted/30 border border-border/60 rounded-lg flex items-center justify-center font-mono font-bold text-muted-foreground text-[11px]">
                  {pLabel}
                </div>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                  const cell = gridData.find(c => c.day === day && c.period === periodKey);
                  return (
                    <div
                      key={`${day}-${periodKey}`}
                      onClick={() => setEditingCell(cell || { id: `${day}-${periodKey}`, day, period: periodKey, time: pLabel, subject: 'Free Slot', teacher: 'Unassigned', room: 'Room 204', type: 'Class' })}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all hover:scale-[1.02] hover:shadow-sm ${
                        cell?.isDouble
                          ? 'bg-primary/10 border-primary/40 text-foreground'
                          : cell
                          ? 'bg-card border-border/70 hover:border-primary/50 text-foreground shadow-2xs'
                          : 'bg-muted/20 border-dashed border-border/60 text-muted-foreground'
                      }`}
                    >
                      {cell ? (
                        <div className="space-y-1">
                          <p className="font-bold text-foreground text-xs leading-tight">{cell.subject}</p>
                          <p className="text-[11px] text-primary font-medium truncate">{cell.teacher}</p>
                          <span className="inline-block text-[10px] bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground font-mono">{cell.room}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground font-italic">+ Assign Subject</span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 12. Timetable Cell Editor Modal Drawer */}
      {editingCell && (
        <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl p-5 shadow-2xl max-w-md w-full space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">Timetable Cell Editor</h3>
                <p className="text-xs text-muted-foreground">{editingCell.day} • {editingCell.period} ({editingCell.time})</p>
              </div>
              <button onClick={() => setEditingCell(null)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <VFSelect
                label="Assign Subject"
                value={editingCell.subject}
                onChange={(e) => setEditingCell({ ...editingCell, subject: String(e.target.value) })}
                options={[
                  { label: 'Mathematics', value: 'Mathematics' },
                  { label: 'Physics', value: 'Physics' },
                  { label: 'Chemistry', value: 'Chemistry' },
                  { label: 'Computer Science', value: 'Computer Sci' },
                  { label: 'English Literature', value: 'English' },
                ]}
              />
              <VFSelect
                label="Assign Teacher"
                value={editingCell.teacher}
                onChange={(e) => setEditingCell({ ...editingCell, teacher: String(e.target.value) })}
                options={[
                  { label: 'Dr. Sarah Connor (Physics)', value: 'Dr. Sarah Connor' },
                  { label: 'Prof. Rajesh Sharma (Math)', value: 'Prof. Rajesh Sharma' },
                  { label: 'Mr. Vikram Singh (Chemistry)', value: 'Mr. Vikram Singh' },
                  { label: 'Mrs. Anita Desai (English)', value: 'Mrs. Anita Desai' },
                ]}
              />
              <VFSelect
                label="Assign Room / Lab"
                value={editingCell.room}
                onChange={(e) => setEditingCell({ ...editingCell, room: String(e.target.value) })}
                options={[
                  { label: 'Room 204 (Classroom)', value: 'Room 204' },
                  { label: 'Physics Lab 2 (Bldg A)', value: 'Physics Lab 2' },
                  { label: 'Chemistry Lab 1 (Bldg B)', value: 'Chem Lab 1' },
                  { label: 'Computer Lab 3 (50 PCs)', value: 'Comp Lab 3' },
                ]}
              />
            </div>

            <div className="flex gap-2 pt-2 border-t border-border">
              <VFButton
                size="sm"
                className="w-full"
                onClick={() => {
                  if (editingCell.teacher === 'Prof. Rajesh Sharma' && editingCell.period === 'P3' && editingCell.day === 'Monday') {
                    setConflictNotice('🔴 CONFLICT DETECTED: Prof. Rajesh Sharma already teaches Class 9B during Monday Period 3.');
                  } else {
                    setGridData(prev => prev.map(c => c.id === editingCell.id ? editingCell : c));
                  }
                  setEditingCell(null);
                }}
              >
                Save Cell Assignment
              </VFButton>
              <VFButton size="sm" variant="outline" className="w-full" onClick={() => setEditingCell(null)}>
                Cancel
              </VFButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5.3 — Teacher Timetable (7 Features)
  // ----------------------------------------------------
  const teacherTimetableContent = (
    <div className="space-y-4">
      {/* Select Teacher Header */}
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <VFSelect
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(String(e.target.value))}
            options={[
              { label: 'Dr. Sarah Connor (Physics)', value: 'Dr. Sarah Connor' },
              { label: 'Prof. Rajesh Sharma (Mathematics)', value: 'Prof. Rajesh Sharma' },
              { label: 'Mr. Vikram Singh (Chemistry)', value: 'Mr. Vikram Singh' },
              { label: 'Mrs. Anita Desai (English)', value: 'Mrs. Anita Desai' },
            ]}
          />
          <div>
            <p className="text-xs font-bold text-foreground">{selectedTeacher} Schedule Matrix</p>
            <p className="text-[11px] text-muted-foreground">Senior Faculty • Department of Science</p>
          </div>
        </div>
        <VFBadge variant="success">Load: 24 / 28 Periods (85%)</VFBadge>
      </div>

      {/* 21. Teacher Workload KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Teaching Periods Load" value="24 / 28" icon={<Clock className="h-5 w-5" />} trend="up" trendLabel="85% Optimal Cap" />
        <VFStatCard title="Assigned Classes" value="4 Classes" icon={<Users className="h-5 w-5" />} trend="neutral" trendLabel="Class 9A, 9B, 10A, 11Sci" />
        <VFStatCard title="Free Prep Periods" value="8 Free Slots" icon={<UserCheck className="h-5 w-5" />} trend="up" trendLabel="Available for Substitution" />
        <VFStatCard title="Substitution History" value="3 Proxies" icon={<RefreshCw className="h-5 w-5" />} description="This Month" />
      </div>

      {/* 19 & 20. Vertical Timeline & Weekly Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="19. Today's Daily Schedule Timeline" className="lg:col-span-1">
          <div className="space-y-3 text-xs mt-2">
            {[
              { time: '08:00 AM', class: 'Class 9-A Physics', room: 'Physics Lab 2', status: 'Completed' },
              { time: '08:45 AM', class: 'Class 10-B Physics', room: 'Room 204', status: 'In Progress' },
              { time: '09:30 AM', class: 'FREE PREP PERIOD', room: 'Staff Room', status: 'Free' },
              { time: '10:30 AM', class: 'Class 11-Sci Physics Lab', room: 'Physics Lab 2', status: 'Upcoming' },
              { time: '11:15 AM', class: 'Class 8-B Science', room: 'Room 102', status: 'Upcoming' },
            ].map((slot, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-primary">{slot.time}</span>
                  <p className="font-bold text-foreground mt-0.5">{slot.class}</p>
                  <p className="text-muted-foreground text-[10px]">{slot.room}</p>
                </div>
                <VFBadge variant={slot.status === 'Free' ? 'outline' : slot.status === 'Completed' ? 'success' : 'primary'}>
                  {slot.status}
                </VFBadge>
              </div>
            ))}
          </div>
        </VFCard>

        {/* 20 & 22. Weekly Matrix & Availability */}
        <VFSection title="20 & 22. Faculty Weekly Matrix & Availability Grid" className="lg:col-span-2">
          <div className="grid grid-cols-6 gap-2 text-xs">
            <div className="bg-muted/60 p-2.5 rounded-lg font-bold text-center border border-border/60">Slot</div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
              <div key={d} className="bg-muted/60 p-2.5 rounded-lg font-bold text-center border border-border/60 text-foreground">{d}</div>
            ))}
            {[
              { period: 'P1', mon: '9A Physics', tue: '10B Phys', wed: '11Sci Phys', thu: 'FREE', fri: '9B Phys' },
              { period: 'P2', mon: '9A Phys Lab', tue: 'FREE', wed: '8B Sci', thu: '10A Phys', fri: '11Sci Phys' },
              { period: 'P3', mon: 'FREE', tue: '10B Phys', wed: '9A Phys', thu: 'FREE', fri: '8A Phys' },
              { period: 'P4', mon: '11Sci Phys', tue: 'FREE', wed: 'FREE', thu: '9B Phys', fri: 'FREE' },
            ].map((row, idx) => (
              <React.Fragment key={idx}>
                <div className="p-2.5 bg-muted/30 border border-border/60 rounded-lg text-center font-mono font-bold text-muted-foreground">{row.period}</div>
                {[row.mon, row.tue, row.wed, row.thu, row.fri].map((cell, cIdx) => (
                  <div key={cIdx} className={`p-2.5 rounded-lg border text-center font-medium ${cell === 'FREE' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 font-bold' : 'bg-card border-border/70 text-foreground'}`}>
                    {cell}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </VFSection>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5.4 — Room & Resource Scheduling (9 Features)
  // ----------------------------------------------------
  const roomsContent = (
    <div className="space-y-4">
      {/* 33 & 34. Resource Availability & Utilization Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Epson 4K Projectors" value="8 / 11 Avail" icon={<Building className="h-5 w-5" />} trend="up" trendLabel="3 Currently Booked" />
        <VFStatCard title="Computer Lab 3 Usage" value="82% Capacity" icon={<Cpu className="h-5 w-5" />} trend="up" trendLabel="50 Workstations Live" />
        <VFStatCard title="Physics Lab 2 Utilization" value="71% Capacity" icon={<SlidersHorizontal className="h-5 w-5" />} trend="neutral" trendLabel="Optics & Oscilloscopes" />
        <VFStatCard title="Main Auditorium" value="42% Booked" icon={<Users className="h-5 w-5" />} description="500 Seats Available" />
      </div>

      {/* 26 & 27. Room Management & Room Timetable Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="26. School Rooms & Facilities Catalog" className="lg:col-span-1">
          <div className="space-y-2.5 text-xs mt-2">
            {[
              { room: '🔬 Physics Lab 2', cap: '40 Seats', bldg: 'Building A • Floor 2', status: 'Booked (Class 9A)' },
              { room: '🧪 Chemistry Lab 1', cap: '35 Seats', bldg: 'Building B • Floor 1', status: 'Available' },
              { room: '💻 Computer Lab 3', cap: '50 PCs', bldg: 'Building A • Floor 3', status: 'Booked (Class 10B)' },
              { room: '🎭 Main Auditorium', cap: '500 Seats', bldg: 'Main Block • Ground', status: 'Available' },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">{r.room}</span>
                  <VFBadge variant={r.status.includes('Booked') ? 'warning' : 'success'}>{r.status}</VFBadge>
                </div>
                <p className="text-muted-foreground text-[11px]">{r.cap} · {r.bldg}</p>
              </div>
            ))}
          </div>
        </VFCard>

        {/* 27, 28, 29 & 30. Room Booking & Resource Allocation */}
        <VFSection title="27 & 28. Live Room & Resource Booking Center" className="lg:col-span-2">
          <div className="p-4 bg-card border border-border rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Quick One-Time Room & Equipment Reservation</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <VFSelect value={selectedRoom} onChange={(e) => setSelectedRoom(String(e.target.value))} options={[{ label: 'Physics Lab 2', value: 'Physics Lab 2' }, { label: 'Main Auditorium', value: 'Main Auditorium' }]} />
              <VFDatePicker label="Booking Date" defaultValue="2026-08-18" />
              <VFSelect label="Target Period" options={[{ label: 'Period 4 (10:30 AM)', value: 'P4' }, { label: 'Period 6 (12:45 PM)', value: 'P6' }]} />
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-3">
              <span className="text-xs text-success font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Room & Resource Available
              </span>
              <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Confirm Room Reservation</VFButton>
            </div>
          </div>
        </VFSection>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5.5 — Substitute & Replacement Management (10 Features)
  // ----------------------------------------------------
  const substitutesContent = (
    <div className="space-y-4">
      {/* 44. Today's Substitute Operations Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Absent Teachers Today" value="4 Teachers" icon={<Users className="h-5 w-5" />} trend="down" trendLabel="4 Sick / Personal Leaves" />
        <VFStatCard title="Affected Class Periods" value="11 Periods" icon={<Clock className="h-5 w-5" />} trend="neutral" trendLabel="Requires Proxy Cover" />
        <VFStatCard title="Proxy Assigned" value="9 / 11" icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendLabel="82% Assigned" />
        <VFStatCard title="Pending Substitutes" value="2 Slots" icon={<AlertCircle className="h-5 w-5" />} trend="down" trendLabel="Action Required" />
      </div>

      {/* 36 & 38. AI Substitute Recommendation & Bulk Auto-Assign */}
      <VFCard title="36 & 38. AI Substitute Recommendation & One-Click Bulk Assignment">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
          <div>
            <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Absent Teacher Proxy Match Roster
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono">Automatically checks free periods, subject expertise, and workload balance.</p>
          </div>
          <VFButton size="sm" leftIcon={<Zap className="h-3.5 w-3.5 text-primary" />}>
            Execute AI Auto-Assign All (11 Periods)
          </VFButton>
        </div>

        <div className="space-y-3 text-xs">
          {[
            { period: 'Period 3 (09:30 AM)', absent: 'Dr. Sarah Connor', subject: 'Physics', class: 'Class 9-A', proxy: 'Mrs. Anita Desai', match: '94% AI Match', status: 'Assigned' },
            { period: 'Period 5 (11:15 AM)', absent: 'Prof. Rajesh Sharma', subject: 'Math', class: 'Class 8-B', proxy: 'Mr. Vikram Singh', match: '88% AI Match', status: 'Assigned' },
            { period: 'Period 6 (12:45 PM)', absent: 'Mr. Amit Joshi', subject: 'Computer Sci', class: 'Class 10-A', proxy: 'Pending Choice', match: '76% AI Match', status: 'Pending' },
          ].map((item, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] text-primary font-bold">{item.period} • {item.class}</span>
                <p className="font-bold text-foreground text-sm mt-0.5">{item.subject} (Absent: {item.absent})</p>
                <p className="text-muted-foreground text-xs">Recommended Proxy: <span className="font-semibold text-foreground">{item.proxy}</span> ({item.match})</p>
              </div>
              <div className="flex items-center gap-2">
                <VFBadge variant={item.status === 'Assigned' ? 'success' : 'warning'}>{item.status}</VFBadge>
                <VFButton size="sm" variant="outline">Select Proxy</VFButton>
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5.6 — Exam & Event Scheduling (10 Features)
  // ----------------------------------------------------
  const examEventContent = (
    <div className="space-y-4">
      {/* 45 & 51. Exam & Event Master Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <VFStatCard title="Term Exam Schedules" value="12 Papers" icon={<ClipboardList className="h-5 w-5" />} trend="up" trendLabel="March 18 - March 28" />
        <VFStatCard title="Invigilator Duties" value="48 Slots" icon={<UserCheck className="h-5 w-5" />} trend="neutral" trendLabel="Balanced Duty Allocation" />
        <VFStatCard title="School Events Active" value="3 Events" icon={<CalendarDays className="h-5 w-5" />} description="Annual Sports & PTM" />
        <VFStatCard title="Temporary Overrides" value="1 Active" icon={<RefreshCw className="h-5 w-5" />} trend="up" trendLabel="Sports Day Schedule" />
      </div>

      {/* 48. Exam Visual Seating Plan Generator */}
      <VFCard title="48. Visual Exam Hall Seating Plan Generator">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
          <div>
            <h4 className="text-xs font-bold text-foreground">Main Hall A Seating Arrangement (Class 10 Math Exam)</h4>
            <p className="text-xs text-muted-foreground">Alternate seating pattern to prevent candidate collision.</p>
          </div>
          <VFBadge variant="primary">Pattern: Alternate Roll Numbers</VFBadge>
        </div>

        <div className="bg-muted/40 p-4 rounded-xl border border-border/60 text-center space-y-3">
          <div className="w-48 mx-auto py-1 bg-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest rounded">
            FRONT / INVIGILATOR DESK
          </div>
          <div className="grid grid-cols-6 gap-2 text-xs">
            {['A1 (1001)', 'A2 (1002)', 'A3 (1003)', 'A4 (1004)', 'A5 (1005)', 'A6 (1006)',
              'B1 (1007)', 'B2 (1008)', 'B3 (1009)', 'B4 (1010)', 'B5 (1011)', 'B6 (1012)',
              'C1 (1013)', 'C2 (1014)', 'C3 (1015)', 'C4 (1016)', 'C5 (1017)', 'C6 (1018)'
            ].map((seat, i) => (
              <div key={i} className="p-2.5 bg-card border border-border rounded-lg text-center font-mono font-bold text-foreground shadow-2xs hover:border-primary cursor-pointer">
                {seat}
              </div>
            ))}
          </div>
        </div>
      </VFCard>

      {/* 53 & 54. Temporary Override & Conflict Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="53. Temporary Timetable Override System">
          <p className="text-xs text-muted-foreground mb-3">Swap standard schedule with event schedule without altering base published timetable.</p>
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-foreground">Active Override: Annual Sports Day Schedule</span>
              <p className="text-muted-foreground text-[11px]">Affects Friday Aug 28 • Auto-reverts on Saturday</p>
            </div>
            <VFButton size="sm" variant="outline">Revert Schedule</VFButton>
          </div>
        </VFCard>

        <VFCard title="54. Schedule Conflict Consolidated Radar">
          <div className="space-y-2 text-xs mt-1">
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex justify-between items-center">
              <span className="font-bold text-foreground">🔴 Teacher Collisions</span>
              <VFBadge variant="success">0 Collisions</VFBadge>
            </div>
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex justify-between items-center">
              <span className="font-bold text-foreground">🟠 Room Double-Bookings</span>
              <VFBadge variant="success">0 Conflicts</VFBadge>
            </div>
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex justify-between items-center">
              <span className="font-bold text-foreground">🟢 Valid Master Assignments</span>
              <VFBadge variant="primary">184 / 184 Valid</VFBadge>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5.7 — Scheduling Intelligence & Optimization (12 Features)
  // ----------------------------------------------------
  const aiSchedulerContent = (
    <div className="space-y-4">
      {/* 63. Schedule Quality Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Timetable Quality Score" value="94 / 100" icon={<Award className="h-5 w-5" />} trend="up" trendLabel="Grade A+ Optimal" />
        <VFStatCard title="Hard Constraint Compliance" value="100%" icon={<Lock className="h-5 w-5" />} trend="up" trendLabel="0 Conflicts Found" />
        <VFStatCard title="Teacher Load Balance" value="91% Score" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="Fair Workload Index" />
        <VFStatCard title="Subject Spacing Index" value="93% Score" icon={<BookOpen className="h-5 w-5" />} trend="neutral" trendLabel="Even Daily Distribution" />
      </div>

      {/* 55 & 58. AI Timetable Generator & Optimization Before/After */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">55 & 58. AI Timetable Generator & Optimization Engine</h3>
              <p className="text-xs text-muted-foreground">Calculates 100% conflict-free schedule across 24 Classes, 48 Teachers, 32 Rooms.</p>
            </div>
          </div>
          <VFButton
            size="sm"
            leftIcon={<Sparkles className="h-3.5 w-3.5" />}
            onClick={() => {
              setIsAiGenerating(true);
              setTimeout(() => setIsAiGenerating(false), 1500);
            }}
          >
            {isAiGenerating ? 'Generating AI Schedule...' : '✨ Generate Full AI Timetable'}
          </VFButton>
        </div>

        {/* Before / After Optimization Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-foreground">AI Optimization Proposals (Reduces Faculty Idle Time by 8%)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 space-y-1">
              <span className="font-bold text-muted-foreground uppercase text-[10px]">Current Schedule</span>
              <p className="font-bold text-foreground">Class 8A Math • Monday Period 1</p>
              <p className="text-muted-foreground text-[11px]">Class 8B Science • Monday Period 2</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/25 space-y-1">
              <span className="font-bold text-primary uppercase text-[10px]">AI Proposed Swap</span>
              <p className="font-bold text-foreground">Class 8A Math ➔ Monday Period 2</p>
              <p className="text-muted-foreground text-[11px]">Eliminates 1-hour faculty gap for Prof. Sharma</p>
            </div>
          </div>
        </div>
      </div>

      {/* 59 & 64. What-If Simulation Sandbox & AI Schedule Assistant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 59. What-If Simulation */}
        <VFCard title="59. What-If Simulation Sandbox">
          <p className="text-xs text-muted-foreground mb-3">Simulate faculty leave impact without modifying published schedule.</p>
          <div className="space-y-3 text-xs">
            <VFSelect
              label="Simulate Absent Teacher"
              value={simulatedAbsentTeacher}
              onChange={(e) => setSimulatedAbsentTeacher(String(e.target.value))}
              options={[{ label: 'Prof. Rajesh Sharma', value: 'Prof. Rajesh Sharma' }, { label: 'Dr. Sarah Connor', value: 'Dr. Sarah Connor' }]}
            />
            <VFButton size="sm" className="w-full" leftIcon={<Play className="h-3.5 w-3.5" />} onClick={() => setIsSimulating(true)}>
              Run What-If Simulation
            </VFButton>
            {isSimulating && (
              <div className="p-3 bg-primary/10 border border-primary/25 rounded-lg space-y-1 animate-fade-in">
                <span className="font-bold text-foreground">Simulation Result:</span>
                <p className="text-muted-foreground text-[11px]">Affects 5 classes & 7 periods. Proposed proxy cover: P1 ➔ Mrs. Patel, P3 ➔ Mr. Khan.</p>
              </div>
            )}
          </div>
        </VFCard>

        {/* 64. AI Schedule Assistant Natural Language Control */}
        <VFCard title="64. AI Schedule Assistant (Natural Language Query)">
          <p className="text-xs text-muted-foreground mb-3">Type instructions to query or adjust schedule via AI prompt.</p>
          <div className="space-y-3 text-xs">
            <div className="flex gap-2">
              <VFInput
                placeholder="e.g. Give Class 8A two free periods on Saturday..."
                value={aiAssistantInput}
                onChange={(e: any) => setAiAssistantInput(e.target.value)}
              />
              <VFButton
                size="sm"
                onClick={() => {
                  if (aiAssistantInput) {
                    setAiAssistantResponse(`AI Analysis: Requested 2 free periods for Class 8A on Saturday. Reallocating P4 & P5 to Free Activity slots. 0 conflicts generated.`);
                  }
                }}
              >
                Send
              </VFButton>
            </div>
            {aiAssistantResponse && (
              <div className="p-3 bg-muted/40 border border-border rounded-lg text-foreground text-xs animate-fade-in">
                <span className="font-bold text-primary flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> AI Response:
                </span>
                <p className="mt-1 leading-relaxed text-[11px]">{aiAssistantResponse}</p>
              </div>
            )}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // ALL 7 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'config', label: 'Timetable Configuration', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: configContent },
    { id: 'class-timetable', label: 'Class Timetable', icon: <Calendar className="h-3.5 w-3.5" />, content: classTimetableContent },
    { id: 'teacher-timetable', label: 'Teacher Timetable', icon: <Users className="h-3.5 w-3.5" />, content: teacherTimetableContent },
    { id: 'rooms-resources', label: 'Room & Resource Scheduling', icon: <Building className="h-3.5 w-3.5" />, content: roomsContent },
    { id: 'substitutes', label: 'Substitute & Replacement', icon: <UserCheck className="h-3.5 w-3.5" />, content: substitutesContent },
    { id: 'exam-event-scheduling', label: 'Exam & Event Scheduling', icon: <ClipboardList className="h-3.5 w-3.5" />, content: examEventContent },
    { id: 'ai-scheduler', label: 'Scheduling Intelligence & Optimization', icon: <Sparkles className="h-3.5 w-3.5 text-primary" />, content: aiSchedulerContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        defaultTabId="class-timetable"
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
