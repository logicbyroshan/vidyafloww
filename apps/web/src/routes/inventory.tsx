import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFTabs, VFCard, VFButton, VFBadge } from '@vidyamaxx/ui';
import { Package, Boxes, ShoppingCart, Truck, Plus } from 'lucide-react';

export const Route = createFileRoute('/inventory')({
  component: InventoryPage,
});

function InventoryPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('consumables');

  const submoduleTabs = [
    {
      id: 'consumables',
      label: 'Consumables & Store',
      icon: <Package className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Store Consumables & Stock Levels</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Stationery, lab reagents, uniforms, sports goods, and cleaning supplies.</p>
            </div>
            <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Stock Item</VFButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { item: 'A4 Printing Paper (Rim)', cat: 'Stationery', stock: '142 Rims', status: 'In Stock' },
              { item: 'Chemistry Titration Reagent', cat: 'Lab Supplies', stock: '12 Bottles', status: 'Low Stock' },
              { item: 'Football & Sports Kit', cat: 'Sports', stock: '45 Sets', status: 'In Stock' },
            ].map((st, i) => (
              <VFCard key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">{st.item}</span>
                  <VFBadge variant={st.status === 'Low Stock' ? 'warning' : 'success'}>{st.status}</VFBadge>
                </div>
                <p className="text-[11px] text-muted-foreground">Category: {st.cat}</p>
                <p className="text-xs font-bold text-primary mt-2">Qty: {st.stock}</p>
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
        <VFCard title="Fixed Assets & Annual Maintenance Contracts (AMC)">
          <p className="text-xs text-muted-foreground">Computers, Smart Interactive Boards, Furniture, AC units, and Repair schedules.</p>
        </VFCard>
      ),
    },
    {
      id: 'procurement',
      label: 'Procurement Workflow',
      icon: <ShoppingCart className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Purchase Order & Requisition Lifecycle">
          <p className="text-xs text-muted-foreground">Purchase Request ➔ Manager Approval ➔ Vendor Quotation ➔ Purchase Order (PO) ➔ Goods Received (GRN).</p>
        </VFCard>
      ),
    },
    {
      id: 'vendors',
      label: 'Vendor Registry',
      icon: <Truck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Approved Vendor Registry & History">
          <p className="text-xs text-muted-foreground">Manage authorized school suppliers, payment terms, and delivery performance metrics.</p>
        </VFCard>
      ),
    },
  ];

  return (
    <VFPageContainer>
      <VFPageHeader 
        title="15 — Inventory, Assets & Procurement" 
        description="Store management, asset lifecycle, purchase requests, and maintenance schedules."
      />
      <VFTabs 
        items={submoduleTabs} 
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="underline"
      />
    </VFPageContainer>
  );
}
