import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFCard,
  VFTable,
  VFTableHead,
  VFTableBody,
  VFTableRow,
  VFTableHeaderCell,
  VFTableCell,
  cn,
} from '@vidyafloww/ui';
import {
  BookMarked,
  Plus,
  Download,
  Send,
  Bold,
  Italic,
  List,
  Quote,
  Image,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  Eye,
  FileText,
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
  instructions: string;
  submitted: number;
  totalStudents: number;
  status: 'Published' | 'Draft' | 'Closed';
  createdAt: string;
}

interface StudentSubmission {
  roll: string;
  name: string;
  status: 'Submitted' | 'Pending' | 'Late';
  submittedAt: string;
  file: string;
}

const CLASSES = [
  { label: 'Class 10 – Section A', value: 'Class 10-A' },
  { label: 'Class 10 – Section B', value: 'Class 10-B' },
  { label: 'Class 9 – Section A', value: 'Class 9-A' },
  { label: 'Class 11 – Science', value: 'Class 11-Sci' },
  { label: 'Class 12 – Commerce', value: 'Class 12-Com' },
];

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'English Core',
  'Computer Science', 'Accountancy', 'Biology', 'Hindi', 'Social Science',
];

const INITIAL_HOMEWORK: HomeworkRecord[] = [
  { id: '1', code: 'HW-2026-01', title: 'Quadratic Equations — Problem Set', subject: 'Mathematics', class: 'Class 10-A', dueDate: '2026-09-08', instructions: 'Solve Ex 4.3 Q1–Q10. Show complete working.', submitted: 38, totalStudents: 42, status: 'Published', createdAt: '07 Sep' },
  { id: '2', code: 'HW-2026-02', title: 'Electromagnetism Numericals', subject: 'Physics', class: 'Class 10-A', dueDate: '2026-09-10', instructions: 'Refer Ch 13. Attempt all 8 numericals on A4 sheet.', submitted: 24, totalStudents: 42, status: 'Published', createdAt: '07 Sep' },
  { id: '3', code: 'HW-2026-03', title: 'Chemical Reactions & Stoichiometry', subject: 'Chemistry', class: 'Class 10-B', dueDate: '2026-09-14', instructions: 'Complete lab report format. Include observations.', submitted: 12, totalStudents: 40, status: 'Published', createdAt: '06 Sep' },
  { id: '4', code: 'HW-2026-04', title: 'Shakespearean Soliloquies Essay', subject: 'English Core', class: 'Class 9-A', dueDate: '2026-09-18', instructions: 'Write 600–800 words critical analysis.', submitted: 35, totalStudents: 38, status: 'Published', createdAt: '05 Sep' },
  { id: '5', code: 'HW-2026-05', title: 'Python Recursion & Binary Search Trees', subject: 'Computer Science', class: 'Class 11-Sci', dueDate: '2026-09-20', instructions: 'Implement 3 recursive functions. Upload .py file.', submitted: 28, totalStudents: 35, status: 'Published', createdAt: '05 Sep' },
  { id: '6', code: 'HW-2026-06', title: 'Company Balance Sheet Ledger', subject: 'Accountancy', class: 'Class 12-Com', dueDate: '2026-09-22', instructions: 'Balance the ledger. Use provided template.', submitted: 19, totalStudents: 34, status: 'Draft', createdAt: '04 Sep' },
];

const MOCK_SUBMISSIONS: StudentSubmission[] = [
  { roll: '101', name: 'Aditya Verma', status: 'Submitted', submittedAt: 'Yesterday, 04:20 PM', file: 'Aditya_Math_HW.pdf' },
  { roll: '102', name: 'Priya Sharma', status: 'Submitted', submittedAt: 'Yesterday, 07:15 PM', file: 'Priya_Math_HW.pdf' },
  { roll: '103', name: 'Rahul Gupta', status: 'Submitted', submittedAt: 'Today, 09:10 AM', file: 'Rahul_HW_Soln.pdf' },
  { roll: '104', name: 'Sneha Rao', status: 'Pending', submittedAt: '—', file: '—' },
  { roll: '105', name: 'Ishaan Malhotra', status: 'Late', submittedAt: 'Today, 02:30 PM', file: 'Ishaan_HW.jpg' },
  { roll: '106', name: 'Ananya Iyer', status: 'Submitted', submittedAt: 'Yesterday, 11:59 PM', file: 'Ananya_HW.pdf' },
  { roll: '107', name: 'Rohan Joshi', status: 'Pending', submittedAt: '—', file: '—' },
  { roll: '108', name: 'Meera Nair', status: 'Submitted', submittedAt: 'Today, 08:45 AM', file: 'Meera_HW.pdf' },
];

// Minimal inline rich-text toolbar formatting
function execFormat(cmd: string, value?: string) {
  document.execCommand(cmd, false, value);
}

function HomeworkPage() {
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'होमवर्क' : 'Homework') + ' – VidyaFloww';
  }, [isHindi]);

  // Unified tab view: assign | review
  const [activeTab, setActiveTab] = React.useState<'assign' | 'review'>('assign');

  // Shared class filter (top toolbar)
  const [selectedClass, setSelectedClass] = React.useState<string>('Class 10-A');
  const [statusFilter, setStatusFilter] = React.useState<string>('All');
  const [searchQ, setSearchQ] = React.useState<string>('');

  // Homework data
  const [homeworkList, setHomeworkList] = React.useState<HomeworkRecord[]>(INITIAL_HOMEWORK);

  // --- ASSIGN TAB STATE ---
  const [assignSubject, setAssignSubject] = React.useState<string>('Mathematics');
  const [assignDue, setAssignDue] = React.useState<string>('');
  const [assignStatus, setAssignStatus] = React.useState<'Published' | 'Draft'>('Published');
  const editorRef = React.useRef<HTMLDivElement>(null);

  // --- REVIEW TAB STATE ---
  const [reviewSelectedHW, setReviewSelectedHW] = React.useState<HomeworkRecord | null>(null);
  const [submissionStatusFilter, setSubmissionStatusFilter] = React.useState<string>('All');
  const [submissionSearch, setSubmissionSearch] = React.useState<string>('');

  // Filtered list for review tab
  const filteredHomework = React.useMemo(() => {
    return homeworkList.filter((h) => {
      const matchClass = h.class === selectedClass;
      const matchStatus = statusFilter === 'All' || h.status === statusFilter;
      const q = searchQ.toLowerCase().trim();
      const matchSearch = !q || h.title.toLowerCase().includes(q) || h.subject.toLowerCase().includes(q) || h.code.toLowerCase().includes(q);
      return matchClass && matchStatus && matchSearch;
    });
  }, [homeworkList, selectedClass, statusFilter, searchQ]);

  const filteredSubmissions = React.useMemo(() => {
    return MOCK_SUBMISSIONS.filter((s) => {
      const matchStatus = submissionStatusFilter === 'All' || s.status === submissionStatusFilter;
      const q = submissionSearch.toLowerCase().trim();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.roll.includes(q);
      return matchStatus && matchSearch;
    });
  }, [submissionStatusFilter, submissionSearch]);

  // Stats for current class
  const classStats = React.useMemo(() => {
    const classHW = homeworkList.filter((h) => h.class === selectedClass);
    const published = classHW.filter((h) => h.status === 'Published').length;
    const drafts = classHW.filter((h) => h.status === 'Draft').length;
    return { total: classHW.length, published, drafts };
  }, [homeworkList, selectedClass]);

  const handleAssignHomework = () => {
    const content = editorRef.current?.innerHTML?.trim() || '';
    const textContent = editorRef.current?.textContent?.trim() || '';

    if (!textContent) {
      addNotification({ title: 'Empty Homework', description: 'Write the homework instructions first.', type: 'warning' });
      return;
    }
    if (!assignDue) {
      addNotification({ title: 'Due Date Required', description: 'Please set a due date.', type: 'warning' });
      return;
    }

    const newHW: HomeworkRecord = {
      id: String(Date.now()),
      code: `HW-2026-0${homeworkList.length + 1}`,
      title: textContent.slice(0, 60) + (textContent.length > 60 ? '…' : ''),
      subject: assignSubject,
      class: selectedClass,
      dueDate: assignDue,
      instructions: content,
      submitted: 0,
      totalStudents: 42,
      status: assignStatus,
      createdAt: 'Today',
    };

    setHomeworkList([newHW, ...homeworkList]);

    if (editorRef.current) editorRef.current.innerHTML = '';
    setAssignDue('');

    addNotification({
      title: assignStatus === 'Published' ? (isHindi ? 'होमवर्क असाइन किया गया' : 'Homework Assigned') : (isHindi ? 'ड्राफ्ट सहेजा गया' : 'Draft Saved'),
      description: `${newHW.code} sent to ${selectedClass} · ${assignSubject}`,
      type: 'success',
    });
  };

  const handleExport = () => {
    addNotification({
      title: isHindi ? 'एक्सपोर्ट पूर्ण' : 'Exported',
      description: `Homework roster for ${selectedClass} exported.`,
      type: 'success',
    });
  };

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── SINGLE UNIFIED HEADER ─────────────────────────────── */}
      <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 shrink-0 shadow-xs">
        {/* Left: Session tag + Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-[3px] bg-[#1a1a1a] border border-border/80 text-xs font-mono shrink-0">
            <BookMarked className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-bold text-foreground">Term 1</span>
          </div>

          <div className="h-4 w-[1px] bg-border/80 hidden sm:block" />

          {/* Tab Toggle */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-0.5 rounded-[4px] border border-border/70 text-xs">
            <button
              type="button"
              id="tab-assign"
              onClick={() => setActiveTab('assign')}
              className={cn(
                'px-3 py-1 font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5',
                activeTab === 'assign'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/70'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{isHindi ? 'असाइन करें' : 'Assign'}</span>
            </button>
            <button
              type="button"
              id="tab-review"
              onClick={() => setActiveTab('review')}
              className={cn(
                'px-3 py-1 font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5',
                activeTab === 'review'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/70'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>{isHindi ? 'समीक्षा करें' : 'Review'}</span>
            </button>
          </div>

          <div className="h-4 w-[1px] bg-border/80 hidden sm:block" />

          {/* Class Picker — shared across both tabs */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap hidden sm:inline">Class:</span>
            <div className="relative">
              <select
                id="class-picker"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setReviewSelectedHW(null);
                }}
                className="h-8 pl-2.5 pr-7 text-xs bg-[#1a1a1a] border border-border rounded-[4px] text-foreground font-bold focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer"
              >
                {CLASSES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Quick class stats */}
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-[3px] bg-[#1a1a1a] border border-border/70 text-muted-foreground">
              <span className="text-foreground font-bold">{classStats.published}</span> active
            </span>
            <span className="px-2 py-0.5 rounded-[3px] bg-[#1a1a1a] border border-border/70 text-muted-foreground">
              <span className="text-amber-400 font-bold">{classStats.drafts}</span> drafts
            </span>
          </div>
        </div>

        {/* Right: Filters + Export (only visible in review tab) / nothing in assign */}
        <div className="flex items-center gap-2 shrink-0">
          {activeTab === 'review' && (
            <>
              {/* Search */}
              <div className="relative">
                <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  className="h-8 pl-8 pr-3 text-xs bg-[#1a1a1a] border border-border rounded-[4px] text-foreground placeholder:text-muted-foreground w-36 focus:outline-none focus:border-zinc-500"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-8 pl-2.5 pr-7 text-xs bg-[#1a1a1a] border border-border rounded-[4px] text-foreground font-semibold focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>

              <VFButton
                size="sm"
                variant="outline"
                onClick={handleExport}
                className="h-8 px-2.5 text-xs font-bold rounded-[4px]"
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                {isHindi ? 'एक्सपोर्ट' : 'Export'}
              </VFButton>
            </>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          TAB 1: ASSIGN HOMEWORK (Rich-text editor)
          ══════════════════════════════════════════════ */}
      {activeTab === 'assign' && (
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          {/* Metadata Row: Subject / Due Date / Status */}
          <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-wrap items-center gap-3 shrink-0">
            {/* Subject */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Subject</label>
              <div className="relative">
                <select
                  id="assign-subject"
                  value={assignSubject}
                  onChange={(e) => setAssignSubject(e.target.value)}
                  className="h-8 pl-2.5 pr-7 text-xs bg-[#1a1a1a] border border-border rounded-[4px] text-foreground font-bold focus:outline-none focus:border-zinc-500 appearance-none cursor-pointer"
                >
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="h-4 w-[1px] bg-border/80" />

            {/* Due Date */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Due</label>
              <input
                type="date"
                id="assign-due"
                value={assignDue}
                onChange={(e) => setAssignDue(e.target.value)}
                className="h-8 px-2.5 text-xs bg-[#1a1a1a] border border-border rounded-[4px] text-foreground font-mono focus:outline-none focus:border-zinc-500 cursor-pointer"
              />
            </div>

            <div className="h-4 w-[1px] bg-border/80" />

            {/* Publish toggle */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Publish</label>
              <div className="flex items-center gap-1 bg-[#1a1a1a] p-0.5 rounded-[4px] border border-border/70 text-xs">
                <button
                  type="button"
                  onClick={() => setAssignStatus('Published')}
                  className={cn(
                    'px-2.5 py-0.5 rounded-[3px] font-bold transition-colors cursor-pointer',
                    assignStatus === 'Published'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Now
                </button>
                <button
                  type="button"
                  onClick={() => setAssignStatus('Draft')}
                  className={cn(
                    'px-2.5 py-0.5 rounded-[3px] font-bold transition-colors cursor-pointer',
                    assignStatus === 'Draft'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Draft
                </button>
              </div>
            </div>

            {/* Target class badge */}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground">Assigning to:</span>
              <span className="text-[11px] font-bold text-foreground font-mono px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded-[3px] text-blue-300">
                {selectedClass}
              </span>
            </div>
          </div>

          {/* Rich-Text Editor Card */}
          <VFCard className="bg-[#141414] border-border/80 flex-1 min-h-0 flex flex-col" bodyClassName="p-0 flex-1 flex flex-col">
            {/* Formatting Toolbar */}
            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-border/70 bg-[#1a1a1a] shrink-0">
              <span className="text-[10px] font-semibold text-muted-foreground mr-2 hidden sm:inline">Format</span>

              {[
                { icon: <Bold className="h-3.5 w-3.5" />, cmd: 'bold', title: 'Bold' },
                { icon: <Italic className="h-3.5 w-3.5" />, cmd: 'italic', title: 'Italic' },
              ].map((btn) => (
                <button
                  key={btn.cmd}
                  type="button"
                  title={btn.title}
                  onMouseDown={(e) => { e.preventDefault(); execFormat(btn.cmd); }}
                  className="p-1.5 rounded-[3px] text-muted-foreground hover:text-foreground hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  {btn.icon}
                </button>
              ))}

              <div className="w-[1px] h-4 bg-border/70 mx-1" />

              <button
                type="button"
                title="Bullet List"
                onMouseDown={(e) => { e.preventDefault(); execFormat('insertUnorderedList'); }}
                className="p-1.5 rounded-[3px] text-muted-foreground hover:text-foreground hover:bg-[#2a2a2a] transition-colors cursor-pointer"
              >
                <List className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                title="Numbered List"
                onMouseDown={(e) => { e.preventDefault(); execFormat('insertOrderedList'); }}
                className="p-1.5 rounded-[3px] text-muted-foreground hover:text-foreground hover:bg-[#2a2a2a] transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                title="Quote Block"
                onMouseDown={(e) => { e.preventDefault(); execFormat('formatBlock', 'blockquote'); }}
                className="p-1.5 rounded-[3px] text-muted-foreground hover:text-foreground hover:bg-[#2a2a2a] transition-colors cursor-pointer"
              >
                <Quote className="h-3.5 w-3.5" />
              </button>

              <div className="w-[1px] h-4 bg-border/70 mx-1" />

              {/* Heading buttons */}
              {['H1', 'H2', 'H3'].map((h) => (
                <button
                  key={h}
                  type="button"
                  title={`Heading ${h.slice(1)}`}
                  onMouseDown={(e) => { e.preventDefault(); execFormat('formatBlock', h.toLowerCase()); }}
                  className="px-1.5 py-1 text-[10px] font-black rounded-[3px] text-muted-foreground hover:text-foreground hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  {h}
                </button>
              ))}

              <div className="w-[1px] h-4 bg-border/70 mx-1" />

              {/* Image / attachment hint */}
              <label
                title="Paste or attach image"
                className="p-1.5 rounded-[3px] text-muted-foreground hover:text-foreground hover:bg-[#2a2a2a] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Image className="h-3.5 w-3.5" />
                <span className="text-[10px] font-semibold hidden sm:inline">Attach Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file || !editorRef.current) return;
                    const url = URL.createObjectURL(file);
                    editorRef.current.focus();
                    execFormat('insertImage', url);
                    e.target.value = '';
                  }}
                />
              </label>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  title="Clear editor"
                  onClick={() => { if (editorRef.current) editorRef.current.innerHTML = ''; }}
                  className="text-[10px] font-semibold text-muted-foreground hover:text-rose-400 transition-colors cursor-pointer px-1.5"
                >
                  Clear
                </button>
                <VFButton
                  size="sm"
                  onClick={handleAssignHomework}
                  className="h-7 px-3 text-[11px] font-bold rounded-[4px] shadow-xs"
                  leftIcon={<Send className="h-3 w-3" />}
                >
                  {assignStatus === 'Published'
                    ? (isHindi ? 'होमवर्क भेजें' : 'Send Homework')
                    : (isHindi ? 'ड्राफ्ट सहेजें' : 'Save Draft')}
                </VFButton>
              </div>
            </div>

            {/* Editor Area */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              id="hw-editor"
              data-placeholder={isHindi
                ? 'यहाँ होमवर्क लिखें... प्रश्न, निर्देश, या चित्र पेस्ट करें।'
                : 'Write homework here… questions, page refs, instructions, or paste a photo of the board.'}
              className={cn(
                'flex-1 min-h-0 overflow-y-auto p-4 text-sm text-foreground leading-relaxed focus:outline-none',
                'prose prose-invert prose-sm max-w-none',
                '[&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground [&:empty]:before:pointer-events-none',
                '[&_blockquote]:border-l-2 [&_blockquote]:border-zinc-500 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_blockquote]:italic',
                '[&_h1]:text-lg [&_h1]:font-black [&_h1]:text-foreground [&_h1]:mb-1',
                '[&_h2]:text-base [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-1',
                '[&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-zinc-300 [&_h3]:mb-1',
                '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-0.5',
                '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-0.5',
                '[&_img]:max-w-full [&_img]:rounded-[4px] [&_img]:border [&_img]:border-border/70 [&_img]:mt-2'
              )}
            />

            {/* Tip bar */}
            <div className="px-4 py-2 border-t border-border/40 shrink-0 flex items-center gap-2 text-[10px] text-muted-foreground bg-[#111]">
              <span className="font-semibold">💡 Tip:</span>
              <span>You can paste a photo of the blackboard directly into the editor. Use Bold for question numbers.</span>
            </div>
          </VFCard>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          TAB 2: REVIEW SUBMISSIONS
          ══════════════════════════════════════════════ */}
      {activeTab === 'review' && (
        <div className="flex-1 min-h-0 flex gap-3">
          {/* Left: Assignment list for selected class */}
          <div className={cn(
            'flex flex-col gap-2 shrink-0 overflow-y-auto',
            reviewSelectedHW ? 'w-80 hidden lg:flex' : 'flex-1'
          )}>
            {filteredHomework.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs">
                No assignments for {selectedClass}
              </div>
            ) : (
              filteredHomework.map((hw) => {
                const pct = Math.round((hw.submitted / hw.totalStudents) * 100);
                const isSelected = reviewSelectedHW?.id === hw.id;
                return (
                  <button
                    key={hw.id}
                    type="button"
                    id={`hw-card-${hw.id}`}
                    onClick={() => setReviewSelectedHW(isSelected ? null : hw)}
                    className={cn(
                      'w-full text-left p-3 rounded-[4px] border transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-[#1e1e1e] border-zinc-500 ring-1 ring-zinc-500/30'
                        : 'bg-[#141414] border-border/80 hover:border-zinc-600 hover:bg-[#181818]'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-mono text-[10px] font-bold text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded-[2px] border border-border/60">
                            {hw.code}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">{hw.createdAt}</span>
                        </div>
                        <p className="font-bold text-foreground text-xs leading-tight truncate">{hw.title}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{hw.subject}</p>
                      </div>
                      <VFBadge
                        variant={hw.status === 'Published' ? 'success' : hw.status === 'Draft' ? 'warning' : 'outline'}
                        className="text-[10px] font-bold shrink-0"
                      >
                        {hw.status}
                      </VFBadge>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono font-bold">
                        <span className="text-muted-foreground">{hw.submitted}/{hw.totalStudents} submitted</span>
                        <span className={pct >= 80 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-rose-400'}>
                          {pct}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-[2px] bg-[#1a1a1a] overflow-hidden border border-border/50">
                        <div
                          className={cn('h-full transition-all rounded-[2px]', pct >= 80 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400')}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                      <span>Due: {hw.dueDate}</span>
                      <span className="flex items-center gap-1 text-blue-400 font-semibold">
                        View Details →
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right: Submission Roster for selected homework */}
          {reviewSelectedHW && (
            <div className="flex-1 min-h-0 flex flex-col gap-3">
              {/* Submission header */}
              <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] font-bold text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded-[2px] border border-border/60">
                      {reviewSelectedHW.code}
                    </span>
                    <span className="text-xs font-bold text-foreground">{reviewSelectedHW.title}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {reviewSelectedHW.subject} · {reviewSelectedHW.class} · Due {reviewSelectedHW.dueDate}
                  </p>
                </div>

                {/* Submission stats */}
                <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                  <span className="px-2 py-1 rounded-[3px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                    ✓ {reviewSelectedHW.submitted} submitted
                  </span>
                  <span className="px-2 py-1 rounded-[3px] bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
                    ✗ {reviewSelectedHW.totalStudents - reviewSelectedHW.submitted} pending
                  </span>
                  <button
                    type="button"
                    onClick={() => setReviewSelectedHW(null)}
                    className="ml-1 text-[10px] text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>
              </div>

              {/* Submission list filters */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative flex-1 max-w-xs">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search student..."
                    value={submissionSearch}
                    onChange={(e) => setSubmissionSearch(e.target.value)}
                    className="h-8 w-full pl-8 pr-3 text-xs bg-[#1a1a1a] border border-border rounded-[4px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="flex items-center gap-1 bg-[#1a1a1a] p-0.5 rounded-[4px] border border-border/70 text-xs">
                  {['All', 'Submitted', 'Pending', 'Late'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSubmissionStatusFilter(s)}
                      className={cn(
                        'px-2.5 py-0.5 rounded-[3px] font-bold transition-colors cursor-pointer',
                        submissionStatusFilter === s
                          ? 'bg-[#242424] text-foreground border border-border/70'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <VFButton
                  size="sm"
                  variant="outline"
                  onClick={handleExport}
                  className="h-8 px-2.5 text-xs font-bold rounded-[4px] ml-auto"
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                >
                  Export
                </VFButton>
              </div>

              {/* Submission table */}
              <VFCard className="bg-[#141414] border-border/80 flex-1 min-h-0 flex flex-col" bodyClassName="p-0 flex-1 overflow-auto">
                <VFTable className="rounded-none border-0 text-xs w-full">
                  <VFTableHead className="bg-[#1a1a1a] sticky top-0 z-10">
                    <VFTableRow>
                      <VFTableHeaderCell className="py-2.5 px-3 text-xs font-bold text-muted-foreground w-20">Roll #</VFTableHeaderCell>
                      <VFTableHeaderCell className="py-2.5 px-3 text-xs font-bold text-muted-foreground">Student</VFTableHeaderCell>
                      <VFTableHeaderCell className="py-2.5 px-3 text-xs font-bold text-muted-foreground">Submitted At</VFTableHeaderCell>
                      <VFTableHeaderCell className="py-2.5 px-3 text-xs font-bold text-muted-foreground">File</VFTableHeaderCell>
                      <VFTableHeaderCell className="py-2.5 px-4 text-xs font-bold text-muted-foreground text-right">Status</VFTableHeaderCell>
                    </VFTableRow>
                  </VFTableHead>
                  <VFTableBody>
                    {filteredSubmissions.length === 0 ? (
                      <VFTableRow>
                        <VFTableCell colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                          No students match the filter.
                        </VFTableCell>
                      </VFTableRow>
                    ) : (
                      filteredSubmissions.map((s) => (
                        <VFTableRow key={s.roll} className="hover:bg-[#1a1a1a]/60">
                          <VFTableCell className="py-2.5 px-3 font-mono font-bold text-muted-foreground text-xs">
                            {s.roll}
                          </VFTableCell>
                          <VFTableCell className="py-2.5 px-3 font-bold text-foreground text-xs">
                            {s.name}
                          </VFTableCell>
                          <VFTableCell className="py-2.5 px-3 text-muted-foreground text-xs font-mono">
                            {s.status === 'Pending' ? (
                              <span className="flex items-center gap-1 text-rose-400">
                                <AlertCircle className="h-3 w-3" /> Not submitted
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-zinc-500" /> {s.submittedAt}
                              </span>
                            )}
                          </VFTableCell>
                          <VFTableCell className="py-2.5 px-3 text-xs">
                            {s.file === '—' ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <span className="flex items-center gap-1 text-blue-400 font-mono cursor-pointer hover:underline">
                                <FileText className="h-3 w-3" /> {s.file}
                              </span>
                            )}
                          </VFTableCell>
                          <VFTableCell className="py-2.5 px-4 text-right">
                            <VFBadge
                              variant={s.status === 'Submitted' ? 'success' : s.status === 'Late' ? 'warning' : 'danger'}
                              className="text-[10px] font-bold"
                            >
                              {s.status === 'Submitted' ? (
                                <span className="flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> {s.status}</span>
                              ) : s.status}
                            </VFBadge>
                          </VFTableCell>
                        </VFTableRow>
                      ))
                    )}
                  </VFTableBody>
                </VFTable>
              </VFCard>
            </div>
          )}

          {/* Placeholder when no HW selected in review */}
          {!reviewSelectedHW && filteredHomework.length > 0 && (
            <div className="hidden lg:flex flex-1 items-center justify-center text-muted-foreground text-xs flex-col gap-2">
              <Eye className="h-8 w-8 opacity-30" />
              <p className="font-semibold">Select an assignment to view submissions</p>
            </div>
          )}
        </div>
      )}
    </VFPageContainer>
  );
}
