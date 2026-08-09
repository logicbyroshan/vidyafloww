import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';
import * as React from 'react';

export const Route = createFileRoute('/transport')({
  component: TransportPage,
});

function TransportPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Transport" 
        description="Manage transport and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The transport module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
