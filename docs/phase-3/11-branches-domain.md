# Branches Domain

**Phase:** Core Organization v3.1

---

# Tujuan

Module **Branches** bertanggung jawab mengelola cabang operasional perusahaan.

Branch merupakan bagian dari Company.

---

# Filosofi

```text
Company

↓

Branches

↓

Warehouses

↓

Operations
```

Branch bukan perusahaan.

Branch merupakan lokasi operasional Company.

---

# Business Rule

## Rule #1

Branch wajib memiliki Company.

---

## Rule #2

Branch dapat memiliki banyak Warehouse.

---

## Rule #3

Branch dapat memiliki banyak User.

---

## Rule #4

Branch memiliki satu kode unik dalam Company.

Contoh:

```text
Company A

BDG

JKT

SBY
```

Company lain boleh memiliki kode yang sama.

---

## Rule #5

Branch tidak boleh dihapus apabila masih memiliki:

- Warehouse
- User
- Transaction

---

## Rule #6

Branch dapat dinonaktifkan.

---

## Rule #7

Setiap transaksi operasional terjadi pada satu Branch.

---

# Entity

```text
Branch

id

companyId

code

name

email

phone

manager

address

city

province

postalCode

country

latitude

longitude

isHeadOffice

isActive

createdAt

updatedAt
```

---

# Relationship

```text
Company

↓

Branches

↓

Warehouses
```

```text
Branch

↓

Users
```

```text
Branch

↓

Sales
```

```text
Branch

↓

Purchases
```

```text
Branch

↓

Inventory
```

---

# Lifecycle

```text
Create Company

↓

Create Branch

↓

Create Warehouse

↓

Assign User

↓

Operational
```

---

# Architecture Decision

Branch merupakan unit operasional Company.

Seluruh aktivitas operasional ERP selalu terjadi pada Branch.

Warehouse, User, Sales, Purchase, dan Inventory harus memiliki konteks Branch.