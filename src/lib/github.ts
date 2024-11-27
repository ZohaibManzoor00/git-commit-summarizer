import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios"
import { aiSummarizeCommit } from "./gemeni";

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
  const [owner, repo] = githubUrl.split('/').slice(-2)
  if (!owner || !repo) throw new Error("Invalid github url")

  const { data } = await octokit.rest.repos.listCommits({ owner, repo });

  const sortedCommits = data.sort((a: any, b: any) => {
    return (
      new Date(b.commit.author?.date).getTime() -
      new Date(a.commit.author?.date).getTime()
    );
  });

  return sortedCommits.slice(0, 15).map((commit: any) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    commitDate: commit.commit?.author?.date ?? "",
  }));
};

export const pollCommits = async (projectId: string) => {
  const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
  const commitHashes = await getCommitHashes(githubUrl);
  const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
  const summaryResponses = await Promise.allSettled(unprocessedCommits.map(c => summarizeCommit(githubUrl, c.commitHash)))
  const summaries = summaryResponses.map(res => res.status === 'fulfilled' ? res.value as string : "")
  const commits = await db.commit.createMany({
    data: summaries.map((summary, i) => {
        return {
            projectId,
            commitHash: unprocessedCommits[i]!.commitHash,
            commitMessage: unprocessedCommits[i]!.commitMessage,
            commitAuthorName: unprocessedCommits[i]!.commitAuthorName,
            commitAuthorAvatar: unprocessedCommits[i]!.commitAuthorAvatar,
            commitDate: unprocessedCommits[i]!.commitDate,
            summary
        }
    })
  })

  return commits
};

async function summarizeCommit (githubUrl: string, commitHash: string) {
    // * Get diff and pass to AI
    const { data: commitDiff } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
        headers: { Accept: 'application/vnd.github.v3.diff' }
    })

    return await aiSummarizeCommit(commitDiff)
}

async function fetchProjectGithubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true },
  });

  if (!project?.githubUrl) throw new Error("Project has no github url");

  return { project, githubUrl: project?.githubUrl };
}

async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]) {
  const processedCommits = await db.commit.findMany({ where: { projectId } });
  const unprocessedCommits = commitHashes.filter((commit) => 
    !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash));

  return unprocessedCommits
}
