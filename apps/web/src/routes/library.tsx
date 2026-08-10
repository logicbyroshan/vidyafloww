import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton } from '@vidyamaxx/ui';
import { BookOpen, RefreshCw, AlertCircle, Bot, Sparkles, Send } from 'lucide-react';

export const Route = createFileRoute('/library')({
  component: LibraryPage,
});

function LibraryPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('books-catalog');
  const [libQuery, setLibQuery] = React.useState('');
  const [libRec, setLibRec] = React.useState<string | null>(null);

  const handleAskLibrarian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!libQuery) return;
    setLibRec(
      `📚 AI Librarian Recommendation for: "${libQuery}"\n\n1. "Concepts of Mathematics" - H.K. Dass (Call No: 510.4 DAS)\n2. "Illustrated Science Encyclopedia" - Volume 4 (Call No: 500 ENC)\n3. "Problem Solving & Analytical Thinking" - Grade 7 Workbook (Call No: 510.7 PRB)`
    );
  };

  const submoduleTabs = [
    {
      id: 'books-catalog',
      label: 'Books Catalog & ISBN',
      icon: <BookOpen className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Library Book Catalog & Accession Directory">
          <p className="text-xs text-muted-foreground">Manage book titles, authors, publishers, ISBN lookup, barcode tags, and shelf locations.</p>
        </VFCard>
      ),
    },
    {
      id: 'issue-return',
      label: 'Issue & Return (Barcode/QR)',
      icon: <RefreshCw className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Book Checkout & Return Counter">
          <p className="text-xs text-muted-foreground">Scan student ID barcodes, issue books, record returns, and process renewals.</p>
        </VFCard>
      ),
    },
    {
      id: 'fines-holds',
      label: 'Fines & Book Reservations',
      icon: <AlertCircle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Overdue Fines & Hold Reservations">
          <p className="text-xs text-muted-foreground">Calculate daily overdue fines, track lost book replacements, and manage reservation queues.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-librarian',
      label: 'AI Librarian Assistant',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Conversational Librarian</span>
          </div>
          <p className="text-xs text-muted-foreground">"Find books suitable for a Class 7 student struggling with mathematics." AI recommends targeted books based on reading levels and subject difficulty.</p>

          <form onSubmit={handleAskLibrarian} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Find books suitable for a Class 7 student struggling with mathematics..."
              value={libQuery}
              onChange={(e) => setLibQuery(e.target.value)}
              className="flex-1 h-9 rounded-lg border border-border bg-muted/40 px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <VFButton type="submit" size="sm" leftIcon={<Send className="h-3.5 w-3.5" />}>
              Find Books
            </VFButton>
          </form>

          {libRec && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-xs text-foreground space-y-2 animate-fade-in">
              <p className="whitespace-pre-line leading-relaxed">{libRec}</p>
            </div>
          )}
        </div>
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
