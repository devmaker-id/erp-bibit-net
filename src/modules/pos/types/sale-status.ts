export const SaleStatus = {
  DRAFT: "DRAFT",
  CHECKOUT: "CHECKOUT",
  PAID: "PAID",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type SaleStatus =
  (typeof SaleStatus)[keyof typeof SaleStatus];