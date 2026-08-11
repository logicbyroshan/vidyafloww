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
  Clock,
  Users,
  FileCheck,
  CheckCircle2,
  Sparkles,
  Bot,
  UserCheck,
  Check,
  Send,
  AlertTriangle,
  X,
  Award,
  Calendar,
  FileText,
  Fingerprint,
  Bell,
  RefreshCw,
  GraduationCap,
  Sliders,
  CheckSquare,
  AlertCircle,
  Server,
  Activity,
} from 'lucide-react';

export const Route = createFileRoute('/attendance')({
  component: AttendancePage,
});

// Mock Types
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
  // Global State Variables
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 8-A');
  const [selectedDate, setSelectedDate] = React.useState<string>('2026-08-11');
  const [attendanceMode, setAttendanceMode] = React.useState<'Daily' | 'Period'>('Daily');
  const [selectedStudent, setSelectedStudent] = React.useState<string>('Rahul Sharma');
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('Period 3 (09:30 AM)');
  const [isLocked, setIsLocked] = React.useState<boolean>(false);
  const [correctionNotice, setCorrectionNotice] = React.useState<string | null>(null);
  const [aiAnalysisPrompt, setAiAnalysisPrompt] = React.useState<string>('');
  const [aiAnalysisResponse, setAiAnalysisResponse] = React.useState<string | null>(null);
  const [activeWizardStep, setActiveWizardStep] = React.useState<number>(1);
  const [isEmployeeCheckedIn, setIsEmployeeCheckedIn] = React.useState<boolean>(true);

  // Student Daily Roster State (Features 11 & 12)
  const [studentRoster, setStudentRoster] = React.useState<StudentAttendanceRecord[]>([
    { id: '1', rollNo: '801', name: 'Rahul Sharma', class: 'Class 8-A', status: 'Present', time: '08:02 AM' },
    { id: '2', rollNo: '802', name: 'Amit Patel', class: 'Class 8-A', status: 'Absent', remarks: 'Uninformed' },
    { id: '3', rollNo: '803', name: 'Neha Jain', class: 'Class 8-A', status: 'Present', time: '08:05 AM' },
    { id: '4', rollNo: '804', name: 'Riya Singh', class: 'Class 8-A', status: 'Late', time: '08:24 AM', remarks: 'Bus Delayed' },
    { id: '5', rollNo: '805', name: 'Vikas Kumar', class: 'Class 8-A', status: 'Present', time: '07:58 AM' },
    { id: '6', rollNo: '806', name: 'Priya Sharma', class: 'Class 8-A', status: 'Leave', remarks: 'Medical Leave Approved' },
    { id: '7', rollNo: '807', name: 'Rohan Gupta', class: 'Class 8-A', status: 'Present', time: '08:01 AM' },
    { id: '8', rollNo: '808', name: 'Ananya Verma', class: 'Class 8-A', status: 'Present', time: '08:00 AM' },
  ]);

  // Bulk Mark All Present Handler (Feature 12)
  const handleMarkAllPresent = () => {
    setStudentRoster(prev => prev.map(s => ({ ...s, status: 'Present', time: '08:00 AM' })));
  };

  // Toggle Individual Status
  const handleStatusToggle = (id: string, newStatus: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setStudentRoster(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  // ----------------------------------------------------
  // SUBMODULE 6.1 — Attendance Configuration & Policies (10 Features)
  // ----------------------------------------------------
  const configPoliciesContent = (
    <div className="space-y-4">
      {/* 1. Attendance Mode Configuration */}
      <VFCard title="1. Attendance Recording Mode & Capture Methods">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
          <div className="space-y-2">
            <span className="font-bold text-foreground">Primary Attendance Scope:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={attendanceMode === 'Daily'}
                  onChange={() => setAttendanceMode('Daily')}
                  className="text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span className="font-medium text-foreground">Daily Homeroom (Once/Day)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={attendanceMode === 'Period'}
                  onChange={() => setAttendanceMode('Period')}
                  className="text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span className="font-medium text-foreground">Period-wise (Every Subject Slot)</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-foreground">Enabled Capture Channels:</span>
            <div className="grid grid-cols-3 gap-2">
              {['Teacher Web UI', 'Mobile App', 'Biometric Gate', 'Face Recognition', 'QR Scanners', 'RFID Cards'].map((ch, idx) => (
                <label key={ch} className="inline-flex items-center gap-1.5 p-1.5 bg-muted/40 rounded border border-border/60 text-[11px] cursor-pointer">
                  <input type="checkbox" defaultChecked={idx < 4} className="rounded text-primary h-3 w-3" />
                  <span className="text-foreground font-medium truncate">{ch}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </VFCard>

      {/* 2 & 3. Status Definition & Rule Thresholds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="2. Attendance Status Catalog & Codes">
          <div className="space-y-2 text-xs mt-2">
            {[
              { status: 'Present', code: 'P', counts: 'Yes', color: 'bg-emerald-500/20 text-emerald-500' },
              { status: 'Absent', code: 'A', counts: 'No', color: 'bg-destructive/20 text-destructive' },
              { status: 'Late', code: 'L', counts: 'Yes (Half Weight)', color: 'bg-amber-500/20 text-amber-500' },
              { status: 'Approved Leave', code: 'LV', counts: 'No (Excused)', color: 'bg-blue-500/20 text-blue-500' },
              { status: 'Half Day', code: 'HD', counts: 'Yes (0.5 Count)', color: 'bg-purple-500/20 text-purple-500' },
            ].map((s, i) => (
              <div key={i} className="p-2.5 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${s.color}`}>{s.code}</span>
                  <span className="font-bold text-foreground">{s.status}</span>
                </div>
                <span className="text-muted-foreground text-[11px]">Counts Present: {s.counts}</span>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="3 & 5. Attendance Threshold Rules & Policy Enforcements">
          <div className="grid grid-cols-2 gap-3 text-xs mt-2">
            <VFInput label="Late Threshold" defaultValue="08:15 AM" />
            <VFInput label="Half-Day After" defaultValue="4.0 Hours" />
            <VFInput label="Minimum Attendance %" defaultValue="75.0%" />
            <VFInput label="Grace Period" defaultValue="15 Minutes" />
            <VFInput label="Auto-Absence Time" defaultValue="10:00 AM" />
            <VFInput label="Attendance Closing" defaultValue="04:00 PM" />
          </div>
        </VFCard>
      </div>

      {/* 4, 6, 7 & 8. Class Mapping, Shifts, Holiday & Lock Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VFCard title="4 & 6. Class & Shift Policies">
          <div className="space-y-2 text-xs mt-2">
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60">
              <span className="font-bold text-foreground">Class 1–5:</span> Daily Homeroom
            </div>
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60">
              <span className="font-bold text-foreground">Class 6–12:</span> Period-wise Tracking
            </div>
            <div className="p-2.5 bg-muted/40 rounded-lg border border-border/60">
              <span className="font-bold text-foreground">Staff Morning Shift:</span> 07:30 AM – 02:00 PM
            </div>
          </div>
        </VFCard>

        <VFCard title="7. Holiday Calendar Protection">
          <div className="space-y-2 text-xs mt-2">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <span className="font-bold text-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Holiday Lock Active
              </span>
              <p className="text-muted-foreground text-[11px] mt-0.5">Prevents accidental marking on official holidays & Sundays.</p>
            </div>
            <p className="text-[11px] text-muted-foreground">Next Holiday: <span className="font-bold text-foreground">Independence Day (Aug 15)</span></p>
          </div>
        </VFCard>

        <VFCard title="8. Attendance Locking Rules">
          <div className="space-y-2 text-xs mt-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">Lock Status:</span>
              <VFBadge variant={isLocked ? 'danger' : 'success'}>
                {isLocked ? '🔒 Locked' : '🟢 Open for Entry'}
              </VFBadge>
            </div>
            <p className="text-[11px] text-muted-foreground">Locked attendance requires Principal PIN override to modify.</p>
            <VFButton size="sm" variant={isLocked ? 'outline' : 'danger'} className="w-full" onClick={() => setIsLocked(!isLocked)}>
              {isLocked ? 'Unlock Attendance Entry' : 'Lock Class Attendance'}
            </VFButton>
          </div>
        </VFCard>
      </div>

      {/* 9. Attendance Device Mapping */}
      <VFSection title="9. Hardware Device Mapping (Biometric Gates & Turnstiles)">
        <VFDataTable
          columns={[
            { header: 'Device Name', accessorKey: 'device', cell: (r: any) => <span className="font-bold text-foreground">{r.device}</span> },
            { header: 'Location', accessorKey: 'location' },
            { header: 'Scanner Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="primary">{r.type}</VFBadge> },
            { header: 'IP / Endpoint', accessorKey: 'ip', cell: (r: any) => <span className="font-mono text-xs text-muted-foreground">{r.ip}</span> },
            { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Online' ? 'success' : 'danger'}>{r.status}</VFBadge> },
          ]}
          data={[
            { device: 'Gate 1 Scanner', location: 'Main Entrance Gate', type: 'Face Recognition', ip: '192.168.1.101', status: 'Online' },
            { device: 'Gate 2 Scanner', location: 'Staff Entrance Gate', type: 'Fingerprint Biometric', ip: '192.168.1.102', status: 'Online' },
            { device: 'Hostel Gate 3', location: 'Boys Hostel Turnstile', type: 'RFID Card Reader', ip: '192.168.1.105', status: 'Offline' },
            { device: 'Library Turnstile', location: 'Central Library Hall', type: 'QR Scanner', ip: '192.168.1.108', status: 'Online' },
          ]}
        />
      </VFSection>

      {/* 10. Attendance Setup Wizard */}
      <VFCard title="10. First-Time Attendance Setup Wizard">
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between text-xs overflow-x-auto custom-scrollbar pb-2">
            {['1 Mode', '2 Statuses', '3 Policies', '4 Classes', '5 Employees', '6 Devices', '7 Holidays', '8 Review', '9 Activate'].map((step, idx) => {
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

          <div className="p-3.5 bg-muted/30 border border-border/60 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground text-xs">
                Step {activeWizardStep}: {['Attendance Mode', 'Status Codes', 'Threshold Rules', 'Class Policy Mapping', 'Staff Shift Setup', 'Hardware Device Mapping', 'Holiday Import', 'Policy Review', 'Final Activation'][activeWizardStep - 1]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeWizardStep === 9 ? 'System is configured and ready to capture live attendance.' : 'Configure parameters before advancing.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <VFButton size="sm" variant="outline" disabled={activeWizardStep === 1} onClick={() => setActiveWizardStep(prev => Math.max(1, prev - 1))}>
                Back
              </VFButton>
              <VFButton size="sm" disabled={activeWizardStep === 9} onClick={() => setActiveWizardStep(prev => Math.min(9, prev + 1))}>
                Next Step
              </VFButton>
            </div>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.2 — Student Attendance (10 Features)
  // ----------------------------------------------------
  const studentAttendanceContent = (
    <div className="space-y-4">
      {/* Attendance Header Controls */}
      <div className="flex flex-wrap items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <VFSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(String(e.target.value))}
            options={[
              { label: 'Class 8 - Section A', value: 'Class 8-A' },
              { label: 'Class 8 - Section B', value: 'Class 8-B' },
              { label: 'Class 9 - Section A', value: 'Class 9-A' },
              { label: 'Class 10 - Section B', value: 'Class 10-B' },
            ]}
          />
          <VFInput label="" type="date" value={selectedDate} onChange={(e: any) => setSelectedDate(e.target.value)} />
          <VFBadge variant="primary" className="h-8 px-3 font-mono">Total Students: {studentRoster.length}</VFBadge>
        </div>

        {/* 12. Quick Attendance HERO MARK ALL PRESENT BUTTON */}
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" onClick={handleMarkAllPresent} leftIcon={<CheckSquare className="h-4 w-4 text-emerald-500" />}>
            ✓ MARK ALL PRESENT
          </VFButton>
          <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
            Save & Send Parent Alerts
          </VFButton>
        </div>
      </div>

      {/* 11 & 12. Daily Attendance Marking Roster */}
      <VFSection title={`11 & 12. ${selectedClass} Daily Homeroom Attendance Roster (${selectedDate})`}>
        <div className="bg-card border border-border rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="font-bold text-foreground">Summary:</span>
              <span className="text-emerald-500 font-bold">🟢 Present: {studentRoster.filter(s => s.status === 'Present').length}</span>
              <span className="text-destructive font-bold">🔴 Absent: {studentRoster.filter(s => s.status === 'Absent').length}</span>
              <span className="text-amber-500 font-bold">🟡 Late: {studentRoster.filter(s => s.status === 'Late').length}</span>
              <span className="text-blue-500 font-bold">🔵 Leave: {studentRoster.filter(s => s.status === 'Leave').length}</span>
            </div>
            <span className="text-muted-foreground font-mono text-[11px]">Click status pill to toggle individual student status</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {studentRoster.map((s) => (
              <div key={s.id} className="p-3 bg-muted/30 rounded-xl border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-primary">Roll #{s.rollNo}</span>
                  <p className="font-bold text-foreground text-sm mt-0.5">{s.name}</p>
                  <p className="text-muted-foreground text-[10px]">{s.time ? `Check-in: ${s.time}` : s.remarks || 'No check-in recorded'}</p>
                </div>

                <div className="flex items-center gap-1">
                  {(['Present', 'Absent', 'Late', 'Leave'] as const).map((st) => {
                    const isSel = s.status === st;
                    return (
                      <button
                        key={st}
                        onClick={() => handleStatusToggle(s.id, st)}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                          isSel
                            ? st === 'Present'
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : st === 'Absent'
                              ? 'bg-destructive text-white shadow-xs'
                              : st === 'Late'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-blue-500 text-white shadow-xs'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </VFSection>

      {/* 13 & 14. Student Attendance 360 Profile & Heatmap Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="13 & 17. Student 360 Attendance Profile" className="lg:col-span-1">
          <div className="space-y-3 text-xs mt-1">
            <VFSelect
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(String(e.target.value))}
              options={[
                { label: 'Rahul Sharma (Roll 801)', value: 'Rahul Sharma' },
                { label: 'Amit Patel (Roll 802)', value: 'Amit Patel' },
                { label: 'Neha Jain (Roll 803)', value: 'Neha Jain' },
              ]}
            />

            <div className="p-3 bg-muted/40 rounded-xl border border-border/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground">{selectedStudent}</span>
                <VFBadge variant="success">90.9% Overall</VFBadge>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center font-mono text-[11px] pt-1 border-t border-border/60">
                <div className="bg-emerald-500/10 p-1 rounded text-emerald-500 font-bold">P: 18</div>
                <div className="bg-destructive/10 p-1 rounded text-destructive font-bold">A: 2</div>
                <div className="bg-amber-500/10 p-1 rounded text-amber-500 font-bold">L: 1</div>
                <div className="bg-blue-500/10 p-1 rounded text-blue-500 font-bold">LV: 1</div>
              </div>
            </div>
          </div>
        </VFCard>

        {/* 14. Monthly Heatmap Calendar */}
        <VFSection title="14. Monthly Attendance Calendar Heatmap (August 2026)" className="lg:col-span-2">
          <div className="grid grid-cols-7 gap-1.5 text-xs text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="font-bold text-muted-foreground py-1 bg-muted/40 rounded">{d}</div>
            ))}
            {Array.from({ length: 31 }).map((_, idx) => {
              const dayNum = idx + 1;
              const isAbsent = dayNum === 3 || dayNum === 17;
              const isLate = dayNum === 12;
              const isLeave = dayNum === 24;
              const isSunday = dayNum % 7 === 0;
              return (
                <div
                  key={dayNum}
                  className={`p-2 rounded-lg font-mono font-bold border ${
                    isSunday
                      ? 'bg-muted/20 text-muted-foreground border-border/40'
                      : isAbsent
                      ? 'bg-destructive/20 border-destructive/40 text-destructive'
                      : isLate
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-500'
                      : isLeave
                      ? 'bg-blue-500/20 border-blue-500/40 text-blue-500'
                      : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                  }`}
                >
                  <span>{dayNum}</span>
                  <div className="text-[9px] mt-0.5">{isSunday ? 'SUN' : isAbsent ? 'ABS' : isLate ? 'LATE' : isLeave ? 'LEAVE' : 'PRES'}</div>
                </div>
              );
            })}
          </div>
        </VFSection>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.3 — Period-wise Attendance (8 Features)
  // ----------------------------------------------------
  const periodAttendanceContent = (
    <div className="space-y-4">
      {/* 23 & 24. Teacher Period Timetable Integration */}
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <VFSelect
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(String(e.target.value))}
            options={[
              { label: 'Period 1 (08:00 AM) • Class 8A Math', value: 'Period 1 (08:00 AM)' },
              { label: 'Period 3 (09:30 AM) • Class 8A Physics', value: 'Period 3 (09:30 AM)' },
              { label: 'Period 5 (11:15 AM) • Class 9B Math', value: 'Period 5 (11:15 AM)' },
            ]}
          />
          <div>
            <p className="text-xs font-bold text-foreground">{selectedPeriod}</p>
            <p className="text-[11px] text-muted-foreground">Auto-synced with Master Timetable</p>
          </div>
        </div>
        <VFBadge variant="warning">Marking Window: 15 Mins Remaining</VFBadge>
      </div>

      {/* 21 & 22. Subject-wise Period Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="21 & 25. Active Period Attendance Checklist" className="lg:col-span-2">
          <div className="space-y-2 text-xs mt-2">
            {[
              { roll: '801', name: 'Rahul Sharma', status: 'Present' },
              { roll: '802', name: 'Amit Patel', status: 'Absent (Bunked Period 3)' },
              { roll: '803', name: 'Neha Jain', status: 'Present' },
              { roll: '804', name: 'Riya Singh', status: 'Present' },
            ].map((st, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">Roll #{st.roll} • {st.name}</span>
                  <p className="text-muted-foreground text-[11px]">{st.status}</p>
                </div>
                <button className={`px-3 py-1 rounded font-bold text-xs ${st.status.includes('Absent') ? 'bg-destructive text-destructive-foreground' : 'bg-emerald-500 text-white'}`}>
                  {st.status.includes('Absent') ? 'Bunked' : 'Attended'}
                </button>
              </div>
            ))}
          </div>
        </VFCard>

        {/* 22 & 27. Subject-wise Attendance & Eligibility Warning */}
        <VFCard title="22 & 27. Subject Eligibility Radar" className="lg:col-span-1">
          <div className="space-y-2 text-xs mt-2">
            {[
              { subject: 'Mathematics', att: '92%', status: 'Eligible' },
              { subject: 'Science', att: '87%', status: 'Eligible' },
              { subject: 'Physics Lab', att: '71%', status: 'Hold Board Ticket' },
              { subject: 'English', att: '96%', status: 'Eligible' },
            ].map((sb, i) => (
              <div key={i} className="p-2.5 bg-muted/40 rounded-lg border border-border/60 space-y-1">
                <div className="flex justify-between font-bold text-foreground">
                  <span>{sb.subject}</span>
                  <span className={sb.att.startsWith('7') ? 'text-destructive' : 'text-emerald-500'}>{sb.att}</span>
                </div>
                <VFBadge variant={sb.status === 'Eligible' ? 'success' : 'danger'}>{sb.status}</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.4 — Employee Attendance (9 Features)
  // ----------------------------------------------------
  const employeeAttendanceContent = (
    <div className="space-y-4">
      {/* 29. Employee Check-In / Out Hero Widget */}
      <div className="p-5 bg-card border border-border rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center text-lg">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Good Morning, Prof. Rajesh Sharma</h3>
            <p className="text-xs text-muted-foreground">Department of Mathematics • Morning Shift (07:30 AM – 02:00 PM)</p>
            <div className="flex items-center gap-2 mt-1">
              <VFBadge variant="success">Check-in: 07:58 AM</VFBadge>
              <VFBadge variant="primary">Status: Present</VFBadge>
            </div>
          </div>
        </div>

        <VFButton
          size="md"
          variant={isEmployeeCheckedIn ? 'danger' : 'primary'}
          leftIcon={<Clock className="h-4 w-4" />}
          onClick={() => setIsEmployeeCheckedIn(!isEmployeeCheckedIn)}
        >
          {isEmployeeCheckedIn ? 'Check Out Now (02:30 PM)' : 'Check In Now'}
        </VFButton>
      </div>

      {/* 34 & 35. Overtime Tracking & Employee Monthly Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Working Days (August)" value="24 Days" icon={<Calendar className="h-5 w-5" />} trend="up" trendLabel="21 Present" />
        <VFStatCard title="Late Arrivals" value="3 Days" icon={<AlertTriangle className="h-5 w-5 text-amber-500" />} trend="down" trendLabel="Avg 12 min late" />
        <VFStatCard title="Approved Leaves" value="2 Days" icon={<FileCheck className="h-5 w-5" />} trend="neutral" trendLabel="Casual Leave" />
        <VFStatCard title="Overtime Hours (Payroll)" value="7h 30m" icon={<Clock className="h-5 w-5 text-primary" />} trend="up" trendLabel="Feeds Payroll" />
      </div>

      {/* 30 & 36. Employee Register & Department Comparison */}
      <VFSection title="30 & 36. Staff Attendance Register & Department Breakdown">
        <VFDataTable
          columns={[
            { header: 'Employee', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Department', accessorKey: 'dept' },
            { header: 'Check-In', accessorKey: 'in', cell: (r: any) => <span className="font-mono text-xs text-emerald-500 font-bold">{r.in}</span> },
            { header: 'Check-Out', accessorKey: 'out', cell: (r: any) => <span className="font-mono text-xs text-primary font-bold">{r.out}</span> },
            { header: 'Overtime', accessorKey: 'ot', cell: (r: any) => <span className="font-mono text-xs text-amber-500">{r.ot}</span> },
            { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Present' ? 'success' : 'danger'}>{r.status}</VFBadge> },
          ]}
          data={[
            { name: 'Prof. Rajesh Sharma', dept: 'Mathematics', in: '07:58 AM', out: '02:30 PM', ot: '1h 00m', status: 'Present' },
            { name: 'Dr. Sarah Connor', dept: 'Physics', in: '08:12 AM', out: '02:00 PM', ot: '0h 00m', status: 'Present' },
            { name: 'Mr. Vikram Singh', dept: 'Chemistry', in: '—', out: '—', ot: '0h 00m', status: 'Absent' },
            { name: 'Mrs. Anita Desai', dept: 'English', in: '07:55 AM', out: '03:15 PM', ot: '1h 15m', status: 'Present' },
          ]}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.5 — Biometric & Device Attendance (8 Features)
  // ----------------------------------------------------
  const biometricContent = (
    <div className="space-y-4">
      {/* 41. Data Sync Console Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Synced Punch Logs" value="2,410 Logs" icon={<Server className="h-5 w-5" />} trend="up" trendLabel="100% Synced" />
        <VFStatCard title="Pending Queue" value="12 Punch Records" icon={<Clock className="h-5 w-5" />} trend="neutral" trendLabel="Processing..." />
        <VFStatCard title="Active Hardware Scanners" value="3 / 4 Online" icon={<Activity className="h-5 w-5" />} trend="neutral" trendLabel="1 Offline" />
        <VFStatCard title="Raw Event Logs" value="4,120 Events" icon={<FileText className="h-5 w-5" />} description="Biometric Raw Logs" />
      </div>

      {/* 38 & 44. Device Management & Raw Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <VFCard title="38. Live Hardware Devices" className="lg:col-span-1">
          <div className="space-y-2 text-xs mt-2">
            {[
              { name: 'Gate 1 (Main Gate)', type: 'Face Rec', status: 'Online 🟢' },
              { name: 'Gate 2 (Staff Gate)', type: 'Fingerprint', status: 'Online 🟢' },
              { name: 'Hostel Gate 3', type: 'RFID Reader', status: 'Offline 🔴' },
              { name: 'Library Gate', type: 'QR Scanner', status: 'Online 🟢' },
            ].map((d, i) => (
              <div key={i} className="p-3 bg-muted/40 rounded-lg border border-border/60 flex justify-between items-center">
                <div>
                  <p className="font-bold text-foreground">{d.name}</p>
                  <p className="text-muted-foreground text-[10px]">{d.type}</p>
                </div>
                <span className="font-mono text-xs font-bold">{d.status}</span>
              </div>
            ))}
          </div>
        </VFCard>

        {/* 44. Live Raw Punch Stream */}
        <VFSection title="44. Live Raw Biometric Punch Stream Log" className="lg:col-span-2">
          <div className="p-4 bg-card border border-border rounded-xl space-y-2 font-mono text-xs">
            {[
              { time: '08:02:14 AM', device: 'Gate 1 (Face)', id: 'ST-10482', name: 'Rahul Sharma', conf: '98% Match' },
              { time: '08:05:22 AM', device: 'Gate 1 (Face)', id: 'ST-10484', name: 'Neha Jain', conf: '99% Match' },
              { time: '08:12:01 AM', device: 'Gate 2 (Biometric)', id: 'EMP-201', name: 'Dr. Sarah Connor', conf: 'Fingerprint Match' },
            ].map((log, idx) => (
              <div key={idx} className="p-2.5 bg-muted/40 rounded border border-border/60 flex justify-between items-center">
                <span>{log.time} • <strong className="text-foreground">{log.name}</strong> ({log.id})</span>
                <span className="text-primary font-bold">{log.conf}</span>
              </div>
            ))}
          </div>
        </VFSection>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.6 — Leave Management (10 Features)
  // ----------------------------------------------------
  const leaveContent = (
    <div className="space-y-4">
      {/* 52. Employee Leave Balance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <VFStatCard title="Casual Leave (CL)" value="8 / 12 Rem" icon={<FileText className="h-5 w-5" />} trend="neutral" trendLabel="4 Days Used" />
        <VFStatCard title="Sick Leave (SL)" value="10 / 12 Rem" icon={<FileCheck className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="2 Days Used" />
        <VFStatCard title="Earned Leave (EL)" value="14 / 15 Rem" icon={<Award className="h-5 w-5 text-primary" />} trend="up" trendLabel="1 Day Used" />
      </div>

      {/* 48, 49 & 50. Leave Request & Approval Workflow */}
      <VFSection title="48, 49 & 50. Pending Student & Staff Leave Applications">
        <VFDataTable
          columns={[
            { header: 'Applicant', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
            { header: 'Role / Class', accessorKey: 'role' },
            { header: 'Leave Type', accessorKey: 'type', cell: (r: any) => <VFBadge variant="primary">{r.type}</VFBadge> },
            { header: 'Dates', accessorKey: 'dates', cell: (r: any) => <span className="font-mono text-xs">{r.dates}</span> },
            { header: 'Reason', accessorKey: 'reason' },
            { header: 'Approval Workflow Stage', accessorKey: 'stage', cell: (r: any) => <span className="text-xs font-bold text-amber-500">{r.stage}</span> },
            { header: 'Actions', accessorKey: 'id', cell: () => (
              <div className="flex gap-1">
                <VFButton size="sm" variant="outline" className="h-7 px-2 text-xs">Approve</VFButton>
                <VFButton size="sm" variant="outline" className="h-7 px-2 text-xs text-destructive">Reject</VFButton>
              </div>
            ) },
          ]}
          data={[
            { id: '1', name: 'Rahul Sharma', role: 'Student (Class 8A)', type: 'Medical Leave', dates: '12 Aug – 14 Aug', reason: 'High Fever', stage: 'Parent Approved ➔ Teacher Pending' },
            { id: '2', name: 'Mr. Vikram Singh', role: 'Faculty (Chemistry)', type: 'Casual Leave', dates: '18 Aug', reason: 'Personal Work', stage: 'HOD Approved ➔ HR Pending' },
          ]}
        />
      </VFSection>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.7 — Attendance Corrections & Regularization (8 Features)
  // ----------------------------------------------------
  const correctionsContent = (
    <div className="space-y-4">
      {/* 56 & 57. Correction Request & Approval Inbox */}
      <VFCard title="56 & 57. Attendance Correction Requests Inbox">
        {correctionNotice && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-xs font-bold text-emerald-500 mb-3 flex items-center justify-between">
            <span>{correctionNotice}</span>
            <button onClick={() => setCorrectionNotice(null)}><X className="h-4 w-4" /></button>
          </div>
        )}

        <div className="space-y-3 text-xs mt-2">
          {[
            { student: 'Rahul Sharma (Class 8A)', date: '11 Aug 2026', current: 'Absent', requested: 'Present', reason: 'Teacher accidentally marked absent during morning assembly', requestedBy: 'Mr. Rajesh Sharma' },
            { student: 'Dr. Sarah Connor (Faculty)', date: '10 Aug 2026', current: 'Forgot Check-out', requested: 'Check-out 02:30 PM', reason: 'Forgot to punch while leaving gate for workshop', requestedBy: 'Dr. Sarah Connor' },
          ].map((c, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-foreground text-sm">{c.student}</span>
                <p className="text-muted-foreground text-xs mt-0.5">Date: {c.date} • Current: <span className="text-destructive font-bold">{c.current}</span> ➔ Requested: <span className="text-emerald-500 font-bold">{c.requested}</span></p>
                <p className="text-muted-foreground text-[11px]">Reason: {c.reason} (By: {c.requestedBy})</p>
              </div>
              <div className="flex gap-2">
                <VFButton size="sm" onClick={() => setCorrectionNotice(`Approved correction for ${c.student}`)}>Approve</VFButton>
                <VFButton size="sm" variant="outline">Reject</VFButton>
              </div>
            </div>
          ))}
        </div>
      </VFCard>

      {/* 60 & 63. Immutable Audit Trail & Anomaly Detection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="60. Immutable Attendance Audit Trail">
          <div className="space-y-2 text-xs font-mono mt-1">
            <div className="p-2.5 bg-muted/40 rounded border border-border/60">
              <span className="text-muted-foreground">11 Aug 08:32 AM:</span> Marked ABSENT by Mr. Sharma
            </div>
            <div className="p-2.5 bg-muted/40 rounded border border-border/60">
              <span className="text-muted-foreground">11 Aug 10:14 AM:</span> Corrected to PRESENT by Principal
            </div>
          </div>
        </VFCard>

        <VFCard title="63. Correction Anomaly Radar">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1 text-xs mt-1">
            <span className="font-bold text-amber-500 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" /> 1 Suspicious Pattern Flagged
            </span>
            <p className="text-muted-foreground text-[11px]">Same teacher modified 42 student attendance records after 04:00 PM lock.</p>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.8 — Attendance Alerts & Communication (8 Features)
  // ----------------------------------------------------
  const alertsCommContent = (
    <div className="space-y-4">
      {/* 64, 65 & 66. Multi-Channel Parent Absence Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Parent SMS Alerts Sent" value="3 Alerts" icon={<Bell className="h-5 w-5 text-primary" />} trend="up" trendLabel="Delivered Instant" />
        <VFStatCard title="WhatsApp Alerts" value="3 Alerts" icon={<Send className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="99% Read Rate" />
        <VFStatCard title="Consecutive Absence Flags" value="1 Student" icon={<AlertCircle className="h-5 w-5 text-destructive" />} trend="neutral" trendLabel="3 Days Absent" />
        <VFStatCard title="Teacher Pending Alerts" value="0 Pending" icon={<CheckCircle2 className="h-5 w-5" />} trend="up" trendLabel="All Classes Marked" />
      </div>

      {/* 71. Communication Template Editor */}
      <VFCard title="71. Attendance Communication Templates & Variables">
        <div className="space-y-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60 space-y-1">
            <span className="font-bold text-foreground">Absence Notification Template (SMS / WhatsApp):</span>
            <p className="font-mono text-[11px] text-muted-foreground">
              "Dear Parent, your child <strong className="text-primary">&#123;&#123;student_name&#125;&#125;</strong> of class <strong className="text-primary">&#123;&#123;class&#125;&#125;</strong> was marked ABSENT today (<strong className="text-primary">&#123;&#123;date&#125;&#125;</strong>). Please submit a leave application if unwell."
            </p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6.9 — Attendance Analytics & Intelligence (12 Features)
  // ----------------------------------------------------
  const analyticsAiContent = (
    <div className="space-y-4">
      {/* 72. Executive Attendance Dashboard KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Student Attendance Rate" value="94.2%" icon={<GraduationCap className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="+1.4% vs Last Month" />
        <VFStatCard title="Staff Attendance Rate" value="91.0%" icon={<Users className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="Optimal Staff Ratio" />
        <VFStatCard title="Chronic Absenteeism Risk" value="4 Students" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} trend="down" trendLabel="Below 75% Threshold" />
        <VFStatCard title="Punctuality Score" value="96.8%" icon={<Award className="h-5 w-5 text-amber-500" />} trend="up" trendLabel="On-Time Arrival" />
      </div>

      {/* 78, 79 & 80. AI Chronic Absenteeism & Risk Prediction */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-bold flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">78, 79 & 80. AI Chronic Absenteeism & Absence Pattern Engine</h3>
              <p className="text-xs text-muted-foreground">Predicts board exam disqualification risks and detects day-specific skipping patterns.</p>
            </div>
          </div>
          <VFBadge variant="warning">4 Students Flagged for Intervention</VFBadge>
        </div>

        {/* Predictive Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-destructive/10 border border-destructive/30 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Rahul Sharma (Class 8A)</span>
              <VFBadge variant="danger">HIGH RISK (71% Projected)</VFBadge>
            </div>
            <p className="text-muted-foreground text-[11px]">Current: 78% • Missed 7 of last 20 days. High absence frequency on Mondays before exams.</p>
          </div>

          <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Class 9B Friday P6 Pattern</span>
              <VFBadge variant="warning">PATTERN DETECTED</VFBadge>
            </div>
            <p className="text-muted-foreground text-[11px]">Class 9B has 34% higher absence during Friday Period 6 (Physics Lab slot).</p>
          </div>
        </div>
      </div>

      {/* 83. AI Natural Language Control */}
      <VFCard title="83. AI Attendance Assistant (Natural Language Controller)">
        <div className="space-y-3 text-xs mt-2">
          <div className="flex gap-2">
            <VFInput
              placeholder="e.g. Which class has the lowest attendance this week?"
              value={aiAnalysisPrompt}
              onChange={(e: any) => setAiAnalysisPrompt(e.target.value)}
            />
            <VFButton
              size="sm"
              onClick={() => {
                if (aiAnalysisPrompt) {
                  setAiAnalysisResponse(`AI Analytics: Class 9A has the lowest weekly attendance rate (87.2%), driven by 6 student absences on Tuesday.`);
                }
              }}
            >
              Ask AI
            </VFButton>
          </div>
          {aiAnalysisResponse && (
            <div className="p-3 bg-muted/40 border border-border rounded-lg text-foreground text-xs animate-fade-in">
              <span className="font-bold text-primary flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> AI Response:
              </span>
              <p className="mt-1 leading-relaxed text-[11px]">{aiAnalysisResponse}</p>
            </div>
          )}
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // MAPPING ALL 9 SUBMODULE TABS
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'config-policies', label: '6.1 Configuration & Policies', icon: <Sliders className="h-3.5 w-3.5" />, content: configPoliciesContent },
    { id: 'student-attendance', label: '6.2 Student Attendance', icon: <GraduationCap className="h-3.5 w-3.5" />, content: studentAttendanceContent },
    { id: 'period-attendance', label: '6.3 Period-wise Attendance', icon: <Clock className="h-3.5 w-3.5" />, content: periodAttendanceContent },
    { id: 'employee-attendance', label: '6.4 Employee Attendance', icon: <Users className="h-3.5 w-3.5" />, content: employeeAttendanceContent },
    { id: 'biometric-device', label: '6.5 Biometric & Device', icon: <Fingerprint className="h-3.5 w-3.5" />, content: biometricContent },
    { id: 'leave-mgmt', label: '6.6 Leave Management', icon: <FileText className="h-3.5 w-3.5" />, content: leaveContent },
    { id: 'corrections', label: '6.7 Corrections & Regularization', icon: <RefreshCw className="h-3.5 w-3.5" />, content: correctionsContent },
    { id: 'alerts-comm', label: '6.8 Alerts & Communication', icon: <Bell className="h-3.5 w-3.5" />, content: alertsCommContent },
    { id: 'analytics-ai', label: '6.9 Analytics & Intelligence', icon: <Sparkles className="h-3.5 w-3.5 text-primary" />, content: analyticsAiContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        defaultTabId="student-attendance"
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
