import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFSelect,
  VFTabs,
  VFBadge,
  cn,
} from '@vidyamaxx/ui';
import {
  CheckSquare,
  CheckCircle2,
  Layers,
  FileText,
  MessageSquare,
  Send,
  Calendar,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/attendance')({
  component: AttendancePage,
});

interface StudentAttendanceRecord {
  id: string;
  rollNo: string;
  name: string;
  class: string;
  phone: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  time?: string;
  remarks?: string;
}

function AttendancePage() {
  const { activeSession } = useGlobalStore();
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 8-A');
  const [selectedDate] = React.useState<string>('2026-08-20');
  const [notice, setNotice] = React.useState<string | null>(null);

  const [studentRoster, setStudentRoster] = React.useState<StudentAttendanceRecord[]>([
    { id: '1', rollNo: '801', name: 'Rahul Sharma', class: 'Class 8-A', phone: '+91 98765 43210', status: 'Present', time: '08:02 AM' },
    { id: '2', rollNo: '802', name: 'Amit Patel', class: 'Class 8-A', phone: '+91 98123 45678', status: 'Absent', remarks: 'Uninformed Absence' },
    { id: '3', rollNo: '803', name: 'Neha Jain', class: 'Class 8-A', phone: '+91 97654 32109', status: 'Present', time: '08:05 AM' },
    { id: '4', rollNo: '804', name: 'Riya Singh', class: 'Class 8-A', phone: '+91 99887 76655', status: 'Late', time: '08:24 AM', remarks: 'Bus Route 4 Delayed' },
    { id: '5', rollNo: '805', name: 'Vikas Kumar', class: 'Class 8-A', phone: '+91 98234 56789', status: 'Present', time: '07:58 AM' },
  ]);

  const handleMarkAllPresent = () => {
    setStudentRoster(prev => prev.map(s => ({ ...s, status: 'Present', time: '08:00 AM' })));
    setNotice(`All students in ${selectedClass} marked Present for ${selectedDate}.`);
  };

  const handleStatusToggle = (id: string, newStatus: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setStudentRoster(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const presentCount = studentRoster.filter(s => s.status === 'Present').length;
  const absentCount = studentRoster.filter(s => s.status === 'Absent').length;
  const lateCount = studentRoster.filter(s => s.status === 'Late').length;
  const attendanceRate = ((presentCount / studentRoster.length) * 100).toFixed(1);

  // 1. Daily Roll Call View
  const rollCallContent = (
    <div className="space-y-6">
      {notice && (
        <div className="p-4 bg-muted/60 border border-border rounded-xl text-sm text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Class Rate</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">{attendanceRate}%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">{presentCount} of {studentRoster.length} Present</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Absent Today</span>
            <span className={cn('text-2xl font-black mt-1 block', absentCount > 0 ? 'text-rose-400' : 'text-muted-foreground')}>
              {absentCount} Students
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Uninformed Absences</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Late Arrivals</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">{lateCount} Late</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">After 08:15 AM Gate Punch</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Academic AY</span>
            <span className="text-xl font-mono font-bold text-foreground mt-1 block">{activeSession}</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Biometric Gateway Synchronized</span>
          </div>
        </div>
      </div>

      {/* Interactive Roll Call Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-60">
            <VFSelect
              value={selectedClass}
              onChange={(e) => setSelectedClass(String(e.target.value))}
              options={[
                { label: 'Class 8 - Section A', value: 'Class 8-A' },
                { label: 'Class 9 - Section B', value: 'Class 9-B' },
                { label: 'Class 10 - Section A', value: 'Class 10-A' },
              ]}
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-2 rounded-xl bg-muted border border-border text-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{selectedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <VFButton
            size="sm"
            variant="outline"
            onClick={handleMarkAllPresent}
            leftIcon={<CheckSquare className="h-4 w-4 text-emerald-400" />}
          >
            Mark All Present
          </VFButton>
          <VFButton
            size="sm"
            leftIcon={<Send className="h-4 w-4" />}
            onClick={() => setNotice(`Automated absence SMS/WhatsApp alert sent to ${absentCount} parents.`)}
          >
            Notify Absent Parents
          </VFButton>
        </div>
      </div>

      {/* Student Roster Single Clean Container */}
      <div className="border border-border/80 rounded-2xl bg-card overflow-hidden shadow-xs">
        <div className="divide-y divide-border/60">
          {studentRoster.map((student) => (
            <div key={student.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-muted border border-border font-mono text-foreground font-black text-sm flex items-center justify-center shrink-0">
                  {student.rollNo}
                </div>
                <div>
                  <p className="font-black text-foreground text-base leading-tight">{student.name}</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                    Roll No {student.rollNo} {student.time ? `· In: ${student.time}` : ''} {student.remarks ? `· Note: ${student.remarks}` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
                {(['Present', 'Absent', 'Late', 'Leave'] as const).map((status) => {
                  const isSelected = student.status === status;
                  return (
                    <button
                      key={status}
                      onClick={() => handleStatusToggle(student.id, status)}
                      className={cn(
                        'px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border',
                        isSelected
                          ? status === 'Present'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-xs'
                            : status === 'Absent'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-xs'
                            : status === 'Late'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-xs'
                            : 'bg-muted text-foreground border-border shadow-xs'
                          : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground border-border/60'
                      )}
                    >
                      {status}
                    </button>
                  );
                })}

                {student.status === 'Absent' && (
                  <button
                    onClick={() => window.open(`https://wa.me/${student.phone.replace(/[^0-9]/g, '')}?text=Dear%20Parent,%20your%20ward%20${encodeURIComponent(student.name)}%20was%20marked%20Absent%20today%20(${selectedDate}).%20Please%20contact%20school%20office.`, '_blank')}
                    className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors cursor-pointer"
                    title="Send WhatsApp Absence Alert"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. Class Summary & Trends View
  const reportsContent = (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Class 8-A Section</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">96.2%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">38 of 40 Students Present</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Class 9-B Section</span>
            <span className="text-2xl font-black text-foreground mt-1 block">94.0%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">36 of 38 Students Present</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Class 10-A Section</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">98.5%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">39 of 40 Students Present</span>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-foreground pb-2 border-b border-border/60">
          Weekly Attendance Aggregate by Wing
        </h4>
        <div className="space-y-4 pt-1">
          {[
            { grade: 'Middle Wing (Classes 6 - 8)', rate: 95.4, present: '360/380 Students' },
            { grade: 'Secondary Wing (Classes 9 - 10)', rate: 94.8, present: '420/440 Students' },
            { grade: 'Senior Secondary (Classes 11 - 12)', rate: 96.8, present: '400/415 Students' },
          ].map((w, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between font-bold text-sm">
                <span className="text-foreground">{w.grade}</span>
                <span className="text-muted-foreground font-mono">{w.present} ({w.rate}%)</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${w.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. Leave Requests View
  const leaveContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-foreground pb-2 border-b border-border/60">
            Pending Student Leave Applications
          </h4>
          <div className="divide-y divide-border/60">
            {[
              { name: 'Kavya Nair (Class 11-Com)', reason: 'Medical Checkup', dates: 'Aug 20 - Aug 21' },
              { name: 'Aditya Verma (Class 9-A)', reason: 'Family Function', dates: 'Aug 22' },
            ].map((l, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">{l.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{l.reason} · {l.dates}</p>
                </div>
                <div className="flex gap-2">
                  <VFButton size="sm" onClick={() => setNotice(`Leave approved for ${l.name}.`)}>Approve</VFButton>
                  <VFButton size="sm" variant="outline">Reject</VFButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-foreground pb-2 border-b border-border/60">
            Staff Planned Leaves & Duty Substitutes
          </h4>
          <div className="divide-y divide-border/60">
            {[
              { name: 'Mrs. Sunita Verma (Mathematics)', type: 'Casual Leave', dates: 'Aug 21', substitute: 'Sub: Mr. Arvind Gupta' },
              { name: 'Dr. Rajesh Sharma (Physics)', type: 'Duty Leave / Workshop', dates: 'Aug 25', substitute: 'Sub: Ms. Pooja Rao' },
            ].map((s, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-sm">{s.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{s.type} · {s.dates} · {s.substitute}</p>
                </div>
                <VFBadge variant="success">Approved</VFBadge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'rollcall', label: 'Daily Roll Call', icon: <CheckSquare className="h-4 w-4" />, content: rollCallContent },
    { id: 'reports', label: 'Class Reports & Trends', icon: <Layers className="h-4 w-4" />, content: reportsContent },
    { id: 'leaves', label: 'Leave Requests', icon: <FileText className="h-4 w-4" />, content: leaveContent },
  ];

  return (
    <VFPageContainer className="p-4 sm:p-5 flex-1 flex flex-col min-h-0 space-y-4">
      <VFTabs items={tabs} defaultTabId="rollcall" variant="top-bar" />
    </VFPageContainer>
  );
}

