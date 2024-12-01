import { pollCommits } from "@/lib/github";
import { indexGithubRepo } from "@/lib/github-loader";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          githubUrl: input.githubUrl,
          name: input.name,
          userToProjects: {
            create: {
              userId: ctx.user.userId!,
            },
          },
        },
      });
      //   await indexGithubRepo(project.id, input.githubUrl, input.githubToken)
      pollCommits(project.id).then().catch(console.error);
      return project;
    }),
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId: ctx.user.userId!,
          },
        },
        deletedAt: null,
      },
      orderBy: [{ isStarred: "desc" }, { createdAt: "desc" }],
    });
  }),
  getCommits: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      pollCommits(input.projectId).then().catch(console.error);
      return await ctx.db.commit.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: "desc" },
      });
    }),
  toggleStar: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.projectId },
      });

      if (!project) throw new Error(`Project ${input.projectId} not found.`);

      return await ctx.db.project.update({
        where: { id: input.projectId },
        data: { isStarred: !project.isStarred },
      });
    }),
  deleteProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.project.update({
        where: { id: input.projectId },
        data: { deletedAt: new Date() },
      });
    }),
  getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId;
    if (!userId) throw new Error("You need to be logged in to view this resource");

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const userProjects = await ctx.db.userToProject.findMany({
      where: { userId, project: { deletedAt: null } },
      select: { projectId: true },
    });

    const userProjectIds = userProjects.map((item) => item.projectId);

    const [
      totalCommitsResult,
      totalCommitsWithSummaryResult,
      recentCommitsResult,
      latestCommitsResult
    ] = await Promise.allSettled([
      ctx.db.commit.count({ where: { projectId: { in: userProjectIds } } }),

      ctx.db.commit.count({ where: { projectId: { in: userProjectIds }, summary: { not: "" } } }),

      ctx.db.commit.findMany({
        where: { projectId: { in: userProjectIds }, commitDate: { gte: oneWeekAgo } },
        select: { commitDate: true },
      }),

      ctx.db.commit.findMany({
        where: { projectId: { in: userProjectIds } },
        distinct: ['commitHash'],
        orderBy: { commitDate: 'desc' }, 
        take: 5
      }),
    ]);

    const totalProjects = userProjectIds.length;

    const totalCommits = totalCommitsResult.status === "fulfilled" ? totalCommitsResult.value : 0;

    const totalCommitsWithSummary = 
      totalCommitsWithSummaryResult.status === "fulfilled" ? totalCommitsWithSummaryResult.value : 0;

    const recentCommits =
      recentCommitsResult.status === "fulfilled" ? recentCommitsResult.value : [];

    const latestCommits = latestCommitsResult.status === "fulfilled" ? latestCommitsResult.value : [];

    const commitsByWeekName: { [weekName: string]: number } = {};

    recentCommits.forEach((commit) => {
      const weekName = commit.commitDate.toLocaleDateString("en-US", { weekday: "short" });
      commitsByWeekName[weekName] = (commitsByWeekName[weekName] || 0) + 1;
    });

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const commitsChartData = daysOfWeek.map((day) => ({ name: day, commits: commitsByWeekName[day] || 0 }));

    return {
      totalProjects,
      totalCommits,
      totalCommitsWithSummary,
      latestCommits,
      commitsChartData,
    };
  }),
});
