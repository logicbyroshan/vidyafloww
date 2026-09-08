# Fleet & Transport Management (परिवहन व वाहन बेड़ा प्रबंधन)

> Standalone Micro-Frontend Subsystem for **VidyaFloww**
> Production Subdomain: **https://transport.vidyafloww.com** · Local Dev Port: **8012**

---

## 1. Overview
Mission-critical fleet tracking and student bus route management subsystem supporting GPS telemetry, vehicle fitness compliance, route allocation, and driver licensing.

## 2. Features & Integrated Workflows
- **Live**: Live Vehicle GPS Telemetry & Speed Monitoring
- **Bus**: Bus Route & Stop Schedule Mapping
- **Vehicle**: Vehicle Compliance, Insurance & Pollution Audit
- **Student**: Student Route Allocation & Transportation Fee Sync
- **Driver**: Driver Contact & Emergency Guardian SOS Hub
- **Geo-Fencing**: Geo-Fencing & Arrival ETA Alerts

---

## 3. Local Development Quickstart
```bash
# 1. Enter subsystem directory
cd New_apps/Transport-Management

# 2. Install dependencies
pnpm install

# 3. Start local development server (Port 8012)
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
│   └── TransportModule.tsx # Full production UI module
├── .env.example        # Environment variables template
├── AGENTS.md           # Permanent operating guidelines (strict sharp borders, zero secrets)
├── API_DOCUMENTATION.md# REST & WebSocket API catalog
├── CHANGELOG.md        # Release versioning
├── SECURITY.md         # Vulnerability reporting & zero-secrets rules
├── package.json        # Standalone scripts & dependencies
├── tailwind.config.ts  # Matching HSL color palette & sharp geometric borders
├── tsconfig.json       # Strict TypeScript config with path aliases
├── turbo.json          # Turbo task pipeline configuration
└── vite.config.ts      # Standalone Vite configuration (Port 8012)
```

---

## 5. Visual Styling & Parity
This standalone subsystem features 100% visual parity with the VidyaFloww core platform:
- **Font Stack**: `Mukta` humanist sans for balanced Latin and Devanagari script rendering.
- **Theme**: High-contrast, dark-first institutional aesthetic (`#09090b` background, `#141414` cards).
- **Geometric Borders**: Strict sharp radius (`rounded-[4px]`, `rounded-sm`, `rounded-md`).
