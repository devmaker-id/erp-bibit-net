import {
  Banknote,
  Building2,
  CreditCard,
  Landmark,
  QrCode,
} from "lucide-react";

export const PaymentMethod = {
  CASH: "CASH",
  QRIS: "QRIS",
  TRANSFER: "TRANSFER",
  DEBIT_CARD: "DEBIT_CARD",
  CREDIT_CARD: "CREDIT_CARD",
} as const;

export type PaymentMethod =
  (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const paymentMethodIcons: Record<
  PaymentMethod,
  typeof Banknote
> = {
  CASH: Banknote,

  QRIS: QrCode,

  TRANSFER: Landmark,

  DEBIT_CARD: CreditCard,

  CREDIT_CARD: Building2,
};

export const paymentMethodOptions = [
  {
    value:
      PaymentMethod.CASH,

    label:
      PaymentMethod.CASH,
  },

  {
    value:
      PaymentMethod.QRIS,

    label:
      PaymentMethod.QRIS,
  },

  {
    value:
      PaymentMethod.TRANSFER,

    label:
      PaymentMethod.TRANSFER,
  },

  {
    value:
      PaymentMethod.DEBIT_CARD,

    label:
      PaymentMethod.DEBIT_CARD,
  },

  {
    value:
      PaymentMethod.CREDIT_CARD,

    label:
      PaymentMethod.CREDIT_CARD,
  },
];