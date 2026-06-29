"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  CreateWarehouseInput,
} from "../validators";

import {
  createWarehouseValidator,
} from "../validators";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type WarehouseFormProps = {
  defaultValues?: Partial<CreateWarehouseInput>;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    values: CreateWarehouseInput
  ) => Promise<void> | void;
};

export function WarehouseForm({
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: WarehouseFormProps) {
  const form =
    useForm<CreateWarehouseInput>({
      resolver: zodResolver(
        createWarehouseValidator
      ),

      defaultValues: {
        companyId: "",

        branchId: "",

        code: "",

        name: "",

        description: "",

        ...defaultValues,
      },
    });

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(
          onSubmit
        )}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Company ID"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branchId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Branch
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Branch ID"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Code
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="WH001"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Warehouse Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Main Warehouse"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Warehouse description..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}