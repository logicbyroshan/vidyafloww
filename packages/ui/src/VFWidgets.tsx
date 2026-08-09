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
        "flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-border/80 rounded-lg bg-card/50",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-3">
        {searchField}
        {children}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-wrap">
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
        "flex flex-wrap items-center gap-2 py-2 text-xs",
        className
      )}
      {...props}
    >
      {/* Custom filter dropdown selectors pass-through */}
      {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}

      {activeFilters.length > 0 && (
        <>
          <div className="h-4 w-[1px] bg-border mx-1" />
          <span className="text-muted-foreground font-medium select-none">Active Filters:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 bg-muted border border-border text-foreground px-2 py-0.5 rounded-md font-medium"
            >
              <span className="text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">
                {filter.label}:
              </span>
              <span>{filter.value}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter(filter.key)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 rounded p-0.5 transition-colors"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          <VFButton
            variant="link"
            size="sm"
            onClick={onClearAll}
            className="text-xs h-auto py-1 font-medium hover:text-primary"
          >
            Clear All
          </VFButton>
        </>
      )}
    </div>
  );
}
