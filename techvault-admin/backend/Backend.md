# ⚙️ TechVault Backend Specification

High-performance, AI-integrated middleware for the TechVault ecosystem. Built with **TypeScript**, following clean architecture principles.

---

## 🏗 Modular Architecture

The backend is structured to separate concerns, making it easy to test and scale.

```text
src/
├── index.ts        # Server listener entry point
├── app.ts          # Express application setup
├── config/         # Environment variables & constants
├── controllers/    # Orchestrators (Routes <-> Services)
├── services/       # Core Logic (AI, DB, Queues)
├── middleware/     # Interceptors (Auth, Validation, Errors)
├── routes/         # Endpoint definitions
└── queues/         # Background job processors (BullMQ)
```

---

## 🚀 Service Layer Deep Dive

### 🧠 AI Service (`src/services/ai.service.ts`)
The AI engine is powered by **Groq** for lightning-fast inference.

> [!TIP]
> We use the `nomic-embed-text-v1.5` model for high-precision semantic search.

- **`createEmbedding`**: Converts text into 768-dimensional vectors.
- **`getChatCompletion`**: Generates human-like product recommendations using Llama 3.

### ⚡ Queue Service (`src/services/queue.service.ts`)
Uses **BullMQ** and **Redis** for reliable asynchronous task processing.
- Handles order notifications, image processing, and heavy AI computations.

---

## 🔌 API Reference

### 🏥 Health & Monitoring
- **`GET /api/health`**
- **Response**:
  ```json
  {
    "status": "ok",
    "uptime": 124.5,
    "timestamp": "2026-04-17T00:00:00Z"
  }
  ```

### 🔍 AI Semantic Search
- **`POST /api/search`**
- **Auth**: Bearer Token (Supabase JWT)
- **Body**:
  ```json
  {
    "query": "Professional mirrorless camera for low light"
  }
  ```
- **Process**:
  1. Generate vector from query.
  2. Call Supabase RPC `match_products`.
  3. Format results into premium UI objects.

---

## 🛠 Setup & Development

### Local Installation
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Configure `.env`:
   ```env
   PORT=4000
   SUPABASE_URL=...
   SUPABASE_SERVICE_KEY=...
   GROQ_API_KEY=...
   REDIS_URL=redis://localhost:6379
   ```
3. Start development server:
   ```powershell
   npm run dev
   ```

---

## 🔐 Security & Middleware
- **Helmet**: Secures the app by setting various HTTP headers.
- **CORS**: Restricted to authorized frontend origins only.
- **ErrorHandler**: Centralized middleware to catch and normalize errors.
- **requireAuth**: Validates user sessions against Supabase Auth.

---
*TechVault Backend Engineering | 2026*
