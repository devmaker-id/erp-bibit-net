"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  CreateCompanyInput,
} from "../validators";

import {
  createCompanyValidator,
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

export type CompanyFormProps = {
  defaultValues?: Partial<CreateCompanyInput>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (
    values: CreateCompanyInput,
  ) => Promise<void> | void;
};

export function CompanyForm({
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: CompanyFormProps) {
  const form = useForm<CreateCompanyInput>({
    resolver: zodResolver(createCompanyValidator),
    defaultValues: {
      code: "",
      name: "",

      legalName: "",

      email: "",
      phone: "",
      website: "",

      taxNumber: "",

      address: "",

      city: "",
      province: "",
      postalCode: "",

      countryCode: "ID",

      timezone: "Asia/Jakarta",
      currencyCode: "IDR",

      logo: "",

      description: "",

      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>

                <FormControl>
                  <Input
                    placeholder="COMP001"
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
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Company Name"
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
          name="legalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legal Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="PT Example Indonesia"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

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
                <FormLabel>Phone</FormLabel>

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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>

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
          name="taxNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Number</FormLabel>

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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>

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
                <FormLabel>City</FormLabel>

                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Province</FormLabel>

                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Postal Code</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>

                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Timezone</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currencyCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>

                <FormControl>
                  <Input {...field} />
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
              <FormLabel>Description</FormLabel>

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