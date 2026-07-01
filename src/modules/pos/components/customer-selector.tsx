"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomerOption = {
  id: string;
  name: string;
};

type CustomerSelectorProps = {
  value?: string | null;

  customers: CustomerOption[];

  onValueChange: (
    value: string
  ) => void;
};

export function CustomerSelector({
  value,
  customers,
  onValueChange,
}: CustomerSelectorProps) {
  return (
    <Select
      value={value ?? ""}
      onValueChange={
        onValueChange
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select customer" />
      </SelectTrigger>

      <SelectContent>
        {customers.map(
          (customer) => (
            <SelectItem
              key={customer.id}
              value={
                customer.id
              }
            >
              {customer.name}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}