"use client";

import {
  SaleItemRow,
  type SaleItemRowData,
} from "./sale-item-row";

type SaleItemsProps = {
  items: SaleItemRowData[];

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

export function SaleItems({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: SaleItemsProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        No items added.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <SaleItemRow
          key={item.id}
          item={item}
          onIncrease={
            onIncrease
          }
          onDecrease={
            onDecrease
          }
          onRemove={
            onRemove
          }
        />
      ))}
    </div>
  );
}