"use client";

import { ShowMoreProps } from "@/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CustomButton from "./CustomButton";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = () => {
    const params = new URLSearchParams(searchParams.toString());

    // ✅ always rely on the URL first (source of truth)
    const currentPage = Number(params.get("page") || pageNumber || 1);

    params.set("page", String(currentPage + 1));

    // ✅ preserve ALL filters in the URL + no scroll jump
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (!isNext) return null;

  return (
    <div className="w-full flex-center gap-5 mt-10">
      <CustomButton
        title="Show More"
        btnType="button"
        containerStyles="bg-primary-blue rounded-full text-white"
        handleClick={handleNavigation}
      />
    </div>
  );
};

export default ShowMore;


