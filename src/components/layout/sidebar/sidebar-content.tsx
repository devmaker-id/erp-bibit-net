import type { AuthSession } from "@/modules/auth/contracts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navigation } from "./navigation";

export type SidebarContentProps = {
  auth: AuthSession;
};
export function SidebarContent({ auth }: SidebarContentProps) {
  return (
    <ScrollArea className="h-full w-full">
      <Navigation auth={auth} />
    </ScrollArea>
  );
}