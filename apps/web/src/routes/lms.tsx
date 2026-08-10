import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFPageHeader, VFEmptyState } from '@vidyamaxx/ui';

export const Route = createFileRoute('/lms')({
  component: LmsPage,
});

function LmsPage() {
  return (
    <VFPageContainer>
      <VFPageHeader 
        title="Learning & Digital Classroom" 
        description="LMS, recorded lectures, online classes, digital notes, and AI Tutor (VidyaFlow)."
      />
      <VFEmptyState
        title="Digital Classroom & AI Tutor"
        description="Interactive digital learning paths, video lessons, homework submissions, and adaptive AI tutoring."
      />
    </VFPageContainer>
  );
}
