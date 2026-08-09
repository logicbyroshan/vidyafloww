# 09 — UI Guidelines

## Design System

VidyaMaxx uses **shadcn/ui** as its component foundation, built on top of **Tailwind CSS**
and **Radix UI** primitives. All custom UI components should extend this system.

## Typography

- **Primary Font**: Inter (Google Fonts)
- **Monospace Font**: JetBrains Mono (for code, IDs)
- **Scale**: Tailwind default — `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`

## Color System

Uses CSS custom properties (defined in `globals.css`), aligned with shadcn/ui conventions:

| Token | Usage |
|-------|-------|
| `--background` | Page background |
| `--foreground` | Primary text |
| `--primary` | Brand color, CTAs |
| `--secondary` | Secondary actions |
| `--muted` | Subtle backgrounds |
| `--muted-foreground` | Secondary text |
| `--destructive` | Error states, delete actions |
| `--border` | Dividers, input borders |

## Component Principles

1. **Composition over configuration** — Build complex UIs from small, focused components.
2. **No inline styles** — Use Tailwind classes only.
3. **Accessible by default** — Use Radix UI primitives for interactive components.
4. **Responsive first** — All layouts must work on 375px to 2560px.

## Feature-Level Component Organization

```
features/students/
├── components/
│   ├── StudentCard.tsx         Display component
│   ├── StudentCard.test.tsx    Tests co-located
│   ├── StudentList.tsx         List with pagination
│   └── StudentFormDialog.tsx   Form in a dialog
├── pages/
│   ├── StudentsPage.tsx        List page
│   └── StudentDetailPage.tsx   Detail page
└── api/
    └── useStudents.ts          TanStack Query hooks
```

## Loading & Error States

Every data-fetching component must handle:
1. **Loading state** — Use `<Skeleton />` components
2. **Error state** — Use `<ErrorBoundary />` + toast notification
3. **Empty state** — Use `<EmptyState />` with an action button
4. **Success state** — The actual content

## Forms

- Use **React Hook Form** + **Zod** for all forms
- Import Zod schemas from `@vidyamaxx/validation` for shared validation
- Use shadcn/ui `<Form>` components for consistent styling
- Show field-level errors inline, not as toasts

## Accessibility (a11y) Requirements

- All interactive elements must be keyboard-accessible
- All images must have meaningful `alt` text
- All form inputs must have visible labels
- Color alone must never convey meaning
- Focus indicators must be visible

## Icons

- Use `lucide-react` for UI icons (included with shadcn/ui)
- Use `@vidyamaxx/icons` for custom VidyaMaxx-specific icons

## Dark Mode

- Always test in both light and dark mode
- Use CSS variables (not hardcoded colors) to ensure theme support
- Toggle controlled by user preference stored in Zustand + localStorage

---

*Last updated: 2026-07-02*
