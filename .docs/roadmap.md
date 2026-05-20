# 🗺️ Roadmap — ANF-Agentic Architecture Project

**Portal Web Terpadu Kelurahan Wergu Wetan**  
**Maintained by:** AlrafuruNotFound | **Last Updated:** 20 Mei 2026 (v3.8.0)

---

## 📋 Philosophy

Roadmap ini mengikuti **ANF-Agentic Architecture** branching strategy:
- `be/*` untuk development backend
- `fe/*` untuk development frontend  
- `pr/*` untuk integrasi & testing
- `main` untuk production release

Each item di-tracking dengan status: `[TODO]`, `[IN-PROGRESS]`, `[DONE]`, `[BLOCKED]`.

---

## 🎯 Q2 2026 — Sprint 1-2 (Current)

### 🔐 Authentication & Security [DONE]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| JWT implementation with jose | `be/auth` | ✅ DONE | BE Team |
| HTTP-only cookie setup | `be/auth` | ✅ DONE | BE Team |
| Admin login page UI | `fe/login` | ✅ DONE | FE Team |
| RLS policies for all tables | `be/db` | ✅ DONE | BE Team |
| Security policy documentation | `docs` | ✅ DONE | Tech Lead |

### 📰 Content Management [DONE]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| News (Kegiatan) CRUD Server Actions | `be/berita-crud` | ✅ DONE | BE Team |
| News listing page (public) | `fe/berita-list` | ✅ DONE | FE Team |
| News detail page | `fe/berita-detail` | ✅ DONE | FE Team |
| Banner carousel (homepage) | `fe/banner-carousel` | ✅ DONE | FE Team |
| Stitch integration for HeroCarousel | `fe/stitch-hero` | ✅ DONE | FE Team |

---

## 🎯 Q2 2026 — Sprint 3-4 (Up Next)

### 🏠 Homepage Optimization [IN-PROGRESS]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Statistics data loading | `be/home-stats` | ✅ DONE | BE Team |
| Services (Layanan) display | `fe/home-services` | ✅ DONE | FE Team |
| Welcome message (Lurah) | `be/home-welcome` | ✅ DONE | BE Team |
| Responsive mobile layout | `fe/mobile-responsive` | ✅ DONE | FE Team |
| Performance audit (next/image & a11y) | `pr/performance` | ✅ DONE | Both |

### 🔐 Security Hardening & Optimization [DONE]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Implement security hardening on all Server Actions | `be/security-hardening` | ✅ DONE | BE Team |
| Create central `safe-action.ts` JWT session helper | `be/security-hardening` | ✅ DONE | BE Team |


### 📝 Direktori Informasi & Indeks Kepuasan (IKM) [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| UI Direktori Panduan Layanan (Cara Akses) | `fe/layanan-panduan` | [TODO] | FE Team |
| Form Ulasan / Penilaian Kepuasan Warga | `fe/ulasan-ikm` | [TODO] | FE Team |
| Backend CRUD & Kalkulasi Statistik Ulasan Tahunan | `be/ulasan-stats` | ✅ DONE | BE Team |
| Integrasi Rating ke Data Statistik Homepage | `pr/home-stats-ikm` | [TODO] | Both |

---

## 🚀 Q3 2026 — Future Releases

### 🔍 Advanced Search [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Full-text search (PostgreSQL FTS) | `be/search-fts` | ✅ DONE | BE Team |
| Search modal (Cmd+K) | `fe/search-modal` | ✅ DONE | FE Team |
| Search result highlighting | `fe/search-results` | ✅ DONE | FE Team |
| Search analytics tracking | `be/search-analytics` | [TODO] | BE Team |

### 📊 Data Import/Export [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Excel import for statistics | `be/excel-import` | [TODO] | BE Team |
| Excel export for reports | `be/excel-export` | [TODO] | BE Team |
| Template download endpoint | `be/template-endpoint` | [TODO] | BE Team |
| Frontend upload UI | `fe/upload-ui` | [TODO] | FE Team |

### 🎨 Design System Expansion [TODO]

| Task | Branch | Status | Owner |
|------|--------|--------|-------|
| Component library (`components/ui/`) | `fe/ui-primitives` | [TODO] | FE Team |
| Design tokens → Figma Variables | `docs/design-tokens` | [TODO] | Design Team |
| Accessibility audit (WCAG 2.1) | `pr/a11y-audit` | [TODO] | Both |
| Dark mode support | `fe/theme-dark` | [TODO] | FE Team |

---

## 🏗️ Technical Debt & Refactoring [TODO]

| Task | Branch | Priority | Owner |
|------|--------|----------|-------|
| Extract primitive components to `components/ui/` | `fe/refactor-ui` | Medium | FE Team |
| Add refresh token mechanism (JWT) | `be/auth-refactor` | High | BE Team |
| Implement rate limiting on login | `be/rate-limit` | High | BE Team |
| Migrate to middleware.ts for auth | `fe/middleware-auth` | [CANCELLED] (Auth di layout) | FE Team |
| Add E2E tests (Playwright) | `pr/e2e-tests` | Medium | QA Team |
| Upgrade Tailwind v3 → v4 (already on v4) | `fe/tailwind-upgrade` | None (Done) | — |

---

## 📈 Metrics & KPIs

| Metric | Target | Current |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | — |
| FID (First Input Delay) | < 100ms | — |
| Admin login success rate | > 99% | — |
| Database query time (avg) | < 100ms | — |
| Bundle size (initial load) | < 200KB | — |

---

## 🔄 Release Cadence

- **Weekly builds:** `be/*` & `fe/*` merged into `develop` branch every Friday
- **Bi-weekly releases:** `develop` → `staging` → `main` every 2 weeks
- **Hotfixes:** `hotfix/*` branches for critical bugs (merge to `main` immediately)

---

## 📅 Timeline Overview

```
Q2 2026 (Apr-Jun):
  ✅ Auth + Basic CMS (News, Banners)
  ⏳ Homepage optimization + IKM (Ulasan) & Layanan info
  ⏳ Search + Excel import/export

Q3 2026 (Jul-Sep):
  ⏳ Advanced features (notifications, dark mode)
  ⏳ Design system expansion
  ⏳ E2E testing

Q4 2026 (Oct-Dec):
  ⏳ Performance optimization
  ⏳ Mobile app (PWA)
  ⏳ Multi-language expansion (beyond ID/EN/JW)
```

---

## 🎯 Success Criteria

Project considered **successful** when:
1. ✅ All core features (CRUD for Berita, Potensi, Banner, Kontak) working
2. ✅ Admin panel fully functional (login, dashboard, management)
3. ✅ Public portal accessible (news, about, services, contact)
4. ✅ Stitch integration complete (design → code workflow)
5. ✅ Zero critical security vulnerabilities (RLS enforced, JWT secure)
6. ✅ Performance meets Core Web Vitals (LCP < 2.5s)

---

**Note:** This roadmap is living document. Update when priorities change.  
**Next Review:** End of Sprint 4 (30 Juni 2026)
