import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import JSZip from 'jszip';
import {
  VFPageContainer,
  VFTabs,
  VFBadge,
  VFButton,
  VFDataTable,
  VFDrawer,
  VFDialog,
  cn,
} from '@vidyamaxx/ui';
import {
  Users,
  UserCheck,
  ArrowRight,
  Eye,
  Plus,
  Download,
  GraduationCap,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Phone,
  Printer,
  MessageSquare,
  Edit3,
  Bus,
  FileSpreadsheet,
  Archive,
  CheckCircle2,
  Loader2,
  Settings,
  CreditCard,
  Send,
  Award,
  FileCheck,
  DollarSign,
  Check,
  Copy,
  Receipt,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const { activeSession } = useGlobalStore();
  const [selectedStudentIndex, setSelectedStudentIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [drawerTab, setDrawerTab] = React.useState<'overview' | 'academics' | 'credentials'>('overview');
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // ID Card Preview Modal State
  const [isIdCardModalOpen, setIsIdCardModalOpen] = React.useState<boolean>(false);
  const [idCardStudent, setIdCardStudent] = React.useState<any>(null);

  const openIdCardModal = (student: any) => {
    setIdCardStudent(student);
    setIsIdCardModalOpen(true);
  };

  // Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = React.useState<boolean>(false);
  const [exportFormat, setExportFormat] = React.useState<'xlsx' | 'zip' | 'bundle'>('bundle');
  const [namingPattern, setNamingPattern] = React.useState<'id-name' | 'roll-name' | 'name-id' | 'id-only' | 'custom'>('id-name');
  const [customColumnKey, setCustomColumnKey] = React.useState<string>('admNo');
  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const [exportProgressText, setExportProgressText] = React.useState<string>('');

  // Enrolled active students dataset (Session-aware with rich dossier details)
  const allStudentsBySession: Record<string, any[]> = {
    '2026–2027': [
      {
        admNo: 'ADM-2026-001',
        name: 'Aditya Verma',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
        class: 'Class 9',
        section: 'A',
        roll: '101',
        house: 'Red House',
        guardian: 'Rajesh Verma',
        motherName: 'Sunita Verma',
        phone: '+91 98765 43210',
        email: 'aditya.v@student.vidyamaxx.edu',
        address: '402, Royal Greens, Sector 14, New Delhi',
        dob: '14 May 2011',
        bloodGroup: 'B+',
        status: 'Active',
        attendance: '98.2%',
        gpa: '3.92',
        rank: '#2 in Class',
        feeStatus: 'Paid',
        transport: 'Bus Route 4 (Stop #12)',
        medical: 'No known allergies',
        classTeacher: 'Dr. Rajesh Sharma',
        session: '2026–2027',
        idCardStatus: 'Issued & Active',
        idCardIssueDate: '12 Aug 2026',
        idCardBatch: 'IDC-2026-B1',
        examFormStatus: 'Forwarded to Board',
        examRollNo: 'CBSE-2026-994812',
        centerCode: 'DEL-CENTRAL-401',
        recentTestScores: [
          { subject: 'Mathematics', score: '98/100', grade: 'A1' },
          { subject: 'Science', score: '95/100', grade: 'A1' },
          { subject: 'English Core', score: '92/100', grade: 'A1' },
          { subject: 'Computer Applications', score: '99/100', grade: 'A1' },
          { subject: 'Social Science', score: '94/100', grade: 'A1' },
        ],
      },
      {
        admNo: 'ADM-2026-002',
        name: 'Priya Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        class: 'Class 9',
        section: 'A',
        roll: '102',
        house: 'Blue House',
        guardian: 'Sunita Sharma',
        motherName: 'Sunita Sharma',
        phone: '+91 98123 45678',
        email: 'priya.s@student.vidyamaxx.edu',
        address: '11-B, Pocket C, Vasant Kunj, New Delhi',
        dob: '22 Aug 2011',
        bloodGroup: 'O+',
        status: 'Active',
        attendance: '95.4%',
        gpa: '3.88',
        rank: '#4 in Class',
        feeStatus: 'Paid',
        transport: 'Self (Parent Drop)',
        medical: 'Asthma (Inhaler with Infirmary)',
        classTeacher: 'Dr. Rajesh Sharma',
        session: '2026–2027',
        idCardStatus: 'Issued & Active',
        idCardIssueDate: '12 Aug 2026',
        idCardBatch: 'IDC-2026-B1',
        examFormStatus: 'LOC Verified (CBSE)',
        examRollNo: 'CBSE-2026-994813',
        centerCode: 'DEL-CENTRAL-401',
        recentTestScores: [
          { subject: 'Mathematics', score: '94/100', grade: 'A1' },
          { subject: 'Science', score: '96/100', grade: 'A1' },
          { subject: 'English Core', score: '95/100', grade: 'A1' },
          { subject: 'Computer Applications', score: '97/100', grade: 'A1' },
          { subject: 'Social Science', score: '91/100', grade: 'A1' },
        ],
      },
      {
        admNo: 'ADM-2026-003',
        name: 'Rahul Gupta',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        class: 'Class 9',
        section: 'B',
        roll: '103',
        house: 'Green House',
        guardian: 'Vikram Gupta',
        motherName: 'Meenakshi Gupta',
        phone: '+91 97654 32109',
        email: 'rahul.g@student.vidyamaxx.edu',
        address: '88, Anand Lok, New Delhi',
        dob: '05 Jan 2011',
        bloodGroup: 'A+',
        status: 'Active',
        attendance: '91.0%',
        gpa: '3.45',
        rank: '#14 in Class',
        feeStatus: 'Paid',
        transport: 'Bus Route 2 (Stop #5)',
        medical: 'Nut allergy',
        classTeacher: 'Ms. Pooja Rao',
        session: '2026–2027',
        idCardStatus: 'Pending Print',
        idCardIssueDate: 'Queue #04',
        idCardBatch: 'IDC-2026-B2',
        examFormStatus: 'Pending Submission',
        examRollNo: 'DRAFT-LOC-103',
        centerCode: 'Unassigned',
        recentTestScores: [
          { subject: 'Mathematics', score: '82/100', grade: 'B1' },
          { subject: 'Science', score: '85/100', grade: 'A2' },
          { subject: 'English Core', score: '88/100', grade: 'A2' },
          { subject: 'Computer Applications', score: '90/100', grade: 'A2' },
          { subject: 'Social Science', score: '79/100', grade: 'B2' },
        ],
      },
      {
        admNo: 'ADM-2026-004',
        name: 'Kavya Nair',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        class: 'Class 11-Com',
        section: 'A',
        roll: '201',
        house: 'Yellow House',
        guardian: 'Suresh Nair',
        motherName: 'Latha Nair',
        phone: '+91 99887 76655',
        email: 'kavya.n@student.vidyamaxx.edu',
        address: '304, Palm Grove, Dwarka Sector 6, New Delhi',
        dob: '19 Nov 2009',
        bloodGroup: 'AB+',
        status: 'Active',
        attendance: '97.5%',
        gpa: '3.95',
        rank: '#1 in Commerce',
        feeStatus: 'Paid',
        transport: 'Bus Route 7 (Stop #3)',
        medical: 'None',
        classTeacher: 'Mr. Deepak Mishra',
        session: '2026–2027',
        idCardStatus: 'Application Received (New)',
        idCardIssueDate: 'Verification Stage',
        idCardBatch: 'IDC-2026-B2',
        examFormStatus: 'Admit Card Released',
        examRollNo: 'CBSE-2026-884021',
        centerCode: 'DEL-SOUTH-209',
        recentTestScores: [
          { subject: 'Accountancy', score: '99/100', grade: 'A1' },
          { subject: 'Business Studies', score: '98/100', grade: 'A1' },
          { subject: 'Economics', score: '97/100', grade: 'A1' },
          { subject: 'English Core', score: '95/100', grade: 'A1' },
          { subject: 'Applied Mathematics', score: '96/100', grade: 'A1' },
        ],
      },
      {
        admNo: 'ADM-2026-005',
        name: 'Ishaan Malhotra',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        class: 'Class 11-Sci',
        section: 'B',
        roll: '202',
        house: 'Red House',
        guardian: 'Anil Malhotra',
        motherName: 'Kiran Malhotra',
        phone: '+91 98234 56789',
        email: 'ishaan.m@student.vidyamaxx.edu',
        address: '52, Shivalik Enclave, New Delhi',
        dob: '02 Feb 2009',
        bloodGroup: 'O-',
        status: 'Active',
        attendance: '94.0%',
        gpa: '3.70',
        rank: '#8 in Science',
        feeStatus: 'Paid',
        transport: 'Bus Route 9 (Stop #1)',
        medical: 'Spectacles (-2.5D)',
        classTeacher: 'Dr. Rajesh Sharma',
        session: '2026–2027',
        idCardStatus: 'Issued & Active',
        idCardIssueDate: '15 Aug 2026',
        idCardBatch: 'IDC-2026-B1',
        examFormStatus: 'Forwarded to Board',
        examRollNo: 'CBSE-2026-884022',
        centerCode: 'DEL-SOUTH-209',
        recentTestScores: [
          { subject: 'Physics', score: '91/100', grade: 'A1' },
          { subject: 'Chemistry', score: '88/100', grade: 'A2' },
          { subject: 'Mathematics', score: '93/100', grade: 'A1' },
          { subject: 'Computer Science', score: '95/100', grade: 'A1' },
          { subject: 'English Core', score: '90/100', grade: 'A2' },
        ],
      },
      {
        admNo: 'ADM-2026-006',
        name: 'Sneha Rao',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        class: 'Class 10',
        section: 'A',
        roll: '108',
        house: 'Blue House',
        guardian: 'Mahesh Rao',
        motherName: 'Deepa Rao',
        phone: '+91 97711 22334',
        email: 'sneha.r@student.vidyamaxx.edu',
        address: 'B-14, Mayur Vihar Phase 1, New Delhi',
        dob: '12 Jul 2010',
        bloodGroup: 'B-',
        status: 'Active',
        attendance: '96.2%',
        gpa: '3.81',
        rank: '#5 in Class',
        feeStatus: 'Paid',
        transport: 'Metro Pass / Self',
        medical: 'None',
        classTeacher: 'Mr. Arvind Gupta',
        session: '2026–2027',
        idCardStatus: 'Re-issue Requested',
        idCardIssueDate: 'Replacement Pending',
        idCardBatch: 'IDC-2026-RE',
        examFormStatus: 'LOC Verified (CBSE)',
        examRollNo: 'CBSE-2026-773908',
        centerCode: 'DEL-EAST-114',
        recentTestScores: [
          { subject: 'Mathematics', score: '95/100', grade: 'A1' },
          { subject: 'Science', score: '93/100', grade: 'A1' },
          { subject: 'English Core', score: '96/100', grade: 'A1' },
          { subject: 'Information Tech', score: '98/100', grade: 'A1' },
          { subject: 'Social Science', score: '92/100', grade: 'A1' },
        ],
      },
      {
        admNo: 'ADM-2026-007',
        name: 'Vikram Mehta',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
        class: 'Class 12-Com',
        section: 'A',
        roll: '304',
        house: 'Green House',
        guardian: 'Deepak Mehta',
        motherName: 'Anju Mehta',
        phone: '+91 98345 67890',
        email: 'vikram.m@student.vidyamaxx.edu',
        address: '77, Greater Kailash 2, New Delhi',
        dob: '30 Sep 2008',
        bloodGroup: 'A-',
        status: 'Active',
        attendance: '92.8%',
        gpa: '3.62',
        rank: '#11 in Commerce',
        feeStatus: 'Paid',
        transport: 'Self (Two-Wheeler)',
        medical: 'None',
        classTeacher: 'Mrs. S. Joshi',
        session: '2026–2027',
        idCardStatus: 'Issued & Active',
        idCardIssueDate: '10 Aug 2026',
        idCardBatch: 'IDC-2026-B1',
        examFormStatus: 'Admit Card Released',
        examRollNo: 'CBSE-2026-662904',
        centerCode: 'DEL-CENTRAL-401',
        recentTestScores: [
          { subject: 'Accountancy', score: '88/100', grade: 'A2' },
          { subject: 'Business Studies', score: '91/100', grade: 'A1' },
          { subject: 'Economics', score: '87/100', grade: 'A2' },
          { subject: 'English Core', score: '90/100', grade: 'A2' },
          { subject: 'Informatics Practices', score: '94/100', grade: 'A1' },
        ],
      },
      {
        admNo: 'ADM-2026-008',
        name: 'Ananya Deshmukh',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        class: 'Class 12-Sci',
        section: 'A',
        roll: '305',
        house: 'Yellow House',
        guardian: 'Sanjay Deshmukh',
        motherName: 'Rekha Deshmukh',
        phone: '+91 98456 78901',
        email: 'ananya.d@student.vidyamaxx.edu',
        address: 'C-9, Hauz Khas Enclave, New Delhi',
        dob: '18 Dec 2008',
        bloodGroup: 'AB-',
        status: 'Active',
        attendance: '99.1%',
        gpa: '3.98',
        rank: '#1 in School',
        feeStatus: 'Paid',
        transport: 'Bus Route 1 (Stop #4)',
        medical: 'None',
        classTeacher: 'Coach Vikram Singh',
        session: '2026–2027',
        idCardStatus: 'Issued & Active',
        idCardIssueDate: '10 Aug 2026',
        idCardBatch: 'IDC-2026-B1',
        examFormStatus: 'Admit Card Released',
        examRollNo: 'CBSE-2026-662905',
        centerCode: 'DEL-CENTRAL-401',
        recentTestScores: [
          { subject: 'Physics', score: '99/100', grade: 'A1' },
          { subject: 'Chemistry', score: '98/100', grade: 'A1' },
          { subject: 'Mathematics', score: '100/100', grade: 'A1' },
          { subject: 'Computer Science', score: '100/100', grade: 'A1' },
          { subject: 'English Core', score: '98/100', grade: 'A1' },
        ],
      },
    ],
    '2025–2026': [
      {
        admNo: 'ADM-2025-012',
        name: 'Rohan Sen',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        class: 'Class 10',
        section: 'A',
        roll: '112',
        house: 'Red House',
        guardian: 'Arun Sen',
        motherName: 'Shalini Sen',
        phone: '+91 98111 22233',
        email: 'rohan.s@student.vidyamaxx.edu',
        address: '104, Golf Links, New Delhi',
        dob: '10 Mar 2010',
        bloodGroup: 'B+',
        status: 'Archived',
        attendance: '94.5%',
        gpa: '3.75',
        rank: '#7 in Class',
        feeStatus: 'Paid',
        transport: 'Bus Route 3',
        medical: 'None',
        classTeacher: 'Dr. Rajesh Sharma',
        session: '2025–2026',
      },
      {
        admNo: 'ADM-2025-045',
        name: 'Tanvi Joshi',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
        class: 'Class 11-Com',
        section: 'B',
        roll: '215',
        house: 'Blue House',
        guardian: 'Vikas Joshi',
        motherName: 'Geeta Joshi',
        phone: '+91 98222 33344',
        email: 'tanvi.j@student.vidyamaxx.edu',
        address: '45, Defence Colony, New Delhi',
        dob: '25 Jun 2009',
        bloodGroup: 'O+',
        status: 'Archived',
        attendance: '96.0%',
        gpa: '3.89',
        rank: '#3 in Commerce',
        feeStatus: 'Paid',
        transport: 'Self Drop',
        medical: 'None',
        classTeacher: 'Mrs. S. Joshi',
        session: '2025–2026',
      },
      {
        admNo: 'ADM-2025-078',
        name: 'Karan Singhal',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
        class: 'Class 12-Sci',
        section: 'A',
        roll: '310',
        house: 'Green House',
        guardian: 'Rajesh Singhal',
        motherName: 'Poonam Singhal',
        phone: '+91 98333 44455',
        email: 'karan.s@student.vidyamaxx.edu',
        address: '12, Sundar Nagar, New Delhi',
        dob: '14 Jan 2008',
        bloodGroup: 'A+',
        status: 'Archived',
        attendance: '93.2%',
        gpa: '3.65',
        rank: '#9 in Science',
        feeStatus: 'Paid',
        transport: 'Bus Route 6',
        medical: 'None',
        classTeacher: 'Dr. Rajesh Sharma',
        session: '2025–2026',
      },
    ],
    '2024–2025': [
      {
        admNo: 'ADM-2024-009',
        name: 'Meera Iyer',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        class: 'Class 12-Hum',
        section: 'A',
        roll: '301',
        house: 'Yellow House',
        guardian: 'K. Iyer',
        motherName: 'Radha Iyer',
        phone: '+91 98444 55566',
        email: 'meera.i@student.vidyamaxx.edu',
        address: '9, Chanakyapuri, New Delhi',
        dob: '08 Aug 2007',
        bloodGroup: 'B+',
        status: 'Archived',
        attendance: '95.8%',
        gpa: '3.91',
        rank: '#1 in Humanities',
        feeStatus: 'Paid',
        transport: 'Self',
        medical: 'None',
        classTeacher: 'Ms. Pooja Rao',
        session: '2024–2025',
      },
      {
        admNo: 'ADM-2024-034',
        name: 'Devendra Chouhan',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        class: 'Class 12-Sci',
        section: 'B',
        roll: '318',
        house: 'Red House',
        guardian: 'N. Chouhan',
        motherName: 'Suman Chouhan',
        phone: '+91 98555 66677',
        email: 'devendra.c@student.vidyamaxx.edu',
        address: '61, Civil Lines, New Delhi',
        dob: '11 Nov 2007',
        bloodGroup: 'O+',
        status: 'Archived',
        attendance: '91.4%',
        gpa: '3.50',
        rank: '#15 in Science',
        feeStatus: 'Paid',
        transport: 'Bus Route 8',
        medical: 'None',
        classTeacher: 'Mr. Arvind Gupta',
        session: '2024–2025',
      },
    ],
  };

  // TC & Alumni / Passed out dataset (Session-aware)
  const tcAndAlumniDataBySession: Record<string, any[]> = {
    '2026–2027': [
      {
        tcNo: 'TC-2026-089',
        admNo: 'ADM-2025-104',
        name: 'Simran Kaur',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        type: 'Transfer Certificate (TC)',
        previousClass: 'Class 10-B',
        destination: 'DPS International, Noida (Parent Relocation)',
        issueDate: '12 Aug 2026',
        status: 'TC Issued',
        tcReason: 'Parent Transfer',
        conduct: 'Exemplary',
      },
      {
        tcNo: 'TC-2026-090',
        admNo: 'ADM-2024-055',
        name: 'Harshit Saxena',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        type: 'Transfer Certificate (TC)',
        previousClass: 'Class 11-Sci',
        destination: 'The Heritage School, Gurgaon',
        issueDate: '18 Aug 2026',
        status: 'TC Issued',
        tcReason: 'Board Stream Shift',
        conduct: 'Good',
      },
      {
        tcNo: 'TC-2026-091',
        admNo: 'ADM-2025-212',
        name: 'Divya Khurana',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        type: 'Transfer Certificate (TC)',
        previousClass: 'Class 8-A',
        destination: 'Army Public School, Pune',
        issueDate: '19 Aug 2026',
        status: 'Principal Review',
        tcReason: 'Defense Posting',
        conduct: 'Excellent',
      },
      {
        tcNo: 'ALUM-2026-001',
        admNo: 'ADM-2022-014',
        name: 'Aarav Pillai',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        type: 'Passed Out (Alumni)',
        previousClass: 'Class 12-Sci (2026 Batch)',
        destination: 'IIT Bombay · B.Tech CSE',
        issueDate: '30 May 2026',
        status: 'Passed Out',
        tcReason: 'CBSE Board Clearance (97.4%)',
        conduct: 'Distinction',
      },
      {
        tcNo: 'ALUM-2026-002',
        admNo: 'ADM-2022-088',
        name: 'Neha Bhattacharya',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        type: 'Passed Out (Alumni)',
        previousClass: 'Class 12-Com (2026 Batch)',
        destination: 'SRCC Delhi · B.Com (Hons)',
        issueDate: '30 May 2026',
        status: 'Passed Out',
        tcReason: 'CBSE Board Clearance (98.2%)',
        conduct: 'Distinction',
      },
      {
        tcNo: 'ALUM-2026-003',
        admNo: 'ADM-2022-105',
        name: 'Riddhima Kapoor',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        type: 'Passed Out (Alumni)',
        previousClass: 'Class 12-Hum (2026 Batch)',
        destination: 'St. Stephen’s College · BA Economics',
        issueDate: '30 May 2026',
        status: 'Passed Out',
        tcReason: 'CBSE Board Clearance (96.8%)',
        conduct: 'Distinction',
      },
    ],
    '2025–2026': [
      {
        tcNo: 'ALUM-2025-014',
        admNo: 'ADM-2021-002',
        name: 'Siddharth Roy',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        type: 'Passed Out (Alumni)',
        previousClass: 'Class 12-Sci (2025 Batch)',
        destination: 'BITS Pilani',
        issueDate: '28 May 2025',
        status: 'Passed Out',
        tcReason: 'CBSE Board Clearance (95.6%)',
        conduct: 'Distinction',
      },
      {
        tcNo: 'TC-2025-044',
        admNo: 'ADM-2023-087',
        name: 'Manav Chawla',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
        type: 'Transfer Certificate (TC)',
        previousClass: 'Class 9-A',
        destination: 'Modern School, Barakhamba',
        issueDate: '15 Oct 2025',
        status: 'TC Issued',
        tcReason: 'Residential Change',
        conduct: 'Good',
      },
    ],
    '2024–2025': [
      {
        tcNo: 'ALUM-2024-008',
        admNo: 'ADM-2020-001',
        name: 'Varun Grover',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
        type: 'Passed Out (Alumni)',
        previousClass: 'Class 12-Sci (2024 Batch)',
        destination: 'AIIMS New Delhi',
        issueDate: '25 May 2024',
        status: 'Passed Out',
        tcReason: 'CBSE Board Clearance (99.0%)',
        conduct: 'Distinction',
      },
    ],
  };

  const currentEnrolledList = allStudentsBySession[activeSession] || allStudentsBySession['2026–2027'];
  const currentTcAndAlumniList = tcAndAlumniDataBySession[activeSession] || tcAndAlumniDataBySession['2026–2027'];

  const activeStudent =
    selectedStudentIndex !== null && selectedStudentIndex >= 0 && selectedStudentIndex < currentEnrolledList.length
      ? currentEnrolledList[selectedStudentIndex]
      : null;

  const handlePrevStudent = () => {
    if (selectedStudentIndex !== null && selectedStudentIndex > 0) {
      setSelectedStudentIndex(selectedStudentIndex - 1);
    }
  };

  const handleNextStudent = () => {
    if (selectedStudentIndex !== null && selectedStudentIndex < currentEnrolledList.length - 1) {
      setSelectedStudentIndex(selectedStudentIndex + 1);
    }
  };

  const openStudentDrawer = (student: any) => {
    const idx = currentEnrolledList.findIndex((s) => s.admNo === student.admNo);
    setSelectedStudentIndex(idx >= 0 ? idx : 0);
    setIsDrawerOpen(true);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDrawerOpen) return;
      if (e.key === 'ArrowLeft') handlePrevStudent();
      if (e.key === 'ArrowRight') handleNextStudent();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, selectedStudentIndex, currentEnrolledList.length]);

  // Photo Naming Template Generator
  const getFormattedPhotoName = (student: any) => {
    const sanitize = (str: string) => String(str || '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const cleanName = sanitize(student.name);
    const cleanAdmNo = sanitize(student.admNo);
    const cleanRoll = sanitize(student.roll || '0');

    switch (namingPattern) {
      case 'id-name':
        return `${cleanAdmNo}-${cleanName}.jpg`;
      case 'roll-name':
        return `${cleanRoll}_${cleanName}.jpg`;
      case 'name-id':
        return `${cleanName}_${cleanAdmNo}.jpg`;
      case 'id-only':
        return `${cleanAdmNo}.jpg`;
      case 'custom': {
        const val = sanitize(student[customColumnKey] || 'record');
        return `${val}-${cleanName}.jpg`;
      }
      default:
        return `${cleanAdmNo}-${cleanName}.jpg`;
    }
  };

  // Helper to generate Canvas-based 19.5:25 Photo Blob
  const createPhotoBlob = async (student: any): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 390;
        canvas.height = 500; // 19.5 : 25 ratio
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => resolve(blob || new Blob([])), 'image/jpeg', 0.92);
        } else {
          resolve(new Blob([]));
        }
      };
      img.onerror = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 390;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#ea580c';
          ctx.beginPath();
          ctx.arc(195, 200, 90, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 64px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const initials = student.name.split(' ').map((n: string) => n[0]).join('');
          ctx.fillText(initials, 195, 200);

          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(student.name, 195, 340);
          ctx.fillStyle = '#94a3b8';
          ctx.font = '20px monospace';
          ctx.fillText(student.admNo, 195, 380);
          canvas.toBlob((blob) => resolve(blob || new Blob([])), 'image/jpeg', 0.92);
        } else {
          resolve(new Blob([]));
        }
      };
      img.src = student.avatarUrl;
    });
  };

  // Generate Excel Spreadsheet (.xlsx compatible XML)
  const generateXlsxSpreadsheet = (students: any[]) => {
    let xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Header">
   <Font ss:Bold="1" ss:Color="#FFFFFF" ss:Size="11"/>
   <Interior ss:Color="#EA580C" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="Data">
   <Font ss:Size="10"/>
   <Alignment ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="Mono">
   <Font ss:FontName="Courier New" ss:Bold="1" ss:Color="#0369A1" ss:Size="10"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Students Roster ${activeSession}">
  <Table ss:DefaultRowHeight="24">
   <Column ss:Width="160"/>
   <Column ss:Width="120"/>
   <Column ss:Width="150"/>
   <Column ss:Width="90"/>
   <Column ss:Width="70"/>
   <Column ss:Width="80"/>
   <Column ss:Width="100"/>
   <Column ss:Width="130"/>
   <Column ss:Width="140"/>
   <Column ss:Width="180"/>
   <Column ss:Width="90"/>
   <Column ss:Width="70"/>
   <Column ss:Width="80"/>
   <Column ss:Width="220"/>
   <Row ss:Height="28">
    <Cell ss:StyleID="Header"><Data ss:Type="String">Photo Filename (19.5x25)</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Admission No</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Student Name</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Class</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Section</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Roll No</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">House</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Guardian Name</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Guardian Phone</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Student Email</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Attendance</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">GPA</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Blood Group</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Residential Address</Data></Cell>
   </Row>`;

    students.forEach((s) => {
      const photoName = getFormattedPhotoName(s);
      xml += `
   <Row>
    <Cell ss:StyleID="Mono"><Data ss:Type="String">${photoName}</Data></Cell>
    <Cell ss:StyleID="Mono"><Data ss:Type="String">${s.admNo}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.name}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.class}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.section || 'A'}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.roll || '-'}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.house || 'Unassigned'}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.guardian || ''}</Data></Cell>
    <Cell ss:StyleID="Mono"><Data ss:Type="String">${s.phone || ''}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.email || ''}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.attendance || 'N/A'}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.gpa || 'N/A'}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.bloodGroup || 'O+'}</Data></Cell>
    <Cell ss:StyleID="Data"><Data ss:Type="String">${s.address || ''}</Data></Cell>
   </Row>`;
    });

    xml += `
  </Table>
 </Worksheet>
</Workbook>`;
    return new Blob([xml], { type: 'application/vnd.ms-excel' });
  };

  // Main Export Handler
  const handleExecuteExport = async () => {
    setIsExporting(true);
    setExportProgressText('Preparing student dossier & assets...');

    try {
      const targetList = currentEnrolledList;

      if (exportFormat === 'xlsx') {
        setExportProgressText('Generating formatted Excel spreadsheet...');
        const blob = generateXlsxSpreadsheet(targetList);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `VidyaMaxx_Students_${activeSession.replace(/[^a-zA-Z0-9]/g, '_')}_Roster.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (exportFormat === 'zip') {
        setExportProgressText(`Packaging ${targetList.length} student photos in 19.5:25 ratio...`);
        const zip = new JSZip();
        const photosFolder = zip.folder(`student_photos_${activeSession.replace(/[^a-zA-Z0-9]/g, '_')}`);

        for (let i = 0; i < targetList.length; i++) {
          const student = targetList[i];
          setExportProgressText(`Packing photo ${i + 1} of ${targetList.length} (${student.name})...`);
          const filename = getFormattedPhotoName(student);
          const photoBlob = await createPhotoBlob(student);
          photosFolder?.file(filename, photoBlob);
        }

        setExportProgressText('Compressing ZIP archive...');
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `VidyaMaxx_Student_Photos_${activeSession.replace(/[^a-zA-Z0-9]/g, '_')}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (exportFormat === 'bundle') {
        setExportProgressText(`Building complete package (Excel Roster + ${targetList.length} Photos in 19.5:25 ratio)...`);
        const zip = new JSZip();

        const xlsxBlob = generateXlsxSpreadsheet(targetList);
        zip.file(`Students_Master_Roster_${activeSession.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`, xlsxBlob);

        const photosFolder = zip.folder('student_photos_19.5x25');
        for (let i = 0; i < targetList.length; i++) {
          const student = targetList[i];
          setExportProgressText(`Processing photo ${i + 1} of ${targetList.length} (${student.name})...`);
          const filename = getFormattedPhotoName(student);
          const photoBlob = await createPhotoBlob(student);
          photosFolder?.file(filename, photoBlob);
        }

        setExportProgressText('Finalizing bundled archive...');
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `VidyaMaxx_Complete_Student_Bundle_${activeSession.replace(/[^a-zA-Z0-9]/g, '_')}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setExportProgressText('Export completed successfully!');
      setTimeout(() => {
        setIsExporting(false);
        setIsExportModalOpen(false);
        setExportProgressText('');
      }, 800);
    } catch (err) {
      console.error('Export failed', err);
      alert('Export failed. Please check permissions and retry.');
      setIsExporting(false);
      setExportProgressText('');
    }
  };

  // Table Columns for Tab 1: Enrolled Students (with 19.5 : 25 ID Photo Portrait)
  const enrolledStudentColumns = [
    {
      header: 'Photo',
      accessorKey: 'photo',
      cell: (r: any) => (
        <div className="flex items-center justify-center">
          <div
            onClick={() => openStudentDrawer(r)}
            className="relative overflow-hidden rounded-lg border border-primary/40 shadow-sm w-12 h-[61.5px] shrink-0 bg-muted flex items-center justify-center cursor-pointer group hover:border-primary hover:shadow-md transition-all"
            style={{ aspectRatio: '19.5 / 25' }}
            title="Click to view 360° student profile"
          >
            <img
              src={r.avatarUrl}
              alt={r.name}
              style={{ aspectRatio: '19.5 / 25' }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              onError={(e: any) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div
              style={{ aspectRatio: '19.5 / 25' }}
              className="w-full h-full bg-primary/20 text-primary font-black text-sm hidden items-center justify-center border border-primary/30"
            >
              {r.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Admission No',
      accessorKey: 'admNo',
      cell: (r: any) => (
        <span
          onClick={() => openStudentDrawer(r)}
          className="font-mono font-semibold text-foreground/90 text-sm cursor-pointer hover:text-primary transition-colors"
        >
          {r.admNo}
        </span>
      ),
    },
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: any) => (
        <div
          onClick={() => openStudentDrawer(r)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="font-extrabold text-foreground text-sm group-hover:text-primary transition-colors">
            {r.name}
          </span>
        </div>
      ),
    },
    {
      header: 'Class & Section',
      accessorKey: 'class',
      cell: (r: any) => <span className="text-foreground font-semibold text-sm">{r.class} · Sec {r.section}</span>,
    },
    {
      header: 'Roll No',
      accessorKey: 'roll',
      cell: (r: any) => <span className="font-mono text-muted-foreground text-sm font-medium">{r.roll}</span>,
    },
    {
      header: 'House',
      accessorKey: 'house',
      cell: (r: any) => (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold bg-muted/60 text-muted-foreground border border-border">
          <span className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            r.house?.includes('Red') && "bg-red-400",
            r.house?.includes('Blue') && "bg-blue-400",
            r.house?.includes('Green') && "bg-emerald-400",
            r.house?.includes('Yellow') && "bg-amber-400"
          )} />
          {r.house}
        </span>
      ),
    },
    {
      header: 'Guardian Phone',
      accessorKey: 'phone',
      cell: (r: any) => <span className="text-muted-foreground font-mono text-sm">{r.phone}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (r: any) => (
        <VFBadge variant={r.status === 'Active' ? 'success' : 'outline'}>
          {r.status}
        </VFBadge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: (r: any) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-3.5 w-3.5" />}
          onClick={() => openStudentDrawer(r)}
        >
          View Profile
        </VFButton>
      ),
    },
  ];

  // Table Columns for Tab 2: TC & Passed Out / Alumni (with 19.5 : 25 ID Photo Portrait)
  const tcAndAlumniColumns = [
    {
      header: 'Photo',
      accessorKey: 'photo',
      cell: (r: any) => (
        <div className="flex items-center justify-center">
          <div
            className="relative overflow-hidden rounded-lg border border-border/80 shadow-sm w-12 h-[61.5px] shrink-0 bg-muted flex items-center justify-center"
            style={{ aspectRatio: '19.5 / 25' }}
          >
            <img
              src={r.avatarUrl}
              alt={r.name}
              style={{ aspectRatio: '19.5 / 25' }}
              className="w-full h-full object-cover"
              onError={(e: any) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div
              style={{ aspectRatio: '19.5 / 25' }}
              className="w-full h-full bg-muted text-muted-foreground font-black text-sm hidden items-center justify-center"
            >
              {r.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Record / TC No',
      accessorKey: 'tcNo',
      cell: (r: any) => (
        <div className="flex flex-col">
          <span className="font-mono font-semibold text-foreground text-sm">{r.tcNo}</span>
          <span className="font-mono text-xs text-muted-foreground">{r.admNo}</span>
        </div>
      ),
    },
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: any) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-foreground text-sm">{r.name}</span>
          <span className="text-xs text-muted-foreground font-semibold">{r.previousClass}</span>
        </div>
      ),
    },
    {
      header: 'Category Type',
      accessorKey: 'type',
      cell: (r: any) => (
        <span className={cn(
          "text-xs font-bold px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5",
          r.type.includes('Passed Out')
            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            : "bg-muted text-muted-foreground border-border"
        )}>
          {r.type.includes('Passed Out') ? <GraduationCap className="h-3.5 w-3.5 text-emerald-400" /> : <ArrowRight className="h-3.5 w-3.5" />}
          {r.type}
        </span>
      ),
    },
    {
      header: 'Reason / Board Standing',
      accessorKey: 'tcReason',
      cell: (r: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground truncate max-w-[220px]">{r.tcReason}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[220px]">{r.destination}</span>
        </div>
      ),
    },
    {
      header: 'Issue / Release Date',
      accessorKey: 'issueDate',
      cell: (r: any) => <span className="font-mono text-sm font-semibold text-muted-foreground">{r.issueDate}</span>,
    },
    {
      header: 'Verification Status',
      accessorKey: 'status',
      cell: (r: any) => (
        <VFBadge variant={r.status === 'Passed Out' || r.status === 'TC Issued' ? 'success' : 'warning'}>
          {r.status}
        </VFBadge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      cell: (r: any) => (
        <div className="flex items-center gap-2">
          <VFButton
            size="sm"
            variant="outline"
            leftIcon={<Download className="h-3.5 w-3.5" />}
            onClick={() => alert(`Downloading official Certificate for ${r.name} (${r.tcNo})`)}
          >
            Certificate
          </VFButton>
        </div>
      ),
    },
  ];

  // ─── TAB 1: ENROLLED STUDENTS ────────────────────────────────────────────────
  const enrolledStudentsContent = (
    <div className="space-y-4">
      {/* Main Clean Enrolled Students Table with Unified Single Command Bar */}
      <VFDataTable
        columns={enrolledStudentColumns}
        data={currentEnrolledList}
        filterPlaceholder="Search by student name, roll number, or admission ID..."
        rightActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => setIsExportModalOpen(true)}
            >
              Export Roster
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Add Student
            </VFButton>
          </>
        }
      />
    </div>
  );

  // ─── TAB 2: TRANSFERS, TC & ALUMNI ───────────────────────────────────────────
  const tcAndAlumniContent = (
    <div className="space-y-4">
      {/* Main Clean TC & Alumni Table with Unified Single Command Bar */}
      <VFDataTable
        columns={tcAndAlumniColumns}
        data={currentTcAndAlumniList}
        filterPlaceholder="Search by student name, TC number, or destination school..."
        rightActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => setIsExportModalOpen(true)}
            >
              Export TC Ledger
            </VFButton>
            <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Issue New TC
            </VFButton>
          </>
        }
      />
    </div>
  );

  // ─── 2 TABS CONFIGURATION (CLEAN DATA PAGES) ─────────────────────────────────
  const tabs = [
    {
      id: 'enrolled',
      label: 'Enrolled Students',
      icon: <Users className="h-5 w-5" />,
      badge: currentEnrolledList.length,
      content: enrolledStudentsContent,
    },
    {
      id: 'transfers_alumni',
      label: 'Transfers, TC & Alumni',
      icon: <GraduationCap className="h-5 w-5" />,
      badge: currentTcAndAlumniList.length,
      content: tcAndAlumniContent,
    },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="enrolled" variant="top-bar" />

      {/* 360° STUDENT PROFILE SIDE DRAWER */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={activeStudent ? activeStudent.name : 'Student Dossier'}
        description={
          activeStudent
            ? `${activeStudent.admNo} · ${activeStudent.class} (Sec ${activeStudent.section}) · Roll #${activeStudent.roll}`
            : ''
        }
        className="w-[840px] max-w-[95vw] sm:max-w-3xl lg:max-w-4xl"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {/* 1. Bottom Stepper (Moved from top to save vertical space) */}
            <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border">
              <button
                onClick={handlePrevStudent}
                disabled={selectedStudentIndex === 0}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                title="Previous Student (Keyboard: ←)"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2 text-foreground select-none">
                {selectedStudentIndex !== null ? selectedStudentIndex + 1 : 1} / {currentEnrolledList.length}
              </span>
              <button
                onClick={handleNextStudent}
                disabled={selectedStudentIndex === currentEnrolledList.length - 1}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                title="Next Student (Keyboard: →)"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* 2. Action Buttons */}
            <div className="flex items-center gap-2">
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<MessageSquare className="h-3.5 w-3.5 text-emerald-400" />}
                onClick={() => window.open(`https://wa.me/${activeStudent?.phone?.replace(/[^0-9]/g, '')}`, '_blank')}
              >
                WhatsApp
              </VFButton>
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<Printer className="h-3.5 w-3.5" />}
                onClick={() => openIdCardModal(activeStudent)}
              >
                Print ID
              </VFButton>
              <VFButton
                size="sm"
                leftIcon={<Edit3 className="h-3.5 w-3.5" />}
                onClick={() => alert(`Editing student profile for ${activeStudent?.name}`)}
              >
                Edit Profile
              </VFButton>
            </div>
          </div>
        }
      >
        {activeStudent && (
          <div className="space-y-4 animate-fade-in pb-2">
            {/* 1. Flat Clean Hero Identity Row (No Box-in-Box, Clean Typography) */}
            <div className="flex items-start gap-4 pb-4 border-b border-border/60">
              {/* 19.5 : 25 Calibrated Portrait */}
              <div className="relative shrink-0">
                <div
                  className="relative overflow-hidden rounded-xl border border-border/80 shadow-xs w-20 h-[102px] bg-muted flex items-center justify-center"
                  style={{ aspectRatio: '19.5 / 25' }}
                >
                  <img
                    src={activeStudent.avatarUrl}
                    alt={activeStudent.name}
                    style={{ aspectRatio: '19.5 / 25' }}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    style={{ aspectRatio: '19.5 / 25' }}
                    className="w-full h-full bg-muted text-muted-foreground font-black text-xl hidden items-center justify-center"
                  >
                    {activeStudent.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card" title="Active Enrollment" />
              </div>

              {/* Student Identity Information */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-foreground tracking-tight truncate">
                    {activeStudent.name}
                  </h3>
                  <VFBadge variant="success">{activeStudent.status}</VFBadge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <span className="font-semibold text-foreground/90">{activeStudent.admNo}</span>
                  <span>•</span>
                  <span>Roll #{activeStudent.roll}</span>
                  <span>•</span>
                  <span>{activeStudent.class} (Sec {activeStudent.section})</span>
                </div>

                {/* Badges Row */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold bg-muted/60 text-muted-foreground border border-border">
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      activeStudent.house?.includes('Red') && "bg-red-400",
                      activeStudent.house?.includes('Blue') && "bg-blue-400",
                      activeStudent.house?.includes('Green') && "bg-emerald-400",
                      activeStudent.house?.includes('Yellow') && "bg-amber-400"
                    )} />
                    {activeStudent.house}
                  </span>

                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border">
                    🩸 {activeStudent.bloodGroup || 'B+'}
                  </span>

                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border">
                    AY {activeSession}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Sleek 3-Tab Segmented Pill Navigation */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-muted/50 border border-border">
              {[
                { id: 'overview', label: 'Profile & Bio', icon: <UserCheck className="h-4 w-4" /> },
                { id: 'academics', label: 'Academics & Exams', icon: <BarChart3 className="h-4 w-4" /> },
                { id: 'credentials', label: 'ID Card & Board', icon: <CreditCard className="h-4 w-4" /> },
              ].map((tab) => {
                const isActive = drawerTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDrawerTab(tab.id as any)}
                    className={cn(
                      "flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer outline-none",
                      isActive
                        ? "bg-card text-foreground shadow-xs border border-border font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 3. Clean Flat Tab Content (No Nested Boxes) */}

            {/* TAB 1: PROFILE & BIO */}
            {drawerTab === 'overview' && (
              <div className="space-y-4 animate-fade-in pt-1">
                {/* 4 Flat KPI Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-muted/20 border border-border/60">
                    <span className="text-[11px] font-medium text-muted-foreground block">Attendance</span>
                    <span className="text-lg font-bold text-emerald-400 mt-0.5 block">{activeStudent.attendance}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/20 border border-border/60">
                    <span className="text-[11px] font-medium text-muted-foreground block">GPA</span>
                    <span className="text-lg font-bold text-foreground mt-0.5 block">{activeStudent.gpa}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/20 border border-border/60">
                    <span className="text-[11px] font-medium text-muted-foreground block">Class Rank</span>
                    <span className="text-lg font-bold text-foreground mt-0.5 block">{activeStudent.rank}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/20 border border-border/60">
                    <span className="text-[11px] font-medium text-muted-foreground block">Fee Status</span>
                    <span className="text-lg font-bold text-emerald-400 mt-0.5 block">Cleared</span>
                  </div>
                </div>

                {/* Family & Contact Details (Flat Section) */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-2 border-b border-border/60">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Family & Contact Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Father / Primary Guardian</span>
                      <span className="font-semibold text-foreground text-sm block mt-0.5">{activeStudent.guardian}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Mother's Name</span>
                      <span className="font-semibold text-foreground text-sm block mt-0.5">{activeStudent.motherName}</span>
                    </div>
                  </div>

                  {/* Phone & Direct WhatsApp Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-muted/30 border border-border/60">
                    <div>
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase block">Primary Contact</span>
                      <span className="font-mono font-bold text-foreground text-sm">{activeStudent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(`https://wa.me/${activeStudent.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleCopy(activeStudent.phone, 'phone')}
                        className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 border border-border text-foreground text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        {copiedText === 'phone' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                        <span>{copiedText === 'phone' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Email & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Student Email</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-muted-foreground truncate">{activeStudent.email}</span>
                        <button
                          onClick={() => handleCopy(activeStudent.email, 'email')}
                          className="text-xs text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                        >
                          {copiedText === 'email' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Residential Address</span>
                      <span className="font-medium text-foreground mt-0.5 block">{activeStudent.address}</span>
                    </div>
                  </div>
                </div>

                {/* Operations & Medical (Flat Section) */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-2 border-b border-border/60">
                    <Bus className="h-3.5 w-3.5 text-muted-foreground" />
                    School Operations & Medical
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Class Teacher</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{activeStudent.classTeacher}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Commute Route</span>
                      <span className="font-semibold text-foreground mt-0.5 block">{activeStudent.transport}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-[11px] block">Medical Remarks</span>
                      <span className="font-medium text-muted-foreground mt-0.5 block">{activeStudent.medical}</span>
                    </div>
                  </div>
                </div>

                {/* Fee Status Summary (Flat Section) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      Fee Ledger Overview
                    </h4>
                    <span className="text-xs font-mono font-medium text-muted-foreground">Session {activeSession}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/60 text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-muted-foreground text-[10px] block uppercase">Annual Fee</span>
                        <span className="font-mono font-bold text-foreground text-sm">₹ 78,000</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[10px] block uppercase">Realized</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">₹ 78,000</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[10px] block uppercase">Balance</span>
                        <span className="font-mono font-bold text-foreground text-sm">₹ 0.00</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading fee receipt for ${activeStudent.name}`)}
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                    >
                      <Receipt className="h-3.5 w-3.5" />
                      <span>Download Receipt</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ACADEMICS & EXAMS */}
            {drawerTab === 'academics' && (
              <div className="space-y-4 animate-fade-in pt-1">
                {/* Term Summary Row */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/20 border border-border/60 flex-wrap gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Term 1 Assessment Report</h4>
                    <span className="text-xs text-muted-foreground">CBSE Standard Curriculum · {activeSession}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-muted-foreground text-[10px] block uppercase">Aggregate</span>
                      <span className="font-bold text-foreground text-sm">477 / 500 (95.4%)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground text-[10px] block uppercase">Cohort Rank</span>
                      <span className="font-bold text-emerald-400 text-sm">#2 / 40 (A1)</span>
                    </div>
                  </div>
                </div>

                {/* Marksheet Subject List */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold px-1 pb-1 border-b border-border/40">
                    <span>Subject</span>
                    <span className="pr-1">Score & Grade</span>
                  </div>

                  {[
                    { subject: 'Mathematics (041)', max: 100, score: 98, grade: 'A1', highest: 99, classAvg: '78.2%' },
                    { subject: 'Science (086)', max: 100, score: 95, grade: 'A1', highest: 98, classAvg: '76.5%' },
                    { subject: 'English Core (301)', max: 100, score: 92, grade: 'A1', highest: 95, classAvg: '81.0%' },
                    { subject: 'Computer Applications (165)', max: 100, score: 99, grade: 'A1', highest: 99, classAvg: '84.6%' },
                    { subject: 'Social Science (087)', max: 100, score: 94, grade: 'A1', highest: 96, classAvg: '77.8%' },
                  ].map((sub, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-muted/15 border border-border/50 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">{sub.subject}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="font-bold text-foreground">{sub.score} / {sub.max}</span>
                          <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-muted text-muted-foreground border border-border">
                            {sub.grade}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${sub.score}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                        <span>Class Avg: {sub.classAvg}</span>
                        <span>Highest: {sub.highest}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Teacher Appraisal Note */}
                <div className="p-3 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground italic">
                  "{activeStudent.name} demonstrates exceptional conceptual understanding and regular homework submissions."
                  <span className="block text-right not-italic font-semibold text-foreground pt-1">— {activeStudent.classTeacher}</span>
                </div>

                {/* Examinations Module Link */}
                <Link
                  to="/examinations"
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                >
                  <span>Open Full Examination Module</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              </div>
            )}

            {/* TAB 3: ID CARD & BOARD (Exact 85 : 54 Ratio CR80 Card Preview) */}
            {drawerTab === 'credentials' && (
              <div className="space-y-4 animate-fade-in pt-1">
                {/* 🪪 Standard CR80 Biometric ID Card Preview (Exact 85 : 54 Ratio) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                      Standard CR80 ID Card (85mm × 54mm)
                    </h4>
                    <span className="text-[11px] font-mono text-muted-foreground">Ratio: 85 : 54</span>
                  </div>

                  {/* Exact 85 : 54 Landscape CR80 Physical Card Mockup */}
                  <div className="flex justify-center py-2">
                    <div
                      className="w-full max-w-[425px] rounded-xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/40 shadow-md p-3.5 flex flex-col justify-between relative overflow-hidden"
                      style={{ aspectRatio: '85 / 54' }}
                    >
                      {/* Top Header Bar */}
                      <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                        <div>
                          <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-foreground">
                            SPRINGFIELD ACADEMY
                          </h5>
                          <p className="text-[9px] text-muted-foreground">CBSE Affiliated · AY {activeSession}</p>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-muted-foreground border border-border px-1 rounded">
                          CR-80
                        </span>
                      </div>

                      {/* Card Body: 19.5:25 Photo & Student Credentials */}
                      <div className="flex items-center gap-3 py-1">
                        {/* 19.5 : 25 Portrait */}
                        <div
                          className="relative overflow-hidden rounded-md border border-border shadow-2xs w-[66px] h-[85px] bg-muted shrink-0 flex items-center justify-center"
                          style={{ aspectRatio: '19.5 / 25' }}
                        >
                          <img
                            src={activeStudent.avatarUrl}
                            alt={activeStudent.name}
                            style={{ aspectRatio: '19.5 / 25' }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Student Details */}
                        <div className="flex-1 min-w-0 space-y-0.5 text-[11px]">
                          <p className="font-extrabold text-foreground text-xs truncate">{activeStudent.name}</p>
                          <p className="font-mono text-[10px] text-muted-foreground font-semibold">{activeStudent.admNo}</p>
                          <p className="text-muted-foreground text-[10px]">
                            {activeStudent.class} (Sec {activeStudent.section}) · Roll #{activeStudent.roll}
                          </p>
                          <div className="flex items-center gap-2 pt-0.5 text-[10px] text-muted-foreground">
                            <span>Blood: <strong>{activeStudent.bloodGroup || 'B+'}</strong></span>
                            <span>•</span>
                            <span>{activeStudent.house}</span>
                          </div>
                          <p className="text-[9px] text-muted-foreground font-mono truncate">
                            Emergency: {activeStudent.phone}
                          </p>
                        </div>
                      </div>

                      {/* Barcode & Verification Stripe */}
                      <div className="flex items-center justify-between border-t border-border/60 pt-1">
                        <div className="flex items-center gap-0.5 h-3 opacity-70">
                          <div className="h-full w-0.5 bg-foreground" />
                          <div className="h-full w-1 bg-foreground" />
                          <div className="h-full w-0.5 bg-foreground" />
                          <div className="h-full w-1.5 bg-foreground" />
                          <div className="h-full w-0.5 bg-foreground" />
                          <div className="h-full w-2 bg-foreground" />
                          <div className="h-full w-0.5 bg-foreground" />
                          <div className="h-full w-1 bg-foreground" />
                          <div className="h-full w-0.5 bg-foreground" />
                        </div>
                        <span className="text-[8px] font-mono text-muted-foreground">
                          *{activeStudent.admNo}*
                        </span>
                        <span className="text-[8px] font-mono text-emerald-400 font-bold">
                          {activeStudent.idCardStatus || 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ID Print Actions */}
                  <div className="flex items-center gap-2">
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      leftIcon={<Printer className="h-3.5 w-3.5" />}
                      onClick={() => openIdCardModal(activeStudent)}
                    >
                      Print ID Badge (85×54mm)
                    </VFButton>
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      leftIcon={<FileText className="h-3.5 w-3.5 text-muted-foreground" />}
                      onClick={() => alert(`Generated print-ready 85×54mm PDF for ${activeStudent.name}`)}
                    >
                      Export PDF Preview
                    </VFButton>
                  </div>
                </div>

                {/* 📋 Official CBSE Board Examination Registry (Flat Section) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Send className="h-3.5 w-3.5 text-muted-foreground" />
                      CBSE Board & LOC Registry
                    </h4>
                    <span className="text-xs font-medium text-emerald-400">LOC Forwarded</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-medium block">Official Board Roll No</span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-foreground">{activeStudent.examRollNo || 'CBSE-2026-994812'}</span>
                        <button
                          onClick={() => handleCopy(activeStudent.examRollNo || 'CBSE-2026-994812', 'rollNo')}
                          className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          {copiedText === 'rollNo' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-medium block">Center Code</span>
                      <span className="font-mono font-bold text-foreground block">{activeStudent.centerCode || 'DEL-CENTRAL-401'}</span>
                    </div>

                    <div className="sm:col-span-2 p-3 rounded-lg bg-muted/20 border border-border/60 text-xs">
                      <span className="text-[10px] text-muted-foreground uppercase font-medium block">Examination Center</span>
                      <span className="font-medium text-foreground mt-0.5 block">Govt Model Sr Sec School, Sector 4, Central Delhi</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      leftIcon={<FileCheck className="h-3.5 w-3.5" />}
                      onClick={() => alert(`Opening official CBSE LOC Verification Dossier for ${activeStudent.name}`)}
                    >
                      View LOC Form
                    </VFButton>
                    <VFButton
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      leftIcon={<Award className="h-3.5 w-3.5" />}
                      onClick={() => alert(`Downloading Board Admit Card for ${activeStudent.name}`)}
                    >
                      Download Admit Card
                    </VFButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </VFDrawer>

      {/* 🪪 ID CARD BADGE PREVIEW & PRINT MODAL (Exact 85 : 54 Ratio) */}
      <VFDialog
        isOpen={isIdCardModalOpen}
        onClose={() => setIsIdCardModalOpen(false)}
        title="Student Identity Card (CR-80 Standard)"
        description="Standard 85.6mm × 54mm physical card badge with 19.5:25 biometric portrait"
        className="max-w-lg"
        footerActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsIdCardModalOpen(false)}
            >
              Close
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Printer className="h-4 w-4" />}
              onClick={() => {
                alert(`Sending ID Badge print job to institutional badge printer for ${idCardStudent?.name}`);
                setIsIdCardModalOpen(false);
              }}
            >
              Print Card (85×54mm)
            </VFButton>
          </>
        }
      >
        {idCardStudent && (
          <div className="p-2 flex flex-col items-center justify-center space-y-3">
            {/* Exact 85 : 54 Ratio CR80 Physical Card */}
            <div
              className="w-full max-w-[425px] rounded-xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/40 shadow-xl p-4 flex flex-col justify-between relative overflow-hidden"
              style={{ aspectRatio: '85 / 54' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-foreground">
                    SPRINGFIELD ACADEMY
                  </h4>
                  <p className="text-[9px] text-muted-foreground">CBSE Affiliated · AY {activeSession}</p>
                </div>
                <span className="text-[9px] font-mono font-bold text-muted-foreground border border-border px-1 rounded">
                  85 × 54 mm
                </span>
              </div>

              {/* Body */}
              <div className="flex items-center gap-3.5 py-1.5">
                {/* 19.5 : 25 Portrait */}
                <div
                  className="relative overflow-hidden rounded-md border border-border shadow-2xs w-[72px] h-[92px] bg-muted shrink-0 flex items-center justify-center"
                  style={{ aspectRatio: '19.5 / 25' }}
                >
                  <img
                    src={idCardStudent.avatarUrl}
                    alt={idCardStudent.name}
                    style={{ aspectRatio: '19.5 / 25' }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-0.5 text-xs">
                  <h4 className="font-bold text-foreground text-sm truncate">{idCardStudent.name}</h4>
                  <p className="font-mono text-[11px] text-muted-foreground font-semibold">{idCardStudent.admNo}</p>
                  <p className="text-muted-foreground text-[11px]">
                    {idCardStudent.class} (Sec {idCardStudent.section}) · Roll #{idCardStudent.roll}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 text-[10px] text-muted-foreground">
                    <span>Blood: <strong>{idCardStudent.bloodGroup || 'B+'}</strong></span>
                    <span>•</span>
                    <span>{idCardStudent.house}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono truncate">
                    Emergency: {idCardStudent.phone}
                  </p>
                </div>
              </div>

              {/* Barcode Footer */}
              <div className="flex items-center justify-between border-t border-border/60 pt-1 text-[9px] font-mono text-muted-foreground">
                <div className="flex items-center gap-0.5 h-3.5 opacity-70">
                  <div className="h-full w-0.5 bg-foreground" />
                  <div className="h-full w-1 bg-foreground" />
                  <div className="h-full w-0.5 bg-foreground" />
                  <div className="h-full w-1.5 bg-foreground" />
                  <div className="h-full w-0.5 bg-foreground" />
                  <div className="h-full w-2 bg-foreground" />
                  <div className="h-full w-0.5 bg-foreground" />
                  <div className="h-full w-1 bg-foreground" />
                </div>
                <span>*{idCardStudent.admNo}*</span>
                <span className="text-emerald-400 font-bold">{idCardStudent.idCardStatus || 'Active'}</span>
              </div>
            </div>
          </div>
        )}
      </VFDialog>

      {/* 📦 ADVANCED EXPORT MODAL (XLSX, ZIP Photos in 19.5:25, and File Naming Templates) */}
      <VFDialog
        isOpen={isExportModalOpen}
        onClose={() => { if (!isExporting) setIsExportModalOpen(false); }}
        title="Export Student Data & Media Package"
        description={`Configure export format, spreadsheet columns, and 19.5 : 25 student photo naming for Session ${activeSession}`}
        className="max-w-xl"
        footerActions={
          <>
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
              leftIcon={isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              onClick={handleExecuteExport}
              disabled={isExporting}
            >
              {isExporting ? 'Generating...' : 'Start Export'}
            </VFButton>
          </>
        }
      >
        <div className="space-y-4 pt-1">
          {/* Step 1: Select Export Package Type */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-muted-foreground block mb-2">
              1. Choose Export Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Option 1: Combined Bundle */}
              <div
                onClick={() => setExportFormat('bundle')}
                className={cn(
                  "p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between",
                  exportFormat === 'bundle'
                    ? "bg-primary/15 border-primary shadow-xs ring-1 ring-primary"
                    : "bg-card border-border hover:bg-muted/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Archive className={cn("h-5 w-5", exportFormat === 'bundle' ? "text-primary" : "text-muted-foreground")} />
                    {exportFormat === 'bundle' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <h4 className="text-xs font-black text-foreground">Complete Bundle</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-tight">
                    Excel Roster + 19.5:25 Photos in ZIP
                  </p>
                </div>
                <VFBadge variant="outline" className="mt-2 text-[10px] w-fit">Recommended</VFBadge>
              </div>

              {/* Option 2: Excel Spreadsheet Only */}
              <div
                onClick={() => setExportFormat('xlsx')}
                className={cn(
                  "p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between",
                  exportFormat === 'xlsx'
                    ? "bg-primary/15 border-primary shadow-xs ring-1 ring-primary"
                    : "bg-card border-border hover:bg-muted/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <FileSpreadsheet className={cn("h-5 w-5", exportFormat === 'xlsx' ? "text-primary" : "text-muted-foreground")} />
                    {exportFormat === 'xlsx' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <h4 className="text-xs font-black text-foreground">Excel Sheet (.xlsx)</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-tight">
                    Formatted tables with photo filenames
                  </p>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground mt-2">Spreadsheet only</span>
              </div>

              {/* Option 3: Photos ZIP Only */}
              <div
                onClick={() => setExportFormat('zip')}
                className={cn(
                  "p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between",
                  exportFormat === 'zip'
                    ? "bg-primary/15 border-primary shadow-xs ring-1 ring-primary"
                    : "bg-card border-border hover:bg-muted/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Download className={cn("h-5 w-5", exportFormat === 'zip' ? "text-primary" : "text-muted-foreground")} />
                    {exportFormat === 'zip' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <h4 className="text-xs font-black text-foreground">Photos ZIP (.zip)</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-tight">
                    All images in exact 19.5:25 ratio
                  </p>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground mt-2">{currentEnrolledList.length} Photos</span>
              </div>
            </div>
          </div>

          {/* Step 2: Photo Naming Convention (Required for ZIP & DB Storage) */}
          {(exportFormat === 'zip' || exportFormat === 'bundle') && (
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Settings className="h-3.5 w-3.5 text-primary" />
                  2. Photo File Naming Template
                </label>
                <VFBadge variant="outline">Aspect 19.5 : 25</VFBadge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label
                  onClick={() => setNamingPattern('id-name')}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'id-name'
                      ? "bg-primary/10 border-primary text-foreground"
                      : "bg-card border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'id-name'}
                    onChange={() => setNamingPattern('id-name')}
                    className="text-primary accent-primary"
                  />
                  <span>{`{Unique ID}-{Student Name}`}</span>
                </label>

                <label
                  onClick={() => setNamingPattern('roll-name')}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'roll-name'
                      ? "bg-primary/10 border-primary text-foreground"
                      : "bg-card border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'roll-name'}
                    onChange={() => setNamingPattern('roll-name')}
                    className="text-primary accent-primary"
                  />
                  <span>{`{Roll No}_{Student Name}`}</span>
                </label>

                <label
                  onClick={() => setNamingPattern('name-id')}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'name-id'
                      ? "bg-primary/10 border-primary text-foreground"
                      : "bg-card border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'name-id'}
                    onChange={() => setNamingPattern('name-id')}
                    className="text-primary accent-primary"
                  />
                  <span>{`{Student Name}_{Unique ID}`}</span>
                </label>

                <label
                  onClick={() => setNamingPattern('custom')}
                  className={cn(
                    "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'custom'
                      ? "bg-primary/10 border-primary text-foreground"
                      : "bg-card border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'custom'}
                    onChange={() => setNamingPattern('custom')}
                    className="text-primary accent-primary"
                  />
                  <span>Custom Column Prefix</span>
                </label>
              </div>

              {/* Custom Unique Column Picker */}
              {namingPattern === 'custom' && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-muted-foreground">Unique Column:</span>
                  <select
                    value={customColumnKey}
                    onChange={(e) => setCustomColumnKey(e.target.value)}
                    className="bg-card border border-border text-xs font-bold text-foreground rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
                  >
                    <option value="admNo">Admission No (Unique ID)</option>
                    <option value="roll">Roll Number</option>
                    <option value="phone">Guardian Phone</option>
                    <option value="house">House Squad</option>
                  </select>
                </div>
              )}

              {/* Live Filename Preview */}
              <div className="p-2.5 rounded-lg bg-background/80 border border-border flex items-center justify-between text-xs">
                <span className="font-bold text-muted-foreground">Output Filename Preview:</span>
                <span className="font-mono font-bold text-primary truncate max-w-[280px]">
                  {currentEnrolledList[0] ? getFormattedPhotoName(currentEnrolledList[0]) : 'ADM-2026-001-Aditya_Verma.jpg'}
                </span>
              </div>
            </div>
          )}

          {/* Progress or Status message */}
          {isExporting && (
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 flex items-center gap-3 animate-pulse">
              <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />
              <p className="text-xs font-bold text-primary">{exportProgressText}</p>
            </div>
          )}
        </div>
      </VFDialog>
    </VFPageContainer>
  );
}
