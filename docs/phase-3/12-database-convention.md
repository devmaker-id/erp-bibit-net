# Database Convention

**Phase:** Core Organization v3.2

---

# Tujuan

Menetapkan standar desain database untuk seluruh ERP Bibit Net.

Seluruh model Prisma wajib mengikuti konvensi ini.

Tujuannya adalah menjaga konsistensi, mempermudah maintenance, dan menghindari perbedaan gaya penulisan antar module.

---

# Filosofi

Database mengikuti Domain.

Bukan Domain mengikuti Database.

```text
Business Domain

↓

Prisma Schema

↓

PostgreSQL
```

Perubahan struktur database harus selalu berasal dari kebutuhan Domain.

---

# Primary Key

Seluruh Primary Key menggunakan:

```prisma
id String @id @default(cuid())
```

Tidak menggunakan:

```prisma
id Int @id @default(autoincrement())
```

---

## Alasan

* Aman untuk Multi Company.
* Siap untuk Distributed System.
* Aman untuk API.
* Siap untuk Mobile.
* Tidak bergantung pada Auto Increment.

---

# Timestamp

Seluruh Entity wajib memiliki:

```prisma
createdAt DateTime @default(now())

updatedAt DateTime @updatedAt
```

---

# Soft Delete

ERP Bibit Net menggunakan Soft Delete.

```prisma
deletedAt DateTime?
```

NULL berarti data masih aktif.

Jika memiliki nilai tanggal berarti data telah dihapus.

Tidak menggunakan:

```prisma
isDeleted Boolean
```

---

# Active Status

Entity yang dapat dinonaktifkan wajib memiliki:

```prisma
isActive Boolean @default(true)
```

Contoh:

* Company
* Branch
* Warehouse
* User
* Product

Tidak semua Entity membutuhkan `isActive`.

Misalnya:

* Sales Invoice
* Purchase Order

karena menggunakan Status transaksi.

---

# Penamaan Field

Menggunakan **camelCase**.

## Benar

```text
companyId
createdAt
updatedAt
deletedAt
postalCode
taxNumber
```

---

## Salah

```text
company_id
created_at
updated_at
postal_code
```

---

# Foreign Key

Gunakan pola:

```text
entityId
```

Contoh:

```text
companyId
branchId
warehouseId
roleId
userId
productId
supplierId
customerId
```
---
# International Standards

ERP Bibit Net menggunakan standar internasional apabila tersedia.

Hal ini bertujuan agar sistem mudah diintegrasikan dengan aplikasi lain dan siap digunakan pada lingkungan Multi Company maupun Multi Country.

---

## Currency

Gunakan kode mata uang ISO 4217.

Contoh:

```text
IDR
USD
SGD
MYR
JPY
EUR
```

Field:

```prisma
currencyCode String
```

Jangan menggunakan:

```text
Rupiah
Dollar
Yen
```

---

## Country

Gunakan kode negara ISO 3166-1 Alpha-2.

Contoh:

```text
ID
SG
MY
US
JP
CN
```

Field:

```prisma
countryCode String
```

Jangan menggunakan:

```text
Indonesia
Singapore
Malaysia
```

---

## Timezone

Gunakan standar IANA Time Zone.

Contoh:

```text
Asia/Jakarta

Asia/Singapore

UTC

Europe/London
```

Field:

```prisma
timezone String
```

Jangan menggunakan:

```text
GMT+7

UTC+8
```

Karena format tersebut tidak mempertimbangkan perubahan Daylight Saving Time.

---

# Relation

Nama Relation menggunakan bentuk jamak apabila memiliki banyak data.

Contoh:

```prisma
branches Branch[]

users User[]

products Product[]
```

Relation satu data menggunakan bentuk tunggal.

```prisma
company Company
```

---

# Enum

Gunakan Enum apabila nilai bersifat tetap.

Contoh:

```text
Currency

Language

Gender

DocumentStatus

PaymentStatus
```

Jangan menggunakan Enum apabila datanya dapat berubah oleh pengguna.

Contoh:

Role.

Role merupakan Domain Data.

Bukan Enum.

---

# Decimal

Seluruh nilai uang menggunakan:

```prisma
Decimal
```

Tidak menggunakan:

```prisma
Float
```

Karena Float memiliki kesalahan pembulatan.

Contoh:

* Price
* Cost
* Tax
* Discount
* Total

---

# Boolean

Gunakan Boolean hanya untuk kondisi yang benar-benar dua nilai.

Contoh:

```text
isActive

isHeadOffice

isSystem
```

Jangan menggunakan Boolean untuk Status transaksi.

---

# Status

Status menggunakan Enum.

Contoh:

```text
Draft

Pending

Approved

Rejected

Completed

Cancelled
```

Bukan beberapa Boolean.

---

# Audit

Minimal seluruh Entity memiliki:

```text
createdAt

updatedAt
```

Tahap berikutnya akan ditambahkan:

```text
createdBy

updatedBy

deletedBy
```

setelah module Users selesai dibangun.

---

# Multi Company

Seluruh Domain Module wajib memiliki konteks Company.

Contoh:

```text
Company

↓

Products
```

```text
Company

↓

Customers
```

```text
Company

↓

Suppliers
```

Tidak diperbolehkan membuat data bisnis tanpa Company.

---

# Multi Branch

Entity operasional wajib memiliki konteks Branch.

Contoh:

```text
Branch

↓

Warehouse

↓

Inventory

↓

Purchase

↓

Sales
```

---

# Unique Constraint

Gunakan Unique sesuai konteks Domain.

Contoh:

Kode Branch unik dalam satu Company.

```text
(companyId, code)
```

Kode Warehouse unik dalam satu Branch.

```text
(branchId, code)
```

Jangan membuat Unique global apabila tidak diperlukan.

---

# Naming Convention

Model menggunakan PascalCase.

```text
Company

Branch

Warehouse

Product

Supplier
```

Field menggunakan camelCase.

```text
companyId

createdAt

updatedAt
```

Table mengikuti nama Model dari Prisma.

---

# Migration

Setiap perubahan schema wajib melalui Migration.

```bash
npx prisma migrate dev --name nama_migration
```

Setelah Migration:

```bash
npx prisma generate
```

Tidak diperbolehkan mengubah database secara manual.

---

# Rules

## Rule #1

Gunakan `cuid()` sebagai Primary Key.

---

## Rule #2

Gunakan camelCase untuk seluruh field.

---

## Rule #3

Gunakan `createdAt` dan `updatedAt` pada seluruh Entity.

---

## Rule #4

Gunakan `deletedAt` untuk Soft Delete.

---

## Rule #5

Gunakan `Decimal` untuk nilai uang.

---

## Rule #6

Gunakan Enum untuk Status yang tetap.

---

## Rule #7

Gunakan Foreign Key dengan akhiran `Id`.

---

## Rule #8

Seluruh Domain memiliki konteks Company.

---

## Rule #9

Entity operasional memiliki konteks Branch.

---

## Rule #10

Perubahan schema hanya dilakukan melalui Prisma Migration.

---
## Rule #11

Gunakan standar internasional apabila tersedia.

- Currency → ISO 4217
- Country → ISO 3166-1
- Timezone → IANA

---

## Rule #12

Seluruh model Prisma wajib menggunakan `@@map()`.

Nama tabel PostgreSQL menggunakan bentuk jamak (Plural).

Contoh:

```prisma
@@map("companies")
```

```prisma
@@map("branches")
```

```prisma
@@map("warehouses")
```

# Architecture Decision

ERP Bibit Net menggunakan satu standar database untuk seluruh Domain.

Setiap model Prisma wajib mengikuti konvensi ini agar seluruh sistem memiliki struktur yang konsisten, mudah dipelihara, dan siap berkembang menjadi ERP Multi Company, Multi Branch, dan Multi Warehouse tanpa perubahan arsitektur yang besar.


## Base Entity

✓ id
✓ createdAt
✓ updatedAt
✓ deletedAt
✓ isActive (opsional, hanya jika relevan)
