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
        title: "Perusahaan",
        href: "/companies",
        icon: "building-2",
      },
      {
        title: "Cabang",
        href: "/branches",
        icon: "building-2",
      },
      {
        title: "Gudang",
        href: "/warehouses",
        icon: "warehouse",
      },
      {
        title: "Keanggotaan",
        href: "/memberships",
        icon: "building-2",
      },
    ],
  },

  {
    title: "Hak Akses",
    items: [
      {
        title: "Hak Akses",
        href: "/permissions",
        icon: "settings",
      },
      {
        title: "Peran",
        href: "/roles",
        icon: "settings",
      },
      {
        title: "Hak Akses Peran",
        href: "/role-permissions",
        icon: "settings",
      },
      {
        title: "Pengguna",
        href: "/users",
        icon: "settings",
      },
      {
        title: "Sesi Login",
        href: "/sessions",
        icon: "settings",
      },
    ],
  },

  {
    title: "Master Data",
    items: [
      {
        title: "Satuan",
        href: "/units",
        icon: "package",
      },
      {
        title: "Kategori",
        href: "/categories",
        icon: "package",
      },
      {
        title: "Merek",
        href: "/brands",
        icon: "package",
      },
      {
        title: "Produk",
        href: "/products",
        icon: "package",
      },
      {
        title: "Supplier",
        href: "/suppliers",
        icon: "package",
      },
      {
        title: "Pelanggan",
        href: "/customers",
        icon: "package",
      },
    ],
  },

  {
    title: "Persediaan",
    items: [
      {
        title: "Stok",
        href: "/stocks",
        icon: "shopping-cart",
      },
      {
        title: "Pergerakan Stok",
        href: "/stock-movements",
        icon: "shopping-cart",
      },
      {
        title: "Penyesuaian Stok",
        href: "/stock-adjustments",
        icon: "shopping-cart",
      },
      {
        title: "Transfer Stok",
        href: "/stock-transfers",
        icon: "shopping-cart",
      },
      {
        title: "Stok Opname",
        href: "/stock-opnames",
        icon: "shopping-cart",
      },
    ],
  },

  {
    title: "Sistem",
    items: [
      {
        title: "Pengaturan",
        href: "/settings",
        icon: "settings",
      },
    ],
  },
];