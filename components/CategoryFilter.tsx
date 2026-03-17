"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { carCategories } from "@/constants";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { makeUrl } = useQueryParams();

  const [category, setCategory] = useState<string>("");

  // Sync UI from URL
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setCategory(value);

    router.push(
      makeUrl({
        category: value || null, // ✅ set or remove category
        page: null,              // ✅ reset page when filter changes
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="category"
      value={category}
      options={carCategories}
      handleChange={handleChange}
    />
  );
}

