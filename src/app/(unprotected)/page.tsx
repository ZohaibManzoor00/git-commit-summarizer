import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <div className="pl-20 pt-20">
      <h1>This is still a work in progress.</h1>
      <div className="flex gap-x-10 pt-5">
        <Link href="/signin">Sign In</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
