  "use client";

import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

const CONDITIONS = [
  { label: "All", value: "" },
  { label: "New", value: "new" },
  { label: "Used", value: "used" },
];

export default function ConditionFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeUrl } = useQueryParams();

  const selected = searchParams.get("condition") || "";

  const handleChange = (value: string) => {
    router.push(
      makeUrl({
        condition: value || null, // ✅ set or remove
        page: null,               // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  return (
    <div
      className="
        flex
        gap-3
        rounded-full
        border
        border-luxury-border
        bg-luxury-bg
        p-1
      "
    >
      {CONDITIONS.map((c) => {
        const active = selected === c.value;

        return (
          <button
            key={c.value}
            onClick={() => handleChange(c.value)}
            className={clsx(
              `
              h-[42px]
              px-6
              rounded-full
              text-sm
              font-medium
              transition-all
              `,
              active
                ? "bg-luxury-accent text-black shadow-sm"
                : "text-luxury-muted hover:text-luxury-text hover:bg-luxury-accent/10"
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
