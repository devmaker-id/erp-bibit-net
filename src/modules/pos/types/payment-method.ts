export const PaymentMethod = {
  CASH: "CASH",
  TRANSFER: "TRANSFER",
  QRIS: "QRIS",
  DEBIT_CARD: "DEBIT_CARD",
  CREDIT_CARD: "CREDIT_CARD",
} as const;

export type PaymentMethod =
  (typeof PaymentMethod)[keyof typeof PaymentMethod];