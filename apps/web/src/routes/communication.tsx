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
  VFPieChart,
  VFAreaChart,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  MessageSquare,
  Bell,
  CheckCheck,
  Sparkles,
  Plus,
  AlertTriangle,
  Send,
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

  // 17.1 Communication Dashboard Submodule Content (ONLY Dashboard has top KPI Stat Cards!)
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

      {/* Feature 1 — Communication KPI Cards (Dashboard Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Conversations" value="1,284" icon={<MessageSquare className="h-5 w-5 text-primary" />} trend="up" trendLabel="18 Pending Replies" />
        <VFStatCard title="Messages Delivered" value="7,980" icon={<CheckCheck className="h-5 w-5 text-success" />} trend="up" trendLabel="94.7% Delivery Rate" />
        <VFStatCard title="Active Announcements" value="124" icon={<Bell className="h-5 w-5 text-secondary" />} description="6 Scheduled Today" />
        <VFStatCard title="Failed Delivery Alerts" value="42" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} description="18 Invalid Numbers" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Conversations & Announcements */}
        <VFSection title="Recent Announcements & Active Conversations" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
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

        {/* Delivery Share Chart & Channel Status */}
        <VFCard title="Delivery Breakdown & Omnichannel Status">
          <div className="space-y-3 text-xs mt-1">
            <VFPieChart
              data={[
                { name: 'Delivered', value: 7980, color: '#16a34a' },
                { name: 'Pending', value: 240, color: '#eab308' },
                { name: 'Failed', value: 42, color: '#ef4444' },
              ]}
              height={160}
            />

            <div className="p-2.5 bg-destructive/10 border border-destructive/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">⚠ 42 Failed Messages</span>
                <VFBadge variant="danger">Retry Queue</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">18 invalid phone numbers · 12 DLT provider timeouts</p>
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

  // Dedicated Announcements Submodule Content (NO REPEATING TOP STAT CARDS!)
  const announcementsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Official School Announcements & Parent Circulars</h3>
          <p className="text-xs text-muted-foreground">Publish circulars to specific classes, grades, or all parents with mandatory digital read acknowledgements.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Publish Circular</VFButton>
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
    </div>
  );

  // 17.2 Specialized Split-Pane Unified Inbox View Submodule Content (NO REPEATING TOP STAT CARDS!)
  const inboxContent = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left List of Conversations */}
      <div className="bg-card border border-border rounded-xl p-3 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <h3 className="text-xs font-bold text-foreground">Recent Conversations</h3>
          <VFButton size="sm" variant="ghost" className="text-xs h-7">Filter</VFButton>
        </div>
        <div className="space-y-2">
          {conversationsData.map((c) => (
            <div
              key={c.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${c.unread ? 'bg-primary/10 border-primary/40' : 'bg-muted/30 border-border hover:bg-muted/60'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-foreground">{c.partner}</span>
                <span className="text-[10px] text-muted-foreground">{c.time}</span>
              </div>
              <p className="text-[11px] text-primary font-mono mt-0.5">{c.studentName}</p>
              <p className="text-xs text-muted-foreground truncate mt-1">{c.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Thread View */}
      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4 flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="text-sm font-bold text-foreground">Priya Sharma <span className="text-xs font-normal text-muted-foreground">(Parent of Rahul Sharma 10-A)</span></h3>
            <p className="text-xs text-muted-foreground">Channel: In-App Parent Portal · Designated Query Hours (4 PM - 7 PM)</p>
          </div>
          <VFBadge variant="success">✓✓ Delivered</VFBadge>
        </div>

        {/* Chat Bubbles Feed */}
        <div className="space-y-3 text-xs py-4 flex-1">
          <div className="flex flex-col items-start max-w-[80%]">
            <div className="bg-muted p-3 rounded-2xl rounded-tl-none border border-border">
              <p className="text-foreground">Respected Teacher, Rahul will be absent tomorrow (Wednesday) due to a scheduled medical checkup. Kindly consider his leave application.</p>
              <span className="text-[10px] text-muted-foreground mt-1 block">Yesterday 04:15 PM</span>
            </div>
          </div>

          <div className="flex flex-col items-end max-w-[80%] ml-auto">
            <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none">
              <p>Dear Mrs. Sharma, noted. I have logged Rahul's leave in the attendance system. Please share the doctor note when he resumes on Thursday.</p>
              <span className="text-[10px] text-primary-foreground/80 mt-1 block text-right">Yesterday 04:30 PM ✓✓</span>
            </div>
          </div>
        </div>

        {/* Send Input Toolbar */}
        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <input
            type="text"
            placeholder="Type your message to parent..."
            className="flex-1 bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Send</VFButton>
        </div>
      </div>
    </div>
  );

  // 17.5 Specialized Delivery Channel Telematics Submodule Content (NO REPEATING TOP STAT CARDS!)
  const channelsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Delivery Channel Telematics & Provider Status</h3>
          <p className="text-xs text-muted-foreground">Monitor real-time push notification latencies, SMS DLT credit balances, and email SMTP server throughput.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Configure Channel</VFButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFCard title="Mobile Push Alerts (FCM)">
          <div className="text-xs space-y-1">
            <p className="text-base font-bold text-success">🟢 Operational</p>
            <p className="text-muted-foreground">94.7% Delivery Rate · 120ms Avg Latency</p>
          </div>
        </VFCard>
        <VFCard title="SMS DLT Gateway">
          <div className="text-xs space-y-1">
            <p className="text-base font-bold text-primary">24,820 Credits</p>
            <p className="text-muted-foreground">Sender ID: VDMXSCH · DLT Compliant</p>
          </div>
        </VFCard>
        <VFCard title="Email SMTP Circulars">
          <div className="text-xs space-y-1">
            <p className="text-base font-bold text-success">🟢 89.2% Open Rate</p>
            <p className="text-muted-foreground">AWS SES · Daily Quota 50,000</p>
          </div>
        </VFCard>
        <VFCard title="WhatsApp Business API">
          <div className="text-xs space-y-1">
            <p className="text-base font-bold text-secondary">🟢 Meta API Active</p>
            <p className="text-muted-foreground">1,240 Template Messages Sent</p>
          </div>
        </VFCard>
      </div>

      <VFCard title="Hourly Message Throughput & Latency Trend">
        <VFAreaChart
          data={[
            { hour: '08:00 AM', Push: 1200, SMS: 450, Email: 300 },
            { hour: '10:00 AM', Push: 2400, SMS: 820, Email: 640 },
            { hour: '12:00 PM', Push: 1800, SMS: 610, Email: 420 },
            { hour: '02:00 PM', Push: 2900, SMS: 940, Email: 880 },
            { hour: '04:00 PM', Push: 1500, SMS: 390, Email: 250 },
          ]}
          xKey="hour"
          dataKeys={[
            { key: 'Push', name: 'Push Alerts', color: '#16a34a' },
            { key: 'SMS', name: 'SMS DLT', color: '#f97316' },
            { key: 'Email', name: 'Email SES', color: '#0891b2' },
          ]}
          height={200}
        />
      </VFCard>
    </div>
  );

  // Submodule map — EVERY tab has its OWN clean dedicated view! No stat card repetition!
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    inbox: inboxContent,
    announcements: announcementsContent,
    chat: inboxContent,
    channels: channelsContent,
    broadcasts: announcementsContent,
    templates: announcementsContent,
    automations: announcementsContent,
    analytics: channelsContent,
    settings: announcementsContent,
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
    content: contentMap[sub.id] || announcementsContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
