import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { BookOpen, Barcode, Users, ArrowLeftRight, Bookmark, DollarSign, MonitorPlay, Plus } from 'lucide-react';

export const Route = createFileRoute('/library')({
  component: LibraryPage,
});

function LibraryPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('book-catalogue');

  const bookData = [
    { isbn: '978-0143452123', title: 'Concepts of Physics (Vol 1)', author: 'H.C. Verma', category: 'Physics', copies: '18 Copies', available: '12 Available' },
    { isbn: '978-0131103627', title: 'The C Programming Language', author: 'Brian W. Kernighan', category: 'Computer Sci', copies: '10 Copies', available: '4 Available' },
    { isbn: '978-0070648036', title: 'Higher Engineering Mathematics', author: 'B.S. Grewal', category: 'Mathematics', copies: '15 Copies', available: '8 Available' },
  ];

  const bookColumns = [
    { header: 'ISBN Code', accessorKey: 'isbn', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.isbn}</span> },
    { header: 'Book Title', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Author', accessorKey: 'author' },
    { header: 'Subject Category', accessorKey: 'category' },
    { header: 'Total Copies', accessorKey: 'copies' },
    { header: 'Available Status', accessorKey: 'available', cell: (r: any) => <VFBadge variant="success">{r.available}</VFBadge> },
  ];

  const submoduleTabs = [
    {
      id: 'book-catalogue',
      label: 'Book Catalogue',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">Library Book Catalogue (ISBN Master)</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Search catalog by ISBN, Title, Author, Publisher, or Subject classification.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add New Book</VFButton>
          </div>
          <VFDataTable columns={bookColumns} data={bookData} filterPlaceholder="Search ISBN, title, or author..." />
        </div>
      ),
    },
    {
      id: 'book-copies',
      label: 'Inventory & Barcodes',
      icon: <Barcode className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Accession Numbers & Barcode Tagging">
          <p className="text-xs text-muted-foreground">Manage individual book barcode tags (ACC-1001, ACC-1002), shelf location racks, and book condition status.</p>
        </VFCard>
      ),
    },
    {
      id: 'member-mgmt',
      label: 'Library Members',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student & Staff Library Membership Sync">
          <p className="text-xs text-muted-foreground">Auto-sync library member borrowing rights (Students: 3 books max, Faculty: 7 books max).</p>
        </VFCard>
      ),
    },
    {
      id: 'issue-return',
      label: 'Issue / Return Counter',
      icon: <ArrowLeftRight className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Barcode Scanner Circulation Counter">
          <p className="text-xs text-muted-foreground">Scan book barcode for 2-second quick issue, return, or 14-day renewal with instant receipt.</p>
        </VFCard>
      ),
    },
    {
      id: 'reservations',
      label: 'Reservations & Holds',
      icon: <Bookmark className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Book Hold Requests & Notifications">
          <p className="text-xs text-muted-foreground">Reserve checked-out books online with automated SMS notifications when returned to shelf.</p>
        </VFCard>
      ),
    },
    {
      id: 'fines-lost',
      label: 'Overdue Fines & Lost Books',
      icon: <DollarSign className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Overdue Fine Calculation & Replacement Ledger">
          <p className="text-xs text-muted-foreground">Automatic ₹5/day overdue fine calculation, lost book replacement charges, and annual No Dues clearance.</p>
        </VFCard>
      ),
    },
    {
      id: 'digital-library',
      label: 'Digital E-Books',
      icon: <MonitorPlay className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Digital E-Book PDF Repository">
          <p className="text-xs text-muted-foreground">Store downloadable PDF e-books, NCERT textbooks, research journals, and audio books for student web access.</p>
        </VFCard>
      ),
    },
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
