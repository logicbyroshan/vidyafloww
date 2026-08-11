import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFStatCard, VFCard, VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { ShieldCheck, Activity, Key, Monitor } from 'lucide-react';

export const Route = createFileRoute('/security')({
  component: SecurityPage,
});

function SecurityPage() {
  const mod = MODULE_REGISTRY.find((m) => m.id === 'security');

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active User Sessions" value="28 Active" icon={<Monitor className="h-5 w-5" />} trend="up" trendLabel="2FA Enforced" />
        <VFStatCard title="Security Score" value="98 / 100" icon={<ShieldCheck className="h-5 w-5" />} trend="up" trendLabel="A+ Security Grade" />
        <VFStatCard title="Failed Login Attempts" value="0 Today" icon={<Key className="h-5 w-5" />} trend="up" trendLabel="Zero Anomalies" />
        <VFStatCard title="Immutable Audit Logs" value="142,500 Logs" icon={<Activity className="h-5 w-5" />} description="Full Change Tracking" />
      </div>

      <VFCard title="Real-Time Security Activity & Access Logs">
        <div className="space-y-3 text-xs mt-2">
          {[
            { user: 'Roshan Singh (Super Admin)', action: 'Logged in from 192.168.1.45', time: '10 mins ago', status: 'Authorized' },
            { user: 'Anita Sharma (Accountant)', action: 'Exported Fee Collection CSV Report', time: '25 mins ago', status: 'Audited' },
            { user: 'Dr. Ramesh Kumar (Principal)', action: 'Updated Academic Session Status to Active', time: '1 hour ago', status: 'Audited' },
          ].map((s, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{s.user}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{s.action} · {s.time}</p>
              </div>
              <VFBadge variant="success">{s.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = (mod?.submodules || []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    content,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
