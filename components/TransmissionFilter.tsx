"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function TransmissionFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { makeUrl } = useQueryParams();

  const [transmission, setTransmission] = useState<string>("");

  // ✅ Sync UI from URL
  useEffect(() => {
    setTransmission(searchParams.get("transmission") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setTransmission(value);

    router.push(
      makeUrl({
        transmission: value || null, // ✅ add/remove transmission
        page: null,                  // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="transmission"
      value={transmission}
      options={[
        { title: "Transmission", value: "" },
        { title: "Automatic", value: "automatic" },
        { title: "Manual", value: "manual" },
      ]}
      handleChange={handleChange}
    />
  );
}
