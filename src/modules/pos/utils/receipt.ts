import type {
  PosPayment,
  PosSale,
  PosSaleItem,
  Product,
} from "@/generated/prisma/client";

import { formatCurrency } from "./currency";

export type ReceiptSale =
  PosSale & {
    items: (PosSaleItem & {
      product: Product;
    })[];

    payments: PosPayment[];
  };

export function buildReceipt(
  sale: ReceiptSale
) {
  return {
    number: sale.number,

    date: sale.createdAt,

    subtotal:
      formatCurrency(
        Number(
          sale.subtotal
        )
      ),

    discount:
      formatCurrency(
        Number(
          sale.discount
        )
      ),

    tax:
      formatCurrency(
        Number(
          sale.tax
        )
      ),

    grandTotal:
      formatCurrency(
        Number(
          sale.grandTotal
        )
      ),

    paidAmount:
      formatCurrency(
        Number(
          sale.paidAmount
        )
      ),

    changeAmount:
      formatCurrency(
        Number(
          sale.changeAmount
        )
      ),

    items:
      sale.items.map(
        (item) => ({
          product:
            item.product.name,

          quantity:
            Number(
              item.quantity
            ),

          price:
            formatCurrency(
              Number(
                item.price
              )
            ),

          subtotal:
            formatCurrency(
              Number(
                item.subtotal
              )
            ),
        })
      ),

    payments:
      sale.payments.map(
        (payment) => ({
          method:
            payment.method,

          amount:
            formatCurrency(
              Number(
                payment.amount
              )
            ),
        })
      ),
  };
}