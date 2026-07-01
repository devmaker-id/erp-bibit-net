"use client";

import type { ReactNode } from "react";

type PosLayoutProps = {
  header: ReactNode;

  content: ReactNode;

  sidebar: ReactNode;
};

export function PosLayout({
  header,
  content,
  sidebar,
}: PosLayoutProps) {
  return (
    <div className="flex h-full flex-col gap-6">
      {header}

      <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_360px]">
        <main className="space-y-6">
          {content}
        </main>

        <aside className="space-y-6">
          {sidebar}
        </aside>
      </div>
    </div>
  );
}