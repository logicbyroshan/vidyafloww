import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
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
  Eye,
  Plus,
  Download,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Printer,
  MessageSquare,
  Edit3,
  FileSpreadsheet,
  Archive,
  CheckCircle2,
  Loader2,
  Settings,
  Send,
  Award,
  FileCheck,
  Check,
  Copy,
  Receipt,
  X,
  GraduationCap,
  Users,
  Image as ImageIcon,
  CreditCard,
  Trash2,
  Camera,
  QrCode,
  CheckCheck,
  TrendingUp,
  BookOpen,
  Quote,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export interface DossierFieldConfig {
  key: string;
  label: string;
  category: 'personal' | 'family' | 'operations';
  placeholder?: string;
  isCustom?: boolean;
  isVisible: boolean;
  type?: 'text' | 'tel' | 'email' | 'date';
}

const defaultDossierFields: DossierFieldConfig[] = [
  // Personal & Bio Identity
  { key: 'name', label: 'Student Full Legal Name', category: 'personal', isVisible: true, isCustom: false },
  { key: 'admNo', label: 'Admission Number', category: 'personal', isVisible: true, isCustom: false },
  { key: 'roll', label: 'Roll Number', category: 'personal', isVisible: true, isCustom: false },
  { key: 'classSection', label: 'Class & Section', category: 'personal', isVisible: true, isCustom: false },
  { key: 'house', label: 'House Squad', category: 'personal', isVisible: true, isCustom: false },
  { key: 'bloodGroup', label: 'Blood Group', category: 'personal', isVisible: true, isCustom: false },
  { key: 'dob', label: 'Date of Birth', category: 'personal', isVisible: true, isCustom: false },
  { key: 'aadhaarNo', label: 'Aadhaar / National ID No', category: 'personal', isVisible: true, isCustom: true },
  { key: 'category', label: 'Category / Quota', category: 'personal', isVisible: true, isCustom: true },

  // Family & Emergency Contacts
  { key: 'guardian', label: 'Father / Primary Guardian Name', category: 'family', isVisible: true, isCustom: false },
  { key: 'motherName', label: "Mother's Full Legal Name", category: 'family', isVisible: true, isCustom: false },
  { key: 'phone', label: 'Primary Emergency Contact Number', category: 'family', isVisible: true, isCustom: false },
  { key: 'email', label: 'Institutional Email Address', category: 'family', isVisible: true, isCustom: false },
  { key: 'address', label: 'Residential Home Address', category: 'family', isVisible: true, isCustom: false },
  { key: 'guardianOccupation', label: 'Guardian Occupation / Work', category: 'family', isVisible: true, isCustom: true },

  // Operations, Transport & Health
  { key: 'classTeacher', label: 'Assigned Class Teacher', category: 'operations', isVisible: true, isCustom: false },
  { key: 'transport', label: 'Commute / Transport Route', category: 'operations', isVisible: true, isCustom: false },
  { key: 'feeStatus', label: 'Fee Clearance Status', category: 'operations', isVisible: true, isCustom: false },
  { key: 'medical', label: 'Medical Remarks & Health Notes', category: 'operations', isVisible: true, isCustom: false },
  { key: 'busStop', label: 'Designated Bus Stop & Time', category: 'operations', isVisible: true, isCustom: true },
];

export const Route = createFileRoute('/students')({
  component: StudentsPage,
});

function StudentsPage() {
  const { activeSession } = useGlobalStore();
  const [selectedStudentIndex, setSelectedStudentIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [drawerTab, setDrawerTab] = React.useState<'overview' | 'academics' | 'credentials' | 'fees'>('overview');
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  // Dynamic Dossier Fields Configuration State
  const [dossierFields, setDossierFields] = React.useState<DossierFieldConfig[]>(defaultDossierFields);
  const [isFieldConfigOpen, setIsFieldConfigOpen] = React.useState<boolean>(false);
  const [newFieldLabel, setNewFieldLabel] = React.useState<string>('');
  const [newFieldCategory, setNewFieldCategory] = React.useState<'personal' | 'family' | 'operations'>('personal');

  const handleToggleField = (key: string) => {
    setDossierFields((prev) =>
      prev.map((f) => (f.key === key ? { ...f, isVisible: !f.isVisible } : f))
    );
  };

  const handleAddCustomField = () => {
    if (!newFieldLabel.trim()) return;
    const cleanKey = 'custom_' + newFieldLabel.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (dossierFields.some((f) => f.key === cleanKey)) {
      alert('A field with this name already exists.');
      return;
    }
    const newField: DossierFieldConfig = {
      key: cleanKey,
      label: newFieldLabel.trim(),
      category: newFieldCategory,
      isVisible: true,
      isCustom: true,
    };
    setDossierFields((prev) => [...prev, newField]);
    setNewFieldLabel('');
  };

  const handleDeleteCustomField = (key: string) => {
    setDossierFields((prev) => prev.filter((f) => f.key !== key));
  };

  const getFieldValue = (student: any, fieldKey: string) => {
    if (!student) return '';
    if (fieldKey === 'classSection') return `${student.class || ''} (Sec ${student.section || 'A'})`;
    if (student[fieldKey] !== undefined && student[fieldKey] !== '') return student[fieldKey];
    if (fieldKey === 'aadhaarNo') return student.aadhaarNo || '4928-1092-8841';
    if (fieldKey === 'category') return student.category || 'General / Merit';
    if (fieldKey === 'guardianOccupation') return student.guardianOccupation || 'Senior Software Engineer / Architect';
    if (fieldKey === 'busStop') return student.busStop || 'Sector 14 Main Gate (07:15 AM)';
    if (fieldKey === 'feeStatus') return 'Paid (No Dues Pending)';
    return '-';
  };

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
  const avatarFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setStudentFormData((prev: any) => ({
            ...(prev || activeStudent || {}),
            avatarUrl: resultStr,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
        <div className="flex items-center justify-start">
          <div
            onClick={() => openStudentDrawer(r)}
            className="relative overflow-hidden rounded-md border border-border/80 shadow-xs w-12 h-[61.5px] shrink-0 bg-muted flex items-center justify-center cursor-pointer group hover:border-foreground/40 hover:shadow-sm transition-all"
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
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-muted/60 text-muted-foreground border border-border">
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
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col">
      {/* Main Clean Enrolled Students Master Table */}
      <VFDataTable
        columns={enrolledStudentColumns}
        data={currentEnrolledList}
        filterPlaceholder="Search by student name, roll number, or admission ID..."
        rightActions={
          <VFButton
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => setIsExportModalOpen(true)}
          >
            Export Roster
          </VFButton>
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
        className="w-[850px] min-w-[320px] sm:min-w-[850px] max-w-[95vw]"
        bodyClassName="p-0 flex flex-col overflow-hidden"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {isEditingStudent ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2.5 h-8 flex items-center rounded-md border border-border">
                    {studentFormData?.admNo || activeStudent?.admNo}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Editing Student Records
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4" />}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<Check className="h-4 w-4" />}
                    onClick={handleSaveStudent}
                  >
                    Save Changes
                  </VFButton>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 bg-muted/60 h-8 px-1.5 rounded-md border border-border">
                  <button
                    onClick={handlePrevStudent}
                    disabled={selectedStudentIndex === 0}
                    className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Previous Student (Keyboard: ←)"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold px-2 text-foreground select-none leading-none">
                    {selectedStudentIndex !== null ? selectedStudentIndex + 1 : 1} of {currentEnrolledList.length}
                  </span>
                  <button
                    onClick={handleNextStudent}
                    disabled={selectedStudentIndex === currentEnrolledList.length - 1}
                    className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Next Student (Keyboard: →)"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4 text-muted-foreground" />}
                    onClick={() => {
                      setIsEditingStudent(false);
                      setStudentFormData(null);
                      setIsDrawerOpen(false);
                    }}
                  >
                    Close
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
        {activeStudent && (
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden animate-fade-in">
            <div className="w-full bg-card/95 backdrop-blur-md border-b border-border shrink-0">
              <div className="grid grid-cols-4 w-full">
                {[
                  { id: 'overview', label: 'Profile', icon: <UserCheck className="h-4 w-4" /> },
                  { id: 'academics', label: 'Academics & Exams', icon: <BarChart3 className="h-4 w-4" /> },
                  { id: 'credentials', label: 'Certificates & ID Card', icon: <FileText className="h-4 w-4" /> },
                  { id: 'fees', label: 'Fee & Charges', icon: <CreditCard className="h-4 w-4" /> },
                ].map((tab) => {
                  const isActive = drawerTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setDrawerTab(tab.id as any)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 py-3 text-xs font-bold transition-all cursor-pointer outline-none select-none border-b-2",
                        isActive
                          ? "bg-primary/10 text-primary border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent"
                      )}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              {drawerTab === 'overview' && (
                <div className="animate-fade-in divide-y divide-border/40">
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
                            if (isEditingStudent && avatarFileInputRef.current) {
                              avatarFileInputRef.current.click();
                            }
                          }}
                          className={cn(
                            "relative overflow-hidden rounded-md border border-border/90 shadow-sm w-24 sm:w-28 bg-muted flex items-center justify-center transition-all group",
                            isEditingStudent ? "cursor-pointer hover:ring-2 hover:ring-primary/60" : ""
                          )}
                          style={{ aspectRatio: '19.5 / 25' }}
                        >
                          <img
                            src={isEditingStudent && studentFormData?.avatarUrl ? studentFormData.avatarUrl : activeStudent.avatarUrl}
                            alt={isEditingStudent && studentFormData?.name ? studentFormData.name : activeStudent.name}
                            style={{ aspectRatio: '19.5 / 25' }}
                            className="w-full h-full object-cover"
                            onError={(e: any) => {
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div
                            style={{ aspectRatio: '19.5 / 25' }}
                            className="w-full h-full bg-muted text-muted-foreground font-black text-2xl hidden items-center justify-center"
                          >
                            {(isEditingStudent && studentFormData?.name ? studentFormData.name : activeStudent.name).split(' ').map((n: string) => n[0]).join('')}
                          </div>

                          {isEditingStudent && (
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity text-white">
                              <Camera className="h-5 w-5 text-white" />
                              <span className="text-[10px] font-bold tracking-tight">Upload</span>
                            </div>
                          )}
                        </div>
                        {isEditingStudent ? (
                          <button
                            type="button"
                            onClick={() => avatarFileInputRef.current?.click()}
                            className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer border-2 border-card"
                            title="Change Student Photo"
                          >
                            <Camera className="h-3 w-3" />
                          </button>
                        ) : (
                          <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card ring-2 ring-emerald-500/20" title="Active Enrollment" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                        {dossierFields
                          .filter((f) => f.category === 'personal' && f.isVisible)
                          .map((f) => {
                            const val = isEditingStudent && studentFormData
                              ? (studentFormData[f.key] ?? '')
                              : getFieldValue(activeStudent, f.key);
                            return (
                              <div key={f.key} className={f.key === 'name' ? 'col-span-2 sm:col-span-2' : ''}>
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">
                                  {f.label}
                                </label>
                                <input
                                  type="text"
                                  readOnly={!isEditingStudent}
                                  value={val}
                                  onChange={(e) => {
                                    if (isEditingStudent && studentFormData) {
                                      setStudentFormData({ ...studentFormData, [f.key]: e.target.value });
                                    }
                                  }}
                                  className={cn(
                                    "w-full h-9 px-3 text-xs rounded-md outline-none transition-all",
                                    isEditingStudent
                                      ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-semibold shadow-2xs"
                                      : "bg-muted/30 border border-border/70 text-foreground",
                                    f.key === 'name' ? "font-bold text-foreground" : "font-semibold text-foreground",
                                    f.key === 'admNo' || f.key === 'roll' || f.key === 'bloodGroup' || f.key === 'aadhaarNo' ? "font-mono" : ""
                                  )}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4 py-3">
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Father / Primary Guardian Name</label>
                        <input
                          type="text"
                          readOnly={!isEditingStudent}
                          value={isEditingStudent && studentFormData ? (studentFormData.guardian ?? '') : (activeStudent.guardian ?? '')}
                          onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, guardian: e.target.value })}
                          className={cn(
                            "w-full h-9 px-3 text-xs font-semibold rounded-md outline-none transition-all",
                            isEditingStudent
                              ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-semibold shadow-2xs"
                              : "bg-muted/30 border border-border/70 text-foreground"
                          )}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Mother's Full Legal Name</label>
                        <input
                          type="text"
                          readOnly={!isEditingStudent}
                          value={isEditingStudent && studentFormData ? (studentFormData.motherName ?? '') : (activeStudent.motherName ?? '')}
                          onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, motherName: e.target.value })}
                          className={cn(
                            "w-full h-9 px-3 text-xs font-semibold rounded-md outline-none transition-all",
                            isEditingStudent
                              ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-semibold shadow-2xs"
                              : "bg-muted/30 border border-border/70 text-foreground"
                          )}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Primary Emergency Contact Number</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly={!isEditingStudent}
                            value={isEditingStudent && studentFormData ? (studentFormData.phone ?? '') : (activeStudent.phone ?? '')}
                            onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, phone: e.target.value })}
                            className={cn(
                              "flex-1 h-9 px-3 text-xs font-mono font-bold rounded-md outline-none transition-all",
                              isEditingStudent
                                ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground shadow-2xs"
                                : "bg-muted/30 border border-border/70 text-foreground"
                            )}
                          />
                          {!isEditingStudent && (
                            <>
                              <button
                                onClick={() => window.open(`https://wa.me/${activeStudent.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                                className="h-9 px-3 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>WhatsApp</span>
                              </button>
                              <button
                                onClick={() => handleCopy(activeStudent.phone, 'phone')}
                                className="h-9 px-2.5 rounded-md bg-muted hover:bg-muted/80 border border-border text-foreground text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                              >
                                {copiedText === 'phone' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                                <span>{copiedText === 'phone' ? 'Copied' : 'Copy'}</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Institutional Email Address</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly={!isEditingStudent}
                            value={isEditingStudent && studentFormData ? (studentFormData.email ?? '') : (activeStudent.email ?? '')}
                            onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, email: e.target.value })}
                            className={cn(
                              "flex-1 h-9 px-3 text-xs font-mono font-semibold rounded-md outline-none truncate transition-all",
                              isEditingStudent
                                ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground shadow-2xs"
                                : "bg-muted/30 border border-border/70 text-foreground"
                            )}
                          />
                          {!isEditingStudent && (
                            <button
                              onClick={() => handleCopy(activeStudent.email, 'email')}
                              className="h-9 px-2 rounded-md bg-muted hover:bg-muted/80 border border-border text-foreground text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                            >
                              {copiedText === 'email' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                            </button>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Residential Home Address</label>
                        <input
                          type="text"
                          readOnly={!isEditingStudent}
                          value={isEditingStudent && studentFormData ? (studentFormData.address ?? '') : (activeStudent.address ?? '')}
                          onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, address: e.target.value })}
                          className={cn(
                            "w-full h-9 px-3 text-xs font-semibold rounded-md outline-none truncate transition-all",
                            isEditingStudent
                              ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-semibold shadow-2xs"
                              : "bg-muted/30 border border-border/70 text-foreground"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 py-3">
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Assigned Class Teacher</label>
                        <input
                          type="text"
                          readOnly={!isEditingStudent}
                          value={isEditingStudent && studentFormData ? (studentFormData.classTeacher ?? '') : (activeStudent.classTeacher ?? '')}
                          onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, classTeacher: e.target.value })}
                          className={cn(
                            "w-full h-9 px-3 text-xs font-semibold rounded-md outline-none transition-all",
                            isEditingStudent
                              ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-semibold shadow-2xs"
                              : "bg-muted/30 border border-border/70 text-foreground"
                          )}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Commute / Transport Route</label>
                        <input
                          type="text"
                          readOnly={!isEditingStudent}
                          value={isEditingStudent && studentFormData ? (studentFormData.transport ?? '') : (activeStudent.transport ?? '')}
                          onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, transport: e.target.value })}
                          className={cn(
                            "w-full h-9 px-3 text-xs font-semibold rounded-md outline-none transition-all",
                            isEditingStudent
                              ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-semibold shadow-2xs"
                              : "bg-muted/30 border border-border/70 text-foreground"
                          )}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Fee Clearance Status</label>
                        <input
                          type="text"
                          readOnly={!isEditingStudent}
                          value={isEditingStudent && studentFormData ? (studentFormData.feeStatus ?? 'Paid') : (activeStudent.feeStatus || 'Paid (No Dues Pending)')}
                          onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, feeStatus: e.target.value })}
                          className={cn(
                            "w-full h-9 px-3 text-xs font-bold rounded-md outline-none transition-all",
                            isEditingStudent
                              ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground shadow-2xs"
                              : "bg-muted/30 border border-border/70 text-emerald-400"
                          )}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">Medical Remarks</label>
                        <input
                          type="text"
                          readOnly={!isEditingStudent}
                          value={isEditingStudent && studentFormData ? (studentFormData.medical ?? '') : (activeStudent.medical ?? '')}
                          onChange={(e) => isEditingStudent && studentFormData && setStudentFormData({ ...studentFormData, medical: e.target.value })}
                          className={cn(
                            "w-full h-9 px-3 text-xs font-semibold rounded-md outline-none transition-all",
                            isEditingStudent
                              ? "bg-background border border-border/90 hover:border-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-semibold shadow-2xs"
                              : "bg-muted/30 border border-border/70 text-foreground"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

                {/* TAB 2: ACADEMICS & EXAMS */}
                {drawerTab === 'academics' && (
                  <div className="animate-fade-in divide-y divide-border/40">
                    {/* KPI Score Overview Strip */}
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 py-3">
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Aggregate Score</span>
                          <span className="text-xl font-black text-foreground mt-0.5 block font-mono">477 / 500</span>
                          <span className="text-[10px] text-emerald-400 mt-0.5 font-bold flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> 95.4% (Grade A1)
                          </span>
                        </div>
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Class Rank</span>
                          <span className="text-xl font-black text-emerald-400 mt-0.5 block font-mono">#2 of 40</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">Top 5% Cohort</span>
                        </div>
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">GPA / CGPA</span>
                          <span className="text-xl font-black text-foreground mt-0.5 block font-mono">{activeStudent.gpa || '3.92'}</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">Scale 4.0</span>
                        </div>
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Exam Attendance</span>
                          <span className="text-xl font-black text-emerald-400 mt-0.5 block font-mono">100%</span>
                          <span className="text-[10px] text-emerald-400 mt-0.5 block font-medium">5 / 5 Subjects</span>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Scorecard Table */}
                    <div>
                      <div className="px-4 py-3 space-y-2.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span>Term 1 Summative Assessment Scorecard</span>
                            </h4>
                            <span className="text-[11px] text-muted-foreground">CBSE Standard Curriculum · Session {activeSession}</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Published & Verified
                          </span>
                        </div>

                        <div className="border border-border/70 rounded-md overflow-hidden bg-card text-xs shadow-2xs">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted/40 text-muted-foreground font-bold text-[10px] uppercase tracking-wider border-b border-border/60">
                                <th className="py-2.5 px-3 text-left">Subject & Code</th>
                                <th className="py-2.5 px-3 text-center">Max</th>
                                <th className="py-2.5 px-3 text-center">Obtained</th>
                                <th className="py-2.5 px-3 text-center">Percent</th>
                                <th className="py-2.5 px-3 text-center">Grade</th>
                                <th className="py-2.5 px-3 text-right">Result</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40 font-mono">
                              {[
                                { subject: 'Mathematics Core', code: '041', max: 100, score: 98, grade: 'A1', pct: '98%' },
                                { subject: 'Computer Applications', code: '165', max: 100, score: 99, grade: 'A1', pct: '99%' },
                                { subject: 'Science & Tech', code: '086', max: 100, score: 95, grade: 'A1', pct: '95%' },
                                { subject: 'Social Science', code: '087', max: 100, score: 94, grade: 'A1', pct: '94%' },
                                { subject: 'English Core', code: '301', max: 100, score: 92, grade: 'A1', pct: '92%' },
                              ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                                  <td className="py-2.5 px-3 font-sans">
                                    <span className="font-semibold text-foreground block">{row.subject}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono">CODE: {row.code}</span>
                                  </td>
                                  <td className="py-2.5 px-3 text-center text-muted-foreground">{row.max}</td>
                                  <td className="py-2.5 px-3 text-center font-bold text-foreground text-sm">{row.score}</td>
                                  <td className="py-2.5 px-3 text-center text-muted-foreground text-xs">{row.pct}</td>
                                  <td className="py-2.5 px-3 text-center">
                                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                                      {row.grade}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 text-right font-sans font-bold text-emerald-400 text-xs">
                                    Passed
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Faculty Remark Card */}
                    <div>
                      <div className="px-4 py-3">
                        <div className="p-3.5 rounded-lg bg-card border border-border/80 shadow-2xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide flex items-center gap-1.5">
                              <Quote className="h-3 w-3 text-primary" />
                              <span>Principal & Class Mentor Evaluation</span>
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium">Verified by Academic Council</span>
                          </div>
                          <p className="text-foreground text-xs italic leading-relaxed">
                            "Aditya consistently exhibits exceptional analytical thinking in STEM disciplines and commendable institutional leadership across all inter-school competitions."
                          </p>
                          <div className="pt-1 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/40 flex-wrap gap-2">
                            <span>Evaluator: <strong>Dr. Rajesh Sharma (Head of Faculty)</strong></span>
                            <span>Assessment: <strong>Exemplary (Grade A1)</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tab Action Footer */}
                    <div>
                      <div className="px-4 py-3 flex items-center gap-2.5">
                        <VFButton
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                          leftIcon={<Download className="h-3.5 w-3.5" />}
                          onClick={() => alert(`Downloading Term 1 Report Card PDF for ${activeStudent.name}`)}
                        >
                          Download Report Card (PDF)
                        </VFButton>
                        <VFButton
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                          leftIcon={<Printer className="h-3.5 w-3.5" />}
                          onClick={() => alert(`Printing official academic transcript for ${activeStudent.name}`)}
                        >
                          Print Official Transcript
                        </VFButton>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CERTIFICATES & ID CARD (BALANCED & PROPORTIONED) */}
                {drawerTab === 'credentials' && (
                  <div className="animate-fade-in divide-y divide-border/40">
                    {/* Top Row: Balanced ID Card (Left) & Board Registry (Right) */}
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 py-3">
                        {/* 1. Student ID Badge Preview Card */}
                        <div className="p-3.5 rounded-lg bg-card border border-border/80 shadow-2xs flex flex-col justify-between space-y-3">
                          <div className="flex items-center justify-between border-b border-border/60 pb-2">
                            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                              <QrCode className="h-4 w-4 text-muted-foreground" />
                              <span>Student ID Badge</span>
                            </h4>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              CR-80 (85×54mm)
                            </span>
                          </div>

                          {/* Compact ID Card Preview */}
                          <div className="w-full bg-gradient-to-br from-card via-card to-muted rounded-md border border-border/90 shadow-sm p-3 flex flex-col justify-between select-none relative overflow-hidden" style={{ aspectRatio: '85 / 54' }}>
                            <div className="flex items-center justify-between border-b border-border/50 pb-1">
                              <div className="flex items-center gap-1.5">
                                <div className="h-3.5 w-3.5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[8px] font-black">
                                  V
                                </div>
                                <span className="font-extrabold text-[10px] text-foreground tracking-tight">VidyaMaxx Academy</span>
                              </div>
                              <span className="text-[8px] font-mono font-bold px-1 rounded bg-muted border border-border text-muted-foreground">
                                2026–27
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5 my-auto">
                              <div className="w-11 h-[56px] rounded border border-border/80 bg-muted overflow-hidden shrink-0 shadow-2xs" style={{ aspectRatio: '19.5 / 25' }}>
                                <img
                                  src={activeStudent.avatarUrl}
                                  alt={activeStudent.name}
                                  style={{ aspectRatio: '19.5 / 25' }}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 space-y-0.5 text-left">
                                <h5 className="font-extrabold text-[11px] text-foreground truncate">{activeStudent.name}</h5>
                                <p className="font-mono text-[9px] text-muted-foreground font-semibold">{activeStudent.admNo}</p>
                                <p className="text-muted-foreground text-[9px]">
                                  {activeStudent.class} ({activeStudent.section}) · Roll #{activeStudent.roll}
                                </p>
                                <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground font-mono">
                                  <span>Blood: <strong className="text-foreground">{activeStudent.bloodGroup || 'B+'}</strong></span>
                                  <span>•</span>
                                  <span>{activeStudent.house}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-border/50 pt-0.5">
                              <div className="flex items-center gap-0.5 h-2 opacity-60">
                                <div className="h-full w-0.5 bg-foreground" />
                                <div className="h-full w-1 bg-foreground" />
                                <div className="h-full w-0.5 bg-foreground" />
                                <div className="h-full w-1 bg-foreground" />
                              </div>
                              <span className="text-[8px] font-mono text-emerald-400 font-bold">
                                {activeStudent.idCardStatus || 'ACTIVE'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <VFButton
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              leftIcon={<Printer className="h-3.5 w-3.5" />}
                              onClick={() => openIdCardModal(activeStudent)}
                            >
                              Print ID Badge
                            </VFButton>
                            <VFButton
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              leftIcon={<FileText className="h-3.5 w-3.5 text-muted-foreground" />}
                              onClick={() => alert(`Generated print-ready 85×54mm PDF for ${activeStudent.name}`)}
                            >
                              PDF Preview
                            </VFButton>
                          </div>
                        </div>

                        {/* 2. Official CBSE Board & LOC Registry */}
                        <div className="p-3.5 rounded-lg bg-card border border-border/80 shadow-2xs flex flex-col justify-between space-y-3">
                          <div className="flex items-center justify-between border-b border-border/60 pb-2">
                            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                              <Send className="h-4 w-4 text-muted-foreground" />
                              <span>CBSE Board Examination Registry</span>
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              LOC Forwarded
                            </span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="p-2.5 rounded-md bg-muted/30 border border-border/70 flex items-center justify-between">
                              <div>
                                <span className="text-[9px] text-muted-foreground uppercase font-bold block">Board Roll No</span>
                                <span className="font-mono text-xs font-bold text-foreground">{activeStudent.examRollNo || 'CBSE-2026-994812'}</span>
                              </div>
                              <button
                                onClick={() => handleCopy(activeStudent.examRollNo || 'CBSE-2026-994812', 'rollNo')}
                                className="h-7 px-2 rounded bg-muted hover:bg-muted/80 border border-border text-[11px] font-medium text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                {copiedText === 'rollNo' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                                <span>{copiedText === 'rollNo' ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2.5 rounded-md bg-muted/30 border border-border/70">
                                <span className="text-[9px] text-muted-foreground uppercase font-bold block">Center Code</span>
                                <span className="font-mono text-xs font-bold text-foreground">{activeStudent.centerCode || 'DEL-CENTRAL-401'}</span>
                              </div>
                              <div className="p-2.5 rounded-md bg-muted/30 border border-border/70">
                                <span className="text-[9px] text-muted-foreground uppercase font-bold block">CBSE Affiliation</span>
                                <span className="font-mono text-xs font-bold text-foreground">2130889</span>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-md bg-muted/30 border border-border/70">
                              <span className="text-[9px] text-muted-foreground uppercase font-bold block">Exam Center Venue</span>
                              <span className="text-[11px] font-semibold text-foreground truncate block mt-0.5">Govt Model Sr Sec School, Sector 4, New Delhi</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <VFButton
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              leftIcon={<FileCheck className="h-3.5 w-3.5" />}
                              onClick={() => alert(`Opening official CBSE LOC Verification Dossier for ${activeStudent.name}`)}
                            >
                              View LOC Form
                            </VFButton>
                            <VFButton
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              leftIcon={<Award className="h-3.5 w-3.5" />}
                              onClick={() => alert(`Downloading Board Admit Card for ${activeStudent.name}`)}
                            >
                              Download Admit Card
                            </VFButton>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: 3 Equal Institutional Certificates */}
                    <div>
                      <div className="px-4 py-3 space-y-2.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span>Institutional Certificates Hub</span>
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                            Digital Seal & Verified
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {/* 1. Transfer Certificate */}
                          <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-foreground/30 transition-colors">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
                                  <FileSpreadsheet className="h-4 w-4 text-primary" />
                                  <span>Transfer Certificate</span>
                                </div>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  Clearance OK
                                </span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Official school leaving & migration certificate with verified accounts clearance.
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

                          {/* 2. Character Certificate */}
                          <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-foreground/30 transition-colors">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
                                  <Award className="h-4 w-4 text-emerald-400" />
                                  <span>Character Certificate</span>
                                </div>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  Exemplary
                                </span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Certifies exemplary moral conduct, behavioral discipline, and academic standing.
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

                          {/* 3. Bonafide Certificate */}
                          <div className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs flex flex-col justify-between space-y-2.5 hover:border-foreground/30 transition-colors">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
                                  <FileCheck className="h-4 w-4 text-blue-400" />
                                  <span>Bonafide Certificate</span>
                                </div>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                                  Instant
                                </span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Formal proof of active enrollment for passport, visa, bus pass, and bank records.
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
                    </div>
                  </div>
                )}

                {/* TAB 4: FEE & CHARGES (REFINED & BEST LOOKING) */}
                {drawerTab === 'fees' && (
                  <div className="animate-fade-in divide-y divide-border/40">
                    {/* KPI Metrics Strip */}
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 py-3">
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Annual Total Fee</span>
                          <span className="text-xl font-black text-foreground mt-0.5 block font-mono">₹ 78,000</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">AY {activeSession}</span>
                        </div>
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Realized / Paid</span>
                          <span className="text-xl font-black text-emerald-400 mt-0.5 block font-mono">₹ 78,000</span>
                          <span className="text-[10px] text-emerald-400 mt-0.5 font-bold flex items-center gap-1">
                            <CheckCheck className="h-3 w-3" /> 100% Realized
                          </span>
                        </div>
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Outstanding Balance</span>
                          <span className="text-xl font-black text-foreground mt-0.5 block font-mono">₹ 0.00</span>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">Zero Dues Pending</span>
                        </div>
                        <div className="p-3 rounded-md bg-muted/30 border border-border/70 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block">Ledger Standing</span>
                          <span className="text-xl font-black text-emerald-400 mt-0.5 block">Cleared</span>
                          <span className="text-[10px] text-emerald-400 mt-0.5 font-semibold">Good Standing</span>
                        </div>
                      </div>
                    </div>

                    {/* Fee Component Breakdown */}
                    <div>
                      <div className="px-4 py-3 space-y-2.5">
                        <div className="flex items-center justify-between pb-1 border-b border-border/60">
                          <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span>Institutional Fee Structure & Schedule</span>
                          </h4>
                          <span className="text-[10px] font-mono font-medium text-muted-foreground">CBSE Enrolled</span>
                        </div>

                        <div className="border border-border/70 rounded-md overflow-hidden bg-card text-xs shadow-2xs">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted/40 text-muted-foreground font-bold text-[10px] uppercase tracking-wider border-b border-border/60">
                                <th className="py-2.5 px-3 text-left">Component Item</th>
                                <th className="py-2.5 px-3 text-left">Frequency</th>
                                <th className="py-2.5 px-3 text-right">Standard Fee</th>
                                <th className="py-2.5 px-3 text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40 font-mono">
                              {[
                                { item: 'Tuition & Core Instruction Fee', freq: 'Annual / Quarterly', amt: '₹ 52,000', status: 'Paid' },
                                { item: 'Science & Advanced Computing Lab', freq: 'Per Semester', amt: '₹ 12,000', status: 'Paid' },
                                { item: 'Digital Library & Portal License', freq: 'Annual', amt: '₹ 4,000', status: 'Paid' },
                                { item: 'Commute & Transport Route #4', freq: 'Quarterly', amt: '₹ 10,000', status: 'Paid' },
                              ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                                  <td className="py-2.5 px-3 font-sans font-semibold text-foreground">{row.item}</td>
                                  <td className="py-2.5 px-3 font-sans text-muted-foreground text-[11px]">{row.freq}</td>
                                  <td className="py-2.5 px-3 text-right font-bold text-foreground">{row.amt}</td>
                                  <td className="py-2.5 px-3 text-right font-sans font-bold text-emerald-400">{row.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Payment Installment History */}
                    <div>
                      <div className="px-4 py-3 space-y-2.5">
                        <div className="flex items-center justify-between pb-1 border-b border-border/60">
                          <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                            <Receipt className="h-4 w-4 text-muted-foreground" />
                            <span>Quarterly Installment Receipts & Transaction Ledger</span>
                          </h4>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">4 of 4 Quarters Paid</span>
                        </div>

                        <div className="space-y-2">
                          {[
                            { qtr: 'Quarter 1 (Apr – Jun 2026)', date: '10 Apr 2026', amt: '₹ 19,500', mode: 'Online NetBanking', receipt: 'REC-2026-0891' },
                            { qtr: 'Quarter 2 (Jul – Sep 2026)', date: '08 Jul 2026', amt: '₹ 19,500', mode: 'UPI Gateway', receipt: 'REC-2026-2144' },
                            { qtr: 'Quarter 3 (Oct – Dec 2026)', date: '05 Oct 2026', amt: '₹ 19,500', mode: 'Card POS', receipt: 'REC-2026-4401' },
                            { qtr: 'Quarter 4 (Jan – Mar 2027)', date: '02 Jan 2027', amt: '₹ 19,500', mode: 'Bank Transfer', receipt: 'REC-2027-6612' },
                          ].map((tx, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-card border border-border/80 shadow-2xs flex items-center justify-between gap-3 flex-wrap text-xs hover:border-foreground/30 transition-colors">
                              <div className="min-w-0">
                                <span className="font-bold text-foreground block">{tx.qtr}</span>
                                <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono mt-0.5">
                                  <span>{tx.receipt}</span>
                                  <span>•</span>
                                  <span>{tx.date}</span>
                                  <span>•</span>
                                  <span>{tx.mode}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono font-black text-foreground text-sm">{tx.amt}</span>
                                <button
                                  onClick={() => alert(`Downloading fee receipt ${tx.receipt} for ${activeStudent.name}`)}
                                  className="h-8 px-2.5 rounded-md bg-muted hover:bg-muted/80 border border-border text-xs font-bold text-foreground flex items-center gap-1.5 cursor-pointer transition-colors"
                                >
                                  <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>Receipt (PDF)</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Consolidated Actions */}
                    <div>
                      <div className="px-4 py-3 flex items-center gap-2.5">
                        <VFButton
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                          leftIcon={<Download className="h-3.5 w-3.5" />}
                          onClick={() => alert(`Generated Annual Fee Clearance Certificate for ${activeStudent.name}`)}
                        >
                          Fee Clearance Certificate
                        </VFButton>
                        <VFButton
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                          leftIcon={<Printer className="h-3.5 w-3.5" />}
                          onClick={() => alert(`Printing Consolidated Account Statement for ${activeStudent.name}`)}
                        >
                          Print Account Statement
                        </VFButton>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </VFDrawer>

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
            <div className="p-4 rounded-md border border-border/80 bg-card space-y-3 font-sans">
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
            <div
              className="w-full max-w-[425px] rounded-md border border-border/80 bg-gradient-to-br from-card via-card to-muted/40 shadow-xl p-4 flex flex-col justify-between relative overflow-hidden"
              style={{ aspectRatio: '85 / 54' }}
            >
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

              <div className="flex items-center gap-3.5 py-1.5">
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

      <VFDialog
        isOpen={isExportModalOpen}
        onClose={() => { if (!isExporting) setIsExportModalOpen(false); }}
        title="Export Student Directory & Media Package"
        description={`Download structured student records, institutional spreadsheets, and high-resolution 19.5 : 25 photo archives for Academic Session ${activeSession}.`}
        className="max-w-4xl w-full"
        footerActions={
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-muted-foreground font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              <span>{currentEnrolledList.length} Students Selected for Export</span>
            </div>
            <div className="flex items-center gap-2.5">
              <VFButton
                variant="outline"
                size="md"
                onClick={() => setIsExportModalOpen(false)}
                disabled={isExporting}
              >
                Cancel
              </VFButton>
              <VFButton
                size="md"
                leftIcon={isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                onClick={handleExecuteExport}
                disabled={isExporting}
                className="font-bold min-w-[160px]"
              >
                {isExporting
                  ? 'Generating...'
                  : exportFormat === 'bundle'
                  ? 'Export Bundle (.zip)'
                  : exportFormat === 'xlsx'
                  ? 'Export Excel (.xlsx)'
                  : 'Export Photos (.zip)'}
              </VFButton>
            </div>
          </div>
        }
      >
        <div className="space-y-5 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-muted/40 border border-border/80 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md bg-blue-500/15 text-blue-400 flex items-center justify-center font-black shrink-0 border border-blue-500/30">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Session Context</p>
                <p className="font-bold text-foreground truncate">{activeSession}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-black shrink-0 border border-emerald-500/30">
                <Users className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Total Population</p>
                <p className="font-bold text-foreground truncate">{currentEnrolledList.length} Active Records</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-md bg-purple-500/15 text-purple-400 flex items-center justify-center font-black shrink-0 border border-purple-500/30">
                <ImageIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Media Format</p>
                <p className="font-bold text-foreground truncate">19.5 : 25 Portrait Aspect</p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-black">1</span>
                Choose Export Package
              </label>
              <span className="text-[11px] text-muted-foreground font-medium">Select desired data and media bundle format</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div
                onClick={() => setExportFormat('bundle')}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden group shadow-xs",
                  exportFormat === 'bundle'
                    ? "bg-blue-500/10 border-blue-500/80 shadow-md ring-1 ring-blue-500/40"
                    : "bg-[#1a1a24] border-border/80 hover:border-border hover:bg-[#20202d]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn(
                      "h-10 w-10 rounded-md flex items-center justify-center border transition-all",
                      exportFormat === 'bundle'
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                        : "bg-muted text-muted-foreground border-border"
                    )}>
                      <Archive className="h-5 w-5" />
                    </div>
                    {exportFormat === 'bundle' ? (
                      <CheckCircle2 className="h-5 w-5 text-blue-400 animate-in zoom-in-50" />
                    ) : (
                      <VFBadge variant="outline" className="text-[10px]">Popular</VFBadge>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-foreground mb-1">Complete Bundle (.zip)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Excel master spreadsheet + HD student portraits in standardized 19.5:25 ratio.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="text-blue-400 font-bold">✓</span> Full demographic columns
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="text-blue-400 font-bold">✓</span> {currentEnrolledList.length} Photos packaged in ZIP
                  </div>
                </div>
              </div>

              <div
                onClick={() => setExportFormat('xlsx')}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden group shadow-xs",
                  exportFormat === 'xlsx'
                    ? "bg-emerald-500/10 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/40"
                    : "bg-[#1a1a24] border-border/80 hover:border-border hover:bg-[#20202d]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn(
                      "h-10 w-10 rounded-md flex items-center justify-center border transition-all",
                      exportFormat === 'xlsx'
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        : "bg-muted text-muted-foreground border-border"
                    )}>
                      <FileSpreadsheet className="h-5 w-5" />
                    </div>
                    {exportFormat === 'xlsx' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-in zoom-in-50" />
                    ) : (
                      <VFBadge variant="outline" className="text-[10px]">Fast</VFBadge>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-foreground mb-1">Excel Sheet (.xlsx)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Formatted tables with admission IDs, contacts, academic records, and photo filenames.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="text-emerald-400 font-bold">✓</span> Clean Excel workbook
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="text-emerald-400 font-bold">✓</span> Photo URLs & filenames linked
                  </div>
                </div>
              </div>

              <div
                onClick={() => setExportFormat('zip')}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden group shadow-xs",
                  exportFormat === 'zip'
                    ? "bg-purple-500/10 border-purple-500/80 shadow-md ring-1 ring-purple-500/40"
                    : "bg-[#1a1a24] border-border/80 hover:border-border hover:bg-[#20202d]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn(
                      "h-10 w-10 rounded-md flex items-center justify-center border transition-all",
                      exportFormat === 'zip'
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
                        : "bg-muted text-muted-foreground border-border"
                    )}>
                      <Download className="h-5 w-5" />
                    </div>
                    {exportFormat === 'zip' ? (
                      <CheckCircle2 className="h-5 w-5 text-purple-400 animate-in zoom-in-50" />
                    ) : (
                      <VFBadge variant="outline" className="text-[10px]">Media Only</VFBadge>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-foreground mb-1">Photos ZIP (.zip)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Student portraits rendered in exact 19.5:25 ratio with standardized filenames.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="text-purple-400 font-bold">✓</span> Standardized 19.5:25 aspect
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="text-purple-400 font-bold">✓</span> {currentEnrolledList.length} Images in archive
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(exportFormat === 'zip' || exportFormat === 'bundle') && (
            <div className="p-4 rounded-lg bg-[#1a1a24] border border-border/90 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-black">2</span>
                  Photo File Naming Template
                </label>
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Settings className="h-3.5 w-3.5" />
                  Aspect Ratio: 19.5 : 25
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label
                  onClick={() => setNamingPattern('id-name')}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-md border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'id-name'
                      ? "bg-primary/10 border-primary text-foreground shadow-xs"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'id-name'}
                    onChange={() => setNamingPattern('id-name')}
                    className="text-primary accent-primary h-4 w-4"
                  />
                  <div>
                    <span className="block font-mono text-xs">{`{Admission ID}-{Student Name}.jpg`}</span>
                    <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">E.g., ADM-2026-001-Aditya_Verma.jpg</span>
                  </div>
                </label>

                <label
                  onClick={() => setNamingPattern('roll-name')}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-md border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'roll-name'
                      ? "bg-primary/10 border-primary text-foreground shadow-xs"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'roll-name'}
                    onChange={() => setNamingPattern('roll-name')}
                    className="text-primary accent-primary h-4 w-4"
                  />
                  <div>
                    <span className="block font-mono text-xs">{`{Roll No}_{Student Name}.jpg`}</span>
                    <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">E.g., 101_Aditya_Verma.jpg</span>
                  </div>
                </label>

                <label
                  onClick={() => setNamingPattern('name-id')}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-md border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'name-id'
                      ? "bg-primary/10 border-primary text-foreground shadow-xs"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'name-id'}
                    onChange={() => setNamingPattern('name-id')}
                    className="text-primary accent-primary h-4 w-4"
                  />
                  <div>
                    <span className="block font-mono text-xs">{`{Student Name}_{Admission ID}.jpg`}</span>
                    <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">E.g., Aditya_Verma_ADM-2026-001.jpg</span>
                  </div>
                </label>

                <label
                  onClick={() => setNamingPattern('custom')}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-md border text-xs font-bold cursor-pointer transition-all",
                    namingPattern === 'custom'
                      ? "bg-primary/10 border-primary text-foreground shadow-xs"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  <input
                    type="radio"
                    name="naming"
                    checked={namingPattern === 'custom'}
                    onChange={() => setNamingPattern('custom')}
                    className="text-primary accent-primary h-4 w-4"
                  />
                  <div>
                    <span className="block font-mono text-xs">Custom Column Prefix</span>
                    <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">Select custom unique identifier</span>
                  </div>
                </label>
              </div>

              {namingPattern === 'custom' && (
                <div className="flex items-center gap-3 p-2.5 rounded-md bg-[#131317] border border-border">
                  <span className="text-xs font-bold text-foreground">Unique Column Identifier:</span>
                  <select
                    value={customColumnKey}
                    onChange={(e) => setCustomColumnKey(e.target.value)}
                    className="bg-[#1a1a24] border border-border text-xs font-bold text-foreground rounded px-3 py-1.5 outline-none cursor-pointer focus:border-primary"
                  >
                    <option value="fatherPhone">Father's Phone Number</option>
                    <option value="category">Student Caste Category</option>
                    <option value="address">Permanent City / Address</option>
                    <option value="scholarStatus">Scholarship / RTE Status</option>
                  </select>
                </div>
              )}

              <div className="p-3 rounded-md bg-[#131317] border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-muted-foreground">Generated Output Sample:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/30">
                    {currentEnrolledList[0] ? getFormattedPhotoName(currentEnrolledList[0]) : 'ADM-2026-001-Aditya_Verma.jpg'}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-bold font-mono">390×500px</span>
                </div>
              </div>
            </div>
          )}

          {isExporting && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3.5 animate-pulse">
              <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />
              <div>
                <p className="text-sm font-black text-primary">{exportProgressText}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Please keep this window open while the archive is generated.</p>
              </div>
            </div>
          )}
        </div>
      </VFDialog>

      {/* ⚙️ CONFIGURE DOSSIER FIELDS MODAL */}
      <VFDialog
        isOpen={isFieldConfigOpen}
        onClose={() => setIsFieldConfigOpen(false)}
        title="Configure Dossier Profile Fields"
        description="Customize, enable, disable, and add custom institutional fields for student dossiers."
        className="max-w-2xl"
        footerActions={
          <VFButton size="sm" onClick={() => setIsFieldConfigOpen(false)}>
            Done & Apply
          </VFButton>
        }
      >
        <div className="space-y-5 py-1">
          {/* Add New Custom Field Box */}
          <div className="p-4 rounded-lg bg-muted/40 border border-border/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Plus className="h-4 w-4 text-primary" />
              <span>Add New Custom Field</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">
                  Field Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Passport Number, Mother Tongue, Bus Stop"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddCustomField();
                  }}
                  className="w-full h-8.5 px-3 text-xs text-foreground bg-card border border-border rounded-md outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide block mb-1">
                  Section Category
                </label>
                <select
                  value={newFieldCategory}
                  onChange={(e) => setNewFieldCategory(e.target.value as any)}
                  className="w-full h-8.5 px-2.5 text-xs text-foreground bg-card border border-border rounded-md outline-none cursor-pointer"
                >
                  <option value="personal">Personal Identity</option>
                  <option value="family">Family & Contacts</option>
                  <option value="operations">Operations & Transport</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <VFButton
                size="sm"
                variant="outline"
                leftIcon={<Plus className="h-3.5 w-3.5" />}
                onClick={handleAddCustomField}
                disabled={!newFieldLabel.trim()}
              >
                Add Field
              </VFButton>
            </div>
          </div>

          {/* List of Fields grouped by category */}
          {(['personal', 'family', 'operations'] as const).map((cat) => {
            const catFields = dossierFields.filter((f) => f.category === cat);
            const catTitle =
              cat === 'personal'
                ? 'Personal & Academic Identity'
                : cat === 'family'
                ? 'Family & Emergency Contacts'
                : 'Operations, Transport & Medical';
            return (
              <div key={cat} className="space-y-2">
                <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {catTitle} ({catFields.filter((f) => f.isVisible).length} / {catFields.length} Active)
                </h5>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {catFields.map((field) => (
                    <div
                      key={field.key}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-md border text-xs transition-colors",
                        field.isVisible
                          ? "bg-card border-border/80 text-foreground"
                          : "bg-muted/20 border-border/40 text-muted-foreground"
                      )}
                    >
                      <label className="flex items-center gap-2.5 cursor-pointer flex-1 select-none">
                        <input
                          type="checkbox"
                          checked={field.isVisible}
                          onChange={() => handleToggleField(field.key)}
                          className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                        />
                        <span className={cn("font-medium", field.isVisible ? "text-foreground font-semibold" : "line-through text-muted-foreground")}>
                          {field.label}
                        </span>
                        {field.isCustom && (
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
                            Custom
                          </span>
                        )}
                      </label>
                      {field.isCustom && (
                        <button
                          onClick={() => handleDeleteCustomField(field.key)}
                          className="text-muted-foreground hover:text-red-400 p-1 rounded hover:bg-muted/60 transition-colors cursor-pointer"
                          title="Delete Custom Field"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </VFDialog>
    </VFPageContainer>
  );
}


