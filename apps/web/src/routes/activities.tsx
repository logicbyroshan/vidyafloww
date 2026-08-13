import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Trophy,
  Award,
  Users,
  Sparkles,
  SlidersHorizontal,
  Plus,
  Download,
  BarChart3,
  Flag,
  Target,
} from 'lucide-react';

export const Route = createFileRoute('/activities')({
  component: StudentActivitiesPage,
});

function StudentActivitiesPage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const activityData = [
    { code: 'ACT-ROB-01', title: 'Robotics & STEM Innovation Club', category: 'Academic Club', house: 'All Houses', lead: 'Mr. A. Saxena', members: 42, status: 'Active' },
    { code: 'ACT-SPT-04', title: 'Inter-House Basketball Championship', category: 'Sports Tournament', house: 'Red vs Blue vs Green vs Yellow', lead: 'Coach R. Singh', members: 64, status: 'Ongoing' },
    { code: 'ACT-DRM-02', title: 'Annual Inter-School Drama Fest', category: 'Cultural Activity', house: 'Yellow House', lead: 'Mrs. D. Roy', members: 28, status: 'Registration Open' },
  ];

  const activityColumns = [
    { header: 'Activity Code', accessorKey: 'code', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.code}</span> },
    { header: 'Activity / Club Name', accessorKey: 'title', cell: (r: any) => <span className="font-bold text-foreground">{r.title}</span> },
    { header: 'Category', accessorKey: 'category' },
    { header: 'House Allocation', accessorKey: 'house', cell: (r: any) => <VFBadge variant="outline">{r.house}</VFBadge> },
    { header: 'Faculty Lead', accessorKey: 'lead' },
    { header: 'Enrolled Members', accessorKey: 'members', cell: (r: any) => `${r.members} Students` },
    { header: 'Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant="success">{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Activities Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Clubs & Academies" value="16 Clubs" icon={<Sparkles className="h-5 w-5 text-primary" />} trend="up" trendLabel="480 Members" />
        <VFStatCard title="House Championship Leader" value="Red House (1,450 Pts)" icon={<Flag className="h-5 w-5 text-rose-500" />} trend="up" trendLabel="+120 Pts This Term" />
        <VFStatCard title="Trophies & Medals Won" value="38 Awards" icon={<Trophy className="h-5 w-5 text-amber-500" />} description="Inter-School Competitions" />
        <VFStatCard title="Student Participation Rate" value="92.4%" icon={<Target className="h-5 w-5 text-emerald-500" />} description="HPC Portfolio Verified" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Clubs
  // ----------------------------------------------------
  const clubsContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Extracurricular Clubs & Hobby Academies Master</h3>
          <p className="text-xs text-muted-foreground font-mono font-bold text-emerald-500">Robotics, Coding, Debate, Dramatics, Music, Fine Arts, and Eco Club.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Create Club</VFButton>
      </div>
      <VFDataTable columns={activityColumns} data={activityData} filterPlaceholder="Search club or activity..." />
    </div>
  );

  // ----------------------------------------------------
  // ALL 15 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Activities Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'clubs', label: 'Clubs', icon: <Sparkles className="h-3.5 w-3.5" />, content: clubsContent },
    { id: 'sports', label: 'Sports', icon: <Trophy className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'competitions', label: 'Competitions', icon: <Award className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'cultural', label: 'Cultural Activities', icon: <Sparkles className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'houses', label: 'School Houses', icon: <Flag className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'teams', label: 'Teams', icon: <Users className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'participation', label: 'Participation', icon: <Target className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'registration', label: 'Activity Registration', icon: <Plus className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'achievements', label: 'Achievements', icon: <Award className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'scoring', label: 'Points & Scoring', icon: <Target className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'certificates', label: 'Certificates', icon: <Award className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'portfolio', label: 'Student Activity Portfolio', icon: <Award className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'reports', label: 'Activity Reports', icon: <Download className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'settings', label: 'Activity Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: dashboardContent },
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
