"use client";

import type { Branch } from "@/generated/prisma/client";
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

export type BranchColumnsProps = {
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
};

export function branchColumns({
  onEdit,
  onDelete,
}: BranchColumnsProps): ColumnDef<Branch>[] {
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
      header: "Branch",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="font-medium">
            {row.original.name}
          </div>

          {row.original.isHeadOffice && (
            <Badge
              variant="secondary"
              className="text-xs"
            >
              Head Office
            </Badge>
          )}
        </div>
      ),
    },

    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) =>
        row.original.email ?? (
          <span className="text-muted-foreground">
            —
          </span>
        ),
    },

    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) =>
        row.original.phone ?? (
          <span className="text-muted-foreground">
            —
          </span>
        ),
    },

    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) =>
        row.original.city ?? (
          <span className="text-muted-foreground">
            —
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