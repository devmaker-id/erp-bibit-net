# Database Foundation

**Phase:** Foundation v1.1

---

# Tujuan

Menyiapkan pondasi database PostgreSQL yang aman, mudah dipelihara, dan siap digunakan dalam lingkungan Development maupun Production.

Project menggunakan:

- PostgreSQL
- Prisma ORM
- Zod Environment Validation

---

# Database Information

| Item | Value |
|------|-------|
| Engine | PostgreSQL |
| ORM | Prisma |
| Database | erp_bibit_net |
| Charset | UTF-8 |
| Timezone | UTC |

---

# Naming Convention

## Database

```text
erp_bibit_net
```

## Database User

```text
erp_bibit
```

Hindari menggunakan user bawaan PostgreSQL seperti:

```text
postgres
```

Karena aplikasi sebaiknya memiliki user database sendiri.

---

# Development Environment

Pada tahap pengembangan, cukup menggunakan satu user.

```text
Application
        │
        ▼
erp_bibit
        │
        ▼
erp_bibit_net
```

Hak akses:

- LOGIN
- CREATE
- CONNECT
- TEMPORARY
- CREATE TABLE
- ALTER TABLE
- DROP TABLE

Karena Prisma Migration membutuhkan hak untuk membuat dan mengubah struktur database.

Development mengutamakan kemudahan pengembangan.

---

# Production Environment

Production berbeda.

Disarankan menggunakan dua user.

```
                Prisma Migration
                        │
                        ▼
                migration_user
                        │
                Schema Migration
                        │
──────────────────────────────────────
                        │
                Application
                        │
                        ▼
                application_user
                        │
                        ▼
                PostgreSQL
```

## migration_user

Digunakan hanya ketika:

- Deploy
- Migration
- Upgrade Database

Memiliki hak:

- CREATE
- ALTER
- DROP
- CREATE INDEX
- ALTER TABLE

Tidak digunakan oleh aplikasi.

---

## application_user

Digunakan oleh aplikasi ERP.

Hak akses cukup:

- SELECT
- INSERT
- UPDATE
- DELETE

Tidak memiliki hak:

- DROP TABLE
- ALTER TABLE
- CREATE DATABASE

Jika aplikasi diretas, struktur database tetap aman.

---

# Database User

Development

```text
erp_bibit
```

Production

```text
erp_bibit_app
```

Migration

```text
erp_bibit_migration
```

---

# Environment Variable

```env
#################################
# APP
#################################

APP_NAME="ERP Bibit Net"
APP_ENV="development"
APP_URL="http://localhost:3000"

#################################
# DATABASE
#################################

DATABASE_URL="postgresql://erp_bibit:password@localhost:5432/erp_bibit_net"

#################################
# AUTH
#################################

AUTH_SECRET="change-me"
AUTH_EXPIRES="7d"
```

---

# Environment Validation

Semua Environment Variable divalidasi menggunakan Zod.

Lokasi:

```
src/lib/env.ts
```

Aplikasi tidak boleh mengakses:

```ts
process.env
```

secara langsung.

Seluruh konfigurasi diakses melalui:

```ts
import { env } from "@/lib/env";
```

---

# Rules

## Rule #1

Satu aplikasi memiliki satu database.

---

## Rule #2

Satu aplikasi memiliki user database sendiri.

---

## Rule #3

Jangan menggunakan user `postgres` untuk aplikasi.

---

## Rule #4

Development boleh menggunakan satu user.

---

## Rule #5

Production disarankan menggunakan dua user:

- Migration User
- Application User

---

## Rule #6

Environment Variable hanya boleh diakses melalui:

```
src/lib/env.ts
```

---

# Development Workflow

```
Developer

        │

npm run dev

        │

Next.js

        │

Prisma

        │

erp_bibit

        │

PostgreSQL
```

---

# Production Workflow

```
Deployment

        │

Prisma Migration

        │

migration_user

        │

PostgreSQL

────────────────────────────────

Application

        │

application_user

        │

PostgreSQL
```

---

# Future

Ketika project memasuki tahap Production, akan ditambahkan:

- Database Backup
- Database Restore
- Read Replica
- Connection Pool
- Monitoring
- Slow Query Log

Saat ini belum diperlukan.