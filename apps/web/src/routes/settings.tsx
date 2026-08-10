import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Settings" 
        description="Manage settings and related configurations."
      />
      <VFEmptyState
        title="Module Under Construction"
        description="The settings module is scheduled for Phase 1 implementation."
      />
    </VFPageContainer>
  );
}
