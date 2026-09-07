import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from '../hooks/useTranslation';
import { useGlobalStore } from '../stores/globalStore';
import {
  VFPageContainer,
  VFButton,
  VFBadge,
  VFDialog,
  VFDrawer,
} from '@vidyafloww/ui';
import {
  Bed,
  Users,
  Plus,
  Utensils,
  Clock,
  LogOut,
  CheckCircle2,
  Phone,
  UserPlus,
  Trash2,
} from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelManagementPage,
});

interface ResidentProfile {
  name: string;
  roll: string;
  classSection: string;
  guardianPhone: string;
  messPlan: string;
  checkInDate: string;
}

interface RoomBedItem {
  roomNumber: string;
  block: 'Block A (Boys)' | 'Block B (Girls)' | 'Block C (Junior)';
  floor: string;
  type: 'Single AC' | 'Double AC' | 'Quad Non-AC' | 'Triple AC';
  totalBeds: number;
  warden: string;
  amenities: string;
  residents: ResidentProfile[];
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
  {
    roomNumber: 'A-101',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    type: 'Double AC',
    totalBeds: 2,
    warden: 'Mr. R. K. Saxena (+91 98110 11223)',
    amenities: 'Attached Bath, AC, Ergonomic Study Desks, Wardrobe',
    residents: [
      { name: 'Rahul Sharma', roll: 'Roll #42', classSection: 'Class 10-A', guardianPhone: '+91 98111 00123', messPlan: 'Standard 4-Meal Plan', checkInDate: '10 Jul 2026' },
      { name: 'Karan Malhotra', roll: 'Roll #14', classSection: 'Class 10-B', guardianPhone: '+91 98111 00456', messPlan: 'Standard 4-Meal Plan', checkInDate: '12 Jul 2026' },
    ],
  },
  {
    roomNumber: 'A-102',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    type: 'Double AC',
    totalBeds: 2,
    warden: 'Mr. R. K. Saxena (+91 98110 11223)',
    amenities: 'Attached Bath, AC, Study Desks, Balcony View',
    residents: [
      { name: 'Amit Kumar', roll: 'Roll #05', classSection: 'Class 10-A', guardianPhone: '+91 98111 00789', messPlan: 'Standard 4-Meal Plan', checkInDate: '15 Jul 2026' },
    ],
  },
  {
    roomNumber: 'A-103',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    type: 'Single AC',
    totalBeds: 1,
    warden: 'Mr. R. K. Saxena (+91 98110 11223)',
    amenities: 'Single Executive Suite, AC, Study Carrel, Balcony',
    residents: [
      { name: 'Rohan Verma', roll: 'Roll #01', classSection: 'Class 12-Sci', guardianPhone: '+91 98111 00999', messPlan: 'Nutritional Diet Plan', checkInDate: '01 Jul 2026' },
    ],
  },
  {
    roomNumber: 'B-201',
    block: 'Block B (Girls)',
    floor: '2nd Floor',
    type: 'Double AC',
    totalBeds: 2,
    warden: 'Mrs. Sunita Grover (+91 98112 44556)',
    amenities: 'Attached Washroom, AC, Dual Desks, Modern Lockers',
    residents: [
      { name: 'Priya Sharma', roll: 'Roll #18', classSection: 'Class 9-B', guardianPhone: '+91 98111 00234', messPlan: 'Nutritional Diet Plan', checkInDate: '08 Jul 2026' },
      { name: 'Sneha Patel', roll: 'Roll #29', classSection: 'Class 11-Sci', guardianPhone: '+91 98111 00345', messPlan: 'Standard 4-Meal Plan', checkInDate: '10 Jul 2026' },
    ],
  },
  {
    roomNumber: 'B-202',
    block: 'Block B (Girls)',
    floor: '2nd Floor',
    type: 'Triple AC',
    totalBeds: 3,
    warden: 'Mrs. Sunita Grover (+91 98112 44556)',
    amenities: 'AC, Study Desks, Balcony, Personal Wardrobes',
    residents: [
      { name: 'Ananya Roy', roll: 'Roll #03', classSection: 'Class 10-A', guardianPhone: '+91 98111 00567', messPlan: 'Standard 4-Meal Plan', checkInDate: '11 Jul 2026' },
      { name: 'Divya Singh', roll: 'Roll #12', classSection: 'Class 10-B', guardianPhone: '+91 98111 00678', messPlan: 'Standard 4-Meal Plan', checkInDate: '14 Jul 2026' },
    ],
  },
  {
    roomNumber: 'C-301',
    block: 'Block C (Junior)',
    floor: '3rd Floor',
    type: 'Quad Non-AC',
    totalBeds: 4,
    warden: 'Mr. Deepak Joshi (+91 98113 77889)',
    amenities: 'Dormitory Bunk Beds, Air Coolers, Lockers, Shared Common Room',
    residents: [
      { name: 'Aman Sharma', roll: 'Roll #05', classSection: 'Class 6-A', guardianPhone: '+91 98111 00123', messPlan: 'Junior Nutrition Plan', checkInDate: '15 Jul 2026' },
      { name: 'Vikram Das', roll: 'Roll #09', classSection: 'Class 6-B', guardianPhone: '+91 98111 00888', messPlan: 'Junior Nutrition Plan', checkInDate: '15 Jul 2026' },
      { name: 'Sunny Rawat', roll: 'Roll #15', classSection: 'Class 7-A', guardianPhone: '+91 98111 00777', messPlan: 'Junior Nutrition Plan', checkInDate: '16 Jul 2026' },
    ],
  },
];

const INITIAL_OUTPASSES: OutpassRecord[] = [
  { id: 'OUT-881', studentName: 'Rahul Sharma', classSection: 'Class 10-A', room: 'A-101', purpose: 'Weekend Home Visit', leaveTime: 'Friday, 05:00 PM', returnTime: 'Sunday, 07:00 PM', approvedBy: 'Warden R. K. Saxena', gateStatus: 'Approved - Out' },
  { id: 'OUT-882', studentName: 'Sneha Patel', classSection: 'Class 11-Sci', room: 'B-201', purpose: 'Coaching / Olympiad', leaveTime: 'Saturday, 08:30 AM', returnTime: 'Saturday, 01:30 PM', approvedBy: 'Warden Sunita Grover', gateStatus: 'Returned' },
  { id: 'OUT-883', studentName: 'Karan Malhotra', classSection: 'Class 10-B', room: 'A-101', purpose: 'Medical Examination', leaveTime: 'Today, 02:00 PM', returnTime: 'Today, 06:00 PM', approvedBy: 'Chief Warden', gateStatus: 'Approved - Out' },
];

const MESS_SCHEDULE = [
  {
    meal: 'Breakfast / अल्पाहार',
    time: '07:30 AM – 08:30 AM',
    items: 'Idli Sambar with Coconut Chutney / Poha, Boiled Eggs or Sprouted Moong, Banana, Fresh Milk, Tea & Coffee',
    tag: 'Nutritious & High Protein',
    chef: 'Chef Ramchandra (South & North Indian Specials)',
  },
  {
    meal: 'Lunch / दोपहर का भोजन',
    time: '12:30 PM – 01:45 PM',
    items: 'Shahi Paneer / Mixed Seasonal Sabzi, Yellow Dal Tadka, Jeera Basmati Rice, Tawa Phulkas with Ghee, Fresh Cucumber Salad, Boondi Raita',
    tag: 'Balanced Full Thali',
    chef: 'Head Chef Khemraj Sharma',
  },
  {
    meal: 'High Tea / सायंकालीन नाश्ता',
    time: '05:00 PM – 05:45 PM',
    items: 'Vegetable Cutlet with Mint Dip / Marie & Glucose Biscuits, Masala Ginger Tea, Seasonal Fresh Guava / Apple',
    tag: 'Evening Study Snack',
    chef: 'Pastry & Tea Section',
  },
  {
    meal: 'Dinner / रात्रि भोज',
    time: '08:00 PM – 09:15 PM',
    items: 'Rajma Masala / Aloo Gobi Matar, Steamed Rice, Butter Rotis, Moong Dal Halwa / Kheer, Roasted Papad',
    tag: 'Wholesome Hot Dinner',
    chef: 'Head Chef Khemraj Sharma',
  },
];

function HostelManagementPage() {
  const { t, lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'छात्रावास प्रबंधन' : 'Hostel & Dormitory') + ' – VidyaFloww';
  }, [isHindi]);

  const [activeTab, setActiveTab] = React.useState<'rooms' | 'mess'>('rooms');
  const [rooms, setRooms] = React.useState<RoomBedItem[]>(INITIAL_ROOMS);
  const [outpasses, setOutpasses] = React.useState<OutpassRecord[]>(INITIAL_OUTPASSES);

  // Drawer state for Room-Wise Beds
  const [selectedRoomNumber, setSelectedRoomNumber] = React.useState<string | null>(null);
  const selectedRoom = rooms.find((r) => r.roomNumber === selectedRoomNumber) || null;

  // Inline Bed Allocation Form in Drawer
  const [allocatingBedIndex, setAllocatingBedIndex] = React.useState<number | null>(null);
  const [newStudentName, setNewStudentName] = React.useState('');
  const [newClassSection, setNewClassSection] = React.useState('Class 10-A');
  const [newGuardianPhone, setNewGuardianPhone] = React.useState('');

  // Outpass Modal
  const [isOutpassModalOpen, setIsOutpassModalOpen] = React.useState(false);
  const [outpassStudent, setOutpassStudent] = React.useState('');
  const [outpassRoom, setOutpassRoom] = React.useState('A-101');
  const [outpassPurpose, setOutpassPurpose] = React.useState<'Weekend Home Visit' | 'Medical Examination' | 'Coaching / Olympiad' | 'Family Emergency'>('Weekend Home Visit');
  const [outpassLeave, setOutpassLeave] = React.useState('Friday, 05:00 PM');
  const [outpassReturn, setOutpassReturn] = React.useState('Sunday, 07:00 PM');

  // Allocate Student to Room
  const handleConfirmBedAllocation = (roomNum: string) => {
    if (!newStudentName.trim()) return;

    setRooms((prev) =>
      prev.map((r) => {
        if (r.roomNumber === roomNum) {
          const newResident: ResidentProfile = {
            name: newStudentName.trim(),
            roll: `Roll #${Math.floor(10 + Math.random() * 80)}`,
            classSection: newClassSection,
            guardianPhone: newGuardianPhone.trim() || '+91 98000 00000',
            messPlan: 'Standard 4-Meal Plan',
            checkInDate: 'Today',
          };
          return {
            ...r,
            residents: [...r.residents, newResident],
          };
        }
        return r;
      })
    );

    addNotification({
      title: isHindi ? 'बेड आवंटित किया गया' : 'Bed Allocated Successfully',
      description: `${newStudentName} assigned to Room ${roomNum}.`,
      type: 'success',
    });

    setAllocatingBedIndex(null);
    setNewStudentName('');
    setNewGuardianPhone('');
  };

  // Vacate Bed
  const handleVacateBed = (roomNum: string, residentIndex: number, studentName: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.roomNumber === roomNum) {
          const updated = [...r.residents];
          updated.splice(residentIndex, 1);
          return { ...r, residents: updated };
        }
        return r;
      })
    );

    addNotification({
      title: isHindi ? 'बेड खाली किया गया' : 'Bed Vacated',
      description: `${studentName} deallocated from Room ${roomNum}. Bed is now vacant.`,
      type: 'info',
    });
  };

  // Issue Outpass
  const handleIssueOutpass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outpassStudent.trim()) return;

    const newTicket: OutpassRecord = {
      id: `OUT-${Math.floor(800 + Math.random() * 200)}`,
      studentName: outpassStudent.trim(),
      classSection: 'Hostel Resident',
      room: outpassRoom,
      purpose: outpassPurpose,
      leaveTime: outpassLeave,
      returnTime: outpassReturn,
      approvedBy: 'Chief Hostel Warden',
      gateStatus: 'Approved - Out',
    };

    setOutpasses([newTicket, ...outpasses]);
    setIsOutpassModalOpen(false);
    setOutpassStudent('');
    addNotification({
      title: isHindi ? 'आउटपास जारी हुआ' : 'Gate Outpass Issued',
      description: `Outpass ${newTicket.id} approved for ${newTicket.studentName}.`,
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
              id="tab-rooms"
              onClick={() => setActiveTab('rooms')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rooms'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bed className="h-3.5 w-3.5" />
              {isHindi ? 'कमरा व बेड मैट्रिक्स' : 'Rooms & Beds'}
            </button>
            <button
              type="button"
              id="tab-mess"
              onClick={() => setActiveTab('mess')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'mess'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Utensils className="h-3.5 w-3.5" />
              {isHindi ? 'मेस, भोजन व आउटपास' : 'Food, Mess & Outpass'}
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            onClick={() => setIsOutpassModalOpen(true)}
            className="h-8 px-3 text-xs font-bold shadow-xs rounded-[4px]"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? '+ नया आउटपास' : '+ Issue Outpass'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: ROOMS & BEDS MATRIX (With Interactive Bed Drawer)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'rooms' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {rooms.map((rm) => {
              const occupied = rm.residents.length;
              const isFull = occupied >= rm.totalBeds;
              const hasVacancy = occupied < rm.totalBeds;

              return (
                <div
                  key={rm.roomNumber}
                  className="p-3 rounded-[4px] border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-primary">{rm.roomNumber}</span>
                        <VFBadge variant="outline" className="text-[10px] rounded-[3px]">{rm.type}</VFBadge>
                      </div>
                      <VFBadge
                        variant={isFull ? 'danger' : hasVacancy ? 'warning' : 'success'}
                        className="text-[10px] rounded-[3px]"
                      >
                        {occupied} / {rm.totalBeds} Beds {isFull ? '(Full)' : `(${rm.totalBeds - occupied} Vacant)`}
                      </VFBadge>
                    </div>

                    <p className="text-[11px] text-muted-foreground font-semibold">{rm.block} · {rm.floor}</p>

                    {/* Beds Representation */}
                    <div className="mt-2.5 pt-2 border-t border-border/60">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        <span>{isHindi ? 'बेड स्थिति' : 'Bed Occupancy'}</span>
                        <span className="font-mono text-foreground font-bold">{occupied}/{rm.totalBeds}</span>
                      </div>

                      <div className="space-y-1.5">
                        {Array.from({ length: rm.totalBeds }).map((_, bIdx) => {
                          const resident = rm.residents[bIdx];
                          return (
                            <div
                              key={bIdx}
                              className={`p-1.5 rounded-[3px] border flex items-center justify-between text-xs ${
                                resident
                                  ? 'bg-[#181818] border-border/70 text-foreground'
                                  : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Bed className={`h-3 w-3 shrink-0 ${resident ? 'text-primary' : 'text-emerald-400'}`} />
                                <span className="font-mono text-[10px] font-bold text-muted-foreground shrink-0">
                                  Bed #{bIdx + 1}:
                                </span>
                                <span className="truncate font-semibold text-xs">
                                  {resident ? resident.name : (isHindi ? 'रिक्त बेड' : 'Vacant Bed Space')}
                                </span>
                              </div>
                              {resident ? (
                                <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                                  {resident.classSection}
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider shrink-0">
                                  {isHindi ? 'उपलब्ध' : 'Free'}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground truncate max-w-[170px]">
                      {rm.amenities}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedRoomNumber(rm.roomNumber)}
                      className="px-2.5 py-1 rounded-[3px] bg-[#1c1c1c] hover:bg-[#252525] border border-border/80 text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{isHindi ? 'बेड देखें / आवंटित' : 'Inspect Beds'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 2: FOOD, MESS & OUTPASS
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'mess' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Mess & Dining Menu Section */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3 bg-[#141414] border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-amber-400" />
                  {isHindi ? 'दैनिक छात्रावास मेस व भोजन समय-सारणी' : 'Daily Mess Dining Schedule & Meal Menu'}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {isHindi ? 'एफएसएसएआई प्रमाणित स्वच्छता रेटिंग (4.9/5.0) व संतुलित पोषण मेनू' : 'FSSAI certified dining facility · Fresh ingredients & student mess committee inspected'}
                </p>
              </div>
              <VFBadge variant="success" className="font-mono text-xs w-fit rounded-[3px]">
                FSSAI Certified · 4.9 ★
              </VFBadge>
            </div>

            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {MESS_SCHEDULE.map((m, idx) => (
                <div key={idx} className="p-3 rounded-[3px] border border-border/80 bg-[#161616] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-3.5 w-3.5 text-amber-400" />
                        <span className="font-bold text-foreground text-xs">{m.meal}</span>
                      </div>
                      <VFBadge variant="outline" className="text-[10px] rounded-[3px]">{m.tag}</VFBadge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {m.items}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] border-t border-border/60 pt-2 mt-3 text-muted-foreground">
                    <span className="truncate">{m.chef}</span>
                    <span className="font-mono text-primary font-bold shrink-0 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outpass Movement Ledger Section */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3 bg-[#141414] border-b border-border/80 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
                  <LogOut className="h-4 w-4 text-primary" />
                  {isHindi ? 'बायोमेट्रिक गेट आउटपास व आवागमन पंजिका' : 'Biometric Gate Outpass & Student Leave Ledger'}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {isHindi ? 'वार्डन अधिकृत अवकाश व क्यूआर कोड स्कैन गेट चेक-इन' : 'Approved student leaves, guardian contact sync & real-time gate departure status'}
                </p>
              </div>
              <VFButton
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs font-bold rounded-[3px]"
                leftIcon={<Plus className="h-3 w-3" />}
                onClick={() => setIsOutpassModalOpen(true)}
              >
                {isHindi ? 'आउटपास जारी करें' : 'Issue Pass'}
              </VFButton>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">{isHindi ? 'पास आईडी' : 'Pass ID'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'छात्र का नाम' : 'Student Name'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'कमरा' : 'Room'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'अवकाश प्रयोजन' : 'Purpose'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'प्रस्थान समय' : 'Departure'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'अपेक्षित वापसी' : 'Return Time'}</th>
                    <th className="py-2.5 px-3">{isHindi ? 'स्वीकृति' : 'Approved By'}</th>
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
                          className="text-[10px] rounded-[3px]"
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
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          ROOM-WISE BED INSPECTION & ALLOCATION SLIDE-OVER DRAWER
          ────────────────────────────────────────────────────────────────────────── */}
      {selectedRoom && (
        <VFDrawer
          isOpen={!!selectedRoom}
          onClose={() => {
            setSelectedRoomNumber(null);
            setAllocatingBedIndex(null);
          }}
          title={`${isHindi ? 'कमरा' : 'Room'} ${selectedRoom.roomNumber} – ${isHindi ? 'बेड व छात्रावासी विवरण' : 'Bed & Resident Inspection'}`}
          description={`${selectedRoom.block} · ${selectedRoom.floor} · ${selectedRoom.type}`}
          className="max-w-lg"
          footerActions={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-mono text-muted-foreground">
                {selectedRoom.residents.length} / {selectedRoom.totalBeds} {isHindi ? 'बेड अधिग्रहीत' : 'Beds Occupied'}
              </span>
              <VFButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedRoomNumber(null);
                  setAllocatingBedIndex(null);
                }}
                className="rounded-[3px]"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </VFButton>
            </div>
          }
        >
          <div className="space-y-4 py-2 text-xs">
            {/* Room Warden and Amenities Card */}
            <div className="p-3 rounded-[4px] bg-[#181818] border border-border/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isHindi ? 'ब्लॉक वार्डन' : 'Block Warden In-Charge'}
                </span>
                <span className="font-semibold text-foreground">{selectedRoom.warden}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isHindi ? 'कमरे की सुविधाएं' : 'Amenities'}
                </span>
                <span className="text-muted-foreground text-[11px]">{selectedRoom.amenities}</span>
              </div>
            </div>

            {/* Bed-by-Bed Layout */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Bed className="h-3.5 w-3.5 text-primary" />
                {isHindi ? 'कमरावार व्यक्तिगत बेड आवंटन' : 'Bed-by-Bed Allocation & Resident Dossier'}
              </h4>

              {Array.from({ length: selectedRoom.totalBeds }).map((_, bedIndex) => {
                const resident = selectedRoom.residents[bedIndex];
                const isFormOpen = allocatingBedIndex === bedIndex;

                return (
                  <div
                    key={bedIndex}
                    className="p-3 rounded-[4px] border border-border/80 bg-[#161616] space-y-2"
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-foreground text-xs">
                          Bed #{bedIndex + 1}
                        </span>
                        <VFBadge
                          variant={resident ? 'primary' : 'success'}
                          className="text-[9px] rounded-[2px]"
                        >
                          {resident ? (isHindi ? 'अधिग्रहीत' : 'Occupied') : (isHindi ? 'रिक्त' : 'Vacant')}
                        </VFBadge>
                      </div>

                      {resident && (
                        <button
                          type="button"
                          onClick={() => handleVacateBed(selectedRoom.roomNumber, bedIndex, resident.name)}
                          className="px-2 py-0.5 rounded-[3px] bg-rose-950/30 hover:bg-rose-900/50 border border-rose-500/40 text-rose-400 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                          <span>{isHindi ? 'बेड खाली करें' : 'Vacate Bed'}</span>
                        </button>
                      )}
                    </div>

                    {resident ? (
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <p className="text-[10px] text-muted-foreground">{isHindi ? 'छात्रावासी छात्र' : 'Student Name'}</p>
                          <p className="font-bold text-foreground">{resident.name}</p>
                          <p className="text-[10px] text-muted-foreground">{resident.classSection} · {resident.roll}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground">{isHindi ? 'अभिभावक संपर्क' : 'Guardian Contact'}</p>
                          <p className="font-mono text-foreground text-[11px] flex items-center gap-1">
                            <Phone className="h-2.5 w-2.5 text-muted-foreground" />
                            {resident.guardianPhone}
                          </p>
                          <p className="text-[10px] text-primary font-medium mt-0.5">{resident.messPlan}</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {!isFormOpen ? (
                          <div className="flex items-center justify-between py-1">
                            <span className="text-[11px] text-emerald-400 font-medium">
                              {isHindi ? 'यह बेड छात्र आवंटन के लिए तैयार है।' : 'Ready for student allocation.'}
                            </span>
                            <VFButton
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-[11px] rounded-[3px] border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/30"
                              leftIcon={<UserPlus className="h-3 w-3" />}
                              onClick={() => {
                                setAllocatingBedIndex(bedIndex);
                                setNewStudentName('');
                              }}
                            >
                              {isHindi ? '+ छात्र आवंटित करें' : '+ Allocate Student'}
                            </VFButton>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-[3px] bg-[#1a1a1a] border border-border/80 space-y-2 mt-1">
                            <p className="font-bold text-foreground text-[11px]">
                              {isHindi ? 'Bed #' + (bedIndex + 1) + ' पर छात्र आवंटन' : `Allocate Student to Bed #${bedIndex + 1}`}
                            </p>
                            <div className="space-y-2">
                              <div>
                                <label className="block text-[10px] text-muted-foreground mb-0.5">
                                  {isHindi ? 'छात्र का नाम' : 'Student Full Name'}
                                </label>
                                <input
                                  type="text"
                                  value={newStudentName}
                                  onChange={(e) => setNewStudentName(e.target.value)}
                                  placeholder="e.g. Aryan Malhotra"
                                  className="w-full px-2.5 py-1 border border-border rounded-[3px] bg-[#141414] text-foreground text-xs focus:outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] text-muted-foreground mb-0.5">
                                    {isHindi ? 'कक्षा' : 'Class'}
                                  </label>
                                  <select
                                    value={newClassSection}
                                    onChange={(e) => setNewClassSection(e.target.value)}
                                    className="w-full px-2 py-1 border border-border rounded-[3px] bg-[#141414] text-foreground text-xs focus:outline-none"
                                  >
                                    <option value="Class 9-A">Class 9-A</option>
                                    <option value="Class 10-A">Class 10-A</option>
                                    <option value="Class 11-Sci">Class 11-Sci</option>
                                    <option value="Class 12-Sci">Class 12-Sci</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-[10px] text-muted-foreground mb-0.5">
                                    {isHindi ? 'अभिभावक फोन' : 'Guardian Phone'}
                                  </label>
                                  <input
                                    type="text"
                                    value={newGuardianPhone}
                                    onChange={(e) => setNewGuardianPhone(e.target.value)}
                                    placeholder="+91 98111 00000"
                                    className="w-full px-2 py-1 border border-border rounded-[3px] bg-[#141414] text-foreground text-xs focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/60">
                              <VFButton
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-[10px] rounded-[2px]"
                                onClick={() => setAllocatingBedIndex(null)}
                              >
                                {isHindi ? 'रद्द करें' : 'Cancel'}
                              </VFButton>
                              <VFButton
                                size="sm"
                                className="h-6 px-2 text-[10px] rounded-[2px] font-bold"
                                onClick={() => handleConfirmBedAllocation(selectedRoom.roomNumber)}
                              >
                                {isHindi ? 'आवंटन सेव करें' : 'Confirm Allocation'}
                              </VFButton>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Room Hygiene & Facilities Checklist */}
            <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 space-y-1.5">
              <h5 className="text-[11px] font-bold text-foreground">
                {isHindi ? 'कमरा निरीक्षण व सुविधा ऑडिट' : 'Room Facilities & Inspection Status'}
              </h5>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>Air Conditioning Serviced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>Washroom Cleaned Daily</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>Wi-Fi Access Strong</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>Fire Safety Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </VFDrawer>
      )}

      {/* ── Issue Outpass Modal Dialog ── */}
      <VFDialog
        isOpen={isOutpassModalOpen}
        onClose={() => setIsOutpassModalOpen(false)}
        title={isHindi ? 'नया बायोमेट्रिक आउटपास जारी करें' : 'Issue Biometric Campus Outpass'}
        description={isHindi ? 'छात्र, कमरा, प्रयोजन व प्रस्थान/वापसी समय भरें' : 'Authorize residential student movement with warden verification'}
        className="max-w-md rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsOutpassModalOpen(false)}
              className="rounded-[3px]"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleIssueOutpass}
              className="rounded-[3px]"
            >
              {isHindi ? 'आउटपास जारी करें' : 'Authorize Outpass'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleIssueOutpass} className="space-y-3 py-1 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'छात्र का नाम' : 'Student Name'}
              </label>
              <input
                type="text"
                required
                value={outpassStudent}
                onChange={(e) => setOutpassStudent(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'कमरा संख्या' : 'Room Number'}
              </label>
              <select
                value={outpassRoom}
                onChange={(e) => setOutpassRoom(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                {rooms.map((r) => (
                  <option key={r.roomNumber} value={r.roomNumber}>
                    {r.roomNumber} ({r.block.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {isHindi ? 'अवकाश प्रयोजन' : 'Outpass Purpose'}
            </label>
            <select
              value={outpassPurpose}
              onChange={(e) => setOutpassPurpose(e.target.value as any)}
              className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
            >
              <option value="Weekend Home Visit">Weekend Home Visit</option>
              <option value="Medical Examination">Medical Examination</option>
              <option value="Coaching / Olympiad">Coaching / Olympiad</option>
              <option value="Family Emergency">Family Emergency</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'प्रस्थान समय' : 'Departure Time'}
              </label>
              <input
                type="text"
                value={outpassLeave}
                onChange={(e) => setOutpassLeave(e.target.value)}
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'अपेक्षित वापसी' : 'Expected Return'}
              </label>
              <input
                type="text"
                value={outpassReturn}
                onChange={(e) => setOutpassReturn(e.target.value)}
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              />
            </div>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
