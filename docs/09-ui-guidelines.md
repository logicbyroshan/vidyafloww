# 09 — UI Guidelines & Design System

## Overview

VidyaMaxx uses a custom, high-density **AI-First Enterprise Desktop Interface** built on top of **Tailwind CSS 3.4**, **Radix UI Primitives**, **Framer Motion**, **TanStack Table**, **Recharts**, **cmdk**, **Sonner**, **Lenis**, and custom UI component tokens (`@vidyamaxx/ui`). All application pages adhere to strict visual consistency and interaction standards.

---

## Key Layout & Viewport Rules

1. **Desktop Viewport Restriction**:
   - Minimum supported width is **1000px**.
   - If accessed on viewports below 1000px, a blocking overlay prompts users to use the VidyaMaxx Mobile App (`SmallScreenBlocker`).
2. **Fluid Typography Scaling (Sofia Sans)**:
   - Root HTML font uses **Sofia Sans** with CSS `clamp()` scaling:
     ```css
     font-family: 'Sofia Sans', system-ui, -apple-system, sans-serif;
     font-size: clamp(15px, 0.3vw + 12px, 18px);
     letter-spacing: 0.015em;
     ```
   - Scales text smoothly and proportionally between 1000px and 1920px viewports without breaking container bounds or vertical button alignment.
3. **Sidebar Header & Combined Height Lock**:
   - Sidebar top logo container is locked to `h-24` (`6rem`), perfectly matching the combined height of Header (`h-12` / `3rem`) + Tabbar (`h-12` / `3rem`) across fluid typography scales.
   - Sidebar scrollbar is positioned on the far left edge (`.sidebar-left-scrollbar` with `direction: rtl` and subtle neutral gray thumb).
   - Sidebar collapse button uses `z-50` with `shadow-md` overlay.
4. **Header Navigation**:
   - Top Header features `Welcome,` + school logo image + `Springfield Academy` in place of breadcrumb links.

---

## Lenis & Physics Smooth Scroll System

1. **Main Viewport Scrolling (`AppShell.tsx`)**:
   - Initialized a **Lenis instance** hooked to the main content scroll container (`<main ref={mainRef}>`).
   - Configured with inertial easing `(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` for fluid physics scrolling.
2. **Sidebar Navigation Scrolling (`Sidebar.tsx`)**:
   - Dedicated Lenis instance initialized on `.sidebar-left-scrollbar` nav container.
3. **CSS Reset (`globals.css`)**:
   - Standard Lenis reset rules (`html.lenis`, `.lenis-smooth`, `[data-lenis-prevent]`) ensuring touch and mouse wheel scroll containment.

---

## Submodule Tabbar (`VFTabs`) Rules

1. **Single Viewport & No Dual Scrolling**:
   - The top tabbar is rendered at `sticky top-0 z-30` inside `<main>`.
   - Tabpanel content does NOT contain nested vertical `overflow-y-auto` scrollbars, making `<main>` the single, unified vertical scroll container.
2. **Horizontal Mouse Wheel & Native Event Isolation**:
   - Tabbar scroll container uses a **native non-passive wheel listener** (`{ passive: false }`) with `e.preventDefault()`.
   - Mouse wheeling over tabs scrolls tabs horizontally without scrolling the parent main page.
3. **Auto-Centering Smooth Scroll**:
   - Clicking or selecting any tab triggers `scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })` to focus active tabs.
4. **Zero Vertical Jitter**:
   - Container locked with `overflow-y-hidden h-full items-center no-scrollbar`.

---

## Standard Technology Stack Integrations

| Purpose | Integrated Library | Usage in `@vidyamaxx/ui` & `@vidyamaxx/web` |
|---|---|---|
| **Core UI** | React 19 + Tailwind CSS 3.4 | Core framework, `@tailwindcss/forms`, `@tailwindcss/typography` |
| **Components** | `@vidyamaxx/ui` | CVA (`class-variance-authority`), `clsx`, and `tailwind-merge` component system |
| **Accessible Primitives** | Radix UI | `@radix-ui/react-dialog` (`VFDialog`, `VFModal`, `VFDrawer`), `@radix-ui/react-select` (`VFSelect`), `@radix-ui/react-tabs`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip` |
| **Animations** | Framer Motion | `framer-motion` scale-in modal transitions, drawer slide-ins, backdrop blurs |
| **Smooth Scrolling** | Lenis | `lenis` smooth scroll instances in `AppShell.tsx` and `Sidebar.tsx` |
| **Icons** | Lucide | `lucide-react` (^1.23.0) + `@vidyamaxx/icons` package |
| **Charts** | Recharts | `@vidyamaxx/ui` exports `VFAreaChart`, `VFBarChart`, `VFPieChart` with dark theme tooltips and gradient fills |
| **Tables** | TanStack Table | `VFDataTable` powered by `@tanstack/react-table` v9 (sorting, global filtering, column toggles) |
| **Command / Search** | cmdk | `CommandPalette.tsx` (`⌘K` modal palette) |
| **Toasts** | Sonner | `ToastContainer.tsx` store-synced toast notifications |
| **Loading** | Skeleton | Native `animate-pulse bg-muted/40` skeleton states across cards and grids |

---

## Design System Tokens & Color Palette

### Color Palette (Dark-Mode First)
- **Background**: Deep charcoal (`#09090b` / `bg-background`)
- **Card Container**: Layered dark card (`#18181b` / `#0e1017` / `bg-card`)
- **Primary Accent**: Amber Orange (`#f97316` / `text-primary`)
- **Secondary Accent**: Slate Cyan (`#0891b2` / `text-secondary`)
- **Success Accent**: Emerald Green (`#16a34a` / `text-success`)
- **Borders & Dividers**: Subtle gray border (`#27272a` / `border-border`)

---

*Last updated: 2026-08-11*
