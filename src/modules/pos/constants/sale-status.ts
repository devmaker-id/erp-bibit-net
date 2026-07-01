import {
  BadgeCheck,
  Ban,
  CircleDashed,
  CreditCard,
} from "lucide-react";

import {
  SaleStatus,
  type SaleStatus as SaleStatusType,
} from "../types";

export const saleStatusLabels: Record<
  SaleStatusType,
  string
> = {
  DRAFT: "Draft",

  CHECKOUT: "Checkout",

  PAID: "Paid",

  COMPLETED: "Completed",

  CANCELLED: "Cancelled",
};

export const saleStatusVariants: Record<
  SaleStatusType,
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
> = {
  DRAFT: "secondary",

  CHECKOUT: "outline",

  PAID: "default",

  COMPLETED: "default",

  CANCELLED: "destructive",
};

export const saleStatusIcons: Record<
  SaleStatusType,
  typeof CircleDashed
> = {
  DRAFT: CircleDashed,

  CHECKOUT: CreditCard,

  PAID: BadgeCheck,

  COMPLETED: BadgeCheck,

  CANCELLED: Ban,
};

export const saleStatusOptions = [
  {
    value:
      SaleStatus.DRAFT,

    label:
      saleStatusLabels.DRAFT,
  },

  {
    value:
      SaleStatus.CHECKOUT,

    label:
      saleStatusLabels.CHECKOUT,
  },

  {
    value:
      SaleStatus.PAID,

    label:
      saleStatusLabels.PAID,
  },

  {
    value:
      SaleStatus.COMPLETED,

    label:
      saleStatusLabels.COMPLETED,
  },

  {
    value:
      SaleStatus.CANCELLED,

    label:
      saleStatusLabels.CANCELLED,
  },
];
