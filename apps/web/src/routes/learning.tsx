import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFStatCard, VFCard, VFBadge } from '@vidyamaxx/ui';
import { MODULE_REGISTRY } from '@vidyamaxx/constants';
import { MonitorPlay, BookOpen, FileText, Video } from 'lucide-react';

export const Route = createFileRoute('/learning')({
  component: LearningPage,
});

function LearningPage() {
  const mod = MODULE_REGISTRY.find((m) => m.id === 'learning');

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Assignments" value="24 Assigned" icon={<FileText className="h-5 w-5" />} trend="up" trendLabel="94% Submitted" />
        <VFStatCard title="Video Tutorials" value="184 Uploaded" icon={<Video className="h-5 w-5" />} description="Physics, Math, Chemistry" />
        <VFStatCard title="Digital Textbooks" value="48 eBooks" icon={<BookOpen className="h-5 w-5" />} trend="up" trendLabel="NCERT & Reference" />
        <VFStatCard title="Online Live Classes" value="6 Today" icon={<MonitorPlay className="h-5 w-5" />} description="Interactive Zoom/Meet" />
      </div>

      <VFCard title="Class 10 Physics & Mathematics Learning Workspaces">
        <div className="space-y-3 text-xs mt-2">
          {[
            { title: 'Class 10 Physics: Electromagnetism & Motors', author: 'Dr. Suresh Verma', dueDate: 'Due Aug 16, 2026', status: 'Active Assignment' },
            { title: 'Mathematics Chapter 4: Quadratic Equations', author: 'Anita Desai', dueDate: 'Due Aug 18, 2026', status: 'Video Tutorial' },
            { title: 'Chemistry CBSE Sample Paper Discussion', author: 'Rajesh Kumar', dueDate: 'Completed Today', status: 'Recorded Class' },
          ].map((l, i) => (
            <div key={i} className="p-3.5 bg-muted/40 rounded-xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground">{l.title}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{l.author} · {l.dueDate}</p>
              </div>
              <VFBadge variant="primary">{l.status}</VFBadge>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

  const tabs = (mod?.submodules || []).map((sub) => ({
    id: sub.id,
    label: sub.label,
    icon: <MonitorPlay className="h-3.5 w-3.5" />,
    content,
  }));

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="dashboard" variant="top-bar" />
    </VFPageContainer>
  );
}
