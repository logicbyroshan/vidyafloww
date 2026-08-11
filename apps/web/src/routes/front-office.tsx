import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFStatCard, VFCard, VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { UserCheck, PhoneCall, Calendar, MessageSquare } from 'lucide-react';

export const Route = createFileRoute('/front-office')({
  component: FrontOfficePage,
});

function FrontOfficePage() {
  const mod = MODULE_REGISTRY.find((m) => m.id === 'front-office');

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Today's Visitors" value="48 Gate Passes" icon={<UserCheck className="h-5 w-5" />} trend="up" trendLabel="Checked In" />
        <VFStatCard title="Active Enquiries" value="124 Leads" icon={<MessageSquare className="h-5 w-5" />} trend="up" trendLabel="Admission Intake" />
        <VFStatCard title="Scheduled Appointments" value="18 Today" icon={<Calendar className="h-5 w-5" />} description="Principal & HOD Meetings" />
        <VFStatCard title="Phone Logs" value="86 Calls" icon={<PhoneCall className="h-5 w-5" />} trend="up" trendLabel="98% Resolved" />
      </div>

      <VFCard title="Recent Front Desk Visitors & Gate Passes">
        <div className="space-y-3 text-xs mt-2">
          {[
            { visitor: 'Rajesh Sharma', purpose: 'Parent Meeting - Class 10A', passNo: 'VP-2026-084', status: 'Checked In 09:15 AM' },
            { visitor: 'Vikram Merchant (Vendor)', purpose: 'Lab Equipment Delivery', passNo: 'VP-2026-085', status: 'Checked In 10:30 AM' },
            { visitor: 'Anita Desai', purpose: 'Admission Enquiry Class 6', passNo: 'VP-2026-086', status: 'Checked Out 11:45 AM' },
          ].map((v, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{v.visitor} <span className="font-mono text-primary text-[10px]">({v.passNo})</span></p>
                <p className="text-muted-foreground text-xs mt-0.5">{v.purpose}</p>
              </div>
              <VFBadge variant="success">{v.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = (mod?.submodules || []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <UserCheck className="h-3.5 w-3.5" />,
    content,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
