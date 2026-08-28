import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFDataTable,
  VFButton,
  VFBadge,
  VFDrawer,
  VFDialog,
  cn,
} from '@vidyamaxx/ui';
import {
  CheckCircle2,
  Phone,
  Eye,
  Plus,
  Download,
  MessageSquare,
  Copy,
  Check,
  X,
  Edit3,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Award,
  FileText,
  UserCheck,
  BarChart3,
  FileCheck,
  Printer,
  Bus,
  School,
  FileBadge2,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/admissions')({
  component: AdmissionsPage,
});

interface SubjectScore {
  subject: string;
  score: string;
  grade: string;
}

interface InterviewRecord {
  interviewer: string;
  score: string;
  date: string;
  remarks: string;
  recommendation: string;
}

interface Applicant {
  id: string;
  applicantId: string;
  name: string;
  avatarUrl: string;
  appliedGrade: string;
  streamPreference: string;
  previousSchool: string;
  previousMarks: string;
  guardianName: string;
  guardianRelation: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  bloodGroup: string;
  quotaCategory: string;
  transportPreference: string;
  fitScore: number;
  ocrDocStatus: 'Verified' | 'Pending' | 'Flagged';
  recommendation: 'Instant Admit' | 'Schedule Interview' | 'Needs Review' | 'Rejected';
  stage: 'Submitted' | 'Screened' | 'Interview' | 'Approved';
  appliedDate: string;
  tcAvailable: boolean;
  birthCertVerified: boolean;
  marksheetVerified: boolean;
  aadhaarVerified: boolean;
  medicalClearance: boolean;
  entranceScore: string;
  entranceRank: string;
  annualFee: string;
  notes?: string;
  subjectScores: SubjectScore[];
  interviewRecord: InterviewRecord;
}

const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: '1',
    applicantId: 'ADM-2026-001',
    name: 'Aarav Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 9',
    streamPreference: 'General Secondary (CBSE)',
    previousSchool: 'Delhi Public School',
    previousMarks: '94.6% (Grade A1)',
    guardianName: 'Rajesh Sharma',
    guardianRelation: 'Father',
    motherName: 'Meenakshi Sharma',
    phone: '+91 98765 43210',
    email: 'rajesh.sharma@gmail.com',
    address: 'Flat 401, Apex Towers, Sector 62, Noida',
    dob: '14 May 2011',
    bloodGroup: 'B+',
    quotaCategory: 'General Merit',
    transportPreference: 'Bus Route 4 (Stop #12 - Sector 62)',
    fitScore: 96,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Screened',
    appliedDate: '2026-08-08',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '98 / 100',
    entranceRank: 'Rank #2 of 340 Candidates',
    annualFee: '₹ 84,000',
    notes: 'Exceptional academic track record with state-level science olympiad gold medal.',
    subjectScores: [
      { subject: 'Mathematics', score: '98/100', grade: 'A1' },
      { subject: 'Science & Tech', score: '96/100', grade: 'A1' },
      { subject: 'English Core', score: '94/100', grade: 'A1' },
      { subject: 'Social Sciences', score: '92/100', grade: 'A1' },
      { subject: 'Computer Applications', score: '99/100', grade: 'A1' },
    ],
    interviewRecord: {
      interviewer: 'Dr. V. Malhotra (Vice Principal)',
      score: '9.6 / 10',
      date: '12 Aug 2026',
      remarks: 'Articulate, high logical reasoning quotient. Recommended for advanced cohort.',
      recommendation: 'Direct Merit Admission',
    },
  },
  {
    id: '2',
    applicantId: 'ADM-2026-002',
    name: 'Ananya Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 11-Sci',
    streamPreference: 'Physics, Chemistry, Maths & CS (PCM)',
    previousSchool: 'St. Xavier High School',
    previousMarks: '91.2% (Grade A1)',
    guardianName: 'Sunita Verma',
    guardianRelation: 'Mother',
    motherName: 'Sunita Verma',
    phone: '+91 98123 45678',
    email: 'sunita.v@outlook.com',
    address: 'B-14, Green Park Extension, New Delhi',
    dob: '22 Jan 2009',
    bloodGroup: 'O+',
    quotaCategory: 'General Merit',
    transportPreference: 'Self Commute (Parent Drop)',
    fitScore: 89,
    ocrDocStatus: 'Verified',
    recommendation: 'Schedule Interview',
    stage: 'Interview',
    appliedDate: '2026-08-09',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '92 / 100',
    entranceRank: 'Rank #14 of 340 Candidates',
    annualFee: '₹ 92,000',
    notes: 'Applying for Physics-Maths-Computer Science stream. Strong programming fundamentals.',
    subjectScores: [
      { subject: 'Mathematics', score: '92/100', grade: 'A1' },
      { subject: 'Science', score: '94/100', grade: 'A1' },
      { subject: 'English', score: '89/100', grade: 'A2' },
      { subject: 'Computer Science', score: '96/100', grade: 'A1' },
    ],
    interviewRecord: {
      interviewer: 'Prof. S. Ranganathan (Head of Science)',
      score: '8.8 / 10',
      date: '15 Aug 2026',
      remarks: 'Strong interest in AI and competitive robotics. Approved for PCM Stream.',
      recommendation: 'Provisional Admission Cleared',
    },
  },
  {
    id: '3',
    applicantId: 'ADM-2026-003',
    name: 'Rohan Gupta',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 6',
    streamPreference: 'Middle Wing Curriculum (CBSE)',
    previousSchool: 'Modern School',
    previousMarks: '74.0% (Grade B1)',
    guardianName: 'Vikram Gupta',
    guardianRelation: 'Father',
    motherName: 'Ritu Gupta',
    phone: '+91 97654 32109',
    email: 'vikram.gupta@corp.in',
    address: '88, Anand Vihar, New Delhi',
    dob: '18 Sep 2014',
    bloodGroup: 'A+',
    quotaCategory: 'Sibling Enrolled (Class 10)',
    transportPreference: 'Bus Route 2 (Stop #8 - Anand Vihar)',
    fitScore: 64,
    ocrDocStatus: 'Flagged',
    recommendation: 'Needs Review',
    stage: 'Submitted',
    appliedDate: '2026-08-09',
    tcAvailable: false,
    birthCertVerified: true,
    marksheetVerified: false,
    aadhaarVerified: true,
    medicalClearance: false,
    entranceScore: '68 / 100',
    entranceRank: 'Rank #98 of 340 Candidates',
    annualFee: '₹ 76,000',
    notes: 'Transfer certificate missing counter-signature from prior school district education officer.',
    subjectScores: [
      { subject: 'Mathematics', score: '72/100', grade: 'B1' },
      { subject: 'Science', score: '75/100', grade: 'B1' },
      { subject: 'English', score: '78/100', grade: 'B1' },
      { subject: 'Social Studies', score: '71/100', grade: 'B1' },
    ],
    interviewRecord: {
      interviewer: 'Mrs. K. Sharma (Middle Wing Head)',
      score: '6.5 / 10',
      date: 'Pending',
      remarks: 'Awaiting submission of counter-signed TC and medical clearance before admission.',
      recommendation: 'Pending Compliance',
    },
  },
  {
    id: '4',
    applicantId: 'ADM-2026-004',
    name: 'Kavya Nair',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 11-Com',
    streamPreference: 'Commerce with Applied Mathematics',
    previousSchool: 'Kendriya Vidyalaya',
    previousMarks: '93.8% (Grade A1)',
    guardianName: 'Suresh Nair',
    guardianRelation: 'Father',
    motherName: 'Geetha Nair',
    phone: '+91 99887 76655',
    email: 'suresh.nair@kerala.org',
    address: '102, Palm Grove, Gurgaon',
    dob: '05 Mar 2009',
    bloodGroup: 'AB+',
    quotaCategory: 'General Merit',
    transportPreference: 'Bus Route 6 (Stop #3 - Palm Grove)',
    fitScore: 92,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Approved',
    appliedDate: '2026-08-07',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '94 / 100',
    entranceRank: 'Rank #8 of 340 Candidates',
    annualFee: '₹ 88,000',
    notes: 'Admitted on merit. Provisional offer dispatched; fee portal link sent to registered email.',
    subjectScores: [
      { subject: 'Mathematics', score: '96/100', grade: 'A1' },
      { subject: 'Economics', score: '95/100', grade: 'A1' },
      { subject: 'Accountancy Basics', score: '92/100', grade: 'A1' },
      { subject: 'English Core', score: '93/100', grade: 'A1' },
    ],
    interviewRecord: {
      interviewer: 'Dr. A. Sengupta (Commerce Dean)',
      score: '9.2 / 10',
      date: '10 Aug 2026',
      remarks: 'Outstanding analytical skills and clarity of career direction in finance & business.',
      recommendation: 'Admission Confirmed',
    },
  },
  {
    id: '5',
    applicantId: 'ADM-2026-005',
    name: 'Ishaan Malhotra',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 9',
    streamPreference: 'General Secondary (CBSE)',
    previousSchool: 'Ryan International',
    previousMarks: '68.5% (Grade B2)',
    guardianName: 'Anil Malhotra',
    guardianRelation: 'Father',
    motherName: 'Poonam Malhotra',
    phone: '+91 98234 56789',
    email: 'anil.malhotra@yahoo.com',
    address: 'House 56, Sector 15, Faridabad',
    dob: '30 Nov 2010',
    bloodGroup: 'B-',
    quotaCategory: 'General',
    transportPreference: 'Bus Route 7 (Faridabad Sector 15)',
    fitScore: 48,
    ocrDocStatus: 'Pending',
    recommendation: 'Needs Review',
    stage: 'Submitted',
    appliedDate: '2026-08-10',
    tcAvailable: false,
    birthCertVerified: false,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '58 / 100',
    entranceRank: 'Rank #210 of 340 Candidates',
    annualFee: '₹ 84,000',
    notes: 'Awaiting municipal birth certificate copy and Class 8 final passing certificates.',
    subjectScores: [
      { subject: 'Mathematics', score: '62/100', grade: 'C1' },
      { subject: 'Science', score: '68/100', grade: 'B2' },
      { subject: 'English', score: '74/100', grade: 'B1' },
      { subject: 'Social Sciences', score: '70/100', grade: 'B1' },
    ],
    interviewRecord: {
      interviewer: 'Mrs. N. Joshi (Admissions Officer)',
      score: '5.5 / 10',
      date: 'Pending',
      remarks: 'Requires diagnostic assessment and counseling session with guardian.',
      recommendation: 'Pending Counseling',
    },
  },
  {
    id: '6',
    applicantId: 'ADM-2026-006',
    name: 'Diya Sengupta',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 7',
    streamPreference: 'Middle Wing Curriculum (CBSE)',
    previousSchool: 'The Heritage School',
    previousMarks: '96.2% (Grade A1)',
    guardianName: 'Amit Sengupta',
    guardianRelation: 'Father',
    motherName: 'Swati Sengupta',
    phone: '+91 98301 23456',
    email: 'amit.sengupta@tcs.com',
    address: 'Tower 3, Nirvana Country, Gurgaon',
    dob: '12 Jul 2013',
    bloodGroup: 'O+',
    quotaCategory: 'Sports Merit Quota (Chess)',
    transportPreference: 'Bus Route 5 (Nirvana Country)',
    fitScore: 98,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Approved',
    appliedDate: '2026-08-11',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '99 / 100',
    entranceRank: 'Rank #1 of 340 Candidates',
    annualFee: '₹ 80,000',
    notes: 'State level junior chess champion, top scorer in school entrance aptitude assessment.',
    subjectScores: [
      { subject: 'Mathematics', score: '100/100', grade: 'A1' },
      { subject: 'Science', score: '98/100', grade: 'A1' },
      { subject: 'English', score: '95/100', grade: 'A1' },
      { subject: 'Social Studies', score: '96/100', grade: 'A1' },
    ],
    interviewRecord: {
      interviewer: 'Dr. V. Malhotra (Vice Principal)',
      score: '9.8 / 10',
      date: '14 Aug 2026',
      remarks: 'Exemplary cognitive sharpness. Approved for sports merit scholarship grant.',
      recommendation: 'Direct Merit Admission Approved',
    },
  },
  {
    id: '7',
    applicantId: 'ADM-2026-007',
    name: 'Kabir Singhania',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 11-Hum',
    streamPreference: 'Humanities (History, Pol Sci, Economics & Legal Studies)',
    previousSchool: 'Springdales School',
    previousMarks: '88.4% (Grade A2)',
    guardianName: 'Pooja Singhania',
    guardianRelation: 'Mother',
    motherName: 'Pooja Singhania',
    phone: '+91 98105 67890',
    email: 'pooja.singhania@legal.in',
    address: 'C-45, Vasant Vihar, New Delhi',
    dob: '19 Oct 2008',
    bloodGroup: 'B+',
    quotaCategory: 'General Merit',
    transportPreference: 'Self Commute',
    fitScore: 84,
    ocrDocStatus: 'Verified',
    recommendation: 'Schedule Interview',
    stage: 'Interview',
    appliedDate: '2026-08-11',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '86 / 100',
    entranceRank: 'Rank #28 of 340 Candidates',
    annualFee: '₹ 90,000',
    notes: 'Interested in Political Science and Model United Nations (MUN) society.',
    subjectScores: [
      { subject: 'Social Sciences', score: '94/100', grade: 'A1' },
      { subject: 'English Core', score: '92/100', grade: 'A1' },
      { subject: 'Mathematics', score: '82/100', grade: 'A2' },
      { subject: 'Science', score: '85/100', grade: 'A2' },
    ],
    interviewRecord: {
      interviewer: 'Mrs. R. Sen (Humanities Coordinator)',
      score: '8.5 / 10',
      date: '16 Aug 2026',
      remarks: 'Strong debating credentials and articulate worldview. Approved for Humanities.',
      recommendation: 'Interview Cleared',
    },
  },
  {
    id: '8',
    applicantId: 'ADM-2026-008',
    name: 'Meera Iyer',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 4',
    streamPreference: 'Primary Wing Foundation (CBSE)',
    previousSchool: 'Bhavans Vidyashram',
    previousMarks: '92.0% (Grade A1)',
    guardianName: 'Narayanan Iyer',
    guardianRelation: 'Father',
    motherName: 'Radha Iyer',
    phone: '+91 98450 11223',
    email: 'n.iyer@isro.gov.in',
    address: 'A-201, ISRO Officers Enclave, Dwarka',
    dob: '03 Feb 2016',
    bloodGroup: 'O+',
    quotaCategory: 'Govt / Defense Service Quota',
    transportPreference: 'Bus Route 3 (Dwarka Sector 9)',
    fitScore: 91,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Screened',
    appliedDate: '2026-08-12',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '93 / 100',
    entranceRank: 'Rank #11 of 340 Candidates',
    annualFee: '₹ 72,000',
    notes: 'Classical vocal exponent, excellent foundational mathematics skills.',
    subjectScores: [
      { subject: 'Mathematics', score: '95/100', grade: 'A1' },
      { subject: 'Environmental Studies', score: '94/100', grade: 'A1' },
      { subject: 'English', score: '91/100', grade: 'A1' },
      { subject: 'Hindi', score: '90/100', grade: 'A1' },
    ],
    interviewRecord: {
      interviewer: 'Mrs. S. Bhatnagar (Primary Wing Incharge)',
      score: '9.0 / 10',
      date: '14 Aug 2026',
      remarks: 'Polite, active, and curious student with great learning pace.',
      recommendation: 'Direct Admit',
    },
  },
  {
    id: '9',
    applicantId: 'ADM-2026-009',
    name: 'Tanmay Deshmukh',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 8',
    streamPreference: 'Middle Wing Curriculum (CBSE)',
    previousSchool: 'Symbiosis International',
    previousMarks: '79.5% (Grade B1)',
    guardianName: 'Sanjay Deshmukh',
    guardianRelation: 'Father',
    motherName: 'Rekha Deshmukh',
    phone: '+91 98220 99887',
    email: 'sanjay.d@mumbai.org',
    address: 'B-12, Panchsheel Park, New Delhi',
    dob: '28 Aug 2012',
    bloodGroup: 'AB-',
    quotaCategory: 'Interstate Transfer',
    transportPreference: 'Bus Route 1 (Panchsheel)',
    fitScore: 76,
    ocrDocStatus: 'Pending',
    recommendation: 'Needs Review',
    stage: 'Submitted',
    appliedDate: '2026-08-12',
    tcAvailable: false,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '81 / 100',
    entranceRank: 'Rank #52 of 340 Candidates',
    annualFee: '₹ 82,000',
    notes: 'Interstate migration from Pune. Pending counter-signed TC from Maharashtra board.',
    subjectScores: [
      { subject: 'Mathematics', score: '78/100', grade: 'B1' },
      { subject: 'Science', score: '82/100', grade: 'A2' },
      { subject: 'English', score: '85/100', grade: 'A2' },
      { subject: 'Social Studies', score: '76/100', grade: 'B1' },
    ],
    interviewRecord: {
      interviewer: 'Mrs. K. Sharma (Middle Wing Head)',
      score: '7.8 / 10',
      date: '16 Aug 2026',
      remarks: 'Academic aptitude is good. Pending TC clearance for formal seat allotment.',
      recommendation: 'Conditional Approval',
    },
  },
  {
    id: '10',
    applicantId: 'ADM-2026-010',
    name: 'Sanya Mirza',
    avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a171edd26cb7?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 10',
    streamPreference: 'Secondary Board (CBSE Class 10)',
    previousSchool: 'Hyderabad Public School',
    previousMarks: '95.0% (Grade A1)',
    guardianName: 'Farhan Mirza',
    guardianRelation: 'Father',
    motherName: 'Zainab Mirza',
    phone: '+91 98490 55443',
    email: 'farhan.m@mirzagroup.com',
    address: 'Villa 14, DLF Phase 1, Gurgaon',
    dob: '15 Sep 2010',
    bloodGroup: 'B+',
    quotaCategory: 'Sports Merit (Badminton)',
    transportPreference: 'Bus Route 6 (DLF Phase 1)',
    fitScore: 94,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Approved',
    appliedDate: '2026-08-13',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '96 / 100',
    entranceRank: 'Rank #5 of 340 Candidates',
    annualFee: '₹ 86,000',
    notes: 'National junior badminton tournament qualifier. Merit admission approved.',
    subjectScores: [
      { subject: 'Mathematics', score: '94/100', grade: 'A1' },
      { subject: 'Science', score: '96/100', grade: 'A1' },
      { subject: 'English Core', score: '97/100', grade: 'A1' },
      { subject: 'Social Science', score: '93/100', grade: 'A1' },
    ],
    interviewRecord: {
      interviewer: 'Dr. V. Malhotra (Vice Principal)',
      score: '9.5 / 10',
      date: '15 Aug 2026',
      remarks: 'Balanced excellence in athletics and academics. Seat approved.',
      recommendation: 'Admission Confirmed',
    },
  },
  {
    id: '11',
    applicantId: 'ADM-2026-011',
    name: 'Aditya Roy',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 11-Sci',
    streamPreference: 'PCM + IIT JEE Integrated Batch',
    previousSchool: 'Don Bosco School',
    previousMarks: '89.5% (Grade A2)',
    guardianName: 'Sourav Roy',
    guardianRelation: 'Father',
    motherName: 'Ananya Roy',
    phone: '+91 98310 77665',
    email: 'sourav.roy@itc.in',
    address: 'Flat 702, Jaypee Greens, Noida',
    dob: '11 Nov 2008',
    bloodGroup: 'O+',
    quotaCategory: 'General Merit',
    transportPreference: 'Bus Route 8 (Jaypee Greens)',
    fitScore: 86,
    ocrDocStatus: 'Verified',
    recommendation: 'Schedule Interview',
    stage: 'Interview',
    appliedDate: '2026-08-13',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '89 / 100',
    entranceRank: 'Rank #22 of 340 Candidates',
    annualFee: '₹ 94,000',
    notes: 'Targeting IIT-JEE coaching integrated batch with advanced physics labs.',
    subjectScores: [
      { subject: 'Mathematics', score: '93/100', grade: 'A1' },
      { subject: 'Science', score: '91/100', grade: 'A1' },
      { subject: 'English', score: '86/100', grade: 'A2' },
      { subject: 'Computer Applications', score: '92/100', grade: 'A1' },
    ],
    interviewRecord: {
      interviewer: 'Prof. S. Ranganathan (Head of Science)',
      score: '8.7 / 10',
      date: '17 Aug 2026',
      remarks: 'Solid problem solving abilities in algebra and physics. Cleared for PCM.',
      recommendation: 'Interview Cleared',
    },
  },
  {
    id: '12',
    applicantId: 'ADM-2026-012',
    name: 'Rhea Kapoor',
    avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&auto=format&fit=crop&q=80',
    appliedGrade: 'Class 5',
    streamPreference: 'Primary Wing (CBSE)',
    previousSchool: 'Step by Step School',
    previousMarks: '91.0% (Grade A1)',
    guardianName: 'Kunal Kapoor',
    guardianRelation: 'Father',
    motherName: 'Natasha Kapoor',
    phone: '+91 98111 22334',
    email: 'kunal.kapoor@studio.com',
    address: 'E-7, Greater Kailash 2, New Delhi',
    dob: '04 Apr 2015',
    bloodGroup: 'A+',
    quotaCategory: 'General Merit',
    transportPreference: 'Self Commute (Parent Drop)',
    fitScore: 90,
    ocrDocStatus: 'Verified',
    recommendation: 'Instant Admit',
    stage: 'Screened',
    appliedDate: '2026-08-14',
    tcAvailable: true,
    birthCertVerified: true,
    marksheetVerified: true,
    aadhaarVerified: true,
    medicalClearance: true,
    entranceScore: '91 / 100',
    entranceRank: 'Rank #18 of 340 Candidates',
    annualFee: '₹ 75,000',
    notes: 'Strong portfolio in performing arts, music, and public speaking.',
    subjectScores: [
      { subject: 'Mathematics', score: '90/100', grade: 'A1' },
      { subject: 'Science & EVS', score: '92/100', grade: 'A1' },
      { subject: 'English', score: '95/100', grade: 'A1' },
      { subject: 'Hindi', score: '88/100', grade: 'A2' },
    ],
    interviewRecord: {
      interviewer: 'Mrs. S. Bhatnagar (Primary Incharge)',
      score: '9.1 / 10',
      date: '16 Aug 2026',
      remarks: 'Articulate and energetic. Passed all foundation checks.',
      recommendation: 'Merit Admit Cleared',
    },
  },
];

function AdmissionsPage() {
  const { activeSession } = useGlobalStore();
  const [applicantList, setApplicantList] = React.useState<Applicant[]>(INITIAL_APPLICANTS);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = React.useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [drawerTab, setDrawerTab] = React.useState<'overview' | 'academics' | 'documents' | 'decisions'>('overview');
  const [isEditingApplicant, setIsEditingApplicant] = React.useState<boolean>(false);
  const [applicantFormData, setApplicantFormData] = React.useState<Applicant | null>(null);
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  // Offer Letter Print Modal State
  const [isOfferModalOpen, setIsOfferModalOpen] = React.useState<boolean>(false);
  const [offerApplicant, setOfferApplicant] = React.useState<Applicant | null>(null);

  const activeApplicant =
    selectedApplicantIndex !== null && selectedApplicantIndex >= 0 && selectedApplicantIndex < applicantList.length
      ? applicantList[selectedApplicantIndex]
      : null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openApplicantDrawer = (app: Applicant) => {
    const idx = applicantList.findIndex((a) => a.id === app.id);
    setSelectedApplicantIndex(idx >= 0 ? idx : 0);
    setIsEditingApplicant(false);
    setApplicantFormData(null);
    setDrawerTab('overview');
    setIsDrawerOpen(true);
  };

  const handleStartEdit = () => {
    if (activeApplicant) {
      setApplicantFormData({ ...activeApplicant });
      setIsEditingApplicant(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingApplicant(false);
    setApplicantFormData(null);
  };

  const handleSaveApplicant = () => {
    if (!applicantFormData || selectedApplicantIndex === null) return;
    const updated = [...applicantList];
    updated[selectedApplicantIndex] = { ...applicantFormData };
    setApplicantList(updated);
    setIsEditingApplicant(false);
    setApplicantFormData(null);
    setNotice(`Updated candidate admissions dossier for ${applicantFormData.name}.`);
  };

  const handleApproveAdmit = (app: Applicant) => {
    const idx = applicantList.findIndex((a) => a.id === app.id);
    if (idx === -1) return;
    const updated = [...applicantList];
    updated[idx] = {
      ...updated[idx],
      stage: 'Approved',
      recommendation: 'Instant Admit',
    };
    setApplicantList(updated);
    setNotice(`Provisional Admission Offer generated & approved for ${updated[idx].name}!`);
    setOfferApplicant(updated[idx]);
    setIsOfferModalOpen(true);
  };

  const handlePrevApplicant = () => {
    if (selectedApplicantIndex !== null && selectedApplicantIndex > 0) {
      setIsEditingApplicant(false);
      setApplicantFormData(null);
      setSelectedApplicantIndex(selectedApplicantIndex - 1);
    }
  };

  const handleNextApplicant = () => {
    if (selectedApplicantIndex !== null && selectedApplicantIndex < applicantList.length - 1) {
      setIsEditingApplicant(false);
      setApplicantFormData(null);
      setSelectedApplicantIndex(selectedApplicantIndex + 1);
    }
  };

  const applicantColumns = [
    {
      header: 'Applicant ID',
      accessorKey: 'applicantId',
      cell: (r: Applicant) => (
        <span className="font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-md border border-border">
          {r.applicantId}
        </span>
      ),
    },
    {
      header: 'Candidate Name',
      accessorKey: 'name',
      cell: (r: Applicant) => (
        <div className="flex items-center gap-3.5">
          <div
            onClick={() => openApplicantDrawer(r)}
            className="overflow-hidden rounded-md border border-border shadow-xs w-11 h-[56px] bg-muted shrink-0 cursor-pointer hover:border-primary/50 transition-colors"
            style={{ aspectRatio: '19.5 / 25' }}
            title="Click to view 360° Candidate Dossier"
          >
            <img src={r.avatarUrl} alt={r.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <button
              onClick={() => openApplicantDrawer(r)}
              className="font-extrabold text-foreground text-sm leading-tight text-left hover:underline cursor-pointer tracking-tight"
            >
              {r.name}
            </button>
            <p className="text-xs text-muted-foreground font-semibold mt-0.5">{r.previousSchool}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Applied Grade',
      accessorKey: 'appliedGrade',
      cell: (r: Applicant) => (
        <div>
          <span className="font-bold text-foreground text-sm block">{r.appliedGrade}</span>
          <span className="text-[11px] text-muted-foreground font-medium block truncate max-w-[140px]">
            {r.streamPreference}
          </span>
        </div>
      ),
    },
    {
      header: 'Guardian / Contact',
      accessorKey: 'phone',
      cell: (r: Applicant) => (
        <div>
          <span className="text-sm font-bold text-foreground block">{r.guardianName}</span>
          <span className="text-xs text-muted-foreground font-mono">{r.phone}</span>
        </div>
      ),
    },
    {
      header: 'AI Fit Score',
      accessorKey: 'fitScore',
      cell: (r: Applicant) => (
        <div className="flex items-center gap-2">
          <span className="font-black text-sm text-foreground">{r.fitScore}%</span>
          <div className="h-2 w-14 bg-muted rounded-full overflow-hidden border border-border/50">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                r.fitScore >= 80 ? 'bg-emerald-400' : r.fitScore >= 60 ? 'bg-amber-400' : 'bg-rose-400'
              )}
              style={{ width: `${r.fitScore}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Doc Verification',
      accessorKey: 'ocrDocStatus',
      cell: (r: Applicant) => (
        <VFBadge variant={r.ocrDocStatus === 'Verified' ? 'success' : r.ocrDocStatus === 'Flagged' ? 'danger' : 'warning'}>
          {r.ocrDocStatus}
        </VFBadge>
      ),
    },
    {
      header: 'Stage',
      accessorKey: 'stage',
      cell: (r: Applicant) => (
        <VFBadge variant={r.stage === 'Approved' ? 'success' : r.stage === 'Interview' ? 'warning' : 'outline'}>
          {r.stage}
        </VFBadge>
      ),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (r: Applicant) => (
        <VFButton
          size="sm"
          variant="outline"
          leftIcon={<Eye className="h-4 w-4" />}
          onClick={() => openApplicantDrawer(r)}
        >
          Review Application
        </VFButton>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {notice && (
        <div className="p-4 bg-muted/60 border border-border rounded-md text-sm text-foreground flex items-center justify-between animate-fade-in shrink-0">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{notice}</span>
          </div>
          <button
            onClick={() => setNotice(null)}
            className="text-muted-foreground hover:text-foreground text-xs font-black cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Candidate Table (Full Height Prominence) */}
      <VFDataTable
        columns={applicantColumns}
        data={applicantList}
        filterPlaceholder="Search candidates by name, applicant ID, or school..."
        rightActions={
          <>
            <VFButton
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => alert('Exporting candidate admissions master list as CSV...')}
            >
              Export Roster
            </VFButton>
            <VFButton
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => alert('Opening new offline intake application form...')}
            >
              New Application
            </VFButton>
          </>
        }
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          360° ADMISSIONS APPLICANT DOSSIER & APPLICATION REVIEW DRAWER
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsEditingApplicant(false);
          setApplicantFormData(null);
          setIsDrawerOpen(false);
        }}
        hideHeader={true}
        title={activeApplicant ? activeApplicant.name : 'Candidate Dossier'}
        className="w-[960px] max-w-[96vw] sm:max-w-4xl lg:max-w-5xl"
        bodyClassName="p-5 sm:p-6 space-y-4"
        footerActions={
          <div className="flex items-center justify-between w-full gap-3 flex-wrap">
            {isEditingApplicant ? (
              <>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-foreground bg-muted px-2.5 py-1 rounded-lg border border-border">
                    {applicantFormData?.applicantId || activeApplicant?.applicantId}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Modifying Candidate Records
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
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
                    onClick={handleSaveApplicant}
                  >
                    Save Changes
                  </VFButton>
                </div>
              </>
            ) : (
              <>
                {/* 1. Bottom Stepper (< 1 of 25 >) */}
                <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-md border border-border">
                  <button
                    onClick={handlePrevApplicant}
                    disabled={selectedApplicantIndex === 0}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Previous Candidate"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-mono font-bold px-3 text-foreground select-none">
                    {selectedApplicantIndex !== null ? selectedApplicantIndex + 1 : 1} of {applicantList.length}
                  </span>
                  <button
                    onClick={handleNextApplicant}
                    disabled={selectedApplicantIndex === applicantList.length - 1}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer transition-colors"
                    title="Next Candidate"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* 2. Action Buttons */}
                <div className="flex items-center gap-2.5">
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<X className="h-4 w-4 text-muted-foreground" />}
                    onClick={() => {
                      setIsEditingApplicant(false);
                      setApplicantFormData(null);
                      setIsDrawerOpen(false);
                    }}
                  >
                    Close
                  </VFButton>
                  <VFButton
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit3 className="h-4 w-4" />}
                    onClick={handleStartEdit}
                  >
                    Edit Application
                  </VFButton>
                  <VFButton
                    size="sm"
                    leftIcon={<CheckCircle2 className="h-4 w-4" />}
                    onClick={() => activeApplicant && handleApproveAdmit(activeApplicant)}
                  >
                    {activeApplicant?.stage === 'Approved' ? 'View Offer Letter' : 'Approve & Issue Offer'}
                  </VFButton>
                </div>
              </>
            )}
          </div>
        }
      >
        {activeApplicant && (
          <div className="space-y-6 animate-fade-in pb-4">
            {/* ═══════════════════════════════════════════════════════════════
                1. EDIT MODE
                ═══════════════════════════════════════════════════════════════ */}
            {isEditingApplicant ? (
              <div className="space-y-6 animate-fade-in">
                {/* Edit Header Banner */}
                <div className="p-5 rounded-lg bg-card border border-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative overflow-hidden rounded-md border border-border shadow-xs w-16 h-[82px] bg-muted shrink-0"
                      style={{ aspectRatio: '19.5 / 25' }}
                    >
                      <img
                        src={applicantFormData?.avatarUrl || activeApplicant.avatarUrl}
                        alt={applicantFormData?.name || activeApplicant.name}
                        style={{ aspectRatio: '19.5 / 25' }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-muted text-foreground border border-border">
                          {applicantFormData?.applicantId || activeApplicant.applicantId}
                        </span>
                        <VFBadge variant="warning">Edit Mode Active</VFBadge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mt-1 tracking-tight">
                        Editing {applicantFormData?.name || activeApplicant.name}'s Application
                      </h3>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-semibold text-muted-foreground">
                    Target Session: {activeSession}
                  </div>
                </div>

                {/* Section 1: Candidate Identity */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>Candidate Identity & Applied Grade</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.name || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, name: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-bold text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Applied Grade / Class
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.appliedGrade || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, appliedGrade: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Stream / Track Preference
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.streamPreference || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, streamPreference: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.dob || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, dob: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Blood Group
                      </label>
                      <select
                        value={applicantFormData?.bloodGroup || 'B+'}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, bloodGroup: e.target.value })}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Application Stage
                      </label>
                      <select
                        value={applicantFormData?.stage || 'Submitted'}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, stage: e.target.value as any })}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['Submitted', 'Screened', 'Interview', 'Approved'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        OCR Doc Verification
                      </label>
                      <select
                        value={applicantFormData?.ocrDocStatus || 'Pending'}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, ocrDocStatus: e.target.value as any })}
                        className="w-full h-11 px-3.5 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      >
                        {['Verified', 'Pending', 'Flagged'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Quota Category
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.quotaCategory || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, quotaCategory: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Biometric Photo URL (19.5 : 25 Aspect Ratio)
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.avatarUrl || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, avatarUrl: e.target.value })}
                        className="w-full h-11 px-4 text-xs font-mono text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Guardian & Contact */}
                <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Parent / Guardian & Contact Records</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Primary Guardian Name
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.guardianName || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, guardianName: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-bold text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Mother's Full Name
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.motherName || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, motherName: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Contact Phone (WhatsApp)
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.phone || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, phone: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-mono font-bold text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Guardian Email
                      </label>
                      <input
                        type="email"
                        value={applicantFormData?.email || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, email: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-mono text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        value={applicantFormData?.address || ''}
                        onChange={(e) => setApplicantFormData({ ...applicantFormData!, address: e.target.value })}
                        className="w-full h-11 px-4 text-sm font-medium text-foreground bg-background border border-border rounded-md focus:border-foreground/80 focus:ring-1 focus:ring-foreground outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ═══════════════════════════════════════════════════════════════
                 2. VIEW MODE: AIRY, EXPANSIVE & ELEGANT 360° DOSSIER
                 ═══════════════════════════════════════════════════════════════ */
              <div className="space-y-6 animate-fade-in">
                {/* Spacious Hero Banner Card */}
                <div className="p-6 rounded-lg bg-card border border-border/80 shadow-md flex items-center gap-6 relative overflow-hidden flex-wrap sm:flex-nowrap">
                  {/* 19.5 : 25 Portrait with Active Status Dot */}
                  <div className="relative shrink-0 mx-auto sm:mx-0">
                    <div
                      className="relative overflow-hidden rounded-lg border border-border shadow-md w-28 h-[143.5px] bg-muted flex items-center justify-center"
                      style={{ aspectRatio: '19.5 / 25' }}
                    >
                      <img
                        src={activeApplicant.avatarUrl}
                        alt={activeApplicant.name}
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
                        {activeApplicant.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ring-2',
                        activeApplicant.stage === 'Approved'
                          ? 'bg-emerald-500 ring-emerald-500/20'
                          : activeApplicant.stage === 'Interview'
                          ? 'bg-amber-500 ring-amber-500/20'
                          : 'bg-blue-500 ring-blue-500/20'
                      )}
                      title={`Stage: ${activeApplicant.stage}`}
                    />
                  </div>

                  {/* Hero Information */}
                  <div className="flex-1 min-w-0 space-y-3 text-center sm:text-left">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight truncate w-full sm:w-auto">
                        {activeApplicant.name}
                      </h3>
                      <VFBadge
                        variant={activeApplicant.stage === 'Approved' ? 'success' : activeApplicant.stage === 'Interview' ? 'warning' : 'outline'}
                        className="px-3 py-1 text-xs font-bold mx-auto sm:mx-0"
                      >
                        Stage: {activeApplicant.stage}
                      </VFBadge>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-mono flex-wrap justify-center sm:justify-start">
                      <span className="font-bold text-foreground bg-muted px-2.5 py-0.5 rounded-md border border-border">
                        {activeApplicant.applicantId}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">Target: {activeApplicant.appliedGrade}</span>
                      <span>•</span>
                      <span className="text-foreground font-medium">Prev: {activeApplicant.previousSchool}</span>
                    </div>

                    {/* Badges Row */}
                    <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start pt-0.5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold bg-muted/60 text-foreground border border-border">
                        <Award className="h-3.5 w-3.5 text-primary" />
                        Prev: <span className="text-foreground font-bold">{activeApplicant.previousMarks}</span>
                      </span>

                      <span className="text-xs font-bold px-3 py-1 rounded-lg bg-muted/60 text-foreground border border-border">
                        🩸 Blood Group: <span className="font-mono text-foreground font-extrabold">{activeApplicant.bloodGroup || 'B+'}</span>
                      </span>

                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-muted/60 text-muted-foreground border border-border">
                        Submitted: {activeApplicant.appliedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sleek 4-Tab Segmented Pill Navigation */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-lg bg-muted/50 border border-border">
                  {[
                    { id: 'overview', label: 'Candidate Profile & Bio', icon: <UserCheck className="h-4 w-4" /> },
                    { id: 'academics', label: 'Academics & Entrance', icon: <BarChart3 className="h-4 w-4" /> },
                    { id: 'documents', label: 'OCR & Verification', icon: <FileCheck className="h-4 w-4" /> },
                    { id: 'decisions', label: 'Admissions Decision', icon: <FileBadge2 className="h-4 w-4" /> },
                  ].map((tab) => {
                    const isActive = drawerTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDrawerTab(tab.id as any)}
                        className={cn(
                          'flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer outline-none',
                          isActive
                            ? 'bg-card text-foreground shadow-xs border border-border font-bold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                        )}
                      >
                        {tab.icon}
                        <span className="truncate">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    TAB 1: CANDIDATE PROFILE & BIO
                    ═══════════════════════════════════════════════════════════ */}
                {drawerTab === 'overview' && (
                  <div className="space-y-6 animate-fade-in pt-1">
                    {/* 4 Enclosed Metric Tiles */}
                    <div className="p-4 sm:p-5 rounded-lg bg-card border border-border/90 shadow-xs">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">AI Fit Score</span>
                          <span className="text-2xl font-black text-emerald-400 mt-1 block">{activeApplicant.fitScore}%</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5 block">High Academic Aptitude</span>
                        </div>
                        <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Doc Verification</span>
                          <span className="text-2xl font-black text-foreground mt-1 block">{activeApplicant.ocrDocStatus}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5 block">OCR Match Verified</span>
                        </div>
                        <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Recommendation</span>
                          <span className="text-lg font-black text-foreground mt-1 block truncate">{activeApplicant.recommendation}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5 block">Automated Screening</span>
                        </div>
                        <div className="p-4 rounded-md bg-muted/40 border border-border/80">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Admissions Quota</span>
                          <span className="text-lg font-black text-primary mt-1 block truncate">{activeApplicant.quotaCategory}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5 block">CBSE Criteria Met</span>
                        </div>
                      </div>
                    </div>

                    {/* Family & Contact Details */}
                    <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Family & Guardian Contact Dossier</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">
                            Father / Primary Guardian
                          </span>
                          <span className="text-base font-bold text-foreground block mt-1">
                            {activeApplicant.guardianName} ({activeApplicant.guardianRelation})
                          </span>
                          <span className="text-xs text-muted-foreground mt-0.5 block">Authorized Pickup Contact</span>
                        </div>

                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">
                            Mother's Full Name
                          </span>
                          <span className="text-base font-bold text-foreground block mt-1">{activeApplicant.motherName}</span>
                          <span className="text-xs text-muted-foreground mt-0.5 block">Secondary Guardian</span>
                        </div>

                        {/* Phone & Direct Action Box */}
                        <div className="sm:col-span-2 p-4 rounded-md bg-muted/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Primary Contact Number</span>
                            <span className="font-mono text-lg font-bold text-foreground mt-1 block">{activeApplicant.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => window.open(`https://wa.me/${activeApplicant.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                              className="px-4 py-2 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>WhatsApp Guardian</span>
                            </button>
                            <button
                              onClick={() => handleCopy(activeApplicant.phone, 'phone')}
                              className="px-3.5 py-2 rounded-md bg-muted hover:bg-muted/80 border border-border text-foreground text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              {copiedKey === 'phone' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                              <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Email & Residential Address */}
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Guardian Email</span>
                          <div className="flex items-center justify-between gap-2 mt-1">
                            <span className="font-mono text-sm font-semibold text-foreground truncate">{activeApplicant.email}</span>
                            <button
                              onClick={() => handleCopy(activeApplicant.email, 'email')}
                              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                            >
                              {copiedKey === 'email' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Residential Address</span>
                          <span className="text-sm font-semibold text-foreground mt-1 block truncate">{activeApplicant.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* School Logistics, Commute & Stream Preference */}
                    <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                        <Bus className="h-4 w-4 text-muted-foreground" />
                        <span>Logistics, Track Preference & Health Status</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Applied Track / Stream</span>
                          <span className="text-sm font-bold text-foreground mt-1 block">{activeApplicant.streamPreference}</span>
                        </div>
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Transport Preference</span>
                          <span className="text-sm font-bold text-foreground mt-1 block">{activeApplicant.transportPreference}</span>
                        </div>
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Medical & Physical Fitness</span>
                          <span className={cn('text-sm font-bold mt-1 block', activeApplicant.medicalClearance ? 'text-emerald-400' : 'text-amber-400')}>
                            {activeApplicant.medicalClearance ? '✓ Cleared & Verified' : '⚠ Pending Doctor Certificate'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    TAB 2: ACADEMICS & ENTRANCE EXAMINATION
                    ═══════════════════════════════════════════════════════════ */}
                {drawerTab === 'academics' && (
                  <div className="space-y-6 animate-fade-in pt-1">
                    {/* Entrance Exam Standing */}
                    <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-border/60">
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span>Admissions Entrance & Aptitude Assessment</span>
                        </h4>
                        <span className="text-xs font-mono font-semibold text-muted-foreground">Session {activeSession}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Entrance Test Score</span>
                          <span className="text-2xl font-black text-foreground mt-1 block">{activeApplicant.entranceScore}</span>
                          <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">Top Tier Percentile</span>
                        </div>
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Entrance Merit Rank</span>
                          <span className="text-2xl font-black text-foreground mt-1 block">{activeApplicant.entranceRank}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5 block">General Admissions Pool</span>
                        </div>
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Prior School Performance</span>
                          <span className="text-2xl font-black text-emerald-400 mt-1 block">{activeApplicant.previousMarks}</span>
                          <span className="text-[11px] text-muted-foreground mt-0.5 block">{activeApplicant.previousSchool}</span>
                        </div>
                      </div>
                    </div>

                    {/* Subject-Wise Prior Academic Scorecard */}
                    <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <span>Prior Academic Scorecard & Subject Breakdown</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {activeApplicant.subjectScores && activeApplicant.subjectScores.length > 0 ? (
                          activeApplicant.subjectScores.map((sub, i) => (
                            <div key={i} className="p-3.5 rounded-md bg-muted/30 border border-border/60 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-foreground text-sm block">{sub.subject}</span>
                                <span className="text-xs font-mono text-muted-foreground mt-0.5 block">Score: {sub.score}</span>
                              </div>
                              <VFBadge variant="success" className="font-mono text-xs font-black">
                                {sub.grade}
                              </VFBadge>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-3 text-center py-6 text-sm text-muted-foreground">
                            Subject scorecard verified from prior transfer records.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interview & Faculty Evaluation */}
                    {activeApplicant.interviewRecord && (
                      <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-border/60">
                          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <School className="h-4 w-4 text-muted-foreground" />
                            <span>Faculty Interview & Admissions Panel Feedback</span>
                          </h4>
                          <span className="text-xs font-mono text-muted-foreground">{activeApplicant.interviewRecord.date}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-md bg-muted/30 border border-border/60 space-y-1">
                            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Interviewer</span>
                            <span className="text-sm font-bold text-foreground block">{activeApplicant.interviewRecord.interviewer}</span>
                            <div className="flex items-center gap-2 pt-2">
                              <span className="text-xs text-muted-foreground">Score:</span>
                              <span className="text-sm font-mono font-black text-foreground">{activeApplicant.interviewRecord.score}</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-md bg-muted/30 border border-border/60 space-y-1">
                            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Panel Recommendation</span>
                            <span className="text-sm font-bold text-emerald-400 block">{activeApplicant.interviewRecord.recommendation}</span>
                            <p className="text-xs text-muted-foreground pt-1 italic">"{activeApplicant.interviewRecord.remarks}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    TAB 3: OCR & DOCUMENT VERIFICATION AUDIT
                    ═══════════════════════════════════════════════════════════ */}
                {drawerTab === 'documents' && (
                  <div className="space-y-6 animate-fade-in pt-1">
                    {/* OCR Status Summary Banner */}
                    <div className="p-5 rounded-lg bg-card border border-border shadow-xs flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0 border border-primary/30">
                          <FileCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-foreground text-base">CBSE Document Verification Audit</h4>
                            <VFBadge variant={activeApplicant.ocrDocStatus === 'Verified' ? 'success' : activeApplicant.ocrDocStatus === 'Flagged' ? 'danger' : 'warning'}>
                              {activeApplicant.ocrDocStatus}
                            </VFBadge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Automated OCR cross-referenced against prior school and municipal registries
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Document Checklist */}
                    <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Mandatory Document Clearance Matrix</span>
                      </h4>

                      <div className="space-y-3">
                        {[
                          {
                            title: 'Transfer Certificate (TC) from Prior School',
                            desc: 'Official counter-signed TC with district education officer seal',
                            status: activeApplicant.tcAvailable,
                            statusText: activeApplicant.tcAvailable ? 'Verified & Scanned' : 'Pending Submission',
                          },
                          {
                            title: 'Municipal Birth Certificate',
                            desc: 'DOB cross-verified against applicant date of birth',
                            status: activeApplicant.birthCertVerified,
                            statusText: activeApplicant.birthCertVerified ? 'Verified (OCR Match 99.4%)' : 'Under Verification',
                          },
                          {
                            title: 'Prior Year Report Cards & Marks Statement',
                            desc: 'Official mark sheets for previous 2 academic terms',
                            status: activeApplicant.marksheetVerified,
                            statusText: activeApplicant.marksheetVerified ? 'Verified & Authenticated' : 'Missing Seal',
                          },
                          {
                            title: 'Candidate & Guardian Aadhaar Card / ID Proof',
                            desc: 'UIDAI biometric validation and address proof match',
                            status: activeApplicant.aadhaarVerified,
                            statusText: activeApplicant.aadhaarVerified ? 'Verified & Linked' : 'Pending Scan',
                          },
                          {
                            title: 'Medical Fitness & Blood Group Certificate',
                            desc: 'Doctor clearance for physical education and school sports',
                            status: activeApplicant.medicalClearance,
                            statusText: activeApplicant.medicalClearance ? 'Cleared' : 'Pending Medical Slip',
                          },
                        ].map((doc, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-md bg-muted/30 border border-border/60 flex items-center justify-between gap-4 flex-wrap"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  'h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-black',
                                  doc.status ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                )}
                              >
                                {doc.status ? '✓' : '!'}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{doc.title}</p>
                                <p className="text-xs text-muted-foreground">{doc.desc}</p>
                              </div>
                            </div>
                            <VFBadge variant={doc.status ? 'success' : 'warning'}>
                              {doc.statusText}
                            </VFBadge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════════
                    TAB 4: ADMISSIONS BOARD DECISION & OFFER LETTER
                    ═══════════════════════════════════════════════════════════ */}
                {drawerTab === 'decisions' && (
                  <div className="space-y-6 animate-fade-in pt-1">
                    {/* Decision Pipeline Status */}
                    <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-border/60">
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                          <FileBadge2 className="h-4 w-4 text-primary" />
                          <span>Admissions Committee Determination</span>
                        </h4>
                        <VFBadge variant={activeApplicant.stage === 'Approved' ? 'success' : 'outline'}>
                          Stage: {activeApplicant.stage}
                        </VFBadge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-md bg-muted/30 border border-border/60 space-y-2">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Admission Status</span>
                          <p className="text-xl font-black text-foreground">
                            {activeApplicant.stage === 'Approved' ? 'Provisional Offer Issued' : 'Under Review & Screening'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Target Academic Session: <span className="font-bold text-foreground">{activeSession}</span>
                          </p>
                        </div>

                        <div className="p-4 rounded-md bg-muted/30 border border-border/60 space-y-2">
                          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wide block">Annual Tuition & Fees</span>
                          <p className="text-xl font-black text-foreground">{activeApplicant.annualFee}</p>
                          <p className="text-xs text-muted-foreground">
                            Includes Composite Tuition, Labs & Activity Charges
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Official Offer Letter Preview & Print Action */}
                    <div className="p-5 sm:p-6 rounded-lg bg-card border border-border/80 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-border/60 flex-wrap gap-2">
                        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                          <Printer className="h-4 w-4 text-muted-foreground" />
                          <span>Provisional Admission Offer Dossier</span>
                        </h4>
                        <div className="flex items-center gap-2">
                          <VFButton
                            size="sm"
                            variant="outline"
                            leftIcon={<Printer className="h-4 w-4" />}
                            onClick={() => {
                              setOfferApplicant(activeApplicant);
                              setIsOfferModalOpen(true);
                            }}
                          >
                            Preview & Print Offer Letter
                          </VFButton>
                        </div>
                      </div>

                      <div className="p-5 rounded-md bg-muted/20 border border-border/60 font-serif text-sm space-y-3 leading-relaxed text-foreground">
                        <div className="flex items-center justify-between border-b border-border/50 pb-2 text-xs font-mono font-semibold text-muted-foreground">
                          <span>Ref: VM/ADM/{activeSession.split('–')[0]}/{activeApplicant.applicantId}</span>
                          <span>Date: {activeApplicant.appliedDate}</span>
                        </div>
                        <p>
                          Dear <span className="font-bold text-foreground">{activeApplicant.guardianName}</span>,
                        </p>
                        <p>
                          We are pleased to inform you that following evaluation by the Admissions Committee,{' '}
                          <span className="font-bold text-foreground">{activeApplicant.name}</span> has been granted{' '}
                          <span className="font-bold text-emerald-400">Provisional Admission</span> into{' '}
                          <span className="font-bold text-foreground">{activeApplicant.appliedGrade}</span> ({activeApplicant.streamPreference}) for Academic Session {activeSession}.
                        </p>
                        <p className="text-xs text-muted-foreground font-sans">
                          To confirm enrollment, please finalize document verification and complete the initial term fee submission within 7 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </VFDrawer>

      {/* ═══════════════════════════════════════════════════════════════════════
          OFFICIAL PROVISIONAL ADMISSION OFFER LETTER MODAL
          ═══════════════════════════════════════════════════════════════════════ */}
      <VFDialog
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        title="Provisional Admission Offer Letter"
        className="max-w-2xl"
        footerActions={
          <div className="flex items-center justify-between w-full">
            <VFButton variant="outline" size="sm" onClick={() => setIsOfferModalOpen(false)}>
              Close
            </VFButton>
            <div className="flex items-center gap-2">
              <VFButton
                size="sm"
                leftIcon={<Printer className="h-4 w-4" />}
                onClick={() => {
                  window.print();
                }}
              >
                Print Offer Letter
              </VFButton>
            </div>
          </div>
        }
      >
        {offerApplicant && (
          <div className="space-y-5 p-4 rounded-md bg-card border border-border text-foreground font-serif text-sm">
            <div className="text-center pb-4 border-b border-border space-y-1">
              <h2 className="text-xl font-black tracking-tight text-foreground font-sans uppercase">
                VidyaMaxx International Academy
              </h2>
              <p className="text-xs text-muted-foreground font-sans">
                Affiliated to Central Board of Secondary Education (CBSE), New Delhi
              </p>
              <p className="text-xs font-mono text-muted-foreground font-sans">
                Ref No: VM/ADM/{offerApplicant.applicantId} · Session {activeSession}
              </p>
            </div>

            <div className="flex justify-between items-start text-xs font-sans">
              <div>
                <p className="font-bold text-foreground">To:</p>
                <p className="font-semibold">{offerApplicant.guardianName}</p>
                <p className="text-muted-foreground">{offerApplicant.address}</p>
                <p className="text-muted-foreground font-mono">{offerApplicant.phone}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">Date: {offerApplicant.appliedDate}</p>
                <p className="text-emerald-400 font-bold">Status: Provisional Offer Granted</p>
              </div>
            </div>

            <div className="space-y-3 leading-relaxed">
              <p className="font-bold text-base">
                Subject: Provisional Offer of Admission for {offerApplicant.name} ({offerApplicant.appliedGrade})
              </p>
              <p>
                We have reviewed the entrance assessments and academic records of your ward,{' '}
                <span className="font-bold">{offerApplicant.name}</span>. We are pleased to formally extend a provisional offer of admission into{' '}
                <span className="font-bold">{offerApplicant.appliedGrade}</span> ({offerApplicant.streamPreference}) for Academic Session {activeSession}.
              </p>

              <div className="p-4 rounded-lg bg-muted/40 font-sans text-xs space-y-1.5 border border-border/60">
                <p className="font-bold text-foreground">Admission Details Summary:</p>
                <div className="grid grid-cols-2 gap-2 text-muted-foreground pt-1">
                  <span>Candidate Name: <strong className="text-foreground">{offerApplicant.name}</strong></span>
                  <span>Applicant ID: <strong className="text-foreground">{offerApplicant.applicantId}</strong></span>
                  <span>Applied Grade: <strong className="text-foreground">{offerApplicant.appliedGrade}</strong></span>
                  <span>Annual Fee: <strong className="text-foreground">{offerApplicant.annualFee}</strong></span>
                  <span>AI Fit Score: <strong className="text-emerald-400">{offerApplicant.fitScore}%</strong></span>
                  <span>Entrance Rank: <strong className="text-foreground">{offerApplicant.entranceRank}</strong></span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Please confirm enrollment within 7 working days with the admissions office.
              </p>
            </div>

            <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-sans text-muted-foreground">
              <div>
                <p className="font-bold text-foreground">Dr. V. Malhotra</p>
                <p>Dean of Admissions & Registrar</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded border border-emerald-500/40 text-emerald-400 font-bold">
                  ✓ VERIFIED ADMISSION
                </span>
              </div>
            </div>
          </div>
        )}
      </VFDialog>
    </VFPageContainer>
  );
}
