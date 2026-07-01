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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

function optionalNumber(
  formData: FormData,
  key: string
) {
  const raw = String(
    formData.get(key) ?? ""
  ).trim();

  if (!raw) {
    return null;
  }

  const value = Number(raw);

  return Number.isFinite(value)
    ? value
    : null;
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

async function upsertStock(
  formData: FormData
) {
  "use server";

  const productId =
    requiredString(
      formData,
      "productId"
    );

  const warehouseId =
    requiredString(
      formData,
      "warehouseId"
    );

  await prisma.stock.upsert({
    where: {
      productId_warehouseId: {
        productId,
        warehouseId,
      },
    },
    create: {
      productId,
      warehouseId,
      quantity: numberValue(
        formData,
        "quantity"
      ),
      minQuantity: numberValue(
        formData,
        "minQuantity"
      ),
      maxQuantity: optionalNumber(
        formData,
        "maxQuantity"
      ),
      note:
        String(
          formData.get("note") ??
            ""
        ).trim() || null,
    },
    update: {
      quantity: numberValue(
        formData,
        "quantity"
      ),
      minQuantity: numberValue(
        formData,
        "minQuantity"
      ),
      maxQuantity: optionalNumber(
        formData,
        "maxQuantity"
      ),
      note:
        String(
          formData.get("note") ??
            ""
        ).trim() || null,
    },
  });

  revalidatePath("/stocks");
  revalidatePath("/products");
  revalidatePath("/pos");
}

export default async function StocksPage() {
  const [
    products,
    warehouses,
    stocks,
  ] = await Promise.all([
    prisma.product.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.warehouse.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      include: {
        branch: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.stock.findMany({
      include: {
        product: true,
        warehouse: {
          include: {
            branch: true,
          },
        },
      },
      orderBy: [
        {
          product: {
            name: "asc",
          },
        },
        {
          warehouse: {
            name: "asc",
          },
        },
      ],
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Stok
        </h1>
        <p className="text-muted-foreground">
          Kelola saldo stok per produk dan gudang.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input Stok</CardTitle>
          <CardDescription>
            Pilih produk dan gudang yang sama untuk memperbarui saldo stok.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={upsertStock}
            className="grid gap-3 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_auto]"
          >
            <Select
              name="productId"
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Produk" />
              </SelectTrigger>
              <SelectContent>
                {products.map(
                  (product) => (
                    <SelectItem
                      key={product.id}
                      value={
                        product.id
                      }
                    >
                      {product.code} -{" "}
                      {product.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Select
              name="warehouseId"
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Gudang" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map(
                  (warehouse) => (
                    <SelectItem
                      key={warehouse.id}
                      value={
                        warehouse.id
                      }
                    >
                      {warehouse.name} -{" "}
                      {
                        warehouse.branch
                          .name
                      }
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Input
              name="quantity"
              type="number"
              step="0.001"
              placeholder="Qty"
              required
            />
            <Input
              name="minQuantity"
              type="number"
              step="0.001"
              placeholder="Min"
              defaultValue={0}
            />
            <Input
              name="maxQuantity"
              type="number"
              step="0.001"
              placeholder="Max"
            />
            <Button type="submit">
              Simpan
            </Button>
            <Textarea
              name="note"
              className="md:col-span-5"
              placeholder="Catatan stok"
            />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Stok</CardTitle>
          <CardDescription>
            Saldo stok yang dipakai untuk tampilan ketersediaan produk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Gudang</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Min</TableHead>
                <TableHead>Max</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead className="text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => {
                const quantity = Number(
                  stock.quantity
                );
                const minQuantity =
                  Number(
                    stock.minQuantity
                  );
                const maxQuantity =
                  stock.maxQuantity ===
                  null
                    ? null
                    : Number(
                        stock.maxQuantity
                      );
                const isLow =
                  quantity <=
                  minQuantity;

                return (
                  <TableRow
                    key={stock.id}
                  >
                    <TableCell>
                      <div className="font-medium">
                        {
                          stock.product
                            .name
                        }
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {
                          stock.product
                            .code
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {
                          stock.warehouse
                            .name
                        }
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {
                          stock.warehouse
                            .branch.name
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <form
                        id={`stock-${stock.id}`}
                        action={
                          upsertStock
                        }
                      >
                        <input
                          name="productId"
                          type="hidden"
                          value={
                            stock.productId
                          }
                        />
                        <input
                          name="warehouseId"
                          type="hidden"
                          value={
                            stock.warehouseId
                          }
                        />
                        <Input
                          name="quantity"
                          type="number"
                          step="0.001"
                          defaultValue={
                            quantity
                          }
                        />
                      </form>
                    </TableCell>
                    <TableCell>
                      <Input
                        form={`stock-${stock.id}`}
                        name="minQuantity"
                        type="number"
                        step="0.001"
                        defaultValue={
                          minQuantity
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        form={`stock-${stock.id}`}
                        name="maxQuantity"
                        type="number"
                        step="0.001"
                        defaultValue={
                          maxQuantity ??
                          ""
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          isLow
                            ? "destructive"
                            : "default"
                        }
                      >
                        {isLow
                          ? "Menipis"
                          : "Aman"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        form={`stock-${stock.id}`}
                        name="note"
                        defaultValue={
                          stock.note ??
                          ""
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        form={`stock-${stock.id}`}
                        type="submit"
                        variant="outline"
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
