# Validation Pattern

**Phase:** Domain Foundation v2.3

---

# Tujuan

Menetapkan standar validasi data pada seluruh module ERP Bibit Net.

Seluruh validasi menggunakan **Zod**.

Tidak menggunakan validasi manual.

---

# Filosofi

Validasi dilakukan sebelum Business Logic dijalankan.

```text
Request

↓

Validator

↓

Service

↓

Repository

↓

Database
```

Jika validasi gagal, proses berhenti.

Repository tidak pernah menerima data yang belum tervalidasi.

---

# Struktur

```text
products/

validators/

create-product.ts

update-product.ts

delete-product.ts
```

---

# Tanggung Jawab

Validator bertanggung jawab terhadap:

* Validasi Input
* Validasi Type
* Default Value
* Transform Data

Validator tidak bertanggung jawab terhadap:

* Business Logic
* Database
* UI

---

# Rules

## Rule #1

Seluruh validator menggunakan Zod.

---

## Rule #2

Validator tidak mengetahui Repository.

---

## Rule #3

Validator tidak mengetahui Prisma.

---

## Rule #4

Validator tidak melakukan query database.

---

## Rule #5

Validator tidak mengetahui React.

---

# Contoh

```text
Create Product

↓

Validator

↓

Service

↓

Repository
```

---

# Contoh Validasi

Validator memastikan:

* nama tidak kosong
* harga berupa angka
* stok berupa angka
* panjang karakter sesuai aturan

Validator tidak memastikan:

* SKU sudah ada atau belum
* Supplier tersedia atau tidak

Hal tersebut merupakan Business Logic.

---

# Dependency

Validator hanya boleh menggunakan:

* Zod
* Type

Tidak boleh menggunakan:

* Repository
* Service
* Prisma
* React

---

# Architecture Decision

ERP Bibit Net menggunakan Zod sebagai satu-satunya library validasi.

Semua validasi dilakukan sebelum Service dijalankan.
