import Link from "next/link";
import { type FC } from "react";
import { ChevronRight } from "lucide-react";

import Hero from "./_components/(landing)/hero";
import Particles from "@/components/ui/particles";
import Navbar from "./_components/(landing)/navbar";
import LatestGlobalCommits from "./_components/(landing)/latest-commits";

const LandingPage: FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="h-16" />
        <CTAPill />
        <div className="h-6" />
        <Hero />
        <LatestGlobalCommits />
      </main>
      <Particles
        className="absolute inset-0"
        quantity={40}
        ease={70}
        size={0.7}
        staticity={40}
        color="#22C55E"
      />
      <Particles
        className="absolute inset-0"
        quantity={40}
        ease={70}
        size={0.7}
        staticity={40}
        color="#3B82F6"
      />
      <Particles
        className="absolute inset-0"
        quantity={40}
        ease={70}
        size={0.7}
        staticity={40}
        color="#A855F7"
      />
    </>
  );
};

const CTAPill: FC = () => {
  return (
    <Link href="/dashboard" className="z-10 flex items-center justify-center">
      <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-black transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
        <div className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          ⚡
          <hr className="mx-2 h-4 w-[1.2px] shrink-0 bg-gray-300" />
          <span>Explore Dashboard</span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
};

export default LandingPage;
