import {
  Activity,
  Building2,
  Package,
  ShoppingCart,
  Store,
  Users,
  Warehouse,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const stats = [
    {
      title: "Perusahaan",
      value: 12,
      icon: Building2,
    },
    {
      title: "Cabang",
      value: 28,
      icon: Store,
    },
    {
      title: "Gudang",
      value: 35,
      icon: Warehouse,
    },
    {
      title: "Produk",
      value: "2.430",
      icon: Package,
    },
    {
      title: "Supplier",
      value: 120,
      icon: ShoppingCart,
    },
    {
      title: "Pelanggan",
      value: 890,
      icon: Users,
    },
    {
      title: "Pengguna",
      value: 18,
      icon: Users,
    },
    {
      title: "Sesi Aktif",
      value: 6,
      icon: Activity,
    },
  ];

  const activities = [
    {
      title: "Purchase Order PO-00012 dibuat",
      time: "5 menit lalu",
    },
    {
      title: "Produk Epson L3210 ditambahkan",
      time: "15 menit lalu",
    },
    {
      title: "Transfer stok Gudang A → Gudang B",
      time: "35 menit lalu",
    },
    {
      title: "Stock Opname selesai",
      time: "1 jam lalu",
    },
    {
      title: "Admin Login",
      time: "2 jam lalu",
    },
  ];

  const quickMenus = [
    "Produk",
    "Supplier",
    "Pelanggan",
    "Pembelian",
    "Penjualan",
    "Gudang",
    "Stok",
    "Pengguna",
  ];

  const lowStocks = [
    {
      product: "Mouse Logitech M170",
      stock: 3,
    },
    {
      product: "Keyboard Mechanical",
      stock: 5,
    },
    {
      product: "SSD Samsung 1TB",
      stock: 4,
    },
    {
      product: "Printer Epson L3210",
      stock: 2,
    },
  ];

  const purchaseOrders = [
    {
      number: "PO-00012",
      supplier: "PT Sumber Makmur",
      status: "Draft",
    },
    {
      number: "PO-00013",
      supplier: "CV Sentosa",
      status: "Approved",
    },
    {
      number: "PO-00014",
      supplier: "PT Maju Jaya",
      status: "Received",
    },
  ];

  const salesOrders = [
    {
      number: "SO-00045",
      customer: "PT ABC",
      status: "Paid",
    },
    {
      number: "SO-00046",
      customer: "CV Nusantara",
      status: "Waiting",
    },
    {
      number: "SO-00047",
      customer: "PT Sejahtera",
      status: "Process",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Selamat datang kembali di ERP Bibit Net 👋
        </p>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="size-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Aktivitas & Quick Menu */}
      <div className="grid gap-6 lg:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {activities.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between border-b pb-3 last:border-none"
              >
                <span>{item.title}</span>

                <span className="text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu Cepat</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-3">
            {quickMenus.map((menu) => (
              <button
                key={menu}
                className="rounded-lg border p-3 text-sm transition hover:bg-accent"
              >
                {menu}
              </button>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Low Stock & Purchase */}
      <div className="grid gap-6 lg:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>Produk Hampir Habis</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {lowStocks.map((item) => (
              <div
                key={item.product}
                className="flex justify-between"
              >
                <span>{item.product}</span>

                <span className="font-semibold text-red-600">
                  {item.stock}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purchase Order Terbaru</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {purchaseOrders.map((item) => (
              <div
                key={item.number}
                className="flex justify-between"
              >
                <div>
                  <p className="font-medium">{item.number}</p>

                  <p className="text-xs text-muted-foreground">
                    {item.supplier}
                  </p>
                </div>

                <span>{item.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Sales & System */}
      <div className="grid gap-6 lg:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>Sales Order Terbaru</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {salesOrders.map((item) => (
              <div
                key={item.number}
                className="flex justify-between"
              >
                <div>
                  <p className="font-medium">{item.number}</p>

                  <p className="text-xs text-muted-foreground">
                    {item.customer}
                  </p>
                </div>

                <span>{item.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Sistem</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Versi</span>
              <span>ERP Bibit Net v1.0.0</span>
            </div>

            <div className="flex justify-between">
              <span>Perusahaan</span>
              <span>PT Bibit Net Indonesia</span>
            </div>

            <div className="flex justify-between">
              <span>Cabang Aktif</span>
              <span>Jakarta</span>
            </div>

            <div className="flex justify-between">
              <span>Gudang</span>
              <span>Gudang Utama</span>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}