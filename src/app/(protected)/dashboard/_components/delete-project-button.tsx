import { type FC, useState } from "react";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import useRefetch from "@/hooks/use-refetch";

const DeleteProjectButton: FC = () => {
  const { projectId, setProjectId } = useProject();
  const [isConfirming, setIsConfirming] = useState(false);
  const refetch = useRefetch();

  const deleteProject = api.project.deleteProject.useMutation({
    onSuccess: () => {
      setIsConfirming(false);
      setProjectId("");
      toast.success("Project deleted successfully");
      refetch();
    },
    onError: () => {
      setIsConfirming(false);
      toast.error("Failed to delete project");
    },
  });

  const handleDeleteClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  const confirmDelete = () => deleteProject.mutate({ projectId });

  const cancelDelete = () => setIsConfirming(false);

  return (
    <div className="flex items-center gap-2">
      <Badge
        className="flex items-center rounded-full border-red-500 px-2 text-red-600 hover:cursor-pointer hover:bg-accent"
        variant="outline"
        onClick={handleDeleteClick}
      >
        <Trash2 className="mr-[2px] size-3 text-red-600" />
        <p className="text-xs font-medium">Delete</p>
      </Badge>

      {isConfirming && (
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-600">Are you sure?</p>
          <Badge
            className="flex items-center rounded-full border-yellow-500 px-2 text-yellow-600 hover:cursor-pointer hover:bg-accent"
            variant="outline"
            onClick={cancelDelete}
          >
            <p className="text-xs font-medium">No</p>
          </Badge>
          <Badge
            className="flex items-center rounded-full border-green-500 px-2 text-green-600 hover:cursor-pointer hover:bg-accent"
            variant="outline"
            onClick={confirmDelete}
          >
            <p className="text-xs font-medium">Yes</p>
          </Badge>
        </div>
      )}
    </div>
  );
};

export default DeleteProjectButton;
