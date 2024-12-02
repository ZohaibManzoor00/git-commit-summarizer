"use client";

import { Suspense } from "react";
import Spinner from "./_components/loader";
import { Card } from "@/components/ui/card";
import useProject from "@/hooks/use-project";
import CommitLog from "./_components/commit.log";
import GeneralDash from "./_components/general-dash";
import CommitTopInfo from "./_components/commit-top-info";

const Dashboard = () => {
  const { projectId, isError, isLoading } = useProject();

  if (isError) return <Spinner text="An error has occurred" isLoading={false} />;

  if (!projectId && !isLoading) return <GeneralDash />;
  
  return (
    <Card className="rounded-none shadow-none border-none">
      <CommitTopInfo />
      <Suspense fallback={<Spinner text="Loading commit log..." />}>
        <CommitLog />
      </Suspense>
    </Card>
  );
};

export default Dashboard;
