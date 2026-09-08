import { createFileRoute } from '@tanstack/react-router';
import { Building2 } from 'lucide-react';
import { SubsystemLaunchpad } from '../components/SubsystemLaunchpad';

export const Route = createFileRoute('/hostel')({
  component: HostelGatewayPage,
});

function HostelGatewayPage() {
  return (
    <SubsystemLaunchpad
      id="hostel"
      title="Hostel & Dormitory Management"
      hindiTitle="छात्रावास व शयन कक्ष प्रबंधन"
      description="Dedicated residential campus administration subsystem featuring room occupancy matrices, 7-day nutritional mess planning, biometric gate outpass tracking, and nightly dorm roll calls."
      subdomainUrl="https://hostel.vidyafloww.com"
      localPath="New_apps/Hostel-Management/src/HostelModule.tsx"
      icon={Building2}
      backendPort={8011}
      features={[
        'Interactive Room & Bed Occupancy Matrix',
        'Slide-Over Resident Allocation & Vacate Drawer',
        '7-Day Food Timetable (Breakfast, Lunch, Dinner)',
        'Campus Outpass & Leave Duration Ledger',
        '09:30 PM Night Roll Call with 4-Way Status Toggles',
        'Biometric Gate Scanner & Emergency Guardian Sync',
      ]}
    />
  );
}
