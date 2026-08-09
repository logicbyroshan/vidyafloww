import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyaflow/ui';
import * as React from 'react';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

function AcademicsPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Academics" 
        description="Manage academics and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The academics module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
