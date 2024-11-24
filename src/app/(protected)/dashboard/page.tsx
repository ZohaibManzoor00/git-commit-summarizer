"use client";

import useProject from "@/hooks/use-project";
import { useUser } from "@clerk/nextjs";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  const { project } = useProject();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <div className="flex w-fit rounded-md bg-primary px-4 py-3">
          <Github className="size-5 text-white" />
          <div className="ml-2 text-white">
            <p className="text-sm font-medium">
              This project is linked to{" "}
              <Link
                href={project?.githubUrl ?? ""}
                className="inline-flex items-center text-white/80 hover:underline"
              >
                {project?.githubUrl}
                <ExternalLink className="ml-1 size-4" />
              </Link>
            </p>
          </div>
        </div>
      </div>
      <h1>{project?.name}</h1>
    </div>
  );
};

export default DashboardPage;
