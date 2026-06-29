"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  CreateBranchInput,
} from "../validators";

import {
  createBranchValidator,
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
import { Switch } from "@/components/ui/switch";

export type BranchFormProps = {
  defaultValues?: Partial<CreateBranchInput>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (
    values: CreateBranchInput,
  ) => Promise<void> | void;
};

export function BranchForm({
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: BranchFormProps) {
  const form = useForm<CreateBranchInput>({
    resolver: zodResolver(
      createBranchValidator
    ),

    defaultValues: {
      companyId: "",

      code: "",
      name: "",

      email: "",
      phone: "",

      address: "",

      city: "",
      province: "",
      postalCode: "",

      countryCode: "ID",

      timezone: "Asia/Jakarta",

      description: "",

      isHeadOffice: false,

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
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company ID
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
                    placeholder="BR001"
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
                  Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Main Branch"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone
                </FormLabel>

                <FormControl>
                  <Input
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Address
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={3}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Province
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Postal Code
                </FormLabel>

                <FormControl>
                  <Input
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
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Timezone
                </FormLabel>

                <FormControl>
                  <Input
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
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isHeadOffice"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <FormLabel>
                  Head Office
                </FormLabel>

                <p className="text-sm text-muted-foreground">
                  Set this branch as the
                  company's head office.
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