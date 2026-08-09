import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyaflow/ui';
import * as React from 'react';

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
