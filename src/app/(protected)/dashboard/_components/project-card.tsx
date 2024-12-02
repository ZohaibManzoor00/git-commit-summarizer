import { Calendar, Github, Star } from "lucide-react";
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
import { format } from "date-fns";
import useProject from "@/hooks/use-project";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { setProjectId } = useProject();

  return (
    <Card className="hover:bg-muted/50">
      <div className="group" onClick={() => setProjectId(project.id)}>
        <CardHeader className="flex cursor-pointer flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-md font-medium group-hover:underline">
            {project.name}
          </CardTitle>
          <Star
            fill={project.isStarred ? "currentColor" : "none"}
            className="mr-1 h-4 w-4 text-yellow-600"
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
        <CardFooter className="flex items-center justify-end px-0 pb-0 pt-2">
          <Badge variant="secondary" className="px-3">
            <Calendar className="size-3.5 text-muted-foreground mr-1" />
            <time className="text-xs text-muted-foreground">
              {format(new Date(project.createdAt), "MM/dd/yy")}
            </time>
          </Badge>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
