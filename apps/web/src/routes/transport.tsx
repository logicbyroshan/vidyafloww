import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFStatCard,
  VFButton,
  VFTabs,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Bus,
  CheckCircle2,
  Users,
  Plus,
  ShieldCheck,
  Navigation,
  Phone,
  Search,
} from 'lucide-react';

export const Route = createFileRoute('/transport')({
  component: TransportManagementPage,
});

interface BusRouteItem {
  id: string;
  routeNumber: string;
  busNumber: string;
  name: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  occupancy: number;
  currentSpeed: string;
  status: 'Moving' | 'At Stop' | 'Idle' | 'Maintenance';
  nextStop: string;
}

interface VehicleRecord {
  regNumber: string;
  model: string;
  type: string;
  fitnessExpiry: string;
  insuranceExpiry: string;
  driver: string;
  licenseNumber: string;
  fuelType: string;
}

interface StudentAllocation {
  id: string;
  name: string;
  roll: string;
  classSection: string;
  routeNumber: string;
  stopName: string;
  monthlyFee: string;
  feeStatus: 'Paid' | 'Pending';
  emergencyPhone: string;
}

const INITIAL_ROUTES: BusRouteItem[] = [
  { id: 'R-01', routeNumber: 'Route 1', busNumber: 'DL-01-AB-1024', name: 'Panchsheel & Greater Kailash', driverName: 'Rameshwar Yadav', driverPhone: '+91 98101 22345', capacity: 45, occupancy: 42, currentSpeed: '32 km/h', status: 'Moving', nextStop: 'Stop #6 - GK 2 M Block' },
  { id: 'R-02', routeNumber: 'Route 2', busNumber: 'DL-01-AB-2140', name: 'Anand Vihar & Preet Vihar', driverName: 'Gurpreet Singh', driverPhone: '+91 98112 33456', capacity: 45, occupancy: 44, currentSpeed: '0 km/h', status: 'At Stop', nextStop: 'Stop #8 - Preet Vihar' },
  { id: 'R-03', routeNumber: 'Route 3', busNumber: 'DL-01-AB-3112', name: 'Dwarka Sector 9 & 12', driverName: 'Harish Chandra', driverPhone: '+91 98115 44567', capacity: 40, occupancy: 36, currentSpeed: '28 km/h', status: 'Moving', nextStop: 'Stop #4 - Sector 12 Metro' },
  { id: 'R-04', routeNumber: 'Route 4', busNumber: 'UP-16-CD-4021', name: 'Noida Sector 62 & Indirapuram', driverName: 'Sanjay Rawat', driverPhone: '+91 98109 55678', capacity: 50, occupancy: 48, currentSpeed: '36 km/h', status: 'Moving', nextStop: 'Stop #11 - Shipra Mall' },
  { id: 'R-05', routeNumber: 'Route 5', busNumber: 'HR-26-EE-5090', name: 'Gurugram Nirvana Country', driverName: 'Balwan Sharma', driverPhone: '+91 98118 66789', capacity: 45, occupancy: 41, currentSpeed: '0 km/h', status: 'Idle', nextStop: 'Campus Bus Bay 3' },
];

const VEHICLE_REGISTRY: VehicleRecord[] = [
  { regNumber: 'DL-01-AB-1024', model: 'Tata Starbus 45-Seater', type: 'AC Heavy Bus', fitnessExpiry: '14 Oct 2027', insuranceExpiry: '30 Mar 2027', driver: 'Rameshwar Yadav', licenseNumber: 'DL-0420110098124', fuelType: 'CNG' },
  { regNumber: 'DL-01-AB-2140', model: 'Eicher Skyline Pro 45', type: 'AC Heavy Bus', fitnessExpiry: '22 Nov 2027', insuranceExpiry: '15 Jan 2027', driver: 'Gurpreet Singh', licenseNumber: 'DL-0120080076231', fuelType: 'CNG' },
  { regNumber: 'DL-01-AB-3112', model: 'Ashok Leyland Sunshine 40', type: 'Non-AC Bus', fitnessExpiry: '08 Jan 2028', insuranceExpiry: '18 Jun 2027', driver: 'Harish Chandra', licenseNumber: 'DL-0720140034125', fuelType: 'CNG' },
  { regNumber: 'UP-16-CD-4021', model: 'Tata Starbus Ultra 50', type: 'AC Heavy Bus', fitnessExpiry: '19 May 2027', insuranceExpiry: '12 Sep 2027', driver: 'Sanjay Rawat', licenseNumber: 'UP-1620100098452', fuelType: 'Diesel BS-VI' },
  { regNumber: 'HR-26-EE-5090', model: 'Force Traveller School 26', type: 'Mini Bus', fitnessExpiry: '30 Aug 2027', insuranceExpiry: '14 Nov 2027', driver: 'Balwan Sharma', licenseNumber: 'HR-2620130045129', fuelType: 'Diesel BS-VI' },
];

const STUDENT_ALLOCATIONS: StudentAllocation[] = [
  { id: '1', name: 'Rahul Sharma', roll: 'Roll #42', classSection: 'Class 10-A', routeNumber: 'Route 4', stopName: 'Stop #12 - Sector 62 Roundabout', monthlyFee: '₹4,500', feeStatus: 'Paid', emergencyPhone: '+91 98111 00123' },
  { id: '2', name: 'Priya Verma', roll: 'Roll #18', classSection: 'Class 9-B', routeNumber: 'Route 2', stopName: 'Stop #8 - Preet Vihar Mother Dairy', monthlyFee: '₹4,500', feeStatus: 'Paid', emergencyPhone: '+91 98111 00234' },
  { id: '3', name: 'Aman Sharma', roll: 'Roll #05', classSection: 'Class 3-A', routeNumber: 'Route 4', stopName: 'Stop #12 - Sector 62 Roundabout', monthlyFee: '₹4,500', feeStatus: 'Paid', emergencyPhone: '+91 98111 00123' },
  { id: '4', name: 'Sneha Patel', roll: 'Roll #29', classSection: 'Class 11-Sci', routeNumber: 'Route 1', stopName: 'Stop #5 - Panchsheel Enclave', monthlyFee: '₹5,000', feeStatus: 'Pending', emergencyPhone: '+91 98111 00345' },
  { id: '5', name: 'Karan Malhotra', roll: 'Roll #14', classSection: 'Class 10-B', routeNumber: 'Route 3', stopName: 'Stop #4 - Dwarka Sector 12', monthlyFee: '₹4,500', feeStatus: 'Paid', emergencyPhone: '+91 98111 00456' },
];

function TransportManagementPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'परिवहन प्रबंधन' : 'Transport & Fleet') + ' – VidyaFloww';
  }, [isHindi]);

  const [routes, setRoutes] = React.useState<BusRouteItem[]>(INITIAL_ROUTES);
  const [vehicles] = React.useState<VehicleRecord[]>(VEHICLE_REGISTRY);
  const [students] = React.useState<StudentAllocation[]>(STUDENT_ALLOCATIONS);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = React.useState(false);

  // Form state
  const [newRouteNum, setNewRouteNum] = React.useState('');
  const [newBusNum, setNewBusNum] = React.useState('');
  const [newRouteName, setNewRouteName] = React.useState('');
  const [newDriver, setNewDriver] = React.useState('');
  const [newPhone, setNewPhone] = React.useState('');

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRouteNum.trim() || !newBusNum.trim()) return;

    const newRoute: BusRouteItem = {
      id: `R-${Date.now().toString().slice(-2)}`,
      routeNumber: newRouteNum.trim(),
      busNumber: newBusNum.trim().toUpperCase(),
      name: newRouteName.trim() || 'New Bus Route',
      driverName: newDriver.trim() || 'Assigned Driver',
      driverPhone: newPhone.trim() || '+91 98100 00000',
      capacity: 45,
      occupancy: 0,
      currentSpeed: '0 km/h',
      status: 'Idle',
      nextStop: 'Campus Bus Bay',
    };

    setRoutes([...routes, newRoute]);
    setIsAddRouteModalOpen(false);
    setNewRouteNum('');
    setNewBusNum('');
    setNewRouteName('');
    addNotification({
      title: isHindi ? 'नया बस रूट जोड़ा गया' : 'New Bus Route Added',
      description: `${newRoute.routeNumber} (${newRoute.busNumber}) successfully configured.`,
      type: 'success',
    });
  };

  // ----------------------------------------------------
  // TAB 1: Live Routes & GPS Telematics
  // ----------------------------------------------------
  const routesContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'सक्रिय बस रूट व जीपीएस टेलीमैटिक्स' : 'Live Fleet Telematics & Route Monitoring'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'लाइव गति, अगला स्टॉप और वाहन ऑक्यूपेंसी' : 'Real-time GPS tracking, vehicle speed, occupancy, and driver contact'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <VFBadge variant="success" className="font-mono text-xs">
            {isHindi ? 'सभी 18 बसें सक्रिय' : 'All 18 Units Online'}
          </VFBadge>
        </div>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'रूट नंबर' : 'Route #'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'वाहन नंबर' : 'Bus Reg No'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'रूट का नाम' : 'Route Name'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'चालक व फोन' : 'Driver & Contact'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'क्षमता / छात्र' : 'Occupancy'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'वर्तमान गति' : 'Speed'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'अगला स्टॉप' : 'Next Stop'}</th>
                <th className="py-2.5 px-3 text-right">{t('col.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {routes.map((r) => (
                <tr key={r.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">{r.routeNumber}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-foreground">{r.busNumber}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">{r.name}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">
                    <div className="font-medium text-foreground">{r.driverName}</div>
                    <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                      <Phone className="h-2.5 w-2.5 text-primary" />
                      {r.driverPhone}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-mono font-bold text-foreground">{r.occupancy} / {r.capacity}</div>
                    <div className="w-20 bg-muted h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full ${r.occupancy / r.capacity > 0.9 ? 'bg-rose-500' : 'bg-primary'}`}
                        style={{ width: `${(r.occupancy / r.capacity) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">{r.currentSpeed}</td>
                  <td className="py-2.5 px-3 text-muted-foreground font-medium">{r.nextStop}</td>
                  <td className="py-2.5 px-3 text-right">
                    <VFBadge
                      variant={r.status === 'Moving' ? 'success' : r.status === 'At Stop' ? 'warning' : 'outline'}
                      className="text-[10px]"
                    >
                      {r.status}
                    </VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 2: Vehicle & Driver Registry
  // ----------------------------------------------------
  const vehiclesContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'वाहन व चालक वैधानिक अनुपालन रिकॉर्ड' : 'Fleet Compliance, Pollution & Driver License Register'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'फिटनेस प्रमाणपत्र, बीमा नवीनीकरण व लाइसेंस सत्यापन' : 'Fitness cert validity, commercial insurance, and verified commercial driving licenses'}
          </p>
        </div>
        <VFBadge variant="success" className="font-mono text-xs w-fit">
          100% Verified Compliant
        </VFBadge>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'पंजीकरण नंबर' : 'Vehicle Reg'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'मॉडल व प्रकार' : 'Make & Model'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'ईंधन' : 'Fuel'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'फिटनेस वैधता' : 'Fitness Expiry'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'बीमा वैधता' : 'Insurance Expiry'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'चालक का नाम' : 'Assigned Driver'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'लाइसेंस नंबर' : 'License #'}</th>
                <th className="py-2.5 px-3 text-right">{t('col.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {vehicles.map((v) => (
                <tr key={v.regNumber} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">{v.regNumber}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">
                    <div>{v.model}</div>
                    <div className="text-[10px] text-muted-foreground">{v.type}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">{v.fuelType}</td>
                  <td className="py-2.5 px-3 font-mono text-foreground">{v.fitnessExpiry}</td>
                  <td className="py-2.5 px-3 font-mono text-foreground">{v.insuranceExpiry}</td>
                  <td className="py-2.5 px-3 font-medium text-foreground">{v.driver}</td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">{v.licenseNumber}</td>
                  <td className="py-2.5 px-3 text-right">
                    <VFBadge variant="success" className="text-[10px]">Verified</VFBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 3: Student Commute Allocation
  // ----------------------------------------------------
  const studentsContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'छात्र परिवहन आवंटन व स्टॉप रोस्टर' : 'Student Transport Route & Stop Allocation'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'कक्षावार छात्र, बोर्डिंग स्टॉप और मासिक परिवहन शुल्क स्थिति' : 'Class-wise student assignments, boarding points, and monthly transport fee dues'}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? 'छात्र या स्टॉप खोजें...' : 'Search student or stop...'}
            className="w-full px-3 py-1.5 pl-8 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
          />
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
        </div>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'छात्र का नाम' : 'Student Name'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'कक्षा / सेक्शन' : 'Grade & Roll'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'आवंटित रूट' : 'Allocated Route'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'बोर्डिंग स्टॉप' : 'Boarding Stop'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'मासिक शुल्क' : 'Monthly Fee'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'शुल्क स्थिति' : 'Fee Status'}</th>
                <th className="py-2.5 px-3 text-right">{isHindi ? 'आपातकालीन फोन' : 'Emergency Contact'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {students
                .filter(
                  (s) =>
                    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.stopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.routeNumber.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((st) => (
                  <tr key={st.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-2.5 px-3 font-bold text-foreground">{st.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      <span className="font-semibold text-foreground">{st.classSection}</span> · {st.roll}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-primary">{st.routeNumber}</td>
                    <td className="py-2.5 px-3 text-foreground font-medium">{st.stopName}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-foreground">{st.monthlyFee}</td>
                    <td className="py-2.5 px-3">
                      <VFBadge variant={st.feeStatus === 'Paid' ? 'success' : 'warning'} className="text-[10px]">
                        {st.feeStatus}
                      </VFBadge>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">{st.emergencyPhone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'routes', label: isHindi ? 'लाइव रूट व जीपीएस' : 'Live Fleet & Routes', icon: <Navigation className="h-4 w-4" />, content: routesContent },
    { id: 'vehicles', label: isHindi ? 'वाहन व चालक रिकॉर्ड' : 'Vehicle & Driver Registry', icon: <ShieldCheck className="h-4 w-4" />, content: vehiclesContent },
    { id: 'students', label: isHindi ? 'छात्र आवंटन' : 'Student Commute Roster', icon: <Users className="h-4 w-4" />, content: studentsContent },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── Header Toolbar ── */}
      <div className="p-3.5 rounded-md bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Bus className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-foreground tracking-tight">
                {isHindi ? 'परिवहन व वाहन प्रबंधन' : 'Transport & Fleet Management'}
              </span>
              <VFBadge variant="success" className="text-[10px] font-bold font-mono">
                {isHindi ? 'जीपीएस लाइव सक्रिय' : 'GPS Telematics Live'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'लाइव बस टेलीमैटिक्स, रूट शेड्यूलिंग, चालक रिकॉर्ड व छात्र परिवहन आवंटन' : 'Real-time bus tracking, route optimization, driver compliance & student commute rosters'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setIsAddRouteModalOpen(true)}
            className="rounded-md font-bold"
          >
            {isHindi ? 'नया रूट जोड़ें' : 'Add Bus Route'}
          </VFButton>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <VFStatCard
          title={isHindi ? 'कुल वाहन बेड़ा' : 'Total Fleet Strength'}
          value="18 Buses"
          icon={<Bus className="h-4.5 w-4.5 text-amber-400" />}
          trend="neutral"
          trendLabel="100% GPS Equipped"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'सक्रिय रूट' : 'Active Bus Routes'}
          value="12 Routes"
          icon={<Navigation className="h-4.5 w-4.5 text-primary" />}
          trend="neutral"
          trendLabel="48 Planned Stops"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'बस उपयोगकर्ता छात्र' : 'Commuting Students'}
          value="642 Students"
          icon={<Users className="h-4.5 w-4.5 text-emerald-400" />}
          trend="up"
          trendLabel="78% Fleet Occupancy"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'समय पर आगमन दर' : 'On-Time Arrival'}
          value="98.6%"
          icon={<CheckCircle2 className="h-4.5 w-4.5 text-purple-400" />}
          trend="up"
          trendLabel="Smooth Traffic Ops"
          className="rounded-md"
        />
      </div>

      {/* ── Tabs ── */}
      <VFTabs items={tabs} defaultTabId="routes" variant="top-bar" />

      {/* ── Add Route Dialog ── */}
      <VFDialog
        isOpen={isAddRouteModalOpen}
        onClose={() => setIsAddRouteModalOpen(false)}
        title={isHindi ? 'नया स्कूल बस रूट जोड़ें' : 'Add New School Bus Route'}
        description={isHindi ? 'रूट का नाम, वाहन नंबर व चालक विवरण दर्ज करें' : 'Configure new bus route, vehicle registration, and assigned driver details'}
        className="max-w-md rounded-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsAddRouteModalOpen(false)}
              className="rounded-md"
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={handleAddRoute}
              disabled={!newRouteNum.trim() || !newBusNum.trim()}
              className="rounded-md font-bold"
            >
              {isHindi ? 'रूट सहेजें' : 'Save Route'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleAddRoute} className="space-y-3 text-xs mt-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'रूट संख्या / नाम' : 'Route Identifier'}</label>
              <input
                type="text"
                value={newRouteNum}
                onChange={(e) => setNewRouteNum(e.target.value)}
                placeholder="e.g. Route 6"
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'वाहन पंजीकरण नंबर' : 'Bus Reg Number'}</label>
              <input
                type="text"
                value={newBusNum}
                onChange={(e) => setNewBusNum(e.target.value)}
                placeholder="e.g. DL-01-AB-9922"
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-foreground mb-1">{isHindi ? 'रूट का पूरा विवरण / क्षेत्र' : 'Route Coverage & Sector'}</label>
            <input
              type="text"
              value={newRouteName}
              onChange={(e) => setNewRouteName(e.target.value)}
              placeholder="e.g. Sector 14, Old Faridabad & Badarpur"
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'चालक का नाम' : 'Driver Name'}</label>
              <input
                type="text"
                value={newDriver}
                onChange={(e) => setNewDriver(e.target.value)}
                placeholder="e.g. Surender Pal"
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'मोबाइल नंबर' : 'Driver Phone'}</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="+91 98100 00000"
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
