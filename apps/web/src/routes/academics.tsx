import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFCard,
  VFBadge,
  VFButton,
  VFDataTable,
  VFSelect,
  VFInput,
  VFDialog,
} from '@vidyafloww/ui';
import {
  School,
  BookOpen,
  Calendar,
  Grid,
  Plus,
  Download,
  Check,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

interface SubjectRecord {
  code: string;
  name: string;
  type: string;
  department: string;
  classes: string;
  weeklyPeriods: number;
  status: 'Active' | 'Elective';
}

const INITIAL_SUBJECTS: SubjectRecord[] = [
  { code: 'SUB-101', name: 'Mathematics', type: 'Core Compulsory', department: 'Science & Mathematics', classes: 'Class 1 to 12', weeklyPeriods: 6, status: 'Active' },
  { code: 'SUB-102', name: 'Physics (Theory & Lab)', type: 'Core Science', department: 'Science & Mathematics', classes: 'Class 9 to 12', weeklyPeriods: 5, status: 'Active' },
  { code: 'SUB-103', name: 'Chemistry (Theory & Lab)', type: 'Core Science', department: 'Science & Mathematics', classes: 'Class 9 to 12', weeklyPeriods: 5, status: 'Active' },
  { code: 'SUB-104', name: 'English Core & Literature', type: 'Language & Comms', department: 'Humanities & Languages', classes: 'Class 1 to 12', weeklyPeriods: 6, status: 'Active' },
  { code: 'SUB-105', name: 'Accountancy & Auditing', type: 'Commerce Core', department: 'Commerce & Economics', classes: 'Class 11 to 12', weeklyPeriods: 5, status: 'Active' },
  { code: 'SUB-106', name: 'Computer Science (Python & SQL)', type: 'Tech & AI', department: 'Technology & CS', classes: 'Class 6 to 12', weeklyPeriods: 4, status: 'Active' },
  { code: 'SUB-107', name: 'Economics & Micro-Finance', type: 'Commerce Elective', department: 'Commerce & Economics', classes: 'Class 11 to 12', weeklyPeriods: 4, status: 'Active' },
  { code: 'SUB-108', name: 'Social Science (Hist/Civ/Geo)', type: 'Core Compulsory', department: 'Humanities & Languages', classes: 'Class 6 to 10', weeklyPeriods: 5, status: 'Active' },
];

function AcademicsPage() {
  const { addNotification } = useGlobalStore();
  const [activeView, setActiveView] = React.useState<'subjects' | 'classes' | 'calendar'>('subjects');
  const [subjects, setSubjects] = React.useState<SubjectRecord[]>(INITIAL_SUBJECTS);
  const [departmentFilter, setDepartmentFilter] = React.useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newSubject, setNewSubject] = React.useState<Partial<SubjectRecord>>({
    code: `SUB-${subjects.length + 101}`,
    name: '',
    type: 'Core Compulsory',
    department: 'Science & Mathematics',
    classes: 'Class 9 to 12',
    weeklyPeriods: 5,
    status: 'Active',
  });

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name) return;

    const added: SubjectRecord = {
      code: newSubject.code || `SUB-${subjects.length + 101}`,
      name: newSubject.name,
      type: newSubject.type || 'Core Compulsory',
      department: newSubject.department || 'Science & Mathematics',
      classes: newSubject.classes || 'Class 9 to 12',
      weeklyPeriods: Number(newSubject.weeklyPeriods) || 4,
      status: (newSubject.status as any) || 'Active',
    };

    setSubjects([...subjects, added]);
    setIsAddModalOpen(false);
    setNewSubject({
      code: `SUB-${subjects.length + 102}`,
      name: '',
      type: 'Core Compulsory',
      department: 'Science & Mathematics',
      classes: 'Class 9 to 12',
      weeklyPeriods: 5,
      status: 'Active',
    });
    addNotification({
      title: 'Subject Added',
      description: `Course "${added.name}" [${added.code}] registered in the academic catalog.`,
      type: 'success',
    });
  };

  const handleExportCatalog = () => {
    addNotification({
      title: 'Academic Catalog Exported',
      description: 'Exported CBSE academic subject master roster as CSV.',
      type: 'success',
    });
  };

  const filteredSubjects = React.useMemo(() => {
    if (departmentFilter === 'All') return subjects;
    return subjects.filter((s) => s.department === departmentFilter);
  }, [subjects, departmentFilter]);

  const subjectColumns = [
    {
      header: 'Subject Code',
      accessorKey: 'code',
      cell: (r: SubjectRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border text-xs">
          {r.code}
        </span>
      ),
    },
    {
      header: 'Subject Name & Title',
      accessorKey: 'name',
      cell: (r: SubjectRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.name}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.department}</p>
        </div>
      ),
    },
    {
      header: 'Curriculum Tier',
      accessorKey: 'type',
      cell: (r: SubjectRecord) => <VFBadge variant="outline">{r.type}</VFBadge>,
    },
    {
      header: 'Assigned Grades',
      accessorKey: 'classes',
      cell: (r: SubjectRecord) => <span className="text-foreground text-xs font-semibold">{r.classes}</span>,
    },
    {
      header: 'Weekly Periods',
      accessorKey: 'weeklyPeriods',
      cell: (r: SubjectRecord) => <span className="font-mono font-bold text-primary text-xs">{r.weeklyPeriods} Periods/wk</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: SubjectRecord) => <VFBadge variant="success">{r.status}</VFBadge>,
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* 1. Header Toolbar Box */}
      <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <School className="h-4 w-4" />
            </div>
            <span className="text-base font-extrabold text-foreground tracking-tight">
              Academic Curriculum & Structure
            </span>
            <VFBadge variant="success" className="text-[10px] font-bold font-mono">
              2026–2027
            </VFBadge>
          </div>

          <div className="h-5 w-[1px] bg-border/80 hidden sm:block" />

          {/* View Tab Switchers */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-md border border-border/70">
            <button
              type="button"
              onClick={() => setActiveView('subjects')}
              className={`px-3 py-1 text-xs font-bold rounded transition-colors flex items-center gap-1.5 ${
                activeView === 'subjects'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="h-3 w-3" />
              Subjects Catalog
            </button>
            <button
              type="button"
              onClick={() => setActiveView('classes')}
              className={`px-3 py-1 text-xs font-bold rounded transition-colors flex items-center gap-1.5 ${
                activeView === 'classes'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid className="h-3 w-3" />
              Class Allocations
            </button>
            <button
              type="button"
              onClick={() => setActiveView('calendar')}
              className={`px-3 py-1 text-xs font-bold rounded transition-colors flex items-center gap-1.5 ${
                activeView === 'calendar'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="h-3 w-3" />
              Calendar & Streams
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            onClick={handleExportCatalog}
            className="h-9 px-3.5 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export Catalog
          </VFButton>
          <VFButton
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 px-3.5 text-xs font-bold shadow-xs"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Add Subject
          </VFButton>
        </div>
      </div>

      {/* 2. Main Tab Views */}
      {activeView === 'subjects' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
          {/* Department Filter Bar */}
          <div className="p-3 rounded-lg bg-[#141414] border border-border/80 flex items-center justify-between gap-3 shrink-0 shadow-xs">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs font-extrabold text-foreground uppercase tracking-wider whitespace-nowrap">
                Filter Department:
              </span>
              <div className="w-64">
                <VFSelect
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(String(e.target.value))}
                  options={[
                    { label: 'All Departments', value: 'All' },
                    { label: 'Science & Mathematics', value: 'Science & Mathematics' },
                    { label: 'Humanities & Languages', value: 'Humanities & Languages' },
                    { label: 'Commerce & Economics', value: 'Commerce & Economics' },
                    { label: 'Technology & CS', value: 'Technology & CS' },
                  ]}
                  className="bg-[#1a1a1a] border-border h-9 text-xs"
                />
              </div>
            </div>

            <span className="text-xs font-mono text-muted-foreground font-semibold">
              {filteredSubjects.length} Courses Listed
            </span>
          </div>

          <VFDataTable
            columns={subjectColumns}
            data={filteredSubjects}
            filterPlaceholder="Search subjects by course code, title, or department..."
          />
        </div>
      )}

      {activeView === 'classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { class: 'Class 9-A', room: 'Room 101', teacher: 'Mrs. Sunita Verma', capacity: '38 / 40', stream: 'Foundation General' },
            { class: 'Class 9-B', room: 'Room 102', teacher: 'Mr. Arvind Gupta', capacity: '36 / 40', stream: 'Foundation General' },
            { class: 'Class 10-A', room: 'Room 201', teacher: 'Dr. Rajesh Sharma', capacity: '39 / 40', stream: 'Secondary Board' },
            { class: 'Class 10-B', room: 'Room 202', teacher: 'Ms. Pooja Rao', capacity: '37 / 40', stream: 'Secondary Board' },
            { class: 'Class 11-Sci', room: 'Lab 204', teacher: 'Dr. Manoj Nair', capacity: '35 / 40', stream: 'Science (PCM/B)' },
            { class: 'Class 11-Com', room: 'Room 301', teacher: 'Mrs. S. Joshi', capacity: '32 / 40', stream: 'Commerce & Finance' },
            { class: 'Class 12-Sci', room: 'Lab 102', teacher: 'Mr. Amit Das', capacity: '38 / 40', stream: 'Science Senior' },
            { class: 'Class 12-Com', room: 'Room 302', teacher: 'Mr. Deepak Mishra', capacity: '34 / 40', stream: 'Commerce Senior' },
          ].map((c, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#141414] border border-border/80 hover:border-zinc-700 hover:bg-[#181818] transition-all duration-200 space-y-2.5 shadow-xs">
              <div className="flex justify-between items-center">
                <p className="font-extrabold text-foreground text-sm">{c.class}</p>
                <VFBadge variant="outline" className="text-[10px] font-mono">{c.room}</VFBadge>
              </div>
              <p className="text-xs text-primary font-bold">{c.stream}</p>
              <div className="p-2.5 rounded-lg bg-[#1a1a1a] border border-border/60 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Teacher:</span>
                  <span className="font-medium text-foreground">{c.teacher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enrollment:</span>
                  <span className="font-black text-emerald-400">{c.capacity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'calendar' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VFCard
            title="Academic Session: 2026–2027"
            description="CBSE academic milestone terms and dates."
            className="bg-[#141414] border-border/80"
          >
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-border/60 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Term 1 (Mid-Year)</span>
                  <VFBadge variant="success" className="text-[10px]">Active</VFBadge>
                </div>
                <p className="text-muted-foreground">Apr 01, 2026 – Sep 30, 2026</p>
              </div>
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-border/60 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Term 2 (Annual Final)</span>
                  <VFBadge variant="outline" className="text-[10px]">Upcoming</VFBadge>
                </div>
                <p className="text-muted-foreground">Oct 01, 2026 – Mar 31, 2027</p>
              </div>
            </div>
          </VFCard>

          <VFCard
            title="Senior Secondary Streams"
            description="Specialized high school learning tracks."
            className="bg-[#141414] border-border/80"
          >
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground font-semibold">Science (PCM/PCB)</span>
                <span className="font-black text-foreground">180 Students</span>
              </div>
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground font-semibold">Commerce & Economics</span>
                <span className="font-black text-foreground">130 Students</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-muted-foreground font-semibold">Humanities & Arts</span>
                <span className="font-black text-foreground">98 Students</span>
              </div>
            </div>
          </VFCard>

          <VFCard
            title="Department Leadership"
            description="Heads of academic departments."
            className="bg-[#141414] border-border/80"
          >
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground font-semibold">Science & Math</span>
                <span className="font-black text-foreground">Dr. Rajesh Sharma</span>
              </div>
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground font-semibold">Languages & Comms</span>
                <span className="font-black text-foreground">Mr. Arvind Gupta</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-muted-foreground font-semibold">Commerce & Accounts</span>
                <span className="font-black text-foreground">Mrs. Sunita Verma</span>
              </div>
            </div>
          </VFCard>
        </div>
      )}

      {/* Add Subject Modal */}
      <VFDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Academic Course"
        description="Register a curriculum subject, weekly period workload, and grade assignment."
      >
        <form onSubmit={handleAddSubject} className="space-y-3.5 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Subject Code</label>
              <VFInput
                required
                value={newSubject.code}
                onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                className="bg-[#1a1a1a] border-border font-mono h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Weekly Periods</label>
              <VFInput
                type="number"
                value={String(newSubject.weeklyPeriods)}
                onChange={(e) => setNewSubject({ ...newSubject, weeklyPeriods: Number(e.target.value) })}
                className="bg-[#1a1a1a] border-border font-mono h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Subject Name & Title</label>
            <VFInput
              required
              placeholder="e.g. Artificial Intelligence & Robotics"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Department</label>
              <VFSelect
                value={newSubject.department || 'Science & Mathematics'}
                onChange={(e) => setNewSubject({ ...newSubject, department: String(e.target.value) })}
                options={[
                  { label: 'Science & Mathematics', value: 'Science & Mathematics' },
                  { label: 'Humanities & Languages', value: 'Humanities & Languages' },
                  { label: 'Commerce & Economics', value: 'Commerce & Economics' },
                  { label: 'Technology & CS', value: 'Technology & CS' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Assigned Grades</label>
              <VFInput
                placeholder="e.g. Class 9 to 12"
                value={newSubject.classes}
                onChange={(e) => setNewSubject({ ...newSubject, classes: e.target.value })}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Check className="h-4 w-4" />}>
              Save Subject
            </VFButton>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
