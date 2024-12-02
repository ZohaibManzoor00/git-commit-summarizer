import { type FC } from "react";
import Link from "next/link";
import { Github, Star, GitFork, Crown } from "lucide-react";

import useProject from "@/hooks/use-project";
import HyperText from "@/components/ui/hyper-text";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarButton from "./star-button";
import DeleteProjectButton from "./delete-project-button";
import { Badge } from "@/components/ui/badge";

const CommitTopInfo: FC = () => {
  const { project, isLoading } = useProject();

  return (
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
        <CardTitle className="flex items-center gap-x-3 text-xl">
          {isLoading ? (
            <HyperText className="text-md" text="Loading..." />
          ) : (
            <>
              <p>{project?.name}</p>
              <DeleteProjectButton />
            </>
          )}
        </CardTitle>

        <CardDescription>
          <Badge variant="secondary" className="rounded-full font-mono text-xs">
            <Link
              target="_blank"
              href={project?.githubUrl ?? ""}
              className="flex items-center hover:underline"
            >
              <Github className="mr-1 size-3.5" />
              {isLoading ? (
                <HyperText className="text-md" text="github.com/..." />
              ) : (
                project?.githubUrl.slice(8)
              )}
            </Link>
          </Badge>
        </CardDescription>
      </div>
      <div className="flex gap-2">
        {!isLoading && project ? (
          <StarButton />
        ) : (
          <Button variant="outline" className="gap-1.5">
            <Star className="!size-3.5" />
            Star
          </Button>
        )}

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
  );
};

export default CommitTopInfo;
