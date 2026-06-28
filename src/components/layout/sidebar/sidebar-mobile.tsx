"use client";

import type { AuthSession } from "@/modules/auth/contracts";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { SidebarContent } from "./sidebar-content";
import { SidebarFooter } from "./sidebar-footer";
import { useSidebar } from "./sidebar-provider";

export type SidebarMobileProps = {
  auth: AuthSession;
};

export function SidebarMobile({
  auth,
}: SidebarMobileProps) {
  const { open, setOpen } = useSidebar();

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetContent
        side="left"
        className="w-80 p-0 overflow-y-auto bg-background"
      >
        <SheetHeader className="px-6 py-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <SidebarContent auth={auth} />

        <SidebarFooter auth={auth} />
      </SheetContent>
    </Sheet>
  );
}