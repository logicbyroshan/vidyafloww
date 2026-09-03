# Historical Milestones & Changelog

Concise record of verified milestones and structural changes reconstructed from Git history and project release documentation.

---

## [Unreleased / Active] — August–September 2026

### Added & Enhanced
* **Comprehensive Bilingual Localization (i18n)**:
  * Integrated full English & Hindi translation coverage across all 18 primary route modules via `useTranslation`.
  * Configured dual-font CSS cascade: **Sofia Sans** for Latin characters and tabular metrics, **Baloo 2** for Devanagari script.
  * Added instant language switcher toggle in the top Navbar and Settings page.
* **Landing Application (`apps/landing`)**:
  * Introduced dedicated institutional marketing and product discovery site.
* **Timetable Grid Engine**:
  * Converted period matrix to CSS Grid for uniform slot dimensions across screen resolutions.
  * Added period configuration drawer, dynamic class switching, and faculty substitution matcher.
* **360° Dossier Drawers**:
  * Added slide-in profiles for Students and Faculty with academic history, fee records, attendance logs, and export actions.

---

## [v2.8.0] — 2026-08-11

### Added
* **24-Module Institutional ERP Infrastructure**:
  * Connected all 24 core institutional modules into the unified AppShell and routing registry:
    * Core: `Dashboard`, `Students`, `Admissions`, `Attendance`, `Academics`, `Timetable`.
    * Academic & Learning: `Examinations`, `Homework`, `Learning (LMS)`, `Library`.
    * Operations & Logistics: `Transport`, `Hostel`, `Inventory`, `Front Office`, `Events`.
    * Finance & HR: `Fees`, `Accounting`, `HR & Payroll`, `Scholarships`.
    * Governance & Portals: `Communication`, `Parent & Student Portal`, `Reports & BI`, `Security & Audit`, `System Administration`.
  * Embedded global `VidyaFloww AI` assistant drawer.

### Fixed & Refactored
* **Viewport & Spacing Standardization**:
  * Enforced vertical spacing standard (`space-y-3.5`) via `VFSection` in `@vidyafloww/ui`.
  * Removed nested vertical scrollbars on sub-navigation tabs to establish a single unified vertical scroll container.
  * Standardized KPI stat cards to render exclusively on primary dashboard views.

---

## [v0.1.0] — 2026-07-02

### Added
* Initial monorepo foundation with TurboRepo and pnpm workspaces.
* Backend skeleton: Django 5, Django REST Framework, Celery, Channels, and PostgreSQL/Redis Docker Compose configurations.
* Frontend skeleton: React 19, Vite, TypeScript, and Tailwind CSS.
* Shared packages foundation (`@vidyafloww/ui`, `@vidyafloww/types`, `@vidyafloww/api`, `@vidyafloww/constants`, `@vidyafloww/validation`).
* Project architecture and standards documentation suite (`docs/01-13`).
