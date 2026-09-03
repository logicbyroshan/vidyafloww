# Architectural & Design Decisions

Meaningful architectural and engineering decisions supported by the codebase, documentation, and Git history.

---

### Decision 1: Monorepo Architecture with TurboRepo & pnpm Workspaces
* **Date**: 2026-07-02
* **Decision**: Adopt a monorepo structure utilizing TurboRepo and pnpm workspaces containing `apps/` (web, backend, desktop, mobile, landing) and `packages/` (ui, types, api, constants, hooks, validation).
* **Reason**: Enables seamless code reuse across web, desktop, and mobile clients (particularly types, UI tokens, and API schemas) while keeping tooling, linting, and build steps coordinated under a single root.
* **Impact**: Workspace packages depend on each other via `workspace:*`; scripts must be executed using filter flags (e.g., `pnpm --filter @vidyafloww/web dev`).

---

### Decision 2: Django Modular Monolith with Layered Service Pattern
* **Date**: 2026-07-02
* **Decision**: Structure the backend as a modular monolith organized into 5 layers (`core`, `platform_services`, `modules`, `ai`, `integrations`) using a strict service/selector pattern.
* **Reason**: Balances the operational simplicity of a single deployable unit with clear business domain boundaries, preventing fat controllers or models.
* **Impact**: Views handle HTTP only; business write logic belongs in `services.py`, queries in `selectors.py`, and asynchronous tasks in `tasks.py`.

---

### Decision 3: Shared-Schema Multi-Tenancy Model
* **Date**: 2026-07-02
* **Decision**: Isolate organization data within a shared database schema using an `organization` foreign key on tenant models and scoped querysets, rather than database-per-tenant or schema-per-tenant.
* **Reason**: Minimizes operational overhead, simplifies database migrations, and lowers hosting costs for multi-campus deployments.
* **Impact**: All tenant-scoped models must include an organization link; global queries must be guarded to prevent cross-tenant data leakage.

---

### Decision 4: Desktop-Only Viewport Gate (`≥ 1000px`) for Web Command Portal
* **Date**: 2026-08-10
* **Decision**: Enforce a minimum viewport width of 1000px via `SmallScreenBlocker` in `AppShell.tsx`, redirecting smaller viewports to the dedicated mobile app.
* **Reason**: School administrative ERP workflows involve dense data tables, side drawers, multi-column filters, and timetable grids that lose operational utility on mobile screens.
* **Impact**: Desktop views do not compromise information density for small-screen responsive wrapping; mobile users are directed to the mobile client (`apps/mobile`).

---

### Decision 5: Dedicated Component Library (`@vidyafloww/ui`) with Radix UI & Framer Motion
* **Date**: 2026-08-10
* **Decision**: Standardize all application UI primitives in `packages/ui` backed by Radix UI unstyled primitives, Tailwind CSS, and Framer Motion spring physics.
* **Reason**: Guarantees keyboard accessibility, consistent drawer/modal animations, unified border radii (`rounded-lg`/`rounded-md`), and eliminates fragmented third-party styling across modules.
* **Impact**: Application routes must import UI components from `@vidyafloww/ui` rather than re-implementing custom dialogs, buttons, or badge wrappers.

---

### Decision 6: Single Viewport Vertical Scroll & Auto-Centering Submodule Tabs
* **Date**: 2026-08-11
* **Decision**: Lock the `<main>` container as the sole vertical scrollable element and make submodule `VFTabs` auto-center horizontally on selection.
* **Reason**: Dual nested scrollbars caused jitter, stuck scroll wheels, and poor usability when navigating between data tables and tabs.
* **Impact**: Tabpanel contents must never contain independent vertical `overflow-y-auto` scrollbars; horizontal wheel events are isolated to the tabbar.

---

### Decision 7: Timetable Matrix Layout via Pure CSS Grid
* **Date**: 2026-08-12 (Commit `c7dcba0`)
* **Decision**: Re-architect the timetable weekly period schedule using CSS Grid instead of nested flexbox containers.
* **Reason**: Flexbox approximations caused slight height and width mismatches between period slots across different resolutions and browser zoom levels.
* **Impact**: Rows and columns maintain mathematically identical dimensions across all days and bell schedule configurations.

---

### Decision 8: Dual-Font Localization System (Sofia Sans + Baloo 2) with `useTranslation`
* **Date**: 2026-08-20 (Commits `cf8f354`, `ab65c5a`, `929e1d3`)
* **Decision**: Implement a bilingual localization framework (English & Hindi) utilizing a dual-font CSS cascade with `Sofia Sans` for Latin characters and tabular figures, and `Baloo 2` for Devanagari script.
* **Reason**: Standard web fonts either clipped Devanagari diacritics or broke tabular numeric alignment in dense financial and roll call tables.
* **Impact**: The `--ui-font` CSS custom property manages font fallback; all user-facing route chrome keys must use the centralized `useTranslation` hook.
