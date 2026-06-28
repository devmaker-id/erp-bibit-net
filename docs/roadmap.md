# ERP Bibit Net Roadmap

> 🌱 **ERP Bibit Net**
> Enterprise Resource Planning berbasis **Next.js 16**, **React 19**, **Prisma ORM 7**, dan **PostgreSQL 16**.
>
> Architecture:
>
> * Multi Company
> * Multi Branch
> * Multi Warehouse
> * Modular Architecture
> * Domain Driven Design (DDD)
> * Monolithic Next.js

---

# Phase 1 — Foundation

Membangun pondasi teknis aplikasi.

* [x] Project Structure
* [x] Branding
* [x] Metadata
* [x] Environment Configuration
* [x] PostgreSQL Configuration
* [x] Prisma Configuration
* [x] Prisma Singleton
* [x] Documentation Standard

---

# Phase 2 — Architecture Foundation

Membangun standar arsitektur aplikasi.

* [x] Module Standard
* [x] Module Blueprint
* [x] Repository Pattern
* [x] Service Pattern
* [x] Validation Pattern
* [x] Action Pattern
* [x] Database Convention

---

# Phase 3 — Backend Foundation

Membangun pondasi backend yang digunakan oleh seluruh domain.

* [x] Core Error System
* [x] Response Contract
* [x] Safe Action
* [x] Logger
* [x] Database Layer
* [x] Repository Layer
* [x] Service Layer
* [x] Validation Layer

---

# Phase 4 — Core Organization

Membangun struktur organisasi perusahaan.

## Phase 4.1 — Companies

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] UI
* [ ] Testing

---

## Phase 4.2 — Branches

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] UI
* [ ] Testing

---

## Phase 4.3 — Warehouses

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] UI
* [ ] Testing

---

# Phase 5 — Identity & Access Management (IAM)

Membangun Authentication dan Authorization.

## Phase 5.1 — Permission

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [ ] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] Testing

---

## Phase 5.2 — Role

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [ ] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] Testing

---

## Phase 5.3 — Role Permission

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] Testing

---

## Phase 5.4 — User

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] Testing

---

## Phase 5.5 — Membership

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] Testing

---

## Phase 5.6 — Session

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [ ] Repository
* [ ] Service
* [ ] Validator
* [ ] Action
* [ ] Testing

---

## Phase 5.7 — Authentication

* [ ] Login
* [ ] Logout
* [ ] Refresh Session
* [ ] Current User

---

## Phase 5.8 — Authorization

* [ ] RBAC
* [ ] Permission Guard
* [ ] Middleware
* [ ] Workspace Switcher

---

# Phase 6 — Master Data

* [ ] Categories
* [ ] Products
* [ ] Suppliers
* [ ] Customers

---

# Phase 7 — Inventory

* [ ] Stock
* [ ] Stock Movement
* [ ] Stock Adjustment
* [ ] Stock Transfer
* [ ] Stock Opname

---

# Phase 8 — Purchasing

* [ ] Purchase Requests
* [ ] Purchase Orders
* [ ] Goods Receipts
* [ ] Supplier Invoices
* [ ] Purchase Returns

---

# Phase 9 — Sales

* [ ] Quotations
* [ ] Sales Orders
* [ ] Delivery Orders
* [ ] Invoices
* [ ] Payments
* [ ] Sales Returns

---

# Phase 10 — Reporting

* [ ] Dashboard Analytics
* [ ] Sales Report
* [ ] Purchase Report
* [ ] Inventory Report
* [ ] Financial Report
* [ ] Export Excel
* [ ] Export PDF

---

# Phase 11 — System Administration

* [ ] Company Settings
* [ ] Branch Settings
* [ ] Numbering System
* [ ] Activity Log
* [ ] Audit Log
* [ ] Backup
* [ ] Restore

---

# Phase 12 — Platform

* [ ] Multi Currency
* [ ] Notification Center
* [ ] Background Jobs
* [ ] Scheduler
* [ ] REST API
* [ ] Mobile API
* [ ] Public API
* [ ] Webhook
* [ ] Import & Export Engine

---

# Current Progress

```text
✅ Phase 1 — Foundation

✅ Phase 2 — Architecture Foundation

✅ Phase 3 — Backend Foundation

🚀 Current Phase

Phase 5.1 — Permission
```

---

# Development Workflow

Setiap domain wajib mengikuti urutan berikut:

```text
Documentation
        │
        ▼
Prisma Model
        │
        ▼
Migration
        │
        ▼
Seeder
        │
        ▼
Repository
        │
        ▼
Service
        │
        ▼
Validator
        │
        ▼
Action
        │
        ▼
UI
        │
        ▼
Testing
```

Tidak diperbolehkan melewati tahapan di atas.

---

# Development Principle

ERP Bibit Net dibangun berdasarkan prinsip:

```text
Foundation
        │
        ▼
Architecture
        │
        ▼
Convention
        │
        ▼
Domain
        │
        ▼
Module
        │
        ▼
Feature
        │
        ▼
User Interface
```

Business Domain selalu menjadi dasar sebelum implementasi database, backend, maupun user interface.