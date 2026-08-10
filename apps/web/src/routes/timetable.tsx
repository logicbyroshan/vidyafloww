import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { Calendar, Users, Building, RefreshCw, Bot, Sparkles, Clock, UserCheck } from 'lucide-react';

export const Route = createFileRoute('/timetable')({
  component: TimetablePage,
});

function TimetablePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('class-timetable');

  const teacherLoadData = [
    { teacher: 'Dr. Sarah Connor', subject: 'Physics', weeklyPeriods: '24 / 26', maxConsecutive: '2', freeSlots: '8 Slots', status: 'Optimal' },
    { teacher: 'Prof. Rajesh Sharma', subject: 'Mathematics', weeklyPeriods: '26 / 26', maxConsecutive: '3', freeSlots: '6 Slots', status: 'Max Cap' },
    { teacher: 'Anita Desai', subject: 'Chemistry', weeklyPeriods: '20 / 26', maxConsecutive: '2', freeSlots: '12 Slots', status: 'Available' },
    { teacher: 'Vikram Singh', subject: 'Computer Sci', weeklyPeriods: '22 / 26', maxConsecutive: '2', freeSlots: '10 Slots', status: 'Optimal' },
  ];

  const teacherColumns = [
    { header: 'Teacher Name', accessorKey: 'teacher' },
    { header: 'Subject', accessorKey: 'subject' },
    { header: 'Weekly Load', accessorKey: 'weeklyPeriods' },
    { header: 'Max Consecutive', accessorKey: 'maxConsecutive' },
    { header: 'Free Period Slots', accessorKey: 'freeSlots' },
    {
      header: 'Load Status',
      accessorKey: 'status',
      cell: (row: any) => (
        <VFBadge variant={row.status === 'Optimal' ? 'success' : row.status === 'Max Cap' ? 'warning' : 'outline'}>
          {row.status}
        </VFBadge>
      ),
    },
  ];

  const submoduleTabs = [
    {
      id: 'class-timetable',
      label: 'Class Timetable',
      icon: <Calendar className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">Class 9 - Section A Timetable</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Academic Session 2026-2027 · Weekly Schedule</p>
            </div>
            <div className="flex items-center gap-2">
              <VFBadge variant="outline">Period Duration: 45 min</VFBadge>
              <VFButton size="sm" variant="outline" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
                Export Timetable PDF
              </VFButton>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 text-xs">
            {['Time / Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
              <div key={day} className="bg-muted/50 p-2.5 rounded-lg font-bold text-center border border-border/60">
                {day}
              </div>
            ))}
            {[
              { time: '08:00 - 08:45', mon: 'Mathematics', tue: 'Physics', wed: 'English', thu: 'Chemistry', fri: 'Computer Sci' },
              { time: '08:45 - 09:30', mon: 'Physics', tue: 'Chemistry', wed: 'Mathematics', thu: 'English', fri: 'Social Studies' },
              { time: '09:30 - 10:15', mon: 'Chemistry', tue: 'English', wed: 'Biology', thu: 'Mathematics', fri: 'Physical Ed' },
              { time: '10:15 - 10:45', mon: 'RECESS BREAK', tue: 'RECESS BREAK', wed: 'RECESS BREAK', thu: 'RECESS BREAK', fri: 'RECESS BREAK' },
              { time: '10:45 - 11:30', mon: 'English', tue: 'Mathematics', wed: 'Physics', thu: 'Computer Sci', fri: 'Mathematics' },
              { time: '11:30 - 12:15', mon: 'Social Studies', tue: 'Biology Lab', wed: 'Chemistry Lab', thu: 'Physics Lab', fri: 'Library Period' },
            ].map((slot, i) => (
              <React.Fragment key={i}>
                <div className="p-2.5 rounded-lg bg-card border border-border/60 font-semibold text-muted-foreground flex items-center justify-center text-[11px]">
                  <Clock className="h-3 w-3 mr-1 text-primary" /> {slot.time}
                </div>
                {[slot.mon, slot.tue, slot.wed, slot.thu, slot.fri].map((sub, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-center font-medium transition-colors ${
                      sub.includes('BREAK')
                        ? 'bg-muted/30 border-dashed border-border text-muted-foreground/60'
                        : 'bg-card border-border/70 hover:border-primary/50 text-foreground shadow-xs'
                    }`}
                  >
                    {sub}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'teacher-timetable',
      label: 'Teacher Timetable',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Teacher Workload & Teaching Period Distribution</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Track period counts, maximum consecutive classes, and free prep slots per teacher.</p>
            </div>
            <VFBadge variant="success">All Teachers Allocated</VFBadge>
          </div>
          <VFDataTable columns={teacherColumns} data={teacherLoadData} filterPlaceholder="Search teacher or subject..." />
        </div>
      ),
    },
    {
      id: 'room-lab',
      label: 'Room & Lab Allocations',
      icon: <Building className="h-3.5 w-3.5" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { room: 'Physics Lab 01', capacity: '40 Seats', equipment: 'Digital Oscilloscopes, Optics Kits', status: 'Booked (Class 9-A)' },
            { room: 'Chemistry Lab 02', capacity: '35 Seats', equipment: 'Fume Hood, Titration Benches', status: 'Booked (Class 11-B)' },
            { room: 'Computer Lab 03', capacity: '50 Workstations', equipment: 'High-speed LAN, Python IDEs', status: 'Available' },
          ].map((r, i) => (
            <VFCard key={i} title={r.room}>
              <p className="text-xs text-muted-foreground mt-1">Capacity: {r.capacity} · Equipment: {r.equipment}</p>
              <div className="mt-3 flex justify-between items-center border-t border-border/60 pt-2">
                <VFBadge variant={r.status.includes('Booked') ? 'warning' : 'success'}>{r.status}</VFBadge>
                <VFButton size="sm" variant="outline">Reserve Room</VFButton>
              </div>
            </VFCard>
          ))}
        </div>
      ),
    },
    {
      id: 'substitutes',
      label: 'Substitute Teachers',
      icon: <RefreshCw className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border p-4 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-primary" /> Today's Substitute Teacher Proxy Log
            </h3>
            <p className="text-xs text-muted-foreground">Automated proxy matching for staff members on leave based on free period schedules.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card border border-border rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-foreground">Class 10-A (Period 3 Physics)</span>
                <VFBadge variant="success">Auto Assigned</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Absent: Dr. Sarah Connor ➔ Proxy: Anita Desai (Free Period 3)</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-foreground">Class 8-B (Period 5 Math)</span>
                <VFBadge variant="success">Auto Assigned</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground">Absent: Prof. Rajesh Sharma ➔ Proxy: Vikram Singh (Free Period 5)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-generator',
      label: 'AI Timetable Generator',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Constraint-Based Schedule Optimizer</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI automatically calculates error-free schedules considering teacher availability, room capacity, lab requirements, teacher workload caps, and consecutive period limits.
          </p>
          <div className="flex gap-2">
            <VFBadge variant="success">0 Schedule Conflicts Found</VFBadge>
            <VFBadge variant="outline">Constraint Satisfaction: 99.8%</VFBadge>
          </div>
          <VFButton size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
            Generate AI Timetable
          </VFButton>
        </div>
      ),
    },
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
