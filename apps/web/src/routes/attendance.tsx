import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFBadge } from '@vidyamaxx/ui';
import { CalendarCheck, Users, QrCode, FileCheck, Sparkles, Bot, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/attendance')({
  component: AttendancePage,
});

function AttendancePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('student-attendance');

  const submoduleTabs = [
    {
      id: 'student-attendance',
      label: 'Student Attendance',
      icon: <CalendarCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Class Daily Attendance Matrix">
          <p className="text-xs text-muted-foreground">Mark daily morning student attendance, record late arrivals, and send instant parent SMS/WhatsApp alerts.</p>
        </VFCard>
      ),
    },
    {
      id: 'period-attendance',
      label: 'Period-wise Attendance',
      icon: <Clock className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Subject / Period-wise Attendance Tracker">
          <p className="text-xs text-muted-foreground">Subject teachers mark attendance for each 45-minute period to catch bunking or class skips.</p>
        </VFCard>
      ),
    },
    {
      id: 'employee-attendance',
      label: 'Employee Attendance',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Staff & Teacher Check-in / Out Log">
          <p className="text-xs text-muted-foreground">Track employee shift hours, biometric arrival timestamps, early departures, and monthly working days.</p>
        </VFCard>
      ),
    },
    {
      id: 'biometric-device',
      label: 'Biometric & QR Scanners',
      icon: <QrCode className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Biometric, RFID Gate & QR Device Sync">
          <p className="text-xs text-muted-foreground">Real-time attendance logs synced directly from campus hardware scanners and RFID entrance turnstiles.</p>
        </VFCard>
      ),
    },
    {
      id: 'leave-mgmt',
      label: 'Leave Management',
      icon: <FileCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student & Employee Leave Applications">
          <p className="text-xs text-muted-foreground">Process leave requests, medical certificate attachments, and multi-level principal/HOD approval workflows.</p>
        </VFCard>
      ),
    },
    {
      id: 'attendance-corrections',
      label: 'Attendance Corrections',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Attendance Correction & Manual Adjustments">
          <p className="text-xs text-muted-foreground">Correct accidental marking errors, approve medical duty leaves (OD), and update official records.</p>
        </VFCard>
      ),
    },
    {
      id: 'rules-policies',
      label: 'Rules & Policies',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Attendance Rules & Late Mark Policies">
          <p className="text-xs text-muted-foreground">Set mandatory 75% board exam attendance criteria, late arrival penalty rules, and half-day thresholds.</p>
        </VFCard>
      ),
    },
    {
      id: 'analytics-alerts',
      label: 'AI Chronic Absenteeism Alerts',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
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
