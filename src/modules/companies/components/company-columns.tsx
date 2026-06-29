"use client";

import type { Company } from "@/generated/prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

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

export type CompanyColumnsOptions = {
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
};

export function companyColumns({
  onEdit,
  onDelete,
}: CompanyColumnsOptions): ColumnDef<Company>[] {
  return [
    {
      accessorKey: "code",
      header: "Code",
    },

    {
      accessorKey: "name",
      header: "Company",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">
            {row.original.name}
          </p>

          {row.original.legalName && (
            <p className="text-xs text-muted-foreground">
              {row.original.legalName}
            </p>
          )}
        </div>
      ),
    },

    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "phone",
      header: "Phone",
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