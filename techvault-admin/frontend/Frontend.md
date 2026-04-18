

TechVault Frontend Documentation

The TechVault Admin Panel is built using Next.js 16, React 19, Tailwind CSS 4, and Supabase for authentication. It serves as the internal interface for managing the platform.

---

Project Purpose

This application is strictly for admin use. It is not the customer-facing site.

Admins can:

* Manage products through the Inventory page
* View overall performance on the Dashboard
* Use AI-powered search to find products
* Work with integrations like Supabase, Trello, and Google Sheets

All data changes go through the Express backend running on port 4000. Supabase is only used directly for authentication.

---

Architecture Overview

The project follows the Next.js App Router structure.

frontend/
src/
app/
layout.tsx
page.tsx
globals.css
components/
hooks/
inventory/
pages/Inventory/Inventory.tsx
lib/supabase/
.env.local
next.config.ts
tailwind.config.*
tsconfig.json

Key idea:

* app/ handles routing and layout
* components/ holds reusable UI
* pages/Inventory contains feature logic
* lib/supabase manages client setup

---

Key Files

layout.tsx
This wraps every page. It includes the navbar, sidebar, and global layout. Avoid adding heavy logic here since it runs on every route.

page.tsx
This is the dashboard at the root route. It displays summary data like totals and metrics.

globals.css
Used only for Tailwind base and global design tokens. Avoid placing page-specific styles here.

Inventory.tsx
This is the main CRUD interface for products. It handles:

* Fetching products
* Creating and editing items via modal
* Deleting with confirmation
* Stock indicators

API endpoints used:
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

lib/supabase

* client.ts is used in client components
* server.ts is used in server components
* middleware.ts keeps sessions refreshed

Do not mix client and server clients.

---

Environment Configuration

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_API_URL=[http://localhost:4000](http://localhost:4000)

Only variables prefixed with NEXT_PUBLIC_ are exposed to the browser. Never include the service role key here.

---

Authentication Flow

1. User logs in through Supabase
2. Session is stored in cookies
3. Token is retrieved using supabase.auth.getSession()
4. Token is sent to backend in Authorization header
5. Backend validates the request

Example:

const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;

---

Backend Communication

Standard fetch pattern:

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '[http://localhost:4000](http://localhost:4000)';

await fetch(`${apiUrl}/api/products`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
},
body: JSON.stringify(data)
});

Keep this consistent across all API calls.

---

Styling System

The UI follows a modern admin style with:

* Rounded containers
* Subtle blur effects
* Soft shadows
* Minimal animations

Color usage is based on Tailwind tokens:

* Primary: indigo
* Success: green
* Warning: amber
* Danger: red

Avoid hardcoding colors. Use Tailwind classes or variables.

---

Common Issues

Invalid schema: TechVault
This means the backend cannot access the schema. Expose it in Supabase and run:
GRANT USAGE ON SCHEMA "TechVault" TO service_role;

Failed to fetch products
Make sure the backend is running and the API URL is correct.

Module not found (@/...)
Check tsconfig.json paths configuration.

Blank page
Usually caused by missing environment variables or a layout error. Check the console.

Infinite loading
Check the Network tab in DevTools. The request is likely failing.

---

Development Commands

Install dependencies:
npm install

Run frontend:
npm run dev

Build:
npm run build

Start production:
npm start

Lint:
npm run lint

Run both frontend and backend at the same time for full functionality.

Frontend runs on port 3000
Backend runs on port 4000

---

