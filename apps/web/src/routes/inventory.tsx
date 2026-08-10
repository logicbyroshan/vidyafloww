import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/inventory')({
  component: InventoryPage,
});

function InventoryPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Inventory, Assets & Procurement" 
        description="Store management, asset lifecycle, purchase requests, and maintenance schedules."
      />
      <VFEmptyState
        title="Inventory & Asset Management"
        description="Track consumables, stationary, IT assets, AMC maintenance, and vendor purchase orders."
      />
    </VFPageContainer>
  );
}
