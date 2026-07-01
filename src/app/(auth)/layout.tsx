import type { ReactNode } from "react";

import { LoginLayout } from "@/components/auth/login-layout";
import { getCurrentSession } from "@/modules/auth/utils/current-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getCurrentSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <LoginLayout>
      {children}
    </LoginLayout>
  );
}