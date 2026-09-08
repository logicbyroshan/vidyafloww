# Hostel & Dormitory Management (छात्रावास व शयन कक्ष प्रबंधन)

> Standalone Micro-Frontend Subsystem for **VidyaFloww**
> Production Subdomain: **https://hostel.vidyafloww.com** · Local Dev Port: **8011**

---

## 1. Overview
Residential campus administration subsystem featuring room occupancy matrices, 7-day nutritional mess planning, campus outpasses, and nightly dorm roll calls.

## 2. Features & Integrated Workflows
- **Interactive**: Interactive Room & Bed Occupancy Matrix
- **Slide-Over**: Slide-Over Resident Allocation & Vacate Drawer
- **7-Day**: 7-Day Food Timetable (Breakfast, Lunch, Dinner)
- **Campus**: Campus Outpass & Leave Duration Ledger
- **09:30**: 09:30 PM Night Roll Call with 4-Way Status Toggles
- **Biometric**: Biometric Gate Scanner & Emergency Guardian Sync

---

## 3. Local Development Quickstart
```bash
# 1. Enter subsystem directory
cd New_apps/Hostel-Management

# 2. Install dependencies
pnpm install

# 3. Start local development server (Port 8011)
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
│   └── HostelModule.tsx # Full production UI module
├── .env.example        # Environment variables template
├── AGENTS.md           # Permanent operating guidelines (strict sharp borders, zero secrets)
├── API_DOCUMENTATION.md# REST & WebSocket API catalog
├── CHANGELOG.md        # Release versioning
├── SECURITY.md         # Vulnerability reporting & zero-secrets rules
├── package.json        # Standalone scripts & dependencies
├── tailwind.config.ts  # Matching HSL color palette & sharp geometric borders
├── tsconfig.json       # Strict TypeScript config with path aliases
├── turbo.json          # Turbo task pipeline configuration
└── vite.config.ts      # Standalone Vite configuration (Port 8011)
```

---

## 5. Visual Styling & Parity
This standalone subsystem features 100% visual parity with the VidyaFloww core platform:
- **Font Stack**: `Mukta` humanist sans for balanced Latin and Devanagari script rendering.
- **Theme**: High-contrast, dark-first institutional aesthetic (`#09090b` background, `#141414` cards).
- **Geometric Borders**: Strict sharp radius (`rounded-[4px]`, `rounded-sm`, `rounded-md`).
