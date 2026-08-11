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
  BookOpen,
  AlertTriangle,
  Sparkles,
  Plus,
  Search,
  Star,
  Barcode,
  ArrowLeftRight,
  Bookmark,
  Eye,
} from 'lucide-react';

export const Route = createFileRoute('/library')({
  component: LibraryPage,
});

interface BookCatalogItem {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  copies: number;
  available: number;
  rating: number;
}

interface CirculationRecord {
  id: string;
  accessionNo: string;
  memberId: string;
  memberName: string;
  bookTitle: string;
  issueDate: string;
  dueDate: string;
  status: 'Issued' | 'Returned' | 'Overdue' | 'Renewed';
}

interface DigitalResourceItem {
  id: string;
  title: string;
  author: string;
  format: 'PDF E-Book' | 'Video Tutorial' | 'Audio Book' | 'NCERT Guide';
  category: string;
  views: number;
}

function LibraryPage() {
  const libraryModule = MODULE_REGISTRY.find((m) => m.id === 'library');

  const catalogBooks: BookCatalogItem[] = [
    { id: '1', isbn: '978-0143452123', title: 'Atomic Habits', author: 'James Clear', category: 'Self Development', copies: 10, available: 4, rating: 4.8 },
    { id: '2', isbn: '978-0131103627', title: 'Concepts of Physics (Vol 1)', author: 'H.C. Verma', category: 'Physics', copies: 18, available: 12, rating: 4.9 },
    { id: '3', isbn: '978-0070648036', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', copies: 12, available: 6, rating: 4.7 },
    { id: '4', isbn: '978-0062316097', title: 'Sapiens: A Brief History', author: 'Yuval Noah Harari', category: 'History', copies: 8, available: 2, rating: 4.6 },
  ];

  const circulationData: CirculationRecord[] = [
    { id: '1', accessionNo: 'LIB-004201', memberId: 'LIB-ST-00421', memberName: 'Rahul Sharma', bookTitle: 'Atomic Habits', issueDate: '01 Aug 2026', dueDate: '15 Aug 2026', status: 'Issued' },
    { id: '2', accessionNo: 'LIB-004202', memberId: 'LIB-ST-00422', memberName: 'Priya Patel', bookTitle: 'Concepts of Physics (Vol 1)', issueDate: '28 Jul 2026', dueDate: '11 Aug 2026', status: 'Overdue' },
    { id: '3', accessionNo: 'LIB-004203', memberId: 'LIB-ST-00423', memberName: 'Amit Kumar', bookTitle: 'Wings of Fire', issueDate: '05 Aug 2026', dueDate: '19 Aug 2026', status: 'Renewed' },
  ];

  const digitalResources: DigitalResourceItem[] = [
    { id: '1', title: 'CBSE Class 10 Physics Master Guide', author: 'VidyaMaxx Academic Team', format: 'PDF E-Book', category: 'Physics', views: 420 },
    { id: '2', title: 'Interactive Organic Chemistry Reactions', author: 'Dr. Sarah Connor', format: 'Video Tutorial', category: 'Chemistry', views: 310 },
    { id: '3', title: 'Trigonometry Step-by-Step Audio Lecture', author: 'Prof. Rajesh Sharma', format: 'Audio Book', category: 'Mathematics', views: 185 },
  ];

  // 11.1 Library Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Library Command Center & Catalog Engine</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 12,482 books, circulation counters, student reservation queues, and digital e-learning resources.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Library AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Book</VFButton>
        </div>
      </div>

      {/* Feature 1 — Library KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Collection Books" value="12,482" icon={<BookOpen className="h-5 w-5 text-primary" />} trend="up" trendLabel="8,742 Available on Shelf" />
        <VFStatCard title="Books Currently Issued" value="2,941" icon={<ArrowLeftRight className="h-5 w-5 text-secondary" />} trend="up" trendLabel="84 Issued Today" />
        <VFStatCard title="Overdue Books" value="184" icon={<AlertTriangle className="h-5 w-5 text-destructive" />} description="37 Due Today" />
        <VFStatCard title="Active Reservations" value="799" icon={<Bookmark className="h-5 w-5 text-warning" />} trend="up" trendLabel="8 Pending Collections" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Circulation Activity & Popular Books */}
        <VFSection title="Today's Circulation & Popular Books" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Issued Today</p>
              <p className="text-base font-bold text-success mt-0.5">84 Books</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Returned Today</p>
              <p className="text-base font-bold text-primary mt-0.5">61 Books</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Renewed Today</p>
              <p className="text-base font-bold text-secondary mt-0.5">22 Books</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Reserved Today</p>
              <p className="text-base font-bold text-warning mt-0.5">18 Books</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Accession No', accessorKey: 'accessionNo', cell: (r: CirculationRecord) => <span className="font-mono font-bold text-primary">{r.accessionNo}</span> },
              { header: 'Member Name', accessorKey: 'memberName', cell: (r: CirculationRecord) => <span className="font-bold text-foreground">{r.memberName}</span> },
              { header: 'Book Title', accessorKey: 'bookTitle' },
              { header: 'Due Date', accessorKey: 'dueDate' },
              {
                header: 'Status',
                accessorKey: 'status',
                cell: (r: CirculationRecord) => (
                  <VFBadge variant={r.status === 'Issued' ? 'primary' : r.status === 'Overdue' ? 'danger' : 'success'}>
                    {r.status}
                  </VFBadge>
                ),
              },
            ]}
            data={circulationData}
            filterPlaceholder="Search circulation transactions..."
          />
        </VFSection>

        {/* Needs Attention & Popular Now */}
        <VFCard title="Popular Now & Reservation Queue">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-muted/40 rounded-xl border border-border/60 space-y-1">
              <p className="font-bold text-foreground">📕 Atomic Habits (James Clear)</p>
              <p className="text-muted-foreground text-xs">42 Borrows · 3 Students Waiting in Queue</p>
            </div>
            <div className="p-2.5 bg-muted/40 rounded-xl border border-border/60 space-y-1">
              <p className="font-bold text-foreground">📘 NCERT Physics XI (H.C. Verma)</p>
              <p className="text-muted-foreground text-xs">38 Borrows · 2 Students Waiting in Queue</p>
            </div>
            <div className="p-2.5 bg-muted/40 rounded-xl border border-border/60 space-y-1">
              <p className="font-bold text-foreground">📗 Wings of Fire (A.P.J. Abdul Kalam)</p>
              <p className="text-muted-foreground text-xs">31 Borrows · Available on Shelf A12</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 11.2 Catalog & Discovery Submodule Content
  const catalogContent = (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="bg-card border border-border p-4 rounded-xl space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search 12,482 books by title, author, ISBN, subject, or keyword..."
            className="w-full bg-muted/40 border border-border/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-foreground focus:outline-hidden focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-muted-foreground font-semibold">Categories:</span>
          {['All Books', 'Academics', 'Science', 'Technology', 'Literature', 'Fiction', 'Competitive Exams'].map((cat, i) => (
            <VFBadge key={i} variant={i === 0 ? 'primary' : 'outline'} className="cursor-pointer">
              {cat}
            </VFBadge>
          ))}
        </div>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {catalogBooks.map((book) => (
          <div key={book.id} className="bg-card border border-border/80 p-4 rounded-xl space-y-2 hover:border-primary/50 transition-colors">
            <div className="h-36 bg-muted/40 rounded-lg flex items-center justify-center border border-border/40">
              <BookOpen className="h-10 w-10 text-primary/60" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground line-clamp-1">{book.title}</h3>
              <p className="text-xs text-muted-foreground">{book.author}</p>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="flex items-center gap-1 font-bold text-warning">
                <Star className="h-3 w-3 fill-warning text-warning" /> {book.rating}
              </span>
              <VFBadge variant="success">🟢 {book.available} Available</VFBadge>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <VFButton size="sm" variant="outline" className="w-full">Reserve</VFButton>
              <VFButton size="sm" className="w-full">Borrow</VFButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 11.3 Books & Collection Submodule Content
  const booksContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Collection & Inventory Master</h3>
          <p className="text-xs text-muted-foreground">Manage ISBN catalog, physical copies, barcodes, shelf mappings, and book condition logs.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Barcode className="h-3.5 w-3.5" />}>Barcode Generator</VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Book Title</VFButton>
        </div>
      </div>

      <VFDataTable
        columns={[
          { header: 'ISBN Code', accessorKey: 'isbn', cell: (r: BookCatalogItem) => <span className="font-mono font-bold text-primary">{r.isbn}</span> },
          { header: 'Book Title', accessorKey: 'title', cell: (r: BookCatalogItem) => <span className="font-bold text-foreground">{r.title}</span> },
          { header: 'Author', accessorKey: 'author' },
          { header: 'Subject Category', accessorKey: 'category' },
          { header: 'Total Copies', accessorKey: 'copies' },
          { header: 'Available on Shelf', accessorKey: 'available', cell: (r: BookCatalogItem) => <VFBadge variant="success">{r.available} Available</VFBadge> },
          { header: 'Rating', accessorKey: 'rating', cell: (r: BookCatalogItem) => `★ ${r.rating}` },
        ]}
        data={catalogBooks}
        filterPlaceholder="Search books or ISBN..."
      />
    </div>
  );

  // 11.8 Digital Library Submodule Content
  const digitalContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Digital E-Book & Video Library Repository</h3>
          <p className="text-xs text-muted-foreground">Access 4,200 PDF e-books, NCERT guides, video lectures, and AI document summaries.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Upload Digital Resource</VFButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {digitalResources.map((res) => (
          <VFCard key={res.id} title={res.title}>
            <div className="space-y-2 text-xs mt-1">
              <p className="text-muted-foreground">Author: {res.author}</p>
              <div className="flex items-center justify-between pt-1">
                <VFBadge variant="primary">{res.format}</VFBadge>
                <span className="text-muted-foreground font-mono">{res.views} Views</span>
              </div>
              <VFButton size="sm" variant="outline" className="w-full mt-2" leftIcon={<Eye className="h-3.5 w-3.5" />}>
                Read / View Resource
              </VFButton>
            </div>
          </VFCard>
        ))}
      </div>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    catalog: catalogContent,
    books: booksContent,
    members: dashboardContent,
    'issue-return': dashboardContent,
    reservations: dashboardContent,
    fines: dashboardContent,
    digital: digitalContent,
    reports: dashboardContent,
  };

  const submoduleTabs = (libraryModule?.submodules || [
    { id: 'dashboard', label: 'Library Dashboard' },
    { id: 'catalog', label: 'Catalog & Discovery' },
    { id: 'books', label: 'Books & Collection' },
    { id: 'members', label: 'Members' },
    { id: 'issue-return', label: 'Circulation' },
    { id: 'reservations', label: 'Reservations & Requests' },
    { id: 'fines', label: 'Fines & Accounts' },
    { id: 'digital', label: 'Digital Library' },
    { id: 'reports', label: 'Library Reports & Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <BookOpen className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
