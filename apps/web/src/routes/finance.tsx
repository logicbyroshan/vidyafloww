import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/finance')({
  component: FinancePage,
});

function FinancePage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Finance" 
        description="Manage finance and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The finance module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
