import { Suspense, type FC } from "react";
import { UserButton } from "@clerk/nextjs";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";
import { Card } from "@/components/ui/card";
import Search from "../_components/search";
import Spinner from "./dashboard/_components/loader";

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full pr-2 pt-2">
        <Card className="rounded-md">
          <header className="flex h-14 items-center justify-between gap-2 rounded-md border border-sidebar-border p-2 px-4 shadow">
            <Suspense fallback={<Spinner />}>
              <Search />
            </Suspense>
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
