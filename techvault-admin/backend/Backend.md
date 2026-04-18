# ⚙️ TechVault Backend Documentation

> High-performance, AI-integrated REST API middleware for the TechVault Admin ecosystem.
> Built with **TypeScript + Express**, following clean architecture principles and connected to **Supabase (TechVault schema)**.

---

## 📋 Table of Contents

1. [Project Purpose](#-project-purpose)
2. [Architecture Overview](#-architecture-overview)
3. [File Reference](#-file-reference)
4. [Environment Configuration](#-environment-configuration)
5. [API Reference](#-api-reference)
6. [Supabase Schema Configuration](#-supabase-schema-configuration)
7. [Security & Middleware](#-security--middleware)
8. [Queue System](#-queue-system)
9. [AI Service](#-ai-service)
10. [Scripts](#-scripts)
11. [Common Errors & How to Fix Them](#-common-errors--how-to-fix-them)
12. [Development Commands](#-development-commands)

---

## 🎯 Project Purpose

The TechVault backend acts as a **secure middleware layer** between the Next.js admin frontend and the Supabase database. It:

- Provides all **CRUD endpoints** for managing the `TechVault.Products` table.
- Runs **AI-powered semantic search** using Groq LLM and vector embeddings.
- Processes **background jobs** (e.g., order emails) via BullMQ + Redis queues.
- **Validates authentication tokens** so only authorized users can mutate data.

> [!IMPORTANT]
> The backend uses the `service_role` Supabase key — this key bypasses Row Level Security. Never expose it to the frontend or public clients. Keep it strictly in the backend `.env`.

---

## 🏗 Architecture Overview

```text
backend/
├── src/
│   ├── index.ts              # Server entry point — starts the HTTP listener
│   ├── app.ts                # Express app setup — registers middleware & routes
│   ├── controllers/
│   │   ├── product.controller.ts   # Handles all product CRUD logic
│   │   └── search.controller.ts    # Handles AI semantic search logic
│   ├── routes/
│   │   ├── product.routes.ts       # Maps HTTP verbs to product controller methods
│   │   └── search.ts               # Maps POST /api/search to search controller
│   ├── services/
│   │   ├── supabase.service.ts     # Singleton Supabase client (service_role)
│   │   └── ai.service.ts           # Groq AI client (embeddings + chat)
│   ├── middleware/
│   │   ├── auth.ts                 # requireAuth — validates Supabase JWT tokens
│   │   └── errorHandler.ts         # Global error handler for all uncaught errors
│   ├── queues/
│   │   └── orderQueue.ts           # BullMQ queue for async order email jobs
│   └── scripts/
│       └── embedProducts.ts        # One-time script to generate product embeddings
├── .env                      # All secrets and config (never commit this)
├── setup_database.sql        # SQL script to create tables in Supabase
├── Backend.md                # This file
└── package.json
```

---

## 📄 File Reference

### `src/index.ts`
**Purpose:** The server entry point. Imports the Express app and binds it to a port.

- Reads `PORT` from `.env` (defaults to `4000`).
- Must be the first file run via `npm run dev`.
- Do **not** add route logic here — keep it only as the boot file.

---

### `src/app.ts`
**Purpose:** Configures and assembles the Express application.

Registered in this order:
1. `helmet()` — Security headers
2. `cors()` — Cross-origin request handling
3. `express.json()` — JSON body parsing
4. `GET /` — Root health indicator
5. `GET /api/health` — Uptime health check
6. Route handlers (`searchRouter`, `productRouter`)
7. `errorHandler` — **Must always be last**

> [!WARNING]
> If you add a new middleware after `errorHandler`, it will never execute. Always keep `errorHandler` as the absolute last `app.use()` call.

---

### `src/controllers/product.controller.ts`
**Purpose:** Orchestrates all Product CRUD operations.

| Method | Description | Supabase Target |
|--------|-------------|-----------------|
| `getProducts` | Fetch all products, sorted by newest | `TechVault.Products` |
| `getProductById` | Fetch a single product by `product_id` | `TechVault.Products` |
| `createProduct` | Insert a new product row | `TechVault.Products` |
| `updateProduct` | Update an existing product by `product_id` | `TechVault.Products` |
| `deleteProduct` | Delete a product by `product_id` | `TechVault.Products` |

**Important:** All queries use `.schema('TechVault').from('Products')`. This requires:
1. `TechVault` to be added to **Exposed Schemas** in Supabase API settings.
2. `service_role` to have `USAGE` permissions granted on the `TechVault` schema.

---

### `src/controllers/search.controller.ts`
**Purpose:** Handles AI-powered semantic product search.

**Flow:**
1. Receives `{ query: string }` from frontend.
2. Converts the query into a **768-dimension vector** using Groq's `nomic-embed-text-v1` model.
3. Calls the Supabase RPC function `match_products` which uses `pgvector` to find the 5 closest products.
4. Passes the matched products + original query to **Llama 3** for a human-readable AI recommendation.
5. Returns both `answer` (AI text) and `products` (raw array) to the frontend.

> [!NOTE]
> The `match_products` RPC function must be manually created in Supabase using `pgvector`. See `setup_database.sql` for the schema.

---

### `src/routes/product.routes.ts`
**Purpose:** Defines the URL-to-controller mapping for all product endpoints.

All routes are prefixed with `/api/products`. Routes are **currently public** (auth middleware is commented out for development).

> [!CAUTION]
> Before deploying to production, uncomment `requireAuth` in `product.routes.ts` to protect all write operations (POST, PUT, DELETE). Running without auth in production means anyone can create, edit, or delete products.

```typescript
// Uncomment these before production:
// router.post('/api/products', requireAuth, ProductController.createProduct);
// router.put('/api/products/:id', requireAuth, ProductController.updateProduct);
// router.delete('/api/products/:id', requireAuth, ProductController.deleteProduct);
```

---

### `src/routes/search.ts`
**Purpose:** Registers the `POST /api/search` endpoint. This route is **auth-protected** by default via `requireAuth`.

---

### `src/services/supabase.service.ts`
**Purpose:** Creates and exports a single reusable Supabase client instance configured with the `service_role` key.

- Uses `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` from `.env`.
- Throws an error at startup if either variable is missing.
- The service role key **bypasses Row Level Security** — use only on the server.

> [!CAUTION]
> Never import this service in frontend code. The `service_role` key gives unrestricted database access.

---

### `src/services/ai.service.ts`
**Purpose:** Wraps the Groq SDK for two AI operations.

| Method | Model Used | Description |
|--------|-----------|-------------|
| `createEmbedding(input)` | `nomic-embed-text-v1` | Converts text to a float array (vector) |
| `getChatCompletion(messages, model?)` | `llama3-70b-8192` | Generates natural language AI responses |

- Requires `GROQ_API_KEY` in `.env`.
- Throws an error at startup if the key is missing.

---

### `src/middleware/auth.ts`
**Purpose:** JWT authentication guard for protected routes.

- Extracts `Bearer <token>` from the `Authorization` header.
- Verifies the token with Supabase Auth (`supabase.auth.getUser(token)`).
- Attaches the decoded `user` object to `req.user` for downstream use.
- Returns `401` if no token or invalid token is provided.

---

### `src/middleware/errorHandler.ts`
**Purpose:** Global Express error handler. Must be registered last in `app.ts`.

- Catches any error passed via `next(error)` in a controller.
- Responds with a standardized `{ status, statusCode, message }` JSON body.
- Logs the full stack trace to the console for debugging.

---

### `src/queues/orderQueue.ts`
**Purpose:** BullMQ-powered background job queue for order processing.

- Creates an `orders` queue connected to Redis via `REDIS_URL`.
- `addOrderToQueue(orderId, userEmail, items)` — Adds a job to the queue.
- A `Worker` automatically picks up `send-confirmation` jobs and calls `sendOrderEmail`.

> [!NOTE]
> The `sendOrderEmail` function is currently a `console.log` placeholder. Replace it with actual email logic (e.g., Nodemailer or SendGrid) before going live.

> [!WARNING]
> If `REDIS_URL` is not set or Redis is not running, the queue will crash the backend on startup. Comment out the queue import in `app.ts` if you are not using it locally.

---

### `src/scripts/embedProducts.ts`
**Purpose:** A one-time script to generate and store vector embeddings for all products in `TechVault.Products`.

Run it with:
```powershell
npx ts-node src/scripts/embedProducts.ts
```

**Flow:**
1. Fetches all products from `TechVault.Products`.
2. For each product, creates an embedding from `name + description + category`.
3. Updates the product row with the generated `embedding` vector.

> [!IMPORTANT]
> This script must be re-run whenever new products are added or product descriptions change significantly, to keep AI search results accurate.

---

## 🔐 Environment Configuration

Create a `.env` file in the `backend/` directory. **Never commit this file to Git.**

```env
# ── Supabase ────────────────────────────────────────────────────────────────
# Your Supabase project URL (found in Project Settings > API)
SUPABASE_URL=https://<your-project-ref>.supabase.co

# Service Role Key — bypasses RLS. BACKEND ONLY. NEVER expose to frontend.
# Found in: Supabase Dashboard > Project Settings > API > service_role
SUPABASE_SERVICE_KEY=eyJ...

# ── Server ──────────────────────────────────────────────────────────────────
PORT=4000

# ── AI (Groq) ───────────────────────────────────────────────────────────────
# Get your key at: https://console.groq.com/
GROQ_API_KEY=gsk_...

# ── Redis (for BullMQ Queues) ────────────────────────────────────────────────
# Only required if using the order queue feature
REDIS_URL=redis://localhost:6379
```

---

## 🔌 API Reference

### System

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | None | Confirms API is running |
| `GET` | `/api/health` | None | Returns server uptime in seconds |

### Products (CRUD)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/products` | None (dev) | Returns all products, newest first |
| `GET` | `/api/products/:id` | None (dev) | Returns a single product by `product_id` |
| `POST` | `/api/products` | None (dev) | Creates a new product |
| `PUT` | `/api/products/:id` | None (dev) | Updates a product by `product_id` |
| `DELETE` | `/api/products/:id` | None (dev) | Deletes a product by `product_id` |

**POST / PUT Body Schema:**
```json
{
  "name": "Sony WH-1000XM5",
  "description": "Industry-leading noise cancelling headphones.",
  "price": 349.99,
  "brand": "Sony",
  "stock": 120,
  "rating": 4.8,
  "category_id": null
}
```

### AI Search

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/search` | JWT Required | Semantic AI product search |

```json
// Request
{ "query": "wireless headphones for travel" }

// Response
{
  "answer": "Based on your needs, I recommend...",
  "products": [{ ... }, { ... }]
}
```

---

## 🗄 Supabase Schema Configuration

The backend targets the `TechVault` custom schema (case-sensitive). For this to work:

### Step 1 — Expose the schema via API
1. Go to **Supabase Dashboard** → **Project Settings** → **API**.
2. Find the **"Extra schemas"** field.
3. Add `TechVault` to the list and save.

### Step 2 — Grant permissions (run in SQL Editor)
```sql
GRANT USAGE ON SCHEMA "TechVault" TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA "TechVault" TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA "TechVault" TO service_role;

-- For direct frontend access (if needed)
GRANT USAGE ON SCHEMA "TechVault" TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA "TechVault" TO anon, authenticated;
```

### Step 3 — Create the Products table
Run `setup_database.sql` in your Supabase SQL Editor if it does not already exist.

---

## 🚨 Common Errors & How to Fix Them

| Error | Cause | Fix |
|-------|-------|-----|
| `TypeError: fetch failed` | `SUPABASE_URL` is wrong or unreachable | Check the URL in `.env` matches your Supabase project |
| `Invalid schema: TechVault` | The schema is not exposed in Supabase API settings | Go to **Project Settings → API → Extra schemas** and add `TechVault` |
| `permission denied for schema TechVault` | `service_role` lacks USAGE on the schema | Run the `GRANT` SQL statements in the Supabase SQL Editor |
| `Could not find the table 'TechVault.Products'` | The `Products` table doesn't exist | Run `setup_database.sql` in Supabase SQL Editor |
| `Missing Supabase configuration` | `.env` vars not loaded | Ensure `.env` exists in `/backend` and variables are correct |
| `Cannot GET /` | Visiting the root URL before root route was added | Fixed — root route now returns "TechVault API is running" |
| `REDIS_URL` connection errors | Redis is not running | Run `docker run -d --name redis -p 6379:6379 redis` |

---

## 🚀 Development Commands

```powershell
# Install all dependencies
npm install

# Start the development server with hot reload (nodemon)
npm run dev

# Compile TypeScript to JavaScript (for production)
npm run build

# Start the compiled production server
npm start

# Run the product embedding script (one-time setup)
npx ts-node src/scripts/embedProducts.ts
```

---

*TechVault Backend Engineering | 2026*
