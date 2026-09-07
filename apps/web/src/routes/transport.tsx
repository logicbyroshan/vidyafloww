import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFDialog,
} from '@vidyafloww/ui';
import {
  Bus,
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

  const [activeTab, setActiveTab] = React.useState<'routes' | 'vehicles'>('routes');
  const [routes, setRoutes] = React.useState<BusRouteItem[]>(INITIAL_ROUTES);
  const [vehicles] = React.useState<VehicleRecord[]>(VEHICLE_REGISTRY);
  const [students] = React.useState<StudentAllocation[]>(STUDENT_ALLOCATIONS);
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = React.useState(false);
  const [searchStudent, setSearchStudent] = React.useState('');

  // Form State
  const [newRouteNum, setNewRouteNum] = React.useState('Route 6');
  const [newBusNum, setNewBusNum] = React.useState('');
  const [newRouteName, setNewRouteName] = React.useState('');
  const [newDriverName, setNewDriverName] = React.useState('');
  const [newDriverPhone, setNewDriverPhone] = React.useState('');
  const [newCapacity, setNewCapacity] = React.useState('45');

  const handleAddRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRouteName.trim() || !newBusNum.trim()) return;

    const newRoute: BusRouteItem = {
      id: `R-0${routes.length + 1}`,
      routeNumber: newRouteNum,
      busNumber: newBusNum.trim().toUpperCase(),
      name: newRouteName.trim(),
      driverName: newDriverName.trim() || 'Assigned Driver',
      driverPhone: newDriverPhone.trim() || '+91 98000 00000',
      capacity: parseInt(newCapacity, 10) || 45,
      occupancy: 0,
      currentSpeed: '0 km/h',
      status: 'Idle',
      nextStop: 'Campus Bus Bay',
    };

    setRoutes([...routes, newRoute]);
    setIsAddRouteModalOpen(false);
    setNewRouteName('');
    setNewBusNum('');
    setNewDriverName('');
    setNewDriverPhone('');

    addNotification({
      title: isHindi ? 'नया रूट जोड़ा गया' : 'Bus Route Created',
      description: `${newRoute.routeNumber} (${newRoute.name}) registered.`,
      type: 'success',
    });
  };

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── SINGLE UNIFIED HEADER (No Double Header, No Stat Cards) ── */}
      <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: 2 Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70">
            <button
              type="button"
              id="tab-routes"
              onClick={() => setActiveTab('routes')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'routes'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Navigation className="h-3.5 w-3.5" />
              {isHindi ? 'लाइव फ्लीट व रूट्स' : 'Live Fleet & Routes'}
            </button>
            <button
              type="button"
              id="tab-vehicles"
              onClick={() => setActiveTab('vehicles')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'vehicles'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {isHindi ? 'वाहन व छात्र रोस्टर' : 'Vehicles & Commuters'}
            </button>
          </div>

          <div className="h-5 w-[1px] bg-border/80 hidden sm:block" />
          <VFBadge variant="success" className="font-mono text-xs hidden sm:inline-flex">
            {isHindi ? 'GPS लाइव ट्रैकिंग' : 'GPS Telematics Live'}
          </VFBadge>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => setIsAddRouteModalOpen(true)}
            className="h-8 px-3 text-xs font-bold shadow-xs rounded-[4px]"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? '+ नया रूट जोड़ें' : '+ Add Bus Route'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: LIVE FLEET & ROUTES
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'routes' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">{isHindi ? 'रूट सं.' : 'Route'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'रूट विवरण व मार्ग' : 'Route Corridor'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'बस नंबर' : 'Vehicle Reg'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'चालक व संपर्क' : 'Driver & Contact'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'ऑक्यूपेंसी' : 'Capacity'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'गति' : 'Speed'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'आगामी स्टॉप' : 'Next Stop'}</th>
                    <th className="py-2.5 px-3 text-right">{t('col.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {routes.map((rt) => (
                    <tr key={rt.id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-primary">{rt.routeNumber}</td>
                      <td className="py-2.5 px-3 font-bold text-foreground max-w-[200px] truncate">{rt.name}</td>
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">{rt.busNumber}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-foreground">{rt.driverName}</div>
                        <div className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                          <Phone className="h-2.5 w-2.5 text-muted-foreground" />
                          {rt.driverPhone}
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${Math.round((rt.occupancy / rt.capacity) * 100)}%` }}
                            />
                          </div>
                          <span className="font-mono text-muted-foreground text-[10px]">
                            {rt.occupancy}/{rt.capacity}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-foreground">{rt.currentSpeed}</td>
                      <td className="py-2.5 px-3 text-muted-foreground max-w-[150px] truncate">{rt.nextStop}</td>
                      <td className="py-2.5 px-3 text-right">
                        <VFBadge
                          variant={rt.status === 'Moving' ? 'success' : rt.status === 'At Stop' ? 'warning' : 'outline'}
                          className="text-[10px]"
                        >
                          {rt.status}
                        </VFBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 2: VEHICLES & COMMUTERS
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'vehicles' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Vehicles Compliance Section */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3 bg-[#141414] border-b border-border/80 flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                <Bus className="h-4 w-4 text-amber-400" />
                {isHindi ? 'स्कूल वाहन बेड़ा व फिटनेस वैधता' : 'School Vehicle Registry & Fitness Compliance'}
              </h3>
              <VFBadge variant="outline" className="font-mono text-[10px]">
                {vehicles.length} Vehicles Inspected
              </VFBadge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">{isHindi ? 'पंजीकरण संख्या' : 'Reg Number'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'मॉडल व श्रेणी' : 'Make & Model'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'ईंधन प्रकार' : 'Fuel'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'फिटनेस समाप्ति' : 'Fitness Expiry'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'बीमा समाप्ति' : 'Insurance Expiry'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'अधिकृत चालक' : 'Assigned Driver'}</th>
                    <th className="py-2.5 px-3 text-right">{t('col.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {vehicles.map((v) => (
                    <tr key={v.regNumber} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-foreground">{v.regNumber}</td>
                      <td className="py-2.5 px-3 font-medium text-foreground">{v.model}</td>
                      <td className="py-2.5 px-3">
                        <VFBadge variant="outline" className="text-[10px]">{v.fuelType}</VFBadge>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">{v.fitnessExpiry}</td>
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">{v.insuranceExpiry}</td>
                      <td className="py-2.5 px-3 text-muted-foreground font-medium">{v.driver}</td>
                      <td className="py-2.5 px-3 text-right">
                        <VFBadge variant="success" className="text-[10px]">
                          {isHindi ? 'सत्यापित' : 'Compliant'}
                        </VFBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Student Commute Allocations Section */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3 bg-[#141414] border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                {isHindi ? 'छात्र परिवहन रोस्टर व बोर्डिंग स्टॉप' : 'Student Commute Roster & Fee Status'}
              </h3>
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  placeholder={isHindi ? 'छात्र या स्टॉप खोजें...' : 'Filter student or stop...'}
                  className="w-full px-3 py-1 pl-8 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
                />
                <Search className="h-3 w-3 absolute left-2.5 top-2.5 text-muted-foreground" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">{isHindi ? 'छात्र का नाम' : 'Student Name'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'कक्षा / रोल' : 'Class & Roll'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'रूट संख्या' : 'Route'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'बोर्डिंग स्टॉप' : 'Boarding Stop'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'मासिक शुल्क' : 'Monthly Fee'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'स्थिति' : 'Fee Status'}</th>
                    <th className="py-2.5 px-3 text-right">{isHindi ? 'आपातकालीन फोन' : 'Emergency Phone'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {students
                    .filter((s) => s.name.toLowerCase().includes(searchStudent.toLowerCase()) || s.stopName.toLowerCase().includes(searchStudent.toLowerCase()))
                    .map((st) => (
                      <tr key={st.id} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-2.5 px-3 font-bold text-foreground">{st.name}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{st.classSection} · {st.roll}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-primary">{st.routeNumber}</td>
                        <td className="py-2.5 px-3 text-foreground font-medium">{st.stopName}</td>
                        <td className="py-2.5 px-3 font-mono text-foreground font-bold">{st.monthlyFee}</td>
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
      )}

      {/* ── Add Route Dialog ── */}
      <VFDialog
        isOpen={isAddRouteModalOpen}
        onClose={() => setIsAddRouteModalOpen(false)}
        title={isHindi ? 'नया बस रूट जोड़ें' : 'Add New Bus Route'}
        description={isHindi ? 'मार्ग, बस संख्या, क्षमता व चालक विवरण भरें' : 'Register a new institutional corridor and vehicle profile'}
        className="max-w-md rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsAddRouteModalOpen(false)}
              className="rounded-[3px]"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleAddRouteSubmit}
              className="rounded-[3px]"
            >
              {isHindi ? 'रूट सेव करें' : 'Save Route'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleAddRouteSubmit} className="space-y-3 py-1 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'रूट संख्या' : 'Route Identifier'}
              </label>
              <input
                type="text"
                required
                value={newRouteNum}
                onChange={(e) => setNewRouteNum(e.target.value)}
                placeholder="Route 6"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'बस रजिस्ट्रेशन' : 'Bus Reg Number'}
              </label>
              <input
                type="text"
                required
                value={newBusNum}
                onChange={(e) => setNewBusNum(e.target.value)}
                placeholder="DL-01-AB-9921"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'रूट कॉरिडोर व मुख्य स्टॉप्स' : 'Corridor & Key Stops'}
              </label>
              <input
                type="text"
                required
                value={newRouteName}
                onChange={(e) => setNewRouteName(e.target.value)}
                placeholder="e.g. Lajpat Nagar"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'बैठने की क्षमता' : 'Seating Capacity'}
              </label>
              <input
                type="number"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                placeholder="45"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'चालक का नाम' : 'Driver Name'}
              </label>
              <input
                type="text"
                value={newDriverName}
                onChange={(e) => setNewDriverName(e.target.value)}
                placeholder="Mahesh Kumar"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'चालक मोबाइल' : 'Driver Phone'}
              </label>
              <input
                type="text"
                value={newDriverPhone}
                onChange={(e) => setNewDriverPhone(e.target.value)}
                placeholder="+91 98112 00000"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
