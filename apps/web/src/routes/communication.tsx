import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyaflow/ui';
import * as React from 'react';

export const Route = createFileRoute('/communication')({
  component: CommunicationPage,
});

function CommunicationPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Communication" 
        description="Manage communication and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The communication module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
