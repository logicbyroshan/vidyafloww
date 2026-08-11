import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  MessageSquare,
  Bell,
  CheckCheck,
  Sparkles,
  Plus,
  AlertTriangle,
} from 'lucide-react';

export const Route = createFileRoute('/communication')({
  component: CommunicationPage,
});

interface ConversationRecord {
  id: string;
  partner: string;
  role: string;
  studentName: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  status: 'Read' | 'Delivered' | 'Sent';
}

interface AnnouncementRecord {
  id: string;
  code: string;
  title: string;
  audience: string;
  sentCount: number;
  acknowledgedCount: number;
  priority: 'Normal' | 'Important' | 'Urgent' | 'Emergency';
  publishDate: string;
}

function CommunicationPage() {
  const communicationModule = MODULE_REGISTRY.find((m) => m.id === 'communication');

  const conversationsData: ConversationRecord[] = [
    { id: '1', partner: 'Priya Sharma', role: 'Parent', studentName: 'Rahul Sharma (10-A)', lastMessage: 'Rahul will be absent tomorrow due to medical checkup...', time: '2 min ago', unread: true, status: 'Delivered' },
    { id: '2', partner: 'Sunita Patel', role: 'Parent', studentName: 'Aman Patel (10-B)', lastMessage: 'Thank you teacher for sharing the math revision notes.', time: '14 min ago', unread: false, status: 'Read' },
    { id: '3', partner: 'Dr. Suresh Verma', role: 'Teacher', studentName: 'Faculty Physics', lastMessage: 'Class 10 Physics lab schedule updated for Friday shift.', time: '1 hour ago', unread: false, status: 'Read' },
  ];

  const announcementsData: AnnouncementRecord[] = [
    { id: '1', code: 'ANC-2026-088', title: 'Independence Day Campus Celebration Notice', audience: 'All Students & Parents', sentCount: 1240, acknowledgedCount: 842, priority: 'Important', publishDate: '11 Aug 2026' },
    { id: '2', code: 'ANC-2026-089', title: 'Class 10 Physics Homework Deadline Reminder', audience: 'Class 10-A Students', sentCount: 842, acknowledgedCount: 790, priority: 'Normal', publishDate: '10 Aug 2026' },
    { id: '3', code: 'ANC-2026-090', title: 'Route 4 School Bus Arrival 15-Min Delay Alert', audience: 'Bus Route 4 Parents', sentCount: 184, acknowledgedCount: 162, priority: 'Urgent', publishDate: 'Today 07:15 AM' },
  ];

  // 17.1 Communication Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Omnichannel Communication Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 1,284 active conversations, 8,420 sent messages, SMS DLT gateways, email circulars, and mobile push alerts.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Communication AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>New Message</VFButton>
        </div>
      </div>

      {/* Feature 1 — Communication KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Conversations" value="1,284" icon={<MessageSquare className="h-5 w-5 text-primary" />} trend="up" trendLabel="18 Pending Replies" />
        <VFStatCard title="Messages Delivered" value="7,980" icon={<CheckCheck className="h-5 w-5 text-success" />} trend="up" trendLabel="94.7% Delivery Rate" />
        <VFStatCard title="Active Announcements" value="124" icon={<Bell className="h-5 w-5 text-secondary" />} description="6 Scheduled Today" />
        <VFStatCard title="Failed Delivery Alerts" value="42" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} description="18 Invalid Numbers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Conversations & Announcements */}
        <VFSection title="Recent Announcements & Active Conversations" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Delivered Rate</p>
              <p className="text-base font-bold text-success mt-0.5">94% (7,980)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Pending Queue</p>
              <p className="text-base font-bold text-warning mt-0.5">3% (240)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Failed Delivery</p>
              <p className="text-base font-bold text-destructive mt-0.5">1% (42)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">SMS Credits Left</p>
              <p className="text-base font-bold text-primary mt-0.5">24,820 Credits</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Notice Code', accessorKey: 'code', cell: (r: AnnouncementRecord) => <span className="font-mono font-bold text-primary">{r.code}</span> },
              { header: 'Announcement Title', accessorKey: 'title', cell: (r: AnnouncementRecord) => <span className="font-bold text-foreground">{r.title}</span> },
              { header: 'Target Audience', accessorKey: 'audience' },
              { header: 'Sent', accessorKey: 'sentCount', cell: (r: AnnouncementRecord) => `${r.sentCount} Recipients` },
              { header: 'Acknowledged', accessorKey: 'acknowledgedCount', cell: (r: AnnouncementRecord) => <VFBadge variant="success">{r.acknowledgedCount} Reads</VFBadge> },
              {
                header: 'Priority',
                accessorKey: 'priority',
                cell: (r: AnnouncementRecord) => (
                  <VFBadge variant={r.priority === 'Urgent' ? 'danger' : r.priority === 'Important' ? 'warning' : 'outline'}>
                    {r.priority}
                  </VFBadge>
                ),
              },
            ]}
            data={announcementsData}
            filterPlaceholder="Search announcement title or audience..."
          />
        </VFSection>

        {/* Needs Attention & Channel Health */}
        <VFCard title="Needs Attention & Omnichannel Status">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-destructive/10 border border-destructive/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">⚠ 42 Failed Messages</span>
                <VFBadge variant="danger">Retry Queue</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">18 invalid phone numbers · 12 DLT provider timeouts</p>
            </div>
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">💬 18 Unanswered Parent Messages</span>
                <VFBadge variant="warning">Action Needed</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Parent queries pending response over 24 hours</p>
            </div>
            <div className="p-2.5 bg-card border border-border rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">📱 Delivery Channel Status</span>
                <VFBadge variant="success">All Operational</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Push 🟢 (94%) · Email 🟢 (89%) · SMS DLT 🟢 (98%)</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 17.2 Inbox Submodule Content
  const inboxContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Unified Institutional Inbox & Conversations</h3>
          <p className="text-xs text-muted-foreground">Moderated parent-teacher messaging, linked academic context, voice notes, and read receipts.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Start Conversation</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Contact Person', accessorKey: 'partner', cell: (r: ConversationRecord) => <span className="font-bold text-foreground">{r.partner}</span> },
          { header: 'Role', accessorKey: 'role', cell: (r: ConversationRecord) => <VFBadge variant="outline">{r.role}</VFBadge> },
          { header: 'Linked Student', accessorKey: 'studentName', cell: (r: ConversationRecord) => <span className="font-mono text-primary font-semibold">{r.studentName}</span> },
          { header: 'Last Message', accessorKey: 'lastMessage' },
          { header: 'Time', accessorKey: 'time' },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r: ConversationRecord) => (
              <VFBadge variant={r.unread ? 'warning' : 'success'}>
                {r.unread ? 'Unread' : r.status}
              </VFBadge>
            ),
          },
        ]}
        data={conversationsData}
        filterPlaceholder="Search conversation or student..."
      />
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    inbox: inboxContent,
    announcements: dashboardContent,
    chat: inboxContent,
    channels: dashboardContent,
    broadcasts: dashboardContent,
    templates: dashboardContent,
    automations: dashboardContent,
    analytics: dashboardContent,
    settings: dashboardContent,
  };

  const submoduleTabs = (communicationModule?.submodules || [
    { id: 'dashboard', label: 'Communication Dashboard' },
    { id: 'inbox', label: 'Inbox & Conversations' },
    { id: 'announcements', label: 'Announcements & Notices' },
    { id: 'chat', label: 'Messaging & Chat' },
    { id: 'channels', label: 'SMS, Email & Push' },
    { id: 'broadcasts', label: 'Campaigns & Broadcasts' },
    { id: 'templates', label: 'Templates & Library' },
    { id: 'automations', label: 'Events & Automations' },
    { id: 'analytics', label: 'Communication Analytics' },
    { id: 'settings', label: 'Settings & Governance' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <MessageSquare className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
