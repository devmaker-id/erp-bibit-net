# Module Standard

**Phase:** Domain Foundation v2.0

---

# Tujuan

Menetapkan standar struktur module agar seluruh ERP memiliki pola yang konsisten, mudah dipelihara, dan mudah dikembangkan.

Module merupakan unit utama pengembangan pada ERP Bibit Net.

---

# Filosofi

ERP Bibit Net dibangun berdasarkan **Domain**, bukan berdasarkan halaman (Page) atau Controller.

```text
Foundation

↓

Architecture

↓

Convention

↓

Module

↓

Feature
```

Setiap fitur baru harus berada di dalam module yang sesuai.

---

# Prinsip

## 1. Satu Module = Satu Domain Bisnis

Satu module hanya bertanggung jawab terhadap satu domain bisnis.

Contoh:

```text
products
```

Mengelola:

* Product
* Product Category
* Product Unit

Tidak mengelola:

* Stock
* Purchase
* Sales

---

Contoh:

```text
inventory
```

Mengelola:

* Warehouse
* Stock
* Stock Movement
* Adjustment

Tidak mengelola:

* Product
* Supplier

---

# Naming Convention

Seluruh module bisnis menggunakan **nama jamak (Plural)**.

## Benar

```text
products
users
roles
categories
suppliers
customers
warehouses
inventories
purchases
sales
reports
```

## Salah

```text
product
user
role
warehouse
supplier
customer
```

Alasan:

Satu module mengelola kumpulan data, bukan satu objek.

---

# Reserved Module

Folder yang diawali karakter `_` merupakan folder khusus.

Bukan Domain Module.

## Contoh

```text
_template
_shared
_core
```

---

## _template

Blueprint struktur module.

Tidak digunakan oleh aplikasi.

---

## _shared

Kode yang digunakan bersama oleh beberapa module.

Misalnya:

* Shared Component
* Shared Hook
* Shared Schema

---

## _core

Berisi infrastruktur internal aplikasi.

Contoh:

* Audit
* Event
* Notification
* Queue

---

# Rule

## Rule #1

Gunakan nama jamak (Plural).

```text
products
```

Bukan

```text
product
```

---

## Rule #2

Gunakan awalan `_` hanya untuk folder blueprint atau infrastructure internal.

---

## Rule #3

Satu module hanya memiliki satu tanggung jawab (Single Responsibility).

Jangan mencampur logika domain.

---

## Rule #4

Module tidak boleh mengakses database module lain secara langsung.

Komunikasi antar module dilakukan melalui Service.

---

## Rule #5

Setiap module memiliki struktur folder yang sama.

Hal ini memudahkan developer memahami project tanpa harus mempelajari ulang setiap module.

---

# Contoh

```text
src/
└── modules/
    ├── _template/
    ├── _shared/
    ├── auth/
    ├── users/
    ├── roles/
    ├── products/
    ├── inventories/
    ├── purchases/
    ├── sales/
    └── reports/
```

---

# Tujuan Akhir

Developer yang baru bergabung cukup memahami satu module.

Karena seluruh module memiliki pola, struktur, dan aturan yang sama.

Dengan demikian ERP Bibit Net dapat berkembang menjadi puluhan module tanpa kehilangan konsistensi arsitektur.
