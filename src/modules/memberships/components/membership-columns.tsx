"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Membership } from "@/generated/prisma/client";

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

export type MembershipColumnCallbacks = {
  onEdit: (
    membership: Membership
  ) => void;

  onDelete: (
    membership: Membership
  ) => void;
};

export function membershipColumns({
  onEdit,
  onDelete,
}: MembershipColumnCallbacks): ColumnDef<any>[] {
  return [
    {
      id: "user",

      header: "User",

      accessorFn: (row) =>
        row.user.lastName
          ? `${row.user.firstName} ${row.user.lastName}`
          : row.user.firstName,
    },

    {
      accessorKey: "company.name",
      header: "Company",
    },

    {
      accessorKey: "branch.name",
      header: "Branch",
    },

    {
      accessorKey: "role.name",
      header: "Role",
    },

    {
      accessorKey: "title",
      header: "Title",

      cell: ({ row }) =>
        row.original.title ?? "-",
    },

    {
      accessorKey: "employeeNumber",
      header: "Employee No.",

      cell: ({ row }) =>
        row.original.employeeNumber ??
        "-",
    },

    {
      accessorKey: "isDefault",
      header: "Default",

      cell: ({ row }) => (
        <Badge
          variant={
            row.original.isDefault
              ? "default"
              : "secondary"
          }
        >
          {row.original.isDefault
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
      id: "actions",

      enableSorting: false,
      enableHiding: false,

      cell: ({ row }) => {
        const membership =
          row.original as Membership;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
            >
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
                  onEdit(
                    membership
                  )
                }
              >
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive"
                onClick={() =>
                  onDelete(
                    membership
                  )
                }
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}