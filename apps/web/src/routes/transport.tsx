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
  Navigation,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

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
    hindiName: 'नॉर्थ सेक्टर & मॉडल टाउन',
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
    hindiName: 'सिविल लाइन्स & यूनिवर्सिटी हब',
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
    hindiName: 'ग्रीन पार्क & रिंग रोड एन्क्लेव',
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
    hindiName: 'कैंट रेलवे & डिफेंस एन्क्लेव',
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
    pollutionStatus: 'Valid',
    speedGovernor: 'Active (50 km/h lock)',
    cctvCameras: '4 Online',
    gpsTelemetry: '99.8% Uptime',
  },
  {
    busNo: 'DL-01-TA-4025',
    model: 'Eicher Skyline (50 Seater)',
    fitnessExpiry: '02 Feb 2028',
    insuranceExpiry: '18 Nov 2027',
    pollutionStatus: 'Valid',
    speedGovernor: 'Active (50 km/h lock)',
    cctvCameras: '6 Online',
    gpsTelemetry: '100% Uptime',
  },
  {
    busNo: 'DL-01-TA-4030',
    model: 'Force Traveller (32 Seater)',
    fitnessExpiry: '19 May 2027',
    insuranceExpiry: '10 Oct 2027',
    pollutionStatus: 'Valid',
    speedGovernor: 'Active (50 km/h lock)',
    cctvCameras: '4 Online',
    gpsTelemetry: '99.4% Uptime',
  },
  {
    busNo: 'DL-01-TA-4036',
    model: 'Tata Starbus (42 Seater)',
    fitnessExpiry: '28 Jul 2028',
    insuranceExpiry: '05 Jan 2028',
    pollutionStatus: 'Valid',
    speedGovernor: 'Active (50 km/h lock)',
    cctvCameras: '4 Online',
    gpsTelemetry: '99.9% Uptime',
  },
];

function TransportOverviewPage() {
  const { addNotification } = useGlobalStore();
  const { lang } = useTranslation();
  const isHindi = lang === 'hi';
  const [selectedRoute, setSelectedRoute] = React.useState<BusRouteCard | null>(null);

  const standalonePort = '8010';
  const standaloneUrl = `http://localhost:${standalonePort}`;

  const handleLaunchTransportPortal = (path = '') => {
    const url = `${standaloneUrl}${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    addNotification({
      title: isHindi ? 'ट्रांसपोर्ट पोर्टल ओपन हो रहा है' : 'Opening Transport Portal',
      description: isHindi ? 'पोर्ट 8010 पर लाइव टेलीमैटिक्स पोर्टल पर रिडायरेक्ट किया जा रहा है।' : 'Redirecting to live telematics portal on port 8010.',
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
              {isHindi ? 'ट्रांसपोर्ट फ्लीट & रूट ट्रैकिंग (Transport Fleet)' : 'Transport Fleet & Route Telematics'}
            </h1>
            <VFBadge variant="outline" className="text-[10.5px] font-mono font-bold bg-[#141414] text-muted-foreground">
              Port: {standalonePort}
            </VFBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isHindi
              ? 'लाइव GPS बस टेलीमैटिक्स, स्टूडेंट RFID बोर्डिंग लॉग्स, रूट मैप और ड्राइवर रोस्टर।'
              : 'Live GPS bus telematics, student RFID boarding logs, morning/evening routes & driver dossiers.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => handleLaunchTransportPortal()}
            className="rounded-[4px] gap-1.5 text-xs font-bold h-8 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isHindi ? 'ट्रांसपोर्ट पोर्टल लॉन्च करें' : 'Launch Transport Portal'}</span>
          </VFButton>
        </div>
      </div>

      {/* ── ACTIVE ROUTES GRID ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            {isHindi ? 'एक्टिव बस रूट्स & लाइव टेलीमैटिक्स' : 'Active Bus Routes & Live Telematics'}
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">
            {ACTIVE_ROUTES.length} {isHindi ? 'रूट्स एक्टिव' : 'Routes Active'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {ACTIVE_ROUTES.map((route) => (
            <div
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className="p-3.5 rounded-[4px] border border-border/80 bg-[#121212] hover:bg-[#161616] hover:border-zinc-500/40 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-[3px] bg-[#1a1a1a] border border-border text-[10.5px] font-mono font-bold text-foreground">
                    {route.routeCode}
                  </span>
                  <VFBadge variant={route.status === 'Moving' ? 'success' : 'warning'} className="text-[10px]">
                    {route.status}
                  </VFBadge>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {isHindi ? route.hindiName : route.routeName}
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    {route.busNumber}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/60 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>{isHindi ? 'नेक्स्ट स्टॉप:' : 'Next Stop:'}</span>
                  <span className="text-foreground font-medium truncate max-w-[120px]">{route.nextStop}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isHindi ? 'ऑक्यूपेंसी:' : 'Occupancy:'}</span>
                  <span className="font-mono text-emerald-400 font-bold">{route.occupancy}/{route.capacity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FLEET COMPLIANCE & SAFETY LEDGER ── */}
      <VFCard
        title={
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">
              {isHindi ? 'व्हीकल कंप्लायंस & RTO सेफ्टी लेजर' : 'Vehicle Compliance & RTO Safety Ledger'}
            </span>
            <VFBadge variant="outline" className="text-[10px] font-mono bg-[#161616]">
              AIS-140 GPS Validated
            </VFBadge>
          </div>
        }
        description={
          isHindi
            ? 'स्पीड गवर्नर, पॉल्यूशन सर्टिफिकेट, CCTV और GPS अपटाइम स्टेटस।'
            : 'Speed governor calibration, fitness certificates, insurance renewals, and CCTV health.'
        }
        className="rounded-[4px] border-border/90 bg-[#0d0d0d]"
        headerClassName="py-2.5 px-3.5"
        bodyClassName="p-0"
        actions={
          <button
            onClick={() => handleLaunchTransportPortal('/telematics')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{isHindi ? 'लाइव मैप ट्रैकिंग देखें' : 'Live Fleet Telematics Map'}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 bg-[#121212] text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3.5">{isHindi ? 'बस नंबर' : 'Bus Number'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'मॉडल / कैपेसिटी' : 'Model & Capacity'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'फिटनेस एक्सपायरी' : 'Fitness Expiry'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'स्पीड गवर्नर' : 'Speed Governor'}</th>
                <th className="py-2.5 px-3.5">{isHindi ? 'CCTV स्टेटस' : 'CCTV Status'}</th>
                <th className="py-2.5 px-3.5 text-right">{isHindi ? 'GPS टेलीमैटिक्स' : 'GPS Telemetry'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {VEHICLE_COMPLIANCE.map((v) => (
                <tr key={v.busNo} className="hover:bg-[#141414] transition-colors">
                  <td className="py-2.5 px-3.5 font-mono font-bold text-primary">{v.busNo}</td>
                  <td className="py-2.5 px-3.5 font-medium text-foreground">{v.model}</td>
                  <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{v.fitnessExpiry}</td>
                  <td className="py-2.5 px-3.5 text-muted-foreground">{v.speedGovernor}</td>
                  <td className="py-2.5 px-3.5 font-mono text-emerald-400">{v.cctvCameras}</td>
                  <td className="py-2.5 px-3.5 text-right">
                    <VFBadge variant="success" className="text-[10px] font-mono">
                      {v.gpsTelemetry}
                    </VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VFCard>

      {/* ── ROUTE MODAL ── */}
      {selectedRoute && (
        <VFDialog
          isOpen={Boolean(selectedRoute)}
          onClose={() => setSelectedRoute(null)}
          title={`${selectedRoute.routeCode} — ${isHindi ? selectedRoute.hindiName : selectedRoute.routeName}`}
          description={`${selectedRoute.busNumber} · ${isHindi ? 'ड्राइवर:' : 'Driver:'} ${selectedRoute.driverName}`}
          footerActions={
            <div className="flex items-center justify-end gap-2 w-full">
              <VFButton variant="outline" size="sm" onClick={() => setSelectedRoute(null)}>
                {isHindi ? 'क्लोज़' : 'Close'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={() => {
                  setSelectedRoute(null);
                  handleLaunchTransportPortal(`/live-map/${selectedRoute.id}`);
                }}
                className="font-bold"
                leftIcon={<Navigation className="w-3.5 h-3.5" />}
              >
                {isHindi ? 'लाइव रूट मैप देखें' : 'View Live Route Map'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'ड्राइवर मोबाइल:' : 'Driver Mobile:'}</span>
                <span className="font-mono text-foreground">{selectedRoute.driverPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'मॉर्निंग डिपार्चर:' : 'Morning Departure:'}</span>
                <span className="font-mono text-foreground">{selectedRoute.morningDeparture}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'ऑक्यूपेंसी:' : 'Occupancy:'}</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedRoute.occupancy} of {selectedRoute.capacity} Seats</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isHindi ? 'टेलीमैटिक्स स्पीड:' : 'Telemetry Speed:'}</span>
                <span className="font-mono text-cyan-400 font-bold">{selectedRoute.currentSpeed}</span>
              </div>
            </div>
          </div>
        </VFDialog>
      )}
    </VFPageContainer>
  );
}
