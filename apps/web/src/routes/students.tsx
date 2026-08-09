import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyaflow/ui';
import * as React from 'react';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Students" 
        description="Manage students and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The students module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
