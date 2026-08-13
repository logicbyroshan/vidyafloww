import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFStatCard,
  VFDataTable,
  VFButton,
  VFCard,
  VFInput,
  VFSelect,
  VFTabs,
  VFBadge,
} from '@vidyamaxx/ui';
import {
  Brain,
  Users,
  Clock,
  Heart,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Plus,
  Send,
  Download,
  Lock,
  History,
  BarChart3,
  FileText,
} from 'lucide-react';

export const Route = createFileRoute('/welfare')({
  component: WelfarePage,
});

function WelfarePage() {
  const [activeSubmodule, setActiveSubmodule] = React.useState<string>('dashboard');

  const caseData = [
    { caseNo: 'WEL-2026-012', student: 'Rohan Gupta (Class 10-A)', category: 'Academic Anxiety & Stress', counsellor: 'Dr. Meera Nair (Child Psychologist)', status: 'Active Support', riskLevel: 'Moderate' },
    { caseNo: 'WEL-2026-018', student: 'Aditya Verma (Class 9-B)', category: 'Peer Behaviour & Social Skills', counsellor: 'Mrs. S. Bannerjee', status: 'In Monitoring', riskLevel: 'Low' },
    { caseNo: 'WEL-2026-005', student: 'Priya Sharma (Class 11-Sci)', category: 'Career Guidance & Stream Counseling', counsellor: 'Dr. Meera Nair', status: 'Completed', riskLevel: 'Low' },
  ];

  const caseColumns = [
    { header: 'Case File No', accessorKey: 'caseNo', cell: (r: any) => <span className="font-mono font-bold text-primary">{r.caseNo}</span> },
    { header: 'Student Name', accessorKey: 'student', cell: (r: any) => <span className="font-bold text-foreground">{r.student}</span> },
    { header: 'Support Category', accessorKey: 'category' },
    { header: 'Counsellor In-Charge', accessorKey: 'counsellor' },
    { header: 'Risk Assessment', accessorKey: 'riskLevel', cell: (r: any) => <VFBadge variant={r.riskLevel === 'High' ? 'danger' : r.riskLevel === 'Moderate' ? 'warning' : 'outline'}>{r.riskLevel}</VFBadge> },
    { header: 'Case Status', accessorKey: 'status', cell: (r: any) => <VFBadge variant={r.status === 'Completed' ? 'success' : 'primary'}>{r.status}</VFBadge> },
  ];

  // ----------------------------------------------------
  // SUBMODULE 1 — Counselling Dashboard
  // ----------------------------------------------------
  const dashboardContent = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VFStatCard title="Active Support Cases" value="8 Cases" icon={<Brain className="h-5 w-5 text-primary" />} trend="neutral" trendLabel="Under Active Guidance" />
        <VFStatCard title="Sessions This Month" value="34 Sessions" icon={<Heart className="h-5 w-5 text-rose-500" />} trend="up" trendLabel="1-on-1 Consultations" />
        <VFStatCard title="Confidential Notes" value="100% Encrypted" icon={<Lock className="h-5 w-5 text-amber-500" />} description="Restricted Access" />
        <VFStatCard title="Successful Outcomes" value="94.8%" icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} description="Case Resolution Rate" />
      </div>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 2 — Student Support Cases
  // ----------------------------------------------------
  const casesContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-card border border-border p-3.5 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-foreground">Student Support & Welfare Active Case Files</h3>
          <p className="text-xs text-muted-foreground font-mono">Confidential case file register managed by certified school counsellors.</p>
        </div>
        <VFButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Open Support Case</VFButton>
      </div>
      <VFDataTable columns={caseColumns} data={caseData} filterPlaceholder="Search case file or student..." />
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 3 — Counselling Sessions
  // ----------------------------------------------------
  const sessionsContent = (
    <div className="space-y-4">
      <VFCard title="1-on-1 & Group Counselling Session Appointments">
        <p className="text-xs text-muted-foreground mb-3">Schedule private counselling appointments in the quiet room with session duration logs.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 4 — Behaviour Records
  // ----------------------------------------------------
  const behaviourContent = (
    <div className="space-y-4">
      <VFCard title="Classroom Behaviour & Observational Records">
        <p className="text-xs text-muted-foreground mb-3">Class teacher referral observations regarding concentration, social interaction, and emotional well-being.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 5 — Interventions
  // ----------------------------------------------------
  const interventionsContent = (
    <div className="space-y-4">
      <VFCard title="Academic & Psychological Intervention Programs">
        <p className="text-xs text-muted-foreground mb-3 font-mono">Stress management workshops, exam anxiety coping mechanisms, and peer mentoring.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 6 — Referrals
  // ----------------------------------------------------
  const referralsContent = (
    <div className="space-y-4">
      <VFCard title="Teacher & External Clinical Referral Portal">
        <p className="text-xs text-muted-foreground mb-3">Process teacher referrals or external child guidance clinic recommendations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 7 — Follow-ups
  // ----------------------------------------------------
  const followUpsContent = (
    <div className="space-y-4">
      <VFCard title="Progress Check-In & Follow-up Timeline">
        <p className="text-xs text-muted-foreground mb-3">Bi-weekly follow-up check-ins to monitor student emotional recovery and academic progress.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 8 — Support Plans
  // ----------------------------------------------------
  const supportPlansContent = (
    <div className="space-y-4">
      <VFCard title="Individualized Education & Support Plans (IEP)">
        <p className="text-xs text-muted-foreground mb-3 font-mono font-bold">Tailored accommodation plans for learning difficulties (dyslexia, ADHD support).</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 9 — Parent Communication
  // ----------------------------------------------------
  const parentCommunicationContent = (
    <div className="space-y-4">
      <VFCard title="Sensitive Parent Advisory & Consultation Communication">
        <p className="text-xs text-muted-foreground mb-3">Log confidential parent meetings and home guidance recommendations.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 10 — Confidential Notes
  // ----------------------------------------------------
  const notesContent = (
    <div className="space-y-4">
      <VFCard title="HIPAA / Encrypted Counsellor Private Case Notes">
        <p className="text-xs text-muted-foreground mb-3 font-mono text-rose-500 font-bold">Strictly encrypted private notes accessible exclusively by certified counsellors.</p>
        <VFBadge variant="danger">Restricted Confidential Access</VFBadge>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 11 — Case History
  // ----------------------------------------------------
  const historyContent = (
    <div className="space-y-4">
      <VFCard title="Student Historical Welfare Audit & Case File Archives">
        <p className="text-xs text-muted-foreground mb-3">Archived welfare records maintained throughout the student's tenure.</p>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 12 — Support Reports
  // ----------------------------------------------------
  const reportsContent = (
    <div className="space-y-4">
      <VFCard title="Anonymized Welfare Analytics & Mental Health Reports">
        <p className="text-xs text-muted-foreground mb-3">Export anonymized wellness statistics, common stress factors, and workshop outcome reports.</p>
        <VFButton size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export Anonymized Report (PDF)</VFButton>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // SUBMODULE 13 — Counselling Settings
  // ----------------------------------------------------
  const settingsContent = (
    <div className="space-y-4">
      <VFCard title="Global Welfare System Security & Privacy Parameters">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
          <VFInput label="Case File Number Prefix" defaultValue="WEL-2026-" />
          <VFSelect label="Private Note Encryption Standard" options={[{ label: 'AES-256 Encrypted (Counsellor Key)', value: 'aes256' }, { label: 'Role Restricted Access', value: 'rbac' }]} />
        </div>
      </VFCard>
    </div>
  );

  // ----------------------------------------------------
  // ALL 13 SUBMODULE TABS MAPPED
  // ----------------------------------------------------
  const submoduleTabs = [
    { id: 'dashboard', label: 'Counselling Dashboard', icon: <BarChart3 className="h-3.5 w-3.5" />, content: dashboardContent },
    { id: 'cases', label: 'Student Support Cases', icon: <Brain className="h-3.5 w-3.5" />, content: casesContent },
    { id: 'sessions', label: 'Counselling Sessions', icon: <Clock className="h-3.5 w-3.5" />, content: sessionsContent },
    { id: 'behaviour', label: 'Behaviour Records', icon: <FileText className="h-3.5 w-3.5" />, content: behaviourContent },
    { id: 'interventions', label: 'Interventions', icon: <Heart className="h-3.5 w-3.5" />, content: interventionsContent },
    { id: 'referrals', label: 'Referrals', icon: <Send className="h-3.5 w-3.5" />, content: referralsContent },
    { id: 'follow-ups', label: 'Follow-ups', icon: <CheckCircle2 className="h-3.5 w-3.5" />, content: followUpsContent },
    { id: 'support-plans', label: 'Support Plans', icon: <ShieldCheck className="h-3.5 w-3.5" />, content: supportPlansContent },
    { id: 'parent-communication', label: 'Parent Communication', icon: <Users className="h-3.5 w-3.5" />, content: parentCommunicationContent },
    { id: 'notes', label: 'Confidential Notes', icon: <Lock className="h-3.5 w-3.5 text-rose-500" />, content: notesContent },
    { id: 'history', label: 'Case History', icon: <History className="h-3.5 w-3.5" />, content: historyContent },
    { id: 'reports', label: 'Support Reports', icon: <Download className="h-3.5 w-3.5" />, content: reportsContent },
    { id: 'settings', label: 'Counselling Settings', icon: <SlidersHorizontal className="h-3.5 w-3.5" />, content: settingsContent },
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
