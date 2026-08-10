import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/hostel')({
  component: HostelPage,
});

function HostelPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Hostel" 
        description="Manage hostel and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The hostel module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
