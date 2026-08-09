# @vidyamaxx/web

React 19 web application for VidyaMaxx — Enterprise School Management Platform.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 5** — build tool
- **TanStack Router** — type-safe routing
- **TanStack Query** — server state management
- **Zustand** — client state management
- **Tailwind CSS** + **shadcn/ui** — styling
- **React Hook Form** + **Zod** — forms and validation

## Development

```bash
# From the monorepo root
pnpm dev --filter=@vidyamaxx/web

# Or from this directory
pnpm dev
```

App runs at: `http://localhost:3000`

## Structure

```
src/
├── app/           # Root component, providers
├── assets/        # Static assets
├── components/    # Shared UI components
├── features/      # Feature modules (co-located by domain)
├── hooks/         # App-specific hooks
├── layouts/       # Page layout components
├── lib/           # Third-party library configuration
├── pages/         # Page components (placeholder)
├── routes/        # TanStack Router route definitions
├── services/      # API service layer
├── stores/        # Zustand stores
├── styles/        # Global CSS
├── types/         # App-specific TypeScript types
└── utils/         # App-specific utilities
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values.
