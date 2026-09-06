import * as React from 'react';
import { createPortal } from 'react-dom';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFBadge,
  VFButton,
  VFInput,
  VFSelect,
  VFDrawer,
  VFCard,
  cn,
} from '@vidyafloww/ui';
import {
  BookOpen,
  Search,
  Plus,
  Lock,
  ShieldAlert,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Coffee,
  Database,
  FileText,
  UploadCloud,
  Trash2,
  Check,
  X,
  FileUp,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/elibrary')({
  component: ELibraryPage,
});

export interface ELibraryBook {
  id: string;
  title: string;
  subject: string;
  grade: string;
  publisher: string;
  type: 'Textbook' | 'Reference' | 'Lab Manual' | 'Exemplar';
  edition: string;
  code: string;
  readersCount: number;
  digitalSource: string;
  chapters: string[];
  coverTheme?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'orange' | 'cyan' | 'blue' | 'purple' | 'teal';
  pdfFileName?: string;
  pdfFileSize?: string;
  pdfUrl?: string;
}

// 12 Prescribed Curriculum Volumes with Rich Cover Metadata
const INITIAL_CATALOG: ELibraryBook[] = [
  {
    id: 'ELIB-10-MTH',
    title: 'Mathematics – Textbook for Class X',
    subject: 'Mathematics',
    grade: 'Class 10',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Rationalized Edition',
    code: 'NCERT Code: 1062',
    readersCount: 234,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'indigo',
    chapters: ['Real Numbers', 'Polynomials', 'Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Trigonometry', 'Circles', 'Statistics', 'Probability'],
  },
  {
    id: 'ELIB-10-SCI',
    title: 'Science – Textbook for Class X',
    subject: 'Science',
    grade: 'Class 10',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Rationalized Edition',
    code: 'NCERT Code: 1064',
    readersCount: 310,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'emerald',
    chapters: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Life Processes', 'Control & Coordination', 'Light & Reflection', 'Electricity', 'Our Environment'],
  },
  {
    id: 'ELIB-10-ENG',
    title: 'First Flight – English Reader Class X',
    subject: 'English',
    grade: 'Class 10',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'NCERT Code: 1059',
    readersCount: 185,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'rose',
    chapters: ['A Letter to God', 'Nelson Mandela: Long Walk to Freedom', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'Glimpses of India', 'Madam Rides the Bus', 'The Proposal'],
  },
  {
    id: 'ELIB-10-SST',
    title: 'Social Science: India & Contemporary World (Class X)',
    subject: 'Social Science',
    grade: 'Class 10',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'NCERT Code: 1065',
    readersCount: 198,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'amber',
    chapters: ['The Rise of Nationalism in Europe', 'Nationalism in India', 'Making of a Global World', 'Resources & Development', 'Power-sharing & Federalism', 'Sectors of Indian Economy'],
  },
  {
    id: 'ELIB-10-HIN',
    title: 'क्षितिज भाग-२ (Kshitij Bhag 2 – मुख्य पाठ्यपुस्तक)',
    subject: 'Hindi',
    grade: 'Class 10',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'NCERT Code: 1057',
    readersCount: 160,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'orange',
    chapters: ['सूरदास के पद', 'राम-लक्ष्मण-परशुराम संवाद', 'उत्साह और अट नहीं रही', 'नेताजी का चश्मा', 'बालगोबिन भगत', 'लखनवी अंदाज़'],
  },
  {
    id: 'ELIB-10-IT',
    title: 'Information Technology (Skill 402) Class X',
    subject: 'Computer Science',
    grade: 'Class 10',
    publisher: 'CBSE Curriculum',
    type: 'Textbook',
    edition: '2026–27 Skill Edition',
    code: 'CBSE-IT-402',
    readersCount: 142,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'cyan',
    chapters: ['Communication Skills', 'Self Management Skills', 'Basic ICT Skills', 'Digital Documentation (Advanced)', 'Electronic Spreadsheet', 'Database Management System (DBMS)', 'Web Applications & Security'],
  },
  {
    id: 'ELIB-12-PHY',
    title: 'Physics Part-I & Part-II (Class XII)',
    subject: 'Physics',
    grade: 'Class 12',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'NCERT Code: 1214 & 1215',
    readersCount: 290,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'blue',
    chapters: ['Electric Charges & Fields', 'Electrostatic Potential & Capacitance', 'Current Electricity', 'Moving Charges & Magnetism', 'Electromagnetic Induction', 'Ray Optics & Optical Instruments', 'Wave Optics', 'Semiconductor Electronics'],
  },
  {
    id: 'ELIB-12-CHM',
    title: 'Chemistry Part-I & Part-II (Class XII)',
    subject: 'Chemistry',
    grade: 'Class 12',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'NCERT Code: 1217 & 1218',
    readersCount: 245,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'purple',
    chapters: ['Solutions', 'Electrochemistry', 'Chemical Kinetics', 'd and f-Block Elements', 'Coordination Compounds', 'Haloalkanes & Haloarenes', 'Alcohols, Phenols & Ethers', 'Aldehydes, Ketones & Carboxylic Acids', 'Biomolecules'],
  },
  {
    id: 'ELIB-12-MTH',
    title: 'Mathematics Part-I & Part-II (Class XII)',
    subject: 'Mathematics',
    grade: 'Class 12',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'NCERT Code: 1211 & 1212',
    readersCount: 275,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'indigo',
    chapters: ['Relations & Functions', 'Inverse Trigonometric Functions', 'Matrices & Determinants', 'Continuity & Differentiability', 'Application of Derivatives', 'Integrals', 'Differential Equations', 'Vector Algebra', 'Three Dimensional Geometry', 'Probability'],
  },
  {
    id: 'ELIB-12-ACC',
    title: 'Double Entry Book Keeping – T.S. Grewal (Class XII)',
    subject: 'Accountancy',
    grade: 'Class 12',
    publisher: 'Sultan Chand & Sons',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'ISBN: 978-9391090123',
    readersCount: 190,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'emerald',
    chapters: ['Accounting for Partnership Firms – Fundamentals', 'Goodwill: Nature & Valuation', 'Reconstitution of Partnership Firm', 'Dissolution of Partnership Firm', 'Accounting for Share Capital', 'Issue of Debentures', 'Cash Flow Statement'],
  },
  {
    id: 'ELIB-12-BST',
    title: 'Business Studies: Principles and Functions of Management',
    subject: 'Business Studies',
    grade: 'Class 12',
    publisher: 'NCERT',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'NCERT Code: 1222',
    readersCount: 178,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'amber',
    chapters: ['Nature and Significance of Management', 'Principles of Management', 'Business Environment', 'Planning & Organising', 'Staffing & Directing', 'Controlling', 'Financial Management', 'Marketing Management', 'Consumer Protection'],
  },
  {
    id: 'ELIB-12-CS',
    title: 'Computer Science with Python by Sumita Arora (Class XII)',
    subject: 'Computer Science',
    grade: 'Class 12',
    publisher: 'Dhanpat Rai & Co.',
    type: 'Textbook',
    edition: '2026–27 Edition',
    code: 'ISBN: 978-8183189912',
    readersCount: 195,
    digitalSource: 'School Digital Library DB',
    coverTheme: 'teal',
    chapters: ['Python Revision Tour', 'Functions in Python', 'File Handling (Text, Binary, CSV)', 'Data Structures (Linear List & Stack)', 'Computer Networks', 'Database Concepts with MySQL', 'Interface Python with MySQL'],
  },
];

// Rich Palette Tokens for Realistic Book Covers
const BOOK_THEMES = {
  indigo: {
    bg: 'from-[#1e1b4b] via-[#0f172a] to-[#020617]',
    accent: 'text-indigo-400',
    spine: 'from-indigo-600/40 via-indigo-900/20 to-transparent',
    badge: 'bg-indigo-500/25 text-indigo-300 border-indigo-500/40',
    border: 'border-indigo-500/30',
    motif: '∑ π √x ∫ dx',
  },
  emerald: {
    bg: 'from-[#064e3b] via-[#022c22] to-[#01140f]',
    accent: 'text-emerald-400',
    spine: 'from-emerald-600/40 via-emerald-900/20 to-transparent',
    badge: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40',
    border: 'border-emerald-500/30',
    motif: '⚗ ⚛ 🧬 🔬',
  },
  rose: {
    bg: 'from-[#881337] via-[#4c0519] to-[#20020a]',
    accent: 'text-rose-400',
    spine: 'from-rose-600/40 via-rose-900/20 to-transparent',
    badge: 'bg-rose-500/25 text-rose-300 border-rose-500/40',
    border: 'border-rose-500/30',
    motif: '✍ 📖 🪶 📜',
  },
  amber: {
    bg: 'from-[#78350f] via-[#451a03] to-[#1f0a01]',
    accent: 'text-amber-400',
    spine: 'from-amber-600/40 via-amber-900/20 to-transparent',
    badge: 'bg-amber-500/25 text-amber-300 border-amber-500/40',
    border: 'border-amber-500/30',
    motif: '🏛 🌍 ⚖ 📜',
  },
  orange: {
    bg: 'from-[#7c2d12] via-[#431407] to-[#1c0802]',
    accent: 'text-orange-400',
    spine: 'from-orange-600/40 via-orange-900/20 to-transparent',
    badge: 'bg-orange-500/25 text-orange-300 border-orange-500/40',
    border: 'border-orange-500/30',
    motif: 'क ख ग घ ॐ',
  },
  cyan: {
    bg: 'from-[#164e63] via-[#083344] to-[#021820]',
    accent: 'text-cyan-400',
    spine: 'from-cyan-600/40 via-cyan-900/20 to-transparent',
    badge: 'bg-cyan-500/25 text-cyan-300 border-cyan-500/40',
    border: 'border-cyan-500/30',
    motif: '0101 < /> { }',
  },
  blue: {
    bg: 'from-[#1e3a8a] via-[#172554] to-[#0a102a]',
    accent: 'text-blue-400',
    spine: 'from-blue-600/40 via-blue-900/20 to-transparent',
    badge: 'bg-blue-500/25 text-blue-300 border-blue-500/40',
    border: 'border-blue-500/30',
    motif: 'E=mc² ⚡ λ ν',
  },
  purple: {
    bg: 'from-[#581c87] via-[#3b0764] to-[#1a032c]',
    accent: 'text-purple-400',
    spine: 'from-purple-600/40 via-purple-900/20 to-transparent',
    badge: 'bg-purple-500/25 text-purple-300 border-purple-500/40',
    border: 'border-purple-500/30',
    motif: '⬡ Benzene 🧪',
  },
  teal: {
    bg: 'from-[#134e4a] via-[#042f2e] to-[#011413]',
    accent: 'text-teal-400',
    spine: 'from-teal-600/40 via-teal-900/20 to-transparent',
    badge: 'bg-teal-500/25 text-teal-300 border-teal-500/40',
    border: 'border-teal-500/30',
    motif: 'def main(): 🐍',
  },
};

// Realistic Physical Book Cover Component
function BookCover({
  title,
  grade,
  subject,
  publisher,
  theme = 'indigo',
  className,
}: {
  title: string;
  grade: string;
  subject: string;
  publisher: string;
  theme?: keyof typeof BOOK_THEMES;
  className?: string;
}) {
  const t = BOOK_THEMES[theme] || BOOK_THEMES.indigo;
  return (
    <div
      className={cn(
        "relative rounded-[4px] aspect-[3/4.4] overflow-hidden flex flex-col justify-between p-2 select-none shrink-0 shadow-md border group-hover:scale-[1.02] transition-transform duration-200",
        `bg-gradient-to-b ${t.bg}`,
        t.border,
        className
      )}
    >
      {/* 3D Spine Crease */}
      <div className={cn("absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r", t.spine, "border-r border-black/40 pointer-events-none")} />
      {/* Glossy Diagonal Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      {/* Physical Page Edge Depth */}
      <div className="absolute inset-y-0.5 right-0 w-1 bg-gradient-to-l from-white/30 via-zinc-400/20 to-transparent rounded-r-[2px] pointer-events-none" />

      {/* Top Header: Publisher & Grade */}
      <div className="relative z-10 pl-2">
        <div className="flex items-center justify-between gap-1">
          <span className="font-extrabold text-[10px] tracking-wider text-white/90 uppercase truncate">
            {publisher === 'NCERT' ? 'NCERT' : publisher}
          </span>
          <span className={cn("text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] border shrink-0", t.badge)}>
            {grade}
          </span>
        </div>
      </div>

      {/* Center Motif & Book Title */}
      <div className="relative z-10 pl-2 my-auto text-center py-1.5">
        <div className={cn("text-lg font-black mb-1 opacity-85 tracking-widest", t.accent)}>
          {t.motif}
        </div>
        <p className="text-xs font-black text-white leading-snug line-clamp-3 uppercase tracking-tight drop-shadow-sm">
          {title}
        </p>
        <span className={cn("inline-block text-[10px] font-bold mt-1 px-2 py-0.5 rounded-[2px] bg-black/50 border border-white/15 truncate max-w-full", t.accent)}>
          {subject}
        </span>
      </div>

      {/* Bottom Barcode / Official Seal */}
      <div className="relative z-10 pl-2 pt-1 border-t border-white/15 flex items-center justify-between text-[9px] text-white/70 font-mono">
        <span>EDITION 2026</span>
        <div className="flex gap-0.5">
          <span className="w-0.5 h-2.5 bg-white/70" />
          <span className="w-1 h-2.5 bg-white/50" />
          <span className="w-0.5 h-2.5 bg-white/70" />
          <span className="w-1.5 h-2.5 bg-white/60" />
        </div>
      </div>
    </div>
  );
}

export function ELibraryPage() {
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'ई-लाइब्रेरी' : 'E-Library') + ' \u2013 VidyaFloww';
  }, [isHindi]);

  // Catalog State with local storage fallback for user-added books
  const [catalog, setCatalog] = React.useState<ELibraryBook[]>(() => {
    try {
      const saved = localStorage.getItem('vidyafloww_elibrary_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_CATALOG;
  });

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGrade, setSelectedGrade] = React.useState('All');
  const [selectedPublisher, setSelectedPublisher] = React.useState('All');

  // Study Room states
  const [activeStudyBook, setActiveStudyBook] = React.useState<ELibraryBook | null>(null);
  const [activeChapterIdx, setActiveChapterIdx] = React.useState(0);
  const [activePage, setActivePage] = React.useState(1);
  const [readerTheme, setReaderTheme] = React.useState<'dark' | 'light' | 'sepia'>('dark');
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const [windowBlurred, setWindowBlurred] = React.useState(false);
  const [showScreenshotAlert, setShowScreenshotAlert] = React.useState(false);

  // Add Book Drawer states
  const [isAddBookDrawerOpen, setIsAddBookDrawerOpen] = React.useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = React.useState<File | null>(null);
  const [pdfFileInfo, setPdfFileInfo] = React.useState<{ name: string; size: string; pages: number } | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [newTitle, setNewTitle] = React.useState('');
  const [newGrade, setNewGrade] = React.useState('Class 10');
  const [newSubject, setNewSubject] = React.useState('Mathematics');
  const [newPublisher, setNewPublisher] = React.useState('NCERT');
  const [newEdition, setNewEdition] = React.useState('2026–27 Academic Edition');
  const [newCode, setNewCode] = React.useState('');
  const [newTheme, setNewTheme] = React.useState<keyof typeof BOOK_THEMES>('indigo');
  const [newChaptersText, setNewChaptersText] = React.useState('');

  const handleFileChange = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      addNotification({
        title: isHindi ? 'अमान्य फ़ाइल प्रकार' : 'Invalid File Type',
        description: isHindi ? 'कृपया एक वैध PDF डिजिटल पाठ्यपुस्तक चुनें।' : 'Please select a valid PDF digital textbook document.',
        type: 'warning',
      });
      return;
    }
    setSelectedPdfFile(file);
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const estimatedPages = Math.max(16, Math.round(file.size / (55 * 1024)));
    setPdfFileInfo({
      name: file.name,
      size: `${sizeMB} MB`,
      pages: estimatedPages,
    });

    if (!newTitle.trim()) {
      const cleanName = file.name.replace(/\.pdf$/i, '').replace(/[_-]/g, ' ');
      setNewTitle(cleanName);
    }
  };

  // Anti-Screenshot & Screen Capture Detection
  React.useEffect(() => {
    if (!activeStudyBook) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for PrintScreen key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        setShowScreenshotAlert(true);
      }
      // Block Ctrl+P (Print) and Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        addNotification({
          title: isHindi ? 'कार्रवाई प्रतिबंधित' : 'Action Restricted',
          description: isHindi ? 'संस्थागत DRM नीति: डिजिटल पुस्तकों का प्रिंट या सेव करना अक्षम है।' : 'Institutional DRM: Printing and saving digital textbooks is strictly disabled.',
          type: 'warning',
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        setShowScreenshotAlert(true);
      }
    };

    // When snipping tool or screen capture takes focus, blur fires
    const handleBlur = () => setWindowBlurred(true);
    const handleFocus = () => setWindowBlurred(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [activeStudyBook, isHindi, addNotification]);

  const filteredCatalog = React.useMemo(() => {
    return catalog.filter((item) => {
      const matchesGrade = selectedGrade === 'All' || item.grade === selectedGrade;
      const matchesPub = selectedPublisher === 'All' || item.publisher === selectedPublisher;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.publisher.toLowerCase().includes(q);
      return matchesGrade && matchesPub && matchesSearch;
    });
  }, [catalog, searchQuery, selectedGrade, selectedPublisher]);

  const handleOpenStudyRoom = (book: ELibraryBook) => {
    setActiveStudyBook(book);
    setActiveChapterIdx(0);
    setActivePage(1);
    addNotification({
      title: isHindi ? 'अध्ययन कक्ष सक्रिय' : 'Study Room Active',
      description: `${book.title} [${book.code}] ${isHindi ? 'सुरक्षित डिजिटल मोड में खोला गया।' : 'opened in protected DRM reader.'}`,
      type: 'info',
    });
  };

  const handleAddBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      addNotification({
        title: isHindi ? 'आवश्यक फ़ील्ड' : 'Validation Error',
        description: isHindi ? 'पुस्तक का शीर्षक आवश्यक है।' : 'Book Title is required.',
        type: 'warning',
      });
      return;
    }

    const chaps = newChaptersText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    const newBook: ELibraryBook = {
      id: `ELIB-SCH-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      grade: newGrade,
      publisher: newPublisher,
      type: 'Textbook',
      edition: newEdition.trim() || '2026–27 Academic Edition',
      code: newCode.trim() || `SCH-LIB-${Math.floor(1000 + Math.random() * 9000)}`,
      readersCount: 1,
      digitalSource: 'School Digital Library DB',
      coverTheme: newTheme,
      chapters: chaps.length > 0 ? chaps : [
        'Chapter 1: Curriculum Overview',
        'Chapter 2: Fundamental Principles',
        'Chapter 3: Solved Exemplars',
        'Chapter 4: Practice Assessment',
      ],
      pdfFileName: pdfFileInfo?.name,
      pdfFileSize: pdfFileInfo?.size,
      pdfUrl: selectedPdfFile ? URL.createObjectURL(selectedPdfFile) : undefined,
    };

    const updated = [newBook, ...catalog];
    setCatalog(updated);
    try {
      const toStore = updated.map(({ pdfUrl, ...rest }) => rest);
      localStorage.setItem('vidyafloww_elibrary_catalog', JSON.stringify(toStore));
    } catch {}

    setIsAddBookDrawerOpen(false);
    setSelectedPdfFile(null);
    setPdfFileInfo(null);
    setNewTitle('');
    setNewCode('');
    setNewChaptersText('');

    addNotification({
      title: isHindi ? 'पुस्तक प्रकाशित की गई' : 'Book Published',
      description: `${newBook.title} ${isHindi ? 'सफलतापूर्वक डिजिटल लाइब्रेरी में प्रकाशित कर दी गई है।' : 'successfully published to digital library catalog.'}`,
      type: 'success',
    });
  };

  return (
    <VFPageContainer className="space-y-4">
      {/* Universal Big Box Container for E-Library Catalog — No internal scrollbar */}
      <VFCard
        title={
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-4.5 w-4.5 text-teal-400 shrink-0" />
            <span className="text-base font-extrabold text-foreground tracking-tight">
              {isHindi ? 'डिजिटल ई-लाइब्रेरी कैटलॉग' : 'Digital E-Library Catalog'}
            </span>
            <VFBadge variant="outline" className="text-xs font-mono font-bold bg-[#1a1a1a] border-border text-foreground">
              {catalog.length} {isHindi ? 'पुस्तकें' : 'Volumes'}
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'पाठ्यपुस्तकें, संदर्भ ग्रंथ व डिजिटल अध्ययन सामग्री (संरक्षित पठन मोड)'
            : 'Curated digital textbooks, NCERT exemplars & reference volumes in DRM study mode'
        }
        headerClassName="py-3 px-4 sm:px-5"
        className="rounded-[4px] border-border/80 bg-card shadow-xs"
        bodyClassName="p-4 sm:p-5 space-y-4"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Box */}
            <div className="relative w-48 sm:w-56">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <VFInput
                placeholder={isHindi ? 'पुस्तक, विषय, कोड खोजें...' : 'Search books, subjects, code...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
              />
            </div>

            {/* Grade Filter */}
            <div className="w-28 sm:w-32">
              <VFSelect
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(String(e.target.value))}
                options={[
                  { label: isHindi ? 'सभी कक्षाएं' : 'All Classes', value: 'All' },
                  { label: 'Class 10', value: 'Class 10' },
                  { label: 'Class 12', value: 'Class 12' },
                  { label: 'Class 11', value: 'Class 11' },
                  { label: 'Class 9', value: 'Class 9' },
                  { label: 'Class 8', value: 'Class 8' },
                  { label: 'Class 6', value: 'Class 6' },
                ]}
                className="bg-[#1a1a1a] border-border h-8 text-xs font-bold rounded-[4px]"
              />
            </div>

            {/* Publisher Filter */}
            <div className="w-32 sm:w-36">
              <VFSelect
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(String(e.target.value))}
                options={[
                  { label: isHindi ? 'सभी प्रकाशक' : 'All Publishers', value: 'All' },
                  { label: 'NCERT', value: 'NCERT' },
                  { label: 'CBSE Curriculum', value: 'CBSE Curriculum' },
                  { label: 'Dhanpat Rai & Co.', value: 'Dhanpat Rai & Co.' },
                  { label: 'Sultan Chand & Sons', value: 'Sultan Chand & Sons' },
                ]}
                className="bg-[#1a1a1a] border-border h-8 text-xs font-bold rounded-[4px]"
              />
            </div>

            {/* Add New Book Button (Opens Drawer) */}
            <VFButton
              size="sm"
              onClick={() => setIsAddBookDrawerOpen(true)}
              className="h-8 px-3 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-[4px] cursor-pointer"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              {isHindi ? 'नई पुस्तक जोड़ें' : 'Add New Book'}
            </VFButton>
          </div>
        }
      >
        {/* Catalog Grid inside Unified Big Box Container — Naturally flows with main page scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {filteredCatalog.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 hover:border-teal-500/50 hover:bg-[#171717] transition-all duration-200 flex flex-col justify-between shadow-xs group"
            >
              <div className="flex gap-3.5 items-start">
                {/* Book Cover Photo */}
                <div className="w-[105px] shrink-0">
                  <BookCover
                    title={item.title}
                    grade={item.grade}
                    subject={item.subject}
                    publisher={item.publisher}
                    theme={item.coverTheme || 'indigo'}
                  />
                </div>

                {/* Book Metadata */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-teal-500/15 text-teal-400 border border-teal-500/30">
                        {item.grade}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-muted/60 text-muted-foreground border border-border">
                        {item.subject}
                      </span>
                      {item.pdfFileName && (
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                          <FileText className="h-3 w-3" /> PDF
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-foreground text-[15px] leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="mt-2 p-2 rounded-[4px] bg-[#1a1a1a] border border-border/60 space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">{isHindi ? 'प्रकाशक:' : 'Publisher:'}</span>
                        <span className="font-bold text-foreground truncate max-w-[130px]">{item.publisher}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">{isHindi ? 'अध्याय:' : 'Chapters:'}</span>
                        <span className="font-bold text-teal-400 font-mono">{item.chapters.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">{isHindi ? 'पाठक:' : 'Readers:'}</span>
                        <span className="font-bold text-emerald-400 font-mono">{item.readersCount} Students</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-mono text-xs text-muted-foreground font-semibold mt-1.5 truncate">
                    {item.code}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  {isHindi ? 'सुरक्षित (अ-डाउनलोडनीय)' : 'Protected (No Download)'}
                </span>
                <VFButton
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenStudyRoom(item)}
                  className="h-7.5 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground hover:text-teal-400 rounded-[4px] cursor-pointer"
                  leftIcon={<BookOpen className="h-3 w-3 text-teal-400" />}
                >
                  {isHindi ? 'अध्ययन कक्ष ↗' : 'Study Room ↗'}
                </VFButton>
              </div>
            </div>
          ))}
        </div>

        {filteredCatalog.length === 0 && (
          <div className="p-8 text-center rounded-[4px] bg-[#141414] border border-border/80">
            <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="font-bold text-foreground text-sm">
              {isHindi ? 'कोई ई-पुस्तक नहीं मिली' : 'No digital books match your search'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isHindi ? 'खोज शब्द बदलें या ऊपर दिए गए बटन से नई पुस्तक जोड़ें।' : 'Try adjusting your search query or click Add New Book above.'}
            </p>
          </div>
        )}
      </VFCard>

      {/* 4. Native Study Room (Full Screen Protected Reader View rendered via Portal) */}
      {activeStudyBook && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col select-none overflow-hidden"
          onContextMenu={(e) => {
            e.preventDefault();
            addNotification({
              title: isHindi ? 'प्रतिलिपि अक्षम' : 'Action Blocked',
              description: isHindi ? 'संस्थागत DRM नीति: पुस्तक को सहेजना या डाउनलोड करना वर्जित है।' : 'Institutional DRM Policy: Downloading and copying digital textbook material is strictly disabled.',
              type: 'warning',
            });
          }}
        >
          {/* Study Room Top Navigation Bar */}
          <div className="h-14 px-4 bg-[#141414] border-b border-border flex items-center justify-between shrink-0 z-20">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setActiveStudyBook(null)}
                className="h-8 px-2.5 rounded-[4px] bg-[#1e1e1e] hover:bg-[#282828] text-foreground text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-border/80"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {isHindi ? 'वापस' : 'Exit Study Room'}
              </button>

              <div className="h-4 w-[1px] bg-border/80" />

              <div className="min-w-0">
                <h2 className="text-sm font-extrabold text-foreground truncate flex items-center gap-2">
                  <span>{activeStudyBook.title}</span>
                  <span className="text-xs font-mono font-normal text-muted-foreground">({activeStudyBook.code})</span>
                </h2>
                <p className="text-[11px] text-teal-400 font-bold truncate">
                  {activeStudyBook.grade} · {activeStudyBook.subject} · {activeStudyBook.chapters[activeChapterIdx] || 'Chapter Overview'}
                </p>
              </div>
            </div>

            {/* Reader Controls & Security Status */}
            <div className="flex items-center gap-2 shrink-0">
              <VFBadge variant="outline" className="text-[11px] text-emerald-400 border-emerald-500/40 bg-emerald-500/10 hidden md:flex items-center gap-1.5">
                <Lock className="h-3 w-3" />
                {isHindi ? 'सुरक्षित अध्ययन कक्ष (DRM सक्रिय)' : 'Native Study Room (DRM Active)'}
              </VFBadge>

              {/* Theme Selector */}
              <div className="flex items-center bg-[#1e1e1e] p-0.5 rounded-[4px] border border-border/80">
                <button
                  onClick={() => setReaderTheme('dark')}
                  className={cn("p-1.5 rounded-[3px] transition-colors cursor-pointer", readerTheme === 'dark' ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground")}
                  title="Dark Reading Mode"
                >
                  <Moon className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setReaderTheme('sepia')}
                  className={cn("p-1.5 rounded-[3px] transition-colors cursor-pointer", readerTheme === 'sepia' ? "bg-amber-600 text-white" : "text-muted-foreground hover:text-foreground")}
                  title="Warm Sepia Mode"
                >
                  <Coffee className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setReaderTheme('light')}
                  className={cn("p-1.5 rounded-[3px] transition-colors cursor-pointer", readerTheme === 'light' ? "bg-zinc-200 text-zinc-900" : "text-muted-foreground hover:text-foreground")}
                  title="Paper Light Mode"
                >
                  <Sun className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-[#1e1e1e] px-2 py-1 rounded-[4px] border border-border/80 text-xs font-mono">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
                  className="text-muted-foreground hover:text-foreground cursor-pointer px-1"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="font-bold text-foreground min-w-[38px] text-center">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                  className="text-muted-foreground hover:text-foreground cursor-pointer px-1"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Disabled Download Button with Tooltip */}
              <div className="relative group/dl">
                <button
                  disabled
                  className="h-8 px-2.5 rounded-[4px] bg-[#1e1e1e]/60 border border-border/40 text-muted-foreground/60 text-xs font-bold flex items-center gap-1.5 cursor-not-allowed"
                >
                  <Lock className="h-3 w-3" />
                  {isHindi ? 'डाउनलोड वर्जित' : 'Download Locked'}
                </button>
                <div className="absolute right-0 top-full mt-1.5 hidden group-hover/dl:block z-50 bg-[#1e1e1e] text-[10px] text-muted-foreground p-2 rounded-[4px] border border-border shadow-xl w-48 text-center">
                  {isHindi ? 'संस्थान की नीति के तहत डिजिटल पुस्तकों का डाउनलोड या निर्यात प्रतिबंधित है।' : 'Digital textbook download or export is disabled under institutional copyright rules.'}
                </div>
              </div>
            </div>
          </div>

          {/* Study Room Body: Left Chapters Drawer & Main Reading Canvas */}
          <div className="flex-1 min-h-0 flex relative">
            {/* Left Chapter Index Drawer */}
            <div className="w-72 bg-[#121212] border-r border-border hidden md:flex flex-col shrink-0">
              <div className="p-3 border-b border-border/80 flex items-center justify-between">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-teal-400" />
                  {isHindi ? 'अध्याय अनुक्रमणिका' : 'Chapter Directory'}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground font-bold">
                  {activeStudyBook.chapters.length} Chaps
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {activeStudyBook.chapters.map((chap, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveChapterIdx(i);
                      setActivePage(1);
                    }}
                    className={cn(
                      "w-full text-left p-2.5 rounded-[4px] text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer",
                      activeChapterIdx === i
                        ? "bg-teal-500/15 text-teal-400 font-bold border border-teal-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-[#1a1a1a]"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cn(
                        "h-5 w-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0",
                        activeChapterIdx === i ? "bg-teal-500/30 text-teal-300" : "bg-muted text-muted-foreground"
                      )}>
                        {i + 1}
                      </span>
                      <span className="truncate">{chap}</span>
                    </div>
                    {activeChapterIdx === i && <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />}
                  </button>
                ))}
              </div>

              {/* Study Room DRM Protection Footer */}
              <div className="p-3 border-t border-border/80 bg-[#161616] text-[11px] text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>VidyaFloww DRM Protected</span>
                </div>
                <p className="text-[10px] leading-tight">
                  Watermarked viewing session. Captures, printing, and saving are strictly disabled.
                </p>
              </div>
            </div>

            {/* Main Reading Canvas */}
            <div
              className={cn(
                "flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 flex justify-center relative",
                readerTheme === 'dark' && "bg-[#0f0f0f] text-zinc-100",
                readerTheme === 'sepia' && "bg-[#f4ecd8] text-[#433422]",
                readerTheme === 'light' && "bg-[#ffffff] text-zinc-900"
              )}
            >
              {/* Dynamic Diagonal Security Watermark Overlay */}
              <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden flex flex-wrap items-center justify-around opacity-[0.05] p-8">
                {Array.from({ length: 18 }).map((_, idx) => (
                  <div key={idx} className="rotate-[-25deg] text-sm font-black font-mono tracking-widest uppercase m-8 whitespace-nowrap">
                    VIDYAFLOWW DRM · ROSHAN SINGH · CLASSROOM USE ONLY · DO NOT CAPTURE
                  </div>
                ))}
              </div>

              {/* Textbook Page Container */}
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className={cn(
                  "w-full max-w-3xl min-h-[850px] p-8 sm:p-12 shadow-2xl rounded-[4px] border transition-all duration-200 relative flex flex-col justify-between select-none",
                  readerTheme === 'dark' && "bg-[#161616] border-zinc-800 text-zinc-100",
                  readerTheme === 'sepia' && "bg-[#fcf8ed] border-[#e2d6b5] text-[#2c2215]",
                  readerTheme === 'light' && "bg-white border-zinc-200 text-zinc-900"
                )}
              >
                {/* Page Header */}
                <div className="border-b pb-3 mb-6 flex items-center justify-between text-xs font-mono opacity-60">
                  <span>{activeStudyBook.publisher} · {activeStudyBook.grade}</span>
                  <span className="font-bold tracking-wider">CHAPTER {activeChapterIdx + 1}: {activeStudyBook.chapters[activeChapterIdx]}</span>
                  <span>PAGE {activePage} OF 4</span>
                </div>

                {/* Page Content Body */}
                <div className="flex-1 space-y-5 text-sm sm:text-base leading-relaxed font-sans">
                  {activeStudyBook.pdfUrl ? (
                    <div className="w-full flex-1 flex flex-col space-y-3">
                      <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-black/10 border border-current/15 text-xs">
                        <div className="flex items-center gap-2 font-bold truncate">
                          <FileText className="h-4 w-4 text-rose-400 shrink-0" />
                          <span className="truncate">{activeStudyBook.pdfFileName || 'School Digital PDF'}</span>
                          {activeStudyBook.pdfFileSize && <span className="font-mono opacity-60">({activeStudyBook.pdfFileSize})</span>}
                        </div>
                        <span className="px-2 py-0.5 rounded-[2px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold shrink-0">
                          School DB Verified
                        </span>
                      </div>
                      <div className="w-full h-[640px] rounded-[4px] overflow-hidden border border-current/20 bg-zinc-950/20">
                        <iframe
                          src={`${activeStudyBook.pdfUrl}#toolbar=0&navpanes=0`}
                          title={activeStudyBook.title}
                          className="w-full h-full border-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {activePage === 1 && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-[4px] border border-primary/30 bg-primary/5">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary block mb-1">
                              NCERT Rationalized Learning Outcomes
                            </span>
                            <h3 className="text-xl font-black">
                              {activeStudyBook.chapters[activeChapterIdx]}
                            </h3>
                            <p className="text-xs opacity-75 mt-1">
                              Prescribed for Academic Year 2026–27. Covers fundamental theorems, algebraic proofs, and standard board assessment patterns.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-extrabold text-base border-b pb-1">1.1 Introduction & Foundational Concepts</h4>
                            <p className="text-sm opacity-90 leading-relaxed">
                              In earlier classes, we explored basic number properties and algebraic identities. In this chapter, we formalize the concepts with rigorous mathematical induction, exploring both prime factorizations and the fundamental nature of real numbers.
                            </p>
                            <div className="p-3.5 rounded-[4px] bg-black/10 border border-current/20 text-xs font-mono space-y-1">
                              <p className="font-bold text-primary">Theorem 1.1 (Fundamental Theorem of Arithmetic):</p>
                              <p className="italic">
                                "Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur."
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-extrabold text-base border-b pb-1">Illustrative Example 1</h4>
                            <p className="text-sm opacity-90">
                              Consider the number <code className="font-mono font-bold bg-black/10 px-1 py-0.5 rounded">4ⁿ</code>, where <code className="font-mono">n</code> is a natural number. Check whether there is any value of <code className="font-mono">n</code> for which <code className="font-mono">4ⁿ</code> ends with the digit zero.
                            </p>
                            <p className="text-xs opacity-80 pl-3 border-l-2 border-primary">
                              <strong>Solution:</strong> If the number <code className="font-mono">4ⁿ</code> ends with zero, it must be divisible by 5. That is, the prime factorisation of <code className="font-mono">4ⁿ</code> must contain the prime 5. But <code className="font-mono">4ⁿ = (2²)ⁿ = 2²ⁿ</code>. The only prime in the factorisation of <code className="font-mono">4ⁿ</code> is 2. By uniqueness of the Fundamental Theorem of Arithmetic, there are no other primes. Hence, there is no natural number <code className="font-mono">n</code> for which <code className="font-mono">4ⁿ</code> ends with zero.
                            </p>
                          </div>
                        </div>
                      )}

                      {activePage === 2 && (
                        <div className="space-y-4">
                          <h4 className="font-extrabold text-lg border-b pb-1">1.2 Revisiting Irrational Numbers</h4>
                          <p className="text-sm opacity-90 leading-relaxed">
                            Recall that a real number <code className="font-mono font-bold">s</code> is called irrational if it cannot be written in the form <code className="font-mono font-bold">p/q</code>, where <code className="font-mono">p</code> and <code className="font-mono">q</code> are integers and <code className="font-mono">q ≠ 0</code>.
                          </p>

                          <div className="p-3.5 rounded-[4px] bg-black/10 border border-current/20 text-xs font-mono space-y-1.5">
                            <p className="font-bold text-primary">Theorem 1.2:</p>
                            <p>Let <code className="font-bold">p</code> be a prime number. If <code className="font-bold">p</code> divides <code className="font-bold">a²</code>, then <code className="font-bold">p</code> divides <code className="font-bold">a</code>, where <code className="font-bold">a</code> is a positive integer.</p>
                          </div>

                          <div className="space-y-2">
                            <h5 className="font-bold text-sm">Theorem 1.3: Prove that √2 is irrational.</h5>
                            <p className="text-xs opacity-90 leading-relaxed pl-3 border-l-2 border-primary">
                              <strong>Proof:</strong> Let us assume to the contrary that √2 is rational. Then there exist co-prime integers <code className="font-mono">a</code> and <code className="font-mono">b</code> (with <code className="font-mono">b ≠ 0</code>) such that <code className="font-mono">√2 = a / b</code>.
                              <br />Squaring both sides: <code className="font-mono">2 = a² / b² ⟹ 2b² = a²</code>.
                              <br />Therefore, 2 divides <code className="font-mono">a²</code>, which implies 2 divides <code className="font-mono">a</code>.
                              <br />Let <code className="font-mono">a = 2c</code> for some integer <code className="font-mono">c</code>.
                              <br />Substituting: <code className="font-mono">2b² = 4c² ⟹ b² = 2c²</code>.
                              <br />This implies 2 divides <code className="font-mono">b</code> as well.
                              <br />Hence, <code className="font-mono">a</code> and <code className="font-mono">b</code> have at least 2 as a common factor. This contradicts our hypothesis that <code className="font-mono">a</code> and <code className="font-mono">b</code> are co-prime.
                              <br /><strong>Conclusion:</strong> √2 is irrational. (Q.E.D.)
                            </p>
                          </div>
                        </div>
                      )}

                      {activePage === 3 && (
                        <div className="space-y-4">
                          <h4 className="font-extrabold text-lg border-b pb-1">1.3 Exemplar Problems & Board Practice</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-[4px] bg-black/10 border border-current/20 space-y-1">
                              <span className="font-mono font-bold text-primary">Problem 1:</span>
                              <p>Express 140 as a product of its prime factors.</p>
                              <p className="font-mono text-[11px] text-emerald-400 mt-1">Answer: 2² × 5 × 7</p>
                            </div>
                            <div className="p-3 rounded-[4px] bg-black/10 border border-current/20 space-y-1">
                              <span className="font-mono font-bold text-primary">Problem 2:</span>
                              <p>Find the LCM and HCF of 12, 15 and 21 by prime factorisation method.</p>
                              <p className="font-mono text-[11px] text-emerald-400 mt-1">HCF = 3, LCM = 420</p>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-[4px] border border-current/25 bg-black/5 space-y-2">
                            <p className="font-bold text-xs uppercase tracking-wider">Formula Quick Reference:</p>
                            <ul className="text-xs list-disc pl-4 space-y-1 font-mono">
                              <li>HCF(a, b) × LCM(a, b) = a × b (for any two positive integers a, b)</li>
                              <li>Every natural number n &gt; 1 can be uniquely decomposed into primes.</li>
                              <li>If p is prime and divides a², then p divides a.</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {activePage === 4 && (
                        <div className="space-y-4">
                          <h4 className="font-extrabold text-lg border-b pb-1">1.4 Chapter Exercise & Self-Assessment</h4>
                          <p className="text-xs opacity-80">
                            Solve the following rationalized CBSE Board syllabus questions. Submit answers via the Homework portal.
                          </p>
                          <div className="space-y-2 text-xs">
                            <div className="p-2.5 rounded-[4px] bg-black/10 flex items-start gap-2">
                              <span className="font-mono font-bold text-primary">Q1.</span>
                              <span>Given that HCF(306, 657) = 9, find LCM(306, 657).</span>
                            </div>
                            <div className="p-2.5 rounded-[4px] bg-black/10 flex items-start gap-2">
                              <span className="font-mono font-bold text-primary">Q2.</span>
                              <span>Prove that 3 + 2√5 is irrational, given that √5 is irrational.</span>
                            </div>
                            <div className="p-2.5 rounded-[4px] bg-black/10 flex items-start gap-2">
                              <span className="font-mono font-bold text-primary">Q3.</span>
                              <span>Explain why 7 × 11 × 13 + 13 and 7 × 6 × 5 × 4 × 3 × 2 × 1 + 5 are composite numbers.</span>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-[4px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                            ✓ You have reached the end of Chapter {activeChapterIdx + 1}. You can navigate to Chapter {activeChapterIdx + 2} from the left directory.
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Page Footer Navigation */}
                <div className="border-t pt-4 mt-8 flex items-center justify-between text-xs font-mono opacity-80">
                  <button
                    disabled={activePage === 1}
                    onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-[4px] border border-current/25 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Previous Page
                  </button>

                  <span className="font-bold">
                    Page {activePage} of 4
                  </span>

                  <button
                    disabled={activePage === 4}
                    onClick={() => setActivePage((p) => Math.min(4, p + 1))}
                    className="px-3 py-1.5 rounded-[4px] border border-current/25 hover:bg-black/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    Next Page
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Shield on Window Blur / Snipping Tool Detection */}
          {windowBlurred && (
            <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150 select-none">
              <div className="h-14 w-14 rounded-[4px] bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-3">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-black text-foreground">
                {isHindi ? '🔒 अध्ययन कक्ष सामग्री सुरक्षित' : '🔒 Study Room View Paused'}
              </h2>
              <p className="text-xs text-muted-foreground max-w-md mt-1.5 leading-relaxed">
                {isHindi
                  ? 'विंडो का फोकस हटने या स्क्रीन कैप्चर टूल सक्रिय होने के कारण पठन सामग्री को सुरक्षित कर दिया गया है। जारी रखने के लिए नीचे क्लिक करें।'
                  : 'Textbook view is shielded while window is unfocused or an external capture tool is active. Click below to resume your study session.'}
              </p>
              <VFButton
                size="sm"
                className="mt-4 rounded-[4px] bg-primary text-primary-foreground font-bold px-4"
                onClick={() => setWindowBlurred(false)}
              >
                {isHindi ? 'सत्र फिर से शुरू करें' : 'Resume Reading Session'}
              </VFButton>
            </div>
          )}

          {/* Screenshot Detection Alert Modal */}
          {showScreenshotAlert && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1f1013] border border-rose-500/80 p-4 rounded-[4px] shadow-2xl text-center max-w-md animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-center gap-2 text-rose-400 font-extrabold text-sm mb-1">
                <ShieldAlert className="h-4 w-4" />
                {isHindi ? 'स्क्रीनशॉट प्रतिबंधित (DRM Policy)' : 'Screenshot Blocked (DRM Policy)'}
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {isHindi
                  ? 'कॉपीराइट सुरक्षा नीति के अंतर्गत डिजिटल पाठ्यपुस्तकों का स्क्रीन कैप्चर या रिकॉर्डिंग प्रतिबंधित है।'
                  : 'School copyright policy prevents capturing or recording digital curriculum materials. All reading sessions are watermarked.'}
              </p>
              <button
                onClick={() => setShowScreenshotAlert(false)}
                className="mt-2.5 text-xs font-bold text-rose-300 hover:text-white underline cursor-pointer"
              >
                {isHindi ? 'स्वीकार करें और बंद करें' : 'I Understand · Dismiss'}
              </button>
            </div>
          )}
        </div>,
        document.body
      )}

      {/* 5. Add New Book Side Drawer (VFDrawer) */}
      <VFDrawer
        isOpen={isAddBookDrawerOpen}
        onClose={() => setIsAddBookDrawerOpen(false)}
        hideHeader={true}
        title={isHindi ? 'स्कूल DB में नई पुस्तक जोड़ें' : 'Add New Book to School Library DB'}
        className="w-[640px] min-w-[320px] sm:min-w-[640px] max-w-[95vw]"
        bodyClassName="p-0 flex flex-col overflow-hidden"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Database className="h-3.5 w-3.5 text-emerald-400" />
              <span>Target: <strong className="text-foreground">School Library DB</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setIsAddBookDrawerOpen(false)}
                className="rounded-[4px] h-8 text-xs font-bold"
              >
                {isHindi ? 'रद्द करें' : 'Cancel'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={handleAddBookSubmit}
                className="rounded-[4px] h-8 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                leftIcon={<Check className="h-3.5 w-3.5" />}
              >
                {isHindi ? 'पुस्तक प्रकाशित करें' : 'Publish Book'}
              </VFButton>
            </div>
          </div>
        }
      >
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden animate-fade-in">
          {/* Header Bar */}
          <div className="w-full bg-[#111113] border-b border-[#242428] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-[4px] bg-[#161619] border border-[#27272e] flex items-center justify-center text-teal-400">
                <FileUp className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-black text-foreground">
                  {isHindi ? 'स्कूल डिजिटल DB में नई पुस्तक जोड़ें' : 'Add New Book to School Library DB'}
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  {isHindi ? 'पाठ्यपुस्तक PDF फ़ाइल चुनें और संस्थागत डेटाबेस में सहेजें।' : 'Upload textbook PDF & catalog metadata directly into school database.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAddBookDrawerOpen(false)}
              className="h-7 w-7 rounded-[4px] hover:bg-[#1f1f23] text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 custom-scrollbar text-xs">
            {/* 1. PDF File Upload & Selection Box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-rose-400" />
                  {isHindi ? 'डिजिटल पाठ्यपुस्तक PDF फ़ाइल *' : 'Digital Textbook PDF Document *'}
                </span>
                {selectedPdfFile && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    ✓ PDF Selected · Ready to index
                  </span>
                )}
              </label>

              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(file);
                }}
              />

              {!selectedPdfFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFileChange(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-[4px] p-5 text-center cursor-pointer transition-all bg-[#141416]",
                    isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-border/80 hover:bg-[#18181b]"
                  )}
                >
                  <div className="h-10 w-10 mx-auto rounded-[4px] bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-foreground">
                    {isHindi ? 'पाठ्यपुस्तक PDF चुनें या यहाँ ड्रैग करें' : 'Click to select textbook PDF or drag & drop'}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {isHindi ? 'समर्थित प्रारूप: .pdf (150 MB तक) · स्कूल स्थानीय DB में अनुक्रमित' : 'Supported format: .pdf (Up to 150 MB) · Stored in School Local DB'}
                  </p>
                  <VFButton
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-3 h-7 px-3 text-[11px] font-bold rounded-[4px] bg-[#1c1c20] border-border"
                  >
                    {isHindi ? 'फ़ाइल ब्राउज़ करें' : 'Browse PDF File'}
                  </VFButton>
                </div>
              ) : (
                <div className="p-3 rounded-[4px] bg-[#161619] border border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-[4px] bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{pdfFileInfo?.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground font-mono">
                        <span>{pdfFileInfo?.size}</span>
                        <span>•</span>
                        <span>~{pdfFileInfo?.pages} Pages</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">School DB Ready</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <VFButton
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-[11px] rounded-[4px]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change
                    </VFButton>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPdfFile(null);
                        setPdfFileInfo(null);
                      }}
                      className="h-7 w-7 rounded-[4px] text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 flex items-center justify-center transition-colors cursor-pointer"
                      title="Remove PDF"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Book Title */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isHindi ? 'पुस्तक का शीर्षक (Title) *' : 'Book Title *'}
              </label>
              <VFInput
                required
                placeholder="e.g. Physics Exemplar Problems Class XII"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
              />
            </div>

            {/* 3. Class & Subject */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isHindi ? 'कक्षा (Grade) *' : 'Class / Grade *'}
                </label>
                <VFSelect
                  value={newGrade}
                  onChange={(e) => setNewGrade(String(e.target.value))}
                  options={[
                    { label: 'Class 10', value: 'Class 10' },
                    { label: 'Class 12', value: 'Class 12' },
                    { label: 'Class 11', value: 'Class 11' },
                    { label: 'Class 9', value: 'Class 9' },
                    { label: 'Class 8', value: 'Class 8' },
                    { label: 'Class 7', value: 'Class 7' },
                    { label: 'Class 6', value: 'Class 6' },
                  ]}
                  className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isHindi ? 'विषय (Subject) *' : 'Subject *'}
                </label>
                <VFInput
                  required
                  placeholder="e.g. Physics, Mathematics"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
                />
              </div>
            </div>

            {/* 4. Publisher & Code */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isHindi ? 'प्रकाशक / बोर्ड *' : 'Publisher / Board *'}
                </label>
                <VFSelect
                  value={newPublisher}
                  onChange={(e) => setNewPublisher(String(e.target.value))}
                  options={[
                    { label: 'NCERT', value: 'NCERT' },
                    { label: 'CBSE Curriculum', value: 'CBSE Curriculum' },
                    { label: 'Dhanpat Rai & Co.', value: 'Dhanpat Rai & Co.' },
                    { label: 'Sultan Chand & Sons', value: 'Sultan Chand & Sons' },
                    { label: 'S. Chand Publishing', value: 'S. Chand Publishing' },
                    { label: 'Oxford University Press', value: 'Oxford University Press' },
                    { label: 'School Faculty Publications', value: 'School Faculty Publications' },
                  ]}
                  className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  {isHindi ? 'पुस्तक कोड / ISBN' : 'Catalog Code / ISBN'}
                </label>
                <VFInput
                  placeholder="e.g. SCH-PHY-1205"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
                />
              </div>
            </div>

            {/* 5. Edition & Session */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                {isHindi ? 'संस्करण / शैक्षणिक सत्र' : 'Edition / Academic Session'}
              </label>
              <VFInput
                placeholder="2026–27 Academic Edition"
                value={newEdition}
                onChange={(e) => setNewEdition(e.target.value)}
                className="bg-[#1a1a1a] border-border h-8 text-xs rounded-[4px]"
              />
            </div>

            {/* 6. Cover Theme with Live Mini Preview */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                {isHindi ? 'कवर थीम और रंग चयन' : 'Book Cover Theme & Live Preview'}
              </label>
              <div className="flex gap-3 items-center">
                {/* Mini Live Preview of BookCover */}
                <div className="w-20 shrink-0">
                  <BookCover
                    title={newTitle || 'Sample Title'}
                    grade={newGrade}
                    subject={newSubject}
                    publisher={newPublisher}
                    theme={newTheme}
                  />
                </div>

                {/* Color Buttons */}
                <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {(Object.keys(BOOK_THEMES) as Array<keyof typeof BOOK_THEMES>).map((thm) => (
                    <button
                      key={thm}
                      type="button"
                      onClick={() => setNewTheme(thm)}
                      className={cn(
                        "p-1.5 rounded-[4px] border text-center text-[10px] font-bold capitalize transition-all cursor-pointer",
                        newTheme === thm ? "border-primary bg-primary/20 text-foreground" : "border-border/60 bg-[#181818] text-muted-foreground hover:bg-[#202020]"
                      )}
                    >
                      {thm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 7. Chapters Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-foreground">
                  {isHindi ? 'डिजिटल अध्याय (प्रति पंक्ति एक अध्याय)' : 'Chapters (One per line)'}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setNewChaptersText([
                      'Chapter 1: Curriculum Overview & Introduction',
                      'Chapter 2: Foundational Principles & Theorems',
                      'Chapter 3: Solved Exemplars & Applications',
                      'Chapter 4: Practice Problems & Board Questions',
                    ].join('\n'));
                  }}
                  className="text-[10px] text-teal-400 hover:underline font-bold"
                >
                  + Insert Sample Chapters
                </button>
              </div>
              <textarea
                rows={3}
                placeholder="Chapter 1: Units & Dimensions&#10;Chapter 2: Kinematics&#10;Chapter 3: Laws of Motion"
                value={newChaptersText}
                onChange={(e) => setNewChaptersText(e.target.value)}
                className="w-full rounded-[4px] bg-[#1a1a1a] border border-border p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary custom-scrollbar"
              />
            </div>

            {/* 8. DRM & School Database Notice */}
            <div className="p-3 rounded-[4px] bg-[#161619] border border-border/80 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-[11px] leading-relaxed">
                <p className="font-bold text-foreground">
                  {isHindi ? 'स्कूल लाइब्रेरी डेटाबेस सुरक्षा (DRM)' : 'School Library Database Security (DRM)'}
                </p>
                <p className="text-muted-foreground">
                  {isHindi
                    ? 'अपलोड की गई PDF स्कूल के स्थानीय DB में सुरक्षित रहेगी। अध्ययन कक्ष में यह बिना डाउनलोड विकल्प और एंटी-स्क्रीनशॉट सुरक्षा के साथ खुलेगी।'
                    : 'Uploaded PDF is indexed directly into the school digital library database. It is served with institutional DRM (non-downloadable, anti-screenshot protection, and diagonal watermarks).'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </VFDrawer>
    </VFPageContainer>
  );
}
