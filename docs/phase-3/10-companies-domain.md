# Companies Domain

**Phase:** Core Organization v3.0

---

# Tujuan

Module **Companies** merupakan Root Domain pada ERP Bibit Net.

Seluruh domain bisnis berada di bawah Company.

ERP Bibit Net menggunakan arsitektur **Multi Company** sejak awal.

---

# Filosofi

```text
Company
│
├── Branches
├── Warehouses
├── Users
├── Roles
├── Permissions
├── Products
├── Suppliers
├── Customers
├── Purchases
├── Sales
└── Reports
```

Semua data bisnis dimiliki oleh Company.

Tidak ada data global selain konfigurasi sistem.

---

# Business Rule

## Rule #1

Minimal terdapat satu Company.

---

## Rule #2

Company tidak boleh dihapus apabila masih memiliki:

- Branch
- User
- Product
- Warehouse
- Supplier
- Customer
- Purchase
- Sales

---

## Rule #3

Company dapat dinonaktifkan.

Namun seluruh transaksi akan ikut dinonaktifkan.

---

## Rule #4

Company memiliki banyak Branch.

---

## Rule #5

Company memiliki banyak User.

---

## Rule #6

Company memiliki banyak Role.

---

## Rule #7

Company memiliki banyak Warehouse.

---

## Rule #8

Setiap transaksi selalu berada di dalam Company.

---

# Entity

```text
Company

id

code

name

legalName

email

phone

website

taxNumber

logo

address

city

province

postalCode

country

timezone

currency

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
Company

↓

Roles

↓

Users
```

```text
Company

↓

Products
```

```text
Company

↓

Suppliers
```

```text
Company

↓

Customers
```

---

# Lifecycle

```text
Create Company

↓

Setup Branch

↓

Setup Warehouse

↓

Setup Roles

↓

Setup Users

↓

ERP Ready
```

---

# Architecture Decision

Company merupakan Root Aggregate ERP Bibit Net.

Seluruh Domain Module harus memiliki konteks Company.

Tidak diperbolehkan membuat data bisnis tanpa Company.