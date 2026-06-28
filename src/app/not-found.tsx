import { redirect } from "next/navigation";

import { getCurrentSession } from "@/modules/auth/utils/current-session";

export default async function RootNotFound() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-3 text-center">
        <h1 className="text-5xl font-bold">404</h1>

        <p className="text-muted-foreground">
          Page not found.
        </p>
      </div>
    </main>
  );
}