"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomFilter from "./CustomFilter";
import { dealerBranches } from "@/constants";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function BranchFilter() {
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
        branch: value || null, // ✅ set or delete param
        page: null,            // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="location"
      value={branch}
      options={dealerBranches}
      handleChange={handleChange}
    />
  );
}

