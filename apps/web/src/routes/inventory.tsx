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
  Package,
  Boxes,
  Wrench,
  AlertTriangle,
  Sparkles,
  Plus,
  ArrowRight,
  Barcode,
} from 'lucide-react';

export const Route = createFileRoute('/inventory')({
  component: InventoryPage,
});

interface ItemCatalogRecord {
  id: string;
  sku: string;
  name: string;
  category: string;
  type: 'Consumable' | 'Asset' | 'Non-Consumable';
  unit: string;
  totalStock: number;
  available: number;
  reorderLevel: number;
}

interface AssetRegisterRecord {
  id: string;
  assetId: string;
  name: string;
  category: string;
  serialNo: string;
  location: string;
  custodian: string;
  value: number;
  status: 'Assigned' | 'Available' | 'Under Repair' | 'Disposed';
}

function InventoryPage() {
  const inventoryModule = MODULE_REGISTRY.find((m) => m.id === 'inventory');

  const catalogItems: ItemCatalogRecord[] = [
    { id: '1', sku: 'PAP-A4-001', name: 'A4 Printer Paper (500 Sheets/Ream)', category: 'Stationery', type: 'Consumable', unit: 'Box', totalStock: 240, available: 180, reorderLevel: 20 },
    { id: '2', sku: 'MRK-WB-002', name: 'Whiteboard Dry-Erase Markers (Black)', category: 'Stationery', type: 'Consumable', unit: 'Packet', totalStock: 80, available: 14, reorderLevel: 25 },
    { id: '3', sku: 'GLV-LAB-003', name: 'Nitrile Science Lab Gloves (M)', category: 'Laboratory', type: 'Consumable', unit: 'Box', totalStock: 150, available: 90, reorderLevel: 30 },
    { id: '4', sku: 'DESK-ST-004', name: 'Dual Student Classroom Wooden Desk', category: 'Furniture', type: 'Non-Consumable', unit: 'Piece', totalStock: 450, available: 420, reorderLevel: 10 },
  ];

  const assetsData: AssetRegisterRecord[] = [
    { id: '1', assetId: 'AST-IT-002421', name: 'Dell Latitude 5450 Laptop', category: 'IT Hardware', serialNo: 'ABC123XYZ', location: 'Computer Lab 01', custodian: 'Rahul Sharma', value: 82000, status: 'Assigned' },
    { id: '2', assetId: 'AST-IT-002422', name: 'BenQ Interactive 4K Smart Board', category: 'IT Hardware', serialNo: 'BNQ-4K-901', location: 'Classroom 10-A', custodian: 'Dr. Sarah Connor', value: 145000, status: 'Assigned' },
    { id: '3', assetId: 'AST-AC-00104', name: 'Daikin 2.0 Ton Inverter AC', category: 'Electrical', serialNo: 'DKN-AC-552', location: 'Auditorium Main', custodian: 'Building Superintendent', value: 58000, status: 'Under Repair' },
    { id: '4', assetId: 'AST-LAB-0055', name: 'Olympus Biological Microscope', category: 'Laboratory', serialNo: 'OLY-MIC-881', location: 'Science Lab 02', custodian: 'Physics Lab Assistant', value: 65000, status: 'Available' },
  ];

  // 14.1 Inventory Dashboard Submodule Content (ONLY Dashboard has top KPI Stat Cards!)
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Inventory & Asset Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 18,420 catalog items, 12,840 central store units, ₹4.8 Cr fixed assets, and procurement workflows.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Inventory AI
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Item</VFButton>
        </div>
      </div>

      {/* Feature 1 — Inventory KPI Cards (Dashboard Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Item Types" value="18,420" icon={<Package className="h-5 w-5 text-primary" />} trend="up" trendLabel="12,840 Units in Stock" />
        <VFStatCard title="Total Asset Value" value="₹ 4.8 Cr" icon={<Boxes className="h-5 w-5 text-secondary" />} trend="up" trendLabel="4,280 Fixed Assets" />
        <VFStatCard title="Low Stock Items" value="124" icon={<AlertTriangle className="h-5 w-5 text-warning" />} description="38 Pending POs" />
        <VFStatCard title="Assets Under Repair" value="16" icon={<Wrench className="h-5 w-5 text-destructive" />} description="7 Audit Overdue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stock Alerts & Catalog Master */}
        <VFSection title="Master Catalog Items & Stock Health" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Healthy Stock</p>
              <p className="text-base font-bold text-success mt-0.5">14,210 Units</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Low Stock</p>
              <p className="text-base font-bold text-warning mt-0.5">124 Items</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Assigned Assets</p>
              <p className="text-base font-bold text-primary mt-0.5">3,842 Assets</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Under Repair</p>
              <p className="text-base font-bold text-destructive mt-0.5">16 Assets</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'SKU Code', accessorKey: 'sku', cell: (r: ItemCatalogRecord) => <span className="font-mono font-bold text-primary">{r.sku}</span> },
              { header: 'Item Description', accessorKey: 'name', cell: (r: ItemCatalogRecord) => <span className="font-bold text-foreground">{r.name}</span> },
              { header: 'Category', accessorKey: 'category' },
              { header: 'Type', accessorKey: 'type', cell: (r: ItemCatalogRecord) => <VFBadge variant="outline">{r.type}</VFBadge> },
              { header: 'In Stock', accessorKey: 'totalStock', cell: (r: ItemCatalogRecord) => `${r.totalStock} ${r.unit}` },
              { header: 'Available', accessorKey: 'available', cell: (r: ItemCatalogRecord) => <VFBadge variant={r.available <= r.reorderLevel ? 'warning' : 'success'}>{r.available} {r.unit}</VFBadge> },
            ]}
            data={catalogItems}
            filterPlaceholder="Search item name or SKU..."
          />
        </VFSection>

        {/* Reorder Alerts & Recent Activity */}
        <VFCard title="Reorder Alerts & Asset Warnings">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">⚠ Whiteboard Markers — Low Stock</span>
                <VFBadge variant="warning">14 Left</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Reorder level: 25 packets · Suggested order: 50</p>
            </div>
            <div className="p-2.5 bg-destructive/10 border border-destructive/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🚨 Cleaning Disinfectant — Critical</span>
                <VFBadge variant="danger">2 Litres Left</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Reorder level: 20 litres · Emergency PR required</p>
            </div>
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">💻 BenQ 4K Board Warranty</span>
                <VFBadge variant="primary">14 Days</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Interactive smart board warranty expiring soon</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // Dedicated Master Items Catalog Submodule Content (NO REPEATING TOP STAT CARDS!)
  const catalogContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Master Item Catalog & Reorder Levels</h3>
          <p className="text-xs text-muted-foreground">Manage consumable items, stationery, science lab chemicals, and reorder alerts.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Item</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'SKU Code', accessorKey: 'sku', cell: (r: ItemCatalogRecord) => <span className="font-mono font-bold text-primary">{r.sku}</span> },
          { header: 'Item Description', accessorKey: 'name', cell: (r: ItemCatalogRecord) => <span className="font-bold text-foreground">{r.name}</span> },
          { header: 'Category', accessorKey: 'category' },
          { header: 'Type', accessorKey: 'type', cell: (r: ItemCatalogRecord) => <VFBadge variant="outline">{r.type}</VFBadge> },
          { header: 'In Stock', accessorKey: 'totalStock', cell: (r: ItemCatalogRecord) => `${r.totalStock} ${r.unit}` },
          { header: 'Available', accessorKey: 'available', cell: (r: ItemCatalogRecord) => <VFBadge variant={r.available <= r.reorderLevel ? 'warning' : 'success'}>{r.available} {r.unit}</VFBadge> },
        ]}
        data={catalogItems}
        filterPlaceholder="Search item name or SKU..."
      />
    </div>
  );

  // 14.6 Dedicated Asset Management Submodule Content (NO REPEATING TOP STAT CARDS!)
  const assetsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Fixed Assets & Capital Equipment Register</h3>
          <p className="text-xs text-muted-foreground">Manage IT hardware, smart boards, furniture, laboratory instruments, and HR exit asset clearances.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Barcode className="h-3.5 w-3.5" />}>Asset Barcodes</VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Register Asset</VFButton>
        </div>
      </div>

      <VFDataTable
        columns={[
          { header: 'Asset Tag ID', accessorKey: 'assetId', cell: (r: AssetRegisterRecord) => <span className="font-mono font-bold text-primary">{r.assetId}</span> },
          { header: 'Asset Name', accessorKey: 'name', cell: (r: AssetRegisterRecord) => <span className="font-bold text-foreground">{r.name}</span> },
          { header: 'Category', accessorKey: 'category' },
          { header: 'Serial No', accessorKey: 'serialNo', cell: (r: AssetRegisterRecord) => <span className="font-mono text-muted-foreground">{r.serialNo}</span> },
          { header: 'Location', accessorKey: 'location' },
          { header: 'Custodian', accessorKey: 'custodian' },
          { header: 'Asset Value', accessorKey: 'value', cell: (r: AssetRegisterRecord) => `₹ ${r.value.toLocaleString('en-IN')}` },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: (r: AssetRegisterRecord) => (
              <VFBadge variant={r.status === 'Assigned' ? 'success' : r.status === 'Under Repair' ? 'danger' : 'primary'}>
                {r.status}
              </VFBadge>
            ),
          },
        ]}
        data={assetsData}
        filterPlaceholder="Search asset tag, name, or custodian..."
      />
    </div>
  );

  // 14.4 Specialized Purchase & Procurement Submodule Content (NO REPEATING TOP STAT CARDS!)
  const procurementContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Procurement Requisition & Vendor PO Bidding</h3>
          <p className="text-xs text-muted-foreground">3-way quotation comparison, PO generation, and department budget verification.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Purchase Request</VFButton>
      </div>

      <VFCard title="Procurement Requisition Workflow (PR ➔ PO ➔ GRN)">
        <div className="flex items-center justify-between text-xs font-semibold py-4 overflow-x-auto gap-2">
          {['1. Requisition (PR)', '2. Approval Workflow', '3. Vendor Bidding', '4. Purchase Order (PO)', '5. Goods Received (GRN)', '6. Invoice Settled'].map((st, i) => (
            <React.Fragment key={st}>
              <div className={`px-3 py-2 rounded-lg border text-center whitespace-nowrap ${i === 3 ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-muted/40 border-border text-muted-foreground'}`}>
                {st}
              </div>
              {i < 5 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </VFCard>
    </div>
  );

  // Submodule map — EVERY tab has its OWN clean dedicated view! No stat card repetition!
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    catalog: catalogContent,
    stock: catalogContent,
    procurement: procurementContent,
    'goods-receipt': procurementContent,
    assets: assetsContent,
    'issue-transfer': catalogContent,
    maintenance: assetsContent,
    'audit-disposal': catalogContent,
    'reports-settings': catalogContent,
  };

  const submoduleTabs = (inventoryModule?.submodules || [
    { id: 'dashboard', label: 'Inventory Dashboard' },
    { id: 'catalog', label: 'Items & Catalog' },
    { id: 'stock', label: 'Stock & Warehouses' },
    { id: 'procurement', label: 'Purchase & Procurement' },
    { id: 'goods-receipt', label: 'Goods Receipt & Inward' },
    { id: 'assets', label: 'Asset Management' },
    { id: 'issue-transfer', label: 'Issue & Transfer' },
    { id: 'maintenance', label: 'Maintenance & Repairs' },
    { id: 'audit-disposal', label: 'Stock Audit & Disposal' },
    { id: 'reports-settings', label: 'Reports & Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Package className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || catalogContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
