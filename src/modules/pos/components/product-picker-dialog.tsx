"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  PackageSearch,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { formatCurrency } from "../utils";

import { ProductSearch } from "./product-search";

type Product = {
  id: string;
  code: string;
  barcode: string | null;
  name: string;
  price: number;
  stock?: number;
};

type ProductPickerDialogProps = {
  products: Product[];
  disabled?: boolean;
  onSelect: (
    product: Product
  ) => void;
};

export function ProductPickerDialog({
  products,
  disabled = false,
  onSelect,
}: ProductPickerDialogProps) {
  const [open, setOpen] =
    useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const filteredProducts =
    useMemo(() => {
      const keyword = search
        .trim()
        .toLowerCase();

      if (!keyword) {
        return products;
      }

      return products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(keyword) ||
          product.code
            .toLowerCase()
            .includes(keyword) ||
          (product.barcode
            ?.toLowerCase()
            .includes(keyword) ??
            false)
      );
    }, [
      products,
      search,
    ]);

  function handleSelect(
    product: Product
  ) {
    onSelect(product);
    setOpen(false);
    setSearch("");
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-full"
          disabled={disabled}
        >
          <PackageSearch className="mr-2 size-4" />
          Pilih Produk
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-4 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Pilih Produk
          </DialogTitle>
          <DialogDescription>
            Cari berdasarkan nama, kode, atau barcode.
          </DialogDescription>
        </DialogHeader>

        <ProductSearch
          value={search}
          onValueChange={
            setSearch
          }
          placeholder="Cari produk..."
        />

        <ScrollArea className="h-[60dvh] pr-3">
          {filteredProducts.length ===
          0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              Produk tidak ditemukan.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map(
                (product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
                    onClick={() =>
                      handleSelect(
                        product
                      )
                    }
                  >
                    <span className="min-w-0 space-y-1">
                      <span className="block truncate font-medium">
                        {product.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {product.code}
                      </span>
                      {typeof product.stock ===
                        "number" && (
                        <span className="block text-xs text-muted-foreground">
                          Stok:{" "}
                          {product.stock}
                        </span>
                      )}
                    </span>

                    <span className="shrink-0 text-sm font-semibold">
                      {formatCurrency(
                        product.price
                      )}
                    </span>
                  </button>
                )
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
