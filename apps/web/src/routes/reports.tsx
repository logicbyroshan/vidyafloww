import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyaflow/ui';
import * as React from 'react';

export const Route = createFileRoute('/reports')({
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Reports" 
        description="Manage reports and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The reports module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
