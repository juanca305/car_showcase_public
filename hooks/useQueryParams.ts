"use client";

import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const makeUrl = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, searchParams]
  );

  return { makeUrl };
}

