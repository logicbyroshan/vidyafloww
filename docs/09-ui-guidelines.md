# 09 — UI Guidelines & Design System

## Overview

VidyaMaxx uses a custom, high-density **AI-First Desktop Interface** built on top of **Tailwind CSS**, **Radix UI**, and custom UI component tokens (`@vidyamaxx/ui`). All application pages adhere to strict visual consistency and interaction standards.

---

## Key Layout & Viewport Rules

1. **Desktop-Only Viewport Restriction**:
   - Minimum supported width is **1000px**.
   - If accessed on viewports below 1000px, a blocking overlay prompts users to use the VidyaMaxx Mobile App.
2. **Fluid Typography Scaling**:
   - Root HTML font size uses CSS `clamp()`:
     ```css
     font-size: clamp(14px, 0.5vw + 9px, 18.5px);
     ```
   - Scales text smoothly and proportionally between 1000px and 1920px viewports, preserving layout density without font pixelation or overflow.

---

## Design System Tokens & Aesthetics

### Color Palette (Dark-Mode First)
- **Background**: Modern deep charcoal (`#09090b` / `bg-background`)
- **Card Container**: Layered dark card (`#18181b` / `bg-card`)
- **Primary Accent**: Vibrant Amber Orange (`#f97316` / `text-primary`)
- **Secondary Accent**: Slate Cyan (`#0891b2` / `text-secondary`)
- **Borders & Dividers**: Subtle gray border (`#27272a` / `border-border`)

### Border Radius Standard (Less Rounded)
- **Avatars & Profiles**: `rounded-lg` (rounded rectangle style)
- **Badges, Pills & Chips**: `rounded-md` (crisp modern tags)
- **Containers & Cards**: `rounded-xl`
- **Buttons**: `rounded-lg`
- *Note*: Fully rounded pills (`rounded-full`) are reserved only for tiny status indicators/dots.

### Focus & Hover Interactions
- **Input Focus**: Subtle border glow (`focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none`) instead of harsh browser outline rings.
- **Micro-Animations**: Clean 150ms transitions (`transition-all duration-200`) for interactive hover states.

---

## Slide-over & Resizable Drawers

- **Component Usage**: Used for `AIChatDrawer`, `NotificationsPanel`, and Candidate/Student Inspection drawers.
- **Resizable Drag Handle**:
  - Located on the left border of the drawer.
  - Features a subtle centered grip pill (`w-1 h-8 rounded-md bg-border group-hover:bg-primary/70`).
  - Width ranges from default **380px** up to **50vw** maximum.
  - Text selection is automatically disabled (`userSelect: 'none'`) during dragging.

---

## Component Standards

1. **Tables (`VFTable`)**: Full 100% width, sticky header, paginated, built-in search filters with subtle focus rings.
2. **Action Badges**: Standardized icon sizes (`h-3.5 w-3.5`), concise text labels, and `rounded-md` borders.
3. **Card Spacing**: Standardized internal padding (`p-5` or `p-6`) across all widgets and dashboard sections.

---

*Last updated: 2026-08-10*
