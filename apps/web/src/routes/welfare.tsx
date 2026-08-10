import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard } from '@vidyamaxx/ui';
import { ShieldAlert, HeartHandshake, Award, Users, Trophy } from 'lucide-react';

export const Route = createFileRoute('/welfare')({
  component: WelfarePage,
});

function WelfarePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('discipline');

  const submoduleTabs = [
    {
      id: 'discipline',
      label: 'Disciplinary Records',
      icon: <ShieldAlert className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Disciplinary Log & Warnings">
          <p className="text-xs text-muted-foreground">Log infractions, record warning notices, track parent notifications, and follow-up reviews.</p>
        </VFCard>
      ),
    },
    {
      id: 'counselling',
      label: 'Counselling Sessions',
      icon: <HeartHandshake className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Counsellor Appointments & Session Notes">
          <p className="text-xs text-muted-foreground">Confidential student counselling logs, wellness check-ins, and follow-up schedules.</p>
        </VFCard>
      ),
    },
    {
      id: 'clubs',
      label: 'Clubs & Extra-Curricular',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Clubs, Societies & Cultural Activities">
          <p className="text-xs text-muted-foreground">Robotics Club, Debate Society, Sports teams, Drama club, and inter-school competitions.</p>
        </VFCard>
      ),
    },
    {
      id: 'achievements',
      label: 'Achievements & Awards',
      icon: <Trophy className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Academic & Sports Honors Hall of Fame">
          <p className="text-xs text-muted-foreground">Olympiad medals, sports trophies, academic distinction awards, and merit certificates.</p>
        </VFCard>
      ),
    },
    {
      id: 'alumni',
      label: 'Alumni Network',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Alumni Network & Graduation Batches">
          <p className="text-xs text-muted-foreground">Batch directories, alumni events, mentoring programs, and institutional donation drives.</p>
        </VFCard>
      ),
    },
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
