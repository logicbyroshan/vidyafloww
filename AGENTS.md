# AGENTS.md — Agent Operating Guide

Permanent operating rules and execution guidelines for AI coding agents working in the **VidyaFloww** repository.

---

## 1. Core Directives

1. **Understand Before Modifying**: Fully inspect the problem, requirements, and related code paths before proposing or executing edits.
2. **Minimal, Surgical Changes**: Prefer the smallest correct change that solves the issue. Never touch unrelated files or refactor code outside the scope of the task.
3. **Preserve Existing Behavior**: Do not remove, replace, or overwrite existing behavior, comments, or configurations without explicit justification.
4. **Follow Architecture & Conventions**: Adhere strictly to the monorepo layering, established patterns, and design system tokens described in `.agent/CONTEXT.md`.
5. **No Unjustified Dependencies**: Use existing workspace packages (`@vidyafloww/ui`, `@vidyafloww/utils`, etc.) and installed libraries. Do not add external npm or pip packages without clear justification.
6. **Zero Secrets & Credentials (NEVER PUSH ID/PASS)**: Absolutely NEVER create, commit, push, log, or expose user IDs, usernames, passwords, API tokens, session credentials, private keys, or `.env` files to the repository under any circumstances. Always verify that test fixtures and mock states use generic, non-sensitive placeholders.
7. **Strict Sharp Border Radius Rule**: NEVER use large, bubbly, or excessive border radius (avoid `rounded-xl`, `rounded-2xl`, `rounded-3xl`, or bubbly circular buttons). Maintain sharp, crisp, clean geometric corners with minimal radius (`rounded-sm`, `rounded-[4px]`, or at most `rounded-md` / 4px-6px). We strictly favor crisp, sharp borders across cards, buttons, dialogs, and modules.

---

## 2. Context & Token Efficiency

To maintain high context quality and prevent token waste:
* **Targeted File Inspection**: Read only the files strictly necessary for the current task. Do not scan the entire repository or blindly list large vendor/output folders (`node_modules`, `dist`, `.turbo`, `__pycache__`).
* **Intelligent Use of `.agent/`**:
  * Read `.agent/CONTEXT.md` when starting a new feature, architecture change, or unfamiliar module.
  * Read `.agent/DECISIONS.md` only when questioning or proposing structural/architectural changes.
  * Read `.agent/CHANGELOG.md` only when verifying release history or recent feature arrivals.
  * **Do not read every `.agent/` file automatically for routine or isolated edits.**
* **Reference Over Duplication**: Reference existing symbols and file paths instead of copying blocks of code into conversation messages.

---

## 3. Engineering & Code Guidelines

* **Web (`apps/web`)**:
  * Use React 19, TypeScript (strict mode), and Tailwind CSS 3.4.
  * Use `@vidyafloww/ui` primitives (`VFCard`, `VFTable`, `VFButton`, `VFBadge`, `VFStatCard`, `VFTabs`) rather than creating bespoke HTML duplicates.
  * Maintain desktop layout requirements (`≥ 1000px` viewport minimum; preserve `SmallScreenBlocker`).
  * Preserve the unified `72px` header height lock across `Header.tsx` and `Sidebar.tsx`.
  * Support bilingual i18n keys via `useTranslation` for user-visible UI text; unified bilingual font: Mukta (contemporary humanist sans covering Latin and Devanagari).
* **Backend (`apps/backend`)**:
  * Adhere to the Django layered service pattern: `Views` (thin HTTP) → `Serializers` (validation) → `Selectors` (reads) / `Services` (writes) → `Models` (persistence) → `Tasks` (Celery).
  * Maintain multi-tenancy isolation via organization foreign keys.
* **Shared Packages (`packages/*`)**:
  * Changes in `packages/` affect multiple consumers. Validate all dependent packages before concluding.

---

## 4. Verification & Testing

* **Smallest Relevant Check First**: Run the fastest, most specific test/type-check command relevant to the modified package:
  * Web type check: `pnpm --filter @vidyafloww/web type-check`
  * Web unit tests: `pnpm --filter @vidyafloww/web test`
  * Backend integrity: `python apps/backend/manage.py check`
* **Avoid Wasteful Full Builds**: Do not trigger full monorepo builds (`turbo run build`) for trivial single-file edits unless validating a cross-package release.
* **Credential & Secrets Audit**: Always inspect `git status` and `git diff` before reporting completion or pushing commits to verify that no user IDs, passwords, private keys, or `.env` files were accidentally created or staged.
* **Review Diffs**: Always inspect `git status` and `git diff` before reporting completion to ensure no accidental whitespace, debug logs, or unrelated file changes occurred.

---

## 5. Reporting & Updates

* Keep progress notes and final responses concise, structured, and factual.
* Update `.agent/CONTEXT.md`, `.agent/DECISIONS.md`, or `.agent/CHANGELOG.md` **only** when a meaningful architectural shift, permanent decision, or significant milestone has been implemented.
