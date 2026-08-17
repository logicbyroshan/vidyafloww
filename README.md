<p align="center">
  <img src="./Vidy%20Max%20Banner.png" alt="VidyaMaxx School Management Banner" width="100%" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);" />
</p>

<div align="center">

# VidyaMaxx — Enterprise School Management Platform

**A unified, multi-tenant digital ecosystem engineered for modern K-12 schools, colleges, and educational networks.**

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript 5.6](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Python 3.13](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)](https://python.org)
[![Django 5.x](https://img.shields.io/badge/Django-5.x-092E20?logo=django&logoColor=white)](https://djangoproject.com)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.x-FF4154?logo=reacttable&logoColor=white)](https://tanstack.com/router)

</div>

---

## 📖 About VidyaMaxx

**VidyaMaxx** is an institutional-grade, full-stack educational ERP and student lifecycle management platform. Designed from the ground up to replace fragmented legacy spreadsheets and disparate third-party tools, VidyaMaxx brings every stakeholder — administrators, principals, teachers, students, and parents — into a single, cohesive, and blisteringly fast digital workspace.

Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Django REST Framework**, the platform offers 100% type-safe micro-frontends, lightning-fast client-side routing with **TanStack Router**, custom Radix UI design systems, and responsive layouts tailored for desktop, tablet, and mobile.

---

## 🌟 Core Feature Highlights

### 1. 🎯 Admissions & Candidate Evaluation Pipeline
Manage candidate admissions with zero paperwork. Track candidate applications from initial enquiry to final enrollment fee receipt.
- **Stage-by-Stage Lead Pipeline**: Visual Kanban board tracking enquiries, applications, document verification, interview rounds, and enrollment.
- **OCR Document Verification**: Split-screen document inspection engine comparing uploaded birth certificates, marksheet scans, and Aadhaar identity proofs.
- **Candidate Merit Scoring**: Customizable evaluation models calculating candidate academic merit indexes for instant, objective admissions decisions.
- **One-Click Enrollment**: Seamlessly promote approved applicants directly into active student rosters and generate digital offer letters.

### 2. 👥 Complete Student 360° & Lifecycle Master
A single source of truth for every student record throughout their institutional tenure.
- **Comprehensive Profile**: Academic history, section allocation, guardian linkages, emergency medical notes, and fee status.
- **Identity & Records**: Digital student ID card generation, Aadhaar deduplication engine, and transfer certificate (TC) tracking.
- **Dynamic Class & Section Allocations**: Streamlined batch promotions, section reassignments, roll-number generators, and student status management.

### 3. 🗓️ Timetable Scheduling & Substitution Matrix
Eliminate scheduling conflicts and automate staff proxy management across all classrooms.
- **Conflict-Free Master Timetable**: Comprehensive grid matrix balancing class schedules, teacher workloads, and laboratory allocations.
- **Automated Proxy & Substitution**: Instantly detect teacher absences and auto-match qualified free teachers for cover periods with one click.
- **Teacher Workload Optimization**: Real-time load meters monitoring weekly period caps, consecutive period rules, and teacher break distributions.

### 4. 📚 Teaching, Curriculum Pacing & Digital Learning Studio
Empower faculty with modern classroom tools and structured pedagogical frameworks.
- **Structured 45-Min Lesson Plan Generator**: Input chapter topics to generate standardized CBSE learning objectives, period timelines, and homework tasks.
- **Syllabus Progress Tracking**: Monitor department-level curriculum completion percentages against annual term targets.
- **Homework & Assignment Lifecycle**: Create worksheets, track submissions, evaluate assignments with rubrics, and deliver digital teacher feedback.
- **Virtual LMS Classrooms**: Live WebRTC online lecture studio with screen sharing, digital whiteboard, and lecture replay archives.

---

## 📸 Screenshots & Application Gallery

> *Drop your application screenshots into the `screenshots/` directory or replace the placeholders below.*

| 🖥️ Executive Dashboard & Institutional Radar | 📋 Admissions CRM & Kanban Queue |
| :---: | :---: |
| [![Dashboard Overview](https://placehold.co/600x380/18181b/f97316?text=Dashboard+%26+Principal+Radar)](./screenshots/dashboard.png) <br /> *Real-time institutional KPI telemetry, attendance summaries & academic radar* | [![Admissions Pipeline](https://placehold.co/600x380/18181b/f97316?text=Admissions+Kanban+%26+Verification)](./screenshots/admissions.png) <br /> *Visual admissions stages, merit ranking & split-screen OCR verification* |
| **🗓️ Timetable & Auto-Substitution Matrix** | **📖 Lesson Planning & Teaching Workspace** |
| [![Timetable Matrix](https://placehold.co/600x380/18181b/f97316?text=Timetable+Matrix+%26+Substitution)](./screenshots/timetable.png) <br /> *Master class period grid, workload balancer & proxy allocation* | [![Teaching Workspace](https://placehold.co/600x380/18181b/f97316?text=Teaching+Studio+%26+Lesson+Planner)](./screenshots/learning.png) <br /> *Curriculum progression, 45-minute lesson plans & digital logs* |
| **🎓 Student 360° Directory** | **⚙️ School Settings & System Administration** |
| [![Student 360](https://placehold.co/600x380/18181b/f97316?text=Student+360+Profile+%26+Directory)](./screenshots/students.png) <br /> *Student profiles, guardian contacts, document vault & academic history* | [![School Settings](https://placehold.co/600x380/18181b/f97316?text=Multi-Campus+Settings+%26+Statutory+Registers)](./screenshots/settings.png) <br /> *Multi-campus setup, statutory compliance registers & numbering sequences* |

---

## 🏛️ Active Application Modules

VidyaMaxx is organized into clean, isolated modules mapped to distinct, type-safe routes:

| # | Module | Route | Key Capabilities |
|:---:|---|---|---|
| **01** | **Dashboard** | `/` | Executive KPIs, Principal Radar, Teacher Portal, Student View, Academic Quality |
| **02** | **Admissions** | `/admissions` | CRM leads, applications, OCR verification, interviews, merit evaluation, enrollment |
| **03** | **Students** | `/students` | Student 360° profiles, guardians, section mapping, bulk import, deduplication |
| **04** | **Academics** | `/academics` | Academic session master, grade structures, subject allocation, curriculum pacing |
| **05** | **Timetable** | `/timetable` | Period matrix, teacher schedules, room allocation, automated substitutions |
| **06** | **Attendance** | `/attendance` | Biometric/RFID integration, daily roll call, late records, absentee alerts |
| **07** | **Teaching** | `/learning` | 45-min lesson plans, teaching plans, chapter topics, lesson notes, teaching diary |
| **08** | **Homework** | `/homework` | Assignment distribution, worksheet attachments, student submissions, evaluation |
| **09** | **Examinations** | `/examinations` | Exam schedules, paper setup, marks entry, grades, automated report card generation |
| **10** | **Learning Resources** | `/resources` | Digital study notes, PDF vaults, video lessons, external educational links |
| **11** | **Online Classes** | `/lms` | Live video classes, meeting schedules, screen sharing, lecture recording archives |
| **12** | **Parent/Student Portal** | `/portal` | Dedicated student portal for timetables, attendance stats, and academic notices |
| **13** | **Settings & Admin** | `/settings` | Multi-campus config, academic calendars, branding, statutory registers & policies |

---

## 🛠️ Technology Stack & Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            VidyaMaxx Monorepo                               │
└─────────────────────────────────────────────────────────────────────────────┘
          │                                                  │
          ▼                                                  ▼
┌───────────────────┐                              ┌───────────────────┐
│     apps/web      │                              │   apps/backend    │
│  React 19 + Vite  │                              │    Django 5 REST  │
│  TanStack Router  │                              │ PostgreSQL 16 DB  │
│  Tailwind CSS 3.4 │                              │   Redis + Celery  │
└───────────────────┘                              └───────────────────┘
          │                                                  │
          ▼                                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                packages/                                    │
│   ├── @vidyamaxx/ui          (Shared Design System, Cards, Badges, Tabs)   │
│   ├── @vidyamaxx/constants   (Route Registry, Navigation, System Enums)    │
│   ├── @vidyamaxx/types       (TypeScript Global Data Interfaces)           │
│   ├── @vidyamaxx/api         (Typed API Clients & HTTP Services)           │
│   └── @vidyamaxx/themes      (Color Themes, Tokens & Glassmorphism)        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or `v22.x` ([nodejs.org](https://nodejs.org/))
- **pnpm**: `v9.x` (`npm install -g pnpm`)
- **Python**: `3.13+` ([python.org](https://www.python.org/))
- **Poetry**: ([python-poetry.org](https://python-poetry.org/))

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/logicbyroshan/vidyamaxx-school-management.git
cd vidyamaxx-school-management
```

---

### Step 2: Install Frontend Dependencies

```bash
pnpm install
```

---

### Step 3: Run the Development Servers

#### 💻 Start the Web Application (Frontend)
```bash
pnpm --filter=@vidyamaxx/web dev
```
> The frontend application will spin up at **`http://localhost:3000`** with Hot Module Replacement (HMR).

#### 🐍 Start the API Server (Backend)
```bash
# In a separate terminal tab:
cd apps/backend
poetry install
poetry run python manage.py migrate
poetry run python manage.py runserver 8000
```
> The Django REST API will be accessible at **`http://localhost:8000/api/v1/`**.

---

### Step 4: Build for Production

To test the production build and verify type correctness across all packages:

```bash
# Type check the entire monorepo
pnpm --filter=@vidyamaxx/web type-check

# Compile Vite production bundle
pnpm --filter=@vidyamaxx/web build
```

---

## 📁 Monorepo Folder Structure

```text
vidyamaxx/
├── apps/
│   ├── backend/               # Django 5 REST API microservice
│   └── web/                   # React 19 + TanStack Router Web ERP
│       ├── src/
│       │   ├── components/    # Reusable web components & drawers
│       │   ├── layouts/       # AppShell, Sidebar, Header, CommandPalette
│       │   ├── routes/        # TanStack Router file-based route definitions
│       │   ├── stores/        # Zustand global state stores
│       │   └── index.css      # Tailwind design tokens & dark theme
├── packages/
│   ├── ui/                    # @vidyamaxx/ui enterprise UI primitives
│   ├── constants/             # @vidyamaxx/constants navigation & metadata
│   ├── types/                 # @vidyamaxx/types TypeScript schemas
│   ├── api/                   # @vidyamaxx/api HTTP client
│   └── themes/                # @vidyamaxx/themes styling tokens
├── screenshots/               # Application UI screenshots & preview assets
├── Vidy Max Banner.png        # Official brand hero banner
└── README.md                  # Project documentation
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Proprietary Software. All rights reserved &copy; 2026 **VidyaMaxx Team**.
