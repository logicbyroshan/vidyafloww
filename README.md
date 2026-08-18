<p align="center">
  <img src="./Vidy%20Max%20Banner.png" alt="VidyaMaxx School Management Banner" width="100%" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);" />
</p>

<div align="center">

# VidyaMaxx — Enterprise School Management Platform

**A unified, high-performance digital operating system engineered for K-12 schools, colleges, and multi-campus educational networks.**

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript 5.6](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.x-FF4154?logo=reacttable&logoColor=white)](https://tanstack.com/router)
[![Zustand](https://img.shields.io/badge/Zustand-4.5-brown?logo=zustand&logoColor=white)](https://github.com/pmndrs/zustand)

</div>

---

## 📖 About VidyaMaxx

**VidyaMaxx** is an institutional-grade, full-stack educational ERP and campus command portal. Designed specifically for school administrators, principals, and educators, VidyaMaxx eliminates administrative friction and replaces fragmented spreadsheets with an intuitive, clean, and blisteringly fast digital workspace.

### 🎨 Institutional Design System Highlights (V1)
- **High-Legibility Typography**: Solid 16px (`text-base`) foundation with high-contrast text and balanced metric indicators designed specifically for non-tech-friendly school personnel.
- **Pixel-Aligned Header Geometry**: Unified `72px` height across the top Navbar and Sidebar header creating an unbroken, symmetrical dividing line.
- **Square Collapsed Sidebar Navigation**: Centered `44px × 44px` square box geometry when collapsed for clean scanning.
- **Open Sub-Navigation Tabs**: Clean, open tabs resting directly on the sub-header with animated bottom underline indicators (no enclosing box wrappers).
- **Space-Efficient Borders (`rounded-lg` / `rounded-md`)**: Crisp 8px and 6px border radii that maximize screen real estate and avoid floaty capsule clutter.
- **Flat Single-Level Hierarchy**: Completely eliminates 3-level "box-inside-box" nesting in favor of clean divided lists (`divide-y divide-border`).
- **Dynamic School Identity & Logo Studio**: Real-time institution branding, custom logo upload, and preset emblem selectors with live Navbar header integration and `localStorage` persistence.

---

## 🏛️ Active V1 Application Modules

VidyaMaxx is organized into clean, isolated modules mapped to distinct, type-safe routes:

| # | Module | Route | Key Capabilities |
|:---:|---|---|---|
| **01** | **Dashboard** | `/` | Real-time institutional telemetry, student attendance radar, priority action feed, biometric hardware sync |
| **02** | **Students** | `/students` | Enrolled student master roster, 360° academic profiles, demographic breakdown, batch promotions |
| **03** | **Admissions** | `/admissions` | 4-stage conversion funnel CRM, OCR document verification, merit scoring, instant admission letters |
| **04** | **Attendance** | `/attendance` | Interactive daily roll call, one-click "Mark All Present", absence alerts, biometric gate telemetry |
| **05** | **Academics** | `/academics` | Academic session master, subject catalog, classroom & section allocation matrix |
| **06** | **Timetable** | `/timetable` | Weekly period schedule matrix, automated teacher proxy & substitution matcher, standardized bell timings |
| **07** | **Teachers** | `/staff` | Faculty & educator master directory, department workload meters, class allocations |
| **08** | **Homework** | `/homework` | Assignment master register, deadline monitoring, student submission grading queue |
| **09** | **Examinations** | `/examinations` | Examination schedule setup, marks entry, term gradebooks, academic performance summaries |
| **10** | **Fees & Payments** | `/fees` | Fee collection master register, quarterly dues tracking, WhatsApp payment reminder broadcasts |
| **11** | **Notices** | `/notices` | Institutional notice board, circular publisher, multi-channel dispatch (Mobile App, SMS, WhatsApp) |
| **12** | **Reports** | `/reports` | CBSE / RTE compliance audits, academic GPA analytics, 1-click Excel (.xlsx) & PDF exports |
| **13** | **Settings** | `/settings` | School Identity & Custom Logo Studio, multi-campus directory, RBAC roles & permissions |

---

## 🛠️ Technology Stack & Monorepo Architecture

```text
vidyamaxx/
├── apps/
│   ├── web/                   # React 19 + Vite + TanStack Router Web Portal
│   │   ├── src/
│   │   │   ├── layouts/       # Header (72px), Sidebar (72px header), AppShell
│   │   │   ├── routes/        # TanStack Router type-safe route definitions
│   │   │   ├── stores/        # Zustand global store with localStorage persistence
│   │   │   └── styles/        # Tailwind design tokens & globals.css (16px base)
│   └── backend/               # Django 5 REST API microservice
├── packages/
│   ├── ui/                    # @vidyamaxx/ui design system primitives
│   │   ├── VFStatCard.tsx     # Balanced metric card with indicator badges
│   │   ├── VFCard.tsx         # Flat card with crisp rounded-lg borders
│   │   ├── VFTabs.tsx         # Open tabs with animated bottom underline indicator
│   │   ├── VFTable.tsx        # High-performance data table with search & column filters
│   │   ├── VFButton.tsx       # Standardized buttons with rounded-md/lg styling
│   │   └── VFBadge.tsx        # Status pill tags
│   ├── constants/             # Navigation configurations & metadata
│   ├── types/                 # TypeScript interfaces
│   └── themes/                # Color palettes & tokens
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v20.x` or `v22.x` ([nodejs.org](https://nodejs.org/))
- **pnpm**: `v9.x` (`npm install -g pnpm`)

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/logicbyroshan/vidyamaxx-school-management.git
cd vidyamaxx-school-management
```

---

### Step 2: Install Dependencies

```bash
pnpm install
```

---

### Step 3: Start the Web Development Server

```bash
pnpm --filter @vidyamaxx/web dev
```

> The application will run at **`http://localhost:3000`** with Hot Module Replacement (HMR).

---

### Step 4: Validate TypeScript Types & Build

```bash
# Validate type correctness across all packages
pnpm --filter @vidyamaxx/web type-check

# Compile production bundle
pnpm --filter @vidyamaxx/web build
```

---

## 📄 License

Proprietary Software. All rights reserved &copy; 2026 **VidyaMaxx Team**.
