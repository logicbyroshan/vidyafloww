import * as React from 'react';
import { cn } from './utils';
import { VFButton } from './VFButton';

// VFToolbar: Flex layout for wrapping search, filters, actions above tables or grids
export interface VFToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchField?: React.ReactNode;
  actions?: React.ReactNode;
}

export function VFToolbar({
  searchField,
  actions,
  className,
  children,
  ...props
}: VFToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-2.5 px-3 py-2.5 border border-border/60 rounded-md bg-card/60",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {searchField}
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  );
}

// VFFilterBar: Displays active filter states and custom dropdown triggers
export interface FilterTag {
  key: string;
  label: string;
  value: string;
}

export interface VFFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeFilters: FilterTag[];
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export function VFFilterBar({
  activeFilters,
  onRemoveFilter,
  onClearAll,
  className,
  children,
  ...props
}: VFFilterBarProps) {
  if (activeFilters.length === 0 && !children) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 py-1.5 text-sm",
        className
      )}
      {...props}
    >
      {children && <div className="flex items-center gap-1.5 flex-wrap">{children}</div>}

      {activeFilters.length > 0 && (
        <>
          <div className="h-3.5 w-px bg-border mx-0.5" />
          <span className="text-muted-foreground font-bold uppercase tracking-wider text-xs select-none">Filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 bg-muted border border-border/60 text-foreground px-1.5 py-0.5 rounded font-medium text-xs"
            >
              <span className="text-muted-foreground font-bold uppercase text-xs tracking-widest">
                {filter.label}:
              </span>
              <span>{filter.value}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter(filter.key)}
                className="text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors"
              >
                <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <VFButton
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs h-6 px-1.5 font-bold text-muted-foreground hover:text-primary"
          >
            Clear All
          </VFButton>
        </>
      )}
    </div>
  );
}
