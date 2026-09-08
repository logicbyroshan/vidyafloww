# AGENTS.md — Agent Operating Guide: Design Lab Studio

Guidelines for AI coding agents developing inside **Design Lab Studio** (`Design-Lab`).

---

## 1. Core Directives
1. **Understand Before Modifying**: Fully inspect the problem and related files before editing.
2. **Minimal, Surgical Changes**: Prefer the smallest correct change that solves the issue.
3. **Zero Secrets & Credentials (NEVER PUSH ID/PASS)**: NEVER create, commit, push, log, or expose user IDs, passwords, API tokens, or `.env` files.
4. **Strict Sharp Border Radius Rule**: NEVER use large or bubbly border radius (`rounded-xl`, `rounded-2xl`, `rounded-3xl`). Maintain crisp geometric corners with minimal radius (`rounded-sm`, `rounded-[4px]`, or at most `rounded-md`).
5. **Mandatory Branching & GitHub CLI PR Workflow**: NEVER commit directly to `main`. Use dedicated branches (`fix/*` or `feature/*`), push, and create PRs via `gh pr create`.
6. **Visual Parity**: Maintain the institutional Mukta humanist sans font, `#09090b` dark background, and exact HSL color tokens.

---

## 2. Verification Commands
- Type Check: `pnpm type-check`
- Dev Server: `pnpm dev` (Port: 8010)
- Production Build: `pnpm build`
