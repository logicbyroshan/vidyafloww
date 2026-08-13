import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Package,
  Boxes,
  Truck,
  ShoppingCart,
  TrendingDown,
  SlidersHorizontal,
  Plus,
  AlertCircle,
  Download,
  FileText,
  Users,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

export const Route = createFileRoute('/inventory')({
  component: InventoryPage,
});

function InventoryPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const inventoryData = [
    { code: 'SKU-PAP-A4', name: 'A4 Printing Paper Rims (75 GSM)', category: 'Stationery', stock: 120, unit: 'Rims', minAlert: 30, vendor: 'PaperCraft Ltd', status: 'In Stock' },
    { code: 'SKU-LAB-CHM', name: 'Sodium Hydroxide Lab Reagent (500g)', category: 'Lab Supplies', stock: 8, unit: 'Bottles', minAlert: 15, vendor: 'ChemLab Scientific', status: 'Low Stock' },
    { code: 'SKU-CLN-DSP', name: 'Hand Sanitizer Refill (5L Can)', category: 'Sanitation', stock: 24, unit: 'Cans', minAlert: 10, vendor: 'CleanTech Hygiene', status: 'In Stock' },
  ];

  const inventoryColumns = [
    { header: 'SKU Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Item Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Current Stock', accessorKey: 'stock', cell: (r: any) => <span className="font-mono font-bold text-foreground">{r.stock} {r.unit}</span> },
    { header: 'Min Threshold', accessorKey: 'minAlert' },
    { header: 'Primary Supplier', accessorKey: 'vendor' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Low Stock' ? 'warning' : 'success'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Inventory Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Stock Items" value="1,240 SKUs" icon={<Package className="h-5 w-5 text-primary" />} trend="up" trendLabel="4 Main Stores" />
        <VFStatCard title="Low Stock Alerts" value="6 Items" icon={<AlertCircle className="h-5 w-5 text-amber-500" />} trend="down" trendLabel="Re-order Triggered" />
        <VFStatCard title="Pending Purchase Orders" value="4 Orders" icon={<ShoppingCart className="h-5 w-5 text-emerald-500" />} description="Awaiting Delivery" />
        <VFStatCard title="Inventory Valuation" value="₹12,40,000" icon={<Boxes className="h-5 w-5 text-purple-500" />} description="Audit Net Value" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Stock
  // ----------------------------------------------------
  const stockContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Consumable Stock Master Inventory</h3>
          <p className="text-xs text-muted-foreground">Manage warehouse store stock balances, batch numbers, and reorder levels.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add New Stock Item</VFButton>
      </div>
      <VFDataTable columns={inventoryColumns} data={inventoryData} filterPlaceholder="Search item name or SKU..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Categories
  // ----------------------------------------------------
  const categoriesContent = (
    <div className="space-y-4">
      <VFCard title="Inventory Category & Group Hierarchy">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Office & Classroom Stationery</span>
            <p className="text-muted-foreground text-xs mt-1">420 SKUs · Papers, Markers, Chalk, Files</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Science Lab Reagents & Chemicals</span>
            <p className="text-muted-foreground text-xs mt-1">180 SKUs · Acids, Glassware, Beakers</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Sanitation & Housekeeping Supplies</span>
            <p className="text-muted-foreground text-xs mt-1">95 SKUs · Disinfectants, Mops, Detergents</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Stock In
  // ----------------------------------------------------
  const stockInContent = (
    <div className="space-y-4">
      <VFCard title="Stock Inward & Inflow Entry Log">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Record incoming goods from vendor purchase orders into store stock.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Stock Out
  // ----------------------------------------------------
  const stockOutContent = (
    <div className="space-y-4">
      <VFCard title="Stock Issue & Departmental Outflow Log">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Issue consumable stock to academic departments, labs, and staff.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Stock Transfer
  // ----------------------------------------------------
  const stockTransferContent = (
    <div className="space-y-4">
      <VFCard title="Inter-Store & Inter-Campus Stock Transfer">
        <p className="text-xs text-muted-foreground mb-3">Transfer stock between Main Warehouse, Chemistry Lab Store, and Hostel Mess Store.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Stock Adjustment
  // ----------------------------------------------------
  const stockAdjustmentContent = (
    <div className="space-y-4">
      <VFCard title="Physical Count Stock Variance & Adjustment Log">
        <p className="text-xs text-muted-foreground mb-3">Adjust stock balances following physical audit spillage or damage write-offs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Purchase Requests
  // ----------------------------------------------------
  const purchaseRequestsContent = (
    <div className="space-y-4">
      <VFCard title="Departmental Purchase Requisition Requests">
        <p className="text-xs text-muted-foreground mb-3">HOD submitted stock purchase requests awaiting principal approval.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Quotations
  // ----------------------------------------------------
  const quotationsContent = (
    <div className="space-y-4">
      <VFCard title="Vendor Price Quotations & Tender Bidding Matrix">
        <p className="text-xs text-muted-foreground mb-3">Compare vendor price quotes (L1, L2, L3 supplier bidding analysis).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Vendors
  // ----------------------------------------------------
  const vendorsContent = (
    <div className="space-y-4">
      <VFCard title="Approved Vendor & Supplier Master Directory">
        <p className="text-xs text-muted-foreground mb-3">Vendor GSTIN numbers, bank details, contact persons, and rating history.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Purchase Orders
  // ----------------------------------------------------
  const purchaseOrdersContent = (
    <div className="space-y-4">
      <VFCard title="Official Purchase Order (PO) Generator & Tracker">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Issue digital POs with payment terms, delivery deadlines, and GST tax breakdowns.</p>
        <VFButton size="sm" leftIcon={<FileText className="h-3.5 w-3.5" />}>Create Purchase Order</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Goods Receipt
  // ----------------------------------------------------
  const goodsReceiptContent = (
    <div className="space-y-4">
      <VFCard title="Goods Receipt Note (GRN) & Quality Check Verification">
        <p className="text-xs text-muted-foreground mb-3">Verify received physical packages against PO line items and inspect for damage.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Low Stock
  // ----------------------------------------------------
  const lowStockContent = (
    <div className="space-y-4">
      <VFCard title="Low Stock Watchlist & Automatic Reorder Triggers">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-amber-500 font-bold">6 items below minimum safety threshold.</p>
        <VFBadge variant="warning">Auto-Reorder Draft Created</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Suppliers
  // ----------------------------------------------------
  const suppliersContent = (
    <div className="space-y-4">
      <VFCard title="Supplier Evaluation & On-Time Delivery Ratings">
        <p className="text-xs text-muted-foreground mb-3">Evaluate supplier lead times, product defect rates, and credit terms.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Procurement Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Procurement Spend Analytics & Stock Consumption Reports">
        <p className="text-xs text-muted-foreground mb-3">Export annual procurement expenditure summaries and department consumption graphs.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Procurement Summary (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Inventory Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Inventory & Procurement Engine Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFSelect label="Default Valuation Method" options={[{ label: 'FIFO (First In First Out)', value: 'fifo' }, { label: 'Weighted Average Cost', value: 'wac' }]} />
          <VFInput label="PO Approval Threshold Amount" defaultValue="₹50,000" />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 16 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Inventory Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'stock', label: 'Stock', icon: <Package className="h-3.5 w-3.5" />, content: stockContent },
    { id: 'categories', label: 'Categories', icon: <Boxes className="h-3.5 w-3.5" />, content: categoriesContent },
    { id: 'stock-in', label: 'Stock In', icon: <Truck className="h-3.5 w-3.5" />, content: stockInContent },
    { id: 'stock-out', label: 'Stock Out', icon: <Truck className="h-3.5 w-3.5" />, content: stockOutContent },
    { id: 'stock-transfer', label: 'Stock Transfer', icon: <Truck className="h-3.5 w-3.5" />, content: stockTransferContent },
    { id: 'stock-adjustment', label: 'Stock Adjustment', icon: <TrendingDown className="h-3.5 w-3.5" />, content: stockAdjustmentContent },
    { id: 'purchase-requests', label: 'Purchase Requests', icon: <FileText className="h-3.5 w-3.5" />, content: purchaseRequestsContent },
    { id: 'quotations', label: 'Quotations', icon: <FileText className="h-3.5 w-3.5" />, content: quotationsContent },
    { id: 'vendors', label: 'Vendors', icon: <Users className="h-3.5 w-3.5" />, content: vendorsContent },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: <ShoppingCart className="h-3.5 w-3.5" />, content: purchaseOrdersContent },
    { id: 'goods-receipt', label: 'Goods Receipt', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: goodsReceiptContent },
    { id: 'low-stock', label: 'Low Stock', icon: <AlertCircle className="h-3.5 w-3.5" />, content: lowStockContent },
    { id: 'suppliers', label: 'Suppliers', icon: <Users className="h-3.5 w-3.5" />, content: suppliersContent },
    { id: 'reports', label: 'Procurement Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Inventory Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
