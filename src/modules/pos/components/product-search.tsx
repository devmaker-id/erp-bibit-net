"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type ProductSearchProps = {
  value: string;

  onValueChange: (
    value: string
  ) => void;

  placeholder?: string;
};

export function ProductSearch({
  value,
  onValueChange,
  placeholder = "Search product by name, code, or barcode...",
}: ProductSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        placeholder={placeholder}
        className="pl-9"
        autoComplete="off"
        onChange={(event) =>
          onValueChange(
            event.target.value
          )
        }
      />
    </div>
  );
}