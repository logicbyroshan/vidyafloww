import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard } from '@vidyamaxx/ui';
import { ShieldAlert, MessageCircle, Heart, Users, Trophy, Image, Award, GraduationCap } from 'lucide-react';

export const Route = createFileRoute('/welfare')({
  component: WelfarePage,
});

function WelfarePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('discipline-mgmt');

  const submoduleTabs = [
    {
      id: 'discipline-mgmt',
      label: 'Discipline Management',
      icon: <ShieldAlert className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Discipline Committee & Incident Logging">
          <p className="text-xs text-muted-foreground">Log student disciplinary incidents, record committee actions, issue warning letters, and track behavior improvement.</p>
        </VFCard>
      ),
    },
    {
      id: 'complaints-grievances',
      label: 'Complaints & Grievances',
      icon: <MessageCircle className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Parent & Student Grievance Redressal Desk">
          <p className="text-xs text-muted-foreground">Track parent complaints, canteen/transport grievances, set SLA resolution timers, and assign staff owners.</p>
        </VFCard>
      ),
    },
    {
      id: 'counselling',
      label: 'Counselling & Support',
      icon: <Heart className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Guidance & Psychological Counselling">
          <p className="text-xs text-muted-foreground">Confidential 1-on-1 student counselor appointments, academic stress support, and career guidance sessions.</p>
        </VFCard>
      ),
    },
    {
      id: 'clubs-societies',
      label: 'Clubs & Societies',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="School Clubs & Extra-Curricular Societies">
          <p className="text-xs text-muted-foreground">Robotics Club, Debate Society, Eco Club, Science Club, Drama Society rosters and activity schedules.</p>
        </VFCard>
      ),
    },
    {
      id: 'sports-activities',
      label: 'Sports & Physical Ed',
      icon: <Trophy className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Sports Teams & Annual Athletic Meets">
          <p className="text-xs text-muted-foreground">Football, Basketball, Cricket, Swimming teams, inter-school tournament rosters, and fitness scorecards.</p>
        </VFCard>
      ),
    },
    {
      id: 'events-gallery',
      label: 'Events & Photo Gallery',
      icon: <Image className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="School Event Media & Photo Gallery">
          <p className="text-xs text-muted-foreground">Annual Function photos, Sports Day video highlights, Science Exhibition galleries, and tag events.</p>
        </VFCard>
      ),
    },
    {
      id: 'achievements-awards',
      label: 'Achievements & Awards',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Wall of Fame & Merit Honors">
          <p className="text-xs text-muted-foreground">Record Olympiad rank winners, state sports gold medalists, and national scholarship recipients.</p>
        </VFCard>
      ),
    },
    {
      id: 'alumni-mgmt',
      label: 'Alumni Network',
      icon: <GraduationCap className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Graduated Alumni Registry & Mentorship">
          <p className="text-xs text-muted-foreground">Maintain alumni directory, university progression stats, annual alumni reunions, and student mentorship networks.</p>
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
