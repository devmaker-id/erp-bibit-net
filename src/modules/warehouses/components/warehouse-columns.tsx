"use client";

import type {
  Company,
  Branch,
  Warehouse,
} from "@/generated/prisma/client";

import type {
  ColumnDef,
} from "@tanstack/react-table";

import { format } from "date-fns";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type WarehouseRow = Warehouse & {
  company: Company;
  branch: Branch;
};

export type WarehouseColumnsProps = {
  onEdit: (
    warehouse: WarehouseRow
  ) => void;

  onDelete: (
    warehouse: WarehouseRow
  ) => void;
};

export function warehouseColumns({
  onEdit,
  onDelete,
}: WarehouseColumnsProps): ColumnDef<WarehouseRow>[] {
  return [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.code}
        </span>
      ),
    },

    {
      accessorKey: "name",
      header: "Warehouse",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.name}
        </div>
      ),
    },

    {
      id: "company",
      header: "Company",
      cell: ({ row }) => (
        <span>
          {row.original.company.name}
        </span>
      ),
    },

    {
      id: "branch",
      header: "Branch",
      cell: ({ row }) => (
        <span>
          {row.original.branch.name}
        </span>
      ),
    },

    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.isActive
              ? "default"
              : "secondary"
          }
        >
          {row.original.isActive
            ? "Active"
            : "Inactive"}
        </Badge>
      ),
    },

    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) =>
        format(
          row.original.createdAt,
          "dd MMM yyyy"
        ),
    },

    {
      id: "actions",
      enableSorting: false,
      enableHiding: false,

      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                onEdit(row.original)
              }
            >
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive"
              onClick={() =>
                onDelete(row.original)
              }
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}