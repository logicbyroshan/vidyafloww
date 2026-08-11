import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFStatCard, VFCard, VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { GraduationCap, CalendarCheck, CircleDollarSign, BookOpen } from 'lucide-react';

export const Route = createFileRoute('/portal')({
  component: PortalPage,
});

function PortalPage() {
  const mod = MODULE_REGISTRY.find((m) => m.id === 'portal');

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Student Profile" value="Aarav Sharma" icon={<GraduationCap className="h-5 w-5" />} description="Class 10-A · Roll No 1001" />
        <VFStatCard title="Term Attendance" value="96.4%" icon={<CalendarCheck className="h-5 w-5" />} trend="up" trendLabel="Optimal Attendance" />
        <VFStatCard title="Fee Payment Status" value="₹ 0 Due" icon={<CircleDollarSign className="h-5 w-5" />} trend="up" trendLabel="Term 2 Fully Paid" />
        <VFStatCard title="Latest Exam GPA" value="9.4 / 10" icon={<BookOpen className="h-5 w-5" />} trend="up" trendLabel="Grade A+ Excellence" />
      </div>

      <VFCard title="Parent & Student 360° Portal Overview">
        <div className="space-y-3 text-xs mt-2">
          {[
            { item: 'Term 2 Final Examination Date Sheet Published', date: 'Aug 10, 2026', type: 'Exam Notice' },
            { item: 'Physics Lab Homework Submission Pending', date: 'Due Tomorrow', type: 'Homework' },
            { item: 'Annual Sports Day Participation Confirmation', date: 'Aug 18, 2026', type: 'Event' },
          ].map((p, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{p.item}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{p.date}</p>
              </div>
              <VFBadge variant="primary">{p.type}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = (mod?.submodules || []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    content,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
