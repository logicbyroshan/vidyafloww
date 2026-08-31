import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFCard,
  VFSelect,
  VFInput,
  VFBadge,
  VFDrawer,
  cn,
} from '@vidyafloww/ui';
import {
  Calendar,
  Clock,
  Download,
  Users,
  Bell,
  BookOpen,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Plus,
  SlidersHorizontal,
  Sparkles,
  School,
  Layers,
  Check,
  X,
  Coffee,
  Utensils,
  MapPin,
  UserX,
  FileSpreadsheet,
  Settings,
  Pencil,
  RotateCcw,
  CalendarDays,
  Activity,
  Sliders,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/timetable')({
  component: TimetablePage,
});

interface PeriodSlot {
  subject: string;
  teacher: string;
  room: string;
  isLab?: boolean;
}

interface PeriodTiming {
  id: string;
  order: number;
  name: string;
  start: string;
  end: string;
  type: 'Class' | 'Break';
  duration: string;
}

interface ProxySubstitution {
  id: string;
  absentTeacher: string;
  proxyTeacher: string;
  period: string;
  subject: string;
  room: string;
  reason: string;
  status: 'Assigned' | 'Confirmed';
}

interface FacultyLoad {
  id: string;
  name: string;
  department: string;
  assignedPeriods: number;
  maxPeriods: number;
  freePeriodsToday: string;
  status: 'Optimal' | 'Available' | 'Near Capacity';
}

interface RoomLoad {
  id: string;
  name: string;
  type: string;
  capacity: number;
  utilizationRate: number;
  currentClass: string;
}

const DEFAULT_PERIOD_CONFIG: PeriodTiming[] = [
  { id: '1', order: 1, name: 'Period 1', start: '08:00 AM', end: '08:45 AM', type: 'Class', duration: '45m' },
  { id: '2', order: 2, name: 'Period 2', start: '08:45 AM', end: '09:30 AM', type: 'Class', duration: '45m' },
  { id: '3', order: 3, name: 'Period 3', start: '09:30 AM', end: '10:15 AM', type: 'Class', duration: '45m' },
  { id: '4', order: 4, name: 'Morning Break', start: '10:15 AM', end: '10:30 AM', type: 'Break', duration: '15m' },
  { id: '5', order: 5, name: 'Period 4', start: '10:30 AM', end: '11:15 AM', type: 'Class', duration: '45m' },
  { id: '6', order: 6, name: 'Period 5', start: '11:15 AM', end: '12:00 PM', type: 'Class', duration: '45m' },
  { id: '7', order: 7, name: 'Lunch Break', start: '12:00 PM', end: '12:45 PM', type: 'Break', duration: '45m' },
  { id: '8', order: 8, name: 'Period 6', start: '12:45 PM', end: '01:30 PM', type: 'Class', duration: '45m' },
  { id: '9', order: 9, name: 'Period 7', start: '01:30 PM', end: '02:15 PM', type: 'Class', duration: '45m' },
];

const INITIAL_SCHEDULE_DATA: Record<string, PeriodSlot[]> = {
  'Monday': [
    { subject: 'Mathematics', teacher: 'Mrs. Sunita Verma', room: 'Room 101' },
    { subject: 'Physics', teacher: 'Dr. Rajesh Sharma', room: 'Lab 204', isLab: true },
    { subject: 'English Literature', teacher: 'Ms. Ananya Gupta', room: 'Room 101' },
    { subject: 'Chemistry', teacher: 'Dr. Manoj Nair', room: 'Lab 102', isLab: true },
    { subject: 'Biology', teacher: 'Mr. Rahul Kumar', room: 'Room 101' },
    { subject: 'Physical Education', teacher: 'Coach Singh', room: 'Sports Ground' },
    { subject: 'Computer Science', teacher: 'Mr. Subhash Das', room: 'Lab 3', isLab: true },
  ],
  'Tuesday': [
    { subject: 'Physics', teacher: 'Dr. Rajesh Sharma', room: 'Lab 204', isLab: true },
    { subject: 'Mathematics', teacher: 'Mrs. Sunita Verma', room: 'Room 101' },
    { subject: 'Social Science', teacher: 'Mr. Vivek Patel', room: 'Room 101' },
    { subject: 'English Literature', teacher: 'Ms. Ananya Gupta', room: 'Room 101' },
    { subject: 'Chemistry', teacher: 'Dr. Manoj Nair', room: 'Lab 102', isLab: true },
    { subject: 'Library & Reading', teacher: 'Mrs. Joshi', room: 'Central Library' },
    { subject: 'Mathematics', teacher: 'Mrs. Sunita Verma', room: 'Room 101' },
  ],
  'Wednesday': [
    { subject: 'Chemistry', teacher: 'Dr. Manoj Nair', room: 'Lab 102', isLab: true },
    { subject: 'English Literature', teacher: 'Ms. Ananya Gupta', room: 'Room 101' },
    { subject: 'Mathematics', teacher: 'Mrs. Sunita Verma', room: 'Room 101' },
    { subject: 'Physics', teacher: 'Dr. Rajesh Sharma', room: 'Lab 204', isLab: true },
    { subject: 'Hindi Literature', teacher: 'Mr. Mishra', room: 'Room 101' },
    { subject: 'Fine Arts', teacher: 'Ms. Roy', room: 'Studio 1' },
    { subject: 'Biology', teacher: 'Mr. Rahul Kumar', room: 'Room 101' },
  ],
  'Thursday': [
    { subject: 'Mathematics', teacher: 'Mrs. Sunita Verma', room: 'Room 101' },
    { subject: 'Biology', teacher: 'Mr. Rahul Kumar', room: 'Room 101' },
    { subject: 'Physics', teacher: 'Dr. Rajesh Sharma', room: 'Lab 204', isLab: true },
    { subject: 'Computer Science', teacher: 'Mr. Subhash Das', room: 'Lab 3', isLab: true },
    { subject: 'Social Science', teacher: 'Mr. Vivek Patel', room: 'Room 101' },
    { subject: 'English Literature', teacher: 'Ms. Ananya Gupta', room: 'Room 101' },
    { subject: 'Chemistry', teacher: 'Dr. Manoj Nair', room: 'Lab 102', isLab: true },
  ],
  'Friday': [
    { subject: 'English Literature', teacher: 'Ms. Ananya Gupta', room: 'Room 101' },
    { subject: 'Mathematics', teacher: 'Mrs. Sunita Verma', room: 'Room 101' },
    { subject: 'Social Science', teacher: 'Mr. Vivek Patel', room: 'Room 101' },
    { subject: 'Physics', teacher: 'Dr. Rajesh Sharma', room: 'Lab 204', isLab: true },
    { subject: 'Music & Drama', teacher: 'Mr. Ali', room: 'Auditorium' },
    { subject: 'Chemistry', teacher: 'Dr. Manoj Nair', room: 'Lab 102', isLab: true },
    { subject: 'Club Activity', teacher: 'Faculty Squad', room: 'Main Campus' },
  ],
  'Saturday': [
    { subject: 'Computer Science', teacher: 'Mr. Subhash Das', room: 'Lab 3', isLab: true },
    { subject: 'Fine Arts', teacher: 'Ms. Roy', room: 'Studio 1' },
    { subject: 'Library & Reading', teacher: 'Mrs. Joshi', room: 'Central Library' },
    { subject: 'Physical Education', teacher: 'Coach Singh', room: 'Sports Ground' },
    { subject: 'Music & Drama', teacher: 'Mr. Ali', room: 'Auditorium' },
    { subject: 'Science Club', teacher: 'Dr. Rajesh Sharma', room: 'Lab 204', isLab: true },
    { subject: 'Mentorship & House Meeting', teacher: 'Mrs. Sunita Verma', room: 'Room 101' },
  ],
};

const INITIAL_SUBSTITUTIONS: ProxySubstitution[] = [
  {
    id: 'SUB-1',
    absentTeacher: 'Dr. Rajesh Sharma',
    proxyTeacher: 'Mrs. Sunita Verma',
    period: 'Period 3 (09:30 – 10:15 AM)',
    subject: 'Physics & Lab Practice',
    room: 'Lab 204',
    reason: 'Medical Leave (High Fever)',
    status: 'Assigned',
  },
  {
    id: 'SUB-2',
    absentTeacher: 'Ms. Pooja Rao',
    proxyTeacher: 'Mrs. Joshi',
    period: 'Period 5 (11:15 – 12:00 PM)',
    subject: 'English Literature',
    room: 'Room 101',
    reason: 'Inter-School Debate Escort Duty',
    status: 'Confirmed',
  },
  {
    id: 'SUB-3',
    absentTeacher: 'Mr. Arvind Gupta',
    proxyTeacher: 'Mr. Vivek Patel',
    period: 'Period 6 (12:45 – 01:30 PM)',
    subject: 'Social Science',
    room: 'Room 101',
    reason: 'Personal Casual Leave',
    status: 'Assigned',
  },
];

const INITIAL_FACULTY_LOAD: FacultyLoad[] = [
  { id: 'F1', name: 'Mrs. Sunita Verma', department: 'Mathematics', assignedPeriods: 24, maxPeriods: 28, freePeriodsToday: 'Periods 2, 6', status: 'Optimal' },
  { id: 'F2', name: 'Dr. Rajesh Sharma', department: 'Physics', assignedPeriods: 22, maxPeriods: 28, freePeriodsToday: 'Periods 1, 4', status: 'Available' },
  { id: 'F3', name: 'Ms. Ananya Gupta', department: 'English', assignedPeriods: 26, maxPeriods: 28, freePeriodsToday: 'Period 5', status: 'Near Capacity' },
  { id: 'F4', name: 'Dr. Manoj Nair', department: 'Chemistry', assignedPeriods: 23, maxPeriods: 28, freePeriodsToday: 'Periods 3, 7', status: 'Optimal' },
  { id: 'F5', name: 'Mr. Vivek Patel', department: 'Social Sciences', assignedPeriods: 21, maxPeriods: 28, freePeriodsToday: 'Periods 1, 3, 5', status: 'Available' },
  { id: 'F6', name: 'Mr. Rahul Kumar', department: 'Biology', assignedPeriods: 25, maxPeriods: 28, freePeriodsToday: 'Period 2', status: 'Optimal' },
  { id: 'F7', name: 'Mr. Subhash Das', department: 'Computer Science', assignedPeriods: 20, maxPeriods: 28, freePeriodsToday: 'Periods 4, 6', status: 'Available' },
];

const INITIAL_ROOM_LOAD: RoomLoad[] = [
  { id: 'R1', name: 'Physics Laboratory 204', type: 'Laboratory', capacity: 40, utilizationRate: 85, currentClass: 'Class 11-Sci (Dr. Sharma)' },
  { id: 'R2', name: 'Chemistry Laboratory 102', type: 'Laboratory', capacity: 40, utilizationRate: 90, currentClass: 'Class 12-Sci (Dr. Nair)' },
  { id: 'R3', name: 'Computer Lab 3 (Turing Lab)', type: 'Computer Lab', capacity: 45, utilizationRate: 75, currentClass: 'Class 9-A (Mr. Das)' },
  { id: 'R4', name: 'Biology Laboratory 105', type: 'Laboratory', capacity: 35, utilizationRate: 70, currentClass: 'Class 10-B (Mr. Kumar)' },
  { id: 'R5', name: 'Fine Arts Studio 1', type: 'Special Activity', capacity: 30, utilizationRate: 60, currentClass: 'Class 8-C (Ms. Roy)' },
  { id: 'R6', name: 'Central School Auditorium', type: 'Assembly & Events', capacity: 600, utilizationRate: 40, currentClass: 'Dramatics Club' },
];

function TimetablePage() {
  const { addNotification } = useGlobalStore();
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 9-A');
  const [classTeacher, setClassTeacher] = React.useState<string>('Mrs. Sunita Verma');
  
  // Working Days Configuration (5-Day vs 6-Day school week)
  const [workingDaysMode, setWorkingDaysMode] = React.useState<'5days' | '6days'>('5days');
  const [periodConfig, setPeriodConfig] = React.useState<PeriodTiming[]>(DEFAULT_PERIOD_CONFIG);
  const [scheduleData, setScheduleData] = React.useState<Record<string, PeriodSlot[]>>(INITIAL_SCHEDULE_DATA);

  // Configuration Drawers State
  const [isConfigurePeriodsOpen, setIsConfigurePeriodsOpen] = React.useState<boolean>(false);
  const [isConfigureTimetableOpen, setIsConfigureTimetableOpen] = React.useState<boolean>(false);

  // Faculty Workload & Substitutions Drawer State
  const [isWorkloadDrawerOpen, setIsWorkloadDrawerOpen] = React.useState<boolean>(false);
  const [workloadDrawerTab, setWorkloadDrawerTab] = React.useState<'substitutions' | 'faculty' | 'rooms'>('substitutions');
  const [substitutionsList, setSubstitutionsList] = React.useState<ProxySubstitution[]>(INITIAL_SUBSTITUTIONS);
  const [facultyList] = React.useState<FacultyLoad[]>(INITIAL_FACULTY_LOAD);
  const [roomList] = React.useState<RoomLoad[]>(INITIAL_ROOM_LOAD);

  // New Proxy Form state
  const [isAssigningProxy, setIsAssigningProxy] = React.useState<boolean>(false);
  const [newAbsentTeacher, setNewAbsentTeacher] = React.useState<string>('Dr. Rajesh Sharma');
  const [newProxyTeacher, setNewProxyTeacher] = React.useState<string>('Mrs. Sunita Verma');
  const [newProxyPeriod, setNewProxyPeriod] = React.useState<string>('Period 4 (10:30 – 11:15 AM)');
  const [newProxySubject, setNewProxySubject] = React.useState<string>('Mathematics');
  const [newProxyRoom, setNewProxyRoom] = React.useState<string>('Room 101');
  const [newProxyReason, setNewProxyReason] = React.useState<string>('Medical Leave Cover');

  // Interactive Slot Editing Modal State
  const [editingSlot, setEditingSlot] = React.useState<{
    day: string;
    slotIndex: number;
    subject: string;
    teacher: string;
    room: string;
    isLab: boolean;
  } | null>(null);

  // Active Days Array based on working days mode
  const activeDays = workingDaysMode === '6days'
    ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const classPeriods = periodConfig.filter((p) => p.type === 'Class');

  const handleOpenSlotEdit = (day: string, slotIndex: number, slot: PeriodSlot) => {
    setEditingSlot({
      day,
      slotIndex,
      subject: slot.subject,
      teacher: slot.teacher,
      room: slot.room,
      isLab: Boolean(slot.isLab),
    });
  };

  const handleSaveSlotEdit = () => {
    if (!editingSlot) return;

    setScheduleData((prev) => {
      const daySlots = [...(prev[editingSlot.day] || [])];
      daySlots[editingSlot.slotIndex] = {
        subject: editingSlot.subject,
        teacher: editingSlot.teacher,
        room: editingSlot.room,
        isLab: editingSlot.isLab,
      };
      return { ...prev, [editingSlot.day]: daySlots };
    });

    addNotification({
      title: 'Timetable Slot Updated',
      description: `${editingSlot.day} Period ${editingSlot.slotIndex + 1} updated to ${editingSlot.subject} (${editingSlot.teacher}).`,
      type: 'success',
    });

    setEditingSlot(null);
  };

  const handleCreateProxy = () => {
    if (!newAbsentTeacher || !newProxyTeacher) return;

    const newProxy: ProxySubstitution = {
      id: `SUB-${Date.now()}`,
      absentTeacher: newAbsentTeacher,
      proxyTeacher: newProxyTeacher,
      period: newProxyPeriod,
      subject: newProxySubject,
      room: newProxyRoom,
      reason: newProxyReason,
      status: 'Assigned',
    };

    setSubstitutionsList([newProxy, ...substitutionsList]);
    setIsAssigningProxy(false);
    addNotification({
      title: 'Substitute Teacher Assigned',
      description: `${newProxyTeacher} appointed as proxy for ${newAbsentTeacher} on ${newProxyPeriod}.`,
      type: 'success',
    });
  };

  const handleExportPDF = () => {
    addNotification({
      title: 'Exporting Timetable',
      description: `Weekly Schedule PDF for ${selectedClass} is being compiled for download.`,
      type: 'info',
    });
  };

  return (
    <VFPageContainer>
      <div className="space-y-3.5">
        {/* ═══════════════════════════════════════════════════════════════════════
            1. MASTER CLASS SCHEDULE TOOLBAR & SLEEK DARK GRID
            ═══════════════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111113] p-3 rounded-lg border border-[#242428] shadow-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-56">
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
              <div className="flex items-center gap-2 px-3 h-9 rounded-md bg-[#161619] border border-[#2a2a30] text-xs">
                <School className="h-4 w-4 text-zinc-400 shrink-0" />
                <span className="font-medium text-zinc-400">Class Teacher:</span>
                <span className="font-bold text-white">{classTeacher}</span>
                <span className="text-zinc-400 font-mono">(Room 101)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<Clock className="h-3.5 w-3.5 text-zinc-400" />}
                onClick={() => setIsConfigurePeriodsOpen(true)}
              >
                Configure Periods
              </VFButton>
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />}
                onClick={() => setIsConfigureTimetableOpen(true)}
              >
                Configure Timetable
              </VFButton>
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<Users className="h-3.5 w-3.5 text-zinc-400" />}
                onClick={() => setIsWorkloadDrawerOpen(true)}
              >
                Faculty Workload & Proxies
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono font-bold bg-[#24242a] text-zinc-300 rounded">
                  {substitutionsList.length}
                </span>
              </VFButton>
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<Download className="h-3.5 w-3.5 text-zinc-400" />}
                onClick={handleExportPDF}
              >
                Export PDF
              </VFButton>
            </div>
          </div>

          {/* Sleek Deep Dark Table Grid with Darker Tactile Cards */}
          <div className="border border-[#24242a] rounded-lg bg-[#0b0b0d] overflow-x-auto custom-scrollbar shadow-sm">
            <table className="w-full text-left min-w-[880px] border-collapse">
              <thead>
                <tr className="border-b border-[#24242a] bg-[#111114]">
                  <th className="p-3.5 font-black text-xs text-zinc-400 uppercase tracking-wider w-36 bg-[#111114] border-r border-[#24242a] select-none">
                    Day / Time
                  </th>
                  {classPeriods.map((p) => (
                    <th
                      key={p.id}
                      className="p-3.5 font-bold text-xs text-zinc-300 whitespace-nowrap text-left border-r last:border-r-0 border-[#24242a] select-none bg-[#111114]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white text-xs font-black uppercase tracking-wider">{p.name}</span>
                          <span className="text-[10px] font-mono font-bold text-zinc-400 bg-[#161619] px-1.5 py-0.2 rounded border border-[#26262e]">
                            {p.duration}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-mono block font-medium">
                          {p.start} – {p.end}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e22]">
                {activeDays.map((day) => (
                  <tr key={day} className="hover:bg-white/[0.015] transition-colors">
                    {/* Dark Solid Day Anchor Column */}
                    <td className="p-4 font-bold text-white bg-[#0e0e11] whitespace-nowrap text-sm border-r border-[#24242a] select-none">
                      <div className="space-y-1.5">
                        <span className="block text-xs font-black text-white uppercase tracking-wider">
                          {day}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono block font-semibold bg-[#161619] px-2 py-0.5 rounded border border-[#24242c] w-fit">
                          {classPeriods.length} Periods
                        </span>
                      </div>
                    </td>

                    {/* Grid Cells with Dark Sleek Slot Cards */}
                    {(scheduleData[day] || []).slice(0, classPeriods.length).map((slot, idx) => (
                      <td
                        key={idx}
                        className="p-2.5 border-r last:border-r-0 border-[#1e1e22] min-w-[155px] align-top bg-[#0b0b0d]"
                      >
                        {/* Dark Sleek Period Card with Refined Typography Hierarchy */}
                        <div
                          onClick={() => handleOpenSlotEdit(day, idx, slot)}
                          className="p-3 rounded-md bg-[#131316] border border-[#24242a] space-y-2 transition-all group cursor-pointer relative shadow-xs select-none hover:bg-[#1a1a1f] hover:border-[#3e3e48] hover:shadow-md hover:-translate-y-0.5"
                          title={`Click to edit or reassign ${slot.subject} (${slot.teacher})`}
                        >
                          {/* Top Row: Primary Subject Title + Subtle Lab Tag */}
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="font-bold text-white text-sm leading-snug tracking-tight line-clamp-1 group-hover:text-white transition-colors">
                              {slot.subject}
                            </span>
                            {slot.isLab && (
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#181e28] border border-sky-800/40 text-sky-300 shrink-0">
                                Lab
                              </span>
                            )}
                          </div>

                          {/* Middle Row: Faculty Teacher Name (Secondary - softened neutral) */}
                          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                            <BookOpen className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                            <span className="font-medium truncate text-zinc-400 group-hover:text-zinc-300 transition-colors">
                              {slot.teacher}
                            </span>
                          </div>

                          {/* Bottom Row: Room Badge (Tertiary - muted monospace metadata) */}
                          <div className="flex items-center justify-between pt-1.5 border-t border-[#1e1e24] text-xs">
                            <span className="font-mono text-zinc-400 bg-[#0e0e11] px-2 py-0.5 rounded border border-[#222228] text-[11px] font-medium flex items-center gap-1 group-hover:text-zinc-300 transition-colors">
                              <MapPin className="h-3 w-3 shrink-0 text-zinc-500" />
                              {slot.room}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white text-xs flex items-center gap-0.5 font-medium transition-opacity">
                              <Pencil className="h-3 w-3" /> Edit
                            </span>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. CONFIGURE PERIODS DRAWER (BELL SCHEDULE & TIME SLOTS)
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDrawer
        isOpen={isConfigurePeriodsOpen}
        onClose={() => setIsConfigurePeriodsOpen(false)}
        title="Configure Daily Periods & Bell Schedule"
        description="Set period start and end times, adjust durations, and configure break intervals"
        className="max-w-xl"
        footerActions={
          <div className="flex items-center justify-between w-full">
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
              onClick={() => {
                setPeriodConfig(DEFAULT_PERIOD_CONFIG);
                addNotification({
                  title: 'Period Timings Reset',
                  description: 'Default 7-period + 2-break bell schedule restored.',
                  type: 'info',
                });
              }}
            >
              Reset to Defaults
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Check className="h-3.5 w-3.5" />}
              onClick={() => {
                setIsConfigurePeriodsOpen(false);
                addNotification({
                  title: 'Period Schedule Saved',
                  description: 'Daily campus bell timings and period durations updated.',
                  type: 'success',
                });
              }}
            >
              Save Period Schedule
            </VFButton>
          </div>
        }
      >
        <div className="p-4 sm:p-5 space-y-4">
          <div className="p-3.5 rounded-lg bg-[#121214] border border-[#27272a] space-y-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Standard Daily Session Structure
            </h4>
            <p className="text-xs text-zinc-400 font-medium">
              Institutional timing runs from 08:00 AM to 02:15 PM. Each class lecture is 45 minutes with morning and lunch breaks.
            </p>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
            {periodConfig.map((p, idx) => (
              <div
                key={p.id}
                className="p-3 rounded-md bg-[#141417] border border-[#24242a] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="h-7 w-7 rounded bg-[#161619] border border-[#27272e] flex items-center justify-center font-mono text-xs font-bold text-white shrink-0">
                    {idx + 1}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => {
                        const updated = [...periodConfig];
                        updated[idx] = { ...p, name: e.target.value };
                        setPeriodConfig(updated);
                      }}
                      className="h-8 px-2.5 rounded bg-[#111113] border border-[#27272e] text-xs font-bold text-white outline-none focus:border-zinc-400"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={p.start}
                        onChange={(e) => {
                          const updated = [...periodConfig];
                          updated[idx] = { ...p, start: e.target.value };
                          setPeriodConfig(updated);
                        }}
                        className="h-8 px-2 rounded bg-[#111113] border border-[#27272e] text-xs font-mono text-zinc-200 outline-none w-20 text-center"
                      />
                      <span className="text-zinc-500 text-xs">to</span>
                      <input
                        type="text"
                        value={p.end}
                        onChange={(e) => {
                          const updated = [...periodConfig];
                          updated[idx] = { ...p, end: e.target.value };
                          setPeriodConfig(updated);
                        }}
                        className="h-8 px-2 rounded bg-[#111113] border border-[#27272e] text-xs font-mono text-zinc-200 outline-none w-20 text-center"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-[11px] font-mono text-zinc-400 bg-[#161619] px-2 py-1 rounded border border-[#27272e]">
                        {p.duration}
                      </span>
                      <span className={cn(
                        'text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wide',
                        p.type === 'Break' ? 'bg-[#1e1e24] text-zinc-300 border-[#2e2e36]' : 'bg-[#141417] text-white border-[#27272e]'
                      )}>
                        {p.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </VFDrawer>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. CONFIGURE TIMETABLE DRAWER (5/6 DAYS, CLASS TEACHER, SLOTS)
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDrawer
        isOpen={isConfigureTimetableOpen}
        onClose={() => setIsConfigureTimetableOpen(false)}
        title="Configure Academic Timetable"
        description="Set weekly operating days, assign class mentors, and manage timetable structure"
        className="max-w-xl"
        footerActions={
          <div className="flex items-center justify-between w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsConfigureTimetableOpen(false)}
            >
              Cancel
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Check className="h-3.5 w-3.5" />}
              onClick={() => {
                setIsConfigureTimetableOpen(false);
                addNotification({
                  title: 'Timetable Configuration Applied',
                  description: `Weekly schedule set to ${workingDaysMode === '6days' ? '6-Day Week (Mon–Sat)' : '5-Day Week (Mon–Fri)'}.`,
                  type: 'success',
                });
              }}
            >
              Apply Settings
            </VFButton>
          </div>
        }
      >
        <div className="p-4 sm:p-5 space-y-5">
          {/* Operating Working Days Option */}
          <div className="p-4 rounded-lg bg-[#121214] border border-[#27272a] space-y-3">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Academic School Operating Week
              </h4>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                Toggle between a 5-day week or 6-day week with Saturday academic sessions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setWorkingDaysMode('5days')}
                className={cn(
                  'p-3.5 rounded-md border text-left transition-all cursor-pointer flex flex-col justify-between shadow-xs',
                  workingDaysMode === '5days'
                    ? 'bg-[#1c1c1f] border-zinc-400 text-white ring-1 ring-zinc-400/50'
                    : 'bg-[#121214] border-[#27272a] text-zinc-400 hover:bg-[#18181b]'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white">5-Day Week</span>
                  {workingDaysMode === '5days' && <CheckCircle2 className="h-4 w-4 text-white" />}
                </div>
                <p className="text-xs text-zinc-400">Monday to Friday (Saturday Off)</p>
              </button>

              <button
                type="button"
                onClick={() => setWorkingDaysMode('6days')}
                className={cn(
                  'p-3.5 rounded-md border text-left transition-all cursor-pointer flex flex-col justify-between shadow-xs',
                  workingDaysMode === '6days'
                    ? 'bg-[#1c1c1f] border-zinc-400 text-white ring-1 ring-zinc-400/50'
                    : 'bg-[#121214] border-[#27272a] text-zinc-400 hover:bg-[#18181b]'
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white">6-Day Week</span>
                  {workingDaysMode === '6days' && <CheckCircle2 className="h-4 w-4 text-white" />}
                </div>
                <p className="text-xs text-zinc-400">Monday to Saturday (Full Session)</p>
              </button>
            </div>
          </div>

          {/* Class Teacher & Section Settings */}
          <div className="p-4 rounded-lg bg-[#121214] border border-[#27272a] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Class Section & Mentor Assignment
            </h4>
            <div className="space-y-3">
              <VFSelect
                label="Assigned Class Teacher"
                value={classTeacher}
                onChange={(e) => setClassTeacher(String(e.target.value))}
                options={[
                  { label: 'Mrs. Sunita Verma (Mathematics)', value: 'Mrs. Sunita Verma' },
                  { label: 'Dr. Rajesh Sharma (Physics)', value: 'Dr. Rajesh Sharma' },
                  { label: 'Ms. Ananya Gupta (English)', value: 'Ms. Ananya Gupta' },
                  { label: 'Dr. Manoj Nair (Chemistry)', value: 'Dr. Manoj Nair' },
                  { label: 'Mr. Vivek Patel (Social Science)', value: 'Mr. Vivek Patel' },
                  { label: 'Mr. Rahul Kumar (Biology)', value: 'Mr. Rahul Kumar' },
                ]}
              />
            </div>
          </div>
        </div>
      </VFDrawer>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. REASSIGN / EDIT PERIOD SLOT MODAL (CLICK TO EDIT SLOT)
          ═══════════════════════════════════════════════════════════════════════ */}
      {editingSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setEditingSlot(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#121214] border border-[#27272a] rounded-lg shadow-2xl overflow-hidden flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 bg-[#18181b] border-b border-[#27272a] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Pencil className="h-4 w-4 text-white" />
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    Edit Timetable Slot · {editingSlot.day} (Period {editingSlot.slotIndex + 1})
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    {selectedClass} · Assigned Lecture Period
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingSlot(null)}
                className="h-7 w-7 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="p-5 space-y-4">
              <div>
                <VFSelect
                  label="Subject Name"
                  value={editingSlot.subject}
                  onChange={(e) =>
                    setEditingSlot({ ...editingSlot, subject: String(e.target.value) })
                  }
                  options={[
                    { label: 'Mathematics', value: 'Mathematics' },
                    { label: 'Physics', value: 'Physics' },
                    { label: 'Chemistry', value: 'Chemistry' },
                    { label: 'Biology', value: 'Biology' },
                    { label: 'English Literature', value: 'English Literature' },
                    { label: 'Social Science', value: 'Social Science' },
                    { label: 'Hindi Literature', value: 'Hindi Literature' },
                    { label: 'Computer Science', value: 'Computer Science' },
                    { label: 'Physical Education', value: 'Physical Education' },
                    { label: 'Fine Arts', value: 'Fine Arts' },
                    { label: 'Music & Drama', value: 'Music & Drama' },
                    { label: 'Library & Reading', value: 'Library & Reading' },
                    { label: 'Club Activity', value: 'Club Activity' },
                    { label: 'Mentorship & House Meeting', value: 'Mentorship & House Meeting' },
                  ]}
                />
              </div>

              <div>
                <VFSelect
                  label="Faculty Teacher Assigned"
                  value={editingSlot.teacher}
                  onChange={(e) =>
                    setEditingSlot({ ...editingSlot, teacher: String(e.target.value) })
                  }
                  options={[
                    { label: 'Mrs. Sunita Verma (Maths)', value: 'Mrs. Sunita Verma' },
                    { label: 'Dr. Rajesh Sharma (Physics)', value: 'Dr. Rajesh Sharma' },
                    { label: 'Ms. Ananya Gupta (English)', value: 'Ms. Ananya Gupta' },
                    { label: 'Dr. Manoj Nair (Chemistry)', value: 'Dr. Manoj Nair' },
                    { label: 'Mr. Rahul Kumar (Biology)', value: 'Mr. Rahul Kumar' },
                    { label: 'Mr. Vivek Patel (Social Sci)', value: 'Mr. Vivek Patel' },
                    { label: 'Mr. Subhash Das (Computer Sci)', value: 'Mr. Subhash Das' },
                    { label: 'Coach Singh (Physical Ed)', value: 'Coach Singh' },
                    { label: 'Mrs. Joshi (Library)', value: 'Mrs. Joshi' },
                    { label: 'Mr. Mishra (Hindi)', value: 'Mr. Mishra' },
                    { label: 'Ms. Roy (Fine Arts)', value: 'Ms. Roy' },
                    { label: 'Mr. Ali (Music/Drama)', value: 'Mr. Ali' },
                    { label: 'Faculty Squad (Co-Curricular)', value: 'Faculty Squad' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <VFSelect
                    label="Room / Location"
                    value={editingSlot.room}
                    onChange={(e) =>
                      setEditingSlot({ ...editingSlot, room: String(e.target.value) })
                    }
                    options={[
                      { label: 'Room 101 (Home Room)', value: 'Room 101' },
                      { label: 'Room 102', value: 'Room 102' },
                      { label: 'Physics Lab 204', value: 'Lab 204' },
                      { label: 'Chemistry Lab 102', value: 'Lab 102' },
                      { label: 'Computer Lab 3', value: 'Lab 3' },
                      { label: 'Central Library', value: 'Central Library' },
                      { label: 'Fine Arts Studio 1', value: 'Studio 1' },
                      { label: 'Sports Ground', value: 'Sports Ground' },
                      { label: 'Auditorium', value: 'Auditorium' },
                      { label: 'Main Campus', value: 'Main Campus' },
                    ]}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    Slot Facility Type
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingSlot({ ...editingSlot, isLab: !editingSlot.isLab })
                    }
                    className={cn(
                      'w-full h-9 px-3 rounded-md border text-xs font-bold transition-all cursor-pointer flex items-center justify-between',
                      editingSlot.isLab
                        ? 'bg-[#1c1c1f] text-white border-zinc-400'
                        : 'bg-[#121214] text-zinc-400 border-[#27272a] hover:bg-[#18181b]'
                    )}
                  >
                    <span>{editingSlot.isLab ? 'Laboratory / Practical' : 'Standard Classroom'}</span>
                    <span className="text-xs font-mono">{editingSlot.isLab ? '✓ Lab' : 'Theory'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-[#18181b] border-t border-[#27272a] flex items-center justify-end gap-2">
              <VFButton
                size="sm"
                variant="outline"
                onClick={() => setEditingSlot(null)}
              >
                Cancel
              </VFButton>
              <VFButton
                size="sm"
                leftIcon={<Check className="h-3.5 w-3.5" />}
                onClick={handleSaveSlotEdit}
              >
                Save Changes
              </VFButton>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          6. FACULTY WORKLOAD & SUBSTITUTION MANAGEMENT DRAWER
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDrawer
        isOpen={isWorkloadDrawerOpen}
        onClose={() => {
          setIsWorkloadDrawerOpen(false);
          setIsAssigningProxy(false);
        }}
        title="Faculty Workload & Substitutions"
        description="Real-time proxy teacher allocation, weekly workload balancing, and room usage"
        className="max-w-2xl"
        footerActions={
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-zinc-400 font-medium">
              Academic Session: 2026–2027 · Term 2
            </span>
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => {
                setIsWorkloadDrawerOpen(false);
                setIsAssigningProxy(false);
              }}
            >
              Close Drawer
            </VFButton>
          </div>
        }
      >
        <div className="p-4 sm:p-5 space-y-4">
          {/* Drawer Segmented Tab Control */}
          <div className="flex items-center p-1 rounded-md bg-[#121214] border border-[#27272a] gap-1 w-full">
            <button
              onClick={() => setWorkloadDrawerTab('substitutions')}
              className={cn(
                'flex-1 h-8 px-3 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5',
                workloadDrawerTab === 'substitutions'
                  ? 'bg-[#1c1c1f] text-white border border-[#27272a] shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Today's Proxies ({substitutionsList.length})</span>
            </button>
            <button
              onClick={() => setWorkloadDrawerTab('faculty')}
              className={cn(
                'flex-1 h-8 px-3 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5',
                workloadDrawerTab === 'faculty'
                  ? 'bg-[#1c1c1f] text-white border border-[#27272a] shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Faculty Workload ({facultyList.length})</span>
            </button>
            <button
              onClick={() => setWorkloadDrawerTab('rooms')}
              className={cn(
                'flex-1 h-8 px-3 rounded text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5',
                workloadDrawerTab === 'rooms'
                  ? 'bg-[#1c1c1f] text-white border border-[#27272a] shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <School className="h-3.5 w-3.5" />
              <span>Lab & Room Load ({roomList.length})</span>
            </button>
          </div>

          {/* TAB 1: SUBSTITUTIONS */}
          {workloadDrawerTab === 'substitutions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-[#121214] border border-[#27272a] shadow-xs">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Active Substitution Slips ({substitutionsList.length})
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    Cover absent faculty with available teachers based on free period slots
                  </p>
                </div>
                <VFButton
                  size="sm"
                  variant={isAssigningProxy ? 'outline' : 'primary'}
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                  onClick={() => setIsAssigningProxy(!isAssigningProxy)}
                >
                  {isAssigningProxy ? 'Cancel' : 'Assign Proxy'}
                </VFButton>
              </div>

              {isAssigningProxy && (
                <div className="p-4 rounded-md bg-[#121214] border border-[#27272a] shadow-md space-y-3 animate-scale-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-white" />
                      <h4 className="text-sm font-bold text-white">
                        Appoint Substitute Proxy Teacher
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsAssigningProxy(false)}
                      className="text-xs text-zinc-400 hover:text-white cursor-pointer px-1 py-0.5 rounded hover:bg-white/10"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <VFSelect
                        label="Absent Faculty Member"
                        value={newAbsentTeacher}
                        onChange={(e) => setNewAbsentTeacher(String(e.target.value))}
                        options={[
                          { label: 'Dr. Rajesh Sharma (Physics)', value: 'Dr. Rajesh Sharma' },
                          { label: 'Ms. Pooja Rao (English)', value: 'Ms. Pooja Rao' },
                          { label: 'Mr. Arvind Gupta (Social)', value: 'Mr. Arvind Gupta' },
                          { label: 'Mr. Rahul Kumar (Biology)', value: 'Mr. Rahul Kumar' },
                        ]}
                      />
                    </div>
                    <div>
                      <VFSelect
                        label="Assign Proxy Teacher (Free Slot)"
                        value={newProxyTeacher}
                        onChange={(e) => setNewProxyTeacher(String(e.target.value))}
                        options={[
                          { label: 'Mrs. Sunita Verma (Maths - Free Period 3)', value: 'Mrs. Sunita Verma' },
                          { label: 'Mrs. Joshi (English - Free Period 5)', value: 'Mrs. Joshi' },
                          { label: 'Mr. Vivek Patel (Social - Free Period 6)', value: 'Mr. Vivek Patel' },
                          { label: 'Mr. Subhash Das (Computer - Free Period 4)', value: 'Mr. Subhash Das' },
                        ]}
                      />
                    </div>
                    <div>
                      <VFSelect
                        label="Target Period & Time"
                        value={newProxyPeriod}
                        onChange={(e) => setNewProxyPeriod(String(e.target.value))}
                        options={[
                          { label: 'Period 1 (08:00 – 08:45 AM)', value: 'Period 1 (08:00 – 08:45 AM)' },
                          { label: 'Period 2 (08:45 – 09:30 AM)', value: 'Period 2 (08:45 – 09:30 AM)' },
                          { label: 'Period 3 (09:30 – 10:15 AM)', value: 'Period 3 (09:30 – 10:15 AM)' },
                          { label: 'Period 4 (10:30 – 11:15 AM)', value: 'Period 4 (10:30 – 11:15 AM)' },
                          { label: 'Period 5 (11:15 – 12:00 PM)', value: 'Period 5 (11:15 – 12:00 PM)' },
                          { label: 'Period 6 (12:45 – 01:30 PM)', value: 'Period 6 (12:45 – 01:30 PM)' },
                          { label: 'Period 7 (01:30 – 02:15 PM)', value: 'Period 7 (01:30 – 02:15 PM)' },
                        ]}
                      />
                    </div>
                    <div>
                      <VFInput
                        label="Room / Lab Assigned"
                        value={newProxyRoom}
                        onChange={(e) => setNewProxyRoom(e.target.value)}
                        placeholder="e.g. Room 101 or Lab 204"
                      />
                    </div>
                  </div>

                  <div>
                    <VFInput
                      label="Reason / Notes for Record"
                      value={newProxyReason}
                      onChange={(e) => setNewProxyReason(e.target.value)}
                      placeholder="e.g. Approved medical leave coverage"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <VFButton size="sm" variant="outline" onClick={() => setIsAssigningProxy(false)}>
                      Cancel
                    </VFButton>
                    <VFButton size="sm" leftIcon={<Check className="h-3.5 w-3.5" />} onClick={handleCreateProxy}>
                      Confirm Proxy Assignment
                    </VFButton>
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                {substitutionsList.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-lg bg-[#121214] border border-[#27272a] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                          <UserX className="h-3.5 w-3.5 text-zinc-500" />
                          {sub.absentTeacher} (Absent)
                        </span>
                        <span className="text-xs text-zinc-500">➔</span>
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          <UserCheck className="h-3.5 w-3.5 text-white" />
                          Assigned: {sub.proxyTeacher}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-white">
                        {sub.subject} • <span className="text-zinc-400 font-mono">{sub.room}</span>
                      </p>
                      <p className="text-xs text-zinc-400 font-mono">
                        {sub.period} · {sub.reason}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#1c1c1f] border border-[#27272a] text-white">
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FACULTY WORKLOAD */}
          {workloadDrawerTab === 'faculty' && (
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-[#121214] border border-[#27272a] shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Weekly Teaching Quotas & Allocation
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    Standard departmental limit: 28 Periods / Week
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-[#1c1c1f] border border-[#27272a]">
                  Quota: 28 P/Wk
                </span>
              </div>

              <div className="space-y-2.5">
                {facultyList.map((f) => {
                  const percentage = Math.round((f.assignedPeriods / f.maxPeriods) * 100);
                  return (
                    <div
                      key={f.id}
                      className="p-3.5 rounded-lg bg-[#121214] border border-[#27272a] shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-white">{f.name}</p>
                          <p className="text-xs text-zinc-400 font-medium">
                            {f.department} · Available: {f.freePeriodsToday}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-white">
                            {f.assignedPeriods} / {f.maxPeriods} Periods
                          </span>
                          <span className="text-xs font-mono block mt-0.5 text-zinc-400">
                            {f.status}
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-[#09090b] rounded-xs overflow-hidden">
                        <div
                          className="h-full rounded-xs bg-white/70 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ROOM UTILIZATION */}
          {workloadDrawerTab === 'rooms' && (
            <div className="space-y-3">
              <div className="p-3 rounded-md bg-[#121214] border border-[#27272a] shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Infrastructure & Lab Utilization
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    Live schedule occupancy across science laboratories and activity rooms
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-400 px-2 py-0.5 rounded bg-[#1c1c1f] border border-[#27272a]">
                  6 Facilities Monitored
                </span>
              </div>

              <div className="space-y-2.5">
                {roomList.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-lg bg-[#121214] border border-[#27272a] shadow-xs flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-sm font-bold text-white">{r.name}</p>
                      <p className="text-xs text-zinc-400 font-medium">
                        {r.type} · Capacity: {r.capacity} Students
                      </p>
                      <p className="text-xs font-mono text-zinc-400 font-semibold truncate">
                        Active: {r.currentClass}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold font-mono block text-white">
                        {r.utilizationRate}% Utilized
                      </span>
                      <span className="text-xs font-mono text-zinc-400 mt-0.5 block">
                        Occupied
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </VFDrawer>
    </VFPageContainer>
  );
}
