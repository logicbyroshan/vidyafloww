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
  Clock,
  UserCheck,
  GraduationCap,
  AlertCircle,
  CheckSquare,
  CheckCircle2,
  Layers,
  FileText,
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
  const [selectedDate] = React.useState<string>('2026-08-18');
  const [notice, setNotice] = React.useState<string | null>(null);

  const [studentRoster, setStudentRoster] = React.useState<StudentAttendanceRecord[]>([
    { id: '1', rollNo: '801', name: 'Rahul Sharma', class: 'Class 8-A', status: 'Present', time: '08:02 AM' },
    { id: '2', rollNo: '802', name: 'Amit Patel', class: 'Class 8-A', status: 'Absent', remarks: 'Uninformed Absence' },
    { id: '3', rollNo: '803', name: 'Neha Jain', class: 'Class 8-A', status: 'Present', time: '08:05 AM' },
    { id: '4', rollNo: '804', name: 'Riya Singh', class: 'Class 8-A', status: 'Late', time: '08:24 AM', remarks: 'Bus Route 4 Delayed' },
    { id: '5', rollNo: '805', name: 'Vikas Kumar', class: 'Class 8-A', status: 'Present', time: '07:58 AM' },
  ]);

  const handleMarkAllPresent = () => {
    setStudentRoster(prev => prev.map(s => ({ ...s, status: 'Present', time: '08:00 AM' })));
    setNotice('All students marked Present for Class 8-A.');
  };

  const handleStatusToggle = (id: string, newStatus: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setStudentRoster(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  // 1. Daily Roll Call View
  const rollCallContent = (
    <div className="space-y-6">
      {notice && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-black cursor-pointer px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard
          title="Student Attendance"
          value="94.8%"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="1,180 / 1,248 Present"
          accentColor="emerald"
        />
        <VFStatCard
          title="Staff Attendance"
          value="96.2%"
          icon={<UserCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="120 / 124 Present"
          accentColor="blue"
        />
        <VFStatCard
          title="Uninformed Absences"
          value="14"
          icon={<AlertCircle className="h-5 w-5" />}
          trend="down"
          trendLabel="Alerts dispatched"
          accentColor="rose"
        />
        <VFStatCard
          title="Biometric Gate Punches"
          value="2,410"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Gate sync active"
          accentColor="cyan"
        />
      </div>

      {/* Interactive Roll Call Box */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
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
            <span className="text-sm font-bold text-foreground">Date: {selectedDate}</span>
          </div>
          <VFButton
            size="sm"
            variant="outline"
            onClick={handleMarkAllPresent}
            leftIcon={<CheckSquare className="h-4 w-4 text-success" />}
          >
            Mark All Present
          </VFButton>
        </div>

        {/* Student Roster Single Clean Container */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {studentRoster.map((student) => (
              <div key={student.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-md bg-primary/15 text-primary font-black text-sm flex items-center justify-center shrink-0">
                    {student.rollNo}
                  </div>
                  <div>
                    <p className="font-black text-foreground text-base leading-tight">{student.name}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                      Roll No {student.rollNo} {student.time ? `· Entry Time: ${student.time}` : ''} {student.remarks ? `· Note: ${student.remarks}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {(['Present', 'Absent', 'Late', 'Leave'] as const).map((status) => {
                    const isSelected = student.status === status;
                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusToggle(student.id, status)}
                        className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? status === 'Present'
                              ? 'bg-success text-white border-success shadow-xs'
                              : status === 'Absent'
                              ? 'bg-destructive text-white border-destructive shadow-xs'
                              : status === 'Late'
                              ? 'bg-warning text-white border-warning shadow-xs'
                              : 'bg-muted-foreground text-white border-muted-foreground shadow-xs'
                            : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground border-border'
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 2. Class Summary & Trends View
  const reportsContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VFCard title="Class 8-A Average" description="Current attendance rate">
          <p className="text-3xl font-black text-success mt-1">96.2%</p>
          <p className="text-sm font-bold text-muted-foreground mt-0.5">38 of 40 Students Present</p>
        </VFCard>
        <VFCard title="Class 9-B Average" description="Current attendance rate">
          <p className="text-3xl font-black text-primary mt-1">94.0%</p>
          <p className="text-sm font-bold text-muted-foreground mt-0.5">36 of 38 Students Present</p>
        </VFCard>
        <VFCard title="Class 10-A Average" description="Current attendance rate">
          <p className="text-3xl font-black text-success mt-1">98.5%</p>
          <p className="text-sm font-bold text-muted-foreground mt-0.5">39 of 40 Students Present</p>
        </VFCard>
      </div>

      <VFCard title="Weekly Attendance Trends by Section">
        <div className="space-y-4 mt-1">
          {[
            { grade: 'Middle Wing (Classes 6 - 8)', rate: 95.4, present: '360/380 Students' },
            { grade: 'Secondary Wing (Classes 9 - 10)', rate: 94.8, present: '420/440 Students' },
            { grade: 'Senior Secondary (Classes 11 - 12)', rate: 96.8, present: '400/415 Students' },
          ].map((w, i) => (
            <div key={i} className="space-y-1.5 text-base">
              <div className="flex justify-between font-bold">
                <span className="text-foreground text-base">{w.grade}</span>
                <span className="text-muted-foreground text-sm font-semibold">{w.present} ({w.rate}%)</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${w.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // 3. Leave Requests View
  const leaveContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VFCard title="Pending Student Leave Applications">
          <div className="divide-y divide-border -my-2 text-base">
            {[
              { name: 'Kavya Nair (Class 11-Com)', reason: 'Medical Checkup', dates: 'Aug 19 - Aug 20', status: 'Pending Approval' },
              { name: 'Aditya Verma (Class 9-A)', reason: 'Family Function', dates: 'Aug 22', status: 'Pending Approval' },
            ].map((l, i) => (
              <div key={i} className="py-3 px-1 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-base">{l.name}</p>
                  <p className="text-muted-foreground text-xs font-semibold mt-0.5">{l.reason} · {l.dates}</p>
                </div>
                <div className="flex gap-2">
                  <VFButton size="sm">Approve</VFButton>
                  <VFButton size="sm" variant="outline">Reject</VFButton>
                </div>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Staff Planned Leaves">
          <div className="divide-y divide-border -my-2 text-base">
            {[
              { name: 'Mrs. Sunita Verma (Mathematics)', type: 'Casual Leave', dates: 'Aug 21', substitute: 'Assigned: Mr. Arvind Gupta' },
              { name: 'Dr. Rajesh Sharma (Physics)', type: 'Duty Leave / Workshop', dates: 'Aug 25', substitute: 'Assigned: Ms. Pooja Rao' },
            ].map((s, i) => (
              <div key={i} className="py-3 px-1 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-base">{s.name}</p>
                  <p className="text-muted-foreground text-xs font-semibold mt-0.5">{s.type} · {s.dates} · {s.substitute}</p>
                </div>
                <VFBadge variant="success">Approved</VFBadge>
              </div>
            ))}
          </div>
        </VFCard>
      </div>
    </div>
  );

  const tabs = [
    { id: 'rollcall', label: 'Daily Roll Call', icon: <CheckSquare className="h-4 w-4" />, content: rollCallContent },
    { id: 'reports', label: 'Class Reports & Trends', icon: <Layers className="h-4 w-4" />, content: reportsContent },
    { id: 'leaves', label: 'Leave Requests', icon: <FileText className="h-4 w-4" />, content: leaveContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="rollcall" variant="top-bar" />
    </VFPageContainer>
  );
}
