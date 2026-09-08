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
  VFStatCard,
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
  Filter,
  Moon,
  CalendarDays,
  Flame,
  AlertTriangle,
  FileText,
  Coffee,
  Sparkles,
} from 'lucide-react';

export const Route = createFileRoute('/hostel')({
  component: HostelManagementPage,
});

/* ──────────────────────────────────────────────────────────────────────────
   TYPES & INTERFACES
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
  gateStatus: 'Approved - Out' | 'Returned' | 'Overdue' | 'Pending Approval';
  guardianPhone: string;
  emergencyContact?: string;
  remarks?: string;
}

interface MealItem {
  meal: string;
  hindiMeal: string;
  time: string;
  items: string;
  tag: string;
  calories: string;
  chef: string;
  highlight: string;
}

interface DayMenu {
  dayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  dayName: string;
  hindiDayName: string;
  theme: string;
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
  eveningTea: string;
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
  remarks?: string;
}

/* ──────────────────────────────────────────────────────────────────────────
   INITIAL STATIC DATA
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
    grantedDate: '18 Aug 2026, 04:30 PM',
    daysGranted: 3,
    leaveTime: 'Friday, 05:00 PM',
    returnTime: 'Monday, 07:00 AM',
    approvedBy: 'Warden R. K. Saxena',
    gateStatus: 'Approved - Out',
    guardianPhone: '+91 98111 00123',
    emergencyContact: '+91 98111 99111',
    remarks: 'Parents accompanied check-out at Main Gate.',
  },
  {
    id: 'OUT-882',
    studentName: 'Sneha Patel',
    classSection: 'Class 11-Sci',
    room: 'B-201',
    block: 'Block B (Girls)',
    purpose: 'Coaching / Olympiad',
    grantedDate: '19 Aug 2026, 07:45 AM',
    daysGranted: 1,
    leaveTime: 'Saturday, 08:30 AM',
    returnTime: 'Saturday, 01:30 PM',
    approvedBy: 'Warden Sunita Grover',
    gateStatus: 'Returned',
    guardianPhone: '+91 98111 00345',
    emergencyContact: '+91 98111 88345',
    remarks: 'Returned and biometric punch confirmed at 01:25 PM.',
  },
  {
    id: 'OUT-883',
    studentName: 'Karan Malhotra',
    classSection: 'Class 10-B',
    room: 'A-101',
    block: 'Block A (Boys)',
    purpose: 'Medical Examination',
    grantedDate: '20 Aug 2026, 01:15 PM',
    daysGranted: 1,
    leaveTime: 'Today, 02:00 PM',
    returnTime: 'Today, 06:30 PM',
    approvedBy: 'Chief Warden',
    gateStatus: 'Overdue',
    guardianPhone: '+91 98111 00456',
    emergencyContact: '+91 98111 77456',
    remarks: 'Hospital consultation delayed; warden notified.',
  },
  {
    id: 'OUT-884',
    studentName: 'Aman Sharma',
    classSection: 'Class 6-A',
    room: 'C-301',
    block: 'Block C (Junior)',
    purpose: 'Family Emergency',
    grantedDate: '20 Aug 2026, 11:00 AM',
    daysGranted: 2,
    leaveTime: 'Today, 12:00 PM',
    returnTime: 'Friday, 06:00 PM',
    approvedBy: 'Warden Deepak Joshi',
    gateStatus: 'Approved - Out',
    guardianPhone: '+91 98111 00123',
    emergencyContact: '+91 98111 66123',
    remarks: 'Signed consent letter submitted by grandfather.',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   7-DAY FOOD TIMETABLE DATASET (3 CURATED MEALS PER DAY)
   ────────────────────────────────────────────────────────────────────────── */

const WEEKLY_MESS_SCHEDULE: DayMenu[] = [
  {
    dayId: 'mon',
    dayName: 'Monday',
    hindiDayName: 'सोमवार',
    theme: 'Energy Kickstart & High Protein',
    breakfast: {
      meal: 'Breakfast',
      hindiMeal: 'अल्पाहार',
      time: '07:30 AM – 08:30 AM',
      items: 'Indori Poha with Peanuts & Sev, Steamed Boiled Eggs or Sprouts Salad, Banana, Warm Dairy Milk, Masala Tea & Filter Coffee',
      tag: 'High Energy & Protein',
      calories: '420 kcal',
      chef: 'Chef Ramchandra',
      highlight: 'Iron & Vitamin B rich sprout salad with lemon garnish',
    },
    lunch: {
      meal: 'Lunch',
      hindiMeal: 'दोपहर का भोजन',
      time: '12:30 PM – 01:45 PM',
      items: 'Shahi Paneer in Cashew Gravy, Yellow Dal Tadka with Desi Ghee, Jeera Basmati Rice, Tawa Phulkas with Butter, Cucumber & Beetroot Salad, Boondi Raita',
      tag: 'Balanced North Indian Thali',
      calories: '680 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Farm-fresh cottage cheese delivered same morning',
    },
    dinner: {
      meal: 'Dinner',
      hindiMeal: 'रात्रि भोज',
      time: '08:00 PM – 09:15 PM',
      items: 'Aloo Gobi Matar Adraki, Moong Dal Fry, Steamed Rice, Soft Tawa Rotis, Warm Moong Dal Halwa, Roasted Bikaneri Papad',
      tag: 'Comfort & Digestible',
      calories: '590 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Light spices to aid deep sleep and concentration',
    },
    eveningTea: 'Masala Ginger Tea & Hot Milk with Marie Biscuits & Crunchy Roasted Makhana (05:00 PM – 05:45 PM)',
  },
  {
    dayId: 'tue',
    dayName: 'Tuesday',
    hindiDayName: 'मंगलवार',
    theme: 'South Indian Delights & Iron Boost',
    breakfast: {
      meal: 'Breakfast',
      hindiMeal: 'अल्पाहार',
      time: '07:30 AM – 08:30 AM',
      items: 'Steamed Rava Idli & Medu Vada, Drumstick Sambar, Fresh Coconut & Tangy Tomato Chutney, Hard Boiled Eggs / Fruit Bowl, Milk, Tea & Coffee',
      tag: 'Fermented & Probiotic',
      calories: '410 kcal',
      chef: 'Chef Murugan (South Kitchen)',
      highlight: 'Freshly ground stone-milled batter, low GI index',
    },
    lunch: {
      meal: 'Lunch',
      hindiMeal: 'दोपहर का भोजन',
      time: '12:30 PM – 01:45 PM',
      items: 'Punjabi Rajma Masala, Kashmiri Pulao, Steamed Basmati Rice, Tawa Phulkas with Ghee, Crunchy Onion & Mint Salad, Mix Vegetable Raita',
      tag: 'Rich Plant Protein',
      calories: '660 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Slow-cooked Himalayan red kidney beans simmered 6 hours',
    },
    dinner: {
      meal: 'Dinner',
      hindiMeal: 'रात्रि भोज',
      time: '08:00 PM – 09:15 PM',
      items: 'Mix Vegetable Handi, Masoor Dal Tadka, Steamed Fragrant Rice, Butter Phulkas, Sevaiyan Kheer with Roasted Almonds, Crispy Fryums',
      tag: 'Nutrient Dense',
      calories: '570 kcal',
      chef: 'Chef Ramchandra',
      highlight: 'Seasonal bell peppers, carrots, beans and sweet corn',
    },
    eveningTea: 'Cardamom Tea / Cold Milk with Sweet Corn Chaat & Salted Biscuits (05:00 PM – 05:45 PM)',
  },
  {
    dayId: 'wed',
    dayName: 'Wednesday',
    hindiDayName: 'बुधवार',
    theme: 'Gujarati Specialties & Green Superfoods',
    breakfast: {
      meal: 'Breakfast',
      hindiMeal: 'अल्पाहार',
      time: '07:30 AM – 08:30 AM',
      items: 'Methi Thepla with Fresh Curd & Chunda Pickle, Boiled Eggs / Sprouted Moong Chaat, Fresh Crisp Apple, Warm Haldi Milk, Masala Tea',
      tag: 'Digestive & Immunity',
      calories: '390 kcal',
      chef: 'Chef Ramchandra',
      highlight: 'Fresh fenugreek leaves packed with dietary fiber',
    },
    lunch: {
      meal: 'Lunch',
      hindiMeal: 'दोपहर का भोजन',
      time: '12:30 PM – 01:45 PM',
      items: 'Palak Paneer (Spinach Cottage Cheese), Panchmel Dal (5-Lentil Blend), Green Peas Pulao, Chapati with Ghee, Beetroot Salad, Warm Gulab Jamun',
      tag: 'Iron & Calcium Rich',
      calories: '690 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Pureed blanched spinach retaining essential micronutrients',
    },
    dinner: {
      meal: 'Dinner',
      hindiMeal: 'रात्रि भोज',
      time: '08:00 PM – 09:15 PM',
      items: 'Smoky Baingan Bharta & Jeera Aloo, Arhar Dal Tadka, Steamed Rice, Soft Phulkas, Roasted Green Salad, Roasted Papad',
      tag: 'Traditional Rustic Flavors',
      calories: '540 kcal',
      chef: 'Chef Murugan',
      highlight: 'Clay-oven roasted eggplants tossed in mustard oil tempering',
    },
    eveningTea: 'Lemon Grass Herbal Tea / Fresh Milk with Vegetable Cutlets & Mint Dip (05:00 PM – 05:45 PM)',
  },
  {
    dayId: 'thu',
    dayName: 'Thursday',
    hindiDayName: 'गुरुवार',
    theme: 'Punjabi Hearty Meals & Dairy Rich',
    breakfast: {
      meal: 'Breakfast',
      hindiMeal: 'अल्पाहार',
      time: '07:30 AM – 08:30 AM',
      items: 'Stuffed Aloo & Onion Paratha with Fresh White Makhan, Set Curd, Boiled Eggs / Ripe Papaya Slices, Fresh Buffalo Milk, Tea & Coffee',
      tag: 'Wholesome Hearty Start',
      calories: '460 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'In-house churned white butter, whole wheat dough',
    },
    lunch: {
      meal: 'Lunch',
      hindiMeal: 'दोपहर का भोजन',
      time: '12:30 PM – 01:45 PM',
      items: 'Kadhai Paneer with Bell Peppers, Chana Dal Fry, Jeera Basmati Rice, Butter Phulkas, Fresh Garden Green Salad, Tadka Dahi',
      tag: 'High Protein & Fiber',
      calories: '670 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Coarse pounded coriander seeds and dry whole red chilies',
    },
    dinner: {
      meal: 'Dinner',
      hindiMeal: 'रात्रि भोज',
      time: '08:00 PM – 09:15 PM',
      items: 'Paneer Bhurji with Peas, Dal Makhani, Steamed Rice, Soft Tawa Chapati, Warm Carrot Gajar Halwa (or Suji Halwa), Roasted Papad',
      tag: 'Comfort Feast',
      calories: '620 kcal',
      chef: 'Chef Ramchandra',
      highlight: 'Slow-simmered black lentils cooked overnight with cream',
    },
    eveningTea: 'Masala Chai / Badam Milk with Crispy Mathri & Marie Biscuits (05:00 PM – 05:45 PM)',
  },
  {
    dayId: 'fri',
    dayName: 'Friday',
    hindiDayName: 'शुक्रवार',
    theme: 'Delhi Street Flavors & Nutrition',
    breakfast: {
      meal: 'Breakfast',
      hindiMeal: 'अल्पाहार',
      time: '07:30 AM – 08:30 AM',
      items: 'Vegetable Upma with Roasted Cashews & Coconut Chutney, Boiled Eggs / Fresh Guava, Fresh Milk, Adrak Wali Chai & Coffee',
      tag: 'Light & Nutrient Loaded',
      calories: '380 kcal',
      chef: 'Chef Murugan',
      highlight: 'Coarse semolina roasted with mustard seeds, curry leaves & ghee',
    },
    lunch: {
      meal: 'Lunch',
      hindiMeal: 'दोपहर का भोजन',
      time: '12:30 PM – 01:45 PM',
      items: 'Amritsari Pindi Chhole, Soft Bhature & Steamed Rice, Pickled Baby Onions, Boondi & Mint Raita, Crispy Masala Papad',
      tag: 'Friday Special Lunch',
      calories: '710 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Authentic tea-leaf infused dark chickpea curry',
    },
    dinner: {
      meal: 'Dinner',
      hindiMeal: 'रात्रि भोज',
      time: '08:00 PM – 09:15 PM',
      items: 'Bhindi Do Pyaza (Crispy Okra), Yellow Moong Dal Fry, Steamed Rice, Tawa Phulkas, Besan Ladoo, Fresh Kachumber Salad',
      tag: 'Crisp & Wholesome',
      calories: '550 kcal',
      chef: 'Chef Ramchandra',
      highlight: 'Finely sliced okra shallow-fried to retain crispness',
    },
    eveningTea: 'Ginger Tea & Hot Milk with Hot Baked Samosa / Veg Puff & Sweet Chutney (05:00 PM – 05:45 PM)',
  },
  {
    dayId: 'sat',
    dayName: 'Saturday',
    hindiDayName: 'शनिवार',
    theme: 'Nutritional Powerhouses & Royal Delights',
    breakfast: {
      meal: 'Breakfast',
      hindiMeal: 'अल्पाहार',
      time: '07:30 AM – 08:30 AM',
      items: 'Moong Dal Cheela stuffed with Paneer, Mint-Coriander Chutney, Boiled Eggs / Sprouted Grams, Fresh Orange, Warm Milk & Tea',
      tag: 'Superfood High Protein',
      calories: '400 kcal',
      chef: 'Chef Ramchandra',
      highlight: 'Yellow split lentils ground fresh with ginger and green chilies',
    },
    lunch: {
      meal: 'Lunch',
      hindiMeal: 'दोपहर का भोजन',
      time: '12:30 PM – 01:45 PM',
      items: 'Kashmiri Dum Aloo, Dal Makhani, Steamed Basmati Rice, Tawa Phulkas with Butter, Fresh Kachumber Salad, Plain Dahi',
      tag: 'Creamy & Satisfying',
      calories: '650 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Deep fried baby potatoes pricked and simmered in fennel yogurt gravy',
    },
    dinner: {
      meal: 'Dinner',
      hindiMeal: 'रात्रि भोज',
      time: '08:00 PM – 09:15 PM',
      items: 'Shahi Malai Kofta in Velvety Gravy, Yellow Arhar Dal Tadka, Steamed Fragrant Rice, Butter Rotis, Rice Kheer with Saffron, Roasted Papad',
      tag: 'Weekend Royalty Menu',
      calories: '640 kcal',
      chef: 'Head Chef Khemraj Sharma',
      highlight: 'Paneer and potato dumplings melt in mouth with saffron touch',
    },
    eveningTea: 'Masala Chai / Warm Chocolate Milk with Banana Cake & Glucose Biscuits (05:00 PM – 05:45 PM)',
  },
  {
    dayId: 'sun',
    dayName: 'Sunday',
    hindiDayName: 'रविवार',
    theme: 'Sunday Grand Banquet & Rest Day',
    breakfast: {
      meal: 'Breakfast',
      hindiMeal: 'अल्पाहार',
      time: '08:00 AM – 09:30 AM (Extended)',
      items: 'Crispy Mysore Masala Dosa with Potato Roast, Drumstick Sambar, Trio of Chutneys (Coconut, Tomato, Peanut), Boiled Eggs, Fruit Platter, South Indian Filter Coffee',
      tag: 'Sunday Grand Brunch',
      calories: '480 kcal',
      chef: 'Chef Murugan & Master Team',
      highlight: 'Live hot dosa counter made to order for all hostel students',
    },
    lunch: {
      meal: 'Lunch',
      hindiMeal: 'दोपहर का भोजन',
      time: '12:45 PM – 02:15 PM',
      items: 'Royal Paneer Lababdar, Hyderabadi Dum Vegetable Biryani, Mirchi Ka Salan, Yellow Dal Tadka, Garlic Butter Naan & Phulkas, Spiced Burani Raita, Royal Rasgulla & Ice Cream',
      tag: 'Grand Sunday Feast',
      calories: '780 kcal',
      chef: 'Head Chef Khemraj Sharma & Team',
      highlight: 'Dum cooked long-grain aged basmati layered with caramelized onions & mint',
    },
    dinner: {
      meal: 'Dinner',
      hindiMeal: 'रात्रि भोज',
      time: '08:00 PM – 09:15 PM',
      items: 'Mumbai Pav Bhaji with Butter Toasted Ladi Pav OR Comfort Dal Khichdi Tadka, Fresh Green Salad, Roasted Papad, Warm Sweet Saffron Milk',
      tag: 'Light & Comforting Finish',
      calories: '560 kcal',
      chef: 'Chef Ramchandra',
      highlight: 'Warm sweet milk provided before night study hours',
    },
    eveningTea: 'Special Sunday Cold Coffee / Hot Elaichi Tea with Veg Sandwich & Cookies (05:00 PM – 05:45 PM)',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   NIGHT DORM ATTENDANCE ROSTER (STUDENT-BY-STUDENT ROLL CALL)
   ────────────────────────────────────────────────────────────────────────── */

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
    remarks: 'Authorized weekend leave to home.',
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
    punchTime: '09:48 PM (Pending)',
    verifiedBy: 'Warden Saxena',
    remarks: 'Outpass delayed for medical check.',
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
    punchTime: '09:15 PM Biometric',
    verifiedBy: 'Warden Saxena',
    remarks: 'Present in room studying for terminal exams.',
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
    punchTime: '09:22 PM Biometric',
    verifiedBy: 'Warden Saxena',
    remarks: 'Senior room checked and light curfew noted.',
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
    punchTime: '09:10 PM Biometric',
    verifiedBy: 'Warden Grover',
    remarks: 'Verified present in dormitory.',
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
    punchTime: '01:25 PM (Returned)',
    verifiedBy: 'Warden Grover',
    remarks: 'Returned from coaching on time.',
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
    punchTime: '09:25 PM Biometric',
    verifiedBy: 'Warden Grover',
    remarks: 'Study lamp on; present.',
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
    remarks: 'Missing during 09:30 PM inspection; calling guardian.',
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
    remarks: 'On authorized family emergency outpass.',
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
    punchTime: '09:00 PM Biometric',
    verifiedBy: 'Warden Joshi',
    remarks: 'Junior resident in bed; lights out verified.',
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
    punchTime: '09:05 PM Biometric',
    verifiedBy: 'Warden Joshi',
    remarks: 'Present in dorm reading.',
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   MAIN HOSTEL MANAGEMENT COMPONENT
   ────────────────────────────────────────────────────────────────────────── */

function HostelManagementPage() {
  const { lang } = useTranslation();
  const { addNotification } = useGlobalStore();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'छात्रावास प्रबंधन' : 'Hostel & Dormitory') + ' – VidyaFloww';
  }, [isHindi]);

  // Tab State: 4 dedicated tabs
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
  const [newClassSection, setNewClassSection] = React.useState('Class 10-A');
  const [newGuardianPhone, setNewGuardianPhone] = React.useState('');

  // Issue Outpass Modal
  const [isOutpassModalOpen, setIsOutpassModalOpen] = React.useState(false);
  const [outpassStudent, setOutpassStudent] = React.useState('');
  const [outpassRoom, setOutpassRoom] = React.useState('A-101');
  const [outpassPurpose, setOutpassPurpose] = React.useState<OutpassRecord['purpose']>('Weekend Home Visit');
  const [outpassDays, setOutpassDays] = React.useState<number>(2);
  const [outpassLeave, setOutpassLeave] = React.useState('Friday, 05:00 PM');
  const [outpassReturn, setOutpassReturn] = React.useState('Sunday, 07:00 PM');
  const [outpassGuardianPhone, setOutpassGuardianPhone] = React.useState('+91 98111 00123');

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

  // Issue Outpass / Grant Leave
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
      grantedDate: 'Today, 05:00 PM',
      daysGranted: outpassDays,
      leaveTime: outpassLeave,
      returnTime: outpassReturn,
      approvedBy: 'Chief Hostel Warden',
      gateStatus: 'Approved - Out',
      guardianPhone: outpassGuardianPhone,
      remarks: 'Granted via Warden portal with guardian notification.',
    };

    setOutpasses((prev) => [newTicket, ...prev]);

    // Update Night Attendance status if student matches
    setNightRoster((prev) =>
      prev.map((s) => (s.name.toLowerCase() === outpassStudent.trim().toLowerCase() ? { ...s, status: 'Leave', punchTime: `Outpass ${newTicket.id}` } : s))
    );

    setIsOutpassModalOpen(false);
    setOutpassStudent('');

    addNotification({
      title: isHindi ? 'अवकाश / आउटपास स्वीकृत' : 'Outpass / Leave Granted',
      description: `Pass ${newTicket.id} issued for ${newTicket.studentName} (${newTicket.daysGranted} days).`,
      type: 'success',
    });
  };

  // Mark Outpass as Returned
  const handleMarkReturned = (outpassId: string, studentName: string) => {
    setOutpasses((prev) =>
      prev.map((op) => (op.id === outpassId ? { ...op, gateStatus: 'Returned', remarks: 'Gate biometric scan confirmed return.' } : op))
    );

    // Update night roster status back to Present
    setNightRoster((prev) =>
      prev.map((s) => (s.name.toLowerCase() === studentName.toLowerCase() ? { ...s, status: 'Present', punchTime: 'Returned Biometric' } : s))
    );

    addNotification({
      title: isHindi ? 'वापसी दर्ज की गई' : 'Student Marked Returned',
      description: `${studentName} has checked back into the hostel.`,
      type: 'success',
    });
  };

  // Night Attendance Status Toggle
  const handleNightStatusToggle = (studentId: string, newStatus: NightAttendanceRecord['status']) => {
    setNightRoster((prev) =>
      prev.map((item) => {
        if (item.id === studentId) {
          const punchTime =
            newStatus === 'Present'
              ? '10:00 PM Checked'
              : newStatus === 'Late'
              ? '10:15 PM Pending'
              : newStatus === 'Absent'
              ? 'Unaccounted'
              : 'Authorized Leave';
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

  // Mark All In-Dorm Present
  const handleMarkAllPresent = () => {
    setNightRoster((prev) =>
      prev.map((item) => {
        if (item.status === 'Leave') return item; // keep on-leave students
        return {
          ...item,
          status: 'Present',
          punchTime: '10:00 PM Roll Call',
          verifiedBy: 'Chief Warden',
        };
      })
    );

    addNotification({
      title: isHindi ? 'सभी उपस्थित मार्क किए गए' : 'All Residents Marked Present',
      description: 'Hostel roll call updated for all available residents.',
      type: 'success',
    });
  };

  // Send Alert for Missing Residents
  const handleSendMissingAlert = () => {
    const missing = nightRoster.filter((r) => r.status === 'Absent' || r.status === 'Late');
    if (missing.length === 0) {
      addNotification({
        title: isHindi ? 'कोई छात्र अनुपस्थित नहीं' : 'All Students Accounted For',
        description: 'Zero residents are absent or late tonight.',
        type: 'info',
      });
      return;
    }

    addNotification({
      title: isHindi ? 'वार्डन व अभिभावक अलर्ट प्रेषित' : 'Emergency SMS & Warden Alert Dispatched',
      description: `Alert sent for ${missing.length} unaccounted/late residents to respective guardians.`,
      type: 'warning',
    });
  };

  // Stats Calculations
  const totalBeds = rooms.reduce((acc, r) => acc + r.totalBeds, 0);
  const occupiedBeds = rooms.reduce((acc, r) => acc + r.residents.length, 0);
  const vacantBeds = totalBeds - occupiedBeds;

  const presentDormCount = nightRoster.filter((s) => s.status === 'Present').length;
  const absentDormCount = nightRoster.filter((s) => s.status === 'Absent').length;
  const lateDormCount = nightRoster.filter((s) => s.status === 'Late').length;
  const leaveDormCount = nightRoster.filter((s) => s.status === 'Leave').length;
  const dormOccupancyRate = ((presentDormCount / nightRoster.length) * 100).toFixed(1);

  const activeLeavesCount = outpasses.filter((op) => op.gateStatus === 'Approved - Out').length;
  const returnedLeavesCount = outpasses.filter((op) => op.gateStatus === 'Returned').length;
  const overdueLeavesCount = outpasses.filter((op) => op.gateStatus === 'Overdue').length;

  // Filtered Rooms
  const filteredRooms = rooms.filter((r) => roomBlockFilter === 'All' || r.block === roomBlockFilter);

  // Filtered Outpasses
  const filteredOutpasses = outpasses.filter((op) => {
    const matchesStatus = leaveStatusFilter === 'All' || op.gateStatus === leaveStatusFilter;
    const matchesSearch =
      op.studentName.toLowerCase().includes(leaveSearch.toLowerCase()) ||
      op.room.toLowerCase().includes(leaveSearch.toLowerCase()) ||
      op.id.toLowerCase().includes(leaveSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered Attendance Roster
  const filteredNightRoster = nightRoster.filter((s) => {
    const matchesBlock = attendanceBlockFilter === 'All' || s.block === attendanceBlockFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      s.room.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      s.admNo.toLowerCase().includes(attendanceSearch.toLowerCase());
    return matchesBlock && matchesSearch;
  });

  const selectedDayMenu = WEEKLY_MESS_SCHEDULE.find((d) => d.dayId === selectedDayId) || WEEKLY_MESS_SCHEDULE[0];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-4">
      {/* ── UNIFIED HEADER WITH 4 DEDICATED TABS ── */}
      <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: 4 Specialized Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70 shrink-0">
            <button
              type="button"
              id="tab-rooms"
              onClick={() => setActiveTab('rooms')}
              className={`px-3 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'rooms'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bed className="h-4 w-4 text-primary" />
              <span>{isHindi ? 'कमरा व बेड' : 'Rooms & Beds'}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] bg-primary/20 text-primary">
                {occupiedBeds}/{totalBeds}
              </span>
            </button>

            <button
              type="button"
              id="tab-mess"
              onClick={() => setActiveTab('mess')}
              className={`px-3 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'mess'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Utensils className="h-4 w-4 text-amber-400" />
              <span>{isHindi ? '7-दिवसीय भोजन मेनू' : '7-Day Food Timetable'}</span>
              <VFBadge variant="outline" className="text-[10px] rounded-[2px] px-1 py-0 border-amber-500/40 text-amber-400">
                3 Meals/Day
              </VFBadge>
            </button>

            <button
              type="button"
              id="tab-leaves"
              onClick={() => setActiveTab('leaves')}
              className={`px-3 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'leaves'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LogOut className="h-4 w-4 text-sky-400" />
              <span>{isHindi ? 'अवकाश व आउटपास पंजिका' : 'Leave Ledger'}</span>
              {activeLeavesCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] bg-sky-950 border border-sky-500/40 text-sky-400 font-bold">
                  {activeLeavesCount} {isHindi ? 'बाहर' : 'Out'}
                </span>
              )}
            </button>

            <button
              type="button"
              id="tab-attendance"
              onClick={() => setActiveTab('attendance')}
              className={`px-3 py-1.5 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'attendance'
                  ? 'bg-[#242424] text-foreground shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <CheckSquare className="h-4 w-4 text-emerald-400" />
              <span>{isHindi ? 'रात्रि उपस्थिति रोल कॉल' : 'Night Dorm Attendance'}</span>
              {absentDormCount > 0 ? (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] bg-rose-950 border border-rose-500/40 text-rose-400 font-bold animate-pulse">
                  {absentDormCount} {isHindi ? 'अनुपस्थित' : 'Missing'}
                </span>
              ) : (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                  {dormOccupancyRate}%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Right: Contextual Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {activeTab === 'leaves' && (
            <VFButton
              size="sm"
              onClick={() => setIsOutpassModalOpen(true)}
              className="h-8 px-3.5 text-xs font-bold shadow-xs rounded-[4px]"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
            >
              {isHindi ? '+ नया अवकाश / आउटपास' : '+ Grant Leave / Outpass'}
            </VFButton>
          )}

          {activeTab === 'attendance' && (
            <div className="flex items-center gap-2">
              <VFButton
                size="sm"
                variant="outline"
                onClick={handleSendMissingAlert}
                className="h-8 px-3 text-xs font-bold rounded-[4px] border-rose-500/40 text-rose-400 hover:bg-rose-950/30"
                leftIcon={<AlertTriangle className="h-3.5 w-3.5" />}
              >
                {isHindi ? 'मिसिंग अलर्ट प्रेषित करें' : 'Alert Unaccounted'}
              </VFButton>
              <VFButton
                size="sm"
                onClick={handleMarkAllPresent}
                className="h-8 px-3.5 text-xs font-bold rounded-[4px] bg-emerald-600 hover:bg-emerald-500 text-white"
                leftIcon={<Check className="h-3.5 w-3.5 stroke-[3]" />}
              >
                {isHindi ? 'सभी उपस्थित मार्क करें' : 'Mark All Present'}
              </VFButton>
            </div>
          )}

          {activeTab === 'mess' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                {isHindi ? 'स्वच्छता रेटिंग: 4.9 ★' : 'FSSAI Hygiene: 4.9 ★'}
              </span>
              <div className="flex items-center border border-border/80 rounded-[4px] p-0.5 bg-[#181818]">
                <button
                  type="button"
                  onClick={() => setFoodViewMode('day')}
                  className={cn(
                    'px-2 py-1 text-[11px] font-bold rounded-[2px] transition-colors',
                    foodViewMode === 'day' ? 'bg-[#282828] text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isHindi ? 'दैनिक दृश्य' : 'Day View'}
                </button>
                <button
                  type="button"
                  onClick={() => setFoodViewMode('week')}
                  className={cn(
                    'px-2 py-1 text-[11px] font-bold rounded-[2px] transition-colors',
                    foodViewMode === 'week' ? 'bg-[#282828] text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isHindi ? 'साप्ताहिक ग्रिड' : 'Weekly Grid'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                {vacantBeds} {isHindi ? 'बेड उपलब्ध' : 'Beds Vacant'}
              </span>
              <VFButton
                size="sm"
                variant="outline"
                onClick={() => setIsOutpassModalOpen(true)}
                className="h-8 px-3 text-xs font-bold rounded-[4px]"
                leftIcon={<LogOut className="h-3.5 w-3.5" />}
              >
                {isHindi ? 'आउटपास जारी करें' : 'Issue Outpass'}
              </VFButton>
            </div>
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          TAB 1: ROOMS & BEDS MATRIX (PRESERVED & ENRICHED)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'rooms' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Top Filter Bar */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-[4px] bg-[#141414] border border-border/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                {isHindi ? 'ब्लॉक फिल्टर:' : 'Hostel Block:'}
              </span>
              {(['All', 'Block A (Boys)', 'Block B (Girls)', 'Block C (Junior)'] as const).map((blk) => (
                <button
                  key={blk}
                  type="button"
                  onClick={() => setRoomBlockFilter(blk)}
                  className={cn(
                    'px-2.5 py-1 rounded-[3px] text-xs font-semibold transition-colors cursor-pointer',
                    roomBlockFilter === blk
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'text-muted-foreground hover:text-foreground bg-[#1a1a1a] border border-border/60'
                  )}
                >
                  {blk}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-muted-foreground">
                {isHindi ? 'कुल कमरे:' : 'Rooms:'} <strong className="text-foreground">{filteredRooms.length}</strong>
              </span>
              <span className="text-emerald-400">
                {isHindi ? 'रिक्त बेड:' : 'Vacant:'} <strong>{vacantBeds}</strong>
              </span>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRooms.map((rm) => {
              const occupied = rm.residents.length;
              const isFull = occupied >= rm.totalBeds;
              const hasVacancy = occupied < rm.totalBeds;

              return (
                <div
                  key={rm.roomNumber}
                  className="p-4 rounded-[4px] border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between group"
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

                    <div className="text-xs text-muted-foreground space-y-1 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/90 font-medium">{rm.block}</span>
                        <span className="font-mono text-xs">{rm.floor}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{rm.warden}</p>
                    </div>

                    {/* Bed-by-Bed Occupant Slot Preview */}
                    <div className="space-y-1.5 pt-2 border-t border-border/60">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {isHindi ? 'बेड आवंटन स्थिति' : 'Bed Allocation Status'}
                      </div>
                      <div className="space-y-1.5">
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
                                  {resident ? resident.name : (isHindi ? 'रिक्त बेड' : 'Vacant Bed Space')}
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
          TAB 2: 7-DAY FOOD TIMETABLE (3 DISTINCT CURATED MEALS PER DAY)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'mess' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Day Selector Pills Bar */}
          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1 shrink-0">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {isHindi ? 'दिन चुनें:' : 'Select Day:'}
              </span>
              {WEEKLY_MESS_SCHEDULE.map((d) => {
                const isSelected = selectedDayId === d.dayId;
                return (
                  <button
                    key={d.dayId}
                    type="button"
                    onClick={() => setSelectedDayId(d.dayId)}
                    className={cn(
                      'px-3 py-1.5 rounded-[3px] text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer',
                      isSelected
                        ? 'bg-amber-500 text-black shadow-xs font-extrabold'
                        : 'bg-[#1a1a1a] text-muted-foreground hover:text-foreground border border-border/70'
                    )}
                  >
                    <span>{d.dayName}</span>
                    <span className={cn('text-[10px] font-medium opacity-80', isSelected ? 'text-black' : 'text-muted-foreground')}>
                      {d.hindiDayName}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <VFBadge variant="outline" className="text-xs font-mono rounded-[3px] border-amber-500/40 text-amber-400">
                {selectedDayMenu.theme}
              </VFBadge>
            </div>
          </div>

          {/* VIEW MODE 1: DAY VIEW (3 CURATED MEAL CARDS) */}
          {foodViewMode === 'day' && (
            <div className="space-y-4">
              {/* Daily Overview Hero Card */}
              <div className="p-3.5 rounded-[4px] bg-gradient-to-r from-[#181818] via-[#151515] to-[#181818] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      {selectedDayMenu.dayName} ({selectedDayMenu.hindiDayName}) — {selectedDayMenu.theme}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedDayMenu.eveningTea}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <VFBadge variant="success" className="text-xs font-mono rounded-[3px]">
                    FSSAI Certified · 4.9 ★
                  </VFBadge>
                </div>
              </div>

              {/* 3 Dedicated Meal Cards: Breakfast, Lunch, Dinner */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* 1. BREAKFAST */}
                <div className="p-4 rounded-[4px] border border-border/80 bg-card hover:border-amber-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Coffee className="h-4 w-4 text-amber-400" />
                        <div>
                          <h4 className="text-sm font-bold text-foreground">
                            {selectedDayMenu.breakfast.meal}
                          </h4>
                          <span className="text-[11px] text-muted-foreground">
                            {selectedDayMenu.breakfast.hindiMeal}
                          </span>
                        </div>
                      </div>
                      <VFBadge variant="outline" className="text-[10px] rounded-[3px] border-amber-500/40 text-amber-400">
                        {selectedDayMenu.breakfast.tag}
                      </VFBadge>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-y border-border/60 text-xs font-mono text-muted-foreground mb-3">
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <Clock className="h-3 w-3" />
                        {selectedDayMenu.breakfast.time}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Flame className="h-3 w-3" />
                        {selectedDayMenu.breakfast.calories}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-foreground leading-relaxed font-medium">
                        {selectedDayMenu.breakfast.items}
                      </p>
                      <div className="p-2 rounded-[3px] bg-[#161616] border border-border/60 text-[11px] text-muted-foreground">
                        <strong className="text-foreground block text-[10px] uppercase tracking-wider mb-0.5">
                          {isHindi ? 'पोषण विशेषता' : 'Nutritional Highlight:'}
                        </strong>
                        {selectedDayMenu.breakfast.highlight}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{isHindi ? 'प्रभारी रसोइया:' : 'Chef In-Charge:'}</span>
                    <span className="font-semibold text-foreground">{selectedDayMenu.breakfast.chef}</span>
                  </div>
                </div>

                {/* 2. LUNCH */}
                <div className="p-4 rounded-[4px] border border-border/80 bg-card hover:border-amber-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-emerald-400" />
                        <div>
                          <h4 className="text-sm font-bold text-foreground">
                            {selectedDayMenu.lunch.meal}
                          </h4>
                          <span className="text-[11px] text-muted-foreground">
                            {selectedDayMenu.lunch.hindiMeal}
                          </span>
                        </div>
                      </div>
                      <VFBadge variant="outline" className="text-[10px] rounded-[3px] border-emerald-500/40 text-emerald-400">
                        {selectedDayMenu.lunch.tag}
                      </VFBadge>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-y border-border/60 text-xs font-mono text-muted-foreground mb-3">
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <Clock className="h-3 w-3" />
                        {selectedDayMenu.lunch.time}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Flame className="h-3 w-3" />
                        {selectedDayMenu.lunch.calories}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-foreground leading-relaxed font-medium">
                        {selectedDayMenu.lunch.items}
                      </p>
                      <div className="p-2 rounded-[3px] bg-[#161616] border border-border/60 text-[11px] text-muted-foreground">
                        <strong className="text-foreground block text-[10px] uppercase tracking-wider mb-0.5">
                          {isHindi ? 'पोषण विशेषता' : 'Nutritional Highlight:'}
                        </strong>
                        {selectedDayMenu.lunch.highlight}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{isHindi ? 'प्रभारी रसोइया:' : 'Chef In-Charge:'}</span>
                    <span className="font-semibold text-foreground">{selectedDayMenu.lunch.chef}</span>
                  </div>
                </div>

                {/* 3. DINNER */}
                <div className="p-4 rounded-[4px] border border-border/80 bg-card hover:border-amber-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-sky-400" />
                        <div>
                          <h4 className="text-sm font-bold text-foreground">
                            {selectedDayMenu.dinner.meal}
                          </h4>
                          <span className="text-[11px] text-muted-foreground">
                            {selectedDayMenu.dinner.hindiMeal}
                          </span>
                        </div>
                      </div>
                      <VFBadge variant="outline" className="text-[10px] rounded-[3px] border-sky-500/40 text-sky-400">
                        {selectedDayMenu.dinner.tag}
                      </VFBadge>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-y border-border/60 text-xs font-mono text-muted-foreground mb-3">
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <Clock className="h-3 w-3" />
                        {selectedDayMenu.dinner.time}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <Flame className="h-3 w-3" />
                        {selectedDayMenu.dinner.calories}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-foreground leading-relaxed font-medium">
                        {selectedDayMenu.dinner.items}
                      </p>
                      <div className="p-2 rounded-[3px] bg-[#161616] border border-border/60 text-[11px] text-muted-foreground">
                        <strong className="text-foreground block text-[10px] uppercase tracking-wider mb-0.5">
                          {isHindi ? 'पोषण विशेषता' : 'Nutritional Highlight:'}
                        </strong>
                        {selectedDayMenu.dinner.highlight}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{isHindi ? 'प्रभारी रसोइया:' : 'Chef In-Charge:'}</span>
                    <span className="font-semibold text-foreground">{selectedDayMenu.dinner.chef}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: FULL WEEK MATRIX GRID */}
          {foodViewMode === 'week' && (
            <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                      <th className="py-3 px-4 w-32">{isHindi ? 'दिन' : 'Day'}</th>
                      <th className="py-3 px-4 w-[28%]">
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Coffee className="h-3.5 w-3.5" />
                          <span>Breakfast (07:30–08:30)</span>
                        </div>
                      </th>
                      <th className="py-3 px-4 w-[34%]">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Utensils className="h-3.5 w-3.5" />
                          <span>Lunch (12:30–01:45)</span>
                        </div>
                      </th>
                      <th className="py-3 px-4 w-[34%]">
                        <div className="flex items-center gap-1.5 text-sky-400">
                          <Moon className="h-3.5 w-3.5" />
                          <span>Dinner (08:00–09:15)</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {WEEKLY_MESS_SCHEDULE.map((day) => (
                      <tr key={day.dayId} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-3 px-4 align-top font-bold text-foreground">
                          <div>{day.dayName}</div>
                          <div className="text-[11px] text-muted-foreground">{day.hindiDayName}</div>
                          <VFBadge variant="outline" className="text-[9px] rounded-[2px] mt-1 px-1 py-0">
                            {day.theme.split(' ')[0]}
                          </VFBadge>
                        </td>
                        <td className="py-3 px-4 align-top text-xs text-foreground leading-relaxed">
                          <div className="font-medium">{day.breakfast.items}</div>
                          <div className="text-[10px] text-amber-400/90 font-mono mt-1">
                            {day.breakfast.calories} · {day.breakfast.tag}
                          </div>
                        </td>
                        <td className="py-3 px-4 align-top text-xs text-foreground leading-relaxed">
                          <div className="font-medium">{day.lunch.items}</div>
                          <div className="text-[10px] text-emerald-400/90 font-mono mt-1">
                            {day.lunch.calories} · {day.lunch.tag}
                          </div>
                        </td>
                        <td className="py-3 px-4 align-top text-xs text-foreground leading-relaxed">
                          <div className="font-medium">{day.dinner.items}</div>
                          <div className="text-[10px] text-sky-400/90 font-mono mt-1">
                            {day.dinner.calories} · {day.dinner.tag}
                          </div>
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
          TAB 3: LEAVE & OUTPASS LEDGER (DEDICATED FULL TRACKER)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'leaves' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Top Leave Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <VFStatCard
              title={isHindi ? 'सक्रिय अवकाश पर' : 'Active Outpass Leaves'}
              value={activeLeavesCount}
              description={isHindi ? 'वर्तमान में परिसर से बाहर' : 'Currently off campus'}
              icon={<LogOut className="h-4 w-4 text-amber-400" />}
              accentColor="amber"
            />
            <VFStatCard
              title={isHindi ? 'आज वापस लौटे' : 'Returned Students'}
              value={returnedLeavesCount}
              description={isHindi ? 'बायोमेट्रिक गेट चेक-इन पूर्ण' : 'Biometric gate punch verified'}
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              accentColor="emerald"
            />
            <VFStatCard
              title={isHindi ? 'विलंबित वापसी (ओवरड्यू)' : 'Overdue Returns'}
              value={overdueLeavesCount}
              description={isHindi ? 'अपेक्षित समय से विलंब' : 'Late check-in alerts triggered'}
              icon={<AlertTriangle className="h-4 w-4 text-rose-400" />}
              accentColor="rose"
            />
            <VFStatCard
              title={isHindi ? 'कुल स्वीकृत अवकाश' : 'Total Leave Records'}
              value={outpasses.length}
              description={isHindi ? 'इस माह की पंजिका' : 'Logged in official register'}
              icon={<FileText className="h-4 w-4 text-primary" />}
              accentColor="primary"
            />
          </div>

          {/* Filter & Search Bar */}
          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={leaveSearch}
                  onChange={(e) => setLeaveSearch(e.target.value)}
                  placeholder={isHindi ? 'छात्र, कमरा या पास आईडी खोजें...' : 'Search student, room or pass ID...'}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#1a1a1a] border border-border/70 rounded-[3px] text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                <Filter className="h-3 w-3" />
                {isHindi ? 'स्थिति:' : 'Status:'}
              </span>
              {(['All', 'Approved - Out', 'Returned', 'Overdue'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setLeaveStatusFilter(st)}
                  className={cn(
                    'px-2.5 py-1 rounded-[3px] text-xs font-semibold transition-colors cursor-pointer',
                    leaveStatusFilter === st
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'text-muted-foreground hover:text-foreground bg-[#1a1a1a] border border-border/60'
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Outpass Table */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-3 px-4">{isHindi ? 'पास आईडी' : 'Pass ID'}</th>
                    <th className="py-3 px-4">{isHindi ? 'छात्रावासी छात्र' : 'Student & Class'}</th>
                    <th className="py-3 px-4">{isHindi ? 'कमरा व ब्लॉक' : 'Room & Block'}</th>
                    <th className="py-3 px-4">{isHindi ? 'अवकाश प्रयोजन' : 'Purpose'}</th>
                    <th className="py-3 px-4">{isHindi ? 'अवकाश स्वीकृति व अवधि' : 'Granted Date & Days'}</th>
                    <th className="py-3 px-4">{isHindi ? 'प्रस्थान व वापसी समय' : 'Departure & Return'}</th>
                    <th className="py-3 px-4">{isHindi ? 'स्वीकृतिकर्ता' : 'Approved By'}</th>
                    <th className="py-3 px-4 text-center">{isHindi ? 'गेट स्थिति' : 'Gate Status'}</th>
                    <th className="py-3 px-4 text-right">{isHindi ? 'कार्रवाई' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredOutpasses.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-muted-foreground text-xs">
                        {isHindi ? 'कोई अवकाश रिकॉर्ड नहीं मिला।' : 'No leave records match the filter criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredOutpasses.map((op) => (
                      <tr key={op.id} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-primary text-xs">{op.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-foreground text-sm">{op.studentName}</div>
                          <div className="text-[11px] text-muted-foreground">{op.classSection}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-xs font-semibold text-foreground">{op.room}</span>
                          <div className="text-[10px] text-muted-foreground">{op.block.split(' ')[0]}</div>
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground">
                          <span className="px-2 py-0.5 rounded-[2px] bg-[#1a1a1a] border border-border/70 text-[11px]">
                            {op.purpose}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-mono text-xs text-foreground">{op.grantedDate}</div>
                          <span className="inline-block mt-0.5 text-[10px] font-bold text-sky-400 bg-sky-950/40 px-1.5 py-0.2 rounded border border-sky-500/30">
                            {op.daysGranted} {op.daysGranted === 1 ? 'Day' : 'Days'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs text-muted-foreground">
                            Out: <span className="font-mono text-foreground font-medium">{op.leaveTime}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Ret: <span className="font-mono text-foreground font-medium">{op.returnTime}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{op.approvedBy}</td>
                        <td className="py-3 px-4 text-center">
                          <VFBadge
                            variant={
                              op.gateStatus === 'Returned'
                                ? 'success'
                                : op.gateStatus === 'Approved - Out'
                                ? 'warning'
                                : op.gateStatus === 'Overdue'
                                ? 'danger'
                                : 'outline'
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
                              title="Mark Student Returned to Hostel"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              <span>{isHindi ? 'वापसी दर्ज' : 'Returned'}</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-muted-foreground font-mono">
                              {isHindi ? 'गेट पर पूर्ण' : 'Closed'}
                            </span>
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
          TAB 4: NIGHT DORM ATTENDANCE / ROLL CALL (PATTERNED FROM ATTENDANCE PAGE)
          ────────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'attendance' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-4">
          {/* Top Night Roll Call Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <VFStatCard
              title={isHindi ? 'कमरे में उपस्थित' : 'In-Dorm Present'}
              value={`${presentDormCount} / ${nightRoster.length}`}
              description={isHindi ? 'शयन कक्ष में मौजूद' : 'In-dorm verified'}
              icon={<Check className="h-4 w-4 text-emerald-400 stroke-[3]" />}
              accentColor="emerald"
            />
            <VFStatCard
              title={isHindi ? 'अनुपस्थित / मिसिंग' : 'Missing / Unaccounted'}
              value={absentDormCount}
              description={isHindi ? 'रोल कॉल पर अनुपस्थित' : 'Alert warden immediately'}
              icon={<X className="h-4 w-4 text-rose-400 stroke-[3]" />}
              accentColor="rose"
            />
            <VFStatCard
              title={isHindi ? 'विलंबित चेक-इन' : 'Late Check-In'}
              value={lateDormCount}
              description={isHindi ? 'गेट पर लंबित आगमन' : 'Delayed arrival logged'}
              icon={<Clock className="h-4 w-4 text-amber-400" />}
              accentColor="amber"
            />
            <VFStatCard
              title={isHindi ? 'स्वीकृत अवकाश पर' : 'On Authorized Leave'}
              value={leaveDormCount}
              description={isHindi ? 'वैध गेट पास धारक' : 'Valid outpass passholder'}
              icon={<LogOut className="h-4 w-4 text-sky-400" />}
              accentColor="blue"
            />
            <VFStatCard
              title={isHindi ? 'रात्रि उपस्थिति दर' : 'Night Occupancy'}
              value={`${dormOccupancyRate}%`}
              description={isHindi ? 'कुल आवासीय दर' : 'Overall in-room rate'}
              icon={<Moon className="h-4 w-4 text-purple-400" />}
              accentColor="purple"
            />
          </div>

          {/* Action & Filter Controls */}
          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={attendanceSearch}
                  onChange={(e) => setAttendanceSearch(e.target.value)}
                  placeholder={isHindi ? 'नाम, कमरा या एडमिशन नं. से खोजें...' : 'Search student, room or roll...'}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#1a1a1a] border border-border/70 rounded-[3px] text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1 shrink-0">
                <Filter className="h-3 w-3" />
                {isHindi ? 'ब्लॉक:' : 'Block:'}
              </span>
              {(['All', 'Block A (Boys)', 'Block B (Girls)', 'Block C (Junior)'] as const).map((blk) => (
                <button
                  key={blk}
                  type="button"
                  onClick={() => setAttendanceBlockFilter(blk)}
                  className={cn(
                    'px-2.5 py-1 rounded-[3px] text-xs font-semibold transition-colors cursor-pointer shrink-0',
                    attendanceBlockFilter === blk
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'text-muted-foreground hover:text-foreground bg-[#1a1a1a] border border-border/60'
                  )}
                >
                  {blk}
                </button>
              ))}
            </div>
          </div>

          {/* Roll Call Table with Interactive 4-Way Status Toggle */}
          <div className="border border-border/80 rounded-[4px] overflow-hidden bg-card">
            <div className="p-3 bg-[#161616] border-b border-border/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-purple-400" />
                <span className="font-bold text-foreground">
                  {isHindi ? '09:30 PM रात्रि उपस्थिति निरीक्षण पंजिका' : '09:30 PM Night Roll Call Register'}
                </span>
                <span className="text-muted-foreground text-[11px]">
                  · {isHindi ? 'वार्डन द्वारा व्यक्तिगत कमरा सत्यापन' : 'Room-by-room physical verification'}
                </span>
              </div>
              <span className="font-mono text-muted-foreground text-xs">
                {filteredNightRoster.length} {isHindi ? 'छात्रावासी' : 'Residents'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-[#141414] text-muted-foreground font-semibold">
                    <th className="py-3 px-3 w-14 text-center">{isHindi ? 'फोटो' : 'Photo'}</th>
                    <th className="py-3 px-3 w-28 text-center">{isHindi ? 'कमरा / बेड' : 'Room / Bed'}</th>
                    <th className="py-3 px-4 min-w-[220px]">{isHindi ? 'छात्रावासी छात्र' : 'Resident Name & ID'}</th>
                    <th className="py-3 px-4 min-w-[150px]">{isHindi ? 'ब्लॉक व तल' : 'Block & Floor'}</th>
                    <th className="py-3 px-4 min-w-[170px]">{isHindi ? 'अभिभावक संपर्क' : 'Guardian Contact'}</th>
                    <th className="py-3 px-4 min-w-[340px] text-center">{isHindi ? 'रात्रि उपस्थिति स्थिति' : 'Night Verification Status'}</th>
                    <th className="py-3 px-4 text-right min-w-[140px]">{isHindi ? 'सत्यापन समय' : 'Verified At'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredNightRoster.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground text-xs">
                        {isHindi ? 'कोई छात्र रिकॉर्ड नहीं मिला।' : 'No residents match the filter.'}
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

                        {/* 3. Student Name & Admission */}
                        <td className="py-3 px-4">
                          <div className="font-extrabold text-foreground text-sm tracking-tight">{r.name}</div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-0.5">
                            <span className="font-mono text-[11px]">{r.admNo}</span>
                            <span>•</span>
                            <span>{r.classSection}</span>
                          </div>
                        </td>

                        {/* 4. Block & Floor */}
                        <td className="py-3 px-4">
                          <div className="text-xs font-semibold text-foreground">{r.block}</div>
                          <div className="text-[11px] text-muted-foreground font-mono">{r.floor}</div>
                        </td>

                        {/* 5. Guardian Contact */}
                        <td className="py-3 px-4">
                          <div className="text-xs font-medium text-foreground">{r.guardianName}</div>
                          <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground mt-0.5">
                            <Phone className="h-2.5 w-2.5" />
                            {r.guardianPhone}
                          </div>
                        </td>

                        {/* 6. Interactive 4-Way Status Toggle Buttons (Copying attendance.tsx UI) */}
                        <td className="py-3 px-4">
                          <div className="inline-flex items-center h-8 p-0.5 rounded-[4px] bg-[#181818] border border-border gap-1 select-none w-full max-w-[340px]">
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
                              title="Mark Present in Room"
                            >
                              <Check className={cn('h-3.5 w-3.5', r.status === 'Present' ? 'text-white stroke-[3]' : 'text-emerald-500/70')} />
                              <span>{isHindi ? 'उपस्थित' : 'Present'}</span>
                            </button>

                            {/* Absent / Missing */}
                            <button
                              type="button"
                              onClick={() => handleNightStatusToggle(r.id, 'Absent')}
                              className={cn(
                                'flex-1 h-7 rounded-[3px] px-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1',
                                r.status === 'Absent'
                                  ? 'bg-rose-500 text-white shadow-xs font-extrabold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-[#222222]'
                              )}
                              title="Mark Missing from Dorm"
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
                              title="Mark Late Check-In"
                            >
                              <Clock className={cn('h-3.5 w-3.5', r.status === 'Late' ? 'text-black stroke-[2.5]' : 'text-amber-500/70')} />
                              <span>{isHindi ? 'विलंबित' : 'Late'}</span>
                            </button>

                            {/* On Leave / Outpass */}
                            <button
                              type="button"
                              onClick={() => handleNightStatusToggle(r.id, 'Leave')}
                              className={cn(
                                'flex-1 h-7 rounded-[3px] px-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1',
                                r.status === 'Leave'
                                  ? 'bg-sky-500 text-white shadow-xs font-extrabold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-[#222222]'
                              )}
                              title="Mark On Authorized Leave"
                            >
                              <LogOut className={cn('h-3.5 w-3.5', r.status === 'Leave' ? 'text-white stroke-[2.5]' : 'text-sky-500/70')} />
                              <span>{isHindi ? 'अवकाश' : 'Leave'}</span>
                            </button>
                          </div>
                        </td>

                        {/* 7. Verification Time & Note */}
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono text-xs text-foreground font-medium block">
                            {r.punchTime || '10:00 PM'}
                          </span>
                          <span className="text-[10px] text-muted-foreground block truncate max-w-[130px] ml-auto">
                            {r.verifiedBy}
                          </span>
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
          ROOM-WISE BED INSPECTION & ALLOCATION SLIDE-OVER DRAWER (PRESERVED)
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

      {/* ──────────────────────────────────────────────────────────────────────────
          ISSUE OUTPASS / GRANT LEAVE MODAL DIALOG
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDialog
        isOpen={isOutpassModalOpen}
        onClose={() => setIsOutpassModalOpen(false)}
        title={isHindi ? 'छात्रावासी अवकाश / आउटपास जारी करें' : 'Grant Hostel Outpass & Leave Authorization'}
        description={isHindi ? 'छात्र, कमरा, प्रयोजन, दिनों की संख्या व प्रस्थान/वापसी समय भरें' : 'Official warden sanctioned residential student pass with duration & guardian sync'}
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
              className="rounded-[3px] font-bold"
            >
              {isHindi ? 'अवकाश स्वीकृत करें' : 'Authorize & Grant Leave'}
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

          <div className="grid grid-cols-2 gap-2">
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
                <option value="Festival Break">Festival Break</option>
              </select>
            </div>
            <div>
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'अवकाश अवधि (दिन)' : 'Days Granted'}
              </label>
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
              <label className="block text-muted-foreground font-semibold mb-1">
                {isHindi ? 'प्रस्थान समय' : 'Departure Time'}
              </label>
              <input
                type="text"
                value={outpassLeave}
                onChange={(e) => setOutpassLeave(e.target.value)}
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none font-mono"
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
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              {isHindi ? 'अभिभावक संपर्क फोन' : 'Guardian Emergency Contact'}
            </label>
            <input
              type="text"
              value={outpassGuardianPhone}
              onChange={(e) => setOutpassGuardianPhone(e.target.value)}
              placeholder="+91 98111 00000"
              className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161616] text-foreground text-xs focus:outline-none font-mono"
            />
          </div>
        </form>
      </VFDialog>
    </VFPageContainer>
  );
}
