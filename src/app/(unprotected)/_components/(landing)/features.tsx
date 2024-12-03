import { Card, CardContent } from "@/components/ui/card";
import { GitCommit, GitPullRequest, BarChart3 } from "lucide-react";
import { type FC } from "react";

const Features: FC = () => {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <GitCommit className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Commit Tracking</h3>
              <p className="text-muted-foreground">
                Automatically track and analyze commits across all your projects
                with detailed statistics and insights.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <GitPullRequest className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">AI Summaries</h3>
              <p className="text-muted-foreground">
                Get intelligent summaries of your commits and pull requests,
                powered by advanced AI analysis.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <BarChart3 className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Activity Analytics</h3>
              <p className="text-muted-foreground">
                Visualize your development patterns with interactive charts and
                comprehensive activity logs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Features;
