import { LoginLogo } from "./login-logo";

export function LoginMobileHeader() {
  return (
    <header className="mb-8 lg:hidden">
      <div className="flex flex-col items-center text-center">
        <LoginLogo className="mb-4" showText={false} />

        {/* Brand */}
        <h1 className="text-2xl font-bold tracking-tight">
          ERP Bibit Net
        </h1>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Enterprise Resource Planning Platform
        </p>

        {/* Divider */}
        <div className="mt-6 h-px w-20 bg-border" />
      </div>
    </header>
  );
}