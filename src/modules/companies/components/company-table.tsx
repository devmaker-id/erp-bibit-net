"use client";

import * as React from "react";

import type {
  Company,
} from "@/generated/prisma/client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import { Search } from "lucide-react";

import { companyColumns } from "./company-columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CompanyTableProps = {
    data: Company[];
    onEdit:(company:Company)=>void;
    onDelete:(company:Company)=>void;
}

export function CompanyTable({
  data,
  onEdit,
  onDelete,
}: CompanyTableProps) {
  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: React.useMemo(
        ()=>companyColumns({
            onEdit,
            onDelete,
        }),
        [onEdit,onDelete]
    ),

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />

          <Input
            placeholder="Search company..."
            className="pl-9"
            value={
              (table
                .getColumn("name")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("name")
                ?.setFilterValue(event.target.value)
            }
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef
                                .header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  )}
                </TableRow>
              ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={
                      row.getIsSelected() &&
                      "selected"
                    }
                  >
                    {row
                      .getVisibleCells()
                      .map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    companyColumns.length
                  }
                  className="h-32 text-center text-muted-foreground"
                >
                  No companies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} company
          {table.getFilteredRowModel().rows.length !==
          1
            ? "ies"
            : ""}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              table.previousPage()
            }
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              table.nextPage()
            }
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}