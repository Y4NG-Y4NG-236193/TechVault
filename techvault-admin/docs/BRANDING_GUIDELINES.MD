# Branding Guidelines: "The Vault"

The "The Vault" branding is an industrial minimalist design system created for TechVault-Admin. It emphasizes precision, high contrast, and structural clarity, moving away from generic "vibe-coded" aesthetics.

## 🎨 Color Palette

The system follows a high-contrast industrial aesthetic using defined brand tokens.

### Core Tokens
- **Carbon (`--brand-carbon`)**: `#09090b` — Main background and high-contrast text.
- **Surface (`--brand-surface`)**: `#18181b` — Borders, cards, and secondary backgrounds.
- **Cyber Lime (`--brand-lime`)**: `#bef264` — Primary accent, active states, and call-to-action buttons.
- **Pure White (`--brand-white`)**: `#fafafa` — High-contrast primary text and main container backgrounds.

### Support Colors
- **Muted Text**: `zinc-400` / `zinc-500` — Secondary labels, headers, and descriptions.
- **Critical**: `rose-500` — Destructive actions (e.g., Delete, Logout).
- **UI Borders**: `zinc-100` / `zinc-200` — Subtle separation lines.

## 🔠 Typography

The system uses the **Geist** font family for a modern, engineering-focused look.

### Brand Logo
- **Font**: Geist Sans
- **Weight**: Black (900)
- **Tracking**: `-0.05em`
- **Case**: Uppercase
- **Aesthetic**: Bold, industrial, and solid.

### UI Headers & Labels
- **Headers**: 10px / 0.625rem, Bold (700), `0.2em` tracking, Uppercase.
- **Input Labels**: 10px, Bold (700), Uppercase, tracking-widest.
- **Navigation**: 14px / 0.875rem, Medium (500).

### Button Typography
- **Size**: 12px / 0.75rem (`text-xs`).
- **Weight**: Black (900) or Bold (700).
- **Tracking**: `0.2em` (widest).
- **Case**: Uppercase.

## 🔘 Buttons & Interactions

### Primary Action (Save/Register)
- **Style**: `bg-brand-lime`, `text-brand-carbon`.
- **Corner Radius**: `rounded-xl` (12px).
- **Hover**: `scale-[1.02]`, `border-black`.

### Secondary Action (Discard/Cancel)
- **Style**: `bg-transparent`, `border-2 border-zinc-200`, `text-zinc-500`.
- **Hover**: `bg-zinc-900`, `text-white`.
- **Corner Radius**: `rounded-xl`.

### Interactive States
- **Active Navigation**: Indicated by a `2px` left border (`border-l-2`) in **Cyber Lime**.
- **Hover Scale**: Use `hover:scale-[1.02]` and `active:scale-[0.98]` for tactile feedback.

## 📐 Layout & Geometry

### Corner Radii (Geometric Profile)
- **Modals & Large Cards**: `rounded-3xl` (24px).
- **Inputs & Buttons**: `rounded-xl` (12px) or `rounded-2xl` (16px).
- **Small UI Elements**: `rounded-lg` (8px).

### Border Strategy
- Use sharp, 1px lines (`border-zinc-100` or `border-zinc-200`) for structural separation.
- Avoid heavy shadows; use thin, high-contrast borders instead.

### Scrollbar
- **Style**: Custom sleek scrollbar.
- **Width**: 6px.
- **Thumb**: `zinc-200`, `rounded-20px`.

## 🖼️ Iconography
- **Library**: Lucide React.
- **Size**: 20px (h-5/w-5) for navigation; 16px (h-4/w-4) for utility actions.
- **Style**: Line icons, colored with `brand-lime` for focus or `zinc-400` for default.

---

*This document serves as the single source of truth for all branding decisions within the TechVault ecosystem.*
