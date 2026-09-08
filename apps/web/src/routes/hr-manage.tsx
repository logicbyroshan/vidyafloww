import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFPageHeader,
  VFButton,
  VFBadge,
  VFCard,
  VFStatCard,
} from '@vidyafloww/ui';
import {
  Users,
  ExternalLink,
  UserCheck,
  ShieldCheck,
  Clock,
  Briefcase,
  Download,
  ArrowRight,
  Truck,
  Building2,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/hr-manage')({
  component: HRManagementOverviewPage,
});

interface DepartmentCard {
  id: string;
  name: string;
  hindiName: string;
  head: string;
  totalStaff: number;
  presentToday: number;
  dutyStatus: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const DEPARTMENTS: DepartmentCard[] = [
  {
    id: 'dept-sec',
    name: 'Security & Campus Safety',
    hindiName: 'सुरक्षा व परिसर सुरक्षा बल',
    head: 'Subedar R.S. Negi (Retd.)',
    totalStaff: 14,
    presentToday: 14,
    dutyStatus: '24/7 Gate & Perimeter Rotation',
    icon: ShieldCheck,
    color: 'from-blue-950/40 to-[#141414]',
  },
  {
    id: 'dept-trans',
    name: 'Fleet Drivers & Conductors',
    hindiName: 'वाहन चालक व सहायक स्टाफ',
    head: 'Sukhwinder Singh',
    totalStaff: 16,
    presentToday: 15,
    dutyStatus: 'All 12 Morning Routes Active',
    icon: Truck,
    color: 'from-amber-950/40 to-[#141414]',
  },
  {
    id: 'dept-hk',
    name: 'Housekeeping & Maintenance',
    hindiName: 'सफाई व परिसर रख-रखाव',
    head: 'Sunita Devi',
    totalStaff: 12,
    presentToday: 11,
    dutyStatus: 'Sanitation Cycle Phase 2 Active',
    icon: Building2,
    color: 'from-emerald-950/40 to-[#141414]',
  },
  {
    id: 'dept-warden',
    name: 'Residential Hostel Wardens',
    hindiName: 'छात्रावास वार्डन व केयरटेकर',
    head: 'R.K. Saxena',
    totalStaff: 6,
    presentToday: 6,
    dutyStatus: 'Blocks A, B, C Staffed',
    icon: Users,
    color: 'from-purple-950/40 to-[#141414]',
  },
  {
    id: 'dept-lab',
    name: 'Lab & IT Support Assistants',
    hindiName: 'प्रयोगशाला व तकनीकी सहायक',
    head: 'Amit Verma',
    totalStaff: 6,
    presentToday: 6,
    dutyStatus: 'Physics, Chem & IT Labs Ready',
    icon: Cpu,
    color: 'from-cyan-950/40 to-[#141414]',
  },
];

const RECENT_PUNCHES = [
  {
    empId: 'EMP-OPS-012',
    name: 'Sukhwinder Singh',
    dept: 'Fleet & Transport',
    role: 'Senior Route Driver',
    gate: 'Main Gate Gatepass #1',
    punchTime: '06:12 AM',
    status: 'On-Time',
  },
  {
    empId: 'EMP-OPS-044',
    name: 'Rameshwar Pal',
    dept: 'Security Force',
    role: 'Perimeter Guard',
    gate: 'Hostel Block A Post',
    punchTime: '06:30 AM',
    status: 'On-Time',
  },
  {
    empId: 'EMP-OPS-028',
    name: 'Sunita Devi',
    dept: 'Housekeeping',
    role: 'Sanitation Supervisor',
    gate: 'Admin Block West',
    punchTime: '06:45 AM',
    status: 'On-Time',
  },
  {
    empId: 'EMP-OPS-051',
    name: 'Kallu Ram',
    dept: 'Maintenance',
    role: 'Electrician & Generator',
    gate: 'Main Gate Gatepass #2',
    punchTime: '07:15 AM',
    status: 'Late (+15m)',
  },
];

function HRManagementOverviewPage() {
  const { addNotification } = useGlobalStore();

  const handleLaunchHRSuite = (path = '') => {
    const url = `https://hr.vidyafloww.com${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: 'Opening Operational HR Suite',
      description: 'Redirecting to dedicated workforce management portal on hr.vidyafloww.com',
      type: 'info',
    });
  };

  return (
    <VFPageContainer className="space-y-4">
      <VFPageHeader
        title="Operational HR & Support Staff"
        description="गैर-शैक्षणिक स्टाफ व मानव संसाधन — Workforce administration for security guards, drivers, wardens, housekeeping & lab assistants"
        actions={
          <div className="flex items-center gap-2">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => {
                addNotification({
                  title: 'Exporting Attendance Muster',
                  description: 'Monthly muster report downloaded successfully.',
                  type: 'success',
                });
              }}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
              Download Muster
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={() => handleLaunchHRSuite()}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <span>Launch Dedicated HR Suite</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </VFButton>
          </div>
        }
      />

      {/* Top Standalone Transition Banner */}
      <div className="p-4 rounded-[4px] border border-primary/30 bg-gradient-to-r from-primary/10 via-[#18181b] to-[#121214] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-[4px] bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">
                Dedicated Operational HR Subsystem Available
              </h2>
              <VFBadge variant="outline" className="text-[10px] font-mono border-primary/40 text-primary">
                hr.vidyafloww.com · Port 8013
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
              360-degree non-teaching personnel dossiers, biometric turnstile syncing, asset issue registers, salary slips, and police verification archives operate on a dedicated HR engine.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="primary"
            size="sm"
            onClick={() => handleLaunchHRSuite()}
            className="rounded-[4px] gap-1.5 font-bold text-xs"
          >
            <span>Open HR Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </VFButton>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <VFStatCard
          title="Total Support Staff"
          value="54 Members"
          description="Across 5 operational wings"
          accentColor="primary"
          icon={<Users className="w-4 h-4 text-primary" />}
        />
        <VFStatCard
          title="Punched In Today"
          value="49 Present"
          trend="up"
          trendLabel="90.7% on-time"
          accentColor="emerald"
          icon={<UserCheck className="w-4 h-4 text-emerald-400" />}
        />
        <VFStatCard
          title="On Approved Leave"
          value="4 Staff"
          description="2 Casual, 1 Med, 1 Annual"
          accentColor="amber"
          icon={<Clock className="w-4 h-4 text-amber-400" />}
        />
        <VFStatCard
          title="Pending Verifications"
          value="1 Pending"
          description="Police clearance doc audit"
          accentColor="rose"
          icon={<ShieldCheck className="w-4 h-4 text-rose-400" />}
        />
      </div>

      {/* Department Workforce Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">
              Departmental Workforce Roster
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              (5 Operational Wings)
            </span>
          </div>

          <button
            onClick={() => handleLaunchHRSuite('/departments')}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>Staff Directory</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {DEPARTMENTS.map((dept) => {
            const DeptIcon = dept.icon;
            const presenceRate = Math.round((dept.presentToday / dept.totalStaff) * 100);

            return (
              <div
                key={dept.id}
                className="p-3.5 rounded-[4px] border border-border bg-[#141414] hover:border-primary/50 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="h-7 w-7 rounded-[3px] bg-[#1c1c1f] border border-border flex items-center justify-center text-primary">
                      <DeptIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {presenceRate}%
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-foreground mt-2 leading-tight">
                    {dept.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {dept.hindiName}
                  </p>

                  <div className="mt-3 p-2 rounded-[3px] bg-[#18181b] border border-border space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Supervisor:</span>
                      <span className="text-foreground font-medium truncate max-w-[100px]">{dept.head}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Present:</span>
                      <strong className="font-mono text-emerald-400">{dept.presentToday} / {dept.totalStaff}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border text-[10px] text-muted-foreground truncate">
                  {dept.dutyStatus}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Biometric Clock Logs Table & Payroll Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Biometric Punch In Feed (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Live Biometric Attendance Feed
            </h3>
            <span className="text-xs text-muted-foreground font-mono">Turnstile Sync Active</span>
          </div>

          <div className="border border-border rounded-[4px] bg-[#141414] overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono bg-[#161616]">
                  <th className="py-2.5 px-3 font-semibold">Staff Code</th>
                  <th className="py-2.5 px-3 font-semibold">Employee Name</th>
                  <th className="py-2.5 px-3 font-semibold">Department & Role</th>
                  <th className="py-2.5 px-3 font-semibold">Punch Gate</th>
                  <th className="py-2.5 px-3 font-semibold">Punch Time</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RECENT_PUNCHES.map((p) => (
                  <tr key={p.empId} className="hover:bg-[#18181b] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                      {p.empId}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-foreground">
                      {p.name}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {p.dept} · <span className="text-foreground">{p.role}</span>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground font-mono">
                      {p.gate}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                      {p.punchTime}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${
                        p.status.includes('On-Time')
                          ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-400'
                          : 'bg-amber-950/70 border border-amber-500/30 text-amber-400'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Payroll & Statutory Compliance Summary (1 Col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              Statutory Payroll Cycle
            </h3>
            <VFBadge variant="outline" className="text-[10px] font-mono">SEP 2026</VFBadge>
          </div>

          <VFCard
            title="September Salary Cycle"
            description="Automated Provident Fund (PF), ESI & TDS deductions"
            className="rounded-[4px] space-y-3"
          >
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Scheduled Disbursal:</span>
                <strong className="text-foreground font-mono">10 Sep 2026</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Operational Payroll:</span>
                <strong className="text-primary font-mono text-sm">₹16,40,000</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">EPF / ESIC Compliance:</span>
                <span className="text-emerald-400 font-semibold">100% Reconciled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bank Direct Transfer:</span>
                <span className="text-foreground font-medium">NEFT / RTGS Batched</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <VFButton
                variant="primary"
                size="sm"
                onClick={() => handleLaunchHRSuite('/payroll')}
                className="w-full rounded-[4px] text-xs font-semibold gap-1.5"
              >
                <span>View Full Payroll Ledger</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </VFButton>
            </div>
          </VFCard>
        </div>
      </div>
    </VFPageContainer>
  );
}

