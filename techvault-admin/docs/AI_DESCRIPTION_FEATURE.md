# AI Description Suggestion Feature

This document outlines the architecture, flow, file changes, and troubleshooting steps taken to implement the AI-powered product description generation feature in the TechVault Admin application.

## 1. Feature Overview
The **AI Suggest** feature allows administrators to automatically generate compelling, tech-focused product descriptions in the Inventory Management modal. It uses product metadata (Name, Brand, and Technical Specifications) to prompt a Large Language Model (currently configured to use Groq's `groq/compound` model) to write the description.

## 2. Detailed Flow
1. **User Action**: The admin opens the "Add/Edit Product" modal, enters a product name, and clicks the **"AI Suggest" (Sparkles)** button.
2. **Frontend Loading State**: The frontend sets `isGeneratingAI` to true. A glassmorphic shimmer animation appears over the textarea, disabling the button and dimming the input.
3. **API Request**: `handleGenerateAIDescription` in `InventoryTable.tsx` sends a `POST` request to `http://localhost:4000/api/ai/generate-description` with the `name`, `brand`, and `specs` in the body, authenticated via a Bearer token.
4. **Backend Routing**: `app.ts` routes the request to `ai.routes.ts`, which passes it to `AIController.generateProductDescription`.
5. **Prompt Construction**: The `AIController` validates the input and constructs a tailored system prompt instructing the AI to act as an expert TechVault copywriter.
6. **AI Service Call**: The controller calls `AIService.getChatCompletion(prompt)`, which utilizes the Groq SDK to request a completion using the `groq/compound` model.
7. **Response & UI Update**: The backend returns the generated text. The frontend receives it, populates the `description` form data, and removes the loading state.

## 3. File Changes

### Frontend
- **`frontend/src/app/pages/Inventory/InventoryTable.tsx`**
  - Added the `isGeneratingAI` state.
  - Implemented the `handleGenerateAIDescription` fetch logic.
  - Added the **"AI Suggest"** button with dynamic styling next to the description label.
  - Added an absolute-positioned shimmer loading bar over the textarea.
- **`frontend/src/app/globals.css`**
  - Added `@keyframes shimmer` for the loading animation.

### Backend
- **`backend/src/routes/ai.routes.ts`** `[NEW]`
  - Defines the `POST /generate-description` and `GET /health` routes.
- **`backend/src/controllers/ai.controller.ts`** `[NEW]`
  - Extracts request body, builds the prompt, and handles error responses.
- **`backend/src/app.ts`**
  - Explicitly registered the AI routes using `app.use('/api/ai', aiRouter)`.
- **`backend/src/index.ts`**
  - Moved `import 'dotenv/config'` to the very top to guarantee environment variables are loaded before any routers or services are initialized.
- **`backend/src/services/ai.service.ts`**
  - Refactored to initialize the Groq client lazily (`getGroqClient()`) inside the methods rather than at the top level.
  - Configured the default model for chat completions to `'groq/compound'`.

## 4. Troubleshooting Log

During development, we encountered a few issues that were systematically resolved:

### 404 Route Not Found
- **Issue**: The frontend was receiving a `404 Not Found` when trying to hit `/api/ai/generate-description`.
- **Diagnosis**: We initially thought it was a pathing mismatch. We standardized the route prefixes in `app.ts`. However, the 404 persisted. We discovered that the `nodemon` process had frozen in the background and was not restarting the server to pick up the newly created route files.
- **Resolution**: We killed the stuck Node process running on port 4000 and restarted `npm run dev`. The routes immediately became active.

### Application Crashing on Missing API Keys
- **Issue**: If `GROQ_API_KEY` was missing from `.env` or loaded too late, the `AIService` would throw an error on import, causing the entire backend to crash on startup.
- **Resolution**: 
  1. Moved `dotenv/config` to line 1 of `index.ts`.
  2. Changed `AIService` to instantiate the Groq client dynamically inside the methods. This ensures the app can start successfully, and only the AI features will fail if the key is missing.

### AI Model Selection Journey
- We initially configured the service to use Groq's `llama3-70b-8192`.
- We briefly attempted to switch to Google Gemini (`gemini-1.5-flash` and `gemini-3.1-pro-preview`). We updated the code to use the `@google/generative-ai` SDK and adapted the prompt format to handle Gemini's strict `user`/`model` role structure.
- Due to API key quota limitations, we successfully rolled back the codebase to use the **Groq SDK**.
- We tested Gemma via Groq (`gemma2-9b-it`).
- We finalized the implementation using Groq's new **`groq/compound`** model.
