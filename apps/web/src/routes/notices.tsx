import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Bell,
  Send,
  CheckCircle2,
  Plus,
  Download,
} from 'lucide-react';

export const Route = createFileRoute('/notices')({
  component: NoticesPage,
});

interface NoticeRecord {
  id: string;
  circularNo: string;
  title: string;
  targetAudience: 'All School' | 'Parents' | 'Teachers' | 'Classes 9-12';
  category: 'Academic' | 'Holiday' | 'Event' | 'Administrative';
  publishDate: string;
  deliveryStatus: string;
  status: 'Published' | 'Draft' | 'Scheduled';
}

function NoticesPage() {
  const [noticeAlert, setNoticeAlert] = React.useState<string | null>(null);
  const [showPublisher, setShowPublisher] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newContent, setNewContent] = React.useState('');
  const [targetAudience, setTargetAudience] = React.useState<'All School' | 'Parents' | 'Teachers'>('Parents');

  const [noticeData, setNoticeData] = React.useState<NoticeRecord[]>([
    { id: '1', circularNo: 'CIR-2026-042', title: 'Independence Day Celebrations & Dress Code', targetAudience: 'All School', category: 'Event', publishDate: '12 Aug 2026', deliveryStatus: '1,248 Delivered (100%)', status: 'Published' },
    { id: '2', circularNo: 'CIR-2026-041', title: 'Term 1 Parent-Teacher Meeting (PTM) Schedule', targetAudience: 'Parents', category: 'Academic', publishDate: '10 Aug 2026', deliveryStatus: '1,142 App / 106 SMS', status: 'Published' },
    { id: '3', circularNo: 'CIR-2026-040', title: 'CBSE Board Examination Registration Guidelines (Class 10 & 12)', targetAudience: 'Classes 9-12', category: 'Academic', publishDate: '08 Aug 2026', deliveryStatus: '620 Delivered', status: 'Published' },
    { id: '4', circularNo: 'CIR-2026-039', title: 'Staff Faculty Development Workshop on AI in Pedagogy', targetAudience: 'Teachers', category: 'Administrative', publishDate: '05 Aug 2026', deliveryStatus: '124 Staff Notified', status: 'Published' },
  ]);

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRecord: NoticeRecord = {
      id: String(Date.now()),
      circularNo: `CIR-2026-0${noticeData.length + 43}`,
      title: newTitle.trim(),
      targetAudience,
      category: 'Academic',
      publishDate: 'Today',
      deliveryStatus: 'Broadcasting via SMS & App...',
      status: 'Published',
    };

    setNoticeData([newRecord, ...noticeData]);
    setNewTitle('');
    setNewContent('');
    setShowPublisher(false);
    setNoticeAlert(`Notice "${newRecord.title}" published and dispatched to ${targetAudience}.`);
  };

  const noticeColumns = [
    {
      header: 'Circular No',
      accessorKey: 'circularNo',
      cell: (r: NoticeRecord) => <span className="font-mono font-bold text-primary text-base">{r.circularNo}</span>,
    },
    {
      header: 'Notice Title & Subject',
      accessorKey: 'title',
      cell: (r: NoticeRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-base leading-tight">{r.title}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.category} Circular</p>
        </div>
      ),
    },
    {
      header: 'Target Audience',
      accessorKey: 'targetAudience',
      cell: (r: NoticeRecord) => <VFBadge variant="outline">{r.targetAudience}</VFBadge>,
    },
    {
      header: 'Date Published',
      accessorKey: 'publishDate',
      cell: (r: NoticeRecord) => <span className="text-muted-foreground text-base font-semibold">{r.publishDate}</span>,
    },
    {
      header: 'Delivery Broadcast',
      accessorKey: 'deliveryStatus',
      cell: (r: NoticeRecord) => <span className="font-bold text-success text-base">{r.deliveryStatus}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: NoticeRecord) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
  ];

  // 1. Notice Board View
  const boardContent = (
    <div className="space-y-6">
      {noticeAlert && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-base text-foreground flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
            <span className="font-bold">{noticeAlert}</span>
          </div>
          <button
            onClick={() => setNoticeAlert(null)}
            className="text-muted-foreground hover:text-foreground text-sm font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* 4 Enclosed Top Metric KPI Cards */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/90 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Active Circulars</span>
            <span className="text-2xl font-black text-foreground mt-1 block">42 Published</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">This Academic Year</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Broadcast Reach</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">1,372 Users</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">Parents, Staff & Students</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">SMS Gateway Status</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">99.8% Sent</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Twilio & Gupshup Live</span>
          </div>
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Parent Read Rate</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">94.2%</span>
            <span className="text-[11px] text-muted-foreground mt-0.5 block">Within 24 Hours</span>
          </div>
        </div>
      </div>

      {/* Create Circular Box / Modal Trigger */}
      {showPublisher && (
        <VFCard title="Publish New Institutional Notice / Circular" description="Broadcast announcements to parents, teachers, or students instantly">
          <form onSubmit={handlePublishNotice} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <label className="text-sm font-black text-foreground uppercase tracking-wider">
                Notice Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Schedule for Annual Sports Day Trials & Practice Sessions"
                className="w-full px-4 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground font-semibold h-11"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-black text-foreground uppercase tracking-wider">
                  Target Audience
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-3 py-2 text-base border border-border rounded-lg bg-card text-foreground font-bold h-11"
                >
                  <option value="All School">All School (Parents, Staff, Students)</option>
                  <option value="Parents">Parents & Guardians Only</option>
                  <option value="Teachers">Faculty & Staff Only</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-black text-foreground uppercase tracking-wider">
                  Dispatch Channels
                </label>
                <div className="flex items-center gap-3 pt-2 text-base font-bold text-foreground">
                  <span className="text-sm bg-primary/15 text-primary px-2.5 py-1 rounded-md">Mobile App Push</span>
                  <span className="text-sm bg-success/15 text-success px-2.5 py-1 rounded-md">SMS Gateway</span>
                  <span className="text-sm bg-muted px-2.5 py-1 rounded-md">WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-black text-foreground uppercase tracking-wider">
                Notice Circular Content
              </label>
              <textarea
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Enter complete circular text, instructions, and date details..."
                className="w-full px-4 py-2.5 text-base border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground font-medium"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <VFButton type="submit" size="sm" leftIcon={<Send className="h-4 w-4" />}>
                Broadcast Notice Now
              </VFButton>
              <VFButton type="button" size="sm" variant="outline" onClick={() => setShowPublisher(false)}>
                Cancel
              </VFButton>
            </div>
          </form>
        </VFCard>
      )}

      {/* Main Notice Register Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-foreground tracking-tight">Institutional Notice Register</h2>
            <p className="text-sm text-muted-foreground font-medium">Broadcasted announcements, circular logs, and parent delivery status</p>
          </div>
          <div className="flex items-center gap-2.5">
            <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export Archive
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowPublisher(true)}>
              Publish Notice
            </VFButton>
          </div>
        </div>

        <VFDataTable
          columns={noticeColumns}
          data={noticeData}
          filterPlaceholder="Search circulars by title, number, or category..."
        />
      </div>
    </div>
  );

  const tabs = [
    { id: 'board', label: 'Notice Board & Circulars', icon: <Bell className="h-4 w-4" />, content: boardContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="board" variant="top-bar" />
    </VFPageContainer>
  );
}
