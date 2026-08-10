import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/attendance')({
  component: AttendancePage,
});

function AttendancePage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Attendance" 
        description="Manage attendance and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The attendance module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
