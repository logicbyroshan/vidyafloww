import { createFileRoute } from '@tanstack/react-router';
import { Bus } from 'lucide-react';
import { SubsystemLaunchpad } from '../components/SubsystemLaunchpad';

export const Route = createFileRoute('/transport')({
  component: TransportGatewayPage,
});

function TransportGatewayPage() {
  return (
    <SubsystemLaunchpad
      id="transport"
      title="Fleet & School Bus Transport Management"
      hindiTitle="परिवहन व वाहन बेड़ा प्रबंधन"
      description="Mission-critical fleet tracking and student bus route management subsystem supporting GPS telemetry, vehicle fitness compliance, route allocation, and driver licensing."
      subdomainUrl="https://transport.vidyafloww.com"
      localPath="New_apps/Transport-Management/src/TransportModule.tsx"
      icon={Bus}
      backendPort={8012}
      features={[
        'Live Vehicle GPS Telemetry & Speed Monitoring',
        'Bus Route & Stop Schedule Mapping',
        'Vehicle Compliance, Insurance & Pollution Audit',
        'Student Route Allocation & Transportation Fee Sync',
        'Driver Contact & Emergency Guardian SOS Hub',
        'Geo-Fencing & Arrival ETA Alerts',
      ]}
    />
  );
}
