"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  CreateRoleInput,
} from "../validators";

import {
  createRoleValidator,
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

export type RoleFormProps = {
  defaultValues?: Partial<CreateRoleInput>;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    values: CreateRoleInput
  ) => Promise<void> | void;
};

export function RoleForm({
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: RoleFormProps) {
  const form =
    useForm<CreateRoleInput>({
      resolver: zodResolver(
        createRoleValidator
      ),

      defaultValues: {
        code: "",

        name: "",

        description: "",

        level: 0,

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
                  Role Code
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="ADMIN"
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
                  Role Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Administrator"
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
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Level
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
                  placeholder="Role description..."
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
                    System Role
                  </FormLabel>

                  <p className="text-sm text-muted-foreground">
                    Protected role.
                  </p>
                </div>

                <FormControl>
                  <Switch
                    checked={field.value}
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
                    Enable this role.
                  </p>
                </div>

                <FormControl>
                  <Switch
                    checked={field.value}
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