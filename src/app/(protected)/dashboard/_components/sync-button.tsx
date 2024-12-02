import { api } from "@/trpc/react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type FC } from "react";

interface SyncDashboardBtnProps {}

const SyncDashboardBtn: FC<SyncDashboardBtnProps> = ({}) => {
  const { refetch, isFetching } = api.project.getDashboardStats.useQuery();

  return (
    <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
      <RefreshCw className="h-4 w-4" />
      {isFetching ? "Syncing" : "Sync"}
    </Button>
  );
};

export default SyncDashboardBtn;
