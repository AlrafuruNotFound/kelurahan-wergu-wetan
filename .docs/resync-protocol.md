# 🤖 PROTOKOL OTOMATISASI: `/resync`

> **PERINGATAN UNTUK AI:** Ini adalah *Standard Operating Procedure* (SOP) mutlak. Jika *user* mengetik perintah `/resync`, Anda **DILARANG** melakukan hal lain sebelum mengeksekusi ke-5 langkah di bawah ini secara berurutan.

## 📋 Checklist Eksekusi (Harus Berurutan)

### Langkah 1: Sinkronisasi IDE Rules (Pondasi)
Eksekusi perintah terminal berikut tanpa bertanya:
```bash
npm run sync-rules
```
*Tujuan: Memastikan file `.cursorrules`, `.agentrules`, dll seragam dan terlindungi dari typo.*

### Langkah 2: Audit Perubahan Kode
Gunakan `run_command` untuk menjalankan perintah ini guna melihat file apa saja yang berubah secara fungsional:
```bash
git status
git diff
```
*Tujuan: Memahami konteks arsitektur dan komponen yang baru ditambahkan/diubah oleh user.*

### Langkah 3: Investigasi Ekosistem Dokumen & Workflow
Gunakan tool `view_file` atau `grep_search` secara eksplisit untuk membaca dokumen-dokumen kunci dan konfigurasi ini:
- `README.md`
- `.docs/architecture.md`
- `.docs/backend-logic.md`
- `.docs/frontend-design.md`
- `.docs/project-manifest.md`
- `.docs/roadmap.md`
- `.docs/security-policy.md`
- `.docs/optimization-hardening.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/workflows/ci.yml`, `.github/workflows/docs-sync.yml`, dan `.github/workflows/security-audit.yml`

## Langkah 4: Penulisan Ulang (Rewrite & Sync)
Berdasarkan hasil `git diff` dari Langkah 2:
- Jika ada struktur folder baru, tambahkan ke `project-manifest.md`.
- Jika ada pola UI baru, perbarui `frontend-design.md`.
- Jika ada perubahan *database* atau aksi server, perbarui `backend-logic.md`.
- Jika ada dampak terhadap kebijakan keamanan atau fungsionalitas kritis, perbarui `security-policy.md`.
- Jika ada tugas, milestone, atau target rilis/optimasi yang telah diselesaikan atau berubah prioritasnya, perbarui `roadmap.md` dan `optimization-hardening.md`.
- Jika ada standar pengerjaan backend, frontend, atau alur kerja CI/CD baru yang ditambahkan, perbarui `.github/PULL_REQUEST_TEMPLATE.md` serta sesuaikan file `.github/workflows/*` jika diperlukan.
Lakukan perubahan menggunakan tool edit file. **Jangan** sekadar menimpa teks, tapi tulislah narasi yang menjelaskan perubahan tersebut ke dalam dokumen.

### Langkah 5: Pelaporan & Catatan Sejarah
Setelah semua dokumen di atas akurat dengan kondisi kode terbaru:
1. Tambahkan 1 baris catatan ke `.docs/CHANGELOG.md` tentang apa yang baru saja disinkronkan.
2. Tampilkan pesan sukses di *chat* bahwa "Resync Ekosistem Selesai", dan tanyakan ke *user* apakah siap untuk `git commit`.
