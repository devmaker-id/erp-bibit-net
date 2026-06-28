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
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar auth={auth} />

        <div className="flex flex-1 flex-col">
          <AppHeader auth={auth} />

          <main className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-7xl p-8">
                  {children}
              </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}