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
import { prisma } from "@/database";
import { formatCurrency } from "@/modules/pos/utils";

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

function numberValue(
  formData: FormData,
  key: string
) {
  const value = Number(
    formData.get(key)
  );

  return Number.isFinite(value)
    ? value
    : 0;
}

async function createProduct(
  formData: FormData
) {
  "use server";

  await prisma.product.create({
    data: {
      code: requiredString(
        formData,
        "code"
      ),
      barcode: optionalString(
        formData,
        "barcode"
      ),
      name: requiredString(
        formData,
        "name"
      ),
      price: numberValue(
        formData,
        "price"
      ),
      isActive:
        formData.get(
          "isActive"
        ) === "on",
    },
  });

  revalidatePath("/products");
  revalidatePath("/pos");
}

async function updateProduct(
  formData: FormData
) {
  "use server";

  await prisma.product.update({
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
      barcode: optionalString(
        formData,
        "barcode"
      ),
      name: requiredString(
        formData,
        "name"
      ),
      price: numberValue(
        formData,
        "price"
      ),
      isActive:
        formData.get(
          "isActive"
        ) === "on",
    },
  });

  revalidatePath("/products");
  revalidatePath("/pos");
}

async function deleteProduct(
  formData: FormData
) {
  "use server";

  await prisma.product.update({
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

  revalidatePath("/products");
  revalidatePath("/pos");
}

export default async function ProductsPage() {
  const products =
    await prisma.product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        stocks: true,
      },
      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Produk
        </h1>
        <p className="text-muted-foreground">
          Kelola data produk yang dipakai POS dan stok.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Produk</CardTitle>
          <CardDescription>
            Produk aktif otomatis muncul di halaman POS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={createProduct}
            className="grid gap-3 md:grid-cols-[1fr_1fr_2fr_1fr_auto_auto]"
          >
            <Input
              name="code"
              placeholder="Kode"
              required
            />
            <Input
              name="barcode"
              placeholder="Barcode"
            />
            <Input
              name="name"
              placeholder="Nama produk"
              required
            />
            <Input
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Harga"
              required
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked
              />
              Aktif
            </label>
            <Button type="submit">
              Simpan
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Produk</CardTitle>
          <CardDescription>
            Edit cepat data produk tanpa berpindah halaman.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Total Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(
                (product) => {
                  const stockTotal =
                    product.stocks.reduce(
                      (
                        total,
                        stock
                      ) =>
                        total +
                        Number(
                          stock.quantity
                        ),
                      0
                    );

                  return (
                    <TableRow
                      key={product.id}
                    >
                      <TableCell>
                        <form
                          id={`product-${product.id}`}
                          action={
                            updateProduct
                          }
                        >
                          <input
                            name="id"
                            type="hidden"
                            value={
                              product.id
                            }
                          />
                          <Input
                            name="code"
                            defaultValue={
                              product.code
                            }
                            required
                          />
                        </form>
                      </TableCell>
                      <TableCell>
                        <Input
                          form={`product-${product.id}`}
                          name="barcode"
                          defaultValue={
                            product.barcode ??
                            ""
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          form={`product-${product.id}`}
                          name="name"
                          defaultValue={
                            product.name
                          }
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          form={`product-${product.id}`}
                          name="price"
                          type="number"
                          min="0"
                          step="0.01"
                          defaultValue={Number(
                            product.price
                          )}
                          required
                        />
                        <div className="mt-1 text-xs text-muted-foreground">
                          {formatCurrency(
                            Number(
                              product.price
                            )
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {stockTotal}
                      </TableCell>
                      <TableCell>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            form={`product-${product.id}`}
                            name="isActive"
                            type="checkbox"
                            defaultChecked={
                              product.isActive
                            }
                          />
                          <Badge
                            variant={
                              product.isActive
                                ? "default"
                                : "secondary"
                            }
                          >
                            {product.isActive
                              ? "Aktif"
                              : "Nonaktif"}
                          </Badge>
                        </label>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            form={`product-${product.id}`}
                            type="submit"
                            variant="outline"
                          >
                            Update
                          </Button>
                          <form
                            action={
                              deleteProduct
                            }
                          >
                            <input
                              name="id"
                              type="hidden"
                              value={
                                product.id
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
                  );
                }
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
