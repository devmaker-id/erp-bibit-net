"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Search() {
    const handleSearchClick = () => {
        // Implement search functionality here
        console.log("Search button clicked");
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="w-[200px] justify-between"
            onClick={handleSearchClick}
        >
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
        </Button>
    );
}