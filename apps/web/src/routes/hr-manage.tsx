import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import JSZip from 'jszip';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFDrawer,
  VFDialog,
  VFStatCard,
  cn,
} from '@vidyafloww/ui';
import {
  Users,
  UserCheck,
  Plus,
  Download,
  Eye,
  Copy,
  Check,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Camera,
  Clock,
  Receipt,
  ShieldCheck,
  CreditCard,
  Phone,
  Truck,
  MapPin,
  Printer,
  Briefcase,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/hr-manage')({
  component: HRManagementPage,
});

export interface OperationalStaffRecord {
  id: string;
  code: string;
  name: string;
  avatarUrl: string;
  department: 'Transport' | 'Housekeeping' | 'Security' | 'Dining & Hostel' | 'Maintenance' | 'Administration';
  role: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  bloodGroup: string;
  shift: 'Morning (06:00 - 14:00)' | 'General (08:30 - 17:00)' | 'Evening (13:00 - 21:00)' | 'Night (20:00 - 06:00)';
  assignedArea: string;
  assignedEquipment?: string;
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  verification: 'Verified' | 'Pending';
  policeVerificationNo: string;
  aadhaarMasked: string;
  commercialLicenseNo?: string;
  fssaiCertNo?: string;
  medicalFitnessDate: string;
  joinDate: string;
  salaryGrade: string;
  basicPay: string;
  grossPay: string;
  hra: string;
  da: string;
  specialAllowance: string;
  pfDeduction: string;
  esiDeduction: string;
  netPay: string;
  bankName: string;
  bankAccountNo: string;
  bankIfsc: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  attendance: string;
  leaveBalance: {
    casual: number;
    medical: number;
    earned: number;
  };
  payoutHistory: {
    month: string;
    gross: string;
    deductions: string;
    net: string;
    status: string;
  }[];
  attendanceLog: {
    date: string;
    day: string;
    inTime: string;
    outTime: string;
    totalHours: string;
    status: 'Present' | 'Late' | 'Leave' | 'Holiday';
  }[];
  dailyDuties: {
    task: string;
    scheduledTime: string;
    zone: string;
    completed: boolean;
  }[];
}

const INITIAL_OPERATIONAL_STAFF: OperationalStaffRecord[] = [
  {
    id: '1',
    code: 'STF-DRV-014',
    name: 'Surender Rawat',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    department: 'Transport',
    role: 'Senior Heavy Bus Driver',
    phone: '+91 98112 45901',
    email: 's.rawat.transport@vidyafloww.edu.in',
    address: 'H-42, Vikas Puri, Near Outer Ring Road, New Delhi',
    dob: '15 Aug 1982',
    bloodGroup: 'O+',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Bus #04 (Route 2 — Preet Vihar Corridor)',
    assignedEquipment: 'Bus DL-1PC-4091 · GPS Unit #TR-04 · Speed Governor 40 km/h',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2024-9921',
    aadhaarMasked: '•••• •••• 4091',
    commercialLicenseNo: 'DL-0420040019284 (HMV Heavy Transport)',
    medicalFitnessDate: '12 May 2026',
    joinDate: '12 Aug 2021',
    salaryGrade: 'Grade OPS-DRV-4',
    basicPay: '₹ 18,500',
    hra: '₹ 4,500',
    da: '₹ 3,500',
    specialAllowance: '₹ 2,000',
    grossPay: '₹ 28,500',
    pfDeduction: '₹ 2,220',
    esiDeduction: '₹ 215',
    netPay: '₹ 26,065',
    bankName: 'State Bank of India (Vikas Puri)',
    bankAccountNo: '30918291048',
    bankIfsc: 'SBIN0004821',
    emergencyContact: { name: 'Sunita Rawat', relation: 'Spouse', phone: '+91 98112 45902' },
    attendance: '98.5%',
    leaveBalance: { casual: 8, medical: 10, earned: 14 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 28,500', deductions: '₹ 2,435', net: '₹ 26,065', status: 'Credited' },
      { month: 'July 2026', gross: '₹ 28,500', deductions: '₹ 2,435', net: '₹ 26,065', status: 'Credited' },
      { month: 'June 2026', gross: '₹ 28,500', deductions: '₹ 2,435', net: '₹ 26,065', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '31 Aug 2026', day: 'Monday', inTime: '05:45 AM', outTime: '02:15 PM', totalHours: '8h 30m', status: 'Present' },
      { date: '28 Aug 2026', day: 'Friday', inTime: '05:48 AM', outTime: '02:10 PM', totalHours: '8h 22m', status: 'Present' },
      { date: '27 Aug 2026', day: 'Thursday', inTime: '05:50 AM', outTime: '02:15 PM', totalHours: '8h 25m', status: 'Present' },
      { date: '26 Aug 2026', day: 'Wednesday', inTime: '05:45 AM', outTime: '02:10 PM', totalHours: '8h 25m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'Pre-Trip Vehicle Safety Inspection & Brake Check', scheduledTime: '06:00 AM', zone: 'Bus Depot Bay 4', completed: true },
      { task: 'Morning Student Pick-up Route (Preet Vihar to Campus)', scheduledTime: '06:30 AM', zone: 'Route 2 Corridor', completed: true },
      { task: 'Afternoon Student Dispersal Drop-off Route', scheduledTime: '01:30 PM', zone: 'Route 2 Corridor', completed: false },
    ],
  },
  {
    id: '2',
    code: 'STF-DRV-019',
    name: 'Mohammad Irfan',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    department: 'Transport',
    role: 'School Bus Driver',
    phone: '+91 98701 88412',
    email: 'm.irfan.transport@vidyafloww.edu.in',
    address: 'B-12, Rohini Sector 16, New Delhi',
    dob: '04 Mar 1986',
    bloodGroup: 'B+',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Bus #07 (Route 5 — Rohini Sector 11-18)',
    assignedEquipment: 'Bus DL-1PC-7712 · GPS Unit #TR-07',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2025-3310',
    aadhaarMasked: '•••• •••• 1184',
    commercialLicenseNo: 'DL-0620080031940 (Heavy Transport)',
    medicalFitnessDate: '20 Jul 2026',
    joinDate: '04 Jan 2023',
    salaryGrade: 'Grade OPS-DRV-2',
    basicPay: '₹ 17,000',
    hra: '₹ 4,000',
    da: '₹ 3,200',
    specialAllowance: '₹ 1,800',
    grossPay: '₹ 26,000',
    pfDeduction: '₹ 2,040',
    esiDeduction: '₹ 195',
    netPay: '₹ 23,765',
    bankName: 'Punjab National Bank (Rohini)',
    bankAccountNo: '0482001500994821',
    bankIfsc: 'PUNB0048200',
    emergencyContact: { name: 'Ayesha Irfan', relation: 'Spouse', phone: '+91 98701 88419' },
    attendance: '97.2%',
    leaveBalance: { casual: 7, medical: 8, earned: 12 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 26,000', deductions: '₹ 2,235', net: '₹ 23,765', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '31 Aug 2026', day: 'Monday', inTime: '05:50 AM', outTime: '02:05 PM', totalHours: '8h 15m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'Morning Pick-up Route 5 (Rohini Sector 11-18)', scheduledTime: '06:30 AM', zone: 'Route 5 Corridor', completed: true },
      { task: 'Bus Interior Sanitization & Fuel Log Entry', scheduledTime: '09:30 AM', zone: 'Depot Bay 7', completed: true },
    ],
  },
  {
    id: '3',
    code: 'STF-CLN-022',
    name: 'Ram Charan Lal',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    department: 'Housekeeping',
    role: 'Lead Campus Sanitation Specialist',
    phone: '+91 97180 23119',
    email: 'ram.charan.hk@vidyafloww.edu.in',
    address: 'Qtr #14, Institutional Staff Quarters, Dwarka, New Delhi',
    dob: '10 May 1980',
    bloodGroup: 'A+',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Academic Block A (Ground & 1st Floor Classrooms)',
    assignedEquipment: 'Floor Scrubber Machine #HK-02 · Bio-hazard Waste Cart',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2023-8812',
    aadhaarMasked: '•••• •••• 9920',
    medicalFitnessDate: '10 Feb 2026',
    joinDate: '15 Mar 2020',
    salaryGrade: 'Grade OPS-HK-3',
    basicPay: '₹ 13,000',
    hra: '₹ 3,200',
    da: '₹ 2,300',
    specialAllowance: '₹ 1,000',
    grossPay: '₹ 19,500',
    pfDeduction: '₹ 1,560',
    esiDeduction: '₹ 146',
    netPay: '₹ 17,794',
    bankName: 'Canara Bank (Dwarka)',
    bankAccountNo: '110928109482',
    bankIfsc: 'CNRB0001109',
    emergencyContact: { name: 'Geeta Devi', relation: 'Spouse', phone: '+91 97180 23120' },
    attendance: '99.0%',
    leaveBalance: { casual: 9, medical: 10, earned: 15 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 19,500', deductions: '₹ 1,706', net: '₹ 17,794', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '31 Aug 2026', day: 'Monday', inTime: '05:55 AM', outTime: '02:00 PM', totalHours: '8h 05m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'Pre-assembly corridor sanitization & mopping', scheduledTime: '06:15 AM', zone: 'Block A Ground Floor', completed: true },
      { task: 'Washroom deep clean & liquid soap replenishment', scheduledTime: '09:45 AM', zone: 'Block A Wings 1 & 2', completed: true },
    ],
  },
  {
    id: '4',
    code: 'STF-SEC-005',
    name: 'Subhash Chandra Bose',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    department: 'Security',
    role: 'Chief Security Supervisor',
    phone: '+91 98103 77210',
    email: 'security.head@vidyafloww.edu.in',
    address: 'Pocket 3, Sector 19, Dwarka, New Delhi',
    dob: '26 Jan 1974',
    bloodGroup: 'AB+',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'Main Institutional Gate A & Central CCTV Hub',
    assignedEquipment: 'VHF Handheld Radio CH-1 · Metal Detector Door #G1 · Armory Custody',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2022-1002',
    aadhaarMasked: '•••• •••• 3410',
    medicalFitnessDate: '01 Mar 2026',
    joinDate: '01 Nov 2019',
    salaryGrade: 'Grade OPS-SEC-5 (Ex-Serviceman Scale)',
    basicPay: '₹ 21,000',
    hra: '₹ 5,200',
    da: '₹ 3,800',
    specialAllowance: '₹ 2,000',
    grossPay: '₹ 32,000',
    pfDeduction: '₹ 2,520',
    esiDeduction: '₹ 240',
    netPay: '₹ 29,240',
    bankName: 'HDFC Bank (Sector 11 Dwarka)',
    bankAccountNo: '50100492810482',
    bankIfsc: 'HDFC0000482',
    emergencyContact: { name: 'Anita Bose', relation: 'Spouse', phone: '+91 98103 77215' },
    attendance: '99.5%',
    leaveBalance: { casual: 10, medical: 12, earned: 18 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 32,000', deductions: '₹ 2,760', net: '₹ 29,240', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '31 Aug 2026', day: 'Monday', inTime: '08:00 AM', outTime: '05:15 PM', totalHours: '9h 15m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'Visitor Entry Log Audit & Security Gate Guard Briefing', scheduledTime: '08:30 AM', zone: 'Gate A Security Cabin', completed: true },
      { task: 'Perimeter Boundary Fence & CCTV 64-Channel Audit', scheduledTime: '11:00 AM', zone: 'CCTV Monitoring Room', completed: true },
      { task: 'Afternoon Parent & Bus Traffic Control Supervision', scheduledTime: '01:45 PM', zone: 'Main Entry Plaza', completed: false },
    ],
  },
  {
    id: '5',
    code: 'STF-HOS-008',
    name: 'Kailash Chand',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    department: 'Dining & Hostel',
    role: 'Head Chef & Mess Nutrition Supervisor',
    phone: '+91 97119 55320',
    email: 'k.chand.mess@vidyafloww.edu.in',
    address: 'Qtr #06, Hostel Staff Quarters, Campus North Wing',
    dob: '08 Dec 1981',
    bloodGroup: 'O+',
    shift: 'Morning (06:00 - 14:00)',
    assignedArea: 'Main Hostel Central Kitchen & Dining Hall 1',
    assignedEquipment: 'Commercial Steam Boilers · Cold Storage Unit 2',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2023-6623',
    aadhaarMasked: '•••• •••• 8840',
    fssaiCertNo: 'FSSAI-DEL-2024-881902 (Food Safety Supervisor)',
    medicalFitnessDate: '15 Aug 2026',
    joinDate: '22 Oct 2021',
    salaryGrade: 'Grade OPS-CHEF-4',
    basicPay: '₹ 20,000',
    hra: '₹ 5,000',
    da: '₹ 4,000',
    specialAllowance: '₹ 2,000',
    grossPay: '₹ 31,000',
    pfDeduction: '₹ 2,400',
    esiDeduction: '₹ 232',
    netPay: '₹ 28,368',
    bankName: 'Union Bank of India',
    bankAccountNo: '0984102910482',
    bankIfsc: 'UBIN0009841',
    emergencyContact: { name: 'Meena Chand', relation: 'Spouse', phone: '+91 97119 55325' },
    attendance: '98.0%',
    leaveBalance: { casual: 8, medical: 9, earned: 14 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 31,000', deductions: '₹ 2,632', net: '₹ 28,368', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '31 Aug 2026', day: 'Monday', inTime: '05:30 AM', outTime: '02:00 PM', totalHours: '8h 30m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'Breakfast Cookery Quality & Thermal Check (Idli/Poha)', scheduledTime: '06:15 AM', zone: 'Hostel Kitchen Bay 1', completed: true },
      { task: 'Dry Grocery & Fresh Vegetable Inward Inspection', scheduledTime: '09:00 AM', zone: 'Central Pantry Store', completed: true },
      { task: 'Lunch Service Supervision (Class 6-12 Boarders)', scheduledTime: '12:15 PM', zone: 'Dining Hall 1', completed: false },
    ],
  },
  {
    id: '6',
    code: 'STF-MNT-003',
    name: 'Deepak Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    department: 'Maintenance',
    role: 'Senior Campus Electrician',
    phone: '+91 98912 00451',
    email: 'd.sharma.maint@vidyafloww.edu.in',
    address: 'C-18, Mahavir Enclave, Palam Road, New Delhi',
    dob: '18 Sep 1985',
    bloodGroup: 'B+',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'Campus Electrical Substation, 250kVA Gensets & Solar Grid',
    assignedEquipment: 'Fluke Multi-meter Kit #E-01 · Insulated 11kV Safety Gloves',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2022-7719',
    aadhaarMasked: '•••• •••• 6632',
    commercialLicenseNo: 'DEL-ELECT-A-GRADE-9021',
    medicalFitnessDate: '10 Jan 2026',
    joinDate: '05 Sep 2020',
    salaryGrade: 'Grade OPS-TECH-3',
    basicPay: '₹ 18,000',
    hra: '₹ 4,500',
    da: '₹ 3,200',
    specialAllowance: '₹ 1,800',
    grossPay: '₹ 27,500',
    pfDeduction: '₹ 2,160',
    esiDeduction: '₹ 206',
    netPay: '₹ 25,134',
    bankName: 'Axis Bank (Dwarka Mor)',
    bankAccountNo: '912010048291048',
    bankIfsc: 'UTIB0000912',
    emergencyContact: { name: 'Rajesh Sharma', relation: 'Father', phone: '+91 98912 00455' },
    attendance: '96.5%',
    leaveBalance: { casual: 6, medical: 8, earned: 11 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 27,500', deductions: '₹ 2,366', net: '₹ 25,134', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '31 Aug 2026', day: 'Monday', inTime: '08:15 AM', outTime: '05:30 PM', totalHours: '9h 15m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'Diesel Generator Fuel & Battery Voltage Inspection', scheduledTime: '08:45 AM', zone: 'Substation Yard', completed: true },
      { task: 'Physics Lab 204 Ray Optics light circuit load testing', scheduledTime: '11:30 AM', zone: 'Science Block Lab 204', completed: true },
    ],
  },
  {
    id: '7',
    code: 'STF-ADM-011',
    name: 'Pooja Kashyap',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
    department: 'Administration',
    role: 'Front Office & Transport Dispatcher',
    phone: '+91 98188 33201',
    email: 'p.kashyap.admin@vidyafloww.edu.in',
    address: 'Flat 204, Metro View Apts, Dwarka Sector 13',
    dob: '22 Jul 1992',
    bloodGroup: 'A+',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'Administrative Block Dispatch Counter & Visitor Reception',
    assignedEquipment: 'Terminal PC #ADM-04 · RFID Gate Card Encoder',
    status: 'On Duty',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2024-1189',
    aadhaarMasked: '•••• •••• 2291',
    medicalFitnessDate: '14 Feb 2026',
    joinDate: '14 Feb 2024',
    salaryGrade: 'Grade OPS-ADM-2',
    basicPay: '₹ 16,500',
    hra: '₹ 4,200',
    da: '₹ 2,800',
    specialAllowance: '₹ 1,500',
    grossPay: '₹ 25,000',
    pfDeduction: '₹ 1,980',
    esiDeduction: '₹ 188',
    netPay: '₹ 22,832',
    bankName: 'Kotak Mahindra Bank',
    bankAccountNo: '482019482019',
    bankIfsc: 'KKBK0004820',
    emergencyContact: { name: 'Vikram Kashyap', relation: 'Spouse', phone: '+91 98188 33209' },
    attendance: '98.8%',
    leaveBalance: { casual: 8, medical: 10, earned: 12 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 25,000', deductions: '₹ 2,168', net: '₹ 22,832', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '31 Aug 2026', day: 'Monday', inTime: '08:20 AM', outTime: '05:05 PM', totalHours: '8h 45m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'Morning Inward Bus GPS Confirmation & Arrival SMS', scheduledTime: '08:00 AM', zone: 'Reception Terminal', completed: true },
      { task: 'Visitor Gate Pass Verification & ID Scanning', scheduledTime: '10:30 AM', zone: 'Admin Entry Lobby', completed: true },
    ],
  },
  {
    id: '8',
    code: 'STF-MNT-009',
    name: 'Balwant Rai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    department: 'Maintenance',
    role: 'Plumbing & Water Purification Specialist',
    phone: '+91 98711 66502',
    email: 'b.rai.maint@vidyafloww.edu.in',
    address: 'Qtr #09, Staff Enclave, West Block',
    dob: '02 Apr 1983',
    bloodGroup: 'B+',
    shift: 'General (08:30 - 17:00)',
    assignedArea: 'Central RO Plant, Water Coolers & Fire Hydrant Ring',
    assignedEquipment: 'TDS & Water Quality Tester #W-02 · Pipe Threader Machine',
    status: 'On Leave',
    verification: 'Verified',
    policeVerificationNo: 'POL-DEL-2023-9901',
    aadhaarMasked: '•••• •••• 8819',
    medicalFitnessDate: '01 Aug 2026',
    joinDate: '01 Aug 2022',
    salaryGrade: 'Grade OPS-TECH-2',
    basicPay: '₹ 15,000',
    hra: '₹ 3,500',
    da: '₹ 2,300',
    specialAllowance: '₹ 1,200',
    grossPay: '₹ 22,000',
    pfDeduction: '₹ 1,800',
    esiDeduction: '₹ 165',
    netPay: '₹ 20,035',
    bankName: 'Canara Bank',
    bankAccountNo: '220918291048',
    bankIfsc: 'CNRB0002209',
    emergencyContact: { name: 'Suman Rai', relation: 'Spouse', phone: '+91 98711 66509' },
    attendance: '95.0%',
    leaveBalance: { casual: 5, medical: 6, earned: 10 },
    payoutHistory: [
      { month: 'August 2026', gross: '₹ 22,000', deductions: '₹ 1,965', net: '₹ 20,035', status: 'Credited' },
    ],
    attendanceLog: [
      { date: '28 Aug 2026', day: 'Friday', inTime: '08:25 AM', outTime: '05:15 PM', totalHours: '8h 50m', status: 'Present' },
    ],
    dailyDuties: [
      { task: 'RO Purifier TDS & Chlorine Water Quality Sampling', scheduledTime: '09:00 AM', zone: 'Academic Block RO Plant', completed: true },
    ],
  },
];

function HRManagementPage() {
  const { activeSession, addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'स्टाफ एचआर प्रबंधन' : 'Non-Teaching Staff HR') + ' – VidyaFloww';
  }, [isHindi]);

  const [staffList, setStaffList] = React.useState<OperationalStaffRecord[]>(INITIAL_OPERATIONAL_STAFF);
  const [selectedStaffIndex, setSelectedStaffIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [drawerTab, setDrawerTab] = React.useState<'overview' | 'duties' | 'attendance' | 'payroll' | 'idcard'>('overview');
  const [isEditingStaff, setIsEditingStaff] = React.useState<boolean>(false);
  const [staffFormData, setStaffFormData] = React.useState<OperationalStaffRecord | null>(null);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const avatarFileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Photo Fullscreen Preview Modal State
  const [isPhotoModalOpen, setIsPhotoModalOpen] = React.useState<boolean>(false);
  const [previewPhotoData, setPreviewPhotoData] = React.useState<{ name: string; avatarUrl: string; designation: string; code: string } | null>(null);

  // Onboard Staff Side Drawer State
  const [isAddStaffDrawerOpen, setIsAddStaffDrawerOpen] = React.useState<boolean>(false);
  const [newStaffForm, setNewStaffForm] = React.useState({
    name: '',
    code: `STF-OPS-${100 + INITIAL_OPERATIONAL_STAFF.length + 1}`,
    department: 'Housekeeping' as OperationalStaffRecord['department'],
    role: 'Sanitation Lead',
    phone: '+91 ',
    email: '',
    address: 'Institutional Staff Quarters, New Delhi',
    dob: '1988-06-15',
    bloodGroup: 'B+',
    shift: 'Morning (06:00 - 14:00)' as OperationalStaffRecord['shift'],
    assignedArea: 'Academic Block B (Ground Floor)',
    assignedEquipment: 'Safety Gear & Floor Cleaning Kit',
    monthlyWage: '₹ 20,000',
    salaryGrade: 'Grade OPS-HK-2',
    basicPay: '₹ 14,000',
    grossPay: '₹ 20,000',
    aadhaarMasked: '•••• •••• 5519',
    policeVerificationNo: `POL-DEL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    emergencyContactName: 'Family Member',
    emergencyContactPhone: '+91 98112 00000',
    emergencyContactRelation: 'Spouse',
    bankName: 'State Bank of India',
    bankAccountNo: '30910048291048',
    bankIfsc: 'SBIN0004821',
  });

  // Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = React.useState<boolean>(false);
  const [exportFormat, setExportFormat] = React.useState<'csv' | 'pdf' | 'bundle'>('bundle');
  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const [exportProgressText, setExportProgressText] = React.useState<string>('');

  const activeStaff =
    selectedStaffIndex !== null && selectedStaffIndex >= 0 && selectedStaffIndex < staffList.length
      ? staffList[selectedStaffIndex]
      : null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openStaffDrawer = (staff: OperationalStaffRecord) => {
    const idx = staffList.findIndex((s) => s.id === staff.id);
    setSelectedStaffIndex(idx >= 0 ? idx : 0);
    setIsEditingStaff(false);
    setStaffFormData(null);
    setDrawerTab('overview');
    setIsDrawerOpen(true);
  };

  const openPhotoPreview = (staff: OperationalStaffRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPreviewPhotoData({
      name: staff.name,
      avatarUrl: staff.avatarUrl,
      designation: `${staff.role} (${staff.department})`,
      code: staff.code,
    });
    setIsPhotoModalOpen(true);
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setStaffFormData((prev) => ({
            ...(prev || activeStaff || ({} as OperationalStaffRecord)),
            avatarUrl: resultStr,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEdit = () => {
    if (activeStaff) {
      setStaffFormData({ ...activeStaff });
      setIsEditingStaff(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingStaff(false);
    setStaffFormData(null);
  };

  const handleSaveStaff = () => {
    if (!staffFormData || selectedStaffIndex === null) return;
    const updated = [...staffList];
    updated[selectedStaffIndex] = { ...staffFormData };
    setStaffList(updated);
    setIsEditingStaff(false);
    setStaffFormData(null);
    addNotification({
      title: isHindi ? 'स्टाफ प्रोफाइल अपडेट हुई' : 'Staff Profile Updated',
      description: `Changes to ${staffFormData.name}'s profile saved successfully.`,
      type: 'success',
    });
  };

  const handlePrevStaff = () => {
    if (selectedStaffIndex !== null && selectedStaffIndex > 0) {
      setIsEditingStaff(false);
      setStaffFormData(null);
      setSelectedStaffIndex(selectedStaffIndex - 1);
    }
  };

  const handleNextStaff = () => {
    if (selectedStaffIndex !== null && selectedStaffIndex < staffList.length - 1) {
      setIsEditingStaff(false);
      setStaffFormData(null);
      setSelectedStaffIndex(selectedStaffIndex + 1);
    }
  };

  const handleToggleDutyStatus = (staffId: string, nextStatus: OperationalStaffRecord['status']) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, status: nextStatus } : s))
    );
    if (staffFormData && staffFormData.id === staffId) {
      setStaffFormData({ ...staffFormData, status: nextStatus });
    }
    addNotification({
      title: isHindi ? 'ड्यूटी स्थिति अपडेट' : 'Duty Status Updated',
      description: `Staff member marked as ${nextStatus}.`,
      type: 'info',
    });
  };

  const handleCreateStaffSubmit = () => {
    if (!newStaffForm.name.trim()) {
      alert('Please provide a full legal name for the staff member.');
      return;
    }

    const createdStaff: OperationalStaffRecord = {
      id: String(Date.now()),
      code: newStaffForm.code,
      name: newStaffForm.name,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      department: newStaffForm.department,
      role: newStaffForm.role,
      phone: newStaffForm.phone,
      email: newStaffForm.email || `${newStaffForm.name.toLowerCase().replace(/\s+/g, '.')}@vidyafloww.edu.in`,
      address: newStaffForm.address,
      dob: newStaffForm.dob,
      bloodGroup: newStaffForm.bloodGroup,
      shift: newStaffForm.shift,
      assignedArea: newStaffForm.assignedArea,
      assignedEquipment: newStaffForm.assignedEquipment,
      status: 'On Duty',
      verification: 'Verified',
      policeVerificationNo: newStaffForm.policeVerificationNo,
      aadhaarMasked: newStaffForm.aadhaarMasked,
      medicalFitnessDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      salaryGrade: newStaffForm.salaryGrade,
      basicPay: newStaffForm.basicPay,
      hra: '₹ 3,500',
      da: '₹ 2,500',
      specialAllowance: '₹ 1,200',
      grossPay: newStaffForm.grossPay,
      pfDeduction: '₹ 1,680',
      esiDeduction: '₹ 150',
      netPay: '₹ 18,170',
      bankName: newStaffForm.bankName,
      bankAccountNo: newStaffForm.bankAccountNo,
      bankIfsc: newStaffForm.bankIfsc,
      emergencyContact: {
        name: newStaffForm.emergencyContactName,
        relation: newStaffForm.emergencyContactRelation,
        phone: newStaffForm.emergencyContactPhone,
      },
      attendance: '100%',
      leaveBalance: { casual: 10, medical: 10, earned: 15 },
      payoutHistory: [
        { month: 'August 2026', gross: newStaffForm.grossPay, deductions: '₹ 1,830', net: '₹ 18,170', status: 'Credited' },
      ],
      attendanceLog: [
        { date: '31 Aug 2026', day: 'Monday', inTime: '06:00 AM', outTime: '02:00 PM', totalHours: '8h 00m', status: 'Present' },
      ],
      dailyDuties: [
        { task: 'Initial Shift Equipment Check & Attendance Punch', scheduledTime: '06:00 AM', zone: newStaffForm.assignedArea, completed: true },
      ],
    };

    setStaffList([createdStaff, ...staffList]);
    setIsAddStaffDrawerOpen(false);
    addNotification({
      title: isHindi ? 'स्टाफ ऑनबोर्ड हुआ' : 'Staff Member Onboarded',
      description: `${createdStaff.name} registered under ID ${createdStaff.code}.`,
      type: 'success',
    });
  };

  // Perform Multi-Format Export Action (matching teachers.tsx)
  const handleExecuteExport = async () => {
    setIsExporting(true);
    setExportProgressText('Preparing operational staff records...');

    try {
      if (exportFormat === 'csv' || exportFormat === 'bundle') {
        setExportProgressText('Generating CSV Spreadsheet...');
        const headers = ['Staff ID', 'Name', 'Role', 'Department', 'Shift', 'Assigned Post / Bus', 'Attendance', 'Status', 'Verification Ref', 'Monthly Gross', 'Net Pay', 'Phone'];
        const csvRows = [
          headers.join(','),
          ...staffList.map((s) =>
            [
              `"${s.code}"`,
              `"${s.name}"`,
              `"${s.role}"`,
              `"${s.department}"`,
              `"${s.shift}"`,
              `"${s.assignedArea}"`,
              `"${s.attendance}"`,
              `"${s.status}"`,
              `"${s.policeVerificationNo}"`,
              `"${s.grossPay}"`,
              `"${s.netPay}"`,
              `"${s.phone}"`,
            ].join(',')
          ),
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `VidyaFloww_NonTeaching_Staff_Roster_${activeSession.replace(/\s+/g, '_')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      if (exportFormat === 'bundle') {
        setExportProgressText('Building Staff ZIP Archive Package...');
        const zip = new JSZip();
        const info = `VidyaFloww Institutional Management System\nNon-Teaching Staff Operations Master Roster - Session ${activeSession}\nTotal Operational Staff Count: ${staffList.length}\nGenerated: ${new Date().toLocaleString()}\n`;
        zip.file('README_OPERATIONAL_STAFF.txt', info);
        zip.file('staff_roster_data.json', JSON.stringify(staffList, null, 2));

        const content = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(content);
        const zipLink = document.createElement('a');
        zipLink.href = zipUrl;
        zipLink.download = `VidyaFloww_Operational_Staff_Archive_${activeSession.replace(/\s+/g, '_')}.zip`;
        document.body.appendChild(zipLink);
        zipLink.click();
        document.body.removeChild(zipLink);
      }

      if (exportFormat === 'pdf') {
        window.print();
      }

      addNotification({
        title: isHindi ? 'रोस्टर एक्सपोर्ट संपन्न' : 'Staff Roster Exported',
        description: `Successfully exported ${staffList.length} operational staff records for ${activeSession}.`,
        type: 'success',
      });
      setIsExportModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('An error occurred while compiling the staff export bundle.');
    } finally {
      setIsExporting(false);
      setExportProgressText('');
    }
  };

  // Main Data Table Columns (matching teachers.tsx style)
  const staffColumns = [
    {
      header: isHindi ? 'स्टाफ आईडी' : 'Staff ID',
      accessorKey: 'code',
      cell: (r: OperationalStaffRecord) => (
        <span
          onClick={() => handleCopy(r.code, `table-${r.code}`)}
          className="font-mono text-xs font-bold text-zinc-300 bg-[#161619] px-2.5 py-1 rounded-md border border-[#27272e] hover:border-zinc-500 cursor-pointer transition-colors inline-flex items-center gap-1"
          title="Click to copy Staff ID"
        >
          {r.code}
          {copiedKey === `table-${r.code}` ? (
            <Check className="h-3 w-3 text-emerald-400" />
          ) : (
            <Copy className="h-3 w-3 text-zinc-500 opacity-50" />
          )}
        </span>
      ),
    },
    {
      header: isHindi ? 'कर्मचारी व पद' : 'Staff Member',
      accessorKey: 'name',
      cell: (r: OperationalStaffRecord) => (
        <div className="flex items-center gap-3.5">
          <div
            onClick={(e) => openPhotoPreview(r, e)}
            className="overflow-hidden rounded-md border border-border/80 shadow-xs w-10 h-[50px] bg-[#161616] shrink-0 cursor-pointer group relative hover:border-foreground/40 transition-colors"
            title="Click to view full photo"
          >
            <img src={r.avatarUrl} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Eye className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight hover:text-zinc-200 cursor-pointer" onClick={() => openStaffDrawer(r)}>
              {r.name}
            </p>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">{r.role}</p>
          </div>
        </div>
      ),
    },
    {
      header: t('col.department'),
      accessorKey: 'department',
      cell: (r: OperationalStaffRecord) => (
        <VFBadge variant="outline" className="text-xs font-bold rounded-[3px]">
          {r.department}
        </VFBadge>
      ),
    },
    {
      header: isHindi ? 'आवंटित कार्यक्षेत्र / वाहन' : 'Assigned Post / Route',
      accessorKey: 'assignedArea',
      cell: (r: OperationalStaffRecord) => (
        <div className="space-y-0.5">
          <span className="font-bold text-white text-xs block max-w-[220px] truncate">
            {r.assignedArea}
          </span>
          {r.assignedEquipment && (
            <span className="text-[11px] text-zinc-500 font-medium block truncate max-w-[220px]">
              {r.assignedEquipment}
            </span>
          )}
        </div>
      ),
    },
    {
      header: isHindi ? 'शिफ्ट समय' : 'Shift Timing',
      accessorKey: 'shift',
      cell: (r: OperationalStaffRecord) => (
        <span className="text-xs font-mono text-zinc-300 font-medium">{r.shift}</span>
      ),
    },
    {
      header: isHindi ? 'सत्यापन' : 'Verification',
      accessorKey: 'verification',
      cell: (r: OperationalStaffRecord) => (
        <VFBadge
          variant={r.verification === 'Verified' ? 'success' : 'warning'}
          className="text-xs px-2 py-0.5 rounded-[3px] inline-flex items-center gap-1"
        >
          <ShieldCheck className="h-3 w-3" />
          {r.verification}
        </VFBadge>
      ),
    },
    {
      header: t('col.attendance'),
      accessorKey: 'attendance',
      cell: (r: OperationalStaffRecord) => (
        <span className="font-mono font-bold text-emerald-400 text-xs bg-emerald-950/30 border border-emerald-800/40 px-2 py-0.5 rounded">
          {r.attendance}
        </span>
      ),
    },
    {
      header: t('col.status'),
      accessorKey: 'status',
      cell: (r: OperationalStaffRecord) => (
        <VFBadge
          variant={
            r.status === 'On Duty'
              ? 'success'
              : r.status === 'On Leave'
              ? 'danger'
              : 'outline'
          }
          className="text-xs px-2 py-0.5 rounded-[3px]"
        >
          {r.status}
        </VFBadge>
      ),
    },
    {
      header: t('col.action'),
      accessorKey: 'action',
      cell: (r: OperationalStaffRecord) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-3.5 w-3.5 text-zinc-400" />}
          onClick={() => openStaffDrawer(r)}
        >
          {isHindi ? 'प्रोफाइल देखें' : 'View Profile'}
        </VFButton>
      ),
    },
  ];

  const onDutyCount = staffList.filter((s) => s.status === 'On Duty').length;
  const onLeaveCount = staffList.filter((s) => s.status === 'On Leave').length;
  const verifiedCount = staffList.filter((s) => s.verification === 'Verified').length;

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3.5">
      {/* 1. TOP METRIC KPI SUMMARY CARDS (Matching teachers.tsx exactly) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <VFStatCard
          title={isHindi ? 'कुल गैर-शिक्षक स्टाफ' : 'Operational Staff Strength'}
          value={`${staffList.length} Staff`}
          description="Drivers, Cleaners, Guards & Techs"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend="up"
          trendLabel="Full Quota"
        />
        <VFStatCard
          title={isHindi ? 'आज सक्रिय ड्यूटी' : "Today's Active On-Duty"}
          value={`${onDutyCount} Deployed`}
          description="100% Core Route & Gate Posts Manned"
          icon={<UserCheck className="h-5 w-5 text-emerald-400" />}
          trend="up"
          trendLabel="98.2% Shift Attendance"
        />
        <VFStatCard
          title={isHindi ? 'स्वीकृत अवकाश' : 'Approved Leave / Rest'}
          value={`${onLeaveCount} On Leave`}
          description="Standby Relievers Deployed"
          icon={<Clock className="h-5 w-5 text-amber-400" />}
          trend="neutral"
          trendLabel="Covered"
        />
        <VFStatCard
          title={isHindi ? 'पुलिस व पृष्ठभूमि सत्यापन' : 'Background Verification'}
          value={`${verifiedCount} / ${staffList.length}`}
          description="Police Clearance & Aadhaar"
          icon={<ShieldCheck className="h-5 w-5 text-emerald-400" />}
          trend="up"
          trendLabel="100% Certified"
        />
      </div>

      {/* 2. MAIN OPERATIONAL STAFF DATA TABLE */}
      <VFDataTable
        columns={staffColumns}
        data={staffList}
        filterPlaceholder={isHindi ? 'नाम, आईडी या कार्यक्षेत्र खोजें...' : 'Search staff by name, code, post or vehicle...'}
        rightActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-3.5 w-3.5 text-zinc-400" />}
              onClick={() => setIsExportModalOpen(true)}
            >
              {t('action.export')}
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              onClick={() => setIsAddStaffDrawerOpen(true)}
            >
              {isHindi ? '+ नया स्टाफ जोड़ें' : '+ Onboard Staff'}
            </VFButton>
          </>
        }
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          3. 360° OPERATIONAL STAFF PROFILE & DOSSIER SIDE DRAWER (5 TABS)
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsEditingStaff(false);
          setStaffFormData(null);
          setIsDrawerOpen(false);
        }}
        hideHeader={true}
        title={activeStaff ? activeStaff.name : 'Staff Profile'}
        className="w-[850px] min-w-[320px] sm:min-w-[850px] max-w-[95vw]"
        bodyClassName="p-0 flex flex-col overflow-hidden"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {isEditingStaff ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white bg-[#161619] px-2.5 h-8 flex items-center rounded-md border border-[#27272e]">
                    {staffFormData?.code || activeStaff?.code}
                  </span>
                  <span className="text-xs font-medium text-zinc-400">
                    Editing Operational Staff Profile
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <VFButton
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Check className="h-4 w-4" />}
                    onClick={handleSaveStaff}
                  >
                    Save Changes
                  </VFButton>
                </div>
              </>
            ) : (
              <>
                {/* Stepper Navigation */}
                <div className="flex items-center gap-1 bg-[#141417] h-8 px-1.5 rounded-md border border-[#27272e]">
                  <button
                    onClick={handlePrevStaff}
                    disabled={selectedStaffIndex === 0}
                    className="h-6 w-6 flex items-center justify-center rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 cursor-pointer transition-colors"
                    title="Previous Staff (Keyboard: ←)"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold px-2 text-zinc-300 select-none leading-none">
                    {selectedStaffIndex !== null ? selectedStaffIndex + 1 : 1} of {staffList.length}
                  </span>
                  <button
                    onClick={handleNextStaff}
                    disabled={selectedStaffIndex === staffList.length - 1}
                    className="h-6 w-6 flex items-center justify-center rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 cursor-pointer transition-colors"
                    title="Next Staff (Keyboard: →)"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <VFButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditingStaff(false);
                      setStaffFormData(null);
                      setIsDrawerOpen(false);
                    }}
                  >
                    Cancel
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Edit3 className="h-4 w-4" />}
                    onClick={handleStartEdit}
                  >
                    Edit Profile
                  </VFButton>
                </div>
              </>
            )}
          </div>
        }
      >
        {activeStaff && (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden animate-fade-in">
            {/* Top 5 Full-Width Tabs */}
            <div className="w-full bg-[#111113] border-b border-[#242428] shrink-0">
              <div className="grid grid-cols-5 w-full">
                {[
                  { id: 'overview', label: 'Profile', icon: <UserCheck className="h-4 w-4" /> },
                  { id: 'duties', label: 'Duties & Deployment', icon: <Truck className="h-4 w-4" /> },
                  { id: 'attendance', label: 'Attendance & Leaves', icon: <Clock className="h-4 w-4" /> },
                  { id: 'payroll', label: 'Salary & Wages', icon: <Receipt className="h-4 w-4" /> },
                  { id: 'idcard', label: 'Badge & Documents', icon: <CreditCard className="h-4 w-4" /> },
                ].map((tab) => {
                  const isActive = drawerTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setDrawerTab(tab.id as any)}
                      className={cn(
                        'flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-all cursor-pointer outline-none select-none border-b-2',
                        isActive
                          ? 'bg-[#18181c] text-white border-zinc-300'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5 border-transparent'
                      )}
                    >
                      {tab.icon}
                      <span className="hidden md:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Drawer Scroll Area */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {/* TAB 1: PROFILE & BIO */}
              {drawerTab === 'overview' && (
                <div className="animate-fade-in divide-y divide-[#1e1e24]">
                  {/* Photo + Personal Fields Strip */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 px-4 py-3">
                      <div className="relative shrink-0 mx-auto sm:mx-0">
                        <input
                          type="file"
                          ref={avatarFileInputRef}
                          onChange={handleAvatarFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <div
                          onClick={() => {
                            if (isEditingStaff && avatarFileInputRef.current) {
                              avatarFileInputRef.current.click();
                            } else {
                              openPhotoPreview(activeStaff);
                            }
                          }}
                          className={cn(
                            'relative overflow-hidden rounded-md border border-[#27272e] shadow-sm w-24 sm:w-28 bg-[#161619] flex items-center justify-center transition-all group cursor-pointer',
                            isEditingStaff ? 'hover:ring-2 hover:ring-zinc-400' : ''
                          )}
                          style={{ aspectRatio: '19.5 / 25' }}
                        >
                          <img
                            src={isEditingStaff && staffFormData?.avatarUrl ? staffFormData.avatarUrl : activeStaff.avatarUrl}
                            alt={isEditingStaff && staffFormData?.name ? staffFormData.name : activeStaff.name}
                            style={{ aspectRatio: '19.5 / 25' }}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity text-white">
                            {isEditingStaff ? (
                              <>
                                <Camera className="h-5 w-5 text-white" />
                                <span className="text-[10px] font-bold tracking-tight">Upload</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-5 w-5 text-white" />
                                <span className="text-[10px] font-bold tracking-tight">View</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5 w-full">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-[3px]">
                              {activeStaff.code}
                            </span>
                            <VFBadge variant="outline" className="text-xs">
                              {activeStaff.department}
                            </VFBadge>
                          </div>
                          <div className="flex items-center gap-2">
                            <VFBadge
                              variant={activeStaff.status === 'On Duty' ? 'success' : 'warning'}
                              className="text-xs px-2 py-0.5"
                            >
                              {activeStaff.status}
                            </VFBadge>
                          </div>
                        </div>

                        <h2 className="text-lg font-bold text-white">{activeStaff.name}</h2>
                        <p className="text-xs font-semibold text-zinc-300">{activeStaff.role}</p>

                        <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-zinc-400">
                          <div>
                            <span className="block text-[11px] text-zinc-500">Phone Contact:</span>
                            <span className="font-mono text-white">{activeStaff.phone}</span>
                          </div>
                          <div>
                            <span className="block text-[11px] text-zinc-500">Blood Group:</span>
                            <strong className="text-red-400">{activeStaff.bloodGroup}</strong>
                          </div>
                          <div>
                            <span className="block text-[11px] text-zinc-500">Joining Date:</span>
                            <span className="text-white">{activeStaff.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Duties & Area */}
                  <div className="p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Assignment & Operational Scope
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#151518] p-3 rounded-[4px] border border-[#27272e]">
                      <div>
                        <span className="text-zinc-500 block font-semibold">Primary Assigned Post / Area:</span>
                        <strong className="text-white text-sm">{activeStaff.assignedArea}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 block font-semibold">Shift Timing:</span>
                        <span className="font-mono text-amber-400 font-bold">{activeStaff.shift}</span>
                      </div>
                      {activeStaff.assignedEquipment && (
                        <div className="sm:col-span-2 pt-2 border-t border-[#242428]">
                          <span className="text-zinc-500 block font-semibold">Assigned Vehicle / Machinery:</span>
                          <span className="text-zinc-200">{activeStaff.assignedEquipment}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verification & Legal Identity */}
                  <div className="p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Background Checks & Verification
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] space-y-1">
                        <span className="text-zinc-500 block">National Aadhaar ID:</span>
                        <strong className="font-mono text-white text-sm">{activeStaff.aadhaarMasked}</strong>
                      </div>
                      <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] space-y-1">
                        <span className="text-zinc-500 block">Police Clearance Reference:</span>
                        <strong className="font-mono text-emerald-400 text-sm">{activeStaff.policeVerificationNo}</strong>
                      </div>
                      {activeStaff.commercialLicenseNo && (
                        <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] space-y-1">
                          <span className="text-zinc-500 block">Commercial Driving License:</span>
                          <strong className="font-mono text-amber-400 text-xs">{activeStaff.commercialLicenseNo}</strong>
                        </div>
                      )}
                      <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] space-y-1">
                        <span className="text-zinc-500 block">Medical Fitness Certified On:</span>
                        <strong className="text-white text-xs">{activeStaff.medicalFitnessDate}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Family Emergency Contact
                    </h4>
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white block">{activeStaff.emergencyContact.name} ({activeStaff.emergencyContact.relation})</strong>
                        <span className="text-zinc-400 font-mono">{activeStaff.emergencyContact.phone}</span>
                      </div>
                      <VFButton
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopy(activeStaff.emergencyContact.phone, 'em-phone')}
                      >
                        {copiedKey === 'em-phone' ? 'Copied' : 'Copy Number'}
                      </VFButton>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DUTIES & DEPLOYMENT */}
              {drawerTab === 'duties' && (
                <div className="p-4 space-y-4 animate-fade-in text-xs">
                  <div className="p-3.5 bg-[#151518] border border-[#27272e] rounded-[4px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Active Operational Deployment
                      </span>
                      <VFBadge variant="success" className="text-xs">Operational</VFBadge>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                      Assigned to <strong>{activeStaff.assignedArea}</strong> for the <strong>{activeStaff.shift}</strong> shift.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Today's Operational Task Checklist
                    </h4>
                    <div className="space-y-2">
                      {activeStaff.dailyDuties.map((duty, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-[3px] bg-[#161619] border border-[#27272e] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              'h-5 w-5 rounded-[2px] flex items-center justify-center font-bold text-xs',
                              duty.completed ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-700' : 'bg-[#222226] text-zinc-400'
                            )}>
                              {duty.completed ? '✓' : idx + 1}
                            </span>
                            <div>
                              <strong className="text-white block">{duty.task}</strong>
                              <span className="text-zinc-500 text-[11px]">{duty.zone}</span>
                            </div>
                          </div>
                          <span className="font-mono text-amber-400 font-semibold">{duty.scheduledTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ATTENDANCE & LEAVES */}
              {drawerTab === 'attendance' && (
                <div className="p-4 space-y-4 animate-fade-in text-xs">
                  {/* Leave Balances Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] text-center">
                      <span className="text-zinc-500 block text-[11px]">Casual Leave</span>
                      <strong className="text-base font-mono text-white">{activeStaff.leaveBalance.casual} Days</strong>
                    </div>
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] text-center">
                      <span className="text-zinc-500 block text-[11px]">Medical Leave</span>
                      <strong className="text-base font-mono text-white">{activeStaff.leaveBalance.medical} Days</strong>
                    </div>
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e] text-center">
                      <span className="text-zinc-500 block text-[11px]">Earned Leave</span>
                      <strong className="text-base font-mono text-white">{activeStaff.leaveBalance.earned} Days</strong>
                    </div>
                  </div>

                  {/* Quick Toggle Duty Status */}
                  <div className="p-3 bg-[#151518] rounded-[4px] border border-[#27272e] flex items-center justify-between">
                    <div>
                      <strong className="text-white block">Current Duty State: {activeStaff.status}</strong>
                      <span className="text-zinc-400 text-[11px]">Override shift status in real-time for gate & attendance turnstiles.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <VFButton
                        size="sm"
                        variant={activeStaff.status === 'On Duty' ? 'primary' : 'outline'}
                        onClick={() => handleToggleDutyStatus(activeStaff.id, 'On Duty')}
                      >
                        On Duty
                      </VFButton>
                      <VFButton
                        size="sm"
                        variant={activeStaff.status === 'On Leave' ? 'primary' : 'outline'}
                        onClick={() => handleToggleDutyStatus(activeStaff.id, 'On Leave')}
                      >
                        On Leave
                      </VFButton>
                    </div>
                  </div>

                  {/* Punch In / Out Log Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Recent Biometric Punch Logs
                    </h4>
                    <div className="border border-[#27272e] rounded-[3px] overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#141417] text-zinc-400 border-b border-[#242428]">
                            <th className="py-2 px-3 font-semibold">Date</th>
                            <th className="py-2 px-3 font-semibold">Day</th>
                            <th className="py-2 px-3 font-semibold">In Time</th>
                            <th className="py-2 px-3 font-semibold">Out Time</th>
                            <th className="py-2 px-3 font-semibold">Total Hours</th>
                            <th className="py-2 px-3 font-semibold text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#202026]">
                          {activeStaff.attendanceLog.map((log, idx) => (
                            <tr key={idx} className="hover:bg-white/5">
                              <td className="py-2 px-3 font-mono text-zinc-300">{log.date}</td>
                              <td className="py-2 px-3 text-zinc-400">{log.day}</td>
                              <td className="py-2 px-3 font-mono text-emerald-400">{log.inTime}</td>
                              <td className="py-2 px-3 font-mono text-zinc-300">{log.outTime}</td>
                              <td className="py-2 px-3 font-mono text-white">{log.totalHours}</td>
                              <td className="py-2 px-3 text-right">
                                <VFBadge variant="success" className="text-[10px] px-1.5 py-0.5">
                                  {log.status}
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

              {/* TAB 4: SALARY & WAGES */}
              {drawerTab === 'payroll' && (
                <div className="p-4 space-y-4 animate-fade-in text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e]">
                      <span className="text-zinc-500 block text-[11px]">Monthly Gross:</span>
                      <strong className="text-base font-mono text-white">{activeStaff.grossPay}</strong>
                    </div>
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e]">
                      <span className="text-zinc-500 block text-[11px]">EPF Deduction:</span>
                      <span className="text-sm font-mono text-rose-400 font-bold">{activeStaff.pfDeduction}</span>
                    </div>
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e]">
                      <span className="text-zinc-500 block text-[11px]">ESI Health Cover:</span>
                      <span className="text-sm font-mono text-rose-400 font-bold">{activeStaff.esiDeduction}</span>
                    </div>
                    <div className="p-3 bg-[#151518] rounded-[3px] border border-[#27272e]">
                      <span className="text-zinc-500 block text-[11px]">Net Bank Payout:</span>
                      <strong className="text-base font-mono text-emerald-400">{activeStaff.netPay}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-[#151518] rounded-[4px] border border-[#27272e] space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Disbursement Bank Details
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-zinc-500 block">Bank Name:</span>
                        <strong className="text-white">{activeStaff.bankName}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Account Number:</span>
                        <strong className="font-mono text-white">{activeStaff.bankAccountNo}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">IFSC Code:</span>
                        <strong className="font-mono text-primary">{activeStaff.bankIfsc}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Salary Credited History
                    </h4>
                    <div className="border border-[#27272e] rounded-[3px] overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#141417] text-zinc-400 border-b border-[#242428]">
                            <th className="py-2 px-3">Month</th>
                            <th className="py-2 px-3">Gross</th>
                            <th className="py-2 px-3">Deductions</th>
                            <th className="py-2 px-3">Net Disbursed</th>
                            <th className="py-2 px-3 text-right">Receipt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#202026]">
                          {activeStaff.payoutHistory.map((p, idx) => (
                            <tr key={idx} className="hover:bg-white/5">
                              <td className="py-2 px-3 text-white font-medium">{p.month}</td>
                              <td className="py-2 px-3 font-mono">{p.gross}</td>
                              <td className="py-2 px-3 font-mono text-rose-400">{p.deductions}</td>
                              <td className="py-2 px-3 font-mono font-bold text-emerald-400">{p.net}</td>
                              <td className="py-2 px-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    addNotification({
                                      title: 'Pay Slip Downloaded',
                                      description: `${p.month} salary voucher for ${activeStaff.name}.`,
                                      type: 'info',
                                    });
                                  }}
                                  className="text-xs text-primary hover:underline font-bold"
                                >
                                  Slip
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BADGE & DOCUMENTS */}
              {drawerTab === 'idcard' && (
                <div className="p-4 space-y-4 animate-fade-in text-xs flex flex-col items-center">
                  <div className="w-full flex items-center justify-between pb-2 border-b border-[#242428]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Official Campus Access Badge Preview
                    </h4>
                    <VFButton
                      size="sm"
                      onClick={() => window.print()}
                      leftIcon={<Printer className="h-3.5 w-3.5" />}
                    >
                      Print ID Badge
                    </VFButton>
                  </div>

                  {/* ID Badge Card */}
                  <div className="w-[380px] bg-white text-slate-900 rounded-[6px] shadow-2xl overflow-hidden border border-slate-300 font-sans my-4 select-none">
                    <div className="bg-slate-900 text-white p-3 text-center">
                      <h3 className="text-xs font-black tracking-wider uppercase">VIDYAFLOWW INTERNATIONAL ACADEMY</h3>
                      <p className="text-[9px] tracking-widest uppercase text-slate-300">OPERATIONAL STAFF PASS · 2026</p>
                    </div>

                    <div className="p-4 flex items-center gap-3.5">
                      <div className="h-20 w-18 rounded-[3px] overflow-hidden border border-slate-300 shrink-0">
                        <img src={activeStaff.avatarUrl} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[9px] font-bold uppercase text-slate-500">{activeStaff.department}</span>
                        <h2 className="text-sm font-black text-slate-900">{activeStaff.name}</h2>
                        <p className="text-xs font-bold text-slate-700">{activeStaff.role}</p>

                        <div className="mt-2 pt-1 border-t border-slate-200 grid grid-cols-2 text-[10px]">
                          <div>
                            <span className="text-slate-400 block text-[8px]">ID:</span>
                            <strong className="font-mono text-slate-900">{activeStaff.code}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[8px]">BLOOD GROUP:</span>
                            <strong className="text-red-600 font-bold">{activeStaff.bloodGroup}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-2 px-3 flex items-center justify-between border-t border-slate-200 text-[9px]">
                      <span className="font-mono text-slate-600">POLICE VERIFIED: {activeStaff.policeVerificationNo}</span>
                      <span className="font-mono font-bold text-emerald-700">AUTHORIZED ACCESS</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </VFDrawer>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. ONBOARD STAFF SIDE DRAWER
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDrawer
        isOpen={isAddStaffDrawerOpen}
        onClose={() => setIsAddStaffDrawerOpen(false)}
        title={isHindi ? 'नया गैर-शिक्षक कर्मचारी ऑनबोर्ड करें' : 'Onboard Operational Staff Member'}
        className="w-[600px] min-w-[320px] sm:min-w-[600px] max-w-[95vw]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsAddStaffDrawerOpen(false)}
            >
              Cancel
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleCreateStaffSubmit}
            >
              Complete Onboarding
            </VFButton>
          </div>
        }
      >
        <div className="space-y-4 text-xs py-2">
          <div className="p-3 bg-[#151518] rounded-[4px] border border-[#27272e] flex items-center gap-2">
            <span className="font-mono font-bold text-primary">{newStaffForm.code}</span>
            <span className="text-zinc-400">· System generated employee ID code</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={newStaffForm.name}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Department *</label>
              <select
                value={newStaffForm.department}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, department: e.target.value as any })}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              >
                <option value="Transport">Transport</option>
                <option value="Housekeeping">Housekeeping & Sanitation</option>
                <option value="Security">Security & Surveillance</option>
                <option value="Dining & Hostel">Dining & Hostel</option>
                <option value="Maintenance">Maintenance & Electrician</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Role / Designation *</label>
              <input
                type="text"
                required
                value={newStaffForm.role}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, role: e.target.value })}
                placeholder="e.g. Heavy Vehicle Driver"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Primary Mobile Number *</label>
              <input
                type="tel"
                required
                value={newStaffForm.phone}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, phone: e.target.value })}
                placeholder="+91 98112 00000"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Shift Timing</label>
              <select
                value={newStaffForm.shift}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, shift: e.target.value as any })}
                className="w-full px-2.5 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              >
                <option value="Morning (06:00 - 14:00)">Morning (06:00 - 14:00)</option>
                <option value="General (08:30 - 17:00)">General (08:30 - 17:00)</option>
                <option value="Evening (13:00 - 21:00)">Evening (13:00 - 21:00)</option>
                <option value="Night (20:00 - 06:00)">Night (20:00 - 06:00)</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Monthly Gross Wage</label>
              <input
                type="text"
                value={newStaffForm.grossPay}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, grossPay: e.target.value })}
                placeholder="₹ 22,000"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Assigned Vehicle or Floor Zone</label>
            <input
              type="text"
              value={newStaffForm.assignedArea}
              onChange={(e) => setNewStaffForm({ ...newStaffForm, assignedArea: e.target.value })}
              placeholder="e.g. Bus #04 (Route 2) or Academic Block B"
              className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#242428]">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Aadhaar Card Reference</label>
              <input
                type="text"
                value={newStaffForm.aadhaarMasked}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, aadhaarMasked: e.target.value })}
                placeholder="•••• •••• 5519"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Emergency Contact Mobile</label>
              <input
                type="tel"
                value={newStaffForm.emergencyContactPhone}
                onChange={(e) => setNewStaffForm({ ...newStaffForm, emergencyContactPhone: e.target.value })}
                placeholder="+91 98112 11111"
                className="w-full px-3 py-1.5 border border-border rounded-[3px] bg-[#161619] text-white text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </VFDrawer>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. PHOTO PREVIEW FULLSCREEN MODAL
          ═══════════════════════════════════════════════════════════════════════ */}
      {previewPhotoData && (
        <VFDialog
          isOpen={isPhotoModalOpen}
          onClose={() => {
            setIsPhotoModalOpen(false);
            setPreviewPhotoData(null);
          }}
          title={previewPhotoData.name}
          description={`${previewPhotoData.designation} (${previewPhotoData.code})`}
          className="max-w-sm rounded-[4px]"
        >
          <div className="flex flex-col items-center py-2 space-y-3">
            <div className="w-56 h-72 rounded-[4px] overflow-hidden border-2 border-border shadow-xl bg-black">
              <img
                src={previewPhotoData.avatarUrl}
                alt={previewPhotoData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-mono text-zinc-400">Institutional ID Verified</p>
          </div>
        </VFDialog>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          6. EXPORT ROSTER MODAL (Matching teachers.tsx)
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDialog
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title={isHindi ? 'स्टाफ रोस्टर एक्सपोर्ट' : 'Export Staff Master Dossier'}
        description={isHindi ? 'सीएसवी, पीडीएफ या ज़िप बंडल प्रारूप चुनें' : 'Generate verified operational staff packages with payroll and attendance logs'}
        className="max-w-md rounded-[4px]"
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsExportModalOpen(false)}
              disabled={isExporting}
            >
              Cancel
            </VFButton>
            <VFButton
              size="sm"
              onClick={handleExecuteExport}
              disabled={isExporting}
              leftIcon={<Download className="h-3.5 w-3.5" />}
            >
              {isExporting ? 'Compiling...' : 'Export Roster'}
            </VFButton>
          </div>
        }
      >
        <div className="space-y-3 text-xs py-1">
          <div className="space-y-2">
            <label className="block text-zinc-400 font-semibold">Select Export Format:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bundle', label: 'ZIP Package', desc: 'JSON + Summary' },
                { id: 'csv', label: 'Spreadsheet', desc: 'CSV Matrix' },
                { id: 'pdf', label: 'PDF Document', desc: 'Printable' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setExportFormat(fmt.id as any)}
                  className={cn(
                    'p-2.5 rounded-[3px] border text-left cursor-pointer transition-colors',
                    exportFormat === fmt.id ? 'border-primary bg-[#222226]' : 'border-[#27272e] bg-[#161619]'
                  )}
                >
                  <strong className="block text-white text-xs">{fmt.label}</strong>
                  <span className="text-[10px] text-zinc-500">{fmt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {exportProgressText && (
            <div className="p-2.5 bg-primary/10 border border-primary/30 rounded-[3px] text-xs text-primary flex items-center gap-2">
              <span className="animate-spin text-xs">⏳</span>
              <span>{exportProgressText}</span>
            </div>
          )}
        </div>
      </VFDialog>
    </VFPageContainer>
  );
}
