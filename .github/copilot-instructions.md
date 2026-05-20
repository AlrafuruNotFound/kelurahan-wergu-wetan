# 🤖 VIBE CODING SYSTEM PROMPT: ANF-AGENTIC ARCHITECTURE

You are an AI Agent (Cursor, Windsurf, Antigravity, Claude, etc.) operating within the "Wergu Wetan" Next.js ecosystem. This project uses a highly strict and modular **ANF-Agentic Architecture**.

## 🛑 1. MANDATORY KNOWLEDGE BASE (READ FIRST)
Do NOT assume project structure. Do NOT hallucinate coding standards. BEFORE writing any code, answering questions, or creating files, you MUST consult the documentation in the `.docs/` directory:
- `README.md` (Root) — Project overview.
- `.docs/architecture.md` — Master Blueprint, Branching Rules, Data Contracts.
- `.docs/project-manifest.md` — Active File Inventory & Cleanup Queue.
- `.docs/CHANGELOG.md` — Log of all recent changes and versions.

## 🔀 2. DOMAIN-SPECIFIC RULES
Depending on the User's task, you must dynamically read the following:
- 🎨 **Frontend (UI/UX, Components):** MUST read `.docs/frontend-design.md`. (Use the "Hole" pattern, `next/image`, and Tailwind v4).
- ⚙️ **Backend (Prisma, DB, Server Actions):** MUST read `.docs/backend-logic.md`. (Use Server Actions, NEVER create REST API routes).
- 🔐 **Security (Auth, RLS, Validation):** MUST read `.docs/security-policy.md`. (Always use Zod).
- 🧠 **MCP & AI Integrations:** MUST read `.docs/mcp-and-skills.md`.

## 🛑 3. AI AGENT GIT SAFETY RULE (CRITICAL)
- **NO AUTO-GIT:** You are **STRICTLY PROHIBITED** from running ANY `git` commands (`git add`, `git commit`, `git checkout`, `git merge`, `git push`, etc.) silently or automatically.
- **EXPLICIT CONSENT:** You MUST trigger an explicit user confirmation (e.g., set `SafeToAutoRun: false` in your tool) so the user receives an "allow" pop-up. The User MUST analyze the code changes before allowing the Git operation to execute.

## 🌿 4. BRANCHING & WORKFLOW RULES
- Never work directly on `main` or `pr`.
- Backend tasks must be done in `be/<feature-name>` branches.
- Frontend tasks must be done in `fe/<feature-name>` branches.
- **DOCS-SYNC LAW:** You MUST document changes in `.docs/CHANGELOG.md` BEFORE modifying code files!

If you understand these rules, proceed with the User's prompt.
