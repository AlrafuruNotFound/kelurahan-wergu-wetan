# 🌐 Network & Localhost Troubleshooting Guide

Dokumen ini adalah referensi wajib bagi AI Agent maupun Developer jika menemukan keluhan bahwa **"Localhost tidak bisa diakses"**, **"Komponen web hilang"**, atau muncul pesan **"Cannot GET /home"**.

---

## 🛑 1. Kasus "Cannot GET /home" di Localhost
**Gejala:** Saat membuka `http://localhost:3000`, browser tidak menampilkan halaman Next.js melainkan error teks polos `Cannot GET /home` atau error *Cannot GET /*.
**Akar Masalah:** Ada "Ghost Process" (Server Express/Node lama yang nyangkut) yang membajak port 3000 pada protokol IPv6 (`[::1]`). Karena Windows mengutamakan IPv6 untuk `localhost`, browser nyasar ke server hantu tersebut, sementara Next.js berjalan di IPv4.

**Tindakan Resolusi (Agent / Developer):**
1. Lacak proses hantu yang membajak port 3000 di terminal:
   ```cmd
   netstat -ano | findstr :3000
   ```
2. Cari Process ID (PID) yang mencurigakan (biasanya ada 2 proses berbeda).
3. Bunuh paksa proses hantu tersebut:
   ```cmd
   taskkill /F /PID <PID_HANTU>
   ```
4. Pastikan `package.json` menggunakan standar Next.js tanpa flag IPv4-only:
   ✅ BENAR: `"dev": "next dev"`
   ❌ SALAH: `"dev": "next dev -H 0.0.0.0"` (Akan menyebabkan Next.js gagal menguasai IPv6)

---

## 🧩 2. Kasus "Komponen Web Hilang saat Diakses dari IP Lokal / HP"
**Gejala:** Halaman memuat dengan sukses, tetapi beberapa komponen (terutama yang membutuhkan data fetch) hilang. Console browser mungkin mencatat *Invalid post origin* atau *Blocked server action*.
**Akar Masalah:** Fitur keamanan `serverActions.allowedOrigins` di `next.config.ts` menolak eksekusi aksi server dari domain selain yang didaftarkan.

**Tindakan Resolusi:**
1. Buka berkas `next.config.ts`.
2. Pastikan Origin yang sedang digunakan (misalnya `http://127.0.0.1:3000`, `http://192.168.1.2:3000`) sudah dimasukkan ke dalam daftar `allowedOrigins`!
3. **WAJIB:** Restart ulang server (`npm run dev`) setiap kali `next.config.ts` diubah.

---

## 🔒 3. Kasus HSTS (Browser Memaksa ke HTTPS)
**Gejala:** Saat membuka `http://localhost:3000`, browser langsung menolak koneksi dan bilah alamat (address bar) otomatis berubah menjadi `https://localhost:3000` padahal kita sedang tidak memakai `--experimental-https`.
**Akar Masalah:** Browser menyimpan *cache HSTS (HTTP Strict Transport Security)* karena proyek ini sebelumnya pernah berjalan dengan HTTPS lokal.

**Tindakan Resolusi:**
1. **Solusi Cepat:** Arahkan developer untuk mengakses web menggunakan IP loopback: `http://127.0.0.1:3000`. Memori HSTS terikat pada string nama domain ("localhost"), bukan IP numerik.
2. **Solusi Permanen:** 
   - Minta pengguna membuka `chrome://net-internals/#hsts` (atau di Edge).
   - Scroll ke **Delete domain security policies**.
   - Masukkan `localhost` lalu klik **Delete**.

---

**Rule untuk AI Agent:**
Setiap kali menghadapi pelaporan *Localhost connection error*, JANGAN langsung memodifikasi kode UI atau Routing Next.js. **Buka dokumen ini terlebih dahulu dan terapkan diagnosa port / jaringan!**
