import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFPageHeader,
  VFButton,
  VFBadge,
  VFCard,
  VFStatCard,
  VFDialog,
} from '@vidyafloww/ui';
import {
  BookOpen,
  ExternalLink,
  BookMarked,
  Clock,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  Eye,
  Sparkles,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/elibrary')({
  component: ELibraryOverviewPage,
});

interface EBookCard {
  id: string;
  isbn: string;
  title: string;
  hindiTitle: string;
  subject: string;
  grade: string;
  pages: number;
  author: string;
  color: string;
  drmProtected: boolean;
  totalCopies: number;
  availableCopies: number;
  previewSummary: string;
}

const FEATURED_BOOKS: EBookCard[] = [
  {
    id: 'BK-NCERT-M10',
    isbn: '978-93-5292-124-1',
    title: 'NCERT Mathematics Class 10',
    hindiTitle: 'गणित — कक्षा १० पाठ्यपुस्तक',
    subject: 'Mathematics',
    grade: 'Class 10',
    pages: 240,
    author: 'NCERT Curriculum Directorate',
    color: 'from-blue-950/60 to-slate-900',
    drmProtected: true,
    totalCopies: 45,
    availableCopies: 12,
    previewSummary: 'Covers Real Numbers, Polynomials, Linear Equations in Two Variables, Quadratic Equations, and Arithmetic Progressions with exemplar exercises.',
  },
  {
    id: 'BK-NCERT-PHY11',
    isbn: '978-93-5292-188-3',
    title: 'NCERT Physics Laboratory Manual',
    hindiTitle: 'भौतिक विज्ञान प्रायोगिक नियमावली',
    subject: 'Physics',
    grade: 'Class 11 & 12',
    pages: 180,
    author: 'Department of Science Education',
    color: 'from-emerald-950/60 to-slate-900',
    drmProtected: true,
    totalCopies: 30,
    availableCopies: 8,
    previewSummary: 'Complete laboratory protocol for vernier callipers, screw gauge, simple pendulum, focal length calculation, and projectile verification.',
  },
  {
    id: 'BK-CHEM-12',
    isbn: '978-93-5292-230-9',
    title: 'Comprehensive Chemistry Vol. 2',
    hindiTitle: 'रसायन विज्ञान भाग २',
    subject: 'Chemistry',
    grade: 'Class 12',
    pages: 360,
    author: 'Dr. O.P. Tandon & Board Panel',
    color: 'from-purple-950/60 to-slate-900',
    drmProtected: true,
    totalCopies: 25,
    availableCopies: 5,
    previewSummary: 'In-depth coverage of Organic Chemistry, Haloalkanes & Haloarenes, Aldehydes & Ketones, Biomolecules, and Polymerization reactions.',
  },
  {
    id: 'BK-HIST-09',
    isbn: '978-93-5292-311-5',
    title: 'Contemporary India & Democratic Politics',
    hindiTitle: 'समकालीन भारत व लोकतांत्रिक राजनीति',
    subject: 'Social Science',
    grade: 'Class 9',
    pages: 210,
    author: 'NCERT Social Science Group',
    color: 'from-amber-950/60 to-slate-900',
    drmProtected: true,
    totalCopies: 40,
    availableCopies: 18,
    previewSummary: 'The French Revolution, Socialism in Europe, Physical Features of India, Drainage Systems, and Constitutional Democratic Frameworks.',
  },
];

const CIRCULATION_RECORDS = [
  {
    id: 'CIRC-2026-901',
    bookTitle: 'NCERT Mathematics Class 10',
    barcode: 'BC-9789352921241',
    borrowerName: 'Aarav Sharma',
    borrowerClass: 'Class 10-A',
    issueDate: '01 Sep 2026',
    dueDate: '15 Sep 2026',
    fine: '₹0.00',
    status: 'Active Issue',
  },
  {
    id: 'CIRC-2026-902',
    bookTitle: 'NCERT Physics Laboratory Manual',
    barcode: 'BC-9789352921883',
    borrowerName: 'Karan Malhotra',
    borrowerClass: 'Class 11-B',
    issueDate: '28 Aug 2026',
    dueDate: '11 Sep 2026',
    fine: '₹0.00',
    status: 'Active Issue',
  },
  {
    id: 'CIRC-2026-903',
    bookTitle: 'Comprehensive Chemistry Vol. 2',
    barcode: 'BC-9789352922309',
    borrowerName: 'Ananya Roy',
    borrowerClass: 'Class 12-A',
    issueDate: '20 Aug 2026',
    dueDate: '03 Sep 2026',
    fine: '₹25.00 (Overdue)',
    status: 'Return Due',
  },
];

function ELibraryOverviewPage() {
  const { addNotification } = useGlobalStore();
  const [selectedBook, setSelectedBook] = React.useState<EBookCard | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLaunchLibraryPortal = (path = '') => {
    const url = `https://library.vidyafloww.com${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: 'Opening Digital E-Library',
      description: 'Redirecting to dedicated reading portal on library.vidyafloww.com',
      type: 'info',
    });
  };

  const filteredBooks = FEATURED_BOOKS.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <VFPageContainer className="space-y-4">
      <VFPageHeader
        title="Digital E-Library & Reading Hub"
        description="डिजिटल ई-पुस्तकालय व अध्ययन केंद्र — K-12 textbook catalog, NCERT curriculum exemplars, physical circulation ledgers & DRM reading tools"
        actions={
          <div className="flex items-center gap-2">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => {
                addNotification({
                  title: 'Barcode Scanner Ready',
                  description: 'Camera barcode scanner initialized for book lookup.',
                  type: 'info',
                });
              }}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              Scan Barcode
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={() => handleLaunchLibraryPortal()}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <span>Launch Dedicated E-Library</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </VFButton>
          </div>
        }
      />

      {/* Top Standalone Transition Banner */}
      <div className="p-4 rounded-[4px] border border-primary/30 bg-gradient-to-r from-primary/10 via-[#18181b] to-[#121214] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-[4px] bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">
                Dedicated E-Library & DRM Reading Subsystem Available
              </h2>
              <VFBadge variant="outline" className="text-[10px] font-mono border-primary/40 text-primary">
                library.vidyafloww.com · Port 8014
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
              In-browser DRM document streaming, physical book barcode circulation, automatic fine ledgers, and Sepia/Dark reading modes operate on a dedicated CDN and storage cluster.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="primary"
            size="sm"
            onClick={() => handleLaunchLibraryPortal()}
            className="rounded-[4px] gap-1.5 font-bold text-xs"
          >
            <span>Open Reading Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </VFButton>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <VFStatCard
          title="Cataloged Volumes"
          value="14,850 Books"
          description="Physical & digital titles"
          accentColor="primary"
          icon={<BookMarked className="w-4 h-4 text-primary" />}
        />
        <VFStatCard
          title="Books In Circulation"
          value="342 Borrowed"
          trend="up"
          trendLabel="Active student loans"
          accentColor="emerald"
          icon={<Users className="w-4 h-4 text-emerald-400" />}
        />
        <VFStatCard
          title="Overdue Returns"
          value="18 Returns"
          description="Automated SMS sent"
          accentColor="rose"
          icon={<Clock className="w-4 h-4 text-rose-400" />}
        />
        <VFStatCard
          title="Active Digital Readers"
          value="89 Online"
          trend="up"
          trendLabel="Reading NCERT now"
          accentColor="cyan"
          icon={<BookOpen className="w-4 h-4 text-cyan-400" />}
        />
      </div>

      {/* Digital Textbooks Catalog Grid */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-foreground">
              Featured Digital Textbooks & Curriculum Exemplars
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              ({filteredBooks.length} titles)
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search subject, title, grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs rounded-[3px] border border-border bg-[#141414] text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group border border-border hover:border-primary/50 rounded-[4px] bg-[#141414] flex flex-col justify-between overflow-hidden transition-all duration-150 hover:shadow-lg"
            >
              <div>
                {/* Book Cover Header Banner */}
                <div className={`h-24 bg-gradient-to-br ${book.color} border-b border-border p-3 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-[3px] bg-black/60 border border-white/10 text-[10px] font-mono text-white/90">
                      {book.grade}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-[3px] bg-emerald-950/70 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      {book.availableCopies} Copies Available
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-white/60">
                    ISBN: {book.isbn}
                  </div>
                </div>

                <div className="p-3.5 space-y-2">
                  <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors leading-snug">
                    {book.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    {book.hindiTitle}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {book.previewSummary}
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>{book.pages} Pages</span>
                    <span className="flex items-center gap-1 text-primary">
                      <ShieldCheck className="w-3 h-3" />
                      DRM Secure
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3.5 pt-0 grid grid-cols-2 gap-2">
                <VFButton
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBook(book)}
                  className="w-full rounded-[4px] text-xs font-semibold gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </VFButton>
                <VFButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleLaunchLibraryPortal(`/reader?book=${book.id}`)}
                  className="w-full rounded-[4px] text-xs font-semibold gap-1"
                >
                  <span>Read E-Book</span>
                  <ExternalLink className="w-3 h-3" />
                </VFButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circulation Ledger Table */}
      <VFCard
        title="Active Book Loans & Physical Circulation Ledger"
        description="Live tracking of issued physical volumes, due dates, borrower details and overdue penalties"
        className="rounded-[4px]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono bg-[#161616]">
                <th className="py-2.5 px-3 font-semibold">Transaction ID</th>
                <th className="py-2.5 px-3 font-semibold">Book Title</th>
                <th className="py-2.5 px-3 font-semibold">Barcode Tag</th>
                <th className="py-2.5 px-3 font-semibold">Borrower Name</th>
                <th className="py-2.5 px-3 font-semibold">Class / Wing</th>
                <th className="py-2.5 px-3 font-semibold">Issue Date</th>
                <th className="py-2.5 px-3 font-semibold">Return Due Date</th>
                <th className="py-2.5 px-3 font-semibold">Penalty</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CIRCULATION_RECORDS.map((r) => (
                <tr key={r.id} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                    {r.id}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-foreground">
                    {r.bookTitle}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">
                    {r.barcode}
                  </td>
                  <td className="py-2.5 px-3 text-foreground font-medium">
                    {r.borrowerName}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground font-mono">
                    {r.borrowerClass}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground font-mono">
                    {r.issueDate}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground font-mono">
                    {r.dueDate}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold">
                    {r.fine}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${
                      r.status === 'Return Due'
                        ? 'bg-rose-950/70 border border-rose-500/30 text-rose-400'
                        : 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-400'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* Book Chapter Preview Modal */}
      {selectedBook && (
        <VFDialog
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          title={`E-Book Preview: ${selectedBook.title}`}
          description={`${selectedBook.grade} · ${selectedBook.subject} · ${selectedBook.pages} Pages`}
          footerActions={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-muted-foreground font-mono">
                ISBN: {selectedBook.isbn}
              </span>
              <div className="flex items-center gap-2">
                <VFButton
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBook(null)}
                  className="rounded-[4px] text-xs"
                >
                  Close Preview
                </VFButton>
                <VFButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const id = selectedBook.id;
                    setSelectedBook(null);
                    handleLaunchLibraryPortal(`/reader?book=${id}`);
                  }}
                  className="rounded-[4px] text-xs font-semibold gap-1.5"
                >
                  <span>Launch Full DRM Reader</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </VFButton>
              </div>
            </div>
          }
        >
          <div className="space-y-3 py-2 text-xs">
            <div className="p-4 rounded-[4px] bg-[#101012] border border-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="font-bold text-foreground">Chapter 1 — Syllabus Overview & Practical Outline</span>
                <VFBadge variant="outline" className="text-[10px] font-mono">Page 1 of {selectedBook.pages}</VFBadge>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {selectedBook.previewSummary}
              </p>

              <div className="p-3 rounded-[3px] bg-[#161618] border border-[#26262a] text-[11px] space-y-1">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Key Chapter Competencies
                </p>
                <p className="text-muted-foreground">• Formulating hypotheses and solving board examination model questions.</p>
                <p className="text-muted-foreground">• Step-by-step mathematical proofs and laboratory instrumentation diagrams.</p>
              </div>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}

