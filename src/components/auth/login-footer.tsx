import { Badge } from "@/components/ui/badge";

export type LoginFooterProps = {
  version?: string;
};

export function LoginFooter({
  version = process.env.NEXT_PUBLIC_APP_VERSION ?? "v1.0.0",
}: LoginFooterProps) {
  const environment =
    process.env.NEXT_PUBLIC_APP_ENV ??
    process.env.NODE_ENV ??
    "development";

  const environmentVariant =
    environment === "production"
      ? "default"
      : environment === "staging"
        ? "secondary"
        : "outline";

  return (
    <footer className="space-y-4 border-t pt-6">
      <div className="flex items-center justify-between">
        <Badge variant={environmentVariant}>
          {environment.charAt(0).toUpperCase() +
            environment.slice(1)}
        </Badge>

        <span className="text-xs text-muted-foreground">
          {version}
        </span>
      </div>

      <div className="space-y-1 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bibit Net.
        </p>

        <p className="text-xs text-muted-foreground">
          Enterprise Resource Planning System
        </p>
      </div>
    </footer>
  );
}