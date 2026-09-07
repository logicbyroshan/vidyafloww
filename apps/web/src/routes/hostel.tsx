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
  Building2,
  Bed,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  Utensils,
  Search,
  LogOut,
} from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelManagementPage,
});

interface RoomBedItem {
  roomNumber: string;
  block: 'Block A (Boys)' | 'Block B (Girls)' | 'Block C (Junior)';
  floor: string;
  type: 'Single AC' | 'Double AC' | 'Quad Non-AC' | 'Triple AC';
  totalBeds: number;
  occupiedBeds: number;
  residents: string[];
  amenities: string;
  status: 'Full' | 'Vacant' | 'Available';
}

interface HostelResident {
  id: string;
  name: string;
  roll: string;
  classSection: string;
  block: string;
  room: string;
  bedNo: string;
  warden: string;
  guardianPhone: string;
  messPlan: string;
}

interface OutpassRecord {
  id: string;
  studentName: string;
  classSection: string;
  room: string;
  purpose: 'Weekend Home Visit' | 'Medical Examination' | 'Coaching / Olympiad' | 'Family Emergency';
  leaveTime: string;
  returnTime: string;
  approvedBy: string;
  gateStatus: 'Approved - Out' | 'Returned' | 'Pending Approval';
}

const INITIAL_ROOMS: RoomBedItem[] = [
  { roomNumber: 'A-101', block: 'Block A (Boys)', floor: '1st Floor', type: 'Double AC', totalBeds: 2, occupiedBeds: 2, residents: ['Rahul Sharma', 'Karan Malhotra'], amenities: 'Attached Bath, Study Desks, AC', status: 'Full' },
  { roomNumber: 'A-102', block: 'Block A (Boys)', floor: '1st Floor', type: 'Double AC', totalBeds: 2, occupiedBeds: 1, residents: ['Amit Kumar'], amenities: 'Attached Bath, Study Desks, AC', status: 'Available' },
  { roomNumber: 'A-103', block: 'Block A (Boys)', floor: '1st Floor', type: 'Single AC', totalBeds: 1, occupiedBeds: 1, residents: ['Rohan Verma'], amenities: 'Single Occupancy, AC, Balcony', status: 'Full' },
  { roomNumber: 'B-201', block: 'Block B (Girls)', floor: '2nd Floor', type: 'Double AC', totalBeds: 2, occupiedBeds: 2, residents: ['Priya Sharma', 'Sneha Patel'], amenities: 'Attached Bath, AC, Wardrobe', status: 'Full' },
  { roomNumber: 'B-202', block: 'Block B (Girls)', floor: '2nd Floor', type: 'Triple AC', totalBeds: 3, occupiedBeds: 2, residents: ['Ananya Roy', 'Divya Singh'], amenities: 'AC, Study Desks, Balcony', status: 'Available' },
  { roomNumber: 'C-301', block: 'Block C (Junior)', floor: '3rd Floor', type: 'Quad Non-AC', totalBeds: 4, occupiedBeds: 4, residents: ['Aman Sharma', 'Vikram Das', 'Sunny Rawat', 'Kunal Sen'], amenities: 'Dormitory Bunk Beds, Lockers', status: 'Full' },
];

const INITIAL_RESIDENTS: HostelResident[] = [
  { id: '1', name: 'Rahul Sharma', roll: 'Roll #42', classSection: 'Class 10-A', block: 'Block A', room: 'A-101', bedNo: 'Bed #1', warden: 'Mr. R. K. Saxena', guardianPhone: '+91 98111 00123', messPlan: 'Standard 4-Meal Plan' },
  { id: '2', name: 'Karan Malhotra', roll: 'Roll #14', classSection: 'Class 10-B', block: 'Block A', room: 'A-101', bedNo: 'Bed #2', warden: 'Mr. R. K. Saxena', guardianPhone: '+91 98111 00456', messPlan: 'Standard 4-Meal Plan' },
  { id: '3', name: 'Priya Sharma', roll: 'Roll #18', classSection: 'Class 9-B', block: 'Block B', room: 'B-201', bedNo: 'Bed #1', warden: 'Mrs. Sunita Grover', guardianPhone: '+91 98111 00234', messPlan: 'Nutritional Diet Plan' },
  { id: '4', name: 'Sneha Patel', roll: 'Roll #29', classSection: 'Class 11-Sci', block: 'Block B', room: 'B-201', bedNo: 'Bed #2', warden: 'Mrs. Sunita Grover', guardianPhone: '+91 98111 00345', messPlan: 'Standard 4-Meal Plan' },
  { id: '5', name: 'Amit Kumar', roll: 'Roll #05', classSection: 'Class 10-A', block: 'Block A', room: 'A-102', bedNo: 'Bed #1', warden: 'Mr. R. K. Saxena', guardianPhone: '+91 98111 00789', messPlan: 'Standard 4-Meal Plan' },
];

const INITIAL_OUTPASSES: OutpassRecord[] = [
  { id: 'OUT-881', studentName: 'Rahul Sharma', classSection: 'Class 10-A', room: 'A-101', purpose: 'Weekend Home Visit', leaveTime: 'Friday, 05:00 PM', returnTime: 'Sunday, 07:00 PM', approvedBy: 'Warden R. K. Saxena', gateStatus: 'Approved - Out' },
  { id: 'OUT-882', studentName: 'Sneha Patel', classSection: 'Class 11-Sci', room: 'B-201', purpose: 'Coaching / Olympiad', leaveTime: 'Saturday, 08:30 AM', returnTime: 'Saturday, 01:30 PM', approvedBy: 'Warden Sunita Grover', gateStatus: 'Returned' },
  { id: 'OUT-883', studentName: 'Karan Malhotra', classSection: 'Class 10-B', room: 'A-101', purpose: 'Medical Examination', leaveTime: 'Today, 02:00 PM', returnTime: 'Today, 06:00 PM', approvedBy: 'Chief Warden', gateStatus: 'Approved - Out' },
];

const MESS_SCHEDULE = [
  { meal: 'Breakfast', time: '07:30 AM – 08:30 AM', items: 'Idli Sambar / Poha, Boiled Eggs / Sprouted Moong, Milk & Tea', tag: 'Nutritious Start' },
  { meal: 'Lunch', time: '12:30 PM – 01:45 PM', items: 'Paneer Butter Masala, Yellow Dal Tadka, Seasonal Veg, Jeera Rice, Phulka, Curd', tag: 'Full Balanced Thali' },
  { meal: 'High Tea', time: '05:00 PM – 05:45 PM', items: 'Vegetable Cutlet / Biscuits, Masala Chai, Seasonal Fresh Fruit', tag: 'Evening Energy' },
  { meal: 'Dinner', time: '08:00 PM – 09:15 PM', items: 'Rajma Masala, Steamed Basmati Rice, Mixed Vegetable, Roti, Gulab Jamun / Kheer', tag: 'Wholesome Dinner' },
];

function HostelManagementPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'छात्रावास प्रबंधन' : 'Hostel & Dormitory') + ' – VidyaFloww';
  }, [isHindi]);

  const [rooms] = React.useState<RoomBedItem[]>(INITIAL_ROOMS);
  const [residents] = React.useState<HostelResident[]>(INITIAL_RESIDENTS);
  const [outpasses, setOutpasses] = React.useState<OutpassRecord[]>(INITIAL_OUTPASSES);
  const [searchResident, setSearchResident] = React.useState('');
  const [isOutpassModalOpen, setIsOutpassModalOpen] = React.useState(false);

  // New Outpass Form
  const [outpassStudent, setOutpassStudent] = React.useState('');
  const [outpassPurpose, setOutpassPurpose] = React.useState<'Weekend Home Visit' | 'Medical Examination' | 'Coaching / Olympiad' | 'Family Emergency'>('Weekend Home Visit');
  const [outpassLeave, setOutpassLeave] = React.useState('Friday, 05:00 PM');
  const [outpassReturn, setOutpassReturn] = React.useState('Sunday, 07:00 PM');

  const handleIssueOutpass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outpassStudent.trim()) return;

    const newTicket: OutpassRecord = {
      id: `OUT-${Math.floor(100 + Math.random() * 900)}`,
      studentName: outpassStudent.trim(),
      classSection: 'Class 10-A',
      room: 'A-101',
      purpose: outpassPurpose,
      leaveTime: outpassLeave,
      returnTime: outpassReturn,
      approvedBy: 'Duty Warden',
      gateStatus: 'Approved - Out',
    };

    setOutpasses([newTicket, ...outpasses]);
    setIsOutpassModalOpen(false);
    setOutpassStudent('');
    addNotification({
      title: isHindi ? 'आउटपास जारी किया गया' : 'Gate Outpass Issued',
      description: `QR Outpass ${newTicket.id} approved for ${newTicket.studentName}.`,
      type: 'success',
    });
  };

  // ----------------------------------------------------
  // TAB 1: Room & Bed Inventory Matrix
  // ----------------------------------------------------
  const roomsContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'कमरा व बेड आवंटन मैट्रिक्स' : 'Dormitory Room & Bed Allocation Matrix'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'ब्लॉक वार कमरा क्षमता, ऑक्यूपेंसी स्थिति व सुविधाएं' : 'Block-wise bed occupancy, resident student rosters, and room facilities'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <VFBadge variant="success" className="text-xs font-mono">
            36 {isHindi ? 'बेड उपलब्ध' : 'Beds Vacant'}
          </VFBadge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {rooms.map((rm) => (
          <div
            key={rm.roomNumber}
            className="p-3.5 rounded-md border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-primary">{rm.roomNumber}</span>
                  <VFBadge variant="outline" className="text-[10px]">{rm.type}</VFBadge>
                </div>
                <VFBadge
                  variant={rm.status === 'Full' ? 'danger' : rm.status === 'Available' ? 'warning' : 'success'}
                  className="text-[10px]"
                >
                  {rm.occupiedBeds} / {rm.totalBeds} Beds
                </VFBadge>
              </div>

              <p className="text-[11px] text-muted-foreground font-semibold">{rm.block} · {rm.floor}</p>

              <div className="mt-2.5 pt-2 border-t border-border/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  {isHindi ? 'आवंटित छात्र' : 'Current Residents'}
                </p>
                <div className="space-y-1">
                  {rm.residents.map((rName, i) => (
                    <div key={i} className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <Bed className="h-3 w-3 text-primary shrink-0" />
                      {rName}
                    </div>
                  ))}
                  {rm.occupiedBeds < rm.totalBeds && (
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Plus className="h-3 w-3 shrink-0" />
                      {rm.totalBeds - rm.occupiedBeds} Vacant Bed Space
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-border/60 text-[10px] text-muted-foreground font-mono truncate">
              {rm.amenities}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 2: Resident Students Directory
  // ----------------------------------------------------
  const residentsContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'छात्रावासी छात्र डायरेक्टरी' : 'Hostel Resident Dossiers & Warden Allocation'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'छात्र विवरण, कमरा संख्या, वार्डन व अभिभावक फोन' : 'Student records, room assignments, assigned wardens, and emergency contacts'}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchResident}
            onChange={(e) => setSearchResident(e.target.value)}
            placeholder={isHindi ? 'छात्र खोजें...' : 'Search student or room...'}
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
                <th className="py-2.5 px-3">{isHindi ? 'छात्र का नाम' : 'Resident Name'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'कक्षा / सेक्शन' : 'Grade & Roll'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'ब्लॉक व कमरा' : 'Block & Room'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'बेड नंबर' : 'Bed #'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'वार्डन इन-चार्ज' : 'Warden In-Charge'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'मेस प्लान' : 'Mess Plan'}</th>
                <th className="py-2.5 px-3 text-right">{isHindi ? 'अभिभावक फोन' : 'Guardian Contact'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {residents
                .filter(
                  (r) =>
                    r.name.toLowerCase().includes(searchResident.toLowerCase()) ||
                    r.room.toLowerCase().includes(searchResident.toLowerCase())
                )
                .map((res) => (
                  <tr key={res.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-2.5 px-3 font-bold text-foreground">{res.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      <span className="font-semibold text-foreground">{res.classSection}</span> · {res.roll}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-primary">{res.block} – {res.room}</td>
                    <td className="py-2.5 px-3 font-mono text-muted-foreground">{res.bedNo}</td>
                    <td className="py-2.5 px-3 text-foreground font-medium">{res.warden}</td>
                    <td className="py-2.5 px-3">
                      <VFBadge variant="outline" className="text-[10px]">{res.messPlan}</VFBadge>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">{res.guardianPhone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // TAB 3: Outpass Register & Night Gate Logs
  // ----------------------------------------------------
  const outpassContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'बायोमेट्रिक गेट आउटपास रजिस्टर' : 'Biometric Gate Outpass & Campus Movement Register'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'वार्डन द्वारा अनुमोदित अवकाश, प्रस्थान व आगमन समय' : 'Warden-authorized student leave passes with QR biometric check-in tracking'}
          </p>
        </div>
        <VFButton
          size="sm"
          leftIcon={<Plus className="h-3.5 w-3.5" />}
          onClick={() => setIsOutpassModalOpen(true)}
          className="rounded-md font-bold"
        >
          {isHindi ? 'नया आउटपास जारी करें' : 'Issue Outpass'}
        </VFButton>
      </div>

      <div className="border border-border/80 rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">{isHindi ? 'पास आईडी' : 'Pass ID'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'छात्र का नाम' : 'Student Name'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'कमरा' : 'Room'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'अवकाश प्रयोजन' : 'Purpose'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'प्रस्थान समय' : 'Departure'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'अपेक्षित वापसी' : 'Expected Return'}</th>
                <th className="py-2.5 px-3">{isHindi ? 'अनुमोदन' : 'Approved By'}</th>
                <th className="py-2.5 px-3 text-right">{t('col.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {outpasses.map((op) => (
                <tr key={op.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">{op.id}</td>
                  <td className="py-2.5 px-3 font-bold text-foreground">
                    <div>{op.studentName}</div>
                    <div className="text-[10px] text-muted-foreground">{op.classSection}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">{op.room}</td>
                  <td className="py-2.5 px-3 font-medium text-foreground">{op.purpose}</td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">{op.leaveTime}</td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground">{op.returnTime}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{op.approvedBy}</td>
                  <td className="py-2.5 px-3 text-right">
                    <VFBadge
                      variant={op.gateStatus === 'Returned' ? 'success' : op.gateStatus === 'Approved - Out' ? 'warning' : 'outline'}
                      className="text-[10px]"
                    >
                      {op.gateStatus}
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
  // TAB 4: Mess & Dining Schedule
  // ----------------------------------------------------
  const messContent = (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#141414] border border-border/80 p-3 rounded-md">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {isHindi ? 'दैनिक छात्रावास मेस व भोजन समय-सारणी' : 'Hostel Dining Hall & Weekly Nutritional Meal Menu'}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 'नाश्ता, दोपहर का भोजन, सायंकालीन अल्पाहार व रात्रि भोज' : 'Balanced diet schedule vetted by the student mess committee with 4.9/5.0 hygiene index'}
          </p>
        </div>
        <VFBadge variant="success" className="font-mono text-xs w-fit">
          FSSAI Hygiene Certified · 4.9 ★
        </VFBadge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {MESS_SCHEDULE.map((m, idx) => (
          <div key={idx} className="p-3.5 rounded-md border border-border/80 bg-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-amber-400" />
                  <span className="font-bold text-foreground text-sm">{m.meal}</span>
                </div>
                <VFBadge variant="outline" className="text-[10px]">{m.tag}</VFBadge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {m.items}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-primary border-t border-border/60 pt-2 mt-3">
              <Clock className="h-3 w-3" />
              {m.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'rooms', label: isHindi ? 'कमरा व बेड मैट्रिक्स' : 'Room & Bed Matrix', icon: <Bed className="h-4 w-4" />, content: roomsContent },
    { id: 'residents', label: isHindi ? 'छात्रावासी छात्र' : 'Residents Directory', icon: <Users className="h-4 w-4" />, content: residentsContent },
    { id: 'outpass', label: isHindi ? 'आउटपास रजिस्टर' : 'Outpass Gate Logs', icon: <LogOut className="h-4 w-4" />, content: outpassContent },
    { id: 'mess', label: isHindi ? 'मेस मेनू' : 'Mess & Dining', icon: <Utensils className="h-4 w-4" />, content: messContent },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ── Header Toolbar ── */}
      <div className="p-3.5 rounded-md bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Building2 className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-foreground tracking-tight">
                {isHindi ? 'छात्रावास प्रबंधन' : 'Hostel & Dormitory Management'}
              </span>
              <VFBadge variant="success" className="text-[10px] font-bold font-mono">
                {isHindi ? 'बायोमेट्रिक गेट सक्रिय' : 'Biometric Gate Sync'}
              </VFBadge>
            </div>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'कमरा व बेड इन्वेंट्री, छात्रावासी रिकॉर्ड, आउटपास अनुमोदन व मेस संचालन' : 'Room & bed allocations, student resident dossiers, outpass gate authorization & dining hall'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setIsOutpassModalOpen(true)}
            className="rounded-md font-bold"
          >
            {isHindi ? 'आउटपास जारी करें' : 'Issue Outpass'}
          </VFButton>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <VFStatCard
          title={isHindi ? 'कुल बेड क्षमता' : 'Total Bed Capacity'}
          value="320 Beds"
          icon={<Bed className="h-4.5 w-4.5 text-emerald-400" />}
          trend="neutral"
          trendLabel="3 Residential Blocks"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'छात्रावासी छात्र' : 'Current Residents'}
          value="284 Students"
          icon={<Users className="h-4.5 w-4.5 text-primary" />}
          trend="up"
          trendLabel="88.8% Occupancy"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'उपलब्ध रिक्त बेड' : 'Vacant Beds'}
          value="36 Beds"
          icon={<CheckCircle2 className="h-4.5 w-4.5 text-purple-400" />}
          trend="neutral"
          trendLabel="Ready for Allocation"
          className="rounded-md"
        />
        <VFStatCard
          title={isHindi ? 'सक्रिय आउटपास' : 'Outpass Approved'}
          value="14 Students"
          icon={<LogOut className="h-4.5 w-4.5 text-amber-400" />}
          trend="neutral"
          trendLabel="Gate Logged Today"
          className="rounded-md"
        />
      </div>

      {/* ── Tabs ── */}
      <VFTabs items={tabs} defaultTabId="rooms" variant="top-bar" />

      {/* ── Issue Outpass Dialog ── */}
      <VFDialog
        isOpen={isOutpassModalOpen}
        onClose={() => setIsOutpassModalOpen(false)}
        title={isHindi ? 'नया छात्र आउटपास जारी करें' : 'Issue Student Gate Outpass'}
        description={isHindi ? 'छात्र, अवकाश प्रयोजन व अपेक्षित वापसी समय चुनें' : 'Authorize temporary campus leave with digital biometric QR gate validation'}
        className="max-w-md rounded-md"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsOutpassModalOpen(false)}
              className="rounded-md"
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              variant="primary"
              size="sm"
              onClick={handleIssueOutpass}
              disabled={!outpassStudent.trim()}
              className="rounded-md font-bold"
            >
              {isHindi ? 'आउटपास जारी करें' : 'Issue Pass'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleIssueOutpass} className="space-y-3 text-xs mt-1">
          <div>
            <label className="block font-bold text-foreground mb-1">{isHindi ? 'छात्र का नाम' : 'Resident Student'}</label>
            <input
              type="text"
              value={outpassStudent}
              onChange={(e) => setOutpassStudent(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-foreground mb-1">{isHindi ? 'अवकाश प्रयोजन' : 'Leave Reason / Purpose'}</label>
            <select
              value={outpassPurpose}
              onChange={(e: any) => setOutpassPurpose(e.target.value)}
              className="w-full px-2.5 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
            >
              <option value="Weekend Home Visit">Weekend Home Visit</option>
              <option value="Medical Examination">Medical Examination / Doctor Visit</option>
              <option value="Coaching / Olympiad">Coaching / Olympiad Center</option>
              <option value="Family Emergency">Family Emergency</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'प्रस्थान समय' : 'Leave Time'}</label>
              <input
                type="text"
                value={outpassLeave}
                onChange={(e) => setOutpassLeave(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-foreground mb-1">{isHindi ? 'वापसी समय' : 'Return Time'}</label>
              <input
                type="text"
                value={outpassReturn}
                onChange={(e) => setOutpassReturn(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
