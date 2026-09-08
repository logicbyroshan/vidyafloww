import { createFileRoute } from '@tanstack/react-router';
import { Library } from 'lucide-react';
import { SubsystemLaunchpad } from '../components/SubsystemLaunchpad';

export const Route = createFileRoute('/elibrary')({
  component: ELibraryGatewayPage,
});

function ELibraryGatewayPage() {
  return (
    <SubsystemLaunchpad
      id="elibrary"
      title="Digital E-Library & Reading Hub"
      hindiTitle="डिजिटल ई-पुस्तकालय व अध्ययन केंद्र"
      description="Decoupled institutional library and digital reading portal providing protected access to textbooks, NCERT exemplars, curriculum manuals, and circulation ledgers."
      subdomainUrl="https://library.vidyafloww.com"
      localPath="New_apps/Library-Management/src/LibraryModule.tsx"
      icon={Library}
      backendPort={8014}
      features={[
        'Comprehensive K-12 Digital Textbook Catalog',
        'In-Browser Protected DRM PDF Document Reader',
        'Physical Library Book Circulation & Barcode Ledger',
        'Fine Calculation & Overdue Return Reminders',
        'Dark, Light & Sepia Reading Modes with Zoom Control',
        'Student Reading Analytics & Engagement Metrics',
      ]}
    />
  );
}
