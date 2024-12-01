"use client";

import { type FC, ChangeEvent, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import useProject from "@/hooks/use-project";

const Search: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { projectId } = useProject();
  
  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.trim();
    if (!projectId) return;
    setQuery(newQuery);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      router.push(newQuery ? `?query=${encodeURIComponent(newQuery)}` : "/dashboard");
    }, 300);
  };

  return (
    <Input
      type="text"
      name="query"
      placeholder={projectId ? "Search..." : "Select a project"}
      className="w-full max-w-[600px] rounded-full bg-gray-400/15 px-4 py-1.5 text-sm"
      value={query}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
