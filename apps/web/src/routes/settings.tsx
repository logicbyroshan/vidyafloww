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
  Building,
  ShieldAlert,
  Calendar,
  Layers,
  FileCheck,
  SlidersHorizontal,
  Plus,
  Download,
  Award,
  Globe,
  Settings,
  BarChart3,
} from 'lucide-react';

export const Route = createFileRoute('/settings')({
  component: SchoolAdministrationPage,
});

function SchoolAdministrationPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const campusData = [
    { code: 'CMP-01', name: 'VidyaMaxx Public School (Main Campus)', city: 'New Delhi', board: 'CBSE (Affiliation #1630982)', session: '2026-2027', students: 1248, status: 'Active Primary' },
    { code: 'CMP-02', name: 'VidyaMaxx International (North Branch)', city: 'Gurugram', board: 'CBSE / IB World', session: '2026-2027', students: 840, status: 'Active Branch' },
  ];

  const campusColumns = [
    { header: 'Campus Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Institutional Name', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'City / Region', accessorKey: 'city' },
    { header: 'Board Affiliation', accessorKey: 'board' },
    { header: 'Active Session', accessorKey: 'session' },
    { header: 'Enrolled Strength', accessorKey: 'students', cell: (r: any) => `${r.students} Students` },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — School Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Academic Session" value="2026 - 2027" icon={<Calendar className="h-5 w-5 text-primary" />} trend="up" trendLabel="Term 1 In Progress" />
        <VFStatCard title="Institutional Campuses" value="2 Campuses" icon={<Building className="h-5 w-5 text-emerald-500" />} trend="neutral" trendLabel="Main & North Branch" />
        <VFStatCard title="CBSE Affiliation Status" value="Compliant 🟢" icon={<ShieldAlert className="h-5 w-5 text-amber-500" />} description="Valid till 2030" />
        <VFStatCard title="Mandatory Registers" value="100% Up-to-Date" icon={<FileCheck className="h-5 w-5 text-purple-500" />} description="RTE & State Audit Ready" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — School Profile
  // ----------------------------------------------------
  const schoolProfileContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Core School Profile & Institutional Identity</h3>
          <p className="text-xs text-muted-foreground font-mono">School registration number, trust deed, school code, and principal contact.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Campus Branch</VFButton>
      </div>
      <VFDataTable columns={campusColumns} data={campusData} filterPlaceholder="Search campus or board affiliation..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Campuses & Branches
  // ----------------------------------------------------
  const campusesBranchesContent = (
    <div className="space-y-4">
      <VFCard title="Multi-Campus Branch Network Master">
        <p className="text-xs text-muted-foreground mb-3">Manage main campus, satellite branches, and international wing configurations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Academic Sessions
  // ----------------------------------------------------
  const sessionsContent = (
    <div className="space-y-4">
      <VFCard title="Academic Session Master (2026-27, 2025-26 Archive)">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-emerald-500 font-bold">Configure session start date (1st April), end date (31st March), and active session flags.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — School Calendar
  // ----------------------------------------------------
  const calendarContent = (
    <div className="space-y-4">
      <VFCard title="School Master Working Days & Holiday Calendar">
        <p className="text-xs text-muted-foreground mb-3">Define 220 statutory working days, gazetted holidays, and vacation breaks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Departments
  // ----------------------------------------------------
  const departmentsContent = (
    <div className="space-y-4">
      <VFCard title="Institutional Department & Faculty Hierarchy">
        <p className="text-xs text-muted-foreground mb-3">Academic departments, administrative divisions, and operational wings.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Classes & Sections
  // ----------------------------------------------------
  const classesSectionsContent = (
    <div className="space-y-4">
      <VFCard title="Grade & Section Master Structure (Nursery to Grade 12)">
        <p className="text-xs text-muted-foreground mb-3">Class 1 to 12 section allocation (Section A, B, C) with room assignments.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Houses
  // ----------------------------------------------------
  const housesContent = (
    <div className="space-y-4">
      <VFCard title="School House System Setup (Red, Blue, Green, Yellow)">
        <p className="text-xs text-muted-foreground mb-3">Configure house names, house colors, motto, and house master faculty leads.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — School Branding
  // ----------------------------------------------------
  const brandingContent = (
    <div className="space-y-4">
      <VFCard title="School Crest, Logo, Colors & Report Card Watermark">
        <p className="text-xs text-muted-foreground mb-3">Upload high-resolution school emblem SVG, primary theme color, and motto font.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — School Policies
  // ----------------------------------------------------
  const policiesContent = (
    <div className="space-y-4">
      <VFCard title="Institutional Code of Conduct & Administrative Policies">
        <p className="text-xs text-muted-foreground mb-3">Anti-bullying policy, POCSO compliance policy, fee refund policy, and IT safety rules.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — General Preferences
  // ----------------------------------------------------
  const preferencesContent = (
    <div className="space-y-4">
      <VFCard title="Global School System Locale & Timezone Preferences">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="School Timezone" defaultValue="Asia/Kolkata (IST +5:30)" />
          <VFSelect label="Default Language" options={[{ label: 'English (Indian Standard)', value: 'en_in' }, { label: 'Hindi', value: 'hi' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — School Configuration
  // ----------------------------------------------------
  const configurationContent = (
    <div className="space-y-4">
      <VFCard title="Core Domain Engine Feature Flags (Isolated Operational Domain Settings)">
        <p className="text-xs text-muted-foreground mb-3 font-mono font-bold">Important: Domain operational settings remain in their respective modules.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Numbering & Codes
  // ----------------------------------------------------
  const numberingCodesContent = (
    <div className="space-y-4">
      <VFCard title="Auto-Numbering Sequences (Admission, Employee, Fee Receipts)">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Configure prefix templates: ADM-2026-XXXX, EMP-2026-XXXX, RCT-2026-XXXX.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Data Import/Export
  // ----------------------------------------------------
  const importExportContent = (
    <div className="space-y-4">
      <VFCard title="Bulk Master Data Migration & Excel Importer Studio">
        <p className="text-xs text-muted-foreground mb-3">Import legacy student records, staff directories, and fee opening balances from Excel.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — School Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Master School System Parameters">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="School Affiliation No" defaultValue="CBSE/AFF/1630982" />
          <VFInput label="Education Board Code" defaultValue="CBSE-DELHI-042" />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // COMPLIANCE & RECORDS SUBMODULES (INCLUDED IN SYSTEM)
  // ----------------------------------------------------
  const mandatoryRegistersContent = (
    <div className="space-y-4">
      <VFCard title="Mandatory Indian School Statutory Registers (CBSE / State Board)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2 font-mono">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Admission & Withdrawal Register</span>
            <p className="text-muted-foreground text-xs mt-1">Form 6 Permanent Bound Register</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Staff Service Book Register</span>
            <p className="text-muted-foreground text-xs mt-1">Statutory Employee Service Logs</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">RTE 25% Reservation Register</span>
            <p className="text-muted-foreground text-xs mt-1">State Education Dept Quota Log</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 15 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'School Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'school-profile', label: 'School Profile', icon: <Building className="h-3.5 w-3.5" />, content: schoolProfileContent },
    { id: 'campuses-branches', label: 'Campuses & Branches', icon: <Globe className="h-3.5 w-3.5" />, content: campusesBranchesContent },
    { id: 'sessions', label: 'Academic Sessions', icon: <Calendar className="h-3.5 w-3.5" />, content: sessionsContent },
    { id: 'calendar', label: 'School Calendar', icon: <Calendar className="h-3.5 w-3.5" />, content: calendarContent },
    { id: 'departments', label: 'Departments', icon: <Layers className="h-3.5 w-3.5" />, content: departmentsContent },
    { id: 'classes-sections', label: 'Classes & Sections', icon: <Layers className="h-3.5 w-3.5" />, content: classesSectionsContent },
    { id: 'houses', label: 'Houses', icon: <Award className="h-3.5 w-3.5" />, content: housesContent },
    { id: 'branding', label: 'School Branding', icon: <Award className="h-3.5 w-3.5" />, content: brandingContent },
    { id: 'policies', label: 'School Policies', icon: <ShieldAlert className="h-3.5 w-3.5" />, content: policiesContent },
    { id: 'preferences', label: 'General Preferences', icon: <Settings className="h-3.5 w-3.5" />, content: preferencesContent },
    { id: 'configuration', label: 'School Configuration', icon: <Settings className="h-3.5 w-3.5" />, content: configurationContent },
    { id: 'mandatory-registers', label: 'Mandatory Compliance Registers', icon: <FileCheck className="h-3.5 w-3.5" />, content: mandatoryRegistersContent },
    { id: 'numbering-codes', label: 'Numbering & Codes', icon: <FileCheck className="h-3.5 w-3.5" />, content: numberingCodesContent },
    { id: 'import-export', label: 'Data Import/Export', icon: <Download className="h-3.5 w-3.5" />, content: importExportContent },
    { id: 'settings', label: 'School Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
