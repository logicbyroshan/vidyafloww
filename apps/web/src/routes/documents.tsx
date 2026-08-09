import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyaflow/ui';
import * as React from 'react';

export const Route = createFileRoute('/documents')({
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Documents" 
        description="Manage documents and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The documents module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
