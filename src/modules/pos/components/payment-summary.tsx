"use client";

import { Separator } from "@/components/ui/separator";

import { formatCurrency } from "../utils";

type PaymentSummaryProps = {
  subtotal: number;

  discount: number;

  tax: number;

  grandTotal: number;
};

export function PaymentSummary({
  subtotal,
  discount,
  tax,
  grandTotal,
}: PaymentSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span>Subtotal</span>

        <span>
          {formatCurrency(
            subtotal
          )}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>Discount</span>

        <span>
          {formatCurrency(
            discount
          )}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>Tax</span>

        <span>
          {formatCurrency(
            tax
          )}
        </span>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-lg font-semibold">
        <span>Grand Total</span>

        <span>
          {formatCurrency(
            grandTotal
          )}
        </span>
      </div>
    </div>
  );
}