import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

import { users } from "./data/users";

export async function seedUser() {
  erpLogger.info("🌱 Seeding Users...");

  for (const user of users) {
    const password = await bcrypt.hash(user.password, 12);

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        username: user.username,
        email: user.email,
        password,
        firstName: user.firstName,
        lastName: user.lastName,
        isSystem: true,
        isActive: true,
      },
    });
  }

  erpLogger.info(`✅ ${users.length} users seeded.`);
}