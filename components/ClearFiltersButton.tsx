"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function ClearFiltersButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeUrl } = useQueryParams();

  const filterKeys = [
    "make",
    "model",
    "fuelType",
    "transmission",
    "yearMin",
    "yearMax",
    "seats",
    "category",
    "priceMin",
    "priceMax",
    "branch",
    "condition",
    "sort",
    "mileageMin",
    "mileageMax",
  ];

  const hasFilters = filterKeys.some((key) => searchParams.has(key));

  const handleClear = () => {
    const updates: Record<string, null> = {};

    filterKeys.forEach((key) => {
      updates[key] = null;
    });

    router.replace(
      makeUrl({
        ...updates,
        page: null,
        limit: null,
      }),
      { scroll: false }
    );
  };

  if (!hasFilters) return null;

  return (
    <button
      type="button"
      onClick={handleClear}
      className="clear-filters--chip"
    >
      Clear filters
    </button>
  );
}

