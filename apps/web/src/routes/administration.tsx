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
  Wrench,
  Building,
  ShieldCheck,
  MapPin,
  Clock,
  SlidersHorizontal,
  Plus,
  AlertCircle,
  Download,
  Barcode,
  History,
  FileText,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';

export const Route = createFileRoute('/administration')({
  component: AdministrationPage,
});

function AdministrationPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const assetData = [
    { code: 'AST-LAB-042', name: 'Dell OptiPlex 7090 Workstation', category: 'IT & Computers', location: 'Computer Lab 2', serial: 'SN-984210', value: '₹54,000', status: 'Operational' },
    { code: 'AST-AC-108', name: 'Daikin 2.0 Ton Inverter AC', category: 'HVAC & Electrical', location: 'Auditorium Main', serial: 'SN-332190', value: '₹62,000', status: 'Under Maintenance' },
    { code: 'AST-GEN-001', name: 'Kirloskar 125 kVA Diesel Generator', category: 'Power & Utilities', location: 'Power House Substation', serial: 'SN-110482', value: '₹8,50,000', status: 'Operational' },
  ];

  const assetColumns = [
    { header: 'Asset Tag Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Asset Description', accessorKey: 'name', cell: (r: any) => <span className="font-bold text-foreground">{r.name}</span> },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Location / Room', accessorKey: 'location' },
    { header: 'Book Value', accessorKey: 'value', cell: (r: any) => <span className="font-mono font-bold text-foreground">{r.value}</span> },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Under Maintenance' ? 'warning' : 'success'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Assets Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Total Fixed Assets" value="2,480 Assets" icon={<Building className="h-5 w-5 text-primary" />} trend="up" trendLabel="₹3.4 Cr Gross Value" />
        <VFStatCard title="Active Work Orders" value="8 Maintenance" icon={<Wrench className="h-5 w-5 text-amber-500" />} trend="neutral" trendLabel="4 In Progress" />
        <VFStatCard title="Active AMC Contracts" value="14 Contracts" icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />} description="HVAC, Generator, Lift, CCTV" />
        <VFStatCard title="Warranty Claims" value="2 Under Review" icon={<Clock className="h-5 w-5 text-purple-500" />} description="OEM Repairs" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Asset Register
  // ----------------------------------------------------
  const registerContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Fixed Asset Barcode Register</h3>
          <p className="text-xs text-muted-foreground">Comprehensive inventory of physical school machinery, IT hardware, and furniture.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Register New Asset</VFButton>
      </div>
      <VFDataTable columns={assetColumns} data={assetData} filterPlaceholder="Search asset name or tag..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Asset Categories
  // ----------------------------------------------------
  const categoriesContent = (
    <div className="space-y-4">
      <VFCard title="Asset Classification & Depreciation Slabs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-2">
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">IT & Computer Equipment</span>
            <p className="text-muted-foreground text-xs mt-1">Depreciation: 40% WDV · Computers, Laptops, Projectors</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Furniture & Classroom Fixtures</span>
            <p className="text-muted-foreground text-xs mt-1">Depreciation: 10% WDV · Desks, Benches, Cabinets</p>
          </div>
          <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
            <span className="font-bold text-foreground">Heavy Machinery & Electrical</span>
            <p className="text-muted-foreground text-xs mt-1">Depreciation: 15% WDV · Generators, ACs, Solar Panels</p>
          </div>
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Asset Assignment
  // ----------------------------------------------------
  const assignmentContent = (
    <div className="space-y-4">
      <VFCard title="Department & Staff Custodian Asset Allocation">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Assign laptops, lab equipment, and keys to specific custodian staff members.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Asset Locations
  // ----------------------------------------------------
  const locationsContent = (
    <div className="space-y-4">
      <VFCard title="Campus Building & Room Location Hierarchy">
        <p className="text-xs text-muted-foreground mb-3">Track assets across Main Building, Science Block, Auditorium, and Sports Complex.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Asset History
  // ----------------------------------------------------
  const historyContent = (
    <div className="space-y-4">
      <VFCard title="Asset Lifecycle & Repair Audit Trail">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Complete historical log of acquisition, transfers, repairs, and valuations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Maintenance Requests
  // ----------------------------------------------------
  const maintenanceRequestsContent = (
    <div className="space-y-4">
      <VFCard title="Staff Breakdown & Maintenance Helpdesk Tickets">
        <p className="text-xs text-muted-foreground mb-3">Report broken ACs, projector bulb failures, or plumbing leaks.</p>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Submit Maintenance Request</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Maintenance Work Orders
  // ----------------------------------------------------
  const workOrdersContent = (
    <div className="space-y-4">
      <VFCard title="Maintenance Work Order Dispatch & Technician Assignment">
        <p className="text-xs text-muted-foreground mb-3">Assign internal electricians, plumbers, or external technicians to open work orders.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Repairs
  // ----------------------------------------------------
  const repairsContent = (
    <div className="space-y-4">
      <VFCard title="Equipment Repair Log & Spare Parts Consumption">
        <p className="text-xs text-muted-foreground mb-3">Record repair costs, replaced spare parts, and technician resolution notes.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Preventive Maintenance
  // ----------------------------------------------------
  const preventiveMaintenanceContent = (
    <div className="space-y-4">
      <VFCard title="Preventive Maintenance Calendar & Service Schedules">
        <p className="text-xs text-muted-foreground mb-3">Quarterly AC filter cleaning, generator load testing, and elevator safety checks.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Service Contracts
  // ----------------------------------------------------
  const serviceContractsContent = (
    <div className="space-y-4">
      <VFCard title="Third-Party Service Provider & Vendor Contracts">
        <p className="text-xs text-muted-foreground mb-3">Manage outsourced janitorial, pest control, and security service agreements.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Warranty
  // ----------------------------------------------------
  const warrantyContent = (
    <div className="space-y-4">
      <VFCard title="OEM Manufacturer Warranty Vault & Expiry Tracker">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Track active equipment warranties and claim free OEM repairs before expiry.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — AMC Management
  // ----------------------------------------------------
  const amcManagementContent = (
    <div className="space-y-4">
      <VFCard title="Annual Maintenance Contract (AMC) Master Register">
        <p className="text-xs text-muted-foreground mb-3">Comprehensive AMC contracts for CCTV systems, water purifiers, and lab instruments.</p>
        <VFBadge variant="success">14 Active AMC Contracts</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 14 — Asset Disposal
  // ----------------------------------------------------
  const disposalContent = (
    <div className="space-y-4">
      <VFCard title="Asset Scrap Write-off & E-Waste Disposal Register">
        <p className="text-xs text-muted-foreground mb-3">Process obsolete asset write-offs, auction scrap sales, and certified e-waste disposal.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 15 — Maintenance Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Fixed Asset Depreciation & Maintenance Expense Reports">
        <p className="text-xs text-muted-foreground mb-3">Export balance sheet asset schedules, depreciation registers, and MTBF breakdown analytics.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Asset Register (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 16 — Asset Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Asset Tagging & Barcode Parameters">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Asset Barcode Prefix" defaultValue="VIDYA-AST-" />
          <VFSelect label="Default Depreciation Method" options={[{ label: 'Written Down Value (WDV)', value: 'wdv' }, { label: 'Straight Line Method (SLM)', value: 'slm' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 16 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Assets Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'register', label: 'Asset Register', icon: <Barcode className="h-3.5 w-3.5" />, content: registerContent },
    { id: 'categories', label: 'Asset Categories', icon: <Layers className="h-3.5 w-3.5" />, content: categoriesContent },
    { id: 'assignment', label: 'Asset Assignment', icon: <FileText className="h-3.5 w-3.5" />, content: assignmentContent },
    { id: 'locations', label: 'Asset Locations', icon: <MapPin className="h-3.5 w-3.5" />, content: locationsContent },
    { id: 'history', label: 'Asset History', icon: <History className="h-3.5 w-3.5" />, content: historyContent },
    { id: 'maintenance-requests', label: 'Maintenance Requests', icon: <Wrench className="h-3.5 w-3.5" />, content: maintenanceRequestsContent },
    { id: 'work-orders', label: 'Maintenance Work Orders', icon: <Wrench className="h-3.5 w-3.5" />, content: workOrdersContent },
    { id: 'repairs', label: 'Repairs', icon: <Wrench className="h-3.5 w-3.5" />, content: repairsContent },
    { id: 'preventive-maintenance', label: 'Preventive Maintenance', icon: <Calendar className="h-3.5 w-3.5" />, content: preventiveMaintenanceContent },
    { id: 'service-contracts', label: 'Service Contracts', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: serviceContractsContent },
    { id: 'warranty', label: 'Warranty', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: warrantyContent },
    { id: 'amc-management', label: 'AMC Management', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: amcManagementContent },
    { id: 'disposal', label: 'Asset Disposal', icon: <AlertCircle className="h-3.5 w-3.5" />, content: disposalContent },
    { id: 'reports', label: 'Maintenance Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Asset Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
