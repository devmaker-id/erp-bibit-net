# Service Pattern

**Phase:** Domain Foundation v2.2

---

# Tujuan

Menetapkan standar Business Logic pada seluruh module ERP Bibit Net.

Service merupakan pusat seluruh aturan bisnis (Business Rule).

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

Service berada di antara Action dan Repository.

---

# Filosofi

Service menjawab pertanyaan:

> **Apa yang harus dilakukan?**

Repository menjawab pertanyaan:

> **Bagaimana mengambil data?**

---

# Tanggung Jawab

Service bertanggung jawab terhadap:

* Business Logic
* Validation Flow
* Transaction Flow
* Authorization
* Orchestration
* Error Handling

Service tidak bertanggung jawab terhadap:

* UI
* Query Database
* React Component

---

# Contoh

## Register User

```text
Register

↓

Validasi Input

↓

Cek Email

↓

Hash Password

↓

Simpan User

↓

Return Result
```

Yang melakukan seluruh proses di atas adalah Service.

Repository hanya mengetahui:

```text
findByEmail()

create()
```

---

## Create Product

```text
Create Product

↓

Validasi

↓

Generate SKU

↓

Simpan Product

↓

Return Product
```

---

# Rules

## Rule #1

Business Logic hanya berada di Service.

---

## Rule #2

Service tidak boleh melakukan query Prisma.

Gunakan Repository.

---

## Rule #3

Service boleh menggunakan beberapa Repository.

Contoh:

```text
Purchase Service

↓

Supplier Repository

↓

Product Repository

↓

Inventory Repository

↓

Purchase Repository
```

---

## Rule #4

Service boleh menjalankan Transaction.

---

## Rule #5

Service mengembalikan data yang sudah siap digunakan.

---

## Rule #6

Service tidak mengetahui UI.

---

## Rule #7

Service tidak menggunakan React.

---

## Rule #8

Service tidak menggunakan Next.js Component.

---

# Contoh Dependency

```text
services/

↓

repositories/

↓

prisma/
```

Tidak boleh sebaliknya.

---

# Contoh Alur

```text
Login Page

↓

loginAction()

↓

authService.login()

↓

userRepository.findByEmail()

↓

password.compare()

↓

jwt.sign()

↓

Return Session
```

---

# Dependency

Service boleh menggunakan:

* Repository
* Validator
* Constant
* Type
* Utility
* Logger

Service tidak boleh menggunakan:

* Component
* React Hook
* Page
* Prisma

---

# Keuntungan

* Business Rule terpusat.
* Mudah di-test.
* Mudah dipelihara.
* Mudah digunakan ulang.
* Tidak bergantung pada UI.

---

# Architecture Decision

ERP Bibit Net menetapkan bahwa seluruh Business Logic harus berada di Service.

Repository hanya menangani akses data.

Action hanya menjadi entry point.

Page hanya menangani tampilan.

Dengan demikian perubahan UI tidak memengaruhi Business Logic, dan perubahan Business Logic tidak memengaruhi akses database.
