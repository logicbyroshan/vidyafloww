import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFBadge } from '@vidyamaxx/ui';
import { CalendarCheck, Users, QrCode, FileCheck, Sparkles, Bot } from 'lucide-react';

export const Route = createFileRoute('/attendance')({
  component: AttendancePage,
});

function AttendancePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('student-attendance');

  const submoduleTabs = [
    {
      id: 'student-attendance',
      label: 'Daily Student Attendance',
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Class-Wise Daily Attendance Matrix">
          <p className="text-xs text-muted-foreground">Mark daily or period-wise student attendance, record late arrivals, and trigger instant parent alerts.</p>
        </VFCard>
      ),
    },
    {
      id: 'staff-attendance',
      label: 'Staff Check-in / Out',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Employee Attendance & Shift Hours">
          <p className="text-xs text-muted-foreground">Track teacher check-in times, overtime, early departures, and monthly working hours.</p>
        </VFCard>
      ),
    },
    {
      id: 'biometric-qr',
      label: 'Biometric & QR Scan Logs',
      icon: <QrCode className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Biometric Device & Face Scanner Live Sync">
          <p className="text-xs text-muted-foreground">Real-time attendance logs synced directly from campus hardware scanners and RFID gates.</p>
        </VFCard>
      ),
    },
    {
      id: 'leave-approvals',
      label: 'Leave Requests & Approvals',
      icon: <FileCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student & Employee Leave Management">
          <p className="text-xs text-muted-foreground">Process leave applications, medical certificates, and principal approval workflows.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-anomaly',
      label: 'AI Anomaly Risk',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Chronic Absenteeism Risk Detector</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI flags suspicious attendance patterns, detects chronic absenteeism risk early, and triggers automated parent WhatsApp reminders.
          </p>
          <div className="flex gap-2">
            <VFBadge variant="warning">14 At-Risk Students Flagged</VFBadge>
            <VFBadge variant="success">98.2% Campus Attendance Today</VFBadge>
          </div>
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
