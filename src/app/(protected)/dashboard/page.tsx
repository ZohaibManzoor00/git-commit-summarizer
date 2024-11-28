"use client";

import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import CommitLog from "./_components/commit.log";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CardTitle, CardDescription } from "@/components/ui/card";

const DashboardPage = () => {
  const { project } = useProject();
  const officialRepoName = project?.githubUrl.slice(8);
  const initials = project?.name.slice(0, 2).toUpperCase()

  return (
    <>
      <div className="flex flex-wrap justify-between gap-y-4 px-4 pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-3">
            <div className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
              <span className="text-2xl font-bold">{initials}</span>
            </div>
            <div>
              <CardTitle className="text-xl">{project?.name}</CardTitle>
              <Link
                target="_blank"
                href={project?.githubUrl ?? ""}
                className="hover:underline"
              >
                <CardDescription className="flex gap-1">
                  <Github className="size-4 mt-1" />
                  {officialRepoName}
                </CardDescription>
              </Link>
            </div>
            <div className="justify-end ml-auto">
              <Button variant="outline" asChild className="hidden sm:flex">
                <a
                  href={project?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-1 h-4 w-4" />
                  View on Github
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="mt-4" />
      <CommitLog />
    </>
  );
};

export default DashboardPage;
