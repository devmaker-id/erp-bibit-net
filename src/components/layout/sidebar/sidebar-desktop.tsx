import type { AuthSession } from "@/modules/auth/contracts";

import { SidebarContent } from "./sidebar-content";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarHeader } from "./sidebar-header";

export type SidebarDesktopProps = {
  auth: AuthSession;
};

export function SidebarDesktop({
  auth,
}: SidebarDesktopProps) {
  return (
    <aside className="
      hidden
        lg:flex
        lg:w-[220px]
        xl:w-[240px]
        h-screen
        shrink-0
        flex-col
        border-r
        bg-background
    ">
      <SidebarHeader />

      <div className="flex-1 overflow-auto">
        <SidebarContent auth={auth} />
      </div>

      <SidebarFooter auth={auth} />
    </aside>
  );
}