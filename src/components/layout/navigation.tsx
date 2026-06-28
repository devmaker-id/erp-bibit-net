import type { AuthSession } from "@/modules/auth/contracts";

import { NavigationItem } from "./navigation-item";

type Props = {
  auth: AuthSession;
};

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Organization",
    href: "/organization",
  },
  {
    title: "Master Data",
    href: "/master",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

export function Navigation({ auth }: Props) {
  return (
    <nav className="p-3">
      {menus.map((menu) => (
        <NavigationItem
          key={menu.href}
          {...menu}
        />
      ))}
    </nav>
  );
}