import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFBadge, VFButton } from '@vidyamaxx/ui';
import { Bus, MapPin, CreditCard, Sparkles, Bot } from 'lucide-react';

export const Route = createFileRoute('/transport')({
  component: TransportPage,
});

function TransportPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('fleet-drivers');

  const submoduleTabs = [
    {
      id: 'fleet-drivers',
      label: 'Vehicles & Drivers',
      icon: <Bus className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="School Bus Fleet & Driver Registry">
          <p className="text-xs text-muted-foreground">Manage bus license numbers, conductor details, insurance certificates, pollution checks, and fuel logs.</p>
        </VFCard>
      ),
    },
    {
      id: 'routes-stops',
      label: 'Routes & Stops',
      icon: <MapPin className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Bus Routes & Designated Pickup Stops">
          <p className="text-xs text-muted-foreground">Define morning and evening route maps, pickup stop timings, and stop-wise fee structures.</p>
        </VFCard>
      ),
    },
    {
      id: 'bus-passes',
      label: 'Bus Passes & Allocations',
      icon: <CreditCard className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Bus Pass Issuance">
          <p className="text-xs text-muted-foreground">Allocate bus seats to students and staff, issue digital QR bus passes, and track transport fee payments.</p>
        </VFCard>
      ),
    },
    {
      id: 'ai-gps-optimizer',
      label: 'Live GPS & AI Route Optimizer',
      icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Bot className="h-5 w-5" />
            <span>VidyaFlow AI Fleet Route & Pickup Time Optimizer</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            AI optimizes bus routes considering student home addresses, bus seating capacity, morning traffic congestion, and shortest travel distance.
          </p>
          <div className="flex gap-2">
            <VFBadge variant="success">Real-Time GPS Sync Active</VFBadge>
            <VFBadge variant="outline">12 Active Buses En Route</VFBadge>
          </div>
          <VFButton size="sm" leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
            Optimize Fleet Routes
          </VFButton>
        </div>
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
