# Configuration Layer

## Tujuan

Seluruh konfigurasi aplikasi diakses melalui satu file:

```
src/lib/env.ts
```

## Mengapa?

Tanpa Configuration Layer

```
process.env

↓

100 file berbeda
```

Jika nama Environment berubah, seluruh project harus diubah.

Dengan Configuration Layer

```
process.env

↓

env.ts

↓

Seluruh Project
```

Perubahan hanya dilakukan di satu tempat.

## Rule

Jangan pernah menggunakan:

```ts
process.env
```

langsung di dalam Module, Service, Repository, atau Component.

Selalu gunakan:

```ts
import { env } from "@/lib/env";
```