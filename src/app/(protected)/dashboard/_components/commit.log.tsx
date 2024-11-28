"use client";

import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/react";
import React, { FC, useMemo } from "react";
import { Commit, Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Bot,
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
  const numOfAISummaries = filteredCommits.filter((c) => c.summary.length > 0);

  return (
    <MemoizedCommitLogPresenter
      commits={filteredCommits}
      project={project}
      refetch={refetch}
      isFetching={isFetching}
      numOfAuthors={allAuthors.length}
      numOfAISummaries={numOfAISummaries.length}
    />
  );
};

interface CommitLogPresenterProps {
  commits: Commit[];
  project?: Project;
  refetch: any;
  isFetching: boolean;
  numOfAuthors: number;
  numOfAISummaries: number;
}

const CommitLogPresenter: FC<CommitLogPresenterProps> = ({
  commits,
  project,
  refetch,
  isFetching,
  numOfAuthors,
  numOfAISummaries,
}) => {
  return (
    <>
      <div className="space-y-4 px-4 pb-2">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">
              <Bot className="mr-1 size-4" />
              {numOfAISummaries} AI summaries
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Users className="mr-1 size-3.5" />
              {numOfAuthors} Contributor{numOfAuthors > 1 ? "s" : ""}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <GitCommit className="mr-1 size-5" />
              30 Commits
            </Badge>
          </div>
          <Button onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw
              className={`mr-1 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Sync changes
          </Button>
        </div>
      </div>
      <div className="h-2" />
      <ul className="h-[calc(100vh-13.6rem)] space-y-2 overflow-y-scroll">
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
    </>
  );
};

const MemoizedCommitLogPresenter = React.memo(CommitLogPresenter);

export default CommitLogContainer;
