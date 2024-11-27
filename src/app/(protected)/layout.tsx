import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React, { FC } from "react";
import AppSidebar from "./app-sidebar";

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2 w-full">
        <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 shadow">
          {/* Search */}
          <div className="ml-auto"></div>
          {/* <UserButton /> */}
        </div>
        <div className="h-4"></div>
        {/* main content */}
        <div className="h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border border-sidebar-border bg-sidebar p-4 shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
