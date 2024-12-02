import React, { type FC } from "react";
import { Commit, Project } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Sparkles,
  Users,
  GitCommit,
  RefreshCw,
  User,
  Clock,
  ExternalLink,
} from "lucide-react";
import CopySection from "./copy-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
            <Badge
              variant="secondary"
              className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 text-sm"
            >
              <Sparkles className="mr-1 size-4 text-purple-500" />
              {numOfAISummaries} AI summaries
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 text-sm"
            >
              <Users className="mr-1 size-4 text-green-500" />
              {numOfAuthors} Contributor{numOfAuthors > 1 ? "s" : ""}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 text-sm"
            >
              <GitCommit className="mr-1 size-5 text-blue-500" />
              {totalCommits} Commits
            </Badge>
          </div>
          <Button
            size="sm"
            className="gap-x-1.5"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw
              className={cn("!size-3", isFetching ? "animate-spin" : "")}
            />
            Sync
          </Button>
        </div>
      </div>
      <div className="h-1" />
      <ul className="h-[calc(100vh-14.2rem)] space-y-4 overflow-y-scroll">
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
                className="relative mt-4 size-8 flex-none rounded-full bg-gray-50 ring-1 ring-black/60"
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
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="ml-1 font-medium">
                      {c.commitAuthorName}
                    </span>
                  </div>
                  <CopySection commitHash={c.commitHash} />
                </div>
                <span className="flex items-center gap-x-1">
                  <Clock className="size-4 text-muted-foreground" />
                  <time className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(c.commitDate), {
                      addSuffix: true,
                    })}
                  </time>
                </span>
              </div>
              <Link
                target="_blank"
                href={`${project?.githubUrl}/commit/${c.commitHash}`}
                className="group mb-1 ml-1 flex w-full items-center gap-2 py-0.5 text-xs leading-5 hover:opacity-80"
              >
                <div className="mb-1 leading-tight">
                  <h2 className="text-lg font-semibold group-hover:no-underline">
                    {c.commitMessage}
                  </h2>
                  <div className="flex items-center gap-x-1">
                    <p className="text-muted-foreground group-hover:underline">{`${project?.githubUrl.slice(19)}`}</p>
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </div>
                </div>
              </Link>

              <div className="rounded-lg bg-purple-500/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium leading-6">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <h1 className="text-purple-500">AI Summary</h1>
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

export default MemoizedCommitLogPresenter
