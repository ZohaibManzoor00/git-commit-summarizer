import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React, { FC } from "react";
import AppSidebar from "./app-sidebar";
import Search from "../_components/search";

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full pt-2">
        <header className="flex h-14 items-center justify-between gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 shadow">
          <div className="w-full">
            <Search />
          </div>
          <UserButton />
        </header>
        <div className="h-2.5" />
        <div className="h-[calc(100vh-5.2rem)] rounded-md border border-sidebar-border bg-sidebar shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
