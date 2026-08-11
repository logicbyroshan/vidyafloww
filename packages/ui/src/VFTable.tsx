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
    <div className="w-full overflow-x-auto border border-border/70 rounded-md bg-card">
      <table className={cn("w-full border-collapse text-left text-xs", className)} {...props} />
    </div>
  );
}

export function VFTableHead({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-muted/40 border-b border-border/80", className)} {...props} />;
}

export function VFTableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("divide-y divide-border/60", className)} {...props} />;
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
        "px-3 py-2.5 font-bold text-xs text-muted-foreground uppercase tracking-widest select-none whitespace-nowrap",
        sticky && "sticky top-0 bg-card z-10",
        className
      )}
      {...props}
    />
  );
}

export function VFTableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-3 py-2.5 align-middle text-foreground/85 whitespace-nowrap text-xs", className)} {...props} />;
}

// VFDataTable: high-level data table component powered under the hood by TanStack Table v8/v9
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
  data,
  isLoading = false,
  emptyTitle = "No results found",
  emptyDescription = "There are no records matching your query.",
  pagination,
  onSort,
  filterPlaceholder,
  onFilterChange,
}: VFDataTableProps<T>) {
  const [sorting, setSorting] = React.useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(
    columns.map((c) => c.accessorKey as string)
  );
  const [showColumnDropdown, setShowColumnDropdown] = React.useState(false);

  // Map custom column defs to TanStack Table definitions
  const tanstackColumns = React.useMemo(() => {
    return columns.map((col) => ({
      id: col.accessorKey as string,
      header: col.header,
      accessorKey: col.accessorKey as string,
      enableSorting: col.sortable ?? true,
      cell: (info: any) => {
        const row = info.row.original;
        return col.cell ? col.cell(row) : (info.getValue() as React.ReactNode);
      },
    }));
  }, [columns]);

  const filteredData = React.useMemo(() => data || [], [data]);

  const table = useReactTable ? useReactTable({
    data: filteredData,
    columns: tanstackColumns,
    state: {
      sorting,
      globalFilter,
    },
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
  }) : null;

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

  const displayedHeaderGroups = table ? table.getHeaderGroups() : [];
  const displayedRows = table ? table.getRowModel().rows : [];

  return (
    <div className="space-y-4">
      {/* Toolbar / Filters Header */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        {(filterPlaceholder || onFilterChange) && (
          <div className="relative max-w-sm flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={globalFilter}
              onChange={handleFilterChange}
              placeholder={filterPlaceholder || "Filter records..."}
              className="w-full pl-9 pr-4 h-9 border border-border rounded-lg bg-card text-xs focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all shadow-xs"
            />
          </div>
        )}
        
        {/* Column Visibility Dropdown */}
        <div className="relative self-end sm:self-auto">
          <VFButton
            variant="outline"
            size="sm"
            onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            leftIcon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            }
          >
            Columns
          </VFButton>
          {showColumnDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-20 p-2 space-y-1 animate-scale-in">
              <span className="block text-xs font-bold text-muted-foreground uppercase px-2 py-1 select-none">
                Toggle Columns
              </span>
              {columns.map((c) => (
                <label
                  key={c.accessorKey as string}
                  className="flex items-center gap-2 px-2 py-1.5 hover:bg-muted rounded text-xs text-foreground cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(c.accessorKey as string)}
                    onChange={() => toggleColumn(c.accessorKey as string)}
                    className="rounded border-input text-primary focus:ring-primary h-3.5 w-3.5"
                  />
                  {c.header}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Table Content Powered by TanStack Table */}
      {isLoading ? (
        <VFLoadingTable rows={5} cols={visibleColumns.length} />
      ) : filteredData.length === 0 || (table && displayedRows.length === 0) ? (
        <VFEmptyState
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <VFTable>
          <VFTableHead>
            {displayedHeaderGroups.map((headerGroup: any) => (
              <VFTableRow key={headerGroup.id}>
                {headerGroup.headers
                  .filter((header: any) => visibleColumns.includes(header.id))
                  .map((header: any) => {
                    const isSortable = header.column.getCanSort();
                    const sortStatus = header.column.getIsSorted();
                    return (
                      <VFTableHeaderCell
                        key={header.id}
                        className={cn(isSortable && "cursor-pointer hover:bg-muted/50 transition-colors")}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-1">
                          {flexRender ? flexRender(header.column.columnDef.header, header.getContext()) : header.column.columnDef.header}
                          {isSortable && (
                            <span className="text-muted-foreground/80">
                              {sortStatus === 'asc' ? ' ↑' : sortStatus === 'desc' ? ' ↓' : ' ↕'}
                            </span>
                          )}
                        </div>
                      </VFTableHeaderCell>
                    );
                  })}
              </VFTableRow>
            ))}
          </VFTableHead>
          <VFTableBody>
            {displayedRows.map((row: any) => (
              <VFTableRow key={row.id}>
                {row.getVisibleCells()
                  .filter((cell: any) => visibleColumns.includes(cell.column.id))
                  .map((cell: any) => (
                    <VFTableCell key={cell.id}>
                      {flexRender ? flexRender(cell.column.columnDef.cell, cell.getContext()) : cell.value}
                    </VFTableCell>
                  ))}
              </VFTableRow>
            ))}
          </VFTableBody>
        </VFTable>
      )}

      {/* Pagination Footer */}
      {pagination && !isLoading && data.length > 0 && (
        <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-2">
          <p className="text-xs text-muted-foreground">
            Showing page <span className="font-semibold text-foreground">{pagination.currentPage}</span> of{' '}
            <span className="font-semibold text-foreground">{pagination.totalPages}</span> (
            <span className="font-semibold text-foreground">{pagination.totalItems}</span> items)
          </p>
          <div className="flex items-center gap-1">
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
