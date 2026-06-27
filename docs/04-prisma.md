# Prisma Layer

**Phase:** Foundation v1.4

---

# Tujuan

Menyediakan satu lapisan akses database yang konsisten, aman, dan mudah dipelihara menggunakan Prisma ORM.

Prisma menjadi satu-satunya ORM yang digunakan oleh ERP Bibit Net.

---

# Technology

| Component  | Version            |
| ---------- | ------------------ |
| Prisma ORM | 7.8.x              |
| PostgreSQL | 16                 |
| Driver     | @prisma/adapter-pg |

---

# Arsitektur

```
Browser
        │
        ▼
Next.js
        │
        ▼
Service
        │
        ▼
Repository
        │
        ▼
Prisma Singleton
        │
        ▼
PostgreSQL
```

Prisma hanya berada pada Repository Layer.

Service tidak boleh melakukan query database secara langsung.

---

# Struktur Folder

```
prisma/
│
├── schema.prisma
└── migrations/

src/
│
├── generated/
│   └── prisma/
│
└── lib/
    └── prisma.ts
```

---

# Penjelasan

## prisma/schema.prisma

Mendefinisikan struktur database.

Berisi:

* datasource
* generator
* model
* relation
* enum

Tidak berisi business logic.

---

## src/generated/prisma

Kode yang dihasilkan otomatis oleh Prisma.

Folder ini tidak boleh diedit secara manual.

Untuk memperbarui client:

```bash
npx prisma generate
```

---

## src/lib/prisma.ts

Merupakan Prisma Singleton.

Seluruh aplikasi menggunakan file ini untuk mengakses database.

Tidak boleh membuat PrismaClient di file lain.

---

# Prisma Singleton

```
Module

↓

Repository

↓

Prisma Singleton

↓

PostgreSQL
```

Singleton mencegah pembuatan koneksi baru setiap kali Hot Reload terjadi saat development.

---

# Driver Adapter

ERP Bibit Net menggunakan PostgreSQL Driver Adapter.

```
Pool

↓

PrismaPg Adapter

↓

Prisma Client
```

Tidak menggunakan Prisma Accelerate.

---

# Connection Flow

```
DATABASE_URL

↓

Pool

↓

PrismaPg

↓

PrismaClient

↓

Repository

↓

Service

↓

Application
```

---

# Rules

## Rule #1

Jangan membuat:

```ts
new PrismaClient()
```

di luar:

```
src/lib/prisma.ts
```

---

## Rule #2

Semua akses database menggunakan:

```ts
import { prisma } from "@/lib/prisma";
```

---

## Rule #3

Service tidak boleh memanggil Prisma secara langsung.

Gunakan Repository.

```
Service

↓

Repository

↓

Prisma
```

---

## Rule #4

Jangan mengedit folder:

```
src/generated/prisma
```

Folder tersebut dibuat otomatis oleh Prisma.

---

## Rule #5

Setelah mengubah schema:

```bash
npx prisma migrate dev --name nama_migration
```

kemudian:

```bash
npx prisma generate
```

---

# Development Workflow

```
Developer

↓

Edit schema.prisma

↓

Prisma Migration

↓

PostgreSQL

↓

Prisma Generate

↓

Generated Client

↓

Repository

↓

Service
```

---

# Production Workflow

```
Deploy

↓

Prisma Migration

↓

Generate Prisma Client

↓

Next.js

↓

Application Ready
```

---

# Best Practices

* Gunakan satu PrismaClient untuk seluruh aplikasi.
* Jangan membuat query di UI.
* Jangan membuat query di page.tsx.
* Simpan query database di Repository.
* Simpan business logic di Service.
* Gunakan migration untuk setiap perubahan schema.
* Gunakan Zod untuk validasi input sebelum data dikirim ke Repository.

---

# Architecture Decision

ERP Bibit Net menggunakan:

* Next.js Monolithic Architecture
* Prisma ORM
* PostgreSQL
* Repository Pattern
* Service Layer
* Prisma Singleton
* PostgreSQL Driver Adapter

Prisma menjadi satu-satunya gerbang menuju database.

Tidak ada query SQL langsung pada Module maupun UI.

---

# Roadmap

Setelah Prisma Layer selesai, proyek memasuki Domain Layer.

```
Foundation
│
├── Structure
├── Configuration
├── Database
├── Environment
├── Prisma
└── Domain
```

Domain Layer akan menjadi tempat seluruh modul ERP seperti:

* Authentication
* User
* Role
* Product
* Inventory
* Purchase
* Sales
* Report

Semua modul akan menggunakan Prisma Layer yang sama tanpa membuat koneksi database baru.
