# TechVault Frontend | User Interface

This is the Next.js 16 frontend for the TechVault platform, featuring an AI-driven search experience and secure authentication.

---

## Technical Highlights

- **Next.js 16**: Utilizing the App Router and Turbopack for high-performance development and production.
- **Tailwind CSS 4**: Modern utility-first styling with enhanced CSS variables and nesting.
- **Supabase SSR**: Secure, server-side-ready authentication and data fetching.
- **Lucide Icons**: Consistent, beautiful iconography throughout the UI.

---
# Port Running
- Port: 3000

## Directory Structure

```text
frontend/
├── src/
│   ├── app/                # App Router (Global Layout & Routes)
│   │   ├── homepage/       # Main landing page experience
│   │   ├── login/          # Login & Signup experience
│   │   ├── product-details/# Product details dynamic page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Organized React components
│   │   ├── common/         # Generic reusable components (e.g., ProductCard)
│   │   ├── layout/         # Structural components (Navbar, Footer, Search)
│   │   ├── product/        # Product-specific feature components
│   │   └── homepage/       # Components unique to the homepage
│   ├── data/               # Static and mock data files
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Third-party library configurations (Supabase)
│   └── types/              # Centralized TypeScript definitions
└── public/                 # Static assets (logos, images, etc.)
```

---

## 🛠 Features

### 1. Unified Authentication
A modern login page supporting both **Google OAuth** and **Email/Password** (magic links available).
- **File**: `src/app/login/page.tsx`

### 2. AI Search Interface
Interactive search component that fetches semantic results from the backend and renders AI-generated natural language replies.
- **File**: `src/components/layout/AISearch.tsx`

### 3. Responsive Product Grid
Dynamic rendering of product matches with focus on visual consistency using a premium reusable `ProductCard`.
- **File**: `src/components/product/ProductCard.tsx`

---

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Configure Environment**:
   Ensure `frontend/.env.local` contains:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

---
*Documentation Updated: 2026-04-14*


# Frontend Registry

## Pages
- `src/app/homepage/page.tsx` - Main landing page.
- `src/app/product-details/page.tsx` - Detailed product view.
- `src/app/login/page.tsx` - Login & Signup experience.

## Components

### Layout
- `src/components/layout/Navbar.tsx` - Global navigation bar.
- `src/components/layout/Footer.tsx` - Global footer.
- `src/components/layout/AISearch.tsx` - AI-powered search interface.

### Product
- `src/components/product/ProductCard.tsx` - Premium reusable product card.
- `src/components/product/ProductDetails.tsx` - Main content for product details.
- `src/components/product/Categories.tsx` - Category navigation carousel.
- `src/components/product/TrendingProducts.tsx` - Grid of featured/trending items.

### Homepage Specific
- `src/components/homepage/HeroSection.tsx` - Main landing graphic and CTA.

## Data & Types
- `src/data/mockProducts.ts` - Structured mock data for products.
- `src/types/product.ts` - Shared product-related TypeScript interfaces.
