# Roles Module

## Tujuan

Module ini bertanggung jawab mengelola seluruh Role pada ERP Bibit Net.

Role digunakan sebagai dasar Authorization (RBAC).

Module ini tidak menangani Authentication.

---

## Dependency

Role menjadi pondasi bagi module:

- permissions
- users
- auth

---

## Business Rule

- Role memiliki nama unik.
- Role memiliki kode unik.
- Role dapat memiliki banyak Permission.
- Role dapat digunakan oleh banyak User.
- Role sistem tidak dapat dihapus.
- Role sistem tidak dapat diubah sembarangan.
- Role biasa dapat dibuat, diubah, dan dihapus.

---

## Public API

- createRole()
- updateRole()
- deleteRole()
- findRole()
- listRoles()