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
  VFDrawer,
} from '@vidyafloww/ui';
import {
  Download,
  Send,
  Eye,
  Users,
  Radio,
  CheckCircle2,
  X,
  Smartphone,
  Mail,
  Bell,
  GraduationCap,
  User,
  Layers,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/notices')({
  component: NoticesPage,
});

interface NoticeRecord {
  id: string;
  circularNo: string;
  title: string;
  targetAudience: string;
  category: 'Academic' | 'Holiday' | 'Event' | 'Administrative';
  publishDate: string;
  deliveryStatus: string;
  content: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  priority?: 'Normal' | 'High' | 'Urgent';
}

const AUDIENCE_STATS: Record<string, { label: string; count: number; desc: string; icon: 'users' | 'parents' | 'teachers' | 'wing' | 'class' | 'person' }> = {
  'All School': { label: 'All School Community', count: 1248, desc: 'Every parent, faculty member, and enrolled student', icon: 'users' },
  'Parents': { label: 'Parents & Guardians', count: 1080, desc: 'Registered primary family mobile contacts', icon: 'parents' },
  'Teachers': { label: 'Faculty & Educators', count: 124, desc: 'All teaching staff, HODs, and administrators', icon: 'teachers' },
  'Classes 9-12': { label: 'Senior Secondary Wing', count: 420, desc: 'Classes 9, 10, 11, and 12 pupils & guardians', icon: 'wing' },
  'Custom Class': { label: 'Specific Class / Section', count: 42, desc: 'Target students & parents of a designated section', icon: 'class' },
  'Individual': { label: 'Single Person / Direct', count: 1, desc: 'Direct confidential notice to an individual student/staff', icon: 'person' },
};

const INDIVIDUAL_DIRECTORY = [
  { id: 'ADM-2026-001', name: 'Aarav Sharma', role: 'Student' as const, details: 'Class 10-A · Roll #101' },
  { id: 'ADM-2026-002', name: 'Diya Patel', role: 'Student' as const, details: 'Class 10-A · Roll #102' },
  { id: 'ADM-2026-003', name: 'Rohan Verma', role: 'Student' as const, details: 'Class 10-B · Roll #103' },
  { id: 'ADM-2026-004', name: 'Ananya Iyer', role: 'Student' as const, details: 'Class 11-Sci · Roll #104' },
  { id: 'ADM-2026-005', name: 'Kabir Mehta', role: 'Student' as const, details: 'Class 11-Com · Roll #105' },
  { id: 'ADM-2026-006', name: 'Meera Nair', role: 'Student' as const, details: 'Class 12-Sci · Roll #106' },
  { id: 'PAR-2026-001', name: 'Mr. Ramesh Sharma (Guardian)', role: 'Parent' as const, details: 'Guardian of Aarav Sharma (10-A)' },
  { id: 'PAR-2026-002', name: 'Dr. K. Patel (Guardian)', role: 'Parent' as const, details: 'Guardian of Diya Patel (10-A)' },
  { id: 'PAR-2026-003', name: 'Mr. S. Verma (Guardian)', role: 'Parent' as const, details: 'Guardian of Rohan Verma (10-B)' },
  { id: 'PAR-2026-004', name: 'Mrs. V. Iyer (Guardian)', role: 'Parent' as const, details: 'Guardian of Ananya Iyer (11-Sci)' },
  { id: 'FAC-001', name: 'Dr. Rajesh Sharma (Principal)', role: 'Teacher' as const, details: 'Executive Directorate' },
  { id: 'FAC-010', name: 'Dr. Meenakshi Sundaram (HOD)', role: 'Teacher' as const, details: 'Physics & Science' },
  { id: 'FAC-014', name: 'Mr. Arvind Rao (Senior Faculty)', role: 'Teacher' as const, details: 'Mathematics' },
  { id: 'FAC-018', name: 'Mrs. Kavita Singh (Faculty)', role: 'Teacher' as const, details: 'English & Humanities' },
  { id: 'FAC-022', name: 'Mr. Sameer Khan (Coordinator)', role: 'Teacher' as const, details: 'Computer Science & AI' },
];

const INITIAL_NOTICES: NoticeRecord[] = [
  { id: '1', circularNo: 'CIR-2026-042', title: 'Independence Day Celebrations & Dress Code Guidelines', targetAudience: 'All School', category: 'Event', publishDate: '12 Aug 2026', deliveryStatus: '1,248 Delivered (100%)', content: 'Students are requested to assemble in formal white attire by 08:00 AM on August 15.', status: 'Published', priority: 'High' },
  { id: '2', circularNo: 'CIR-2026-041', title: 'Term 1 Parent-Teacher Meeting (PTM) Schedule & Slots', targetAudience: 'Parents', category: 'Academic', publishDate: '10 Aug 2026', deliveryStatus: '1,142 App / 106 SMS', content: 'PTM slots are allocated roll-number wise from 09:00 AM to 01:30 PM on Saturday.', status: 'Published', priority: 'Normal' },
  { id: '3', circularNo: 'CIR-2026-040', title: 'CBSE Board Examination Registration LOC Verification', targetAudience: 'Classes 9-12', category: 'Academic', publishDate: '08 Aug 2026', deliveryStatus: '620 Delivered', content: 'Class 10 & 12 guardians must review subject choices and sign LOC document by Friday.', status: 'Published', priority: 'Urgent' },
  { id: '4', circularNo: 'CIR-2026-039', title: 'Faculty Professional Development Workshop on NEP 2020', targetAudience: 'Teachers', category: 'Administrative', publishDate: '05 Aug 2026', deliveryStatus: '124 Staff Notified', content: 'Mandatory pedagogy seminar conducted by CBSE resource persons in the main auditorium.', status: 'Published', priority: 'Normal' },
  { id: '5', circularNo: 'CIR-2026-038', title: 'Monsoon Seasonal Health Advisory & Infirmary Guidelines', targetAudience: 'Parents', category: 'Event', publishDate: '01 Aug 2026', deliveryStatus: '1,248 Delivered', content: 'Preventative guidelines regarding viral flu precautions and drinking water hygiene.', status: 'Published', priority: 'Normal' },
];

function NoticesPage() {
  const { addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';
  React.useEffect(() => { document.title = t('page.notices') + ' – VidyaFloww'; }, [t]);
  const [notices, setNotices] = React.useState<NoticeRecord[]>(INITIAL_NOTICES);
  const [audienceFilter, setAudienceFilter] = React.useState<string>('All');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('All');
  const [isBroadcastDrawerOpen, setIsBroadcastDrawerOpen] = React.useState(false);
  const [selectedNotice, setSelectedNotice] = React.useState<NoticeRecord | null>(null);

  // Broadcast Drawer Form State
  const [targetAudience, setTargetAudience] = React.useState<string>('All School');
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 10');
  const [selectedSection, setSelectedSection] = React.useState<string>('A');
  const [individualRole, setIndividualRole] = React.useState<'Student' | 'Parent' | 'Teacher'>('Student');
  const [individualId, setIndividualId] = React.useState<string>('ADM-2026-001');

  const [noticeCategory, setNoticeCategory] = React.useState<NoticeRecord['category']>('Academic');
  const [noticePriority, setNoticePriority] = React.useState<'Normal' | 'High' | 'Urgent'>('Normal');
  const [noticeTitle, setNoticeTitle] = React.useState('');
  const [noticeContent, setNoticeContent] = React.useState('');
  const [channels, setChannels] = React.useState<{ app: boolean; sms: boolean; portal: boolean }>({
    app: true,
    sms: true,
    portal: true,
  });

  const activeRecipientCount = targetAudience === 'Custom Class'
    ? (selectedSection === 'All' ? 120 : 42)
    : targetAudience === 'Individual'
    ? 1
    : (AUDIENCE_STATS[targetAudience]?.count || 1248);

  const activeAudienceLabel = targetAudience === 'Custom Class'
    ? `${selectedClass}${selectedSection !== 'All' ? `-${selectedSection}` : ' (All Sections)'}`
    : targetAudience === 'Individual'
    ? `${INDIVIDUAL_DIRECTORY.find((p) => p.id === individualId)?.name || 'Direct Recipient'}`
    : (AUDIENCE_STATS[targetAudience]?.label || targetAudience);

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    const enabledChannelNames = [];
    if (channels.app) enabledChannelNames.push('App Push');
    if (channels.sms) enabledChannelNames.push('SMS');
    if (channels.portal) enabledChannelNames.push('Web Notice');

    const added: NoticeRecord = {
      id: String(Date.now()),
      circularNo: `CIR-2026-0${notices.length + 43}`,
      title: noticeTitle.trim(),
      targetAudience: activeAudienceLabel,
      category: noticeCategory,
      priority: noticePriority,
      publishDate: 'Today, Just Now',
      deliveryStatus: `${activeRecipientCount.toLocaleString()} Delivered (${enabledChannelNames.join(' · ')})`,
      content: noticeContent.trim() || 'Official administrative circular dispatched to designated recipients.',
      status: 'Published',
    };

    setNotices([added, ...notices]);
    setIsBroadcastDrawerOpen(false);

    // Reset Form
    setNoticeTitle('');
    setNoticeContent('');
    setNoticePriority('Normal');
    setTargetAudience('All School');

    addNotification({
      title: isHindi ? 'सर्कुलर भेजा गया' : 'Notice Dispatched',
      description: `"${added.title}" delivered to ${activeRecipientCount} recipient(s) (${activeAudienceLabel}) via ${enabledChannelNames.join(', ')}.`,
      type: 'success',
    });
  };

  const handleExportArchive = () => {
    addNotification({
      title: isHindi ? 'सर्कुलर आर्काइव एक्सपोर्ट किया गया' : 'Circulars Archive Exported',
      description: 'Exported notice history and recipient read receipts as CSV.',
      type: 'success',
    });
  };

  const filteredNotices = React.useMemo(() => {
    return notices.filter((n) => {
      const matchesAudience =
        audienceFilter === 'All' ||
        n.targetAudience === audienceFilter ||
        n.targetAudience.toLowerCase().includes(audienceFilter.toLowerCase()) ||
        (audienceFilter === 'Custom Class' && n.targetAudience.includes('Class')) ||
        (audienceFilter === 'Individual' && (n.targetAudience.includes('Direct') || INDIVIDUAL_DIRECTORY.some((p) => n.targetAudience.includes(p.name))));
      const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
      return matchesAudience && matchesCategory;
    });
  }, [notices, audienceFilter, categoryFilter]);

  const noticeColumns = [
    {
      header: isHindi ? 'सर्कुलर नं.' : 'Circular No',
      accessorKey: 'circularNo',
      cell: (r: NoticeRecord) => (
        <span className="font-mono font-bold text-foreground bg-[#181818] px-2.5 py-1 rounded-[3px] border border-border/80 text-xs">
          {r.circularNo}
        </span>
      ),
    },
    {
      header: isHindi ? 'नोटिस शीर्षक व श्रेणी' : 'Notice Title & Category',
      accessorKey: 'title',
      cell: (r: NoticeRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight flex items-center gap-1.5">
            {r.title}
            {r.priority === 'Urgent' && (
              <span className="px-1.5 py-0.5 rounded-[2px] bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/30">
                URGENT
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">
            {r.category} {isHindi ? 'सूचना' : 'Circular'}
          </p>
        </div>
      ),
    },
    {
      header: isHindi ? 'लक्षित वर्ग' : 'Target Audience',
      accessorKey: 'targetAudience',
      cell: (r: NoticeRecord) => (
        <VFBadge variant={r.targetAudience === 'All School' ? 'default' : 'outline'} className="font-bold text-xs">
          {r.targetAudience}
        </VFBadge>
      ),
    },
    {
      header: isHindi ? 'प्रकाशन तिथि' : 'Date Published',
      accessorKey: 'publishDate',
      cell: (r: NoticeRecord) => <span className="text-muted-foreground text-xs font-semibold">{r.publishDate}</span>,
    },
    {
      header: isHindi ? 'डिलीवरी स्थिति' : 'Delivery Telemetry',
      accessorKey: 'deliveryStatus',
      cell: (r: NoticeRecord) => (
        <span className="text-xs font-mono font-bold text-emerald-400">
          {r.deliveryStatus}
        </span>
      ),
    },
    {
      header: t('col.status'),
      accessorKey: 'status',
      cell: (r: NoticeRecord) => <VFBadge variant="success">{isHindi ? 'प्रकाशित' : r.status}</VFBadge>,
    },
    {
      header: t('col.action'),
      accessorKey: 'action',
      cell: (r: NoticeRecord) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-3.5 w-3.5" />}
          className="h-7 px-2.5 text-xs font-bold rounded-[4px]"
          onClick={() => setSelectedNotice(r)}
        >
          {isHindi ? 'देखें' : 'View Circular'}
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* Main Broadcasts Data Table with Integrated Toolbar & Filters */}
      <VFDataTable
        columns={noticeColumns}
        data={filteredNotices}
        filterPlaceholder={isHindi ? "सर्कुलर, शीर्षक या कोड खोजें..." : "Search circulars by title, code, category..."}
        rightActions={
          <div className="flex flex-wrap items-center gap-2">
            <VFSelect
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(String(e.target.value))}
              options={[
                { label: isHindi ? 'सभी दर्शक' : 'All Audiences', value: 'All' },
                { label: isHindi ? 'पूरा स्कूल' : 'All School', value: 'All School' },
                { label: isHindi ? 'अभिभावक' : 'Parents', value: 'Parents' },
                { label: isHindi ? 'शिक्षक' : 'Teachers', value: 'Teachers' },
                { label: 'Classes 9-12', value: 'Classes 9-12' },
              ]}
              className="w-32 sm:w-36 bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
            />

            <VFSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(String(e.target.value))}
              options={[
                { label: isHindi ? 'सभी श्रेणियां' : 'All Categories', value: 'All' },
                { label: isHindi ? 'शैक्षणिक' : 'Academic', value: 'Academic' },
                { label: isHindi ? 'कार्यक्रम' : 'Events', value: 'Event' },
                { label: isHindi ? 'अवकाश' : 'Holidays', value: 'Holiday' },
                { label: isHindi ? 'प्रशासनिक' : 'Admin', value: 'Administrative' },
              ]}
              className="w-32 sm:w-36 bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
            />

            <VFButton
              size="sm"
              variant="outline"
              onClick={handleExportArchive}
              className="h-8 px-2.5 text-xs font-bold rounded-[4px]"
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              {t('action.export')}
            </VFButton>

            <VFButton
              size="sm"
              onClick={() => setIsBroadcastDrawerOpen(true)}
              className="h-8 px-3 text-xs font-bold rounded-[4px] shadow-xs"
              leftIcon={<Send className="h-3.5 w-3.5" />}
            >
              {isHindi ? 'नोटिस भेजें' : 'Send Notice'}
            </VFButton>
          </div>
        }
      />

      {/* ──────────────────────────────────────────────────────────────────────────
          SEND NOTICE / CIRCULAR SIDE DRAWER
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDrawer
        isOpen={isBroadcastDrawerOpen}
        onClose={() => setIsBroadcastDrawerOpen(false)}
        title={isHindi ? 'नोटिस भेजें' : 'Send Notice'}
        description={isHindi ? 'छात्रों, अभिभावकों व शिक्षकों को त्वरित आधिकारिक सूचना प्रेषित करें।' : 'Dispatch institutional announcements across mobile app push, SMS, and portal feed.'}
        className="max-w-xl bg-[#0d0d0d] border-l border-border/90"
        bodyClassName="p-5 space-y-4 text-xs no-scrollbar"
        headerActions={
          <button
            onClick={() => setIsBroadcastDrawerOpen(false)}
            className="p-1.5 rounded-[4px] text-muted-foreground hover:text-foreground hover:bg-[#1f1f1f] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        }
        footerActions={
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-mono text-emerald-400 font-bold whitespace-nowrap">
                ✓ {activeRecipientCount.toLocaleString()} Recipient{activeRecipientCount > 1 ? 's' : ''}
              </span>
              <span className="text-muted-foreground text-[11px]">·</span>
              <span className="text-muted-foreground text-[11px] truncate max-w-[200px]" title={activeAudienceLabel}>
                {activeAudienceLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <VFButton
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold rounded-[4px]"
                onClick={() => setIsBroadcastDrawerOpen(false)}
              >
                Cancel
              </VFButton>
              <VFButton
                size="sm"
                className="h-8 px-4 text-xs font-bold rounded-[4px] shadow-xs"
                leftIcon={<Send className="h-3.5 w-3.5" />}
                onClick={handlePublishNotice}
              >
                {isHindi ? 'नोटिस भेजें' : 'Send Notice'}
              </VFButton>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Section 1: Target Audience Selection Card */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground tracking-wide">
                1. {isHindi ? 'लक्षित समूह चुनें *' : 'Target Audience *'}
              </span>
              <button
                type="button"
                onClick={() => setTargetAudience('All School')}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-[3px] border transition-colors cursor-pointer ${
                  targetAudience === 'All School'
                    ? 'bg-zinc-800 text-foreground border-zinc-500'
                    : 'bg-[#1a1a1a] text-muted-foreground border-border/70 hover:text-foreground hover:border-border'
                }`}
              >
                ⚡ {isHindi ? 'संपूर्ण विद्यालय (सभी)' : 'Whole School (All)'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(AUDIENCE_STATS) as NoticeRecord['targetAudience'][]).map((aud) => {
                const info = AUDIENCE_STATS[aud];
                const isSelected = targetAudience === aud;
                const getIcon = () => {
                  if (aud === 'Teachers') return <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />;
                  if (aud === 'Custom Class' || aud === 'Classes 9-12') return <Layers className="h-3.5 w-3.5 text-muted-foreground" />;
                  if (aud === 'Individual') return <User className="h-3.5 w-3.5 text-muted-foreground" />;
                  return <Users className="h-3.5 w-3.5 text-muted-foreground" />;
                };
                return (
                  <button
                    key={aud}
                    type="button"
                    onClick={() => setTargetAudience(aud)}
                    className={`p-2.5 rounded-[4px] border text-left flex flex-col justify-between gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1c1c1c] border-zinc-400 text-foreground shadow-xs ring-1 ring-zinc-500/20'
                        : 'bg-[#181818] border-border/70 text-muted-foreground hover:text-foreground hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {getIcon()}
                        <span className="font-bold text-xs text-foreground">{info.label}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">{info.desc}</p>
                    <span className="font-mono text-[10px] font-bold text-muted-foreground">
                      {aud === 'Custom Class'
                        ? `${activeRecipientCount} ${isHindi ? 'छात्र (कक्षा अनुसार)' : 'Selected Students'}`
                        : aud === 'Individual'
                        ? `1 ${isHindi ? 'गोपनीय प्राप्तकर्ता' : 'Direct Recipient'}`
                        : `${info.count.toLocaleString()} ${isHindi ? 'सक्रिय प्राप्तकर्ता' : 'Active Recipients'}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Class Selection Sub-panel */}
            {targetAudience === 'Custom Class' && (
              <div className="p-3 rounded-[4px] bg-[#1a1a1a] border border-border/70 space-y-2.5 mt-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                    {isHindi ? 'कक्षा और सेक्शन निर्दिष्ट करें' : 'Designate Class & Section'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] bg-zinc-800 border border-border text-emerald-400 font-bold">
                    ~{activeRecipientCount} Students Targeted
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-muted-foreground block">
                      {isHindi ? 'कक्षा चुनें' : 'Select Class'}
                    </label>
                    <VFSelect
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(String(e.target.value))}
                      options={[
                        { label: 'Class 6', value: 'Class 6' },
                        { label: 'Class 7', value: 'Class 7' },
                        { label: 'Class 8', value: 'Class 8' },
                        { label: 'Class 9', value: 'Class 9' },
                        { label: 'Class 10', value: 'Class 10' },
                        { label: 'Class 11', value: 'Class 11' },
                        { label: 'Class 12', value: 'Class 12' },
                      ]}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-muted-foreground block">
                      {isHindi ? 'सेक्शन चुनें' : 'Select Section'}
                    </label>
                    <VFSelect
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(String(e.target.value))}
                      options={[
                        { label: 'All Sections (A+B+C)', value: 'All' },
                        { label: 'Section A (42 Students)', value: 'A' },
                        { label: 'Section B (40 Students)', value: 'B' },
                        { label: 'Section C (38 Students)', value: 'C' },
                      ]}
                      className="w-full"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="text-zinc-400">ℹ</span> Notice will be pushed specifically to parents and students registered under <strong className="text-foreground">{selectedClass} - Section {selectedSection}</strong>.
                </p>
              </div>
            )}

            {/* Individual Selection Sub-panel */}
            {targetAudience === 'Individual' && (
              <div className="p-3 rounded-[4px] bg-[#1a1a1a] border border-border/70 space-y-2.5 mt-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    {isHindi ? 'व्यक्तिगत प्राप्तकर्ता खोजें' : 'Individual Confidential Recipient'}
                  </span>
                  <div className="flex items-center gap-1">
                    {(['Student', 'Parent', 'Teacher'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setIndividualRole(r);
                          const first = INDIVIDUAL_DIRECTORY.find((item) => item.role === r);
                          if (first) setIndividualId(first.id);
                        }}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-[3px] border transition-colors cursor-pointer ${
                          individualRole === r
                            ? 'bg-zinc-700 text-foreground border-zinc-500'
                            : 'bg-zinc-900 text-muted-foreground border-border hover:text-foreground'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-muted-foreground block">
                    {isHindi ? `${individualRole} चुनें` : `Select ${individualRole}`}
                  </label>
                  <VFSelect
                    value={individualId}
                    onChange={(e) => setIndividualId(String(e.target.value))}
                    options={INDIVIDUAL_DIRECTORY.filter((i) => i.role === individualRole).map((i) => ({
                      label: `${i.name} — ${i.details}`,
                      value: i.id,
                    }))}
                    className="w-full"
                  />
                </div>

                <div className="p-2 rounded-[3px] bg-zinc-900/80 border border-border/50 text-[10px] text-muted-foreground flex items-center justify-between">
                  <span>
                    🔒 1-to-1 Private Dispatch · Dispatches directly to registered phone & portal inbox
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Category, Priority & Channels Card */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <span className="text-xs font-bold text-foreground tracking-wide block">
              2. {isHindi ? 'श्रेणी व प्रेषण माध्यम' : 'Classification & Channels'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground block">
                  {isHindi ? 'सर्कुलर श्रेणी' : 'Circular Category'}
                </label>
                <VFSelect
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value as any)}
                  options={[
                    { label: 'Academic Notice', value: 'Academic' },
                    { label: 'Event / Function', value: 'Event' },
                    { label: 'Holiday Announcement', value: 'Holiday' },
                    { label: 'Administrative Memo', value: 'Administrative' },
                  ]}
                  className="w-full"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground block">
                  {isHindi ? 'प्राथमिकता स्तर' : 'Priority Level'}
                </label>
                <VFSelect
                  value={noticePriority}
                  onChange={(e) => setNoticePriority(e.target.value as any)}
                  options={[
                    { label: 'Normal Circular', value: 'Normal' },
                    { label: 'High Priority', value: 'High' },
                    { label: 'Urgent Alert', value: 'Urgent' },
                  ]}
                  className="w-full"
                />
              </div>
            </div>

            {/* Delivery Mediums */}
            <div className="p-2.5 rounded-[4px] bg-[#181818] border border-border/60 flex flex-wrap items-center justify-between gap-2.5 mt-1">
              <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-muted-foreground" />
                {isHindi ? 'प्रेषण माध्यम:' : 'Dispatch Mediums:'}
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={channels.app}
                    onChange={(e) => setChannels({ ...channels, app: e.target.checked })}
                    className="rounded-[2px] accent-primary"
                  />
                  <Smartphone className="h-3 w-3 text-muted-foreground" />
                  <span>Mobile App</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={channels.sms}
                    onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                    className="rounded-[2px] accent-primary"
                  />
                  <Bell className="h-3 w-3 text-muted-foreground" />
                  <span>SMS Gateway</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={channels.portal}
                    onChange={(e) => setChannels({ ...channels, portal: e.target.checked })}
                    className="rounded-[2px] accent-primary"
                  />
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span>Portal Feed</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Notice Content Card */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <span className="text-xs font-bold text-foreground tracking-wide block">
              3. {isHindi ? 'नोटिस विषय व विवरण *' : 'Notice Subject & Content *'}
            </span>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground">
                {isHindi ? 'नोटिस शीर्षक / विषय लाइन *' : 'Notice Subject Line *'}
              </label>
              <VFInput
                required
                placeholder="e.g. Schedule for Annual Sports Day & Athletic Meet 2026"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                className="bg-[#181818] border-border h-9 text-xs rounded-[4px]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold text-muted-foreground">
                  {isHindi ? 'सर्कुलर का संपूर्ण विवरण *' : 'Circular Body & Instructions *'}
                </label>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {noticeContent.length} chars
                </span>
              </div>
              <VFTextarea
                rows={5}
                placeholder="Type complete notice text, reporting timings, guidelines, uniform instructions, or emergency details here..."
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                className="bg-[#181818] border-border text-xs rounded-[4px] leading-relaxed min-h-[110px]"
              />
            </div>
          </div>
        </div>
      </VFDrawer>

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
