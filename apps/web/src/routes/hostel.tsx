import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFPageHeader,
  VFButton,
  VFBadge,
  VFStatCard,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Building2,
  ExternalLink,
  Users,
  Bed,
  Utensils,
  Clock,
  LogOut,
  Plus,
  ArrowRight,
  Coffee,
  Moon,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/hostel')({
  component: HostelOverviewPage,
});

interface OutpassItem {
  id: string;
  name: string;
  room: string;
  purpose: string;
  departure: string;
  expectedReturn: string;
  guardianPhone: string;
  status: 'Approved' | 'Out Campus' | 'Overdue';
}

const ACTIVE_OUTPASSES: OutpassItem[] = [
  {
    id: 'OUT-881',
    name: 'Rahul Sharma',
    room: 'A-101 (Bed 1)',
    purpose: 'Weekend Home Visit',
    departure: 'Friday 05:00 PM',
    expectedReturn: 'Sunday 07:00 PM',
    guardianPhone: '+91 98111 00123',
    status: 'Out Campus',
  },
  {
    id: 'OUT-882',
    name: 'Amit Kumar',
    room: 'A-102 (Bed 1)',
    purpose: 'Inter-School Football Meet',
    departure: 'Saturday 08:30 AM',
    expectedReturn: 'Today 06:00 PM',
    guardianPhone: '+91 98111 00456',
    status: 'Out Campus',
  },
  {
    id: 'OUT-883',
    name: 'Divya Singh',
    room: 'B-202 (Bed 2)',
    purpose: 'Family Function (Out of City)',
    departure: 'Thursday 02:00 PM',
    expectedReturn: 'Monday 08:00 AM',
    guardianPhone: '+91 98111 00678',
    status: 'Out Campus',
  },
  {
    id: 'OUT-884',
    name: 'Aman Sharma',
    room: 'C-301 (Bed 1)',
    purpose: 'Dental Appointment & Checkup',
    departure: 'Today 10:00 AM',
    expectedReturn: 'Today 04:30 PM',
    guardianPhone: '+91 98111 00888',
    status: 'Approved',
  },
];

const TODAY_MEALS = [
  {
    id: 'meal-breakfast',
    type: 'Breakfast',
    time: '07:30 – 09:00 AM',
    items: 'Crispy Masala Dosa with Sambar, Coconut & Tomato Chutney, Boiled Eggs / Fresh Bananas, Filter Coffee & Milk',
    calories: '480 kcal',
    tag: 'High Protein',
    status: 'Completed',
    icon: Coffee,
    color: 'from-amber-950/40 to-[#141414]',
  },
  {
    id: 'meal-lunch',
    type: 'Lunch (Special Feast)',
    time: '12:30 – 02:00 PM',
    items: 'Royal Shahi Paneer, Dal Makhani, Steamed Basmati Rice, Butter Phulkas, Boondi Raita, Gulab Jamun',
    calories: '780 kcal',
    tag: 'Special Menu',
    status: 'Serving Now',
    icon: Utensils,
    color: 'from-emerald-950/40 to-[#141414]',
  },
  {
    id: 'meal-dinner',
    type: 'Dinner',
    time: '08:00 – 09:15 PM',
    items: 'Mumbai Pav Bhaji with Butter Pav, OR Comfort Dal Khichdi Tadka, Mixed Green Salad, Warm Saffron Milk',
    calories: '560 kcal',
    tag: 'Comfort Meal',
    status: 'Scheduled',
    icon: Moon,
    color: 'from-blue-950/40 to-[#141414]',
  },
];

const RESIDENTIAL_BLOCKS = [
  {
    name: 'Block A (Senior Boys Wing)',
    hindiName: 'वरिष्ठ छात्र विंग',
    totalBeds: 80,
    occupiedBeds: 72,
    warden: 'Mr. R.K. Saxena',
    wardenPhone: '+91 98111 00011',
    status: 'All Normal',
    accentColor: 'blue',
  },
  {
    name: 'Block B (Girls Residential Wing)',
    hindiName: 'छात्रा आवासीय विंग',
    totalBeds: 70,
    occupiedBeds: 64,
    warden: 'Mrs. S. Grover',
    wardenPhone: '+91 98111 00022',
    status: 'All Normal',
    accentColor: 'emerald',
  },
  {
    name: 'Block C (Junior Boys Wing)',
    hindiName: 'कनिष्ठ छात्र विंग',
    totalBeds: 60,
    occupiedBeds: 44,
    warden: 'Mr. V.K. Joshi',
    wardenPhone: '+91 98111 00033',
    status: '1 Medical Observation',
    accentColor: 'amber',
  },
];

function HostelOverviewPage() {
  const { addNotification } = useGlobalStore();
  const [isOutpassModalOpen, setIsOutpassModalOpen] = React.useState(false);
  const [studentName, setStudentName] = React.useState('');
  const [roomNumber, setRoomNumber] = React.useState('A-101');
  const [leaveDays, setLeaveDays] = React.useState(2);

  const handleLaunchHostelPortal = (path = '') => {
    const url = `https://hostel.vidyafloww.com${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: 'Opening Hostel Management Portal',
      description: 'Redirecting to dedicated residential portal on hostel.vidyafloww.com',
      type: 'info',
    });
  };

  const handleIssueQuickOutpass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    addNotification({
      title: 'Outpass Issued',
      description: `Gate outpass issued for ${studentName} (${roomNumber}) for ${leaveDays} days.`,
      type: 'success',
    });
    setIsOutpassModalOpen(false);
    setStudentName('');
  };

  return (
    <VFPageContainer className="space-y-4">
      <VFPageHeader
        title="Hostel & Residential Campus"
        description="छात्रावास व आवासीय परिसर — Live room occupancy matrix, daily nutritional mess planning, campus outpasses & night roll calls"
        actions={
          <div className="flex items-center gap-2">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsOutpassModalOpen(true)}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5 text-primary" />
              Issue Outpass
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={() => handleLaunchHostelPortal()}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <span>Launch Dedicated Hostel Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </VFButton>
          </div>
        }
      />

      {/* Top Standalone Transition Banner */}
      <div className="p-4 rounded-[4px] border border-primary/30 bg-gradient-to-r from-primary/10 via-[#18181b] to-[#121214] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-[4px] bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">
                Dedicated Residential Campus Subsystem Available
              </h2>
              <VFBadge variant="outline" className="text-[10px] font-mono border-primary/40 text-primary">
                hostel.vidyafloww.com · Port 8011
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
              Hostel operations are hosted on a dedicated high-availability microservice with biometric gate syncing, 7-day nutritional timetable planners, and 09:30 PM dorm roll calls.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="primary"
            size="sm"
            onClick={() => handleLaunchHostelPortal()}
            className="rounded-[4px] gap-1.5 font-bold text-xs"
          >
            <span>Open Dedicated Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </VFButton>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <VFStatCard
          title="Inside Hostel Campus"
          value="156 Students"
          trend="up"
          trendLabel="86.7% present"
          accentColor="emerald"
          icon={<Users className="w-4 h-4 text-emerald-400" />}
        />
        <VFStatCard
          title="Outside on Outpass"
          value="24 Students"
          description="Verified leaves active"
          accentColor="amber"
          icon={<LogOut className="w-4 h-4 text-amber-400" />}
        />
        <VFStatCard
          title="Bed Occupancy Ratio"
          value="180 / 210"
          trend="up"
          trendLabel="85.7% occupied"
          accentColor="primary"
          icon={<Bed className="w-4 h-4 text-primary" />}
        />
        <VFStatCard
          title="Night Roll Call Readiness"
          value="98.2%"
          description="Roll call at 09:30 PM"
          accentColor="cyan"
          icon={<Clock className="w-4 h-4 text-cyan-400" />}
        />
      </div>

      {/* Today's Nutritional Mess Menu Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">
              Today's Nutritional Mess Menu
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              (Tuesday Feast Roster)
            </span>
          </div>

          <button
            onClick={() => handleLaunchHostelPortal('/mess')}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>Full 7-Day Timetable</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TODAY_MEALS.map((meal) => {
            const MealIcon = meal.icon;
            const isServing = meal.status === 'Serving Now';

            return (
              <div
                key={meal.id}
                className={`p-3.5 rounded-[4px] border ${isServing ? 'border-primary/50 bg-gradient-to-br from-primary/10 via-[#141414] to-[#141414]' : 'border-border bg-[#141414]'} flex flex-col justify-between space-y-3 transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-[3px] bg-[#1c1c1f] border border-border flex items-center justify-center text-foreground">
                        <MealIcon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-foreground leading-tight">
                          {meal.type}
                        </h4>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {meal.time}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${
                      isServing
                        ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 animate-pulse'
                        : meal.status === 'Completed'
                        ? 'bg-[#1e1e22] text-muted-foreground'
                        : 'bg-[#1e1e22] text-amber-400'
                    }`}>
                      {meal.status}
                    </span>
                  </div>

                  <p className="text-xs text-foreground/90 mt-3 leading-relaxed font-medium">
                    {meal.items}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>Approx: <strong>{meal.calories}</strong></span>
                  <span className="text-primary font-semibold">{meal.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Residential Blocks Overview & Outpass Ledger Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Dormitory Blocks Health (1 Col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Residential Dorm Blocks
            </h3>
            <span className="text-xs text-muted-foreground font-mono">3 Wings</span>
          </div>

          <div className="space-y-2.5">
            {RESIDENTIAL_BLOCKS.map((block) => {
              const occupancyPct = Math.round((block.occupiedBeds / block.totalBeds) * 100);

              return (
                <div
                  key={block.name}
                  className="p-3 rounded-[4px] border border-border bg-[#141414] hover:border-primary/40 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-foreground">
                        {block.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground font-medium">
                        {block.hindiName}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-primary">
                      {occupancyPct}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#202024] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-sm transition-all"
                      style={{ width: `${occupancyPct}%` }}
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Occupied: <strong className="text-foreground">{block.occupiedBeds}</strong> / {block.totalBeds} Beds</span>
                    <span>Warden: {block.warden}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Campus Outpasses & Leave Ledger (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <LogOut className="w-4 h-4 text-amber-400" />
              Active Campus Outpasses & Leaves
            </h3>
            <button
              onClick={() => handleLaunchHostelPortal('/leaves')}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Full Ledger</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="border border-border rounded-[4px] bg-[#141414] overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono bg-[#161616]">
                  <th className="py-2.5 px-3 font-semibold">Outpass ID</th>
                  <th className="py-2.5 px-3 font-semibold">Student Name</th>
                  <th className="py-2.5 px-3 font-semibold">Room / Bed</th>
                  <th className="py-2.5 px-3 font-semibold">Purpose</th>
                  <th className="py-2.5 px-3 font-semibold">Departure</th>
                  <th className="py-2.5 px-3 font-semibold">Expected Return</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ACTIVE_OUTPASSES.map((o) => (
                  <tr key={o.id} className="hover:bg-[#18181b] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                      {o.id}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-foreground">
                      {o.name}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground font-mono">
                      {o.room}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {o.purpose}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground font-mono">
                      {o.departure}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground font-mono">
                      {o.expectedReturn}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${
                        o.status === 'Out Campus'
                          ? 'bg-amber-950/70 border border-amber-500/30 text-amber-400'
                          : 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-400'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Issue Quick Outpass Modal */}
      {isOutpassModalOpen && (
        <VFDialog
          isOpen={isOutpassModalOpen}
          onClose={() => setIsOutpassModalOpen(false)}
          title="Issue Quick Campus Outpass"
          description="Grant authorization for student departure with emergency guardian verification"
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setIsOutpassModalOpen(false)}
                className="rounded-[4px] text-xs"
              >
                Cancel
              </VFButton>
              <VFButton
                variant="primary"
                size="sm"
                onClick={handleIssueQuickOutpass}
                className="rounded-[4px] text-xs font-semibold"
              >
                Confirm & Issue Pass
              </VFButton>
            </div>
          }
        >
          <form onSubmit={handleIssueQuickOutpass} className="space-y-3 py-2 text-xs">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Room & Bed
                </label>
                <select
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
                >
                  <option value="A-101">A-101 (Senior Boys)</option>
                  <option value="A-102">A-102 (Senior Boys)</option>
                  <option value="B-201">B-201 (Girls Wing)</option>
                  <option value="B-202">B-202 (Girls Wing)</option>
                  <option value="C-301">C-301 (Junior Boys)</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Leave Duration (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={leaveDays}
                  onChange={(e) => setLeaveDays(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-[3px] bg-[#18181b] border border-border text-[11px] text-muted-foreground space-y-1">
              <p>• Automated SMS will be sent to registered guardian phone on departure.</p>
              <p>• Turnstile gate biometric scanner will allow transit only during designated departure window.</p>
            </div>
          </form>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}

