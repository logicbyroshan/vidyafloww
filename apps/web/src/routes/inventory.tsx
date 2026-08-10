import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { Package, Boxes, ShoppingCart, Truck, Plus, ArrowRight, Wrench, Trash2 } from 'lucide-react';

export const Route = createFileRoute('/inventory')({
  component: InventoryPage,
});

function InventoryPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('inventory-stores');

  const assetData = [
    { assetTag: 'AST-2026-001', name: 'Dell OptiPlex 7090 Desktop', location: 'Comp Lab 01', amcStatus: 'Active AMC', expiry: '15 Dec 2027' },
    { assetTag: 'AST-2026-004', name: 'BenQ Interactive 4K Board', location: 'Class 10-A', amcStatus: 'Active AMC', expiry: '02 Aug 2028' },
    { assetTag: 'AST-2026-012', name: 'Daikin 2.0 Ton Inverter AC', location: 'Auditorium Main', amcStatus: 'Needs Service', expiry: '20 May 2026' },
  ];

  const assetColumns = [
    { header: 'Asset Tag', accessorKey: 'assetTag', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.assetTag}</span> },
    { header: 'Asset Description', accessorKey: 'name' },
    { header: 'Location', accessorKey: 'location' },
    { header: 'AMC Status', accessorKey: 'amcStatus', cell: (r: any) => <VFBadge variant={r.amcStatus.includes('Active') ? 'success' : 'warning'}>{r.amcStatus}</VFBadge> },
    { header: 'AMC Expiry', accessorKey: 'expiry' },
  ];

  const submoduleTabs = [
    {
      id: 'inventory-stores',
      label: 'Stores & Central Stock',
      icon: <Package className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">Central School Store & Consumables</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Stationery, printing paper, lab chemicals, sports gear, and uniform stocks.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Stock Item</VFButton>
          </div>
          <VFCard title="Stock Items Summary">
            <p className="text-xs text-muted-foreground">142 Rims A4 Paper (In Stock) · 12 Bottles Titration Reagents (Low Stock) · 45 Sets Football Kits (In Stock).</p>
          </VFCard>
        </div>
      ),
    },
    {
      id: 'item-catalogue',
      label: 'Item Master Catalogue',
      icon: <Package className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Inventory Item Master Catalog & Unit Categories">
          <p className="text-xs text-muted-foreground">Categorize items into Stationery, IT Hardware, Lab Consumables, Furniture, and Cleaning Supplies.</p>
        </VFCard>
      ),
    },
    {
      id: 'stock-mgmt',
      label: 'Stock Inward / Outward',
      icon: <Boxes className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Stock Adjustments, Issuance Vouchers & Return Logs">
          <p className="text-xs text-muted-foreground">Issue stationery to staff departments, log lab chemical consumption, and record stock returns.</p>
        </VFCard>
      ),
    },
    {
      id: 'asset-mgmt',
      label: 'Fixed Assets Registry',
      icon: <Boxes className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Fixed Assets & Equipment Tagging</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Computers, Smart Interactive Boards, AC Units, Laboratory Instruments, and Auditorium Projectors.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Register Asset</VFButton>
          </div>
          <VFDataTable columns={assetColumns} data={assetData} filterPlaceholder="Filter asset tag, name, or location..." />
        </div>
      ),
    },
    {
      id: 'procurement',
      label: 'Purchase Requests (PR)',
      icon: <ShoppingCart className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Purchase Requisition Workflow (PR ➔ PO ➔ GRN)">
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
      ),
    },
    {
      id: 'vendor-quotations',
      label: 'Vendor Quotations',
      icon: <Truck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Vendor Bidding & Price Quotation Analysis">
          <p className="text-xs text-muted-foreground">Compare vendor price quotes, delivery lead times, and payment credit terms.</p>
        </VFCard>
      ),
    },
    {
      id: 'asset-maintenance',
      label: 'Asset AMC & Maintenance',
      icon: <Wrench className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Annual Maintenance Contracts (AMC) & Repair Logs">
          <p className="text-xs text-muted-foreground">Schedule preventive IT hardware servicing, AC maintenance filter replacement, and track warranty claims.</p>
        </VFCard>
      ),
    },
    {
      id: 'asset-disposal',
      label: 'Depreciation & Disposal',
      icon: <Trash2 className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Asset Depreciation & E-Waste Scrap Disposal">
          <p className="text-xs text-muted-foreground">Calculate straight-line asset depreciation value, write off damaged furniture, and auction obsolete IT e-waste.</p>
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
