"use client";

import { Button } from "@/components/ui/button";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import { Star } from "lucide-react";
import { useState, type FC } from "react";
import { toast } from "sonner";

const StarButton: FC = () => {
  const { project, isLoading, refetch } = useProject();
  const [optimisticIsStarred, setOptimisticIsStarred] = useState<boolean | null>(null);

  const toggleStar = api.project.toggleStar.useMutation({
    onSuccess: () => {
      refetch().then(() => setOptimisticIsStarred(null)).catch(console.error);
    },
    onError: () => {
      setOptimisticIsStarred(null);
      toast.error("Failed to update star status.");
    },
  });

  const handleClick = () => {
    if (!project?.id) return;

    setOptimisticIsStarred((prev) => !prev ? !project.isStarred : !prev);

    toast.success(
        optimisticIsStarred === null
          ? !project.isStarred
            ? "Saved"
            : "Unsaved"
          : !optimisticIsStarred
          ? "Saved"
          : "Unsaved"
      );

    toggleStar.mutate({ projectId: project.id });
  };

  const isStarred = optimisticIsStarred ? optimisticIsStarred : project?.isStarred;

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="gap-1.5"
      disabled={isLoading || toggleStar.isPending}
    >
      <Star className="!size-3.5 text-yellow-600" fill={isStarred ? "currentColor" : "none"}/>
    </Button>
  );
};

export default StarButton;
