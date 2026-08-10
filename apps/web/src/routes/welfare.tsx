import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/welfare')({
  component: WelfarePage,
});

function WelfarePage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Student Life & Welfare" 
        description="Discipline records, counselling, extra-curricular activities, achievements, and alumni network."
      />
      <VFEmptyState
        title="Student Welfare & Life Center"
        description="Integrated student counselling, incident logs, club activities, awards, and alumni network management."
      />
    </VFPageContainer>
  );
}
