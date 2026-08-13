import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  BookOpen,
  BookMarked,
  Users,
  Award,
  SlidersHorizontal,
  Plus,
  Send,
  AlertCircle,
  Download,
  Barcode,
  History,
  RotateCcw,
  BarChart3,
  Bookmark,
} from 'lucide-react';

export const Route = createFileRoute('/library')({
  component: LibraryPage,
});

function LibraryPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const bookData = [
    { isbn: 'ISBN-978-01', title: 'Concepts of Physics (Vol 1)', author: 'H.C. Verma', category: 'Science / Physics', copies: 12, available: 8, status: 'In Stock' },
    { isbn: 'ISBN-978-02', title: 'NCERT Mathematics Class 10', author: 'NCERT Editorial', category: 'Mathematics', copies: 25, available: 4, status: 'In Stock' },
    { isbn: 'ISBN-978-03', title: 'Organic Chemistry Principles', author: 'Morrison & Boyd', category: 'Science / Chemistry', copies: 8, available: 0, status: 'All Issued' },
  ];

  const bookColumns = [
    { header: 'ISBN Barcode', accessorKey: 'isbn', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.isbn}</span> },
    { header: 'Book Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Author', accessorKey: 'author' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Total Copies', accessorKey: 'copies' },
    { header: 'Available', accessorKey: 'available', cell: (r: any) => <span className="font-mono font-bold text-emerald-500">{r.available}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'All Issued' ? 'warning' : 'success'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Library Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Books Cataloged" value="4,850 Titles" icon={<BookOpen className="h-5 w-5 text-primary" />} trend="up" trendLabel="+120 New Volumes" />
        <VFStatCard title="Currently Issued" value="412 Books" icon={<BookMarked className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="Circulating" />
        <VFStatCard title="Overdue Books" value="18 Books" icon={<AlertCircle className="h-5 w-5 text-destructive" />} trend="down" trendLabel="Fine Alerts Sent" />
        <VFStatCard title="Active Members" value="1,180 Members" icon={<Users className="h-5 w-5 text-emerald-500" />} description="Students & Staff" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Book Catalog
  // ----------------------------------------------------
  const catalogContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Library Book Master Catalog</h3>
          <p className="text-xs text-muted-foreground">Search by ISBN, title, author, or Dewey decimal classification.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add New Book Title</VFButton>
      </div>
      <VFDataTable columns={bookColumns} data={bookData} filterPlaceholder="Search book title, author, or ISBN..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Books
  // ----------------------------------------------------
  const booksContent = (
    <div className="space-y-4">
      <VFCard title="Book Title & Edition Records">
        <p className="text-xs text-muted-foreground mb-3">Manage book publisher editions, release years, and rack shelf locations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Book Copies
  // ----------------------------------------------------
  const copiesContent = (
    <div className="space-y-4">
      <VFCard title="Barcode Accession Copy Tracking">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Unique accession numbers (e.g. ACC-2026-001) for physical volume copies.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Categories
  // ----------------------------------------------------
  const categoriesContent = (
    <div className="space-y-4">
      <VFCard title="Dewey Decimal & Subject Categories">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Science & Technology (500)</span>
            <p className="text-muted-foreground text-xs mt-1">1,840 Volumes · Physics, Chemistry, Bio</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Mathematics (510)</span>
            <p className="text-muted-foreground text-xs mt-1">920 Volumes · Algebra, Geometry, Calculus</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Literature & Fiction (800)</span>
            <p className="text-muted-foreground text-xs mt-1">1,200 Volumes · Classics, Novels, Drama</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Authors & Publishers
  // ----------------------------------------------------
  const authorsPublishersContent = (
    <div className="space-y-4">
      <VFCard title="Author & Publisher Directory Master">
        <p className="text-xs text-muted-foreground mb-3">NCERT, Oxford University Press, Pearson, S. Chand, and Tata McGraw Hill.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Library Members
  // ----------------------------------------------------
  const membersContent = (
    <div className="space-y-4">
      <VFCard title="Student & Staff Library Membership Register">
        <p className="text-xs text-muted-foreground mb-3">Barcode member cards, max book issue limits (3 books/student, 5 books/teacher).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Issue Books
  // ----------------------------------------------------
  const issueContent = (
    <div className="space-y-4">
      <VFCard title="Circulation Terminal — Issue Book Barcode Scanner">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Scan member ID card and book accession barcode to issue in 2 seconds.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Return Books
  // ----------------------------------------------------
  const returnContent = (
    <div className="space-y-4">
      <VFCard title="Circulation Terminal — Return Book Console & Fine Check">
        <p className="text-xs text-muted-foreground mb-3">Scan returned book barcode, calculate overdue fines, and return volume to shelf.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Renewals
  // ----------------------------------------------------
  const renewalsContent = (
    <div className="space-y-4">
      <VFCard title="Book Borrow Extension & Renewal Terminal">
        <p className="text-xs text-muted-foreground mb-3">Extend borrowing period by 7 days if no reservation hold exists.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Reservations
  // ----------------------------------------------------
  const reservationsContent = (
    <div className="space-y-4">
      <VFCard title="Book Hold & Reservation Request Queue">
        <p className="text-xs text-muted-foreground mb-3">Students reserve high-demand books online and receive push alert upon return.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Overdue Books
  // ----------------------------------------------------
  const overdueContent = (
    <div className="space-y-4">
      <VFCard title="Overdue Books Watchlist & Fine Reminders">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-destructive">18 books past the 14-day loan period.</p>
        <VFButton size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>Send Overdue Reminders</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Fines
  // ----------------------------------------------------
  const finesContent = (
    <div className="space-y-4">
      <VFCard title="Overdue Fine Accounts & Collection Log">
        <p className="text-xs text-muted-foreground mb-3 font-mono">₹5/day late fine collection ledger.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Lost & Damaged Books
  // ----------------------------------------------------
  const lostDamagedContent = (
    <div className="space-y-4">
      <VFCard title="Lost Book Replacement & Damage Fine Write-off Log">
        <p className="text-xs text-muted-foreground mb-3">Process replacement book payments or write-offs for damaged pages.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Book History
  // ----------------------------------------------------
  const historyContent = (
    <div className="space-y-4">
      <VFCard title="Accession History & Circulation Audit Trail">
        <p className="text-xs text-muted-foreground mb-3">Complete historical record of every issue, return, and renewal for each volume.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Library Inventory
  // ----------------------------------------------------
  const inventoryContent = (
    <div className="space-y-4">
      <VFCard title="Annual Stock Audit & Accession Verification">
        <p className="text-xs text-muted-foreground mb-3">Handheld RFID/barcode scanner annual physical audit of library shelves.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 17 — E-books
  // ----------------------------------------------------
  const ebooksContent = (
    <div className="space-y-4">
      <VFCard title="Digital E-Book & Online Journal Portal">
        <p className="text-xs text-muted-foreground mb-3">Read e-books online with integrated PDF viewer and search tools.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 18 — Library Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Circulation Statistics & Popular Books Analytics">
        <p className="text-xs text-muted-foreground mb-3">Most borrowed books, category distribution, and member reading trends.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Circulation Report (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 19 — Library Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Library Rules & Loan Period Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Student Max Loan Days" defaultValue="14 Days" />
          <VFInput label="Late Fine Per Day" defaultValue="₹5.00" />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 19 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Library Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'catalog', label: 'Book Catalog', icon: <BookOpen className="h-3.5 w-3.5" />, content: catalogContent },
    { id: 'books', label: 'Books', icon: <BookMarked className="h-3.5 w-3.5" />, content: booksContent },
    { id: 'copies', label: 'Book Copies', icon: <Barcode className="h-3.5 w-3.5" />, content: copiesContent },
    { id: 'categories', label: 'Categories', icon: <Bookmark className="h-3.5 w-3.5" />, content: categoriesContent },
    { id: 'authors-publishers', label: 'Authors & Publishers', icon: <Users className="h-3.5 w-3.5" />, content: authorsPublishersContent },
    { id: 'members', label: 'Library Members', icon: <Users className="h-3.5 w-3.5" />, content: membersContent },
    { id: 'issue', label: 'Issue Books', icon: <Send className="h-3.5 w-3.5" />, content: issueContent },
    { id: 'return', label: 'Return Books', icon: <RotateCcw className="h-3.5 w-3.5" />, content: returnContent },
    { id: 'renewals', label: 'Renewals', icon: <RotateCcw className="h-3.5 w-3.5" />, content: renewalsContent },
    { id: 'reservations', label: 'Reservations', icon: <Bookmark className="h-3.5 w-3.5" />, content: reservationsContent },
    { id: 'overdue', label: 'Overdue Books', icon: <AlertCircle className="h-3.5 w-3.5" />, content: overdueContent },
    { id: 'fines', label: 'Fines', icon: <Award className="h-3.5 w-3.5" />, content: finesContent },
    { id: 'lost-damaged', label: 'Lost & Damaged Books', icon: <AlertCircle className="h-3.5 w-3.5" />, content: lostDamagedContent },
    { id: 'history', label: 'Book History', icon: <History className="h-3.5 w-3.5" />, content: historyContent },
    { id: 'inventory', label: 'Library Inventory', icon: <BookOpen className="h-3.5 w-3.5" />, content: inventoryContent },
    { id: 'ebooks', label: 'E-books', icon: <BookOpen className="h-3.5 w-3.5" />, content: ebooksContent },
    { id: 'reports', label: 'Library Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Library Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
