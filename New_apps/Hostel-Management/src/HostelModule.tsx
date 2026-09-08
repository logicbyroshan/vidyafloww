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
  cn,
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
  CheckSquare,
  Check,
  X,
  Search,
  Coffee,
  Moon,
} from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelManagementPage,
});

/* ──────────────────────────────────────────────────────────────────────────
   TYPES & DATA MODELS
   ────────────────────────────────────────────────────────────────────────── */

interface ResidentProfile {
  name: string;
  roll: string;
  classSection: string;
  guardianPhone: string;
  messPlan: string;
  checkInDate: string;
  photoUrl?: string;
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
  block: string;
  purpose: 'Weekend Home Visit' | 'Medical Examination' | 'Coaching / Olympiad' | 'Family Emergency' | 'Festival Break';
  grantedDate: string;
  daysGranted: number;
  leaveTime: string;
  returnTime: string;
  approvedBy: string;
  gateStatus: 'Approved - Out' | 'Returned' | 'Overdue';
  guardianPhone: string;
}

interface DailyMealSchedule {
  dayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  dayName: string;
  hindiDayName: string;
  breakfast: { time: string; items: string; calories: string };
  lunch: { time: string; items: string; calories: string };
  dinner: { time: string; items: string; calories: string };
}

interface NightAttendanceRecord {
  id: string;
  name: string;
  admNo: string;
  photoUrl: string;
  room: string;
  bed: string;
  block: 'Block A (Boys)' | 'Block B (Girls)' | 'Block C (Junior)';
  floor: string;
  classSection: string;
  guardianPhone: string;
  guardianName: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  punchTime?: string;
  verifiedBy: string;
}

/* ──────────────────────────────────────────────────────────────────────────
   INITIAL DATA
   ────────────────────────────────────────────────────────────────────────── */

const INITIAL_ROOMS: RoomBedItem[] = [
  {
    roomNumber: 'A-101',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    type: 'Double AC',
    totalBeds: 2,
    warden: 'Mr. R. K. Saxena (+91 98110 11223)',
    amenities: 'Attached Bath, AC, Ergonomic Desks, Lockers',
    residents: [
      { name: 'Rahul Sharma', roll: 'Roll #42', classSection: 'Class 10-A', guardianPhone: '+91 98111 00123', messPlan: 'Standard 4-Meal Plan', checkInDate: '10 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80' },
      { name: 'Karan Malhotra', roll: 'Roll #14', classSection: 'Class 10-B', guardianPhone: '+91 98111 00456', messPlan: 'Standard 4-Meal Plan', checkInDate: '12 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80' },
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
      { name: 'Amit Kumar', roll: 'Roll #05', classSection: 'Class 10-A', guardianPhone: '+91 98111 00789', messPlan: 'Standard 4-Meal Plan', checkInDate: '15 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80' },
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
      { name: 'Rohan Verma', roll: 'Roll #01', classSection: 'Class 12-Sci', guardianPhone: '+91 98111 00999', messPlan: 'Nutritional Diet Plan', checkInDate: '01 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80' },
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
      { name: 'Priya Sharma', roll: 'Roll #18', classSection: 'Class 9-B', guardianPhone: '+91 98111 00234', messPlan: 'Nutritional Diet Plan', checkInDate: '08 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80' },
      { name: 'Sneha Patel', roll: 'Roll #29', classSection: 'Class 11-Sci', guardianPhone: '+91 98111 00345', messPlan: 'Standard 4-Meal Plan', checkInDate: '10 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80' },
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
      { name: 'Ananya Roy', roll: 'Roll #03', classSection: 'Class 10-A', guardianPhone: '+91 98111 00567', messPlan: 'Standard 4-Meal Plan', checkInDate: '11 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80' },
      { name: 'Divya Singh', roll: 'Roll #12', classSection: 'Class 10-B', guardianPhone: '+91 98111 00678', messPlan: 'Standard 4-Meal Plan', checkInDate: '14 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&auto=format&fit=crop&q=80' },
    ],
  },
  {
    roomNumber: 'C-301',
    block: 'Block C (Junior)',
    floor: '3rd Floor',
    type: 'Quad Non-AC',
    totalBeds: 4,
    warden: 'Mr. Deepak Joshi (+91 98113 77889)',
    amenities: 'Dorm Bunk Beds, Air Coolers, Lockers, Shared Study Room',
    residents: [
      { name: 'Aman Sharma', roll: 'Roll #05', classSection: 'Class 6-A', guardianPhone: '+91 98111 00123', messPlan: 'Junior Nutrition Plan', checkInDate: '15 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80' },
      { name: 'Vikram Das', roll: 'Roll #09', classSection: 'Class 6-B', guardianPhone: '+91 98111 00888', messPlan: 'Junior Nutrition Plan', checkInDate: '15 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80' },
      { name: 'Sunny Rawat', roll: 'Roll #15', classSection: 'Class 7-A', guardianPhone: '+91 98111 00777', messPlan: 'Junior Nutrition Plan', checkInDate: '16 Jul 2026', photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&auto=format&fit=crop&q=80' },
    ],
  },
];

const INITIAL_OUTPASSES: OutpassRecord[] = [
  {
    id: 'OUT-881',
    studentName: 'Rahul Sharma',
    classSection: 'Class 10-A',
    room: 'A-101',
    block: 'Block A (Boys)',
    purpose: 'Weekend Home Visit',
    grantedDate: '18 Aug 2026',
    daysGranted: 3,
    leaveTime: 'Fri 05:00 PM',
    returnTime: 'Mon 07:00 AM',
    approvedBy: 'Warden Saxena',
    gateStatus: 'Approved - Out',
    guardianPhone: '+91 98111 00123',
  },
  {
    id: 'OUT-882',
    studentName: 'Sneha Patel',
    classSection: 'Class 11-Sci',
    room: 'B-201',
    block: 'Block B (Girls)',
    purpose: 'Coaching / Olympiad',
    grantedDate: '19 Aug 2026',
    daysGranted: 1,
    leaveTime: 'Sat 08:30 AM',
    returnTime: 'Sat 01:30 PM',
    approvedBy: 'Warden Grover',
    gateStatus: 'Returned',
    guardianPhone: '+91 98111 00345',
  },
  {
    id: 'OUT-883',
    studentName: 'Karan Malhotra',
    classSection: 'Class 10-B',
    room: 'A-101',
    block: 'Block A (Boys)',
    purpose: 'Medical Examination',
    grantedDate: '20 Aug 2026',
    daysGranted: 1,
    leaveTime: 'Today 02:00 PM',
    returnTime: 'Today 06:30 PM',
    approvedBy: 'Chief Warden',
    gateStatus: 'Overdue',
    guardianPhone: '+91 98111 00456',
  },
  {
    id: 'OUT-884',
    studentName: 'Aman Sharma',
    classSection: 'Class 6-A',
    room: 'C-301',
    block: 'Block C (Junior)',
    purpose: 'Family Emergency',
    grantedDate: '20 Aug 2026',
    daysGranted: 2,
    leaveTime: 'Today 12:00 PM',
    returnTime: 'Fri 06:00 PM',
    approvedBy: 'Warden Joshi',
    gateStatus: 'Approved - Out',
    guardianPhone: '+91 98111 00123',
  },
];

const WEEKLY_FOOD_MENU: DailyMealSchedule[] = [
  {
    dayId: 'mon',
    dayName: 'Monday',
    hindiDayName: 'सोमवार',
    breakfast: { time: '07:30 – 08:30 AM', items: 'Indori Poha with Peanuts, Boiled Eggs or Sprouts, Banana, Fresh Milk, Tea & Coffee', calories: '420 kcal' },
    lunch: { time: '12:30 – 01:45 PM', items: 'Shahi Paneer, Yellow Dal Tadka, Jeera Rice, Tawa Phulkas with Ghee, Cucumber Salad, Boondi Raita', calories: '680 kcal' },
    dinner: { time: '08:00 – 09:15 PM', items: 'Aloo Gobi Matar, Moong Dal Fry, Steamed Rice, Soft Phulkas, Moong Dal Halwa, Roasted Papad', calories: '590 kcal' },
  },
  {
    dayId: 'tue',
    dayName: 'Tuesday',
    hindiDayName: 'मंगलवार',
    breakfast: { time: '07:30 – 08:30 AM', items: 'Idli Sambar, Medu Vada, Coconut & Tomato Chutney, Boiled Eggs / Fruit Bowl, Milk & Tea', calories: '410 kcal' },
    lunch: { time: '12:30 – 01:45 PM', items: 'Punjabi Rajma Masala, Kashmiri Pulao, Steamed Rice, Tawa Rotis, Onion & Mint Salad, Mix Veg Raita', calories: '660 kcal' },
    dinner: { time: '08:00 – 09:15 PM', items: 'Mix Veg Handi, Masoor Dal Tadka, Steamed Fragrant Rice, Butter Phulkas, Sevaiyan Kheer, Fryums', calories: '570 kcal' },
  },
  {
    dayId: 'wed',
    dayName: 'Wednesday',
    hindiDayName: 'बुधवार',
    breakfast: { time: '07:30 – 08:30 AM', items: 'Methi Thepla with Fresh Curd & Pickle, Boiled Eggs / Sprouted Moong, Crisp Apple, Milk & Tea', calories: '390 kcal' },
    lunch: { time: '12:30 – 01:45 PM', items: 'Palak Paneer, Panchmel Dal, Green Peas Pulao, Chapati with Ghee, Beetroot Salad, Gulab Jamun', calories: '690 kcal' },
    dinner: { time: '08:00 – 09:15 PM', items: 'Baingan Bharta, Jeera Aloo, Arhar Dal Tadka, Steamed Rice, Phulkas with Ghee, Roasted Papad', calories: '540 kcal' },
  },
  {
    dayId: 'thu',
    dayName: 'Thursday',
    hindiDayName: 'गुरुवार',
    breakfast: { time: '07:30 – 08:30 AM', items: 'Aloo & Onion Paratha with White Butter, Set Curd, Boiled Eggs / Papaya, Fresh Milk, Tea', calories: '460 kcal' },
    lunch: { time: '12:30 – 01:45 PM', items: 'Kadhai Paneer with Bell Peppers, Chana Dal Fry, Jeera Rice, Butter Phulkas, Green Salad, Dahi', calories: '670 kcal' },
    dinner: { time: '08:00 – 09:15 PM', items: 'Paneer Bhurji with Peas, Dal Makhani, Steamed Rice, Soft Tawa Chapati, Suji Halwa, Roasted Papad', calories: '620 kcal' },
  },
  {
    dayId: 'fri',
    dayName: 'Friday',
    hindiDayName: 'शुक्रवार',
    breakfast: { time: '07:30 – 08:30 AM', items: 'Vegetable Upma with Roasted Cashews, Coconut Chutney, Boiled Eggs / Guava, Fresh Milk & Tea', calories: '380 kcal' },
    lunch: { time: '12:30 – 01:45 PM', items: 'Amritsari Pindi Chhole, Bhature & Steamed Rice, Pickled Onions, Boondi Mint Raita, Masala Papad', calories: '710 kcal' },
    dinner: { time: '08:00 – 09:15 PM', items: 'Bhindi Do Pyaza, Yellow Moong Dal Fry, Steamed Rice, Tawa Phulkas, Besan Ladoo, Fresh Salad', calories: '550 kcal' },
  },
  {
    dayId: 'sat',
    dayName: 'Saturday',
    hindiDayName: 'शनिवार',
    breakfast: { time: '07:30 – 08:30 AM', items: 'Moong Dal Cheela with Paneer, Mint Chutney, Boiled Eggs / Sprouts, Fresh Orange, Warm Milk & Tea', calories: '400 kcal' },
    lunch: { time: '12:30 – 01:45 PM', items: 'Kashmiri Dum Aloo, Dal Makhani, Steamed Basmati Rice, Butter Phulkas, Kachumber Salad, Curd', calories: '650 kcal' },
    dinner: { time: '08:00 – 09:15 PM', items: 'Shahi Malai Kofta, Arhar Dal Tadka, Steamed Rice, Butter Rotis, Saffron Rice Kheer, Roasted Papad', calories: '640 kcal' },
  },
  {
    dayId: 'sun',
    dayName: 'Sunday',
    hindiDayName: 'रविवार',
    breakfast: { time: '08:00 – 09:30 AM', items: 'Crispy Masala Dosa with Sambar, Coconut & Tomato Chutney, Boiled Eggs, Fresh Fruits, Filter Coffee', calories: '480 kcal' },
    lunch: { time: '12:45 – 02:15 PM', items: 'Royal Paneer Lababdar, Dum Veg Biryani, Mirchi Ka Salan, Dal Tadka, Butter Naan & Phulkas, Rasgulla', calories: '780 kcal' },
    dinner: { time: '08:00 – 09:15 PM', items: 'Mumbai Pav Bhaji with Butter Pav OR Comfort Dal Khichdi Tadka, Green Salad, Warm Saffron Milk', calories: '560 kcal' },
  },
];

const INITIAL_NIGHT_ROSTER: NightAttendanceRecord[] = [
  {
    id: 'NAR-101',
    name: 'Rahul Sharma',
    admNo: 'ADM-2026-0811',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
    room: 'A-101',
    bed: 'Bed #1',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    classSection: 'Class 10-A',
    guardianPhone: '+91 98111 00123',
    guardianName: 'Suresh Sharma',
    status: 'Leave',
    punchTime: 'Outpass OUT-881',
    verifiedBy: 'Warden Saxena',
  },
  {
    id: 'NAR-102',
    name: 'Karan Malhotra',
    admNo: 'ADM-2026-0814',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    room: 'A-101',
    bed: 'Bed #2',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    classSection: 'Class 10-B',
    guardianPhone: '+91 98111 00456',
    guardianName: 'Prem Malhotra',
    status: 'Late',
    punchTime: '09:48 PM',
    verifiedBy: 'Warden Saxena',
  },
  {
    id: 'NAR-103',
    name: 'Amit Kumar',
    admNo: 'ADM-2026-0812',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    room: 'A-102',
    bed: 'Bed #1',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    classSection: 'Class 10-A',
    guardianPhone: '+91 98111 00789',
    guardianName: 'Vinod Kumar',
    status: 'Present',
    punchTime: '09:15 PM',
    verifiedBy: 'Warden Saxena',
  },
  {
    id: 'NAR-104',
    name: 'Rohan Verma',
    admNo: 'ADM-2026-0810',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80',
    room: 'A-103',
    bed: 'Bed #1',
    block: 'Block A (Boys)',
    floor: '1st Floor',
    classSection: 'Class 12-Sci',
    guardianPhone: '+91 98111 00999',
    guardianName: 'Mahesh Verma',
    status: 'Present',
    punchTime: '09:22 PM',
    verifiedBy: 'Warden Saxena',
  },
  {
    id: 'NAR-105',
    name: 'Priya Sharma',
    admNo: 'ADM-2026-0821',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    room: 'B-201',
    bed: 'Bed #1',
    block: 'Block B (Girls)',
    floor: '2nd Floor',
    classSection: 'Class 9-B',
    guardianPhone: '+91 98111 00234',
    guardianName: 'Hemant Sharma',
    status: 'Present',
    punchTime: '09:10 PM',
    verifiedBy: 'Warden Grover',
  },
  {
    id: 'NAR-106',
    name: 'Sneha Patel',
    admNo: 'ADM-2026-0822',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    room: 'B-201',
    bed: 'Bed #2',
    block: 'Block B (Girls)',
    floor: '2nd Floor',
    classSection: 'Class 11-Sci',
    guardianPhone: '+91 98111 00345',
    guardianName: 'Jayesh Patel',
    status: 'Present',
    punchTime: '01:25 PM',
    verifiedBy: 'Warden Grover',
  },
  {
    id: 'NAR-107',
    name: 'Ananya Roy',
    admNo: 'ADM-2026-0823',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80',
    room: 'B-202',
    bed: 'Bed #1',
    block: 'Block B (Girls)',
    floor: '2nd Floor',
    classSection: 'Class 10-A',
    guardianPhone: '+91 98111 00567',
    guardianName: 'Subhash Roy',
    status: 'Present',
    punchTime: '09:25 PM',
    verifiedBy: 'Warden Grover',
  },
  {
    id: 'NAR-108',
    name: 'Divya Singh',
    admNo: 'ADM-2026-0824',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&auto=format&fit=crop&q=80',
    room: 'B-202',
    bed: 'Bed #2',
    block: 'Block B (Girls)',
    floor: '2nd Floor',
    classSection: 'Class 10-B',
    guardianPhone: '+91 98111 00678',
    guardianName: 'Narendra Singh',
    status: 'Absent',
    punchTime: 'Unaccounted',
    verifiedBy: 'Warden Grover',
  },
  {
    id: 'NAR-109',
    name: 'Aman Sharma',
    admNo: 'ADM-2026-0831',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    room: 'C-301',
    bed: 'Bed #1',
    block: 'Block C (Junior)',
    floor: '3rd Floor',
    classSection: 'Class 6-A',
    guardianPhone: '+91 98111 00123',
    guardianName: 'Gopal Sharma',
    status: 'Leave',
    punchTime: 'Outpass OUT-884',
    verifiedBy: 'Warden Joshi',
  },
  {
    id: 'NAR-110',
    name: 'Vikram Das',
    admNo: 'ADM-2026-0832',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
    room: 'C-301',
    bed: 'Bed #2',
    block: 'Block C (Junior)',
    floor: '3rd Floor',
    classSection: 'Class 6-B',
    guardianPhone: '+91 98111 00888',
    guardianName: 'Biplab Das',
    status: 'Present',
    punchTime: '09:00 PM',
    verifiedBy: 'Warden Joshi',
  },
  {
    id: 'NAR-111',
    name: 'Sunny Rawat',
    admNo: 'ADM-2026-0833',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&auto=format&fit=crop&q=80',
    room: 'C-301',
    bed: 'Bed #3',
    block: 'Block C (Junior)',
    floor: '3rd Floor',
    classSection: 'Class 7-A',
    guardianPhone: '+91 98111 00777',
    guardianName: 'Kailash Rawat',
    status: 'Present',
    punchTime: '09:05 PM',
    verifiedBy: 'Warden Joshi',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   MAIN HOSTEL PAGE
   ────────────────────────────────────────────────────────────────────────── */

function HostelManagementPage() {
  const { lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'छात्रावास प्रबंधन' : 'Hostel & Dormitory') + ' – VidyaFloww';
  }, [isHindi]);

  // Tab State: Clean 4 tabs
  const [activeTab, setActiveTab] = React.useState<'rooms' | 'mess' | 'leaves' | 'attendance'>('rooms');

  // Rooms Data State
  const [rooms, setRooms] = React.useState<RoomBedItem[]>(INITIAL_ROOMS);
  const [roomBlockFilter, setRoomBlockFilter] = React.useState<string>('All');

  // Outpass / Leave Ledger State
  const [outpasses, setOutpasses] = React.useState<OutpassRecord[]>(INITIAL_OUTPASSES);
  const [leaveStatusFilter, setLeaveStatusFilter] = React.useState<string>('All');
  const [leaveSearch, setLeaveSearch] = React.useState<string>('');

  // 7-Day Food Timetable State
  const [selectedDayId, setSelectedDayId] = React.useState<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>('mon');
  const [foodViewMode, setFoodViewMode] = React.useState<'day' | 'week'>('day');

  // Night Dorm Attendance State
  const [nightRoster, setNightRoster] = React.useState<NightAttendanceRecord[]>(INITIAL_NIGHT_ROSTER);
  const [attendanceBlockFilter, setAttendanceBlockFilter] = React.useState<string>('All');
  const [attendanceSearch, setAttendanceSearch] = React.useState<string>('');

  // Drawer State for Room-Wise Beds
  const [selectedRoomNumber, setSelectedRoomNumber] = React.useState<string | null>(null);
  const selectedRoom = rooms.find((r) => r.roomNumber === selectedRoomNumber) || null;

  // Inline Bed Allocation Form in Drawer
  const [allocatingBedIndex, setAllocatingBedIndex] = React.useState<number | null>(null);
  const [newStudentName, setNewStudentName] = React.useState('');
  const newClassSection = 'Class 10-A';
  const newGuardianPhone = '+91 98111 00000';

  // Issue Outpass Modal
  const [isOutpassModalOpen, setIsOutpassModalOpen] = React.useState(false);
  const [outpassStudent, setOutpassStudent] = React.useState('');
  const [outpassRoom, setOutpassRoom] = React.useState('A-101');
  const [outpassPurpose, setOutpassPurpose] = React.useState<OutpassRecord['purpose']>('Weekend Home Visit');
  const [outpassDays, setOutpassDays] = React.useState<number>(2);
  const [outpassLeave, setOutpassLeave] = React.useState('Friday 05:00 PM');
  const [outpassReturn, setOutpassReturn] = React.useState('Sunday 07:00 PM');
  const outpassGuardianPhone = '+91 98111 00123';

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
            photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
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
      title: isHindi ? 'बेड आवंटित' : 'Bed Allocated',
      description: `${newStudentName} assigned to Room ${roomNum}.`,
      type: 'success',
    });

    setAllocatingBedIndex(null);
    setNewStudentName('');
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
      description: `${studentName} removed from Room ${roomNum}.`,
      type: 'info',
    });
  };

  // Issue Outpass
  const handleIssueOutpass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outpassStudent.trim()) return;

    const matchedRoom = rooms.find((r) => r.roomNumber === outpassRoom);

    const newTicket: OutpassRecord = {
      id: `OUT-${Math.floor(800 + Math.random() * 200)}`,
      studentName: outpassStudent.trim(),
      classSection: 'Hostel Resident',
      room: outpassRoom,
      block: matchedRoom ? matchedRoom.block : 'Block A (Boys)',
      purpose: outpassPurpose,
      grantedDate: 'Today',
      daysGranted: outpassDays,
      leaveTime: outpassLeave,
      returnTime: outpassReturn,
      approvedBy: 'Chief Warden',
      gateStatus: 'Approved - Out',
      guardianPhone: outpassGuardianPhone,
    };

    setOutpasses((prev) => [newTicket, ...prev]);

    setNightRoster((prev) =>
      prev.map((s) => (s.name.toLowerCase() === outpassStudent.trim().toLowerCase() ? { ...s, status: 'Leave', punchTime: `Outpass ${newTicket.id}` } : s))
    );

    setIsOutpassModalOpen(false);
    setOutpassStudent('');

    addNotification({
      title: isHindi ? 'आउटपास जारी' : 'Outpass Granted',
      description: `Outpass ${newTicket.id} issued for ${newTicket.studentName} (${newTicket.daysGranted} days).`,
      type: 'success',
    });
  };

  // Mark Returned
  const handleMarkReturned = (outpassId: string, studentName: string) => {
    setOutpasses((prev) =>
      prev.map((op) => (op.id === outpassId ? { ...op, gateStatus: 'Returned' } : op))
    );

    setNightRoster((prev) =>
      prev.map((s) => (s.name.toLowerCase() === studentName.toLowerCase() ? { ...s, status: 'Present', punchTime: 'Returned' } : s))
    );

    addNotification({
      title: isHindi ? 'वापसी दर्ज' : 'Student Returned',
      description: `${studentName} marked returned to hostel.`,
      type: 'success',
    });
  };

  // Toggle Night Status
  const handleNightStatusToggle = (studentId: string, newStatus: NightAttendanceRecord['status']) => {
    setNightRoster((prev) =>
      prev.map((item) => {
        if (item.id === studentId) {
          const punchTime =
            newStatus === 'Present'
              ? '09:30 PM Checked'
              : newStatus === 'Late'
              ? 'Pending Entry'
              : newStatus === 'Absent'
              ? 'Unaccounted'
              : 'Outpass';
          return {
            ...item,
            status: newStatus,
            punchTime,
          };
        }
        return item;
      })
    );
  };

  // Mark All Present
  const handleMarkAllPresent = () => {
    setNightRoster((prev) =>
      prev.map((item) => {
        if (item.status === 'Leave') return item;
        return {
          ...item,
          status: 'Present',
          punchTime: '09:30 PM Roll Call',
        };
      })
    );

    addNotification({
      title: isHindi ? 'सभी उपस्थित' : 'All Marked Present',
      description: 'Night roll call updated for in-dorm students.',
      type: 'success',
    });
  };

  // Counts
  const totalBeds = rooms.reduce((acc, r) => acc + r.totalBeds, 0);
  const occupiedBeds = rooms.reduce((acc, r) => acc + r.residents.length, 0);

  const presentCount = nightRoster.filter((s) => s.status === 'Present').length;
  const absentCount = nightRoster.filter((s) => s.status === 'Absent').length;
  const lateCount = nightRoster.filter((s) => s.status === 'Late').length;
  const leaveCount = nightRoster.filter((s) => s.status === 'Leave').length;

  const activeLeavesCount = outpasses.filter((op) => op.gateStatus === 'Approved - Out').length;
  const returnedLeavesCount = outpasses.filter((op) => op.gateStatus === 'Returned').length;
  const overdueLeavesCount = outpasses.filter((op) => op.gateStatus === 'Overdue').length;

  // Filtered lists
  const filteredRooms = rooms.filter((r) => roomBlockFilter === 'All' || r.block === roomBlockFilter);

  const filteredOutpasses = outpasses.filter((op) => {
    const matchesStatus = leaveStatusFilter === 'All' || op.gateStatus === leaveStatusFilter;
    const matchesSearch =
      op.studentName.toLowerCase().includes(leaveSearch.toLowerCase()) ||
      op.room.toLowerCase().includes(leaveSearch.toLowerCase()) ||
      op.id.toLowerCase().includes(leaveSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredNightRoster = nightRoster.filter((s) => {
    const matchesBlock = attendanceBlockFilter === 'All' || s.block === attendanceBlockFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      s.room.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      s.admNo.toLowerCase().includes(attendanceSearch.toLowerCase());
    return matchesBlock && matchesSearch;
  });

  const selectedDayMenu = WEEKLY_FOOD_MENU.find((d) => d.dayId === selectedDayId) || WEEKLY_FOOD_MENU[0];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-4">
      {/* ── UNIFIED HEADER (ORIGINAL CLEAN SEGMENTED PILL BAR PATTERN) ── */}
      <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: 4 Clean Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70">
            <button
              type="button"
              id="tab-rooms"
              onClick={() => setActiveTab('rooms')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'rooms'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bed className="h-4 w-4" />
              <span>{isHindi ? 'कमरा व बेड' : 'Rooms & Beds'}</span>
            </button>

            <button
              type="button"
              id="tab-mess"
              onClick={() => setActiveTab('mess')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'mess'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Utensils className="h-4 w-4" />
              <span>{isHindi ? '7-दिवसीय भोजन मेनू' : '7-Day Food Menu'}</span>
            </button>

            <button
              type="button"
              id="tab-leaves"
              onClick={() => setActiveTab('leaves')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'leaves'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LogOut className="h-4 w-4" />
              <span>{isHindi ? 'अवकाश पंजिका' : 'Leave Ledger'}</span>
            </button>

            <button
              type="button"
              id="tab-attendance"
              onClick={() => setActiveTab('attendance')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'attendance'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              <span>{isHindi ? 'रात्रि उपस्थिति' : 'Night Attendance'}</span>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {activeTab === 'attendance' ? (
            <VFButton
              size="sm"
              onClick={handleMarkAllPresent}
              className="h-8 px-3.5 text-xs font-bold rounded-[4px] bg-emerald-600 hover:bg-emerald-500 text-white"
              leftIcon={<Check className="h-3.5 w-3.5 stroke-[3]" />}
            >
              {isHindi ? 'सभी उपस्थित मार्क करें' : 'Mark All Present'}
            </VFButton>
          ) : (
            <VFButton
              size="sm"
              onClick={() => setIsOutpassModalOpen(true)}
              className="h-8 px-3.5 text-xs font-bold shadow-xs rounded-[4px]"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              {isHindi ? '+ नया आउटपास' : '+ Issue Outpass'}
            </VFButton>
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: ROOMS & BEDS (CLEAN ORIGINAL STRUCTURE)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'rooms' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#141414] border border-border/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-muted-foreground">{isHindi ? 'ब्लॉक:' : 'Block:'}</span>
              {(['All', 'Block A (Boys)', 'Block B (Girls)', 'Block C (Junior)'] as const).map((blk) => (
                <button
                  key={blk}
                  type="button"
                  onClick={() => setRoomBlockFilter(blk)}
                  className={cn(
                    'px-2.5 py-1 rounded-[3px] font-semibold transition-colors cursor-pointer',
                    roomBlockFilter === blk
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'text-muted-foreground hover:text-foreground bg-[#1a1a1a] border border-border/60'
                  )}
                >
                  {blk}
                </button>
              ))}
            </div>
            <div className="font-mono text-muted-foreground">
              {occupiedBeds} / {totalBeds} {isHindi ? 'बेड आवंटित' : 'Beds Occupied'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((rm) => {
              const occupied = rm.residents.length;
              const isFull = occupied >= rm.totalBeds;
              const hasVacancy = occupied < rm.totalBeds;

              return (
                <div
                  key={rm.roomNumber}
                  className="p-4 rounded-[4px] border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-primary">{rm.roomNumber}</span>
                        <VFBadge variant="outline" className="text-xs rounded-[3px] px-2 py-0.5">{rm.type}</VFBadge>
                      </div>
                      <VFBadge
                        variant={isFull ? 'danger' : hasVacancy && occupied > 0 ? 'warning' : 'success'}
                        className="text-xs rounded-[3px] px-2 py-0.5"
                      >
                        {occupied} / {rm.totalBeds} {isHindi ? 'बेड' : 'Beds'}
                      </VFBadge>
                    </div>

                    <div className="text-xs text-muted-foreground space-y-0.5 mb-3">
                      <div className="flex items-center justify-between font-medium text-foreground">
                        <span>{rm.block}</span>
                        <span className="font-mono text-xs text-muted-foreground">{rm.floor}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{rm.warden}</p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-border/60">
                      {Array.from({ length: rm.totalBeds }).map((_, bIdx) => {
                        const resident = rm.residents[bIdx];
                        return (
                          <div
                            key={bIdx}
                            className={`p-2 rounded-[3px] border flex items-center justify-between text-xs ${
                              resident
                                ? 'bg-[#181818] border-border/70 text-foreground'
                                : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Bed className={`h-3.5 w-3.5 shrink-0 ${resident ? 'text-primary' : 'text-emerald-400'}`} />
                              <span className="font-mono text-xs font-bold text-muted-foreground shrink-0">
                                Bed #{bIdx + 1}:
                              </span>
                              <span className="truncate font-semibold text-xs">
                                {resident ? resident.name : (isHindi ? 'रिक्त बेड' : 'Vacant Space')}
                              </span>
                            </div>
                            {resident ? (
                              <span className="text-xs text-muted-foreground shrink-0 font-mono">
                                {resident.classSection}
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider shrink-0">
                                {isHindi ? 'उपलब्ध' : 'Free'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground truncate max-w-[190px]">
                      {rm.amenities}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedRoomNumber(rm.roomNumber)}
                      className="px-3 py-1.5 rounded-[3px] bg-[#1c1c1c] hover:bg-[#252525] border border-border/80 text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
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
          TAB 2: 7-DAY FOOD TIMETABLE (CLEAN, FOCUSED 3-MEAL SCHEDULE)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'mess' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Day Selector & Mode Switcher */}
          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {WEEKLY_FOOD_MENU.map((d) => (
                <button
                  key={d.dayId}
                  type="button"
                  onClick={() => setSelectedDayId(d.dayId)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-[3px] text-xs font-bold transition-all cursor-pointer shrink-0',
                    selectedDayId === d.dayId
                      ? 'bg-amber-500 text-black shadow-xs font-extrabold'
                      : 'bg-[#1a1a1a] text-muted-foreground hover:text-foreground border border-border/70'
                  )}
                >
                  {d.dayName}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center border border-border/80 rounded-[4px] p-0.5 bg-[#181818]">
                <button
                  type="button"
                  onClick={() => setFoodViewMode('day')}
                  className={cn(
                    'px-2.5 py-1 text-xs font-bold rounded-[2px] transition-colors',
                    foodViewMode === 'day' ? 'bg-[#282828] text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isHindi ? 'दैनिक दृश्य' : 'Day View'}
                </button>
                <button
                  type="button"
                  onClick={() => setFoodViewMode('week')}
                  className={cn(
                    'px-2.5 py-1 text-xs font-bold rounded-[2px] transition-colors',
                    foodViewMode === 'week' ? 'bg-[#282828] text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isHindi ? 'साप्ताहिक ग्रिड' : 'Weekly Grid'}
                </button>
              </div>
            </div>
          </div>

          {/* DAY VIEW: 3 CRISP MEAL CARDS */}
          {foodViewMode === 'day' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Breakfast */}
              <div className="p-4 rounded-[4px] border border-border/80 bg-card flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-amber-400" />
                      <span className="font-bold text-foreground text-sm">
                        {isHindi ? 'अल्पाहार' : 'Breakfast'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-primary font-semibold">
                      {selectedDayMenu.breakfast.time}
                    </span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed mt-3 font-medium">
                    {selectedDayMenu.breakfast.items}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>Energy</span>
                  <span className="text-emerald-400 font-bold">{selectedDayMenu.breakfast.calories}</span>
                </div>
              </div>

              {/* 2. Lunch */}
              <div className="p-4 rounded-[4px] border border-border/80 bg-card flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-emerald-400" />
                      <span className="font-bold text-foreground text-sm">
                        {isHindi ? 'दोपहर का भोजन' : 'Lunch'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-primary font-semibold">
                      {selectedDayMenu.lunch.time}
                    </span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed mt-3 font-medium">
                    {selectedDayMenu.lunch.items}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>Full Thali</span>
                  <span className="text-emerald-400 font-bold">{selectedDayMenu.lunch.calories}</span>
                </div>
              </div>

              {/* 3. Dinner */}
              <div className="p-4 rounded-[4px] border border-border/80 bg-card flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-sky-400" />
                      <span className="font-bold text-foreground text-sm">
                        {isHindi ? 'रात्रि भोज' : 'Dinner'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-primary font-semibold">
                      {selectedDayMenu.dinner.time}
                    </span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed mt-3 font-medium">
                    {selectedDayMenu.dinner.items}
                  </p>
                </div>
                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>Wholesome</span>
                  <span className="text-emerald-400 font-bold">{selectedDayMenu.dinner.calories}</span>
                </div>
              </div>
            </div>
          ) : (
            /* WEEKLY GRID: CLEAN COMPACT TABLE */
            <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                      <th className="py-3 px-4 w-28">{isHindi ? 'दिन' : 'Day'}</th>
                      <th className="py-3 px-4 w-[30%] text-amber-400 font-bold">Breakfast (07:30–08:30)</th>
                      <th className="py-3 px-4 w-[35%] text-emerald-400 font-bold">Lunch (12:30–01:45)</th>
                      <th className="py-3 px-4 w-[35%] text-sky-400 font-bold">Dinner (08:00–09:15)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {WEEKLY_FOOD_MENU.map((d) => (
                      <tr key={d.dayId} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-3 px-4 font-bold text-foreground align-top">
                          <div>{d.dayName}</div>
                          <div className="text-[10px] text-muted-foreground">{d.hindiDayName}</div>
                        </td>
                        <td className="py-3 px-4 text-foreground/90 align-top leading-relaxed">
                          {d.breakfast.items}
                        </td>
                        <td className="py-3 px-4 text-foreground/90 align-top leading-relaxed">
                          {d.lunch.items}
                        </td>
                        <td className="py-3 px-4 text-foreground/90 align-top leading-relaxed">
                          {d.dinner.items}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 3: LEAVE & OUTPASS LEDGER (CLEAN STRUCTURED TABLE)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'leaves' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Quick Filter Bar */}
          <div className="p-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <div className="relative w-full">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={leaveSearch}
                  onChange={(e) => setLeaveSearch(e.target.value)}
                  placeholder={isHindi ? 'छात्र, कमरा या पास आईडी खोजें...' : 'Search student, room or pass ID...'}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1a1a1a] border border-border/70 rounded-[3px] text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {(['All', 'Approved - Out', 'Returned', 'Overdue'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setLeaveStatusFilter(st)}
                    className={cn(
                      'px-2.5 py-1 rounded-[3px] font-semibold transition-colors cursor-pointer',
                      leaveStatusFilter === st
                        ? 'bg-primary/20 text-primary border border-primary/40'
                        : 'text-muted-foreground hover:text-foreground bg-[#1a1a1a] border border-border/60'
                    )}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <span className="font-mono text-muted-foreground hidden sm:inline">
                {activeLeavesCount} {isHindi ? 'सक्रिय' : 'Active'} · {returnedLeavesCount} {isHindi ? 'वापस' : 'Returned'} · {overdueLeavesCount} {isHindi ? 'ओवरड्यू' : 'Overdue'}
              </span>
            </div>
          </div>

          {/* Clean Ledger Table */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-3 px-4">{isHindi ? 'पास आईडी' : 'Pass ID'}</th>
                    <th className="py-3 px-4">{isHindi ? 'छात्र का नाम' : 'Student Name'}</th>
                    <th className="py-3 px-4">{isHindi ? 'कमरा' : 'Room'}</th>
                    <th className="py-3 px-4">{isHindi ? 'अवकाश प्रयोजन' : 'Purpose'}</th>
                    <th className="py-3 px-4">{isHindi ? 'स्वीकृति व दिन' : 'Granted & Days'}</th>
                    <th className="py-3 px-4">{isHindi ? 'प्रस्थान व वापसी' : 'Departure & Return'}</th>
                    <th className="py-3 px-4">{isHindi ? 'स्वीकृतिकर्ता' : 'Approved By'}</th>
                    <th className="py-3 px-4 text-center">{isHindi ? 'गेट स्थिति' : 'Status'}</th>
                    <th className="py-3 px-4 text-right">{isHindi ? 'कार्रवाई' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredOutpasses.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-muted-foreground text-xs">
                        {isHindi ? 'कोई अवकाश रिकॉर्ड नहीं मिला।' : 'No leave records found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredOutpasses.map((op) => (
                      <tr key={op.id} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-primary">{op.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-foreground text-sm">{op.studentName}</div>
                          <div className="text-[11px] text-muted-foreground">{op.classSection}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-muted-foreground">{op.room}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{op.purpose}</td>
                        <td className="py-3 px-4">
                          <div className="font-mono text-xs">{op.grantedDate}</div>
                          <span className="text-[10px] font-bold text-sky-400">
                            {op.daysGranted} {op.daysGranted === 1 ? 'Day' : 'Days'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          <div>Out: <span className="text-foreground font-mono">{op.leaveTime}</span></div>
                          <div>Ret: <span className="text-foreground font-mono">{op.returnTime}</span></div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{op.approvedBy}</td>
                        <td className="py-3 px-4 text-center">
                          <VFBadge
                            variant={
                              op.gateStatus === 'Returned'
                                ? 'success'
                                : op.gateStatus === 'Approved - Out'
                                ? 'warning'
                                : 'danger'
                            }
                            className="text-xs rounded-[3px] px-2 py-0.5"
                          >
                            {op.gateStatus}
                          </VFBadge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {op.gateStatus === 'Approved - Out' || op.gateStatus === 'Overdue' ? (
                            <button
                              type="button"
                              onClick={() => handleMarkReturned(op.id, op.studentName)}
                              className="px-2.5 py-1 rounded-[3px] bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              <span>{isHindi ? 'वापसी' : 'Return'}</span>
                            </button>
                          ) : (
                            <span className="text-muted-foreground font-mono text-[11px]">Closed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 4: NIGHT ATTENDANCE (PARITY WITH ATTENDANCE.TSX)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'attendance' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Top Quick Status Bar */}
          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <div className="relative w-full">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={attendanceSearch}
                  onChange={(e) => setAttendanceSearch(e.target.value)}
                  placeholder={isHindi ? 'छात्र, कमरा या एडमिशन नं. खोजें...' : 'Search student, room or ID...'}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1a1a1a] border border-border/70 rounded-[3px] text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {(['All', 'Block A (Boys)', 'Block B (Girls)', 'Block C (Junior)'] as const).map((blk) => (
                  <button
                    key={blk}
                    type="button"
                    onClick={() => setAttendanceBlockFilter(blk)}
                    className={cn(
                      'px-2.5 py-1 rounded-[3px] font-semibold transition-colors cursor-pointer',
                      attendanceBlockFilter === blk
                        ? 'bg-primary/20 text-primary border border-primary/40'
                        : 'text-muted-foreground hover:text-foreground bg-[#1a1a1a] border border-border/60'
                    )}
                  >
                    {blk}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-emerald-400 font-bold">{presentCount} Present</span>
                <span className="text-rose-400 font-bold">{absentCount} Absent</span>
                <span className="text-amber-400 font-bold">{lateCount} Late</span>
                <span className="text-sky-400 font-bold">{leaveCount} Leave</span>
              </div>
            </div>
          </div>

          {/* Roll Call Table with Exact 4-Button Toggle from Attendance.tsx */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-3 px-3 w-14 text-center">{isHindi ? 'फोटो' : 'Photo'}</th>
                    <th className="py-3 px-3 w-28 text-center">{isHindi ? 'कमरा / बेड' : 'Room / Bed'}</th>
                    <th className="py-3 px-4 min-w-[200px]">{isHindi ? 'छात्र का नाम' : 'Student Name & Roll'}</th>
                    <th className="py-3 px-4 min-w-[140px]">{isHindi ? 'ब्लॉक' : 'Block & Floor'}</th>
                    <th className="py-3 px-4 min-w-[150px]">{isHindi ? 'अभिभावक फोन' : 'Guardian Contact'}</th>
                    <th className="py-3 px-4 min-w-[320px] text-center">{isHindi ? 'रात्रि उपस्थिति' : 'Night Verification'}</th>
                    <th className="py-3 px-4 text-right min-w-[120px]">{isHindi ? 'सत्यापन समय' : 'Checked At'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredNightRoster.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground text-xs">
                        {isHindi ? 'कोई छात्र नहीं मिला।' : 'No residents found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredNightRoster.map((r) => (
                      <tr key={r.id} className="hover:bg-[#1a1a1a] transition-colors">
                        {/* 1. Photo */}
                        <td className="py-3 px-3 text-center">
                          <div className="inline-block h-9 w-7.5 rounded-[3px] overflow-hidden bg-muted border border-border shrink-0 shadow-2xs">
                            <img
                              src={r.photoUrl}
                              alt={r.name}
                              style={{ aspectRatio: '19.5 / 25' }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        {/* 2. Room & Bed */}
                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center justify-center font-mono font-bold text-xs px-2 py-1 rounded-[3px] bg-[#1c1c1c] border border-border/80 text-primary">
                            {r.room} · {r.bed}
                          </span>
                        </td>

                        {/* 3. Name & Roll */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-foreground text-sm">{r.name}</div>
                          <div className="text-[11px] text-muted-foreground font-mono">{r.admNo} · {r.classSection}</div>
                        </td>

                        {/* 4. Block & Floor */}
                        <td className="py-3 px-4">
                          <div className="font-medium text-foreground">{r.block}</div>
                          <div className="text-[11px] text-muted-foreground font-mono">{r.floor}</div>
                        </td>

                        {/* 5. Guardian */}
                        <td className="py-3 px-4">
                          <div className="text-xs font-medium text-foreground">{r.guardianName}</div>
                          <div className="text-[11px] text-muted-foreground font-mono">{r.guardianPhone}</div>
                        </td>

                        {/* 6. Exact 4-Way Toggle from attendance.tsx */}
                        <td className="py-3 px-4">
                          <div className="inline-flex items-center h-8 p-0.5 rounded-[4px] bg-[#181818] border border-border gap-1 select-none w-full max-w-[320px]">
                            {/* Present */}
                            <button
                              type="button"
                              onClick={() => handleNightStatusToggle(r.id, 'Present')}
                              className={cn(
                                'flex-1 h-7 rounded-[3px] px-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1',
                                r.status === 'Present'
                                  ? 'bg-emerald-500 text-white shadow-xs font-extrabold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-[#222222]'
                              )}
                              title="Mark Present"
                            >
                              <Check className={cn('h-3.5 w-3.5', r.status === 'Present' ? 'text-white stroke-[3]' : 'text-emerald-500/70')} />
                              <span>{isHindi ? 'उपस्थित' : 'Present'}</span>
                            </button>

                            {/* Absent */}
                            <button
                              type="button"
                              onClick={() => handleNightStatusToggle(r.id, 'Absent')}
                              className={cn(
                                'flex-1 h-7 rounded-[3px] px-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1',
                                r.status === 'Absent'
                                  ? 'bg-rose-500 text-white shadow-xs font-extrabold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-[#222222]'
                              )}
                              title="Mark Absent"
                            >
                              <X className={cn('h-3.5 w-3.5', r.status === 'Absent' ? 'text-white stroke-[3]' : 'text-rose-500/70')} />
                              <span>{isHindi ? 'अनुपस्थित' : 'Absent'}</span>
                            </button>

                            {/* Late */}
                            <button
                              type="button"
                              onClick={() => handleNightStatusToggle(r.id, 'Late')}
                              className={cn(
                                'flex-1 h-7 rounded-[3px] px-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1',
                                r.status === 'Late'
                                  ? 'bg-amber-500 text-black shadow-xs font-extrabold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-[#222222]'
                              )}
                              title="Mark Late"
                            >
                              <Clock className={cn('h-3.5 w-3.5', r.status === 'Late' ? 'text-black stroke-[2.5]' : 'text-amber-500/70')} />
                              <span>{isHindi ? 'विलंबित' : 'Late'}</span>
                            </button>

                            {/* Leave */}
                            <button
                              type="button"
                              onClick={() => handleNightStatusToggle(r.id, 'Leave')}
                              className={cn(
                                'flex-1 h-7 rounded-[3px] px-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1',
                                r.status === 'Leave'
                                  ? 'bg-sky-500 text-white shadow-xs font-extrabold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-[#222222]'
                              )}
                              title="Mark Leave"
                            >
                              <LogOut className={cn('h-3.5 w-3.5', r.status === 'Leave' ? 'text-white stroke-[2.5]' : 'text-sky-500/70')} />
                              <span>{isHindi ? 'अवकाश' : 'Leave'}</span>
                            </button>
                          </div>
                        </td>

                        {/* 7. Checked At */}
                        <td className="py-3 px-4 text-right font-mono text-xs text-muted-foreground">
                          {r.punchTime || '09:30 PM'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          ROOM-WISE BED INSPECTION & ALLOCATION DRAWER (PRESERVED)
          ────────────────────────────────────────────────────────────────────────── */}
      {selectedRoom && (
        <VFDrawer
          isOpen={!!selectedRoom}
          onClose={() => {
            setSelectedRoomNumber(null);
            setAllocatingBedIndex(null);
          }}
          title={`${isHindi ? 'कमरा' : 'Room'} ${selectedRoom.roomNumber} – ${isHindi ? 'बेड व छात्रावासी' : 'Bed Inspection'}`}
          description={`${selectedRoom.block} · ${selectedRoom.floor} · ${selectedRoom.type}`}
          className="max-w-lg"
          footerActions={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-mono text-muted-foreground">
                {selectedRoom.residents.length} / {selectedRoom.totalBeds} {isHindi ? 'बेड अधिग्रहीत' : 'Occupied'}
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
            <div className="p-3 rounded-[4px] bg-[#181818] border border-border/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Warden</span>
                <span className="font-semibold text-foreground">{selectedRoom.warden}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Amenities</span>
                <span className="text-muted-foreground text-[11px]">{selectedRoom.amenities}</span>
              </div>
            </div>

            <div className="space-y-2">
              {Array.from({ length: selectedRoom.totalBeds }).map((_, bedIndex) => {
                const resident = selectedRoom.residents[bedIndex];
                const isFormOpen = allocatingBedIndex === bedIndex;

                return (
                  <div
                    key={bedIndex}
                    className="p-3 rounded-[4px] border border-border/80 bg-[#161616] space-y-2"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-border/60">
                      <span className="font-mono font-bold text-foreground text-xs">
                        Bed #{bedIndex + 1}
                      </span>
                      {resident && (
                        <button
                          type="button"
                          onClick={() => handleVacateBed(selectedRoom.roomNumber, bedIndex, resident.name)}
                          className="px-2 py-0.5 rounded-[3px] bg-rose-950/30 hover:bg-rose-900/50 border border-rose-500/40 text-rose-400 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                          <span>Vacate</span>
                        </button>
                      )}
                    </div>

                    {resident ? (
                      <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
                        <div>
                          <p className="font-bold text-foreground">{resident.name}</p>
                          <p className="text-[10px] text-muted-foreground">{resident.classSection} · {resident.roll}</p>
                        </div>
                        <div>
                          <p className="font-mono text-foreground text-[11px] flex items-center gap-1">
                            <Phone className="h-2.5 w-2.5 text-muted-foreground" />
                            {resident.guardianPhone}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {!isFormOpen ? (
                          <div className="flex items-center justify-between py-1">
                            <span className="text-[11px] text-emerald-400 font-medium">Vacant</span>
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
                              + Allocate
                            </VFButton>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-[3px] bg-[#1a1a1a] border border-border/80 space-y-2 mt-1">
                            <input
                              type="text"
                              value={newStudentName}
                              onChange={(e) => setNewStudentName(e.target.value)}
                              placeholder="Student Full Name"
                              className="w-full px-2.5 py-1 border border-border rounded-[3px] bg-[#141414] text-foreground text-xs focus:outline-none"
                            />
                            <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/60">
                              <VFButton
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-[10px] rounded-[2px]"
                                onClick={() => setAllocatingBedIndex(null)}
                              >
                                Cancel
                              </VFButton>
                              <VFButton
                                size="sm"
                                className="h-6 px-2 text-[10px] rounded-[2px] font-bold"
                                onClick={() => handleConfirmBedAllocation(selectedRoom.roomNumber)}
                              >
                                Confirm
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
          </div>
        </VFDrawer>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          ISSUE OUTPASS MODAL
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDialog
        isOpen={isOutpassModalOpen}
        onClose={() => setIsOutpassModalOpen(false)}
        title={isHindi ? 'नया आउटपास जारी करें' : 'Issue Campus Outpass'}
        description={isHindi ? 'छात्र विवरण व अवकाश समय भरें' : 'Warden-authorized student gate pass'}
        className="max-w-md rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsOutpassModalOpen(false)}
              className="rounded-[3px]"
            >
              Cancel
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleIssueOutpass}
              className="rounded-[3px] font-bold"
            >
              Authorize Outpass
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleIssueOutpass} className="space-y-3 py-1 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">Student Name</label>
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
              <label className="block text-muted-foreground font-semibold mb-1">Room Number</label>
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

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">Purpose</label>
              <select
                value={outpassPurpose}
                onChange={(e) => setOutpassPurpose(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none"
              >
                <option value="Weekend Home Visit">Weekend Home Visit</option>
                <option value="Medical Examination">Medical Examination</option>
                <option value="Coaching / Olympiad">Coaching / Olympiad</option>
                <option value="Family Emergency">Family Emergency</option>
                <option value="Festival Break">Festival Break</option>
              </select>
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">Days Granted</label>
              <input
                type="number"
                min={1}
                max={14}
                value={outpassDays}
                onChange={(e) => setOutpassDays(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">Departure</label>
              <input
                type="text"
                value={outpassLeave}
                onChange={(e) => setOutpassLeave(e.target.value)}
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">Return Time</label>
              <input
                type="text"
                value={outpassReturn}
                onChange={(e) => setOutpassReturn(e.target.value)}
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none font-mono"
              />
            </div>
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
