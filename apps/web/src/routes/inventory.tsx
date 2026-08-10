import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFButton, VFBadge, VFDataTable } from '@vidyamaxx/ui';
import { Package, Boxes, ShoppingCart, Truck, Plus, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/inventory')({
  component: InventoryPage,
});

function InventoryPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('consumables');

  const assetData = [
    { assetTag: 'AST-2026-001', name: 'Dell OptiPlex 7090 Desktop', location: 'Comp Lab 01', amcStatus: 'Active AMC', expiry: '15 Dec 2027' },
    { assetTag: 'AST-2026-004', name: 'BenQ Interactive 4K Board', location: 'Class 10-A', amcStatus: 'Active AMC', expiry: '02 Aug 2028' },
    { assetTag: 'AST-2026-012', name: 'Daikin 2.0 Ton Inverter AC', location: 'Auditorium Main', amcStatus: 'Needs Service', expiry: '20 May 2026' },
  ];

  const assetColumns = [
    { header: 'Asset Tag', accessorKey: 'assetTag' },
    { header: 'Asset Description', accessorKey: 'name' },
    { header: 'Location', accessorKey: 'location' },
    {
      header: 'AMC Status',
      accessorKey: 'amcStatus',
      cell: (row: any) => (
        <VFBadge variant={row.amcStatus.includes('Active') ? 'success' : 'warning'}>
          {row.amcStatus}
        </VFBadge>
      ),
    },
    { header: 'AMC Expiry', accessorKey: 'expiry' },
  ];

  const vendorData = [
    { name: 'Apex Stationery & Press', category: 'Paper & Printing', rating: '4.9 ★', poCount: '42 POs', status: 'Approved' },
    { name: 'Micro Tech Solutions', category: 'IT Hardware & AMC', rating: '4.8 ★', poCount: '18 POs', status: 'Approved' },
    { name: 'Neelkamal Science Supplies', category: 'Lab Reagents', rating: '4.7 ★', poCount: '25 POs', status: 'Approved' },
  ];

  const vendorColumns = [
    { header: 'Vendor Name', accessorKey: 'name' },
    { header: 'Supply Category', accessorKey: 'category' },
    { header: 'Rating Score', accessorKey: 'rating' },
    { header: 'Historical POs', accessorKey: 'poCount' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: () => <VFBadge variant="success">Empanelled Vendor</VFBadge>,
    },
  ];

  const submoduleTabs = [
    {
      id: 'consumables',
      label: 'Consumables & Store',
      icon: <Package className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-foreground">Store Consumables & Stock Inventory</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Stationery, lab reagents, uniforms, sports goods, and cleaning supplies.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Stock Item</VFButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { item: 'A4 Printing Paper (Rim)', cat: 'Stationery', stock: '142 Rims', status: 'In Stock', minReq: '50 Rims' },
              { item: 'Chemistry Titration Reagent', cat: 'Lab Supplies', stock: '12 Bottles', status: 'Low Stock', minReq: '25 Bottles' },
              { item: 'Football & Sports Kit', cat: 'Sports', stock: '45 Sets', status: 'In Stock', minReq: '15 Sets' },
            ].map((st, i) => (
              <VFCard key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">{st.item}</span>
                  <VFBadge variant={st.status === 'Low Stock' ? 'warning' : 'success'}>{st.status}</VFBadge>
                </div>
                <p className="text-[11px] text-muted-foreground">Category: {st.cat} · Minimum Threshold: {st.minReq}</p>
                <div className="mt-3 flex justify-between items-center border-t border-border/60 pt-2">
                  <span className="text-xs font-bold text-primary">Qty: {st.stock}</span>
                  <VFButton size="sm" variant="outline">Reorder Item</VFButton>
                </div>
              </VFCard>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'fixed-assets',
      label: 'Fixed Assets & AMC',
      icon: <Boxes className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">School Fixed Assets & Maintenance Contracts</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Track IT Desktops, Smart Boards, AC Units, Furniture, and AMC warranty renewals.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Register Asset</VFButton>
          </div>
          <VFDataTable columns={assetColumns} data={assetData} filterPlaceholder="Filter asset tag, name, or location..." />
        </div>
      ),
    },
    {
      id: 'procurement',
      label: 'Procurement Workflow',
      icon: <ShoppingCart className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Purchase Request (PR) ➔ PO ➔ GRN Lifecycle Pipeline">
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
      id: 'vendors',
      label: 'Vendor Registry',
      icon: <Truck className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Empanelled School Vendors & Supplier Matrix</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Manage authorized suppliers, payment terms, and vendor performance ratings.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Supplier</VFButton>
          </div>
          <VFDataTable columns={vendorColumns} data={vendorData} filterPlaceholder="Search vendor name or supply category..." />
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
