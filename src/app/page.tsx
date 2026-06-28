import { currentAuth } from "@/modules/auth/actions";

export default async function HomePage() {
  const auth = await currentAuth();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">
          ERP Bibit Net
        </h1>

        <p className="text-muted-foreground">
          {auth
            ? `Signed in as ${auth.user.firstName}`
            : "Foundation v1.0"}
        </p>
      </div>
    </main>
  );
}
