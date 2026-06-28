"use client";

import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    type ReactNode,
} from "react";

type SidebarContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);
type SidebarProviderProps = {
    children: ReactNode;
};
export function SidebarProvider({ children }: SidebarProviderProps) {
    const [open, setOpen] = useState(false);

    const openSidebar = useCallback(() => setOpen(true), []);
    const closeSidebar = useCallback(() => setOpen(false), []);
    const toggleSidebar = useCallback(() => setOpen((prev) => !prev), []);

    const value = useMemo(
        () => ({ open, setOpen, openSidebar, closeSidebar, toggleSidebar }),
        [open, openSidebar, closeSidebar, toggleSidebar]
    );

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}