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
    <aside className="hidden h-screen w-72 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <SidebarHeader />

      <div className="flex-1 overflow-hidden">
        <SidebarContent auth={auth} />
      </div>

      <SidebarFooter auth={auth} />
    </aside>
  );
}