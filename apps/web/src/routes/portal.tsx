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
  Home,
  BookOpen,
  Calendar as CalendarIcon,
  MessageSquare,
  User,
  Sparkles,
  CheckCircle2,
  CreditCard,
  Download,
  Bus,
  QrCode,
} from 'lucide-react';

export const Route = createFileRoute('/portal')({
  component: ParentStudentPortalPage,
});

interface ChildRecord {
  id: string;
  name: string;
  classSection: string;
  rollNo: string;
  attendancePct: string;
  todayStatus: 'Present' | 'Absent' | 'Late';
  homeworkDueCount: number;
  feeDueAmount: string;
}

interface HomeworkRecord {
  id: string;
  subject: string;
  title: string;
  teacher: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Checked';
}

function ParentStudentPortalPage() {
  const portalModule = MODULE_REGISTRY.find((m) => m.id === 'portal');

  const childrenData: ChildRecord[] = [
    { id: '1', name: 'Rahul Sharma', classSection: 'Class 10-A', rollNo: '42', attendancePct: '94.2%', todayStatus: 'Present', homeworkDueCount: 2, feeDueAmount: '₹12,500' },
    { id: '2', name: 'Priya Sharma', classSection: 'Class 7-B', rollNo: '18', attendancePct: '97.8%', todayStatus: 'Present', homeworkDueCount: 1, feeDueAmount: '₹0' },
    { id: '3', name: 'Aman Sharma', classSection: 'Class 3-A', rollNo: '05', attendancePct: '92.0%', todayStatus: 'Present', homeworkDueCount: 0, feeDueAmount: '₹0' },
  ];

  const [selectedChildId, setSelectedChildId] = React.useState<string>('1');
  const activeChild = childrenData.find((c) => c.id === selectedChildId) || childrenData[0];

  const homeworkData: HomeworkRecord[] = [
    { id: '1', subject: 'Mathematics', title: 'Chapter 5 Quadratic Equations Exercises', teacher: 'Ms. Patel', dueDate: 'Tomorrow 08:00 AM', status: 'Pending' },
    { id: '2', subject: 'Physics', title: 'Lab Report: Optics & Light Refraction', teacher: 'Dr. Suresh Verma', dueDate: '13 Aug 2026', status: 'Pending' },
    { id: '3', subject: 'English Literature', title: 'Essay: The Merchant of Venice Character Analysis', teacher: 'Mrs. Kapoor', dueDate: 'Yesterday', status: 'Submitted' },
  ];

  // 21.1 🏠 HOME TAB CONTENT
  const homeTabContent = (
    <div className="space-y-4">
      {/* Personalized Greeting & Child Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs gap-3">
        <div>
          <h2 className="text-base font-bold text-foreground">Good morning, Mr. Sharma 👋</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Tuesday, 11 August 2026 · Viewing portal for <span className="font-bold text-primary">{activeChild.name} ({activeChild.classSection})</span></p>
        </div>

        {/* Feature 2 — Child Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-semibold">Select Child:</span>
          {childrenData.map((c) => (
            <VFButton
              key={c.id}
              size="sm"
              variant={c.id === selectedChildId ? 'primary' : 'outline'}
              onClick={() => setSelectedChildId(c.id)}
            >
              {c.name.split(' ')[0]} ({c.classSection.split(' ')[1]})
            </VFButton>
          ))}
        </div>
      </div>

      {/* Feature 3-6 — Today's Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Attendance" value={activeChild.attendancePct} icon={<CheckCircle2 className="h-5 w-5 text-success" />} trend="up" trendLabel={`${activeChild.todayStatus} Today 🟢`} />
        <VFStatCard title="Homework Queue" value={`${activeChild.homeworkDueCount} Due`} icon={<BookOpen className="h-5 w-5 text-primary" />} description="1 Due Tomorrow" />
        <VFStatCard title="Fee Payment Balance" value={activeChild.feeDueAmount} icon={<CreditCard className="h-5 w-5 text-warning" />} description="Installment Due 15 Aug" />
        <VFStatCard title="Upcoming Examinations" value="2 Exams Soon" icon={<CalendarIcon className="h-5 w-5 text-secondary" />} description="Mathematics on 18 Aug" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Schedule & Action Center */}
        <VFSection title="Today's Timetable & Action Center" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">📚 10:00 AM</span>
              <p className="text-xs text-muted-foreground">Mathematics (Room 12)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">🧪 11:00 AM</span>
              <p className="text-xs text-muted-foreground">Physics (Lab 2)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">🍱 12:30 PM</span>
              <p className="text-xs text-muted-foreground">Lunch Break</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl space-y-1">
              <span className="text-xs font-bold text-foreground">📖 02:00 PM</span>
              <p className="text-xs text-muted-foreground">English (Room 12)</p>
            </div>
          </div>

          <VFCard title="Needs Your Immediate Attention">
            <div className="space-y-2 text-xs mt-1">
              <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">⚠ Mathematics Chapter 5 Homework</span>
                  <p className="text-muted-foreground text-xs">Due tomorrow 08:00 AM</p>
                </div>
                <VFButton size="sm" variant="outline">Submit Homework</VFButton>
              </div>
              <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">💰 Term 2 Fee Installment ({activeChild.feeDueAmount})</span>
                  <p className="text-muted-foreground text-xs">Due by 15 August 2026</p>
                </div>
                <VFButton size="sm">Pay Online</VFButton>
              </div>
            </div>
          </VFCard>
        </VFSection>

        {/* AI Signature Home Assistant */}
        <VFCard title="✨ Ask VidyaMaxx AI Assistant">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl space-y-2">
              <p className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                <Sparkles className="h-4 w-4 text-primary" /> Today's Action Summary
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-[11px]">
                <li>Mathematics homework due tomorrow morning.</li>
                <li>Digital parent consent required for Science Exhibition.</li>
                <li>{activeChild.feeDueAmount} fee installment due Friday, 15 Aug.</li>
                <li>Mathematics Term exam scheduled for Monday, 18 Aug.</li>
              </ul>
            </div>
            <VFButton size="sm" variant="outline" className="w-full">
              Ask AI Question
            </VFButton>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 21.3 📚 ACADEMICS TAB CONTENT
  const academicsTabContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Academic Progress & Homework Feed</h3>
          <p className="text-xs text-muted-foreground">Overall Performance: <span className="font-bold text-success">82.4% Average</span> · View subject breakdown, test scores, and homework submissions.</p>
        </div>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Download Report Card</VFButton>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
          <p className="text-xs text-muted-foreground">Mathematics</p>
          <p className="text-base font-bold text-primary mt-0.5">88% (A+)</p>
        </div>
        <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
          <p className="text-xs text-muted-foreground">Science</p>
          <p className="text-base font-bold text-success mt-0.5">84% (A)</p>
        </div>
        <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
          <p className="text-xs text-muted-foreground">English</p>
          <p className="text-base font-bold text-secondary mt-0.5">79% (B+)</p>
        </div>
        <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
          <p className="text-xs text-muted-foreground">Social Science</p>
          <p className="text-base font-bold text-primary mt-0.5">81% (A)</p>
        </div>
      </div>

      <VFDataTable
        columns={[
          { header: 'Subject', accessorKey: 'subject', cell: (r: HomeworkRecord) => <span className="font-bold text-foreground">{r.subject}</span> },
          { header: 'Homework / Assignment Title', accessorKey: 'title' },
          { header: 'Teacher', accessorKey: 'teacher' },
          { header: 'Due Date', accessorKey: 'dueDate', cell: (r: HomeworkRecord) => <span className="font-mono text-warning font-semibold">{r.dueDate}</span> },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r: HomeworkRecord) => (
              <VFBadge variant={r.status === 'Submitted' ? 'success' : 'warning'}>
                {r.status}
              </VFBadge>
            ),
          },
        ]}
        data={homeworkData}
        filterPlaceholder="Search subject or assignment..."
      />
    </div>
  );

  // 21.11 👤 PROFILE & SERVICES TAB CONTENT
  const profileTabContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Student Profile, Digital ID Pass & Services</h3>
          <p className="text-xs text-muted-foreground">Manage family contacts, transport route live telematics, library borrowings, fee receipts, and digital ID card.</p>
        </div>
        <VFButton size="sm" leftIcon={<QrCode className="h-3.5 w-3.5" />}>Digital ID Pass</VFButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Digital ID Card Preview */}
        <VFCard title="Digital Student ID Card">
          <div className="p-4 bg-muted/30 border border-border rounded-xl text-center space-y-3 mt-1">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary text-xl">
              RS
            </div>
            <div>
              <p className="font-bold text-base text-foreground">{activeChild.name}</p>
              <p className="text-xs text-primary font-mono">{activeChild.classSection} · Roll No {activeChild.rollNo}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Adm No: ADM-2026-00421 · House: Blue</p>
            </div>
            <div className="p-2 bg-white rounded-lg inline-block shadow-xs border border-border">
              <QrCode className="h-16 w-16 text-black mx-auto" />
            </div>
          </div>
        </VFCard>

        {/* Transport & Library Quick Cards */}
        <VFCard title="Connected Services Status" className="lg:col-span-2">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <Bus className="h-4 w-4 text-primary" /> Route 4 School Bus
                </span>
                <VFBadge variant="success">🚌 Approaching (5 mins)</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Vehicle: Bus 12 · Driver: Mr. Singh (+91 98765 43210)</p>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-secondary" /> Library Borrowed Books
                </span>
                <VFBadge variant="outline">1 Book Due 18 Aug</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Book: Physics Basics (Item AST-LIB-048)</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Submodule map corresponding to the 5 streamlined top-level tabs specified by user
  const contentMap: Record<string, React.ReactNode> = {
    home: homeTabContent,
    academics: academicsTabContent,
    calendar: homeTabContent,
    communication: homeTabContent,
    profile: profileTabContent,
  };

  const submoduleTabs = (portalModule?.submodules || [
    { id: 'home', label: 'Home' },
    { id: 'academics', label: 'Academics' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'communication', label: 'Communication' },
    { id: 'profile', label: 'Profile & Services' },
  ]).map((sub) => {
    const icon = sub.id === 'home' ? <Home className="h-3.5 w-3.5" />
      : sub.id === 'academics' ? <BookOpen className="h-3.5 w-3.5" />
      : sub.id === 'calendar' ? <CalendarIcon className="h-3.5 w-3.5" />
      : sub.id === 'communication' ? <MessageSquare className="h-3.5 w-3.5" />
      : <User className="h-3.5 w-3.5" />;

    return {
      id: sub.id,
      label: sub.label,
      icon,
      content: contentMap[sub.id] || homeTabContent,
    };
  });

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="home" variant="top-bar" />
    </VFPageContainer>
  );
}
