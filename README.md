# 🌱 ERP Bibit Net

Enterprise Resource Planning (ERP) berbasis **Next.js 16**, **React 19**, **Prisma ORM 7**, dan **PostgreSQL 16**.

ERP Bibit Net dirancang sebagai ERP modern yang berorientasi Domain (Domain-Driven), Modular, dan Multi Company untuk kebutuhan jangka panjang.

---

# Vision

Membangun ERP yang:

* Modular
* Maintainable
* Scalable
* Multi Company
* Multi Branch
* Multi Warehouse

dengan satu codebase yang konsisten.

---

# Technology Stack

| Component  | Technology     |
| ---------- | -------------- |
| Framework  | Next.js 16     |
| Language   | TypeScript     |
| UI         | React 19       |
| Styling    | Tailwind CSS 4 |
| Components | shadcn/ui      |
| ORM        | Prisma ORM 7   |
| Database   | PostgreSQL 16  |
| Validation | Zod            |
| State      | Zustand        |
| Table      | TanStack Table |
| Query      | TanStack Query |

---

# Architecture

```text
Browser
        │
        ▼
Next.js
        │
        ▼
Action
        │
        ▼
Service
        │
        ▼
Repository
        │
        ▼
Prisma
        │
        ▼
PostgreSQL
```

---

# Project Structure

```text
src/
│
├── app/
├── components/
├── generated/
├── lib/
└── modules/
```

Setiap module mengikuti standar yang sama.

```text
module/
│
├── actions/
├── repositories/
├── services/
├── validators/
├── README.md
└── index.ts
```

---

# Development Principles

ERP Bibit Net dibangun dengan prinsip:

* Domain First
* Feature Modular
* Repository Pattern
* Service Pattern
* Action Pattern
* Validation Pattern
* Database Convention

---

# Project Documentation

Seluruh dokumentasi tersedia pada folder:

```text
docs/
```

Dokumentasi meliputi:

* Foundation
* Architecture
* Database
* Domain
* Module Standard
* Development Convention

---

# Development Roadmap

Lihat:

```text
docs/00-roadmap.md
```

---

# License

Private Project.

Copyright © ERP [Bibit Net](https://github.com/devmaker-id/erp-bibit-net)