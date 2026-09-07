# Project Context — VidyaFloww

## 1. Project Purpose & Scope

**VidyaFloww** is an enterprise-grade school management platform (ERP & SaaS) engineered for K-12 institutions, colleges, and multi-campus networks. It unifies admissions, academics, fee collection, attendance, timetables, examinations, homework, notices, payroll, and school administration into a high-density, centralized desktop command portal.

---

## 2. Technology Stack & Topology

* **Monorepo Management**: TurboRepo 2.x + pnpm 9.x workspaces (`pnpm-workspace.yaml`).
* **Frontend Web Portal (`apps/web`)**:
  * React 19 + TypeScript 5.6 + Vite 5.4.
  * TanStack Router (file-based routing via `routeTree.gen.ts`).
  * TanStack Query 5.x + Zustand 5.x with `localStorage` persistence.
  * Tailwind CSS 3.4 + `@tailwindcss/forms` + `@tailwindcss/typography`.
  * Radix UI primitives (`dialog`, `popover`, `select`, `tabs`, `tooltip`).
  * Framer Motion 12.x/13.x (page transitions, drawers, springs) + Lenis (smooth scrolling).
  * Lucide React icons + Sonner toast notifications.
  * Typography: **Mukta** — a contemporary humanist sans-serif natively covering Latin and Devanagari script. Loaded via Google Fonts. The single `--ui-font` CSS token is used for both English and Hindi locales.
* **Backend API (`apps/backend`)**:
  * Python 3.11+ / 3.13, Django 5.2.x, Django REST Framework (DRF).
  * Django Channels (WebSockets), Celery (async task processing), Redis (cache/MQ), PostgreSQL / SQLite.
* **Shared Packages (`packages/*`)**:
  * `@vidyafloww/ui`: Standardized primitives (`VFCard`, `VFTable`, `VFDataTable`, `VFStatCard`, `VFTabs`, `VFButton`, `VFBadge`, `VFDialog`, `VFDrawer`, `VFCharts`, etc.).
  * `@vidyafloww/types`: Shared domain interfaces and schemas.
  * `@vidyafloww/constants`: Module registries, route paths, role definitions, and navigation constants.
  * `@vidyafloww/api`: Axios client with interceptors and normalized error structures.
  * `@vidyafloww/validation`: Shared Zod validation schemas.
  * `@vidyafloww/hooks`, `@vidyafloww/utils`, `@vidyafloww/themes`, `@vidyafloww/icons`, `@vidyafloww/config`, `@vidyafloww/assets`.
* **Additional Applications**:
  * `apps/landing`: Marketing and product discovery site (Vite + React 19).
  * `apps/desktop`: Electron wrapper targeting cross-platform desktop execution.
  * `apps/mobile`: React Native + Expo shell.

---

## 3. Architecture & Data Flow

* **Frontend Web Architecture**:
  * Route files live under `apps/web/src/routes/` — each file is a self-contained page component wired by TanStack Router's file-based auto-generation into `routeTree.gen.ts`.
  * Layout shell: `apps/web/src/layouts/AppShell.tsx` — wraps all authenticated routes with `Sidebar`, `Header`, `CommandPalette`, `NotificationsPanel`, and `ToastContainer`.
  * Data state is currently managed client-side through Zustand stores (`globalStore.ts`) backed by `localStorage` and localized mock fixtures.
  * Sub-navigation uses `VFTabs` (from `@vidyafloww/ui`) with auto-centering horizontal scrolling and zero vertical scroll nesting.
* **Backend Layering Specification**:
  * `apps/backend/core/`: Foundation services (`accounts`, `authentication`, `campuses`, `organizations`, `permissions`, `users`).
  * `apps/backend/platform_services/`: Cross-cutting engines (`notifications`, `audit`, `activity`, `reports`, `storage`, `workflows`).
  * `apps/backend/modules/`: 24 business domain apps (`students`, `academics`, `admissions`, `attendance`, `examinations`, `fees`, `hr`, etc.).
  * `apps/backend/ai/`: LLM providers, assistants, and OCR pipeline.
  * Service layer pattern: `View` → `Serializer` → `Selector` (read) / `Service` (write) → `Model` → `Task`.

---

## 4. Source Directory Map (`apps/web/src/`)

```
src/
├── app/
│   └── App.tsx                   # Root React app: QueryClientProvider + RouterProvider + Preloader
├── components/
│   ├── AIChatDrawer.tsx          # AI assistant slide-in drawer (standalone, not yet wired to AppShell)
│   └── Preloader.tsx             # First-visit animated preloader (shown once, state persisted in globalStore)
├── features/                     # SCAFFOLD — reserved for future feature-sliced domain modules
│   ├── api/                      # (empty) Future: domain-level API hooks per feature
│   ├── components/               # (empty) Future: reusable sub-components per feature slice
│   ├── constants/                # (empty) Future: per-feature constants
│   ├── hooks/                    # (empty) Future: per-feature React hooks
│   ├── pages/                    # (empty) Future: page-level compositions per feature
│   ├── schemas/                  # (empty) Future: Zod schemas per feature
│   ├── types/                    # (empty) Future: TypeScript interfaces per feature
│   └── utils/                    # (empty) Future: pure utility functions per feature
├── hooks/
│   └── useTranslation.ts         # Bilingual translation hook (wraps i18n.ts + globalStore language)
├── layouts/
│   ├── AppShell.tsx              # Main layout shell: Sidebar + Header + route outlet + overlays
│   ├── CommandPalette.tsx        # Ctrl+K search command palette
│   ├── Header.tsx                # Top navbar — locked 72px height, school name, search, notifications
│   ├── NotificationsPanel.tsx    # Slide-in notifications drawer
│   ├── Sidebar.tsx               # Left navigation sidebar — locked 72px brand header, route links
│   └── ToastContainer.tsx        # Global toast notification renderer
├── lib/
│   └── i18n.ts                   # 60KB bilingual translation dictionary (EN + HI keys for all modules)
├── pages/
│   └── ErrorPages.tsx            # Error boundary pages (future integration — not yet imported in router)
├── routes/                       # TanStack Router file-based pages (28 routes)
│   ├── __root.tsx                # Root route: renders AppShell + 404 not-found handler
│   ├── index.tsx                 # Dashboard (/) — KPI cards, quick shortcuts, attendance overview
│   ├── dashboard.tsx             # /dashboard alias → re-exports DashboardPage from index.tsx
│   ├── academics.tsx             # Curriculum, syllabus, subjects management
│   ├── admissions.tsx            # Admissions pipeline and enquiry management
│   ├── attendance.tsx            # Daily/period attendance with biometric integration
│   ├── audit.tsx                 # System audit log viewer
│   ├── elibrary.tsx              # Digital library and e-book resources
│   ├── examinations.tsx          # 3-tab: Timetable / Marks Scheme (editable) / Marks Register (lockable)
│   ├── fees.tsx                  # Fee collection, challan generation, ledger
│   ├── homework.tsx              # 2-tab: Assign (rich-text editor) / Review (all-class submission tracker)
│   ├── learning.tsx              # LMS learning content viewer
│   ├── license.tsx               # License and subscription details
│   ├── lms.tsx                   # LMS course management
│   ├── login.tsx                 # Authentication page (no AppShell wrapper)
│   ├── notices.tsx               # 2-tab notice board: send (wizard) / view
│   ├── portal.tsx                # Parent & student portal gateway
│   ├── reports.tsx               # Analytics and report generation
│   ├── resources.tsx             # Resource library
│   ├── salary.tsx                # Staff payroll and salary processing
│   ├── scholarships.tsx          # Scholarship management
│   ├── security.tsx              # Role & access control management
│   ├── settings.tsx              # System settings: school profile, branding, sessions
│   ├── shortcuts.tsx             # Dashboard shortcut configurator
│   ├── statistics.tsx            # Platform-wide statistics and charts
│   ├── students.tsx              # Student roster, 360° dossier, academic records
│   ├── teachers.tsx              # Teacher management, schedules, and profiles
│   └── timetable.tsx             # Weekly timetable grid (CSS Grid layout)
├── services/                     # SCAFFOLD — reserved for future API service layer
├── stores/
│   └── globalStore.ts            # Zustand persistent store: theme, language, school profile, notifications, dashboard config
├── styles/
│   └── globals.css               # Tailwind base + design tokens + Mukta font + scrollbar suppression + animations
├── tests/                        # SCAFFOLD — reserved for Vitest unit tests
├── types/                        # SCAFFOLD — reserved for shared TypeScript types
├── utils/                        # SCAFFOLD — reserved for pure utility functions
├── main.tsx                      # Vite entrypoint: mounts <App /> into #root
└── routeTree.gen.ts              # AUTO-GENERATED by TanStack Router (never edit manually)
```

---

## 5. Important Conventions & Constraints

1. **Desktop-Only Viewport Requirement**:
   * The web application requires a minimum screen width of **1000px**.
   * Viewports `< 1000px` render the `SmallScreenBlocker` prompt in `AppShell.tsx`. Do not remove this constraint without architectural review.
2. **Unified 72px Header Metric**:
   * The top Navbar (`Header.tsx`) and Sidebar brand header (`Sidebar.tsx`) are strictly locked to `h-[72px]`.
3. **Bilingual Localization (i18n)**:
   * All user-facing UI labels must use the `useTranslation` hook (`en` / `hi`).
   * Single font for both locales: **Mukta** (humanist sans covering Latin + Devanagari).
4. **Sharp Border Radius Rule** (strict — see AGENTS.md):
   * Never use `rounded-xl`, `rounded-2xl`, `rounded-3xl`. Maximum allowed: `rounded-md` (≈6px) for containers, `rounded-sm`/`rounded-[4px]` preferred.
5. **Component Library First**:
   * Always use `@vidyafloww/ui` primitives (`VFCard`, `VFButton`, `VFBadge`, `VFTable`, `VFDataTable`, `VFDialog`, `VFTabs`, `VFStatCard`, etc.) instead of re-implementing custom HTML.
6. **Zero Secrets & Credentials**:
   * User IDs, passwords, API tokens, private keys, and `.env` files must NEVER be committed or pushed. Mock state must use generic placeholders.
7. **Single-Level Divided Hierarchy**:
   * Avoid deep nested card boxes; prefer flat, border-divided lists (`divide-y divide-border`) on `VFCard`.
8. **Globally Dark Mode**:
   * Theme is permanently dark. `initTheme()` in `globalStore.ts` forces `.dark` class on `<html>`. No light mode toggle exists.
9. **No Push Without Explicit Command**:
   * Always commit locally (`git commit`). Never run `git push` unless the user explicitly commands it.

---

## 6. Development & Verification Commands

```bash
# Start web dev server (default: port 3000)
pnpm --filter @vidyafloww/web dev

# Validate web TypeScript (run after every code change)
pnpm --filter @vidyafloww/web type-check

# Run web unit tests (Vitest)
pnpm --filter @vidyafloww/web test

# Verify Django backend integrity
python apps/backend/manage.py check

# Full monorepo type-check
pnpm type-check
```

---

## 7. Current Implementation Status

| Module | Route | Status |
| :--- | :--- | :---: |
| Dashboard | `/` | ✅ Complete |
| Students | `/students` | ✅ Complete |
| Admissions | `/admissions` | ✅ Complete |
| Attendance | `/attendance` | ✅ Complete |
| Academics | `/academics` | ✅ Complete |
| Timetable | `/timetable` | ✅ Complete |
| Teachers | `/teachers` | ✅ Complete |
| Homework | `/homework` | ✅ Complete |
| Examinations | `/examinations` | ✅ Complete |
| Notices | `/notices` | ✅ Complete |
| Fees | `/fees` | ✅ Complete |
| Salary | `/salary` | ✅ Complete |
| Scholarships | `/scholarships` | ✅ Complete |
| E-Library | `/elibrary` | ✅ Complete |
| Statistics | `/statistics` | ✅ Complete |
| Reports | `/reports` | ✅ Complete |
| Settings | `/settings` | ✅ Complete |
| Security | `/security` | ✅ Complete |
| Audit Log | `/audit` | ✅ Complete |
| Parent Portal | `/portal` | ✅ Complete |
| LMS | `/lms` | ✅ Complete |
| Learning | `/learning` | ✅ Complete |
| Resources | `/resources` | ✅ Complete |
| License | `/license` | ✅ Complete |
| Shortcuts | `/shortcuts` | ✅ Complete |
| Login | `/login` | ✅ Complete |
| **Backend API** | — | 🔶 Scaffolded (stubs) |
| **API Client** | — | 🔶 Scaffolded |
| **Desktop App** | — | 🔶 Scaffolded |
| **Mobile App** | — | 🔶 Scaffolded |

---

## 8. Known Limitations & Active Integration Gaps

* **Client/Server Coupling**: The web portal currently relies on client-side state and mock fixtures. Integration with the Django REST API via `@vidyafloww/api` is pending backend domain model implementation.
* **Tenant Middleware**: Multi-tenancy database isolation middleware is planned but not yet active in Django middleware pipelines.
* **Authentication**: Web has complete UI forms (`/login`), but live JWT session exchange with the backend is not yet plugged into production storage.
* **`AIChatDrawer.tsx`**: Component exists in `src/components/` but is not yet wired into `AppShell.tsx`. Pending AI assistant integration milestone.
* **`ErrorPages.tsx`**: Exists in `src/pages/` as a future React Error Boundary; not yet mounted in the router tree.
* **`features/` scaffold**: All subdirectories under `src/features/` are empty scaffolds preserved for the planned feature-sliced refactor of domain logic.
