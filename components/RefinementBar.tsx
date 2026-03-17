"use client";

///***** THIS APPROACH SEEMS TO BE THE PERFECT ******** */

import { useState } from "react";
import PriceFilter from "./PriceFilter";
import MileageFilter from "./MileageFilter";
import YearFilter from "./YearFilter";
import SortFilter from "./SortFilter";

export default function RefinementBar() {
  const [open, setOpen] = useState(false);

  return (
    // NOTE: `relative z-30` is required so dropdowns overlap content below.
    // This fixes stacking-context issues caused by backdrop-blur + layout order.
    // Removing it will make dropdowns render BEHIND the next section.

    <div className="mt-6 mb-10 w-full relative z-30">
      <div className="w-full p-5 rounded-2xl bg-luxury-surface/60 border border-luxury-border shadow-lg shadow-black/20 backdrop-blur-sm">

        {/* =========================================================
           MOBILE + TABLET HEADER — Filters Toggle + Sort
           (hidden on desktop)
        ========================================================= */}
        <div className="flex md:flex lg:hidden justify-between items-center mb-2">
          <div className="max-w-max">
          <button
            onClick={() => setOpen(!open)}
            className="refinement-btn_2 w-fit px-5 font-semibold"
          >
            {open ? "Hide Filters" : "More Filters"}
          </button>
          </div>

          <div className="min-w-[180px]">
            <SortFilter />
          </div>
        </div>

        {/* =========================================================
           MOBILE + TABLET DROPDOWN AREA (Animated Collapse)
        ========================================================= */}
        <div
          className={`
            block md:block lg:hidden overflow-hidden
            transition-all duration-400 ease-out
            ${open ? "max-h-[650px] mt-4 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="
            grid grid-cols-1 sm:grid-cols-2 gap-5 p-4
            rounded-xl bg-luxury-surface/30 border border-luxury-border/60
          ">
            <PriceFilter />
            <MileageFilter />
            <YearFilter />
          </div>
        </div>

        {/* =========================================================
           DESKTOP — Always Visible Inline Layout (LG+)
        ========================================================= */}
        <div className="hidden lg:flex justify-between items-center gap-6">

          {/* Filter row */}
          <div className="flex items-center gap-5 flex-wrap max-w-[75%]">
            <PriceFilter />
            <MileageFilter />
            <YearFilter />
          </div>

          {/* Sort stays right aligned */}
          <div className="min-w-[180px]">
            <SortFilter />
          </div>
        </div>

      </div>
    </div>
  );
}












