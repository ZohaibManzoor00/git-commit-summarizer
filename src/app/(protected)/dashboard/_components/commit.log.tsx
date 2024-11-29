"use client";

import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/react";
import React, { useMemo, type FC } from "react";
import { Commit, Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import {
  Copy,
  ExternalLink,
  GitCommit,
  GitCommitVertical,
  RefreshCw,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import useProject from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CopySection from "./copy-section";

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

  if (isError)
    return (
      <h1 className="h-[calc(100vh-9.5rem)] text-center">
        Failed to load commits.
      </h1>
    );
  if (isLoading)
    return <h1 className="h-[calc(100vh-9.5rem)] text-center">Loading...</h1>;

  if (!commits || commits.length === 0) {
    return (
      <div className="flex h-[calc(100vh-9.5rem)] items-center justify-center gap-x-4">
        <h1 className="text-center">No commits found.</h1>
        <Button disabled={isFetching} onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!filteredCommits || filteredCommits.length === 0)
    return (
      <h1 className="h-[calc(100vh-9.5rem)] text-center">No commits found.</h1>
    );

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
      totalCommits={commits.length}
    />
  );
};

interface CommitLogPresenterProps {
  commits: Commit[];
  project?: Project;
  refetch: () => Promise<unknown>;
  isFetching: boolean;
  numOfAuthors: number;
  numOfAISummaries: number;
  totalCommits: number;
}

const CommitLogPresenter: FC<CommitLogPresenterProps> = ({
  commits,
  project,
  refetch,
  isFetching,
  numOfAuthors,
  numOfAISummaries,
  totalCommits,
}) => {
  return (
    <div className="space-y-2">
      <div className="space-y-4 px-4 pb-2">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">
              <Sparkles className="mr-1 size-4" />
              {numOfAISummaries} AI summaries
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Users className="mr-1 size-4" />
              {numOfAuthors} Contributor{numOfAuthors > 1 ? "s" : ""}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <GitCommit className="mr-1 size-5" />
              {totalCommits} Commits
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
      <ul className="h-[calc(100vh-14.5rem)] space-y-4 overflow-y-scroll">
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
            {c.commitAuthorAvatar ? (
              <Image
                src={c.commitAuthorAvatar ?? ""}
                alt={`${c.commitAuthorName}'s avatar`}
                className="relative mt-4 size-8 flex-none rounded-full bg-gray-50"
                width={40}
                height={40}
              />
            ) : (
              <div className="relative mt-4 flex size-8 flex-none items-center justify-center rounded-full bg-gray-50">
                <User className="text-primary/40" />
              </div>
            )}

            <div className="flex-auto rounded-md bg-white p-4 ring-2 ring-inset ring-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <GitCommitVertical className="size-5 text-primary/30" />
                    <span className="font-medium">{c.commitAuthorName}</span>
                  </div>
                  <CopySection commitHash={c.commitHash}/>
                </div>
                <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(c.createdAt), {
                    addSuffix: true,
                  })}
                </time>
              </div>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`${project?.githubUrl}/commit/${c.commitHash}`}
                className="group mb-1 ml-1 flex w-full items-center gap-2 py-0.5 text-xs leading-5 hover:opacity-80"
              >
                <div className="mb-1 leading-tight">
                  <h2 className="text-lg font-semibold group-hover:no-underline">
                    {c.commitMessage}
                  </h2>
                  <div className="flex items-center gap-x-1">
                    <p className="text-muted-foreground group-hover:underline">{`${project?.githubUrl.slice(19)}/commit/${c.commitHash}`}</p>
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </div>
                </div>
              </Link>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium leading-6">
                  <Sparkles className="h-4 w-4 text-primary/70" />
                  <h1 className="text-primary/70">AI Summary</h1>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {c.summary.trim()}
                </pre>
              </div>
            </div>
          </li>
        ))}
        <div className="h-1" />
      </ul>
    </div>
  );
};

const MemoizedCommitLogPresenter = React.memo(CommitLogPresenter);

export default CommitLogContainer;
