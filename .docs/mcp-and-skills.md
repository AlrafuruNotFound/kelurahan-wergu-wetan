# 🤖 Professional AI Integration: MCP & Custom Skills

Dokumen ini adalah **SOP Resmi (Standar Operasional Prosedur)** untuk mengintegrasikan AI Agent (seperti Antigravity, Cursor, atau Claude) ke dalam arsitektur proyek Kelurahan Wergu Wetan pada tingkat *Advanced* (Profesional).

## 1. Skill Custom Paths (Custom AI Tools)
Jika Anda melihat opsi **"Skill Custom Paths"** di UI pengaturan AI Agent, fitur ini digunakan untuk memberikan AI sebuah "alat bantu khusus" (*tools*) berupa skrip lokal (biasanya Node.js atau Python) agar AI bisa melakukan tugas otomatis secara mandiri.

**SOP Pembuatan & Pendaftaran Skill Custom:**
1. **Lokasi Penyimpanan:** Jangan mencampur skrip *skill* AI dengan kode Next.js. Buat folder khusus di *root* proyek, contoh: `.ai/skills/` atau `scripts/ai/`.
2. **Registrasi di UI:** Buka pengaturan AI (seperti di tangkapan layar Anda), klik **+ Add** pada *Skill Custom Paths*, dan masukkan alamat *folder* tempat skrip tersebut disimpan.
3. **Kapan Digunakan?** *Custom Skills* digunakan JIKA AI perlu melakukan otomatisasi alur kerja (DevOps/Manajemen), BUKAN untuk sekadar logika web. Contoh *skill* profesional:
   - Skrip untuk otomatis melakukan *backup* database Prisma.
   - Alat untuk menganalisis dan membersihkan folder `trash-temp/`.
   - Skrip untuk melakukan *deployment* otomatis ke Vercel/VPS.

## 2. Installed MCP Servers (Model Context Protocol)
Opsi **"Installed MCP Servers"** di UI pengaturan digunakan untuk menghubungkan AI ke sumber data eksternal atau database secara *real-time*, sehingga AI bisa mengambil keputusan logis tanpa harus membaca *source code* secara manual.

**SOP Penggunaan MCP Server:**
1. **Kebutuhan Arsitektur:** Dalam proyek berbasis Next.js Monolith ini, Anda **DISARANKAN** menambahkan MCP Server dari UI tersebut JIKA Anda membutuhkan:
   - **PostgreSQL MCP:** Menghubungkan AI langsung ke *Supabase PostgreSQL* (mengizinkan AI membaca skema *live* tanpa melihat `schema.prisma`).
   - **GitHub / Jira MCP:** Menghubungkan AI ke *repository* remote untuk mengecek *Pull Request* atau *Issue* warga secara otomatis.
   - **Brave Search / Web MCP:** Agar AI bisa mencari pedoman administrasi pemerintah terbaru di internet secara langsung dari panel *chat*.
2. **Cara Setup:** Klik **+ Add** di menu *Installed MCP Servers* atau klik **Open MCP Config** untuk mengedit file JSON konfigurasi. File konfigurasi ini biasanya bersifat global di komputer Anda, bukan tersimpan di dalam *repository* web ini.

## 3. Aturan Main (Integration Rules)
Untuk menjaga arsitektur tetap bersih dan aman saat menggunakan MCP dan Custom Skills:

- ❌ **JANGAN** membuat *Custom Skill* atau memanggil *MCP Server* untuk melakukan operasi CRUD data kelurahan biasa (seperti Tambah Berita atau Ubah Layanan). Operasi tersebut **wajib** murni dilakukan di dalam kode melalui *Server Actions* (`actions/*.action.ts`) agar keamanan Zod & RLS tetap terjamin.
- ✅ **GUNAKAN** *Custom Skill* untuk otomatisasi internal *workspace*.
- 🛑 **GIT SAFETY RULE:** Meskipun AI diberikan keleluasaan akses lewat MCP atau *Custom Skills*, AI **DILARANG KERAS** mengeksekusi perintah `git push` atau `git merge` secara otomatis. Semua wajib dikunci di bawah konfirmasi eksplisit (*allow pop-up*).

## 4. Standarisasi Ekstensi IDE & AI Agent (Anti-Collision)
Untuk mencegah logika AI Agent yang bertabrakan (*overlap*) dan memastikan lingkungan *coding* tetap ringan, file `.vscode/extensions.json` telah distandarisasi dengan format komentar pemisah:

1. **CORE & REQUIRED (Wajib):** Ekstensi standar *engineering* (Prettier, ESLint, Prisma, Tailwind, dll) yang **harus** diaktifkan oleh seluruh anggota tim agar *formatting* dan *linting* selaras.
2. **OPTIONAL AI AGENTS (Pilih Salah Satu):** Ekstensi berbasis AI (seperti Antigravity, Kilo, Cline, atau Roo Code) bersifat **opsional**.
   - 🛑 **WARNING (ANTI-COLLISION):** **JANGAN** pernah mengaktifkan lebih dari satu AI Agent secara bersamaan di dalam *workspace*.
   - **Alasan:** Menyalakan banyak AI akan memicu bentrok logika, perebutan fitur *autocomplete*, dan generasi *folder/file* sampah internal secara serempak (misalnya AI 1 membuat `.kilo`, sementara AI 2 membuat `.cline`).
   - *Best Practice:* Pilih satu ekstensi AI yang paling sesuai dengan tugas hari ini, dan **Disable (Workspace)** ekstensi AI lainnya.

*(Selain itu, ekstensi lawas yang merusak arsitektur Next.js modern seperti TSLint, Beautify, atau LiveServer wajib dimasukkan ke dalam blok `unwantedRecommendations` agar otomatis masuk daftar hitam / blacklist).*

## 5. Kesimpulan: Kapan Harus Setup UI Tersebut?
Bagi seorang *developer* profesional, menu konfigurasi **Skill & MCP Servers** itu adalah "Senjata Tambahan" (Arsenal):
- Untuk **Vibe Coding Sehari-hari** (membuat komponen React, merefaktor UI, menambah *Server Actions*), Anda **belum membutuhkan** setup MCP. AI sudah cukup dipandu oleh *system prompt* (`.cursorrules`).
- Untuk **Otomatisasi Sistem Skala Besar** (DevOps, Data Analytics Langsung, CI/CD terpadu), Anda **WAJIB** mengatur *MCP Servers* dan *Custom Skills* secara terstruktur mengikuti pedoman di atas.

## 6. AI Trigger Commands (Pseudo-Automation)
Sistem ini menggunakan arsitektur **ANF-Agentic**, yang berarti AI dapat dilatih untuk mengenali perintah khusus (*Trigger Phrases*) di kolom chat tanpa harus menginstal *script* atau alat eksternal.

- **`Update Resync`** (atau `/resync`): 
  Jika pengguna mengetik perintah sakti ini, AI **DIWAJIBKAN** membuka dan membaca file `.docs/resync-protocol.md`. AI harus segera mengeksekusi semua langkah operasional (*SOP*) yang ada di dalam protokol tersebut secara berurutan dan tanpa banyak tanya.
  
  *Cara kerja:* Aturan `[MANDATORY HOLISTIC AUDIT]` secara psikologis memaksa AI (LLM) untuk melewati batas optimalisasi token (AI laziness), membaca *Master Prompt*, dan melakukan sinkronisasi arsitektural yang sebenarnya.
