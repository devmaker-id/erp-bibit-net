"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { formatCurrency } from "../utils";

type PaymentPanelProps = {
  subtotal: number;

  discount: number;

  tax: number;

  grandTotal: number;

  status:
    | "DRAFT"
    | "CHECKOUT"
    | "PAID"
    | "COMPLETED"
    | "CANCELLED";

  onCheckout: () => void;

  onPayment: () => void;

  onComplete: () => void;

  onCancel: () => void;
};

export function PaymentPanel({
  subtotal,
  discount,
  tax,
  grandTotal,

  status,

  onCheckout,
  onPayment,
  onComplete,
  onCancel,
}: PaymentPanelProps) {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          Payment
        </h2>
      </div>

      <Separator />

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>

          <span>
            {formatCurrency(
              subtotal
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Discount</span>

          <span>
            {formatCurrency(
              discount
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Tax</span>

          <span>
            {formatCurrency(
              tax
            )}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between text-lg font-bold">
        <span>Grand Total</span>

        <span>
          {formatCurrency(
            grandTotal
          )}
        </span>
      </div>

      <Separator />

      <div className="grid gap-2">
        {status === "DRAFT" && (
          <Button
            onClick={onCheckout}
          >
            Checkout
          </Button>
        )}

        {status ===
          "CHECKOUT" && (
          <Button
            onClick={onPayment}
          >
            Payment
          </Button>
        )}

        {status === "PAID" && (
          <Button
            onClick={onComplete}
          >
            Complete
          </Button>
        )}

        {status !==
          "COMPLETED" &&
          status !==
            "CANCELLED" && (
            <Button
              variant="destructive"
              onClick={onCancel}
            >
              Cancel Sale
            </Button>
          )}
      </div>
    </div>
  );
}