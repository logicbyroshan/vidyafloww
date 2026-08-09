import * as React from 'react';
import { VFDialog } from '@vidyaflow/ui';
import { Search, FileText, Settings, User } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');

  const mockCommands = [
    { icon: FileText, label: 'Go to Admissions', route: '/admissions', category: 'Navigation' },
    { icon: User, label: 'Search Students', route: '/students', category: 'Actions' },
    { icon: Settings, label: 'System Settings', route: '/settings', category: 'Preferences' },
  ];

  const filtered = mockCommands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <VFDialog
      isOpen={isOpen}
      onClose={onClose}
      title=""
      className="p-0 max-w-2xl bg-card border-none mt-32 overflow-hidden shadow-2xl"
    >
      <div className="flex flex-col h-full -m-6">
        <div className="flex items-center px-4 border-b border-border/40">
          <Search className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-14 bg-transparent outline-none text-base placeholder:text-muted-foreground"
            placeholder="Type a command or search..."
          />
          <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>
        
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-14 text-center text-sm text-muted-foreground">
              No results found for "{search}".
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Suggestions
              </div>
              {filtered.map((cmd, idx) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate({ to: cmd.route });
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors group outline-none focus-visible:bg-primary focus-visible:text-primary-foreground text-sm"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground group-focus-visible:text-primary-foreground transition-colors" />
                    <span>{cmd.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground group-hover:text-primary-foreground/70 group-focus-visible:text-primary-foreground/70">
                      {cmd.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </VFDialog>
  );
}
