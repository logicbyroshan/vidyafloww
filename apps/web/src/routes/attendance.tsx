import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFDatePicker,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Clock,
  Users,
  FileCheck,
  CheckCircle2,
  UserCheck,
  Send,
  AlertTriangle,
  Calendar,
  FileText,
  Bell,
  GraduationCap,
  Sliders,
  CheckSquare,
  AlertCircle,
  Download,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const Route = createFileRoute('/attendance')({
  component: AttendancePage,
});

interface StudentAttendanceRecord {
  id: string;
  rollNo: string;
  name: string;
  class: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  time?: string;
  remarks?: string;
}

function AttendancePage() {
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 8-A');
  const [selectedDate, setSelectedDate] = React.useState<string>('2026-08-11');
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const [studentRoster, setStudentRoster] = React.useState<StudentAttendanceRecord[]>([
    { id: '1', rollNo: '801', name: 'Rahul Sharma', class: 'Class 8-A', status: 'Present', time: '08:02 AM' },
    { id: '2', rollNo: '802', name: 'Amit Patel', class: 'Class 8-A', status: 'Absent', remarks: 'Uninformed Absence' },
    { id: '3', rollNo: '803', name: 'Neha Jain', class: 'Class 8-A', status: 'Present', time: '08:05 AM' },
    { id: '4', rollNo: '804', name: 'Riya Singh', class: 'Class 8-A', status: 'Late', time: '08:24 AM', remarks: 'Bus Route 4 Delayed' },
    { id: '5', rollNo: '805', name: 'Vikas Kumar', class: 'Class 8-A', status: 'Present', time: '07:58 AM' },
  ]);

  const handleMarkAllPresent = () => {
    setStudentRoster(prev => prev.map(s => ({ ...s, status: 'Present', time: '08:00 AM' })));
  };

  const handleStatusToggle = (id: string, newStatus: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setStudentRoster(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const filteredRoster = studentRoster;

  // ----------------------------------------------------
  // SUBMODULE 1 — Attendance Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Today's Student Attendance" value="94.8%" icon={<GraduationCap className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="1,180 / 1,248 Present" />
        <VFStatCard title="Staff Attendance Rate" value="96.2%" icon={<UserCheck className="h-5 w-5 text-primary" />} trend="up" trendLabel="120 / 124 Staff Present" />
        <VFStatCard title="Uninformed Absences" value="14 Students" icon={<AlertCircle className="h-5 w-5 text-destructive" />} trend="down" trendLabel="SMS Alerts Dispatched" />
        <VFStatCard title="Biometric Gate Punches" value="2,410 Punches" icon={<Clock className="h-5 w-5" />} trend="neutral" trendLabel="100% Hardware Synced" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Today's Attendance
  // ----------------------------------------------------
  const todaysAttendanceContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Today's Campus Live Attendance Summary</h3>
          <p className="text-xs text-muted-foreground font-mono">Date: 2026-08-11 · Morning Assembly & Gate Entry Status</p>
        </div>
        <VFBadge variant="success">94.8% Overall Present</VFBadge>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Class Attendance
  // ----------------------------------------------------
  const classAttendanceContent = (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <VFSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(String(e.target.value))}
            options={[
              { label: 'Class 8 - Section A', value: 'Class 8-A' },
              { label: 'Class 9 - Section B', value: 'Class 9-B' },
              { label: 'Class 10 - Section A', value: 'Class 10-A' },
            ]}
          />
          <VFDatePicker value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        <VFButton size="sm" variant="outline" onClick={handleMarkAllPresent} leftIcon={<CheckSquare className="h-4 w-4 text-emerald-500" />}>
          Mark All Present
        </VFButton>
      </div>

      <VFSection title={`${selectedClass} Homeroom Roster (${selectedDate})`}>
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {filteredRoster.map((s) => (
              <div key={s.id} className="p-3 bg-muted/30 rounded-xl border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-primary">Roll #{s.rollNo}</span>
                  <p className="font-bold text-foreground text-sm mt-0.5">{s.name}</p>
                  <p className="text-muted-foreground text-[10px]">{s.time ? `Check-in: ${s.time}` : s.remarks || 'No check-in'}</p>
                </div>
                <div className="flex items-center gap-1">
                  {(['Present', 'Absent', 'Late', 'Leave'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusToggle(s.id, st)}
                      className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                        s.status === st ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Period Attendance
  // ----------------------------------------------------
  const periodAttendanceContent = (
    <div className="space-y-4">
      <VFCard title="Subject Period-wise Attendance Tracker">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Log attendance for specific 45-minute subject periods (P1 to P7).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Student Attendance
  // ----------------------------------------------------
  const studentAttendanceContent = (
    <div className="space-y-4">
      <VFCard title="360° Individual Student Attendance Record & Heatmap">
        <p className="text-xs text-muted-foreground mb-3">Multi-month attendance calendar, monthly percentages, and excused leave logs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Attendance Corrections
  // ----------------------------------------------------
  const correctionsContent = (
    <div className="space-y-4">
      <VFCard title="Attendance Regularization & Correction Requests">
        <p className="text-xs text-muted-foreground mb-3">Teacher and parent requests for retro-correcting accidental absence records.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Leave Management
  // ----------------------------------------------------
  const leaveManagementContent = (
    <div className="space-y-4">
      <VFCard title="Student & Staff Leave Approval Workflow">
        <p className="text-xs text-muted-foreground mb-3">Approve medical leave applications, duty leave requests, and casual leaves.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Holiday Management
  // ----------------------------------------------------
  const holidayManagementContent = (
    <div className="space-y-4">
      <VFCard title="Institutional Holiday Calendar & Restricted Holidays">
        <p className="text-xs text-muted-foreground mb-3">Gazetted national holidays, local festival breaks, and winter/summer vacation blocks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Late & Early Records
  // ----------------------------------------------------
  const lateEarlyContent = (
    <div className="space-y-4">
      <VFCard title="Late Arrival & Early Departure Log">
        <p className="text-xs text-muted-foreground mb-3">Track gate punch timestamps past 08:15 AM cut-off and early gate pass permits.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Attendance Summary
  // ----------------------------------------------------
  const summaryContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Monthly Total Working Days" value="24 Days" icon={<Calendar className="h-5 w-5" />} trend="neutral" trendLabel="August 2026" />
        <VFStatCard title="Average Class Attendance" value="94.2%" icon={<TrendingUp className="h-5 w-5" />} trend="up" trendLabel="+1.2% Target Met" />
        <VFStatCard title="Total Leaves Sanctioned" value="48 Days" icon={<FileCheck className="h-5 w-5" />} description="Campus-wide" />
        <VFStatCard title="Punctuality Score" value="96.8%" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} description="On-time Ratio" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Low Attendance
  // ----------------------------------------------------
  const lowAttendanceContent = (
    <div className="space-y-4">
      <VFCard title="75% Board Eligibility Low Attendance Watchlist">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Flag students at risk of board examination hall ticket withholding due to low attendance.</p>
        <VFBadge variant="danger">4 Students Flagged Below 75%</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Attendance Alerts
  // ----------------------------------------------------
  const alertsContent = (
    <div className="space-y-4">
      <VFCard title="Automated Parent SMS & WhatsApp Absence Alerts">
        <p className="text-xs text-muted-foreground mb-3">Instant automated notification dispatch engine triggered on unexcused absence.</p>
        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Trigger Daily Absence Digest</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Attendance Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Exportable Attendance Registers & Analytics Reports">
        <p className="text-xs text-muted-foreground mb-3">Generate CBSE format Form IV attendance registers, monthly summaries, and PDF exports.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Form IV Register (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Attendance Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Attendance Parameters & Gate Cut-off Times">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Late Cut-off Time" defaultValue="08:15 AM" />
          <VFInput label="Minimum Required %" defaultValue="75.0%" />
          <VFSelect label="Default Capture Channel" options={[{ label: 'Biometric Gate + Teacher App', value: 'biometric' }, { label: 'Teacher App Manual', value: 'manual' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 14 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Attendance Dashboard', icon: <GraduationCap className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'todays-attendance', label: "Today's Attendance", icon: <Clock className="h-3.5 w-3.5" />, content: todaysAttendanceContent },
    { id: 'class-attendance', label: 'Class Attendance', icon: <Users className="h-3.5 w-3.5" />, content: classAttendanceContent },
    { id: 'period-attendance', label: 'Period Attendance', icon: <Clock className="h-3.5 w-3.5" />, content: periodAttendanceContent },
    { id: 'student-attendance', label: 'Student Attendance', icon: <GraduationCap className="h-3.5 w-3.5" />, content: studentAttendanceContent },
    { id: 'corrections', label: 'Attendance Corrections', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: correctionsContent },
    { id: 'leave-management', label: 'Leave Management', icon: <FileText className="h-3.5 w-3.5" />, content: leaveManagementContent },
    { id: 'holiday-management', label: 'Holiday Management', icon: <Calendar className="h-3.5 w-3.5" />, content: holidayManagementContent },
    { id: 'late-early', label: 'Late & Early Records', icon: <AlertTriangle className="h-3.5 w-3.5" />, content: lateEarlyContent },
    { id: 'summary', label: 'Attendance Summary', icon: <TrendingUp className="h-3.5 w-3.5" />, content: summaryContent },
    { id: 'low-attendance', label: 'Low Attendance', icon: <AlertCircle className="h-3.5 w-3.5" />, content: lowAttendanceContent },
    { id: 'alerts', label: 'Attendance Alerts', icon: <Bell className="h-3.5 w-3.5" />, content: alertsContent },
    { id: 'reports', label: 'Attendance Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Attendance Settings', icon: <Sliders className="h-3.5 w-3.5" />, content: settingsContent },
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
