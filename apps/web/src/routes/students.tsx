import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFTabs,
  VFCard,
  VFBadge,
  VFButton,
  VFDataTable,
  VFStatCard,
  VFDrawer,
  cn,
} from '@vidyamaxx/ui';
import {
  Users,
  UserCheck,
  TrendingUp,
  ArrowRight,
  Eye,
  Plus,
  Download,
  Calendar,
  GraduationCap,
  FileCheck2,
  FileText,
  Clock,
  ShieldCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  HeartPulse,
  Printer,
  MessageSquare,
  Sparkles,
  BookOpen,
  Edit3,
  Bus,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const { activeSession, setActiveSession, academicSessions } = useGlobalStore();
  const [selectedStudentIndex, setSelectedStudentIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [selectedClassFilter, setSelectedClassFilter] = React.useState<string>('all');
  const [selectedTcFilter, setSelectedTcFilter] = React.useState<string>('all');

  // Enrolled active students dataset (Session-aware with rich dossier details)
  const allStudentsBySession: Record<string, any[]> = {
    '2026–2027': [
      {
        admNo: 'ADM-2026-001',
        name: 'Aditya Verma',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
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
      },
      {
        admNo: 'ADM-2026-002',
        name: 'Priya Sharma',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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
      },
      {
        admNo: 'ADM-2026-003',
        name: 'Rahul Gupta',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
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
      },
      {
        admNo: 'ADM-2026-004',
        name: 'Kavya Nair',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
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
      },
      {
        admNo: 'ADM-2026-005',
        name: 'Ishaan Malhotra',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
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
      },
      {
        admNo: 'ADM-2026-006',
        name: 'Sneha Rao',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
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
      },
      {
        admNo: 'ADM-2026-007',
        name: 'Vikram Mehta',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
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
      },
      {
        admNo: 'ADM-2026-008',
        name: 'Ananya Deshmukh',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
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
      },
    ],
    '2025–2026': [
      {
        admNo: 'ADM-2025-012',
        name: 'Rohan Sen',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
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
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
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

  const currentEnrolledList = (allStudentsBySession[activeSession] || allStudentsBySession['2026–2027']).filter(
    (s) => selectedClassFilter === 'all' || s.class.includes(selectedClassFilter)
  );

  const currentTcAndAlumniList = (tcAndAlumniDataBySession[activeSession] || tcAndAlumniDataBySession['2026–2027']).filter(
    (r) => {
      if (selectedTcFilter === 'tc') return r.type.includes('Transfer Certificate');
      if (selectedTcFilter === 'alumni') return r.type.includes('Passed Out');
      return true;
    }
  );

  // Active student object inside the drawer
  const activeStudent =
    selectedStudentIndex !== null && selectedStudentIndex >= 0 && selectedStudentIndex < currentEnrolledList.length
      ? currentEnrolledList[selectedStudentIndex]
      : null;

  // Next / Previous Navigation Handlers
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

  // Keyboard navigation listener for ArrowLeft / ArrowRight
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDrawerOpen) return;
      if (e.key === 'ArrowLeft') handlePrevStudent();
      if (e.key === 'ArrowRight') handleNextStudent();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, selectedStudentIndex, currentEnrolledList.length]);

  // Table Columns for Tab 1: Enrolled Students (with dedicated Photo column)
  const enrolledStudentColumns = [
    {
      header: 'Photo',
      accessorKey: 'photo',
      cell: (r: any) => (
        <div className="flex items-center justify-center">
          <img
            src={r.avatarUrl}
            alt={r.name}
            className="h-10 w-10 rounded-xl object-cover border border-primary/30 shadow-xs cursor-pointer hover:scale-105 transition-transform"
            onClick={() => openStudentDrawer(r)}
            onError={(e: any) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            onClick={() => openStudentDrawer(r)}
            className="h-10 w-10 rounded-xl bg-primary/20 text-primary font-black text-sm hidden items-center justify-center border border-primary/30 cursor-pointer"
          >
            {r.name.split(' ').map((n: string) => n[0]).join('')}
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
          className="font-mono font-bold text-primary text-base cursor-pointer hover:underline"
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
          <span className="font-extrabold text-foreground text-base group-hover:text-primary transition-colors">
            {r.name}
          </span>
        </div>
      ),
    },
    {
      header: 'Class & Section',
      accessorKey: 'class',
      cell: (r: any) => <span className="text-foreground font-bold text-base">{r.class} · Sec {r.section}</span>,
    },
    {
      header: 'Roll No',
      accessorKey: 'roll',
      cell: (r: any) => <span className="font-bold text-foreground text-base">{r.roll}</span>,
    },
    {
      header: 'House',
      accessorKey: 'house',
      cell: (r: any) => <VFBadge variant="outline">{r.house}</VFBadge>,
    },
    {
      header: 'Guardian Phone',
      accessorKey: 'phone',
      cell: (r: any) => <span className="text-muted-foreground font-mono text-base font-semibold">{r.phone}</span>,
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
          leftIcon={<Eye className="h-4 w-4" />}
          onClick={() => openStudentDrawer(r)}
        >
          View Profile
        </VFButton>
      ),
    },
  ];

  const tcAndAlumniColumns = [
    {
      header: 'Photo',
      accessorKey: 'photo',
      cell: (r: any) => (
        <div className="flex items-center justify-center">
          <img
            src={r.avatarUrl}
            alt={r.name}
            className="h-10 w-10 rounded-xl object-cover border border-amber-500/30 shadow-xs"
            onError={(e: any) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 font-black text-sm hidden items-center justify-center border border-amber-500/30">
            {r.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
        </div>
      ),
    },
    {
      header: 'Record / TC No',
      accessorKey: 'tcNo',
      cell: (r: any) => (
        <div className="flex flex-col">
          <span className="font-mono font-bold text-amber-400 text-sm">{r.tcNo}</span>
          <span className="font-mono text-xs text-muted-foreground">{r.admNo}</span>
        </div>
      ),
    },
    {
      header: 'Student Name',
      accessorKey: 'name',
      cell: (r: any) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-foreground text-base">{r.name}</span>
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
            : "bg-amber-500/15 text-amber-400 border-amber-500/30"
        )}>
          {r.type.includes('Passed Out') ? <GraduationCap className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
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

  const enrolledStudentsContent = (
    <div className="space-y-4">
      <div className="p-3 sm:p-3.5 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3.5 shadow-xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25 text-primary">
            <Calendar className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-black uppercase tracking-wider text-primary/80">Session:</span>
            <select
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-foreground outline-none cursor-pointer pr-1 hover:text-primary transition-colors border-none"
            >
              {academicSessions.map((session) => (
                <option key={session} value={session} className="bg-card text-foreground font-bold">
                  {session} {session === '2026–2027' ? '(Active)' : '(Archived)'}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border">
            <span className="text-xs font-bold text-muted-foreground">Class:</span>
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-foreground outline-none cursor-pointer pr-1 hover:text-primary transition-colors border-none"
            >
              <option value="all" className="bg-card text-foreground font-bold">All Classes & Wings</option>
              <option value="Class 9" className="bg-card text-foreground font-bold">Class 9 Only</option>
              <option value="Class 10" className="bg-card text-foreground font-bold">Class 10 Only</option>
              <option value="Class 11" className="bg-card text-foreground font-bold">Class 11 Only</option>
              <option value="Class 12" className="bg-card text-foreground font-bold">Class 12 Only</option>
            </select>
          </div>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/40 border border-border text-xs font-bold text-muted-foreground">
            <span>Enrolled:</span>
            <span className="font-extrabold text-foreground">{currentEnrolledList.length} Students</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Roster
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Add Student
          </VFButton>
        </div>
      </div>
      <VFDataTable
        columns={enrolledStudentColumns}
        data={currentEnrolledList}
        filterPlaceholder="Search by student name, roll number, or admission ID..."
      />
    </div>
  );

  const tcAndAlumniContent = (
    <div className="space-y-4">
      <div className="p-3 sm:p-3.5 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3.5 shadow-xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Calendar className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-400/80">Session:</span>
            <select
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="bg-transparent text-xs font-extrabold text-foreground outline-none cursor-pointer pr-1 hover:text-amber-400 transition-colors border-none"
            >
              {academicSessions.map((session) => (
                <option key={session} value={session} className="bg-card text-foreground font-bold">
                  {session} {session === '2026–2027' ? '(Active)' : '(Archived)'}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border">
            <span className="text-xs font-bold text-muted-foreground">Type:</span>
            <select
              value={selectedTcFilter}
              onChange={(e) => setSelectedTcFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-foreground outline-none cursor-pointer pr-1 hover:text-amber-400 transition-colors border-none"
            >
              <option value="all" className="bg-card text-foreground font-bold">All TC & Alumni Records</option>
              <option value="tc" className="bg-card text-foreground font-bold">Transfer Certificates (TC)</option>
              <option value="alumni" className="bg-card text-foreground font-bold">Passed Out Alumni</option>
            </select>
          </div>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/40 border border-border text-xs font-bold text-muted-foreground">
            <span>Records:</span>
            <span className="font-extrabold text-foreground">{currentTcAndAlumniList.length}</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export TC Ledger
          </VFButton>
          <VFButton size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Issue New TC
          </VFButton>
        </div>
      </div>
      <VFDataTable
        columns={tcAndAlumniColumns}
        data={currentTcAndAlumniList}
        filterPlaceholder="Search by student name, TC number, or destination school..."
      />
    </div>
  );

  const analyticsAndStatsContent = (
    <div className="space-y-6">
      <div className="p-3 sm:p-3.5 rounded-xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-sm font-extrabold text-foreground">
              Institutional Intelligence Scope:
            </span>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Calendar className="h-3.5 w-3.5" />
              <select
                value={activeSession}
                onChange={(e) => setActiveSession(e.target.value)}
                className="bg-transparent text-xs font-black text-foreground outline-none cursor-pointer pr-1 hover:text-blue-400 transition-colors border-none"
              >
                {academicSessions.map((session) => (
                  <option key={session} value={session} className="bg-card text-foreground font-bold">
                    AY {session} {session === '2026–2027' ? '(Active)' : '(Archived)'}
                  </option>
                ))}
              </select>
            </div>
            <VFBadge variant="outline">Verified CBSE Analytics</VFBadge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <VFButton variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export Insights PDF
          </VFButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total Enrolled"
          value={activeSession === '2026–2027' ? "1,248" : "1,180"}
          icon={<Users className="h-5 w-5" />}
          trend="up"
          trendLabel={`Session ${activeSession}`}
          accentColor="blue"
        />
        <VFStatCard
          title="Regular Attendance"
          value="96.9%"
          icon={<UserCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="1,210 Active"
          accentColor="blue"
        />
        <VFStatCard
          title="Active Class Divisions"
          value="16 Sections"
          icon={<FileText className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Classes 9 to 12"
          accentColor="blue"
        />
        <VFStatCard
          title="Academic Average"
          value="94.8%"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="up"
          trendLabel="Term 1 Benchmark"
          accentColor="blue"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        <VFStatCard
          title="Total TC Issued"
          value="142"
          icon={<FileCheck2 className="h-5 w-5" />}
          trend="up"
          trendLabel="+14 this term"
          accentColor="amber"
        />
        <VFStatCard
          title="Graduated / Alumni"
          value="310"
          icon={<GraduationCap className="h-5 w-5" />}
          trend="up"
          trendLabel="Class 12 Batch"
          accentColor="amber"
        />
        <VFStatCard
          title="Pending Verification"
          value="3 Requests"
          icon={<Clock className="h-5 w-5" />}
          trend="neutral"
          trendLabel="Principal Queue"
          accentColor="amber"
        />
        <VFStatCard
          title="CBSE Migration Rate"
          value="100%"
          icon={<ShieldCheck className="h-5 w-5" />}
          trend="up"
          trendLabel="Fully Compliant"
          accentColor="amber"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VFCard title="Gender Distribution" description="Current student population balance">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">640 Boys / 608 Girls</p>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 w-[51.2%]" />
              <div className="h-full bg-pink-500 w-[48.8%]" />
            </div>
            <p className="text-xs font-bold text-muted-foreground">51.2% Male · 48.8% Female</p>
          </div>
        </VFCard>
        <VFCard title="Quota & Reserved Seats" description="Compliance with RTE standards">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">186 Students</p>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[75%]" />
            </div>
            <p className="text-xs font-bold text-muted-foreground">15% RTE Quota fully compliant</p>
          </div>
        </VFCard>
        <VFCard title="House Allocations" description="Four competitive student squads">
          <div className="space-y-3 mt-1">
            <p className="text-2xl font-black text-foreground">4 Houses</p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/25 text-center">Red: 312</span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/25 text-center">Blue: 310</span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/25 text-center">Green: 314</span>
              <span className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 text-center">Yellow: 312</span>
            </div>
          </div>
        </VFCard>
      </div>
      <VFCard title="Class-Wise Enrollment Breakdown" description="Distribution across academic wings and sections">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-base pt-1">
          {[
            { grade: 'Class 9', total: '320 Students', sections: '4 Sections', standing: '96.2% Avg' },
            { grade: 'Class 10', total: '310 Students', sections: '4 Sections', standing: '97.8% Avg' },
            { grade: 'Class 11', total: '308 Students', sections: '4 Sections', standing: '94.5% Avg' },
            { grade: 'Class 12', total: '310 Students', sections: '4 Sections', standing: '98.1% Avg' },
          ].map((c, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-background/50 border border-border space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="font-black text-foreground text-base">{c.grade}</p>
                <VFBadge variant="outline">{c.sections}</VFBadge>
              </div>
              <p className="text-xl font-extrabold text-foreground">{c.total}</p>
              <p className="text-xs text-emerald-400 font-bold">{c.standing}</p>
            </div>
          ))}
        </div>
      </VFCard>
    </div>
  );

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
    {
      id: 'analytics_demographics',
      label: 'Student Analytics & Demographics',
      icon: <BarChart3 className="h-5 w-5" />,
      content: analyticsAndStatsContent,
    },
  ];

  return (
    <VFPageContainer>
      <VFTabs items={tabs} defaultTabId="enrolled" variant="top-bar" />

      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={activeStudent ? activeStudent.name : 'Student Dossier'}
        description={
          activeStudent
            ? `${activeStudent.admNo} · ${activeStudent.class} (Sec ${activeStudent.section}) · Roll #${activeStudent.roll}`
            : ''
        }
        className="max-w-xl sm:max-w-2xl"
        headerActions={
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border border-border">
            <button
              onClick={handlePrevStudent}
              disabled={selectedStudentIndex === 0}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
              title="Previous Student (Keyboard: ←)"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <span className="text-xs font-mono font-bold px-2 text-foreground select-none">
              {selectedStudentIndex !== null ? selectedStudentIndex + 1 : 1} / {currentEnrolledList.length}
            </span>
            <button
              onClick={handleNextStudent}
              disabled={selectedStudentIndex === currentEnrolledList.length - 1}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
              title="Next Student (Keyboard: →)"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        }
        footerActions={
          <div className="flex items-center justify-between w-full gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<MessageSquare className="h-4 w-4" />}
                onClick={() => alert(`Opening WhatsApp notification channel for ${activeStudent?.name}`)}
              >
                WhatsApp
              </VFButton>
              <VFButton
                variant="outline"
                size="sm"
                leftIcon={<Printer className="h-4 w-4" />}
                onClick={() => alert(`Printing official ID badge for ${activeStudent?.name}`)}
              >
                Print ID
              </VFButton>
            </div>
            <div className="flex items-center gap-2">
              <VFButton
                size="sm"
                leftIcon={<Edit3 className="h-4 w-4" />}
                onClick={() => alert(`Editing student profile for ${activeStudent?.name}`)}
              >
                Edit Profile
              </VFButton>
            </div>
          </div>
        }
      >
        {activeStudent && (
          <div className="space-y-5 animate-fade-in">
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/15 via-card to-card border border-primary/25 flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  src={activeStudent.avatarUrl}
                  alt={activeStudent.name}
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-primary/40 shadow-sm"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="h-20 w-20 rounded-2xl bg-primary/20 text-primary font-black text-2xl hidden items-center justify-center border-2 border-primary/40">
                  {activeStudent.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-card" />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-black text-foreground tracking-tight truncate">
                    {activeStudent.name}
                  </h3>
                  <VFBadge variant="success">{activeStudent.status}</VFBadge>
                </div>
                <p className="text-xs text-muted-foreground font-mono font-bold">
                  {activeStudent.admNo} · Roll No {activeStudent.roll}
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <VFBadge variant="outline">{activeStudent.house}</VFBadge>
                  <span className="text-xs font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border">
                    {activeStudent.class} (Sec {activeStudent.section})
                  </span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    Blood: {activeStudent.bloodGroup}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Academic Standing & Performance
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground">Attendance</span>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">{activeStudent.attendance}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground">GPA / Grade</span>
                  <p className="text-lg font-black text-primary mt-0.5">{activeStudent.gpa}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground">Class Standing</span>
                  <p className="text-lg font-black text-foreground mt-0.5">{activeStudent.rank}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border">
                  <span className="text-[11px] font-bold text-muted-foreground">Fee Status</span>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">{activeStudent.feeStatus}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary" />
                Family & Guardian Information
              </h4>
              <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground">Father / Primary Guardian</span>
                    <p className="text-sm font-extrabold text-foreground mt-0.5">{activeStudent.guardian}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground">Mother's Name</span>
                    <p className="text-sm font-extrabold text-foreground mt-0.5">{activeStudent.motherName}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground">Guardian Phone / WhatsApp</span>
                    <p className="text-sm font-mono font-bold text-primary mt-0.5">{activeStudent.phone}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-muted-foreground">Student Email Address</span>
                    <p className="text-sm font-mono font-bold text-muted-foreground mt-0.5 truncate">{activeStudent.email}</p>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-2.5">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Residential Address
                  </span>
                  <p className="text-xs font-semibold text-foreground mt-0.5">{activeStudent.address}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Bus className="h-3.5 w-3.5 text-primary" />
                School Logistics & Health Profile
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-primary" /> Assigned Class Teacher
                  </span>
                  <p className="text-sm font-bold text-foreground">{activeStudent.classTeacher}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <Bus className="h-3 w-3 text-amber-400" /> Commute & Route
                  </span>
                  <p className="text-sm font-bold text-foreground">{activeStudent.transport}</p>
                </div>
                <div className="sm:col-span-2 p-3.5 rounded-xl bg-muted/30 border border-border space-y-1">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <HeartPulse className="h-3 w-3 text-rose-400" /> Medical & Allergy Remarks
                  </span>
                  <p className="text-xs font-bold text-foreground/90">{activeStudent.medical}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </VFDrawer>
    </VFPageContainer>
  );
}
