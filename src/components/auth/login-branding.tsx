import {
  BarChart3,
  Boxes,
  Building2,
  CheckCircle2,
  ShieldCheck,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

const FEATURES = [
  {
    icon: Warehouse,
    title: "Inventory Management",
    description: "Monitor stock movement and warehouse operations.",
  },
  {
    icon: ShoppingCart,
    title: "Sales & Purchasing",
    description: "Manage sales orders and procurement efficiently.",
  },
  {
    icon: Boxes,
    title: "Warehouse Operations",
    description: "Transfer, adjustment, and stock opname in one place.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Real-time reports and executive dashboards.",
  },
  {
    icon: Building2,
    title: "Multi Company",
    description: "Support multiple companies and business units.",
  },
  {
    icon: ShieldCheck,
    title: "Role & Permission",
    description: "Enterprise-grade access control and security.",
  },
];

export function LoginBranding() {
  return (
    <aside className="relative hidden overflow-hidden lg:flex">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600" />

      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,.10),transparent_40%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-5 text-white">
        {/* Header */}
        <div className="space-y-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Building2 className="size-8" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              ERP Bibit Net
            </h1>

            <p className="max-w-xl text-lg leading-8 text-white/80">
              Modern Enterprise Resource Planning platform to manage your
              inventory, purchasing, sales, finance, warehouse and business
              operations from a single integrated system.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md transition-all hover:bg-white/15"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Icon className="size-5" />
                </div>

                <h3 className="font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Multi Company
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Secure Authentication
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Enterprise Ready
            </div>
          </div>

          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Bibit Net. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
}