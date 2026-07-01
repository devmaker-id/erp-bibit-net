import { notFound, redirect } from "next/navigation";

import { getCurrentSession } from "@/modules/auth/utils/current-session";

export default async function CatchAllPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  } else if (session) {
    redirect("/dashboard");
  }

  notFound();
}