import Link from "next/link";
import { type FC } from "react";
import { useUser } from "@clerk/nextjs";
import { Github, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";

const DashboardTop: FC = () => {
  const { user } = useUser();

  const firstName = user?.firstName ?? ("?" as string);
  const lastName = user?.lastName ?? ("?" as string);

  let userInitials = "??";
  if (firstName && lastName) userInitials = `${firstName[0]}${lastName[0]}`;

  return (
    <>
      <header className="flex items-center gap-3 px-4 py-4">
        <div className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
          <div className="flex h-[1.9rem] w-9 justify-center text-2xl font-bold">
            <p className="uppercase">{userInitials}</p>
          </div>
        </div>
        <div className="flex-1">
          <CardTitle className="flex items-center gap-x-3 text-xl">
            {firstName}
          </CardTitle>

          <CardDescription>
            <Link
              target="_blank"
              href={"https://github.com/"}
              className="flex items-center hover:underline"
            >
              <Github className="mr-0.5 size-3.5" />
              <p>github.com</p>
            </Link>
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button asChild className="hidden sm:flex" variant="outline">
            <a
              href={"https://github.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork className="h-4 w-4" />
              Github
            </a>
          </Button>
        </div>
      </header>
    </>
  );
};

export default DashboardTop;
