import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/ai')({
  component: AiPage,
});

function AiPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Ai" 
        description="Manage ai and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The ai module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
