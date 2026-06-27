# Companies Module

## Tujuan

Module Companies bertanggung jawab mengelola data perusahaan.

Company merupakan Root Domain ERP Bibit Net.

---

## Dependency

Module ini menjadi pondasi bagi:

- Branches
- Warehouses
- Roles
- Users
- Products
- Suppliers
- Customers
- Purchases
- Sales

---

## Business Rule

- Company memiliki kode unik.
- Company memiliki nama unik.
- Company dapat memiliki banyak Branch.
- Company dapat memiliki banyak User.
- Company dapat memiliki banyak Role.
- Company dapat dinonaktifkan.
- Company tidak boleh dihapus apabila masih memiliki data transaksi.

---

## Public API

- createCompany()
- updateCompany()
- deleteCompany()
- findCompany()
- listCompanies()