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
  BookMarked,
  Plus,
  Download,
  Check,
  Eye,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/homework')({
  component: HomeworkPage,
});

interface HomeworkRecord {
  id: string;
  code: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submitted: number;
  totalStudents: number;
  status: 'Published' | 'Draft' | 'Closed';
}

const INITIAL_HOMEWORK: HomeworkRecord[] = [
  { id: '1', code: 'HW-MATH-101', title: 'Quadratic Equations & Roots Working', subject: 'Mathematics', class: 'Class 10-A', dueDate: 'Today, 11:59 PM', submitted: 38, totalStudents: 42, status: 'Published' },
  { id: '2', code: 'HW-PHYS-102', title: 'Electromagnetism & Circuit Numericals', subject: 'Physics', class: 'Class 10-A', dueDate: 'Tomorrow, 06:00 PM', submitted: 24, totalStudents: 42, status: 'Published' },
  { id: '3', code: 'HW-CHEM-103', title: 'Chemical Reactions & Stoichiometry Lab', subject: 'Chemistry', class: 'Class 10-B', dueDate: '14 Aug, 11:59 PM', submitted: 12, totalStudents: 40, status: 'Published' },
  { id: '4', code: 'HW-ENG-104', title: 'Critical Essay: Shakespearean Soliloquies', subject: 'English Core', class: 'Class 9-A', dueDate: '18 Aug, 05:00 PM', submitted: 35, totalStudents: 38, status: 'Published' },
  { id: '5', code: 'HW-CS-105', title: 'Python Recursion & Binary Search Trees', subject: 'Computer Science', class: 'Class 11-Sci', dueDate: '20 Aug, 11:59 PM', submitted: 28, totalStudents: 35, status: 'Published' },
  { id: '6', code: 'HW-ACC-106', title: 'Company Balance Sheet & Ledger Balancing', subject: 'Accountancy', class: 'Class 12-Com', dueDate: '22 Aug, 08:00 PM', submitted: 19, totalStudents: 34, status: 'Draft' },
];

function HomeworkPage() {
  const { addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';
  React.useEffect(() => { document.title = t('page.homework') + ' \u2013 VidyaFloww'; }, [t]);
  const [homeworkList, setHomeworkList] = React.useState<HomeworkRecord[]>(INITIAL_HOMEWORK);
  const [classFilter, setClassFilter] = React.useState<string>('All');
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedHomework, setSelectedHomework] = React.useState<HomeworkRecord | null>(null);

  const [newHomework, setNewHomework] = React.useState<Partial<HomeworkRecord>>({
    code: `HW-2026-0${homeworkList.length + 1}`,
    title: '',
    subject: 'Mathematics',
    class: 'Class 10-A',
    dueDate: 'Tomorrow, 11:59 PM',
    submitted: 0,
    totalStudents: 40,
    status: 'Published',
  });

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHomework.title) return;

    const added: HomeworkRecord = {
      id: String(Date.now()),
      code: newHomework.code || `HW-2026-0${homeworkList.length + 1}`,
      title: newHomework.title,
      subject: newHomework.subject || 'Mathematics',
      class: newHomework.class || 'Class 10-A',
      dueDate: newHomework.dueDate || 'Tomorrow, 11:59 PM',
      submitted: 0,
      totalStudents: Number(newHomework.totalStudents) || 40,
      status: (newHomework.status as any) || 'Published',
    };

    setHomeworkList([added, ...homeworkList]);
    setIsCreateModalOpen(false);
    setNewHomework({
      code: `HW-2026-0${homeworkList.length + 2}`,
      title: '',
      subject: 'Mathematics',
      class: 'Class 10-A',
      dueDate: 'Tomorrow, 11:59 PM',
      submitted: 0,
      totalStudents: 40,
      status: 'Published',
    });
    addNotification({
      title: isHindi ? 'असाइनमेंट जारी किया गया' : 'Assignment Dispatched',
      description: `"${added.title}" assigned to ${added.class}. Notifications sent.`,
      type: 'success',
    });
  };

  const handleExportRoster = () => {
    addNotification({
      title: isHindi ? 'होमवर्क एक्सपोर्ट किया गया' : 'Homework Exported',
      description: 'Exported homework assignment roster and submission log as CSV.',
      type: 'success',
    });
  };

  const filteredHomework = React.useMemo(() => {
    return homeworkList.filter((h) => {
      const matchesClass = classFilter === 'All' || h.class === classFilter;
      const matchesStatus = statusFilter === 'All' || h.status === statusFilter;
      return matchesClass && matchesStatus;
    });
  }, [homeworkList, classFilter, statusFilter]);

  const homeworkColumns = [
    {
      header: isHindi ? 'कोड' : 'Code',
      accessorKey: 'code',
      cell: (r: HomeworkRecord) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border text-xs">
          {r.code}
        </span>
      ),
    },
    {
      header: isHindi ? 'असाइनमेंट शीर्षक व विषय' : 'Assignment Title & Subject',
      accessorKey: 'title',
      cell: (r: HomeworkRecord) => (
        <div>
          <p className="font-extrabold text-foreground text-sm leading-tight">{r.title}</p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.subject}</p>
        </div>
      ),
    },
    {
      header: isHindi ? 'कक्षा' : 'Assigned Class',
      accessorKey: 'class',
      cell: (r: HomeworkRecord) => <span className="font-bold text-foreground text-xs">{r.class}</span>,
    },
    {
      header: isHindi ? 'अंतिम तिथि' : 'Due Deadline',
      accessorKey: 'dueDate',
      cell: (r: HomeworkRecord) => <span className="text-muted-foreground text-xs font-semibold">{r.dueDate}</span>,
    },
    {
      header: isHindi ? 'सबमिशन अनुपात' : 'Turned In Ratio',
      accessorKey: 'submitted',
      cell: (r: HomeworkRecord) => {
        const pct = Math.round((r.submitted / r.totalStudents) * 100);
        return (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span className="text-foreground">{r.submitted} / {r.totalStudents}</span>
              <span className="text-emerald-400">{pct}%</span>
            </div>
            <div className="w-24 h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden border border-border/60">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      },
    },
    {
      header: t('col.status'),
      accessorKey: 'status',
      cell: (r: HomeworkRecord) => (
        <VFBadge variant={r.status === 'Published' ? 'success' : r.status === 'Draft' ? 'warning' : 'outline'}>
          {r.status === 'Published' ? (isHindi ? 'प्रकाशित' : r.status) : r.status === 'Draft' ? (isHindi ? 'ड्राफ्ट' : r.status) : (isHindi ? 'समाप्त' : r.status)}
        </VFBadge>
      ),
    },
    {
      header: t('col.action'),
      accessorKey: 'actions',
      cell: (r: HomeworkRecord) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-3.5 w-3.5" />}
          onClick={() => setSelectedHomework(r)}
        >
          {isHindi ? 'सबमिशन देखें' : 'Submissions'}
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* 1. Header Toolbar Box */}
      <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#1a1a1a] border border-border/80 text-xs font-mono">
            <BookMarked className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-bold text-foreground">{isHindi ? 'टर्म 1 सक्रिय' : 'Term 1 Active'}</span>
          </div>
          <VFBadge variant="outline" className="text-xs font-bold font-mono">
            {homeworkList.length} {isHindi ? 'असाइनमेंट' : 'Assignments'}
          </VFBadge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            onClick={handleExportRoster}
            className="h-9 px-3.5 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            {isHindi ? 'आर्काइव एक्सपोर्ट करें' : 'Export Archive'}
          </VFButton>
          <VFButton
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="h-9 px-3.5 text-xs font-bold shadow-xs"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {t('action.add') + ' ' + t('nav.homework')}
          </VFButton>
        </div>
      </div>

      {/* 2. Global Dropdown Filters Bar */}
      <div className="p-3 rounded-lg bg-[#141414] border border-border/80 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          {/* Class Filter */}
          <VFSelect
            value={classFilter}
            onChange={(e) => setClassFilter(String(e.target.value))}
            options={[
              { label: t('form.allClasses'), value: 'All' },
              { label: 'Class 9-A', value: 'Class 9-A' },
              { label: 'Class 10-A', value: 'Class 10-A' },
              { label: 'Class 10-B', value: 'Class 10-B' },
              { label: 'Class 11-Sci', value: 'Class 11-Sci' },
              { label: 'Class 12-Com', value: 'Class 12-Com' },
            ]}
            className="w-44 bg-[#1a1a1a] border-border h-9 text-xs"
          />

          {/* Status Filter */}
          <VFSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(String(e.target.value))}
            options={[
              { label: t('form.allStatuses'), value: 'All' },
              { label: t('status.published'), value: 'Published' },
              { label: t('status.draft'), value: 'Draft' },
              { label: t('status.closed'), value: 'Closed' },
            ]}
            className="w-36 bg-[#1a1a1a] border-border h-9 text-xs"
          />
        </div>

        <span className="text-xs font-mono text-muted-foreground font-semibold">
          {filteredHomework.length} Assignments Active
        </span>
      </div>

      {/* 3. Main Data Table */}
      <VFDataTable
        columns={homeworkColumns}
        data={filteredHomework}
        filterPlaceholder="Search homework by code, title, topic, or subject..."
      />

      {/* Create Homework Modal */}
      <VFDialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create & Broadcast Assignment"
        description="Assign coursework, attachment resources, and submission deadlines to classrooms."
      >
        <form onSubmit={handleCreateHomework} className="space-y-3.5 pt-1">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Assignment Title & Topic</label>
            <VFInput
              required
              placeholder="e.g. Chapter 4: Quadratic Equations Problem Set"
              value={newHomework.title}
              onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
              className="bg-[#1a1a1a] border-border h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Subject</label>
              <VFSelect
                value={newHomework.subject || 'Mathematics'}
                onChange={(e) => setNewHomework({ ...newHomework, subject: String(e.target.value) })}
                options={[
                  { label: 'Mathematics', value: 'Mathematics' },
                  { label: 'Physics', value: 'Physics' },
                  { label: 'Chemistry', value: 'Chemistry' },
                  { label: 'English Core', value: 'English Core' },
                  { label: 'Computer Science', value: 'Computer Science' },
                  { label: 'Accountancy', value: 'Accountancy' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Target Class</label>
              <VFSelect
                value={newHomework.class || 'Class 10-A'}
                onChange={(e) => setNewHomework({ ...newHomework, class: String(e.target.value) })}
                options={[
                  { label: 'Class 9-A', value: 'Class 9-A' },
                  { label: 'Class 10-A', value: 'Class 10-A' },
                  { label: 'Class 10-B', value: 'Class 10-B' },
                  { label: 'Class 11-Sci', value: 'Class 11-Sci' },
                  { label: 'Class 12-Com', value: 'Class 12-Com' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Due Deadline</label>
              <VFInput
                placeholder="e.g. Tomorrow, 11:59 PM"
                value={newHomework.dueDate}
                onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Publish Status</label>
              <VFSelect
                value={newHomework.status || 'Published'}
                onChange={(e) => setNewHomework({ ...newHomework, status: e.target.value as any })}
                options={[
                  { label: 'Publish Immediately', value: 'Published' },
                  { label: 'Save as Draft', value: 'Draft' },
                ]}
                className="bg-[#1a1a1a] border-border h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Detailed Instructions & Problem References</label>
            <VFTextarea
              rows={3}
              placeholder="List question numbers from textbook or add assignment rubrics..."
              className="bg-[#1a1a1a] border-border text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Check className="h-4 w-4" />}>
              Broadcast Assignment
            </VFButton>
          </div>
        </form>
      </VFDialog>

      {/* Submissions Detail Modal */}
      {selectedHomework && (
        <VFDialog
          isOpen={Boolean(selectedHomework)}
          onClose={() => setSelectedHomework(null)}
          title={`Submissions Dossier: ${selectedHomework.code}`}
          description={`${selectedHomework.title} · ${selectedHomework.class} (${selectedHomework.subject})`}
        >
          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3 rounded-lg bg-[#1a1a1a] border border-border/60 flex justify-between items-center">
              <div>
                <p className="font-bold text-foreground">Overall Turn-in Ratio</p>
                <p className="text-muted-foreground">{selectedHomework.submitted} out of {selectedHomework.totalStudents} submitted</p>
              </div>
              <VFBadge variant="success" className="text-sm font-bold font-mono">
                {Math.round((selectedHomework.submitted / selectedHomework.totalStudents) * 100)}% Completed
              </VFBadge>
            </div>

            <div className="space-y-2">
              {[
                { roll: '101', name: 'Aditya Verma', status: 'Turned In', time: 'Yesterday, 04:20 PM', file: 'Aditya_Math_HW.pdf' },
                { roll: '102', name: 'Priya Sharma', status: 'Turned In', time: 'Yesterday, 07:15 PM', file: 'Priya_Math_HW.pdf' },
                { roll: '103', name: 'Rahul Gupta', status: 'Turned In', time: 'Today, 09:10 AM', file: 'Rahul_HW_Soln.pdf' },
                { roll: '104', name: 'Sneha Rao', status: 'Pending', time: 'Due Tonight', file: 'None' },
              ].map((s, i) => (
                <div key={i} className="p-2.5 rounded bg-[#1a1a1a] border border-border/60 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-foreground">Roll #{s.roll} · {s.name}</p>
                    <p className="text-[11px] text-muted-foreground">{s.time} · {s.file}</p>
                  </div>
                  <VFBadge variant={s.status === 'Turned In' ? 'success' : 'warning'} className="text-[10px]">
                    {s.status}
                  </VFBadge>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-border/50">
              <VFButton size="sm" onClick={() => setSelectedHomework(null)}>
                Close Dossier
              </VFButton>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
