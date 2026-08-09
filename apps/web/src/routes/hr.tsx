import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';
import * as React from 'react';

export const Route = createFileRoute('/hr')({
  component: HrPage,
});

function HrPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Hr" 
        description="Manage hr and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The hr module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
