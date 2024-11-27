"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreatePageProps {}

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage: FC<CreatePageProps> = ({}) => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  const refetch = useRefetch();

  const onSubmit = (formData: FormInput) => {
    createProject.mutate(
      {
        githubUrl: formData.repoUrl,
        name: formData.projectName,
        githubToken: formData.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          refetch();
          reset();
        },
        onError: () => {
          toast.error("Failed to create project");
        },
      },
    );
  };

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <GithubIcon size="100"/>
      {/* <Image src={"/"} alt="undraw-image" height={50} width={50} /> */}
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your Github Repository
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your Repository to link to Git Interact
          </p>
          <div className="h-4" />
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <Input
                placeholder="Project Name"
                {...register("projectName", { required: true })}
                required
              />
              <Input
                placeholder="Github URL"
                {...register("repoUrl", { required: true })}
                required
                type="url"
              />
              <Input
                placeholder="Github Token (optional, for private repos)"
                {...register("githubToken")}
              />
              <div className="h-1" />
              <Button type="submit" disabled={createProject.isPending}>
                {createProject.isPending
                  ? "Create Project"
                  : "Creating Project"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
