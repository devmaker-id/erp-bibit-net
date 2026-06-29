"use client";

import type { Role } from "@/generated/prisma/client";

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

export type RoleColumnsProps = {
  onEdit: (
    role: Role
  ) => void;

  onDelete: (
    role: Role
  ) => void;
};

export function roleColumns({
  onEdit,
  onDelete,
}: RoleColumnsProps): ColumnDef<Role>[] {
  return [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.original.code}
        </span>
      ),
    },

    {
      accessorKey: "name",
      header: "Role",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.name}
        </span>
      ),
    },

    {
      accessorKey: "level",
      header: "Level",
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.level}
        </Badge>
      ),
    },

    {
      accessorKey: "sortOrder",
      header: "Order",
      cell: ({ row }) => (
        <span>
          {row.original.sortOrder}
        </span>
      ),
    },

    {
      accessorKey: "isSystem",
      header: "System",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.isSystem
              ? "default"
              : "secondary"
          }
        >
          {row.original.isSystem
            ? "Yes"
            : "No"}
        </Badge>
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