"use client";

import { Button } from "@/components/ui/button";

type Product = {
  id: string;

  code: string;

  name: string;

  price: number;

  stock?: number;
};

type ProductGridProps = {
  products: Product[];

  onSelect: (
    product: Product
  ) => void;
};

export function ProductGrid({
  products,
  onSelect,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(
        (product) => (
          <Button
            key={product.id}
            type="button"
            variant="outline"
            className="h-auto justify-start p-4 text-left"
            onClick={() =>
              onSelect(
                product
              )
            }
          >
            <div className="space-y-1">
              <p className="font-medium">
                {product.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {product.code}
              </p>

              <p className="text-sm font-semibold">
                Rp{" "}
                {product.price.toLocaleString(
                  "id-ID"
                )}
              </p>

              {typeof product.stock ===
                "number" && (
                <p className="text-xs text-muted-foreground">
                  Stock:{" "}
                  {product.stock}
                </p>
              )}
            </div>
          </Button>
        )
      )}
    </div>
  );
}
