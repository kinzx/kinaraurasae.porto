# Kinar Aurasae - Personal Portfolio & AI Chat Guide

Website portfolio personal interaktif, minimalis, dan modern milik **Kinar Aurasae**. Proyek ini dibuat menggunakan Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, dan Framer Motion. Portfolio ini juga dilengkapi asisten AI lokal terintegrasi yang ditenagai oleh **Ollama** menggunakan model **Qwen2.5 (1.5b)**, serta siap di-deploy secara mandiri (*self-hosted*) menggunakan Docker.

---

## 🚀 Fitur Utama

- **Modern Tech Stack**: Dibangun dengan Next.js, React 19, TypeScript, dan performa tinggi Tailwind CSS v4.
- **Scroll-Driven Interactions**: Animasi transisi navbar dan elemen halaman yang halus menggunakan `framer-motion` berbasis posisi scroll.
- **Asisten AI Lokal (Kinar AI)**: Obrolan interaktif yang disematkan langsung di portfolio untuk menjawab pertanyaan pengunjung seputar profil, skill, dan proyek Kinar. Seluruh pemrosesan AI berjalan secara lokal di server hosting Anda tanpa API key eksternal.
- **Self-Hosting Ready**: Konfigurasi Docker multi-stage build yang menghasilkan image sangat minimalis menggunakan fitur Next.js *standalone mode*.
- **Quality Assurance**: Siap dengan pengujian unit menggunakan **Vitest** dan pengujian end-to-end (E2E) menggunakan **Playwright**.

---

## 🛠️ Tech Stack & Dependencies

### Core
- **Framework**: Next.js 16.2.10 (App Router)
- **Library**: React 19.2.4 & React DOM 19.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & PostCSS
- **Animations**: Framer Motion 12.4.2

### AI Integration
- **LLM Engine**: Ollama (menjalankan model `qwen2.5:1.5b`)

### Development & Testing
- **Linter & Formatter**: ESLint, Prettier (dengan Tailwind CSS plugin)
- **Unit Testing**: Vitest
- **E2E Testing**: Playwright

---

## 📂 Struktur Proyek

```text
├── app/
│   ├── api/chat/route.ts   # API Endpoint untuk komunikasi dengan Ollama
│   ├── globals.css         # Styling global dan konfigurasi Tailwind v4
│   ├── layout.tsx          # Wrapper halaman utama, font, dan metadata
│   └── page.tsx            # Halaman utama portfolio (Hero, About, Footer)
├── components/
│   ├── AboutSection.tsx    # Bagian Profile, Skill list, dan Project list
│   ├── AiChat.tsx          # Komponen UI Chatbox AI untuk interaksi pengunjung
│   └── HeroSection.tsx     # Bagian Hero dengan layout scroll & floating elements
├── Dockerfile              # Konfigurasi Multi-Stage Build Docker
├── docker-compose.yml      # Orchestration untuk container produksi dan dev
├── package.json            # Script manajemen proyek dan daftar dependency
└── prd.md                  # PRD (Product Requirement Document) sebagai acuan awal
```

---

## 💻 Cara Menjalankan Secara Lokal (Development)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di komputer lokal Anda:

### Prerequisites (Prasyarat)
1. **Node.js** (Versi 18 ke atas, disarankan versi 20+ atau 24).
2. **Ollama** terinstal secara lokal di komputer Anda ([Download Ollama](https://ollama.com/)).
3. Unduh model Qwen2.5:1.5b melalui terminal Anda:
   ```bash
   ollama run qwen2.5:1.5b
   ```

### Langkah Instalasi
1. Clone repositori ini ke komputer Anda.
2. Pasang semua dependency proyek:
   ```bash
   npm install
   ```
3. Salin file `.env` menjadi `.env.local` untuk konfigurasi environment lokal Anda:
   ```bash
   cp .env .env.local
   ```
4. Pastikan Ollama berjalan di latar belakang (secara default di `http://127.0.0.1:11434`).
5. Jalankan server development:
   ```bash
   npm run dev
   ```
6. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🐳 Panduan Hosting Mandiri (Self-Hosting) dengan Docker

Proyek ini telah dikonfigurasi sepenuhnya agar mudah dihosting secara mandiri pada VPS pribadi atau server lokal Anda menggunakan Docker dan Docker Compose.

### Cara Kerja Standalone Build
`Dockerfile` menggunakan teknik *multi-stage build* untuk memisahkan proses instalasi dependency, kompilasi build Next.js, dan runner produksi. Dengan mengaktifkan `output: 'standalone'` di Next.js, Docker image hasil build hanya akan berisi file yang benar-benar dibutuhkan oleh server Node.js sehingga ukurannya sangat ringan dan aman.

### Langkah-langkah Deployment:

#### 1. Setup Ollama di Host (Server Utama)
Apabila Anda menjalankan Ollama di sistem operasi host (bukan di dalam Docker), pastikan Ollama mendengarkan koneksi dari luar localhost agar kontainer Docker dapat mengaksesnya.

- **Pada Windows**: Setel variabel lingkungan sistem `OLLAMA_HOST=0.0.0.0` lalu jalankan kembali aplikasi Ollama.
- **Pada Linux/macOS**: Konfigurasikan service systemd Ollama untuk mengizinkan binding IP `0.0.0.0`.

Unduh model AI yang digunakan:
```bash
ollama pull qwen2.5:1.5b
```

#### 2. Konfigurasi Environment File (`.env.local`)
Buat atau sesuaikan berkas `.env.local` di root folder proyek:
```env
NEXT_PUBLIC_SITE_URL=https://portfolio-anda.com
NEXT_PUBLIC_SITE_NAME="Kinar Aurasae Portfolio"
PORT=3000
HOSTNAME=0.0.0.0
```

#### 3. Menjalankan Docker Compose
Jalankan perintah berikut untuk mengompilasi kode dan mengaktifkan kontainer portfolio dalam mode latar belakang (*detached mode*):
```bash
docker compose up -d --build
```

Setelah proses selesai:
- Kontainer akan mendengarkan di port `3000` host.
- Aplikasi Next.js akan mendeteksi service Ollama host melalui IP gateway Docker `host.docker.internal` yang didefinisikan pada konfigurasi `extra_hosts` di berkas `docker-compose.yml`:
  ```yaml
  extra_hosts:
    - "host.docker.internal:host-gateway"
  ```
- Ini memungkinkan aplikasi Next.js di dalam kontainer untuk mengakses endpoint `http://host.docker.internal:11434` tanpa kendala jaringan.

#### 4. Reverse Proxy & SSL (Disarankan)
Untuk deployment produksi, gunakan reverse proxy seperti **Nginx**, **Caddy**, atau **Traefik** untuk mengarahkan lalu lintas HTTPS (port 443) ke port `3000` kontainer portfolio Anda.

---

## 🧪 Menjalankan Pengujian (Testing)

Sebelum melakukan deployment atau membuat release baru, selalu disarankan untuk memverifikasi fungsionalitas kode Anda:

### Unit Tests (Vitest)
Untuk menjalankan test suite komponen dan utilitas secara cepat:
```bash
npm run test
```

### End-to-End Tests (Playwright)
Untuk menjalankan simulasi interaksi pengguna secara nyata di browser:
1. Pasang browser pengetesan (jika baru pertama kali):
   ```bash
   npm run e2e:install
   ```
2. Jalankan pengetesan E2E:
   ```bash
   npm run test:e2e
   ```
3. Untuk melihat visualisasi pengetesan secara interaktif:
   ```bash
   npm run test:e2e:ui
   ```

---
*Dibuat dengan ☕ dan 💻 oleh [Kinar Aurasae](https://github.com/kinzx).*
