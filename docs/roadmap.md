# ERP Bibit Net Roadmap

> 🌱 **ERP Bibit Net**
>
> Enterprise Resource Planning berbasis **Next.js 16**, **React 19**, **Prisma ORM 7**, dan **PostgreSQL 16**.
>
> **Architecture**
>
> * Multi Company
> * Multi Branch
> * Multi Warehouse
> * Modular Architecture
> * Domain Driven Design (DDD)
> * Monolithic Next.js

---

# Phase 1 — Foundation

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

* [x] Module Standard
* [x] Module Blueprint
* [x] Repository Pattern
* [x] Service Pattern
* [x] Validation Pattern
* [x] Action Pattern
* [x] Database Convention

---

# Phase 3 — Backend Foundation

* [x] Core Error System
* [x] Response Contract
* [x] Safe Action
* [x] Logger
* [x] Database Layer
* [x] Repository Layer
* [x] Service Layer
* [x] Validation Layer

---

# Phase 4 — Identity & Access Management (IAM)

## Phase 4.1 — Permission

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [x] Repository
* [x] Service
* [x] Validator
* [x] Action
* [x] UI
* [ ] Testing

---

## Phase 4.2 — Role

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [x] Repository
* [x] Service
* [x] Validator
* [x] Action
* [x] UI
* [ ] Testing

---

## Phase 4.3 — Role Permission

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [x] Repository
* [x] Service
* [x] Validator
* [x] Action
* [x] UI
* [ ] Testing

---

## Phase 4.4 — User

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

## Phase 4.5 — Membership

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [x] Repository
* [x] Service
* [x] Validator
* [x] Action
* [x] UI
* [ ] Testing

---

## Phase 4.6 — Session

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

## Phase 4.7 — Authentication

### Backend

* [x] Login
* [x] Logout
* [x] Current User
* [x] Current Session
* [x] Refresh Session
* [x] Session Cookie

### UI

* [x] Login Page
* [x] Login Layout
* [x] Login Branding
* [x] Login Form
* [x] Login Card
* [x] Login Mobile Header
* [x] Login Footer

### Next

* [ ] Remember Me
* [ ] Forgot Password
* [ ] Reset Password
* [ ] Verify Email
* [ ] Two Factor Authentication

---

## Phase 4.8 — Authorization

* [x] RBAC Foundation
* [x] Permission Guard
* [x] Role Guard
* [ ] Middleware
* [ ] Workspace Switcher
* [ ] Company Switcher
* [ ] Branch Switcher
* [ ] Warehouse Switcher

---

## Phase 4.9 — Audit & Security

* [ ] Session List
* [ ] Logout All Devices
* [ ] Revoke Session
* [ ] Login History
* [ ] Failed Login
* [ ] Account Lock
* [ ] Audit Log

---

# Phase 5 — Organization

## Phase 5.1 — Companies

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [x] Repository
* [x] Service
* [x] Validator
* [x] Action
* [x] UI
* [ ] Testing

---

## Phase 5.2 — Branches

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [x] Repository
* [x] Service
* [x] Validator
* [x] Action
* [x] UI
* [ ] Testing

---

## Phase 5.3 — Warehouses

* [x] Documentation
* [x] Prisma Model
* [x] Migration
* [x] Seeder
* [x] Repository
* [x] Service
* [x] Validator
* [x] Action
* [x] UI
* [ ] Testing

---

# Phase 6 — Dashboard

* [ ] Dashboard Home
* [ ] KPI Cards
* [ ] Company Summary
* [ ] Branch Summary
* [ ] Warehouse Summary
* [ ] Inventory Summary
* [ ] Sales Summary
* [ ] Recent Activities
* [ ] Quick Actions

---

# Phase 7 — Master Data

* [ ] Units
* [ ] Categories
* [ ] Brands
* [ ] Products
* [ ] Suppliers
* [ ] Customers

---

# Phase 8 — Inventory

* [ ] Stock
* [ ] Stock Movement
* [ ] Stock Adjustment
* [ ] Stock Transfer
* [ ] Stock Opname

---

# Phase 9 — Purchasing

* [ ] Purchase Requests
* [ ] Purchase Orders
* [ ] Goods Receipts
* [ ] Supplier Invoices
* [ ] Purchase Returns

---

# Phase 10 — Sales

* [ ] Quotations
* [ ] Sales Orders
* [ ] Delivery Orders
* [ ] Sales Invoices
* [ ] Customer Payments
* [ ] Sales Returns

---

# Phase 11 — Reporting

* [ ] Dashboard Analytics
* [ ] Inventory Report
* [ ] Purchase Report
* [ ] Sales Report
* [ ] Financial Report
* [ ] Export Excel
* [ ] Export PDF
* [ ] Scheduled Reports

---

# Phase 12 — System Administration

* [ ] User Management
* [ ] Role Management
* [ ] Permission Management
* [ ] Company Settings
* [ ] Branch Settings
* [ ] Warehouse Settings
* [ ] Numbering System
* [ ] Activity Log
* [ ] Audit Log
* [ ] Backup
* [ ] Restore

---

# Phase 13 — Platform

* [ ] Notification Center
* [ ] Email Service
* [ ] File Storage
* [ ] Background Jobs
* [ ] Scheduler
* [ ] REST API
* [ ] Mobile API
* [ ] Public API
* [ ] Webhook
* [ ] Import Engine
* [ ] Export Engine

---

# Phase 14 — Refactor & Optimization

## Architecture

* [ ] Generic CRUD Components
* [ ] Generic Data Table
* [ ] Generic Dialog
* [ ] Generic Form
* [ ] Generic Delete Dialog

## Type Safety

* [ ] Remove `any`
* [ ] Relation Types
* [ ] Typed DataTable
* [ ] Repository Result Types

## Performance

* [ ] Server Component Optimization
* [ ] React Query
* [ ] Lazy Dialog
* [ ] Parallel Data Fetching

## Developer Experience

* [ ] Option Mapper Helpers
* [ ] Generic Select Option
* [ ] Module Generator
* [ ] Testing Utilities

---

# Current Milestone

## ✅ Completed

* Foundation
* Architecture Foundation
* Backend Foundation

### IAM

* Permission Module V1
* Role Module V1
* Role Permission Module V1
* Membership Module V1

### Organization

* Company Module V1
* Branch Module V1
* Warehouse Module V1

### Authentication

* Authentication Foundation
* Login UI
* Session Authentication

---

## 🎯 Current Sprint

* User Module

---

## 🚀 Next Sprint

* Session Module
* Authorization
* Dashboard
* Master Data