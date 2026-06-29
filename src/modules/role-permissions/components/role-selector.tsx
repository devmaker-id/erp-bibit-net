"use client";

import type { Role } from "@/generated/prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type RoleSelectorProps = {
  roles: Role[];

  value?: string;

  onValueChange: (
    roleId: string
  ) => void;

  disabled?: boolean;
};

export function RoleSelector({
  roles,
  value,
  onValueChange,
  disabled,
}: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Role
      </label>

      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih Role" />
        </SelectTrigger>

        <SelectContent>
          {roles.map((role) => (
            <SelectItem
              key={role.id}
              value={role.id}
            >
              <div className="flex items-center gap-2">
                <span>{role.name}</span>

                <span className="text-xs text-muted-foreground">
                  ({role.code})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}