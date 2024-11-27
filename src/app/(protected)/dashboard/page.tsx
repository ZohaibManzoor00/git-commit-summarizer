"use client";

import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import CommitLog from "./_components/commit.log";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { project } = useProject();
  const officialRepoName = project?.githubUrl.slice(8);
  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-between gap-y-4 px-4 pt-4">
        <div>
          <h1 className="text-2xl font-semibold">{project?.name}</h1>
          <p className="ml-[.2rem] text-sm text-muted-foreground">
            {officialRepoName}
          </p>
        </div>
        <div>
          <Link
            target="_blank"
            href={project?.githubUrl ?? ""}
            className="mb-2 mr-2 inline-flex items-center text-white/80 hover:underline"
          >
            <Button className="gap-2 h-10">
              <span className="flex space-x-2 items-center"><Github className="h-4 w-4" />
              <h1>View On Github</h1></span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-4" />
      <CommitLog />
    </>
  );
};

export default DashboardPage;
