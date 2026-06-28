import type { AuthSession } from "@/modules/auth/contracts";

import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarMobile } from "./sidebar-mobile";

export type SidebarProps = {
  auth: AuthSession;
};

export function Sidebar({
  auth,
}: SidebarProps) {
  return (
    <>
      <SidebarDesktop auth={auth} />
      <SidebarMobile auth={auth} />
    </>
  );
}