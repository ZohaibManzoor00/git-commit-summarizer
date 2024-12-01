import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import useProject from "@/hooks/use-project";
import {
  Plus,
  GitCommit,
  WandSparkles,
  GitMerge,
  ExternalLink,
  User,
} from "lucide-react";
import { type FC } from "react";
import { ProjectCard } from "./project-card";
import CommitActivityChart from "./commit-activity-chart";
import { api } from "@/trpc/react";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const ProjectStats: FC = () => {
  const { projects, setProjectId } = useProject();
  const { data } = api.project.getDashboardStats.useQuery();

  return (
    <div className="mt-6 space-y-2 px-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Plus className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalProjects}</div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commits Tracked
            </CardTitle>
            <GitCommit className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalCommits}</div>
          </CardContent>
        </Card>
        <Card className="hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Summaries</CardTitle>
            <WandSparkles className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.totalCommitsWithSummary}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-3" />
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Commits</CardTitle>
            <CardDescription>
              Your latest tracked commits across all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data?.latestCommits && data?.latestCommits.length > 0 ? (
              <div className="h-60 space-y-4 overflow-y-auto">
                {data?.latestCommits.map((commit) => (
                  <div
                    key={commit.id}
                    className="group flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <div className="mt-1">
                      <GitMerge className="size-4 text-purple-600" />
                    </div>
                    <div className="grid gap-1">
                      <div className="flex max-w-full items-center gap-2 truncate">
                        <span
                          className="cursor-pointer truncate font-medium"
                          onClick={() => setProjectId(commit.projectId)}
                        >
                          {commit.commitMessage}
                        </span>
                        <a
                          onClick={() => setProjectId(commit.projectId)}
                          href="#"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Tooltip>
                          <TooltipTrigger className="hover:underline">
                            {commit.commitHash.substring(0, 7)}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to copy full hash</p>
                          </TooltipContent>
                        </Tooltip>
                        <span>•</span>
                        <span>
                          <time className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(commit.createdAt))}
                          </time>
                        </span>
                        <span>•</span>
                        <Badge
                          variant="outline"
                          className="rounded-full font-normal"
                        >
                          <span className="cursor-pointer hover:underline">
                            {projects
                              ?.find((p) => p.id === commit.projectId)
                              ?.githubUrl?.slice(19) ?? "github"}
                          </span>
                        </Badge>
                        <span>•</span>
                        <span className="font-medium text-foreground">
                          {commit.commitAuthorName}
                        </span>
                        {commit.commitAuthorAvatar ? (
                          <Image
                            className="rounded-full font-medium text-foreground"
                            src={commit.commitAuthorAvatar}
                            alt={`${commit.commitAuthorName}'s avatar`}
                            height={20}
                            width={20}
                          />
                        ) : (
                          <div className="rounded-full p-[3px] ring-1 ring-black/20">
                            <User className="size-4" />
                          </div>
                        )}
                        {/* {commit.additions !== undefined && (
                    <>
                      <span>•</span>
                      <span className="text-green-600">+{commit.additions}</span>
                      <span className="text-red-600">-{commit.deletions}</span>
                    </>
                  )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[160px] items-center justify-center text-sm text-muted-foreground">
                No recent commits to display
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CommitActivityChart commitsByWeekName={data?.commitsChartData} />
        </Card>
        <div className="h-1" />
      </div>
      <h2 className="text-2xl font-semibold">Your Projects</h2>
      <div className="h-1" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects
          ?.slice(0, 6)
          .map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
      </div>
      <div className="h-6" />
    </div>
  );
};

export default ProjectStats;
