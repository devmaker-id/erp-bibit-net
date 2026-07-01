import { prisma } from "@/database";

import { PosPage } from "@/modules/pos/components";

export default async function PosPageRoute() {
  const customers =
    await prisma.customer.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },

      orderBy: {
        name: "asc",
      },

      select: {
        id: true,

        name: true,
      },
    });

  return (
    <PosPage
      customers={customers}
    />
  );
}