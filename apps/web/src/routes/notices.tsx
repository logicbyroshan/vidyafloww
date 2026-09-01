import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFSelect,
  VFInput,
  VFTextarea,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Bell,
  Plus,
  Download,
  Send,
  Eye,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

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
  content: string;
  status: 'Published' | 'Draft' | 'Scheduled';
}

const INITIAL_NOTICES: NoticeRecord[] = [
  { id: '1', circularNo: 'CIR-2026-042', title: 'Independence Day Celebrations & Dress Code Guidelines', targetAudience: 'All School', category: 'Event', publishDate: '12 Aug 2026', deliveryStatus: '1,248 Delivered (100%)', content: 'Students are requested to assemble in formal white attire by 08:00 AM on August 15.', status: 'Published' },
  { id: '2', circularNo: 'CIR-2026-041', title: 'Term 1 Parent-Teacher Meeting (PTM) Schedule & Slots', targetAudience: 'Parents', category: 'Academic', publishDate: '10 Aug 2026', deliveryStatus: '1,142 App / 106 SMS', content: 'PTM slots are allocated roll-number wise from 09:00 AM to 01:30 PM on Saturday.', status: 'Published' },
  { id: '3', circularNo: 'CIR-2026-040', title: 'CBSE Board Examination Registration LOC Verification', targetAudience: 'Classes 9-12', category: 'Academic', publishDate: '08 Aug 2026', deliveryStatus: '620 Delivered', content: 'Class 10 & 12 guardians must review subject choices and sign LOC document by Friday.', status: 'Published' },
  { id: '4', circularNo: 'CIR-2026-039', title: 'Faculty Professional Development Workshop on NEP 2020', targetAudience: 'Teachers', category: 'Administrative', publishDate: '05 Aug 2026', deliveryStatus: '124 Staff Notified', content: 'Mandatory pedagogy seminar conducted by CBSE resource persons in the main auditorium.', status: 'Published' },
  { id: '5', circularNo: 'CIR-2026-038', title: 'Monsoon Seasonal Health Advisory & Infirmary Guidelines', targetAudience: 'Parents', category: 'Event', publishDate: '01 Aug 2026', deliveryStatus: '1,248 Delivered', content: 'Preventative guidelines regarding viral flu precautions and drinking water hygiene.', status: 'Published' },
];

function NoticesPage() {
  const { addNotification } = useGlobalStore();
  const [notices, setNotices] = React.useState<NoticeRecord[]>(INITIAL_NOTICES);
  const [audienceFilter, setAudienceFilter] = React.useState<string>('All');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('All');
  const [isPublishModalOpen, setIsPublishModalOpen] = React.useState(false);
  const [selectedNotice, setSelectedNotice] = React.useState<NoticeRecord | null>(null);

  const [newNotice, setNewNotice] = React.useState<Partial<NoticeRecord>>({
    circularNo: `CIR-2026-0${notices.length + 43}`,
    title: '',
    targetAudience: 'Parents',
    category: 'Academic',
    content: '',
    status: 'Published',
  });

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title) return;

    const added: NoticeRecord = {
      id: String(Date.now()),
      circularNo: newNotice.circularNo || `CIR-2026-0${notices.length + 43}`,
      title: newNotice.title,
      targetAudience: (newNotice.targetAudience as any) || 'Parents',
      category: (newNotice.category as any) || 'Academic',
      publishDate: 'Today',
      deliveryStatus: 'Broadcasting via SMS & App Push...',
      content: newNotice.content || 'Official circular issued by school administration.',
      status: (newNotice.status as any) || 'Published',
    };

    setNotices([added, ...notices]);
    setIsPublishModalOpen(false);
    setNewNotice({
      circularNo: `CIR-2026-0${notices.length + 44}`,
      title: '',
      targetAudience: 'Parents',
      category: 'Academic',
      content: '',
      status: 'Published',
    });
    addNotification({
      title: 'Circular Dispatched',
      description: `"${added.title}" broadcasted to ${added.targetAudience} via App & SMS.`,
      type: 'success',
    });
  };

  const handleExportArchive = () => {
    addNotification({
      title: 'Circulars Archive Exported',
      description: 'Exported notice history and recipient read receipts as CSV.',
      type: 'success',
    });
  };

  const filteredNotices = React.useMemo(() => {
    return notices.filter((n) => {
      const matchesAudience = audienceFilter === 'All' || n.targetAudience === audienceFilter;
      const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
      return matchesAudience && matchesCategory;
    });
  }, [notices, audienceFilter, categoryFilter]);

  const noticeColumns = [
    {
      header: 'Circular No',
      accessorKey: 'circularNo',
      cell: (r: NoticeRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border text-xs">
          {r.circularNo}
        </span>
      ),
    },
    {
      header: 'Notice Title & Category',
      accessorKey: 'title',
      cell: (r: NoticeRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.title}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.category} Announcement</p>
        </div>
      ),
    },
    {
      header: 'Target Audience',
      accessorKey: 'targetAudience',
      cell: (r: NoticeRecord) => (
        <VFBadge variant="outline" className="font-bold">
          {r.targetAudience}
        </VFBadge>
      ),
    },
    {
      header: 'Date Published',
      accessorKey: 'publishDate',
      cell: (r: NoticeRecord) => <span className="text-muted-foreground text-xs font-semibold">{r.publishDate}</span>,
    },
    {
      header: 'Delivery Telemetry',
      accessorKey: 'deliveryStatus',
      cell: (r: NoticeRecord) => (
        <span className="text-xs font-mono font-bold text-emerald-400">
          {r.deliveryStatus}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: NoticeRecord) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: (r: NoticeRecord) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-3.5 w-3.5" />}
          onClick={() => setSelectedNotice(r)}
        >
          View Notice
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* 1. Header Toolbar Box */}
      <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Bell className="h-4 w-4" />
          </div>
          <span className="text-base font-extrabold text-foreground tracking-tight">
            Circulars & Broadcast Hub
          </span>
          <VFBadge variant="success" className="text-[10px] font-bold font-mono">
            SMS & App Live
          </VFBadge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            onClick={handleExportArchive}
            className="h-9 px-3.5 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export Archive
          </VFButton>
          <VFButton
            size="sm"
            onClick={() => setIsPublishModalOpen(true)}
            className="h-9 px-3.5 text-xs font-bold shadow-xs"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Publish Notice
          </VFButton>
        </div>
      </div>

      {/* 2. Global Dropdown Filters Bar */}
      <div className="p-3 rounded-lg bg-[#141414] border border-border/80 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Target Audience Filter */}
          <div className="w-52">
            <VFSelect
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(String(e.target.value))}
              options={[
                { label: 'All Audiences', value: 'All' },
                { label: 'All School', value: 'All School' },
                { label: 'Parents Only', value: 'Parents' },
                { label: 'Teachers Only', value: 'Teachers' },
                { label: 'Classes 9-12', value: 'Classes 9-12' },
              ]}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>

          {/* Category Filter */}
          <div className="w-48">
            <VFSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(String(e.target.value))}
              options={[
                { label: 'All Categories', value: 'All' },
                { label: 'Academic Announcements', value: 'Academic' },
                { label: 'Events & Functions', value: 'Event' },
                { label: 'Holidays & Closures', value: 'Holiday' },
                { label: 'Administrative Policies', value: 'Administrative' },
              ]}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>
        </div>

        <span className="text-xs font-mono text-muted-foreground font-semibold">
          {filteredNotices.length} Broadcasts Recorded
        </span>
      </div>

      {/* 3. Main Data Table */}
      <VFDataTable
        columns={noticeColumns}
        data={filteredNotices}
        filterPlaceholder="Search circulars by title, circular number, category, or audience..."
      />

      {/* Publish Notice Modal */}
      <VFDialog
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Publish Official Notice / Circular"
        description="Broadcast emergency announcements, holiday schedules, and circulars instantly."
      >
        <form onSubmit={handlePublishNotice} className="space-y-3.5 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Notice Title *</label>
            <VFInput
              required
              placeholder="e.g. Schedule for Annual Science Fair & Project Exhibition"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Target Audience</label>
              <VFSelect
                value={newNotice.targetAudience || 'Parents'}
                onChange={(e) => setNewNotice({ ...newNotice, targetAudience: e.target.value as any })}
                options={[
                  { label: 'All School (Parents, Staff, Students)', value: 'All School' },
                  { label: 'Parents & Guardians Only', value: 'Parents' },
                  { label: 'Faculty & Staff Only', value: 'Teachers' },
                  { label: 'Classes 9 to 12', value: 'Classes 9-12' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Category</label>
              <VFSelect
                value={newNotice.category || 'Academic'}
                onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                options={[
                  { label: 'Academic', value: 'Academic' },
                  { label: 'Event', value: 'Event' },
                  { label: 'Holiday', value: 'Holiday' },
                  { label: 'Administrative', value: 'Administrative' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Circular Body Text & Instructions</label>
            <VFTextarea
              rows={4}
              placeholder="Enter complete circular text, instructions, and date details..."
              value={newNotice.content}
              onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
              className="bg-[#1a1a1a] border-border text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsPublishModalOpen(false)}>
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-4 w-4" />}>
              Broadcast Notice
            </VFButton>
          </div>
        </form>
      </VFDialog>

      {/* View Notice Detail Modal */}
      {selectedNotice && (
        <VFDialog
          isOpen={Boolean(selectedNotice)}
          onClose={() => setSelectedNotice(null)}
          title={`Circular: ${selectedNotice.circularNo}`}
          description={`${selectedNotice.title} · ${selectedNotice.publishDate}`}
        >
          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3.5 rounded-lg bg-[#1a1a1a] border border-border/60 space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-border/50">
                <span className="font-bold text-foreground">Target: {selectedNotice.targetAudience}</span>
                <VFBadge variant="success">{selectedNotice.category}</VFBadge>
              </div>
              <p className="text-foreground leading-relaxed font-medium pt-1">
                {selectedNotice.content}
              </p>
            </div>

            <div className="p-2.5 rounded-md bg-[#141414] border border-border/50 flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Delivery Status:</span>
              <span className="font-mono font-bold text-emerald-400">{selectedNotice.deliveryStatus}</span>
            </div>

            <div className="flex justify-end pt-3 border-t border-border/50">
              <VFButton size="sm" onClick={() => setSelectedNotice(null)}>
                Close Notice
              </VFButton>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
