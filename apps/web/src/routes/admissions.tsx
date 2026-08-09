import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';
import * as React from 'react';

export const Route = createFileRoute('/admissions')({
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Admissions" 
        description="Manage admissions and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The admissions module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
