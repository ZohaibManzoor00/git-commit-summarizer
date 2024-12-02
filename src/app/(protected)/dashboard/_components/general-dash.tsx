import { type FC } from "react";
import { Card } from "@/components/ui/card";
import DashboardTop from "./general-dash-top";
import DashboardBottom from "./general-dash-bottom";

const GeneralDash: FC = () => {
  return (
    <Card className="rounded-none border-none shadow-none">
      <DashboardTop />
      <DashboardBottom />
    </Card>
  );
};

export default GeneralDash;
