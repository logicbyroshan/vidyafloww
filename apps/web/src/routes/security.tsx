import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFCard,
  VFButton,
  VFBadge,
} from '@vidyafloww/ui';
import {
  Shield,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Users,
  Smartphone,
  Globe,
  Sliders,
  Save,
  RotateCcw,
  Terminal,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/security')({
  component: SecurityManagementPage,
});

interface RolePermission {
  module: string;
  superAdmin: boolean;
  principal: boolean;
  frontOffice: boolean;
  accountant: boolean;
  parent: boolean;
}

const DEFAULT_PERMISSIONS: RolePermission[] = [
  { module: 'Student Directory & Dossiers', superAdmin: true, principal: true, frontOffice: true, accountant: false, parent: true },
  { module: 'Admissions Intake Pipeline', superAdmin: true, principal: true, frontOffice: true, accountant: false, parent: false },
  { module: 'Daily Attendance & Bio-Logs', superAdmin: true, principal: true, frontOffice: true, accountant: false, parent: true },
  { module: 'Timetable Schedules & Proxy Allocation', superAdmin: true, principal: true, frontOffice: false, accountant: false, parent: true },
  { module: 'Examination Marks & Grade Moderation', superAdmin: true, principal: true, frontOffice: false, accountant: false, parent: true },
  { module: 'Fee Collections & Receipts', superAdmin: true, principal: true, frontOffice: true, accountant: true, parent: true },
  { module: 'Faculty Workload & Appraisal', superAdmin: true, principal: true, frontOffice: false, accountant: true, parent: false },
  { module: 'Institutional Settings & School Branding', superAdmin: true, principal: false, frontOffice: false, accountant: false, parent: false },
];

function SecurityManagementPage() {
  const { addNotification } = useGlobalStore();

  // Permission Matrix State
  const [permissions, setPermissions] = React.useState<RolePermission[]>(DEFAULT_PERMISSIONS);

  // Security Policies State
  const [twoFactorEnforced, setTwoFactorEnforced] = React.useState(true);
  const [sessionTimeout, setSessionTimeout] = React.useState(30);
  const [whitelistSubnet, setWhitelistSubnet] = React.useState('103.21.244.0/24');
  const [isEditingPolicies, setIsEditingPolicies] = React.useState(false);

  const handleTogglePermission = (moduleIndex: number, roleKey: keyof Omit<RolePermission, 'module'>) => {
    setPermissions((prev) => {
      const next = [...prev];
      next[moduleIndex] = {
        ...next[moduleIndex],
        [roleKey]: !next[moduleIndex][roleKey],
      };
      return next;
    });
    addNotification({
      title: 'Permission Modified',
      description: `Updated module access for role [${roleKey}].`,
      type: 'info',
    });
  };

  const handleSaveMatrix = () => {
    addNotification({
      title: 'Permission Matrix Saved',
      description: 'Institutional access control matrix updated across all portal gateways.',
      type: 'success',
    });
  };

  const handleSavePolicies = () => {
    setIsEditingPolicies(false);
    addNotification({
      title: 'Security Policies Saved',
      description: 'Network perimeter parameters and timeout policies applied.',
      type: 'success',
    });
  };

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-4">
      {/* 1. Header Toolbar Box (Consistent with Students & Timetable Pages) */}
      <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: Back Button + Title */}
        <div className="flex items-center gap-3">
          <Link to="/settings">
            <VFButton
              size="sm"
              variant="outline"
              className="h-9 w-9 p-0 aspect-square bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
              title="Back to Settings"
            >
              <ArrowLeft className="h-4 w-4" />
            </VFButton>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-base font-extrabold text-foreground tracking-tight">
              Role-Based Access Control & Permission Matrix
            </span>
            <VFBadge variant="success" className="text-[10px] font-bold font-mono">
              ISO 27001
            </VFBadge>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/audit">
            <VFButton
              size="sm"
              variant="outline"
              className="h-9 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
              leftIcon={<Terminal className="h-3.5 w-3.5 text-primary" />}
            >
              Live Audit Logs
            </VFButton>
          </Link>

          <VFButton
            size="sm"
            variant="outline"
            onClick={() => {
              setPermissions(DEFAULT_PERMISSIONS);
              addNotification({
                title: 'Matrix Reset',
                description: 'Reset permissions matrix to institutional baseline.',
                type: 'info',
              });
            }}
            className="h-9 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-muted-foreground hover:text-foreground"
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Reset Matrix
          </VFButton>

          <VFButton
            size="sm"
            onClick={handleSaveMatrix}
            className="h-9 px-4 text-xs font-bold shadow-xs"
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save Changes
          </VFButton>
        </div>
      </div>

      {/* 2. Top Security Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Role Tiers</span>
            <p className="text-base font-extrabold text-foreground">5 Institutional Tiers</p>
            <span className="text-[10px] text-emerald-400 font-semibold block">Principal Delegation Active</span>
          </div>
          <div className="h-9 w-9 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Users className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Two-Factor Auth</span>
            <p className="text-base font-extrabold text-foreground">Enforced</p>
            <span className="text-[10px] text-primary font-semibold block">All Admins & Principals</span>
          </div>
          <div className="h-9 w-9 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Smartphone className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Session Timeout</span>
            <p className="text-base font-extrabold text-foreground">{sessionTimeout} Minutes</p>
            <span className="text-[10px] text-blue-400 font-semibold block">Auto-disconnect Lock</span>
          </div>
          <div className="h-9 w-9 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
            <Lock className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#141414] border border-border/80 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Campus Subnet IP</span>
            <p className="text-base font-extrabold text-foreground truncate max-w-[120px]">103.21.244.0/24</p>
            <span className="text-[10px] text-emerald-400 font-semibold block">Whitelist Protected</span>
          </div>
          <div className="h-9 w-9 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Globe className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>

      {/* 3. Role-Based Module Permission Matrix */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary/15 text-primary flex items-center justify-center shrink-0 border border-primary/30">
              <Users className="h-3.5 w-3.5" />
            </div>
            <span>Enterprise Module Authorization Matrix</span>
          </div>
        }
        description="Click any cell to toggle module capabilities. Faculty permissions are managed directly by the School Principal."
        className="bg-[#141414] border-border/80"
        bodyClassName="p-0 overflow-x-auto"
      >
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-border/80 bg-[#1a1a1a] text-muted-foreground font-extrabold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4">Core Portal Module</th>
              <th className="py-3.5 px-3 text-center">
                Super Admin
                <span className="block text-[9px] text-muted-foreground font-normal lowercase">(full root)</span>
              </th>
              <th className="py-3.5 px-3 text-center">
                School Principal
                <span className="block text-[9px] text-primary font-bold lowercase">(faculty governance)</span>
              </th>
              <th className="py-3.5 px-3 text-center">
                Front Office
                <span className="block text-[9px] text-amber-400/80 font-normal lowercase">(intake & records)</span>
              </th>
              <th className="py-3.5 px-3 text-center">
                Accountant
                <span className="block text-[9px] text-purple-400/80 font-normal lowercase">(finance & fees)</span>
              </th>
              <th className="py-3.5 px-3 text-center">
                Parent & Student
                <span className="block text-[9px] text-blue-400/80 font-normal lowercase">(self-service)</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {permissions.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#1a1a1a]/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-foreground">{row.module}</td>
                
                {/* Super Admin */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    type="button"
                    disabled
                    className="h-5 w-5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 inline-flex items-center justify-center cursor-not-allowed mx-auto"
                    title="Super Admin has immutable full root privileges"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </button>
                </td>

                {/* Principal */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleTogglePermission(idx, 'principal')}
                    className={`h-5 w-5 rounded border inline-flex items-center justify-center cursor-pointer transition-colors mx-auto ${
                      row.principal
                        ? 'bg-primary/20 text-primary border-primary/40'
                        : 'bg-[#141414] text-muted-foreground/40 border-border/60 hover:border-border'
                    }`}
                  >
                    {row.principal && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                </td>

                {/* Front Office */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleTogglePermission(idx, 'frontOffice')}
                    className={`h-5 w-5 rounded border inline-flex items-center justify-center cursor-pointer transition-colors mx-auto ${
                      row.frontOffice
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-[#141414] text-muted-foreground/40 border-border/60 hover:border-border'
                    }`}
                  >
                    {row.frontOffice && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                </td>

                {/* Accountant */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleTogglePermission(idx, 'accountant')}
                    className={`h-5 w-5 rounded border inline-flex items-center justify-center cursor-pointer transition-colors mx-auto ${
                      row.accountant
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                        : 'bg-[#141414] text-muted-foreground/40 border-border/60 hover:border-border'
                    }`}
                  >
                    {row.accountant && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                </td>

                {/* Parent Portal */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleTogglePermission(idx, 'parent')}
                    className={`h-5 w-5 rounded border inline-flex items-center justify-center cursor-pointer transition-colors mx-auto ${
                      row.parent
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        : 'bg-[#141414] text-muted-foreground/40 border-border/60 hover:border-border'
                    }`}
                  >
                    {row.parent && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </VFCard>

      {/* 4. Network Perimeter & Session Governance */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
              <Sliders className="h-3.5 w-3.5" />
            </div>
            <span>Network Perimeter & Session Governance</span>
          </div>
        }
        description="Enforce two-factor authentication, customize session auto-timeout, and configure IP CIDR whitelist."
        actions={
          <VFButton
            size="sm"
            variant="outline"
            onClick={() => {
              if (isEditingPolicies) {
                handleSavePolicies();
              } else {
                setIsEditingPolicies(true);
              }
            }}
            className="h-8 px-3 text-xs bg-[#141414] hover:bg-[#222222] border-border text-foreground"
          >
            {isEditingPolicies ? 'Save Parameters' : 'Edit Security Parameters'}
          </VFButton>
        }
        className="bg-[#141414] border-border/80"
        bodyClassName="p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 2FA Policy */}
          <div className="p-4 rounded-lg bg-[#1a1a1a] border border-border/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">Two-Factor Authentication (2FA)</label>
              <VFBadge variant="success" className="text-[10px]">Active</VFBadge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Mandatory for Super Administrators, Department Heads, and Bursar Accounts on new device logins.
            </p>
            {isEditingPolicies && (
              <div className="pt-2 flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnforced}
                    onChange={(e) => setTwoFactorEnforced(e.target.checked)}
                    className="rounded border-border bg-[#141414] text-primary"
                  />
                  Enforce 2FA globally
                </label>
              </div>
            )}
          </div>

          {/* Inactivity Auto-Logout */}
          <div className="p-4 rounded-lg bg-[#1a1a1a] border border-border/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">Inactivity Session Timeout</label>
              <span className="font-mono font-bold text-primary text-xs">{sessionTimeout} Minutes</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Automatically terminates idle browser sessions to prevent unauthorized physical terminal access.
            </p>
            {isEditingPolicies && (
              <div className="pt-1">
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#141414] rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-1">
                  <span>5m</span>
                  <span>30m</span>
                  <span>60m</span>
                  <span>120m</span>
                </div>
              </div>
            )}
          </div>

          {/* IP Whitelisting Subnet */}
          <div className="p-4 rounded-lg bg-[#1a1a1a] border border-border/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">Campus IP Whitelist Subnet</label>
              <VFBadge variant="outline" className="text-[10px]">Restricted</VFBadge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Restricts financial fee disbursement and master grade publishing to registered institutional static IPs.
            </p>
            {isEditingPolicies ? (
              <input
                type="text"
                value={whitelistSubnet}
                onChange={(e) => setWhitelistSubnet(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-border rounded-md bg-[#141414] text-foreground font-mono"
              />
            ) : (
              <code className="px-2.5 py-1 rounded bg-[#141414] border border-border/60 text-foreground font-mono text-xs block">
                {whitelistSubnet}
              </code>
            )}
          </div>
        </div>
      </VFCard>
    </VFPageContainer>
  );
}
