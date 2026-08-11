import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFSection,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFTabs,
  VFBadge,
  VFAreaChart,
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  Settings,
  Cpu,
  Sparkles,
  Plus,
  HardDrive,
  RefreshCw,
  Zap,
  Plug,
} from 'lucide-react';

export const Route = createFileRoute('/system')({
  component: SystemPage,
});

interface TenantRecord {
  id: string;
  tenantId: string;
  schoolName: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  studentCount: number;
  storageUsed: string;
  status: 'Active' | 'Trial' | 'Suspended';
}

interface IntegrationRecord {
  id: string;
  name: string;
  category: string;
  provider: string;
  status: 'Connected' | 'Disconnected' | 'Warning' | 'Error';
  lastHealthCheck: string;
}

function SystemPage() {
  const systemModule = MODULE_REGISTRY.find((m) => m.id === 'system');

  const tenantsData: TenantRecord[] = [
    { id: '1', tenantId: 'TNT-2026-0042', schoolName: 'Springfield Academy Main Campus', plan: 'Enterprise', studentCount: 2840, storageUsed: '684 GB', status: 'Active' },
    { id: '2', tenantId: 'TNT-2026-0043', schoolName: 'Springfield International Wing', plan: 'Professional', studentCount: 1420, storageUsed: '320 GB', status: 'Active' },
    { id: '3', tenantId: 'TNT-2026-0044', schoolName: 'Springfield Junior School', plan: 'Starter', studentCount: 840, storageUsed: '180 GB', status: 'Active' },
  ];

  const integrationsData: IntegrationRecord[] = [
    { id: '1', name: 'Payment Gateway Integration', category: 'Finance', provider: 'Razorpay / Stripe API', status: 'Connected', lastHealthCheck: 'Today 10:40 AM' },
    { id: '2', name: 'Bulk SMS DLT Gateway', category: 'Communication', provider: 'DLT Route SMS API', status: 'Connected', lastHealthCheck: 'Today 10:35 AM' },
    { id: '3', name: 'Object Cloud Storage', category: 'Storage', provider: 'Cloudflare R2 / AWS S3', status: 'Connected', lastHealthCheck: 'Today 10:30 AM' },
    { id: '4', name: 'Google Workspace Single Sign-On', category: 'Authentication', provider: 'Google OAuth2', status: 'Warning', lastHealthCheck: 'Token expires in 12 days' },
  ];

  // 24.1 System Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">VidyaMaxx Platform System Control Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Global SaaS infrastructure control panel, microservices monitoring, background Celery jobs, object storage, and API webhooks.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask System AI
          </VFButton>
          <VFButton size="sm" variant="outline" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>Run Backup</VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Integration</VFButton>
        </div>
      </div>

      {/* Feature 1 — System Administration KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Overall System Health" value="99.94% Uptime" icon={<Cpu className="h-5 w-5 text-success" />} trend="up" trendLabel="Platform Healthy 🟢" />
        <VFStatCard title="Background Celery Jobs" value="14 Running" icon={<Zap className="h-5 w-5 text-primary" />} description="38 Pending · 2 Failed Retrying" />
        <VFStatCard title="Object Storage Used" value="684 GB / 1,000 GB" icon={<HardDrive className="h-5 w-5 text-secondary" />} description="68% Used (Cloudflare R2)" />
        <VFStatCard title="API Integrations" value="12 / 12 Active" icon={<Plug className="h-5 w-5 text-warning" />} description="1 Requires Attention ⚠" />
      </div>

      {/* Feature 2 — System API Latency Telemetry Chart */}
      <VFCard title="Real-time System API Response Time & Throughput Telemetry">
        <VFAreaChart
          data={[
            { time: '10:00 AM', Latency: 22, Requests: 1200 },
            { time: '10:15 AM', Latency: 24, Requests: 1420 },
            { time: '10:30 AM', Latency: 28, Requests: 1840 },
            { time: '10:45 AM', Latency: 21, Requests: 1310 },
            { time: '11:00 AM', Latency: 24, Requests: 1450 },
          ]}
          xKey="time"
          dataKeys={[
            { key: 'Latency', name: 'Avg Latency (ms)', color: '#16a34a' },
            { key: 'Requests', name: 'Requests/min', color: '#0891b2' },
          ]}
          height={180}
        />
      </VFCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Microservices & Tenant Directory */}
        <VFSection title="Active SaaS Microservices & Institutional Tenants" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">PostgreSQL Database</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Healthy (24ms)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">Redis Cache & Queue</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Healthy (0 backlog)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">Celery Workers</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Healthy (4 Workers)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">API Gateway</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Healthy (1,420 req/m)</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Tenant ID', accessorKey: 'tenantId', cell: (r: TenantRecord) => <span className="font-mono font-bold text-primary">{r.tenantId}</span> },
              { header: 'School Name', accessorKey: 'schoolName', cell: (r: TenantRecord) => <span className="font-bold text-foreground">{r.schoolName}</span> },
              { header: 'SaaS Plan', accessorKey: 'plan', cell: (r: TenantRecord) => <VFBadge variant="outline">{r.plan}</VFBadge> },
              { header: 'Student Count', accessorKey: 'studentCount', cell: (r: TenantRecord) => `${r.studentCount} Students` },
              { header: 'Storage Used', accessorKey: 'storageUsed' },
              { header: 'Status', accessorKey: 'status', cell: (r: TenantRecord) => <VFBadge variant="success">{r.status}</VFBadge> },
            ]}
            data={tenantsData}
            filterPlaceholder="Search tenant ID or school name..."
          />
        </VFSection>

        {/* Recent Events & Integration Status */}
        <VFCard title="Recent System Events & Integration Health">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-2.5 bg-success/10 border border-success/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>✓ Database & Storage Backup</span>
                <VFBadge variant="success">02:00 AM Complete</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Automated backup verified & encrypted on R2.</p>
            </div>
            <div className="p-2.5 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-foreground">
                <span>⚠ Google OAuth Refresh Token</span>
                <VFBadge variant="warning">Action Needed</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Token expires in 12 days. Re-authentication required.</p>
            </div>
            <div className="p-2.5 bg-card border border-border rounded-xl space-y-1">
              <span className="font-bold text-foreground">Platform Release Version</span>
              <p className="text-muted-foreground text-xs font-mono mt-0.5">VidyaMaxx Platform v2.8.1 (Latest Build 42/42 Migrations ✓)</p>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 24.5 Specialized Integration Marketplace Submodule Content
  const integrationsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Central Integration Marketplace & API Webhooks Hub</h3>
          <p className="text-xs text-muted-foreground">Manage connected payment gateways, SMS DLT providers, Cloudflare R2 storage buckets, and OAuth single sign-on credentials.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Connect New Provider</VFButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {integrationsData.map((ing) => (
          <VFCard key={ing.id} title={ing.name}>
            <div className="space-y-2 text-xs mt-1">
              <div className="flex items-center justify-between">
                <VFBadge variant="outline">{ing.category}</VFBadge>
                <VFBadge variant={ing.status === 'Connected' ? 'success' : 'warning'}>{ing.status}</VFBadge>
              </div>
              <p className="text-muted-foreground">Provider: <span className="font-mono text-primary font-bold">{ing.provider}</span></p>
              <p className="text-muted-foreground text-xs">Last Health Check: <span className="text-foreground font-semibold">{ing.lastHealthCheck}</span></p>
              <div className="pt-2 flex items-center justify-between border-t border-border">
                <span className="text-[11px] text-muted-foreground">Scope: Read & Write</span>
                <VFButton size="sm" variant="outline" className="text-xs h-7">Test Connection</VFButton>
              </div>
            </div>
          </VFCard>
        ))}
      </div>
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    tenants: dashboardContent,
    'platform-config': dashboardContent,
    'modules-features': dashboardContent,
    'integrations-api': integrationsContent,
    'notifications-config': dashboardContent,
    storage: dashboardContent,
    'jobs-automation': dashboardContent,
    'backup-maintenance': dashboardContent,
    monitoring: dashboardContent,
    releases: dashboardContent,
    diagnostics: dashboardContent,
  };

  const submoduleTabs = (systemModule?.submodules || [
    { id: 'dashboard', label: 'System Dashboard' },
    { id: 'tenants', label: 'Tenant Management' },
    { id: 'platform-config', label: 'Platform Configuration' },
    { id: 'modules-features', label: 'Modules & Feature Flags' },
    { id: 'integrations-api', label: 'Integrations & API' },
    { id: 'notifications-config', label: 'Notification Infrastructure' },
    { id: 'storage', label: 'Storage & File Engine' },
    { id: 'jobs-automation', label: 'Jobs & Automation' },
    { id: 'backup-maintenance', label: 'Backup & Maintenance' },
    { id: 'monitoring', label: 'System Monitoring' },
    { id: 'releases', label: 'Releases & Changes' },
    { id: 'diagnostics', label: 'Tools & Diagnostics' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Settings className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
