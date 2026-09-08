import { createFileRoute } from '@tanstack/react-router';
import { UserCheck } from 'lucide-react';
import { SubsystemLaunchpad } from '../components/SubsystemLaunchpad';

export const Route = createFileRoute('/hr-manage')({
  component: HRManagementGatewayPage,
});

function HRManagementGatewayPage() {
  return (
    <SubsystemLaunchpad
      id="hr-manage"
      title="Operational HR & Staff Management"
      hindiTitle="गैर-शैक्षणिक स्टाफ व मानव संसाधन"
      description="Workforce administration and human resources subsystem for non-teaching operational personnel, security, housekeeping, drivers, wardens, and laboratory technicians."
      subdomainUrl="https://hr.vidyafloww.com"
      localPath="New_apps/HR-Management/src/HRManagementModule.tsx"
      icon={UserCheck}
      backendPort={8013}
      features={[
        'Operational Staff 360-Degree Dossier Drawer',
        'Biometric Daily Punch Logs & Attendance Tracking',
        'Institutional Asset Tracking & Issue Ledger',
        'Monthly Pay Slip Generation & Salary Deductions',
        'Exportable Verification Document Zip Bundles',
        'Compliance, Police Verification & Medical Records',
      ]}
    />
  );
}
