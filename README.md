# VidyaMaxx - AI First School Management System

<div align="center">

**Enterprise School Management & SaaS Microservices Platform**

*Unifying every aspect of educational institution management into one cohesive digital ecosystem*

[![CI](https://github.com/logicbyroshan/vidyamaxx-school-management/actions/workflows/ci.yml/badge.svg)](https://github.com/logicbyroshan/vidyamaxx-school-management/actions/workflows/ci.yml)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)](https://python.org)
[![Django](https://img.shields.io/badge/Django-5.x-green?logo=django)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://typescriptlang.org)

</div>

---

## 🎯 Project Overview

VidyaMaxx is a production-grade, multi-tenant **school management platform** built for educational institutions of all sizes. It consolidates admissions, academics, attendance, examinations, finance, HR, LMS, communication, security, system administration, and AI-powered insights into a single platform accessible via web, mobile, and desktop.

### Vision

> *"Empower every school to operate with the efficiency of a world-class institution."*

VidyaMaxx eliminates fragmented, paper-based, and siloed workflows — replacing them with a unified, intelligent, and beautifully designed ERP platform.

---

## 🏛️ 33 Complete Core Modules Architecture

VidyaMaxx includes 33 fully-implemented core ERP sub-systems, each with dedicated sub-modules and 100% unique route URL isolation:

| # | Module ID | Dedicated Route URL | Core Functional Highlights |
|---|-----------|---------------------|----------------------------|
| 1 | **Dashboard** | `/` | Central Institutional Intelligence, Live Telematics & Quick Actions |
| 2 | **Admissions** | `/admissions` | CRM Pipeline, AI Document OCR & Merit Evaluation |
| 3 | **Students** | `/students` | Student 360°, Health Records, Discipline Logs & Lifecycle |
| 4 | **Academics** | `/academics` | Class & Section Structures, Subjects, Syllabus & Timetables |
| 5 | **Timetable** | `/timetable` | Constraint-Based Scheduling, Teacher Workload & Substitutions |
| 6 | **Attendance** | `/attendance` | Biometric RFID/Face Sync, Roll Call & AI Absenteeism Engine |
| 7 | **Teaching** | `/learning` | Lesson Plans, Curriculum Pacing & Teacher Planner |
| 8 | **Homework & Assignments** | `/homework` | Assignment Lifecycle, Submissions, Review & Marking |
| 9 | **Examinations** | `/examinations` | Question Banks, Hall Tickets, CBSE Marks Entry & Report Cards |
| 10 | **Learning Resources** | `/resources` | Study Notes, NCERT E-books, PhET Labs & External Links |
| 11 | **Online Classes** | `/lms` | Live WebRTC Video Rooms, Virtual Schedules & Cloud Recordings |
| 12 | **Fees & Finance** | `/fees` | Fee Structures, Counter Collections, Receipts & Defaulters |
| 13 | **Documents & Certificates** | `/documents` | Student Vault, Bonafide/TC Generation & PKI Signatures |
| 14 | **Library** | `/library` | ISBN Cataloging, Barcode Circulation & E-books |
| 15 | **Transport** | `/transport` | GPS Live Bus Telematics, Fuel Logs & Route Management |
| 16 | **Hostel** | `/hostel` | Dorm Matrix, Bed Allocation, Outpass QR & Mess Management |
| 17 | **Inventory** | `/inventory` | Master Catalog, Stock In/Out, Vendor Purchase Orders & SKUs |
| 18 | **Assets & Maintenance** | `/administration` | Fixed Assets Register, Maintenance Work Orders & AMC Contracts |
| 19 | **Staff & HR** | `/hr` | Employee Profiles, Staff Types, Payroll Processing & Payslips |
| 20 | **Student Health** | `/health` | Medical Records, Checkup Camps, Allergies & Infirmary Logs |
| 21 | **Counselling & Support** | `/welfare` | Welfare Cases, Counselling Sessions & Confidential Notes |
| 22 | **Communication** | `/communication` | Omnichannel DLT SMS, WhatsApp Business API & Push Alerts |
| 23 | **Events & Calendar** | `/events` | Master School Calendar, PTM Booking & Function Schedules |
| 24 | **Student Activities** | `/activities` | Extracurricular Clubs, Sports Academies & House Leaderboards |
| 25 | **Surveys & Forms** | `/forms` | Form Builder Studio, Parent/Staff Surveys & Consent Slips |
| 26 | **Complaints & Grievances** | `/grievances` | Complaint Inbox, SLA Escalation Matrix & Resolution Closure |
| 27 | **Front Office** | `/front-office` | Visitor Gate Passes, Phone Call Logs & Enquiry CRM |
| 28 | **Reports & Analytics** | `/reports` | Cross-Module Operational Reports, Report Builder & Data Explorer |
| 29 | **School Administration** | `/system` | Multi-Campus Settings, Academic Sessions & School Branding |
| 30 | **Compliance & Records** | `/compliance` | Indian Board Compliance (CBSE/ICSE) & Mandatory Statutory Registers |
| 31 | **Security & Audit** | `/security` | Cryptographic SHA-256 Audit Logs, Device Sessions & Threat Alerts |
| 32 | **AI Executive** | `/ai` | Global VidyaMaxx AI Assistant & Natural Language Insights |
| 33 | **Settings** | `/settings` | System Preferences, Localization & Global Controls |

---

## 🏗️ Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Python | 3.13 | Primary language |
| Django | 5.x | Web framework |
| Django REST Framework | 3.15 | API framework |
| PostgreSQL | 16 | Primary database |
| Redis | 7 | Cache & message broker |
| Celery | 5.x | Async task queue |
| Django Channels | 4.x | WebSocket / real-time |

### Web App
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | Core UI framework |
| Vite | 5.4 | Lightning fast build tool |
| TypeScript | 5.6 | Strict type safety |
| Tailwind CSS | 3.4 | Utility-first CSS styling |
| `@vidyamaxx/ui` | Workspace | Custom enterprise CVA component system |
| Radix UI | Latest | Accessible UI primitives (`dialog`, `select`, `tabs`, `popover`, `tooltip`) |
| Framer Motion | 13.x | Fluid scale-in modal & drawer animations |
| TanStack Table | 9.x | High-performance enterprise data grid |
| Recharts | 3.x | Custom dark theme BI data visualizations |
| Lenis | 1.1 | Physics-based smooth scrolling |
| Sonner | 2.x | Real-time store-synced toast notifications |
| TanStack Router | 1.x | Type-safe client routing |
| TanStack Query | 5.x | Server state management & caching |
| Zustand | 5.x | Global client state |
| Zod | 3.x | Schema validation |

---

## 📁 Repository Layout

```text
vidyamaxx/
├── apps/
│   ├── backend/          Django + DRF API server
│   ├── web/              React 19 web application (24 core modules)
│   ├── mobile/           React Native + Expo app
│   └── desktop/          Electron desktop app
├── packages/
│   ├── api/              Typed HTTP client
│   ├── ui/               Shared UI components & charts
│   ├── types/            TypeScript type definitions
│   ├── validation/       Shared Zod schemas
│   ├── constants/        Routes, roles, module registry
│   ├── hooks/            Shared React hooks
│   ├── utils/            Utility functions
│   ├── config/           App configuration
│   ├── themes/           Design tokens
│   ├── icons/            Custom icons
│   └── assets/           Shared assets
├── docs/                 13 documentation files
├── scripts/              Build & utility scripts
├── docker/               Dockerfiles + Compose
└── .github/              CI/CD workflows
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.13+
- **Node.js** 20+
- **pnpm** 9+ — `npm install -g pnpm`
- **Poetry** — `pip install poetry`
- **Docker Desktop** (for PostgreSQL + Redis)

### 1. Install & Build Monorepo

```bash
git clone https://github.com/logicbyroshan/vidyamaxx-school-management.git
cd vidyamaxx-school-management

# Install all JavaScript/TypeScript dependencies
pnpm install

# Run type check across all 14 monorepo packages
pnpm type-check
```

### 2. Start Web Dev Server

```bash
pnpm --filter=@vidyamaxx/web dev
```

Web app available at: **http://localhost:3000**

---

## 🗺️ Roadmap & Completion Status

| Phase | Status | Focus |
|-------|--------|-------|
| 1 — Foundation | ✅ Complete | Monorepo scaffold, configs, docs |
| 2 — Auth & Multi-tenancy | ✅ Complete | Multi-tenant SaaS, roles, sessions |
| 3 — Students & Academics | ✅ Complete | Student 360, classes, timetable |
| 4 — Examinations | ✅ Complete | Exams, grades, report cards |
| 5 — Finance & Accounting | ✅ Complete | Fees, payments, general ledger |
| 6 — Communication | ✅ Complete | Split-pane inbox, DLT SMS |
| 7 — HR & Payroll | ✅ Complete | Staff profiles, attendance, salary |
| 8 — LMS & Learning | ✅ Complete | Lessons, homework, practice quizzes |
| 9 — Operations & Logistics | ✅ Complete | Library, transport, hostel, inventory |
| 10 — Security & System Admin | ✅ Complete | SOC incidents, microservice health |
| 11 — BI Reports & AI Engine | ✅ Complete | BI Area charts, VidyaMaxx AI |

---

## 📄 License

Proprietary — All rights reserved. VidyaMaxx Team, 2026.
