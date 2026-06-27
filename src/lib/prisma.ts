import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

import { env } from "@/lib/env";

const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient;
};

const pool = new Pool({
    connectionString: env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: env.APP_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
});

if(env.APP_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}