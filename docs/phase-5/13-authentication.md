# 13. Authentication & RBAC Architecture

> ERP Bibit Net Authentication Foundation

---

# Overview

Authentication merupakan fondasi keamanan ERP Bibit Net.

Berbeda dengan aplikasi biasa, ERP Bibit Net dirancang sejak awal sebagai sistem **Multi Company**, **Multi Branch**, dan **Role Based Access Control (RBAC)**.

Karena itu desain Authentication tidak hanya menangani proses login, tetapi juga menentukan konteks kerja (Workspace) pengguna.

---

# Design Goals

Authentication harus mampu mendukung:

* Multi Company
* Multi Branch
* Multi Warehouse
* Multi Role
* Context Switching
* Role Based Access Control (RBAC)
* Future REST API
* Future Mobile API
* Audit Log
* Activity Log

---

# Authentication Philosophy

Authentication bertugas menjawab:

> Siapa pengguna yang sedang menggunakan sistem?

Authorization bertugas menjawab:

> Apa yang boleh dilakukan oleh pengguna tersebut?

Kedua konsep ini harus dipisahkan secara jelas.

---

# Identity Architecture

User merupakan identitas global.

User **bukan** milik Company.

Hubungan User dengan Company dilakukan melalui Membership.

```text
User
        │
        ▼
Membership
        │
        ├── Company
        ├── Branch
        └── Role
```

Dengan pendekatan ini:

* satu User dapat bekerja di banyak Company
* satu User dapat memiliki banyak Branch
* satu User dapat memiliki Role yang berbeda pada Company yang berbeda

---

# RBAC Architecture

ERP Bibit Net menggunakan Role Based Access Control.

Relasi antar model:

```text
Permission
        ▲
        │
RolePermission
        ▲
        │
Role
        ▲
        │
Membership
        ▲
        │
User
```

Permission tidak diberikan langsung kepada User.

Permission selalu berasal dari Role.

---

# Permission Convention

Seluruh Permission menggunakan format:

```text
resource.action
```

Contoh:

```text
companies.read
companies.create
companies.update
companies.delete

branches.read
branches.create
branches.update
branches.delete

warehouses.read
warehouses.create
warehouses.update
warehouses.delete

products.read
products.create
products.update
products.delete

sales.read
sales.create
sales.invoice

purchase.read
purchase.create
purchase.approve

inventory.adjust
inventory.transfer
inventory.opname
```

Aturan:

* huruf kecil
* menggunakan titik (`.`)
* format selalu `resource.action`

Tidak diperbolehkan menggunakan format:

```text
CREATE_COMPANY
DELETE_PRODUCT
```

---

# Membership Architecture

Membership merupakan inti dari sistem Multi Company.

```text
User
        │
        ▼
Membership
        │
        ├── Company
        ├── Branch
        └── Role
```

Membership menentukan:

* Company tempat User bekerja
* Branch tempat User bekerja
* Role yang dimiliki User

Satu User dapat memiliki lebih dari satu Membership.

Contoh:

```text
Rudi

↓

Membership 1

Company : Bibit Net

Branch : Head Office

Role : Administrator

↓

Membership 2

Company : Bibit Logistics

Branch : Jakarta

Role : Warehouse Manager
```

Tidak diperlukan akun baru.

---

# Workspace Concept

Setelah login, User bekerja pada sebuah Workspace.

Workspace terdiri dari:

```text
Company

↓

Branch

↓

Role

↓

Permissions
```

Workspace aktif menentukan seluruh aktivitas pengguna selama sesi berlangsung.

User dapat berpindah Workspace tanpa perlu login ulang.

---

# Session Architecture

Session menyimpan konteks kerja pengguna.

Bukan hanya User.

Session berisi:

```text
Session

↓

User

↓

Active Membership

↓

Company

↓

Branch

↓

Role

↓

Permissions

↓

Expired At
```

Dengan demikian seluruh request selalu mengetahui konteks perusahaan dan cabang yang sedang aktif.

---

# Login Flow

```text
Login

↓

Verify Credential

↓

Load Memberships

↓

Choose Workspace

↓

Create Session

↓

Dashboard
```

Apabila User hanya memiliki satu Membership, Workspace dapat dipilih secara otomatis.

---

# Authorization Flow

Seluruh Authorization dilakukan pada Safe Action.

```text
Request

↓

Safe Action

↓

Authentication

↓

Permission Check

↓

Validation

↓

Service

↓

Repository

↓

Database
```

Contoh:

```ts
safeAction({
    schema: createCompanyValidator,
    handler: companyService.create,
    permission: "companies.create",
})
```

Safe Action bertugas:

* memastikan User telah login
* memastikan Session masih aktif
* memastikan Permission dimiliki User
* menjalankan Validator
* menjalankan Business Logic
* menangani Error
* menghasilkan Response yang konsisten

---

# Future Scalability

Arsitektur ini dirancang untuk mendukung:

* Multi Company
* Multi Branch
* Multi Warehouse
* Multiple Membership
* Workspace Switching
* REST API
* Mobile API
* Audit Log
* Activity Log
* Scheduler
* Background Jobs

Tanpa perubahan struktur database utama.

---

# Design Decisions

Keputusan arsitektur yang menjadi standar ERP Bibit Net:

* User adalah identitas global.
* Company tidak memiliki User secara langsung.
* Membership menghubungkan User dengan Company, Branch, dan Role.
* Role bersifat global.
* Permission diberikan melalui Role.
* Permission menggunakan format `resource.action`.
* Session menyimpan Active Workspace.
* Seluruh Authorization dilakukan melalui RBAC.
* Seluruh pengecekan Permission dilakukan melalui Safe Action.
* Business Service tidak mengetahui mekanisme Authentication maupun Authorization.

---

# Authentication Roadmap

```text
Permission
        │
        ▼
Role
        │
        ▼
RolePermission
        │
        ▼
User
        │
        ▼
Membership
        │
        ▼
Session
        │
        ▼
Authentication
        │
        ▼
Middleware
        │
        ▼
Authorization (RBAC)
```

Dokumen ini menjadi **Source of Truth** untuk seluruh implementasi Authentication dan Authorization pada ERP Bibit Net.
