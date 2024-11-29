import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summarizeCode } from "./gemeni";
import { db } from "@/server/db";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import simpleGit from "simple-git";
import path from "path";
import fs from "fs-extra";
import pLimit from "p-limit";


// export const loadGithubRepo = async (
//   githubUrl: string,
//   githubToken?: string,
// ) => {
// //   const [owner, repo] = githubUrl.split("/").slice(-2);
// //   if (!owner || !repo) throw new Error("Invalid github url");

// //   const cloneUrl = githubToken
// //     ? `https://${githubToken}@github.com/${owner}/${repo}.git`
// //     : `https://github.com/${owner}/${repo}.git`;

//   const tempDir = path.join("/tmp", `${githubUrl}-${Date.now()}`);

//   try {
//     const git = simpleGit();
//     await git.clone(githubUrl, tempDir);

//     const loader = new DirectoryLoader(tempDir, {
//       ".js": (path) => new TextLoader(path),
//       ".ts": (path) => new TextLoader(path),
//       ".jsx": (path) => new TextLoader(path),
//       ".tsx": (path) => new TextLoader(path),
//       ".md": (path) => new TextLoader(path),
//       ".txt": (path) => new TextLoader(path),
//     });

//     const docs = await loader.load();

//     const ignorePatterns = [
//       "node_modules",
//       "dist",
//       "build",
//       ".git",
//       "package-lock.json",
//       "yarn.lock",
//       "pnpm-lock.yaml",
//       "bun.lockb",
//     ];

//     const filteredDocs = docs.filter(
//       (doc) =>
//         !ignorePatterns.some((pattern) =>
//           doc.metadata.source.includes(pattern),
//         ),
//     );

//     return filteredDocs;
//   } finally {
//     await fs.remove(tempDir);
//   }
// };

const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken ?? "",
    branch: "main",
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lockb",
      "node_modules",
      "dist",
      "build",
      ".git",
    ],
    recursive: true,
    unknown: "warn",
    maxConcurrency: 2,
  });

  const docs = await loader.load();
  return docs;
};

const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (d) => {
      const aiSummary = await safeSummarizeCode(d);
      const embedding = await generateEmbedding(aiSummary);

      return {
        aiSummary,
        embedding,
        sourceCode: d.pageContent,
        fileName: d.metadata.source,
      };
    }),
  );
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await loadGithubRepo(githubUrl, githubToken);
  const allEmbeddings = await generateEmbeddings(docs);

  await Promise.allSettled(
    allEmbeddings.map(async (e) => {
      if (!e) return;
      const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
        data: {
          summary: e.aiSummary,
          sourceCode: e.sourceCode,
          fileName: e.fileName,
          projectId,
        },
      });

      await db.$executeRaw`
            UPDATE "SourceCodeEmbedding"
            SET "summaryEmbedding" = ${e.embedding}::vector
            WHERE "id" = ${sourceCodeEmbedding.id}
        `;
    }),
  );
};

const safeSummarizeCode = async (doc: Document) => {
  try {
    return await summarizeCode(doc);
  } catch (err) {
    console.error(`Failed to summarize ${doc.metadata.source}:`, err);
    return '';
  }
};