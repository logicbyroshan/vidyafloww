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
  ShieldCheck,
  Lock,
  Smartphone,
  Eye,
  AlertTriangle,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  Download,
  History,
  BarChart3,
  KeyRound,
  Activity,
  FileText,
} from 'lucide-react';

export const Route = createFileRoute('/security')({
  component: SecurityPage,
});

function SecurityPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const auditData = [
    { eventId: 'SEC-2026-9041', user: 'admin@vidyamaxx.edu (System SuperAdmin)', action: 'ROLE_PERMISSION_GRANT', details: 'Granted Fee Collection Overwrite to Counter Clerk 2', ip: '192.168.1.42', timestamp: 'Today, 10:14 AM', severity: 'High' },
    { eventId: 'SEC-2026-9040', user: 'principal@vidyamaxx.edu', action: 'DIGITAL_SIGNATURE_APPLIED', details: 'Signed 42 Transfer Certificates Batch TC-2026-08', ip: '192.168.1.10', timestamp: 'Today, 09:45 AM', severity: 'Info' },
    { eventId: 'SEC-2026-9038', user: 'unknown_attempt', action: 'FAILED_LOGIN_ATTEMPT', details: '5 Incorrect Passwords from IP 45.142.120.4', ip: '45.142.120.4', timestamp: 'Yesterday, 11:30 PM', severity: 'Warning' },
  ];

  const auditColumns = [
    { header: 'Event ID', accessorKey: 'eventId', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.eventId}</span> },
    { header: 'User Account', accessorKey: 'user', cell: (r: any) => <span className="font-bold text-foreground">{r.user}</span> },
    { header: 'Action Performed', accessorKey: 'action', cell: (r: any) => <VFBadge variant="outline">{r.action}</VFBadge> },
    { header: 'Event Details', accessorKey: 'details' },
    { header: 'Source IP Address', accessorKey: 'ip', cell: (r: any) => <span className="font-mono text-xs">{r.ip}</span> },
    { header: 'Timestamp', accessorKey: 'timestamp' },
    { header: 'Severity', accessorKey: 'severity', cell: (r: any) => <VFBadge variant={r.severity === 'Warning' ? 'warning' : r.severity === 'High' ? 'danger' : 'success'}>{r.severity}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Security Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active User Sessions" value="84 Sessions" icon={<Users className="h-5 w-5 text-primary" />} trend="up" trendLabel="Staff & Admins" />
        <VFStatCard title="Security Score" value="98 / 100" icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />} trend="up" trendLabel="SOC 2 Compliant" />
        <VFStatCard title="Failed Login Attempts" value="5 Blocked" icon={<AlertTriangle className="h-5 w-5 text-amber-500" />} description="IP Rate-limited" />
        <VFStatCard title="Audit Trail Integrity" value="100% Immutable" icon={<Lock className="h-5 w-5 text-purple-500" />} description="Cryptographic SHA-256 Logs" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Audit Logs
  // ----------------------------------------------------
  const auditLogsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Immutable System Cryptographic Audit Trail</h3>
          <p className="text-xs text-muted-foreground font-mono">Tamper-evident system log tracking every administrative data modification.</p>
        </div>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Audit Log (CSV)</VFButton>
      </div>
      <VFDataTable columns={auditColumns} data={auditData} filterPlaceholder="Search action, user, or IP address..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Login History
  // ----------------------------------------------------
  const loginHistoryContent = (
    <div className="space-y-4">
      <VFCard title="User Authentication & Login History">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Timestamped record of successful logins, 2FA OTP verifications, and failed passwords.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Device Sessions
  // ----------------------------------------------------
  const sessionsContent = (
    <div className="space-y-4">
      <VFCard title="Active Device Sessions & Browser Fingerprints">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Monitor Chrome, Safari, and Mobile app sessions with remote sign-out capability.</p>
        <VFButton size="sm" variant="danger">Terminate All Other Sessions</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Access History
  // ----------------------------------------------------
  const accessHistoryContent = (
    <div className="space-y-4">
      <VFCard title="Resource Access & API Request History">
        <p className="text-xs text-muted-foreground mb-3">Track access to sensitive student records, fee ledgers, and staff payroll data.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Permission Changes
  // ----------------------------------------------------
  const permissionChangesContent = (
    <div className="space-y-4">
      <VFCard title="Role Permission Modification & Escalation Register">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Audit trail of role assignment additions, removals, and permission grants.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Data Change History
  // ----------------------------------------------------
  const dataChangesContent = (
    <div className="space-y-4">
      <VFCard title="Field-Level Record Modification Delta Log">
        <p className="text-xs text-muted-foreground mb-3">Track exact before and after values for student marks, fee amounts, and staff salaries.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Security Events
  // ----------------------------------------------------
  const securityEventsContent = (
    <div className="space-y-4">
      <VFCard title="System Security & Threat Event Log">
        <p className="text-xs text-muted-foreground mb-3">Password resets, API key generations, database backup triggers, and SSL renewals.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Suspicious Activity
  // ----------------------------------------------------
  const suspiciousActivityContent = (
    <div className="space-y-4">
      <VFCard title="AI Anomaly & Suspicious Activity Detection Engine">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-amber-500 font-bold">Detect impossible travel logins, mass data exports, or off-hours access.</p>
        <VFBadge variant="warning">0 High Risk Anomalies Detected</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Account Security
  // ----------------------------------------------------
  const accountSecurityContent = (
    <div className="space-y-4">
      <VFCard title="User Account Password Policies & Two-Factor Authentication (2FA)">
        <p className="text-xs text-muted-foreground mb-3">Enforce mandatory TOTP 2FA for all administrative accounts and 90-day password expiry.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Session Management
  // ----------------------------------------------------
  const sessionManagementContent = (
    <div className="space-y-4">
      <VFCard title="Session Timeout & Idle Lock Configuration">
        <p className="text-xs text-muted-foreground mb-3">Automatic 15-minute idle session lock for fee counter and grade entry screens.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Security Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Compliance Audit & Security Infrastructure Reports">
        <p className="text-xs text-muted-foreground mb-3">Export SOC 2 Type II compliance readiness reports and security incident logs.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Security Audit Report (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Security Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Security & IP Whitelist Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Session Idle Timeout" defaultValue="15 Minutes" />
          <VFSelect label="Mandatory 2FA Requirement" options={[{ label: 'Enforced for Admin & Staff', value: 'admin' }, { label: 'Enforced for All Users', value: 'all' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 13 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Security Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'audit-logs', label: 'Audit Logs', icon: <FileText className="h-3.5 w-3.5" />, content: auditLogsContent },
    { id: 'login-history', label: 'Login History', icon: <History className="h-3.5 w-3.5" />, content: loginHistoryContent },
    { id: 'sessions', label: 'Device Sessions', icon: <Smartphone className="h-3.5 w-3.5" />, content: sessionsContent },
    { id: 'access-history', label: 'Access History', icon: <Eye className="h-3.5 w-3.5" />, content: accessHistoryContent },
    { id: 'permission-changes', label: 'Permission Changes', icon: <KeyRound className="h-3.5 w-3.5" />, content: permissionChangesContent },
    { id: 'data-changes', label: 'Data Change History', icon: <Activity className="h-3.5 w-3.5" />, content: dataChangesContent },
    { id: 'security-events', label: 'Security Events', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: securityEventsContent },
    { id: 'suspicious-activity', label: 'Suspicious Activity', icon: <AlertTriangle className="h-3.5 w-3.5" />, content: suspiciousActivityContent },
    { id: 'account-security', label: 'Account Security', icon: <Lock className="h-3.5 w-3.5" />, content: accountSecurityContent },
    { id: 'session-management', label: 'Session Management', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: sessionManagementContent },
    { id: 'reports', label: 'Security Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Security Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
