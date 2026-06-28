# ERP Bibit Net

## Foundation v1.0

Tanggal: 2026-06-27

---

# Tujuan

Membangun pondasi ERP menggunakan Next.js sebagai satu aplikasi (Monolithic Modular), sehingga frontend dan backend berada dalam satu project.

Arsitektur ini dipilih agar:

- hanya memiliki satu repository
- satu proses deployment
- satu package.json
- satu environment (.env)
- satu source of truth untuk business logic

## Root Layout

Lokasi:

```
src/app/layout.tsx
```

### Tujuan

Root Layout menjadi fondasi seluruh aplikasi ERP.

### Tanggung Jawab

- Memuat global CSS.
- Mendaftarkan font aplikasi.
- Menyediakan metadata aplikasi.
- Menjadi root HTML untuk seluruh halaman.

### Aturan

- Jangan menambahkan business logic.
- Jangan mengakses database.
- Jangan melakukan autentikasi di sini.
- Provider hanya ditambahkan jika benar-benar dibutuhkan.

Root Layout harus tetap ringan dan fokus pada konfigurasi aplikasi.

---

# Technology Stack

| Technology | Version |
|------------|---------|
| Next.js | 16.2.9 |
| React | 19 |
| TypeScript | 5 |
| Prisma ORM | 7.8.0 |
| PostgreSQL | 16 (Homebrew) |
| TailwindCSS | 4.x |
| shadcn/ui | 4.x |

---

# Arsitektur

```
Browser
     │
     ▼
Next.js
     │
     ▼
Business Service
     │
     ▼
Repository
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

Business Logic hanya ditulis satu kali.

Business Logic dapat digunakan oleh:

- Next.js Page
- API Route
- Server Action
- Cron Job
- Queue

---

# Filosofi

Project mengikuti konsep:

Feature First + Modular Monolith

Bukan:

```
Frontend
Backend
```

Tetapi:

```
ERP

├── Auth
├── Product
├── Stock
├── Sales
└── Purchase
```

Setiap module mempunyai business logic sendiri.

---

# Struktur Folder Foundation

```
erp-bibit-net/

├── prisma/
├── public/
├── scripts/
├── src/
│
│   ├── app/
│   ├── components/
│   └── lib/
│
└── package.json
```

Belum ada folder lain.

Folder hanya dibuat ketika memang dibutuhkan.

---

# Rules

Rule #0

Folder dibuat karena kebutuhan, bukan prediksi.

Rule #1

Semua business logic berada pada Module.

Rule #2

Folder app hanya digunakan untuk Routing dan Layout Next.js.

Rule #3

Folder lib hanya berisi Infrastructure.

Contoh:

- Prisma
- Auth
- Logger
- Env
- Helper

Rule #4

Komponen global berada pada folder:

```
src/components
```

Rule #5

Module akan dibuat setelah Foundation selesai.

---

# Status

Phase:

✅ Foundation v1.0

Status:

In Progress