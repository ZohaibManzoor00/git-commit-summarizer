import { Loader } from "lucide-react";
import { type FC } from "react";

interface SpinnerProps {
  text?: string;
  isLoading?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ text = "Loading", isLoading = true }) => (
  <div className="mt-10 h-[calc(100vh-13rem)]">
    <div className="flex items-center justify-center">
      <p className="mr-1">{text}</p>
      {isLoading ? (
        <Loader className="size-5 animate-spin text-primary" />
      ) : null}
    </div>
  </div>
);

export default Spinner;
