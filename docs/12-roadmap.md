# 12 — Roadmap

## Phase 1 — Foundation ✅ (Completed)

- [x] Monorepo scaffold with TurboRepo + pnpm
- [x] Backend app structure (Django 5, DRF, Channels, Celery)
- [x] Frontend app structure (React 19, Vite, TypeScript)
- [x] Mobile app structure (Expo, React Native)
- [x] Desktop app structure (Electron, React)
- [x] Shared packages (`api`, `ui`, `types`, `validation`, `constants`, `icons`)
- [x] Docker Compose for local development
- [x] GitHub Actions CI/CD pipeline
- [x] Documentation framework (13 docs)

## Phase 1.5 — Industry-Standard Design System & UX ✅ (Completed)

- [x] **Radix UI Primitives Integration** (`@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-tabs`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip`)
- [x] **Framer Motion Animations** (`framer-motion` scale-in modal transitions, right-sliding drawers, backdrop blurs)
- [x] **TanStack Table Data Grid** (`@tanstack/react-table` v9 powering `VFDataTable` with sorting, global filtering, and column visibility)
- [x] **Recharts BI Analytics Engine** (`recharts` powering `VFAreaChart`, `VFBarChart`, and `VFPieChart` with dark theme tooltips & gradient fills)
- [x] **cmdk Search & Command Palette** (`cmdk` powering `CommandPalette.tsx` with `⌘K` keyboard navigation across 20+ ERP modules)
- [x] **Sonner Toast System** (`sonner` powering `ToastContainer.tsx` with global Zustand store notifications)
- [x] **Lenis Smooth Physics Scrolling** (`lenis` instances on `<main>` viewport in `AppShell.tsx` and sidebar navigation in `Sidebar.tsx`)
- [x] **Sofia Sans Fluid Typography** (`clamp(15px, 0.3vw + 12px, 18px)`) with crisp letter-spacing (`0.015em`)
- [x] **Single Viewport & Non-Passive Tabbar Wheel Scroll** (isolated horizontal wheel scroll preventing vertical page scroll conflicts)
- [x] **Submodule Tabbar Auto-Centering** (`scrollIntoView({ inline: 'center' })` auto-focus on active tabs)
- [x] **Header Navigation Upgrade** (`Welcome,` + school logo image + `Springfield Academy`)

## Phase 2 — Core Authentication & Multi-Tenancy

- [x] Custom User model with role-based fields
- [x] JWT authentication (login, refresh, logout)
- [x] Web login page and auth flow (`/login`)
- [ ] Organization and Campus models
- [ ] Tenant isolation middleware
- [ ] User invitation flow
- [ ] Role-based permission system (RBAC)
- [ ] Mobile authentication screens

## Phase 3 — Student & Academic Management

- [x] Student 360° Directory & Profiles (`/students`)
- [x] Admissions & Intake Queue (`/admissions`)
- [x] Academics & Curriculum Module (`/academics`)
- [x] Timetable & Scheduling Engine (`/timetable`)
- [x] Attendance & Biometrics Dashboard (`/attendance`)
- [ ] Homework management & submission portal

## Phase 4 — Examinations & Assessments

- [x] Examination & Report Cards Module (`/examinations`)
- [ ] Exam schedule management
- [ ] Marks entry & Grade calculation engine
- [ ] Report card generation (PDF)
- [ ] Online assessment module

## Phase 5 — Finance

- [x] Fees & Student Finance Module (`/finance`)
- [x] Finance & Accounting Ledger (`/accounting`)
- [ ] Fee structure configuration (term/monthly/yearly)
- [ ] Fee invoicing and collection
- [ ] Payment gateway integration (Razorpay / Stripe)
- [ ] Receipt generation

## Phase 6 — Communication & Notifications

- [x] Communication & DLT SMS Module (`/communication`)
- [ ] Internal messaging system
- [ ] Real-time notifications (Django Channels + WebSocket)
- [ ] SMS integration
- [ ] Parent communication portal

## Phase 7 — HR & Administration

- [x] HR & Staff Payroll Module (`/hr`)
- [ ] Staff profiles and contracts
- [ ] Leave management & Payroll processing
- [ ] Biometric integration (attendance punching)

## Phase 8 — LMS & Content

- [x] Digital Classroom LMS (`/lms`)
- [ ] Course and lesson management
- [ ] File upload and resource library

## Phase 9 — Advanced Modules

- [x] Transport & Live GPS Tracking (`/transport`)
- [x] Library & Book Catalog (`/library`)
- [x] Hostel & Campus Life (`/hostel`)
- [x] Inventory & Store Procurement (`/inventory`)
- [x] ID Studio & Document Vault (`/documents`)
- [x] Student Welfare & Discipline (`/welfare`)
- [x] Reports & Compliance BI (`/reports`)

## Phase 10 — AI & Analytics

- [x] VidyaFlow AI Command Center (`/ai`)
- [x] Dashboard BI Analytics & Student Health Radar (`/`)
- [ ] Auto-grading for objective assessments
- [ ] Fee collection risk scoring

## Phase 11 — Enterprise & Scale

- [ ] Multi-region deployment
- [ ] Advanced audit logging
- [ ] API for third-party integrations
- [ ] White-label theming per organization

---

*This roadmap is a living document and will be updated as priorities evolve.*
*Last updated: 2026-08-11*
