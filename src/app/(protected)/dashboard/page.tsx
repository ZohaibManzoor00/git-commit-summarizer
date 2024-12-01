"use client";

import { Suspense } from "react";
import useProject from "@/hooks/use-project";
import CommitLog from "./_components/commit.log";
import Spinner from "./_components/loader";
import CommitTopInfo from "./_components/commit-top-info";
import { Card } from "@/components/ui/card";
import GeneralDash from "./_components/general-dash";

const Dashboard = () => {
  const { projectId, isError, isLoading } = useProject();

  if (isError) return <Spinner text="An error has occurred" isLoading={false} />;

  if (!projectId && !isLoading) return <GeneralDash />;
  
  return (
    <Card className="rounded-md">
      <CommitTopInfo />
      <Suspense fallback={<Spinner text="Loading commit log..." />}>
        <CommitLog />
      </Suspense>
    </Card>
  );
};

export default Dashboard;
