import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import JSZip from 'jszip';
import {
  VFPageContainer,
  VFBadge,
  VFButton,
  VFDataTable,
  VFDrawer,
  VFDialog,
  cn,
} from '@vidyamaxx/ui';
import {
  UserCheck,
  ArrowRight,
  Eye,
  Plus,
  Download,
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
  Send,
  Award,
  FileCheck,
  DollarSign,
  Check,
  Copy,
  Receipt,
  X,
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

  // Enrolled students state by Academic Session
  const [enrolledStudentsMap, setEnrolledStudentsMap] = React.useState<Record<string, any[]>>(allStudentsBySession);
  const currentEnrolledList = enrolledStudentsMap[activeSession] || enrolledStudentsMap['2026–2027'] || [];

  // Certificate Modal State (TC, Character, Bonafide)
  const [isCertificateModalOpen, setIsCertificateModalOpen] = React.useState<boolean>(false);
  const [certificateType, setCertificateType] = React.useState<'tc' | 'character' | 'bonafide'>('tc');
  const [certificateStudent, setCertificateStudent] = React.useState<any>(null);
  const [tcReason, setTcReason] = React.useState<string>('Parent Relocation');
  const [destinationSchool, setDestinationSchool] = React.useState<string>('');

  const openCertificateModal = (type: 'tc' | 'character' | 'bonafide', student: any) => {
    setCertificateType(type);
    setCertificateStudent(student);
    setIsCertificateModalOpen(true);
  };

  const [isEditingStudent, setIsEditingStudent] = React.useState<boolean>(false);
  const [studentFormData, setStudentFormData] = React.useState<any>(null);

  const activeStudent =
    selectedStudentIndex !== null && selectedStudentIndex >= 0 && selectedStudentIndex < currentEnrolledList.length
      ? currentEnrolledList[selectedStudentIndex]
      : null;

  const handleStartEdit = () => {
    if (activeStudent) {
      setStudentFormData({ ...activeStudent });
      setIsEditingStudent(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingStudent(false);
    setStudentFormData(null);
  };

  const handleSaveStudent = () => {
    if (!studentFormData || selectedStudentIndex === null) return;
    const updatedList = [...currentEnrolledList];
    updatedList[selectedStudentIndex] = { ...studentFormData };
    setEnrolledStudentsMap((prev) => ({
      ...prev,
      [activeSession]: updatedList,
    }));
    setIsEditingStudent(false);
    setStudentFormData(null);
  };

  const handlePrevStudent = () => {
    if (selectedStudentIndex !== null && selectedStudentIndex > 0) {
      setIsEditingStudent(false);
      setStudentFormData(null);
      setSelectedStudentIndex(selectedStudentIndex - 1);
    }
  };

  const handleNextStudent = () => {
    if (selectedStudentIndex !== null && selectedStudentIndex < currentEnrolledList.length - 1) {
      setIsEditingStudent(false);
      setStudentFormData(null);
      setSelectedStudentIndex(selectedStudentIndex + 1);
    }
  };

  const openStudentDrawer = (student: any) => {
    const idx = currentEnrolledList.findIndex((s) => s.admNo === student.admNo);
    setSelectedStudentIndex(idx >= 0 ? idx : 0);
    setIsEditingStudent(false);
    setStudentFormData(null);
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


  // Main Students Master Table Columns
  const enrolledStudentColumns = [
    {
      header: 'Photo',
      accessorKey: 'photo',
      cell: (r: any) => (
        <div className="flex items-center justify-center">
          <div
            onClick={() => openStudentDrawer(r)}
            className="relative overflow-hidden rounded-lg border border-border/80 shadow-xs w-12 h-[61.5px] shrink-0 bg-muted flex items-center justify-center cursor-pointer group hover:border-foreground/40 hover:shadow-sm transition-all"
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
              className="w-full h-full bg-muted text-muted-foreground font-black text-sm hidden items-center justify-center border border-border"
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
        <span className="font-mono font-semibold text-foreground/90 text-sm">
          {r.admNo}
        </span>
      ),
    },
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: any) => (
        <button
          onClick={() => openStudentDrawer(r)}
          className="text-left font-bold text-foreground hover:underline cursor-pointer tracking-tight text-sm"
        >
          {r.name}
        </button>
      ),
    },
    {
      header: 'Class & Section',
      accessorKey: 'class',
      cell: (r: any) => (
        <span className="font-medium text-foreground text-sm">
          {r.class} · Sec {r.section}
        </span>
      ),
    },
    {
      header: 'Roll No',
      accessorKey: 'roll',
      cell: (r: any) => <span className="font-mono text-muted-foreground text-sm">{r.roll}</span>,
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

  return (
    <VFPageContainer className="p-4 sm:p-5 flex-1 flex flex-col min-h-0 space-y-4">
      {/* Main Clean Enrolled Students Master Table */}
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

      {/* 360° STUDENT PROFILE SIDE DRAWER */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsEditingStudent(false);
          setStudentFormData(null);
          setIsDrawerOpen(false);
        }}
        hideHeader={true}
        title={activeStudent ? activeStudent.name : 'Student Dossier'}
        className="w-[840px] max-w-[95vw] sm:max-w-3xl lg:max-w-4xl"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {isEditingStudent ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Editing Student Dossier</span>
                </div>
                <div className="flex items-center gap-2">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-3.5 w-3.5" />}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Check className="h-3.5 w-3.5" />}
                    onClick={handleSaveStudent}
                  >
                    Save Changes
                  </VFButton>
                </div>
              </>
            ) : (
              <>
                {/* 1. Bottom Stepper */}
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

                {/* 2. Action Buttons (Cleaned up: WhatsApp and Print ID are in their respective profile tabs) */}
                <div className="flex items-center gap-2">
                  <VFButton
                    size="sm"
                    leftIcon={<Edit3 className="h-3.5 w-3.5" />}
                    onClick={handleStartEdit}
                  >
                    Edit Profile
                  </VFButton>
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-3.5 w-3.5 text-muted-foreground" />}
                    onClick={() => {
                      setIsEditingStudent(false);
                      setStudentFormData(null);
                      setIsDrawerOpen(false);
                    }}
                  >
                    Close
                  </VFButton>
                </div>
              </>
            )}
          </div>
        }
      >
        {activeStudent && (
          <div className="space-y-4 animate-fade-in pb-2">
            {/* 1. Flat Clean Hero Identity Row in Uniform Container Box */}
            <div className="flex items-start gap-4 p-3.5 rounded-xl bg-muted/30 border border-border/70">
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
                    {(isEditingStudent ? (studentFormData?.name || '') : activeStudent.name).split(' ').map((n: string) => n[0]).join('')}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card" title="Active Enrollment" />
              </div>

              {/* Student Identity Information */}
              <div className="flex-1 min-w-0 space-y-2">
                {isEditingStudent ? (
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                        Student Full Name
                      </label>
                      <input
                        type="text"
                        value={studentFormData?.name || ''}
                        onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })}
                        className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-sm font-bold text-foreground outline-none transition-colors"
                        placeholder="e.g. Aditya Verma"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                          Roll No
                        </label>
                        <input
                          type="text"
                          value={studentFormData?.roll || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, roll: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-mono font-medium text-foreground outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                          Class
                        </label>
                        <select
                          value={studentFormData?.class || 'Class 9'}
                          onChange={(e) => setStudentFormData({ ...studentFormData, class: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2 py-1 text-xs font-medium text-foreground outline-none transition-colors"
                        >
                          {['Class 9', 'Class 10', 'Class 11-Sci', 'Class 11-Com', 'Class 12-Sci', 'Class 12-Com'].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                          Section
                        </label>
                        <select
                          value={studentFormData?.section || 'A'}
                          onChange={(e) => setStudentFormData({ ...studentFormData, section: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2 py-1 text-xs font-medium text-foreground outline-none transition-colors"
                        >
                          {['A', 'B', 'C', 'D'].map((s) => (
                            <option key={s} value={s}>Sec {s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                          House
                        </label>
                        <select
                          value={studentFormData?.house || 'Red House'}
                          onChange={(e) => setStudentFormData({ ...studentFormData, house: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2 py-1 text-xs font-medium text-foreground outline-none transition-colors"
                        >
                          {['Red House', 'Blue House', 'Green House', 'Yellow House'].map((h) => (
                            <option key={h} value={h}>{h}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-muted-foreground block mb-0.5">
                          Blood Group
                        </label>
                        <select
                          value={studentFormData?.bloodGroup || 'B+'}
                          onChange={(e) => setStudentFormData({ ...studentFormData, bloodGroup: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2 py-1 text-xs font-medium text-foreground outline-none transition-colors"
                        >
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                            <option key={bg} value={bg}>{bg}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                    <div className="flex items-center gap-2 flex-wrap pt-0.5">
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
                  </>
                )}
              </div>
            </div>

            {/* 2. Sleek 3-Tab Segmented Pill Navigation */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-muted/50 border border-border">
              {[
                { id: 'overview', label: 'Profile & Bio', icon: <UserCheck className="h-4 w-4" /> },
                { id: 'academics', label: 'Academics & Exams', icon: <BarChart3 className="h-4 w-4" /> },
                { id: 'credentials', label: 'Certificates & ID Card', icon: <FileText className="h-4 w-4" /> },
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

            {/* 3. Clean Box-Based Tab Content */}

            {/* TAB 1: PROFILE & BIO */}
            {drawerTab === 'overview' && (
              <div className="space-y-4 animate-fade-in pt-1">
                {/* 4 Flat KPI Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                    <span className="text-[11px] font-medium text-muted-foreground block">Attendance</span>
                    <span className="text-lg font-bold text-emerald-400 mt-0.5 block">{activeStudent.attendance}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                    <span className="text-[11px] font-medium text-muted-foreground block">GPA</span>
                    <span className="text-lg font-bold text-foreground mt-0.5 block">{activeStudent.gpa}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                    <span className="text-[11px] font-medium text-muted-foreground block">Class Rank</span>
                    <span className="text-lg font-bold text-foreground mt-0.5 block">{activeStudent.rank}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                    <span className="text-[11px] font-medium text-muted-foreground block">Fee Status</span>
                    <span className="text-lg font-bold text-emerald-400 mt-0.5 block">Cleared</span>
                  </div>
                </div>

                {/* Family & Contact Details in Uniform Boxes */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-2 border-b border-border/60">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Family & Contact Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                      <label className="text-muted-foreground text-[10px] font-bold uppercase block">
                        Father / Primary Guardian
                      </label>
                      {isEditingStudent ? (
                        <input
                          type="text"
                          value={studentFormData?.guardian || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, guardian: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-semibold text-foreground outline-none mt-1"
                        />
                      ) : (
                        <span className="font-semibold text-foreground text-sm block mt-0.5">{activeStudent.guardian}</span>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                      <label className="text-muted-foreground text-[10px] font-bold uppercase block">
                        Mother's Name
                      </label>
                      {isEditingStudent ? (
                        <input
                          type="text"
                          value={studentFormData?.motherName || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, motherName: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-semibold text-foreground outline-none mt-1"
                        />
                      ) : (
                        <span className="font-semibold text-foreground text-sm block mt-0.5">{activeStudent.motherName}</span>
                      )}
                    </div>
                  </div>

                  {/* Phone & Direct Action Box */}
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] text-muted-foreground font-bold uppercase block">Primary Contact Number</label>
                      {isEditingStudent ? (
                        <input
                          type="text"
                          value={studentFormData?.phone || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, phone: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-mono font-semibold text-foreground outline-none mt-1"
                        />
                      ) : (
                        <span className="font-mono font-bold text-foreground text-sm mt-0.5 block">{activeStudent.phone}</span>
                      )}
                    </div>
                    {!isEditingStudent && (
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
                    )}
                  </div>

                  {/* Email & Address in Uniform Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                      <label className="text-muted-foreground text-[10px] font-bold uppercase block">Student Email</label>
                      {isEditingStudent ? (
                        <input
                          type="email"
                          value={studentFormData?.email || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, email: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-mono font-medium text-foreground outline-none mt-1"
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-muted-foreground truncate">{activeStudent.email}</span>
                          <button
                            onClick={() => handleCopy(activeStudent.email, 'email')}
                            className="text-xs text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                          >
                            {copiedText === 'email' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                      <label className="text-muted-foreground text-[10px] font-bold uppercase block">Residential Address</label>
                      {isEditingStudent ? (
                        <input
                          type="text"
                          value={studentFormData?.address || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, address: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-medium text-foreground outline-none mt-1"
                        />
                      ) : (
                        <span className="font-medium text-foreground mt-0.5 block truncate">{activeStudent.address}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Operations & Medical in Uniform Boxes */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-2 border-b border-border/60">
                    <Bus className="h-3.5 w-3.5 text-muted-foreground" />
                    School Operations & Medical
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                      <label className="text-muted-foreground text-[10px] font-bold uppercase block">Class Teacher</label>
                      {isEditingStudent ? (
                        <input
                          type="text"
                          value={studentFormData?.classTeacher || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, classTeacher: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-semibold text-foreground outline-none mt-1"
                        />
                      ) : (
                        <span className="font-semibold text-foreground mt-0.5 block">{activeStudent.classTeacher}</span>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                      <label className="text-muted-foreground text-[10px] font-bold uppercase block">Commute Route</label>
                      {isEditingStudent ? (
                        <input
                          type="text"
                          value={studentFormData?.transport || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, transport: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-medium text-foreground outline-none mt-1"
                        />
                      ) : (
                        <span className="font-semibold text-foreground mt-0.5 block">{activeStudent.transport}</span>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70">
                      <label className="text-muted-foreground text-[10px] font-bold uppercase block">Medical Remarks</label>
                      {isEditingStudent ? (
                        <input
                          type="text"
                          value={studentFormData?.medical || ''}
                          onChange={(e) => setStudentFormData({ ...studentFormData, medical: e.target.value })}
                          className="w-full bg-background border border-border focus:border-foreground/50 rounded-lg px-2.5 py-1 text-xs font-medium text-foreground outline-none mt-1"
                        />
                      ) : (
                        <span className="font-medium text-muted-foreground mt-0.5 block">{activeStudent.medical}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fee Status Summary */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      Fee Ledger Overview
                    </h4>
                    <span className="text-xs font-mono font-medium text-muted-foreground">Session {activeSession}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/70 text-xs flex-wrap gap-2">
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
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30 border border-border/70 flex-wrap gap-3">
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

                {/* Scorecard Table */}
                <div className="border border-border/70 rounded-xl overflow-hidden bg-card">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/40 text-muted-foreground font-semibold border-b border-border/60">
                        <th className="py-2.5 px-3 text-left">Subject</th>
                        <th className="py-2.5 px-3 text-center">Score</th>
                        <th className="py-2.5 px-3 text-center">Grade</th>
                        <th className="py-2.5 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 font-mono">
                      {(activeStudent.recentTestScores || [
                        { subject: 'Mathematics [041]', score: '98/100', grade: 'A1' },
                        { subject: 'Science [086]', score: '95/100', grade: 'A1' },
                        { subject: 'English Core [301]', score: '92/100', grade: 'A1' },
                        { subject: 'Computer Applications [165]', score: '99/100', grade: 'A1' },
                        { subject: 'Social Science [087]', score: '94/100', grade: 'A1' },
                      ]).map((scoreItem: any, idx: number) => (
                        <tr key={idx} className="hover:bg-muted/20">
                          <td className="py-2.5 px-3 font-sans font-medium text-foreground">{scoreItem.subject}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-foreground">{scoreItem.score}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              {scoreItem.grade}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-sans font-semibold text-emerald-400">Passed</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Teacher Remark and Navigation */}
                <div className="p-3 rounded-xl bg-muted/30 border border-border/70 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Principal & Faculty Remark</span>
                  <p className="text-foreground italic">
                    "Aditya consistently exhibits exceptional analytical thinking in STEM disciplines and commendable institutional leadership."
                  </p>
                </div>

                <div className="flex items-center justify-end pt-1">
                  <Link
                    to="/examinations"
                    className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Open Comprehensive Examinations Module</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* TAB 3: CERTIFICATES, TC & ID HUB (CR80 Standard 85 : 54 Ratio) */}
            {drawerTab === 'credentials' && (
              <div className="space-y-4 animate-fade-in pt-1">
                {/* 1. 🪪 Physical Card Preview (Exact 85:54 ratio) */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Standard Student ID Card</h4>
                      <span className="text-[11px] text-muted-foreground">Standard CR-80 physical card dimensions (85.6mm × 54mm)</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Ratio 85 : 54
                    </span>
                  </div>

                  {/* ID Card Wrapper with Exact 85:54 aspect ratio */}
                  <div className="max-w-[340px] mx-auto w-full">
                    <div
                      className="w-full bg-linear-to-br from-card via-card to-muted rounded-xl border border-border/90 shadow-md p-3.5 flex flex-col justify-between select-none relative overflow-hidden"
                      style={{ aspectRatio: '85 / 54' }}
                    >
                      {/* Card Top Brand Banner */}
                      <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-4 w-4 rounded-full bg-foreground/10 flex items-center justify-center text-[9px] font-black text-foreground">
                            V
                          </div>
                          <span className="font-extrabold text-[11px] text-foreground tracking-tight">VidyaMaxx Academy</span>
                        </div>
                        <span className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-muted border border-border text-muted-foreground">
                          2026–27
                        </span>
                      </div>

                      {/* Card Body with 19.5 : 25 Portrait */}
                      <div className="flex items-center gap-3 my-auto">
                        <div
                          className="w-14 h-[71.8px] rounded-md border border-border/80 bg-muted overflow-hidden shrink-0 shadow-2xs"
                          style={{ aspectRatio: '19.5 / 25' }}
                        >
                          <img
                            src={activeStudent.avatarUrl}
                            alt={activeStudent.name}
                            style={{ aspectRatio: '19.5 / 25' }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-0.5 text-left">
                          <h5 className="font-extrabold text-xs text-foreground truncate">{activeStudent.name}</h5>
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

                      {/* Card Footer */}
                      <div className="flex items-center justify-between border-t border-border/60 pt-1">
                        <div className="flex items-center gap-0.5 h-3 opacity-60">
                          <div className="h-full w-0.5 bg-foreground" />
                          <div className="h-full w-1 bg-foreground" />
                          <div className="h-full w-0.5 bg-foreground" />
                          <div className="h-full w-1.5 bg-foreground" />
                        </div>
                        <span className="text-[8px] font-mono text-emerald-500 font-bold">
                          {activeStudent.idCardStatus || 'ACTIVE'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ID Print Actions inside the Tab */}
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

                {/* 2. 📜 Official Certificates & Transfer Clearance (TC) Hub */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-muted-foreground" />
                      Institutional Certificates & Transfer (TC)
                    </h4>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Active · Good Standing
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Transfer Certificate (TC) */}
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70 flex flex-col justify-between space-y-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
                          <FileSpreadsheet className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Transfer Certificate (TC)</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Official school leaving clearance certificate with verified dues clearance.
                        </p>
                      </div>
                      <VFButton
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        leftIcon={<FileText className="h-3.5 w-3.5" />}
                        onClick={() => openCertificateModal('tc', activeStudent)}
                      >
                        Issue / Print TC
                      </VFButton>
                    </div>

                    {/* Character Certificate */}
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70 flex flex-col justify-between space-y-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
                          <Award className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Character Certificate</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Certifies exemplary behavioral record, academic discipline, and conduct.
                        </p>
                      </div>
                      <VFButton
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
                        onClick={() => openCertificateModal('character', activeStudent)}
                      >
                        Character Certificate
                      </VFButton>
                    </div>

                    {/* Bonafide Certificate */}
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70 flex flex-col justify-between space-y-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
                          <FileCheck className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Bonafide Certificate</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Proof of institutional enrollment for visa, passport, bus pass, or bank accounts.
                        </p>
                      </div>
                      <VFButton
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        leftIcon={<Download className="h-3.5 w-3.5" />}
                        onClick={() => openCertificateModal('bonafide', activeStudent)}
                      >
                        Bonafide Certificate
                      </VFButton>
                    </div>
                  </div>
                </div>

                {/* 3. 📋 Official CBSE Board Examination Registry */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Send className="h-3.5 w-3.5 text-muted-foreground" />
                      CBSE Board & LOC Registry
                    </h4>
                    <span className="text-xs font-medium text-emerald-400">LOC Forwarded</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70 space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Official Board Roll No</span>
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

                    <div className="p-3 rounded-xl bg-muted/30 border border-border/70 space-y-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Center Code</span>
                      <span className="font-mono font-bold text-foreground block">{activeStudent.centerCode || 'DEL-CENTRAL-401'}</span>
                    </div>

                    <div className="sm:col-span-2 p-3 rounded-xl bg-muted/30 border border-border/70 text-xs">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Examination Center</span>
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

      {/* 📜 INSTITUTIONAL CERTIFICATES & TC MODAL */}
      <VFDialog
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        title={
          certificateType === 'tc'
            ? 'Official Transfer Certificate (TC)'
            : certificateType === 'character'
            ? 'Character & Conduct Certificate'
            : 'Bonafide Student Certificate'
        }
        description={`Institutional certificate generation and issuance for ${certificateStudent?.name || 'student'}`}
        className="max-w-xl"
        footerActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              onClick={() => setIsCertificateModalOpen(false)}
            >
              Cancel
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Printer className="h-4 w-4" />}
              onClick={() => {
                alert(`Printing official ${certificateType.toUpperCase()} for ${certificateStudent?.name}`);
                setIsCertificateModalOpen(false);
              }}
            >
              Print Certificate
            </VFButton>
          </>
        }
      >
        {certificateStudent && (
          <div className="p-2 space-y-4 text-xs">
            {/* Certificate Form & Verification Preview */}
            <div className="p-4 rounded-xl border border-border/80 bg-card space-y-3 font-sans">
              <div className="text-center border-b border-border/60 pb-3">
                <h3 className="font-black text-sm uppercase tracking-wider text-foreground">
                  VidyaMaxx Senior Secondary Academy
                </h3>
                <p className="text-[10px] text-muted-foreground">CBSE Affiliation No: 2130889 · Sector 14, New Delhi</p>
                <div className="inline-block mt-2 px-3 py-1 rounded bg-muted border border-border">
                  <span className="font-bold text-xs uppercase text-foreground">
                    {certificateType === 'tc'
                      ? 'TRANSFER CERTIFICATE (TC)'
                      : certificateType === 'character'
                      ? 'CHARACTER & CONDUCT CERTIFICATE'
                      : 'BONAFIDE STUDENT CERTIFICATE'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-1">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-bold">Student Name</span>
                  <span className="font-bold text-foreground text-xs">{certificateStudent.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-bold">Admission / Scholar No</span>
                  <span className="font-mono font-bold text-foreground text-xs">{certificateStudent.admNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-bold">Class & Section</span>
                  <span className="font-semibold text-foreground text-xs">{certificateStudent.class} (Sec {certificateStudent.section})</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-bold">Academic Session</span>
                  <span className="font-mono font-semibold text-foreground text-xs">{activeSession}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-bold">Father / Guardian</span>
                  <span className="font-medium text-foreground text-xs">{certificateStudent.guardian}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-bold">Issue Serial No</span>
                  <span className="font-mono font-bold text-emerald-400 text-xs">
                    {certificateType.toUpperCase()}-{activeSession.substring(0, 4)}-00492
                  </span>
                </div>
              </div>

              {certificateType === 'tc' && (
                <div className="pt-2 border-t border-border/60 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase block font-bold">TC Reason</label>
                      <select
                        value={tcReason}
                        onChange={(e) => setTcReason(e.target.value)}
                        className="w-full bg-muted border border-border rounded-md px-2 py-1 text-xs text-foreground mt-0.5 outline-none"
                      >
                        <option value="Parent Relocation">Parent Relocation</option>
                        <option value="Higher Studies">Higher Studies</option>
                        <option value="Board Stream Change">Board Stream Change</option>
                        <option value="Personal Reasons">Personal Reasons</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase block font-bold">Destination School</label>
                      <input
                        type="text"
                        value={destinationSchool}
                        onChange={(e) => setDestinationSchool(e.target.value)}
                        placeholder="e.g. Modern School, Barakhamba"
                        className="w-full bg-muted border border-border rounded-md px-2 py-1 text-xs text-foreground mt-0.5 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Verified by Institutional Registrar</span>
                <span className="font-serif italic font-bold text-foreground">Principal Seal & Signature</span>
              </div>
            </div>
          </div>
        )}
      </VFDialog>

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
