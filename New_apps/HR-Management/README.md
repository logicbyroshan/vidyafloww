# Operational HR & Staff Management (गैर-शैक्षणिक स्टाफ व मानव संसाधन)

> Standalone Micro-Frontend Subsystem for **VidyaFloww**
> Production Subdomain: **https://hr.vidyafloww.com** · Local Dev Port: **8013**

---

## 1. Overview
Workforce administration and human resources subsystem for non-teaching operational personnel, security, housekeeping, drivers, wardens, and laboratory technicians.

## 2. Features & Integrated Workflows
- **Operational**: Operational Staff 360-Degree Dossier Drawer
- **Biometric**: Biometric Daily Punch Logs & Attendance Tracking
- **Institutional**: Institutional Asset Tracking & Issue Ledger
- **Monthly**: Monthly Pay Slip Generation & Salary Deductions
- **Exportable**: Exportable Verification Document Zip Bundles
- **Compliance,**: Compliance, Police Verification & Medical Records

---

## 3. Local Development Quickstart
```bash
# 1. Enter subsystem directory
cd New_apps/HR-Management

# 2. Install dependencies
pnpm install

# 3. Start local development server (Port 8013)
pnpm dev

# 4. Verify TypeScript
pnpm type-check

# 5. Build production bundle
pnpm build
```

---

## 4. Repository Structure
```text
├── .agent/             # AI agent guidelines, context & architectural decisions
├── .github/            # CI/CD workflows and pull request templates
├── .husky/             # Pre-commit hooks for secret leaks and type checking
├── .vscode/            # Standardized editor settings and extensions
├── docs/               # In-depth architectural, backend, and deployment guides
├── src/
│   ├── hooks/          # Self-contained hooks (useTranslation, etc.)
│   ├── stores/         # Standalone Zustand state stores
│   ├── styles/         # Identical globals.css with Mukta font & dark HSL tokens
│   ├── ui/             # Complete suite of base UI components (@vidyafloww/ui)
│   ├── App.tsx         # Standalone institutional app shell
│   ├── main.tsx        # React 19 mount point
│   └── HRManagementModule.tsx # Full production UI module
├── .env.example        # Environment variables template
├── AGENTS.md           # Permanent operating guidelines (strict sharp borders, zero secrets)
├── API_DOCUMENTATION.md# REST & WebSocket API catalog
├── CHANGELOG.md        # Release versioning
├── SECURITY.md         # Vulnerability reporting & zero-secrets rules
├── package.json        # Standalone scripts & dependencies
├── tailwind.config.ts  # Matching HSL color palette & sharp geometric borders
├── tsconfig.json       # Strict TypeScript config with path aliases
├── turbo.json          # Turbo task pipeline configuration
└── vite.config.ts      # Standalone Vite configuration (Port 8013)
```

---

## 5. Visual Styling & Parity
This standalone subsystem features 100% visual parity with the VidyaFloww core platform:
- **Font Stack**: `Mukta` humanist sans for balanced Latin and Devanagari script rendering.
- **Theme**: High-contrast, dark-first institutional aesthetic (`#09090b` background, `#141414` cards).
- **Geometric Borders**: Strict sharp radius (`rounded-[4px]`, `rounded-sm`, `rounded-md`).
