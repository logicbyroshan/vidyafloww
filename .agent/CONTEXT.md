# Project Context — VidyaFloww

## 1. Project Purpose & Scope

**VidyaFloww** is an enterprise-grade school management platform (ERP & SaaS) engineered for K-12 institutions, colleges, and multi-campus networks. It unifies admissions, academics, fee collection, attendance, timetables, examinations, payroll, and school administration into a high-density, centralized desktop command portal.

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
  * Typography: **Mukta** (contemporary humanist sans supporting Latin and Devanagari natively).
* **Backend API (`apps/backend`)**:
  * Python 3.11+ / 3.13, Django 5.2.x, Django REST Framework (DRF).
  * Django Channels (WebSockets), Celery (async task processing), Redis (cache/MQ), PostgreSQL / SQLite.
* **Shared Packages (`packages/*`)**:
  * `@vidyafloww/ui`: Standardized primitives (`VFCard`, `VFTable`, `VFStatCard`, `VFTabs`, `VFButton`, `VFBadge`, `VFModal`, `VFDrawer`).
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
  * Route entries live under `apps/web/src/routes/` wrapped by `apps/web/src/layouts/AppShell.tsx`.
  * Data state is currently managed client-side through Zustand stores (`globalStore.ts`) backed by `localStorage` and localized fixtures.
  * Sub-navigation utilizes `VFTabs` with auto-centering horizontal scrolling and zero vertical scroll nesting.
* **Backend Layering Specification**:
  * `apps/backend/core/`: Foundation services (`accounts`, `authentication`, `campuses`, `organizations`, `permissions`, `users`).
  * `apps/backend/platform_services/`: Cross-cutting engines (`notifications`, `audit`, `activity`, `reports`, `storage`, `workflows`).
  * `apps/backend/modules/`: 24 business domain apps (`students`, `academics`, `admissions`, `attendance`, `examinations`, `fees`, `hr`, etc.).
  * `apps/backend/ai/`: LLM providers, assistants, and OCR pipeline.
  * Service layer pattern: `View` → `Serializer` → `Selector` (read) / `Service` (write) → `Model` → `Task`.

---

## 4. Current Implementation Status

| Component | Status | Reality & Architecture Notes |
| :--- | :---: | :--- |
| **Web Portal (`apps/web`)** | **Complete & Active** | Fully interactive 24-module UI with mock fixtures, full bilingual localization (EN/HI), modals, drawers, and export capabilities. |
| **UI Package (`packages/ui`)** | **Complete & Active** | Radix UI + Framer Motion + TanStack Table + Recharts components shared across apps. |
| **Backend API (`apps/backend`)** | **Scaffolded** | Django project structure, configuration, and app directories are established and pass `manage.py check`. Individual domain models, serializers, and endpoints are mostly stubs (`# TODO: Implement ...`). |
| **API Client (`packages/api`)** | **Scaffolded** | Base Axios client and error handling implemented; domain endpoints commented out pending backend models. |
| **Desktop (`apps/desktop`)** | **Scaffolded** | Electron + Vite configuration present; relies on web codebase. |
| **Mobile (`apps/mobile`)** | **Scaffolded** | Expo project structure established. |

---

## 5. Important Conventions & Constraints

1. **Desktop-Only Viewport Requirement**:
   * The web application requires a minimum screen width of **1000px**.
   * Viewports `< 1000px` render the `SmallScreenBlocker` prompt. Do not remove this constraint without architectural review.
2. **Unified 72px Header Metric**:
   * The top Navbar (`Header.tsx`) and Sidebar brand header (`Sidebar.tsx`) are strictly locked to `h-[72px]`.
3. **Bilingual Localization (i18n)**:
   * All user-facing UI labels must use the `useTranslation` hook (`en` / `hi`).
   * Typography: Mukta for both Latin letters/numbers and Devanagari script.
4. **Single-Level Divided Hierarchy**:
   * Avoid deep nested card boxes; prefer flat, border-divided lists (`divide-y divide-border`) on `VFCard`.
5. **Zero Secrets & Credentials (NEVER PUSH ID/PASS)**:
   * User IDs, usernames, passwords, API tokens, session credentials, private keys, and `.env` files must NEVER be committed, logged, or pushed to the repository under any circumstances. Mock/test state must strictly use generic placeholders.

---

## 6. Development & Verification Commands

```bash
# Start web dev server (default: port 3000)
pnpm --filter @vidyafloww/web dev

# Validate web TypeScript types
pnpm --filter @vidyafloww/web type-check

# Run web unit tests (Vitest)
pnpm --filter @vidyafloww/web test

# Verify Django backend integrity
python apps/backend/manage.py check

# Run full monorepo type-check
pnpm type-check
```

---

## 7. Known Limitations & Active Integration Gaps

* **Client/Server Coupling**: The web portal currently relies on client-side state and mock collections. Integration with the Django REST API via `@vidyafloww/api` is pending backend domain model implementation.
* **Tenant Middleware**: Multi-tenancy database isolation middleware (`TenantMiddleware`) is planned in design documentation but not yet active in Django middleware pipelines.
* **Authentication**: Web has complete UI forms (`/login`), but live JWT session exchange with the backend is not yet plugged into production storage.

---

## 8. UI Aesthetics & Geometric Rules

* **Strict Sharp Border Radius**: Never use excessive or bubbly border radii (strictly avoid `rounded-xl`, `rounded-2xl`, `rounded-3xl`, and bubbly pills). Use crisp, sharp geometry (`rounded-sm` / `rounded-[4px]`, max `rounded-md` / 6px) across cards, modal containers, buttons, and module items.
* **3D Icons**: Use authentic 3D icon assets (e.g. from 3dicons.co) rather than glowing neon ring hacks or flat tiny SVGs inside bloated circles.
* **No Unwanted Glow Blobs**: Avoid heavy neon blur shadows or glowing rings around icons. Ensure clean, elegant, professional presentation.
