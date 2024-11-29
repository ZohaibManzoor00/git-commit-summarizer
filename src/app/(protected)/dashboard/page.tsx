"use client";

import Link from "next/link";
import { Suspense } from "react";
import { GitFork, Github, Star } from "lucide-react";
import useProject from "@/hooks/use-project";
import CommitLog from "./_components/commit.log";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, Card } from "@/components/ui/card";
import HyperText from "@/components/ui/hyper-text";
import StarButton from "./_components/star-button";

const DashboardPage = () => {
  const { project, isLoading } = useProject();

  return (
    <Card className="rounded-sm">
      <header className="flex items-center gap-3 px-4 py-4">
        <div className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
          <div className="flex h-[1.9rem] w-9 justify-center text-2xl font-bold">
            {isLoading ? (
              <HyperText className="text-md justify-center" text="??" />
            ) : (
              <p>{project?.name.slice(0, 2).toUpperCase()}</p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl">
            {isLoading ? (
              <HyperText className="text-md" text="Loading..." />
            ) : (
              project?.name
            )}
          </CardTitle>
          <CardDescription>
            <Link
              target="_blank"
              href={project?.githubUrl ?? ""}
              className="flex items-center gap-1 hover:underline"
            >
              <Github className="size-3.5" />
              {isLoading ? (
                <HyperText className="text-md" text="github.com/..." />
              ) : (
                project?.githubUrl.slice(8)
              )}
            </Link>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {!isLoading && project ? <StarButton /> : 
           <Button variant="outline" className="gap-1.5">
           <Star className="h-4 w-4" />
           Star
         </Button>}
         
          <Button asChild className="hidden sm:flex">
            <a
              href={project?.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork className="h-4 w-4" />
              View on Github
            </a>
          </Button>
        </div>
      </header>
      <Suspense fallback={<div>Loading Commit Log...</div>}>
        <CommitLog />
      </Suspense>
    </Card>
  );
};

export default DashboardPage;
