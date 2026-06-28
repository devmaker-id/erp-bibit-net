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
        title: "General",
        items: [
            {
                title: "Dashboard",
                href: "/dashboard",
                icon: "layout-dashboard",
            },
        ],
    },
    {
        title: "Organization",
        items: [
            {
                title: "Companies",
                href: "/companies",
                icon: "building-2",
            },
            {
                title: "Warehouses",
                href: "/warehouses",
                icon: "warehouse",
            },
        ],
    },
    {
        title: "Master Data",
        items: [
            {
                title: "Products",
                href: "/products",
                icon: "package",
            },
        ],
    },
    {
        title: "Inventory",
        items: [
            {
                title: "Inventory",
                href: "/inventory",
                icon: "shopping-cart",
            },
        ],
    },
    {
        title: "Sales",
        items: [
            {
                title: "Sales Orders",
                href: "/orders",
                icon: "shopping-cart",
            },
        ],
    },
    {
        title: "System",
        items: [
            {
                title: "Settings",
                href: "/settings",
                icon: "settings",
            },
        ],
    },
];