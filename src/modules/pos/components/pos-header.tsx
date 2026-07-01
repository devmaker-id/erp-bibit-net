"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  saleStatusLabels,
  saleStatusVariants,
} from "../constants";

import type {
  SaleStatus,
} from "../types";

type PosHeaderProps = {
  saleNumber: string;

  status: SaleStatus;

  cashier: string;

  onNewSale: () => void;

  onRefresh?: () => void;
};

export function PosHeader({
  saleNumber,
  status,
  cashier,
  onNewSale,
  onRefresh,
}: PosHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          Point of Sale
        </h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            Sale:
            <strong className="ml-1 text-foreground">
              {saleNumber}
            </strong>
          </span>

          <span>
            Cashier:
            <strong className="ml-1 text-foreground">
              {cashier}
            </strong>
          </span>

          <Badge
            variant={
              saleStatusVariants[
                status
              ]
            }
          >
            {
              saleStatusLabels[
                status
              ]
            }
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            variant="outline"
            onClick={onRefresh}
          >
            Refresh
          </Button>
        )}

        <Button
          onClick={onNewSale}
        >
          New Sale
        </Button>
      </div>
    </div>
  );
}
