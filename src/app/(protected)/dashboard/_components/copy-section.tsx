import { Badge } from "@/components/ui/badge";
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
    <Badge variant="secondary">
      <code
        className="flex items-center gap-x-1 bg-muted py-[1px] text-sm hover:cursor-pointer font-medium"
        onClick={handleCopy}
        role="button"
      >
         <span className="sm:hidden">{commitHash.slice(0, 7)}</span>
         <span className="hidden sm:inline">{commitHash}</span>
        <div className="rounded-sm bg-primary/5 p-1 text-sm ring-1 ring-inset ring-primary/5">
          {status === "clicked" ? (
            <Check className="size-3" />
          ) : (
            <Copy className="size-3" />
          )}
        </div>
      </code>
    </Badge>
  );
};

export default CopySection;
