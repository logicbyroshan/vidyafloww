import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard } from '@vidyamaxx/ui';
import { MessageSquare, Mail, Bell, Smartphone, Send, Calendar, CheckCheck, FileText, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/communication')({
  component: CommunicationPage,
});

function CommunicationPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('notification-center');

  const submoduleTabs = [
    {
      id: 'notification-center',
      label: 'Notification Center',
      icon: <Bell className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Unified Omnichannel Communication Hub">
          <p className="text-xs text-muted-foreground">Broadcast messages across SMS, Email, WhatsApp, and Mobile Push Notifications simultaneously.</p>
        </VFCard>
      ),
    },
    {
      id: 'sms-mgmt',
      label: 'SMS Gateway (DLT)',
      icon: <MessageSquare className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="DLT-Compliant Bulk SMS Sender & Credit History">
          <p className="text-xs text-muted-foreground">Send DLT approved transactional SMS (Attendance alerts, Fee receipts, Exam schedules). Balance: 48,250 SMS Credits.</p>
        </VFCard>
      ),
    },
    {
      id: 'email-mgmt',
      label: 'Email Broadcasts',
      icon: <Mail className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Rich HTML Email Newsletter & Circular Engine">
          <p className="text-xs text-muted-foreground">Send formatted school monthly newsletters, principal circulars, and fee invoice attachments to parents.</p>
        </VFCard>
      ),
    },
    {
      id: 'push-notifications',
      label: 'Mobile Push Alerts',
      icon: <Smartphone className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="In-App Parent & Student Push Notifications">
          <p className="text-xs text-muted-foreground">Instant Firebase FCM push alerts delivered directly to VidyaMaxx Parent Mobile iOS/Android apps.</p>
        </VFCard>
      ),
    },
    {
      id: 'whatsapp-messaging',
      label: 'WhatsApp Business API',
      icon: <Send className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Automated WhatsApp Business Template Messages">
          <p className="text-xs text-muted-foreground">Send automated fee due reminders, daily attendance alerts, and bus arrival updates via official Meta WhatsApp API.</p>
        </VFCard>
      ),
    },
    {
      id: 'announcements',
      label: 'Circulars & Noticeboard',
      icon: <AlertCircle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Digital Noticeboard & Official Announcements">
          <p className="text-xs text-muted-foreground">Publish urgent school closure notices, holiday circulars, and event invites to student parent portals.</p>
        </VFCard>
      ),
    },
    {
      id: 'parent-teacher',
      label: 'Parent-Teacher Chat',
      icon: <MessageSquare className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="1-on-1 Moderated Parent-Teacher Messaging">
          <p className="text-xs text-muted-foreground">Secure messaging channel between class teachers and parents during designated PTM query hours.</p>
        </VFCard>
      ),
    },
    {
      id: 'templates',
      label: 'Message Templates',
      icon: <FileText className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Pre-Approved SMS & Email Template Library">
          <p className="text-xs text-muted-foreground">Library of pre-approved DLT SMS templates and customizable parent email templates.</p>
        </VFCard>
      ),
    },
    {
      id: 'scheduling',
      label: 'Communication Scheduling',
      icon: <Calendar className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Scheduled Broadcasts & Auto-Triggers">
          <p className="text-xs text-muted-foreground">Schedule birthday greeting SMS, exam datesheet reminders, and periodic fee collection broadcasts.</p>
        </VFCard>
      ),
    },
    {
      id: 'engagement-tracking',
      label: 'Delivery & Analytics',
      icon: <CheckCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Delivery Reports & Message Open Rate Analytics">
          <p className="text-xs text-muted-foreground">Track SMS delivery status (Delivered / Failed), email open rates, link clickthroughs, and mobile push reads.</p>
        </VFCard>
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
