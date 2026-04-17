# 🎨 TechVault Frontend Documentation

The TechVault frontend is a modern, high-performance web application built with **Next.js 16**, **Tailwind CSS 4**, and **Supabase**. It follows the **App Router** architecture for optimized performance and developer experience.

---

## 🏗 Project Architecture

The frontend is organized for scalability and modularity:

```text
src/
├── app/               # Next.js App Router (Pages, Layouts, API)
│   ├── homepage/      # Main discovery hub
│   ├── login/         # Authentication portal
│   ├── product-details/ # Dynamic product views
│   └── layout.tsx     # Global root layout (Fonts, Meta)
├── components/        # UI Component Library
│   ├── Admin-Dashboard/ # Administrative interfaces
│   ├── layout/        # Shared components (Navbar, Footer)
│   └── product/       # Product-specific atoms & molecules
├── lib/               # Utility libraries (Supabase client)
└── types/             # Centralized TypeScript definitions
```

---

## ⚡ Core Technologies

- **Next.js 16 (App Router)**: Utilizing React Server Components (RSC) for lightning-fast page loads and SEO.
- **Tailwind CSS 4**: A utility-first CSS framework for rapid UI development with a premium aesthetic.
- **Supabase SSR**: Secure, server-side authentication and real-time data synchronization.
- **Lucide React**: A beautiful and consistent icon set.

---

## 📂 Key Pages & Features

### 1. Discovery Hub (Homepage)
- **Path**: `/homepage`
- **Features**: Semantic AI search bar, categorized product listings, and trending tech showcases.
- **State**: Server-rendered for maximum performance.

### 2. Product Intelligence (Details)
- **Path**: `/product-details?id=[id]`
- **Features**: Rich media display, technical specifications, AI-generated insights, and cross-comparison tools.
- **Code**: [product-details/page.tsx](file:///c:/Portfolio%20Projects/TechVault-Admin/techvault-admin/frontend/src/app/product-details/page.tsx)

### 3. Secure Gatekeeper (Login)
- **Path**: `/login`
- **Features**: Integrated Supabase Auth flow supporting multiple providers and secure JWT management.

---

## 🛠 Setup & Development

### Local Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🎨 Styling & Design
We use a **Glassmorphic Design System** with custom Tailwind 4 color tokens to ensure a premium, tech-focused aesthetic.

> [!IMPORTANT]
> All custom styling should be defined in `globals.css` using CSS variables to maintain consistency across the application.

---
*TechVault Frontend Engineering | 2026*
