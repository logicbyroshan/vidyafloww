import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFStatCard, VFCard, VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { Building, ShieldCheck, Users, Calendar } from 'lucide-react';

export const Route = createFileRoute('/administration')({
  component: AdministrationPage,
});

function AdministrationPage() {
  const mod = MODULE_REGISTRY.find((m) => m.id === 'administration');

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Campuses" value="3 Branches" icon={<Building className="h-5 w-5" />} description="Main, City & International" />
        <VFStatCard title="Current Session" value="2026-2027" icon={<Calendar className="h-5 w-5" />} trend="up" trendLabel="Term 2 Active" />
        <VFStatCard title="Departments" value="14 Active" icon={<Users className="h-5 w-5" />} description="Academic & Operational" />
        <VFStatCard title="System Policies" value="24 Enforced" icon={<ShieldCheck className="h-5 w-5" />} trend="up" trendLabel="100% Compliant" />
      </div>

      <VFCard title="School Profile & Institutional Branches">
        <div className="space-y-3 text-xs mt-2">
          {[
            { branch: 'Springfield Academy Main Campus', code: 'BR-01', location: 'North Avenue, City Center', status: 'Primary' },
            { branch: 'Springfield Academy International Wing', code: 'BR-02', location: 'Tech Park Zone 4', status: 'Active' },
            { branch: 'Springfield Academy Junior Wing', code: 'BR-03', location: 'Green Park Extension', status: 'Active' },
          ].map((b, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{b.branch} <span className="font-mono text-primary text-[10px]">({b.code})</span></p>
                <p className="text-muted-foreground text-xs mt-0.5">{b.location}</p>
              </div>
              <VFBadge variant={b.status === 'Primary' ? 'primary' : 'success'}>{b.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = (mod?.submodules || []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Building className="h-3.5 w-3.5" />,
    content,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
