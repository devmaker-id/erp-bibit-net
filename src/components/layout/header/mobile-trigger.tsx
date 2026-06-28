"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../sidebar/sidebar-provider";
export function MobileTrigger() { const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={toggleSidebar}
    >
      <Menu className="size-5" />
    </Button>
  );
}