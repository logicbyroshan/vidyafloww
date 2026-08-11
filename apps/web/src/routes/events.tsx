import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFStatCard, VFCard, VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { Sparkles, Calendar, Users, Trophy } from 'lucide-react';

export const Route = createFileRoute('/events')({
  component: EventsPage,
});

function EventsPage() {
  const mod = MODULE_REGISTRY.find((m) => m.id === 'events');

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Upcoming Events" value="12 Scheduled" icon={<Calendar className="h-5 w-5" />} trend="up" trendLabel="Next 30 Days" />
        <VFStatCard title="Total Registrations" value="1,420 Students" icon={<Users className="h-5 w-5" />} trend="up" trendLabel="92% Participation" />
        <VFStatCard title="Clubs & Societies" value="18 Active" icon={<Sparkles className="h-5 w-5" />} description="Cultural & STEM" />
        <VFStatCard title="Trophies & Awards" value="34 Won" icon={<Trophy className="h-5 w-5" />} trend="up" trendLabel="Inter-School Competitions" />
      </div>

      <VFCard title="Annual Sports & Cultural Symposium Schedule">
        <div className="space-y-3 text-xs mt-2">
          {[
            { event: 'Inter-House Annual Sports Meet 2026', date: 'Aug 24, 2026', venue: 'Main Campus Athletics Stadium', status: 'Registrations Open' },
            { event: 'National Science & Robotics Expo', date: 'Sep 10, 2026', venue: 'VidyaMaxx Innovation Lab', status: 'Submissions Open' },
            { event: 'Annual Music & Performing Arts Night', date: 'Oct 05, 2026', venue: 'Main Auditorium', status: 'Planning Phase' },
          ].map((e, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{e.event}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{e.date} · {e.venue}</p>
              </div>
              <VFBadge variant="primary">{e.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = (mod?.submodules || []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <Sparkles className="h-3.5 w-3.5" />,
    content,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
