"use client";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CommitLogProps {}

const CommitLog: FC<CommitLogProps> = ({}) => {
  const { projectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({ projectId });

  return (
    <ul className="h-[calc(100vh-10.6rem)] space-y-2 overflow-y-scroll">
      {commits?.map((c, i) => (
        <li key={c.id} className="relative flex gap-x-4 pl-2 pr-2">
          <div
            className={cn(
              i === commits.length - 1 ? "h-6" : "-bottom-6",
              "absolute left-0 top-0 flex w-6 justify-center",
            )}
          >
            <div className="w-px translate-x-1 bg-gray-200 ml-4" />
          </div>
          <>
            <Image
              src={c.commitAuthorAvatar}
              alt="commit author avatar"
              className="relative mt-4 size-8 flex-none rounded-full bg-gray-50"
              width={40}
              height={40}
            />
            <div className="flex-auto rounded-md bg-white p-3 ring-1 ring-inset ring-gray-100">
              <div className="flex justify-between gap-x-4">
                <Link
                  target="_blank"
                  href={`${project?.githubUrl}/commit/${c.commitHash}`}
                  className="py-0.5 text-xs leading-5 text-gray-500"
                >
                  <span className="font-medium text-gray-900">
                    {c.commitAuthorName}
                  </span>{" "}
                  <span className="inline-flex items-center">
                    {c.commitMessage}
                    <ExternalLink className="ml-1 size-3.5" />
                  </span>
                </Link>
              </div>

              <span className="font-semibold">{c.commitMessage}</span>
              <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                {c.summary}
              </pre>
            </div>
          </>
        </li>
      ))}
    </ul>
  );
};

export default CommitLog;
