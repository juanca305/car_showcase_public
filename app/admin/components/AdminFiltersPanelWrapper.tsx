"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import BranchFilter from "@/components/BranchFilter";
import ConditionFilter from "@/components/ConditionFilter";
import SortFilter from "@/components/SortFilter";
import ClearFiltersButton from "@/components/ClearFiltersButton";

import YearFilter from "@/components/YearFilter";
import MileageFilter from "@/components/MileageFilter";
import TransmissionFilter from "@/components/TransmissionFilter";
import SeatsFilter from "@/components/SeatsFilter";
import CategoryFilter from "@/components/CategoryFilter";

export default function AdminFiltersPanelWrapper() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);

  return (
    <div className="w-full mb-4">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-sm font-semibold text-luxury-text">Filters</h2>

        <div className="flex items-center gap-3">
          {/* Desktop clear */}
          {/* <div className="hidden sm:block">
            <ClearFiltersButton />
          </div> */}

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpenMobile(true)}
            className="
              sm:hidden
              px-4 py-2 rounded-xl
              border border-luxury-border
              bg-black/30 text-luxury-text
              hover:bg-white/5 transition
            "
          >
            Open Filters
          </button>
        </div>
      </div>

      {/* ✅ Desktop panel */}
      <div
        className="
          hidden sm:flex flex-col gap-4
          p-4 rounded-2xl
          border border-luxury-border
          bg-luxury-surface/50
        "
      >
        {/* ✅ MAIN filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[320px]">
            <SearchBar />
          </div>

          <BranchFilter />
          <ConditionFilter />
          <SortFilter />
        </div>

        {/* Advanced toggle + clear */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setOpenAdvanced((v) => !v)}
            className="text-sm text-luxury-muted hover:text-luxury-text transition"
          >
            {openAdvanced ? "Hide Advanced Filters" : "Show Advanced Filters"}
          </button>

          <div className="hidden lg:block">
            <ClearFiltersButton />
          </div>
        </div>

        {/* ✅ ADVANCED filters */}
        {openAdvanced && (
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <YearFilter />
            <MileageFilter />
            <TransmissionFilter />
            {/* <SeatsFilter />
            <CategoryFilter /> */}
          </div>
          
        )}
      </div>

      {/* ✅ Mobile drawer */}
      {openMobile && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div
            className="
              w-full max-w-[360px] h-full
              bg-luxury-surface
              border-l border-luxury-border
              p-6
              flex flex-col
            "
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-luxury-text">Filters</h3>
              <button
                type="button"
                onClick={() => setOpenMobile(false)}
                className="text-2xl text-luxury-muted hover:text-luxury-text"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {/* MAIN */}
              <SearchBar />
              <BranchFilter />
              <ConditionFilter />
              <SortFilter />

              {/* Toggle advanced */}
              <button
                type="button"
                onClick={() => setOpenAdvanced((v) => !v)}
                className="text-sm text-luxury-muted hover:text-luxury-text transition text-left"
              >
                {openAdvanced ? "Hide Advanced" : "Show Advanced"}
              </button>

              {/* ADVANCED */}
              {openAdvanced && (
                <div className="flex flex-col gap-5 pt-3 border-t border-white/10">
                  <YearFilter />
                  <MileageFilter />
                  <TransmissionFilter />
                  {/* <SeatsFilter />
                  <CategoryFilter /> */}
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 flex flex-col gap-3">
              <ClearFiltersButton />

              <button
                type="button"
                onClick={() => setOpenMobile(false)}
                className="
                  w-full py-3 rounded-xl
                  bg-luxury-accent text-black font-semibold
                  hover:bg-luxury-accentHover transition
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

