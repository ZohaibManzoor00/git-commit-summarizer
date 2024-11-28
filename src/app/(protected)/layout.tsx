import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React, { FC } from "react";
import AppSidebar from "./app-sidebar";
import { Card } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full pt-2">
          <Card className="rounded-md">
        <header className="flex h-14 items-center justify-between gap-2 rounded-md border border-sidebar-border p-2 px-4 shadow">
            <input
              type="search"
              placeholder="Search..."
              className="w-full max-w-[600px] rounded-full bg-gray-400/20 px-4 py-1.5 text-sm"
            />
            <UserButton />
        </header>
          </Card>
        <div className="h-3" />
        <div className="h-[calc(100vh-5.3rem)] rounded-md border border-sidebar-border bg-sidebar shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
