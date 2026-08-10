import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { MessageSquare, Send, Users, AlertTriangle, Plus } from 'lucide-react';

export const Route = createFileRoute('/communication')({
  component: CommunicationPage,
});

function CommunicationPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('announcements');

  const submoduleTabs = [
    {
      id: 'announcements',
      label: 'Announcements & Circulars',
      icon: <MessageSquare className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Official School Circulars & Notices</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Publish holiday notices, examination circulars, and event announcements.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Publish Circular</VFButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VFCard title="Annual Sports Day Schedule Announcement">
              <p className="text-xs text-muted-foreground">Target: All Parents & Students · Sent 2 hours ago</p>
            </VFCard>
            <VFCard title="Parent-Teacher Meeting (PTM) Reminder">
              <p className="text-xs text-muted-foreground">Target: Class 10 & 12 Parents · Sent yesterday</p>
            </VFCard>
          </div>
        </div>
      ),
    },
    {
      id: 'sms-whatsapp',
      label: 'SMS & WhatsApp Gateway',
      icon: <Send className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Omnichannel Communication & DLT Templates">
          <p className="text-xs text-muted-foreground">Send bulk SMS, WhatsApp notifications, and DLT-registered TRAI approved message templates.</p>
        </VFCard>
      ),
    },
    {
      id: 'parent-messaging',
      label: 'Parent-Teacher Messaging',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Direct Parent-Teacher Messaging Channel">
          <p className="text-xs text-muted-foreground">Two-way communication portal for parents to message subject teachers directly with read receipt tracking.</p>
        </VFCard>
      ),
    },
    {
      id: 'emergency-broadcast',
      label: 'Emergency Broadcast & Alerts',
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Instant Emergency SMS & Push Broadcast">
          <p className="text-xs text-muted-foreground">Trigger urgent alerts for sudden school closure, weather advisories, or bus delay notifications.</p>
        </VFCard>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="11 — Communication & Engagement" 
        description="Omnichannel communication center: In-app notices, SMS, Email, WhatsApp, and emergency alerts."
      />
      <VFTabs 
        items={submoduleTabs} 
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="underline"
      />
    </VFPageContainer>
  );
}
