import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFPageHeader,
  VFButton,
  VFBadge,
  VFCard,
  VFStatCard,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Bus,
  ExternalLink,
  Users,
  ShieldCheck,
  Navigation,
  Phone,
  Clock,
  ArrowRight,
  Radio,
  Send,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/transport')({
  component: TransportOverviewPage,
});

interface BusRouteCard {
  id: string;
  routeCode: string;
  routeName: string;
  hindiName: string;
  busNumber: string;
  capacity: number;
  occupancy: number;
  currentSpeed: string;
  status: 'Moving' | 'At Stop' | 'Idle';
  nextStop: string;
  eta: string;
  driverName: string;
  driverPhone: string;
  morningDeparture: string;
}

const ACTIVE_ROUTES: BusRouteCard[] = [
  {
    id: 'RT-01',
    routeCode: 'Route 01',
    routeName: 'North Sector & Model Town',
    hindiName: 'उत्तरी सेक्टर व मॉडल टाउन',
    busNumber: 'DL-01-TA-4022',
    capacity: 42,
    occupancy: 38,
    currentSpeed: '34 km/h',
    status: 'Moving',
    nextStop: 'Sector 14 Metro Station',
    eta: '4 mins',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91 98111 20111',
    morningDeparture: '06:45 AM',
  },
  {
    id: 'RT-02',
    routeCode: 'Route 02',
    routeName: 'Civil Lines & University Hub',
    hindiName: 'सिविल लाइन्स व यूनिवर्सिटी हब',
    busNumber: 'DL-01-TA-4025',
    capacity: 50,
    occupancy: 46,
    currentSpeed: '0 km/h',
    status: 'At Stop',
    nextStop: 'Civil Lines Gate #2',
    eta: 'Boarding Now',
    driverName: 'Sukhwinder Singh',
    driverPhone: '+91 98111 20222',
    morningDeparture: '06:30 AM',
  },
  {
    id: 'RT-03',
    routeCode: 'Route 03',
    routeName: 'Green Park & Ring Road Enclave',
    hindiName: 'ग्रीन पार्क व रिंग रोड एन्क्लेव',
    busNumber: 'DL-01-TA-4030',
    capacity: 32,
    occupancy: 28,
    currentSpeed: '28 km/h',
    status: 'Moving',
    nextStop: 'Hauz Khas Flyover Junction',
    eta: '6 mins',
    driverName: 'Mohan Lal',
    driverPhone: '+91 98111 20333',
    morningDeparture: '06:50 AM',
  },
  {
    id: 'RT-04',
    routeCode: 'Route 04',
    routeName: 'Cantt Railway & Defence Enclave',
    hindiName: 'कैंट रेलवे व डिफेंस एन्क्लेव',
    busNumber: 'DL-01-TA-4036',
    capacity: 42,
    occupancy: 36,
    currentSpeed: '42 km/h',
    status: 'Moving',
    nextStop: 'Subroto Park Terminal',
    eta: '8 mins',
    driverName: 'Anil Sharma',
    driverPhone: '+91 98111 20444',
    morningDeparture: '06:40 AM',
  },
];

const VEHICLE_COMPLIANCE = [
  {
    busNo: 'DL-01-TA-4022',
    model: 'Tata Starbus (42 Seater)',
    fitnessExpiry: '14 Dec 2027',
    insuranceExpiry: '22 Aug 2027',
    pollutionStatus: 'Valid (Pass)',
    speedGovernor: 'Calibrated (40 km/h)',
    cctvLive: 'Active (4 Cams)',
    status: 'Certified Safe',
  },
  {
    busNo: 'DL-01-TA-4025',
    model: 'Ashok Leyland Oyster (50 Seater)',
    fitnessExpiry: '08 Jan 2028',
    insuranceExpiry: '15 Sep 2027',
    pollutionStatus: 'Valid (Pass)',
    speedGovernor: 'Calibrated (40 km/h)',
    cctvLive: 'Active (4 Cams)',
    status: 'Certified Safe',
  },
  {
    busNo: 'DL-01-TA-4030',
    model: 'Eicher Skyline Pro (32 Seater)',
    fitnessExpiry: '30 Oct 2026',
    insuranceExpiry: '10 Nov 2026',
    pollutionStatus: 'Valid (Pass)',
    speedGovernor: 'Calibrated (40 km/h)',
    cctvLive: 'Active (3 Cams)',
    status: 'Audit Due in 45 Days',
  },
];

function TransportOverviewPage() {
  const { addNotification } = useGlobalStore();
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);
  const [selectedRoute, setSelectedRoute] = React.useState('Route 01');
  const [delayMinutes, setDelayMinutes] = React.useState(10);
  const [delayReason, setDelayReason] = React.useState('Traffic congestion at main bypass');

  const handleLaunchTransportPortal = (path = '') => {
    const url = `https://transport.vidyafloww.com${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: 'Opening Fleet Telemetry Portal',
      description: 'Redirecting to dedicated live GPS tracker on transport.vidyafloww.com',
      type: 'info',
    });
  };

  const handleSendDelayAlert = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title: 'Route Delay Alert Broadcasted',
      description: `SMS notification dispatched to parents of ${selectedRoute} (${delayMinutes} min delay: ${delayReason}).`,
      type: 'warning',
    });
    setIsAlertModalOpen(false);
  };

  return (
    <VFPageContainer className="space-y-4">
      <VFPageHeader
        title="Fleet & School Bus Transport"
        description="वाहन बेड़ा व परिवहन नियंत्रण — Live vehicle GPS telemetry, student route rosters, driver duty compliance & arrival alerts"
        actions={
          <div className="flex items-center gap-2">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsAlertModalOpen(true)}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              Broadcast Delay SMS
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={() => handleLaunchTransportPortal()}
              className="rounded-[4px] gap-1.5 text-xs font-semibold"
            >
              <span>Launch Live Telemetry Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </VFButton>
          </div>
        }
      />

      {/* Top Standalone Transition Banner */}
      <div className="p-4 rounded-[4px] border border-primary/30 bg-gradient-to-r from-primary/10 via-[#18181b] to-[#121214] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-[4px] bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-foreground">
                Dedicated GPS Telemetry Subsystem Available
              </h2>
              <VFBadge variant="outline" className="text-[10px] font-mono border-primary/40 text-primary">
                transport.vidyafloww.com · Port 8012
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
              High-frequency GPS telemetry, live speed monitoring, driver SOS response, and geo-fenced parent notification streams run on a dedicated WebSocket ingestion service.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            variant="primary"
            size="sm"
            onClick={() => handleLaunchTransportPortal()}
            className="rounded-[4px] gap-1.5 font-bold text-xs"
          >
            <span>Open Telemetry Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </VFButton>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <VFStatCard
          title="Active Buses En Route"
          value="12 / 14 Buses"
          trend="up"
          trendLabel="2 in maintenance"
          accentColor="emerald"
          icon={<Bus className="w-4 h-4 text-emerald-400" />}
        />
        <VFStatCard
          title="Students Transported"
          value="528 Students"
          description="Across 12 route zones"
          accentColor="primary"
          icon={<Users className="w-4 h-4 text-primary" />}
        />
        <VFStatCard
          title="On-Time Route Ratio"
          value="98.4%"
          trend="up"
          trendLabel="Avg delay < 3m"
          accentColor="cyan"
          icon={<Clock className="w-4 h-4 text-cyan-400" />}
        />
        <VFStatCard
          title="Safety Compliance"
          value="100% Certified"
          description="Fitness & speed governor ok"
          accentColor="amber"
          icon={<ShieldCheck className="w-4 h-4 text-amber-400" />}
        />
      </div>

      {/* Active Route Telemetry Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-foreground">
              Live Route Telemetry Status
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              (Live GPS Active)
            </span>
          </div>

          <button
            onClick={() => handleLaunchTransportPortal('/map')}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>Open Satellite Map View</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {ACTIVE_ROUTES.map((route) => {
            const occupancyPct = Math.round((route.occupancy / route.capacity) * 100);
            const isMoving = route.status === 'Moving';

            return (
              <div
                key={route.id}
                className="p-3.5 rounded-[4px] border border-border bg-[#141414] hover:border-primary/50 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-primary block">
                        {route.routeCode}
                      </span>
                      <h4 className="font-bold text-xs text-foreground mt-0.5">
                        {route.routeName}
                      </h4>
                      <p className="text-[10px] text-muted-foreground">
                        {route.hindiName}
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${
                      isMoving
                        ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-400'
                        : 'bg-amber-950/70 border border-amber-500/40 text-amber-400'
                    }`}>
                      {route.status}
                    </span>
                  </div>

                  <div className="mt-3 p-2 rounded-[3px] bg-[#18181b] border border-border space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Vehicle:</span>
                      <strong className="font-mono text-foreground">{route.busNumber}</strong>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Live Speed:</span>
                      <strong className="font-mono text-primary">{route.currentSpeed}</strong>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Next Stop:</span>
                      <span className="text-foreground truncate max-w-[140px]">{route.nextStop}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Arrival ETA:</span>
                      <span className="text-emerald-400 font-bold">{route.eta}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Occupancy: <strong>{route.occupancy}</strong>/{route.capacity} ({occupancyPct}%)</span>
                  </div>
                  <div className="w-full h-1 bg-[#202024] rounded-sm overflow-hidden">
                    <div className="h-full bg-primary rounded-sm" style={{ width: `${occupancyPct}%` }} />
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1 truncate">
                      <Navigation className="w-3 h-3 text-primary" />
                      {route.driverName}
                    </span>
                    <a
                      href={`tel:${route.driverPhone}`}
                      className="text-primary hover:underline flex items-center gap-1 font-mono"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fleet Safety & Compliance Table */}
      <VFCard
        title="Fleet Safety, Fitness & Inspection Compliance"
        description="Comprehensive audit of speed limiters, CCTV cameras, fitness certificates and pollution clearances"
        className="rounded-[4px]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono bg-[#161616]">
                <th className="py-2.5 px-3 font-semibold">Bus Reg. No.</th>
                <th className="py-2.5 px-3 font-semibold">Model & Capacity</th>
                <th className="py-2.5 px-3 font-semibold">Fitness Certificate</th>
                <th className="py-2.5 px-3 font-semibold">Insurance Expiry</th>
                <th className="py-2.5 px-3 font-semibold">Pollution (PUC)</th>
                <th className="py-2.5 px-3 font-semibold">Speed Limiter</th>
                <th className="py-2.5 px-3 font-semibold">CCTV Stream</th>
                <th className="py-2.5 px-3 font-semibold">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {VEHICLE_COMPLIANCE.map((v) => (
                <tr key={v.busNo} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                    {v.busNo}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    {v.model}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">
                    {v.fitnessExpiry}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">
                    {v.insuranceExpiry}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-emerald-400 font-semibold">{v.pollutionStatus}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">
                    {v.speedGovernor}
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    {v.cctvLive}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                      <ShieldCheck className="w-3 h-3" />
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* Broadcast Delay Alert Modal */}
      {isAlertModalOpen && (
        <VFDialog
          isOpen={isAlertModalOpen}
          onClose={() => setIsAlertModalOpen(false)}
          title="Broadcast Bus Delay Notice"
          description="Send automated SMS alerts to parents of enrolled students along this route"
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => setIsAlertModalOpen(false)}
                className="rounded-[4px] text-xs"
              >
                Cancel
              </VFButton>
              <VFButton
                variant="primary"
                size="sm"
                onClick={handleSendDelayAlert}
                className="rounded-[4px] text-xs font-semibold gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch SMS Notice
              </VFButton>
            </div>
          }
        >
          <form onSubmit={handleSendDelayAlert} className="space-y-3 py-2 text-xs">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                Affected Bus Route
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                {ACTIVE_ROUTES.map((r) => (
                  <option key={r.routeCode} value={r.routeCode}>
                    {r.routeCode} — {r.routeName} ({r.busNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Expected Delay (Minutes)
                </label>
                <input
                  type="number"
                  min={5}
                  max={60}
                  step={5}
                  value={delayMinutes}
                  onChange={(e) => setDelayMinutes(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Delay Reason
                </label>
                <input
                  type="text"
                  value={delayReason}
                  onChange={(e) => setDelayReason(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-[3px] bg-[#18181b] border border-border text-[11px] text-muted-foreground">
              SMS Preview: <em>"Dear Parent, VidyaFloww School Bus ({selectedRoute}) is running approximately {delayMinutes} minutes behind schedule due to {delayReason}. Live tracking is active."</em>
            </div>
          </form>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}

