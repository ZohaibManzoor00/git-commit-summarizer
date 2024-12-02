"use client";

import { api } from "@/trpc/react";
import React, { useMemo, type FC } from "react";
import { useSearchParams } from "next/navigation";

import useProject from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import Spinner from "./loader";
import MemoizedCommitLogPresenter from "./commit-log-presenter";

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

  if (isError) return <Spinner text="Failed to load commits." isLoading={false} />;

  if (isLoading) return <Spinner />;

  if (!commits || !commits.length) {
    return (
      <div className="flex h-[calc(100vh-10.5rem)] items-center justify-center gap-x-4">
        <h1 className="text-center">No commits found.</h1>
        <Button disabled={isFetching} onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!filteredCommits || !filteredCommits.length) return <Spinner text="No commits found." isLoading={false} />;

  const allAuthors = [...new Set(filteredCommits.map((c) => c.commitAuthorName))];
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

export default CommitLogContainer;
