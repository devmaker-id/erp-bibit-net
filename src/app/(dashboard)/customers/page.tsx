import { revalidatePath } from "next/cache";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/database";

function requiredString(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ""
  ).trim();
}

function optionalString(
  formData: FormData,
  key: string
) {
  const value = requiredString(
    formData,
    key
  );

  return value || null;
}

async function createCustomer(
  formData: FormData
) {
  "use server";

  await prisma.customer.create({
    data: {
      code: requiredString(
        formData,
        "code"
      ),
      name: requiredString(
        formData,
        "name"
      ),
      phone: optionalString(
        formData,
        "phone"
      ),
      email: optionalString(
        formData,
        "email"
      ),
      address: optionalString(
        formData,
        "address"
      ),
      isActive:
        formData.get(
          "isActive"
        ) === "on",
    },
  });

  revalidatePath("/customers");
  revalidatePath("/pos");
}

async function updateCustomer(
  formData: FormData
) {
  "use server";

  await prisma.customer.update({
    where: {
      id: requiredString(
        formData,
        "id"
      ),
    },
    data: {
      code: requiredString(
        formData,
        "code"
      ),
      name: requiredString(
        formData,
        "name"
      ),
      phone: optionalString(
        formData,
        "phone"
      ),
      email: optionalString(
        formData,
        "email"
      ),
      address: optionalString(
        formData,
        "address"
      ),
      isActive:
        formData.get(
          "isActive"
        ) === "on",
    },
  });

  revalidatePath("/customers");
  revalidatePath("/pos");
}

async function deleteCustomer(
  formData: FormData
) {
  "use server";

  await prisma.customer.update({
    where: {
      id: requiredString(
        formData,
        "id"
      ),
    },
    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });

  revalidatePath("/customers");
  revalidatePath("/pos");
}

export default async function CustomersPage() {
  const customers =
    await prisma.customer.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Pelanggan
        </h1>
        <p className="text-muted-foreground">
          Kelola data pelanggan untuk transaksi POS.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Pelanggan</CardTitle>
          <CardDescription>
            Pelanggan aktif akan tersedia di selector POS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={createCustomer}
            className="grid gap-3 md:grid-cols-[1fr_2fr_1fr_1fr_auto]"
          >
            <Input
              name="code"
              placeholder="Kode"
              required
            />
            <Input
              name="name"
              placeholder="Nama pelanggan"
              required
            />
            <Input
              name="phone"
              placeholder="Telepon"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked
              />
              Aktif
            </label>
            <Textarea
              name="address"
              className="md:col-span-4"
              placeholder="Alamat"
            />
            <Button type="submit">
              Simpan
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            Edit data pelanggan yang dipakai transaksi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(
                (customer) => (
                  <TableRow
                    key={customer.id}
                  >
                    <TableCell>
                      <form
                        id={`customer-${customer.id}`}
                        action={
                          updateCustomer
                        }
                      >
                        <input
                          name="id"
                          type="hidden"
                          value={
                            customer.id
                          }
                        />
                        <Input
                          name="code"
                          defaultValue={
                            customer.code
                          }
                          required
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <Input
                        form={`customer-${customer.id}`}
                        name="name"
                        defaultValue={
                          customer.name
                        }
                        required
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        form={`customer-${customer.id}`}
                        name="phone"
                        defaultValue={
                          customer.phone ??
                          ""
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        form={`customer-${customer.id}`}
                        name="email"
                        type="email"
                        defaultValue={
                          customer.email ??
                          ""
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        form={`customer-${customer.id}`}
                        name="address"
                        defaultValue={
                          customer.address ??
                          ""
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          form={`customer-${customer.id}`}
                          name="isActive"
                          type="checkbox"
                          defaultChecked={
                            customer.isActive
                          }
                        />
                        <Badge
                          variant={
                            customer.isActive
                              ? "default"
                              : "secondary"
                          }
                        >
                          {customer.isActive
                            ? "Aktif"
                            : "Nonaktif"}
                        </Badge>
                      </label>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          form={`customer-${customer.id}`}
                          type="submit"
                          variant="outline"
                        >
                          Update
                        </Button>
                        <form
                          action={
                            deleteCustomer
                          }
                        >
                          <input
                            name="id"
                            type="hidden"
                            value={
                              customer.id
                            }
                          />
                          <Button
                            type="submit"
                            variant="destructive"
                          >
                            Hapus
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
