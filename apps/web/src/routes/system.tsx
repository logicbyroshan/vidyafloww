import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFStatCard, VFCard, VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { Settings, Server, Users, Database, Cpu } from 'lucide-react';

export const Route = createFileRoute('/system')({
  component: SystemPage,
});

function SystemPage() {
  const mod = MODULE_REGISTRY.find((m) => m.id === 'system');

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="System Health" value="100% Operational" icon={<Cpu className="h-5 w-5" />} trend="up" trendLabel="99.99% Uptime" />
        <VFStatCard title="Registered Users" value="2,840 Users" icon={<Users className="h-5 w-5" />} description="Staff, Students & Parents" />
        <VFStatCard title="Database Size" value="14.2 GB" icon={<Database className="h-5 w-5" />} trend="up" trendLabel="PostgreSQL 16" />
        <VFStatCard title="API Webhooks" value="8 Active" icon={<Server className="h-5 w-5" />} description="Biometric & SMS Sync" />
      </div>

      <VFCard title="System Configuration & Microservice Status">
        <div className="space-y-3 text-xs mt-2">
          {[
            { service: 'Django REST API Backend Server', endpoint: 'http://127.0.0.1:8000/api/v1', status: 'Healthy (24ms latency)' },
            { service: 'Celery Distributed Task Worker Queue', endpoint: 'redis://localhost:6379/0', status: 'Active (0 backlog)' },
            { service: 'PostgreSQL Database & Connection Pool', endpoint: 'postgresql://vidyamaxx_db:5432', status: 'Active (24 connections)' },
          ].map((sys, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{sys.service}</p>
                <p className="text-muted-foreground font-mono text-[11px] mt-0.5">{sys.endpoint}</p>
              </div>
              <VFBadge variant="success">{sys.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = (mod?.submodules || []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Settings className="h-3.5 w-3.5" />,
    content,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
