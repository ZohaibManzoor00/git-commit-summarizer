import { type FC } from "react";
import Link from "next/link";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";

const Hero: FC = () => {
  return (
    <section className="bg-gradient-to-b from-background to-muted px-6">
      <div className="mx-auto max-w-3xl space-y-12 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Supercharge Your Git Workflow with <span className="font-extrabold">AI</span>
          </h1>
          <div className="mx-auto w-8/12">
            <p className="text-lg text-primary">
              Track <strong>commits</strong>, analyze patterns, and get{" "}
              <strong>AI-powered</strong> insights for your{" "}
              <strong>Github</strong> projects. All in one place.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                Connect with GitHub
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
