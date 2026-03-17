"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function SeatsFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { makeUrl } = useQueryParams();

  const [seats, setSeats] = useState<string>("");

  useEffect(() => {
    setSeats(searchParams.get("seats") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setSeats(value);

    router.push(
      makeUrl({
        seats: value || null, // ✅ set or remove seats param
        page: null,           // ✅ reset pagination on filter change
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="seats"
      value={seats}
      options={[
        { title: "Seats", value: "" },
        { title: "2", value: "2" },
        { title: "4", value: "4" },
        { title: "5", value: "5" },
        { title: "7", value: "7" },
      ]}
      handleChange={handleChange}
    />
  );
}

