import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Stethoscope,
  HeartPulse,
  Activity,
  FileCheck,
  AlertTriangle,
  Users,
  SlidersHorizontal,
  Plus,
  Download,
  Clock,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';

export const Route = createFileRoute('/health')({
  component: StudentHealthPage,
});

function StudentHealthPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const healthData = [
    { healthId: 'HLT-2026-104', student: 'Aarav Mehta (Class 8-B)', bloodGroup: 'O+ Positive', condition: 'Mild Asthma (Inhaler at Sick Bay)', lastCheckup: '12 Jul 2026', doctor: 'Dr. R. K. Gupta', status: 'Active Monitor' },
    { healthId: 'HLT-2026-088', student: 'Ananya Roy (Class 5-A)', bloodGroup: 'B+ Positive', condition: 'Peanut Allergy (EpiPen Logged)', lastCheckup: '05 Aug 2026', doctor: 'Dr. S. Nair', status: 'Allergy Watch' },
    { healthId: 'HLT-2026-042', student: 'Karan Sharma (Class 10-C)', bloodGroup: 'AB+ Positive', condition: 'Annual Vision & Dental Checked', lastCheckup: '01 Aug 2026', doctor: 'Dr. R. K. Gupta', status: 'Fit & Clear' },
  ];

  const healthColumns = [
    { header: 'Health Record ID', accessorKey: 'healthId', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.healthId}</span> },
    { header: 'Student Name', accessorKey: 'student', cell: (r: any) => <span className="font-bold text-foreground">{r.student}</span> },
    { header: 'Blood Group', accessorKey: 'bloodGroup', cell: (r: any) => <VFBadge variant="outline">{r.bloodGroup}</VFBadge> },
    { header: 'Medical Condition / Alert', accessorKey: 'condition' },
    { header: 'Last Checkup Date', accessorKey: 'lastCheckup' },
    { header: 'Attending Doctor', accessorKey: 'doctor' },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Allergy Watch' ? 'warning' : r.status === 'Active Monitor' ? 'primary' : 'success'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Health Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Infirmary Visits Today" value="4 Visits" icon={<Stethoscope className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="Sick Bay Active" />
        <VFStatCard title="Annual Checkups Done" value="1,180 / 1,248" icon={<HeartPulse className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="94.5% Completed" />
        <VFStatCard title="Active Allergy Alerts" value="14 Students" icon={<AlertTriangle className="h-5 w-5 text-rose-500" />} description="Canteen & Staff Flagged" />
        <VFStatCard title="Emergency Contacts Sync" value="100% Verified" icon={<ShieldCheck className="h-5 w-5 text-purple-500" />} description="Parent Phone Numbers" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Student Medical Records
  // ----------------------------------------------------
  const medicalRecordsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Student Health & Medical History Vault</h3>
          <p className="text-xs text-muted-foreground font-mono font-bold text-emerald-500">Comprehensive health profiles, blood groups, and doctor checkup logs.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Medical Record</VFButton>
      </div>
      <VFDataTable columns={healthColumns} data={healthData} filterPlaceholder="Search student or medical condition..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Health Checkups
  // ----------------------------------------------------
  const checkupsContent = (
    <div className="space-y-4">
      <VFCard title="Annual School Medical, Vision & Dental Checkup Camps">
        <p className="text-xs text-muted-foreground mb-3">Schedule annual doctor visits, height/weight BMI tracking, and vision screening.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Medical Conditions
  // ----------------------------------------------------
  const medicalConditionsContent = (
    <div className="space-y-4">
      <VFCard title="Chronic Health Condition Management Register">
        <p className="text-xs text-muted-foreground mb-3">Asthma, diabetes, epilepsy, and cardiac condition watchlists.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Allergies
  // ----------------------------------------------------
  const allergiesContent = (
    <div className="space-y-4">
      <VFCard title="Critical Allergy & Dietary Restriction Alerts">
        <p className="text-xs text-muted-foreground mb-3 text-rose-500 font-mono font-bold">Food allergies (peanuts, dairy, gluten) flagged for Canteen and Hostel Mess staff.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Vaccinations
  // ----------------------------------------------------
  const vaccinationsContent = (
    <div className="space-y-4">
      <VFCard title="Immunization & Vaccination Records Register">
        <p className="text-xs text-muted-foreground mb-3">Track compulsory childhood vaccinations (BCG, Polio, DPT, MMR, Tetanus).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Infirmary & Sick Bay
  // ----------------------------------------------------
  const infirmaryContent = (
    <div className="space-y-4">
      <VFCard title="Daily School Infirmary & Sick Bay Bed Allocation Log">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Record student rest time, temperature, medicine administered, and nurse signature.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Injury & Incident Logs
  // ----------------------------------------------------
  const incidentsContent = (
    <div className="space-y-4">
      <VFCard title="Playground & Sports Injury Incident Reports">
        <p className="text-xs text-muted-foreground mb-3">First-aid treatment logs, incident details, and parent notification timestamps.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Emergency Contacts
  // ----------------------------------------------------
  const emergencyContent = (
    <div className="space-y-4">
      <VFCard title="Hospital & Ambulance Fast-Dial Emergency Contacts">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Direct emergency hotline integration with nearby city hospitals.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Health Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="School Health Statistics & BMI Growth Reports">
        <p className="text-xs text-muted-foreground mb-3">Export annual medical checkup cards for parents and statutory health department reports.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Medical Report (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Health Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Infirmary & Emergency Medical Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Infirmary Bed Capacity" defaultValue="6 Beds" />
          <VFSelect label="Auto-SMS Parent on Infirmary Visit" options={[{ label: 'Enabled (Immediate SMS)', value: 'true' }, { label: 'Disabled', value: 'false' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Health Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'medical-records', label: 'Student Medical Records', icon: <Stethoscope className="h-3.5 w-3.5" />, content: medicalRecordsContent },
    { id: 'checkups', label: 'Health Checkups', icon: <HeartPulse className="h-3.5 w-3.5" />, content: checkupsContent },
    { id: 'medical-conditions', label: 'Medical Conditions', icon: <Activity className="h-3.5 w-3.5" />, content: medicalConditionsContent },
    { id: 'allergies', label: 'Allergies & Dietary', icon: <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />, content: allergiesContent },
    { id: 'vaccinations', label: 'Vaccination Records', icon: <FileCheck className="h-3.5 w-3.5" />, content: vaccinationsContent },
    { id: 'infirmary', label: 'Infirmary & Sick Bay', icon: <Clock className="h-3.5 w-3.5" />, content: infirmaryContent },
    { id: 'incidents', label: 'Injury & Incident Logs', icon: <AlertTriangle className="h-3.5 w-3.5" />, content: incidentsContent },
    { id: 'emergency', label: 'Emergency Contacts', icon: <Users className="h-3.5 w-3.5" />, content: emergencyContent },
    { id: 'reports', label: 'Health Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Health Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
  ];

  return (
    <VFPageContainer>
      <VFTabs
        items={submoduleTabs}
        activeTabId={activeSubmodule}
        onTabChange={setActiveSubmodule}
        variant="top-bar"
      />
    </VFPageContainer>
  );
}
