  "use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function SortFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { makeUrl } = useQueryParams();

  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setSort(value);

    router.push(
      makeUrl({
        sort: value || null,
        page: null, // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="sort"
      value={sort}
      options={[
        { title: "Sort by", value: "" },
        { title: "Price: Low → High", value: "price-asc" },
        { title: "Price: High → Low", value: "price-desc" },
        { title: "Year: Oldest → Newest", value: "year-asc" },
        { title: "Year: Newest → Oldest", value: "year-desc" },
        { title: "Mileage: Low → High", value: "mileage-asc" },
        { title: "Mileage: High → Low", value: "mileage-desc" },
      ]}
      handleChange={handleChange}
    />
  );
}
