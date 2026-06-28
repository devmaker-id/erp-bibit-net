import type { ReactNode } from "react";

import { requireAuth } from "@/modules/auth/guards";

import { AppLayout } from "@/components/layout";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await requireAuth();

  return (
    <AppLayout auth={auth}>
      {children}
    </AppLayout>
  );
}