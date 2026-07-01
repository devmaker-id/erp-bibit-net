export type SaleItemCalculation = {
  quantity: number;
  price: number;
  discount?: number;
};

export type SaleCalculation = {
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
};

export function calculateSaleItem({
  quantity,
  price,
  discount = 0,
}: SaleItemCalculation) {
  const subtotal =
    quantity * price - discount;

  return {
    quantity,
    price,
    discount,
    subtotal:
      subtotal < 0
        ? 0
        : subtotal,
  };
}

export function calculateSale(
  items: SaleItemCalculation[],
  tax = 0
): SaleCalculation {
  const subtotal =
    items.reduce(
      (total, item) =>
        total +
        calculateSaleItem(item)
          .subtotal,
      0
    );

  const discount =
    items.reduce(
      (total, item) =>
        total +
        (item.discount ?? 0),
      0
    );

  const grandTotal =
    subtotal + tax;

  return {
    subtotal,
    discount,
    tax,
    grandTotal,
  };
}

export function calculateChange(
  paidAmount: number,
  grandTotal: number
) {
  return Math.max(
    0,
    paidAmount - grandTotal
  );
}

export function isPaid(
  paidAmount: number,
  grandTotal: number
) {
  return (
    paidAmount >= grandTotal
  );
}