import {
  BadgeCheck,
  Ban,
  CircleDashed,
  CreditCard,
} from "lucide-react";

import {
  PosSaleStatus,
} from "@/generated/prisma/client";

export const saleStatusLabels: Record<
  PosSaleStatus,
  string
> = {
  DRAFT: "Draft",

  CHECKOUT: "Checkout",

  PAID: "Paid",

  COMPLETED: "Completed",

  CANCELLED: "Cancelled",
};

export const saleStatusVariants: Record<
  PosSaleStatus,
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
  PosSaleStatus,
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
      PosSaleStatus.DRAFT,

    label:
      saleStatusLabels.DRAFT,
  },

  {
    value:
      PosSaleStatus.CHECKOUT,

    label:
      saleStatusLabels.CHECKOUT,
  },

  {
    value:
      PosSaleStatus.PAID,

    label:
      saleStatusLabels.PAID,
  },

  {
    value:
      PosSaleStatus.COMPLETED,

    label:
      saleStatusLabels.COMPLETED,
  },

  {
    value:
      PosSaleStatus.CANCELLED,

    label:
      saleStatusLabels.CANCELLED,
  },
];