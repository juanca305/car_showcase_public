"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function AdminBranchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeUrl } = useQueryParams();

  const [branch, setBranch] = useState("");

  useEffect(() => {
    setBranch(searchParams.get("branch") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setBranch(value);

    router.push(
      makeUrl({
        branch: value || null,
        page: null, // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  return (
    <select
      value={branch}
      onChange={(e) => handleChange(e.target.value)}
      className="
        px-4 py-2 rounded-xl
        border border-luxury-border
        bg-black/30 text-white
        text-sm
      "
    >
      <option value="">All Branches</option>
      <option value="Miami">West Kendall</option>
      <option value="Miami">Dadeland</option>
      <option value="Orlando">Homestead</option>
      <option value="Tampa">Doral</option>
      <option value="Miami">Miami</option>
    </select>
  );
}
