# Action Pattern

**Phase:** Domain Foundation v2.4

---

# Tujuan

Menetapkan standar Entry Point seluruh proses bisnis pada ERP Bibit Net.

Action merupakan satu-satunya pintu masuk (Entry Point) dari UI menuju Business Logic.

---

# Filosofi

Action menerima request dari UI, melakukan validasi awal, kemudian meneruskan proses ke Service.

```text
Browser

↓

Page

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

Action tidak boleh berisi Business Logic.

---

# Tanggung Jawab

Action bertanggung jawab terhadap:

* Menerima Request
* Validasi Input
* Memanggil Service
* Menangani Error
* Mengembalikan Response

Action tidak bertanggung jawab terhadap:

* Query Database
* Business Rule
* UI Rendering

---

# Struktur

```text
products/

actions/

create-product.ts

update-product.ts

delete-product.ts

find-products.ts
```

---

# Rules

## Rule #1

Action merupakan satu-satunya Entry Point.

---

## Rule #2

Action tidak boleh memanggil Prisma.

---

## Rule #3

Action tidak boleh melakukan Query Database.

---

## Rule #4

Action tidak boleh memiliki Business Logic.

---

## Rule #5

Action wajib menggunakan Validator sebelum memanggil Service.

```text
Action

↓

Validator

↓

Service
```

---

## Rule #6

Action hanya berkomunikasi dengan Service.

Tidak langsung dengan Repository.

---

## Rule #7

Action boleh menangani:

* Authentication
* Authorization
* Logging
* Audit
* Error Response

Tetapi tidak boleh menangani Business Rule.

---

# Alur Standar

```text
Page

↓

Action

↓

Validator

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

# Contoh

## Login

```text
Login Page

↓

loginAction()

↓

LoginValidator

↓

AuthService

↓

UserRepository

↓

Database
```

---

## Create Product

```text
Product Form

↓

createProductAction()

↓

CreateProductValidator

↓

ProductService

↓

ProductRepository

↓

Database
```

---

# Dependency

Action boleh menggunakan:

* Validator
* Service
* Logger
* Type

Action tidak boleh menggunakan:

* Prisma
* Repository
* React Component

---

# Keuntungan

* Semua request memiliki alur yang sama.
* Business Logic tetap bersih.
* Query database tetap terpusat.
* Mudah menambahkan Logging, Audit Trail, dan Authorization.
* Konsisten pada seluruh module.

---

# Architecture Decision

ERP Bibit Net menetapkan Action sebagai Entry Point utama.

Tidak menggunakan pola Controller tradisional.

Seluruh proses aplikasi mengikuti alur berikut:

```text
UI

↓

Action

↓

Validator

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL
```

Setiap module wajib mengikuti pola ini agar seluruh ERP memiliki arsitektur yang konsisten dan mudah dipelihara.
