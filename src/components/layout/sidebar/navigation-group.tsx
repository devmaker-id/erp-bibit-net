import type { AuthSession } from "@/modules/auth/contracts";
import type {
  NavigationGroup as NavigationGroupType,
} from "@/config/navigation";

import { NavigationItem } from "./navigation-item";

export type NavigationGroupProps = {
  group: NavigationGroupType;
  auth: AuthSession;
};

export function NavigationGroup({
  group,
  auth,
}: NavigationGroupProps) {
  if (group.items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-2">
      {group.title && (
        <div className="px-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
            {group.title}
          </h2>
        </div>
      )}

      <div className="space-y-1">
        {group.items.map((item) => (
          <NavigationItem
            key={item.title}
            item={item}
            auth={auth}
          />
        ))}
      </div>
    </section>
  );
}