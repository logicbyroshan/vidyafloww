# VidyaFlow

<div align="center">

**Enterprise School Management Platform**

*Unifying every aspect of educational institution management into one cohesive digital ecosystem*

[![CI](https://github.com/your-org/vidyaflow/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/vidyaflow/actions/workflows/ci.yml)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)](https://python.org)
[![Django](https://img.shields.io/badge/Django-5.x-green?logo=django)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://typescriptlang.org)

</div>

---

## 🎯 Project Overview

VidyaFlow is a production-grade, multi-tenant **school management platform** built for educational institutions
of all sizes. It consolidates admissions, academics, attendance, examinations, finance, HR, LMS, communication,
and AI-powered insights into a single platform accessible via web, mobile, and desktop.

### Vision

> *"Empower every school to operate with the efficiency of a world-class institution."*

VidyaFlow eliminates the fragmented, paper-based, and siloed workflows that bog down educational
administration — replacing them with a unified, intelligent, and beautifully designed platform.

---

## 🏗️ Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Python | 3.13 | Primary language |
| Django | 5.x | Web framework |
| Django REST Framework | 3.15 | API framework |
| PostgreSQL | 16 | Primary database |
| Redis | 7 | Cache & message broker |
| Celery | 5.x | Async task queue |
| Django Channels | 4.x | WebSocket / real-time |

### Web App
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| Vite | 5 | Build tool |
| TypeScript | 5.6 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| shadcn/ui | latest | Component library |
| TanStack Router | 1.x | Client-side routing |
| TanStack Query | 5.x | Server state management |
| Zustand | 5.x | Global client state |
| React Hook Form | 7.x | Form management |
| Zod | 3.x | Schema validation |

### Mobile App
| Technology | Purpose |
|-----------|---------|
| React Native | Cross-platform mobile |
| Expo | Development platform |
| TypeScript | Type safety |

### Desktop App
| Technology | Purpose |
|-----------|---------|
| Electron | Desktop shell |
| React | UI framework |
| TypeScript | Type safety |

### Monorepo Tools
| Tool | Purpose |
|------|---------|
| pnpm | Package manager |
| TurboRepo | Monorepo build system |
| Poetry | Python dependency management |

---

## 📁 Repository Layout

```text
vidyaflow/
├── apps/
│   ├── backend/          Django + DRF API server
│   ├── web/              React 19 web application
│   ├── mobile/           React Native + Expo app
│   └── desktop/          Electron desktop app
├── packages/
│   ├── api/              Typed HTTP client
│   ├── ui/               Shared UI components
│   ├── types/            TypeScript type definitions
│   ├── validation/       Shared Zod schemas
│   ├── constants/        Routes, roles, status codes
│   ├── hooks/            Shared React hooks
│   ├── utils/            Utility functions
│   ├── config/           App configuration
│   ├── themes/           Design tokens
│   ├── icons/            Custom icons
│   └── assets/           Shared assets
├── docs/                 12 documentation files
├── scripts/              Build & utility scripts
├── docker/               Dockerfiles + Compose
├── nginx/                Nginx configuration
├── .github/              CI/CD workflows
└── .vscode/              Editor settings
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.13+
- **Node.js** 20+
- **pnpm** 9+ — `npm install -g pnpm`
- **Poetry** — `pip install poetry`
- **Docker Desktop** (for PostgreSQL + Redis)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/vidyaflow.git
cd vidyaflow

# Install all JavaScript/TypeScript dependencies
pnpm install
```

### 2. Start Infrastructure

```bash
docker compose -f docker/docker-compose.yml up postgres redis -d
```

### 3. Set Up Backend

```bash
cd apps/backend

# Install Python dependencies
poetry install

# Create environment file
cp ../../.env.example ../../.env
# Edit .env with your local values

# Run database migrations
poetry run python manage.py migrate

# Start the development server
poetry run python manage.py runserver
```

Backend API available at: **http://localhost:8000**
API Docs at: **http://localhost:8000/api/docs/swagger/**

### 4. Start Web App

```bash
# From project root
pnpm dev --filter=@vidyaflow/web

# Or from the web directory
cd apps/web && pnpm dev
```

Web app available at: **http://localhost:3000**

### 5. Start Celery Worker (Optional)

```bash
cd apps/backend
poetry run celery -A config.celery worker --loglevel=info
```

---

## 🔄 Development Workflow

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Lint all packages |
| `pnpm type-check` | TypeScript type check all packages |
| `pnpm test` | Run all test suites |
| `pnpm format` | Format all files with Prettier |
| `pnpm clean` | Clean all build artifacts |

### Turbo Filters

```bash
# Run only web app
pnpm dev --filter=@vidyaflow/web

# Build a specific package
pnpm build --filter=@vidyaflow/types

# Run tests for changed packages only
pnpm test --filter=[HEAD^1]
```

### Backend Commands

```bash
cd apps/backend

# Create migrations
poetry run python manage.py makemigrations

# Apply migrations
poetry run python manage.py migrate

# Create superuser
poetry run python manage.py createsuperuser

# Run tests
poetry run pytest

# Run linter
poetry run ruff check .
poetry run ruff format .
```

---

## 📐 Coding Standards

All code must pass:
- **Ruff** (Python) — lint + format
- **ESLint** (TypeScript) — lint
- **Prettier** (TypeScript/CSS) — format
- **TypeScript strict mode** — no `any`

See [docs/04-coding-standards.md](docs/04-coding-standards.md) for detailed standards.

---

## 🌿 Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `release/*` | Release preparation |
| `hotfix/*` | Emergency production fixes |

See [docs/10-git-workflow.md](docs/10-git-workflow.md) for full workflow details.

---

## 📚 Documentation

| Document | Contents |
|----------|---------|
| [01 - Project Overview](docs/01-project-overview.md) | Vision, goals, users, modules |
| [02 - Architecture](docs/02-architecture.md) | System design, layers, patterns |
| [03 - Folder Structure](docs/03-folder-structure.md) | Where code lives and why |
| [04 - Coding Standards](docs/04-coding-standards.md) | Style guides and rules |
| [05 - API Guidelines](docs/05-api-guidelines.md) | REST API design standards |
| [06 - Database Guidelines](docs/06-database-guidelines.md) | Schema, migrations, queries |
| [07 - Permissions](docs/07-permissions.md) | RBAC and access control |
| [08 - Module Development](docs/08-module-development.md) | Adding new modules |
| [09 - UI Guidelines](docs/09-ui-guidelines.md) | Design system and components |
| [10 - Git Workflow](docs/10-git-workflow.md) | Branching and PRs |
| [11 - Deployment](docs/11-deployment.md) | Local and production setup |
| [12 - Roadmap](docs/12-roadmap.md) | Feature development plan |

---

## 🗺️ Roadmap

| Phase | Status | Focus |
|-------|--------|-------|
| 1 — Foundation | ✅ Complete | Monorepo scaffold, configs, docs |
| 2 — Auth & Multi-tenancy | 🔜 Next | Login, roles, organizations |
| 3 — Students & Academics | 📅 Planned | Core academic management |
| 4 — Examinations | 📅 Planned | Exams, grades, report cards |
| 5 — Finance | 📅 Planned | Fees, payments, invoices |
| 6 — Communication | 📅 Planned | Notifications, messaging |
| 7 — HR | 📅 Planned | Staff, payroll, leave |
| 8 — LMS | 📅 Planned | Learning management |
| 9 — Advanced Modules | 📅 Planned | Library, transport, hostel |
| 10 — AI & Analytics | 📅 Planned | AI assistant, dashboards |
| 11 — Enterprise | 📅 Planned | Scale, compliance, white-label |

---

## 🔒 Internal Development Workflow

1. Review internal [Coding Standards](docs/04-coding-standards.md)
2. Follow [Git Workflow](docs/10-git-workflow.md)
3. Create feature branches: `feature/VF-<ticket>-<description>`
4. Ensure all unit and integration tests pass locally before pushing
5. Submit internal Pull Requests against `develop`

---

## 📄 License

Proprietary — All rights reserved. VidyaFlow Team, 2026.

---

<div align="center">

Built with ❤️ by the VidyaFlow Team

</div>
