import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  VFPageContainer,
  VFCard,
  VFBadge,
  VFButton,
  VFDataTable,
  VFSelect,
  VFInput,
  VFDrawer,
  VFTextarea,
} from '@vidyafloww/ui';
import {
  BookOpen,
  Book,
  Plus,
  Check,
  Layers,
  Clock,
  GraduationCap,
  Grid,
  Download,
  Edit2,
  Trash2,
  Calendar,
  X,
  UserCheck,
} from 'lucide-react';
import { useGlobalStore } from '../stores/globalStore';
import { useTranslation } from '../hooks/useTranslation';

export const Route = createFileRoute('/academics')({
  component: AcademicsPage,
});

export interface PrescribedBook {
  id: string;
  title: string;
  publisher: string;
  type: 'Textbook' | 'Supplementary' | 'Lab Manual' | 'Exemplar' | 'Workbook';
  edition: string;
  code: string;
  isMandatory: boolean;
  digitalAccess: string;
  chapters: string[];
}

export interface ClassSubject {
  code: string;
  name: string;
  type: 'Core Compulsory' | 'Core Science' | 'Language & Comms' | 'Commerce Core' | 'Skill & IT' | 'Humanities Core' | 'Elective';
  weeklyPeriods: number;
  theoryMarks: number;
  internalMarks: number;
  teacherInCharge: string;
  syllabusChapters: number;
  book?: PrescribedBook;
  status?: 'Active' | 'Elective';
}

export interface ClassProfile {
  classId: string;
  className: string;
  hindiClassName: string;
  stage: string;
  sections: string[];
  classMentor: string;
  room: string;
  totalStudents: number;
  subjects: ClassSubject[];
}

export interface AcademicMilestone {
  id: string;
  classId: string;
  title: string;
  term: string;
  startDate: string;
  endDate: string;
  targetSyllabusCoverage: number;
  assessmentType: 'Mid-Term Exam' | 'Periodic Test' | 'Pre-Board Exam' | 'Final CBSE Board' | 'Internal Assessment & Practical';
  status: 'In Progress' | 'Upcoming' | 'Scheduled' | 'Completed';
  notes?: string;
}

const DEFAULT_MILESTONES: AcademicMilestone[] = [
  {
    id: 'MS-10-01',
    classId: 'Class 10',
    title: 'Term 1 Mid-Year Summative Evaluation',
    term: 'Term 1',
    startDate: '2026-04-01',
    endDate: '2026-09-30',
    targetSyllabusCoverage: 50,
    assessmentType: 'Mid-Term Exam',
    status: 'In Progress',
    notes: '50% Prescribed Syllabus Coverage. Assessment submissions to regional accreditation portal.',
  },
  {
    id: 'MS-10-02',
    classId: 'Class 10',
    title: 'Periodic Test 2 (Pen & Paper Review)',
    term: 'Periodic Test 2',
    startDate: '2026-10-12',
    endDate: '2026-10-24',
    targetSyllabusCoverage: 75,
    assessmentType: 'Periodic Test',
    status: 'Upcoming',
    notes: 'Diagnostic assessment covering 75% syllabus with remedial class allocation for borderline students.',
  },
  {
    id: 'MS-10-03',
    classId: 'Class 10',
    title: 'Pre-Board Simulation Examinations',
    term: 'Pre-Board',
    startDate: '2026-12-01',
    endDate: '2026-12-18',
    targetSyllabusCoverage: 100,
    assessmentType: 'Pre-Board Exam',
    status: 'Scheduled',
    notes: '100% full syllabus coverage under official 3-hour CBSE board pattern simulation.',
  },
  {
    id: 'MS-10-04',
    classId: 'Class 10',
    title: 'CBSE All India Secondary School Exam (AISSE)',
    term: 'Final Board',
    startDate: '2027-02-15',
    endDate: '2027-03-28',
    targetSyllabusCoverage: 100,
    assessmentType: 'Final CBSE Board',
    status: 'Scheduled',
    notes: 'Final board accreditation and external theory/practical evaluations.',
  },
];

const INITIAL_CLASSES: Record<string, ClassProfile> = {
  'Class 10': {
    classId: 'Class 10',
    className: 'Class 10',
    hindiClassName: 'कक्षा 10',
    stage: 'Secondary Board Examination (CBSE)',
    sections: ['Class 10-A', 'Class 10-B', 'Class 10-C'],
    classMentor: 'Dr. Rajesh Sharma',
    room: 'Room 201',
    totalStudents: 114,
    subjects: [
      {
        code: 'SUB-10-MTH',
        name: 'Mathematics (Standard & Basic)',
        type: 'Core Compulsory',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Dr. Rajesh Sharma',
        syllabusChapters: 14,
        status: 'Active',
        book: {
          id: 'BK-10-MTH-1',
          title: 'Mathematics – Textbook for Class X',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Rationalized Edition',
          code: 'NCERT Code: 1062',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA & NCERT Portal',
          chapters: ['Real Numbers', 'Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas & Volumes', 'Statistics', 'Probability'],
        },
      },
      {
        code: 'SUB-10-SCI',
        name: 'Science (Physics, Chemistry & Biology)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mrs. Sunita Verma',
        syllabusChapters: 13,
        status: 'Active',
        book: {
          id: 'BK-10-SCI-1',
          title: 'Science – Textbook for Class X',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Rationalized Edition',
          code: 'NCERT Code: 1064',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA & NCERT Portal',
          chapters: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Carbon & its Compounds', 'Life Processes', 'Control & Coordination', 'How do Organisms Reproduce?', 'Heredity', 'Light – Reflection & Refraction', 'The Human Eye & Colourful World', 'Electricity', 'Magnetic Effects of Electric Current', 'Our Environment'],
        },
      },
      {
        code: 'SUB-10-ENG',
        name: 'English Language & Literature (184)',
        type: 'Language & Comms',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Arvind Gupta',
        syllabusChapters: 18,
        status: 'Active',
        book: {
          id: 'BK-10-ENG-1',
          title: 'First Flight – Textbook in English for Class X',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1059',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA / School Portal',
          chapters: ['A Letter to God', 'Nelson Mandela: Long Walk to Freedom', 'Two Stories about Flying', 'From the Diary of Anne Frank', 'Glimpses of India', 'Mijbil the Otter', 'Madam Rides the Bus', 'The Sermon at Benares', 'The Proposal (Play)'],
        },
      },
      {
        code: 'SUB-10-SST',
        name: 'Social Science (Hist, Geo, Civ, Econ)',
        type: 'Core Compulsory',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Ms. Pooja Rao',
        syllabusChapters: 19,
        status: 'Active',
        book: {
          id: 'BK-10-SST-1',
          title: 'Social Science: India & Contemporary World (Class X)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1065',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The Rise of Nationalism in Europe', 'Nationalism in India', 'Making of a Global World', 'Resources & Development', 'Agriculture', 'Manufacturing Industries', 'Power-sharing & Federalism', 'Political Parties', 'Development & Sectors of Indian Economy', 'Money and Credit'],
        },
      },
      {
        code: 'SUB-10-HIN',
        name: 'Hindi Course A (002)',
        type: 'Language & Comms',
        weeklyPeriods: 4,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Dr. Manoj Nair',
        syllabusChapters: 14,
        status: 'Active',
        book: {
          id: 'BK-10-HIN-1',
          title: 'क्षितिज भाग-२ (Kshitij Bhag 2 – मुख्य पाठ्यपुस्तक)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1057',
          isMandatory: true,
          digitalAccess: 'DIKSHA पोर्टल पर उपलब्ध',
          chapters: ['सूरदास के पद', 'राम-लक्ष्मण-परशुराम संवाद', 'उत्साह / अट नहीं रही है', 'यह दंतुरित मुस्कान', 'नेताजी का चश्मा', 'बालगोबिन भगत', 'लखनवी अंदाज़', 'एक कहानी यह भी'],
        },
      },
      {
        code: 'SUB-10-IT',
        name: 'Information Technology (Skill 402)',
        type: 'Skill & IT',
        weeklyPeriods: 4,
        theoryMarks: 50,
        internalMarks: 50,
        teacherInCharge: 'Mr. Deepak Mishra',
        syllabusChapters: 9,
        status: 'Active',
        book: {
          id: 'BK-10-IT-1',
          title: 'Information Technology (Subject Code 402) Class X',
          publisher: 'CBSE Curriculum',
          type: 'Textbook',
          edition: '2026–27 Official Skill Curriculum',
          code: 'CBSE-IT-402',
          isMandatory: true,
          digitalAccess: 'CBSE Academic Official Digital PDF',
          chapters: ['Communication Skills', 'Self-Management Skills', 'ICT Skills', 'Entrepreneurial Skills', 'Digital Documentation (Advanced)', 'Electronic Spreadsheet (Advanced)', 'Database Management System (RDBMS MySQL)', 'Web Applications & Security'],
        },
      },
    ],
  },
  'Class 12-Sci': {
    classId: 'Class 12-Sci',
    className: 'Class 12 (Science)',
    hindiClassName: 'कक्षा 12 (विज्ञान)',
    stage: 'Senior Secondary – Science (PCM/PCB Stream)',
    sections: ['Class 12-Sci A', 'Class 12-Sci B'],
    classMentor: 'Dr. Rajesh Sharma',
    room: 'Lab 102',
    totalStudents: 78,
    subjects: [
      {
        code: 'SUB-12-PHY',
        name: 'Physics (Theory & Practical)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 70,
        internalMarks: 30,
        teacherInCharge: 'Dr. Rajesh Sharma',
        syllabusChapters: 14,
        status: 'Active',
        book: {
          id: 'BK-12-PHY-1',
          title: 'Physics Part-I & Part-II (Class XII)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1214 & 1215',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Electric Charges & Fields', 'Electrostatic Potential & Capacitance', 'Current Electricity', 'Moving Charges & Magnetism', 'Magnetism & Matter', 'Electromagnetic Induction', 'Alternating Current', 'Electromagnetic Waves', 'Ray Optics & Optical Instruments', 'Wave Optics', 'Dual Nature of Radiation & Matter', 'Atoms', 'Nuclei', 'Semiconductor Electronics'],
        },
      },
      {
        code: 'SUB-12-CHM',
        name: 'Chemistry (Physical, Organic & Inorganic)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 70,
        internalMarks: 30,
        teacherInCharge: 'Mrs. Sunita Verma',
        syllabusChapters: 10,
        status: 'Active',
        book: {
          id: 'BK-12-CHM-1',
          title: 'Chemistry Part-I & Part-II (Class XII)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1217 & 1218',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Solutions', 'Electrochemistry', 'Chemical Kinetics', 'd- and f-Block Elements', 'Coordination Compounds', 'Haloalkanes & Haloarenes', 'Alcohols, Phenols & Ethers', 'Aldehydes, Ketones & Carboxylic Acids', 'Amines', 'Biomolecules'],
        },
      },
      {
        code: 'SUB-12-MTH',
        name: 'Mathematics (Part I & II)',
        type: 'Core Compulsory',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Amit Das',
        syllabusChapters: 13,
        status: 'Active',
        book: {
          id: 'BK-12-MTH-1',
          title: 'Mathematics Part-I & Part-II (Class XII)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1211 & 1212',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Relations & Functions', 'Inverse Trigonometric Functions', 'Matrices', 'Determinants', 'Continuity & Differentiability', 'Application of Derivatives', 'Integrals', 'Application of Integrals', 'Differential Equations', 'Vector Algebra', 'Three Dimensional Geometry', 'Linear Programming', 'Probability'],
        },
      },
      {
        code: 'SUB-12-BIO',
        name: 'Biology (Theory & Practical)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 70,
        internalMarks: 30,
        teacherInCharge: 'Dr. Manoj Nair',
        syllabusChapters: 13,
        status: 'Elective',
        book: {
          id: 'BK-12-BIO-1',
          title: 'Biology – Textbook for Class XII',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1219',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Sexual Reproduction in Flowering Plants', 'Human Reproduction', 'Reproductive Health', 'Principles of Inheritance & Variation', 'Molecular Basis of Inheritance', 'Evolution', 'Human Health & Disease', 'Microbes in Human Welfare', 'Biotechnology Principles & Processes', 'Biotechnology Applications', 'Organisms & Populations', 'Ecosystem', 'Biodiversity & Conservation'],
        },
      },
      {
        code: 'SUB-12-ENG',
        name: 'English Core (301)',
        type: 'Language & Comms',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Arvind Gupta',
        syllabusChapters: 16,
        status: 'Active',
        book: {
          id: 'BK-12-ENG-1',
          title: 'Flamingo – English Reader Class XII',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1201',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The Last Lesson', 'Lost Spring', 'Deep Water', 'The Rattrap', 'Indigo', 'Poets and Pancakes', 'The Interview', 'Going Places', 'My Mother at Sixty-Six', 'Keeping Quiet', 'A Thing of Beauty', 'A Roadside Stand', 'Aunt Jennifer\'s Tigers'],
        },
      },
      {
        code: 'SUB-12-CS',
        name: 'Computer Science with Python (083)',
        type: 'Skill & IT',
        weeklyPeriods: 5,
        theoryMarks: 70,
        internalMarks: 30,
        teacherInCharge: 'Mr. Deepak Mishra',
        syllabusChapters: 12,
        status: 'Elective',
        book: {
          id: 'BK-12-CS-1',
          title: 'Computer Science with Python by Sumita Arora (Class XII)',
          publisher: 'Dhanpat Rai & Co.',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'ISBN: 978-8183189912',
          isMandatory: true,
          digitalAccess: 'Computer Lab Reference & Digital Repository',
          chapters: ['Python Review Tour', 'Functions', 'File Handling (Text, Binary, CSV)', 'Data Structures (Stack)', 'Computer Networks', 'Database Management & SQL', 'Interface Python with SQL'],
        },
      },
    ],
  },
  'Class 12-Com': {
    classId: 'Class 12-Com',
    className: 'Class 12 (Commerce)',
    hindiClassName: 'कक्षा 12 (कॉमर्स)',
    stage: 'Senior Secondary – Commerce & Accountancy',
    sections: ['Class 12-Com A'],
    classMentor: 'Mrs. S. Joshi',
    room: 'Room 302',
    totalStudents: 34,
    subjects: [
      {
        code: 'SUB-12-ACC',
        name: 'Accountancy (Company & Partnership)',
        type: 'Commerce Core',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mrs. S. Joshi',
        syllabusChapters: 10,
        status: 'Active',
        book: {
          id: 'BK-12-ACC-1',
          title: 'Double Entry Book Keeping – T.S. Grewal (Class XII)',
          publisher: 'Sultan Chand & Sons',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'ISBN: 978-9391090123',
          isMandatory: true,
          digitalAccess: 'School Library & ERP Prescribed',
          chapters: ['Accounting for Partnership Firms', 'Reconstitution of a Partnership Firm', 'Dissolution of Partnership', 'Accounting for Share Capital & Debentures', 'Financial Statements of a Company', 'Cash Flow Statement'],
        },
      },
      {
        code: 'SUB-12-BST',
        name: 'Business Studies (Management & Finance)',
        type: 'Commerce Core',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Deepak Mishra',
        syllabusChapters: 12,
        status: 'Active',
        book: {
          id: 'BK-12-BST-1',
          title: 'Business Studies: Principles and Functions of Management',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1222',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Nature and Significance of Management', 'Principles of Management', 'Business Environment', 'Planning', 'Organising', 'Staffing', 'Directing', 'Controlling', 'Financial Management', 'Financial Markets', 'Marketing Management', 'Consumer Protection'],
        },
      },
      {
        code: 'SUB-12-ECO',
        name: 'Economics (Macroeconomics & Indian Economy)',
        type: 'Commerce Core',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Dr. Rajesh Sharma',
        syllabusChapters: 12,
        status: 'Active',
        book: {
          id: 'BK-12-ECO-1',
          title: 'Introductory Macroeconomics & Indian Economy (Class XII)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1224',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['National Income & Related Aggregates', 'Money & Banking', 'Determination of Income & Employment', 'Government Budget', 'Balance of Payments', 'Development Experiences of India 1947–1990', 'Economic Reforms Since 1991', 'Current Challenges Facing Indian Economy'],
        },
      },
      {
        code: 'SUB-12-ENG',
        name: 'English Core (301)',
        type: 'Language & Comms',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Arvind Gupta',
        syllabusChapters: 16,
        status: 'Active',
        book: {
          id: 'BK-12-ENG-C1',
          title: 'Flamingo – English Reader Class XII',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1201',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The Last Lesson', 'Lost Spring', 'Deep Water', 'The Rattrap', 'Indigo', 'Poetry & Reading Section'],
        },
      },
      {
        code: 'SUB-12-AMTH',
        name: 'Applied Mathematics (241)',
        type: 'Commerce Core',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Amit Das',
        syllabusChapters: 8,
        status: 'Elective',
        book: {
          id: 'BK-12-AMTH-1',
          title: 'Applied Mathematics for Class 12 – M.L. Aggarwal',
          publisher: 'Arya Publishing Company',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'ISBN: 978-8178558914',
          isMandatory: true,
          digitalAccess: 'Available in Central School Library',
          chapters: ['Numbers, Quantification & Applications', 'Algebra', 'Calculus for Commerce', 'Probability Distributions', 'Inferential Statistics', 'Time-based Data & Index Numbers', 'Financial Mathematics', 'Linear Programming'],
        },
      },
    ],
  },
  'Class 9': {
    classId: 'Class 9',
    className: 'Class 9',
    hindiClassName: 'कक्षा 9',
    stage: 'Secondary Foundation (CBSE)',
    sections: ['Class 9-A', 'Class 9-B'],
    classMentor: 'Mrs. Sunita Verma',
    room: 'Room 101',
    totalStudents: 74,
    subjects: [
      {
        code: 'SUB-9-MTH',
        name: 'Mathematics (041)',
        type: 'Core Compulsory',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Dr. Rajesh Sharma',
        syllabusChapters: 12,
        status: 'Active',
        book: {
          id: 'BK-9-MTH-1',
          title: 'Mathematics – Textbook for Class IX',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0962',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Number Systems', 'Polynomials', 'Coordinate Geometry', 'Linear Equations in Two Variables', 'Lines and Angles', 'Triangles', 'Quadrilaterals', 'Circles', 'Heron\'s Formula', 'Surface Areas and Volumes', 'Statistics'],
        },
      },
      {
        code: 'SUB-9-SCI',
        name: 'Science (Physics, Chemistry, Biology)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mrs. Sunita Verma',
        syllabusChapters: 12,
        status: 'Active',
        book: {
          id: 'BK-9-SCI-1',
          title: 'Science – Textbook for Class IX',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0964',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Matter in Our Surroundings', 'Is Matter Around Us Pure', 'Atoms and Molecules', 'Structure of the Atom', 'The Fundamental Unit of Life', 'Tissues', 'Motion', 'Force and Laws of Motion', 'Gravitation', 'Work and Energy', 'Sound'],
        },
      },
      {
        code: 'SUB-9-ENG',
        name: 'English Language & Literature (184)',
        type: 'Language & Comms',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Arvind Gupta',
        syllabusChapters: 19,
        status: 'Active',
        book: {
          id: 'BK-9-ENG-1',
          title: 'Beehive – Textbook in English for Class IX',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0959',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The Fun They Had', 'The Sound of Music', 'The Little Girl', 'A Truly Beautiful Mind', 'The Snake and the Mirror', 'My Childhood', 'Reach for the Top', 'Kathmandu', 'If I Were You'],
        },
      },
      {
        code: 'SUB-9-SST',
        name: 'Social Science (Hist, Geo, Civ, Econ)',
        type: 'Core Compulsory',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Ms. Pooja Rao',
        syllabusChapters: 16,
        status: 'Active',
        book: {
          id: 'BK-9-SST-1',
          title: 'Social Science: India and Contemporary World – I',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0965',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The French Revolution', 'Socialism in Europe & Russian Revolution', 'Nazism & Rise of Hitler', 'India – Size & Location', 'Physical Features of India', 'Drainage', 'Climate', 'What is Democracy? Why Democracy?', 'Constitutional Design', 'Electoral Politics', 'The Story of Village Palampur', 'People as Resource'],
        },
      },
      {
        code: 'SUB-9-AI',
        name: 'Artificial Intelligence (Skill 417)',
        type: 'Skill & IT',
        weeklyPeriods: 4,
        theoryMarks: 50,
        internalMarks: 50,
        teacherInCharge: 'Mr. Deepak Mishra',
        syllabusChapters: 6,
        status: 'Active',
        book: {
          id: 'BK-9-AI-1',
          title: 'Artificial Intelligence Curriculum Handbook Class IX',
          publisher: 'CBSE & Intel',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'CBSE-AI-417',
          isMandatory: true,
          digitalAccess: 'Official CBSE Skill Education Portal',
          chapters: ['Introduction to AI', 'AI Project Cycle', 'Neural Networks', 'Python for AI Basics', 'Data Literacy and Computer Vision Foundations'],
        },
      },
    ],
  },
  'Class 8': {
    classId: 'Class 8',
    className: 'Class 8',
    hindiClassName: 'कक्षा 8',
    stage: 'Middle School (Upper Primary)',
    sections: ['Class 8-A', 'Class 8-B'],
    classMentor: 'Ms. Pooja Rao',
    room: 'Room 103',
    totalStudents: 68,
    subjects: [
      {
        code: 'SUB-8-MTH',
        name: 'Mathematics',
        type: 'Core Compulsory',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Amit Das',
        syllabusChapters: 13,
        status: 'Active',
        book: {
          id: 'BK-8-MTH-1',
          title: 'Mathematics – Textbook for Class VIII',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0862',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Data Handling', 'Squares and Square Roots', 'Cubes and Cube Roots', 'Comparing Quantities', 'Algebraic Expressions', 'Mensuration', 'Exponents and Powers'],
        },
      },
      {
        code: 'SUB-8-SCI',
        name: 'Science',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mrs. Sunita Verma',
        syllabusChapters: 13,
        status: 'Active',
        book: {
          id: 'BK-8-SCI-1',
          title: 'Science – Textbook for Class VIII',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0864',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Crop Production & Management', 'Microorganisms: Friend and Foe', 'Coal and Petroleum', 'Combustion and Flame', 'Conservation of Plants and Animals', 'Reproduction in Animals', 'Force and Pressure', 'Friction', 'Sound', 'Chemical Effects of Electric Current', 'Light'],
        },
      },
      {
        code: 'SUB-8-ENG',
        name: 'English (Honeydew)',
        type: 'Language & Comms',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Arvind Gupta',
        syllabusChapters: 16,
        status: 'Active',
        book: {
          id: 'BK-8-ENG-1',
          title: 'Honeydew – Textbook in English Class VIII',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0859',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The Best Christmas Present in the World', 'The Tsunami', 'Glimpses of the Past', 'Bepin Choudhury\'s Lapse of Memory', 'The Summit Within', 'This is Jody\'s Fawn', 'A Short Monsoon Diary'],
        },
      },
      {
        code: 'SUB-8-HIN',
        name: 'Hindi (वसंत भाग-३)',
        type: 'Language & Comms',
        weeklyPeriods: 4,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Dr. Manoj Nair',
        syllabusChapters: 14,
        status: 'Active',
        book: {
          id: 'BK-8-HIN-1',
          title: 'वसंत भाग-३ (Vasant Bhag 3 – मुख्य पाठ्यपुस्तक)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0857',
          isMandatory: true,
          digitalAccess: 'DIKSHA पोर्टल पर उपलब्ध',
          chapters: ['ध्वनि', 'लाख की चूड़ियाँ', 'बस की यात्रा', 'दीवानों की हस्ती', 'चिट्ठियों की अनूठी दुनिया', 'भगवान के डाकिए'],
        },
      },
      {
        code: 'SUB-8-CS',
        name: 'Computer Science & Coding Foundation',
        type: 'Skill & IT',
        weeklyPeriods: 4,
        theoryMarks: 50,
        internalMarks: 50,
        teacherInCharge: 'Mr. Deepak Mishra',
        syllabusChapters: 8,
        status: 'Active',
        book: {
          id: 'BK-8-CS-1',
          title: 'Touchpad Plus Ver 2.0 (Coding & AI Class VIII)',
          publisher: 'Orange Education',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'ISBN: 978-9388514939',
          isMandatory: true,
          digitalAccess: 'School Computer Lab Repository',
          chapters: ['Networking Concepts', 'App Development', 'Python Conditional Statements', 'Python Loops', 'Artificial Intelligence Domains'],
        },
      },
    ],
  },
  'Class 6': {
    classId: 'Class 6',
    className: 'Class 6',
    hindiClassName: 'कक्षा 6',
    stage: 'Middle School Entry (Class 6)',
    sections: ['Class 6-A', 'Class 6-B'],
    classMentor: 'Dr. Manoj Nair',
    room: 'Room 105',
    totalStudents: 62,
    subjects: [
      {
        code: 'SUB-6-MTH',
        name: 'Mathematics',
        type: 'Core Compulsory',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Amit Das',
        syllabusChapters: 12,
        status: 'Active',
        book: {
          id: 'BK-6-MTH-1',
          title: 'Mathematics – Textbook for Class VI',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 0662',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Knowing Our Numbers', 'Whole Numbers', 'Playing with Numbers', 'Basic Geometrical Ideas', 'Understanding Elementary Shapes', 'Integers', 'Fractions', 'Decimals', 'Data Handling', 'Mensuration', 'Algebra', 'Ratio and Proportion'],
        },
      },
      {
        code: 'SUB-6-SCI',
        name: 'Science (Curiosity Science)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mrs. Sunita Verma',
        syllabusChapters: 11,
        status: 'Active',
        book: {
          id: 'BK-6-SCI-1',
          title: 'Curiosity – Science Textbook for Class VI',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 NCF Edition',
          code: 'NCERT Code: 0664',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The Wonderful World of Science', 'Diversity in the Living World', 'Mindful Eating: A Path to a Healthy Body', 'Exploring Magnets', 'Measurement of Length and Motion', 'Materials Around Us', 'Temperature and its Measurement', 'A Journey through States of Water', 'Methods of Separation in Everyday Life', 'Living Creatures', 'Nature\'s Treasures'],
        },
      },
      {
        code: 'SUB-6-ENG',
        name: 'English (Poorvi)',
        type: 'Language & Comms',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Arvind Gupta',
        syllabusChapters: 12,
        status: 'Active',
        book: {
          id: 'BK-6-ENG-1',
          title: 'Poorvi – Textbook in English for Class VI',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 NCF Edition',
          code: 'NCERT Code: 0659',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Fables and Folk Tales', 'Friendship', 'Nurturing Nature', 'Sports and Wellness', 'Culture and Tradition'],
        },
      },
    ],
  },
  'Class 11-Sci': {
    classId: 'Class 11-Sci',
    className: 'Class 11 (Science)',
    hindiClassName: 'कक्षा 11 (विज्ञान)',
    stage: 'Senior Secondary – Science Stream',
    sections: ['Class 11-Sci A'],
    classMentor: 'Dr. Manoj Nair',
    room: 'Lab 204',
    totalStudents: 35,
    subjects: [
      {
        code: 'SUB-11-PHY',
        name: 'Physics (Theory & Practical)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 70,
        internalMarks: 30,
        teacherInCharge: 'Dr. Rajesh Sharma',
        syllabusChapters: 14,
        status: 'Active',
        book: {
          id: 'BK-11-PHY-1',
          title: 'Physics Part-I & Part-II (Class XI)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1114 & 1115',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Units and Measurements', 'Motion in a Straight Line', 'Motion in a Plane', 'Laws of Motion', 'Work, Energy and Power', 'System of Particles and Rotational Motion', 'Gravitation', 'Mechanical Properties of Solids', 'Mechanical Properties of Fluids', 'Thermal Properties of Matter', 'Thermodynamics', 'Kinetic Theory', 'Oscillations', 'Waves'],
        },
      },
      {
        code: 'SUB-11-CHM',
        name: 'Chemistry (Theory & Practical)',
        type: 'Core Science',
        weeklyPeriods: 6,
        theoryMarks: 70,
        internalMarks: 30,
        teacherInCharge: 'Mrs. Sunita Verma',
        syllabusChapters: 9,
        status: 'Active',
        book: {
          id: 'BK-11-CHM-1',
          title: 'Chemistry Part-I & Part-II (Class XI)',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1117 & 1118',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Some Basic Concepts of Chemistry', 'Structure of Atom', 'Classification of Elements and Periodicity in Properties', 'Chemical Bonding and Molecular Structure', 'Chemical Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Organic Chemistry: Basic Principles', 'Hydrocarbons'],
        },
      },
      {
        code: 'SUB-11-MTH',
        name: 'Mathematics (041)',
        type: 'Core Compulsory',
        weeklyPeriods: 6,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Amit Das',
        syllabusChapters: 14,
        status: 'Active',
        book: {
          id: 'BK-11-MTH-1',
          title: 'Mathematics – Textbook for Class XI',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1111',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['Sets', 'Relations & Functions', 'Trigonometric Functions', 'Complex Numbers', 'Linear Inequalities', 'Permutations & Combinations', 'Binomial Theorem', 'Sequences & Series', 'Straight Lines', 'Conic Sections', 'Introduction to 3D Geometry', 'Limits and Derivatives', 'Statistics', 'Probability'],
        },
      },
      {
        code: 'SUB-11-ENG',
        name: 'English Core (301)',
        type: 'Language & Comms',
        weeklyPeriods: 5,
        theoryMarks: 80,
        internalMarks: 20,
        teacherInCharge: 'Mr. Arvind Gupta',
        syllabusChapters: 14,
        status: 'Active',
        book: {
          id: 'BK-11-ENG-1',
          title: 'Hornbill – Textbook in English for Class XI',
          publisher: 'NCERT',
          type: 'Textbook',
          edition: '2026–27 Edition',
          code: 'NCERT Code: 1101',
          isMandatory: true,
          digitalAccess: 'Available on DIKSHA Portal',
          chapters: ['The Portrait of a Lady', 'We\'re Not Afraid to Die... if We Can All Be Together', 'Discovering Tut: the Saga Continues', 'The Adventure', 'Silk Road', 'Poetry Sections'],
        },
      },
    ],
  },
};

const CLASS_OPTIONS = [
  { label: 'Class 10 (Secondary Board)', value: 'Class 10' },
  { label: 'Class 12 (Science Stream)', value: 'Class 12-Sci' },
  { label: 'Class 12 (Commerce Stream)', value: 'Class 12-Com' },
  { label: 'Class 11 (Science Stream)', value: 'Class 11-Sci' },
  { label: 'Class 9 (Foundation)', value: 'Class 9' },
  { label: 'Class 8 (Middle School)', value: 'Class 8' },
  { label: 'Class 6 (Upper Primary)', value: 'Class 6' },
];

function AcademicsPage() {
  const { addNotification } = useGlobalStore();
  const { t, lang } = useTranslation();
  const isHindi = lang === 'hi';

  React.useEffect(() => {
    document.title = (isHindi ? 'अकादमिक्स' : 'Academics') + ' \u2013 VidyaFloww';
  }, [isHindi]);

  // Selected Class & Views
  const [selectedClassId, setSelectedClassId] = React.useState<string>('Class 10');
  const [activeView, setActiveView] = React.useState<'subjects' | 'overview'>('subjects');
  const [classesData, setClassesData] = React.useState<Record<string, ClassProfile>>(INITIAL_CLASSES);

  // Current active class data fallback
  const currentClassProfile: ClassProfile = classesData[selectedClassId] || INITIAL_CLASSES['Class 10'];
  const subjects = currentClassProfile.subjects;


  // ─── 1. SUBJECT DRAWER STATE (ADD / EDIT) ──────────────────────────────────
  const [isSubjectDrawerOpen, setIsSubjectDrawerOpen] = React.useState(false);
  const [editingSubject, setEditingSubject] = React.useState<ClassSubject | null>(null);
  const [subjectForm, setSubjectForm] = React.useState({
    code: '',
    name: '',
    type: 'Core Compulsory' as ClassSubject['type'],
    weeklyPeriods: 5,
    theoryMarks: 80,
    internalMarks: 20,
    teacherInCharge: '',
    syllabusChapters: 12,
  });

  // ─── 2. CLASS TEACHER & DETAILS DRAWER STATE ───────────────────────────────
  const [isClassDetailsDrawerOpen, setIsClassDetailsDrawerOpen] = React.useState(false);
  const [classDetailsForm, setClassDetailsForm] = React.useState({
    classMentor: '',
    room: '',
    totalStudents: 114,
    stage: '',
  });

  // ─── 3. ACADEMIC MILESTONES STATE & DRAWER ─────────────────────────────────
  const [milestones, setMilestones] = React.useState<AcademicMilestone[]>(DEFAULT_MILESTONES);
  const [isMilestoneDrawerOpen, setIsMilestoneDrawerOpen] = React.useState(false);
  const [editingMilestone, setEditingMilestone] = React.useState<AcademicMilestone | null>(null);
  const [milestoneForm, setMilestoneForm] = React.useState({
    title: '',
    term: 'Term 1',
    startDate: '',
    endDate: '',
    targetSyllabusCoverage: 50,
    assessmentType: 'Mid-Term Exam' as AcademicMilestone['assessmentType'],
    status: 'Upcoming' as AcademicMilestone['status'],
    notes: '',
  });

  // ─── HANDLERS: EXPORT ──────────────────────────────────────────────────────
  const handleExport = () => {
    addNotification({
      title: isHindi ? 'पाठ्यक्रम व विषय सूची एक्सपोर्ट हुई' : 'Curriculum & Subject List Exported',
      description: isHindi
        ? `${currentClassProfile.className} की सभी विषय व पीरियड आवंटन सूची सफलतापूर्वक एक्सपोर्ट की गई।`
        : `Exported official curriculum and weekly period allocation for ${currentClassProfile.className}.`,
      type: 'success',
    });
  };

  // ─── HANDLERS: SUBJECTS (ADD / EDIT / DELETE) ───────────────────────────────
  const handleOpenAddSubject = () => {
    setEditingSubject(null);
    setSubjectForm({
      code: `SUB-${selectedClassId.replace('Class ', '')}-`,
      name: '',
      type: 'Core Compulsory',
      weeklyPeriods: 5,
      theoryMarks: 80,
      internalMarks: 20,
      teacherInCharge: currentClassProfile.classMentor || 'Dr. Rajesh Sharma',
      syllabusChapters: 12,
    });
    setIsSubjectDrawerOpen(true);
  };

  const handleOpenEditSubject = (sub: ClassSubject) => {
    setEditingSubject(sub);
    setSubjectForm({
      code: sub.code,
      name: sub.name,
      type: sub.type,
      weeklyPeriods: sub.weeklyPeriods,
      theoryMarks: sub.theoryMarks,
      internalMarks: sub.internalMarks,
      teacherInCharge: sub.teacherInCharge,
      syllabusChapters: sub.syllabusChapters,
    });
    setIsSubjectDrawerOpen(true);
  };

  const handleSaveSubject = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!subjectForm.name.trim()) return;

    const code = subjectForm.code.trim() || `SUB-${selectedClassId.replace('Class ', '')}-${subjectForm.name.substring(0, 3).toUpperCase()}`;

    if (editingSubject) {
      setClassesData((prev) => {
        const cls = prev[selectedClassId] || currentClassProfile;
        return {
          ...prev,
          [selectedClassId]: {
            ...cls,
            subjects: cls.subjects.map((s) =>
              s.code === editingSubject.code
                ? {
                    ...s,
                    code,
                    name: subjectForm.name.trim(),
                    type: subjectForm.type,
                    weeklyPeriods: Number(subjectForm.weeklyPeriods) || 5,
                    theoryMarks: Number(subjectForm.theoryMarks) || 80,
                    internalMarks: Number(subjectForm.internalMarks) || 20,
                    teacherInCharge: subjectForm.teacherInCharge.trim() || cls.classMentor,
                    syllabusChapters: Number(subjectForm.syllabusChapters) || 12,
                  }
                : s
            ),
          },
        };
      });

      addNotification({
        title: isHindi ? 'विषय अपडेट हुआ' : 'Subject Updated',
        description: `Subject "${subjectForm.name}" was successfully updated for ${currentClassProfile.className}.`,
        type: 'success',
      });
    } else {
      const newSubjectRecord: ClassSubject = {
        code,
        name: subjectForm.name.trim(),
        type: subjectForm.type,
        weeklyPeriods: Number(subjectForm.weeklyPeriods) || 5,
        theoryMarks: Number(subjectForm.theoryMarks) || 80,
        internalMarks: Number(subjectForm.internalMarks) || 20,
        teacherInCharge: subjectForm.teacherInCharge.trim() || currentClassProfile.classMentor,
        syllabusChapters: Number(subjectForm.syllabusChapters) || 12,
        book: {
          id: `BK-${Date.now()}`,
          title: `${subjectForm.name.trim()} – Prescribed Curriculum`,
          publisher: 'NCERT / CBSE Publications',
          type: 'Textbook',
          edition: '2026–27 Official Edition',
          code: `CBSE-${code}`,
          isMandatory: true,
          digitalAccess: 'Available in Central E-Library Repository',
          chapters: [],
        },
        status: 'Active',
      };

      setClassesData((prev) => {
        const cls = prev[selectedClassId] || currentClassProfile;
        return {
          ...prev,
          [selectedClassId]: {
            ...cls,
            subjects: [...cls.subjects, newSubjectRecord],
          },
        };
      });

      addNotification({
        title: isHindi ? 'नया विषय जोड़ा गया' : 'Subject Added',
        description: `Subject "${newSubjectRecord.name}" added to ${currentClassProfile.className}.`,
        type: 'success',
      });
    }

    setIsSubjectDrawerOpen(false);
  };

  const handleDeleteSubject = (code: string, name: string) => {
    setClassesData((prev) => {
      const cls = prev[selectedClassId] || currentClassProfile;
      return {
        ...prev,
        [selectedClassId]: {
          ...cls,
          subjects: cls.subjects.filter((s) => s.code !== code),
        },
      };
    });

    addNotification({
      title: isHindi ? 'विषय हटाया गया' : 'Subject Removed',
      description: `Course "${name}" (${code}) was removed from ${currentClassProfile.className}.`,
      type: 'info',
    });
  };

  // ─── HANDLERS: CLASS TEACHER / DETAILS ────────────────────────────────────
  const handleOpenClassDetailsDrawer = () => {
    setClassDetailsForm({
      classMentor: currentClassProfile.classMentor,
      room: currentClassProfile.room,
      totalStudents: currentClassProfile.totalStudents,
      stage: currentClassProfile.stage,
    });
    setIsClassDetailsDrawerOpen(true);
  };

  const handleSaveClassDetails = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setClassesData((prev) => {
      const cls = prev[selectedClassId] || currentClassProfile;
      return {
        ...prev,
        [selectedClassId]: {
          ...cls,
          classMentor: classDetailsForm.classMentor.trim() || cls.classMentor,
          room: classDetailsForm.room.trim() || cls.room,
          totalStudents: Number(classDetailsForm.totalStudents) || cls.totalStudents,
          stage: classDetailsForm.stage.trim() || cls.stage,
        },
      };
    });

    addNotification({
      title: isHindi ? 'कक्षा विवरण अपडेट हुआ' : 'Class Details Updated',
      description: `Updated mentor and room allocation for ${currentClassProfile.className}.`,
      type: 'success',
    });
    setIsClassDetailsDrawerOpen(false);
  };

  // ─── HANDLERS: MILESTONES ─────────────────────────────────────────────────
  const handleOpenAddMilestone = () => {
    setEditingMilestone(null);
    setMilestoneForm({
      title: '',
      term: 'Term 1',
      startDate: '2026-05-01',
      endDate: '2026-05-20',
      targetSyllabusCoverage: 25,
      assessmentType: 'Periodic Test',
      status: 'Upcoming',
      notes: '',
    });
    setIsMilestoneDrawerOpen(true);
  };

  const handleOpenEditMilestone = (ms: AcademicMilestone) => {
    setEditingMilestone(ms);
    setMilestoneForm({
      title: ms.title,
      term: ms.term,
      startDate: ms.startDate,
      endDate: ms.endDate,
      targetSyllabusCoverage: ms.targetSyllabusCoverage,
      assessmentType: ms.assessmentType,
      status: ms.status,
      notes: ms.notes || '',
    });
    setIsMilestoneDrawerOpen(true);
  };

  const handleSaveMilestone = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!milestoneForm.title.trim()) return;

    if (editingMilestone) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === editingMilestone.id
            ? {
                ...m,
                title: milestoneForm.title.trim(),
                term: milestoneForm.term,
                startDate: milestoneForm.startDate,
                endDate: milestoneForm.endDate,
                targetSyllabusCoverage: Number(milestoneForm.targetSyllabusCoverage) || 0,
                assessmentType: milestoneForm.assessmentType,
                status: milestoneForm.status,
                notes: milestoneForm.notes.trim(),
              }
            : m
        )
      );
      addNotification({
        title: isHindi ? 'मील का पत्थर अपडेट हुआ' : 'Milestone Updated',
        description: `Milestone "${milestoneForm.title}" updated successfully.`,
        type: 'success',
      });
    } else {
      const newMilestone: AcademicMilestone = {
        id: `MS-${Date.now().toString().slice(-4)}`,
        classId: selectedClassId,
        title: milestoneForm.title.trim(),
        term: milestoneForm.term,
        startDate: milestoneForm.startDate,
        endDate: milestoneForm.endDate,
        targetSyllabusCoverage: Number(milestoneForm.targetSyllabusCoverage) || 0,
        assessmentType: milestoneForm.assessmentType,
        status: milestoneForm.status,
        notes: milestoneForm.notes.trim(),
      };
      setMilestones((prev) => [...prev, newMilestone]);
      addNotification({
        title: isHindi ? 'नया मील का पत्थर जोड़ा गया' : 'Academic Milestone Created',
        description: `Milestone "${newMilestone.title}" added to academic roadmap.`,
        type: 'success',
      });
    }

    setIsMilestoneDrawerOpen(false);
  };

  const handleDeleteMilestone = (id: string, title: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    addNotification({
      title: isHindi ? 'मील का पत्थर हटाया गया' : 'Milestone Deleted',
      description: `Academic milestone "${title}" was removed.`,
      type: 'info',
    });
  };

  // ─── MAIN SUBJECTS TABLE COLUMNS ───────────────────────────────────────────
  // Status column removed and replaced with Actions (Edit & Delete buttons)
  const subjectColumns = [
    {
      header: isHindi ? 'विषय कोड' : 'Subject Code',
      accessorKey: 'code',
      cell: (r: ClassSubject) => (
        <span className="font-mono font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-[3px] border border-border text-xs">
          {r.code}
        </span>
      ),
    },
    {
      header: isHindi ? 'विषय व पाठ्यक्रम' : 'Subject & Syllabus',
      accessorKey: 'name',
      cell: (r: ClassSubject) => (
        <div className="py-0.5">
          <p className="font-bold text-foreground text-sm leading-tight flex items-center gap-1.5">
            {r.name}
          </p>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5 flex items-center gap-1">
            <Layers className="h-3 w-3 text-muted-foreground" />
            {r.syllabusChapters} {isHindi ? 'निर्धारित अध्याय' : 'Prescribed Chapters'}
          </p>
        </div>
      ),
    },
    {
      header: isHindi ? 'पाठ्यक्रम श्रेणी' : 'Curriculum Tier',
      accessorKey: 'type',
      cell: (r: ClassSubject) => (
        <VFBadge
          variant={
            r.type.includes('Core')
              ? 'default'
              : r.type.includes('Skill')
              ? 'warning'
              : 'outline'
          }
          className="text-[11px]"
        >
          {r.type}
        </VFBadge>
      ),
    },
    {
      header: isHindi ? 'साप्ताहिक पीरियड्स' : 'Weekly Periods',
      accessorKey: 'weeklyPeriods',
      cell: (r: ClassSubject) => (
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-black text-foreground">{r.weeklyPeriods}</span>
          <span className="text-muted-foreground text-[11px]">{isHindi ? 'पीरियड्स' : 'Periods/wk'}</span>
        </div>
      ),
    },
    {
      header: isHindi ? 'अंक विभाजन' : 'Assessment Scheme',
      accessorKey: 'theoryMarks',
      cell: (r: ClassSubject) => (
        <div className="text-xs">
          <span className="font-bold text-emerald-400">{r.theoryMarks} Th</span>
          <span className="text-muted-foreground mx-1">/</span>
          <span className="font-bold text-sky-400">{r.internalMarks} Int</span>
        </div>
      ),
    },
    {
      header: isHindi ? 'विषय अध्यापक' : 'Faculty / Mentor',
      accessorKey: 'teacherInCharge',
      cell: (r: ClassSubject) => (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-[#202020] border border-border flex items-center justify-center text-foreground text-[10px] font-bold shrink-0">
            {r.teacherInCharge.replace('Dr. ', '').replace('Mrs. ', '').replace('Mr. ', '').replace('Ms. ', '').substring(0, 2)}
          </div>
          <span className="text-foreground text-xs font-semibold">{r.teacherInCharge}</span>
        </div>
      ),
    },
    {
      header: isHindi ? 'निर्धारित पुस्तक (ई-लाइब्रेरी)' : 'Prescribed Book (E-Library)',
      accessorKey: 'book',
      cell: (r: ClassSubject) => {
        const bookTitle = r.book?.title || `${r.name} Textbook`;
        return (
          <Link
            to="/elibrary"
            title={`${bookTitle} – ${isHindi ? 'ई-लाइब्रेरी में देखें' : 'Open in E-Library'}`}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] bg-[#181818] hover:bg-[#222222] border border-border/70 hover:border-teal-500/60 text-xs font-semibold text-foreground transition-all cursor-pointer group max-w-sm text-left shadow-2xs"
          >
            <Book className="h-3.5 w-3.5 text-teal-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate max-w-[200px]">{bookTitle}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-400 border border-teal-500/30 font-bold shrink-0">
              {isHindi ? 'ई-लाइब्रेरी ↗' : 'E-Library ↗'}
            </span>
          </Link>
        );
      },
    },
    {
      header: isHindi ? 'कार्यवाही' : 'Actions',
      accessorKey: 'actions',
      cell: (r: ClassSubject) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleOpenEditSubject(r)}
            className="p-1.5 rounded-[3px] bg-[#1c1c1c] hover:bg-[#282828] border border-border/80 hover:border-zinc-500 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title={isHindi ? 'विषय विवरण अपडेट करें' : 'Edit Subject'}
          >
            <Edit2 className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteSubject(r.code, r.name)}
            className="p-1.5 rounded-[3px] bg-[#1c1c1c] hover:bg-rose-950/40 border border-border/80 hover:border-rose-500/60 text-muted-foreground hover:text-rose-400 transition-all cursor-pointer"
            title={isHindi ? 'विषय हटाएं' : 'Delete Subject'}
          >
            <Trash2 className="h-3.5 w-3.5 text-rose-400" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ──────────────────────────────────────────────────────────────────────────
          SINGLE UNIFIED HEADER TOOLBAR
          ────────────────────────────────────────────────────────────────────────── */}
      <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: Class Selector + View Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Class Selector Dropdown */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] px-2.5 py-1 rounded-[4px] border border-border/80">
            <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
              {isHindi ? 'कक्षा:' : 'Class:'}
            </span>
            <VFSelect
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(String(e.target.value))}
              options={CLASS_OPTIONS}
              className="w-48 bg-transparent border-0 h-7 text-xs font-bold focus:ring-0 p-0 text-foreground cursor-pointer"
            />
          </div>

          <div className="h-5 w-[1px] bg-border/80 hidden md:block" />

          {/* View Tab Switchers */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-[4px] border border-border/70">
            <button
              type="button"
              onClick={() => setActiveView('subjects')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeView === 'subjects'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              {isHindi ? 'विषय एवं पाठ्यक्रम' : 'Subjects & Syllabus'}
            </button>
            <button
              type="button"
              onClick={() => setActiveView('overview')}
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeView === 'overview'
                  ? 'bg-[#222222] text-foreground shadow-xs border border-border/60'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              {isHindi ? 'कक्षा विवरण' : 'Class Overview'}
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <VFButton
            size="sm"
            variant="outline"
            onClick={handleExport}
            className="h-8 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground rounded-[4px]"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            {isHindi ? 'एक्सपोर्ट' : 'Export'}
          </VFButton>
          <VFButton
            size="sm"
            onClick={handleOpenAddSubject}
            className="h-8 px-3 text-xs font-bold shadow-xs rounded-[4px]"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? '+ नया विषय जोड़ें' : '+ Add Subject'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          SUB-VIEW 1: SUBJECTS & CURRICULUM
          ────────────────────────────────────────────────────────────────────────── */}
      {activeView === 'subjects' && (
        <div className="flex-1 min-h-0 flex flex-col">
          <VFDataTable
            columns={subjectColumns}
            data={subjects}
            filterPlaceholder={
              isHindi
                ? 'विषय नाम, कोड या अध्यापक से खोजें...'
                : 'Search subjects by course code, title, or mentor...'
            }
          />
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          SUB-VIEW 2: CLASS OVERVIEW, SECTION-WISE PERIOD ALLOCATIONS & MILESTONES
          ────────────────────────────────────────────────────────────────────────── */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Sections in Selected Class & Section-Wise Subject Period Allocation */}
          <VFCard
            title={`${currentClassProfile.className} – ${isHindi ? 'अनुभाग व विषय पीरियड आवंटन' : 'Sections & Subject Period Allocation'}`}
            description={isHindi ? 'प्रत्येक अनुभाग के कक्षा अध्यापक व विषय-वार साप्ताहिक पीरियड आवंटन' : `${currentClassProfile.stage} · Section-wise class teachers and detailed period schedules`}
            className="bg-[#141414] border-border/80 md:col-span-2 rounded-[4px]"
            actions={
              <button
                type="button"
                onClick={handleOpenClassDetailsDrawer}
                className="px-2.5 py-1 rounded-[3px] bg-[#1c1c1c] hover:bg-[#262626] border border-border/80 text-xs font-bold text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{isHindi ? 'कक्षा विवरण बदलें' : 'Edit Class / Mentor'}</span>
              </button>
            }
          >
            <div className="space-y-4 pt-1">
              {currentClassProfile.sections.map((secName, idx) => {
                const totalWeeklyPeriods = subjects.reduce((sum, s) => sum + s.weeklyPeriods, 0);
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[4px] bg-[#181818] border border-border/80 space-y-3"
                  >
                    {/* Section Header (Duplicate Update Button Removed!) */}
                    <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-foreground text-sm tracking-wide">{secName}</span>
                        <VFBadge variant="outline" className="text-[10px] font-mono rounded-[3px]">
                          {currentClassProfile.room}
                        </VFBadge>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[3px] border border-emerald-500/25">
                          {Math.floor(currentClassProfile.totalStudents / currentClassProfile.sections.length)} / 40 {isHindi ? 'छात्र' : 'Students'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                        <span>{isHindi ? 'कक्षा अध्यापक:' : 'Class Teacher:'}</span>
                        <span className="text-foreground font-bold">{currentClassProfile.classMentor}</span>
                      </div>
                    </div>

                    {/* Section Subject Period Allocation Breakdown */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        <span>{isHindi ? 'साप्ताहिक विषय पीरियड आवंटन' : 'Subject Period Allocation'}</span>
                        <span className="font-mono text-foreground font-bold">
                          {totalWeeklyPeriods} {isHindi ? 'पीरियड्स / सप्ताह' : 'Total Periods/wk'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {subjects.map((sub) => {
                          const percentage = totalWeeklyPeriods > 0 ? Math.round((sub.weeklyPeriods / totalWeeklyPeriods) * 100) : 0;
                          return (
                            <div
                              key={sub.code}
                              className="p-2 rounded-[3px] bg-[#141414] border border-border/60 flex items-center justify-between gap-2 group hover:border-zinc-500 transition-colors"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-xs font-bold text-foreground truncate" title={sub.name}>
                                    {sub.name}
                                  </span>
                                  <span className="font-mono text-[11px] font-extrabold text-foreground shrink-0">
                                    {sub.weeklyPeriods} {isHindi ? 'प्र.' : 'p/w'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                                    <div
                                      className="h-full bg-zinc-400 dark:bg-zinc-500 rounded-full transition-all"
                                      style={{ width: `${Math.min(percentage * 3, 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                                    {percentage}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
                                  <span className="truncate">{sub.teacherInCharge}</span>
                                  <span className="font-mono text-[9px] text-muted-foreground/70 shrink-0">
                                    {sub.theoryMarks}Th/{sub.internalMarks}Int
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleOpenEditSubject(sub)}
                                className="p-1 rounded-[3px] bg-[#202020] hover:bg-[#2b2b2b] border border-border/60 text-muted-foreground hover:text-foreground opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                                title={isHindi ? 'पीरियड आवंटन संशोधित करें' : 'Edit Period Allocation'}
                              >
                                <Edit2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </VFCard>

          {/* Academic Calendar Milestones (Fully Interactive & Editable in Drawer) */}
          <VFCard
            title={isHindi ? 'शैक्षणिक मील के पत्थर' : 'Academic Milestones'}
            description={isHindi ? 'सत्र 2026-2027 मूल्यांकन एवं पाठ्यक्रम रोडमैप' : 'CBSE 2026–2027 examination milestones & progress roadmap'}
            className="bg-[#141414] border-border/80 rounded-[4px]"
            actions={
              <VFButton
                size="sm"
                onClick={handleOpenAddMilestone}
                className="h-7 px-2 text-xs font-bold rounded-[3px] shadow-xs"
                leftIcon={<Plus className="h-3 w-3" />}
              >
                {isHindi ? '+ नया मील का पत्थर' : '+ Add Milestone'}
              </VFButton>
            }
          >
            <div className="space-y-3 text-xs pt-1">
              {milestones.length === 0 ? (
                <div className="p-4 rounded-[4px] bg-[#1a1a1a] border border-border/60 text-center space-y-2">
                  <p className="text-muted-foreground">{isHindi ? 'कोई मील का पत्थर दर्ज नहीं है।' : 'No academic milestones configured.'}</p>
                  <VFButton size="sm" onClick={handleOpenAddMilestone} className="text-xs rounded-[3px]">
                    {isHindi ? 'प्रथम मील का पत्थर जोड़ें' : 'Create First Milestone'}
                  </VFButton>
                </div>
              ) : (
                milestones.map((ms) => (
                  <div
                    key={ms.id}
                    className="p-3 rounded-[4px] bg-[#1a1a1a] border border-border/70 space-y-2 relative group hover:border-zinc-500 transition-colors"
                  >
                    {/* Top Row: Title & Badges */}
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-foreground block text-xs leading-snug">
                          {ms.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {ms.term} · {ms.assessmentType}
                        </span>
                      </div>
                      <VFBadge
                        variant={
                          ms.status === 'In Progress'
                            ? 'success'
                            : ms.status === 'Completed'
                            ? 'default'
                            : 'outline'
                        }
                        className="text-[10px] font-bold shrink-0 rounded-[3px]"
                      >
                        {isHindi && ms.status === 'In Progress'
                          ? 'सक्रिय'
                          : isHindi && ms.status === 'Upcoming'
                          ? 'आगामी'
                          : isHindi && ms.status === 'Scheduled'
                          ? 'शेड्यूल्ड'
                          : isHindi && ms.status === 'Completed'
                          ? 'पूर्ण'
                          : ms.status}
                      </VFBadge>
                    </div>

                    {/* Dates Row */}
                    <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
                      <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span>{ms.startDate} – {ms.endDate}</span>
                    </div>

                    {/* Syllabus Target Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground font-medium">
                          {isHindi ? 'सिलेबस कवरेज लक्ष्य:' : 'Target Syllabus Coverage:'}
                        </span>
                        <span className="font-bold text-foreground font-mono">{ms.targetSyllabusCoverage}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-muted/60 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${ms.targetSyllabusCoverage}%` }}
                        />
                      </div>
                    </div>

                    {/* Notes if present */}
                    {ms.notes && (
                      <p className="text-[11px] text-muted-foreground/80 line-clamp-2 italic pt-0.5 border-t border-border/40">
                        {ms.notes}
                      </p>
                    )}

                    {/* Card Actions: Edit & Delete */}
                    <div className="flex justify-end gap-1.5 pt-1.5 border-t border-border/50">
                      <button
                        type="button"
                        onClick={() => handleOpenEditMilestone(ms)}
                        className="p-1 rounded-[3px] bg-[#222] hover:bg-[#2c2c2c] border border-border/60 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title={isHindi ? 'मील का पत्थर संपादित करें' : 'Edit Milestone'}
                      >
                        <Edit2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMilestone(ms.id, ms.title)}
                        className="p-1 rounded-[3px] bg-[#222] hover:bg-rose-950/50 border border-border/60 text-muted-foreground hover:text-rose-400 transition-colors cursor-pointer"
                        title={isHindi ? 'मील का पत्थर हटाएं' : 'Delete Milestone'}
                      >
                        <Trash2 className="h-3 w-3 text-rose-400" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </VFCard>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          DRAWER 1: SUBJECT MANAGEMENT (ADD / EDIT) - NO BOOK CATALOGING (BELONGS IN E-LIBRARY)
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDrawer
        isOpen={isSubjectDrawerOpen}
        onClose={() => setIsSubjectDrawerOpen(false)}
        title={
          editingSubject
            ? (isHindi ? `विषय संशोधित करें: ${editingSubject.name}` : `Update Subject: ${editingSubject.name}`)
            : (isHindi ? `${currentClassProfile.className} के लिए नया विषय जोड़ें` : `Add Subject to ${currentClassProfile.className}`)
        }
        description={
          isHindi
            ? 'पाठ्यक्रम, साप्ताहिक पीरियड आवंटन और अध्यापक विवरण निर्धारित करें (पुस्तकें ई-लाइब्रेरी में प्रबंधित हैं)।'
            : 'Configure course code, weekly period workload, and mentor assignment (prescribed books are managed in E-Library).'
        }
        className="max-w-xl bg-[#0d0d0d] border-l border-border/90"
        bodyClassName="p-5 space-y-4 text-xs no-scrollbar"
        headerActions={
          <button
            onClick={() => setIsSubjectDrawerOpen(false)}
            className="p-1.5 rounded-[4px] text-muted-foreground hover:text-foreground hover:bg-[#1f1f1f] transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="h-4 w-4" />
          </button>
        }
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs font-bold rounded-[4px]"
              onClick={() => setIsSubjectDrawerOpen(false)}
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              type="button"
              size="sm"
              className="h-8 px-4 text-xs font-bold rounded-[4px] shadow-xs"
              leftIcon={<Check className="h-3.5 w-3.5" />}
              onClick={handleSaveSubject}
            >
              {editingSubject ? (isHindi ? 'अपडेट सुरक्षित करें' : 'Save Changes') : (isHindi ? 'विषय जोड़ें' : 'Save Subject')}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleSaveSubject} className="space-y-3.5">
          {/* Section 1: Subject Identity & Workload */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? '1. विषय पहचान व कार्यभार' : '1. Subject Identity & Allocation'}
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'विषय का नाम *' : 'Subject Name *'}</label>
              <VFInput
                required
                placeholder="e.g. Mathematics Standard, Science, Computer Applications"
                value={subjectForm.name}
                onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                className="bg-[#181818] border-border h-9 text-xs rounded-[4px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'विषय कोड *' : 'Course / Subject Code *'}</label>
                <VFInput
                  required
                  placeholder={`SUB-${selectedClassId.replace('Class ', '')}-MTH`}
                  value={subjectForm.code}
                  onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'साप्ताहिक पीरियड्स *' : 'Weekly Periods Allocation *'}</label>
                <VFInput
                  type="number"
                  min="1"
                  max="12"
                  value={String(subjectForm.weeklyPeriods)}
                  onChange={(e) => setSubjectForm({ ...subjectForm, weeklyPeriods: Number(e.target.value) })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'पाठ्यक्रम श्रेणी' : 'Curriculum Tier'}</label>
                <VFSelect
                  value={subjectForm.type}
                  onChange={(e) => setSubjectForm({ ...subjectForm, type: e.target.value as any })}
                  options={[
                    { label: 'Core Compulsory', value: 'Core Compulsory' },
                    { label: 'Core Science', value: 'Core Science' },
                    { label: 'Language & Comms', value: 'Language & Comms' },
                    { label: 'Commerce Core', value: 'Commerce Core' },
                    { label: 'Skill & IT', value: 'Skill & IT' },
                    { label: 'Elective', value: 'Elective' },
                    { label: 'Humanities Core', value: 'Humanities Core' },
                  ]}
                  className="bg-[#181818] border-border h-9 text-xs rounded-[4px] w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'विषय अध्यापक / मेंटर' : 'Faculty In-Charge / Mentor'}</label>
                <VFInput
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={subjectForm.teacherInCharge}
                  onChange={(e) => setSubjectForm({ ...subjectForm, teacherInCharge: e.target.value })}
                  className="bg-[#181818] border-border h-9 text-xs rounded-[4px]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Grading Structure & Chapters */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? '2. अंक संरचना व अध्याय' : '2. Marks Weightage & Scope'}
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'थ्योरी अंक' : 'Theory Marks'}</label>
                <VFInput
                  type="number"
                  value={String(subjectForm.theoryMarks)}
                  onChange={(e) => setSubjectForm({ ...subjectForm, theoryMarks: Number(e.target.value) })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'इंटरनल अंक' : 'Internal Marks'}</label>
                <VFInput
                  type="number"
                  value={String(subjectForm.internalMarks)}
                  onChange={(e) => setSubjectForm({ ...subjectForm, internalMarks: Number(e.target.value) })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'अध्याय संख्या' : 'Chapters'}</label>
                <VFInput
                  type="number"
                  value={String(subjectForm.syllabusChapters)}
                  onChange={(e) => setSubjectForm({ ...subjectForm, syllabusChapters: Number(e.target.value) })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-[4px] bg-[#181818] border border-border/70 flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Book className="h-3.5 w-3.5 text-foreground/70" />
                {isHindi ? 'पाठ्यपुस्तक कैटलॉगिंग:' : 'Prescribed Textbooks:'}
              </span>
              <Link
                to="/elibrary"
                className="text-foreground hover:underline font-bold flex items-center gap-1 text-[11px]"
              >
                {isHindi ? 'ई-लाइब्रेरी में प्रबंधित करें ↗' : 'Manage in E-Library ↗'}
              </Link>
            </div>
          </div>
        </form>
      </VFDrawer>

      {/* ──────────────────────────────────────────────────────────────────────────
          DRAWER 2: CLASS DETAILS & MENTOR UPDATE
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDrawer
        isOpen={isClassDetailsDrawerOpen}
        onClose={() => setIsClassDetailsDrawerOpen(false)}
        title={isHindi ? `${currentClassProfile.className} – अध्यापक व कमरा अपडेट करें` : `Update Mentor & Details: ${currentClassProfile.className}`}
        description={isHindi ? 'कक्षा अध्यापक, निर्धारित कमरा और कुल क्षमता विवरण अद्यतन करें।' : 'Assign designated class mentor, room number, and capacity specifications.'}
        className="max-w-lg bg-[#0d0d0d] border-l border-border/90"
        bodyClassName="p-5 space-y-4 text-xs no-scrollbar"
        headerActions={
          <button
            onClick={() => setIsClassDetailsDrawerOpen(false)}
            className="p-1.5 rounded-[4px] text-muted-foreground hover:text-foreground hover:bg-[#1f1f1f] transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="h-4 w-4" />
          </button>
        }
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs font-bold rounded-[4px]"
              onClick={() => setIsClassDetailsDrawerOpen(false)}
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              type="button"
              size="sm"
              className="h-8 px-4 text-xs font-bold rounded-[4px] shadow-xs"
              leftIcon={<Check className="h-3.5 w-3.5" />}
              onClick={handleSaveClassDetails}
            >
              {isHindi ? 'विवरण सुरक्षित करें' : 'Save Class Details'}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleSaveClassDetails} className="space-y-3.5">
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? '1. नेतृत्व व कक्ष आवंटन' : '1. Mentor & Room Designation'}
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'कक्षा अध्यापक / मुख्य मेंटर *' : 'Class Mentor / Head Teacher *'}</label>
              <VFInput
                required
                placeholder="e.g. Dr. Rajesh Sharma"
                value={classDetailsForm.classMentor}
                onChange={(e) => setClassDetailsForm({ ...classDetailsForm, classMentor: e.target.value })}
                className="bg-[#181818] border-border h-9 text-xs rounded-[4px]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'निर्धारित कमरा / हॉल *' : 'Designated Room / Hall *'}</label>
              <VFInput
                required
                placeholder="e.g. Room 201"
                value={classDetailsForm.room}
                onChange={(e) => setClassDetailsForm({ ...classDetailsForm, room: e.target.value })}
                className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? '2. शैक्षणिक स्तर व क्षमता' : '2. Academic Stage & Capacity'}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'कुल नामांकित छात्र' : 'Total Enrolled'}</label>
                <VFInput
                  type="number"
                  value={String(classDetailsForm.totalStudents)}
                  onChange={(e) => setClassDetailsForm({ ...classDetailsForm, totalStudents: Number(e.target.value) })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'शैक्षणिक स्तर / बोर्ड' : 'Academic Stage'}</label>
                <VFInput
                  value={classDetailsForm.stage}
                  onChange={(e) => setClassDetailsForm({ ...classDetailsForm, stage: e.target.value })}
                  className="bg-[#181818] border-border h-9 text-xs rounded-[4px]"
                />
              </div>
            </div>
          </div>
        </form>
      </VFDrawer>

      {/* ──────────────────────────────────────────────────────────────────────────
          DRAWER 3: ACADEMIC MILESTONES (CREATE & EDIT IN DRAWER)
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDrawer
        isOpen={isMilestoneDrawerOpen}
        onClose={() => setIsMilestoneDrawerOpen(false)}
        title={
          editingMilestone
            ? (isHindi ? `मील का पत्थर संपादित करें: ${editingMilestone.title}` : `Edit Academic Milestone: ${editingMilestone.title}`)
            : (isHindi ? `नया शैक्षणिक मील का पत्थर जोड़ें` : `Create Academic Milestone`)
        }
        description={
          isHindi
            ? 'सत्र मूल्यांकन, लक्षित सिलेबस कवरेज व समय सीमा निर्धारित करें।'
            : 'Configure evaluation deadline, syllabus target progress %, and examination guidelines.'
        }
        className="max-w-xl bg-[#0d0d0d] border-l border-border/90"
        bodyClassName="p-5 space-y-4 text-xs no-scrollbar"
        headerActions={
          <button
            onClick={() => setIsMilestoneDrawerOpen(false)}
            className="p-1.5 rounded-[4px] text-muted-foreground hover:text-foreground hover:bg-[#1f1f1f] transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="h-4 w-4" />
          </button>
        }
        footerActions={
          <div className="flex items-center justify-end gap-2 w-full">
            <VFButton
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs font-bold rounded-[4px]"
              onClick={() => setIsMilestoneDrawerOpen(false)}
            >
              {t('action.cancel')}
            </VFButton>
            <VFButton
              type="button"
              size="sm"
              className="h-8 px-4 text-xs font-bold rounded-[4px] shadow-xs"
              leftIcon={<Check className="h-3.5 w-3.5" />}
              onClick={handleSaveMilestone}
            >
              {editingMilestone ? (isHindi ? 'परिवर्तन सुरक्षित करें' : 'Update Milestone') : (isHindi ? 'मील का पत्थर जोड़ें' : 'Save Milestone')}
            </VFButton>
          </div>
        }
      >
        <form onSubmit={handleSaveMilestone} className="space-y-3.5">
          {/* Card 1: Milestone Identity */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? '1. मील का पत्थर पहचान' : '1. Milestone Identity'}
            </h4>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'मील का पत्थर शीर्षक *' : 'Milestone Title *'}</label>
              <VFInput
                required
                placeholder="e.g. Term 1 Mid-Year Summative Evaluation, Pre-Board Model Exam"
                value={milestoneForm.title}
                onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                className="bg-[#181818] border-border h-9 text-xs rounded-[4px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'सत्र / चरण श्रेणी' : 'Applicable Term / Phase'}</label>
                <VFSelect
                  value={milestoneForm.term}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, term: String(e.target.value) })}
                  options={[
                    { label: 'Term 1 (Mid-Year)', value: 'Term 1' },
                    { label: 'Term 2 (Final)', value: 'Term 2' },
                    { label: 'Periodic Test 1', value: 'Periodic Test 1' },
                    { label: 'Periodic Test 2', value: 'Periodic Test 2' },
                    { label: 'Pre-Board Examination', value: 'Pre-Board' },
                    { label: 'Final CBSE Board', value: 'Final Board' },
                  ]}
                  className="bg-[#181818] border-border h-9 text-xs rounded-[4px] w-full"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'मूल्यांकन प्रारूप' : 'Assessment Classification'}</label>
                <VFSelect
                  value={milestoneForm.assessmentType}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, assessmentType: e.target.value as any })}
                  options={[
                    { label: 'Mid-Term Exam', value: 'Mid-Term Exam' },
                    { label: 'Periodic Test', value: 'Periodic Test' },
                    { label: 'Pre-Board Exam', value: 'Pre-Board Exam' },
                    { label: 'Final CBSE Board', value: 'Final CBSE Board' },
                    { label: 'Internal Assessment & Practical', value: 'Internal Assessment & Practical' },
                  ]}
                  className="bg-[#181818] border-border h-9 text-xs rounded-[4px] w-full"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Timeline & Coverage */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? '2. समय सीमा व कवरेज लक्ष्य' : '2. Timeline & Target Coverage'}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'आरंभ तिथि *' : 'Start Date *'}</label>
                <VFInput
                  type="date"
                  required
                  value={milestoneForm.startDate}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, startDate: e.target.value })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'समाप्ति तिथि *' : 'End Date *'}</label>
                <VFInput
                  type="date"
                  required
                  value={milestoneForm.endDate}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, endDate: e.target.value })}
                  className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'सिलेबस कवरेज लक्ष्य (%):' : 'Target Syllabus Coverage (%):'}</label>
                <div className="flex items-center gap-2">
                  <VFInput
                    type="number"
                    min="0"
                    max="100"
                    value={String(milestoneForm.targetSyllabusCoverage)}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, targetSyllabusCoverage: Number(e.target.value) })}
                    className="bg-[#181818] border-border font-mono h-9 text-xs rounded-[4px]"
                  />
                  <span className="font-mono font-bold text-xs text-foreground">%</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">{isHindi ? 'स्थिति' : 'Milestone Status'}</label>
                <VFSelect
                  value={milestoneForm.status}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, status: e.target.value as any })}
                  options={[
                    { label: 'Upcoming', value: 'Upcoming' },
                    { label: 'In Progress', value: 'In Progress' },
                    { label: 'Scheduled', value: 'Scheduled' },
                    { label: 'Completed', value: 'Completed' },
                  ]}
                  className="bg-[#181818] border-border h-9 text-xs rounded-[4px] w-full"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Scope Notes */}
          <div className="p-3.5 rounded-[4px] bg-[#141414] border border-border/80 space-y-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {isHindi ? '3. दिशानिर्देश व विवरण' : '3. Scope & Exam Guidelines'}
            </h4>
            <VFTextarea
              rows={3}
              placeholder="e.g. 50% prescribed syllabus coverage. Assessment scores will be registered on CBSE portal."
              value={milestoneForm.notes}
              onChange={(e) => setMilestoneForm({ ...milestoneForm, notes: e.target.value })}
              className="bg-[#181818] border-border text-xs rounded-[4px]"
            />
          </div>
        </form>
      </VFDrawer>
    </VFPageContainer>
  );
}
