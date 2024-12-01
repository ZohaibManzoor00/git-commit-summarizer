import { type FC } from "react";
import Link from "next/link";
import { Plus, PanelsTopLeft, RefreshCw } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
import ProjectStats from "./dashboard-project-stats";
import useRefetch from "@/hooks/use-refetch";
'force-dynamic'

const DashboardBottom: FC = () => {
  const { projects } = useProject();
  const { user } = useUser();

  if (projects?.length === 0) return <NoProject />;

  return (
    <div className="mx-auto pt-1">
      <div className="mx-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Welcome back, {user?.fullName}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex gap-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4" />
            Sync
          </Button>
          <Button asChild>
            <Link href="/create">
              <Plus className="h-4 w-4" />
              Create Project
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-[calc(100vh-14.4rem)] overflow-y-auto">
        <ProjectStats />
      </div>
    </div>
  );
};

const NoProject: FC = () => {
  return (
    <div className="mt-10 flex justify-center">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <PanelsTopLeft className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-semibold">No projects yet</h2>
        <p className="mb-4 text-muted-foreground">
          Create your first project to start tracking commits and generating AI
          summaries
        </p>
        <Button>
          <Link href="/create" className="flex items-center">
            <Plus className="mr-2 !size-5" />
            Create Project
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardBottom;
