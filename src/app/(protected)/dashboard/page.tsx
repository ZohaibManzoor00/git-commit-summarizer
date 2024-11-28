"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import useProject from "@/hooks/use-project";
import CommitLog from "./_components/commit.log";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, Card } from "@/components/ui/card";

const DashboardPage = () => {
  const { project, isLoading } = useProject();

  return (
    <Card className="rounded-sm">
      <div className="flex flex-wrap justify-between gap-y-4 px-4 pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-3">
            <div className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
              <div className="w-10 h-8 text-center text-2xl font-bold">
                {project?.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div>
              <CardTitle className="text-xl">{isLoading ? "Loading..." : project?.name}</CardTitle>
              <Link
                target="_blank"
                href={project?.githubUrl ?? ""}
                className="hover:underline">
                <CardDescription className="flex gap-1 items-center">
                  <Github className="size-3.5" />
                  {isLoading ? "github.com/..." : project?.githubUrl.slice(8)}
                </CardDescription>
              </Link>
            </div>
            <div className="ml-auto justify-end">
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
    </Card>
  );
};

export default DashboardPage;
