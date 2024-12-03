"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { Bot, GitBranch, LayoutDashboard, Plus, Star } from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId } = useProject();

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-none shadow-none"
    >
      <Card className="border-r-1 h-full rounded-none shadow-none">
        <SidebarHeader className="ml-[.4rem]">
          <Link href="/" className="mt-3 flex items-center gap-1">
            <GitBranch className="h-5 w-5" />
            {open ? (
              <h1 className="text-lg font-semibold">Git Interact</h1>
            ) : null}
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarContent>
              <ul className="space-y-1">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        pathname === item.url
                          ? "hover:bg-primary hover:text-white"
                          : null,
                      )}
                      onClick={() => setProjectId("")}
                    >
                      <Link
                        href={item.url}
                        className={cn({
                          "bg-primary text-white": pathname === item.url,
                        })}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </ul>
            </SidebarContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
            <SidebarContent>
              <SidebarMenu
                className={cn(
                  "flex flex-col space-y-2",
                  !open ? "items-center" : "",
                )}
              >
                <ul
                  className={cn(
                    "max-h-80 overflow-y-scroll",
                    !open ? "w-full" : "",
                  )}
                >
                  {projects?.map((project) => (
                    <SidebarMenuItem key={project.name}>
                      <SidebarMenuButton asChild>
                        <div
                          role="button"
                          onClick={() => {
                            setProjectId(project.id);
                            if (pathname !== "dashboard")
                              router.push("/dashboard");
                          }}
                          className={cn(
                            "flex items-center rounded px-2 py-1",
                            !open ? "justify-center" : "",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-sm border bg-white p-2 text-sm font-medium",
                              {
                                "bg-primary text-white":
                                  project.id === projectId,
                              },
                            )}
                          >
                            {project.name[0]}
                          </div>
                          {open && (
                            <div className="truncate">{project.name}</div>
                          )}
                          <span className="ml-auto">
                            {project.isStarred && (
                              <Star
                                fill="currentColor"
                                className={cn(
                                  "ml-auto size-3 text-yellow-600",
                                  !open ? "hidden" : "",
                                )}
                              />
                            )}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </ul>
                {open && (
                  <SidebarMenuItem className="mt-2">
                    <Link href="/create">
                      <Button size="sm" variant="outline" className="w-full">
                        <Plus />
                        Create Project
                      </Button>
                    </Link>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </SidebarContent>
      </Card>
    </Sidebar>
  );
}
