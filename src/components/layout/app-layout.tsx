import type { ReactNode } from "react";

import type { AuthSession } from "@/modules/auth/contracts";

import { AppHeader } from "./header/app-header";
import { Sidebar } from "./sidebar";
import { SidebarProvider } from "./sidebar/sidebar-provider";

type AppLayoutProps = {
  auth: AuthSession;
  children: ReactNode;
};

export function AppLayout({
  auth,
  children,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar auth={auth} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader auth={auth} />

          <main className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-7xl p-4">
                  {children}
              </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}