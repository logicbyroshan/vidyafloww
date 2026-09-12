import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFCard,
  VFDialog,
} from '@vidyafloww/ui';
import {
  ExternalLink,
  BookMarked,
  Search,
  Eye,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

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
    hindiTitle: 'गणित (NCERT Maths) क्लास 10',
    subject: 'Mathematics',
    grade: 'Class 10',
    pages: 240,
    author: 'NCERT Curriculum Directorate',
    drmProtected: true,
    totalCopies: 45,
    availableCopies: 12,
    previewSummary: 'Covers Real Numbers, Polynomials, Linear Equations in Two Variables, Quadratic Equations, and Arithmetic Progressions with exemplar exercises.',
  },
  {
    id: 'BK-NCERT-PHY11',
    isbn: '978-93-5292-188-3',
    title: 'NCERT Physics Laboratory Manual',
    hindiTitle: 'फिजिक्स लैब मैनुअल (Class 11 & 12)',
    subject: 'Physics',
    grade: 'Class 11 & 12',
    pages: 180,
    author: 'Department of Science Education',
    drmProtected: true,
    totalCopies: 30,
    availableCopies: 8,
    previewSummary: 'Complete laboratory protocol for vernier callipers, screw gauge, simple pendulum, focal length calculation, and projectile verification.',
  },
  {
    id: 'BK-CHEM-12',
    isbn: '978-93-5292-230-9',
    title: 'Comprehensive Chemistry Vol. 2',
    hindiTitle: 'केमिस्ट्री वॉल्यूम 2 (Class 12)',
    subject: 'Chemistry',
    grade: 'Class 12',
    pages: 360,
    author: 'Dr. O.P. Tandon & Board Panel',
    drmProtected: true,
    totalCopies: 25,
    availableCopies: 5,
    previewSummary: 'In-depth coverage of Organic Chemistry, Haloalkanes & Haloarenes, Aldehydes & Ketones, Biomolecules, and Polymerization reactions.',
  },
  {
    id: 'BK-HIST-09',
    isbn: '978-93-5292-311-5',
    title: 'Contemporary India & Democratic Politics',
    hindiTitle: 'कंटेम्पररी इंडिया व डेमोक्रेटिक पॉलिटिक्स',
    subject: 'Social Science',
    grade: 'Class 9',
    pages: 210,
    author: 'NCERT Social Science Group',
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
    fine: '₹25.00',
    status: 'Return Due',
  },
];

function ELibraryOverviewPage() {
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';
  const [selectedBook, setSelectedBook] = React.useState<EBookCard | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const standalonePort = '8014';
  const standaloneUrl = `http://localhost:${standalonePort}`;

  const handleLaunchLibraryPortal = (path = '') => {
    const url = `${standaloneUrl}${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: isHindi ? 'ई-लाइब्रेरी पोर्टल खोला जा रहा है' : 'Opening E-Library',
      description: isHindi ? 'पोर्ट 8014 पर डिजिटल लाइब्रेरी पोर्टल पर भेजा जा रहा है।' : 'Redirecting to dedicated library portal on port 8014.',
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
    <VFPageContainer className="space-y-4 w-full">
      {/* ── TOP TOOLBAR BAR ── */}
      <div className="p-3 rounded-[4px] bg-[#0d0d0d] border border-border/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
              {isHindi ? 'डिजिटल ई-लाइब्रेरी व रीडिंग हब (Digital E-Library)' : 'Digital E-Library & Reading Hub'}
            </h1>
            <VFBadge variant="outline" className="text-[10.5px] font-mono font-bold bg-[#141414] text-muted-foreground">
              Port: {standalonePort}
            </VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isHindi
              ? 'टेक्स्टबुक कैटलॉग, NCERT स्टडी मटीरियल, फिजिकल बुक इश्यू रजिस्टर व DRM डिजिटल रीडर।'
              : 'K-12 textbook catalog, NCERT curriculum exemplars, physical circulation ledgers & DRM reading tools.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => handleLaunchLibraryPortal()}
            className="rounded-[4px] gap-1.5 text-xs font-bold h-8 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isHindi ? 'ई-लाइब्रेरी पोर्टल लॉन्च करें' : 'Launch E-Library Portal'}</span>
          </VFButton>
        </div>
      </div>

      {/* ── FEATURED TEXTBOOKS ── */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? 'डिजिटल टेक्स्टबुक्स व स्टडी मटीरियल' : 'Featured Digital Textbooks & Curriculum'}
            </h2>
            <span className="text-[11px] font-mono text-muted-foreground">
              ({filteredBooks.length} {isHindi ? 'बुक्स' : 'Books'})
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'बुक या सब्जेक्ट सर्च करें...' : 'Search title, subject, or grade...'}
              className="w-full h-8 pl-8 pr-3 rounded-[4px] bg-[#141414] border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-zinc-400 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="p-3.5 rounded-[4px] border border-border/80 bg-[#121212] hover:bg-[#161616] hover:border-zinc-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono text-muted-foreground">
                    {book.grade} · {book.subject}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-[3px] border border-emerald-500/20">
                    {book.availableCopies} Copies
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {isHindi ? book.hindiTitle : book.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {book.author}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-mono text-[10px] truncate">{book.isbn}</span>
                <span className="text-foreground font-semibold flex items-center gap-1">
                  <Eye className="w-3 h-3 text-muted-foreground" />
                  {book.pages}p
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PHYSICAL CIRCULATION TABLE ── */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isHindi ? 'फिजिकल बुक सर्कुलेशन व इश्यू रजिस्टर' : 'Physical Book Circulation & Issue Ledger'}
            </span>
            <VFBadge variant="outline" className="text-[10px] font-mono bg-[#161616]">
              Barcode Scanner Sync
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'स्टूडेंट्स और टीचर्स को जारी की गई बुक्स का रियल-टाइम रिकॉर्ड।'
            : 'Active student loans, return schedules, and overdue tracking.'
        }
        className="rounded-[4px] border-border/90 bg-[#0d0d0d]"
        headerClassName="py-2.5 px-3.5"
        bodyClassName="p-0"
        actions={
          <button
            onClick={() => handleLaunchLibraryPortal('/circulation')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isHindi ? 'फुल लेजर देखें' : 'Full Circulation Ledger'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 bg-[#121212] text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3.5">{isHindi ? 'लोन ID' : 'Loan ID'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'बुक टाइटल' : 'Book Title'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'बारकोड' : 'Barcode'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'बोरोअर स्टूडेंट' : 'Borrower'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'क्लास' : 'Class'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'ड्यू डेट' : 'Due Date'}</th>
                <th className="py-2.5 px-3.5 text-right">{isHindi ? 'स्टेटस' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {CIRCULATION_RECORDS.map((r) => (
                <tr key={r.id} className="hover:bg-[#141414] transition-colors">
                  <td className="py-2.5 px-3.5 font-mono font-bold text-primary">{r.id}</td>
                  <td className="py-2.5 px-3.5 font-bold text-foreground">{r.bookTitle}</td>
                  <td className="py-2.5 px-3.5 font-mono text-muted-foreground text-[11px]">{r.barcode}</td>
                  <td className="py-2.5 px-3.5 text-foreground">{r.borrowerName}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{r.borrowerClass}</td>
                  <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{r.dueDate}</td>
                  <td className="py-2.5 px-3.5 text-right">
                    <VFBadge variant={r.status === 'Active Issue' ? 'success' : 'warning'} className="text-[10px]">
                      {r.status}
                    </VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* ── BOOK PREVIEW MODAL ── */}
      {selectedBook && (
        <VFDialog
          isOpen={Boolean(selectedBook)}
          onClose={() => setSelectedBook(null)}
          title={isHindi ? selectedBook.hindiTitle : selectedBook.title}
          description={`${selectedBook.grade} · ${selectedBook.subject} · ${selectedBook.author}`}
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton variant="outline" size="sm" onClick={() => setSelectedBook(null)}>
                {isHindi ? 'क्लोज़' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={() => {
                  setSelectedBook(null);
                  handleLaunchLibraryPortal(`/reader/${selectedBook.id}`);
                }}
                className="font-bold"
                leftIcon={<BookMarked className="w-3.5 h-3.5" />}
              >
                {isHindi ? 'ई-रीडर में पढ़ें' : 'Open in E-Reader'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ISBN:</span>
                <span className="font-mono text-foreground">{selectedBook.isbn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'टोटल पेजेस:' : 'Page Count:'}</span>
                <span className="font-mono text-foreground">{selectedBook.pages} Pages</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'अवेलेबल कॉपीज:' : 'Available Copies:'}</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedBook.availableCopies} of {selectedBook.totalCopies}</span>
              </div>
            </div>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed">
              {selectedBook.previewSummary}
            </p>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
