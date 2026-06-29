"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  CreateMembershipInput,
} from "../validators";

import {
  createMembershipValidator,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

export type MembershipOption = {
  id: string;
  name: string;
};

export type MembershipFormProps = {
  users: MembershipOption[];

  companies: MembershipOption[];

  branches: MembershipOption[];

  roles: MembershipOption[];

  defaultValues?: Partial<CreateMembershipInput>;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    values: CreateMembershipInput
  ) => Promise<void> | void;
};

export function MembershipForm({
  users,
  companies,
  branches,
  roles,
  defaultValues,
  loading = false,
  submitLabel = "Save",
  onSubmit,
}: MembershipFormProps) {
  const form =
    useForm<CreateMembershipInput>({
      resolver: zodResolver(
        createMembershipValidator
      ),

      defaultValues: {
        userId: "",

        companyId: "",

        branchId: "",

        roleId: "",

        employeeNumber: "",

        title: "",

        isDefault: false,

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
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  User
                </FormLabel>

                <Select
                  value={field.value}
                  onValueChange={
                    field.onChange
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {users.map(
                      (user) => (
                        <SelectItem
                          key={user.id}
                          value={user.id}
                        >
                          {user.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Role
                </FormLabel>

                <Select
                  value={field.value}
                  onValueChange={
                    field.onChange
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {roles.map(
                      (role) => (
                        <SelectItem
                          key={role.id}
                          value={role.id}
                        >
                          {role.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company
                </FormLabel>

                <Select
                  value={field.value}
                  onValueChange={
                    field.onChange
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {companies.map(
                      (company) => (
                        <SelectItem
                          key={
                            company.id
                          }
                          value={
                            company.id
                          }
                        >
                          {company.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

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

                <Select
                  value={field.value}
                  onValueChange={
                    field.onChange
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {branches.map(
                      (branch) => (
                        <SelectItem
                          key={branch.id}
                          value={branch.id}
                        >
                          {branch.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Employee Number
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="EMP-001"
                    {...field}
                    value={
                      field.value ?? ""
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Supervisor"
                    {...field}
                    value={
                      field.value ?? ""
                    }
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
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <FormLabel>
                  Default
                </FormLabel>

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
                <FormLabel>
                  Active
                </FormLabel>

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