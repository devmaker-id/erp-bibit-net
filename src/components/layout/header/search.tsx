"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Search() {
  const handleSearchClick = () => {
    console.log("Open Command Palette");
  };

  return (
    <Button
      variant="outline"
      onClick={handleSearchClick}
      className="
        h-9
        w-64
        justify-between
        rounded-lg
        border-border
        bg-background
        px-3
        text-muted-foreground
        hover:bg-muted
      "
    >
      <div className="flex items-center gap-2">
        <SearchIcon className="size-4" />

        <span>Search...</span>
      </div>

      <kbd className="pointer-events-none rounded border bg-muted px-1.5 py-0.5 text-[11px] font-medium">
        Ctrl K
      </kbd>
    </Button>
  );
}