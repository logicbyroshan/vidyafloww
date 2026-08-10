import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge } from '@vidyamaxx/ui';
import { Calendar, Users, Building, RefreshCw, Bot, Sparkles, Clock } from 'lucide-react';

export const Route = createFileRoute('/timetable')({
  component: TimetablePage,
});

function TimetablePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('class-timetable');

  const submoduleTabs = [
    {
      id: 'class-timetable',
      label: 'Class Timetable',
      icon: <Calendar className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Class 9 - Section A Timetable</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Academic Session 2026-2027 · Weekly Schedule</p>
            </div>
            <div className="flex items-center gap-2">
              <VFBadge variant="outline">Period Duration: 45 min</VFBadge>
              <VFButton size="sm" variant="outline" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
                Export Timetable
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
                  <Clock className="h-3 w-3 mr-1" /> {slot.time}
                </div>
                {[slot.mon, slot.tue, slot.wed, slot.thu, slot.fri].map((sub, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-center font-medium transition-colors ${
                      sub.includes('BREAK')
                        ? 'bg-muted/30 border-dashed border-border text-muted-foreground/60'
                        : 'bg-card border-border/70 hover:border-primary/50 text-foreground'
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
        <VFCard title="Teacher Workload & Allocation">
          <p className="text-xs text-muted-foreground">View free periods, maximum consecutive classes, and subject load per teacher.</p>
        </VFCard>
      ),
    },
    {
      id: 'room-lab',
      label: 'Room & Lab Allocations',
      icon: <Building className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Lab & Lecture Hall Booking Matrix">
          <p className="text-xs text-muted-foreground">Manage Science Labs, Computer Labs, Audi-Visual rooms, and Sports fields.</p>
        </VFCard>
      ),
    },
    {
      id: 'substitutes',
      label: 'Substitute Teachers',
      icon: <RefreshCw className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Substitute Teacher Management">
          <p className="text-xs text-muted-foreground">Auto-assign proxy teachers for absent staff based on free period schedules.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-generator',
      label: 'AI Timetable Generator',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Constraint-Based Schedule Optimizer</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI automatically calculates error-free schedules considering teacher availability, room capacity, lab requirements, teacher workload caps, and consecutive period limits.
          </p>
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
