import { Copy, Check } from "lucide-react";
import { useState, FC } from "react";

interface CopySectionProps {
  commitHash: string;
}

const CopySection: FC<CopySectionProps> = ({ commitHash }) => {
  const [status, setStatus] = useState<"idle" | "clicked">("idle");

  const handleCopy = () => {
    navigator.clipboard.writeText(commitHash).then(() => {
      setStatus("clicked");
      setTimeout(() => setStatus("idle"), 500);
    });
  };

  return (
    <code
      className="relative flex items-center gap-x-1 rounded bg-muted px-2 py-1 text-sm hover:cursor-pointer"
      onClick={handleCopy}
      role="button"
    >
      {commitHash}
      <div className="rounded-sm bg-primary/5 p-1 text-sm ring-1 ring-inset ring-primary/5">
        {status === "clicked" ? (
          <Check className="size-3" />
        ) : (
          <Copy className="size-3" />
        )}
      </div>
    </code>
  );
};

export default CopySection;
