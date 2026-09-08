import { createFileRoute } from '@tanstack/react-router';
import { Palette } from 'lucide-react';
import { SubsystemLaunchpad } from '../components/SubsystemLaunchpad';

export const Route = createFileRoute('/design-lab')({
  component: DesignLabGatewayPage,
});

function DesignLabGatewayPage() {
  return (
    <SubsystemLaunchpad
      id="design-lab"
      title="Design Lab Studio"
      hindiTitle="डिज़ाइन लैब स्टूडियो"
      description="Specialized high-resolution studio for institutional document generation, custom marksheet layouts, biometric ID cards, merit certificates, and examination admit cards."
      subdomainUrl="https://designlab.vidyafloww.com"
      localPath="New_apps/Design-Lab/src/DesignLabModule.tsx"
      icon={Palette}
      backendPort={8010}
      features={[
        'Interactive Marksheet & Tabulation Sheet Studio',
        'Student & Staff Biometric PVC ID Card Designer',
        'Annual Sports & Merit Certificate Generator',
        'Board Examination Admit Card & Hall Ticket Studio',
        'Client-Side Vector Rendering & Native PDF/PNG Export',
        'CBSE/ICSE/State Board Template Presets',
      ]}
    />
  );
}
