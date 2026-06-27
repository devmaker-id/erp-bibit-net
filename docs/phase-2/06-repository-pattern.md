# Repository Pattern

**Phase:** Domain Foundation v2.1

---

# Tujuan

Menetapkan standar akses database pada seluruh module ERP Bibit Net.

Repository merupakan satu-satunya lapisan yang diperbolehkan berkomunikasi dengan Prisma.

---

# Arsitektur

```text
Page / Route

↓

Action

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL
```

---

# Filosofi

Repository bertanggung jawab terhadap:

* Query Database
* Mapping Data
* Transaction
* Persistence

Repository **tidak** bertanggung jawab terhadap:

* Business Logic
* Validasi
* Authorization
* UI

---

# Tanggung Jawab

## Repository

Repository hanya berisi operasi database.

Contoh:

```ts
findAll()

findById()

findByEmail()

create()

update()

delete()
```

Repository tidak boleh memiliki keputusan bisnis.

---

## Service

Service merupakan pusat Business Logic.

Contoh:

```text
Register User

↓

Cek Email

↓

Hash Password

↓

Repository.create()
```

Business Rule selalu berada di Service.

---

# Contoh

## Salah

```text
Page

↓

Repository

↓

Database
```

Karena Page langsung mengetahui database.

---

## Salah

```text
Action

↓

Repository

↓

Database
```

Karena Business Logic hilang.

---

## Benar

```text
Page

↓

Action

↓

Service

↓

Repository

↓

Database
```

---

# Rules

## Rule #1

Repository hanya berisi query database.

---

## Rule #2

Repository tidak boleh melakukan validasi.

---

## Rule #3

Repository tidak boleh melakukan hashing password.

---

## Rule #4

Repository tidak boleh memanggil Service lain.

---

## Rule #5

Repository tidak boleh mengetahui UI.

---

## Rule #6

Repository hanya menggunakan Prisma Singleton.

```ts
import { prisma } from "@/lib/prisma";
```

---

## Rule #7

Repository tidak boleh mengakses process.env.

---

# Struktur

```text
products/

repositories/

product.repository.ts
```

atau

```text
users/

repositories/

user.repository.ts
```

---

# Contoh Alur

Membuat User.

```text
Register Page

↓

registerAction()

↓

userService.register()

↓

userRepository.findByEmail()

↓

userRepository.create()

↓

Database
```

---

# Dependency

Repository hanya bergantung pada:

* Prisma
* Type
* Schema Database

Repository tidak bergantung pada:

* React
* Next.js
* UI
* Components

---

# Keuntungan

* Mudah diuji (Unit Test).
* Query database terpusat.
* Business Logic tidak bercampur dengan query.
* Mudah mengganti ORM jika diperlukan.
* Konsisten pada seluruh module.

---

# Architecture Decision

ERP Bibit Net menggunakan Repository Pattern sebagai standar akses database.

Seluruh query database harus berada pada Repository.

Tidak diperbolehkan melakukan query Prisma secara langsung dari:

* Page
* Route
* Action
* Service
* Component

Semua query harus melewati Repository.
