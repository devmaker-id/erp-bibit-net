"use client";

import {
    Building2,
    Check,
    ChevronsUpDown,
} from "lucide-react";

import type { AuthSession } from "@/modules/auth/contracts";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CompanySwitcherProps = {
    auth: AuthSession;
};

export function CompanySwitcher({ auth }: CompanySwitcherProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-[200px] justify-between"
                >
                    <Building2 className="mr-2 h-4 w-4" />
                    {auth.membership.company.name}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Company</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4" />
                    {auth.membership.company.name}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}