import { Github, Star } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import useProject from "@/hooks/use-project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { setProjectId } = useProject();

  return (
    <Card className="hover:bg-muted/50">
      <div className="group" onClick={() => setProjectId(project.id)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 cursor-pointer">
          <CardTitle className="text-md font-medium group-hover:underline">
            {project.name}
          </CardTitle>
          <Star
            fill={project.isStarred ? "black" : "none"}
            className="mr-1 h-4 w-4"
          />
        </CardHeader>
      </div>

      <CardContent>
        <CardDescription className="mt-2 w-10/12 truncate">
          <Link
            target="_blank"
            href={project?.githubUrl ?? ""}
            className="flex items-center hover:underline"
          >
            <Github className="mr-0.5 size-3.5" />
            {project?.githubUrl.slice(8)}
          </Link>
        </CardDescription>
        <CardFooter className="pb-0 flex justify-end px-0">
          <time className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(project.createdAt), {
              addSuffix: true,
            })}
          </time>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
