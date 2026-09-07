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
  VFDialog,
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
  book: PrescribedBook; // Exactly ONE official prescribed book per subject
  status: 'Active' | 'Elective';
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

  // Add Subject Modal State
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newSubjectForm, setNewSubjectForm] = React.useState({
    code: '',
    name: '',
    type: 'Core Compulsory' as ClassSubject['type'],
    weeklyPeriods: 5,
    theoryMarks: 80,
    internalMarks: 20,
    teacherInCharge: 'Dr. Rajesh Sharma',
    bookTitle: '',
    bookPublisher: 'NCERT',
    bookType: 'Textbook' as PrescribedBook['type'],
  });

  // Current active class data fallback
  const currentClassProfile: ClassProfile = classesData[selectedClassId] || INITIAL_CLASSES['Class 10'];
  const subjects = currentClassProfile.subjects;

  // Flattened Books for the active class (Exactly 1 book per subject!)
  const allBooksInClass = React.useMemo(() => {
    return subjects.map((s) => ({
      book: s.book,
      subjectName: s.name,
      subjectCode: s.code,
    }));
  }, [subjects]);



  const handleExport = () => {
    addNotification({
      title: isHindi ? 'पाठ्यक्रम व पुस्तक सूची एक्सपोर्ट हुई' : 'Syllabus & Booklist Exported',
      description: isHindi
        ? `${currentClassProfile.className} की सभी पुस्तकें और पाठ्यक्रम सफलतापूर्वक एक्सपोर्ट किए गए।`
        : `Exported official curriculum & prescribed booklist for ${currentClassProfile.className}.`,
      type: 'success',
    });
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectForm.name.trim()) return;

    const defaultCode = newSubjectForm.code.trim() || `SUB-${selectedClassId.replace('Class ', '')}-${newSubjectForm.name.substring(0, 3).toUpperCase()}`;

    // Exactly 1 prescribed book for the new subject
    const newBook: PrescribedBook = {
      id: `BK-${Date.now()}`,
      title: newSubjectForm.bookTitle.trim() || `${newSubjectForm.name} – Textbook for ${currentClassProfile.className}`,
      publisher: newSubjectForm.bookPublisher || 'NCERT',
      type: 'Textbook',
      edition: '2026–27 Prescribed Edition',
      code: `CBSE-${defaultCode}`,
      isMandatory: true,
      digitalAccess: 'Available in Central Library & Digital Repository',
      chapters: ['Chapter 1: Foundational Concepts', 'Chapter 2: Core Theory & Applications', 'Chapter 3: Problem Solving & Exercises'],
    };

    const newSubjectRecord: ClassSubject = {
      code: defaultCode,
      name: newSubjectForm.name.trim(),
      type: newSubjectForm.type,
      weeklyPeriods: Number(newSubjectForm.weeklyPeriods) || 5,
      theoryMarks: Number(newSubjectForm.theoryMarks) || 80,
      internalMarks: Number(newSubjectForm.internalMarks) || 20,
      teacherInCharge: newSubjectForm.teacherInCharge || 'Dr. Rajesh Sharma',
      syllabusChapters: 10,
      status: 'Active',
      book: newBook,
    };

    setClassesData((prev) => ({
      ...prev,
      [selectedClassId]: {
        ...currentClassProfile,
        subjects: [...currentClassProfile.subjects, newSubjectRecord],
      },
    }));

    setIsAddModalOpen(false);
    setNewSubjectForm({
      code: '',
      name: '',
      type: 'Core Compulsory',
      weeklyPeriods: 5,
      theoryMarks: 80,
      internalMarks: 20,
      teacherInCharge: 'Dr. Rajesh Sharma',
      bookTitle: '',
      bookPublisher: 'NCERT',
      bookType: 'Textbook',
    });

    addNotification({
      title: isHindi ? 'विषय व पुस्तक जोड़ी गई' : 'Subject & Prescribed Book Added',
      description: `Course "${newSubjectRecord.name}" with official book assigned to ${currentClassProfile.className}.`,
      type: 'success',
    });
  };

  // Table Columns for Subjects View (1 book per subject cleanly presented)
  const subjectColumns = [
    {
      header: isHindi ? 'विषय कोड' : 'Subject Code',
      accessorKey: 'code',
      cell: (r: ClassSubject) => (
        <span className="font-mono font-bold text-foreground bg-muted/60 px-2.5 py-1 rounded border border-border text-xs">
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
            <Layers className="h-3 w-3 text-primary/80" />
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
          <Clock className="h-3.5 w-3.5 text-amber-400" />
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
          <div className="h-6 w-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-[10px] font-bold shrink-0">
            {r.teacherInCharge.replace('Dr. ', '').replace('Mrs. ', '').replace('Mr. ', '').replace('Ms. ', '').substring(0, 2)}
          </div>
          <span className="text-foreground text-xs font-semibold">{r.teacherInCharge}</span>
        </div>
      ),
    },
    {
      header: isHindi ? 'निर्धारित पुस्तक (ई-लाइब्रेरी)' : 'Prescribed Book (E-Library)',
      accessorKey: 'book',
      cell: (r: ClassSubject) => (
        <Link
          to="/elibrary"
          title={`${r.book.title} – ${isHindi ? 'ई-लाइब्रेरी में देखें' : 'Open in E-Library'}`}
          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] bg-[#181818] hover:bg-[#222222] border border-border/70 hover:border-teal-500/60 text-xs font-semibold text-foreground transition-all cursor-pointer group max-w-sm text-left shadow-2xs"
        >
          <Book className="h-3.5 w-3.5 text-teal-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="truncate max-w-[200px]">{r.book.title}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-400 border border-teal-500/30 font-bold shrink-0">
            {isHindi ? 'ई-लाइब्रेरी ↗' : 'E-Library ↗'}
          </span>
        </Link>
      ),
    },
    {
      header: t('col.status'),
      accessorKey: 'status',
      cell: (r: ClassSubject) => (
        <VFBadge variant={r.status === 'Active' ? 'success' : 'outline'} className="text-[10px]">
          {isHindi && r.status === 'Active' ? 'सक्रिय' : r.status}
        </VFBadge>
      ),
    },
  ];

  return (
    <VFPageContainer className="h-full min-h-0 flex-1 flex flex-col space-y-3">
      {/* ──────────────────────────────────────────────────────────────────────────
          SINGLE UNIFIED HEADER TOOLBAR
          (Eliminates stacked dual-headers, removes redundant session tag & departments)
          ────────────────────────────────────────────────────────────────────────── */}
      <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0 shadow-xs">
        {/* Left: Class Selector + View Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">

          {/* Class Selector Dropdown */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] px-2.5 py-1 rounded-[4px] border border-border/80">
            <GraduationCap className="h-4 w-4 text-primary shrink-0" />
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
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 ${
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
              className={`px-3 py-1 text-xs font-bold rounded-[3px] transition-colors flex items-center gap-1.5 ${
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
            className="h-8 px-3 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222222] border-border text-foreground"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            {isHindi ? 'एक्सपोर्ट' : 'Export'}
          </VFButton>
          <VFButton
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="h-8 px-3 text-xs font-bold shadow-xs"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            {isHindi ? '+ विषय / पुस्तक जोड़ें' : '+ Add Subject / Book'}
          </VFButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          SUB-VIEW 1: SUBJECTS & CURRICULUM
          ────────────────────────────────────────────────────────────────────────── */}
      {activeView === 'subjects' && (
        <div className="flex-1 min-h-0 flex flex-col space-y-3">
          {/* Class Summary Banner */}
          <div className="px-3.5 py-2.5 rounded-[4px] bg-[#141414] border border-border/80 flex flex-wrap items-center justify-between gap-3 shrink-0 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-foreground text-sm">
                {isHindi ? currentClassProfile.hindiClassName : currentClassProfile.className}
              </span>
              <span className="text-muted-foreground font-semibold">·</span>
              <span className="text-muted-foreground font-medium">
                {currentClassProfile.stage}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">{isHindi ? 'कक्षा अध्यापक:' : 'Mentor:'}</span>
                <span className="text-foreground font-bold">{currentClassProfile.classMentor}</span>
              </div>
              <div className="h-3.5 w-[1px] bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">{isHindi ? 'कमरा:' : 'Room:'}</span>
                <span className="text-foreground font-bold font-mono">{currentClassProfile.room}</span>
              </div>
              <div className="h-3.5 w-[1px] bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">{isHindi ? 'कुल विषय:' : 'Subjects:'}</span>
                <span className="text-primary font-bold">{subjects.length}</span>
              </div>
              <div className="h-3.5 w-[1px] bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">{isHindi ? 'निर्धारित पुस्तकें (1/विषय):' : 'Prescribed Books (1/Sub):'}</span>
                <span className="text-amber-400 font-bold">{allBooksInClass.length}</span>
              </div>
            </div>
          </div>

          <VFDataTable
            columns={subjectColumns}
            data={subjects}
            filterPlaceholder={
              isHindi
                ? 'विषय नाम, कोड या पुस्तक से खोजें...'
                : 'Search subjects by course code, title, or prescribed book...'
            }
          />
        </div>
      )}



      {/* ──────────────────────────────────────────────────────────────────────────
          SUB-VIEW 3: CLASS OVERVIEW & SECTIONS
          ────────────────────────────────────────────────────────────────────────── */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Active Sections in Selected Class */}
          <VFCard
            title={`${currentClassProfile.className} – ${isHindi ? 'अनुभाग व कक्षा अध्यापक' : 'Sections & Mentors'}`}
            description={currentClassProfile.stage}
            className="bg-[#141414] border-border/80 md:col-span-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {currentClassProfile.sections.map((secName, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#1a1a1a] border border-border/70 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-foreground text-sm">{secName}</span>
                    <VFBadge variant="outline" className="text-[10px] font-mono">
                      {currentClassProfile.room}
                    </VFBadge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{isHindi ? 'कक्षा अध्यापक:' : 'Class Teacher:'}</span>
                      <span className="font-bold text-foreground">{currentClassProfile.classMentor}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{isHindi ? 'नामांकित छात्र:' : 'Enrolled Students:'}</span>
                      <span className="font-black text-emerald-400">
                        {Math.floor(currentClassProfile.totalStudents / currentClassProfile.sections.length)} / 40
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>{isHindi ? 'साप्ताहिक पीरियड्स:' : 'Weekly Load:'}</span>
                      <span className="font-bold text-primary">30 {isHindi ? 'पीरियड्स' : 'Periods'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Academic Distribution */}
            <div className="mt-4 pt-3 border-t border-border/60">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">
                {isHindi ? 'साप्ताहिक पीरियड आवंटन' : 'Subject Period Allocation'}
              </h4>
              <div className="space-y-2">
                {subjects.map((sub) => (
                  <div key={sub.code} className="flex items-center justify-between text-xs">
                    <span className="text-foreground font-semibold truncate max-w-[240px]">{sub.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(sub.weeklyPeriods / 6) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono text-muted-foreground font-bold w-12 text-right">
                        {sub.weeklyPeriods} {isHindi ? 'प्र.' : 'p/w'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </VFCard>

          {/* Academic Calendar Milestones for this Class */}
          <VFCard
            title={isHindi ? 'शैक्षणिक मील के पत्थर' : 'Academic Milestones'}
            description={isHindi ? 'सीबीएसई सत्र 2026-2027 की प्रमुख तिथियां' : 'Key dates & assessments for 2026–2027'}
            className="bg-[#141414] border-border/80"
          >
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-border/60 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">{isHindi ? 'सत्र 1 (अर्धवार्षिक)' : 'Term 1 (Mid-Year)'}</span>
                  <VFBadge variant="success" className="text-[10px]">{isHindi ? 'सक्रिय' : 'Active'}</VFBadge>
                </div>
                <p className="text-muted-foreground font-mono">Apr 01, 2026 – Sep 30, 2026</p>
                <p className="text-[11px] text-primary">{isHindi ? 'सिलेबस कवरेज: 50%' : '50% Prescribed Syllabus Coverage'}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-border/60 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">{isHindi ? 'प्री-बोर्ड / आवधिक परीक्षा' : 'Pre-Board Examinations'}</span>
                  <VFBadge variant="outline" className="text-[10px]">{isHindi ? 'आगामी' : 'Upcoming'}</VFBadge>
                </div>
                <p className="text-muted-foreground font-mono">Dec 01, 2026 – Dec 18, 2026</p>
                <p className="text-[11px] text-muted-foreground">{isHindi ? '100% संपूर्ण पुस्तक पाठ्यक्रम' : 'Full Prescribed Book Roster'}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#1a1a1a] border border-border/60 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">{isHindi ? 'वार्षिक / बोर्ड परीक्षा' : 'Annual Final Board Exams'}</span>
                  <VFBadge variant="outline" className="text-[10px]">{isHindi ? 'शेड्यूल्ड' : 'Scheduled'}</VFBadge>
                </div>
                <p className="text-muted-foreground font-mono">Feb 15, 2027 – Mar 28, 2027</p>
                <p className="text-[11px] text-emerald-400">{isHindi ? 'अंतिम मूल्यांकन' : 'Final CBSE Accreditation'}</p>
              </div>
            </div>
          </VFCard>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          MODAL 1: ADD SUBJECT & PRESCRIBED BOOK (1 Book)
          ────────────────────────────────────────────────────────────────────────── */}
      <VFDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={isHindi ? `${currentClassProfile.className} के लिए विषय व पुस्तक जोड़ें` : `Add Subject & Prescribed Book to ${currentClassProfile.className}`}
        description={isHindi ? 'कक्षा के लिए नया विषय, साप्ताहिक पीरियड्स और पढ़ने हेतु पुस्तक (1 पुस्तक) पंजीकृत करें।' : 'Register a curriculum subject, period workload, and exactly one primary prescribed textbook for this class.'}
      >
        <form onSubmit={handleAddSubject} className="space-y-3.5 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'विषय कोड' : 'Subject Code'}</label>
              <VFInput
                placeholder={`e.g. SUB-${selectedClassId.replace('Class ', '')}-SCI`}
                value={newSubjectForm.code}
                onChange={(e) => setNewSubjectForm({ ...newSubjectForm, code: e.target.value })}
                className="bg-[#1a1a1a] border-border font-mono h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'साप्ताहिक पीरियड्स' : 'Weekly Periods'}</label>
              <VFInput
                type="number"
                value={String(newSubjectForm.weeklyPeriods)}
                onChange={(e) => setNewSubjectForm({ ...newSubjectForm, weeklyPeriods: Number(e.target.value) })}
                className="bg-[#1a1a1a] border-border font-mono h-8 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">{isHindi ? 'विषय का नाम' : 'Subject Name'}</label>
            <VFInput
              required
              placeholder="e.g. Artificial Intelligence & Robotics"
              value={newSubjectForm.name}
              onChange={(e) => setNewSubjectForm({ ...newSubjectForm, name: e.target.value })}
              className="bg-[#1a1a1a] border-border h-8 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'पाठ्यक्रम श्रेणी' : 'Curriculum Tier'}</label>
              <VFSelect
                value={newSubjectForm.type}
                onChange={(e) => setNewSubjectForm({ ...newSubjectForm, type: e.target.value as any })}
                options={[
                  { label: 'Core Compulsory', value: 'Core Compulsory' },
                  { label: 'Core Science', value: 'Core Science' },
                  { label: 'Language & Comms', value: 'Language & Comms' },
                  { label: 'Commerce Core', value: 'Commerce Core' },
                  { label: 'Skill & IT', value: 'Skill & IT' },
                  { label: 'Elective', value: 'Elective' },
                ]}
                className="bg-[#1a1a1a] border-border h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">{isHindi ? 'विषय अध्यापक' : 'Faculty Mentor'}</label>
              <VFInput
                value={newSubjectForm.teacherInCharge}
                onChange={(e) => setNewSubjectForm({ ...newSubjectForm, teacherInCharge: e.target.value })}
                className="bg-[#1a1a1a] border-border h-8 text-xs"
              />
            </div>
          </div>

          <div className="p-3 rounded-[4px] bg-[#141414] border border-border/80 space-y-2.5">
            <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Book className="h-3.5 w-3.5" />
              {isHindi ? 'पठन हेतु निर्धारित पुस्तक (1 Book Only)' : 'Prescribed Reading Book (1 Book Only)'}
            </p>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">{isHindi ? 'पुस्तक का नाम' : 'Book Title'}</label>
              <VFInput
                placeholder="e.g. AI Foundations & Machine Learning Handbook"
                value={newSubjectForm.bookTitle}
                onChange={(e) => setNewSubjectForm({ ...newSubjectForm, bookTitle: e.target.value })}
                className="bg-[#1a1a1a] border-border h-8 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">{isHindi ? 'प्रकाशक' : 'Publisher'}</label>
                <VFSelect
                  value={newSubjectForm.bookPublisher}
                  onChange={(e) => setNewSubjectForm({ ...newSubjectForm, bookPublisher: String(e.target.value) })}
                  options={[
                    { label: 'NCERT', value: 'NCERT' },
                    { label: 'CBSE Publications', value: 'CBSE Publications' },
                    { label: 'Oxford University Press', value: 'Oxford University Press' },
                    { label: 'Cambridge University Press', value: 'Cambridge' },
                    { label: 'Dhanpat Rai & Co.', value: 'Dhanpat Rai & Co.' },
                    { label: 'Sultan Chand & Sons', value: 'Sultan Chand & Sons' },
                    { label: 'Orange Education', value: 'Orange Education' },
                  ]}
                  className="bg-[#1a1a1a] border-border h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">{isHindi ? 'पुस्तक का प्रकार' : 'Book Category'}</label>
                <VFInput
                  readOnly
                  value="Prescribed Textbook (1 Book)"
                  className="bg-[#141414] border-border text-muted-foreground h-8 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/50">
            <VFButton type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              {t('action.cancel')}
            </VFButton>
            <VFButton type="submit" size="sm" leftIcon={<Check className="h-4 w-4" />}>
              {isHindi ? 'सुरक्षित करें' : 'Save Subject'}
            </VFButton>
          </div>
        </form>
      </VFDialog>


    </VFPageContainer>
  );
}
