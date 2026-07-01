export type NavigationIcon =
  | "layout-dashboard"
  | "building-2"
  | "package"
  | "warehouse"
  | "shopping-cart"
  | "settings";

export type NavigationItem = {
  title: string;
  href?: string;
  icon?: NavigationIcon;

  permission?: string;
  badge?: string;
  disabled?: boolean;
  external?: boolean;

  children?: NavigationItem[];
};

export type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};

export const navigation: NavigationGroup[] = [
  {
    title: "Beranda",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "layout-dashboard",
      },
    ],
  },

  {
    title: "Organisasi",
    items: [
      {
        title: "Master Organisasi",
        icon: "building-2",
        children: [
          {
            title: "Perusahaan",
            href: "/companies",
          },
          {
            title: "Cabang",
            href: "/branches",
          },
          {
            title: "Gudang",
            href: "/warehouses",
          },
          {
            title: "Keanggotaan",
            href: "/memberships",
          },
        ],
      },
    ],
  },

  {
    title: "Hak Akses",
    items: [
      {
        title: "Manajemen Akses",
        icon: "settings",
        children: [
          {
            title: "Hak Akses",
            href: "/permissions",
          },
          {
            title: "Peran",
            href: "/roles",
          },
          {
            title: "Hak Akses Peran",
            href: "/role-permissions",
          },
          {
            title: "Pengguna",
            href: "/users",
          },
          {
            title: "Sesi Login",
            href: "/sessions",
          },
        ],
      },
    ],
  },

  {
    title: "Master Data",
    items: [
      {
        title: "Master Barang",
        icon: "package",
        children: [
          {
            title: "Satuan",
            href: "/units",
          },
          {
            title: "Kategori",
            href: "/categories",
          },
          {
            title: "Merek",
            href: "/brands",
          },
          {
            title: "Produk",
            href: "/products",
          },
        ],
      },

      {
        title: "Master Relasi",
        icon: "building-2",
        children: [
          {
            title: "Supplier",
            href: "/suppliers",
          },
          {
            title: "Pelanggan",
            href: "/customers",
          },
        ],
      },
    ],
  },
  {
    title: "Persediaan",
    items: [
      {
        title: "Manajemen Stok",
        icon: "warehouse",
        children: [
          {
            title: "Stok",
            href: "/stocks",
          },
          {
            title: "Pergerakan Stok",
            href: "/stock-movements",
          },
          {
            title: "Penyesuaian Stok",
            href: "/stock-adjustments",
          },
          {
            title: "Transfer Stok",
            href: "/stock-transfers",
          },
          {
            title: "Stok Opname",
            href: "/stock-opnames",
          },
        ],
      },
    ],
  },
  {
    title: "Penjualan",
    items: [
      {
        title: "Manajemen Penjualan",
        icon: "shopping-cart",
        children: [
          {
            title: "Penawaran",
            href: "/quotes",
          },
          {
            title: "Pesanan Penjualan",
            href: "/sales-orders",
          },
          {
            title: "Pengiriman Penjualan",
            href: "/sales-deliveries",
          },
          {
            title: "Faktur Penjualan",
            href: "/sales-invoices",
          },
        ],
      },
    ],
  },
  {
    title: "Sistem",
    items: [
      {
        title: "Pengaturan",
        icon: "settings",
        children: [
          {
            title: "Pengaturan Sistem",
            href: "/settings",
          },
        ],
      },
    ],
  },
];