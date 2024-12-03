"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { type FC } from "react";

const SignInOut: FC = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      <Link
        className={cn(
          buttonVariants({ variant: isSignedIn ? "default" : "secondary" }),
          "mr-3 text-sm",
        )}
        href={isSignedIn ? "/dashboard" : "/signin"}
      >
        {isSignedIn ? "Jump in" : "Log in"}
      </Link>

      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link
          className={cn(buttonVariants({ variant: "default" }), "text-sm")}
          href={"/signup"}
        >
          Get Started
        </Link>
      )}
    </>
  );
};

export default SignInOut;
