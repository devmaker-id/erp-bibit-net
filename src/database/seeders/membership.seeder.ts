import { prisma } from "@/lib/prisma";
import { erpLogger } from "@/core";

export async function seedMembership() {
  erpLogger.info("🌱 Seeding Membership...");

  const company = await prisma.company.findUnique({
    where: {
      code: "BIBIT",
    },
  });

  const branch = await prisma.branch.findFirst({
    where: {
      companyId: company?.id,
      isHeadOffice: true,
    },
  });

  const role = await prisma.role.findUnique({
    where: {
      code: "SUPER_ADMIN",
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: "admin@bibitnet.id",
    },
  });

  if (!company || !branch || !role || !user) {
    throw new Error("Membership dependency not found.");
  }

  await prisma.membership.upsert({
    where: {
      userId_companyId_branchId_roleId: {
        userId: user.id,
        companyId: company.id,
        branchId: branch.id,
        roleId: role.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      companyId: company.id,
      branchId: branch.id,
      roleId: role.id,
      employeeNumber: "EMP0001",
      title: "System Administrator",
      isDefault: true,
      isActive: true,
    },
  });

  erpLogger.info("✅ Membership seeded.");
}