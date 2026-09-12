import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFCard,
  VFDialog,
} from '@vidyafloww/ui';
import {
  ExternalLink,
  ShieldCheck,
  Download,
  Truck,
  Building2,
  Cpu,
  Users,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

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
}

const DEPARTMENTS: DepartmentCard[] = [
  {
    id: 'dept-sec',
    name: 'Security & Campus Safety',
    hindiName: 'सिक्योरिटी व कैंपस सेफ्टी टीम',
    head: 'Subedar R.S. Negi (Retd.)',
    totalStaff: 14,
    presentToday: 14,
    dutyStatus: '24/7 Gate & Perimeter Rotation',
    icon: ShieldCheck,
  },
  {
    id: 'dept-trans',
    name: 'Fleet Drivers & Conductors',
    hindiName: 'फ्लीट ड्राइवर्स व कंडक्टर्स',
    head: 'Sukhwinder Singh',
    totalStaff: 16,
    presentToday: 15,
    dutyStatus: 'All 12 Morning Routes Active',
    icon: Truck,
  },
  {
    id: 'dept-hk',
    name: 'Housekeeping & Maintenance',
    hindiName: 'हाउसकीपिंग व मेंटेनेंस टीम',
    head: 'Sunita Devi',
    totalStaff: 12,
    presentToday: 11,
    dutyStatus: 'Sanitation Cycle Phase 2 Active',
    icon: Building2,
  },
  {
    id: 'dept-warden',
    name: 'Residential Hostel Wardens',
    hindiName: 'हॉस्टल वार्डन्स व केयरटेकर',
    head: 'R.K. Saxena',
    totalStaff: 6,
    presentToday: 6,
    dutyStatus: 'Blocks A, B, C Staffed',
    icon: Users,
  },
  {
    id: 'dept-lab',
    name: 'Lab & IT Support Assistants',
    hindiName: 'लैब व IT सपोर्ट असिस्टेंट्स',
    head: 'Amit Verma',
    totalStaff: 6,
    presentToday: 6,
    dutyStatus: 'Physics, Chem & IT Labs Ready',
    icon: Cpu,
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
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';
  const [selectedDept, setSelectedDept] = React.useState<DepartmentCard | null>(null);

  const standalonePort = '8012';
  const standaloneUrl = `http://localhost:${standalonePort}`;

  const handleLaunchHRSuite = (path = '') => {
    const url = `${standaloneUrl}${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: isHindi ? 'एचआर पोर्टल खोला जा रहा है' : 'Opening HR Portal',
      description: isHindi ? 'पोर्ट 8012 पर वर्कफ़ोर्स मैनेजमेंट पोर्टल पर भेजा जा रहा है।' : 'Redirecting to workforce management portal on port 8012.',
      type: 'info',
    });
  };

  return (
    <VFPageContainer className="space-y-4 w-full">
      {/* ── TOP TOOLBAR BAR ── */}
      <div className="p-3 rounded-[4px] bg-[#0d0d0d] border border-border/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
              {isHindi ? 'ऑपरेशनल एचआर व सपोर्ट स्टाफ (Operational HR)' : 'Operational HR & Support Staff'}
            </h1>
            <VFBadge variant="outline" className="text-[10.5px] font-mono font-bold bg-[#141414] text-muted-foreground">
              Port: {standalonePort}
            </VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isHindi
              ? 'सिक्योरिटी गार्ड्स, ड्राइवर्स, वार्डन्स, हाउसकीपिंग व लैब असिस्टेंट्स का वर्कफ़ोर्स मैनेजमेंट।'
              : 'Workforce administration for security guards, drivers, wardens, housekeeping & lab assistants.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="outline"
            size="sm"
            onClick={() => {
              addNotification({
                title: isHindi ? 'मस्टर डाउनलोड हुआ' : 'Muster Downloaded',
                description: isHindi ? 'मंथली अटेंडेंस मस्टर सफलतापूर्वक डाउनलोड किया गया।' : 'Monthly attendance muster downloaded successfully.',
                type: 'success',
              });
            }}
            className="rounded-[4px] gap-1.5 text-xs font-semibold h-8 bg-[#141414] hover:bg-[#1c1c1c] text-foreground border-border"
          >
            <Download className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{isHindi ? 'मस्टर डाउनलोड' : 'Download Muster'}</span>
          </VFButton>
          <VFButton
            size="sm"
            onClick={() => handleLaunchHRSuite()}
            className="rounded-[4px] gap-1.5 text-xs font-bold h-8 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isHindi ? 'एचआर पोर्टल लॉन्च करें' : 'Launch HR Portal'}</span>
          </VFButton>
        </div>
      </div>

      {/* ── DEPARTMENT ROSTER CARDS ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            {isHindi ? 'ऑपरेशनल डिपार्टमेंट्स व शिफ्ट स्टेटस' : 'Operational Departments & Shift Status'}
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">
            5 {isHindi ? 'एक्टिव विंग्स' : 'Active Wings'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.id}
                onClick={() => setSelectedDept(dept)}
                className="p-3.5 rounded-[4px] border border-border/80 bg-[#121212] hover:bg-[#161616] hover:border-zinc-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-8 w-8 rounded-[4px] bg-[#1a1a1a] border border-border flex items-center justify-center shrink-0 text-foreground group-hover:text-primary transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {isHindi ? dept.hindiName : dept.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                          {isHindi ? 'हेड:' : 'Head:'} {dept.head}
                        </p>
                      </div>
                    </div>

                    <VFBadge variant="success" className="text-[10px] font-mono shrink-0">
                      {dept.presentToday}/{dept.totalStaff}
                    </VFBadge>
                  </div>

                  <p className="text-[11px] text-muted-foreground/90 line-clamp-1 pl-10">
                    {dept.dutyStatus}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{isHindi ? 'डिटेल्स देखें' : 'View Details'}</span>
                  <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BIOMETRIC PUNCH LOGS TABLE ── */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isHindi ? 'डेली बायोमेट्रिक अटेंडेंस पंच लॉग्स (Live Attendance)' : 'Today\'s Biometric Attendance Punches'}
            </span>
            <VFBadge variant="outline" className="text-[10px] font-mono bg-[#161616]">
              RFID / Face Sync
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'गेटपास और बायोमेट्रिक टर्मिनल्स से रियल-टाइम एंट्री रिकॉर्ड्स।'
            : 'Real-time entry records from institutional gatepass terminals.'
        }
        className="rounded-[4px] border-border/90 bg-[#0d0d0d]"
        headerClassName="py-2.5 px-3.5"
        bodyClassName="p-0"
        actions={
          <button
            onClick={() => handleLaunchHRSuite('/attendance')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isHindi ? 'फुल अटेंडेंस लेजर देखें' : 'Full Attendance Ledger'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 bg-[#121212] text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3.5">{isHindi ? 'एम्प्लॉई ID' : 'Emp ID'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'स्टाफ नेम' : 'Staff Name'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'डिपार्टमेंट' : 'Department'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'रोल' : 'Role'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'गेट लोकेशन' : 'Gate Location'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'पंच टाइम' : 'Punch Time'}</th>
                <th className="py-2.5 px-3.5 text-right">{isHindi ? 'स्टेटस' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {RECENT_PUNCHES.map((r) => (
                <tr key={r.empId} className="hover:bg-[#141414] transition-colors">
                  <td className="py-2.5 px-3.5 font-mono font-bold text-primary">{r.empId}</td>
                  <td className="py-2.5 px-3.5 font-bold text-foreground">{r.name}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{r.dept}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{r.role}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground font-mono text-[11px]">{r.gate}</td>
                  <td className="py-2.5 px-3.5 font-mono font-semibold text-foreground">{r.punchTime}</td>
                  <td className="py-2.5 px-3.5 text-right">
                    <VFBadge variant={r.status === 'On-Time' ? 'success' : 'warning'} className="text-[10px]">
                      {r.status}
                    </VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* ── DEPARTMENT DETAIL MODAL ── */}
      {selectedDept && (
        <VFDialog
          isOpen={Boolean(selectedDept)}
          onClose={() => setSelectedDept(null)}
          title={isHindi ? selectedDept.hindiName : selectedDept.name}
          description={`${isHindi ? 'डिपार्टमेंट हेड:' : 'Department In-Charge:'} ${selectedDept.head}`}
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton variant="outline" size="sm" onClick={() => setSelectedDept(null)}>
                {isHindi ? 'क्लोज़' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={() => {
                  setSelectedDept(null);
                  handleLaunchHRSuite();
                }}
                className="font-bold"
                leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                {isHindi ? 'HR सूट में मैनेज करें' : 'Manage in HR Suite'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'टोटल स्टाफ मेंबर्स:' : 'Sanctioned Posts:'}</span>
                <span className="font-mono font-bold text-foreground">{selectedDept.totalStaff} Staff Members</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'आज प्रेजेंट ऑन शिफ्ट:' : 'Present on Shift:'}</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedDept.presentToday} Staff</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'ड्यूटी रोटेशन स्टेटस:' : 'Duty Rotation:'}</span>
                <span className="text-foreground">{selectedDept.dutyStatus}</span>
              </div>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
