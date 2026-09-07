import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFStatCard,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  MessageSquareWarning,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  TrendingUp,
  BarChart3,
  Check,
} from 'lucide-react';

export const Route = createFileRoute('/complaints')({
  component: ComplaintsManagementPage,
});

interface GrievanceTicket {
  id: string;
  complainantType: 'Parent' | 'Student' | 'Faculty' | 'Staff';
  complainantName: string;
  category: 'Transport' | 'Academics' | 'Hostel' | 'Fees & Accounts' | 'Facilities';
  subject: string;
  description: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  lodgedDate: string;
  assignedOfficer: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  resolutionNotes?: string;
  expectedSLA: string;
}

const INITIAL_GRIEVANCES: GrievanceTicket[] = [
  {
    id: 'TKT-2026-089',
    complainantType: 'Parent',
    complainantName: 'Sunil Verma (Priya’s Father)',
    category: 'Transport',
    subject: 'Bus Route 2 morning arrival delayed by 15 mins near Preet Vihar',
    description: 'Bus Route 2 arrived at 07:35 AM instead of scheduled 07:20 AM due to roadblock.',
    priority: 'High',
    lodgedDate: 'Today, 08:45 AM',
    assignedOfficer: 'Transport Head (Surender Rawat)',
    status: 'In Progress',
    resolutionNotes: 'Driver contacted; alternate diversion route via Vikas Marg mapped.',
    expectedSLA: 'Today, 04:00 PM',
  },
  {
    id: 'TKT-2026-088',
    complainantType: 'Student',
    complainantName: 'Rahul Sharma (Class 10-A)',
    category: 'Hostel',
    subject: 'Room A-101 AC thermostat requires servicing',
    description: 'Air conditioning cooling reduced in afternoon hours.',
    priority: 'Medium',
    lodgedDate: 'Yesterday, 04:30 PM',
    assignedOfficer: 'Hostel Warden (R. K. Saxena)',
    status: 'In Progress',
    resolutionNotes: 'HVAC technician scheduled for maintenance today at 03:00 PM.',
    expectedSLA: 'Tomorrow, 12:00 PM',
  },
  {
    id: 'TKT-2026-085',
    complainantType: 'Parent',
    complainantName: 'Meenakshi Iyer (Aditya’s Mother)',
    category: 'Fees & Accounts',
    subject: 'Online fee receipt duplicate generated for Term 2 tuition',
    description: 'Bank deduction occurred once but portal shows unverified status.',
    priority: 'Urgent',
    lodgedDate: '05 Sep 2026',
    assignedOfficer: 'Chief Accounts Officer',
    status: 'Resolved',
    resolutionNotes: 'Bank gateway reference reconciled. Official receipt #VF-9021 issued.',
    expectedSLA: 'Resolved on time',
  },
  {
    id: 'TKT-2026-082',
    complainantType: 'Faculty',
    complainantName: 'Dr. Sarah Connor (Physics)',
    category: 'Academics',
    subject: 'Lab 204 Ray Optics light source replacement needed',
    description: '3 sodium vapor discharge lamps flickering during class experiments.',
    priority: 'Medium',
    lodgedDate: '02 Sep 2026',
    assignedOfficer: 'Academic Dean & Store Manager',
    status: 'Resolved',
    resolutionNotes: 'New optical replacement lamps fitted and certified.',
    expectedSLA: 'Resolved on time',
  },
  {
    id: 'TKT-2026-079',
    complainantType: 'Student',
    complainantName: 'Sneha Patel (Class 11-Sci)',
    category: 'Facilities',
    subject: 'Library Quiet Zone seating addition request',
    description: 'Peak evening hours require 6 additional study carrels near Reference Section.',
    priority: 'Low',
    lodgedDate: '29 Aug 2026',
    assignedOfficer: 'Head Librarian',
    status: 'Resolved',
    resolutionNotes: '8 ergonomic study cubicles installed in Wing B.',
    expectedSLA: 'Resolved on time',
  },
];

function ComplaintsManagementPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'शिकायतें व निवारण' : 'Complaints & Grievances') + ' – VidyaFloww';
  }, [isHindi]);

  const [grievances, setGrievances] = React.useState<GrievanceTicket[]>(INITIAL_GRIEVANCES);
  const [statusFilter, setStatusFilter] = React.useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('All');
  const [searchGrievance, setSearchGrievance] = React.useState('');

  const [isLodgeModalOpen, setIsLodgeModalOpen] = React.useState(false);
  const [viewingTicket, setViewingTicket] = React.useState<GrievanceTicket | null>(null);

  // New Grievance form
  const [complainantName, setComplainantName] = React.useState('');
  const [complainantType, setComplainantType] = React.useState<'Parent' | 'Student' | 'Faculty' | 'Staff'>('Parent');
  const [ticketCategory, setTicketCategory] = React.useState<'Transport' | 'Academics' | 'Hostel' | 'Fees & Accounts' | 'Facilities'>('Transport');
  const [ticketSubject, setTicketSubject] = React.useState('');
  const [ticketPriority, setTicketPriority] = React.useState<'Urgent' | 'High' | 'Medium' | 'Low'>('High');
  const [ticketDesc, setTicketDesc] = React.useState('');

  const handleLodgeComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !complainantName.trim()) return;

    const newTicket: GrievanceTicket = {
      id: `TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
      complainantType,
      complainantName: complainantName.trim(),
      category: ticketCategory,
      subject: ticketSubject.trim(),
      description: ticketDesc.trim() || ticketSubject.trim(),
      priority: ticketPriority,
      lodgedDate: 'Today, Just now',
      assignedOfficer: `${ticketCategory} In-Charge Officer`,
      status: 'Open',
      expectedSLA: ticketPriority === 'Urgent' ? 'Within 24 Hours' : 'Within 48 Hours',
    };

    setGrievances([newTicket, ...grievances]);
    setIsLodgeModalOpen(false);
    setTicketSubject('');
    setComplainantName('');
    setTicketDesc('');
    addNotification({
      title: isHindi ? 'शिकायत दर्ज की गई' : 'Grievance Ticket Lodged',
      description: `Ticket ${newTicket.id} logged. SLA timer initiated.`,
      type: 'success',
    });
  };

  const handleMarkResolved = (ticketId: string) => {
    setGrievances((prev) =>
      prev.map((g) =>
        g.id === ticketId
          ? {
              ...g,
              status: 'Resolved',
              resolutionNotes: 'Resolved by duty officer. Confirmed with complainant.',
            }
          : g
      )
    );
    if (viewingTicket && viewingTicket.id === ticketId) {
      setViewingTicket({
        ...viewingTicket,
        status: 'Resolved',
        resolutionNotes: 'Resolved by duty officer. Confirmed with complainant.',
      });
    }
    addNotification({
      title: isHindi ? 'शिकायत का समाधान हुआ' : 'Ticket Resolved',
      description: `Ticket ${ticketId} marked as successfully resolved.`,
      type: 'success',
    });
  };

  const filteredGrievances = grievances.filter((g) => {
    if (statusFilter !== 'All' && g.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && g.category !== categoryFilter) return false;
    if (
      searchGrievance.trim() &&
      !g.subject.toLowerCase().includes(searchGrievance.toLowerCase()) &&
      !g.complainantName.toLowerCase().includes(searchGrievance.toLowerCase()) &&
      !g.id.toLowerCase().includes(searchGrievance.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // ----------------------------------------------------
  // TAB 1: Grievance Registry
  // ----------------------------------------------------
  const registryContent = (
    <div className="space-y-4">
      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs font-bold rounded-md border transition-colors ${
                statusFilter === st
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-[#181818] text-muted-foreground border-border/80 hover:text-foreground'
              }`}
            >
              {st} ({st === 'All' ? grievances.length : grievances.filter((g) => g.status === st).length})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchGrievance}
              onChange={(e) => setSearchGrievance(e.target.value)}
              placeholder={isHindi ? 'शिकायत खोजें...' : 'Search grievance...'}
              className="w-48 sm:w-56 px-2.5 py-1 pl-7 text-xs border border-border rounded-md bg-[#181818] text-foreground focus:outline-none"
            />
            <Search className="h-3 w-3 absolute left-2 top-2 text-muted-foreground" />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1 text-xs border border-border rounded-md bg-[#181818] text-foreground focus:outline-none"
          >
            <option value="All">{isHindi ? 'सभी विभाग' : 'All Departments'}</option>
            <option value="Transport">Transport</option>
            <option value="Academics">Academics</option>
            <option value="Hostel">Hostel</option>
            <option value="Fees & Accounts">Fees &amp; Accounts</option>
            <option value="Facilities">Facilities</option>
          </select>
        </div>
      </div>

      {/* Grievances Table */}
      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'टिकट आईडी' : 'Ticket ID'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'शिकायतकर्ता' : 'Complainant'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'विषय / सारांश' : 'Subject'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'विभाग' : 'Department'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'प्राथमिकता' : 'Priority'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'अधिकारी' : 'Assigned To'}</th>
                <th className="py-2.5 px-3">{t('col.status')}</th>
                <th className="py-2.5 px-3 text-right">{t('col.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredGrievances.map((item) => (
                <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">{item.id}</td>
                  <td className="py-2.5 px-3 text-foreground">
                    <div className="font-bold">{item.complainantName}</div>
                    <div className="text-[10px] text-muted-foreground">{item.complainantType}</div>
                  </td>
                  <td className="py-2.5 px-3 text-foreground font-medium max-w-[280px] truncate">{item.subject}</td>
                  <td className="py-2.5 px-3">
                    <VFBadge variant="outline" className="text-[10px]">{item.category}</VFBadge>
                  </td>
                  <td className="py-2.5 px-3">
                    <VFBadge
                      variant={item.priority === 'Urgent' ? 'danger' : item.priority === 'High' ? 'warning' : 'outline'}
                      className="text-[10px]"
                    >
                      {item.priority}
                    </VFBadge>
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">{item.assignedOfficer}</td>
                  <td className="py-2.5 px-3">
                    <VFBadge
                      variant={item.status === 'Resolved' ? 'success' : item.status === 'In Progress' ? 'warning' : 'danger'}
                      className="text-[10px]"
                    >
                      {item.status}
                    </VFBadge>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-[10px] rounded-sm font-bold"
                      onClick={() => setViewingTicket(item)}
                    >
                      {isHindi ? 'विवरण' : 'Details'}
                    </VFButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 2: Actionable Queue
  // ----------------------------------------------------
  const activeQueueContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'सक्रिय व तत्काल कार्रवाई योग्य शिकायतें' : 'Pending & Actionable Grievance Queue'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'एसओपी के तहत प्राथमिकता के आधार पर समाधान प्रक्रिया' : 'Active issues requiring administrative resolution and departmental sign-off'}
          </p>
        </div>
        <VFBadge variant="warning" className="font-mono text-xs">
          {grievances.filter((g) => g.status !== 'Resolved').length} {isHindi ? 'लंबित' : 'Pending Action'}
        </VFBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {grievances
          .filter((g) => g.status !== 'Resolved')
          .map((item) => (
            <div key={item.id} className="p-3.5 rounded-md border border-border/80 bg-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-xs text-primary">{item.id}</span>
                  <VFBadge
                    variant={item.priority === 'Urgent' ? 'danger' : 'warning'}
                    className="text-[10px]"
                  >
                    {item.priority}
                  </VFBadge>
                </div>
                <h4 className="text-xs font-bold text-foreground line-clamp-1">{item.subject}</h4>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between border-t border-border/50 pt-2">
                  <span>By: <strong className="text-foreground">{item.complainantName}</strong></span>
                  <span className="font-mono text-primary">{item.category}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-2.5 mt-3">
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  SLA: {item.expectedSLA}
                </span>
                <VFButton
                  size="sm"
                  variant="success"
                  className="h-6 px-2 text-[10px] rounded-sm font-bold"
                  leftIcon={<Check className="h-3 w-3" />}
                  onClick={() => handleMarkResolved(item.id)}
                >
                  {isHindi ? 'समाधान करें' : 'Mark Resolved'}
                </VFButton>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 3: Resolution Analytics & SLA
  // ----------------------------------------------------
  const analyticsContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <VFCard title="Departmental Breakdown" className="rounded-md">
          <div className="space-y-2 text-xs mt-1">
            {[
              { name: 'Transport', count: 14, pct: 33 },
              { name: 'Academics', count: 11, pct: 26 },
              { name: 'Hostel', count: 8, pct: 19 },
              { name: 'Fees & Accounts', count: 5, pct: 12 },
              { name: 'Campus Facilities', count: 4, pct: 10 },
            ].map((d, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-muted-foreground">{d.name}</span>
                <span className="font-mono font-bold text-foreground">{d.count} ({d.pct}%)</span>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="Average Resolution Speed" className="rounded-md">
          <div className="space-y-2 text-xs mt-1">
            {[
              { dept: 'IT & Accounts', days: '0.8 Days' },
              { dept: 'Transport', days: '1.2 Days' },
              { dept: 'Hostel', days: '1.5 Days' },
              { dept: 'Academics', days: '2.1 Days' },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-muted-foreground">{s.dept}</span>
                <span className="font-mono font-bold text-emerald-400">{s.days}</span>
              </div>
            ))}
          </div>
        </VFCard>

        <VFCard title="SLA Compliance Rate" className="rounded-md lg:col-span-2">
          <div className="space-y-3 text-xs mt-1">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Within 48h SLA Target</span>
              <span className="font-mono font-bold text-emerald-400">96.8% Compliant</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              36 of 42 tickets resolved inside institutional SLA limits. Zero unacknowledged tickets pending over 24 hours.
            </p>
            <div className="p-2.5 bg-[#141414] border border-border/70 rounded-md text-[11px] text-muted-foreground">
              Preventative Actions: Route 4 morning driver shift rescheduled; Lab 204 electrical components upgraded.
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  const tabs = [
    { id: 'registry', label: isHindi ? 'शिकायत पंजिका' : 'Grievance Registry', icon: <MessageSquareWarning className="h-4 w-4" />, content: registryContent },
    { id: 'active', label: isHindi ? 'सक्रिय कतार' : 'Actionable Queue', icon: <Clock className="h-4 w-4" />, content: activeQueueContent },
    { id: 'analytics', label: isHindi ? 'निवारण विश्लेषण' : 'Resolution Analytics & SLA', icon: <BarChart3 className="h-4 w-4" />, content: analyticsContent },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── Header Toolbar ── */}
      <div className="p-3.5 rounded-md bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
            <MessageSquareWarning className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-foreground tracking-tight">
                {isHindi ? 'शिकायतें व निवारण' : 'Complaints & Grievance Redressal'}
              </span>
              <VFBadge variant="success" className="text-[10px] font-bold font-mono">
                {isHindi ? 'एसओपी सक्रिय' : 'SLA Active'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'संस्थागत शिकायत निवारण, प्राथमिकता ट्रैकिंग व विभागवार समाधान' : 'Structured complaint registration, departmental routing & strict resolution SLA tracking'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setIsLodgeModalOpen(true)}
            className="rounded-md font-bold"
          >
            {isHindi ? 'शिकायत दर्ज करें' : 'Lodge Grievance'}
          </VFButton>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <VFStatCard
          title={isHindi ? 'कुल शिकायतें' : 'Total Grievances'}
          value="42 Tickets"
          icon={<MessageSquareWarning className="h-4.5 w-4.5 text-rose-400" />}
          trend="neutral"
          trendLabel="36 Resolved (85.7%)"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'लंबित टिकट' : 'Open Pending'}
          value="6 Tickets"
          icon={<Clock className="h-4.5 w-4.5 text-amber-400" />}
          trend="down"
          trendLabel="Avg SLA: 1.8 Days"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'एसओपी अनुपालन' : 'SLA Compliance'}
          value="96.8%"
          icon={<CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />}
          trend="up"
          trendLabel="Within 48h SLA"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'समाधान गति' : 'Resolution Velocity'}
          value="1.4 Days"
          icon={<TrendingUp className="h-4.5 w-4.5 text-purple-400" />}
          trend="up"
          trendLabel="Across all depts"
          className="rounded-md"
        />
      </div>

      {/* ── Tabs Navigation ── */}
      <VFTabs items={tabs} defaultTabId="registry" variant="top-bar" />

      {/* ── Lodge Complaint Modal ── */}
      <VFDialog
        isOpen={isLodgeModalOpen}
        onClose={() => setIsLodgeModalOpen(false)}
        title={isHindi ? 'नई शिकायत दर्ज करें' : 'Lodge Institutional Grievance'}
        description={isHindi ? 'विभाग, शिकायतकर्ता विवरण व समस्या का विवरण दें' : 'Submit grievance for tracked departmental resolution under strict SLA guidelines'}
        className="max-w-md rounded-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsLodgeModalOpen(false)}
              className="rounded-md"
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={handleLodgeComplaint}
              disabled={!ticketSubject.trim() || !complainantName.trim()}
              className="rounded-md font-bold"
            >
              {isHindi ? 'शिकायत सबमिट करें' : 'Submit Ticket'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleLodgeComplaint} className="space-y-3 text-xs mt-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'शिकायतकर्ता श्रेणी' : 'Complainant Role'}</label>
              <select
                value={complainantType}
                onChange={(e: any) => setComplainantType(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Parent">Parent / Guardian</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty / Teacher</option>
                <option value="Staff">Administrative Staff</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'नाम' : 'Full Name'}</label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="e.g. Sunil Verma"
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'संबंधित विभाग' : 'Department'}</label>
              <select
                value={ticketCategory}
                onChange={(e: any) => setTicketCategory(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Transport">Transport &amp; Bus</option>
                <option value="Academics">Academics &amp; Class</option>
                <option value="Hostel">Hostel &amp; Mess</option>
                <option value="Fees & Accounts">Fees &amp; Accounts</option>
                <option value="Facilities">Campus Facilities</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'प्राथमिकता' : 'Severity'}</label>
              <select
                value={ticketPriority}
                onChange={(e: any) => setTicketPriority(e.target.value)}
                className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Urgent">Urgent (24h SLA)</option>
                <option value="High">High (48h SLA)</option>
                <option value="Medium">Medium (72h SLA)</option>
                <option value="Low">Low (5 Days)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-foreground mb-1">{isHindi ? 'शिकायत विषय' : 'Subject Summary'}</label>
            <input
              type="text"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="e.g. Bus Route 2 delay near Preet Vihar"
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-foreground mb-1">{isHindi ? 'विस्तृत विवरण' : 'Detailed Description'}</label>
            <textarea
              rows={3}
              value={ticketDesc}
              onChange={(e) => setTicketDesc(e.target.value)}
              placeholder="Describe the incident, timings, and any relevant references..."
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none resize-none"
            />
          </div>
        </form>
      </VFDialog>

      {/* ── Ticket Detail View Dialog ── */}
      {viewingTicket && (
        <VFDialog
          isOpen={true}
          onClose={() => setViewingTicket(null)}
          title={`Grievance Details — ${viewingTicket.id}`}
          description={`Filed on ${viewingTicket.lodgedDate} · ${viewingTicket.category}`}
          className="max-w-md rounded-md"
          footerActions={
            <div className="flex items-center justify-between w-full">
              {viewingTicket.status !== 'Resolved' ? (
                <VFButton
                  variant="success"
                  size="sm"
                  onClick={() => handleMarkResolved(viewingTicket.id)}
                  className="rounded-md font-bold"
                >
                  {isHindi ? 'समाधान करें' : 'Mark Resolved'}
                </VFButton>
              ) : (
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Resolved
                </span>
              )}
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setViewingTicket(null)}
                className="rounded-md font-bold"
              >
                {t('action.close')}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-md bg-[#141414] border border-border/80">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-foreground">{viewingTicket.complainantName}</span>
                <VFBadge variant="outline" className="text-[10px]">{viewingTicket.complainantType}</VFBadge>
              </div>
              <p className="text-muted-foreground font-medium">{viewingTicket.subject}</p>
            </div>

            <div className="border border-border/70 rounded-md p-2.5 bg-[#121212]">
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Full Statement</p>
              <p className="text-foreground leading-relaxed">{viewingTicket.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
              <div>Assigned: <strong className="text-foreground">{viewingTicket.assignedOfficer}</strong></div>
              <div>SLA Target: <strong className="text-amber-400 font-mono">{viewingTicket.expectedSLA}</strong></div>
            </div>

            {viewingTicket.resolutionNotes && (
              <div className="border border-emerald-500/30 bg-emerald-500/10 rounded-md p-2.5 text-emerald-300">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Resolution Action</p>
                <p className="text-xs">{viewingTicket.resolutionNotes}</p>
              </div>
            )}
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
