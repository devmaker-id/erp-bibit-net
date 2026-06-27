# Database Seeders

Seeder digunakan untuk membuat data awal sistem.

## Aturan

- Menggunakan `upsert()`.
- Bersifat idempotent.
- Satu file hanya untuk satu domain.
- Tidak menggunakan hardcoded ID.
- Selalu mengembalikan entity yang dibuat.

## Seeder

- companies.seeder.ts
- branches.seeder.ts
- warehouses.seeder.ts