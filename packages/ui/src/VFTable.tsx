import * as React from 'react';
import * as TanStackTableModule from '@tanstack/react-table';
import { cn } from './utils';
import { VFLoadingTable } from './VFLoading';
import { VFEmptyState } from './VFEmptyState';
import { VFButton } from './VFButton';

const useReactTable = (TanStackTableModule as any).useReactTable || (TanStackTableModule as any).ReactTable;
const getCoreRowModel = (TanStackTableModule as any).getCoreRowModel || (TanStackTableModule as any).createCoreRowModel;
const getSortedRowModel = (TanStackTableModule as any).getSortedRowModel || (TanStackTableModule as any).createSortedRowModel;
const getFilteredRowModel = (TanStackTableModule as any).getFilteredRowModel || (TanStackTableModule as any).createFilteredRowModel;
const flexRender = (TanStackTableModule as any).flexRender;

// Base semantic table wrappers
export function VFTable({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto border border-border rounded-lg bg-card custom-scrollbar">
      <table className={cn("w-full border-collapse text-left text-base", className)} {...props} />
    </div>
  );
}

export function VFTableHead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-muted/50 border-b border-border", className)} {...props} />;
}

export function VFTableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-border", className)} {...props} />;
}

export function VFTableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "hover:bg-muted/30 transition-colors focus-within:bg-muted/30 outline-none",
        className
      )}
      {...props}
    />
  );
}

export function VFTableHeaderCell({
  className,
  sticky = false,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { sticky?: boolean }) {
  return (
    <th
      className={cn(
        "px-4 py-2.5 font-black text-xs text-muted-foreground uppercase tracking-wider select-none whitespace-nowrap",
        sticky && "sticky top-0 bg-card z-10",
        className
      )}
      {...props}
    />
  );
}

export function VFTableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-2.5 align-middle text-foreground whitespace-nowrap text-sm font-semibold", className)} {...props} />;
}

// VFDataTable: High-level, fail-safe data table component
export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface VFDataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    pageSize: number;
  };
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  filterPlaceholder?: string;
  onFilterChange?: (value: string) => void;
}

export function VFDataTable<T>({
  columns,
  data = [],
  isLoading = false,
  emptyTitle = "No records found",
  emptyDescription = "There are no records matching your query.",
  pagination,
  onSort,
  filterPlaceholder,
  onFilterChange,
}: VFDataTableProps<T>) {
  const [sorting, setSorting] = React.useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(
    columns.map((c) => String(c.accessorKey))
  );
  const [showColumnDropdown, setShowColumnDropdown] = React.useState(false);

  // Client-side Filtered & Sorted Data Fallback Array
  const processedData = React.useMemo(() => {
    let result = [...(data || [])];
    
    // Global filter search
    if (globalFilter.trim()) {
      const q = globalFilter.toLowerCase();
      result = result.filter((row: any) =>
        Object.values(row).some(
          (val) => val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        )
      );
    }

    // Client-side sorting fallback
    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      result.sort((a: any, b: any) => {
        const valA = a[id];
        const valB = b[id];
        if (valA < valB) return desc ? 1 : -1;
        if (valA > valB) return desc ? -1 : 1;
        return 0;
      });
    }

    return result;
  }, [data, globalFilter, sorting]);

  // TanStack Table columns definition
  const tanstackColumns = React.useMemo(() => {
    return columns.map((col) => ({
      id: String(col.accessorKey),
      header: col.header,
      accessorKey: String(col.accessorKey),
      enableSorting: col.sortable ?? true,
      cell: (info: any) => {
        const row = info.row.original;
        return col.cell ? col.cell(row) : (info.getValue() as React.ReactNode);
      },
    }));
  }, [columns]);

  // TanStack Table Instance
  const table = React.useMemo(() => {
    if (!useReactTable) return null;
    try {
      return useReactTable({
        data: processedData,
        columns: tanstackColumns,
        state: { sorting, globalFilter },
        onSortingChange: (updater: any) => {
          const nextSorting = typeof updater === 'function' ? updater(sorting) : updater;
          setSorting(nextSorting);
          if (nextSorting && nextSorting.length > 0 && onSort) {
            onSort(nextSorting[0].id, nextSorting[0].desc ? 'desc' : 'asc');
          }
        },
        onGlobalFilterChange: (val: any) => {
          setGlobalFilter(val);
          if (onFilterChange) onFilterChange(val);
        },
        getCoreRowModel: getCoreRowModel ? getCoreRowModel() : undefined,
        getSortedRowModel: getSortedRowModel ? getSortedRowModel() : undefined,
        getFilteredRowModel: getFilteredRowModel ? getFilteredRowModel() : undefined,
      });
    } catch {
      return null;
    }
  }, [processedData, tanstackColumns, sorting, globalFilter, onSort, onFilterChange]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGlobalFilter(val);
    if (onFilterChange) onFilterChange(val);
  };

  const toggleColumn = (key: string) => {
    if (visibleColumns.includes(key)) {
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((c) => c !== key));
      }
    } else {
      setVisibleColumns([...visibleColumns, key]);
    }
  };

  const activeColumns = columns.filter((col) => visibleColumns.includes(String(col.accessorKey)));
  const displayedRows = table && table.getRowModel ? table.getRowModel().rows : null;

  return (
    <div className="space-y-3 w-full">
      {/* Toolbar / Search & Column Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="relative max-w-md flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={globalFilter}
            onChange={handleFilterChange}
            placeholder={filterPlaceholder || "Search table records..."}
            className="w-full pl-10 pr-4 h-10 border border-border rounded-xl bg-card text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all text-foreground placeholder:text-muted-foreground font-medium"
          />
        </div>

        {/* Column Visibility Selector Dropdown */}
        <div className="relative self-end sm:self-auto">
          <VFButton
            variant="outline"
            size="sm"
            onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            leftIcon={
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            }
          >
            Columns ({activeColumns.length}/{columns.length})
          </VFButton>
          {showColumnDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-30 p-2 space-y-1 animate-scale-in">
              <span className="block text-xs font-black text-muted-foreground uppercase tracking-wider px-2.5 py-1 select-none">
                Visible Columns
              </span>
              {columns.map((c) => {
                const key = String(c.accessorKey);
                const isChecked = visibleColumns.includes(key);
                return (
                  <label
                    key={key}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 hover:bg-muted rounded-md text-sm text-foreground cursor-pointer select-none font-semibold"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleColumn(key)}
                      className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="truncate">{c.header}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Table Content Render View */}
      {isLoading ? (
        <VFLoadingTable rows={5} cols={activeColumns.length} />
      ) : processedData.length === 0 ? (
        <VFEmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <VFTable>
          <VFTableHead>
            <VFTableRow>
              {activeColumns.map((col) => {
                const key = String(col.accessorKey);
                const sortStatus = sorting.find((s) => s.id === key);
                const isSortable = col.sortable ?? true;
                return (
                  <VFTableHeaderCell
                    key={key}
                    className={cn(isSortable && "cursor-pointer hover:bg-muted/60 transition-colors")}
                    onClick={() => {
                      if (!isSortable) return;
                      const isAsc = sortStatus?.id === key && !sortStatus.desc;
                      setSorting([{ id: key, desc: isAsc }]);
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="text-muted-foreground/80 font-mono text-[10px]">
                          {sortStatus?.id === key ? (sortStatus.desc ? '↓' : '↑') : '↕'}
                        </span>
                      )}
                    </div>
                  </VFTableHeaderCell>
                );
              })}
            </VFTableRow>
          </VFTableHead>
          <VFTableBody>
            {displayedRows && displayedRows.length > 0 ? (
              // TanStack Table Managed Rows
              displayedRows.map((row: any) => (
                <VFTableRow key={row.id}>
                  {row.getVisibleCells()
                    .filter((cell: any) => visibleColumns.includes(cell.column.id))
                    .map((cell: any) => (
                      <VFTableCell key={cell.id}>
                        {flexRender ? flexRender(cell.column.columnDef.cell, cell.getContext()) : cell.value}
                      </VFTableCell>
                    ))}
                </VFTableRow>
              ))
            ) : (
              // Direct Fail-Safe Data Array Map (Guarantees Data Always Renders!)
              processedData.map((row: any, rowIndex: number) => (
                <VFTableRow key={row.id || rowIndex}>
                  {activeColumns.map((col) => {
                    const key = String(col.accessorKey);
                    const rawVal = row[key];
                    return (
                      <VFTableCell key={key}>
                        {col.cell ? col.cell(row) : (rawVal !== undefined && rawVal !== null ? String(rawVal) : '—')}
                      </VFTableCell>
                    );
                  })}
                </VFTableRow>
              ))
            )}
          </VFTableBody>
        </VFTable>
      )}

      {/* Pagination Footer Controls */}
      {pagination && !isLoading && processedData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/60 pt-3 mt-2 gap-2">
          <p className="text-xs text-muted-foreground">
            Showing page <span className="font-bold text-foreground">{pagination.currentPage}</span> of{' '}
            <span className="font-bold text-foreground">{pagination.totalPages}</span> (
            <span className="font-bold text-foreground">{pagination.totalItems || processedData.length}</span> total records)
          </p>
          <div className="flex items-center gap-1.5">
            <VFButton
              variant="outline"
              size="sm"
              disabled={pagination.currentPage <= 1}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            >
              Previous
            </VFButton>
            <VFButton
              variant="outline"
              size="sm"
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            >
              Next
            </VFButton>
          </div>
        </div>
      )}
    </div>
  );
}
