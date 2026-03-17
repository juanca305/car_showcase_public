"use client";

import { useState } from "react";
import FiltersMobileButton from "./FiltersMobileButton";
import CategoryFilter from "./CategoryFilter";
import SeatsFilter from "./SeatsFilter";
import FuelFilter from "./FuelFilter";
import TransmissionFilter from "./TransmissionFilter";
import YearFilter from "./YearFilter";
import BranchFilter from "./BranchFilter";


export default function FiltersPanelWrapper() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile Button */}
      <FiltersMobileButton setOpen={setOpen} />

      {/* Desktop Wrapper */}
      <div
        className="
          hidden sm:flex
          flex-col gap-4
          w-full
          mt-4
        "
      >

        {/* NEW WRAPPER — Filters Row */}
        <div
          className="
            w-full
            p-4 sm:p-5
            rounded-2xl
            border border-luxury-border
            bg-luxury-surface/50
            shadow-sm
            flex
            flex-wrap
            gap-3
            items-center
          "
        >
          <BranchFilter />
          <CategoryFilter />
          <SeatsFilter />
          <FuelFilter />
          <TransmissionFilter />
        </div>

      </div>

      {/* MOBILE DRAWER (unchanged) */}
      {open && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/40 backdrop-blur-sm
            flex justify-end
          "
        >
          <div
            className="
              w-full max-w-[340px] h-full
              bg-luxury-surface
              border-l border-luxury-border
              p-6
              flex flex-col
              relative z-[100]
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-luxury-text">Filters</h2>
              <button
                className="text-luxury-muted text-2xl"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Mobile Filters */}
            <div className="flex flex-col gap-5">
              <BranchFilter />
              <CategoryFilter />
              <SeatsFilter />
              <FuelFilter />
              <TransmissionFilter />
            </div>

            {/* Confirm Button */}
            <div className="mt-8">
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3 rounded-xl bg-luxury-accent text-white font-medium"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

