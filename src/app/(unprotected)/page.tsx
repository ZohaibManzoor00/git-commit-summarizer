"use client";

import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { useUser } from "@clerk/nextjs";
import { FC } from "react";

const Homepage: FC = () => {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  const { user } = useUser();

  return (
    <div className="pl-20 pt-20">
      <h1>This is still a work in progress.</h1>
      <div className="flex gap-x-10 pt-5">
        {user ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Homepage;
