# Historical Milestones & Changelog

Concise record of verified milestones and structural changes reconstructed from Git history and project release documentation.

---

## [Unreleased / Active] — September 2026

### UI Redesigns & Module Completions (September 2026 Sprint)

#### Notices Module (`/notices`) — Tabbed Wizard Redesign
* **Replaced** single-page modal form with a 2-tab layout:
  * **Tab 1 "Compose"**: Multi-step wizard — Step 1 selects audience (class/role/school-wide), channel, and urgency; Step 2 presents a rich-text editor (Bold, Italic, Lists, H1-H3 headings) with subject field. Step 2 is gated until Step 1 is complete.
  * **Tab 2 "Board"**: Read-only notice archive with search and status filters.
* Simplified over-verbose label text across the module ("Assignment Title & Topic" → "Title", etc.).

#### Examinations Module (`/examinations`) — 3-Tab Architecture
* **Tab 1 "Timetable"**: Compact exam cards + active date sheet table with search and type filters.
* **Tab 2 "Marks Scheme"**: Editable subject-wise marks allocation per exam, with **Lock/Unlock Scheme** toggle. Board-level classes (10, 12) default to locked. Editable CBSE Grading Scale section below.
* **Tab 3 "Marks Register"**: Per-student marks ledger with **Lock/Unlock Register** toggle. When locked: amber READ-ONLY banner, all inputs become plain text, Save Marks button disabled.
* Editable grading scale: `Edit Scale` → inline min/max/description inputs per tier → `Save Scale` re-grades the entire register.

#### Homework Module (`/homework`) — Single-Header, 2-Tab Redesign
* **Merged two header bars** into one unified toolbar: tab switcher + class selector + contextual controls.
* Removed "Term 1 Active" session badge (not needed in workflow).
* **Tab 1 "Assign"**: Class selector in header. Subject / Due date / Publish-now-or-draft meta bar. Rich-text `contenteditable` editor with toolbar (Bold, Italic, Lists, Quote, H1/H2/H3, Photo attach). `onPaste` handler — pasted clipboard images are read as `data:` URLs and injected inline. Send/Save Draft button in the toolbar.
* **Tab 2 "Review"**: Full-width table of **all classes' homework** (Code, Title, Class, Due, Submitted progress bar, Status, View). Clicking View transitions to a full-page submission roster showing Submitted / Late / Pending counts + student table. Breadcrumb navigation back to the list. Single search bar in the header (no duplicate).

#### Deep Audit & Documentation Pass (2026-09-07)
* **Identified orphaned components**: `AIChatDrawer.tsx` and `ErrorPages.tsx` are defined but not yet imported. Documented in CONTEXT.md Known Limitations. No deletion — these are planned integration targets.
* **Fixed stale CSS comment**: `globals.css` line 140 incorrectly referenced "Poppins" — corrected to "Mukta".
* **Corrected DECISIONS.md**: Decision 8 incorrectly stated "Sofia Sans + Baloo 2" — updated to reflect actual production font (Mukta).
* **Updated CONTEXT.md**: Complete source directory map, full 28-route status table, Known Limitations section, font clarification.

#### New Sidebar Modules Integration (2026-09-07)
* **Teaching (`/teaching`)**: Added directly above Homework in the Academics navigation group. Includes assigned faculty sections, workload KPI cards, AI-assisted 45-minute lesson planner, CBSE/NEP 2020 syllabus completion tracker, and daily period routine.
* **E-Class (`/e-class`)**: Simplified label to "E-Class" (removed "(Online Class)" wording). Integrated WebRTC HD live virtual classroom studio, scheduled lectures timetable with platform engines (VidyaClass Live, Zoom, Google Meet), interactive classroom launcher with screen share and participant management, and recorded lecture vault.
* **Transport (`/transport`)**: Added to dedicated Facilities group in the sidebar. Fleet management with live GPS bus telematics, active routes, driver and vehicle compliance registry, and student commute allocation rosters.
* **Hostel (`/hostel`)**: Added to Facilities group. Dormitory room and bed matrix (Block A Boys, Block B Girls, Block C Junior), resident student directory, biometric gate outpass registry, and weekly 4-meal nutritional dining hall menu.
* **Complaints (`/complaints`)**: Dedicated separate module in Admin group. Full Grievance Redressal registry with status filtering (All, Open, In Progress, Resolved), department tags, severity badges, actionable queue, and departmental SLA analytics.
* **Surveys (`/surveys`)**: Dedicated separate module in Admin group. Institutional feedback collection, community polls, participation progress bars, Net Promoter Score (NPS) sentiment analytics, historical survey archive, and survey creator wizard.
* **Shortcuts & Localization**: Registered all modules independently in `shortcuts.tsx` and added bilingual translation keys in `i18n.ts`. All interfaces strictly adhere to sharp geometric borders (`rounded-md`, `rounded-sm`).

---

## [Pre-September 2026] — August 2026 Sprint

### Added & Enhanced
* **Comprehensive Bilingual Localization (i18n)**:
  * Integrated full English & Hindi translation coverage across all 18+ primary route modules via `useTranslation`.
  * Adopted Mukta as the unified bilingual font covering Latin and Devanagari script.
  * Added instant language switcher toggle in the top Navbar and Settings page.
* **Landing Application (`apps/landing`)**:
  * Introduced dedicated institutional marketing and product discovery site.
* **Timetable Grid Engine**:
  * Converted period matrix to CSS Grid for uniform slot dimensions across screen resolutions.
  * Added period configuration drawer, dynamic class switching, and faculty substitution matcher.
* **360° Dossier Drawers**:
  * Added slide-in profiles for Students and Faculty with academic history, fee records, attendance logs, and export actions.
* **VidyaFloww AI Assistant Drawer** (`AIChatDrawer.tsx`):
  * Component built and available in `apps/web/src/components/`. Pending wiring into `AppShell.tsx`.

---

## [v2.8.0] — 2026-08-11

### Added
* **28-Module Institutional ERP Infrastructure**:
  * Connected all primary institutional modules into the unified AppShell and routing registry:
    * Core: `Dashboard`, `Students`, `Admissions`, `Attendance`, `Academics`, `Timetable`.
    * Academic & Learning: `Examinations`, `Homework`, `Learning (LMS)`, `Library`, `E-Library`.
    * Operations: `Parent Portal`, `Notices`, `Reports`, `Statistics`, `Shortcuts`.
    * Finance & HR: `Fees`, `Salary`, `Scholarships`.
    * Governance: `Security`, `Audit Log`, `Settings`, `License`.
    * Auth: `Login`.
  * Embedded global `VidyaFloww AI` assistant drawer (pending AppShell integration).

### Fixed & Refactored
* **Viewport & Spacing Standardization**:
  * Enforced vertical spacing standard via `VFSection` / `space-y-3` in `@vidyafloww/ui`.
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
