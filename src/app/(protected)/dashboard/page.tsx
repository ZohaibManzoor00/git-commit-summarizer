"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import useProject from "@/hooks/use-project";
import CommitLog from "./_components/commit.log";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, Card } from "@/components/ui/card";
import { Suspense } from "react";
import HyperText from "@/components/ui/hyper-text";

const DashboardPage = () => {
  const { project, isLoading } = useProject();

  return (
    <Card className="rounded-sm">
      <header className="flex items-center gap-3 px-4 py-4">
        <div className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
          <span className="block h-8 w-10 text-center text-2xl font-bold">
            {project?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <CardTitle className="text-xl">
            {isLoading ? (<HyperText className="text-md" text="Loading..."/>) : project?.name}
          </CardTitle>
          <CardDescription>
            <Link
              target="_blank"
              href={project?.githubUrl ?? ""}
              className="hover:underline flex items-center gap-1"
            >
              <Github className="size-3.5" />
              
              {isLoading ? <HyperText className="text-md" text="github.com/..."/> : project?.githubUrl.slice(8)}
            </Link>
          </CardDescription>
        </div>
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
      </header>
      <Suspense fallback={<div>Loading Commit Log...</div>}>
        <CommitLog />
      </Suspense>
    </Card>
  );
};

export default DashboardPage;
