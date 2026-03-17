"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { fuels } from "@/constants";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function FuelFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { makeUrl } = useQueryParams();

  const [fuelType, setFuelType] = useState<string>("");

  useEffect(() => {
    setFuelType(searchParams.get("fuelType") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setFuelType(value);

    router.push(
      makeUrl({
        fuelType: value || null, // ✅ add or remove param
        page: null,              // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="fuelType"
      value={fuelType}
      options={fuels}
      handleChange={handleChange}
    />
  );
}

