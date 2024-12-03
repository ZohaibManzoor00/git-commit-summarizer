import { type FC } from "react";
import { GitCommit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LatestGlobalCommits: FC = () => {
  return (
    <section className="bg-gradient-to-b from-muted to-background px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter">
          Latest Commits
        </h2>
        <div className="space-y-6">
          {[
            {
              message: "Merge pull request #51114 from joshuay03/...",
              author: "Jean Boussie",
              repo: "rails/rails",
              time: "29 minutes ago",
              hash: "042e392",
            },
            {
              message: "Merge pull request #51114 from joshuay03/...",
              author: "Jean Boussie",
              repo: "rails/rails",
              time: "29 minutes ago",
              hash: "042e392",
            },
            {
              message: "Merge pull request #51114 from joshuay03/...",
              author: "Jean Boussie",
              repo: "rails/rails",
              time: "29 minutes ago",
              hash: "042e392",
            },
          ].map((commit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 rounded-lg border bg-card p-4 shadow-sm"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${commit.author}`}
                  alt={commit.author}
                />
                <AvatarFallback>
                  {commit.author.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{commit.message}</p>
                <div className="text-sm text-muted-foreground">
                  <span>{commit.author}</span> • <span>{commit.repo}</span> •{" "}
                  <span>{commit.time}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <GitCommit className="h-4 w-4" />
                <span>{commit.hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestGlobalCommits;
