# TechVault Admin - Development Roadmap & Tasks

## 🎯 Purpose
To build a premium, AI-augmented administrative suite for TechVault that automates the tedious parts of inventory management—specifically product research, content generation, and media creation—using a decentralized network of n8n-hosted AI agents (Virtual Employees).

## 🌍 Overview
The system currently handles basic inventory management. The goal is to transform it into an "Autopilot" platform where adding a laptop requires only a model name, and the AI handles the specs, description, pricing suggestions, and marketing copy.

---

## 🛠️ Implementation Plan (Short-Term)
1.  **Phase 1: Knowledge Extraction**: Implement the "Researcher Agent" via n8n to fetch technical data from the web (laptop specs, etc.).
2.  **Phase 2: Agent Integration**: Migrate local AI controllers to dedicated n8n webhooks to allow for multi-agent workflows.
3.  **Phase 3: Experience Layer**: Enhance the UI with premium animations (shimmer loading), glassmorphic components, and real-time task monitoring.

---

## 🔥 Priorities
- **CRITICAL**: External Product Data Fetching (Laptop specs automation).
- **HIGH**: n8n Agent Orchestration (Moving logic to n8n).
- **MEDIUM**: Task Monitoring System (UI to track agent progress).
- **LOW**: Global Search & Bulk Import.

---

## 🚀 Task List

### 1. Automated Product Data Fetching (Laptop Focus)
- [ ] **[CRITICAL]** Research & Select Data Source (Icecat vs. SerpAPI + LLM Scraper).
- [ ] **[HIGH]** Create Backend Route: `POST /api/products/research-external`.
- [ ] **[HIGH]** Implement n8n "Researcher Agent" workflow to fetch & structure laptop specs.
- [ ] **[MEDIUM]** Add "Fetch Details" button to `ProductModal.tsx` with glassmorphic loading state.
- [ ] **[MEDIUM]** Implement auto-mapping of fetched JSON to `formData.specs`.

### 2. AI Agents & Orchestration (n8n)
- [ ] **[HIGH]** Create visual workflow/diagram for the "Virtual Office" (Copywriter -> Designer -> SEO).
- [ ] **[HIGH]** Set up Copywriter Agent: Refactor current local AI logic to an n8n webhook.
- [ ] **[MEDIUM]** Set up Graphic Designer Agent: Integrate DALL-E/Midjourney via n8n for product mockups.
- [ ] **[MEDIUM]** Set up Customer Support Agent: Draft logic for handling inventory queries.

### 3. Inventory Management Enhancements
- [ ] **[MEDIUM]** Update Inventory Table with better status badges and action tooltips.
- [ ] **[MEDIUM]** Finalize the "AI Suggest" shimmer animation in the description textarea.
- [ ] **[LOW]** Implement a category selection dropdown (fetched from backend) in the modal.

### 4. System Architecture & Task Management
- [ ] **[HIGH]** Design database schema for `agent_tasks` (id, agent_type, status, payload, result).
- [ ] **[MEDIUM]** Create a "Task Monitor" dashboard to view background agent progress.
- [ ] **[MEDIUM]** Implement structured logging (Winston/Pino) to track AI agent failures.
- [ ] **[LOW]** Audit n8n webhook security (API Keys/Auth headers).

### 5. Code Review & Refactoring
- [ ] **[MEDIUM]** Refactor `ProductModal.tsx` to extract sub-components (SpecRow, MediaUpload).
- [ ] **[LOW]** Update technical documentation for the new Research Service.