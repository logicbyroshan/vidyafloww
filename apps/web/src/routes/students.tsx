import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VFPageContainer, VFTabs, VFCard, VFBadge, VFButton } from '@vidyamaxx/ui';
import { Users, User, ArrowRight, ShieldCheck, Award, Eye } from 'lucide-react';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState('directory');

  const submoduleTabs = [
    {
      id: 'directory',
      label: 'Student Directory',
      icon: <Users className="h-3.5 w-3.5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Active Student Directory</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Filter by Class, Section, House, Category, or Gender.</p>
            </div>
            <VFButton size="sm">Export Directory</VFButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Aditya Verma', roll: 'Roll No: 101', class: 'Class 9 - Sec A', house: 'Red House' },
              { name: 'Priya Sharma', roll: 'Roll No: 102', class: 'Class 9 - Sec A', house: 'Blue House' },
              { name: 'Rahul Gupta', roll: 'Roll No: 103', class: 'Class 9 - Sec B', house: 'Green House' },
            ].map((s, i) => (
              <VFCard key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">{s.name}</span>
                  <VFBadge variant="outline">{s.house}</VFBadge>
                </div>
                <p className="text-[11px] text-muted-foreground">{s.class} · {s.roll}</p>
                <VFButton size="sm" variant="ghost" className="mt-3 w-full" leftIcon={<Eye className="h-3.5 w-3.5" />}>
                  View Student 360° Profile
                </VFButton>
              </VFCard>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'profile-360',
      label: 'Student 360° Profile',
      icon: <User className="h-3.5 w-3.5" />,
      content: (
        <div className="bg-card border border-border/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/20 text-primary font-black flex items-center justify-center text-lg">
                AV
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Aditya Verma (ADM-2026-001)</h3>
                <p className="text-xs text-muted-foreground">Class 9 - Sec A · Roll No: 101 · House: Red House</p>
              </div>
            </div>
            <VFBadge variant="success">Active Enrolled Student</VFBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
              <span className="text-muted-foreground">Attendance Rate</span>
              <p className="text-base font-bold text-success mt-1">98.2%</p>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
              <span className="text-muted-foreground">Current GPA / Rank</span>
              <p className="text-base font-bold text-primary mt-1">3.92 (Rank 3)</p>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
              <span className="text-muted-foreground">Fee Clearance</span>
              <p className="text-base font-bold text-foreground mt-1">Cleared (Term 1)</p>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
              <span className="text-muted-foreground">Guardian Phone</span>
              <p className="text-base font-bold text-foreground mt-1">+91 98000 00000</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'lifecycle',
      label: 'Lifecycle Pipeline',
      icon: <ArrowRight className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Student Lifecycle Pipeline State Machine">
          <div className="flex items-center justify-between text-xs font-semibold py-4 overflow-x-auto gap-2">
            {['Enquiry', 'Applicant', 'Admitted', 'Active Student', 'Promoted', 'Transferred', 'Alumni'].map((st, i) => (
              <React.Fragment key={st}>
                <div className={`px-3 py-1.5 rounded-lg border text-center whitespace-nowrap ${i === 3 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 border-border'}`}>
                  {st}
                </div>
                {i < 6 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </VFCard>
      ),
    },
    {
      id: 'groups-houses',
      label: 'Groups & Houses',
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="House Allocations & Student Clubs">
          <p className="text-xs text-muted-foreground">Assign students to Red, Blue, Green, Yellow houses, sports squads, and extra-curricular clubs.</p>
        </VFCard>
      ),
    },
    {
      id: 'concessions',
      label: 'Scholarships & Concessions',
      icon: <Award className="h-3.5 w-3.5" />,
      content: (
        <VFCard title="Scholarship Awards & Fee Concession Records">
          <p className="text-xs text-muted-foreground">Manage merit-based scholarships, financial aid concessions, and staff child fee exemptions.</p>
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
