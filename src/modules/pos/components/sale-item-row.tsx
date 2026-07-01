"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatCurrency } from "../utils";

export type SaleItemRowData = {
  id: string;

  productCode: string;

  productName: string;

  quantity: number;

  price: number;

  discount: number;

  subtotal: number;
};

type SaleItemRowProps = {
  item: SaleItemRowData;

  onIncrease: (
    item: SaleItemRowData
  ) => void;

  onDecrease: (
    item: SaleItemRowData
  ) => void;

  onRemove: (
    item: SaleItemRowData
  ) => void;
};

export function SaleItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: SaleItemRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div className="min-w-0 flex-1">
        <p className="font-medium">
          {item.productName}
        </p>

        <p className="text-xs text-muted-foreground">
          {item.productCode}
        </p>

        <p className="mt-1 text-sm">
          {formatCurrency(
            item.price
          )}
        </p>

        {item.discount >
          0 && (
          <p className="text-xs text-muted-foreground">
            Discount{" "}
            {formatCurrency(
              item.discount
            )}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            onDecrease(
              item
            )
          }
        >
          <Minus className="size-4" />
        </Button>

        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>

        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            onIncrease(
              item
            )
          }
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="w-28 text-right">
        <p className="font-semibold">
          {formatCurrency(
            item.subtotal
          )}
        </p>
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={() =>
          onRemove(item)
        }
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
}