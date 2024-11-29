import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  const { data: projects, isLoading, refetch } = api.project.getProjects.useQuery();
  const [projectId, setProjectId] = useLocalStorage('git-interact', '')
  const project = projects?.find(p => p.id === projectId)

  return { projects, project, setProjectId, projectId, isLoading, refetch };
};

export default useProject;
