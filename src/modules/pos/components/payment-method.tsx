"use client";

import type { PaymentMethod as PaymentMethodType } from "../types/payment-method";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  paymentMethodOptions,
} from "../constants";

type PaymentMethodProps = {
  value: PaymentMethodType;

  onValueChange: (
    value: PaymentMethodType
  ) => void;

  disabled?: boolean;
};

export function PaymentMethod({
  value,
  onValueChange,
  disabled,
}: PaymentMethodProps) {
  return (
    <Select
      value={value}
      disabled={disabled}
      onValueChange={(value) =>
        onValueChange(
          value as PaymentMethodType
        )
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select payment method" />
      </SelectTrigger>

      <SelectContent>
        {paymentMethodOptions.map(
          (method) => (
            <SelectItem
              key={method.value}
              value={method.value}
            >
              {method.label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}