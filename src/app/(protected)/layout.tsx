import { Suspense, type FC } from "react";
import { UserButton } from "@clerk/nextjs";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";
import { Card } from "@/components/ui/card";
import Search from "../_components/search";
import Spinner from "./dashboard/_components/loader";
import { Separator } from "@/components/ui/separator";

interface Props {
  children: React.ReactNode;
}

const SidebarLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Card className="rounded-none border-none">
          <div className="h-2" />

          <header className="flex h-14 items-center justify-between gap-2 rounded-none p-2 px-4">
            <Suspense fallback={<Spinner />}>
              <Search />
            </Suspense>
            <UserButton />
          </header>
          <div className="h-2" />
          <Separator className="" />
        </Card>
        {/* <div className="h-3" /> */}
        <div className="h-[calc(100vh-4.6rem)] rounded-none shadow">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
