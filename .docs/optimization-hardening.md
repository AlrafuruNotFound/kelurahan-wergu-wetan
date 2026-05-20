# 🚀 Advanced Optimization & Hardening (RAG Analysis)

Dokumen ini berisi *roadmap* fitur tingkat lanjut (*Enterprise Grade*) hasil dari pencarian data RAG internet terkait Praktik Terbaik *Production* Next.js 16 dan React 19.
Fitur-fitur ini dirancang untuk menyempurnakan keamanan, performa, dan pola desain kode.

---

## 1. 🛡️ Proteksi Kebocoran Server (`server-only`)
**Tujuan:** Mencegah fungsi *database* atau kredensial rahasia tereksekusi di sisi *Client* secara tidak sengaja.
**Status:** ✅ *Done (Implemented)*
**Eksekusi:**
- Instal paket resmi: `npm install server-only`
- Letakkan `import "server-only";` di baris paling atas pada file `lib/safe-action.ts` untuk memastikan dependensi dan otorisasi sesi admin dilindungi dari impor sisi klien.
- **Hasil:** Jika komponen `"use client"` tidak sengaja mengimpor fungsi tersebut, *build* akan langsung gagal.

## 2. 🎣 React 19 Form Hooks (`useActionState`)
**Tujuan:** Mengelola status formulir (*pending, error, success*) secara *native* tanpa bergantung pada pengelolaan *state* JavaScript manual, mendukung *Progressive Enhancement*.
**Status:** ⏳ *Planned*
**Eksekusi:**
- Refaktor semua form mutasi (Login Admin, Tambah Berita, Kirim Pesan) yang tadinya memakai `onSubmit` biasa atau pustaka lawas.
- Ubah menjadi skema `<form action={dispatch}>` dengan menggunakan *hook* `useActionState` dan `useFormStatus` dari `react`.
- **Hasil:** UI akan lebih cepat merespons (bisa dipadukan dengan `useOptimistic`), dan form tetap bisa dikirim meski JS mati.

## 3. 🚦 Safe Action Pattern (Middleware Terpusat)
**Tujuan:** Menghilangkan repetisi (*boilerplate*) penulisan `try/catch`, validasi Zod `schema.parse()`, dan otorisasi sesi di dalam setiap file *Server Action*.
**Status:** ✅ *Done (Implemented)*
**Eksekusi:**
- Buat file `lib/safe-action.ts` (menggunakan JWT dan library jose).
- Definisikan fungsi pembungkus dan helper (`verifySession()`, `verifySuperAdmin()`) yang mencegat pemanggilan fungsi, lalu melakukan verifikasi *role* admin dan JWT secara aman di level server.
- **Hasil:** Logika sesi administratif terpusat di satu modul dan terlindungi dari manipulasi client-side.

---

*Dokumen ini digunakan sebagai referensi untuk sprint refactoring di masa depan.*
