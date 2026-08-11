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
} from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import {
  ShieldCheck,
  Key,
  Monitor,
  Sparkles,
  Plus,
  Lock,
  AlertTriangle,
} from 'lucide-react';

export const Route = createFileRoute('/security')({
  component: SecurityPage,
});

interface AuditLogRecord {
  id: string;
  auditId: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
  device: string;
}

interface IncidentRecord {
  id: string;
  incidentNo: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  status: 'Investigating' | 'Contained' | 'Resolved';
  reportedAt: string;
}

function SecurityPage() {
  const securityModule = MODULE_REGISTRY.find((m) => m.id === 'security');

  const auditLogsData: AuditLogRecord[] = [
    { id: '1', auditId: 'AUD-2026-009284', timestamp: 'Today 10:42 AM', actor: 'Roshan Singh', role: 'Super Admin', action: 'Updated Class Teacher Assignment', resource: 'Class 10-A', ipAddress: '192.168.1.45', device: 'Windows / Chrome' },
    { id: '2', auditId: 'AUD-2026-009285', timestamp: 'Today 10:31 AM', actor: 'Anita Sharma', role: 'Accountant', action: 'Exported Fee Collection CSV Report', resource: 'Fee Ledger', ipAddress: '192.168.1.88', device: 'Windows / Edge' },
    { id: '3', auditId: 'AUD-2026-009286', timestamp: 'Today 10:20 AM', actor: 'Dr. Suresh Verma', role: 'Principal', action: 'Approved Leave Request (LV-042)', resource: 'HR Module', ipAddress: '192.168.1.12', device: 'macOS / Safari' },
  ];

  const incidentsData: IncidentRecord[] = [
    { id: '1', incidentNo: 'INC-2026-0042', type: 'Account Access Anomaly', severity: 'High', description: 'Multiple failed logins (18 attempts) on Admin account from unrecognized IP.', status: 'Investigating', reportedAt: 'Today 09:30 AM' },
    { id: '2', incidentNo: 'INC-2026-0043', type: 'Unusual Data Export', severity: 'Medium', description: 'Unusual bulk student data CSV export triggered by Finance user.', status: 'Contained', reportedAt: '10 Aug 2026' },
  ];

  // 23.1 Security Dashboard Submodule Content
  const dashboardContent = (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Institutional Security & SOC Command Center</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage 126 active sessions, immutable audit trails, MFA policies, data privacy controls, and security incidents.</p>
        </div>
        <div className="flex items-center gap-2">
          <VFButton size="sm" variant="outline" leftIcon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            ✨ Ask Security AI
          </VFButton>
          <VFButton size="sm" variant="outline" leftIcon={<Lock className="h-3.5 w-3.5" />}>Review Sessions</VFButton>
        </div>
      </div>

      {/* Feature 1 — Security KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Security Health Score" value="94 / 100" icon={<ShieldCheck className="h-5 w-5 text-success" />} trend="up" trendLabel="Grade A+ Healthy Controls 🟢" />
        <VFStatCard title="Active Concurrent Sessions" value="126 Active" icon={<Monitor className="h-5 w-5 text-primary" />} description="84% MFA Enforced" />
        <VFStatCard title="Security Alerts" value="3 Alerts" icon={<AlertTriangle className="h-5 w-5 text-warning" />} description="1 High-Risk Event" />
        <VFStatCard title="Failed Login Attempts" value="18 Attempts" icon={<Key className="h-5 w-5 text-destructive" />} description="Rate-limited 🔒" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* System Health & Audit Feed */}
        <VFSection title="Security Control Health & Immutable Audit Feed" className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">Authentication</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Healthy (MFA 84%)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">Audit Logging</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Enabled (Immutable)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">Data Protection</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Configured (Masked)</p>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl text-center">
              <span className="text-xs text-muted-foreground">Backup Status</span>
              <p className="text-xs text-success font-semibold mt-0.5">🟢 Healthy (Automated)</p>
            </div>
          </div>

          <VFDataTable
            columns={[
              { header: 'Audit Event ID', accessorKey: 'auditId', cell: (r: AuditLogRecord) => <span className="font-mono font-bold text-primary">{r.auditId}</span> },
              { header: 'Actor / User', accessorKey: 'actor', cell: (r: AuditLogRecord) => <span className="font-bold text-foreground">{r.actor} ({r.role})</span> },
              { header: 'Action', accessorKey: 'action' },
              { header: 'Target Resource', accessorKey: 'resource', cell: (r: AuditLogRecord) => <VFBadge variant="outline">{r.resource}</VFBadge> },
              { header: 'IP & Device', accessorKey: 'ipAddress', cell: (r: AuditLogRecord) => <span className="font-mono text-muted-foreground text-xs">{r.ipAddress}</span> },
              { header: 'Time', accessorKey: 'timestamp' },
            ]}
            data={auditLogsData}
            filterPlaceholder="Search audit event ID or user..."
          />
        </VFSection>

        {/* Security Alerts & Incident Tracking */}
        <VFCard title="Security Alerts & Active Incidents">
          <div className="space-y-3 text-xs mt-1">
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🔴 Multiple Failed Logins</span>
                <VFBadge variant="danger">High Risk</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">18 attempts on Admin account from IP 198.51.100.42 (Rate-limited).</p>
            </div>
            <div className="p-3 bg-warning/10 border border-warning/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">🟠 Unusual Data Export</span>
                <VFBadge variant="warning">Investigating</VFBadge>
              </div>
              <p className="text-muted-foreground text-xs">Bulk student data CSV export triggered by Finance user.</p>
            </div>
            <div className="p-2.5 bg-card border border-border rounded-xl space-y-1">
              <span className="font-mono text-[10px] text-muted-foreground">ℹ Immutable Audit Storage Enforced · Audit records cannot be edited or deleted.</span>
            </div>
          </div>
        </VFCard>
      </div>
    </div>
  );

  // 23.9 Incident & SOC Investigations Submodule Content
  const incidentsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-foreground">Security Operations Center (SOC) & Incident Management</h3>
          <p className="text-xs text-muted-foreground">Investigate security alerts, track threat containment steps, and record post-incident root cause analyses.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Log New Incident</VFButton>
      </div>

      <VFDataTable
        columns={[
          { header: 'Incident No', accessorKey: 'incidentNo', cell: (r: IncidentRecord) => <span className="font-mono font-bold text-primary">{r.incidentNo}</span> },
          { header: 'Threat Type', accessorKey: 'type', cell: (r: IncidentRecord) => <span className="font-bold text-foreground">{r.type}</span> },
          { header: 'Description', accessorKey: 'description' },
          {
            header: 'Severity',
            accessorKey: 'severity',
            cell: (r: IncidentRecord) => (
              <VFBadge variant={r.severity === 'Critical' || r.severity === 'High' ? 'danger' : 'warning'}>
                {r.severity}
              </VFBadge>
            ),
          },
          { header: 'Reported At', accessorKey: 'reportedAt' },
          { header: 'Status', accessorKey: 'status', cell: (r: IncidentRecord) => <VFBadge variant="primary">{r.status}</VFBadge> },
        ]}
        data={incidentsData}
        filterPlaceholder="Search incident number or threat type..."
      />
    </div>
  );

  // Submodule map
  const contentMap: Record<string, React.ReactNode> = {
    dashboard: dashboardContent,
    'audit-logs': dashboardContent,
    'sessions-devices': dashboardContent,
    'access-monitoring': dashboardContent,
    'alerts-risk': dashboardContent,
    'data-privacy': dashboardContent,
    authentication: dashboardContent,
    'security-policies': dashboardContent,
    incidents: incidentsContent,
    'compliance-reports': dashboardContent,
    'security-settings': dashboardContent,
  };

  const submoduleTabs = (securityModule?.submodules || [
    { id: 'dashboard', label: 'Security Dashboard' },
    { id: 'audit-logs', label: 'Audit Logs & History' },
    { id: 'sessions-devices', label: 'Login, Sessions & Devices' },
    { id: 'access-monitoring', label: 'Access & Permissions' },
    { id: 'alerts-risk', label: 'Alerts & Risk Detection' },
    { id: 'data-privacy', label: 'Data Security & Privacy' },
    { id: 'authentication', label: 'Authentication & MFA' },
    { id: 'security-policies', label: 'Security Policies & Controls' },
    { id: 'incidents', label: 'Incident & SOC Investigations' },
    { id: 'compliance-reports', label: 'Compliance & Reports' },
    { id: 'security-settings', label: 'Security Settings' },
  ]).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    content: contentMap[sub.id] || dashboardContent,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={submoduleTabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
