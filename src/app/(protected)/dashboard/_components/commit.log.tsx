"use client";

import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/react";
import React, { FC, useMemo } from "react";
import { Commit, Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  ExternalLink,
  GitCommit,
  Github,
  RefreshCcw,
  RefreshCw,
  Users,
} from "lucide-react";
import useProject from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CommitLogContainer: FC = () => {
  const { projectId, project } = useProject();
  const {
    data: commits,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = api.project.getCommits.useQuery({ projectId });

  const searchParams = useSearchParams();
  const search = searchParams.get("query") ?? "";
  const query = search.toLowerCase();

  const filteredCommits = useMemo(() => {
    return query
      ? commits?.filter(
          (commit) =>
            commit.commitMessage.toLowerCase().includes(query) ||
            commit.summary.toLowerCase().includes(query),
        )
      : commits;
  }, [commits, query]);

  if (isError) return <h1 className="text-center">Failed to load commits.</h1>;
  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (!commits || commits.length === 0) {
    return (
      <div className="flex items-center justify-center gap-x-4">
        <h1 className="text-center">No commits found.</h1>
        <Button disabled={isFetching} onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!filteredCommits || filteredCommits.length === 0)
    return <h1 className="text-center">No commits found.</h1>;

  const allAuthors = [
    ...new Set(filteredCommits.map((c) => c.commitAuthorName)),
  ];
  const numOfAISummaries = filteredCommits.filter(
    (c) => c.summary.length > 0,
  ).length;

  return (
    <MemoizedCommitLogPresenter
      commits={filteredCommits}
      project={project}
      refetch={refetch}
      isFetching={isFetching}
      authors={allAuthors}
      numOfAISummaries={numOfAISummaries}
    />
  );
};

interface CommitLogPresenterProps {
  commits: Commit[];
  project?: Project;
  refetch: any;
  isFetching: boolean;
  authors: string[];
  numOfAISummaries: number;
}

const CommitLogPresenter: FC<CommitLogPresenterProps> = ({
  commits,
  project,
  refetch,
  isFetching,
  authors,
  numOfAISummaries,
}) => {
  return (
    <Card>
      {/* <div className="border-bg-gray-600 mx-2 flex items-center justify-between space-x-4 rounded-sm border-[1.5px] px-2 py-2">
        <div>
          <h1>{numOfAISummaries} AI summaries</h1>
        </div>
        <div className="flex items-center space-x-4">
          <h1>
            {authors.length} Contributor{authors.length === 1 ? "" : "s"}
          </h1>
          <h1>{commits.length} Commits</h1>
          <Button
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="rounded px-4 py-2"
          >
            <RefreshCcw className={isFetching ? "animate-spin" : ""} />
            {isFetching ? "Syncing" : "Sync changes"}
          </Button>
        </div>
      </div> */}
      <CardHeader className="space-y-4">
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
              <span className="text-2xl font-bold">HB</span>
            </div>
            <div>
              <CardTitle>Homebrew</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                github.com/Homebrew/brew
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <a
              href="https://github.com/Homebrew/brew"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View On Github
            </a>
          </Button>
        </div> */}
        {/* <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">
              15 AI summaries
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Users className="mr-1 h-3 w-3" />4 Contributors
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <GitCommit className="mr-1 h-3 w-3" />
              30 Commits
            </Badge>
          </div>
          <Button onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Sync changes
          </Button>
        </div> */}
      </CardHeader>
      <div className="h-2" />
      <ul className="h-[calc(100vh-10.6rem)] space-y-2 overflow-y-scroll">
        {commits.map((c, i) => (
          <li key={c.id} className="relative flex gap-x-4 px-2">
            <div
              className={cn(
                i === commits.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center",
              )}
            >
              <div className="ml-4 w-px translate-x-1 bg-gray-200" />
            </div>
            <Image
              src={c.commitAuthorAvatar}
              alt={`${c.commitAuthorName}'s avatar`}
              className="relative mt-4 size-8 flex-none rounded-full bg-gray-50"
              width={40}
              height={40}
            />
            <div className="flex-auto rounded-md bg-white p-3 ring-1 ring-inset ring-gray-100">
              <div className="flex justify-between gap-x-4">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${project?.githubUrl}/commit/${c.commitHash}`}
                  className="w-full py-0.5 text-xs leading-5 text-gray-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="mr-4 font-medium text-gray-900">
                        {c.commitAuthorName}
                      </span>{" "}
                      <span className="font-mono text-xs text-gray-500">
                        {c.commitHash.substring(0, 7)}
                      </span>
                      {/* Copy to clipboard button */}
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(c.commitHash)
                        }
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        Copy
                      </button>
                    </div>
                    {/* </div> */}
                    <div className="justify-end font-medium text-gray-900">
                      {formatDistanceToNow(new Date(c.createdAt), {
                        addSuffix: true,
                      })}
                    </div>{" "}
                  </div>

                  <span className="inline-flex items-center">
                    {c.commitMessage}
                    <ExternalLink className="ml-1 size-3.5" />
                  </span>
                </Link>
              </div>

              <span className="font-semibold">{c.commitMessage}</span>
              <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                {c.summary.trim()}
              </pre>
            </div>
          </li>
        ))}
        <div className="h-1" />
      </ul>
    </Card>
  );
};

const MemoizedCommitLogPresenter = React.memo(CommitLogPresenter);

export default CommitLogContainer;
