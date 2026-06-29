"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  CreatePermissionInput,
} from "../validators";

import {
  createPermissionValidator,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export type PermissionFormProps = {
  defaultValues?: Partial<CreatePermissionInput>;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    values: CreatePermissionInput
  ) => Promise<void> | void;
};

export function PermissionForm({
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: PermissionFormProps) {
  const form =
    useForm<CreatePermissionInput>({
      resolver: zodResolver(
        createPermissionValidator
      ),

      defaultValues: {
        code: "",

        name: "",

        module: "",

        group: "",

        description: "",

        sortOrder: 0,

        isSystem: true,

        isActive: true,

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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Permission Code
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="company.create"
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
                  Permission Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Create Company"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="module"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Module
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Organization"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Group
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Company"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sortOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sort Order
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        Number(
                          e.target.value
                        )
                      )
                    }
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
                  placeholder="Permission description..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="isSystem"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>
                    System Permission
                  </FormLabel>

                  <p className="text-sm text-muted-foreground">
                    Protected permission.
                  </p>
                </div>

                <FormControl>
                  <Switch
                    checked={
                      field.value
                    }
                    onCheckedChange={
                      field.onChange
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel>
                    Active
                  </FormLabel>

                  <p className="text-sm text-muted-foreground">
                    Enable this
                    permission.
                  </p>
                </div>

                <FormControl>
                  <Switch
                    checked={
                      field.value
                    }
                    onCheckedChange={
                      field.onChange
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

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