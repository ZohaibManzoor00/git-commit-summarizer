"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import {
  Bot,
  GitBranch,
  LayoutDashboard,
  Moon,
  Plus,
  Settings,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId } = useProject();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="ml-[.4rem]">
        <div className="mt-[5px] flex items-center gap-2">
          <GitBranch className="h-6 w-6" />
          {open ? (
            <h1 className="text-xl font-semibold">Git Interact</h1>
          ) : null}
        </div>
      </SidebarHeader>
      <Separator className="mb-2 mt-[5px]" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarContent>
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={cn(pathname === item.url ? "hover:bg-primary hover:text-white" : null)}>
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
            <SidebarMenu>
              <ul>
                {projects?.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div
                        role="button"
                        onClick={() => setProjectId(project.id)}
                      >
                        <div
                          className={cn(
                            "flex size-6 items-center justify-center rounded-sm border bg-white text-sm text-primary",
                            {
                              "bg-primary text-white": project.id === projectId,
                            },
                          )}
                        >
                          {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </ul>
              <div className="h-2" />
              {open ? (
                <SidebarMenuItem className="mx-1">
                  <Link href="/create">
                    <Button size="sm" variant="outline" className="w-full">
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              ) : null}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>

        <div className="mt-auto pt-4">
          <Separator className="my-1" />
          <div className="flex justify-evenly mb-1">
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-muted"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
