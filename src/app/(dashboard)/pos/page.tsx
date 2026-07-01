import { prisma } from "@/database";

import { PosPage } from "@/modules/pos/components";

export default async function PosPageRoute() {
  const [customers, products] =
    await Promise.all([
      prisma.customer.findMany({
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
      }),

      prisma.product.findMany({
        where: {
          isActive: true,
          deletedAt: null,
        },

        orderBy: {
          name: "asc",
        },

        select: {
          id: true,

          code: true,

          barcode: true,

          name: true,

          price: true,

          stocks: {
            select: {
              quantity: true,
            },
          },
        },
      }),
    ]);

  return (
    <PosPage
      customers={customers}
      products={products.map(
        (product) => ({
          id: product.id,
          code: product.code,
          barcode:
            product.barcode ??
            null,
          name: product.name,
          price: Number(
            product.price
          ),
          stock:
            product.stocks.reduce(
              (
                total,
                stock
              ) =>
                total +
                Number(
                  stock.quantity
                ),
              0
            ),
        })
      )}
    />
  );
}
