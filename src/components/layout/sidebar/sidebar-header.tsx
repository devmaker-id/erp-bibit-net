import { SidebarLogo } from "./sidebar-logo";

export function SidebarHeader() {
  return (
    <header className="flex h-16 items-center border-b bg-background px-6">
      <SidebarLogo />
    </header>
  );
}