# Portal Web Terpadu Kelurahan Wergu Wetan

**Status:** ✅ v1.0.0 — Production Ready  
**Architecture:** ANF-Agentic (Vertical Slice Monolith — Next.js App Router)  
**Stack:** Next.js 16.2.6 + React 19 + TypeScript 5 + Tailwind v4 + Prisma + PostgreSQL (Supabase)  
**Rendering:** `force-dynamic` enforced on all pages — konten selalu real-time dari DB

---

## 📚 Quick Links

| Guide | Description |
|-------|-------------|
| **[🏗️ Architecture (Master Blueprint)](.docs/architecture.md)** | ANF-Agentic Architecture theory, branching strategy, data contracts, file ownership |
| **[⚙️ Backend Logic (BE Workspace)](.docs/backend-logic.md)** | Server Actions pattern, Prisma ORM, Zod validation, JWT auth, data mapping to FE |
| **[🎨 Frontend Design (FE Workspace)](.docs/frontend-design.md)** | Design system, component "hole" pattern, Tailwind v4 custom themes |
| **[🤖 MCP & AI Skills](.docs/mcp-and-skills.md)** | Panduan integrasi AI, prompt engineering, dan daftar Tools untuk LLM |
| **[🔐 Security Policy](.docs/security-policy.md)** | RLS enforcement, JWT, Zod validation, secrets management |
| **[🗺️ Roadmap](.docs/roadmap.md)** | Feature timeline, sprint tracking, priorities by branch |
| **[📝 Changelog](.docs/CHANGELOG.md)** | Log kronologis seluruh pembaruan arsitektur dan fitur |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20.x LTS)
- PostgreSQL (Supabase) or local instance
- npm or yarn

### Installation

1. Clone repository
2. Copy `.env.example` → `.env` and fill in values:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase/PostgreSQL credentials
   ```

3. Install dependencies & generate Prisma client:
   ```bash
   npm install
   ```

4. Run database migrations & seed data:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start development server:
   ```bash
   npm run dev
   # → http://localhost:3000 (Local Dev menggunakan HTTP agar bisa diakses via HP)
   ```

6. Login to admin panel:
   - URL: http://localhost:3000/admin/login
   - *Catatan: Referensi password akun admin default bisa dilihat di `prisma/seed.ts`*

---

## 📁 Project Structure (Logical Workspace)

```
wergu-wetan-app/
├── app/                        # Next.js App Router — FE workspace
│   ├── admin/                 # Protected CMS dashboard
│   ├── api/                   # Minimal — Excel template only
│   ├── globals.css            # Tailwind + CSS custom properties
│   └── tw-safelist.txt        # VITAL — dynamic Tailwind classes
│
├── actions/                   # Server Actions — BE workspace
│   ├── auth.action.ts
│   ├── berita.action.ts
│   └── ...
│
├── components/                # React Components — FE workspace
│   ├── user/                 # Public components
│   └── admin/                # Admin components
│
├── lib/                      # Utilities — BE workspace
│   ├── db.ts                # Prisma singleton
│   └── services/            # Business logic (optional)
│
├── prisma/                   # Database Schema — BE workspace
│   ├── schema.prisma
│   └── seed.ts
│
├── public/                   # Static assets (images, icons)
└── .docs/                   # 📚 ANF-Agentic Architecture documentation
    ├── CHANGELOG.md         # Single source of truth untuk log pembaruan
    ├── project-manifest.md  # Active inventory & cleanup queue
    ├── architecture.md      # Master blueprint (Peta Utama)
    ├── backend-logic.md     # BE patterns & SSR
    ├── frontend-design.md   # FE Design System, The "Hole" Pattern
    ├── mcp-and-skills.md    # AI tools & prompt integration
    ├── security-policy.md   # Security rules
    ├── roadmap.md           # Feature timeline
    ├── optimization-hardening.md # Advanced RAG-derived best practices
    ├── resync-protocol.md   # AI Protocol SOP for /resync trigger
    └── troubleshooting-network.md # Fix ghost processes & HSTS issues
```

**Workspace Separation (ANF Theory):**
- **BE workspace** (`be/*` branch): `actions/`, `lib/`, `prisma/` — Server Actions, Prisma, services
- **FE workspace** (`fe/*` branch): `components/`, `app/` — UI components, pages, layouts
- **Integration** (`pr` branch): Merge BE + FE → test data contracts (props "holes")
- **Production** (`main` branch): Stable, tested, deployed

---

## 🔐 Environment Variables

| Variable | Required? | Description |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ | Supabase/PostgreSQL connection string (pooled) |
| `DIRECT_URL` | ✅ | Direct DB connection (for migrations) |
| `JWT_SECRET` | ✅ | Random 64-char secret for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public URL of your app (e.g., `https://wergu-wetan.id`) |

See `.env.example` for template.

---

## 🗄️ Database (Supabase)

This project uses **Supabase PostgreSQL** with Prisma ORM.

**Connection pattern:**
- App server → `DATABASE_URL` (pooled, port 6543) — for runtime queries
- Migrations → `DIRECT_URL` (direct, port 5432) — for `prisma migrate`

**Models:** 14 Prisma models covering content, users, config, and operations.

---

## 🎨 Design System

- **Font:** Plus Jakarta Sans (Google Fonts)
- **Colors:** Brand palette (`brand-dark: #0D47A1`, `brand-base: #1565C0`)
- **Framework:** Tailwind CSS v4 (CSS Variables)
- **Icons:** Lucide React
- **Animations:** Framer Motion

Design tokens defined in `app/globals.css`. See [Frontend Design Guide](.docs/frontend-design.md) for full spec.

---

## 🏗️ ANF-Agentic Architecture

**Created by:** [AlrafuruNotFound](https://github.com/AlrafuruNotFound) — Agentic Architecture for Modular Development

This project implements the **ANF-Agentic Architecture** pattern (AlrafuruNotFound-Agentic Architecture), designed for:
- **Agentic collaboration:** Human developers + AI agents (Antigravity, Claude Code, etc.)
- **Modular structure:** Clear separation between BE/FE via branch-based workflow (`be/*`, `fe/*`, `pr`)
- **Vertical Slice:** Domain-centric organization (berita, potensi, layanan) over horizontal layers
- **Server Actions First:** Type-safe backend integration without REST overhead

**Key Innovation:** Explicit data contracts (props interfaces) as integration boundaries between BE (Server Actions) and FE (components).

📖 See **[`.docs/architecture.md`](.docs/architecture.md)** for full specification.

---

## 🤖 AI & Documentation Synchronization (The `/resync` Protocol)

In a multi-agent environment, AI Rules and Architectural Documentation can easily drift out of sync. To solve this, we implement a strict **Single Source of Truth (SSOT)** and an **AI Protocol**.

### For Human Developers:
If you edit `.cursorrules`, you MUST run the following command to securely synchronize your changes across all other agent rule files (`.clinerules`, `.windsurfrules`, etc.):
```bash
npm run sync-rules
```
*(Do NOT edit the other rule files manually. They are auto-generated and will be overwritten!)*

### For AI Agents:
If the user types the trigger phrase **`/resync`** in the chat, you MUST execute the AI SOP located in **[`.docs/resync-protocol.md`](.docs/resync-protocol.md)**.
This protocol forces the AI to automatically run `npm run sync-rules`, scan `git diff` for code changes, and intelligently rewrite the markdown documentation in `.docs/` to match the latest codebase.

---

## 📖 Documentation

Core documentation in **[`.docs/`](.docs/)**:

1. **[`CHANGELOG.md`](.docs/CHANGELOG.md)** — **BACA INI DULU** jika ada perubahan baru. Tempat mencatat semua pembaruan sistem.
2. **[`project-manifest.md`](.docs/project-manifest.md)** — Active inventory, file ownership, cleanup queue (sanitize codebase)
3. **[`architecture.md`](.docs/architecture.md)** — Master blueprint, ANF-Agentic Architecture theory, branching strategy, data contracts
4. **[`backend-logic.md`](.docs/backend-logic.md)** — Backend patterns: Server Actions, Prisma, Zod validation, JWT auth, database config
5. **[`frontend-design.md`](.docs/frontend-design.md)** — Frontend Design System: design tokens, component "hole" pattern, Stitch workflow, styling constraints
6. **[`mcp-and-skills.md`](.docs/mcp-and-skills.md)** — MCP Integration: AI Assistant skills, payload schema, and interaction rules
7. **[`security-policy.md`](.docs/security-policy.md)** — Security: RLS, JWT, Zod, secrets, audit logging, PR checklist
8. **[`roadmap.md`](.docs/roadmap.md)** — Feature timeline, sprint planning, priority tracking
9. **[`optimization-hardening.md`](.docs/optimization-hardening.md)** — Advanced Production Best Practices (React 19 Hooks, Server-Only).
10. **[`resync-protocol.md`](.docs/resync-protocol.md)** — SOP Otomatisasi AI. Panduan wajib AI saat mengeksekusi trigger `/resync`.
11. **[`troubleshooting-network.md`](.docs/troubleshooting-network.md)** — Panduan menangani error lokal: port konflik, HSTS, dan ghost process.

**For new contributors:** Start with [`architecture.md`](.docs/architecture.md), then branch-specific docs ([`backend-logic.md`](.docs/backend-logic.md) or [`frontend-design.md`](.docs/frontend-design.md)).

**For AI Agents (Antigravity/Claude Code):** You will be automatically routed by the root gateway files (`.cursorrules`, `claude.md`, etc.). If not, prompt: "Follow ANF-Agentic Architecture. Cek `.cursorrules` terlebih dahulu."
> 🛑 **GIT TRANSPARENCY & SAFETY RULE:** AI Agents MUST NOT run any `git` commands silently. Always generate a `git diff` preview in chat and wait for explicit user approval ("Approve"/"Oke") before executing `git commit` or `git push`.

---

## 🧪 Troubleshooting

### EPERM Error on Windows (Prisma)
```bash
# Kill Node processes first
taskkill /F /IM node.exe

# Delete .prisma/client manually
rmdir /s /q node_modules\.prisma\client

# Reinstall as Administrator
npm install
```

### HSTS & Local Network Warning
**PENTING:** Pengujian lokal via jaringan (misal buka web dari HP) **WAJIB** menggunakan `http://127.0.0.1:3000` atau *Ngrok tunnel*. Jangan pernah menggunakan `--experimental-https` karena Mobile Browser akan menerapkan blokir HSTS ketat yang memutus *script* JavaScript.

### Database Connection Failed
- Verify `DATABASE_URL` is correct (use Supabase connection string)
- Check IP allowlist in Supabase dashboard (add your IP or allow all)
- Test with: `npx prisma studio`

---

## 🤝 Contributing

1. Identify scope: backend (`be/*`) or frontend (`fe/*`)
2. Create feature branch:
   - Backend: `git checkout -b be/<domain>-<desc>` (e.g., `be/berita-crud`)
   - Frontend: `git checkout -b fe/<domain>-<desc>` (e.g., `fe/berita-card-ui`)
3. Follow vertical slice architecture (add domain code to `actions/` or `components/`)
4. All backend logic → Server Actions (never create API routes without discussion)
5. Write Zod schemas for all Server Action inputs
6. Implement FE component with explicit props interface ("hole")
7. Run `npm run lint` & `npm run format` before PR
8. **Add new files to [`project-manifest.md`](.docs/project-manifest.md) inventory**
9. After BE + FE complete, merge into `pr` for integration testing
10. Update `.docs/` if architecture or patterns change
11. Reference: [`.docs/architecture.md`](.docs/architecture.md) for full branching workflow

---

## 🌐 Mobile Testing & External Preview (Ngrok)

Untuk menguji aplikasi ini secara *responsive* langsung di perangkat HP fisik (di luar jaringan lokal WiFi) atau membagikan tinjauan proyek ke pihak eksternal, gunakan **Ngrok** (Secure Tunneling).

### Cara Instalasi & Penggunaan:

1. **Unduh Ngrok:**
   Unduh versi sesuai OS Anda di [ngrok.com](https://ngrok.com/download) dan instal di komputer Anda.

2. **Autentikasi Token (Sekali saja):**
   Dapatkan token gratis dari dashboard Ngrok Anda, lalu jalankan di terminal:
   ```bash
   ngrok config add-authtoken <TOKEN_ANDA>
   ```

3. **Expose Local Server:**
   Jalankan server lokal Next.js Anda terlebih dahulu (`npm run dev`), lalu di jendela terminal baru jalankan:
   ```bash
   ngrok http 3000
   ```

4. **Gunakan URL Publik:**
   Ngrok akan memunculkan URL publik berformat secure HTTPS seperti `https://random-id.ngrok-free.app`. Buka URL tersebut di HP Anda untuk melakukan pengujian langsung dengan fungsionalitas JavaScript penuh tanpa hambatan HSTS!

---

## 🔐 Local Security Validator (Git Hook)

Proyek ini dilengkapi dengan **Git Pre-commit Hook** otomatis untuk melindungi kode dari kebocoran data sensitif ke GitHub publik.

### Cara Kerja:
- Setiap kali Anda mengetik `git commit`, Git secara otomatis memanggil skrip `scripts/security-validator.js`.
- Skrip ini mendeteksi berkas yang sedang di- *stage* (`git diff --cached`).
- Jika terdeteksi kata kunci sensitif (seperti database credential `postgresql://`, `JWT_SECRET` mentah, atau kunci privat `.pem`), proses commit akan **otomatis digagalkan** dan menampilkan pesan peringatan.
- Hook ini terpasang secara otomatis ketika Anda menjalankan perintah `npm install`.

---

## 📄 License

© 2026 Pemerintah Kabupaten Kudus. All rights reserved.

---

**Need help?** Check the architecture docs in [`.docs/`](.docs/) first, then ask in team channel.
